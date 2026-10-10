// Imported, not read off disk: the community-node lint bans `node:fs`,
// `node:path` and `__dirname` in this package, tests included.
import packageJson from '../../../package.json';
import { NodeApiError, NodeOperationError, sleep } from 'n8n-workflow';
import type { IDataObject, IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';

// sleep is used for verify polling backoff; make it instant in tests.
jest.mock('n8n-workflow', () => ({
	...jest.requireActual('n8n-workflow'),
	sleep: jest.fn(async () => {}),
}));

import { Lenz, POLL_TIMEOUT_MS } from '../Lenz.node';

// A responder receives the httpRequest options and returns the mocked response
// body (or throws to simulate an API/transport error).
type Responder = (options: IHttpRequestOptions) => unknown;

/**
 * A failure in the shape the node actually receives at runtime.
 *
 * `httpRequestWithAuthentication` never rethrows the transport error — it
 * catches it and throws `new NodeApiError(node, error)`. That matters twice
 * over, and a hand-rolled `Object.assign(new Error(), { statusCode, body })`
 * fixture gets both wrong:
 *
 *  1. the parsed body is no longer at `.body`; NodeApiError lifts it onto
 *     `context.data`, so any handler reading `.body` finds nothing; and
 *  2. NodeApiError's constructor starts with `if (errorResponse instanceof
 *     NodeApiError) return errorResponse`, so re-wrapping the caught error to
 *     attach a custom message silently discards that message.
 *
 * Both bugs are invisible to a plain-Error fixture and both are live in
 * production, so every error test goes through this.
 */
function apiError(statusCode: number, body?: Record<string, unknown>, message?: string) {
	const transport = Object.assign(
		new Error(message ?? `Request failed with status code ${statusCode}`),
		{
			statusCode,
			response: { status: statusCode, ...(body === undefined ? {} : { data: body }) },
		},
	);
	return new NodeApiError(
		{ name: 'Lenz', type: 'lenz', typeVersion: 1, position: [0, 0] } as never,
		transport as never,
	);
}

function createContext(
	params: Record<string, unknown>,
	responder: Responder,
	continueOnFail = false,
	itemCount = 1,
	// The node's identity is a test input for the Idempotency-Key: its name is
	// user-editable free text, and its id is absent on older n8n versions.
	nodeIdentity: { name?: string; id?: string; typeVersion?: number } = {},
): { ctx: IExecuteFunctions; httpMock: jest.Mock; calls: IHttpRequestOptions[] } {
	const typeVersion = nodeIdentity.typeVersion ?? 1;
	const items = Array.from({ length: itemCount }, () => ({ json: {} }));
	const calls: IHttpRequestOptions[] = [];
	const httpMock = jest.fn(async (_credType: string, options: IHttpRequestOptions) => {
		calls.push(options);
		return responder(options);
	});
	const ctx = {
		getInputData: jest.fn(() => items),
		getNodeParameter: jest.fn((name: string, _itemIndex: number, fallback?: unknown) => {
			if (name in params) return params[name];
			// What real n8n does for a parameter the workflow never saved: the
			// default of the copy shown at the node's version. Modelled for
			// `authentication` only, the one parameter whose default differs by
			// version; everything else keeps the caller's fallback.
			if (name === 'authentication') {
				const copy = new Lenz().description.properties.find(
					(p) =>
						p.name === name &&
						((p.displayOptions?.show?.['@version'] as unknown[] | undefined) ?? [typeVersion]).includes(
							typeVersion,
						),
				);
				if (copy) return copy.default;
			}
			return fallback;
		}),
		getNode: jest.fn(() => ({
			name: nodeIdentity.name ?? 'Lenz',
			...(nodeIdentity.id === undefined ? {} : { id: nodeIdentity.id }),
			type: 'lenz',
			typeVersion,
			position: [0, 0],
		})),
		getExecutionId: jest.fn(() => 'exec-1'),
		continueOnFail: jest.fn(() => continueOnFail),
		helpers: {
			httpRequestWithAuthentication: httpMock,
		},
	} as unknown as IExecuteFunctions;
	return { ctx, httpMock, calls };
}

async function runNode(
	params: Record<string, unknown>,
	responder: Responder,
	continueOnFail = false,
	itemCount = 1,
	nodeIdentity: { name?: string; id?: string; typeVersion?: number } = {},
) {
	const { ctx, httpMock, calls } = createContext(
		params,
		responder,
		continueOnFail,
		itemCount,
		nodeIdentity,
	);
	const node = new Lenz();
	const result = await node.execute.call(ctx);
	return { output: result[0], httpMock, calls };
}

// Convenience responder that never expects to be called (empty-input paths).
const noCall: Responder = (options) => {
	throw new Error(`unexpected request: ${options.method} ${options.url}`);
};

describe('Lenz node - Assess (Fast)', () => {
	it('derives passed=true for a True verdict and passed=false for a False verdict', async () => {
		const responder: Responder = (options) => {
			expect(options.method).toBe('POST');
			expect(options.url).toBe('/assess');
			return {
				claims: [
					{ claim: 'A', verdict: 'True', confidence: 'high', verification_url: null },
					{ claim: 'B', verdict: 'False', confidence: 'high', verification_url: null },
					{ claim: 'C', verdict: 'Mostly True', confidence: 'medium', verification_url: null },
					{ claim: 'D', verdict: 'Mostly False', confidence: 'medium', verification_url: null },
					{ claim: 'E', verdict: 'Mixed', confidence: 'low', verification_url: null },
				],
			};
		};

		const { output } = await runNode({ operation: 'assess', text: 'some text' }, responder);

		expect(output[0].json.status).toBe('ok');
		const claims = (output[0].json as IDataObject).claims as IDataObject[];
		expect(claims[0].passed).toBe(true); // True
		expect(claims[1].passed).toBe(false); // False
		expect(claims[2].passed).toBe(true); // Mostly True
		expect(claims[3].passed).toBe(false); // Mostly False
		expect(claims[4].passed).toBe(false); // Mixed
	});

	it('echoes the per-claim language the API returned', async () => {
		const responder: Responder = () => ({
			claims: [{ claim: 'A', verdict: 'True', confidence: 'high', language: 'es' }],
		});
		const { output } = await runNode({ operation: 'assess', text: 'texto' }, responder);
		const claims = (output[0].json as IDataObject).claims as IDataObject[];
		expect(claims[0].language).toBe('es');
	});

	it('passes on the reviewer\'s rationale, null when a row has none, and never a dissent', async () => {
		const responder: Responder = () => ({
			claims: [
				{ claim: 'A', verdict: 'True', confidence: 'high', rationale: 'Agrees.', dissent: null },
				// The API stopped filling dissent; a row still carrying one does not reach the output
				{ claim: 'B', verdict: 'False', confidence: 'high', rationale: 'Agrees.', dissent: 'Disagrees.' },
				// A response stored before the API added the field replays without it
				{ claim: 'C', verdict: 'Mixed', confidence: 'low' },
				{ claim: 'D', verdict: 'Error', confidence: 'low', rationale: null },
			],
		});
		const { output } = await runNode({ operation: 'assess', text: 'some text' }, responder);
		const claims = (output[0].json as IDataObject).claims as IDataObject[];
		expect(claims[0].rationale).toBe('Agrees.');
		expect(claims[1].rationale).toBe('Agrees.');
		expect(claims[2].rationale).toBeNull();
		expect(claims[3].rationale).toBeNull();
		for (const row of claims) expect('dissent' in row).toBe(false);
	});

	it('skips empty text input instead of failing the batch', async () => {
		const { output, httpMock } = await runNode({ operation: 'assess', text: '   ' }, noCall);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(httpMock).not.toHaveBeenCalled();
	});

	it('returns status "no_claim" when no verifiable claim is found', async () => {
		const responder: Responder = () => ({ claims: [], error: 'No claim found' });
		const { output } = await runNode({ operation: 'assess', text: 'just chatting' }, responder);
		expect(output[0].json.status).toBe('no_claim');
	});

	it('keeps candidate_claims on a no_claim result, whatever the error_code', async () => {
		const responder: Responder = () => ({
			claims: [],
			error: 'No claim found',
			error_code: 'framing_failed',
			candidate_claims: [],
		});
		const { output } = await runNode({ operation: 'assess', text: 'vague text' }, responder);
		expect(output[0].json.status).toBe('no_claim');
		expect((output[0].json as IDataObject).candidate_claims).toEqual([]);
	});
});

describe('Lenz node - what an expression hands a text field', () => {
	// n8n passes an expression's raw result to a string field: {{ $json.claim }}
	// on an item without `claim` gives undefined, {{ $json.count }} a number.
	const ID_OPERATIONS: Array<[string, Record<string, unknown>]> = [
		['verifyStatus', { taskId: undefined }],
		['getVerification', { verificationId: undefined }],
		['deleteVerification', { verificationId: undefined }],
		['listRelated', { verificationId: undefined }],
		['askHistory', { verificationId: undefined }],
		['resetAsk', { verificationId: undefined }],
		['ask', { verificationId: undefined, question: 'Why?' }],
		['ask', { verificationId: 'ver_1', question: undefined }],
		['getReview', { reviewId: undefined }],
		['getCitationCheck', { citecheckId: undefined }],
	];

	it.each(ID_OPERATIONS)('%s skips an input that is missing, without a request', async (operation, params) => {
		for (const missing of [undefined, null, '', '   ']) {
			const filled = Object.fromEntries(
				Object.entries(params).map(([key, value]) => [key, value === undefined ? missing : value]),
			);
			const { output, httpMock } = await runNode({ operation, ...filled }, noCall);
			expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
			expect(httpMock).not.toHaveBeenCalled();
		}
	});

	it.each([
		['verify', 'claim'],
		['assess', 'text'],
		['extract', 'text'],
		['reviewDraft', 'draft'],
	])('%s skips a missing %s, without a request', async (operation, field) => {
		for (const missing of [undefined, null]) {
			const { output, httpMock } = await runNode({ operation, [field]: missing }, noCall);
			expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
			expect(httpMock).not.toHaveBeenCalled();
		}
	});

	it('sends a number as its text', async () => {
		const { calls } = await runNode({ operation: 'assess', text: 42 }, () => ({
			claims: [{ claim: '42', verdict: 'True', confidence: 'high' }],
		}));
		expect(calls[0].body).toMatchObject({ text: '42' });
	});

	it('refuses an object with a message naming the field', async () => {
		await expect(runNode({ operation: 'assess', text: { a: 1 } }, noCall)).rejects.toThrow(
			/"text" must be text or a number, but the expression returned an object/,
		);
	});

	it.each([
		['getVerification', { verificationId: 'a/b?c' }, '/verifications/a%2Fb%3Fc'],
		['deleteVerification', { verificationId: 'a/b' }, '/verifications/a%2Fb'],
		['listRelated', { verificationId: 'a/b' }, '/verifications/a%2Fb/related'],
		['askHistory', { verificationId: 'a/b' }, '/ask/a%2Fb'],
		['resetAsk', { verificationId: 'a/b' }, '/ask/a%2Fb'],
		['ask', { verificationId: 'a/b', question: 'Why?' }, '/ask/a%2Fb'],
		['verifyStatus', { taskId: 'a/b' }, '/verify/status/a%2Fb'],
	])('%s encodes the ID into the path', async (operation, params, path) => {
		const { calls } = await runNode({ operation, ...params }, () => ({ status: 'processing' }), true);
		expect(calls[0].url).toBe(path);
	});
});

describe('Lenz node - Verify (Deep)', () => {
	// Submit returns a task_id; the status endpoint returns the terminal state
	// on the first poll (so no real waiting happens in tests).
	function verifyResponder(terminalStatus: IDataObject): Responder {
		return (options) => {
			if (options.method === 'POST' && options.url === '/verify') {
				return { task_id: 'task_1' };
			}
			if (options.method === 'GET' && options.url === '/verify/status/task_1') {
				return terminalStatus;
			}
			throw new Error(`unexpected request: ${options.method} ${options.url}`);
		};
	}

	const completedStatus: IDataObject = {
		status: 'completed',
		result: {
			verification_id: 'ver_123',
			claim: 'Some claim',
			verdict: 'False',
			confidence: 'high',
			lenz_score: 2,
			key_finding: 'The figure is off by an order of magnitude.',
			executive_summary: 'This claim is false.',
			suggested_rewrite: 'The figure is closer to 4 million.',
			warnings: ['stale source'],
			domain: 'Finance',
			entities: [{ name: 'Acme', qid: 'Q42' }],
			presumed_intent: 'informative',
			language: 'en',
			visibility: 'private',
			created_at: '2026-08-01T00:00:00Z',
			audit: { panel_agreement: 'unanimous' },
			sources: [
				{
					title: 'Source A',
					url: 'https://a.example',
					snippet: 'quote A',
					source_name: 'A News',
					date: '2026-01-01',
				},
				{ title: 'No URL source', url: '' },
				{ title: 'Source B', url: 'https://b.example' },
			],
		},
	};

	it('returns the full branch-ready object on a completed verification', async () => {
		const { output } = await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			verifyResponder(completedStatus),
		);
		const json = output[0].json as IDataObject;

		expect(json.status).toBe('completed');
		expect(json.passed).toBe(false);
		expect(json.verdict).toBe('False');
		expect(json.lenz_score).toBe(2);
		expect(json.verification_id).toBe('ver_123');
		// url-less sources are filtered out; the rest keep their full detail
		expect(json.citations).toEqual([
			{
				title: 'Source A',
				url: 'https://a.example',
				source_name: 'A News',
				snippet: 'quote A',
				date: '2026-01-01',
			},
			{ title: 'Source B', url: 'https://b.example', source_name: '', snippet: '', date: '' },
		]);
	});

	it('surfaces the fields the API added: key_finding, domain, entities, warnings, visibility', async () => {
		const { output } = await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			verifyResponder(completedStatus),
		);
		const json = output[0].json as IDataObject;
		expect(json.key_finding).toBe('The figure is off by an order of magnitude.');
		expect(json.domain).toBe('Finance');
		expect(json.entities).toEqual([{ name: 'Acme', qid: 'Q42' }]);
		expect(json.warnings).toEqual(['stale source']);
		expect(json.visibility).toBe('private');
		expect(json.language).toBe('en');
		expect(json.presumed_intent).toBe('informative');
	});

	it('defaults key_finding to "" on claims that pre-date the field', async () => {
		const responder = verifyResponder({
			status: 'completed',
			result: {
				verification_id: 'ver_124',
				verdict: 'True',
				confidence: 'high',
				lenz_score: 9,
				executive_summary: 'This claim is true.',
				sources: [],
			},
		});
		const { output } = await runNode({ operation: 'verify', claim: 'Some claim' }, responder);
		expect((output[0].json as IDataObject).key_finding).toBe('');
	});

	describe('suggested_rewrite (Lenz#916)', () => {
		const completed = (result: IDataObject) =>
			verifyResponder({
				status: 'completed',
				result: { verification_id: 'ver_sr', verdict: 'True', confidence: 'high', sources: [], ...result },
			});

		it('passes the rewrite through on a false claim', async () => {
			const { output } = await runNode(
				{ operation: 'verify', claim: 'Some claim' },
				verifyResponder(completedStatus),
			);
			expect((output[0].json as IDataObject).suggested_rewrite).toBe('The figure is closer to 4 million.');
		});

		it('reads "" for a true claim, whose rewrite is null', async () => {
			const { output } = await runNode(
				{ operation: 'verify', claim: 'Some claim' },
				completed({ suggested_rewrite: null }),
			);
			const json = output[0].json as IDataObject;
			expect(json).toHaveProperty('suggested_rewrite', '');
		});

		it('reads "" when the key is absent (a verification from before the field)', async () => {
			const { output } = await runNode({ operation: 'verify', claim: 'Some claim' }, completed({}));
			expect((output[0].json as IDataObject).suggested_rewrite).toBe('');
		});

		it('reads "" for anything that is not a string', async () => {
			const { output } = await runNode(
				{ operation: 'verify', claim: 'Some claim' },
				completed({ suggested_rewrite: { text: 'x' } }),
			);
			expect((output[0].json as IDataObject).suggested_rewrite).toBe('');
		});
	});

	it('returns the verdict even when sources is not a list', async () => {
		// The verification is finished and paid for by the time this maps. Throwing
		// over a malformed citation would fail the item after the money was spent.
		const served = {
			...completedStatus,
			result: { ...(completedStatus.result as IDataObject), sources: 'not a list' },
		};
		const { output } = await runNode({ operation: 'verify', claim: 'Some claim' }, verifyResponder(served));
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('completed');
		expect(json.citations).toEqual([]);
	});

	it('drops a null entry in sources instead of failing the item', async () => {
		const served = {
			...completedStatus,
			result: {
				...(completedStatus.result as IDataObject),
				sources: [null, { title: 'Real', url: 'https://real.example' }],
			},
		};
		const { output } = await runNode({ operation: 'verify', claim: 'Some claim' }, verifyResponder(served));
		const citations = (output[0].json as IDataObject).citations as IDataObject[];
		expect(citations).toHaveLength(1);
		expect(citations[0].url).toBe('https://real.example');
	});

	it('omits the audit trail by default and includes it when asked', async () => {
		const withoutAudit = await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			verifyResponder(completedStatus),
		);
		expect((withoutAudit.output[0].json as IDataObject).audit).toBeUndefined();

		const withAudit = await runNode(
			{ operation: 'verify', claim: 'Some claim', includeAudit: true },
			verifyResponder(completedStatus),
		);
		expect((withAudit.output[0].json as IDataObject).audit).toEqual({
			panel_agreement: 'unanimous',
		});
	});

	it('sends source_url, webhook_url and visibility when they are set', async () => {
		const { calls } = await runNode(
			{
				operation: 'verify',
				claim: 'Some claim',
				sourceUrl: 'https://origin.example/article',
				webhookUrl: 'https://hooks.example/lenz',
				visibility: 'unlisted',
			},
			verifyResponder(completedStatus),
		);
		const submit = calls.find((c) => c.url === '/verify');
		expect(submit?.body).toEqual({
			text: 'Some claim',
			source_url: 'https://origin.example/article',
			webhook_url: 'https://hooks.example/lenz',
			visibility: 'unlisted',
			depth: 'standard',
		});
	});

	it('returns the task ID without polling when Wait for Completion is off', async () => {
		const { output, calls } = await runNode(
			{ operation: 'verify', claim: 'Some claim', waitForCompletion: false },
			(options) => {
				if (options.url === '/verify') {
					return { task_id: 'task_1', status: 'queued', chain_id: 'c1' };
				}
				throw new Error(`unexpected request: ${options.method} ${options.url}`);
			},
		);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('queued');
		expect(json.task_id).toBe('task_1');
		expect(json.chain_id).toBe('c1');
		// submit only — no status poll
		expect(calls).toHaveLength(1);
	});

	it('skips empty claim input instead of failing the batch', async () => {
		const { output, httpMock } = await runNode({ operation: 'verify', claim: '' }, noCall);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(httpMock).not.toHaveBeenCalled();
	});

	it('surfaces the offered claims and the Select Claims next step on a multi_claim interrupt', async () => {
		const responder = verifyResponder({
			status: 'needs_input',
			reason: 'multi_claim',
			claims: [
				{ text: 'Claim one', domain: 'General' },
				{ text: 'Claim two', domain: 'Finance' },
			],
		});
		const { output } = await runNode({ operation: 'verify', claim: 'two claims' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('needs_input');
		expect(json.reason).toBe('multi_claim');
		expect(json.task_id).toBe('task_1');
		expect(json.claims).toEqual([
			{ text: 'Claim one', domain: 'General' },
			{ text: 'Claim two', domain: 'Finance' },
		]);
		expect(json.message).toContain('Select Claims');
		expect(json).toHaveProperty('candidates', []);
		expect(json).toHaveProperty('similar_claims', []);
	});

	it('maps a failed terminal state to a status: failed result, not a thrown error', async () => {
		const responder = verifyResponder({
			status: 'failed',
			error: 'Pipeline stopped at: research_empty',
			failure_reason: 'research_empty',
			failure_class: 'upstream_unavailable',
			retryable: true,
		});
		const { output } = await runNode({ operation: 'verify', claim: 'broken claim' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('failed');
		expect(json.task_id).toBe('task_1');
		// Explicit fields, not just prose — a downstream IF node branches on these.
		expect(json.failure_reason).toBe('research_empty');
		expect(json.failure_class).toBe('upstream_unavailable');
		expect(json.retryable).toBe(true);
		expect(json.message).toContain('research_empty');
	});

	it('tolerates a legacy failed body without the 2026-08 failure fields', async () => {
		const responder = verifyResponder({ status: 'failed', error: 'bad input' });
		const { output } = await runNode({ operation: 'verify', claim: 'broken claim' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('failed');
		expect(json.failure_reason).toBe('');
		expect(json.failure_class).toBe('');
		expect(json.retryable).toBeNull();
	});

	it('fails clearly when submit returns no task_id instead of polling a bad URL', async () => {
		const { ctx, calls } = createContext({ operation: 'verify', claim: 'Some claim' }, (options) => {
			if (options.url === '/verify') {
				return { status: 'queued' }; // no task_id
			}
			throw new Error(`should not poll: ${options.url}`);
		});
		const node = new Lenz();
		// A NodeOperationError, not a NodeApiError: the API answered fine and
		// WE refused to proceed. Until #23 the item catch re-wrapped every
		// validation failure as an API error with no HTTP code, and this test
		// asserted that wrong type.
		await expect(node.execute.call(ctx)).rejects.toThrow(NodeOperationError);
		expect(calls).toHaveLength(1); // submit only, no status poll
	});

	it('asks for the depth that was chosen, so a low check is billed at the low price', async () => {
		const { calls } = await runNode(
			{ operation: 'verify', claim: 'Some claim', depth: 'low' },
			verifyResponder(completedStatus),
		);
		const submit = calls.find((c) => c.url === '/verify');
		expect((submit?.body as IDataObject).depth).toBe('low');
	});

	it('reports the depth the verdict was produced with, not the one requested', async () => {
		// A low request answered from an existing standard verdict is charged
		// the low price but carries standard evidence. Reading back 'standard'
		// here is correct, and is the only way a workflow can tell the two
		// apart — so it must not be overwritten with the requested value.
		const served = { ...completedStatus, result: { ...(completedStatus.result as IDataObject), depth: 'standard' } };
		const { output } = await runNode(
			{ operation: 'verify', claim: 'Some claim', depth: 'low' },
			verifyResponder(served),
		);
		expect((output[0].json as IDataObject).depth).toBe('standard');
	});

	it('reports an empty depth on a verification stored before the field existed', async () => {
		const { output } = await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			verifyResponder(completedStatus),
		);
		expect((output[0].json as IDataObject).depth).toBe('');
	});

	it('wraps an API error from the submit call in NodeApiError rather than swallowing it', async () => {
		const responder: Responder = () => {
			throw new Error('Unauthorized');
		};
		const { ctx } = createContext({ operation: 'verify', claim: 'claim' }, responder);
		const node = new Lenz();
		await expect(node.execute.call(ctx)).rejects.toThrow(NodeApiError);
	});
});

describe('Lenz node - Get Verify Status', () => {
	it('maps a completed task through the same shape as Verify (Deep)', async () => {
		const responder: Responder = (options) => {
			expect(options.method).toBe('GET');
			expect(options.url).toBe('/verify/status/task_9');
			return {
				status: 'completed',
				result: {
					verification_id: 'ver_9',
					verdict: 'Mostly False',
					key_finding: 'Off by a year.',
					suggested_rewrite: 'It opened in 1889.',
				},
			};
		};
		const { output } = await runNode({ operation: 'verifyStatus', taskId: 'task_9' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('completed');
		expect(json.passed).toBe(false);
		expect(json.key_finding).toBe('Off by a year.');
		expect(json.suggested_rewrite).toBe('It opened in 1889.');
	});

	it('reports an in-flight task as processing with its progress', async () => {
		// The real shape. This fixture used to mock `step: 'Debating...'`, a
		// value the server never emitted — real metas were bare identifiers,
		// and the API's own synthetic branches said 'Starting...'/'Framing...'.
		// Also fixed pointless: it asserted the raw object passed through,
		// which is the behaviour this block now exists to forbid.
		const responder: Responder = () => ({
			status: 'processing',
			progress: { step: 'debate', index: 3, total: 5, elapsed_seconds: 42, poll_after_seconds: 5 },
		});
		const { output } = await runNode({ operation: 'verifyStatus', taskId: 'task_9' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('processing');
		expect(json.progress).toEqual({
			step: 'debate',
			index: 3,
			total: 5,
			elapsed_seconds: 42,
			poll_after_seconds: 5,
		});
	});

	it('forwards only the whitelisted progress fields, never the evidence pool or cost', async () => {
		// What the endpoint used to forward verbatim, and what the node used to
		// spread onto the item: the accumulated evidence pool with untruncated
		// source quotes, and Lenz's own per-step EUR spend. Neither was ever
		// contract. Whatever the API puts in `progress` next lands here too,
		// until someone adds it to PROGRESS_FIELDS on purpose.
		const responder: Responder = () => ({
			status: 'processing',
			progress: {
				step: 'research',
				index: 2,
				total: 5,
				content: { sources: [{ quote: 'a long untruncated quote' }], debate: {} },
				step_stats: { research: { cost_eur: 0.0412 } },
				anything_new: 'must not pass either',
			},
		});
		const { output } = await runNode({ operation: 'verifyStatus', taskId: 'task_9' }, responder);
		const progress = (output[0].json as IDataObject).progress as IDataObject;
		expect(progress).toEqual({ step: 'research', index: 2, total: 5 });
		expect(progress).not.toHaveProperty('content');
		expect(progress).not.toHaveProperty('step_stats');
		expect(progress).not.toHaveProperty('anything_new');
	});

	it('leaves an absent progress field absent rather than null', async () => {
		// A workflow branching on `progress.index` should find it missing, not
		// find a null that reads like a value. The old shape had only `step`.
		const responder: Responder = () => ({
			status: 'processing',
			progress: { step: 'framing' },
		});
		const { output } = await runNode({ operation: 'verifyStatus', taskId: 'task_9' }, responder);
		const progress = (output[0].json as IDataObject).progress as IDataObject;
		expect(progress).toEqual({ step: 'framing' });
		expect(progress).not.toHaveProperty('index');
	});

	it('tolerates a progress that is missing or not an object', async () => {
		for (const progress of [undefined, null, 'research', 42, ['step']]) {
			const responder: Responder = () => ({ status: 'processing', progress });
			const { output } = await runNode({ operation: 'verifyStatus', taskId: 'task_9' }, responder);
			expect((output[0].json as IDataObject).progress).toEqual({});
		}
	});

	it('skips an empty task ID', async () => {
		const { output, httpMock } = await runNode({ operation: 'verifyStatus', taskId: '' }, noCall);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(httpMock).not.toHaveBeenCalled();
	});
});

describe('Lenz node - Submit Verify Batch', () => {
	it('submits every claim and returns one item per spawned task', async () => {
		const responder: Responder = (options) => {
			expect(options.method).toBe('POST');
			expect(options.url).toBe('/verify/batch');
			expect(options.body).toEqual({
				claims: [{ text: 'Claim one' }, { text: 'Claim two', language: 'es' }],
				depth: 'standard',
			});
			return {
				batch_id: 'batch_1',
				items: [
					{ task_id: 't1', claim_text: 'Claim one' },
					{ task_id: 't2', claim_text: 'Claim two' },
				],
			};
		};
		const { output } = await runNode(
			{
				operation: 'verifyBatch',
				batchClaims: {
					claim: [{ text: 'Claim one' }, { text: 'Claim two', language: 'es' }],
				},
			},
			responder,
		);
		expect(output).toHaveLength(2);
		expect(output[0].json).toEqual({
			batch_id: 'batch_1',
			task_id: 't1',
			claim_text: 'Claim one',
			status: 'queued',
			partial: false,
		});
		expect((output[1].json as IDataObject).task_id).toBe('t2');
	});

	it('sends each row\'s own options, and the batch-wide ones, only when set', async () => {
		const { calls } = await runNode(
			{
				operation: 'verifyBatch',
				webhookUrl: ' https://example.com/hook ',
				visibility: 'private',
				depth: 'low',
				batchClaims: {
					claim: [
						{ text: ' Claim one ', sourceUrl: 'https://src.example', visibility: 'unlisted', depth: 'standard' },
						{ text: 'Claim two', sourceUrl: '', visibility: '', depth: '' },
						{ text: 42 },
					],
				},
			},
			() => ({ batch_id: 'b', items: [] }),
		);
		expect(calls[0].body).toEqual({
			claims: [
				{ text: 'Claim one', source_url: 'https://src.example', visibility: 'unlisted', depth: 'standard' },
				{ text: 'Claim two' },
				{ text: '42' },
			],
			webhook_url: 'https://example.com/hook',
			visibility: 'private',
			depth: 'low',
		});
	});

	it('flags a partial fan-out so the caller can retry the missing claims', async () => {
		const responder: Responder = () => ({
			batch_id: 'batch_2',
			items: [{ task_id: 't1', claim_text: 'Claim one' }],
			partial: true,
		});
		const { output } = await runNode(
			{ operation: 'verifyBatch', batchClaims: { claim: [{ text: 'Claim one' }] } },
			responder,
		);
		expect((output[0].json as IDataObject).partial).toBe(true);
	});

	it('rejects a batch larger than the API maximum before making a request', async () => {
		const entries = Array.from({ length: 21 }, (_, i) => ({ text: `Claim ${i}` }));
		const { ctx, httpMock } = createContext(
			{ operation: 'verifyBatch', batchClaims: { claim: entries } },
			noCall,
		);
		const node = new Lenz();
		// Our own validation, so a NodeOperationError (see #23).
		await expect(node.execute.call(ctx)).rejects.toThrow(NodeOperationError);
		expect(httpMock).not.toHaveBeenCalled();
	});

	it('lets one batch mix depths, the per-item value winning over the default', async () => {
		const { calls } = await runNode(
			{
				operation: 'verifyBatch',
				depth: 'standard',
				batchClaims: {
					claim: [
						{ text: 'Cheap one', depth: 'low' },
						{ text: 'Careful one', depth: '' },
					],
				},
			},
			() => ({ batch_id: 'b1', items: [] }),
		);
		// The inheriting row carries no depth key at all. Sending '' would
		// fail the API's enum, and sending the resolved 'standard' would
		// erase the distinction between an override and an inheritance.
		expect(calls[0].body).toEqual({
			claims: [{ text: 'Cheap one', depth: 'low' }, { text: 'Careful one' }],
			depth: 'standard',
		});
	});

	it('skips a batch with no usable claims', async () => {
		const { output, httpMock } = await runNode(
			{ operation: 'verifyBatch', batchClaims: { claim: [{ text: '  ' }] } },
			noCall,
		);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(httpMock).not.toHaveBeenCalled();
	});
});

describe('Lenz node - Select Claims', () => {
	it('posts the selected texts and returns one item per spawned task', async () => {
		const responder: Responder = (options) => {
			expect(options.method).toBe('POST');
			expect(options.url).toBe('/verify/task_1/select');
			expect(options.body).toEqual({ texts: ['Claim one', 'Claim two'] });
			return {
				batch_id: 'batch_3',
				items: [
					{ task_id: 't1', claim_text: 'Claim one' },
					{ task_id: 't2', claim_text: 'Claim two' },
				],
			};
		};
		const { output } = await runNode(
			{ operation: 'select', taskId: 'task_1', selectedClaims: ['Claim one', ' Claim two '] },
			responder,
		);
		expect(output).toHaveLength(2);
		expect((output[0].json as IDataObject).batch_id).toBe('batch_3');
	});

	it('skips when no claim was selected', async () => {
		const { output, httpMock } = await runNode(
			{ operation: 'select', taskId: 'task_1', selectedClaims: ['  '] },
			noCall,
		);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(httpMock).not.toHaveBeenCalled();
	});
});

describe('Lenz node - Extract Claims', () => {
	it('skips empty text input instead of failing the batch', async () => {
		const { output, httpMock } = await runNode({ operation: 'extract', text: '  ' }, noCall);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(httpMock).not.toHaveBeenCalled();
	});

	it('sends the focus hint, with its whitespace collapsed', async () => {
		const { calls } = await runNode(
			{ operation: 'extract', text: 'Some text', focus: '  market size,\n  growth  ' },
			() => ({ status: 'ready' }),
		);
		expect(calls[0].body).toEqual({ text: 'Some text', focus: 'market size, growth' });
	});

	it('measures the focus after collapsing, so padding alone cannot fail it', async () => {
		// 451 raw characters that collapse to 252. The API counts the
		// collapsed length, so rejecting this locally would refuse a focus the
		// user correctly counted as under the limit.
		const padded = 'a'.repeat(250) + ' '.repeat(200) + 'b';
		const { calls } = await runNode(
			{ operation: 'extract', text: 'Some text', focus: padded },
			() => ({ status: 'ready' }),
		);
		expect(((calls[0].body as IDataObject).focus as string).length).toBe(252);
	});

	it('rejects an over-long focus before spending a request on it', async () => {
		// Refused, never truncated: a silently shortened focus returns a
		// subset of the claims with nothing to show that it happened.
		const { ctx, httpMock } = createContext(
			{ operation: 'extract', text: 'Some text', focus: 'a '.repeat(200) },
			noCall,
		);
		const node = new Lenz();
		// Our own validation, so a NodeOperationError (see #23).
		await expect(node.execute.call(ctx)).rejects.toThrow(NodeOperationError);
		expect(httpMock).not.toHaveBeenCalled();
	});

	it('explains a no_match instead of returning a bare empty list', async () => {
		const { output } = await runNode(
			{ operation: 'extract', text: 'Some text', focus: 'unrelated topic' },
			() => ({ status: 'no_match', claim: '', identified_claims: [] }),
		);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('no_match');
		expect(json.identified_claims).toEqual([]);
		expect(json.message).toContain('none fall within the focus');
	});

	it('adds no message to an extraction that did match', async () => {
		const { output } = await runNode(
			{ operation: 'extract', text: 'Some text' },
			() => ({ status: 'ready', identified_claims: ['A'] }),
		);
		expect(output[0].json).not.toHaveProperty('message');
	});

	it('passes through the raw extract response, plus the not_a_claim flag', async () => {
		const responder: Responder = (options) => {
			expect(options.url).toBe('/extract');
			return {
				status: 'ready',
				identified_claims: ['Claim A', 'Claim B'],
				domain: 'General',
			};
		};
		const { output } = await runNode({ operation: 'extract', text: 'Claim A. Claim B.' }, responder);
		expect(output[0].json).toEqual({
			status: 'ready',
			identified_claims: ['Claim A', 'Claim B'],
			domain: 'General',
			not_a_claim: false,
		});
	});
});

// `auto` is a request value the API understands on assess, verify, ask and extract. The
// field is free text, so the node has to send it exactly as typed, and keep
// sending no `language` key at all when the field is empty.
describe('Lenz node - Language "auto"', () => {
	const verifyResponder: Responder = (options) => {
		if (options.method === 'POST' && options.url === '/verify') return { task_id: 'task_1' };
		if (options.method === 'GET' && options.url === '/verify/status/task_1') {
			return { status: 'completed', result: { verification_id: 'ver_1', claim: 'c', verdict: 'True' } };
		}
		throw new Error(`unexpected request: ${options.method} ${options.url}`);
	};
	const assessResponder: Responder = () => ({
		claims: [{ claim: 'A', verdict: 'True', confidence: 'high', verification_url: null }],
	});
	const askResponder: Responder = () => ({ role: 'expert', content: 'An answer.' });
	const extractResponder: Responder = () => ({
		status: 'ok',
		language: 'de',
		claims: [{ claim: 'Berlin ist die Hauptstadt.' }],
	});

	const cases: Array<[string, Record<string, unknown>, Responder, string]> = [
		['assess', { operation: 'assess', text: 'Berlin ist die Hauptstadt.' }, assessResponder, '/assess'],
		['verify', { operation: 'verify', claim: 'Berlin ist die Hauptstadt.' }, verifyResponder, '/verify'],
		['ask', { operation: 'ask', verificationId: 'ver_1', question: 'Warum?' }, askResponder, '/ask/ver_1'],
		['extract', { operation: 'extract', text: 'Berlin ist die Hauptstadt.' }, extractResponder, '/extract'],
	];

	it('stays a free-text field whose description names auto and the operations that take it', () => {
		const field = new Lenz().description.properties.find(
			(p) => p.name === 'language' && p.displayOptions?.show?.operation !== undefined,
		);
		expect(field?.type).toBe('string');
		expect(field?.default).toBe('');
		expect(field?.description).toContain('`auto`');
		expect(field?.description).toContain('Assess, Verify, Ask, Extract and Review Draft');
	});

	it.each(cases)('sends auto unchanged as body.language on %s', async (_op, params, responder, url) => {
		const { calls } = await runNode({ ...params, language: 'auto' }, responder);
		const submit = calls.find((c) => c.method === 'POST' && c.url === url);
		expect((submit?.body as IDataObject).language).toBe('auto');
	});

	it('returns the language Extract reports for its claims', async () => {
		const { output } = await runNode(
			{ operation: 'extract', text: 'Berlin ist die Hauptstadt.', language: 'auto' },
			extractResponder,
		);
		expect(output[0].json.language).toBe('de');
	});

	it.each(cases)('sends no language key on %s when the field is empty', async (_op, params, responder, url) => {
		const { calls } = await runNode({ ...params, language: '' }, responder);
		const submit = calls.find((c) => c.method === 'POST' && c.url === url);
		expect(submit?.body).toBeDefined();
		expect(submit?.body as IDataObject).not.toHaveProperty('language');
	});
});

describe('Lenz node - Ask Follow-Up', () => {
	it('returns the answer text from a completed verification', async () => {
		const responder: Responder = (options) => {
			expect(options.method).toBe('POST');
			expect(options.url).toBe('/ask/ver_123');
			expect(options.body).toEqual({ message: 'Which source is strongest?' });
			return { role: 'expert', content: 'Source X is strongest.' };
		};
		const { output } = await runNode(
			{ operation: 'ask', verificationId: 'ver_123', question: 'Which source is strongest?' },
			responder,
		);
		expect(output[0].json).toEqual({ answer: 'Source X is strongest.' });
	});

	it('returns the stored conversation and quota for Get Ask History', async () => {
		const responder: Responder = (options) => {
			expect(options.method).toBe('GET');
			expect(options.url).toBe('/ask/ver_123');
			return {
				messages: [{ role: 'user', content: 'Why?', created_at: '2026-08-01T00:00:00Z' }],
				exchanges_used: 1,
				exchange_limit: 10,
				can_send: true,
			};
		};
		const { output } = await runNode(
			{ operation: 'askHistory', verificationId: 'ver_123' },
			responder,
		);
		expect((output[0].json as IDataObject).exchanges_used).toBe(1);
		expect((output[0].json as IDataObject).can_send).toBe(true);
	});

	it('deletes the stored conversation for Reset Ask History', async () => {
		const responder: Responder = (options) => {
			expect(options.method).toBe('DELETE');
			expect(options.url).toBe('/ask/ver_123');
			return { ok: true };
		};
		const { output } = await runNode(
			{ operation: 'resetAsk', verificationId: 'ver_123' },
			responder,
		);
		expect(output[0].json).toEqual({ ok: true });
	});
});

describe('Lenz node - stored verifications', () => {
	it('maps a fetched verification through the shared verification shape', async () => {
		const responder: Responder = (options) => {
			expect(options.method).toBe('GET');
			expect(options.url).toBe('/verifications/ver_5');
			return {
				verification_id: 'ver_5',
				verdict: 'Mostly True',
				key_finding: 'Broadly right.',
				suggested_rewrite: null,
				audit: { panel_agreement: 'majority' },
				sources: [],
			};
		};
		const { output } = await runNode(
			{ operation: 'getVerification', verificationId: 'ver_5' },
			responder,
		);
		const json = output[0].json as IDataObject;
		expect(json.passed).toBe(true);
		expect(json.key_finding).toBe('Broadly right.');
		expect(json.suggested_rewrite).toBe('');
		// audit is opt-in here too
		expect(json.audit).toBeUndefined();
	});

	it('reports a stored failure as failed rather than completed', async () => {
		// Get used to run every record through the completed mapper, which
		// hardcodes status: 'completed' — so a failed record came back claiming
		// success with a null verdict, and without the fields an IF node needs.
		const responder: Responder = () => ({
			verification_id: 'ver_9',
			status: 'failed',
			error: 'Pipeline stopped at: research_empty',
			failure_reason: 'research_empty',
			failure_class: 'upstream_unavailable',
			retryable: true,
		});
		const { output } = await runNode(
			{ operation: 'getVerification', verificationId: 'ver_9' },
			responder,
		);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('failed');
		expect(json.verification_id).toBe('ver_9');
		expect(json.failure_reason).toBe('research_empty');
		expect(json.failure_class).toBe('upstream_unavailable');
		expect(json.retryable).toBe(true);
		expect(json.passed).toBeUndefined();
	});

	it('deletes an owned verification', async () => {
		const responder: Responder = (options) => {
			expect(options.method).toBe('DELETE');
			expect(options.url).toBe('/verifications/ver_5');
			return { ok: true };
		};
		const { output } = await runNode(
			{ operation: 'deleteVerification', verificationId: 'ver_5' },
			responder,
		);
		expect(output[0].json).toEqual({ ok: true });
	});

	it('returns each listed verification as its own item, honouring the limit', async () => {
		const responder: Responder = (options) => {
			expect(options.url).toBe('/verifications');
			expect(options.qs).toEqual({ page: 1, page_size: 2 });
			return {
				items: [{ verification_id: 'a' }, { verification_id: 'b' }],
				total: 10,
				page: 1,
				page_size: 2,
			};
		};
		const { output, calls } = await runNode({ operation: 'listVerifications', limit: 2 }, responder);
		expect(output).toHaveLength(2);
		expect(output[0].json).toEqual({ verification_id: 'a' });
		expect(calls).toHaveLength(1);
	});

	it('pages through every verification when Return All is set', async () => {
		const firstPage = Array.from({ length: 100 }, (_, i) => ({ verification_id: `a${i}` }));
		const secondPage = Array.from({ length: 50 }, (_, i) => ({ verification_id: `b${i}` }));
		const responder: Responder = (options) => {
			const page = (options.qs as IDataObject).page as number;
			expect((options.qs as IDataObject).page_size).toBe(100);
			return {
				items: page === 1 ? firstPage : secondPage,
				total: 150,
				page,
				page_size: 100,
			};
		};
		const { output, calls } = await runNode(
			{ operation: 'listVerifications', returnAll: true },
			responder,
		);
		expect(output).toHaveLength(150);
		expect(calls).toHaveLength(2);
	});

	it('keeps page_size constant past 100 so a Limit never duplicates or skips rows', async () => {
		// A server that computes the offset the way a real one does. The old
		// code shrank page_size to `limit - collected` on the second request,
		// so Limit 150 asked for page 2 at size 50 — which THIS computes as
		// rows 50-99 again — and rows 100-149 were never fetched. Silently.
		const all = Array.from({ length: 200 }, (_, i) => ({ verification_id: `v${i}` }));
		const responder: Responder = (options) => {
			const { page, page_size } = options.qs as { page: number; page_size: number };
			const start = (page - 1) * page_size;
			return { items: all.slice(start, start + page_size), total: all.length, page, page_size };
		};

		const { output, calls } = await runNode({ operation: 'listVerifications', limit: 150 }, responder);

		const ids = output.map((o) => (o.json as IDataObject).verification_id);
		expect(ids).toHaveLength(150);
		expect(new Set(ids).size).toBe(150); // no duplicates
		expect(ids[0]).toBe('v0');
		expect(ids[149]).toBe('v149'); // nothing skipped
		// Both requests used the same page_size.
		const sizes = calls.map((c) => (c.qs as IDataObject).page_size);
		expect(new Set(sizes).size).toBe(1);
	});

	it('returns each related verification as its own item', async () => {
		const responder: Responder = (options) => {
			expect(options.url).toBe('/verifications/ver_5/related');
			expect(options.qs).toEqual({ limit: 3 });
			return {
				items: [
					{ verification_id: 'r1', claim: 'Related one', distance: 0.3 },
					{ verification_id: 'r2', claim: 'Related two', distance: 0.4 },
				],
			};
		};
		const { output } = await runNode(
			{ operation: 'listRelated', verificationId: 'ver_5', relatedLimit: 3 },
			responder,
		);
		expect(output).toHaveLength(2);
		expect((output[0].json as IDataObject).verification_id).toBe('r1');
	});

	it('skips a missing verification ID', async () => {
		const { output, httpMock } = await runNode(
			{ operation: 'getVerification', verificationId: '' },
			noCall,
		);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(httpMock).not.toHaveBeenCalled();
	});
});

describe('Lenz node - Check Usage', () => {
	it('passes through the raw usage response', async () => {
		const responder: Responder = (options) => {
			expect(options.method).toBe('GET');
			expect(options.url).toBe('/me/usage');
			return { plan: 'free', verify: { remaining: 9 } };
		};
		const { output } = await runNode({ operation: 'usage' }, responder);
		expect(output[0].json).toEqual({ plan: 'free', verify: { remaining: 9 } });
	});
});

describe('Lenz node - client identification', () => {
	it('sends a User-Agent identifying the n8n node on every request', async () => {
		const { calls } = await runNode({ operation: 'usage' }, () => ({ plan: 'free' }));
		expect(calls[0].headers?.['User-Agent']).toMatch(/^n8n-nodes-lenz\//);
	});

	it('reports the version in package.json, not the last one someone typed', async () => {
		// The header exists so Lenz can attribute API usage to this node, which
		// only works if the version is true. A prefix match cannot catch a stale
		// constant: the 0.3.0 bump landed with the header still saying 0.2.1
		// and CI stayed green, which is what this assertion exists to stop.
		const { calls } = await runNode({ operation: 'usage' }, () => ({ plan: 'free' }));
		expect(calls[0].headers?.['User-Agent']).toBe(`n8n-nodes-lenz/${packageJson.version}`);
	});

	it('pins the API version it was built against', async () => {
		const { calls } = await runNode({ operation: 'usage' }, () => ({ plan: 'free' }));
		expect(calls[0].headers?.['X-Lenz-API-Version']).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});

describe('Lenz node - idempotency', () => {
	const assessResponder: Responder = () => ({
		claims: [{ claim: 'A', verdict: 'True', confidence: 'high' }],
	});

	it('sends an Idempotency-Key on billable POSTs so a retry cannot double-charge', async () => {
		const { calls } = await runNode({ operation: 'assess', text: 'some text' }, assessResponder);
		// The third segment is the node's identity, hashed — see the non-ASCII
		// test below for why it is not the name.
		expect(calls[0].headers?.['Idempotency-Key']).toMatch(
			/^n8n:exec-1:[0-9a-z]+:assess:0:[0-9a-z]+$/,
		);
	});

	it.each([
		['Cyrillic', 'Проверка'],
		['CJK', '検証'],
		['an emoji', 'Lenz ✅'],
		['Latin-1', 'Prüfung Vérification'],
	])('keeps the key ASCII when the node name contains %s', async (_label, nodeName) => {
		// Node refuses a header value containing anything above U+00FF, so a node
		// named in Cyrillic, CJK, Greek, Hebrew, Arabic or with an emoji failed
		// every billable POST before the request left the machine, with an error
		// naming the header rather than the node.
		//
		// Latin-1 is in the list because it was NOT affected — `Prüfung` and
		// `Vérification` always went through — and the first version of this fix
		// used exactly those two as its examples. Pinning the case that never
		// broke keeps the boundary honest if anyone narrows the hash later.
		const { calls } = await runNode({ operation: 'assess', text: 'some text' }, assessResponder, false, 1, {
			name: nodeName,
		});
		const key = calls[0].headers?.['Idempotency-Key'] as string;
		expect(key).toBeTruthy();
		expect(key).toMatch(/^[ -~]+$/);
	});

	it('falls back to the name when the node id is an empty string', async () => {
		// `??` would let '' through as the identity, so two nodes in one execution
		// running the same operation on the same body would share a key and the
		// second would get the first's replayed answer — the collision 0.2.0 was
		// released to fix.
		const one = await runNode({ operation: 'assess', text: 'some text' }, assessResponder, false, 1, {
			id: '', name: 'First',
		});
		const two = await runNode({ operation: 'assess', text: 'some text' }, assessResponder, false, 1, {
			id: '', name: 'Second',
		});
		expect(one.calls[0].headers?.['Idempotency-Key']).not.toBe(two.calls[0].headers?.['Idempotency-Key']);
	});

	it('does not send the node name to the API', async () => {
		// A node named after a customer or a project would otherwise be on every
		// request this node makes.
		const { calls } = await runNode({ operation: 'assess', text: 'some text' }, assessResponder, false, 1, {
			name: 'Acme merger due diligence',
		});
		expect(calls[0].headers?.['Idempotency-Key']).not.toContain('Acme');
	});

	it('keys on the node id, so a rename mid-execution does not change the key', async () => {
		const before = await runNode({ operation: 'assess', text: 'some text' }, assessResponder, false, 1, {
			id: 'a1b2c3', name: 'Check the claim',
		});
		const after = await runNode({ operation: 'assess', text: 'some text' }, assessResponder, false, 1, {
			id: 'a1b2c3', name: 'Renamed halfway through',
		});
		expect(before.calls[0].headers?.['Idempotency-Key']).toBe(after.calls[0].headers?.['Idempotency-Key']);
	});

	it('still separates two different nodes in one execution', async () => {
		// The key exists to keep separate calls apart; hashing the identity must
		// not collapse two nodes into one.
		const one = await runNode({ operation: 'assess', text: 'some text' }, assessResponder, false, 1, { id: 'node-one' });
		const two = await runNode({ operation: 'assess', text: 'some text' }, assessResponder, false, 1, { id: 'node-two' });
		expect(one.calls[0].headers?.['Idempotency-Key']).not.toBe(two.calls[0].headers?.['Idempotency-Key']);
	});

	it('repeats the same key for identical input so a retry replays instead of re-charging', async () => {
		const first = await runNode({ operation: 'assess', text: 'some text' }, assessResponder);
		const second = await runNode({ operation: 'assess', text: 'some text' }, assessResponder);
		expect(first.calls[0].headers?.['Idempotency-Key']).toBe(
			second.calls[0].headers?.['Idempotency-Key'],
		);
	});

	it('scopes the key per item so separate claims are charged separately', async () => {
		const { calls } = await runNode(
			{ operation: 'assess', text: 'some text' },
			assessResponder,
			false,
			2,
		);
		const keys = calls.map((c) => c.headers?.['Idempotency-Key']);
		expect(keys[0]).toMatch(/:assess:0:/);
		expect(keys[1]).toMatch(/:assess:1:/);
		expect(keys[0]).not.toBe(keys[1]);
	});

	it('varies the key with the request body, so a re-run of the node cannot collide', async () => {
		// "Loop Over Items" and AI Agent tool calls re-execute the node inside the
		// same execution, restarting itemIndex at 0. Keyed on position alone both
		// runs would send one key with two different bodies, which the API rejects
		// with 422 (or 409 while the first is still in flight).
		const runA = await runNode({ operation: 'assess', text: 'first batch' }, assessResponder);
		const runB = await runNode({ operation: 'assess', text: 'second batch' }, assessResponder);
		expect(runA.calls[0].headers?.['Idempotency-Key']).not.toBe(
			runB.calls[0].headers?.['Idempotency-Key'],
		);
	});

	it('sends an Idempotency-Key on Ask Follow-Up, which is billable too', async () => {
		const { calls } = await runNode(
			{ operation: 'ask', verificationId: 'ver_123', question: 'Which source is strongest?' },
			() => ({ role: 'expert', content: 'Source X is strongest.' }),
		);
		expect(calls[0].headers?.['Idempotency-Key']).toMatch(
			/^n8n:exec-1:[0-9a-z]+:ask:0:[0-9a-z]+$/,
		);
	});

	it('asks the same question of two verifications under two different keys', async () => {
		// The verification being asked about is in the URL, not the body, so a key
		// built from the body alone would be the same for both, and the second
		// question would be taken for a retry of the first. Loop Over Items and
		// AI Agent tool calls make this ordinary: each re-execution restarts the
		// item index at 0, so only the request itself can tell them apart — and
		// the README recommends keeping the question fixed and varying only the
		// verification, which is exactly this shape.
		const responder: Responder = () => ({ role: 'expert', content: 'Because.' });
		const one = await runNode(
			{ operation: 'ask', verificationId: 'ver_1', question: 'Why?' },
			responder,
		);
		const two = await runNode(
			{ operation: 'ask', verificationId: 'ver_2', question: 'Why?' },
			responder,
		);
		expect(one.calls[0].headers?.['Idempotency-Key']).not.toBe(
			two.calls[0].headers?.['Idempotency-Key'],
		);
	});

	it('selects claims on two verifications under two different keys', async () => {
		// Same reason: Select Claims carries its task in the URL as well.
		const responder: Responder = () => ({ batch_id: 'batch_1', items: [] });
		const one = await runNode(
			{ operation: 'select', taskId: 'task_1', selectedClaims: ['A claim'] },
			responder,
		);
		const two = await runNode(
			{ operation: 'select', taskId: 'task_2', selectedClaims: ['A claim'] },
			responder,
		);
		expect(one.calls[0].headers?.['Idempotency-Key']).not.toBe(
			two.calls[0].headers?.['Idempotency-Key'],
		);
	});

	it('does not send an Idempotency-Key on reads', async () => {
		const { calls } = await runNode({ operation: 'usage' }, () => ({ plan: 'free' }));
		expect(calls[0].headers?.['Idempotency-Key']).toBeUndefined();
	});

	it('gives two paused tasks with the same offered text different Select keys', async () => {
		// Select Claims carries its task_id in the URL and only the chosen
		// texts in the body. Fingerprinting the body alone gave these two the
		// SAME key, so Lenz replayed the first task's response for the second
		// (#22). The path is part of the request's identity.
		const selectResponder: Responder = () => ({ batch_id: 'b', items: [] });
		const a = await runNode(
			{ operation: 'select', taskId: 'task_A', selectedClaims: ['Same claim'] },
			selectResponder,
		);
		const b = await runNode(
			{ operation: 'select', taskId: 'task_B', selectedClaims: ['Same claim'] },
			selectResponder,
		);
		const keyA = a.calls[0].headers?.['Idempotency-Key'];
		const keyB = b.calls[0].headers?.['Idempotency-Key'];
		expect(keyA).toBeDefined();
		expect(keyA).not.toBe(keyB);
	});

	it('keeps the submit key off the status polls of one verification', async () => {
		const { calls } = await runNode({ operation: 'verify', claim: 'Some claim' }, (options) => {
			if (options.url === '/verify') {
				return { task_id: 'task_1' };
			}
			return { status: 'completed', result: { verdict: 'True', sources: [] } };
		});
		expect(calls[0].headers?.['Idempotency-Key']).toMatch(
			/^n8n:exec-1:[0-9a-z]+:verify:0:[0-9a-z]+$/,
		);
		expect(calls[1].headers?.['Idempotency-Key']).toBeUndefined();
	});

	it('gives two different claims different keys within one execution', async () => {
		const responder: Responder = (options) => {
			if (options.url === '/verify') {
				return { task_id: 'task_1' };
			}
			return { status: 'completed', result: { verdict: 'True', sources: [] } };
		};
		const a = await runNode({ operation: 'verify', claim: 'Claim A' }, responder);
		const b = await runNode({ operation: 'verify', claim: 'Claim B' }, responder);
		expect(a.calls[0].headers?.['Idempotency-Key']).not.toBe(
			b.calls[0].headers?.['Idempotency-Key'],
		);
	});
});

describe('Lenz node - error handling', () => {
	it('throws NodeOperationError for an unrecognized operation value', async () => {
		const { ctx } = createContext({ operation: 'not_a_real_operation' }, noCall);
		const node = new Lenz();
		// No request was made; this is a configuration problem, not an API
		// one. It used to surface as NodeApiError via the catch's fallback
		// wrapping (#23).
		await expect(node.execute.call(ctx)).rejects.toThrow(NodeOperationError);
	});

	it('routes a failure to an {error} item instead of throwing when continueOnFail is set', async () => {
		const responder: Responder = () => {
			throw new Error('Unauthorized');
		};
		const { output } = await runNode(
			{ operation: 'verify', claim: 'claim' },
			responder,
			/* continueOnFail */ true,
		);
		expect(output[0].json).toEqual({ error: 'Unauthorized' });
	});

	it('carries the wait and typed code on the error output, not just a message', async () => {
		// This is the branch the documented capacity recovery runs on:
		// error output -> Wait node -> back into this node. A Wait node cannot
		// read a number out of a prose string, so retry_after has to be a field.
		const { output } = await runNode(
			{ operation: 'verify', claim: 'claim' },
			() => {
				throw apiError(503, {
					detail: 'Lenz is at capacity right now.',
					code: 'capacity',
					retry_after: 100,
				});
			},
			/* continueOnFail */ true,
		);
		const json = output[0].json as IDataObject;
		expect(json.status_code).toBe(503);
		expect(json.code).toBe('capacity');
		expect(json.retry_after).toBe(100);
		expect(String(json.error_message)).toContain('at capacity');
		// `error` keeps its original value so existing workflows still read it.
		expect(typeof json.error).toBe('string');
	});

	it('carries the credit numbers on the error output, not only in the prose', async () => {
		// Same reason retry_after is a field. An IF node choosing between "top
		// up and retry" and "escalate, the plan is wrong" needs the shortfall
		// as a number; making it regex error_description is the prose-parsing
		// that failure_class and retryable were added to remove.
		const { output } = await runNode(
			{ operation: 'verify', claim: 'claim' },
			() => {
				throw apiError(402, {
					detail: 'No remaining claim checks.',
					code: 'no_credits',
					credits_remaining: 4,
					cost: 10,
				});
			},
			/* continueOnFail */ true,
		);
		const json = output[0].json as IDataObject;
		expect(json.status_code).toBe(402);
		expect(json.code).toBe('no_credits');
		expect(json.cost).toBe(10);
		expect(json.credits_remaining).toBe(4);
	});

	it('reports a zero balance instead of dropping it', async () => {
		// The case truthiness would lose, and the one that most needs its own
		// branch: nothing left at all is a plan decision, not a top-up.
		const { output } = await runNode(
			{ operation: 'verify', claim: 'claim' },
			() => {
				throw apiError(402, { detail: 'No credits.', credits_remaining: 0, cost: 10 });
			},
			/* continueOnFail */ true,
		);
		expect((output[0].json as IDataObject).credits_remaining).toBe(0);
	});

	it('omits the credit fields entirely when the body has none', async () => {
		// A 503 body carries no credit numbers; the keys must be absent rather
		// than present-and-undefined, or an IF node on credits_remaining sees a
		// field that is not there.
		const { output } = await runNode(
			{ operation: 'verify', claim: 'claim' },
			() => {
				throw apiError(503, { detail: 'At capacity.', code: 'capacity', retry_after: 30 });
			},
			/* continueOnFail */ true,
		);
		const json = output[0].json as IDataObject;
		expect(json).not.toHaveProperty('cost');
		expect(json).not.toHaveProperty('credits_remaining');
	});
});

describe('Lenz node - capacity (HTTP 503)', () => {
	// Admission control / provider outage: the API refuses the submit with a
	// typed body code and a stated wait. Transient by contract — the node must
	// say so, name the wait, and point at the Wait-node pattern. Explicitly NOT
	// Retry On Fail: 2-5 tries spaced a few seconds apart cannot clear a 90-120s
	// wait, and re-sending the submit that fast is the pile-on the server's
	// jitter exists to prevent.
	function capacityError(body: Record<string, unknown>) {
		return apiError(503, body);
	}

	async function expectCapacityError(body: Record<string, unknown>) {
		const { ctx } = createContext({ operation: 'verify', claim: 'claim' }, () => {
			throw capacityError(body);
		});
		const node = new Lenz();
		const err = await node.execute.call(ctx).then(
			() => null,
			(e: unknown) => e,
		);
		expect(err).toBeInstanceOf(NodeApiError);
		return err as NodeApiError;
	}

	it('names the wait and points at the Wait-node pattern for code: capacity', async () => {
		const err = await expectCapacityError({
			detail: 'Lenz is at capacity right now.',
			code: 'capacity',
			retry_after: 100,
		});
		expect(err.message).toContain('at capacity');
		expect(err.message).toContain('100s');
		expect(err.description).toContain('Wait node');
		expect(err.description).toContain('100 seconds');
		expect(err.description).toContain('Nothing was charged');
		expect(err.httpCode).toBe('503');
	});

	it('does not prescribe Retry On Fail as the remedy', async () => {
		// Max Tries is 2-5 with a short gap between them, so it would burn every
		// try inside the stated wait and fail anyway — while re-submitting each
		// time. If the text mentions it at all, it must be to rule it out.
		const err = await expectCapacityError({
			detail: 'Lenz is at capacity right now.',
			code: 'capacity',
			retry_after: 100,
		});
		const description = String(err.description ?? '');
		if (description.includes('Retry On Fail')) {
			expect(description).toMatch(/not enough|isn't enough|too closely/i);
		}
		expect(err.message).not.toContain('Retry On Fail');
	});

	it('handles code: upstream_unavailable with a default wait when none is stated', async () => {
		const err = await expectCapacityError({
			detail: 'Providers down.',
			code: 'upstream_unavailable',
		});
		expect(err.message).toContain('providers');
		expect(err.message).toContain('90s');
		expect(err.description).toContain('Wait node');
		expect(err.description).toContain('90 seconds');
	});

	it('leaves a plain 503 without a typed code on the generic path', async () => {
		const { ctx } = createContext({ operation: 'verify', claim: 'claim' }, () => {
			throw apiError(503);
		});
		const node = new Lenz();
		const err = (await node.execute.call(ctx).then(
			() => null,
			(e: unknown) => e,
		)) as NodeApiError;
		expect(err).toBeInstanceOf(NodeApiError);
		expect(err.message).not.toContain('Wait node');
		expect(String(err.description ?? '')).not.toContain('Wait node');
		expect(String(err.description ?? '')).not.toContain('Nothing was charged');
	});
});

describe('Lenz node - quota (HTTP 402)', () => {
	const QUOTA_BODY = {
		detail: 'No remaining claim checks.',
		code: 'no_credits',
		upgrade_url: 'https://lenz.io/plans',
		// `remaining` is in the capability's own unit (verifications);
		// `credits_remaining` and `cost` are in credits. Both are on the body.
		remaining: 0,
		credits_remaining: 4,
		cost: 10,
		resets_at: '2026-09-01T00:00:00+00:00',
	};

	// A raw transport error, i.e. what a direct helpers.httpRequest call throws.
	// The status can land on any of several fields there, so the variants are
	// exercised separately — but note this is NOT what reaches the node in
	// production; see `apiError` for that path.
	function rawQuotaError(extra: Record<string, unknown>) {
		return Object.assign(new Error('Request failed with status code 402'), {
			body: QUOTA_BODY,
			...extra,
		});
	}

	async function expectQuotaErrorFrom(thrown: unknown) {
		const { ctx } = createContext({ operation: 'verify', claim: 'claim' }, () => {
			throw thrown;
		});
		const node = new Lenz();
		const err = await node.execute.call(ctx).then(
			() => null,
			(e: unknown) => e,
		);
		expect(err).toBeInstanceOf(NodeApiError);
		return err as NodeApiError;
	}

	it('derives httpCode from the original error rather than nulling it', async () => {
		// The pre-0.2.0 handler re-wrapped every failure as
		// `new NodeApiError(node, { message })`. A bare {message} carries no
		// status, so httpCode was ALWAYS null and the node was structurally
		// blind to 402 vs 403 vs 429 no matter what the server sent.
		const err = await expectQuotaErrorFrom(apiError(402, QUOTA_BODY));
		expect(err.httpCode).toBe('402');
	});

	it('names the billing condition instead of a generic API failure', async () => {
		const err = await expectQuotaErrorFrom(apiError(402, QUOTA_BODY));
		expect(err.message).toContain('No remaining claim checks.');
		expect(err.description).toContain('lenz.io/plans');
		// Must not tell the user to retry — a 402 never clears on retry.
		expect(err.description).toContain('Retrying will not help');
	});

	it('surfaces the reset time when the server states one', async () => {
		const err = await expectQuotaErrorFrom(apiError(402, QUOTA_BODY));
		expect(err.description).toContain('2026-09-01');
	});

	it('quotes the cost beside the balance so the user can size the shortfall', async () => {
		// "4 credits, this needs 10" is one top-up away. "0 credits" is a plan
		// decision. Without both numbers the message cannot tell them apart.
		const err = await expectQuotaErrorFrom(apiError(402, QUOTA_BODY));
		expect(err.description).toContain('costs 10 credits');
		expect(err.description).toContain('you have 4 left');
	});

	it('omits the balance line rather than printing undefined', async () => {
		// Both fields are omitted by the API when unresolvable — never null —
		// so the node must render nothing rather than "costs undefined credits".
		const withoutCredits = { ...QUOTA_BODY };
		delete (withoutCredits as Partial<typeof QUOTA_BODY>).cost;
		delete (withoutCredits as Partial<typeof QUOTA_BODY>).credits_remaining;
		const err = await expectQuotaErrorFrom(apiError(402, withoutCredits));
		expect(err.description).not.toContain('undefined');
		expect(err.description).not.toContain('costs');
		expect(err.description).toContain('Retrying will not help');
	});

	it('says "credit" in the singular for a one-credit call', async () => {
		const err = await expectQuotaErrorFrom(apiError(402, { ...QUOTA_BODY, cost: 1 }));
		expect(err.description).toContain('costs 1 credit and');
	});

	it('recognises the status wherever the transport puts it', async () => {
		for (const shape of [
			{ statusCode: 402 },
			{ status: 402 },
			{ httpCode: '402' },
			{ response: { status: 402 } },
		]) {
			const err = await expectQuotaErrorFrom(rawQuotaError(shape));
			expect(err.message).toContain('No remaining claim checks.');
		}
	});

	it('leaves a non-402 failure on the generic path', async () => {
		const { ctx } = createContext({ operation: 'verify', claim: 'claim' }, () => {
			throw apiError(403, { detail: 'This report is private.', code: 'private_claim' }, 'Forbidden');
		});
		const node = new Lenz();
		const err = (await node.execute.call(ctx).then(
			() => null,
			(e: unknown) => e,
		)) as NodeApiError;
		expect(err).toBeInstanceOf(NodeApiError);
		expect(err.httpCode).toBe('403');
		expect(err.description ?? '').not.toContain('lenz.io/plans');
	});
});

describe('Lenz node - Verify poll resilience', () => {
	// Credits are debited when POST /verify is accepted, so every failure below
	// lands on a claim the caller has ALREADY paid for. These paths had no
	// coverage at all: every other verify test hands back a terminal status on
	// the first poll, so the retry, the multi-poll backoff and the timeout
	// branch were never executed by the suite.
	const sleepMock = sleep as unknown as jest.Mock;

	beforeEach(() => {
		sleepMock.mockClear();
	});

	/** Submit succeeds, then each GET consumes one step of `steps`. */
	function polling(steps: Array<() => unknown>): Responder {
		let idx = 0;
		return (options) => {
			if (options.method === 'POST' && options.url === '/verify') {
				return { task_id: 'task_1' };
			}
			if (options.method === 'GET' && options.url === '/verify/status/task_1') {
				const step = steps[Math.min(idx, steps.length - 1)];
				idx += 1;
				return step();
			}
			throw new Error(`unexpected request: ${options.method} ${options.url}`);
		};
	}

	const processing = () => ({ status: 'processing' });
	const completed = () => ({
		status: 'completed',
		result: { verdict: 'True', confidence: 'high', verification_id: 'ver_1' },
	});

	it('retries a transient 502 mid-poll instead of losing the paid-for task', async () => {
		const { output, calls } = await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			polling([
				() => {
					throw apiError(502, undefined, 'Bad gateway');
				},
				completed,
			]),
		);

		const json = output[0].json as IDataObject;
		expect(json.status).toBe('completed');
		expect(json.passed).toBe(true);
		// the failed poll and the retry that recovered it
		expect(calls.filter((c) => c.method === 'GET').length).toBe(2);
		// And it BACKED OFF between them. Without this the assertion above is
		// satisfied by a hot loop, which would hammer an already-struggling
		// status endpoint for the whole window — the opposite of the point.
		expect(sleepMock.mock.calls[0][0]).toBe(2000);
	});

	it('retries a 429 — the failure a 2s poll cadence is most likely to cause', async () => {
		const { output } = await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			polling([
				() => {
					throw apiError(429, { retry_after: 1 }, 'Too many requests');
				},
				completed,
			]),
		);

		expect((output[0].json as IDataObject).status).toBe('completed');
	});

	it('gives a status-less error a bounded retry, then surfaces it instead of faking a timeout', async () => {
		const { output, calls } = await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			polling([
				() => {
					throw new Error('getaddrinfo ENOTFOUND api.lenz.io');
				},
			]),
			true, // continueOnFail
		);

		const json = output[0].json as IDataObject;
		// The real failure reaches the caller — NOT swallowed into a made-up
		// `status: 'timeout'` claiming the verification is still running.
		// (n8n rewrites a bare network Error into its own connection wording,
		// so assert the shape rather than the original string.)
		expect(json.status).toBeUndefined();
		expect(json.error).toBeDefined();
		expect(json.task_id).toBe('task_1');
		// Bounded: two retries, not the whole Max Wait window.
		expect(calls.filter((c) => c.method === 'GET').length).toBe(3);
	});

	it('does NOT retry a 4xx, and still hands back the task_id', async () => {
		const { output } = await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			polling([
				() => {
					throw apiError(404, undefined, 'Not found');
				},
			]),
			true, // continueOnFail
		);

		const json = output[0].json as IDataObject;
		expect(json.error).toBeDefined();
		// The point of the issue: the receipt survives the failure.
		expect(json.task_id).toBe('task_1');
	});

	it('puts the task_id in the thrown error too, for workflows with no error output', async () => {
		const err = (await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			polling([
				() => {
					throw apiError(404, undefined, 'Not found');
				},
			]),
		).then(
			() => {
				throw new Error('expected the node to throw');
			},
			(e: unknown) => e,
		)) as NodeApiError;
		expect(err.description ?? '').toContain('task_1');
	});

	it('walks the documented backoff across several polls', async () => {
		await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			polling([processing, processing, processing, completed]),
		);

		const waits = sleepMock.mock.calls.map((c) => c[0]);
		expect(waits.slice(0, 3)).toEqual([2000, 4000, 8000]);
	});

	// `sleep` is mocked instant but the deadline reads the real clock, so a
	// genuine give-up would spin on wall-clock time (an in-range Max Wait of 10
	// spins for ten seconds; a bigger one exhausts the heap). Driving Date.now
	// makes the deadline paths testable and deterministic instead.
	function fakeClock(stepMs = 1000) {
		let t = 1_000_000;
		return jest.spyOn(Date, 'now').mockImplementation(() => {
			t += stepMs;
			return t;
		});
	}

	function pollCount(calls: IHttpRequestOptions[]) {
		return calls.filter((c) => c.method === 'GET').length;
	}

	it('gives up at Max Wait with a timeout that names the task and defines passed', async () => {
		const clock = fakeClock();
		try {
			const { output, calls } = await runNode(
				{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 10 },
				polling([processing]),
			);

			const json = output[0].json as IDataObject;
			expect(json.status).toBe('timeout');
			expect(json.task_id).toBe('task_1');
			// Present and null, so the key shows up in n8n's output schema.
			// NOTE: null is still falsy — an IF on `passed` alone routes a
			// timeout down the false arm regardless. Checking `status` first is
			// the real fix, which is why the README pattern leads with it.
			expect(json).toHaveProperty('passed', null);
			// Grounded in what was actually seen, so the message can't claim
			// knowledge the node never had.
			expect(json).toHaveProperty('last_status', 'processing');
			// It really polled and really ran out of time — the old version of
			// this test passed a zero deadline and never entered the loop.
			expect(pollCount(calls)).toBeGreaterThan(0);
		} finally {
			clock.mockRestore();
		}
	});

	it('polls for longer when Max Wait is raised, so the parameter is load-bearing', async () => {
		const shortClock = fakeClock();
		let shortPolls: number;
		try {
			const { calls } = await runNode(
				{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 10 },
				polling([processing]),
			);
			shortPolls = pollCount(calls);
		} finally {
			shortClock.mockRestore();
		}

		const longClock = fakeClock();
		let longPolls: number;
		try {
			const { calls } = await runNode(
				{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 120 },
				polling([processing]),
			);
			longPolls = pollCount(calls);
		} finally {
			longClock.mockRestore();
		}

		expect(longPolls).toBeGreaterThan(shortPolls);
	});

	it('refuses a non-numeric Max Wait instead of timing out on a claim it never polled', async () => {
		const err = (await runNode(
			{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 'two minutes' },
			polling([processing]),
		).then(
			() => {
				throw new Error('expected the node to throw');
			},
			(e: unknown) => e,
		)) as Error;
		expect(err.message).toContain('Max Wait');
	});

	it('never reports one item’s task_id on another item’s error', async () => {
		let submits = 0;
		const responder: Responder = (options) => {
			if (options.method === 'POST' && options.url === '/verify') {
				submits += 1;
				// The second item fails at submit, so it was never charged and
				// must carry no receipt — a task id on an error that says the
				// caller paid is worse than no id at all.
				if (submits === 2) {
					throw apiError(400, undefined, 'Bad request');
				}
				return { task_id: 'task_1' };
			}
			return completed();
		};

		const { output } = await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			responder,
			true, // continueOnFail
			2, // itemCount
		);

		expect((output[0].json as IDataObject).status).toBe('completed');
		const second = output[1].json as IDataObject;
		expect(second.error).toBeDefined();
		expect(second.task_id).toBeUndefined();
	});

	it('rejects a non-numeric Max Wait BEFORE the claim is submitted and charged', async () => {
		const { ctx, calls } = createContext(
			{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 'two minutes' },
			polling([processing]),
		);

		await expect(new Lenz().execute.call(ctx)).rejects.toBeInstanceOf(NodeOperationError);

		// The whole point. Validated at the point of USE, this check sat after
		// POST /verify: the claim was charged, then a bad expression threw, and
		// the NodeOperationError rethrow built a fresh error that dropped the
		// task_id — recreating the exact lost-verification bug the rest of this
		// block exists to prevent. A pure parameter read has no business
		// running after the money is spent.
		expect(calls.filter((c) => c.method === 'POST' && c.url === '/verify')).toHaveLength(0);
	});

	it('counts unclassifiable blips consecutively, not across the whole window', async () => {
		const blip = () => {
			throw new Error('socket hang up');
		};

		const { output, calls } = await runNode(
			{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 900 },
			// Three blips, each RECOVERED by a healthy poll before the next one.
			// Cumulatively that is past the budget of 2; consecutively it never
			// exceeds 1, and the verification is demonstrably alive throughout.
			// Left cumulative, this killed a healthy task on the third hiccup
			// with ~890s of the window unspent.
			polling([blip, processing, blip, processing, blip, processing, completed]),
		);

		expect((output[0].json as IDataObject).status).toBe('completed');
		expect(pollCount(calls)).toBe(7);
	});

	it('names the poll failure the window ended on instead of implying the task was seen', async () => {
		const clock = fakeClock();
		try {
			const { output } = await runNode(
				{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 10 },
				polling([
					() => {
						throw apiError(500, undefined, 'Internal server error');
					},
				]),
			);

			const json = output[0].json as IDataObject;
			expect(json.status).toBe('timeout');
			// Never once reached the status endpoint, and says so.
			expect(json.last_status).toBeNull();
			// Before this, a window spent entirely on 500s came back as an
			// ordinary timeout on the SUCCESS path: the workflow's error branch
			// never fired, and nothing anywhere recorded that every read failed.
			// Retrying was right; discarding what was retried was not.
			expect(json.last_error_status).toBe(500);
			expect(typeof json.last_error).toBe('string');
			expect(String(json.last_error).length).toBeGreaterThan(0);
			expect(String(json.message)).toContain('last attempt');
		} finally {
			clock.mockRestore();
		}
	});

	it('clears the recorded poll error once a poll gets through', async () => {
		const clock = fakeClock();
		try {
			const { output } = await runNode(
				{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 10 },
				polling([
					() => {
						throw apiError(503, { code: 'capacity' }, 'Service unavailable');
					},
					processing,
				]),
			);

			const json = output[0].json as IDataObject;
			expect(json.status).toBe('timeout');
			// The 503 was recovered, so reporting it as the reason the window
			// ended would be as misleading as omitting it when it was.
			expect(json.last_error).toBeNull();
			expect(json.last_status).toBe('processing');
		} finally {
			clock.mockRestore();
		}
	});

	it('waits the reopening time a 429 states rather than its own cadence', async () => {
		const { output } = await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			polling([
				() => {
					throw apiError(429, { retry_after: 30 }, 'Too many requests');
				},
				completed,
			]),
		);

		expect((output[0].json as IDataObject).status).toBe('completed');
		// 30s as stated, not the ladder's opening 2s. Returning on our own
		// cadence is what tripped the limiter, so it just trips it again and
		// burns the window on retries that cannot succeed.
		expect(sleepMock.mock.calls[0][0]).toBe(30000);
	});

	it('reads the rate-limit body’s own spelling of the wait', async () => {
		// A 503 states `retry_after`; the 429 rate-limit body states
		// `reset_in_seconds`. Both are seconds and both must be honoured.
		await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			polling([
				() => {
					throw apiError(
						429,
						{ code: 'rate_limited', reset_in_seconds: 45 },
						'Too many requests',
					);
				},
				completed,
			]),
		);

		expect(sleepMock.mock.calls[0][0]).toBe(45000);
	});

	it('falls back to the ladder when a 429 states no wait, rather than not waiting', async () => {
		await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			polling([
				() => {
					throw apiError(429, { code: 'rate_limited' }, 'Too many requests');
				},
				completed,
			]),
		);

		expect(sleepMock.mock.calls[0][0]).toBe(2000);
	});

	it('waits the poll_after_seconds a processing response states', async () => {
		await runNode(
			{ operation: 'verify', claim: 'Some claim' },
			polling([
				() => ({
					status: 'processing',
					progress: { step: 'research', index: 2, total: 5, poll_after_seconds: 15 },
				}),
				completed,
			]),
		);

		// The server knows which stage it is in and how long it runs; the
		// 2/4/8s ladder does not. 15s as stated, not the ladder's opening 2s.
		expect(sleepMock.mock.calls[0][0]).toBe(15000);
	});

	it('keeps its own cadence when poll_after_seconds is out of range', async () => {
		// Per the API's own guidance: out-of-range is absent. 0 would be a hot
		// loop, an hour would outrun Max Wait, and a string is nothing at all.
		for (const bad of [0, -5, 3600, 'soon', null]) {
			sleepMock.mockClear();
			await runNode(
				{ operation: 'verify', claim: 'Some claim' },
				polling([
					() => ({ status: 'processing', progress: { step: 'research', poll_after_seconds: bad } }),
					completed,
				]),
			);
			expect(sleepMock.mock.calls[0][0]).toBe(2000);
		}
	});

	// Like fakeClock, but the mocked sleep ADVANCES it by the slept amount, so a
	// clamped sleep really does spend the rest of the window. fakeClock steps a
	// fixed 1s per read whatever was slept, which cannot tell "slept 60s then
	// read once more" from "read ten times" — and that is the difference under
	// test here.
	function sleepingClock(readCostMs = 100) {
		let t = 1_000_000;
		const nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => {
			t += readCostMs;
			return t;
		});
		sleepMock.mockImplementation(async (ms: number) => {
			t += ms;
		});
		return {
			restore() {
				nowSpy.mockRestore();
				sleepMock.mockImplementation(async () => {});
			},
		};
	}

	it('clamps a stated poll wait to what is left of Max Wait, then reads once more', async () => {
		const clock = sleepingClock();
		try {
			const { output, calls } = await runNode(
				{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 10 },
				polling([
					() => ({ status: 'processing', progress: { step: 'research', poll_after_seconds: 60 } }),
				]),
			);
			// 60s stated, but only ~10s of window: the sleep is the remainder,
			// never the full 60.
			expect(sleepMock.mock.calls[0][0]).toBeLessThanOrEqual(10000);
			expect((output[0].json as IDataObject).status).toBe('timeout');
			// And every sleep is FOLLOWED by a read — including the last one.
			// Under the old `while (Date.now() < deadline)` the final sleep was
			// followed by the loop exiting, so polls equalled sleeps and a
			// verdict that arrived during that sleep was never looked at. Now
			// waitForNextPoll declines to sleep once the window is spent, so
			// the loop ends on a read, not a wait: polls = sleeps + 1.
			expect(pollCount(calls)).toBe(sleepMock.mock.calls.length + 1);
			// And because sleepingClock moves by the slept amount, that is
			// concretely one read, one clamped sleep that spends the window,
			// one final read. This is the assertion that pins the fix — under
			// the old loop it is 1.
			expect(pollCount(calls)).toBe(2);
		} finally {
			clock.restore();
		}
	});

	it('still finds a verdict that arrived during the final clamped sleep', async () => {
		const clock = sleepingClock();
		try {
			const { output, calls } = await runNode(
				{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 10 },
				polling([
					() => ({ status: 'processing', progress: { step: 'research', poll_after_seconds: 60 } }),
					completed,
				]),
			);
			// The whole point of the final read. Without it this run was one
			// poll then `timeout`, telling the user credits were spent and to
			// come back later — for a verdict that was sitting there before
			// the window closed. Under the ladder the same task was found.
			expect((output[0].json as IDataObject).status).toBe('completed');
			expect(pollCount(calls)).toBe(2);
		} finally {
			clock.restore();
		}
	});

	// lenzhq/Lenz#889. A real run: the node returned `timeout` at 120s, the
	// verification finished in Lenz with a verdict, the credits were taken, and
	// the workflow never got the result. Lenz measures a standard-depth run —
	// this node's default depth — at about 90s median with the tail past 120s.
	//
	// Twenty `processing` reads on the 2/4/8s ladder is about 150s of sleeping,
	// then the verdict: the slow-but-healthy tail #889 describes.
	const finishesAt150s = () =>
		polling([...Array.from({ length: 20 }, () => processing), completed]);

	it('waits long enough by default for a standard run that outlasts 120s', async () => {
		const clock = sleepingClock();
		try {
			// No maxWaitSeconds at all — the case that matters, because n8n
			// does not save a parameter left at its default, so this is every
			// Verify node nobody tuned.
			const { output } = await runNode({ operation: 'verify', claim: 'Some claim' }, finishesAt150s());
			expect((output[0].json as IDataObject).status).toBe('completed');
		} finally {
			clock.restore();
		}
	});

	it('still returns timeout when a run genuinely outlasts an explicit Max Wait', async () => {
		// The mirror of the test above, so it cannot pass by never timing out:
		// the same 150s run against an explicit 120s ceiling gives up.
		const clock = sleepingClock();
		try {
			const { output } = await runNode(
				{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 120 },
				finishesAt150s(),
			);
			expect((output[0].json as IDataObject).status).toBe('timeout');
		} finally {
			clock.restore();
		}
	});

	it('returns a fast verification as soon as it finishes, whatever the ceiling', async () => {
		// Max Wait is a ceiling, not a delay. Raising the default must not make
		// an ordinary run any slower — the reason raising it was safe to ship
		// to existing workflows.
		const clock = sleepingClock();
		try {
			const { output, calls } = await runNode(
				{ operation: 'verify', claim: 'Some claim' },
				polling([processing, completed]),
			);
			expect((output[0].json as IDataObject).status).toBe('completed');
			expect(pollCount(calls)).toBe(2);
			const slept = sleepMock.mock.calls.reduce((sum, [ms]) => sum + (ms as number), 0);
			expect(slept).toBe(2000);
		} finally {
			clock.restore();
		}
	});

	// A poll 429 carrying a daily-cap reset. The status endpoint can answer with
	// the same limiter body the /extract cap uses, and `reset_in_seconds` there
	// runs to hours. The loop honours a stated 429 wait so as not to re-trip a
	// limiter on its own 2/4/8s ladder — but uncapped, "honour" meant sleeping
	// the whole remaining Max Wait in one go on a verification already charged.
	const dailyCapPoll = () => {
		throw apiError(429, { detail: 'Rate limited.', code: 'rate_limited', reset_in_seconds: 32400 });
	};

	it('caps a stated poll 429 wait instead of sleeping away the window', async () => {
		const clock = sleepingClock();
		try {
			await runNode(
				{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 900 },
				polling([dailyCapPoll, completed]),
			);
			// 60s, not ~900s. Uncapped, this sleep was min(32400s, remaining),
			// i.e. the entire Max Wait: a verdict ready a minute in was not seen
			// for fifteen.
			expect(sleepMock.mock.calls[0][0]).toBe(60000);
		} finally {
			clock.restore();
		}
	});

	it('keeps polling through a persistent 429 and still finds the verdict', async () => {
		const clock = sleepingClock();
		try {
			const { output, calls } = await runNode(
				{ operation: 'verify', claim: 'Some claim', maxWaitSeconds: 900 },
				polling([dailyCapPoll, dailyCapPoll, dailyCapPoll, completed]),
			);
			// The sharper failure. Uncapped, the first 429 slept the whole window,
			// the single final read landed on the SECOND 429, the deadline was
			// spent, and the result was `timeout` — telling the caller to fetch
			// later a verdict the node could have returned. Capped, it reads
			// every minute and gets there.
			expect((output[0].json as IDataObject).status).toBe('completed');
			expect(pollCount(calls)).toBe(4);
		} finally {
			clock.restore();
		}
	});
});

