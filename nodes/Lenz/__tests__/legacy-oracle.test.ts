// Release bar: against every recorded response in the shape this node still
// requests, the node returns exactly what 0.8.0 returned, byte for byte once
// serialized, plus one additive boolean `not_a_claim` where the answer can say
// nothing is checkable (Assess, Extract, and a failed verification).
import { sleep } from 'n8n-workflow';
import type { IDataObject } from 'n8n-workflow';

jest.mock('n8n-workflow', () => ({
	...jest.requireActual('n8n-workflow'),
	sleep: jest.fn(async () => {}),
}));

import { legacyCases } from './legacy-bodies.fixtures';
import { legacyOracle } from './legacy-oracle.fixtures';
import { runLegacyCase } from './legacy-harness';

void sleep;

const withoutFlag = (json: IDataObject): IDataObject => {
	const rest = { ...json };
	delete rest.not_a_claim;
	return rest;
};

describe('legacy responses give the 0.8.0 output plus not_a_claim', () => {
	it('covers every recorded case', () => {
		expect(Object.keys(legacyOracle).sort()).toEqual(Object.keys(legacyCases).sort());
		expect(Object.keys(legacyCases).length).toBeGreaterThan(250);
	});

	it.each(Object.keys(legacyCases))('%s', async (name) => {
		const expected = legacyOracle[name];
		const c = legacyCases[name];
		if (expected.threw !== undefined) {
			await expect(runLegacyCase(c)).rejects.toThrow(expected.threw);
			return;
		}
		const actual = await runLegacyCase(c);
		expect(JSON.stringify(actual.map(withoutFlag))).toBe(JSON.stringify(expected.ok));
		for (const item of actual) {
			if ('not_a_claim' in item) {
				expect(typeof item.not_a_claim).toBe('boolean');
				expect(['assess', 'extract', 'verify', 'verifyStatus', 'getVerification']).toContain(c.operation);
			}
		}
	});
});
