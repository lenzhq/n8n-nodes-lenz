import { LenzOAuth2Api } from '../LenzOAuth2Api.credentials';

describe('LenzOAuth2Api credential', () => {
	const credential = new LenzOAuth2Api();
	const property = (name: string) => credential.properties.find((p) => p.name === name);

	it('keeps the name saved workflows reference', () => {
		// The node selects this credential by name; renaming it disconnects
		// every OAuth credential a user has already made.
		expect(credential.name).toBe('lenzOAuth2Api');
	});

	it("is n8n's generic OAuth2 credential underneath", () => {
		expect(credential.extends).toEqual(['oAuth2Api']);
	});

	it('registers itself with Lenz instead of asking for a client ID', () => {
		expect(property('useDynamicClientRegistration')).toMatchObject({ type: 'hidden', default: true });
	});

	it('discovers everything from the Lenz API issuer', () => {
		// n8n reads /.well-known/oauth-protected-resource/api/v1 and the
		// path-inserted authorization-server metadata from this URL.
		expect(property('serverUrl')).toMatchObject({ type: 'hidden', default: 'https://lenz.io/api/v1' });
	});

	it('asks the user for nothing but the Connect click', () => {
		const visible = credential.properties.filter((p) => p.type !== 'hidden' && p.type !== 'notice');
		expect(visible).toEqual([]);
	});
});
