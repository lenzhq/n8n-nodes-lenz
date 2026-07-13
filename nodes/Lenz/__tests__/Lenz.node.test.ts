import { NodeApiError, NodeOperationError } from 'n8n-workflow';
import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

jest.mock('lenz-io', () => {
	const actual = jest.requireActual('lenz-io');
	return {
		...actual,
		Lenz: jest.fn(),
	};
});

// eslint-disable-next-line @n8n/community-nodes/no-restricted-imports -- test-only import of error classes; the compiled node bundles lenz-io at build time (see scripts/bundle-deps.mjs)
import { Lenz as LenzClient, LenzNeedsInputError, LenzPipelineError, LenzTimeoutError, LenzAuthError } from 'lenz-io';
import { Lenz } from '../Lenz.node';

type MockClient = {
	assess: jest.Mock;
	verifyAndWait: jest.Mock;
	extract: jest.Mock;
	usage: jest.Mock;
	ask: { send: jest.Mock };
};

function mockClientImpl(overrides: Partial<MockClient> = {}): MockClient {
	return {
		assess: jest.fn(),
		verifyAndWait: jest.fn(),
		extract: jest.fn(),
		usage: jest.fn(),
		ask: { send: jest.fn() },
		...overrides,
	};
}

function createContext(params: Record<string, unknown>, continueOnFail = false): IExecuteFunctions {
	const items = [{ json: {} }];
	return {
		getInputData: jest.fn(() => items),
		getNodeParameter: jest.fn((name: string, _itemIndex: number, fallback?: unknown) => {
			if (name in params) return params[name];
			return fallback;
		}),
		getCredentials: jest.fn(async () => ({ apiKey: 'lenz_test123' })),
		getNode: jest.fn(() => ({ name: 'Lenz', type: 'lenz', typeVersion: 1, position: [0, 0] })),
		continueOnFail: jest.fn(() => continueOnFail),
	} as unknown as IExecuteFunctions;
}

async function runNode(params: Record<string, unknown>, client: MockClient, continueOnFail = false) {
	(LenzClient as unknown as jest.Mock).mockImplementation(() => client);
	const node = new Lenz();
	const ctx = createContext(params, continueOnFail);
	const result = await node.execute.call(ctx);
	return result[0];
}

describe('Lenz node - Assess (Fast)', () => {
	it('derives passed=true for a True verdict and passed=false for a False verdict', async () => {
		const client = mockClientImpl({
			assess: jest.fn().mockResolvedValue({
				claims: [
					{ claim: 'A', verdict: 'True', confidence: 'high', verification_url: null },
					{ claim: 'B', verdict: 'False', confidence: 'high', verification_url: null },
					{ claim: 'C', verdict: 'Mostly True', confidence: 'medium', verification_url: null },
					{ claim: 'D', verdict: 'Mostly False', confidence: 'medium', verification_url: null },
					{ claim: 'E', verdict: 'Mixed', confidence: 'low', verification_url: null },
				],
			}),
		});

		const output = await runNode({ operation: 'assess', text: 'some text' }, client);

		expect(output[0].json.status).toBe('ok');
		const claims = (output[0].json as IDataObject).claims as IDataObject[];
		expect(claims[0].passed).toBe(true); // True
		expect(claims[1].passed).toBe(false); // False
		expect(claims[2].passed).toBe(true); // Mostly True
		expect(claims[3].passed).toBe(false); // Mostly False
		expect(claims[4].passed).toBe(false); // Mixed
	});

	it('skips empty text input instead of failing the batch', async () => {
		const client = mockClientImpl();
		const output = await runNode({ operation: 'assess', text: '   ' }, client);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(client.assess).not.toHaveBeenCalled();
	});

	it('returns status "ambiguous" with candidate claims when framing cannot pick one', async () => {
		const client = mockClientImpl({
			assess: jest.fn().mockResolvedValue({
				claims: [],
				error: 'Ambiguous input',
				error_code: 'ambiguous',
				candidate_claims: ['Reading A', 'Reading B'],
			}),
		});
		const output = await runNode({ operation: 'assess', text: 'vague text' }, client);
		expect(output[0].json.status).toBe('ambiguous');
		expect((output[0].json as IDataObject).candidate_claims).toEqual(['Reading A', 'Reading B']);
	});

	it('returns status "no_claim" when no verifiable claim is found', async () => {
		const client = mockClientImpl({
			assess: jest.fn().mockResolvedValue({ claims: [], error: 'No claim found' }),
		});
		const output = await runNode({ operation: 'assess', text: 'just chatting' }, client);
		expect(output[0].json.status).toBe('no_claim');
	});
});

