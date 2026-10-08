// Runs one recorded response through the node and returns what the workflow
// receives: the items' json, or, for a 4xx/5xx, the error output of a node set
// to continue on fail. Shared by the frozen-output test and the generator that
// produced those outputs from the node as it was before the API-shape work.
import { NodeApiError } from 'n8n-workflow';
import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { Lenz } from '../Lenz.node';
import type { LegacyCase } from './legacy-bodies.fixtures';

function apiError(statusCode: number, body: Record<string, unknown>, describeFromBody = false) {
	const transport = Object.assign(new Error(`Request failed with status code ${statusCode}`), {
		statusCode,
		response: { status: statusCode, data: body },
	});
	const node = { name: 'Lenz', type: 'lenz', typeVersion: 1, position: [0, 0] } as never;
	const error = new NodeApiError(node, transport as never);
	// n8n can describe a failed request by the JSON body it got back (its
	// `detail`, a list's messages, ...): the description a user then sees.
	if (describeFromBody) {
		error.description = new NodeApiError(node, { ...body } as never, {
			httpCode: String(statusCode),
		}).description;
	}
	return error;
}

// `typeVersion`: the node version to run as (default 1). `sent` collects the
// API version header of every request the node made.
export async function runLegacyCase(
	c: LegacyCase,
	typeVersion = 1,
	sent: string[] = [],
	// false: run with Continue On Fail off, so a refusal throws as it does in a
	// workflow; the error's description is then the one n8n builds from the body.
	continueOnFail = true,
): Promise<IDataObject[]> {
	const failing = c.status >= 400;
	const ctx = {
		getInputData: jest.fn(() => [{ json: {} }]),
		getNodeParameter: jest.fn((name: string, _i: number, fallback?: unknown) =>
			name === 'operation' ? c.operation : name in c.params ? c.params[name] : fallback,
		),
		getNode: jest.fn(() => ({ name: 'Lenz', type: 'lenz', typeVersion, position: [0, 0] })),
		getExecutionId: jest.fn(() => 'exec-1'),
		continueOnFail: jest.fn(() => failing && continueOnFail),
		helpers: {
			httpRequestWithAuthentication: jest.fn(async (_credential: string, options: { headers?: IDataObject }) => {
				sent.push(String(options.headers?.['X-Lenz-API-Version']));
				if (failing) throw apiError(c.status, c.body, !continueOnFail);
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

/**
 * What a workflow shows for a refusal with Continue On Fail off, or null when
 * the node handles the refusal itself and returns an item.
 */
export async function thrownBy(
	c: LegacyCase,
	typeVersion: number,
): Promise<{ message: string; description: string | null; httpCode: string | null } | null> {
	try {
		await runLegacyCase(c, typeVersion, [], false);
	} catch (error) {
		const e = error as { message: string; description?: string | null; httpCode?: string | null };
		return { message: e.message, description: e.description ?? null, httpCode: e.httpCode ?? null };
	}
	return null;
}
