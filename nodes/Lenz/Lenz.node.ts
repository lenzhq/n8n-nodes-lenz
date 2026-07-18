import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError, sleep } from 'n8n-workflow';

const BASE_URL = 'https://lenz.io/api/v1';

// Verify (Deep) is async server-side: submit returns a task_id, then we poll
// the status endpoint until it reaches a terminal state. Backoff mirrors the
// Lenz API's recommended 2s/4s/8s cadence, capped by the overall deadline.
const POLL_TIMEOUT_MS = 120000;
const POLL_BACKOFF_MS = [2000, 4000, 8000];

function isPassingVerdict(verdict?: string): boolean {
	return verdict === 'True' || verdict === 'Mostly True';
}

export class Lenz implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Lenz',
		name: 'lenz',
		icon: { light: 'file:lenz.svg', dark: 'file:lenz.dark.svg' },
		group: ['transform'],
		version: [1],
		subtitle: '={{$parameter["operation"]}}',
		description: 'Fact-check claims and catch AI hallucinations with sourced, audit-grade verdicts',
		defaults: {
			name: 'Lenz',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'lenzApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Ask Follow-Up',
						value: 'ask',
						description: 'Ask a grounded follow-up question about a completed Verify (Deep) result',
						action: 'Ask a follow up question',
					},
					{
						name: 'Assess (Fast)',
						value: 'assess',
						description: 'Fast 3-model panel verdict (~5-10s), one entry per claim found in the text',
						action: 'Quickly assess text for factual claims',
					},
					{
						name: 'Check Usage',
						value: 'usage',
						description: 'Check remaining quota for the current API key',
						action: 'Check usage and quota',
					},
					{
						name: 'Extract Claims',
						value: 'extract',
						description: 'Pull verifiable claims out of text (free)',
						action: 'Extract claims from text',
					},
					{
						name: 'Verify (Deep)',
						value: 'verify',
						description: 'Full 8-model pipeline with sourced citations (~90s). Reserve for high-stakes claims.',
						action: 'Deeply verify a claim',
					},
				],
				default: 'verify',
			},
			{
				displayName: 'Claim',
				name: 'claim',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['verify'] },
				},
				description: 'The claim to investigate in depth. Reserve for high-stakes statements that warrant a thorough, sourced check.',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['assess', 'extract'] },
				},
				description: 'The text to check. If it contains several claims, each is handled separately.',
			},
			{
				displayName: 'Verification ID',
				name: 'verificationId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['ask'] },
				},
				description: 'The verification_id from a successful Verify (Deep) result. A timed-out or needs-clarification result returns a task_id instead, which won\'t work here.',
			},
			{
				displayName: 'Question',
				name: 'question',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: { operation: ['ask'] },
				},
				description: 'The follow-up question, answered from the verification full research and evidence',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				placeholder: 'Es',
				description: 'Optional ISO 639-1 response language code. Defaults to English.',
				displayOptions: {
					show: { operation: ['verify', 'assess', 'extract', 'ask'] },
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Calls the Lenz REST API with the credential's Bearer auth attached by
		// n8n. No third-party SDK — this is the required shape for a verified
		// community node (zero runtime dependencies).
		const lenzRequest = async (
			method: IHttpRequestMethods,
			path: string,
			body?: IDataObject,
		): Promise<IDataObject> => {
			const options: IHttpRequestOptions = {
				method,
				baseURL: BASE_URL,
				url: path,
				json: true,
			};
			if (body !== undefined) {
				options.body = body;
			}
			return (await this.helpers.httpRequestWithAuthentication.call(
				this,
				'lenzApi',
				options,
			)) as IDataObject;
		};

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operation = this.getNodeParameter('operation', itemIndex) as string;
				const language = (this.getNodeParameter('language', itemIndex, '') as string) || undefined;

				let responseData: IDataObject;

				if (operation === 'verify') {
					const claim = (this.getNodeParameter('claim', itemIndex) as string).trim();
					if (!claim) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}

					const submitBody: IDataObject = { text: claim };
					if (language) {
						submitBody.language = language;
					}
					const accepted = await lenzRequest('POST', '/verify', submitBody);
					const taskId = (accepted.task_id as string) ?? '';

					const deadline = Date.now() + POLL_TIMEOUT_MS;
					let terminal: IDataObject | undefined;
					let pollIdx = 0;
					while (Date.now() < deadline) {
						const status = await lenzRequest('GET', `/verify/status/${taskId}`);
						const state = status.status as string;
						if (state === 'completed' || state === 'needs_input' || state === 'failed') {
							terminal = status;
							break;
						}
						const backoff = POLL_BACKOFF_MS[Math.min(pollIdx, POLL_BACKOFF_MS.length - 1)];
						await sleep(Math.min(backoff, Math.max(0, deadline - Date.now())));
						pollIdx += 1;
					}

					if (!terminal) {
						responseData = {
							status: 'timeout',
							task_id: taskId,
							message: 'The verification did not complete in time (task_id: ' + taskId + '). It may still be running server-side.',
						};
					} else if (terminal.status === 'completed') {
						const result = (terminal.result ?? {}) as IDataObject;
						const sources = (result.sources ?? []) as IDataObject[];
						responseData = {
							status: 'completed',
							passed: isPassingVerdict(result.verdict as string | undefined),
							verdict: result.verdict ?? null,
							confidence: result.confidence ?? null,
							lenz_score: result.lenz_score ?? null,
							executive_summary: result.executive_summary ?? '',
							citations: sources
								.filter((s) => s.url)
								.map((s) => ({ title: s.title ?? '', url: s.url ?? '' })),
							verification_id: result.verification_id ?? null,
						};
					} else if (terminal.status === 'needs_input') {
						responseData = {
							status: 'needs_input',
							reason: terminal.reason ?? null,
							task_id: taskId,
							message: 'This claim is ambiguous or contains multiple sub-claims. Rephrase it to be more specific and re-run.',
						};
					} else {
						const detail = terminal.error ?? terminal.failure_detail ?? terminal.failure_reason ?? 'unknown';
						responseData = {
							status: 'failed',
							task_id: taskId,
							message: 'Verification failed: ' + String(detail),
						};
					}
				} else if (operation === 'assess') {
					const text = (this.getNodeParameter('text', itemIndex) as string).trim();
					if (!text) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}

					const body: IDataObject = { text };
					if (language) {
						body.language = language;
					}
					const result = await lenzRequest('POST', '/assess', body);
					const claims = (result.claims ?? []) as IDataObject[];
					if (!claims.length) {
						responseData = {
							status: result.error_code === 'ambiguous' ? 'ambiguous' : 'no_claim',
							message: result.error ?? 'No verifiable factual claim was detected.',
							candidate_claims: result.candidate_claims ?? [],
						};
					} else {
						responseData = {
							status: 'ok',
							claims: claims.map((c) => ({
								claim: c.claim ?? '',
								verdict: c.verdict ?? null,
								confidence: c.confidence ?? null,
								passed: isPassingVerdict(c.verdict as string | undefined),
								verification_url: c.verification_url ?? null,
							})),
						};
					}
				} else if (operation === 'extract') {
					const text = (this.getNodeParameter('text', itemIndex) as string).trim();
					if (!text) {
						returnData.push({
							json: { skipped: true, reason: 'empty_input' },
							pairedItem: { item: itemIndex },
						});
						continue;
					}

					const body: IDataObject = { text };
					if (language) {
						body.language = language;
					}
					responseData = await lenzRequest('POST', '/extract', body);
				} else if (operation === 'ask') {
					const verificationId = this.getNodeParameter('verificationId', itemIndex) as string;
					const question = this.getNodeParameter('question', itemIndex) as string;

					const body: IDataObject = { message: question };
					if (language) {
						body.language = language;
					}
					const reply = await lenzRequest('POST', `/ask/${verificationId}`, body);
					responseData = {
						answer: reply.content ?? '',
					};
				} else if (operation === 'usage') {
					responseData = await lenzRequest('GET', '/me/usage');
				} else {
					throw new NodeOperationError(this.getNode(), 'Unknown operation: ' + operation, {
						itemIndex,
					});
				}

				returnData.push({
					json: responseData,
					pairedItem: { item: itemIndex },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: itemIndex },
					});
					continue;
				}

				throw new NodeApiError(
					this.getNode(),
					{ message: (error as Error).message },
					{ itemIndex },
				);
			}
		}

		return [returnData];
	}
}
