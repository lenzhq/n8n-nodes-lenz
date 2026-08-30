import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INode,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError, sleep } from 'n8n-workflow';

const BASE_URL = 'https://lenz.io/api/v1';

// Identifies requests coming from this node so the Lenz backend can attribute
// API usage to the n8n integration (via the User-Agent header). Keep the
// version in sync with package.json on each release.
const USER_AGENT = 'n8n-nodes-lenz/0.3.0';

// Pins the Public API surface this node was built against. Lenz records it for
// analytics today and will use it to keep v1 clients working once a v2 surface
// ships, so a pinned caller never gets silently migrated. Bump only after
// re-checking the node against a newer API surface.
const API_VERSION = '2026-08-05';

// Verify (Deep) is async server-side: submit returns a task_id, then we poll
// the status endpoint until it reaches a terminal state. Backoff mirrors the
// Lenz API's recommended 2s/4s/8s cadence, capped by the overall deadline.
const POLL_TIMEOUT_MS = 120000;
const POLL_BACKOFF_MS = [2000, 4000, 8000];

// Server-side cap on POST /verify/batch and POST /verify/{task_id}/select.
const BATCH_MAX_CLAIMS = 20;

// GET /verifications is paginated; 100 is the largest page the API allows.
const MAX_PAGE_SIZE = 100;

function isPassingVerdict(verdict?: string): boolean {
	return verdict === 'True' || verdict === 'Mostly True';
}

// Where a caller tops up. Kept as a constant so the plans page can move
// without hunting through message strings.
const PLANS_URL = 'https://lenz.io/plans';

/**
 * Pull the HTTP status off whatever shape the request helper threw.
 *
 * n8n's http helper does not guarantee one field: depending on the transport
 * the status lands on `statusCode`, `status`, or nested under `response`.
 */
function statusCodeOf(error: unknown): number | undefined {
	const e = error as IDataObject | undefined;
	if (!e || typeof e !== 'object') return undefined;
	const candidates = [
		e.httpCode,
		e.statusCode,
		e.status,
		(e.response as IDataObject | undefined)?.status,
		(e.response as IDataObject | undefined)?.statusCode,
	];
	for (const c of candidates) {
		const n = Number(c);
		if (Number.isFinite(n) && n > 0) return n;
	}
	return undefined;
}

/**
 * The JSON body the API returned, wherever the helper stashed it.
 *
 * `context.data` comes first because it is the one that actually fires in
 * production: `httpRequestWithAuthentication` never rethrows the transport
 * error, it wraps it in a NodeApiError, and that constructor lifts the parsed
 * body onto `context.data`. The raw-transport shapes below it are kept for
 * direct `helpers.httpRequest` calls and for older n8n builds.
 */
function responseBodyOf(error: unknown): IDataObject {
	const e = error as IDataObject | undefined;
	if (!e || typeof e !== 'object') return {};
	const candidates = [
		(e.context as IDataObject | undefined)?.data,
		e.body,
		(e.response as IDataObject | undefined)?.body,
		(e.response as IDataObject | undefined)?.data,
		(e.errorResponse as IDataObject | undefined)?.body,
		((e.errorResponse as IDataObject | undefined)?.response as IDataObject | undefined)?.data,
		((e.cause as IDataObject | undefined)?.response as IDataObject | undefined)?.data,
		e.error,
	];
	for (const c of candidates) {
		if (c && typeof c === 'object' && !Array.isArray(c)) return c as IDataObject;
	}
	return {};
}

/**
 * Build the user-facing text for an out-of-credits rejection, or undefined if
 * this error isn't one.
 *
 * Keyed on HTTP 402, which the Lenz API sends for exactly this condition. The
 * body's `detail`, `cost` and `credits_remaining` refine the wording but none
 * is required — a 402 alone is unambiguous, so a server that omits them still
 * produces the generic text rather than "costs undefined credits".
 */
function quotaMessageFor(error: unknown): { message: string; description: string } | undefined {
	if (statusCodeOf(error) !== 402) return undefined;

	const body = responseBodyOf(error);
	const detail = typeof body.detail === 'string' ? body.detail : 'No remaining Lenz credits.';
	const upgradeUrl = typeof body.upgrade_url === 'string' ? body.upgrade_url : PLANS_URL;

	// `cost` and `credits_remaining` are in CREDITS; `remaining` is in the
	// capability's own unit. Quoting both is what separates "you have 4 credits
	// and this costs 10" from "you have nothing" — the first is one top-up away,
	// the second is a plan decision.
	const cost = typeof body.cost === 'number' ? body.cost : undefined;
	const creditsRemaining =
		typeof body.credits_remaining === 'number' ? body.credits_remaining : undefined;

	let description = '';
	if (cost !== undefined && creditsRemaining !== undefined) {
		description = `This call costs ${cost} credit${cost === 1 ? '' : 's'} and you have ${creditsRemaining} left. `;
	}
	description += `Retrying will not help — this clears when you top up or your monthly credits reset. See ${upgradeUrl}`;
	const resetsAt = typeof body.resets_at === 'string' ? body.resets_at : '';
	if (resetsAt) {
		description += ` (credits reset ${resetsAt}).`;
	}

	return { message: `Lenz: ${detail}`, description };
}