describe('Lenz node - Max Wait default', () => {
	const maxWait = () => new Lenz().description.properties.find((p) => p.name === 'maxWaitSeconds');

	it('defaults to 300 seconds', () => {
		expect(maxWait()?.default).toBe(300);
	});

	it('agrees with the fallback the node applies', () => {
		// Two copies of one number — the field's default must be a literal for
		// n8n's lint, and execute() falls back to POLL_TIMEOUT_MS. If they
		// drift, the UI promises one wait and the node applies another, and
		// only one of the two paths would ever be tested.
		expect(maxWait()?.default).toBe(POLL_TIMEOUT_MS / 1000);
	});

	it('sits inside the range the field advertises', () => {
		const opts = maxWait()?.typeOptions as { minValue: number; maxValue: number };
		expect(maxWait()?.default).toBeGreaterThanOrEqual(opts.minValue);
		expect(maxWait()?.default).toBeLessThanOrEqual(opts.maxValue);
	});
});

describe('Lenz node - rate limit (HTTP 429)', () => {
	// The /extract daily cap, and any other rate limit. Extract Claims is free
	// and capped per account per day, so this is the refusal a busy workflow
	// meets most — and the one the node had no typed handling for at all: it
	// arrived as n8n's stock "Request failed with status code 429", and the
	// error output carried no `retry_after`, because the branch read
	// `body.retry_after` and a 429 states `reset_in_seconds` instead.
	//
	// The real body shape, per the API: { detail, code, limit,
	// reset_in_seconds, upgrade_url }.
	const dailyCap = {
		detail: 'Daily extract cap reached.',
		code: 'rate_limited',
		limit: 1000,
		reset_in_seconds: 32400,
		upgrade_url: 'https://lenz.io/plans',
	};

	const burst = {
		detail: 'Too many requests.',
		code: 'rate_limited',
		limit: 60,
		reset_in_seconds: 45,
	};

	async function expectRateLimitError(body: Record<string, unknown>) {
		const { ctx } = createContext({ operation: 'extract', text: 'Some text' }, () => {
			throw apiError(429, body);
		});
		const err = await new Lenz().execute.call(ctx).then(
			() => null,
			(e: unknown) => e,
		);
		expect(err).toBeInstanceOf(NodeApiError);
		return err as NodeApiError;
	}

	it('names the cap, the reset and that nothing was charged', async () => {
		const err = await expectRateLimitError(dailyCap);
		expect(err.message).toContain('Daily extract cap reached');
		expect(err.description).toContain('Nothing was charged');
		expect(err.description).toContain('1000');
		expect(err.httpCode).toBe('429');
		// Not n8n's stock wording, which named none of the above.
		expect(err.message).not.toContain('Request failed with status code');
	});

	it('reports a long reset in hours, not five digits of seconds', async () => {
		const err = await expectRateLimitError(dailyCap);
		// 32400s is 9 hours. Nobody reads that as a number of seconds.
		expect(err.message).toContain('9 hours');
		expect(err.message).not.toContain('32400');
	});

	it('does NOT prescribe a Wait node for a reset that lasts most of a day', async () => {
		// The 503 advice copied verbatim would park an execution until
		// midnight UTC, which is worse than failing.
		const err = await expectRateLimitError(dailyCap);
		// Asserted on what the advice tells the user to DO, not on a phrase.
		// The earlier wording claimed a Wait node "holds the execution open",
		// which overstated n8n's internals — it offloads long waits — so the
		// reason changed while the advice did not.
		expect(err.description).toContain('too long to wait inside a workflow');
		expect(err.description).toContain('Re-run the workflow after the reset');
		expect(err.description).toContain('https://lenz.io/plans');
		// And it must not send them to the Wait-node loop.
		expect(err.description).not.toContain('Wait node set');
	});

	it('DOES prescribe the Wait-node loop for a short burst limit', async () => {
		const err = await expectRateLimitError(burst);
		expect(err.message).toContain('45s');
		expect(err.description).toContain('Wait node');
		expect(err.description).toContain('retry_after');
	});

	it('carries retry_after on the error output, read from reset_in_seconds', async () => {
		// The headline bug: the documented Wait-node recovery fed the Wait node
		// `undefined`, because the error output only ever read `retry_after`.
		const { output } = await runNode(
			{ operation: 'extract', text: 'Some text' },
			() => {
				throw apiError(429, burst);
			},
			true, // continueOnFail
		);

		const json = output[0].json as IDataObject;
		expect(json.retry_after).toBe(45);
		expect(json.status_code).toBe(429);
		expect(json.code).toBe('rate_limited');
		expect(json.error_message).toContain('Too many requests');
		expect(json.error_description).toContain('Nothing was charged');
	});

	it('still carries the 503 spelling, so capacity refusals are unaffected', async () => {
		const { output } = await runNode(
			{ operation: 'verify', claim: 'A claim' },
			() => {
				throw apiError(503, { code: 'capacity', retry_after: 90 });
			},
			true, // continueOnFail
		);
		expect((output[0].json as IDataObject).retry_after).toBe(90);
	});

	it('omits retry_after when the body states no wait, rather than inventing one', async () => {
		const { output } = await runNode(
			{ operation: 'extract', text: 'Some text' },
			() => {
				throw apiError(429, { detail: 'Slow down.', code: 'rate_limited' });
			},
			true, // continueOnFail
		);
		const json = output[0].json as IDataObject;
		expect(json).not.toHaveProperty('retry_after');
		// A Wait node reading an absent key gets nothing, which is honest; a
		// fabricated 0 would loop instantly and re-trip the limiter.
		expect(json.error_description).toContain('Retry later');
	});


	it('does NOT put a day-long cap reset in retry_after, so old workflows still fail fast', async () => {
		// The regression this split exists to prevent. A workflow already wired
		// to the documented pattern (error output -> Wait `{{ $json.retry_after }}`
		// -> loop) got `undefined` here before 429 handling existed, and failed
		// fast. Emitting 32400 would have made it park for nine hours with no
		// warning and nothing to branch on — and docs cannot reach a workflow
		// already saved on someone's instance.
		const { output } = await runNode(
			{ operation: 'extract', text: 'Some text' },
			() => {
				throw apiError(429, dailyCap);
			},
			true, // continueOnFail
		);

		const json = output[0].json as IDataObject;
		expect(json).not.toHaveProperty('retry_after');
		expect(json.resets_in_seconds).toBe(32400);
	});

	it('does not blame the user plan for a 429 that never reached Lenz', async () => {
		// A CDN, WAF or egress throttle answers 429 with no JSON body. Reporting
		// that as "raise your Lenz cap", with a billing link, names the wrong
		// cause and sells a fix for a problem they do not have.
		const err = await expectRateLimitError({});
		expect(err.message).toContain('before it reached Lenz');
		expect(err.description).not.toContain('stated limit');
		// The half that used to slip through: the headline said "never
		// reached Lenz" and the description still ended "raise the cap:
		// https://lenz.io/plans". A plan change cannot lift a CDN's limit.
		expect(err.description).not.toContain('raise the cap');
		expect(err.description).not.toContain('lenz.io/plans');
		expect(err.description).toContain("not Lenz's own");
		expect(err.httpCode).toBe('429');
	});

	it('still offers the upgrade path for a Lenz limit that states no wait', async () => {
		// The mirror, so the gate above cannot pass by never offering it.
		const err = await expectRateLimitError({ detail: 'Slow down.', code: 'rate_limited' });
		expect(err.description).toContain('raise the cap');
	});

	it('names the Wait unit, because the Wait node defaults to hours', async () => {
		// n8n's Wait node ships with Wait Unit = Hours. Advice that says only
		// "set it to {{ $json.retry_after }}" turns a 45-second limit into a
		// 45-hour wait for anyone who leaves the unit alone.
		const err = await expectRateLimitError({
			detail: 'Too many requests.',
			code: 'rate_limited',
			reset_in_seconds: 45,
		});
		expect(err.description).toContain('Wait Unit set to Seconds');
		expect(err.description).toContain('defaults to Hours');
	});

	it('names the Wait unit on a capacity 503 too', async () => {
		const { ctx } = createContext({ operation: 'verify', claim: 'claim' }, () => {
			throw apiError(503, { code: 'capacity', retry_after: 90 });
		});
		const err = (await new Lenz().execute.call(ctx).then(
			() => null,
			(e: unknown) => e,
		)) as NodeApiError;
		expect(err.description).toContain('Wait Unit: Seconds');
		expect(err.description).toContain('90 seconds');
	});

	it('does not contradict itself on a Lenz 429 that lacks a code', async () => {
		// Keyed on `code` alone, this read as foreign: Lenz's own text as the
		// headline, then "This limit is not Lenz's own" underneath it.
		const err = await expectRateLimitError({ detail: 'Slow down.' });
		expect(err.message).toContain('Slow down.');
		expect(err.description).not.toContain("not Lenz's own");
		expect(err.description).toContain('raise the cap');
	});

	it('states the real duration of a long reset rather than "hours"', async () => {
		// A ten-minute burst limit is over the Wait-node threshold, and used to
		// be told the execution "stays pending for hours".
		const err = await expectRateLimitError({
			detail: 'Too many requests.',
			code: 'rate_limited',
			reset_in_seconds: 600,
		});
		expect(err.description).toContain('~10 minutes');
		expect(err.description).not.toContain('hours');
	});

	it('carries limit and upgrade_url only for a Lenz rate limit', async () => {
		// Not from any body that happens to hold the key — a proxy 429, or an
		// unrelated error with a numeric `limit`, is not Lenz's limit.
		const { output } = await runNode(
			{ operation: 'extract', text: 'Some text' },
			() => {
				throw apiError(400, { detail: 'Bad input.', limit: 50, upgrade_url: 'https://x.test' });
			},
			true, // continueOnFail
		);
		const json = output[0].json as IDataObject;
		expect(json).not.toHaveProperty('limit');
		expect(json).not.toHaveProperty('upgrade_url');
	});

	it('carries upgrade_url on an out-of-credits 402, where topping up is the fix', async () => {
		const { output } = await runNode(
			{ operation: 'verify', claim: 'A claim' },
			() => {
				throw apiError(402, {
					detail: 'No credits.',
					cost: 10,
					credits_remaining: 0,
					upgrade_url: 'https://lenz.io/plans',
				});
			},
			true, // continueOnFail
		);
		expect((output[0].json as IDataObject).upgrade_url).toBe('https://lenz.io/plans');
	});

	it('keeps retry_after on a long 503 — only a 429 is split', async () => {
		// A 503 always emitted retry_after, and its own message says to set a
		// Wait node to it. Splitting it at 300s like a cap reset handed that
		// documented Wait node `undefined`.
		const { output } = await runNode(
			{ operation: 'verify', claim: 'A claim' },
			() => {
				throw apiError(503, { code: 'capacity', retry_after: 400 });
			},
			true, // continueOnFail
		);
		const json = output[0].json as IDataObject;
		expect(json.retry_after).toBe(400);
		expect(json).not.toHaveProperty('resets_in_seconds');
	});

	it('does not render an empty detail as a bare full stop', async () => {
		const err = await expectRateLimitError({
			detail: '',
			code: 'rate_limited',
			reset_in_seconds: 45,
		});
		expect(err.message).not.toContain('Lenz: .');
		expect(err.message).toContain('Rate limit reached');
	});

	it('carries limit and upgrade_url so a workflow can tell which cap it hit', async () => {
		// Without these, a 45-second burst limit and a nine-hour daily cap are
		// indistinguishable on the wire: same status_code, same code, and a
		// retry_after differing only in magnitude. The judgement about which is
		// which stays the caller's — branch on `retry_after > 300` — but the
		// facts the API stated should not be locked inside English prose.
		const { output } = await runNode(
			{ operation: 'extract', text: 'Some text' },
			() => {
				throw apiError(429, dailyCap);
			},
			true, // continueOnFail
		);

		const json = output[0].json as IDataObject;
		expect(json.limit).toBe(1000);
		expect(json.upgrade_url).toBe('https://lenz.io/plans');
		expect(json.resets_in_seconds).toBe(32400);
	});

	it('does not run two sentences together when detail lacks punctuation', async () => {
		// `detail` is free text. "Rate limit exceeded" with no full stop used to
		// render as "Lenz: Rate limit exceeded Resets in ~9 hours."
		const err = await expectRateLimitError({
			detail: 'Rate limit exceeded',
			code: 'rate_limited',
			reset_in_seconds: 32400,
		});
		expect(err.message).toContain('Rate limit exceeded. Resets in');
		expect(err.message).not.toContain('exceeded Resets');
	});

	it('does not double the full stop when detail already has one', async () => {
		const err = await expectRateLimitError(burst);
		expect(err.message).not.toContain('..');
	});

	it('leaves a 402 without a retry_after, since topping up is not a wait', async () => {
		const { output } = await runNode(
			{ operation: 'verify', claim: 'A claim' },
			() => {
				throw apiError(402, { detail: 'No credits.', cost: 10, credits_remaining: 4 });
			},
			true, // continueOnFail
		);
		const json = output[0].json as IDataObject;
		expect(json).not.toHaveProperty('retry_after');
		expect(json.cost).toBe(10);
		expect(json.credits_remaining).toBe(4);
	});
});

