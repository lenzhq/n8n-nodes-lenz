// Release bar: the node reads only the `2026-10-11` shape, and every node
// version returns, byte for byte (key order included), what a version 1.3 node
// returned for the same response in 0.9.0, the release that still read both
// shapes (canonical-output.fixtures.ts, recorded from it). That covers the
// items with Continue On Fail on, the message thrown with it on, and what a
// workflow shows for a refusal with it off.
import { sleep } from 'n8n-workflow';

jest.mock('n8n-workflow', () => ({
	...jest.requireActual('n8n-workflow'),
	sleep: jest.fn(async () => {}),
}));

import { canonicalCases } from './canonical-bodies.fixtures';
import { canonicalOutput } from './canonical-output.fixtures';
import { runRecordedCase, thrownBy } from './recorded-harness';

void sleep;

const VERSIONS = [1, 1.1, 1.2, 1.3];

describe('every node version gives the 0.9.0 version 1.3 output', () => {
	const names = Object.keys(canonicalCases);

	it('covers every recorded case', () => {
		expect(Object.keys(canonicalOutput).sort()).toEqual([...names].sort());
		expect(names.length).toBeGreaterThan(270);
	});

	const cases = VERSIONS.flatMap((version) => names.map((name) => [version, name] as const));

	it.each(cases)('version %s: %s', async (version, name) => {
		const expected = canonicalOutput[name];
		const sent: string[] = [];
		let ok: unknown = null;
		let threw: string | null = null;
		try {
			ok = await runRecordedCase(canonicalCases[name], version, sent);
		} catch (error) {
			threw = String((error as Error).message);
		}
		expect(sent.filter((v) => v !== '2026-10-11')).toEqual([]);
		expect(JSON.stringify({ ok, threw })).toBe(JSON.stringify({ ok: expected.ok, threw: expected.threw }));
		if (canonicalCases[name].status >= 400) {
			expect(JSON.stringify(await thrownBy(canonicalCases[name], version))).toBe(
				JSON.stringify(expected.thrown),
			);
		} else {
			expect(expected.thrown).toBeNull();
		}
	});
});
