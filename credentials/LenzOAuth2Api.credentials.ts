import type { ICredentialType, INodeProperties } from 'n8n-workflow';

/**
 * Sign in with a Lenz account instead of pasting an API key.
 *
 * n8n registers itself with Lenz on the first Connect (RFC 7591 Dynamic Client
 * Registration), so there is nothing to set up: no client ID, no secret, no
 * redirect URL to copy. n8n discovers the endpoints and scopes from Lenz's
 * metadata at `serverUrl`, registers a public PKCE client and stores the
 * client ID it is given. Every Connect registers anew, so any number of n8n
 * instances and credentials can use one Lenz account side by side.
 */
export class LenzOAuth2Api implements ICredentialType {
	name = 'lenzOAuth2Api';
	extends = ['oAuth2Api'];
	displayName = 'Lenz OAuth2 API';
	icon = { light: 'file:../nodes/Lenz/lenz.svg', dark: 'file:../nodes/Lenz/lenz.dark.svg' } as const;
	documentationUrl = 'https://lenz.io/api-credentials';

	properties: INodeProperties[] = [
		{
			displayName:
				'Click <b>Connect my account</b> and sign in to Lenz — nothing to fill in. Lenz needs the redirect URL above to be a public <code>https://</code> address or <code>http://localhost</code>; it needs n8n 2.12 or later; otherwise use an API key.',
			name: 'connectNotice',
			type: 'notice',
			default: '',
		},
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'hidden',
			default: 'https://lenz.io/api/v1',
		},
		{
			displayName: 'Use Dynamic Client Registration',
			name: 'useDynamicClientRegistration',
			type: 'hidden',
			default: true,
		},
	];
}