describe('Lenz node - Authentication', () => {
	const usage: Responder = (options) => {
		expect(options.url).toBe('/me/usage');
		return { credits: { remaining: 10 } };
	};

	it.each([
		['apiKey', 'lenzApi'],
		['oAuth2', 'lenzOAuth2Api'],
	])('authentication %s sends through the %s credential', async (authentication, credential) => {
		const { httpMock } = await runNode({ operation: 'usage', authentication }, usage);
		expect(httpMock).toHaveBeenCalled();
		for (const call of httpMock.mock.calls) expect(call[0]).toBe(credential);
	});

	it.each([
		[1, 'lenzApi'],
		[1.1, 'lenzApi'],
		[1.2, 'lenzOAuth2Api'],
	])('a version %s node that never saved authentication uses %s', async (typeVersion, credential) => {
		const { httpMock } = await runNode({ operation: 'usage' }, usage, false, 1, { typeVersion });
		expect(httpMock.mock.calls[0][0]).toBe(credential);
	});

	describe('Get Webhook Secret', () => {
		it('fetches the OAuth connection secret', async () => {
			const responder: Responder = (options) => {
				expect(options.method).toBe('GET');
				expect(options.url).toBe('/me/webhook-secret');
				return { webhook_secret: 'whsec_abc' };
			};
			const { output, httpMock } = await runNode(
				{ operation: 'webhookSecret', authentication: 'oAuth2' },
				responder,
			);
			expect(httpMock.mock.calls[0][0]).toBe('lenzOAuth2Api');
			expect(output[0].json).toEqual({ webhook_secret: 'whsec_abc' });
		});

		it('points an API key to the credentials page instead of calling the API', async () => {
			const ctx = createContext({ operation: 'webhookSecret', authentication: 'apiKey' }, noCall);
			await expect(new Lenz().execute.call(ctx.ctx)).rejects.toThrow(/lenz\.io\/api-credentials/);
			expect(ctx.httpMock).not.toHaveBeenCalled();
		});
	});

	// n8n does not save a parameter left at its default, so what an existing
	// node uses is the default of the copy shown at ITS version.
	// Matched the way n8n's credential window matches it: a plain `includes`
	// on a literal version list. A `_cnd` range there matches nothing, and the
	// API key / OAuth chooser disappears from the credential window.
	const authenticationDefaultAt = (version: number) => {
		const shown = new Lenz().description.properties.filter(
			(p) =>
				p.name === 'authentication' &&
				(p.displayOptions?.show?.['@version'] as unknown[]).includes(version),
		);
		expect(shown).toHaveLength(1);
		return shown[0].default;
	};

	it('lists every node version under exactly one authentication copy', () => {
		const versions = new Lenz().description.version as number[];
		for (const version of versions) authenticationDefaultAt(version);
	});

	it.each([
		[1, 'apiKey'],
		[1.1, 'apiKey'],
		[1.2, 'oAuth2'],
	])('version %s defaults to %s', (version, expected) => {
		expect(authenticationDefaultAt(version)).toBe(expected);
	});

	it('a new node is created at the version that defaults to OAuth', () => {
		const versions = new Lenz().description.version as number[];
		expect(Math.max(...versions)).toBe(1.2);
	});

	it('offers each credential only under its own authentication value', () => {
		expect(new Lenz().description.credentials).toEqual([
			{ name: 'lenzApi', required: true, displayOptions: { show: { authentication: ['apiKey'] } } },
			{ name: 'lenzOAuth2Api', required: true, displayOptions: { show: { authentication: ['oAuth2'] } } },
		]);
	});
});

