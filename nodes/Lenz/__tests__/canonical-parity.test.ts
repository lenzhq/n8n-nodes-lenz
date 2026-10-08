// Release bar for node version 1.3, which asks for the newer API shape
// (`2026-10-11`): against every recorded response in that shape, the node
// returns what a version 1.2 node returns for the same response in the older
// shape (the frozen 0.8.0 output in legacy-oracle.fixtures.ts, plus the
// `not_a_claim` flag): every output key, with the same value. Keys the newer
// shape adds may appear beside them. The differences that remain are listed
// one by one in KNOWN, each with its reason, and the list must stay exact.
import { sleep } from 'n8n-workflow';
import type { IDataObject } from 'n8n-workflow';

jest.mock('n8n-workflow', () => ({
	...jest.requireActual('n8n-workflow'),
	sleep: jest.fn(async () => {}),
}));

import { canonicalCases } from './canonical-bodies.fixtures';
import { legacyCases } from './legacy-bodies.fixtures';
import { legacyOracle } from './legacy-oracle.fixtures';
import { runLegacyCase } from './legacy-harness';

void sleep;

// Every place `actual` lacks a key `expected` has, or holds another value.
// Paths read like `[0].claims[1].verdict`. Keys only `actual` has are allowed.
function differences(actual: unknown, expected: unknown, path = ''): string[] {
	if (Array.isArray(expected)) {
		if (!Array.isArray(actual) || actual.length !== expected.length) return [path];
		return expected.flatMap((v, i) => differences(actual[i], v, `${path}[${i}]`));
	}
	if (expected && typeof expected === 'object') {
		if (!actual || typeof actual !== 'object' || Array.isArray(actual)) return [path];
		return Object.entries(expected).flatMap(([k, v]) =>
			k in (actual as object)
				? differences((actual as IDataObject)[k], v, `${path}.${k}`)
				: [`${path}.${k}`],
		);
	}
	return actual === expected ? [] : [path];
}

const PROSE = 'a sentence the newer shape words differently; the code beside it is unchanged';
const CHAIN_ID =
	'the newer shape sends no chain_id (an internal id, never pollable); the key stays, null';
const SAME_INSTANT =
	'recorded with created_at equal to completed_at, so no later day to report; the later-day rule is tested in api-shapes.test.ts';

const KNOWN: Record<string, Record<string, string>> = {
	extract__locate_all_dropped: {
		'[0].locations': 'an empty list only when positions were asked for, which this node never does',
	},
	extract__not_a_claim_beside_claims: {
		'[0].status':
			'the older shape said not_a_claim beside a claim it returned; the newer one says ready',
	},
	review__get_assessment_rows_full_fields: {
		'[0].claims[0].assessment.hint': 'a hint stored on this recorded row only; reviews store none',
	},
	review__get_failed_every_assessment_failed: { '[0].failure.hint': PROSE },
	review__get_nested_verification_modified_at_crosses_midnight_by_minutes: {
		'[0].claims[0].verification.modified_at': SAME_INSTANT,
	},
	verify__idempotency_key_replay: { '[0].chain_id': CHAIN_ID },
	verify__implicit_repeat_replay: { '[0].chain_id': CHAIN_ID },
	verify__submit_202: { '[0].chain_id': CHAIN_ID },
	verify__submit_202_options: { '[0].chain_id': CHAIN_ID },
	verify__submit_202_text_alias: { '[0].chain_id': CHAIN_ID },
	verify__list_200_modified_at_crosses_midnight_by_minutes: { '[0].modified_at': SAME_INSTANT },
	verify__status_completed_durable_modified_at_crosses_midnight_by_minutes: {
		'[0].modified_at': SAME_INSTANT,
	},
	verify__status_completed_live_modified_at_crosses_midnight_by_minutes: {
		'[0].modified_at': SAME_INSTANT,
	},
	verify__verification_200_modified_at_crosses_midnight_by_minutes: {
		'[0].modified_at': SAME_INSTANT,
	},
	verify__verification_200_modified_at_crosses_midnight_by_minutes__audit: {
		'[0].modified_at': SAME_INSTANT,
	},
	verify__verification_200_modified_at_set: { '[0].modified_at': SAME_INSTANT },
	verify__verification_200_modified_at_set__audit: { '[0].modified_at': SAME_INSTANT },
	verify__status_cancelled_durable: { '[0].message': PROSE },
	verify__status_failed_durable: { '[0].message': PROSE },
	verify__status_failed_durable_framing: { '[0].message': PROSE },
	verify__status_failed_live: { '[0].message': PROSE },
	verify__status_failed_live_retryable: { '[0].message': PROSE },
	verify__status_not_a_claim: { '[0].message': PROSE },
	verify__status_not_a_claim_durable: { '[0].message': PROSE },
	verify__status_task_stuck: { '[0].message': PROSE },
	verify__stored_progress_failed_crashed: { '[0].message': PROSE },
	verify__stored_progress_failed_insufficient_evidence: { '[0].message': PROSE },
};

describe('version 1.3 gives the version 1.2 output from the newer shape', () => {
	const names = Object.keys(canonicalCases);

	// The older shape has four more: a `webhook_url` of null refused with 422,
	// which the newer shape accepts (null means the credential's default).
	it('covers every recorded case', () => {
		const legacyOnly = Object.keys(legacyCases).filter((n) => !(n in canonicalCases));
		expect(legacyOnly.sort()).toEqual([
			'verify__batch_item_webhook_url_null_422',
			'verify__batch_webhook_url_null_422',
			'verify__webhook_url_null_422',
			'verify__webhook_url_null_and_missing_claim_422',
		]);
		expect(names.length).toBeGreaterThan(270);
		for (const name of Object.keys(KNOWN)) expect(names).toContain(name);
	});

	it.each(names)('%s', async (name) => {
		const expected = legacyOracle[name];
		const sent: string[] = [];
		if (expected.threw !== undefined) {
			await expect(runLegacyCase(canonicalCases[name], 1.3, sent)).rejects.toThrow(expected.threw);
			expect(sent.filter((v) => v !== '2026-10-11')).toEqual([]);
			return;
		}
		const actual = await runLegacyCase(canonicalCases[name], 1.3, sent);
		expect(sent.filter((v) => v !== '2026-10-11')).toEqual([]);
		const known = KNOWN[name] ?? {};
		// Exact: a listed difference that no longer differs must leave the list.
		expect(differences(actual, expected.ok).sort()).toEqual(Object.keys(known).sort());
	});
});
