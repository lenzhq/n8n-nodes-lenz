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
				'This one-click connection requires a recent version of n8n. If the <b>Connect</b> button does not work, update n8n, or use the <b>Lenz API</b> credential (API key) instead.',
			name: 'versionNotice',
			type: 'notice',
			default: '',
		},
		{
			displayName:
				'Getting an error when connecting? Check the <b>OAuth Redirect URL</b> shown above: Lenz accepts a public <code>https://</code> address, or <code>http://localhost</code> for an n8n on your own computer. If it shows an internal address such as <code>http://n8n.local:5678</code>, set the <code>WEBHOOK_URL</code> environment variable to your instance\'s real HTTPS address and restart n8n.',
			name: 'redirectUrlNotice',
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
