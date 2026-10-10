// What a saved workflow sees change. Every node version asks for API version
// `2026-10-11`; until this release, versions 1 to 1.2 asked for `2026-08-05`
// and got the older shape. Against every recorded response, each node version
// returns what 0.8.0 returned for the same response in the older shape (the
// frozen output in output-0.8.0.fixtures.ts): every output key, with the same
// value. Keys the API adds (and `not_a_claim`, `rationale`) may appear beside
// them. The differences that remain are listed one by one in KNOWN, each with
// its reason, and the list must stay exact.
//
// What a workflow shows for a refusal with Continue On Fail off is pinned by
// canonical-output.test.ts; it equals the older shape's in every recorded case
// but one, a 405 for a request Lenz does not route (the older answer was not
// JSON, so n8n showed its generic text; this one is Lenz's JSON 405).
import { sleep } from 'n8n-workflow';
import type { IDataObject } from 'n8n-workflow';

jest.mock('n8n-workflow', () => ({
	...jest.requireActual('n8n-workflow'),
	sleep: jest.fn(async () => {}),
}));

import { canonicalCases } from './canonical-bodies.fixtures';
import { output080 } from './output-0.8.0.fixtures';
import { runRecordedCase } from './recorded-harness';

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

const PROSE = 'a sentence the API words differently now; the code beside it is unchanged';
const CHAIN_ID =
	'the API sends no chain_id (an internal id, never pollable); the key stays, null';
const SAME_INSTANT =
	'recorded with created_at equal to completed_at, so no later day to report; the later-day rule is tested in api-shapes.test.ts';

const KNOWN: Record<string, Record<string, string>> = {
	extract__locate_all_dropped: {
		'[0].locations': 'an empty list only when positions were asked for, which this node never does',
	},
	extract__not_a_claim_beside_claims: {
		'[0].status':
			'the older shape said not_a_claim beside a claim it returned; the API now says ready',
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

const VERSIONS = [1, 1.1, 1.2, 1.3];

describe('every node version gives the 0.8.0 output from the 2026-10-11 shape', () => {
	const names = Object.keys(canonicalCases);

	it('covers every recorded case', () => {
		expect(Object.keys(output080).sort()).toEqual([...names].sort());
		expect(names.length).toBeGreaterThan(270);
		for (const name of Object.keys(KNOWN)) expect(names).toContain(name);
	});

	const cases = VERSIONS.flatMap((version) => names.map((name) => [version, name] as const));

	it.each(cases)('version %s: %s', async (version, name) => {
		const expected = output080[name];
		const sent: string[] = [];
		if (expected.threw !== undefined) {
			await expect(runRecordedCase(canonicalCases[name], version, sent)).rejects.toThrow(expected.threw);
			expect(sent.filter((v) => v !== '2026-10-11')).toEqual([]);
			return;
		}
		const actual = await runRecordedCase(canonicalCases[name], version, sent);
		expect(sent.filter((v) => v !== '2026-10-11')).toEqual([]);
		const known = KNOWN[name] ?? {};
		// Exact: a listed difference that no longer differs must leave the list.
		expect(differences(actual, expected.ok).sort()).toEqual(Object.keys(known).sort());
	});
});
