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