describe('Lenz node - Verify (Deep)', () => {
	it('returns the full branch-ready object on a completed verification', async () => {
		const client = mockClientImpl({
			verifyAndWait: jest.fn().mockResolvedValue({
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
			}),
		});

		const output = await runNode({ operation: 'verify', claim: 'Some claim' }, client);
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
		const client = mockClientImpl();
		const output = await runNode({ operation: 'verify', claim: '' }, client);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(client.verifyAndWait).not.toHaveBeenCalled();
	});

	it('maps LenzNeedsInputError to a status: needs_input result, not a thrown error', async () => {
		const err = new LenzNeedsInputError({ message: 'needs input' });
		err.taskId = 'task_1';
		err.kind = 'multi_claim';
		const client = mockClientImpl({ verifyAndWait: jest.fn().mockRejectedValue(err) });

		const output = await runNode({ operation: 'verify', claim: 'ambiguous claim' }, client);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('needs_input');
		expect(json.task_id).toBe('task_1');
		expect(json.reason).toBe('multi_claim');
	});

	it('maps LenzTimeoutError to a status: timeout result, not a thrown error', async () => {
		const err = new LenzTimeoutError({ message: 'timed out' });
		err.taskId = 'task_2';
		const client = mockClientImpl({ verifyAndWait: jest.fn().mockRejectedValue(err) });

		const output = await runNode({ operation: 'verify', claim: 'slow claim' }, client);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('timeout');
		expect(json.task_id).toBe('task_2');
	});

	it('maps LenzPipelineError to a status: failed result, not a thrown error', async () => {
		const err = new LenzPipelineError({ message: 'Pipeline failed: bad input' });
		err.taskId = 'task_3';
		const client = mockClientImpl({ verifyAndWait: jest.fn().mockRejectedValue(err) });

		const output = await runNode({ operation: 'verify', claim: 'broken claim' }, client);
		const json = output[0].json as IDataObject;
		expect(json.status).toBe('failed');
		expect(json.task_id).toBe('task_3');
	});

	it('wraps an auth error from verifyAndWait in NodeApiError rather than swallowing it', async () => {
		const err = new LenzAuthError({ message: 'Unauthorized', statusCode: 401 });
		const client = mockClientImpl({ verifyAndWait: jest.fn().mockRejectedValue(err) });
		(LenzClient as unknown as jest.Mock).mockImplementation(() => client);

		const node = new Lenz();
		const ctx = createContext({ operation: 'verify', claim: 'claim' });
		await expect(node.execute.call(ctx)).rejects.toThrow(NodeApiError);
	});
});

describe('Lenz node - Extract Claims', () => {
	it('skips empty text input instead of failing the batch', async () => {
		const client = mockClientImpl();
		const output = await runNode({ operation: 'extract', text: '  ' }, client);
		expect(output[0].json).toEqual({ skipped: true, reason: 'empty_input' });
		expect(client.extract).not.toHaveBeenCalled();
	});

	it('passes through the raw extract response', async () => {
		const client = mockClientImpl({
			extract: jest.fn().mockResolvedValue({
				status: 'ready',
				identified_claims: ['Claim A', 'Claim B'],
				domain: 'General',
			}),
		});
		const output = await runNode({ operation: 'extract', text: 'Claim A. Claim B.' }, client);
		expect(output[0].json).toEqual({
			status: 'ready',
			identified_claims: ['Claim A', 'Claim B'],
			domain: 'General',
		});
	});
});

describe('Lenz node - Ask Follow-Up', () => {
	it('returns the answer text from a completed verification', async () => {
		const client = mockClientImpl({
			ask: { send: jest.fn().mockResolvedValue({ role: 'expert', content: 'Source X is strongest.' }) },
		});
		const output = await runNode(
			{ operation: 'ask', verificationId: 'ver_123', question: 'Which source is strongest?' },
			client,
		);
		expect(output[0].json).toEqual({ answer: 'Source X is strongest.' });
		expect(client.ask.send).toHaveBeenCalledWith('ver_123', {
			message: 'Which source is strongest?',
			language: undefined,
		});
	});
});

describe('Lenz node - Check Usage', () => {
	it('passes through the raw usage response', async () => {
		const client = mockClientImpl({
			usage: jest.fn().mockResolvedValue({ plan: 'free', verify: { remaining: 9 } }),
		});
		const output = await runNode({ operation: 'usage' }, client);
		expect(output[0].json).toEqual({ plan: 'free', verify: { remaining: 9 } });
	});
});

describe('Lenz node - error handling', () => {
	it('throws NodeOperationError for an unrecognized operation value', async () => {
		const client = mockClientImpl();
		(LenzClient as unknown as jest.Mock).mockImplementation(() => client);
		const node = new Lenz();
		const ctx = createContext({ operation: 'not_a_real_operation' });
		await expect(node.execute.call(ctx)).rejects.toThrow(NodeOperationError);
	});

	it('routes a failure to an {error} item instead of throwing when continueOnFail is set', async () => {
		const err = new LenzAuthError({ message: 'Unauthorized', statusCode: 401 });
		const client = mockClientImpl({ verifyAndWait: jest.fn().mockRejectedValue(err) });

		const output = await runNode({ operation: 'verify', claim: 'claim' }, client, /* continueOnFail */ true);
		expect(output[0].json).toEqual({ error: 'Unauthorized' });
	});

	it('does not double-wrap an already-thrown NodeOperationError', async () => {
		const client = mockClientImpl();
		(LenzClient as unknown as jest.Mock).mockImplementation(() => client);
		const node = new Lenz();
		const ctx = createContext({ operation: 'bogus' });
		try {
			await node.execute.call(ctx);
			fail('expected execute() to throw');
		} catch (e) {
			expect(e).toBeInstanceOf(NodeOperationError);
			expect(e).not.toBeInstanceOf(NodeApiError);
		}
	});
});
