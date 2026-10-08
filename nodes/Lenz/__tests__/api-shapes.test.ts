// The node still requests the older API shape (legacy-oracle.test.ts holds it
// to its 0.8.0 output). These tests run the same recorded responses in both
// shapes, `legacy` and `canonical` (./api-shapes.fixtures.ts), through the real
// node. The newer shape must never crash the node and every output key must
// carry a sensible value; identical output from the two shapes is NOT promised
// in this release.
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
const SHAPES = ['legacy', 'canonical'] as const;

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

describe.each(SHAPES)('API shape: %s', (shape) => {
	describe('a failed verification', () => {
		it('keeps failure_reason, failure_class and retryable, and says why', async () => {
			const [json] = await run(
				{ operation: 'verify', claim: 'x' },
				status(shapes.statusFailedLive[shape]),
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
				status(shapes.statusFailedDurable[shape]),
			);
			expect(json.failure_reason).toBe('conclusion_failed');
			expect(json.failure_class).toBe('internal');
		});

		it('reports nothing-to-check as failure_reason "not_a_claim" and not_a_claim true', async () => {
			const [json] = await run(
				{ operation: 'verifyStatus', taskId: 'task_1' },
				status(shapes.statusNotAClaim[shape]),
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
				status(shapes.statusNeedsInput[shape]),
			);
			expect(json.status).toBe('needs_input');
			const claims = json.claims as IDataObject[];
			expect(claims.map((c) => c.text)).toEqual([
				'The Earth is round.',
				'Water boils at 100C at sea level.',
			]);
			expect(claims.map((c) => c.domain)).toEqual(['Science', 'Science']);
			// An older-shape option is passed through exactly as sent.
			if (shape === 'legacy') expect(claims).toEqual(shapes.statusNeedsInput.legacy.claims);
		});
	});

	describe('a completed verification', () => {
		it('leaves modified_at null when it finished on the day it was created', async () => {
			const [json] = await run(
				{ operation: 'verifyStatus', taskId: 'task_1' },
				status(shapes.statusCompletedSameDay[shape]),
			);
			expect(json.status).toBe('completed');
			expect(json.modified_at).toBeNull();
		});

		it('sets modified_at when it finished on a later UTC day', async () => {
			const [json] = await run(
				{ operation: 'verifyStatus', taskId: 'task_1' },
				status(shapes.statusCompletedCrossesMidnight[shape]),
			);
			expect(json.modified_at).toBe('2026-09-02T00:03:00.000000+00:00');
			expect(json).not.toHaveProperty('completed_at');
		});

		it('reads a stored verification the same way', async () => {
			const [json] = await run(
				{ operation: 'getVerification', verificationId: 'ver_1' },
				() => shapes.storedVerification[shape],
			);
			expect(json.status).toBe('completed');
			expect(json.verdict).toEqual(expect.any(String));
			expect(json).toHaveProperty('modified_at');
			expect(json).not.toHaveProperty('completed_at');
		});
	});

	describe('receipts', () => {
		it('emits chain_id, null when the API sends none', async () => {
			const [json] = await run({ operation: 'verify', claim: 'x', waitForCompletion: false }, () => ({
				...(shapes.submitReceipt[shape] as IDataObject),
			}));
			expect(json.status).toBe('queued');
			expect(json.chain_id).toBe(shape === 'legacy' ? shapes.submitReceipt.legacy.chain_id : null);
		});

		it('batch items carry the claim under `claim_text`', async () => {
			const out = await run(
				{ operation: 'verifyBatch', batchClaims: { claim: [{ text: 'a' }, { text: 'b' }] } },
				() => shapes.batchReceipt[shape],
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
				() => shapes.selectReceipt[shape],
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
			const [json] = await run({ operation: 'assess', text: 'hi' }, () => shapes.assessNoClaim[shape]);
			expect(json.status).toBe('no_claim');
			expect(json.not_a_claim).toBe(true);
			expect(json.candidate_claims).toEqual([]);
			expect(String(json.message).length).toBeGreaterThan(0);
		});

		it('shows a failed row as verdict "Error", confidence "low"', async () => {
			const [json] = await run({ operation: 'assess', text: 'hi' }, () => shapes.assessAllErrorRows[shape]);
			expect(json.status).toBe('ok');
			expect(json.not_a_claim).toBe(true);
			const rows = json.claims as IDataObject[];
			expect(rows.map((r) => [r.claim, r.verdict, r.confidence, r.passed])).toEqual([
				['hi', 'Error', 'low', false],
				['hello', 'Error', 'low', false],
			]);
		});

		it('maps a mixed wave row by row', async () => {
			const [json] = await run({ operation: 'assess', text: 'many' }, () => shapes.assessMixedRows[shape]);
			expect(json.not_a_claim).toBe(false);
			const rows = json.claims as IDataObject[];
			expect(rows.map((r) => r.verdict)).toEqual(['True', 'Error', 'Error', 'Error']);
			expect(rows.map((r) => r.passed)).toEqual([true, false, false, false]);
		});

		it('maps a single checked claim', async () => {
			const [json] = await run({ operation: 'assess', text: 'x' }, () => shapes.assessOneClaim[shape]);
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
		const extractBody = (status: string, claims: IDataObject[]): IDataObject =>
			shape === 'legacy'
				? { status, claim: claims[0]?.claim ?? '', identified_claims: [], original_input: 'x' }
				: { status, claims, original_input: 'x' };

		it('flags an input with nothing to check', async () => {
			const status = shape === 'legacy' ? 'not_a_claim' : 'no_checkable_claim';
			const [json] = await run({ operation: 'extract', text: 'x' }, () => extractBody(status, []));
			expect(json.status).toBe(status);
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

		it('a 429 states its wait under either name', async () => {
			const [json] = await refuse(429, shapes.extractRateLimited[shape], {
				operation: 'extract',
				text: 'Some text',
			});
			expect(json.status_code).toBe(429);
			expect(json.code).toBe('extract_daily_limit');
			expect(json.resets_in_seconds).toBe(900);
			expect(json.limit).toBe(1000);
		});

		it('a 503 states retry_after', async () => {
			const [json] = await refuse(503, shapes.capacity503[shape], { operation: 'assess', text: 'x' });
			expect(json.code).toBe('capacity');
			expect(json.retry_after).toBe(60);
			expect(String(json.error_message)).toContain('~60s');
		});

		it('an in-flight 429 states its wait under either name', async () => {
			// The node waits for a slot on the real clock; jump it past the budget.
			let now = Date.now();
			const spy = jest.spyOn(Date, 'now').mockImplementation(() => (now += 120000));
			try {
				const [json] = await refuse(429, shapes.reviewInFlight429[shape], {
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
			const [json] = await refuse(402, shapes.noCredits402[shape], { operation: 'verify', claim: 'x' });
			expect(json.code).toBe('no_credits');
			expect(json.cost).toBe(10);
			expect(json.credits_remaining).toBe(0);
			expect(String(json.error_message)).toContain('No remaining');
		});
	});

	describe('Review', () => {
		it('hands on the review body and adds passed', async () => {
			const [json] = await run({ operation: 'getReview', reviewId: 'rev_1' }, () => shapes.reviewCompletedClean[shape]);
			expect(json.status).toBe('completed');
			expect(json.outcome).toBe('clean');
			expect(json.passed).toBe(true);
			expect(json.review_id).toEqual(expect.any(String));
		});
	});
});