describe('Lenz node - Review', () => {
	const completedReview = (outcome: string): IDataObject => ({
		review_id: 'rev_1',
		status: 'completed',
		outcome,
		poll_after_seconds: null,
		issues: outcome === 'clean' ? [] : [{ claim: 'A', verdict: 'False' }],
		credits: { charged: 12 },
	});

	it('submits the draft with only the options set, polls, and adds passed', async () => {
		let polls = 0;
		const { output, calls } = await runNode(
			{
				operation: 'reviewDraft',
				draft: '  The Eiffel Tower opened in 1887.  ',
				language: 'en',
				visibility: 'unlisted',
				reviewOptions: { maxVerifications: 2, depth: 'low', suggestEdits: true },
			},
			(options) => {
				if (options.method === 'POST') {
					expect(options.url).toBe('/review');
					return { review_id: 'rev_1', status: 'queued' };
				}
				expect(options.url).toBe('/reviews/rev_1');
				polls += 1;
				return polls < 2
					? { review_id: 'rev_1', status: 'assessing', poll_after_seconds: 3 }
					: completedReview('issues_found');
			},
		);
		expect(calls[0].body).toEqual({
			text: 'The Eiffel Tower opened in 1887.',
			language: 'en',
			visibility: 'unlisted',
			escalate: { max_verifications: 2, depth: 'low', suggest_edits: true },
		});
		// Billable submit carries an Idempotency-Key, so an n8n retry cannot pay twice.
		expect((calls[0].headers as IDataObject)['Idempotency-Key']).toEqual(expect.any(String));
		const json = output[0].json as IDataObject;
		expect(json.passed).toBe(false);
		expect(json.outcome).toBe('issues_found');
		expect(json.review_id).toBe('rev_1');
		expect(json.credits).toEqual({ charged: 12 });
	});

	it('sends no escalate block when no option is set', async () => {
		const { calls, output } = await runNode({ operation: 'reviewDraft', draft: 'x' }, (options) =>
			options.method === 'POST' ? { review_id: 'rev_1', status: 'queued' } : completedReview('clean'),
		);
		expect(calls[0].body).toEqual({ text: 'x' });
		expect((output[0].json as IDataObject).passed).toBe(true);
	});

	it('returns the review_id at once without waiting', async () => {
		const { output, calls } = await runNode(
			{ operation: 'reviewDraft', draft: 'x', waitForCompletion: false },
			() => ({ review_id: 'rev_9', status: 'queued' }),
		);
		expect(calls).toHaveLength(1);
		expect(output[0].json).toMatchObject({ status: 'queued', review_id: 'rev_9' });
	});

	it('passed is null on a failed review, which has no outcome to judge', async () => {
		const { output } = await runNode({ operation: 'reviewDraft', draft: 'x' }, (options) =>
			options.method === 'POST'
				? { review_id: 'rev_1', status: 'queued' }
				: { review_id: 'rev_1', status: 'failed', outcome: null, failure: { failure_reason: 'x' } },
		);
		expect((output[0].json as IDataObject).passed).toBeNull();
	});

	it('retries a 503 poll instead of losing a paid review', async () => {
		let polls = 0;
		const { output } = await runNode({ operation: 'reviewDraft', draft: 'x' }, (options) => {
			if (options.method === 'POST') return { review_id: 'rev_1', status: 'queued' };
			polls += 1;
			if (polls === 1) throw apiError(503);
			return completedReview('clean');
		});
		expect(polls).toBe(2);
		expect((output[0].json as IDataObject).outcome).toBe('clean');
	});

	it('reports a timeout with the review_id when Max Wait runs out', async () => {
		const realNow = Date.now;
		let now = realNow();
		const spy = jest.spyOn(Date, 'now').mockImplementation(() => (now += 4000));
		try {
			const { output } = await runNode(
				{ operation: 'reviewDraft', draft: 'x', reviewOptions: { maxWaitSeconds: 10 } },
				(options) =>
					options.method === 'POST'
						? { review_id: 'rev_1', status: 'queued' }
						: { review_id: 'rev_1', status: 'verifying' },
			);
			expect(output[0].json).toMatchObject({
				status: 'timeout',
				passed: null,
				review_id: 'rev_1',
				last_status: 'verifying',
			});
		} finally {
			spy.mockRestore();
		}
	});

	it('refuses a non-numeric Max Wait before submitting anything', async () => {
		const ctx = createContext(
			{ operation: 'reviewDraft', draft: 'x', reviewOptions: { maxWaitSeconds: 'soon' } },
			noCall,
		);
		await expect(new Lenz().execute.call(ctx.ctx)).rejects.toThrow(/Max Wait/);
		expect(ctx.httpMock).not.toHaveBeenCalled();
	});

	it('hands back the review_id on the error output when a poll fails for good', async () => {
		const { output } = await runNode(
			{ operation: 'reviewDraft', draft: 'x' },
			(options) => {
				if (options.method === 'POST') return { review_id: 'rev_7', status: 'queued' };
				throw apiError(404);
			},
			true,
		);
		expect((output[0].json as IDataObject).review_id).toBe('rev_7');
	});

	it('skips an empty draft without calling the API', async () => {
		const { output } = await runNode({ operation: 'reviewDraft', draft: '   ' }, noCall);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
	});

	it('Get Review fetches by id, with view=issues when asked', async () => {
		const { output, calls } = await runNode(
			{ operation: 'getReview', reviewId: ' rev/1 ', issuesOnly: true },
			() => completedReview('clean'),
		);
		expect(calls[0].url).toBe('/reviews/rev%2F1');
		expect(calls[0].qs).toEqual({ view: 'issues' });
		expect((output[0].json as IDataObject).passed).toBe(true);
	});
});

