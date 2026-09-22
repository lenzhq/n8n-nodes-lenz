import { LenzApi } from '../LenzApi.credentials';
import { Lenz } from '../../nodes/Lenz/Lenz.node';

// The credential had no test at all until the coverage gate went in: nothing
// imported it, so it read 0% and was invisible in any report that only covers
// files a test already touched. It is the auth surface, and two of the things
// below are the kind that break every request in a way no node test can see.

describe('Lenz API credential', () => {
	const credential = new LenzApi();

	it('marks the API key as a password so it is not shown or logged', () => {
		const apiKey = credential.properties.find((p) => p.name === 'apiKey');
		expect(apiKey).toBeDefined();
		expect(apiKey?.typeOptions?.password).toBe(true);
		expect(apiKey?.required).toBe(true);
		// A default of anything but empty would ship a value in the workflow JSON.
		expect(apiKey?.default).toBe('');
	});

	it('sends the key as a Bearer token', () => {
		expect(credential.authenticate.type).toBe('generic');
		const headers = credential.authenticate.properties.headers as Record<string, string>;
		// The `=` prefix is what makes n8n evaluate the expression rather than
		// send it literally — without it every request carries the string
		// "Bearer {{$credentials.apiKey}}" and 401s.
		expect(headers.Authorization).toBe('=Bearer {{$credentials.apiKey}}');
	});

	it('tests the credential against a real endpoint that needs auth', () => {
		// The test request has to be one that fails without a valid key,
		// otherwise "Test" passes for a wrong key and the user finds out later.
		expect(credential.test.request.baseURL).toBe('https://lenz.io/api/v1');
		expect(credential.test.request.url).toBe('/me/usage');
		expect(credential.test.request.method).toBe('GET');
	});

	it('is named exactly what the node asks for', () => {
		// The one failure no node test can catch: the node requests its
		// credential by name, and if the two ever drift the node loads fine and
		// then cannot authenticate anything.
		const requested = new Lenz().description.credentials?.map((c) => c.name);
		expect(requested).toContain(credential.name);
		expect(credential.name).toBe('lenzApi');
	});

	it('points at documentation a user can actually reach', () => {
		expect(credential.documentationUrl).toMatch(/^https:\/\//);
	});
});
