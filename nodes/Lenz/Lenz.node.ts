import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
// eslint-disable-next-line @n8n/community-nodes/no-restricted-imports -- bundled via esbuild postbuild step (scripts/bundle-deps.mjs), zero runtime dependency in the compiled dist output
import {
	Lenz as LenzClient,
	LenzError,
	LenzNeedsInputError,
	LenzPipelineError,
	LenzTimeoutError,
} from 'lenz-io';

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
				description: 'The verification_id from a completed Verify (Deep) result (not a task_id)',
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

		const credentials = await this.getCredentials('lenzApi');
		const client = new LenzClient({ apiKey: credentials.apiKey as string });

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

					try {
						const result = await client.verifyAndWait({ claim, language });
						responseData = {
							status: 'completed',
							passed: isPassingVerdict(result.verdict),
							verdict: result.verdict ?? null,
							confidence: result.confidence ?? null,
							lenz_score: result.lenz_score ?? null,
							executive_summary: result.executive_summary ?? '',
							citations: (result.sources ?? [])
								.filter((s) => s.url)
								.map((s) => ({ title: s.title ?? '', url: s.url ?? '' })),
							verification_id: result.verification_id ?? null,
						};
					} catch (err) {
						if (err instanceof LenzNeedsInputError) {
							responseData = {
								status: 'needs_input',
								reason: err.kind,
								task_id: err.taskId,
								message: 'This claim is ambiguous or contains multiple sub-claims. Rephrase it to be more specific and re-run.',
							};
						} else if (err instanceof LenzTimeoutError) {
							responseData = {
								status: 'timeout',
								task_id: err.taskId,
								message: 'The verification did not complete in time (task_id: ' + err.taskId + '). It may still be running server-side.',
							};
						} else if (err instanceof LenzPipelineError) {
							responseData = {
								status: 'failed',
								task_id: err.taskId,
								message: err.message,
							};
						} else if (err instanceof LenzError) {
							throw new NodeApiError(
								this.getNode(),
								{ message: err.message, description: err.toString() },
								{
									itemIndex,
									httpCode: err.statusCode ? String(err.statusCode) : undefined,
								},
							);
						} else {
							throw new NodeApiError(this.getNode(), { message: (err as Error).message }, { itemIndex });
						}
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

					const result = await client.assess({ text, language });
					if (!result.claims.length) {
						responseData = {
							status: result.error_code === 'ambiguous' ? 'ambiguous' : 'no_claim',
							message: result.error ?? 'No verifiable factual claim was detected.',
							candidate_claims: result.candidate_claims ?? [],
						};
					} else {
						responseData = {
							status: 'ok',
							claims: result.claims.map((c) => ({
								claim: c.claim ?? '',
								verdict: c.verdict ?? null,
								confidence: c.confidence ?? null,
								passed: isPassingVerdict(c.verdict),
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

					responseData = (await client.extract({ text, language })) as unknown as IDataObject;
				} else if (operation === 'ask') {
					const verificationId = this.getNodeParameter('verificationId', itemIndex) as string;
					const question = this.getNodeParameter('question', itemIndex) as string;

					const reply = await client.ask.send(verificationId, { message: question, language });
					responseData = {
						answer: reply.content ?? '',
					};
				} else if (operation === 'usage') {
					responseData = (await client.usage()) as unknown as IDataObject;
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

				if (error instanceof NodeOperationError) {
					// eslint-disable-next-line @n8n/community-nodes/require-node-api-error
					throw error;
				}

				if (error instanceof LenzError) {
					throw new NodeApiError(
						this.getNode(),
						{ message: error.message, description: error.toString() },
						{
							itemIndex,
							httpCode: error.statusCode ? String(error.statusCode) : undefined,
						},
					);
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