describe('Lenz node - a job accepted without its ID', () => {
	it.each([
		['reviewDraft', { draft: 'x' }, /returned no review_id/],
		['checkCitations', { citationInput: 'text', citationText: 'See [1].' }, /returned no citecheck_id/],
	])('%s fails with a message instead of polling an empty ID', async (operation, params, message) => {
		const { calls, output } = await runNode({ operation, ...params }, () => ({ status: 'queued' }), true);
		expect(calls).toHaveLength(1);
		expect(String((output[0].json as IDataObject).error)).toMatch(message);
	});
});

describe('Lenz node - Check Citations', () => {
	const completedCheck: IDataObject = {
		citecheck_id: 'cc_1',
		status: 'completed',
		outcome: 'clean',
		citation_issues: [],
	};

	it('checks a text with its max citations', async () => {
		const { calls, output } = await runNode(
			{ operation: 'checkCitations', citationInput: 'text', citationText: 'See [1].', maxCitations: 5 },
			(options) =>
				options.method === 'POST' ? { citecheck_id: 'cc_1', status: 'queued' } : completedCheck,
		);
		expect(calls[0].url).toBe('/citecheck');
		expect(calls[0].body).toEqual({ text: 'See [1].', max_citations: 5 });
		expect(calls[1].url).toBe('/citechecks/cc_1');
		expect((output[0].json as IDataObject).passed).toBe(true);
	});

	it('sends pairs with a URL or a DOI, never max_citations', async () => {
		const { calls } = await runNode(
			{
				operation: 'checkCitations',
				citationInput: 'pairs',
				citationPairs: {
					pair: [
						{ statement: ' A ', url: ' https://a.example ' },
						{ statement: 'B', doi: '10.1038/nature12373' },
					],
				},
			},
			(options) =>
				options.method === 'POST' ? { citecheck_id: 'cc_1', status: 'queued' } : completedCheck,
		);
		expect(calls[0].body).toEqual({
			pairs: [
				{ statement: 'A', url: 'https://a.example' },
				{ statement: 'B', doi: '10.1038/nature12373' },
			],
		});
	});

	it.each([
		[{ statement: 'A' }],
		[{ statement: 'A', url: 'https://a.example', doi: '10.1/x' }],
		[{ url: 'https://a.example' }],
	])('refuses a pair without a statement and exactly one source, before submitting: %j', async (pair) => {
		const ctx = createContext(
			{ operation: 'checkCitations', citationInput: 'pairs', citationPairs: { pair: [pair] } },
			noCall,
		);
		await expect(new Lenz().execute.call(ctx.ctx)).rejects.toThrow(/exactly one source/);
		expect(ctx.httpMock).not.toHaveBeenCalled();
	});

	it('Get Citation Check fetches by id', async () => {
		const { calls, output } = await runNode(
			{ operation: 'getCitationCheck', citecheckId: 'cc_1' },
			() => completedCheck,
		);
		expect(calls[0].url).toBe('/citechecks/cc_1');
		expect((output[0].json as IDataObject).outcome).toBe('clean');
	});
});