/**
 * Build the user-facing text for a capacity / provider-outage 503, or
 * undefined if this error isn't one.
 *
 * The Lenz API answers 503 with body `code: 'capacity'` (admission control —
 * the pipeline is at its concurrency ceiling or a model pool is down) or
 * `code: 'upstream_unavailable'` (every model/search provider behind a sync
 * endpoint is down). Both are transient by contract and state a wait in
 * `retry_after` (seconds), jittered server-side so callers come back spread
 * out rather than in a thundering herd.
 *
 * A verified community node must not sleep or loop, so the advice has to be
 * something the workflow does. It is deliberately NOT "Retry On Fail": that
 * setting allows 2-5 tries with a short wait between them, so it would burn
 * every try well inside the stated window and fail anyway — while re-sending
 * the submit several times, which is exactly the herd the jitter exists to
 * prevent. The pattern that actually works is the node's error output into a
 * Wait node set to the stated seconds, then back into this node.
 */
function capacityMessageFor(error: unknown): { message: string; description: string } | undefined {
	if (statusCodeOf(error) !== 503) return undefined;

	const body = responseBodyOf(error);
	const code = typeof body.code === 'string' ? body.code : '';
	if (code !== 'capacity' && code !== 'upstream_unavailable') return undefined;

	const retryAfter = Number(body.retry_after);
	const wait = Number.isFinite(retryAfter) && retryAfter > 0 ? Math.ceil(retryAfter) : 90;
	const what =
		code === 'capacity'
			? 'Lenz is at capacity right now'
			: "Lenz's model providers are temporarily unavailable";

	return {
		message: `Lenz: ${what} — retry in ~${wait}s.`,
		description:
			`Transient (HTTP 503, code: ${code}). Nothing was charged. ` +
			`Wait ~${wait}s before submitting again: send this node's error output into a Wait node ` +
			`set to ${wait} seconds and loop it back, or re-run the workflow after the wait. ` +
			'"Retry On Fail" is not enough on its own — its tries are spaced too closely to clear the wait.',
	};
}

/**
 * Attach our wording to the error n8n is about to show, and hand back the
 * error to throw.
 *
 * The obvious `new NodeApiError(node, error, { message })` does NOT work here.
 * That constructor opens with `if (errorResponse instanceof NodeApiError)
 * return errorResponse` — and the error we catch is always already a
 * NodeApiError, because `httpRequestWithAuthentication` wraps every failure
 * before it reaches us. So the options object is silently discarded and n8n
 * falls back to its stock status text. For 503 that stock text reads "consider
 * setting this node to retry automatically", which is the opposite of the
 * advice below.
 *
 * Mutating the existing error is what actually reaches the user. Only the
 * non-NodeApiError case (a thrown plain object, or a direct `helpers.httpRequest`
 * call) needs a real constructor call.
 */
function describeApiError(
	node: INode,
	error: unknown,
	itemIndex: number,
	text: { message: string; description?: string },
	httpCode?: string,
): NodeApiError {
	if (error instanceof NodeApiError) {
		error.message = text.message;
		if (text.description !== undefined) {
			error.description = text.description;
		}
		if (httpCode !== undefined) {
			error.httpCode = httpCode;
		}
		error.context = { ...(error.context ?? {}), itemIndex };
		return error;
	}
	return new NodeApiError(node, error as JsonObject, {
		itemIndex,
		message: text.message,
		description: text.description,
		httpCode,
	});
}

// Stable fingerprint of a request body, mixed into the Idempotency-Key so the
// key follows the *input* and not just the item's position. FNV-1a: a verified
// node can't reach `crypto`, and this only has to tell two bodies apart within
// a single execution — it isn't a security boundary.
function bodyFingerprint(body?: IDataObject): string {
	const json = body === undefined ? '' : JSON.stringify(body);
	let hash = 0x811c9dc5;
	for (let i = 0; i < json.length; i++) {
		hash ^= json.charCodeAt(i);
		hash = Math.imul(hash, 0x01000193) >>> 0;
	}
	return hash.toString(36);
}

// Sources without a URL can't be cited, so they're dropped. The rest are passed
// through in full — snippet and source_name are what make a citation quotable
// rather than merely linkable.
function mapCitations(sources: IDataObject[]): IDataObject[] {
	return sources
		.filter((s) => s.url)
		.map((s) => ({
			title: s.title ?? '',
			url: s.url ?? '',
			source_name: s.source_name ?? '',
			snippet: s.snippet ?? '',
			date: s.date ?? '',
		}));
}

// A needs_input interrupt is resolvable for the two framing reasons (via the
// Select Claims operation) but not for duplicate_found, which has no offered
// claim set — so each reason gets its own next step rather than one generic
// "rephrase and re-run".
function needsInputMessage(reason?: string): string {
	if (reason === 'multi_claim') {
		return 'The text contains several distinct claims. Pick one or more of "claims" and run the Select Claims operation with this task ID.';
	}
	if (reason === 'clarification_required') {
		return 'This claim is ambiguous. Pick one of the readings in "candidates" and run the Select Claims operation with this task ID.';
	}
	if (reason === 'duplicate_found') {
		return 'A closely matching verification already exists — see "similar_claims". Reuse one of those verification IDs, or rephrase the claim to force a fresh check.';
	}
	return 'This verification needs caller input before it can continue.';
}

