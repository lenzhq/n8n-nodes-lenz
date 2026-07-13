import type { ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class LenzApi implements ICredentialType {
	name = 'lenzApi';
	displayName = 'Lenz API';
	icon = { light: 'file:../nodes/Lenz/lenz.svg', dark: 'file:../nodes/Lenz/lenz.dark.svg' } as const;
	documentationUrl = 'https://lenz.io/api-integration';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description:
				'Your Lenz API key (starts with "lenz_"). Get one at lenz.io/api-integration.',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://lenz.io/api/v1',
			url: '/me/usage',
			method: 'GET',
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
