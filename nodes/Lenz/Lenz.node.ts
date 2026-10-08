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

// Exported so the credential's test can assert it probes the same host the
// node calls. Without that, the two carry independent copies of the URL and a
// host change fixes every request while leaving the credential's "Test" button
// pointing at the old one.
export const BASE_URL = 'https://lenz.io/api/v1';

// Identifies requests coming from this node so the Lenz backend can attribute
// API usage to the n8n integration (via the User-Agent header). Keep the
// version in sync with package.json on each release.
const USER_AGENT = 'n8n-nodes-lenz/0.9.0';

// The Lenz API version each node version asks for, in the
// `X-Lenz-API-Version` header. Lenz answers in the shape of the version a
// request names, so a saved node keeps receiving exactly what it was built
// against: n8n stores a node's version in the workflow, and a node already in
// a workflow never moves to a newer one by itself.
//
// Node versions 1 to 1.2 ask for `2026-08-05`, which Lenz answers in the
// older shape. Version 1.3 asks for `2026-10-11`, the newer shape, and gives a
// workflow the same output keys, with the same meaning, as 1.2 does (see
// fillLegacyUsageKeys, fillExtractLegacyKeys, fillReviewLegacyKeys and
// legacyErrorBody). Only a node added from this release on is on 1.3.
//
// Lenz also signs the webhooks of a job in the version of the request that
// started it, so a Webhook URL set on a 1.3 node receives the newer shape.
// The version node versions 1 to 1.2 send, answered in the older shape.
const LEGACY_API_VERSION = '2026-08-05';

export const API_VERSION_BY_NODE_VERSION: ReadonlyArray<readonly [number, string]> = [
	[1.3, '2026-10-11'],
	[1, LEGACY_API_VERSION],
];

/** The API version a node at `typeVersion` sends. */
export function apiVersionFor(typeVersion: number | undefined): string {
	const version = typeof typeVersion === 'number' && Number.isFinite(typeVersion) ? typeVersion : 1;
	for (const [from, apiVersion] of API_VERSION_BY_NODE_VERSION) {
		if (version >= from) return apiVersion;
	}
	return API_VERSION_BY_NODE_VERSION[API_VERSION_BY_NODE_VERSION.length - 1][1];
}

// Verify (Deep) is async server-side: submit returns a task_id, then we poll
// the status endpoint until it reaches a terminal state. Backoff mirrors the
// Lenz API's recommended 2s/4s/8s cadence, capped by the overall deadline.
//
// The default wait is 300s. It was 120s, which a real run proved too short
// (lenzhq/Lenz#889): a verification finished in Lenz with a verdict, the credits
// were taken, and the node had already given up and returned `timeout`. Lenz's
// own measurements put a standard-depth run at about 90s median — standard
// being this node's default depth — with the tail past 120s, and a split panel
// adds an escalation round of up to 60s on top. 300s clears that with margin.
//
// This is a ceiling, not a duration: a verification that finishes in 60s
// returns in 60s either way. Raising it changes only the slow tail, from
// "charged, no result" to "result".
//
// It deliberately changes EXISTING workflows too, not only new nodes. n8n does
// not save a parameter left at its default — verified: a Max Wait of 120 is
// dropped from the saved node, a Max Wait of 300 is kept — so every node that
// never touched Max Wait picks this up on upgrade. That was a decision, not a
// side effect: versioning exists so behaviour does not change under people, but
// the behaviour here was abandoning paid verifications, and a new node version
// would have left every existing workflow still doing it.
export const POLL_TIMEOUT_MS = 300000;
const POLL_BACKOFF_MS = [2000, 4000, 8000];

// The Max Wait contract, enforced where the value is consumed rather than only
// in the widget — an expression bypasses the widget entirely.
const MAX_WAIT_FLOOR_SECONDS = 10;
const MAX_WAIT_CEILING_SECONDS = 900;

// A poll failure carrying no HTTP status is unclassifiable: a DNS failure, a
// TLS error and a bug in the request layer all look the same. Retry a couple of
// times in case it is a blip, then let it surface — retrying it for the whole
// window and reporting a timeout would invent a fact and discard the error.
const MAX_UNCLASSIFIED_POLL_RETRIES = 2;

/**
 * Sleep the backoff for the next poll, clamped to what is left of the deadline.
 *
 * Returns false when the deadline is spent, which is the caller's signal to
 * stop polling. Shared by the success and retry paths so the two cannot drift
 * onto different schedules.
 *
 * `overrideMs` lets a caller substitute a server-stated wait for the ladder —
 * used for 429, where the limiter has told us when it reopens and our own
 * 2/4/8s cadence would just re-trip it. Still clamped to the deadline, so a
 * long stated wait ends the polling rather than overrunning Max Wait.
 */
async function waitForNextPoll(
	pollIdx: number,
	deadline: number,
	overrideMs?: number,
): Promise<boolean> {
	const remaining = deadline - Date.now();
	if (remaining <= 0) {
		return false;
	}
	const backoff =
		overrideMs !== undefined
			? overrideMs
			: POLL_BACKOFF_MS[Math.min(pollIdx, POLL_BACKOFF_MS.length - 1)];
	await sleep(Math.min(backoff, remaining));
	return true;
}

/**
 * The sentence that tells a caller a paid-for verification is still out there.
 *
 * Shared by both throw paths in the item catch. They build different error
 * types and sit forty lines apart, which is exactly how two copies of one
 * sentence end up telling a user two different things about their money.
 */
function submittedReceipt(taskId: string): string {
	return (
		`A verification for this item was submitted and charged before this failed — ` +
		`its task ID is ${taskId}. It may still be running; fetch the result with ` +
		`Get Verify Status rather than resubmitting.`
	);
}

/**
 * The wait a refusal asked for, in SECONDS, or undefined.
 *
 * The name carries the unit because the two are one keystroke apart and the ms
 * wrapper below is the only other caller. Wiring this into a sleep that expects
 * milliseconds turns a stated 45-second reset into a 45ms one and hammers the
 * limiter for the whole window.
 *
 * Several spellings because the API has used several: `retry_after` (every
 * 503, and every refusal in the current shape), `reset_in_seconds` (a 429
 * rate-limit body) and `retry_after_seconds` (the in-flight caps). `retry_after`
 * is read first. A value that is absent,
 * non-numeric or non-positive returns undefined so the caller falls back to its
 * own backoff — a stated wait of 0 is not a reason to hammer.
 */
function statedWaitSeconds(body: IDataObject): number | undefined {
	// Several spellings, one meaning: `retry_after` first, then the older
	// `reset_in_seconds` of a 429 rate-limit body. Read from the BODY and never
	// from a header — the API sends `Retry-After` on a 429, but by the time the
	// error reaches this node the header is gone. n8n's
	// httpRequestWithAuthentication wraps every failure in a NodeApiError, and
	// that constructor keeps the parsed body (on `context.data`) and the status
	// while discarding `response` entirely. Verified against n8n-workflow:
	// walking the caught error finds no header anywhere on it. A header
	// fallback here would be code that can never run.
	// And `retry_after_seconds`, the older spelling of the per-account in-flight
	// cap on /review and /citecheck (429 review_in_flight / citecheck_in_flight).
	for (const raw of [body.retry_after, body.reset_in_seconds, body.retry_after_seconds]) {
		const seconds = Number(raw);
		if (Number.isFinite(seconds) && seconds > 0) {
			return Math.ceil(seconds);
		}
	}
	return undefined;
}

/** The same wait in MILLISECONDS, for the poll loop's backoff override. */
function statedRetryAfterMs(error: unknown): number | undefined {
	const seconds = statedWaitSeconds(responseBodyOf(error));
	return seconds === undefined ? undefined : seconds * 1000;
}

/**
 * Bound a stated wait to something a poll loop can afford to honour.
 *
 * Declared beside its only caller's intent rather than inline: the ceiling is
 * the point, not an implementation detail. See MAX_STATED_POLL_WAIT_SECONDS.
 */
function cappedPollWaitMs(ms: number | undefined): number | undefined {
	if (ms === undefined) return undefined;
	return Math.min(ms, MAX_STATED_POLL_WAIT_SECONDS * 1000);
}

// Above this, telling someone to park a workflow in a Wait node is bad advice
// rather than good advice with a long number in it. The /extract daily cap
// resets at 00:00 UTC, so `reset_in_seconds` can be into the tens of
// thousands; a Wait node set to that holds an execution open for most of a
// day. Under it — a burst limit clearing in seconds or minutes — the Wait-node
// loop is exactly right, which is why the threshold exists rather than a flat
// rule either way.
const WAIT_NODE_VIABLE_SECONDS = 300;

/**
 * Whether a 429 came from Lenz's own rate limiter rather than something in
 * front of it.
 *
 * A CDN, a WAF, a reverse proxy or an egress throttle answers 429 with no Lenz
 * body at all. Telling that user their Lenz plan is too small — and pointing
 * them at a billing page — names the wrong cause and sells a fix for a problem
 * they do not have.
 *
 * ONE answer, used everywhere: by the message's headline, by its advice, and by
 * which fields the error output carries. It used to be decided separately in
 * each, which is how a Lenz 429 that lacked `code` got Lenz's own text as the
 * headline and "this limit is not Lenz's own" in the same message. So it keys
 * on a Lenz-shaped body — the typed code, or any field of the documented
 * `{ detail, code, limit, reset_in_seconds, upgrade_url }` — rather than on
 * `code` alone. A proxy that returns its own JSON `detail` will read as Lenz;
 * that is the unavoidable edge, and it errs toward the more useful message.
 */
function isLenzRateLimit(body: IDataObject): boolean {
	if (body.code === 'rate_limited') return true;
	return ['detail', 'reset_in_seconds', 'upgrade_url', 'limit'].some(
		(k) => body[k] !== undefined && body[k] !== null && body[k] !== '',
	);
}

/**
 * Build the user-facing text for a rate-limit rejection, or undefined if this
 * error isn't one.
 *
 * HTTP 429, body `{ detail, code, limit, reset_in_seconds, upgrade_url }`. The
 * one users actually meet is the /extract daily cap: Extract Claims is free
 * and capped per account per day, so it is the refusal most workflows will hit
 * and the only one here that costs nothing to have triggered.
 *
 * Deliberately NOT worded like the 503. Both are "come back later", but a 503
 * clears in ~90s and a daily cap clears at midnight UTC, so the same advice
 * would be right in one case and absurd in the other.
 */
function rateLimitMessageFor(error: unknown): { message: string; description: string } | undefined {
	if (statusCodeOf(error) !== 429) return undefined;

	const body = responseBodyOf(error);
	// The in-flight cap is about how many reviews or citation checks run AT ONCE
	// on the account (three), not about the plan: upgrade advice would name the
	// wrong fix. The node already waits and resubmits on it, so reaching this
	// message means the wait ran out with all three still running.
	if (body.code === 'review_in_flight' || body.code === 'citecheck_in_flight') {
		const what = body.code === 'review_in_flight' ? 'reviews' : 'citation checks';
		const wait = statedWaitSeconds(body) ?? 60;
		return {
			message: `Lenz: this account already has ${IN_FLIGHT_CAP} ${what} running — retry when one finishes.`,
			description:
				`HTTP 429 (${body.code}). Nothing was charged. Lenz runs at most ${IN_FLIGHT_CAP} ${what} at a time ` +
				`per account; this is not a plan limit. The node waited for a slot and none opened in time. ` +
				`Send fewer items through at once, or send this node's error output into a Wait node with ` +
				`Wait Amount ${wait} and Wait Unit set to Seconds (it defaults to Hours), then loop it back.`,
		};
	}
	const isLenzLimit = isLenzRateLimit(body);
	const rawDetail = typeof body.detail === 'string' ? body.detail.trim() : '';
	const detail =
		rawDetail ||
		(isLenzLimit ? 'Rate limit reached.' : 'The request was rate limited before it reached Lenz.');
	const wait = statedWaitSeconds(body);
	const limit = isLenzLimit && typeof body.limit === 'number' ? body.limit : undefined;
	const upgradeUrl = typeof body.upgrade_url === 'string' ? body.upgrade_url : PLANS_URL;

	// Minutes and hours, not four- or five-digit seconds. `reset_in_seconds`
	// for a daily cap is a number nobody can read at a glance.
	const readable =
		wait === undefined
			? undefined
			: wait < 120
				? `${wait}s`
				: wait < 7200
					? `${Math.round(wait / 60)} minutes`
					: `${Math.round(wait / 3600)} hours`;

	// `detail` is free text from the server and may or may not end in terminal
	// punctuation — "Daily extract cap reached." and "Rate limit exceeded" are
	// both plausible. Appending blind runs two sentences together in the
	// node's headline. (An empty-string detail is handled above, by falling
	// back rather than trusting typeof: `typeof '' === 'string'` is true, and
	// it rendered a headline of "Lenz: .")
	const sentence = /[.!?]$/.test(detail) ? detail : `${detail}.`;
	const message = readable ? `Lenz: ${sentence} Resets in ~${readable}.` : `Lenz: ${sentence}`;

	let description = `Rate limited (HTTP 429). Nothing was charged`;
	// `limit` without its window is ambiguous — 60 could be per minute or in
	// total, and the API does not say which — so it is reported as the stated
	// value rather than described as an allowance.
	description += limit === undefined ? '. ' : `, and the stated limit is ${limit}. `;
	// Upgrade advice only for Lenz's own limiter. A 429 from a CDN, WAF or proxy
	// in front of Lenz is not lifted by a Lenz plan, so pointing that user at
	// Lenz billing names the wrong fix — the headline already says the request
	// never reached Lenz, and the advice must not then contradict it. This used
	// to gate the headline and `limit` on isLenzLimit but not this line.
	const raiseCap = isLenzLimit ? `, or raise the cap: ${upgradeUrl}` : '';
	if (wait !== undefined && wait <= WAIT_NODE_VIABLE_SECONDS) {
		// The unit is spelled out because n8n's Wait node defaults its Wait Unit
		// to HOURS (n8n-nodes-base Wait.node: `unit`, `default: 'hours'`). Told
		// only "set it to {{ $json.retry_after }}", someone who leaves the unit
		// alone turns a 45-second limit into a 45-hour wait — in the one
		// recovery pattern this node recommends.
		description +=
			`Wait ~${readable} and submit again: send this node's error output into a Wait node ` +
			`with Wait Amount {{ $json.retry_after }} and Wait Unit set to Seconds ` +
			`(it defaults to Hours), then loop it back.`;
	} else if (wait !== undefined) {
		// Too long to wait inside a workflow. Not because a Wait node holds a
		// worker — n8n offloads long waits — but because the execution sits
		// pending that long, where an execution timeout or a Cloud duration
		// limit can cancel it before the limit clears.
		//
		// The duration is stated, not assumed. This branch covers every wait
		// over WAIT_NODE_VIABLE_SECONDS, which spans a ten-minute burst limit as
		// well as a day-long cap; it used to say "pending for hours" for all of
		// them, which is false for the first.
		description +=
			`That is too long to wait inside a workflow: the execution would stay pending for ~${readable}, ` +
			`where an execution timeout or a Cloud duration limit can cancel it before the limit clears. ` +
			`Re-run the workflow after the reset, or schedule it for then${raiseCap}.`;
	} else {
		description += isLenzLimit
			? `Retry later${raiseCap}.`
			: `Retry later. This limit is not Lenz's own, so a Lenz plan change will not lift it — ` +
				`check any proxy, firewall or rate limit between n8n and Lenz.`;
	}

	return { message, description };
}