function mapCompletedVerification(result: IDataObject, includeAudit: boolean): IDataObject {
	const sources = (result.sources ?? []) as IDataObject[];
	const mapped: IDataObject = {
		status: 'completed',
		passed: isPassingVerdict(result.verdict as string | undefined),
		verdict: result.verdict ?? null,
		confidence: result.confidence ?? null,
		lenz_score: result.lenz_score ?? null,
		key_finding: result.key_finding ?? '',
		executive_summary: result.executive_summary ?? '',
		warnings: result.warnings ?? [],
		claim: result.claim ?? '',
		domain: result.domain ?? '',
		entities: result.entities ?? [],
		presumed_intent: result.presumed_intent ?? '',
		citations: mapCitations(sources),
		verification_id: result.verification_id ?? null,
		visibility: result.visibility ?? '',
		language: result.language ?? '',
		created_at: result.created_at ?? '',
		modified_at: result.modified_at ?? null,
	};
	if (includeAudit) {
		mapped.audit = result.audit ?? {};
	}
	return mapped;
}

/**
 * The explanatory half of a failed verification.
 *
 * failure_class is a closed set (upstream_unavailable | insufficient_evidence
 * | invalid_input | cancelled | internal); retryable is true only for
 * upstream_unavailable. Both are absent on rows written before 2026-08 —
 * explicit fields (not just the prose message) so an IF node can branch.
 *
 * Shared so a failure reads the same whether it arrives from the poll loop,
 * from Get Status, or from a stored record fetched by Get.
 */
function failureFields(record: IDataObject): IDataObject {
	const detail = record.error ?? record.failure_detail ?? record.failure_reason ?? 'unknown';
	return {
		failure_reason: record.failure_reason ?? '',
		failure_class: record.failure_class ?? '',
		retryable: record.retryable ?? null,
		message: 'Verification failed: ' + String(detail),
	};
}

// Shared by the inline Verify (Deep) poll loop and the standalone Get Verify
// Status operation, so both surface an identical shape.
function mapVerifyStatus(status: IDataObject, taskId: string, includeAudit: boolean): IDataObject {
	const state = status.status as string;

	if (state === 'completed') {
		return mapCompletedVerification((status.result ?? {}) as IDataObject, includeAudit);
	}

	if (state === 'needs_input') {
		const reason = status.reason as string | undefined;
		return {
			status: 'needs_input',
			reason: reason ?? null,
			task_id: taskId,
			claims: status.claims ?? [],
			candidates: status.candidates ?? [],
			similar_claims: status.similar_claims ?? [],
			message: needsInputMessage(reason),
		};
	}

	if (state === 'failed') {
		return { status: 'failed', task_id: taskId, ...failureFields(status) };
	}

	return {
		status: 'processing',
		task_id: taskId,
		progress: status.progress ?? {},
	};
}

