import type { INodeProperties, INodePropertyCollection } from 'n8n-workflow';

import { Lenz } from '../Lenz.node';

/**
 * The input fields were relabelled "Claim" (a document is text, a claim is a
 * claim). The parameter NAMES are what saved workflows persist, so they must
 * not move: a workflow built on 0.4.0 has to load and run unchanged. Body
 * tests alone cannot catch a key rename — the request would still be right
 * while every saved workflow silently lost its input.
 */
describe('parameter keys survive the Claim relabel', () => {
	const props = new Lenz().description.properties;
	const forOperation = (op: string): INodeProperties[] =>
		props.filter((p) => ((p.displayOptions?.show?.operation as string[] | undefined) ?? []).includes(op));

	it('Assess shows "Claim" on the saved key `text`', () => {
		const field = forOperation('assess').find((p) => p.displayName === 'Claim');
		expect(field?.name).toBe('text');
		expect(forOperation('assess').some((p) => p.displayName === 'Text')).toBe(false);
	});

	it('Extract keeps "Text" on `text`', () => {
		const field = forOperation('extract').find((p) => p.displayName === 'Text');
		expect(field?.name).toBe('text');
	});

	it('Verify keeps "Claim" on `claim`', () => {
		const field = forOperation('verify').find((p) => p.displayName === 'Claim');
		expect(field?.name).toBe('claim');
	});

	it('each batch item shows "Claim" on the saved key `text`', () => {
		const batch = props.find((p) => p.name === 'batchClaims');
		const collection = (batch?.options as INodePropertyCollection[])[0];
		const field = collection.values.find((v) => v.displayName === 'Claim');
		expect(field?.name).toBe('text');
	});

	it('Select keeps `selectedClaims`', () => {
		expect(forOperation('select').some((p) => p.name === 'selectedClaims')).toBe(true);
	});
});

describe('Review resource parameter keys (saved in 0.8.0 workflows)', () => {
	const props = new Lenz().description.properties;
	const forOperation = (op: string): INodeProperties[] =>
		props.filter((p) => ((p.displayOptions?.show?.operation as string[] | undefined) ?? []).includes(op));
	const names = (op: string) => forOperation(op).map((p) => p.name);

	it.each([
		['reviewDraft', ['draft', 'waitForCompletion', 'reviewOptions', 'visibility', 'language']],
		['getReview', ['reviewId', 'issuesOnly']],
		['checkCitations', ['citationInput', 'citationText', 'citationPairs', 'maxCitations', 'citationOptions']],
		['getCitationCheck', ['citecheckId']],
	])('%s keeps its keys', (op, keys) => {
		expect(names(op)).toEqual(expect.arrayContaining(keys));
	});

	const collectionKeys = (name: string) =>
		(props.find((p) => p.name === name)?.options as INodeProperties[]).map((o) => o.name).sort();

	it('Options keep their keys, with Max Wait at 600 inside them', () => {
		expect(collectionKeys('reviewOptions')).toEqual(
			[
				'confidence',
				'depth',
				'maxAssessments',
				'maxCitations',
				'maxVerifications',
				'maxWaitSeconds',
				'suggestEdits',
				'verdicts',
				'webhookUrl',
			].sort(),
		);
		expect(collectionKeys('citationOptions')).toEqual(['maxWaitSeconds', 'webhookUrl']);
		for (const name of ['reviewOptions', 'citationOptions']) {
			const wait = (props.find((p) => p.name === name)?.options as INodeProperties[]).find(
				(o) => o.name === 'maxWaitSeconds',
			);
			expect(wait?.default).toBe(600);
		}
	});

	it('every copy of a shared key keeps one type and never shows twice for an operation', () => {
		for (const key of ['waitForCompletion', 'maxWaitSeconds', 'webhookUrl', 'operation']) {
			const copies = props.filter((p) => p.name === key);
			if (key !== 'operation') {
				expect(new Set(copies.map((c) => c.type)).size).toBe(1);
			}
			const seen = new Map<string, number>();
			for (const copy of copies) {
				for (const op of (copy.displayOptions?.show?.operation as string[] | undefined) ?? []) {
					seen.set(op, (seen.get(op) ?? 0) + 1);
				}
			}
			for (const [op, n] of seen) expect([key, op, n]).toEqual([key, op, 1]);
		}
	});
});
