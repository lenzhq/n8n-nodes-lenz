import { NodeApiError } from 'n8n-workflow';
import type { IDataObject, IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';

// sleep is used for verify polling backoff; make it instant in tests.
jest.mock('n8n-workflow', () => ({
	...jest.requireActual('n8n-workflow'),
	sleep: jest.fn(async () => {}),
}));

import { Lenz } from '../Lenz.node';

// A responder receives the httpRequest options and returns the mocked response
// body (or throws to simulate an API/transport error).
type Responder = (options: IHttpRequestOptions) => unknown;

function createContext(
	params: Record<string, unknown>,
	responder: Responder,
	continueOnFail = false,
	itemCount = 1,
): { ctx: IExecuteFunctions; httpMock: jest.Mock; calls: IHttpRequestOptions[] } {
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
			return fallback;
		}),
		getNode: jest.fn(() => ({ name: 'Lenz', type: 'lenz', typeVersion: 1, position: [0, 0] })),
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
) {
	const { ctx, httpMock, calls } = createContext(params, responder, continueOnFail, itemCount);
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

	it('skips empty text input instead of failing the batch', async () => {
		const { output, httpMock } = await runNode({ operation: 'assess', text: '   ' }, noCall);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(httpMock).not.toHaveBeenCalled();
	});

	it('returns status "ambiguous" with candidate claims when framing cannot pick one', async () => {
		const responder: Responder = () => ({
			claims: [],
			error: 'Ambiguous input',
			error_code: 'ambiguous',
			candidate_claims: ['Reading A', 'Reading B'],
		});
		const { output } = await runNode({ operation: 'assess', text: 'vague text' }, responder);
		expect(output[0].json.status).toBe('ambiguous');
		expect((output[0].json as IDataObject).candidate_claims).toEqual(['Reading A', 'Reading B']);
	});

	it('returns status "no_claim" when no verifiable claim is found', async () => {
		const responder: Responder = () => ({ claims: [], error: 'No claim found' });
		const { output } = await runNode({ operation: 'assess', text: 'just chatting' }, responder);
		expect(output[0].json.status).toBe('no_claim');
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
	});

	it('surfaces the candidate readings on a clarification_required interrupt', async () => {
		const responder = verifyResponder({
			status: 'needs_input',
			reason: 'clarification_required',
			candidates: ['Reading A', 'Reading B'],
		});
		const { output } = await runNode({ operation: 'verify', claim: 'ambiguous' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.candidates).toEqual(['Reading A', 'Reading B']);
		expect(json.message).toContain('Select Claims');
	});

	it('points at the existing verification on a duplicate_found interrupt, not at Select Claims', async () => {
		const responder = verifyResponder({
			status: 'needs_input',
			reason: 'duplicate_found',
			similar_claims: [{ verification_id: 'ver_old', claim: 'Same claim', distance: 0.05 }],
		});
		const { output } = await runNode({ operation: 'verify', claim: 'dupe' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.similar_claims).toEqual([
			{ verification_id: 'ver_old', claim: 'Same claim', distance: 0.05 },
		]);
		expect(json.message).toContain('similar_claims');
		expect(json.message).not.toContain('Select Claims');
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
		await expect(node.execute.call(ctx)).rejects.toThrow(NodeApiError);
		expect(calls).toHaveLength(1); // submit only, no status poll
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
				result: { verification_id: 'ver_9', verdict: 'True', key_finding: 'Checks out.' },
			};
		};
		const { output } = await runNode({ operation: 'verifyStatus', taskId: 'task_9' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('completed');
		expect(json.passed).toBe(true);
		expect(json.key_finding).toBe('Checks out.');
	});

	it('reports an in-flight task as processing with its progress', async () => {
		const responder: Responder = () => ({
			status: 'processing',
			progress: { step: 'Debating...' },
		});
		const { output } = await runNode({ operation: 'verifyStatus', taskId: 'task_9' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('processing');
		expect(json.progress).toEqual({ step: 'Debating...' });
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
		await expect(node.execute.call(ctx)).rejects.toThrow(NodeApiError);
		expect(httpMock).not.toHaveBeenCalled();
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

	it('passes through the raw extract response', async () => {
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
		});
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
		// audit is opt-in here too
		expect(json.audit).toBeUndefined();
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
		expect(calls[0].headers?.['Idempotency-Key']).toMatch(/^n8n:exec-1:Lenz:assess:0:[0-9a-z]+$/);
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

	it('does not send an Idempotency-Key on reads', async () => {
		const { calls } = await runNode({ operation: 'usage' }, () => ({ plan: 'free' }));
		expect(calls[0].headers?.['Idempotency-Key']).toBeUndefined();
	});

	it('keeps the submit key off the status polls of one verification', async () => {
		const { calls } = await runNode({ operation: 'verify', claim: 'Some claim' }, (options) => {
			if (options.url === '/verify') {
				return { task_id: 'task_1' };
			}
			return { status: 'completed', result: { verdict: 'True', sources: [] } };
		});
		expect(calls[0].headers?.['Idempotency-Key']).toMatch(/^n8n:exec-1:Lenz:verify:0:[0-9a-z]+$/);
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
	it('throws NodeApiError for an unrecognized operation value', async () => {
		const { ctx } = createContext({ operation: 'not_a_real_operation' }, noCall);
		const node = new Lenz();
		await expect(node.execute.call(ctx)).rejects.toThrow(NodeApiError);
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
});

describe('Lenz node - capacity (HTTP 503)', () => {
	// Admission control / provider outage: the API refuses the submit with a
	// typed body code and a stated wait. Transient by contract — the node must
	// say so and point at Retry On Fail rather than emit a generic 503.
	function capacityError(body: Record<string, unknown>) {
		return Object.assign(new Error('Request failed with status code 503'), {
			statusCode: 503,
			body,
		});
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

	it('names the wait and points at Retry On Fail for code: capacity', async () => {
		const err = await expectCapacityError({
			detail: 'Lenz is at capacity right now.',
			code: 'capacity',
			retry_after: 100,
		});
		expect(err.message).toContain('at capacity');
		expect(err.message).toContain('100s');
		expect(err.description).toContain('Retry On Fail');
		expect(err.description).toContain('100 seconds');
		expect(err.description).toContain('Nothing was charged');
		expect(err.httpCode).toBe('503');
	});

	it('handles code: upstream_unavailable with a default wait when none is stated', async () => {
		const err = await expectCapacityError({
			detail: 'Providers down.',
			code: 'upstream_unavailable',
		});
		expect(err.message).toContain('providers');
		expect(err.message).toContain('90s');
		expect(err.description).toContain('Retry On Fail');
	});

	it('leaves a plain 503 without a typed code on the generic path', async () => {
		const { ctx } = createContext({ operation: 'verify', claim: 'claim' }, () => {
			throw Object.assign(new Error('Request failed with status code 503'), { statusCode: 503 });
		});
		const node = new Lenz();
		const err = (await node.execute.call(ctx).then(
			() => null,
			(e: unknown) => e,
		)) as NodeApiError;
		expect(err).toBeInstanceOf(NodeApiError);
		expect(err.message).not.toContain('Retry On Fail');
		expect(String(err.description ?? '')).not.toContain('Retry On Fail');
	});
});

describe('Lenz node - quota (HTTP 402)', () => {
	// Shape of a rejected request as the n8n http helper surfaces it. The
	// status may arrive on any of several fields depending on transport, so
	// each variant is exercised separately.
	function quotaError(extra: Record<string, unknown>) {
		return Object.assign(new Error('Request failed with status code 402'), {
			body: {
				detail: 'No remaining claim checks.',
				code: 'no_credits',
				upgrade_url: 'https://lenz.io/plans',
				remaining: 0,
				resets_at: '2026-09-01T00:00:00+00:00',
			},
			...extra,
		});
	}

	async function expectQuotaError(extra: Record<string, unknown>) {
		const { ctx } = createContext({ operation: 'verify', claim: 'claim' }, () => {
			throw quotaError(extra);
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
		const err = await expectQuotaError({ statusCode: 402 });
		expect(err.httpCode).toBe('402');
	});

	it('names the billing condition instead of a generic API failure', async () => {
		const err = await expectQuotaError({ statusCode: 402 });
		expect(err.message).toContain('No remaining claim checks.');
		expect(err.description).toContain('lenz.io/plans');
		// Must not tell the user to retry — a 402 never clears on retry.
		expect(err.description).toContain('Retrying will not help');
	});

	it('surfaces the reset time when the server states one', async () => {
		const err = await expectQuotaError({ statusCode: 402 });
		expect(err.description).toContain('2026-09-01');
	});

	it('recognises the status wherever the transport puts it', async () => {
		for (const shape of [
			{ statusCode: 402 },
			{ status: 402 },
			{ httpCode: '402' },
			{ response: { status: 402 } },
		]) {
			const err = await expectQuotaError(shape);
			expect(err.message).toContain('No remaining claim checks.');
		}
	});

	it('leaves a non-402 failure on the generic path', async () => {
		const { ctx } = createContext({ operation: 'verify', claim: 'claim' }, () => {
			throw Object.assign(new Error('Forbidden'), {
				statusCode: 403,
				body: { detail: 'This report is private.', code: 'private_claim' },
			});
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