describe('Lenz node - Review hardening', () => {
	const done: IDataObject = { review_id: 'rev_1', status: 'completed', outcome: 'clean' };

	it('waits for a slot when three reviews are already running, then submits', async () => {
		let posts = 0;
		const { output } = await runNode({ operation: 'reviewDraft', draft: 'x' }, (options) => {
			if (options.method === 'POST') {
				posts += 1;
				if (posts === 1) {
					throw apiError(429, { code: 'review_in_flight', detail: 'busy', retry_after_seconds: 60 });
				}
				return { review_id: 'rev_1', status: 'queued' };
			}
			return done;
		});
		expect(posts).toBe(2);
		expect((output[0].json as IDataObject).outcome).toBe('clean');
	});

	it('words the in-flight cap as a concurrency limit, not a plan limit', async () => {
		const realNow = Date.now;
		let now = realNow();
		const spy = jest.spyOn(Date, 'now').mockImplementation(() => (now += 120000));
		try {
			const ctx = createContext({ operation: 'reviewDraft', draft: 'x' }, () => {
				throw apiError(429, { code: 'review_in_flight', detail: 'busy', retry_after_seconds: 60 });
			});
			const err = await new Lenz().execute.call(ctx.ctx).catch((e: Error) => e);
			expect((err as Error).message).toMatch(/already has 3 reviews running/);
			const description = (err as { description?: string }).description ?? '';
			expect(description).toMatch(/not a plan limit/);
			expect(description).not.toMatch(/raise the cap|lenz\.io\/plans/);
		} finally {
			spy.mockRestore();
		}
	});

	it('takes the job a 409 idempotency_conflict names as the accepted one', async () => {
		const { output, calls } = await runNode({ operation: 'reviewDraft', draft: 'x' }, (options) => {
			if (options.method === 'POST') {
				throw apiError(409, { code: 'idempotency_conflict', detail: 'creating', review_id: 'rev_9' });
			}
			return { ...done, review_id: 'rev_9' };
		});
		expect(calls.filter((c) => c.method === 'POST')).toHaveLength(1);
		expect(calls[1].url).toBe('/reviews/rev_9');
		expect((output[0].json as IDataObject).review_id).toBe('rev_9');
	});

	it('names the reviews already accepted when a later item fails for good', async () => {
		let posts = 0;
		const ctx = createContext(
			{ operation: 'reviewDraft', draft: 'x', waitForCompletion: false },
			(options) => {
				if (options.method !== 'POST') return done;
				posts += 1;
				if (posts === 1) return { review_id: 'rev_first', status: 'queued' };
				throw apiError(402, { code: 'no_credits', detail: 'No remaining credits.' });
			},
			false,
			2,
		);
		const err = await new Lenz().execute.call(ctx.ctx).catch((e: Error) => e);
		expect((err as { description?: string }).description ?? '').toMatch(/review_id rev_first/);
	});

	it('gives citations_unavailable the transient wording, not n8n\'s retry advice', async () => {
		const ctx = createContext(
			{ operation: 'checkCitations', citationInput: 'text', citationText: 'See [1].' },
			() => {
				throw apiError(503, { code: 'citations_unavailable', detail: 'off', retry_after: 120 });
			},
		);
		const err = await new Lenz().execute.call(ctx.ctx).catch((e: Error) => e);
		expect((err as Error).message).toMatch(/citation checking is switched off/);
		expect((err as { description?: string }).description ?? '').toMatch(/Nothing was charged/);
	});

	it('reads Deep-Check Verdicts given as a comma-separated expression', async () => {
		const { calls } = await runNode(
			{ operation: 'reviewDraft', draft: 'x', reviewOptions: { verdicts: 'False, Mixed' } },
			(options) => (options.method === 'POST' ? { review_id: 'rev_1', status: 'queued' } : done),
		);
		expect((calls[0].body as IDataObject).escalate).toEqual({ verdicts: ['False', 'Mixed'] });
	});

	it.each([
		[{ maxVerifications: '' }, /Max Deep Checks/],
		[{ maxVerifications: 'five' }, /Max Deep Checks/],
		[{ maxAssessments: 21 }, /Max Quick Checks/],
		[{ maxCitations: 2.5 }, /Max Citations/],
	])('refuses option %j before anything is charged', async (options, message) => {
		const ctx = createContext({ operation: 'reviewDraft', draft: 'x', reviewOptions: options }, noCall);
		await expect(new Lenz().execute.call(ctx.ctx)).rejects.toThrow(message);
		expect(ctx.httpMock).not.toHaveBeenCalled();
	});

	it.each([0, 25, ''])('refuses Max Citations %p for a text before submitting', async (maxCitations) => {
		const ctx = createContext(
			{ operation: 'checkCitations', citationInput: 'text', citationText: 'See [1].', maxCitations },
			noCall,
		);
		await expect(new Lenz().execute.call(ctx.ctx)).rejects.toThrow(/Max Citations/);
		expect(ctx.httpMock).not.toHaveBeenCalled();
	});

	it('sends the Webhook URL from Options', async () => {
		const { calls } = await runNode(
			{
				operation: 'checkCitations',
				citationInput: 'text',
				citationText: 'See [1].',
				waitForCompletion: false,
				citationOptions: { webhookUrl: ' https://hooks.example/x ' },
			},
			() => ({ citecheck_id: 'cc_1', status: 'queued' }),
		);
		expect((calls[0].body as IDataObject).webhook_url).toBe('https://hooks.example/x');
	});
});

