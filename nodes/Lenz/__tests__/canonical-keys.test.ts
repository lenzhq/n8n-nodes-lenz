// The newer shape of the API, run through the node, must fill every output key
// the older shape's output has (it may carry more: the newer names stay). The
// same recorded cases as legacy-oracle.test.ts, in both shapes. Exact parity of
// values is not promised in this release; the values that carry meaning are
// checked below for the keys this node fills from the newer names.
import { sleep } from 'n8n-workflow';
import type { IDataObject } from 'n8n-workflow';

jest.mock('n8n-workflow', () => ({
	...jest.requireActual('n8n-workflow'),
	sleep: jest.fn(async () => {}),
}));

import { canonicalCases } from './canonical-bodies.fixtures';
import { legacyCases } from './legacy-bodies.fixtures';
import { runLegacyCase } from './legacy-harness';

void sleep;

// Key paths of a value; array positions collapse to `[]`.
const keyPaths = (value: unknown, prefix = ''): string[] => {
	if (Array.isArray(value)) return value.flatMap((v) => keyPaths(v, `${prefix}[].`));
	if (value && typeof value === 'object') {
		return Object.entries(value as object).flatMap(([k, v]) => [
			prefix + k,
			...keyPaths(v, `${prefix}${k}.`),
		]);
	}
	return [];
};

// Get Usage: the per-capability blocks are not rebuilt from the credit pool.
// Get Webhook Secret is refused for an API key in both shapes.
const names = Object.keys(canonicalCases).filter(
	(n) => !n.startsWith('account__me_usage') && !n.startsWith('account__webhook_secret'),
);

describe('the newer shape fills every key the older shape has', () => {
	it('covers the recorded cases', () => {
		expect(names.length).toBeGreaterThan(240);
	});

	it.each(names)('%s', async (name) => {
		const legacy = await runLegacyCase(legacyCases[name]);
		const canonical = await runLegacyCase(canonicalCases[name]);
		const have = new Set(keyPaths(canonical));
		const missing = [...new Set(keyPaths(legacy))].filter((k) => !have.has(k));
		expect(missing).toEqual([]);
	});
});

describe('the keys filled from the newer names carry the older shape\'s values', () => {
	const get = (obj: unknown, path: string[]): unknown[] => {
		if (path.length === 0) return [obj];
		if (Array.isArray(obj)) return obj.flatMap((v) => get(v, path));
		if (!obj || typeof obj !== 'object') return [];
		const [head, ...rest] = path;
		return get((obj as IDataObject)[head], rest);
	};
	const watched = [
		'claim',
		'identified_claims',
		'candidate_claims',
		'locations',
		'summary.claim_limit_reached',
		'summary.citation_limit_reached',
		'claims.assessment.error_code',
		'claims.assessment.identified_claims',
		'failure.failure_reason',
		'claims.assessment.failure.failure_reason',
		'failures.failure.failure_reason',
	];
	// `no_checkable_claim` is the newer word for what the older Extract and
	// Verify bodies call `not_a_claim`; only the review words are compared.
	const reviewAndExtract = names.filter((n) => /^(extract|review|citecheck)__/.test(n));

	it.each(reviewAndExtract)('%s', async (name) => {
		const legacy = await runLegacyCase(legacyCases[name]);
		const canonical = await runLegacyCase(canonicalCases[name]);
		for (const path of watched) {
			// An extract whose claims were all dropped by the locator reads
			// `locations: []` in the older shape and nothing in the newer one.
			if (name === 'extract__locate_all_dropped' && path === 'locations') continue;
			expect(JSON.stringify(get(canonical, path.split('.')))).toBe(
				JSON.stringify(get(legacy, path.split('.'))),
			);
		}
	});
});