export class Lenz implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Lenz',
		name: 'lenz',
		icon: { light: 'file:lenz.svg', dark: 'file:lenz.dark.svg' },
		group: ['transform'],
		version: [1, 1.1],
		subtitle: '={{$parameter["operation"]}}',
		description: 'Fact-check claims and catch AI hallucinations with sourced, audit-grade verdicts',
		defaults: {
			name: 'Lenz',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'lenzApi',
				required: true,
			},
		],
		properties: [
			// Resource + Operation (node version 1.1 and later). Version 1 keeps the
			// flat operation list it shipped with, so nodes already saved in a
			// workflow are untouched — see the legacy Operation property below.
			// `resource` only organizes the UI: every operation value is unique
			// across resources, so execute() still routes on `operation` alone.
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Ask',
						value: 'askResource',
					},
					{
						name: 'Claim',
						value: 'claim',
					},
					{
						name: 'Verification',
						value: 'verification',
					},
				],
				default: 'claim',
				displayOptions: {
					show: { '@version': [{ _cnd: { gte: 1.1 } }] },
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['claim'], '@version': [{ _cnd: { gte: 1.1 } }] },
				},
				options: [
					{
						name: 'Assess (Fast)',
						value: 'assess',
						description: 'Fast 3-model panel verdict (~10s), one entry per claim found in the text',
						action: 'Quickly assess text for factual claims',
					},
					{
						name: 'Extract Claims',
						value: 'extract',
						description: 'Pull verifiable claims out of text. Free, capped at 1000 calls per account per day, shared across your API keys (resets 00:00 UTC).',
						action: 'Extract claims from text',
					},
					{
						name: 'Verify (Deep)',
						value: 'verify',
						description: 'Full 8-model pipeline with sourced citations (~90s). Reserve for high-stakes claims.',
						action: 'Deeply verify a claim',
					},
				],
				default: 'verify',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['verification'], '@version': [{ _cnd: { gte: 1.1 } }] },
				},
				options: [
					{
						name: 'Delete',
						value: 'deleteVerification',
						description: 'Permanently delete a stored verification',
						action: 'Delete a stored verification',
					},
					{
						name: 'Get',
						value: 'getVerification',
						description: 'Retrieve a stored verification report by its ID',
						action: 'Get a stored verification',
					},
					{
						name: 'Get Many',
						value: 'listVerifications',
						description: 'Retrieve the verifications stored against this API key',
						action: 'Get many verifications',
					},
					{
						name: 'Get Status',
						value: 'verifyStatus',
						description: 'Poll a submitted verification task by its task ID',
						action: 'Get the status of a verification task',
					},
					{
						name: 'List Related',
						value: 'listRelated',
						description: 'Retrieve public verifications semantically related to a given one',
						action: 'List related verifications',
					},
					{
						name: 'Select Claims',
						value: 'select',
						description: 'Resolve a needs-input interrupt by picking which offered claims to verify',
						action: 'Select claims for a paused verification',
					},
					{
						name: 'Submit Batch',
						value: 'verifyBatch',
						description: 'Submit up to 20 claims for deep verification at once, without waiting',
						action: 'Submit a batch of claims for verification',
					},
				],
				default: 'getVerification',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['askResource'], '@version': [{ _cnd: { gte: 1.1 } }] },
				},
				options: [
					{
						name: 'Get History',
						value: 'askHistory',
						description: 'Retrieve the follow-up conversation and remaining follow-up questions',
						action: 'Get ask history for a verification',
					},
					{
						name: 'Reset History',
						value: 'resetAsk',
						description: 'Delete the follow-up conversation stored for a verification',
						action: 'Reset ask history for a verification',
					},
					{
						name: 'Send',
						value: 'ask',
						description: 'Ask a grounded follow-up question about a completed Verify (Deep) result',
						action: 'Ask a follow up question',
					},
				],
				default: 'ask',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['account'], '@version': [{ _cnd: { gte: 1.1 } }] },
				},
				options: [
					{
						name: 'Get Usage',
						value: 'usage',
						description: 'Check your account credit balance, what each operation costs, and when credits reset. Credits are per account, shared across your API keys.',
						action: 'Check usage and credits',
					},
				],
				default: 'usage',
			},
			// Legacy flat operation list — node version 1 only. Frozen at the five
			// operations that shipped in 1.x so existing workflows keep resolving
			// the value they saved.
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { '@version': [{ _cnd: { lt: 1.1 } }] },
				},
				options: [
					{
						name: 'Ask Follow-Up',
						value: 'ask',
						description: 'Ask a grounded follow-up question about a completed Verify (Deep) result',
						action: 'Ask a follow up question',
					},
					{
						name: 'Assess (Fast)',
						value: 'assess',
						description: 'Fast 3-model panel verdict (~10s), one entry per claim found in the text',
						action: 'Quickly assess text for factual claims',
					},
					{
						name: 'Check Usage',
						value: 'usage',
						description: 'Check your account credit balance, what each operation costs, and when credits reset. Credits are per account, shared across your API keys.',
						action: 'Check usage and credits',
					},
					{
						name: 'Extract Claims',
						value: 'extract',
						description: 'Pull verifiable claims out of text. Free, capped at 1000 calls per account per day, shared across your API keys (resets 00:00 UTC).',
						action: 'Extract claims from text',
					},
					{
						name: 'Verify (Deep)',
						value: 'verify',
						description: 'Full 8-model pipeline with sourced citations (~90s). Reserve for high-stakes claims.',
						action: 'Deeply verify a claim',
					},
				],
				default: 'verify',
			},
			{
				displayName: 'Claim',
				name: 'claim',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['verify'] },
				},
				description: 'The claim to investigate in depth. Reserve for high-stakes statements that warrant a thorough, sourced check.',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['assess', 'extract'] },
				},
				description: 'The text to check. If it contains several claims, each is handled separately.',
			},
			{
				displayName: 'Claims',
				name: 'batchClaims',
				placeholder: 'Add Claim',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true, multipleValueButtonText: 'Add Claim' },
				default: {},
				displayOptions: {
					show: { operation: ['verifyBatch'] },
				},
				description: 'The claims to verify, up to 20 per batch',
				options: [
					{
						name: 'claim',
						displayName: 'Claim',
						values: [
							{
								displayName: 'Text',
								name: 'text',
								type: 'string',
								typeOptions: { rows: 2 },
								default: '',
								required: true,
								description: 'The claim to investigate in depth',
							},
							{
								displayName: 'Language',
								name: 'language',
								type: 'string',
								default: '',
								placeholder: 'Es',
								description: 'Optional ISO 639-1 response language code for this claim. Falls back to the batch language.',
							},
							{
								displayName: 'Source URL',
								name: 'sourceUrl',
								type: 'string',
								default: '',
								description: 'Optional URL the claim came from, used as context when framing it',
							},
							{
								displayName: 'Visibility',
								name: 'visibility',
								type: 'options',
								options: [
									{
										name: 'Batch Default',
										value: '',
										description: 'Inherit the visibility set for the whole batch',
									},
									{
										name: 'Private',
										value: 'private',
										description: 'Only reachable with your API key',
									},
									{
										name: 'Unlisted',
										value: 'unlisted',
										description: 'Reachable by direct link, but not listed in the public library',
									},
								],
								default: '',
								description: 'Who can reach this verification once it completes',
							},
						],
					},
				],
			},
			{
				displayName: 'Verification ID',
				name: 'verificationId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'ask',
							'askHistory',
							'deleteVerification',
							'getVerification',
							'listRelated',
							'resetAsk',
						],
					},
				},
				description: 'The verification_id from a successful Verify (Deep) result. A timed-out or needs-clarification result returns a task_id instead, which won\'t work here.',
			},
			{
				displayName: 'Question',
				name: 'question',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['ask'] },
				},
				description: 'The follow-up question, answered from the verification full research and evidence',
			},
			{
				displayName: 'Task ID',
				name: 'taskId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['select', 'verifyStatus'] },
				},
				description: 'The task_id returned when the claim was submitted for verification',
			},
			{
				displayName: 'Selected Claims',
				name: 'selectedClaims',
				type: 'string',
				typeOptions: { multipleValues: true, multipleValueButtonText: 'Add Claim' },
				default: [],
				required: true,
				displayOptions: {
					show: { operation: ['select'] },
				},
				description: 'Claim texts copied verbatim from the paused task\'s "claims" or "candidates" list. Anything that was not offered is rejected, and the task expires 10 minutes after it pauses.',
			},
			{
				displayName: 'Wait for Completion',
				name: 'waitForCompletion',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: { operation: ['verify'] },
				},
				description: 'Whether to poll until the verification finishes (~90s). Turn off to return the task ID immediately and collect the result later via Get Verify Status or a webhook.',
			},
			{
				displayName: 'Include Audit Trail',
				name: 'includeAudit',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: { operation: ['getVerification', 'verify', 'verifyStatus'] },
				},
				description: 'Whether to include the panel reasoning, debate transcript, and per-panelist assessments. Adds a lot of data to each item.',
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: { operation: ['listVerifications'] },
				},
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 50,
				displayOptions: {
					show: { operation: ['listVerifications'], returnAll: [false] },
				},
				description: 'Max number of results to return',
			},
			{
				displayName: 'Limit',
				name: 'relatedLimit',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 10 },
				default: 5,
				displayOptions: {
					show: { operation: ['listRelated'] },
				},
				description: 'Max number of results to return',
			},
			{
				displayName: 'Source URL',
				name: 'sourceUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: { operation: ['verify'] },
				},
				description: 'Optional URL the claim came from, used as context when framing it',
			},
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: { operation: ['verify', 'verifyBatch'] },
				},
				description: 'Optional URL Lenz POSTs the signed result to when the pipeline finishes. Requires an HMAC secret on your API key, otherwise the call is rejected.',
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'options',
				options: [
					{
						name: 'Private',
						value: 'private',
						description: 'Only reachable with your API key',
					},
					{
						name: 'Unlisted',
						value: 'unlisted',
						description: 'Reachable by direct link, but not listed in the public library',
					},
				],
				default: 'private',
				displayOptions: {
					show: { operation: ['verify', 'verifyBatch'] },
				},
				description: 'Who can reach the verification once it completes',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				placeholder: 'Es',
				description: 'Optional ISO 639-1 response language code. Defaults to English.',
				displayOptions: {
					show: { operation: ['ask', 'assess', 'extract', 'verify', 'verifyBatch'] },
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Idempotency-Key scope. Lenz replays a cached response for a re-used key
		// for 24h, and rejects a re-used key carrying a *different* body with 422,
		// so the key has to be stable across retries of one logical call and
		// distinct between genuinely separate calls.
		//
		// Execution ID + node name + item index + a fingerprint of the body gives
		// that. n8n's "Retry On Fail" re-runs the node inside the same execution
		// with identical input, so the key repeats and the server replays instead
		// of charging twice. A fresh workflow run gets a new execution ID, so it
		// charges normally.
		//
		// The body fingerprint is what makes repeated runs safe: "Loop Over Items"
		// and AI Agent tool calls both execute this node several times within one
		// execution, each time restarting itemIndex at 0. Keyed on position alone,
		// the second run would reuse the first run's key with different text and
		// the API would reject it (422, or 409 while the first is still in flight).
		const executionId = this.getExecutionId();
		const nodeName = this.getNode().name;
		const buildIdempotencyKey = (
			operation: string,
			itemIndex: number,
			body?: IDataObject,
		): string =>
			executionId
				? `n8n:${executionId}:${nodeName}:${operation}:${itemIndex}:${bodyFingerprint(body)}`
				: '';

		// Calls the Lenz REST API with the credential's Bearer auth attached by
		// n8n. No third-party SDK — this is the required shape for a verified
		// community node (zero runtime dependencies).
		const lenzRequest = async (
			method: IHttpRequestMethods,
			path: string,
			body?: IDataObject,
			extra?: { idempotent?: { operation: string; itemIndex: number }; qs?: IDataObject },
		): Promise<IDataObject> => {
			const headers: IDataObject = {
				'User-Agent': USER_AGENT,
				'X-Lenz-API-Version': API_VERSION,
			};
			if (extra?.idempotent) {
				const key = buildIdempotencyKey(
					extra.idempotent.operation,
					extra.idempotent.itemIndex,
					body,
				);
				if (key) {
					headers['Idempotency-Key'] = key;
				}
			}
			const options: IHttpRequestOptions = {
				method,
				baseURL: BASE_URL,
				url: path,
				json: true,
				headers,
			};
			if (body !== undefined) {
				options.body = body;
			}
			if (extra?.qs !== undefined) {
				options.qs = extra.qs;
			}
			return (await this.helpers.httpRequestWithAuthentication.call(
				this,
				'lenzApi',
				options,
			)) as IDataObject;
		};

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operation = this.getNodeParameter('operation', itemIndex) as string;
				const language = (this.getNodeParameter('language', itemIndex, '') as string) || undefined;

				// List-shaped operations push their own items and `continue`, so this
				// stays undefined for them.
				let responseData: IDataObject;

				if (operation === 'verify') {
					const claim = (this.getNodeParameter('claim', itemIndex) as string).trim();
					if (!claim) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}

					const includeAudit = this.getNodeParameter('includeAudit', itemIndex, false) as boolean;
					const waitForCompletion = this.getNodeParameter(
						'waitForCompletion',
						itemIndex,
						true,
					) as boolean;
					const sourceUrl = (this.getNodeParameter('sourceUrl', itemIndex, '') as string).trim();
					const webhookUrl = (this.getNodeParameter('webhookUrl', itemIndex, '') as string).trim();
					const visibility = this.getNodeParameter('visibility', itemIndex, '') as string;

					const submitBody: IDataObject = { text: claim };
					if (language) {
						submitBody.language = language;
					}
					if (sourceUrl) {
						submitBody.source_url = sourceUrl;
					}
					if (webhookUrl) {
						submitBody.webhook_url = webhookUrl;
					}
					if (visibility) {
						submitBody.visibility = visibility;
					}
					const accepted = await lenzRequest('POST', '/verify', submitBody, {
						idempotent: { operation, itemIndex },
					});
					const taskId = (accepted.task_id as string) ?? '';
					if (!taskId) {
						// Without a task_id there is nothing to poll — fail loudly here
						// rather than letting the status URL collapse to /verify/status/
						// and surface as a confusing 404.
						throw new NodeOperationError(
							this.getNode(),
							'Lenz accepted the claim but returned no task_id, so the verification cannot be polled',
							{ itemIndex },
						);
					}

					if (!waitForCompletion) {
						responseData = {
							status: (accepted.status as string) ?? 'queued',
							task_id: taskId,
							chain_id: accepted.chain_id ?? null,
							message: 'Submitted. Poll this task_id with the Get Verify Status operation, or wait for the webhook.',
						};
					} else {
						const deadline = Date.now() + POLL_TIMEOUT_MS;
						let terminal: IDataObject | undefined;
						let pollIdx = 0;
						while (Date.now() < deadline) {
							const status = await lenzRequest('GET', `/verify/status/${taskId}`);
							const state = status.status as string;
							if (state === 'completed' || state === 'needs_input' || state === 'failed') {
								terminal = status;
								break;
							}
							const backoff = POLL_BACKOFF_MS[Math.min(pollIdx, POLL_BACKOFF_MS.length - 1)];
							await sleep(Math.min(backoff, Math.max(0, deadline - Date.now())));
							pollIdx += 1;
						}

						if (!terminal) {
							responseData = {
								status: 'timeout',
								task_id: taskId,
								message: 'The verification did not complete in time (task_id: ' + taskId + '). It may still be running server-side.',
							};
						} else {
							responseData = mapVerifyStatus(terminal, taskId, includeAudit);
						}
					}
				} else if (operation === 'verifyStatus') {
					const taskId = (this.getNodeParameter('taskId', itemIndex) as string).trim();
					if (!taskId) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					const includeAudit = this.getNodeParameter('includeAudit', itemIndex, false) as boolean;
					const status = await lenzRequest('GET', `/verify/status/${taskId}`);
					responseData = mapVerifyStatus(status, taskId, includeAudit);
				} else if (operation === 'verifyBatch') {
					const batchUi = this.getNodeParameter('batchClaims', itemIndex, {}) as IDataObject;
					const entries = ((batchUi.claim ?? []) as IDataObject[]).filter(
						(entry) => (((entry.text as string) ?? '') as string).trim() !== '',
					);
					if (!entries.length) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					if (entries.length > BATCH_MAX_CLAIMS) {
						throw new NodeOperationError(
							this.getNode(),
							`A batch can hold at most ${BATCH_MAX_CLAIMS} claims, got ${entries.length}`,
							{ itemIndex },
						);
					}

					const webhookUrl = (this.getNodeParameter('webhookUrl', itemIndex, '') as string).trim();
					const visibility = this.getNodeParameter('visibility', itemIndex, '') as string;

					const body: IDataObject = {
						claims: entries.map((entry) => {
							const claimBody: IDataObject = { text: (entry.text as string).trim() };
							const entryLanguage = (((entry.language as string) ?? '') as string).trim();
							const entrySourceUrl = (((entry.sourceUrl as string) ?? '') as string).trim();
							const entryVisibility = (((entry.visibility as string) ?? '') as string).trim();
							if (entryLanguage) {
								claimBody.language = entryLanguage;
							}
							if (entrySourceUrl) {
								claimBody.source_url = entrySourceUrl;
							}
							if (entryVisibility) {
								claimBody.visibility = entryVisibility;
							}
							return claimBody;
						}),
					};
					if (language) {
						body.language = language;
					}
					if (webhookUrl) {
						body.webhook_url = webhookUrl;
					}
					if (visibility) {
						body.visibility = visibility;
					}

					const accepted = await lenzRequest('POST', '/verify/batch', body, {
						idempotent: { operation, itemIndex },
					});
					const batchId = (accepted.batch_id as string) ?? '';
					const partial = accepted.partial === true;
					for (const spawned of (accepted.items ?? []) as IDataObject[]) {
						returnData.push({
							json: {
								batch_id: batchId,
								task_id: spawned.task_id ?? '',
								claim_text: spawned.claim_text ?? '',
								status: 'queued',
								partial,
							},
							pairedItem: { item: itemIndex },
						});
					}
					continue;
				} else if (operation === 'select') {
					const taskId = (this.getNodeParameter('taskId', itemIndex) as string).trim();
					const selected = ((this.getNodeParameter('selectedClaims', itemIndex, []) as string[]) ?? [])
						.map((text) => (text ?? '').trim())
						.filter((text) => text !== '');
					if (!taskId || !selected.length) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					if (selected.length > BATCH_MAX_CLAIMS) {
						throw new NodeOperationError(
							this.getNode(),
							`At most ${BATCH_MAX_CLAIMS} claims can be selected, got ${selected.length}`,
							{ itemIndex },
						);
					}

					const accepted = await lenzRequest(
						'POST',
						`/verify/${taskId}/select`,
						{ texts: selected },
						{ idempotent: { operation, itemIndex } },
					);
					const batchId = (accepted.batch_id as string) ?? '';
					const partial = accepted.partial === true;
					for (const spawned of (accepted.items ?? []) as IDataObject[]) {
						returnData.push({
							json: {
								batch_id: batchId,
								task_id: spawned.task_id ?? '',
								claim_text: spawned.claim_text ?? '',
								status: 'queued',
								partial,
							},
							pairedItem: { item: itemIndex },
						});
					}
					continue;
				} else if (operation === 'assess') {
					const text = (this.getNodeParameter('text', itemIndex) as string).trim();
					if (!text) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}

					const body: IDataObject = { text };
					if (language) {
						body.language = language;
					}
					const result = await lenzRequest('POST', '/assess', body, {
						idempotent: { operation, itemIndex },
					});
					const claims = (result.claims ?? []) as IDataObject[];
					if (!claims.length) {
						responseData = {
							status: result.error_code === 'ambiguous' ? 'ambiguous' : 'no_claim',
							message: result.error ?? 'No verifiable factual claim was detected.',
							candidate_claims: result.candidate_claims ?? [],
						};
					} else {
						responseData = {
							status: 'ok',
							claims: claims.map((c) => ({
								claim: c.claim ?? '',
								verdict: c.verdict ?? null,
								confidence: c.confidence ?? null,
								passed: isPassingVerdict(c.verdict as string | undefined),
								language: c.language ?? '',
								verification_url: c.verification_url ?? null,
							})),
						};
					}
				} else if (operation === 'extract') {
					const text = (this.getNodeParameter('text', itemIndex) as string).trim();
					if (!text) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}

					const body: IDataObject = { text };
					if (language) {
						body.language = language;
					}
					responseData = await lenzRequest('POST', '/extract', body, {
						idempotent: { operation, itemIndex },
					});
				} else if (operation === 'ask') {
					const verificationId = this.getNodeParameter('verificationId', itemIndex) as string;
					const question = this.getNodeParameter('question', itemIndex) as string;

					const body: IDataObject = { message: question };
					if (language) {
						body.language = language;
					}
					const reply = await lenzRequest('POST', `/ask/${verificationId}`, body);
					responseData = {
						answer: reply.content ?? '',
					};
				} else if (operation === 'askHistory') {
					const verificationId = (this.getNodeParameter('verificationId', itemIndex) as string).trim();
					if (!verificationId) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					responseData = await lenzRequest('GET', `/ask/${verificationId}`);
				} else if (operation === 'resetAsk') {
					const verificationId = (this.getNodeParameter('verificationId', itemIndex) as string).trim();
					if (!verificationId) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					responseData = await lenzRequest('DELETE', `/ask/${verificationId}`);
				} else if (operation === 'getVerification') {
					const verificationId = (this.getNodeParameter('verificationId', itemIndex) as string).trim();
					if (!verificationId) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					const includeAudit = this.getNodeParameter('includeAudit', itemIndex, false) as boolean;
					const detail = await lenzRequest('GET', `/verifications/${verificationId}`);
					// A stored record can be a failure too — reporting that as
					// `completed` with a null verdict hides why it stopped, and
					// drops the fields an IF node is supposed to branch on.
					responseData =
						detail.status === 'failed'
							? {
									status: 'failed',
									verification_id: detail.verification_id ?? verificationId,
									...failureFields(detail),
								}
							: mapCompletedVerification(detail, includeAudit);
				} else if (operation === 'deleteVerification') {
					const verificationId = (this.getNodeParameter('verificationId', itemIndex) as string).trim();
					if (!verificationId) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					responseData = await lenzRequest('DELETE', `/verifications/${verificationId}`);
				} else if (operation === 'listVerifications') {
					const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
					const limit = returnAll
						? Number.POSITIVE_INFINITY
						: (this.getNodeParameter('limit', itemIndex, 50) as number);

					let page = 1;
					let collected = 0;
					// Page until the server's reported total is covered (or the caller's
					// limit is reached). A short page also stops the loop, so a shrinking
					// result set can't spin forever.
					while (collected < limit) {
						const pageSize = returnAll ? MAX_PAGE_SIZE : Math.min(MAX_PAGE_SIZE, limit - collected);
						const response = await lenzRequest('GET', '/verifications', undefined, {
							qs: { page, page_size: pageSize },
						});
						const pageItems = (response.items ?? []) as IDataObject[];
						for (const verification of pageItems) {
							if (collected >= limit) {
								break;
							}
							returnData.push({
								json: verification,
								pairedItem: { item: itemIndex },
							});
							collected += 1;
						}
						const total = (response.total as number) ?? 0;
						if (pageItems.length < pageSize || collected >= total) {
							break;
						}
						page += 1;
					}
					continue;
				} else if (operation === 'listRelated') {
					const verificationId = (this.getNodeParameter('verificationId', itemIndex) as string).trim();
					if (!verificationId) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					const relatedLimit = this.getNodeParameter('relatedLimit', itemIndex, 5) as number;
					const response = await lenzRequest(
						'GET',
						`/verifications/${verificationId}/related`,
						undefined,
						{ qs: { limit: relatedLimit } },
					);
					for (const related of (response.items ?? []) as IDataObject[]) {
						returnData.push({
							json: related,
							pairedItem: { item: itemIndex },
						});
					}
					continue;
				} else if (operation === 'usage') {
					responseData = await lenzRequest('GET', '/me/usage');
				} else {
					throw new NodeOperationError(this.getNode(), 'Unknown operation: ' + operation, {
						itemIndex,
					});
				}

				returnData.push({
					json: responseData,
					pairedItem: { item: itemIndex },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					// This is the branch the capacity recovery pattern runs on:
					// "On Error -> Continue (using error output)" into a Wait node
					// set to the stated seconds. A bare message string gives that
					// Wait node nothing to read, so the typed fields travel with
					// it. `error` keeps its original value — existing workflows
					// reading it are unaffected.
					const json: IDataObject = { error: (error as Error).message };
					const status = statusCodeOf(error);
					if (status !== undefined) {
						json.status_code = status;
					}
					const body = responseBodyOf(error);
					if (typeof body.code === 'string' && body.code) {
						json.code = body.code;
					}
					const retryAfter = Number(body.retry_after);
					if (Number.isFinite(retryAfter) && retryAfter > 0) {
						json.retry_after = Math.ceil(retryAfter);
					}
					// The same two numbers the 402 message quotes, carried as
					// fields rather than prose. A workflow that tops up
					// automatically, or routes a small shortfall differently
					// from an empty balance, should not have to parse the
					// description to find them — that is the parsing 0.2.1
					// removed for failure_class and retryable. Checked with
					// typeof, not truthiness: a credits_remaining of 0 is the
					// case that matters most and the one truthiness drops.
					if (typeof body.cost === 'number') {
						json.cost = body.cost;
					}
					if (typeof body.credits_remaining === 'number') {
						json.credits_remaining = body.credits_remaining;
					}
					const typed = quotaMessageFor(error) ?? capacityMessageFor(error);
					if (typed) {
						json.error_message = typed.message;
						json.error_description = typed.description;
					}
					returnData.push({
						json,
						pairedItem: { item: itemIndex },
					});
					continue;
				}

				// Out of credits (HTTP 402) is a billing state, not a broken
				// request. Name it explicitly so the user is told to top up
				// rather than left reading a generic API failure.
				const quota = quotaMessageFor(error);
				if (quota) {
					throw describeApiError(this.getNode(), error, itemIndex, quota, '402');
				}

				// At capacity / providers down (HTTP 503 with a typed code) is
				// transient by contract: say so and name the stated wait, rather
				// than leaving n8n's stock 503 text — which recommends the
				// automatic retry that cannot clear a 90-120s window.
				const capacity = capacityMessageFor(error);
				if (capacity) {
					throw describeApiError(this.getNode(), error, itemIndex, capacity, '503');
				}

				// Pass the ORIGINAL error object through. NodeApiError derives
				// httpCode by searching the object it is handed, so the old
				// `{ message: ... }` wrapper — which carries no status — made
				// httpCode permanently null and left the node structurally
				// blind to 402 vs 403 vs 429. n8n's own status table (which
				// already contains '402': 'Payment required') was dead code.
				throw describeApiError(this.getNode(), error, itemIndex, {
					message: (error as Error).message,
				});
			}
		}

		return [returnData];
	}
}