describe('Lenz node - OAuth not connected', () => {
	it('says to connect the credential instead of n8n\'s signing error', async () => {
		const ctx = createContext({ operation: 'usage', authentication: 'oAuth2' }, () => {
			throw new Error('Unable to sign without access token');
		});
		const err = await new Lenz().execute.call(ctx.ctx).catch((e: Error) => e);
		expect((err as Error).message).toMatch(/not connected yet/);
		expect((err as { description?: string }).description ?? '').toMatch(/Connect my account/);
	});

	it('leaves the same text alone on an API key credential', async () => {
		const ctx = createContext({ operation: 'usage', authentication: 'apiKey' }, () => {
			throw new Error('Unable to sign without access token');
		});
		const err = await new Lenz().execute.call(ctx.ctx).catch((e: Error) => e);
		expect((err as Error).message).not.toMatch(/not connected yet/);
	});
});

describe('Lenz node - second review fixes', () => {
	const done: IDataObject = { review_id: 'rev_1', status: 'completed', outcome: 'clean' };
	const accept: Responder = (options) =>
		options.method === 'POST' ? { review_id: 'rev_1', status: 'queued' } : done;

	it('sends an empty Deep-Check Verdicts list: it is a valid policy', async () => {
		const { calls } = await runNode(
			{ operation: 'reviewDraft', draft: 'x', reviewOptions: { verdicts: [], confidence: ['low'] } },
			accept,
		);
		expect((calls[0].body as IDataObject).escalate).toEqual({ verdicts: [], confidence: ['low'] });
	});

	it.each(['OAuth credentials not connected', 'Unable to sign without access token'])(
		'explains "%s" on an OAuth credential',
		async (text) => {
			const ctx = createContext({ operation: 'usage', authentication: 'oAuth2' }, () => {
				throw new Error(text);
			});
			const err = await new Lenz().execute.call(ctx.ctx).catch((e: Error) => e);
			expect((err as Error).message).toMatch(/not connected yet/);
		},
	);

	it.each(['', null])('Verify still reads an empty Max Wait (%p) as the 10s floor', async (maxWaitSeconds) => {
		const { calls } = await runNode(
			{ operation: 'verify', claim: 'Some claim', maxWaitSeconds },
			(options) =>
				options.method === 'POST'
					? { task_id: 'task_1', status: 'queued' }
					: { status: 'completed', result: { verification_id: 'v1', verdict: 'True', sources: [] } },
		);
		expect(calls[0].method).toBe('POST');
	});

	it('names earlier Verify task_ids when a later item fails for good', async () => {
		let posts = 0;
		const ctx = createContext(
			{ operation: 'verify', claim: 'Some claim', waitForCompletion: false },
			() => {
				posts += 1;
				if (posts === 1) return { task_id: 'task_first', status: 'queued' };
				throw apiError(402, { code: 'no_credits', detail: 'No remaining credits.' });
			},
			false,
			2,
		);
		const err = await new Lenz().execute.call(ctx.ctx).catch((e: Error) => e);
		const description = (err as { description?: string }).description ?? '';
		expect(description).toMatch(/task_id task_first/);
		expect(description).toMatch(/already accepted and charged/);
	});

	it('lists every earlier job: the note is the only place they survive', async () => {
		let posts = 0;
		const ctx = createContext(
			{ operation: 'reviewDraft', draft: 'x', waitForCompletion: false },
			(options) => {
				if (options.method !== 'POST') return done;
				posts += 1;
				if (posts <= 12) return { review_id: `rev_${posts}`, status: 'queued' };
				throw apiError(402, { code: 'no_credits', detail: 'No remaining credits.' });
			},
			false,
			13,
		);
		const err = await new Lenz().execute.call(ctx.ctx).catch((e: Error) => e);
		const description = (err as { description?: string }).description ?? '';
		expect(description).toMatch(/rev_1\b/);
		expect(description).toMatch(/rev_12\b/);
	});

	it('explains a conflict that never names the job instead of n8n\'s "Conflict"', async () => {
		const ctx = createContext({ operation: 'reviewDraft', draft: 'x' }, () => {
			throw apiError(409, { code: 'idempotency_conflict', detail: 'creating' });
		});
		const err = await new Lenz().execute.call(ctx.ctx).catch((e: Error) => e);
		expect((err as Error).message).toMatch(/still being processed from an earlier attempt/);
		expect((err as { description?: string }).description ?? '').toMatch(/already retried for ~30 seconds/);
		const description = (err as { description?: string }).description ?? '';
		expect(description).toMatch(/Nothing new was charged/);
		expect(description).toMatch(/a new or re-run execution counts as a new request/);
		// Retry On Fail cannot outlast a 15-minute hold: never recommended.
		expect(description).not.toMatch(/Retry On Fail/);
	});

	it('keeps code idempotency_conflict on the error output', async () => {
		const { output } = await runNode(
			{ operation: 'reviewDraft', draft: 'x' },
			() => {
				throw apiError(409, { code: 'idempotency_conflict', detail: 'creating' });
			},
			true,
		);
		const json = output[0].json as IDataObject;
		expect(json.status_code).toBe(409);
		expect(json.code).toBe('idempotency_conflict');
		expect(String(json.error_description)).toMatch(/Nothing new was charged/);
	});

	it.each(['', null, ' ', ' , ', [''], [' '], [undefined], [null]])('refuses a Deep-Check expression that resolves to %p', async (verdicts) => {
		const ctx = createContext({ operation: 'reviewDraft', draft: 'x', reviewOptions: { verdicts } }, noCall);
		await expect(new Lenz().execute.call(ctx.ctx)).rejects.toThrow(/Deep-Check Verdicts resolved to an empty value/);
		expect(ctx.httpMock).not.toHaveBeenCalled();
	});

	it.each(['', null, '  '])('reads an empty review Max Wait (%p) as the 600s default, not the floor', async (maxWaitSeconds) => {
		const realNow = Date.now;
		const start = realNow();
		let now = start;
		const spy = jest.spyOn(Date, 'now').mockImplementation(() => (now += 30000));
		try {
			const { output } = await runNode(
				{ operation: 'reviewDraft', draft: 'x', reviewOptions: { maxWaitSeconds } },
				(options) =>
					options.method === 'POST'
						? { review_id: 'rev_1', status: 'queued' }
						: { review_id: 'rev_1', status: 'verifying' },
			);
			expect((output[0].json as IDataObject).status).toBe('timeout');
			// 30s per clock read: a 10s floor ends after one poll, 600s after many.
			expect(now - start).toBeGreaterThan(300000);
		} finally {
			spy.mockRestore();
		}
	});
});

describe('Lenz node - conflict on an operation that does not retry', () => {
	it('does not claim a retry or a job it never made', async () => {
		const ctx = createContext({ operation: 'usage' }, () => {
			throw apiError(409, { code: 'idempotency_conflict', detail: 'busy' });
		});
		const err = await new Lenz().execute.call(ctx.ctx).catch((e: Error) => e);
		const description = (err as { description?: string }).description ?? '';
		expect(description).toMatch(/Nothing new was charged/);
		expect(description).not.toMatch(/already retried/);
		expect(description).not.toMatch(/the job/);
	});
});
