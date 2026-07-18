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
): { ctx: IExecuteFunctions; httpMock: jest.Mock } {
	const items = [{ json: {} }];
	const httpMock = jest.fn(async (_credType: string, options: IHttpRequestOptions) =>
		responder(options),
	);
	const ctx = {
		getInputData: jest.fn(() => items),
		getNodeParameter: jest.fn((name: string, _itemIndex: number, fallback?: unknown) => {
			if (name in params) return params[name];
			return fallback;
		}),
		getNode: jest.fn(() => ({ name: 'Lenz', type: 'lenz', typeVersion: 1, position: [0, 0] })),
		continueOnFail: jest.fn(() => continueOnFail),
		helpers: {
			httpRequestWithAuthentication: httpMock,
		},
	} as unknown as IExecuteFunctions;
	return { ctx, httpMock };
}

async function runNode(
	params: Record<string, unknown>,
	responder: Responder,
	continueOnFail = false,
) {
	const { ctx, httpMock } = createContext(params, responder, continueOnFail);
	const node = new Lenz();
	const result = await node.execute.call(ctx);
	return { output: result[0], httpMock };
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

	it('returns the full branch-ready object on a completed verification', async () => {
		const responder = verifyResponder({
			status: 'completed',
			result: {
				verification_id: 'ver_123',
				verdict: 'False',
				confidence: 'high',
				lenz_score: 2,
				executive_summary: 'This claim is false.',
				sources: [
					{ title: 'Source A', url: 'https://a.example' },
					{ title: 'No URL source', url: '' },
					{ title: 'Source B', url: 'https://b.example' },
				],
			},
		});

		const { output } = await runNode({ operation: 'verify', claim: 'Some claim' }, responder);
		const json = output[0].json as IDataObject;

		expect(json.status).toBe('completed');
		expect(json.passed).toBe(false);
		expect(json.verdict).toBe('False');
		expect(json.lenz_score).toBe(2);
		expect(json.verification_id).toBe('ver_123');
		// url-less sources are filtered out
		expect(json.citations).toEqual([
			{ title: 'Source A', url: 'https://a.example' },
			{ title: 'Source B', url: 'https://b.example' },
		]);
	});

	it('skips empty claim input instead of failing the batch', async () => {
		const { output, httpMock } = await runNode({ operation: 'verify', claim: '' }, noCall);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(httpMock).not.toHaveBeenCalled();
	});

	it('maps a needs_input terminal state to a status: needs_input result, not a thrown error', async () => {
		const responder = verifyResponder({ status: 'needs_input', reason: 'multi_claim' });
		const { output } = await runNode({ operation: 'verify', claim: 'ambiguous claim' }, responder);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('needs_input');
		expect(json.task_id).toBe('task_1');
		expect(json.reason).toBe('multi_claim');
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