// Reviews (and, separately, citation checks) one account may have running at
// once; a fourth submit is refused 429 review_in_flight / citecheck_in_flight
// with retry_after_seconds (lenz/review/service.py REVIEW_MAX_IN_FLIGHT).
const IN_FLIGHT_CAP = 3;
// How long a submit refused for the in-flight cap may wait for a slot before
// the item fails. A review takes two to four minutes, so this covers one
// finishing; the stated wait (60s) paces the retries.
const IN_FLIGHT_WAIT_BUDGET_MS = 5 * 60 * 1000;
// A 409 idempotency_conflict means the same request is still being created:
// "retry shortly". Bounded, because it should clear in seconds.
const CONFLICT_RETRY_DELAY_MS = 3000;
// Ten tries over ~30s: a conflict means the same request is mid-creation, and
// giving up early is what invites a resubmit that would be charged twice.
const CONFLICT_MAX_RETRIES = 10;
// Max Wait for Review Draft and Check Citations. A contract from the first
// release: n8n does not save a parameter left at its default, so this value is
// what every saved review node reads. The property defaults and the execute
// fallback both read it, so they cannot drift apart.
const JOB_MAX_WAIT_DEFAULT_SECONDS = 600;
// How many earlier accepted IDs a hard failure names (see earlierJobsNote).
const EARLIER_JOBS_SHOWN = 100;

// Server-side cap on POST /verify/batch and POST /verify/{task_id}/select.
const BATCH_MAX_CLAIMS = 20;

// Server-side cap on the /extract `focus` hint. Measured after whitespace is
// collapsed and enforced by rejection, never truncation — a silently shortened
// focus returns a subset the caller did not ask for and gives them no way to
// notice.
const MAX_FOCUS_CHARS = 300;

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
	// Truthiness on the trimmed value, not typeof: `typeof '' === 'string'`, so
	// an empty detail passed straight through and produced a headline of
	// "Lenz: ".
	const detail =
		(typeof body.detail === 'string' ? body.detail.trim() : '') || 'No remaining Lenz credits.';
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
	if (code !== 'capacity' && code !== 'upstream_unavailable' && code !== 'citations_unavailable') {
		return undefined;
	}

	const retryAfter = Number(body.retry_after);
	const wait = Number.isFinite(retryAfter) && retryAfter > 0 ? Math.ceil(retryAfter) : 90;
	const what =
		code === 'capacity'
			? 'Lenz is at capacity right now'
			: code === 'citations_unavailable'
				? 'citation checking is switched off for a moment'
				: "Lenz's model providers are temporarily unavailable";

	return {
		message: `Lenz: ${what} — retry in ~${wait}s.`,
		description:
			`Transient (HTTP 503, code: ${code}). Nothing was charged. ` +
			`Wait ~${wait}s before submitting again: send this node's error output into a Wait node ` +
			`set to ${wait} seconds — Wait Unit: Seconds, since it defaults to Hours — and loop it back, ` +
			`or re-run the workflow after the wait. ` +
			'"Retry On Fail" is not enough on its own — its tries are spaced too closely to clear the wait.',
	};
}

/**
 * A 409 idempotency_conflict the node gave up retrying: the same request is
 * still being created, and the node could not learn its ID.
 *
 * Never advise a re-run: re-running an execution in n8n gives it a new
 * execution ID, the Idempotency-Key is built from it, and Lenz would start and
 * charge a second job. Lenz holds the conflicting request for up to fifteen
 * minutes (its async lock TTL), so "a minute" would be wrong too.
 */
