import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError, sleep } from 'n8n-workflow';

const BASE_URL = 'https://lenz.io/api/v1';

// Identifies requests coming from this node so the Lenz backend can attribute
// API usage to the n8n integration (via the User-Agent header). Keep the
// version in sync with package.json on each release.
const USER_AGENT = 'n8n-nodes-lenz/0.1.10';

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
		const detail = status.error ?? status.failure_detail ?? status.failure_reason ?? 'unknown';
		return {
			status: 'failed',
			task_id: taskId,
			message: 'Verification failed: ' + String(detail),
		};
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
						description: 'Fast 3-model panel verdict (~5-10s), one entry per claim found in the text',
						action: 'Quickly assess text for factual claims',
					},
					{
						name: 'Extract Claims',
						value: 'extract',
						description: 'Pull verifiable claims out of text (free)',
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
						description: 'Retrieve the follow-up conversation and remaining ask quota',
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
						description: 'Check remaining quota for the current API key',
						action: 'Check usage and quota',
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
						description: 'Fast 3-model panel verdict (~5-10s), one entry per claim found in the text',
						action: 'Quickly assess text for factual claims',
					},
					{
						name: 'Check Usage',
						value: 'usage',
						description: 'Check remaining quota for the current API key',
						action: 'Check usage and quota',
					},
					{
						name: 'Extract Claims',
						value: 'extract',
						description: 'Pull verifiable claims out of text (free)',
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
		// for 24h, so the key must be stable across retries of one logical call
		// but distinct between genuinely separate calls. Execution ID + node name
		// + item index gives exactly that: n8n's "Retry On Fail" re-runs the node
		// inside the same execution (same key, so the server replays instead of
		// charging twice), while a fresh run of the workflow gets a new execution
		// ID and therefore a fresh charge.
		const executionId = this.getExecutionId();
		const nodeName = this.getNode().name;
		const idempotencyKey = (operation: string, itemIndex: number): string =>
			executionId ? `n8n:${executionId}:${nodeName}:${operation}:${itemIndex}` : '';

		// Calls the Lenz REST API with the credential's Bearer auth attached by
		// n8n. No third-party SDK — this is the required shape for a verified
		// community node (zero runtime dependencies).
		const lenzRequest = async (
			method: IHttpRequestMethods,
			path: string,
			body?: IDataObject,
			extra?: { idempotencyKey?: string; qs?: IDataObject },
		): Promise<IDataObject> => {
			const headers: IDataObject = {
				'User-Agent': USER_AGENT,
				'X-Lenz-API-Version': API_VERSION,
			};
			if (extra?.idempotencyKey) {
				headers['Idempotency-Key'] = extra.idempotencyKey;
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
						idempotencyKey: idempotencyKey(operation, itemIndex),
					});
					const taskId = (accepted.task_id as string) ?? '';

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
						idempotencyKey: idempotencyKey(operation, itemIndex),
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
						{ idempotencyKey: idempotencyKey(operation, itemIndex) },
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
						idempotencyKey: idempotencyKey(operation, itemIndex),
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
						idempotencyKey: idempotencyKey(operation, itemIndex),
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
					responseData = mapCompletedVerification(detail, includeAudit);
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
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: itemIndex },
					});
					continue;
				}

				throw new NodeApiError(
					this.getNode(),
					{ message: (error as Error).message },
					{ itemIndex },
				);
			}
		}

		return [returnData];
	}
}
