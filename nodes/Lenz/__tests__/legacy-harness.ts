// Runs one recorded response through the node and returns what the workflow
// receives: the items' json, or, for a 4xx/5xx, the error output of a node set
// to continue on fail. Shared by the frozen-output test and the generator that
// produced those outputs from the node as it was before the API-shape work.
import { NodeApiError } from 'n8n-workflow';
import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { Lenz } from '../Lenz.node';
import type { LegacyCase } from './legacy-bodies.fixtures';

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

// `typeVersion`: the node version to run as (default 1). `sent` collects the
// API version header of every request the node made.
export async function runLegacyCase(
	c: LegacyCase,
	typeVersion = 1,
	sent: string[] = [],
): Promise<IDataObject[]> {
	const failing = c.status >= 400;
	const ctx = {
		getInputData: jest.fn(() => [{ json: {} }]),
		getNodeParameter: jest.fn((name: string, _i: number, fallback?: unknown) =>
			name === 'operation' ? c.operation : name in c.params ? c.params[name] : fallback,
		),
		getNode: jest.fn(() => ({ name: 'Lenz', type: 'lenz', typeVersion, position: [0, 0] })),
		getExecutionId: jest.fn(() => 'exec-1'),
		continueOnFail: jest.fn(() => failing),
		helpers: {
			httpRequestWithAuthentication: jest.fn(async (_credential: string, options: { headers?: IDataObject }) => {
				sent.push(String(options.headers?.['X-Lenz-API-Version']));
				if (failing) throw apiError(c.status, c.body);
				return c.body;
			}),
		},
	} as unknown as IExecuteFunctions;
	// Waits for an in-flight slot run on the real clock; jump it past the budget.
	let now = Date.now();
	const spy = jest.spyOn(Date, 'now').mockImplementation(() => (now += 120000));
	try {
		const result = await new Lenz().execute.call(ctx);
		return result[0].map((item) => item.json as IDataObject);
	} finally {
		spy.mockRestore();
	}
}
