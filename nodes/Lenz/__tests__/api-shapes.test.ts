// Recorded Lenz API responses (./api-shapes.fixtures.ts) run through the real
// node: every output key carries the value this node has always given it.
import { NodeApiError, sleep } from 'n8n-workflow';
import type { IDataObject, IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';

jest.mock('n8n-workflow', () => ({
	...jest.requireActual('n8n-workflow'),
	sleep: jest.fn(async () => {}),
}));

import { Lenz } from '../Lenz.node';
import { shapes } from './api-shapes.fixtures';

void sleep;

type Responder = (options: IHttpRequestOptions) => unknown;

function apiError(statusCode: number, body: Record<string, unknown>) {
	const transport = Object.assign(new Error(`Request failed with status code ${statusCode}`), {
		statusCode,
		response: { status: statusCode, data: body },
	});
	return new NodeApiError(
		{ name: 'Lenz', type: 'lenz', typeVersion: 1, position: [0, 0] } as never,
		transport as never,
	);
}

async function run(params: Record<string, unknown>, responder: Responder, continueOnFail = false) {
	const ctx = {
		getInputData: jest.fn(() => [{ json: {} }]),
		getNodeParameter: jest.fn((name: string, _i: number, fallback?: unknown) =>
			name in params ? params[name] : fallback,
		),
		getNode: jest.fn(() => ({ name: 'Lenz', type: 'lenz', typeVersion: 1, position: [0, 0] })),
		getExecutionId: jest.fn(() => 'exec-1'),
		continueOnFail: jest.fn(() => continueOnFail),
		helpers: {
			httpRequestWithAuthentication: jest.fn(async (_cred: string, options: IHttpRequestOptions) =>
				responder(options),
			),
		},
	} as unknown as IExecuteFunctions;
	const result = await new Lenz().execute.call(ctx);
	return result[0].map((item) => item.json as IDataObject);
}

const status = (body: unknown): Responder => (options) => {
	if (options.method === 'POST') return { task_id: 'task_1' };
	if (options.url === '/verify/status/task_1') return body;
	throw new Error(`unexpected request: ${options.method} ${options.url}`);
};

describe('recorded API responses', () => {
	describe('a failed verification', () => {
		it('keeps failure_reason, failure_class and retryable, and says why', async () => {
			const [json] = await run(
				{ operation: 'verify', claim: 'x' },
				status(shapes.statusFailedLive),
			);
			expect(json).toMatchObject({
				status: 'failed',
				passed: null,
				task_id: 'task_1',
				failure_reason: 'research_empty',
				failure_class: 'insufficient_evidence',
				retryable: false,
				not_a_claim: false,
			});
			expect(String(json.message)).toMatch(/^Verification failed: .+/);
			expect(String(json.message)).not.toContain('undefined');
		});

		it('keeps the durable failure code', async () => {
			const [json] = await run(
				{ operation: 'verifyStatus', taskId: 'task_1' },
				status(shapes.statusFailedDurable),
			);
			expect(json.failure_reason).toBe('conclusion_failed');
			expect(json.failure_class).toBe('internal');
		});

		it('reports nothing-to-check as failure_reason "not_a_claim" and not_a_claim true', async () => {
			const [json] = await run(
				{ operation: 'verifyStatus', taskId: 'task_1' },
				status(shapes.statusNotAClaim),
			);
			expect(json.status).toBe('failed');
			expect(json.failure_reason).toBe('not_a_claim');
			expect(json.failure_class).toBe('invalid_input');
			expect(json.not_a_claim).toBe(true);
		});
	});

	describe('a paused verification', () => {
		it('offers each claim under `text`, as the node always has', async () => {
			const [json] = await run(
				{ operation: 'verifyStatus', taskId: 'task_1' },
				status(shapes.statusNeedsInput),
			);
			expect(json.status).toBe('needs_input');
			const claims = json.claims as IDataObject[];
			expect(claims.map((c) => c.text)).toEqual([
				'The Earth is round.',
				'Water boils at 100C at sea level.',
			]);
			expect(claims.map((c) => c.domain)).toEqual(['Science', 'Science']);
			// The API's own `claim` stays beside it.
			expect(claims.map((c) => c.claim)).toEqual(claims.map((c) => c.text));
		});
	});

	describe('a completed verification', () => {
		it('leaves modified_at null when it finished on the day it was created', async () => {
			const [json] = await run(
				{ operation: 'verifyStatus', taskId: 'task_1' },
				status(shapes.statusCompletedSameDay),
			);
			expect(json.status).toBe('completed');
			expect(json.modified_at).toBeNull();
		});

		it('sets modified_at when it finished on a later UTC day', async () => {
			const [json] = await run(
				{ operation: 'verifyStatus', taskId: 'task_1' },
				status(shapes.statusCompletedCrossesMidnight),
			);
			expect(json.modified_at).toBe('2026-09-02T00:03:00.000000+00:00');
			expect(json).not.toHaveProperty('completed_at');
		});

		it('reads a stored verification the same way', async () => {
			const [json] = await run(
				{ operation: 'getVerification', verificationId: 'ver_1' },
				() => shapes.storedVerification,
			);
			expect(json.status).toBe('completed');
			expect(json.verdict).toEqual(expect.any(String));
			expect(json).toHaveProperty('modified_at');
			expect(json).not.toHaveProperty('completed_at');
		});
	});

	describe('receipts', () => {
		it('emits chain_id, null: the API sends none', async () => {
			const [json] = await run({ operation: 'verify', claim: 'x', waitForCompletion: false }, () => ({
				...(shapes.submitReceipt as IDataObject),
			}));
			expect(json.status).toBe('queued');
			expect(json.chain_id).toBeNull();
		});

		it('batch items carry the claim under `claim_text`', async () => {
			const out = await run(
				{ operation: 'verifyBatch', batchClaims: { claim: [{ text: 'a' }, { text: 'b' }] } },
				() => shapes.batchReceipt,
			);
			expect(out.map((j) => j.claim_text)).toEqual([
				'The Earth is round.',
				'Water boils at 100C at sea level.',
			]);
			expect(out.every((j) => !('claim' in j))).toBe(true);
		});

		it('select items carry the claim under `claim_text`', async () => {
			const out = await run(
				{ operation: 'select', taskId: 'task_1', selectedClaims: ['a'] },
				() => shapes.selectReceipt,
			);
			expect(out.length).toBeGreaterThan(0);
			for (const j of out) {
				expect(j.claim_text).toEqual(expect.any(String));
				expect(j).not.toHaveProperty('claim');
			}
		});
	});

	describe('Assess', () => {
		it('keeps status "no_claim" and sets not_a_claim when nothing is checkable', async () => {
			const [json] = await run({ operation: 'assess', text: 'hi' }, () => shapes.assessNoClaim);
			expect(json.status).toBe('no_claim');
			expect(json.not_a_claim).toBe(true);
			expect(json.candidate_claims).toEqual([]);
			expect(String(json.message).length).toBeGreaterThan(0);
		});

		it('shows a failed row as verdict "Error", confidence "low"', async () => {
			const [json] = await run({ operation: 'assess', text: 'hi' }, () => shapes.assessAllErrorRows);
			expect(json.status).toBe('ok');
			expect(json.not_a_claim).toBe(true);
			const rows = json.claims as IDataObject[];
			expect(rows.map((r) => [r.claim, r.verdict, r.confidence, r.passed])).toEqual([
				['hi', 'Error', 'low', false],
				['hello', 'Error', 'low', false],
			]);
		});

		it('maps a mixed wave row by row', async () => {
			const [json] = await run({ operation: 'assess', text: 'many' }, () => shapes.assessMixedRows);
			expect(json.not_a_claim).toBe(false);
			const rows = json.claims as IDataObject[];
			expect(rows.map((r) => r.verdict)).toEqual(['True', 'Error', 'Error', 'Error']);
			expect(rows.map((r) => r.passed)).toEqual([true, false, false, false]);
		});

		it('maps a single checked claim', async () => {
			const [json] = await run({ operation: 'assess', text: 'x' }, () => shapes.assessOneClaim);
			expect(json.not_a_claim).toBe(false);
			expect((json.claims as IDataObject[])[0]).toMatchObject({
				claim: 'The registry reported 4,200 filings in 2024.',
				verdict: 'True',
				confidence: 'high',
				passed: true,
			});
		});
	});

	describe('Extract', () => {
		const extractBody = (status: string, claims: IDataObject[]): IDataObject => ({
			status,
			claims,
			original_input: 'x',
		});

		it('flags an input with nothing to check', async () => {
			const [json] = await run({ operation: 'extract', text: 'x' }, () =>
				extractBody('no_checkable_claim', []),
			);
			// The node's own word.
			expect(json.status).toBe('not_a_claim');
			expect(json.not_a_claim).toBe(true);
		});

		it('does not flag an input with claims', async () => {
			const [json] = await run({ operation: 'extract', text: 'x' }, () =>
				extractBody('ready', [{ claim: 'The Earth is round.' }]),
			);
			expect(json.not_a_claim).toBe(false);
		});
	});

	describe('refusals on the error output', () => {
		const refuse = (statusCode: number, body: unknown, params: Record<string, unknown>) =>
			run(params, () => {
				throw apiError(statusCode, body as Record<string, unknown>);
			}, true);

		it('a 429 states its wait', async () => {
			const [json] = await refuse(429, shapes.extractRateLimited, {
				operation: 'extract',
				text: 'Some text',
			});
			expect(json.status_code).toBe(429);
			expect(json.code).toBe('extract_daily_limit');
			expect(json.resets_in_seconds).toBe(900);
			expect(json.limit).toBe(1000);
		});

		it('a 503 states retry_after', async () => {
			const [json] = await refuse(503, shapes.capacity503, { operation: 'assess', text: 'x' });
			expect(json.code).toBe('capacity');
			expect(json.retry_after).toBe(60);
			expect(String(json.error_message)).toContain('~60s');
		});

		it('an in-flight 429 states its wait', async () => {
			// The node waits for a slot on the real clock; jump it past the budget.
			let now = Date.now();
			const spy = jest.spyOn(Date, 'now').mockImplementation(() => (now += 120000));
			try {
				const [json] = await refuse(429, shapes.reviewInFlight429, {
					operation: 'reviewDraft',
					draft: 'A draft.',
					waitForCompletion: false,
				});
				expect(json.code).toBe('review_in_flight');
				expect(json.retry_after).toBe(60);
			} finally {
				spy.mockRestore();
			}
		});

		it('a 402 carries cost and credits_remaining', async () => {
			const [json] = await refuse(402, shapes.noCredits402, { operation: 'verify', claim: 'x' });
			expect(json.code).toBe('no_credits');
			expect(json.cost).toBe(10);
			expect(json.credits_remaining).toBe(0);
			expect(String(json.error_message)).toContain('No remaining');
		});
	});

	describe('Review', () => {
		it('hands on the review body and adds passed', async () => {
			const [json] = await run({ operation: 'getReview', reviewId: 'rev_1' }, () => shapes.reviewCompletedClean);
			expect(json.status).toBe('completed');
			expect(json.outcome).toBe('clean');
			expect(json.passed).toBe(true);
			expect(json.review_id).toEqual(expect.any(String));
		});
	});
});