function conflictMessageFor(error: unknown): { message: string; description: string } | undefined {
	if (statusCodeOf(error) !== 409) return undefined;
	const body = responseBodyOf(error);
	if (body.code !== 'idempotency_conflict') return undefined;
	// Only Review Draft and Check Citations retry a conflict first (submitJob
	// marks the error); any other operation gets it on its first try, and may
	// have created no job at all.
	const retried = (error as { lenzConflictRetried?: boolean })?.lenzConflictRetried === true;
	return {
		message: 'Lenz: this request is still being processed from an earlier attempt.',
		description:
			'HTTP 409 (idempotency_conflict). Nothing new was charged. An earlier attempt of this exact request ' +
			'is still holding it, for up to 15 minutes; it may still be running, or it may have failed. ' +
			(retried
				? 'The node already retried for ~30 seconds, and automatic retries are spaced too closely to outlast ' +
					'the hold. Check your Lenz account for the job before sending this input again: '
				: 'Wait before sending it again: ') +
			'a new or re-run execution counts as a new request and would be charged again if the first went through.',
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

// Stable fingerprint of a request, mixed into the Idempotency-Key so the key
// follows the *input* and not just the item's position. FNV-1a: a verified
// node can't reach `crypto`, and this only has to tell two requests apart
// within a single execution — it isn't a security boundary.
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
function mapCitations(sources: unknown): IDataObject[] {
	// Guarded rather than cast. A verification is paid for and finished by the
	// time this runs, so throwing here would fail the item *after* the money was
	// spent — over a malformed citation, of all things. A `sources` that is not
	// a list, or a list with a null in it, costs the caller that entry and
	// nothing else.
	if (!Array.isArray(sources)) return [];
	return sources
		.filter((s): s is IDataObject => typeof s === 'object' && s !== null && !!(s as IDataObject).url)
		.map((s) => ({
			title: s.title ?? '',
			url: s.url ?? '',
			source_name: s.source_name ?? '',
			snippet: s.snippet ?? '',
			date: s.date ?? '',
		}));
}

// The claims a paused task offers, passed through as the API sent them. Only
// an option that arrives without `text` (the newer shape names it `claim`) gets
// `text` filled in from `claim`, so a workflow reading `text` keeps resolving.
function offeredClaims(raw: unknown): IDataObject[] {
	if (!Array.isArray(raw)) return [];
	return raw.map((entry) => {
		const option = asObject(entry);
		return entry && typeof entry === 'object' && option.text === undefined && option.claim !== undefined
			? { ...option, text: option.claim }
			: (entry as IDataObject);
	});
}

// The one needs_input reason is multi_claim, resolved with the Select Claims
// operation. Any other reason gets a generic message rather than a next step
// the API may not honour.
function needsInputMessage(reason?: string): string {
	if (reason === 'multi_claim') {
		return 'The text contains several distinct claims. Pick one or more of "claims" and run the Select Claims operation with this task ID.';
	}
	return 'This verification needs caller input before it can continue.';
}

// "Nothing here can be checked" has had three spellings: `no_checkable_claim`
// (current), `not_a_claim` (Verify, Extract) and `no_claim` (Assess). Any of
// them means the same thing.
const NO_CHECKABLE_CODES = ['no_checkable_claim', 'not_a_claim', 'no_claim'];

function asObject(value: unknown): IDataObject {
	return value && typeof value === 'object' && !Array.isArray(value) ? (value as IDataObject) : {};
}

function asText(value: unknown): string {
	return typeof value === 'string' ? value : '';
}

function isNoCheckable(value: unknown): boolean {
	return typeof value === 'string' && NO_CHECKABLE_CODES.includes(value);
}

/**
 * `modified_at` as this node has always emitted it: the finish time when it
 * fell on a later UTC calendar day than `created_at`, else null. A body that
 * carries `modified_at` is passed through untouched. A body that carries only
 * `completed_at` (the newer shape) has it derived here.
 */
function modifiedAtOf(result: IDataObject): string | null {
	if ('modified_at' in result) return (result.modified_at as string | null | undefined) ?? null;
	const created = Date.parse(asText(result.created_at));
	const completed = Date.parse(asText(result.completed_at));
	if (!Number.isFinite(created) || !Number.isFinite(completed)) return null;
	const day = (ms: number) => new Date(ms).toISOString().slice(0, 10);
	return day(completed) > day(created) ? asText(result.completed_at) : null;
}

function mapCompletedVerification(result: IDataObject, includeAudit: boolean): IDataObject {
	const sources = result.sources;
	const mapped: IDataObject = {
		status: 'completed',
		passed: isPassingVerdict(result.verdict as string | undefined),
		verdict: result.verdict ?? null,
		confidence: result.confidence ?? null,
		lenz_score: result.lenz_score ?? null,
		key_finding: result.key_finding ?? '',
		executive_summary: result.executive_summary ?? '',
		// A suggested rewrite of `claim` that the verification's findings
		// support. It has NOT been verified itself: a person reviews it before
		// using it. The API sends null for a true claim, when no correction is
		// established, and on verifications that predate the field (where the
		// key is absent); all of those read '' here, like key_finding, so an IF
		// node's "is empty" holds either way. The name matches the API, both
		// SDKs and the Zapier app, and is a public contract: never rename it.
		suggested_rewrite: typeof result.suggested_rewrite === 'string' ? result.suggested_rewrite : '',
		warnings: result.warnings ?? [],
		claim: result.claim ?? '',
		domain: result.domain ?? '',
		entities: result.entities ?? [],
		presumed_intent: result.presumed_intent ?? '',
		citations: mapCitations(sources),
		verification_id: result.verification_id ?? null,
		visibility: result.visibility ?? '',
		// The depth this verdict was actually PRODUCED with, which is not
		// always the depth that was requested: a low request served from an
		// existing standard verdict reads 'standard' here and is still
		// charged the low price. Surfaced because without it there is no way
		// to tell how much evidence is behind the answer.
		depth: result.depth ?? '',
		language: result.language ?? '',
		created_at: result.created_at ?? '',
		modified_at: modifiedAtOf(result),
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
	// A body with a `failure` block { code, detail, failure_class, retryable }
	// is read from the block first; every other body is read exactly as before,
	// from its top-level fields. `??` throughout: an empty string is a value.
	const failure = asObject(record.failure);
	const code = failure.code ?? record.failure_reason;
	const detail =
		failure.detail ?? record.error ?? record.failure_detail ?? record.failure_reason ?? code ?? 'unknown';
	return {
		// The block's word for nothing-to-check is `no_checkable_claim`; this
		// node has always said `not_a_claim` there, and workflows branch on it.
		failure_reason: code === 'no_checkable_claim' ? 'not_a_claim' : (code ?? ''),
		failure_class: failure.failure_class ?? record.failure_class ?? '',
		retryable: failure.retryable ?? record.retryable ?? null,
		message: 'Verification failed: ' + String(detail),
		// True when the input held nothing that can be checked.
		not_a_claim: isNoCheckable(code),
	};
}

/**
 * Whether an /assess answer says nothing in the input can be checked: the
 * top-level `status`, a top-level `error_code` or `failure.code`, or (for a
 * list) every row failing with that code.
 */
function nothingCheckable(result: IDataObject, rows: IDataObject[]): boolean {
	if (
		isNoCheckable(result.status) ||
		isNoCheckable(result.error_code) ||
		isNoCheckable(asObject(result.failure).code)
	) {
		return true;
	}
	return (
		rows.length > 0 &&
		rows.every((row) => isNoCheckable(asObject(row.failure).code) || isNoCheckable(row.error_code))
	);
}

// Shared by the inline Verify (Deep) poll loop and the standalone Get Verify
// Status operation, so both surface an identical shape.
function mapVerifyStatus(status: IDataObject, taskId: string, includeAudit: boolean): IDataObject {
	const state = status.status as string;

	if (state === 'completed') {
		return mapCompletedVerification((status.result ?? {}) as IDataObject, includeAudit);
	}

	// Every non-verdict terminal carries `passed: null`. None of them HAS a
	// verdict, and a workflow branching on `{{ $json.passed }}` reads a missing
	// key and a null one identically — as false — so an interrupt or a failed
	// pipeline reports "this claim did not pass" for a claim nobody checked.
	// Null does not fix that (it is still falsy); what it fixes is that the key
	// now appears in n8n's output schema for every one of these states, so the
	// case is visible when the workflow is built rather than in production.
	// Routing correctly means checking `status` first — see the README gate.
	if (state === 'needs_input') {
		const reason = status.reason as string | undefined;
		return {
			status: 'needs_input',
			passed: null,
			reason: reason ?? null,
			task_id: taskId,
			claims: offeredClaims(status.claims),
			// Deprecated: always empty. The API no longer sends either field;
			// both keys stay so saved workflows that read them keep working.
			candidates: [],
			similar_claims: [],
			message: needsInputMessage(reason),
		};
	}

	if (state === 'failed') {
		return { status: 'failed', passed: null, task_id: taskId, ...failureFields(status) };
	}

	return {
		status: 'processing',
		passed: null,
		task_id: taskId,
		progress: mapProgress(status.progress),
	};
}

// The progress fields a workflow may see, and nothing else.
//
// This used to spread `status.progress` through verbatim. The API endpoint was
// inherited from the consumer progress page and nothing shaped it, so what
// came through included `content` — the accumulated evidence pool with full
// untruncated source quotes and every panelist's reasoning — and
// `step_stats`, Lenz's own per-step cost in EUR. Neither was ever part of the
// contract, and both landed on customer canvases as mappable fields.
//
// A whitelist is the fix that survives the next upstream change: whatever the
// API adds to `progress` from here on, it does not reach a workflow until
// someone adds it here on purpose. zapier-lenz already forwards its fields
// this way, which is why it never had the exposure.
//
// Tolerates both shapes the API has emitted: the current
// `{step, index, total, elapsed_seconds, poll_after_seconds}`, and the older
// one where `step` was the only field worth having. Absent fields are absent,
// not null — a workflow branching on `progress.index` should see it missing
// rather than find a null that looks like a value.
const PROGRESS_FIELDS = ['step', 'index', 'total', 'elapsed_seconds', 'poll_after_seconds'] as const;

function mapProgress(progress: unknown): IDataObject {
	if (!progress || typeof progress !== 'object' || Array.isArray(progress)) return {};
	const source = progress as IDataObject;
	const mapped: IDataObject = {};
	for (const key of PROGRESS_FIELDS) {
		if (source[key] !== undefined) {
			mapped[key] = source[key];
		}
	}
	return mapped;
}

// The wait a `processing` response asks for before the next poll, in ms, or
// undefined to keep the node's own backoff.
//
// It rides in the body rather than a Retry-After header on purpose: a
// Retry-After on a 200 is off-spec and a proxy may strip it.
//
// Out-of-range is treated as ABSENT, not clamped. That is the API owner's own
// instruction, in lenzhq/n8n-nodes-lenz#37: "Treat an out-of-range value as
// absent and keep your own backoff." A stated 0 would be a hot loop and a
// stated hour would outrun Max Wait; falling back to the ladder over-polls
// rather than under-polls, which is the failure mode that cannot lose a
// verdict.
//
// The same ceiling now bounds a poll 429. It used to have none, on the
// reasoning that "a limiter stating 90s means 90s" — which held only while
// 429 waits were assumed to be seconds. They are not: the /extract daily cap
// states `reset_in_seconds` up to a full day. Unbounded, one 429 on the first
// poll of an already-charged Verify slept the entire remaining Max Wait in a
// single sleep, polled once at the deadline, and reported `timeout` for a
// verification that had finished minutes in. Respecting a limiter is not worth
// losing the thing the caller paid for; over-polling a limiter that answers
// 429 costs nothing, because a 429 is retried rather than thrown.
const MAX_STATED_POLL_WAIT_SECONDS = 60;

function statedPollAfterMs(progress: unknown): number | undefined {
	if (!progress || typeof progress !== 'object') return undefined;
	const seconds = Number((progress as IDataObject).poll_after_seconds);
	if (!Number.isFinite(seconds) || seconds <= 0 || seconds > MAX_STATED_POLL_WAIT_SECONDS) {
		return undefined;
	}
	return Math.ceil(seconds) * 1000;
}

// A review or a citation check, as the node hands it on: the API's own body,
// plus `passed` for an IF node — true only for a completed `clean` outcome,
// null until there is an outcome, like Verify's.
function withPassed(job: IDataObject): IDataObject {
	const filled = fillReviewLegacyKeys(job);
	return { passed: filled.status === 'completed' ? filled.outcome === 'clean' : null, ...filled };
}

// The word the older review and citation-check bodies use for nothing-to-check
// is `no_claim`; the newer one is `no_checkable_claim`.
const legacyCode = (code: unknown): unknown => (code === 'no_checkable_claim' ? 'no_claim' : code);

/**
 * A review or citation check in the newer shape, given the keys the older shape
 * carries, so a workflow reading them finds them. Only an ABSENT key is filled,
 * so an older-shape body passes through untouched; the newer shape's own keys
 * stay too.
 *
 *  - every `failure` block gets `failure_reason` (from `code`);
 *  - `summary.claim_limit_reached` (claims found >= the limit) and
 *    `summary.citation_limit_reached` (citations found > the limit);
 *  - each claim's `assessment` gets `error_code` (from `failure`), `hint`
 *    (null) and `identified_claims` (from `more_claims`);
 *  - each claim's `verification` gets `modified_at` (see modifiedAtOf).
 */
function fillReviewLegacyKeys(body: IDataObject): IDataObject {
	const fillFailures = (node: unknown): void => {
		if (Array.isArray(node)) {
			node.forEach(fillFailures);
			return;
		}
		if (!node || typeof node !== 'object') return;
		const obj = node as IDataObject;
		const failure = obj.failure;
		if (failure && typeof failure === 'object' && !Array.isArray(failure)) {
			const block = failure as IDataObject;
			if (!('failure_reason' in block) && typeof block.code === 'string') {
				block.failure_reason = legacyCode(block.code) as string;
			}
		}
		Object.values(obj).forEach(fillFailures);
	};
	fillFailures(body);

	const summary = asObject(body.summary);
	const count = (value: unknown): number | undefined =>
		typeof value === 'number' ? value : undefined;
	if (body.summary && typeof body.summary === 'object' && !Array.isArray(body.summary)) {
		if (!('claim_limit_reached' in summary) && 'claim_limit_exceeded' in summary) {
			const found = count(summary.claims_found);
			const limit = count(summary.claim_limit);
			summary.claim_limit_reached =
				found !== undefined && limit !== undefined
					? found >= limit
					: (summary.claim_limit_exceeded as boolean | null);
		}
		if (!('citation_limit_reached' in summary) && 'citation_limit_exceeded' in summary) {
			const found = count(summary.citations_found);
			const limit = count(summary.citation_limit);
			summary.citation_limit_reached =
				found !== undefined && limit !== undefined
					? found > limit
					: (summary.citation_limit_exceeded as boolean | null);
		}
	}

	if (Array.isArray(body.claims)) {
		for (const entry of body.claims) {
			const claim = asObject(entry);
			const assessment = claim.assessment;
			if (assessment && typeof assessment === 'object' && !Array.isArray(assessment)) {
				const row = assessment as IDataObject;
				const failure = asObject(row.failure);
				if (!('error_code' in row)) {
					row.error_code = typeof failure.code === 'string' ? (legacyCode(failure.code) as string) : null;
				}
				// A review row's own hint, which the newer shape dropped: Lenz
				// stores none for the rows a review checks (a failed row's hint
				// is its failure block's, which stays where it is).
				if (!('hint' in row)) row.hint = null;
				if (!('identified_claims' in row)) {
					row.identified_claims = (row.more_claims as IDataObject[] | undefined) ?? [];
				}
			}
			const verification = claim.verification;
			if (verification && typeof verification === 'object' && !Array.isArray(verification)) {
				const record = verification as IDataObject;
				if (!('modified_at' in record) && 'completed_at' in record) {
					record.modified_at = modifiedAtOf(record);
				}
			}
		}
	}
	return body;
}

/**
 * An /extract answer in the newer shape (`claims: [{ claim, positions }]`),
 * given the keys the older shape carries: `claim` (the first claim, or ''),
 * `identified_claims` (every claim when there are several, else []),
 * `candidate_claims` (always []) and `locations` (every claim with its
 * positions when every claim has them, else null), and `status` in the older
 * word: `not_a_claim` where the newer shape says `no_checkable_claim`.
 * Older-shape bodies (they carry `claim`) are left untouched.
 */
function fillExtractLegacyKeys(body: IDataObject): void {
	if (!Array.isArray(body.claims) || 'claim' in body || 'identified_claims' in body) return;
	const claims = body.claims.filter((entry) => entry && typeof entry === 'object').map((entry) => asObject(entry));
	const texts = claims.map((c) => asText(c.claim));
	if (body.status === 'no_checkable_claim') body.status = 'not_a_claim';
	body.claim = texts[0] ?? '';
	body.identified_claims = texts.length > 1 ? texts : [];
	body.candidate_claims = [];
	body.locations =
		claims.length && claims.every((c) => Array.isArray(c.positions))
			? claims.map((c, i) => ({ claim: texts[i], positions: c.positions }))
			: null;
}

// The per-capability blocks of the older /me/usage shape, in the order it
// sent them: each capability's share of the credit pool at that capability's
// price. `used` is derived as total - remaining, as Lenz derives it.
const USAGE_BLOCKS = ['verify', 'ask', 'assess'] as const;
const DEFAULT_COSTS: Record<(typeof USAGE_BLOCKS)[number], number> = { verify: 10, ask: 1, assess: 1 };

/**
 * A /me/usage answer in the newer shape (the credit pool, `credits`, and the
 * prices, `costs`), given the keys the older shape carries: `quota_resets_at`
 * (= `credits.resets_at`), `credits.bonus` (= `credits.extra`) and the
 * `verify`, `ask` and `assess` blocks. Returned as a new object in the older
 * key order; an older-shape body (it carries `quota_resets_at`) is returned
 * as it is.
 */
function fillLegacyUsageKeys(body: IDataObject): IDataObject {
	const pool = body.credits;
	if ('quota_resets_at' in body || !pool || typeof pool !== 'object' || Array.isArray(pool)) return body;
	const credits = pool as IDataObject;
	const whole = (value: unknown): number => (typeof value === 'number' && Number.isFinite(value) ? value : 0);
	const costs = asObject(body.costs);
	const block = (capability: (typeof USAGE_BLOCKS)[number]): IDataObject => {
		const priced = whole(costs[capability]);
		const cost = priced > 0 ? priced : DEFAULT_COSTS[capability];
		const total = Math.floor(whole(credits.total) / cost);
		const remaining = Math.floor(whole(credits.remaining) / cost);
		const extra = Math.floor(whole(credits.extra) / cost);
		return {
			quota_used: Math.max(0, total - remaining),
			quota_total: total,
			quota_remaining: remaining,
			bonus: extra,
			credits: extra,
			remaining,
		};
	};
	const out: IDataObject = {};
	for (const [key, value] of Object.entries(body)) {
		if (key === 'credits') {
			out.quota_resets_at = credits.resets_at ?? null;
			const legacyCredits: IDataObject = {};
			for (const [k, v] of Object.entries(credits)) {
				if (k === 'resets_at' && !('bonus' in credits)) legacyCredits.bonus = credits.extra ?? 0;
				legacyCredits[k] = v;
			}
			if (!('bonus' in legacyCredits)) legacyCredits.bonus = credits.extra ?? 0;
			out.credits = legacyCredits;
		} else if (key === 'extract') {
			for (const capability of USAGE_BLOCKS) {
				if (!(capability in body)) out[capability] = block(capability);
			}
			out[key] = value;
		} else {
			out[key] = value;
		}
	}
	for (const capability of USAGE_BLOCKS) {
		if (!(capability in out)) out[capability] = block(capability);
	}
	return out;
}

/**
 * A refusal answered in the newer shape, rewritten IN PLACE as the older shape
 * (legacyErrorBody), so everything that reads the error afterwards (the
 * messages, the error output's fields, the retry logic) sees what a version
 * 1.2 node sees. n8n has already built the error's `description` from the
 * body; where it did, it is rebuilt the same way from the rewritten body.
 */
function readAsLegacyError(node: INode, error: unknown, method: string, path: string): void {
	const status = statusCodeOf(error);
	const body = responseBodyOf(error);
	if (status === undefined || status < 400 || !Object.keys(body).length) return;
	const legacy = legacyErrorBody(status, body, method, path.split('?')[0]);
	const before = bodyDescription(node, body, status);
	for (const key of Object.keys(body)) delete body[key];
	Object.assign(body, legacy);
	const e = error as { description?: string | null };
	if (before !== undefined && e && typeof e === 'object' && e.description === before) {
		e.description = bodyDescription(node, legacy, status) ?? null;
	}
}

/** The description n8n derives from an error body, if it finds one. */
function bodyDescription(node: INode, body: IDataObject, status: number): string | undefined {
	const derived = new NodeApiError(node, { ...body } as JsonObject, { httpCode: String(status) })
		.description;
	return typeof derived === 'string' && derived ? derived : undefined;
}

// Codes the newer shape sends where the older error carried no `code`
// (outside /review and /citecheck, which always sent one).
const CODELESS = new Set([
	'not_authenticated',
	'not_found',
	'idempotency_body_mismatch',
	'idempotency_conflict',
	'malformed_body',
	'method_not_allowed',
	'validation_error',
	'blank_input',
	'unsupported_language',
	'too_many_items',
	'internal_error',
	'invalid_request',
]);

// Codes whose older refusal repeated the code as `error`.
const ERROR_ECHO_CODES = new Set([
	'framing_failed',
	'extraction_failed',
	'ask_failed',
	'private_claim',
	'invalid_selection',
	'no_selection_pending',
]);

const isReviewFamily = (path: string): boolean =>
	path === '/review' ||
	path.startsWith('/reviews/') ||
	path === '/citecheck' ||
	path.startsWith('/citechecks/');

/** `from` renamed to `to` when only the newer name is there. */
function renameKey(o: IDataObject, from: string, to: string): void {
	if (from in o && !(to in o)) {
		o[to] = o[from];
		delete o[from];
	}
}

/** The older names of a wait and a docs link. */
function legacyWaitAndLink(o: IDataObject, status: number): void {
	const code = o.code;
	if (status === 429 && code === 'extract_daily_limit') renameKey(o, 'retry_after', 'reset_in_seconds');
	if (status === 429 && (code === 'review_in_flight' || code === 'citecheck_in_flight')) {
		renameKey(o, 'retry_after', 'retry_after_seconds');
	}
	if (status === 402 || status === 429 || status === 503) renameKey(o, 'docs_url', 'doc_url');
}

/** A field validation item in the older order: `type`, `loc`, `msg`, then the rest. */
function validationItem(item: unknown): unknown {
	if (!item || typeof item !== 'object' || Array.isArray(item)) return item;
	const from = item as IDataObject;
	const out: IDataObject = {};
	for (const key of ['type', 'loc', 'msg']) if (key in from) out[key] = from[key];
	for (const [key, value] of Object.entries(from)) if (!(key in out)) out[key] = value;
	return out;
}

/**
 * An error body in the newer shape (`{ detail, code, errors? }` on every
 * refusal), read as the older shape the node was built on, so every field and
 * message it shows keeps its older value. Only what the newer shape alone
 * sends is rewritten, by endpoint; an older-shape body comes back unchanged.
 *
 *  - outside /review and /citecheck: no `errors` list; no `code` where the
 *    older error had none; a schema error's `detail` is the list of field
 *    items; Assess's blank list item is `blank_item`; a blank claim's older
 *    sentence; `error` repeating the code where the older body had it;
 *  - /review and /citecheck: field items `{ loc, msg }`, a schema error's
 *    `detail` spelled from the field's path, a blank text or an unsupported
 *    language on /review is `validation_error` (the language one with its
 *    `language: ` prefix);
 *  - waits and links by their older names (`reset_in_seconds`,
 *    `retry_after_seconds`, `doc_url`); a citation check's 402 states its
 *    balance as `credits_remaining` (one credit a citation).
 */
export function legacyErrorBody(
	status: number,
	body: IDataObject,
	method: string,
	path: string,
): IDataObject {
	const out: IDataObject = { ...body };
	const code = typeof out.code === 'string' ? out.code : '';
	const errors = Array.isArray(out.errors) ? (out.errors as unknown[]) : null;
	const firstLoc = (): unknown => asObject(errors?.[0]).loc;
	if (isReviewFamily(path)) {
		if (code === 'not_authenticated') delete out.code;
		if (status === 422) {
			const detail = out.detail;
			if (method === 'POST' && path === '/review' && typeof detail === 'string') {
				if (code === 'blank_input' || code === 'unsupported_language') {
					out.code = 'validation_error';
					if (code === 'unsupported_language' && !detail.startsWith('language: ')) {
						out.detail = `language: ${detail}`;
					}
				}
			}
			if (errors) {
				const first = errors.find((e) => e && typeof e === 'object') as IDataObject | undefined;
				const loc = first?.loc;
				if (Array.isArray(loc) && loc[1] === 'payload' && typeof first?.msg === 'string') {
					out.detail = `${loc.slice(1).join('.')}: ${first.msg}`;
				}
				out.errors = errors.map((item) => {
					if (!item || typeof item !== 'object' || Array.isArray(item)) return item;
					const from = item as IDataObject;
					const o: IDataObject = {};
					if ('loc' in from) o.loc = from.loc;
					if ('msg' in from) {
						o.msg = from.msg === detail && out.detail !== detail ? out.detail : from.msg;
					}
					return o;
				}) as IDataObject[];
			} else if (code === 'idempotency_body_mismatch') {
				out.errors = [{ loc: ['header'], msg: out.detail }] as IDataObject[];
			}
		}
		if (
			status === 402 &&
			method === 'POST' &&
			path === '/citecheck' &&
			!('credits_remaining' in out) &&
			typeof out.remaining === 'number'
		) {
			out.credits_remaining = out.remaining;
		}
		legacyWaitAndLink(out, status);
		return out;
	}
	if (status === 422 && code === 'blank_input' && path === '/assess') {
		const loc = firstLoc();
		if (Array.isArray(loc) && (loc as unknown[]).includes('claims')) {
			out.code = 'blank_item';
			delete out.errors;
			return out;
		}
	}
	// A batch item's unsupported language named its item in `detail`.
	if (status === 422 && code === 'unsupported_language' && path === '/verify/batch') {
		const loc = firstLoc();
		const detail = out.detail;
		if (Array.isArray(loc) && loc[1] === 'claims' && typeof loc[2] === 'number') {
			const prefix = `claims[${loc[2]}].`;
			if (typeof detail === 'string' && !detail.startsWith(prefix)) out.detail = prefix + detail;
		}
	}
	const schemaItems =
		status === 422 &&
		code === 'validation_error' &&
		errors !== null &&
		errors.length > 0 &&
		errors.every(
			(e) =>
				e && typeof e === 'object' && typeof (e as IDataObject).type === 'string' && (e as IDataObject).type !== code,
		);
	if (schemaItems && errors) {
		const legacy: IDataObject = { detail: errors.map(validationItem) as IDataObject[] };
		for (const [key, value] of Object.entries(out)) {
			if (key === 'detail' || key === 'code' || key === 'errors') continue;
			legacy[key === 'docs_url' ? 'doc_url' : key] = value;
		}
		return legacy;
	}
	// A blank claim: the older sentence named the field the older body sent.
	if (status === 422 && code === 'blank_input' && typeof out.detail === 'string') {
		const loc = firstLoc();
		const field = Array.isArray(loc) ? loc[loc.length - 1] : undefined;
		if ((path === '/verify' || path === '/assess') && field === 'claim') {
			out.detail = 'Text is required.';
		} else if (/^\/verify\/[^/]+\/select$/.test(path) && field === 'claims') {
			out.detail = 'texts is required and must be non-empty.';
		}
	}
	// Assess sent `too_many_items`; Ask sent no code for an unfinished
	// verification.
	const codeless =
		(CODELESS.has(code) && !(code === 'too_many_items' && path === '/assess')) ||
		(code === 'verification_not_ready' && path.startsWith('/ask/'));
	if (codeless) delete out.code;
	delete out.errors;
	legacyWaitAndLink(out, status);
	// These refusals repeated their code as `error`, right after it.
	if (ERROR_ECHO_CODES.has(code) && !('error' in out)) {
		const echoed: IDataObject = {};
		for (const [key, value] of Object.entries(out)) {
			echoed[key] = value;
			if (key === 'code') echoed.error = value;
		}
		return echoed;
	}
	return out;
}

// The review policy (`escalate`) from the node's Options, sending only what
// the user set: an omitted key takes the API's own default.
function reviewPolicy(
	options: IDataObject,
	fail: (message: string) => never,
): IDataObject | undefined {
	const policy: IDataObject = {};
	// A multi-select arrives as an array; an expression may hand over a string,
	// so "False, Mixed" is read as a list rather than silently dropped.
	// An empty SELECTION ([]) is a valid policy, and a deliberate one:
	// verdicts [] with confidence ['low'] deep-checks only by confidence. An
	// expression that resolves to nothing ('' or null) is not: it reads like a
	// missing field, and sending [] would silently switch deep checks off.
	// Only an option never added (undefined) takes the API's default.
	const list = (raw: unknown, label: string): string[] | undefined => {
		if (raw === undefined) return undefined;
		if (raw === null || raw === '') fail(`${label} resolved to an empty value`);
		const items = Array.isArray(raw) ? raw : String(raw).split(',');
		// null / undefined entries first: String() would turn them into
		// 'null' / 'undefined', which survive the blank check.
		const cleaned = items
			.filter((v) => v !== null && v !== undefined)
			.map((v) => String(v).trim())
			.filter(Boolean);
		// ' ' or ',' from an expression is as empty as '': only a real selection
		// may be empty.
		// A deliberate empty selection is []; a non-empty list that cleans to
		// nothing (['', ' ']) can only come from an expression.
		if (!cleaned.length && (!Array.isArray(raw) || raw.length > 0)) {
			fail(`${label} resolved to an empty value`);
		}
		return cleaned;
	};
	// An empty or non-numeric expression is refused, never sent as null: the
	// API would read null as "use the default", and the default for deep checks
	// is 5, about 50 credits, where the user may have meant 0.
	const count = (raw: unknown, label: string, min: number, max: number): number | undefined => {
		if (raw === undefined) return undefined;
		const n = Number(raw);
		if (raw === '' || raw === null || !Number.isInteger(n) || n < min || n > max) {
			fail(`${label} must be a whole number from ${min} to ${max}`);
		}
		return n;
	};
	const verdicts = list(options.verdicts, 'Deep-Check Verdicts');
	if (verdicts) policy.verdicts = verdicts;
	const confidence = list(options.confidence, 'Deep-Check Confidence');
	if (confidence) policy.confidence = confidence;
	const maxAssessments = count(options.maxAssessments, 'Max Quick Checks', 0, 20);
	if (maxAssessments !== undefined) policy.max_assessments = maxAssessments;
	const maxVerifications = count(options.maxVerifications, 'Max Deep Checks', 0, 20);
	if (maxVerifications !== undefined) policy.max_verifications = maxVerifications;
	if (typeof options.depth === 'string' && options.depth) policy.depth = options.depth;
	const maxCitations = count(options.maxCitations, 'Max Citations', 0, 20);
	if (maxCitations !== undefined) policy.max_citations = maxCitations;
	if (options.suggestEdits !== undefined) policy.suggest_edits = Boolean(options.suggestEdits);
	return Object.keys(policy).length ? policy : undefined;
}

const AUTHENTICATION_OPTIONS = [
	{
		name: 'OAuth',
		value: 'oAuth2',
		description:
			'Sign in with your Lenz account; n8n registers itself with Lenz automatically, no API key needed',
	},
	{
		name: 'API Key',
		value: 'apiKey',
		description: 'Paste a Lenz API key',
	},
];

export class Lenz implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Lenz',
		name: 'lenz',
		icon: { light: 'file:lenz.svg', dark: 'file:lenz.dark.svg' },
		group: ['transform'],
		version: [1, 1.1, 1.2, 1.3],
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
				displayOptions: { show: { authentication: ['apiKey'] } },
			},
			{
				name: 'lenzOAuth2Api',
				required: true,
				displayOptions: { show: { authentication: ['oAuth2'] } },
			},
		],
		properties: [
			// Authentication. Two copies of one parameter, never shown together.
			// n8n does not save a parameter left at its default, so a node saved
			// on 1 or 1.1 has no `authentication` value and reads the default of
			// the copy for ITS version: API key, which is what it always used.
			// Changing that default would move every existing node off its key.
			// A node added from 1.2 on starts on OAuth instead.
			//
			// The versions are LITERAL lists, not `_cnd` ranges like the rest of
			// this file: n8n's credential window builds its API key / OAuth
			// chooser by matching `@version` with a plain `includes`, so a range
			// matches nothing and the chooser disappears. A new version must be
			// added to the second list by hand. The VALUE
			// `oAuth2` is saved in workflows and never changes; the label is free.
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				noDataExpression: true,
				options: AUTHENTICATION_OPTIONS,
				default: 'apiKey',
				displayOptions: { show: { '@version': [1, 1.1] } },
			},
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				noDataExpression: true,
				options: AUTHENTICATION_OPTIONS,
				default: 'oAuth2',
				displayOptions: { show: { '@version': [1.2, 1.3] } },
			},
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
						name: 'Review',
						value: 'review',
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
						description: 'Fast 3-model panel verdict (~15s), one entry per claim found in the text',
						action: 'Quickly assess text for factual claims',
					},
					{
						name: 'Extract Claims',
						value: 'extract',
						description: 'Pull verifiable claims out of text, or out of a public web page given its URL. Free, capped at 1000 calls per account per day, shared across your API keys (resets 00:00 UTC).',
						action: 'Extract claims from text',
					},
					{
						name: 'Verify (Deep)',
						value: 'verify',
						description: 'Multi-model pipeline with sourced citations (~90s). Reserve for high-stakes claims.',
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
					show: { resource: ['review'], '@version': [{ _cnd: { gte: 1.1 } }] },
				},
				options: [
					{
						name: 'Check Citations',
						value: 'checkCitations',
						description:
							'Check whether each cited source says what the text says it does: the links and DOIs in a text, or statement-source pairs you list. 1 credit per citation checked.',
						action: 'Check citations',
					},
					{
						name: 'Get Citation Check',
						value: 'getCitationCheck',
						description: 'Retrieve a citation check by its ID',
						action: 'Get a citation check',
					},
					{
						name: 'Get Review',
						value: 'getReview',
						description: 'Retrieve a review by its ID',
						action: 'Get a review',
					},
					{
						name: 'Review Draft',
						value: 'reviewDraft',
						description:
							'Review a whole draft: find its claims, quick-check them, deep-check the doubtful ones and optionally check its citations',
						action: 'Review a draft',
					},
				],
				default: 'reviewDraft',
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
						description: 'Retrieve the verifications stored in your Lenz account',
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
					{
						name: 'Get Webhook Secret',
						value: 'webhookSecret',
						description:
							'OAuth connections only: the secret Lenz signs this connection\'s webhook deliveries with. Run it once before using a Webhook URL; an API key\'s secret is on lenz.io/api-credentials.',
						action: 'Get the webhook signing secret',
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
						description: 'Fast 3-model panel verdict (~15s), one entry per claim found in the text',
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
						description: 'Pull verifiable claims out of text, or out of a public web page given its URL. Free, capped at 1000 calls per account per day, shared across your API keys (resets 00:00 UTC).',
						action: 'Extract claims from text',
					},
					{
						name: 'Verify (Deep)',
						value: 'verify',
						description: 'Multi-model pipeline with sourced citations (~90s). Reserve for high-stakes claims.',
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
				// Labelled "Claim" — a document is text, a claim is a claim. The
				// parameter NAME stays `text`: it is the key saved workflows persist,
				// so renaming it would break every existing Assess node.
				displayName: 'Claim',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['assess'] },
				},
				description: 'The claim to check. If it contains several claims, each is assessed separately.',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['extract'] },
				},
				description:
					"The text to pull the verifiable claims out of, or a single public web page URL. Lenz reads the page, or a YouTube video's transcript, and extracts the claims from its first 50,000 characters; pages behind a login can't be read. A URL call typically takes 5-40 seconds.",
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
								// Labelled "Claim"; the NAME stays `text` because saved
								// workflows persist it (see the Assess field above).
								displayName: 'Claim',
								name: 'text',
								type: 'string',
								typeOptions: { rows: 2 },
								default: '',
								required: true,
								description: 'The claim to investigate in depth',
							},
							{
								displayName: 'Depth',
								name: 'depth',
								type: 'options',
								options: [
									{
										name: 'Batch Default',
										value: '',
										description: 'Inherit the depth set for the whole batch',
									},
									{
										name: 'Low',
										value: 'low',
										description: 'Half the credits — fewer sources, no recovery fetch tiers, and the debate stops after the opening arguments',
									},
									{
										name: 'Standard',
										value: 'standard',
										description: 'The full pipeline, at the full price',
									},
								],
								default: '',
								description: 'How much work this claim gets. Each claim is priced on its own depth, so one batch can mix the two and pay 5 for some claims and 10 for others.',
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
										description: 'Only reachable with your Lenz credential',
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
				description: 'The verification_id from a successful Verify (Deep) result. A timed-out or needs-input result returns a task_id instead, which won\'t work here.',
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
				description: 'Claim texts copied verbatim from the paused task\'s "claims" list. Anything that was not offered is rejected, and a paused task stays open for 24 hours from submission.',
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
				displayName: 'Max Wait (Seconds)',
				name: 'maxWaitSeconds',
				type: 'number',
				// A literal, and it must stay equal to POLL_TIMEOUT_MS / 1000. It
				// cannot be written as that expression: n8n's node-param-default-
				// missing lint only recognises a literal default. The two copies are
				// held together by a test instead ('agrees with the fallback the
				// node applies'), because a default that drifted from the
				// execute-time fallback would mean the UI promised one wait and the
				// node applied another.
				default: 300,
				typeOptions: { minValue: 10, maxValue: 900 },
				displayOptions: {
					show: { operation: ['verify'], waitForCompletion: [true] },
				},
				description:
					'The longest to keep polling before giving up and returning Status "timeout" with the task ID. It is a ceiling, not a delay: a verification that finishes sooner returns as soon as it does. A standard-depth run is about 90s but can run past two minutes, which is why this defaults to 300. Giving up never cancels anything: the task keeps running server-side and stays fetchable with Get Verify Status, so the credits are not lost. Lower it only if the workflow cannot afford to block this long.',
			},
			// ── Review / Check Citations ─────────────────────────────────────
			{
				displayName: 'Draft',
				name: 'draft',
				type: 'string',
				typeOptions: { rows: 6 },
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['reviewDraft'] },
				},
				description:
					'The draft to review, up to 50,000 characters (longer text is cut and reported as input_truncated), or one public http(s) URL to read it from',
			},
			{
				displayName: 'Input',
				name: 'citationInput',
				type: 'options',
				options: [
					{
						name: 'Statement-Source Pairs',
						value: 'pairs',
						description: 'Up to 20 statements, each with the URL or DOI it cites',
					},
					{
						name: 'Text',
						value: 'text',
						description: 'A text with its links, DOIs or [n] markers and a reference list',
					},
				],
				default: 'text',
				displayOptions: {
					show: { operation: ['checkCitations'] },
				},
			},
			{
				displayName: 'Text',
				name: 'citationText',
				type: 'string',
				typeOptions: { rows: 6 },
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['checkCitations'], citationInput: ['text'] },
				},
				description:
					'The text to check, up to 50,000 characters, with its citations: markdown links, bare URLs, doi: and doi.org forms, or [n] markers with a reference list',
			},
			{
				displayName: 'Pairs',
				name: 'citationPairs',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				placeholder: 'Add Pair',
				default: {},
				displayOptions: {
					show: { operation: ['checkCitations'], citationInput: ['pairs'] },
				},
				description: 'Statements and the source each one cites: a URL or a DOI, not both',
				options: [
					{
						name: 'pair',
						displayName: 'Pair',
						values: [
							{
								displayName: 'DOI',
								name: 'doi',
								type: 'string',
								default: '',
								placeholder: '10.1038/nature12373',
								description: 'The cited DOI alone. Leave empty when the source is a URL.',
							},
							{
								displayName: 'Statement',
								name: 'statement',
								type: 'string',
								default: '',
								description: 'The sentence that cites the source, at most 1,000 characters',
							},
							{
								displayName: 'URL',
								name: 'url',
								type: 'string',
								default: '',
								placeholder: 'https://example.com/article',
								description: 'The cited page. Leave empty when the source is a DOI.',
							},
						],
					},
				],
			},
			{
				displayName: 'Max Citations',
				name: 'maxCitations',
				type: 'number',
				default: 20,
				typeOptions: { minValue: 1, maxValue: 20 },
				displayOptions: {
					show: { operation: ['checkCitations'], citationInput: ['text'] },
				},
				description:
					"How many of the text's citations to check, in the order they appear. 1 credit each; the rest are listed in more_citations.",
			},
			{
				displayName: 'Options',
				name: 'citationOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: { operation: ['checkCitations'] },
				},
				options: [
					{
						// Inside Options, not top level, and 600 by default: a review takes two
						// to four minutes before deep checks, citations or suggested edits.
						// n8n does not save a parameter left at its default, so this value is
						// a contract from the first release: decided here, never moved.
						displayName: 'Max Wait (Seconds)',
						name: 'maxWaitSeconds',
						type: 'number',
						default: JOB_MAX_WAIT_DEFAULT_SECONDS,
						typeOptions: { minValue: 10, maxValue: 900 },
						description:
							'With Wait for Completion on: the longest to keep polling before returning Status "timeout" with the ID. A ceiling, not a delay. Giving up never cancels the job; fetch it later with its Get operation.',
					},
					{
						displayName: 'Webhook URL',
						name: 'webhookUrl',
						type: 'string',
						default: '',
						description:
							'URL Lenz POSTs the signed result to when it finishes. It needs a signing secret: with an API key, set one on lenz.io/api-credentials; with OAuth, run Account → Get Webhook Secret first.',
					},
				],
			},
			{
				displayName: 'Review ID',
				name: 'reviewId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['getReview'] },
				},
				description: 'The review_id Review Draft returned',
			},
			{
				displayName: 'Issues Only',
				name: 'issuesOnly',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: { operation: ['getReview'] },
				},
				description:
					'Whether to leave out claims[] and citations[] and return only the issues, failures and summary',
			},
			{
				displayName: 'Citation Check ID',
				name: 'citecheckId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['getCitationCheck'] },
				},
				description: 'The citecheck_id Check Citations returned',
			},
			{
				// Same parameter name as Verify's, its own copy: a review runs for
				// minutes, not ~90s, and the help says so.
				displayName: 'Wait for Completion',
				name: 'waitForCompletion',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: { operation: ['reviewDraft', 'checkCitations'] },
				},
				description:
					'Whether to poll until it finishes. Turn off to return the ID immediately and collect the result later with Get Review / Get Citation Check, or a webhook.',
			},
			{
				displayName: 'Options',
				name: 'reviewOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: { operation: ['reviewDraft'] },
				},
				options: [
					{
						displayName: 'Deep-Check Confidence',
						name: 'confidence',
						type: 'multiOptions',
						options: [
							{ name: 'High', value: 'high' },
							{ name: 'Low', value: 'low' },
							{ name: 'Medium', value: 'medium' },
						],
						default: ['low'],
						description:
							'Quick-check confidence levels that get a deep check (alongside the verdicts below). Default: low.',
					},
					{
						displayName: 'Deep-Check Verdicts',
						name: 'verdicts',
						type: 'multiOptions',
						options: [
							{ name: 'False', value: 'False' },
							{ name: 'Mixed', value: 'Mixed' },
							{ name: 'Mostly False', value: 'Mostly False' },
							{ name: 'Mostly True', value: 'Mostly True' },
							{ name: 'True', value: 'True' },
						],
						default: ['False', 'Mostly False', 'Mixed'],
						description: 'Quick-check verdicts that get a deep check. Default: False, Mostly False, Mixed.',
					},
					{
						displayName: 'Depth',
						name: 'depth',
						type: 'options',
						options: [
							{ name: 'Standard', value: 'standard', description: '10 credits per deep check' },
							{
								name: 'Low',
								value: 'low',
								description: 'Fewer sources, no rebuttal round: 5 credits per deep check',
							},
						],
						default: 'standard',
						description: 'Depth of every deep check',
					},
					{
						displayName: 'Max Citations',
						name: 'maxCitations',
						type: 'number',
						default: 0,
						typeOptions: { minValue: 0, maxValue: 20 },
						description:
							"How many of the draft's citations to check, in order: does each source say what the draft attributes to it? 1 credit each. 0 (the default) skips the citation check.",
					},
					{
						displayName: 'Max Deep Checks',
						name: 'maxVerifications',
						type: 'number',
						default: 5,
						typeOptions: { minValue: 0, maxValue: 20 },
						description: 'At most this many claims get a deep check (10 credits each at standard depth)',
					},
					{
						displayName: 'Max Quick Checks',
						name: 'maxAssessments',
						type: 'number',
						default: 20,
						typeOptions: { minValue: 0, maxValue: 20 },
						description:
							"How many of the draft's claims, most check-worthy first, get a quick verdict (1 credit each). 0 checks only the citations.",
					},
					{
						// Inside Options, not top level, and 600 by default: a review takes two
						// to four minutes before deep checks, citations or suggested edits.
						// n8n does not save a parameter left at its default, so this value is
						// a contract from the first release: decided here, never moved.
						displayName: 'Max Wait (Seconds)',
						name: 'maxWaitSeconds',
						type: 'number',
						default: JOB_MAX_WAIT_DEFAULT_SECONDS,
						typeOptions: { minValue: 10, maxValue: 900 },
						description:
							'With Wait for Completion on: the longest to keep polling before returning Status "timeout" with the ID. A ceiling, not a delay. Giving up never cancels the job; fetch it later with its Get operation.',
					},
					{
						displayName: 'Suggest Edits',
						name: 'suggestEdits',
						type: 'boolean',
						default: false,
						description:
							'Whether to add, for each claim with a suggested rewrite, the smallest edits to the draft that make it say what the rewrite says. No extra credits, but the review takes longer. Not verified themselves.',
					},
					{
						displayName: 'Webhook URL',
						name: 'webhookUrl',
						type: 'string',
						default: '',
						description:
							'URL Lenz POSTs the signed result to when it finishes. It needs a signing secret: with an API key, set one on lenz.io/api-credentials; with OAuth, run Account → Get Webhook Secret first.',
					},
				],
			},
			{
				displayName: 'Include Audit Trail',
				name: 'includeAudit',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: { operation: ['getVerification', 'verify', 'verifyStatus'] },
				},
				description: 'Whether to include the panel reasoning, debate transcript, and per-panelist assessments. Adds a lot of data to each item. At Low depth the transcript carries no rebuttals, because that round does not run.',
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
				description: 'Optional URL Lenz POSTs the signed result to when the pipeline finishes. It needs a signing secret, otherwise the call is rejected: with an API key, set one on lenz.io/api-credentials; with OAuth, run Account → Get Webhook Secret once for this connection (and again after reconnecting, which starts the connection without one).',
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'options',
				options: [
					{
						name: 'Private',
						value: 'private',
						description: 'Only reachable with your Lenz credential',
					},
					{
						name: 'Unlisted',
						value: 'unlisted',
						description: 'Reachable by direct link, but not listed in the public library',
					},
				],
				default: 'private',
				displayOptions: {
					show: { operation: ['verify', 'verifyBatch', 'reviewDraft'] },
				},
				description: 'Who can reach the verification once it completes',
			},
			{
				displayName: 'Depth',
				name: 'depth',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 'low',
						description: 'Half the credits. Searches fewer sources, skips the recovery fetch tiers and stops the debate after the opening arguments, so it answers sooner with less evidence behind the verdict.',
					},
					{
						name: 'Standard',
						value: 'standard',
						description: 'The full pipeline, and the default',
					},
				],
				default: 'standard',
				displayOptions: {
					show: { operation: ['verify', 'verifyBatch'] },
				},
				description: 'How much work the check does. Low costs half the credits — 5 against 10 — and runs the same models at every step it runs: it searches fewer sources, skips the recovery fetch tiers and stops the debate after the opening arguments. You are charged for the depth you request, so a Low request served from an existing standard verdict still costs 5 and returns Depth "standard".',
			},
			{
				displayName: 'Focus',
				name: 'focus',
				type: 'string',
				default: '',
				placeholder: 'Market size, growth and competitors',
				displayOptions: {
					show: { operation: ['extract'] },
				},
				description: 'Optional hint that narrows the result to the claims it describes, at most 300 characters. It only selects from the claims the extractor already found — it cannot add one, reword one, or change what counts as a claim. When nothing matches, Status comes back as no_match with an empty list; the unfocused claims are never substituted. Costs no extra credits.',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				placeholder: 'Es',
				description: 'Optional ISO 639-1 response language code. Defaults to English.',
				displayOptions: {
					show: {
						operation: ['ask', 'assess', 'extract', 'verify', 'verifyBatch', 'reviewDraft', 'checkCitations'],
					},
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
		// Execution ID + node name + item index + a fingerprint of the request
		// (its path and its body) gives that. n8n's "Retry On Fail" re-runs the
		// node inside the same execution with identical input, so the key repeats
		// and the server replays instead of charging twice. A fresh workflow run
		// gets a new execution ID, so it charges normally.
		//
		// The request fingerprint is what makes repeated runs safe: "Loop Over
		// Items" and AI Agent tool calls both execute this node several times
		// within one execution, each time restarting itemIndex at 0. Keyed on
		// position alone, the second run would reuse the first run's key with
		// different text and the API would reject it (422, or 409 while the first
		// is still in flight). The path belongs in the fingerprint for the same
		// reason the body does: Ask Follow-Up and Select Claims carry the thing
		// they act on in the URL, so asking one question of two verifications is
		// two identical bodies and must not be one key.
		// The node's identity is HASHED into the key, never written into it raw.
		// Node refuses to send a header value containing anything above U+00FF —
		// verified: `Prüfung` and `Vérification` are accepted (Latin-1 passes),
		// while `Lenz ✅`, `検証` and `Проверка` throw ERR_INVALID_CHAR. So a node
		// named in Cyrillic, Greek, Hebrew, Arabic, any CJK script, or with an
		// emoji failed every billable POST before the request left the machine,
		// with an error naming the header rather than the node.
		//
		// Hashing rather than trusting the id makes that structural: the id is
		// normally a UUID, but it comes from the workflow JSON and a hand-edited
		// or third-party-generated file can carry anything, which would bring the
		// same crash back from a new direction. It also keeps a node named after
		// a customer or project off the wire, and preferring the id means a
		// rename mid-execution no longer changes the key. `||`, not `??`: an
		// empty-string id must fall through to the name, or two nodes would
		// collapse onto one key — the collision 0.2.0 was released to fix.
		const executionId = this.getExecutionId();
		const node = this.getNode();
		const nodeKey = bodyFingerprint({ node: node.id || node.name });
		// The fingerprint covers the PATH as well as the body. Select Claims puts
		// its task_id in the URL (`/verify/{task_id}/select`) and sends only the
		// chosen texts in the body — so fingerprinting the body alone gave two
		// paused tasks that offered the same claim text the same key, and Lenz
		// replayed the first task's response for the second. Two different
		// requests to two different resources cannot share an idempotency key;
		// the path is what tells them apart.
		const buildIdempotencyKey = (
			operation: string,
			itemIndex: number,
			path: string,
			body?: IDataObject,
		): string =>
			executionId
				? `n8n:${executionId}:${nodeKey}:${operation}:${itemIndex}:${bodyFingerprint({ path, body })}`
				: '';

		// Calls the Lenz REST API with the credential's Bearer auth attached by
		// n8n. No third-party SDK — this is the required shape for a verified
		// community node (zero runtime dependencies).
		// Read once: the credential is per node, not per item.
		const credentialType =
			(this.getNodeParameter('authentication', 0, 'apiKey') as string) === 'oAuth2'
				? 'lenzOAuth2Api'
				: 'lenzApi';
		// Read once, like the credential: one node, one API version.
		const apiVersion = apiVersionFor(node.typeVersion);
		const lenzRequest = async (
			method: IHttpRequestMethods,
			path: string,
			body?: IDataObject,
			extra?: { idempotent?: { operation: string; itemIndex: number }; qs?: IDataObject },
		): Promise<IDataObject> => {
			const headers: IDataObject = {
				'User-Agent': USER_AGENT,
				'X-Lenz-API-Version': apiVersion,
			};
			if (extra?.idempotent) {
				const key = buildIdempotencyKey(
					extra.idempotent.operation,
					extra.idempotent.itemIndex,
					path,
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
			const send = async () =>
				(await this.helpers.httpRequestWithAuthentication.call(
					this,
					credentialType,
					options,
				)) as IDataObject;
			// Versions 1 to 1.2 get the older shape already: their errors pass
			// through untouched.
			if (apiVersion === LEGACY_API_VERSION) return await send();
			try {
				return await send();
			} catch (error) {
				readAsLegacyError(node, error, method, path);
				// A NodeApiError (what n8n throws here) comes back as itself.
				throw new NodeApiError(node, error as JsonObject);
			}
		};

		// Max Wait, validated BEFORE anything is submitted: a non-numeric value
		// found after a paid submit leaves a charged job with nowhere to go,
		// and a NaN deadline would poll in a hot loop (see Verify).
		const readWaitSeconds = (itemIndex: number, raw: unknown): number => {
			const requested = Number(raw);
			// For Verify, '' and null read as 0 and land on the 10s floor, as they
			// always did; only a non-numeric value is refused. Review and Check
			// Citations pass their default instead of an empty value (jobWait).
			if (!Number.isFinite(requested)) {
				throw new NodeOperationError(this.getNode(), 'Max Wait (Seconds) must be a number of seconds', {
					itemIndex,
				});
			}
			return Math.min(MAX_WAIT_CEILING_SECONDS, Math.max(MAX_WAIT_FLOOR_SECONDS, requested));
		};

		// A review's Max Wait from Options: empty in any form ('' from an
		// expression, null, never added) means the default, never the 10s floor,
		// which would time out every review.
		const jobWait = (raw: unknown): unknown =>
			raw === undefined || raw === null || String(raw).trim() === '' ? JOB_MAX_WAIT_DEFAULT_SECONDS : raw;

		// Polls a review or a citation check until it is completed or failed,
		// with the rules Verify's loop follows and for the same reasons: the
		// job is already paid for, so a 5xx / 429 / 408 / 425 poll is retried
		// for the window, a status-less failure gets a small bounded number of
		// tries, a stated wait (429 Retry-After, the body's poll_after_seconds)
		// is honoured within limits, and waitForNextPoll ends the loop on a
		// read rather than on a sleep.
		const pollJob = async (
			path: string,
			itemIndex: number,
			waitSeconds: number,
			opts: {
				terminal: readonly string[];
				pollAfterMs: (body: IDataObject) => number | undefined;
			} = { terminal: ['completed', 'failed'], pollAfterMs: (body) => statedPollAfterMs(body) },
		): Promise<{
			terminal?: IDataObject;
			lastStatus: string;
			lastError?: { message: string; status: number | null };
		}> => {
			const deadline = Date.now() + waitSeconds * 1000;
			let lastStatus = '';
			let pollIdx = 0;
			let unclassifiedRetries = 0;
			let lastError: { message: string; status: number | null } | undefined;
			while (true) {
				let job: IDataObject;
				try {
					job = await lenzRequest('GET', path);
				} catch (pollError) {
					const code = statusCodeOf(pollError);
					const retryable =
						code === undefined
							? unclassifiedRetries < MAX_UNCLASSIFIED_POLL_RETRIES
							: code >= 500 || code === 429 || code === 408 || code === 425;
					if (!retryable) {
						throw describeApiError(this.getNode(), pollError, itemIndex, {
							message: (pollError as Error).message,
						});
					}
					lastError = { message: (pollError as Error).message, status: code ?? null };
					if (code === undefined) {
						unclassifiedRetries += 1;
					}
					const statedWait =
						code === 429 ? cappedPollWaitMs(statedRetryAfterMs(pollError)) : undefined;
					if (!(await waitForNextPoll(pollIdx, deadline, statedWait))) {
						return { lastStatus, lastError };
					}
					pollIdx += 1;
					continue;
				}
				unclassifiedRetries = 0;
				lastError = undefined;
				const state = job.status as string;
				lastStatus = state || lastStatus;
				if (opts.terminal.includes(state)) {
					return { terminal: job, lastStatus };
				}
				if (!(await waitForNextPoll(pollIdx, deadline, opts.pollAfterMs(job)))) {
					return { lastStatus, lastError };
				}
				pollIdx += 1;
			}
		};

		// IDs of reviews and citation checks this run has had ACCEPTED (and
		// charged), in order. A later item that fails names them, so a hard
		// failure never takes the earlier, paid-for IDs with it: n8n drops the
		// whole output when execute() throws.
		const acceptedJobs: string[] = [];
		// When execute() throws, n8n drops the output, and this note is the only
		// place the charged IDs survive, so it lists them, up to a bound that
		// keeps a huge run from flooding the error panel and the logs.
		const earlierJobsNote = (current?: string): string => {
			const earlier = acceptedJobs.filter((job) => job !== current);
			if (!earlier.length) return '';
			const shown = earlier.slice(0, EARLIER_JOBS_SHOWN).join(', ');
			const more =
				earlier.length > EARLIER_JOBS_SHOWN
					? ` and ${earlier.length - EARLIER_JOBS_SHOWN} more (turn on Continue On Fail to keep every item's ID on its own output)`
					: '';
			return (
				`Earlier items in this run were already accepted and charged: ${shown}${more}. ` +
				'Some may have finished; fetch them by ID (Get Status, Get Review, Get Citation Check) rather than resubmitting.'
			);
		};

		// POST /review or /citecheck. Two refusals are retried here because they
		// clear on their own and the request is safe to resend (same
		// Idempotency-Key, nothing charged by a refusal):
		//  - 429 review_in_flight / citecheck_in_flight: three already run on the
		//    account. Wait the stated retry_after_seconds (capped) for a slot,
		//    within IN_FLIGHT_WAIT_BUDGET_MS; a run of four or more items reaches
		//    this as a matter of course.
		//  - 409 idempotency_conflict: the same request is still being created.
		//    When the body names the job, that IS the accepted job; otherwise
		//    retry shortly, a few times.
		const submitJob = async (
			path: '/review' | '/citecheck',
			body: IDataObject,
			operation: string,
			itemIndex: number,
			idKey: 'review_id' | 'citecheck_id',
		): Promise<IDataObject> => {
			const slotDeadline = Date.now() + IN_FLIGHT_WAIT_BUDGET_MS;
			let conflicts = 0;
			while (true) {
				try {
					return await lenzRequest('POST', path, body, { idempotent: { operation, itemIndex } });
				} catch (submitError) {
					const code = statusCodeOf(submitError);
					const errBody = responseBodyOf(submitError);
					if (code === 409 && errBody.code === 'idempotency_conflict') {
						const named = typeof errBody[idKey] === 'string' ? (errBody[idKey] as string) : '';
						if (named) return { [idKey]: named, status: 'queued' };
						if (conflicts < CONFLICT_MAX_RETRIES) {
							conflicts += 1;
							await sleep(CONFLICT_RETRY_DELAY_MS);
							continue;
						}
						// Marked, then thrown with its HTTP data intact (status 409, code),
						// so the error output still carries code: idempotency_conflict and the
						// item's catch words it through conflictMessageFor, which reads the mark.
						(submitError as { lenzConflictRetried?: boolean }).lenzConflictRetried = true;
						throw describeApiError(this.getNode(), submitError, itemIndex, {
							message: (submitError as Error).message,
						});
					}
					const inFlight = errBody.code === 'review_in_flight' || errBody.code === 'citecheck_in_flight';
					if (code === 429 && inFlight) {
						const left = slotDeadline - Date.now();
						if (left > 0) {
							const stated = (statedWaitSeconds(errBody) ?? 60) * 1000;
							await sleep(Math.min(stated, MAX_STATED_POLL_WAIT_SECONDS * 1000, left));
							continue;
						}
					}
					// Typed, not re-thrown raw (the community-node lint requires it);
					// describeApiError keeps the original NodeApiError and its body,
					// so the item's catch still reads the status and the code.
					throw describeApiError(this.getNode(), submitError, itemIndex, {
						message: (submitError as Error).message,
					});
				}
			}
		};

		// The result of a submitted job the wait gave up on: never an error,
		// since giving up cancels nothing.
		const jobTimeout = (
			idKey: 'review_id' | 'citecheck_id',
			id: string,
			getOperation: string,
			polled: { lastStatus: string; lastError?: { message: string; status: number | null } },
		): IDataObject => ({
			status: 'timeout',
			passed: null,
			[idKey]: id,
			last_status: polled.lastStatus || null,
			last_error: polled.lastError?.message ?? null,
			last_error_status: polled.lastError?.status ?? null,
			message: `Still running when Max Wait ran out. Nothing was cancelled: fetch it with ${getOperation} using this ${idKey}, or raise Max Wait (Seconds).`,
		});

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			// The task_id of a verification this item has already PAID for, held
			// outside the try so the catch below can still hand it back. Verify
			// debits at submit, so everything that can go wrong afterwards goes
			// wrong on a claim the caller has been charged for; without this the
			// error output carried the HTTP failure and nothing else, and the
			// only handle to a running, paid-for verification was gone. Reset
			// per item so one item's id can never be reported on another's error.
			let pendingTaskId = '';
			// The same, for a review or a citation check: its id and the sentence
			// that tells the caller how to fetch it.
			let pendingJob: { key: 'review_id' | 'citecheck_id'; id: string; receipt: string } | undefined;
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
					const depth = this.getNodeParameter('depth', itemIndex, 'standard') as string;

					// Read and validated BEFORE the submit, not at the point of use.
					// This is a pure parameter read that depends on nothing in the
					// response, and validating it after `POST /verify` would recreate
					// the exact bug the poll loop below exists to fix: the claim is
					// charged, then a bad expression throws, and the task_id goes out
					// with an error that has nowhere to carry it. Rejecting a
					// non-numeric Max Wait before any money is spent costs the caller
					// nothing. Only read when it is actually consumed — the field is
					// hidden unless Wait for Completion is on, and a stale value behind
					// a hidden field must not fail a submit-only run.
					// The widget's minValue/maxValue are a UI hint and an
					// expression walks straight past them, so the contract is
					// enforced here too. `usableAsTool` means an LLM can supply
					// this number directly; unclamped, `={{ 86400 }}` holds the
					// execution open for a day. A non-numeric expression is worse
					// than a wrong number, and this check is what stands between
					// it and a hot loop. The poll loop is `while (true)` and ends
					// only when waitForNextPoll sees the window spent — but a NaN
					// Max Wait makes the deadline NaN, `NaN <= 0` is false, so the
					// window never counts as spent, and every sleep becomes
					// `min(backoff, NaN)`, which setTimeout runs after ~1ms.
					// Unguarded, that polls the status endpoint about once a
					// millisecond, indefinitely, on a verification already charged
					// for. (This comment used to describe the pre-`while (true)`
					// loop, where the same NaN merely reported a timeout without
					// polling — which made the guard look far less important than
					// it is.)
					const waitSeconds = waitForCompletion
						? readWaitSeconds(
								itemIndex,
								this.getNodeParameter('maxWaitSeconds', itemIndex, POLL_TIMEOUT_MS / 1000),
							)
						: 0;

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
					// Sent on every call, the way visibility is, rather than only when
					// it differs from the default. The request then states the price it
					// expects to pay, which is what makes the depth echoed on the result
					// readable when the two disagree.
					if (depth) {
						submitBody.depth = depth;
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
					// From here on the claim is paid for; keep the receipt reachable.
					pendingTaskId = taskId;
					acceptedJobs.push(`task_id ${taskId}`);

					if (!waitForCompletion) {
						responseData = {
							status: (accepted.status as string) ?? 'queued',
							task_id: taskId,
							// Kept for saved workflows; null when the API sends none.
							chain_id: accepted.chain_id ?? null,
							message: 'Submitted. Poll this task_id with the Get Verify Status operation, or wait for the webhook.',
						};
					} else {
						// The shared loop (pollJob): the verification is already paid for,
						// so retryable poll failures are retried for the window, stated
						// waits are honoured within limits, and the loop ends on a read,
						// never on a sleep. waitSeconds was validated before the submit.
						const polled = await pollJob(`/verify/status/${taskId}`, itemIndex, waitSeconds, {
							terminal: ['completed', 'needs_input', 'failed'],
							pollAfterMs: (status) => statedPollAfterMs(status.progress),
						});
						const terminal = polled.terminal;
						const lastObservedStatus = polled.lastStatus;
						const lastPollError = polled.lastError;

						if (!terminal) {
							responseData = {
								status: 'timeout',
								// Present and null rather than absent. Null is still
								// falsy, so this does NOT rescue a workflow branching
								// straight on `{{ $json.passed }}` — that IF routes a
								// timeout down the false arm exactly as before. What it
								// buys is visibility: the key appears in n8n's output
								// schema, so the case is discoverable. Routing correctly
								// still means checking `status` first, which is what the
								// README pattern now leads with.
								passed: null,
								task_id: taskId,
								// `may` is load-bearing. The deadline can expire after a
								// run of failed polls, in which case nothing was ever
								// observed about this task and asserting it is running
								// would be inventing a fact. `last_status` says how much
								// the node actually knows.
								last_status: lastObservedStatus || null,
								// The poll failure the deadline expired on, if it did.
								// Without this a window spent entirely on 500s came back
								// as an ordinary timeout on the SUCCESS path — the error
								// branch never fired, and nothing anywhere said the node
								// had not managed to reach the status endpoint once. The
								// retry is the right behaviour; silently discarding what
								// it was retrying is not.
								last_error: lastPollError?.message ?? null,
								last_error_status: lastPollError?.status ?? null,
								message:
									'The verification did not complete within Max Wait (task_id: ' +
									taskId +
									'). ' +
									// Deliberately "the last attempt" and not "every
									// attempt": lastPollError is cleared by a successful
									// poll, so it being set means the FINAL read failed,
									// not that they all did. `last_status` is what says
									// whether the task was ever observed at all.
									(lastPollError
										? 'The last attempt to read its status failed with: ' +
											lastPollError.message +
											'. The task itself may be unaffected — '
										: 'It may still be running server-side — ') +
									'the credits were spent at submit either way, so fetch the result later with Get Verify Status rather than resubmitting.',
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
					const depth = this.getNodeParameter('depth', itemIndex, 'standard') as string;

					const body: IDataObject = {
						claims: entries.map((entry) => {
							const claimBody: IDataObject = { text: (entry.text as string).trim() };
							const entryLanguage = (((entry.language as string) ?? '') as string).trim();
							const entrySourceUrl = (((entry.sourceUrl as string) ?? '') as string).trim();
							const entryVisibility = (((entry.visibility as string) ?? '') as string).trim();
							const entryDepth = (((entry.depth as string) ?? '') as string).trim();
							if (entryLanguage) {
								claimBody.language = entryLanguage;
							}
							if (entrySourceUrl) {
								claimBody.source_url = entrySourceUrl;
							}
							if (entryVisibility) {
								claimBody.visibility = entryVisibility;
							}
							// Left off entirely when the row says "Batch Default", so the
							// batch-wide value applies. Sending '' instead would fail the
							// API's enum, and sending the resolved default would hide which
							// rows were actually overridden.
							if (entryDepth) {
								claimBody.depth = entryDepth;
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
					if (depth) {
						body.depth = depth;
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
								// The newer shape names it `claim`; the output key stays.
								claim_text: spawned.claim_text ?? spawned.claim ?? '',
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
								// The newer shape names it `claim`; the output key stays.
								claim_text: spawned.claim_text ?? spawned.claim ?? '',
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
					// A failed row has no verdict on the current shape (status
					// 'failed', verdict null); this node has always shown such a
					// row as verdict 'Error' with confidence 'low'.
					const rowFailed = (c: IDataObject) => c.status === 'failed';
					const noCheckable = nothingCheckable(result, claims);
					if (!claims.length) {
						responseData = {
							status: 'no_claim',
							// The older shape's sentence for a no-claim answer: the newer
							// one carries a `failure` block instead of `error`.
							message:
								(result.error as string | null | undefined) ??
								(result.failure && typeof result.failure === 'object'
									? 'No verifiable claim detected'
									: 'No verifiable factual claim was detected.'),
							candidate_claims: result.candidate_claims ?? [],
							not_a_claim: noCheckable,
						};
					} else {
						responseData = {
							status: 'ok',
							not_a_claim: noCheckable,
							claims: claims.map((c) => ({
								claim: c.claim ?? '',
								verdict: c.verdict ?? (rowFailed(c) ? 'Error' : null),
								confidence: c.confidence ?? (rowFailed(c) ? 'low' : null),
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

					// Collapse the whitespace first and measure that, which is the order
					// the API uses: measuring the raw string would refuse a focus the
					// user correctly counted as short. Over-long is refused rather than
					// trimmed, because a silently shortened focus returns a subset of
					// the claims with nothing to show that it happened. Length is the
					// only rule mirrored here; the API's other rejections still arrive
					// as its own 422.
					const focus = (this.getNodeParameter('focus', itemIndex, '') as string)
						.trim()
						.replace(/\s+/g, ' ');
					if (focus.length > MAX_FOCUS_CHARS) {
						throw new NodeOperationError(
							this.getNode(),
							`A focus can be at most ${MAX_FOCUS_CHARS} characters, got ${focus.length}`,
							{ itemIndex },
						);
					}

					const body: IDataObject = { text };
					if (language) {
						body.language = language;
					}
					// The collapsed form travels, not the raw one, so the body this node
					// fingerprints into its Idempotency-Key is the same string the API
					// hashes into its own — two spellings of one focus stay one request.
					if (focus) {
						body.focus = focus;
					}
					responseData = await lenzRequest('POST', '/extract', body, {
						idempotent: { operation, itemIndex },
					});
					// `no_match` means claims were found and the focus excluded all of
					// them. The empty list is the answer rather than a failure, but on
					// its own it is indistinguishable from "nothing here", so name the
					// cause and the way out.
					fillExtractLegacyKeys(responseData);
					responseData.not_a_claim = isNoCheckable(responseData.status);
					if (responseData.status === 'no_match') {
						responseData.message =
							'Claims were found, but none fall within the focus. Widen or reword it and run again — the unfocused claims are deliberately not substituted.';
					}
				} else if (operation === 'ask') {
					const verificationId = this.getNodeParameter('verificationId', itemIndex) as string;
					const question = this.getNodeParameter('question', itemIndex) as string;

					const body: IDataObject = { message: question };
					if (language) {
						body.language = language;
					}
					// Billable, and the only one where paying twice is also visible in
					// the product: an unkeyed retry asks again, so the question and a
					// second answer join the conversation that Get Ask History returns
					// and that the next follow-up reads as context. With the key, Lenz
					// replays the first answer instead. A retry that arrives while the
					// first question is still being answered gets a 409: there is no
					// answer yet to replay.
					const reply = await lenzRequest('POST', `/ask/${verificationId}`, body, {
						idempotent: { operation, itemIndex },
					});
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
					// ONE page size for the whole walk. The server computes the
					// offset as (page - 1) * page_size, so the size must not change
					// between requests: it used to shrink to `limit - collected`,
					// and with Limit 150 that asked for page 1 at size 100 (rows
					// 1-100) then page 2 at size 50 — which is rows 51-100 again.
					// Rows 51-100 came back twice and 101-150 never came back at
					// all, silently. The per-item `collected >= limit` check below
					// trims the overshoot on the last page instead.
					const pageSize = returnAll ? MAX_PAGE_SIZE : Math.min(MAX_PAGE_SIZE, limit);
					// Page until the server's reported total is covered (or the caller's
					// limit is reached). A short page also stops the loop, so a shrinking
					// result set can't spin forever.
					while (collected < limit) {
						const response = await lenzRequest('GET', '/verifications', undefined, {
							qs: { page, page_size: pageSize },
						});
						const pageItems = (response.items ?? []) as IDataObject[];
						for (const verification of pageItems) {
							if (collected >= limit) {
								break;
							}
							// A newer-shape item has `completed_at` where this node's
							// output has always had `modified_at`.
							if (!('modified_at' in verification) && 'completed_at' in verification) {
								verification.modified_at = modifiedAtOf(verification);
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
				} else if (operation === 'reviewDraft') {
					const draft = (this.getNodeParameter('draft', itemIndex) as string).trim();
					if (!draft) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					const wait = this.getNodeParameter('waitForCompletion', itemIndex, true) as boolean;
					const options = this.getNodeParameter('reviewOptions', itemIndex, {}) as IDataObject;
					// Everything is validated before the submit: a review is charged
					// when it is accepted.
					const waitSeconds = wait ? readWaitSeconds(itemIndex, jobWait(options.maxWaitSeconds)) : 0;
					const body: IDataObject = { text: draft };
					if (language) body.language = language;
					const visibility = this.getNodeParameter('visibility', itemIndex, '') as string;
					if (visibility) body.visibility = visibility;
					const webhookUrl = String(options.webhookUrl ?? '').trim();
					if (webhookUrl) body.webhook_url = webhookUrl;
					const policy = reviewPolicy(options, (message) => {
						throw new NodeOperationError(this.getNode(), message, { itemIndex });
					});
					if (policy) body.escalate = policy;

					const accepted = await submitJob('/review', body, operation, itemIndex, 'review_id');
					const reviewId = (accepted.review_id as string) ?? '';
					if (!reviewId) {
						throw new NodeOperationError(
							this.getNode(),
							'Lenz accepted the draft but returned no review_id, so the review cannot be fetched',
							{ itemIndex },
						);
					}
					acceptedJobs.push(`review_id ${reviewId}`);
					pendingJob = {
						key: 'review_id',
						id: reviewId,
						receipt: `The review was accepted and is running: fetch it with Get Review using review_id ${reviewId}.`,
					};
					if (!wait) {
						responseData = {
							status: (accepted.status as string) ?? 'queued',
							review_id: reviewId,
							message: 'Submitted. Fetch it with Get Review using this review_id, or wait for the webhook.',
						};
					} else {
						const polled = await pollJob(
							`/reviews/${encodeURIComponent(reviewId)}`,
							itemIndex,
							waitSeconds,
						);
						responseData = polled.terminal
							? withPassed(polled.terminal)
							: jobTimeout('review_id', reviewId, 'Get Review', polled);
					}
				} else if (operation === 'getReview') {
					const reviewId = (this.getNodeParameter('reviewId', itemIndex) as string).trim();
					if (!reviewId) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					const issuesOnly = this.getNodeParameter('issuesOnly', itemIndex, false) as boolean;
					responseData = withPassed(
						await lenzRequest(
							'GET',
							`/reviews/${encodeURIComponent(reviewId)}`,
							undefined,
							issuesOnly ? { qs: { view: 'issues' } } : undefined,
						),
					);
				} else if (operation === 'checkCitations') {
					const input = this.getNodeParameter('citationInput', itemIndex, 'text') as string;
					const body: IDataObject = {};
					if (input === 'pairs') {
						const raw = this.getNodeParameter('citationPairs', itemIndex, {}) as {
							pair?: Array<{ statement?: string; url?: string; doi?: string }>;
						};
						const pairs: IDataObject[] = [];
						for (const [n, pair] of (raw.pair ?? []).entries()) {
							const statement = (pair.statement ?? '').trim();
							const url = (pair.url ?? '').trim();
							const doi = (pair.doi ?? '').trim();
							if (!statement || Boolean(url) === Boolean(doi)) {
								throw new NodeOperationError(
									this.getNode(),
									`Pair ${n + 1} needs a statement and exactly one source: a URL or a DOI`,
									{ itemIndex },
								);
							}
							pairs.push(url ? { statement, url } : { statement, doi });
						}
						if (pairs.length === 0) {
							returnData.push({
								json: { skipped: true, reason: 'empty_input' },
								pairedItem: { item: itemIndex },
							});
							continue;
						}
						body.pairs = pairs;
					} else {
						const text = (this.getNodeParameter('citationText', itemIndex) as string).trim();
						if (!text) {
							returnData.push({
								json: { skipped: true, reason: 'empty_input' },
								pairedItem: { item: itemIndex },
							});
							continue;
						}
						body.text = text;
						// The widget's limits are a UI hint; an expression walks past them,
						// and the API answers 422 for anything outside 1-20.
						const rawMax = this.getNodeParameter('maxCitations', itemIndex, 20);
						const maxCitations = Number(rawMax);
						if (rawMax === '' || !Number.isInteger(maxCitations) || maxCitations < 1 || maxCitations > 20) {
							throw new NodeOperationError(
								this.getNode(),
								'Max Citations must be a whole number from 1 to 20',
								{ itemIndex },
							);
						}
						body.max_citations = maxCitations;
					}
					const wait = this.getNodeParameter('waitForCompletion', itemIndex, true) as boolean;
					const options = this.getNodeParameter('citationOptions', itemIndex, {}) as IDataObject;
					const waitSeconds = wait ? readWaitSeconds(itemIndex, jobWait(options.maxWaitSeconds)) : 0;
					if (language) body.language = language;
					const webhookUrl = String(options.webhookUrl ?? '').trim();
					if (webhookUrl) body.webhook_url = webhookUrl;

					const accepted = await submitJob('/citecheck', body, operation, itemIndex, 'citecheck_id');
					const citecheckId = (accepted.citecheck_id as string) ?? '';
					if (!citecheckId) {
						throw new NodeOperationError(
							this.getNode(),
							'Lenz accepted the citations but returned no citecheck_id, so the check cannot be fetched',
							{ itemIndex },
						);
					}
					acceptedJobs.push(`citecheck_id ${citecheckId}`);
					pendingJob = {
						key: 'citecheck_id',
						id: citecheckId,
						receipt: `The citation check was accepted and is running: fetch it with Get Citation Check using citecheck_id ${citecheckId}.`,
					};
					if (!wait) {
						responseData = {
							status: (accepted.status as string) ?? 'queued',
							citecheck_id: citecheckId,
							message:
								'Submitted. Fetch it with Get Citation Check using this citecheck_id, or wait for the webhook.',
						};
					} else {
						const polled = await pollJob(
							`/citechecks/${encodeURIComponent(citecheckId)}`,
							itemIndex,
							waitSeconds,
						);
						responseData = polled.terminal
							? withPassed(polled.terminal)
							: jobTimeout('citecheck_id', citecheckId, 'Get Citation Check', polled);
					}
				} else if (operation === 'getCitationCheck') {
					const citecheckId = (this.getNodeParameter('citecheckId', itemIndex) as string).trim();
					if (!citecheckId) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					responseData = withPassed(
						await lenzRequest('GET', `/citechecks/${encodeURIComponent(citecheckId)}`),
					);
				} else if (operation === 'usage') {
					responseData = fillLegacyUsageKeys(await lenzRequest('GET', '/me/usage'));
				} else if (operation === 'webhookSecret') {
					// Lenz mints an OAuth connection's signing secret on this first
					// read and refuses a webhook_url until then; an API key's secret
					// is never served over the API (403 oauth_only), so say where it is.
					if (credentialType !== 'lenzOAuth2Api') {
						throw new NodeOperationError(
							this.getNode(),
							"An API key's webhook secret is set and shown on https://lenz.io/api-credentials, not over the API. Get Webhook Secret is for OAuth connections.",
							{ itemIndex },
						);
					}
					responseData = await lenzRequest('GET', '/me/webhook-secret');
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
				// This item's own job, left out of the "earlier items" note.
				const currentJob = pendingTaskId
					? `task_id ${pendingTaskId}`
					: pendingJob
						? `${pendingJob.key} ${pendingJob.id}`
						: undefined;
				// n8n's own words for an OAuth credential that was created but never
				// connected ("Unable to sign without access token") name a mechanism,
				// not a fix. The request never left n8n: nothing reached Lenz and
				// nothing was charged.
				if (
					credentialType === 'lenzOAuth2Api' &&
					/unable to sign without access token|oauth credentials not connected/i.test(
						(error as Error)?.message ?? '',
					)
				) {
					const notConnected = 'The Lenz OAuth2 credential is not connected yet';
					const fix =
						'Open the credential and click Connect my account, then sign in to Lenz and click Allow. Nothing was sent to Lenz.';
					if (this.continueOnFail()) {
						returnData.push({
							json: { error: notConnected, error_description: fix, code: 'oauth_not_connected' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}
					throw new NodeOperationError(this.getNode(), notConnected, { description: fix, itemIndex });
				}
				if (this.continueOnFail()) {
					// This is the branch the capacity recovery pattern runs on:
					// "On Error -> Continue (using error output)" into a Wait node
					// set to the stated seconds. A bare message string gives that
					// Wait node nothing to read, so the typed fields travel with
					// it. `error` keeps its original value — existing workflows
					// reading it are unaffected.
					const json: IDataObject = { error: (error as Error).message };
					// A verification that was submitted before this threw is
					// running and already charged. Without the id the caller
					// cannot fetch it, retry it, or even prove it happened — so
					// the receipt travels on the error output too, not only on
					// the success paths.
					if (pendingTaskId) {
						json.task_id = pendingTaskId;
					}
					if (pendingJob) {
						json[pendingJob.key] = pendingJob.id;
					}
					const status = statusCodeOf(error);
					if (status !== undefined) {
						json.status_code = status;
					}
					const body = responseBodyOf(error);
					if (typeof body.code === 'string' && body.code) {
						json.code = body.code;
					}
					// Both spellings, via the shared parser. This used to read
					// `body.retry_after` alone — a key a 429 does not carry, so
					// the documented Wait-node recovery got `undefined` on the
					// one refusal a free, daily-capped operation produces most.
					//
					// `retry_after` keeps its documented meaning: a wait you can
					// actually put in a Wait node. A daily-cap reset hours away
					// is NOT that, and emitting it here would silently change
					// what deployed workflows do — one already wired to the
					// documented pattern got `undefined` on a 429 and failed
					// fast, and would now park for most of a day with no
					// warning and nothing to branch on. Docs cannot reach a
					// workflow already saved on someone's instance; the field
					// shape can. A long reset travels as `resets_in_seconds`
					// instead, so the information is still there for anyone who
					// wants it and absent for anyone who would misuse it.
					//
					// The split is for 429s ONLY. A 503 has always emitted
					// `retry_after` unconditionally, its message tells the user to
					// set a Wait node to it, and a capacity wait is never a day-long
					// cap reset — so splitting it would hand that documented Wait
					// node `undefined` while the description still said "set to N
					// seconds". This used to split every status.
					const statedWait = statedWaitSeconds(body);
					if (statedWait !== undefined) {
						if (status !== 429 || statedWait <= WAIT_NODE_VIABLE_SECONDS) {
							json.retry_after = statedWait;
						} else {
							json.resets_in_seconds = statedWait;
						}
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
					// Rate-limit facts, carried as fields rather than left in the
					// prose. Without them a 45-second burst limit and a nine-hour
					// daily cap are indistinguishable to a workflow: same
					// status_code, same code, and a retry_after that differs only
					// in magnitude. `limit` names which cap was hit and
					// `upgrade_url` is where it is raised.
					//
					// To tell "wait and loop" from "come back tomorrow", branch on
					// which key is present: `retry_after` means a wait worth
					// sitting through, `resets_in_seconds` means a cap reset too
					// long for that. (Not on `retry_after > 300`: a long reset
					// never reaches `retry_after`, so that condition cannot be
					// true.) No boolean is emitted for the threshold: it is this
					// node's judgement about Wait nodes, not a fact the API
					// stated, and baking it into the output would freeze it into
					// the contract.
					// Gated on the same answer the message uses, not copied from any
					// body that happens to carry the key. A proxy 429, or some other
					// error whose body holds a numeric `limit`, would otherwise hand a
					// workflow a limit or an upgrade link that is not Lenz's.
					// `upgrade_url` also travels on an out-of-credits 402, where
					// topping up is exactly the remedy.
					const lenzRateLimit = status === 429 && isLenzRateLimit(body);
					if (lenzRateLimit && typeof body.limit === 'number') {
						json.limit = body.limit;
					}
					if (
						(lenzRateLimit || status === 402) &&
						typeof body.upgrade_url === 'string' &&
						body.upgrade_url
					) {
						json.upgrade_url = body.upgrade_url;
					}
					const typed =
						quotaMessageFor(error) ??
						capacityMessageFor(error) ??
						rateLimitMessageFor(error) ??
						conflictMessageFor(error);
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

				// A NodeOperationError is one of OUR validation failures — an
				// over-long focus, an empty batch, a missing task_id — thrown
				// before any request was made. It must leave as the type it
				// arrived as. Everything below this line reshapes an error into
				// a NodeApiError, and describeApiError's fallback branch wraps
				// whatever it is handed; routed through that, a validation error
				// reached the user as an "API error" with no HTTP code, which is
				// both the wrong category and the wrong advice.
				if (error instanceof NodeOperationError) {
					// The receipt rides this path too. Every validation the node
					// performs now runs before the submit, so `pendingTaskId` should
					// always be empty here — but "should" is what the poll-loop bug
					// was built on. If a validation is ever added below the submit,
					// this is what stops it silently repeating that bug: the rethrow
					// constructs a FRESH error, so anything not copied across is
					// lost, and the task id is the one thing that cannot be
					// reconstructed afterwards.
					const opReceipt = [
						pendingTaskId ? submittedReceipt(pendingTaskId) : (pendingJob?.receipt ?? ''),
						earlierJobsNote(currentJob),
					]
						.filter(Boolean)
						.join(' ');
					throw new NodeOperationError(this.getNode(), error.message, {
						itemIndex,
						description:
							[error.description ?? '', opReceipt].filter(Boolean).join(' ') || undefined,
					});
				}

				// Out of credits (HTTP 402) is a billing state, not a broken
				// request. Name it explicitly so the user is told to top up
				// rather than left reading a generic API failure.
				//
				// The task_id receipt is deliberately NOT appended to this or to
				// the 503 below. Both carry their own carefully-worded prose —
				// 503's opens "Nothing was charged" — and gluing "was submitted
				// and charged" onto that produces a message that contradicts
				// itself in the same breath. The two statements are each true of
				// a different request, which is exactly why they must not share a
				// sentence. The receipt still reaches the caller as `task_id` on
				// the error output, unconditionally.
				// Earlier items' accepted jobs ride every typed message: unlike this
				// item's own receipt (left off below, since "nothing was charged"
				// and "submitted and charged" would contradict each other), they
				// say nothing about this refusal, and n8n is about to drop the
				// whole output that carried them.
				const earlier = earlierJobsNote(currentJob);
				const withEarlier = (text: { message: string; description: string }) =>
					earlier ? { ...text, description: `${text.description} ${earlier}` } : text;
				const quota = quotaMessageFor(error);
				if (quota) {
					throw describeApiError(this.getNode(), error, itemIndex, withEarlier(quota), '402');
				}

				// At capacity / providers down (HTTP 503 with a typed code) is
				// transient by contract: say so and name the stated wait, rather
				// than leaving n8n's stock 503 text — which recommends the
				// automatic retry that cannot clear a 90-120s window.
				const capacity = capacityMessageFor(error);
				if (capacity) {
					throw describeApiError(this.getNode(), error, itemIndex, withEarlier(capacity), '503');
				}

				// Rate limited (HTTP 429). Left to n8n's stock text this read
				// "Request failed with status code 429", which names neither
				// the cap that was hit, nor when it clears, nor the fact that
				// nothing was charged for the refusal.
				const rateLimit = rateLimitMessageFor(error);
				if (rateLimit) {
					throw describeApiError(this.getNode(), error, itemIndex, withEarlier(rateLimit), '429');
				}
				const conflict = conflictMessageFor(error);
				if (conflict) {
					throw describeApiError(this.getNode(), error, itemIndex, withEarlier(conflict), '409');
				}

				// Pass the ORIGINAL error object through. NodeApiError derives
				// httpCode by searching the object it is handed, so the old
				// `{ message: ... }` wrapper — which carries no status — made
				// httpCode permanently null and left the node structurally
				// blind to 402 vs 403 vs 429. n8n's own status table (which
				// already contains '402': 'Payment required') was dead code.
				// Most workflows never switch on the error output, so a task_id
				// that rides only `continueOnFail` is invisible to them. Append
				// it here — APPEND, because NodeApiError has already put the
				// server's own detail in `description` and describeApiError
				// replaces whatever it is handed. Passing a bare receipt would
				// throw that detail away, so a 422's "task_id malformed" would
				// vanish behind our own sentence.
				const existingDescription =
					error instanceof NodeApiError ? (error.description ?? '') : '';
				const receipt = [
					pendingTaskId ? submittedReceipt(pendingTaskId) : (pendingJob?.receipt ?? ''),
					earlier,
				]
					.filter(Boolean)
					.join(' ');
				throw describeApiError(this.getNode(), error, itemIndex, {
					message: (error as Error).message,
					...(receipt
						? { description: [existingDescription, receipt].filter(Boolean).join(' ') }
						: {}),
				});
			}
		}

		return [returnData];
	}
}
