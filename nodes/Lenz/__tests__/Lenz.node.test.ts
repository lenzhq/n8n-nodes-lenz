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
		const responder = verifyResponder({ status: 'failed', error: 'bad input' });
		const { output } = await runNode({ operation: 'verify', claim: 'broken claim' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('failed');
		expect(json.task_id).toBe('task_1');
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
	it('sends an Idempotency-Key on billable POSTs so a retry cannot double-charge', async () => {
		const { calls } = await runNode({ operation: 'assess', text: 'some text' }, () => ({
			claims: [{ claim: 'A', verdict: 'True', confidence: 'high' }],
		}));
		expect(calls[0].headers?.['Idempotency-Key']).toBe('n8n:exec-1:Lenz:assess:0');
	});

	it('scopes the key per item so separate claims are charged separately', async () => {
		const { calls } = await runNode(
			{ operation: 'assess', text: 'some text' },
			() => ({ claims: [{ claim: 'A', verdict: 'True', confidence: 'high' }] }),
			false,
			2,
		);
		expect(calls.map((c) => c.headers?.['Idempotency-Key'])).toEqual([
			'n8n:exec-1:Lenz:assess:0',
			'n8n:exec-1:Lenz:assess:1',
		]);
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
		expect(calls[0].headers?.['Idempotency-Key']).toBe('n8n:exec-1:Lenz:verify:0');
		expect(calls[1].headers?.['Idempotency-Key']).toBeUndefined();
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
