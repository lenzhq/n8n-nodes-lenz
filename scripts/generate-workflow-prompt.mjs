#!/usr/bin/env node
/**
 * Generates the "node facts" half of the Lenz workflow-building prompt from the
 * node itself, so the prompt cannot drift away from the code.
 *
 * The prompt tells an agent how to emit an n8n workflow JSON that a user pastes
 * onto their canvas. That JSON must name the node type, typeVersion, resource
 * and operation values, and parameter names *exactly* — a wrong string pastes
 * as a broken node, and the user has no way to tell which string was wrong.
 * Hand-maintaining that list is how docs rot; this reads it from the built node
 * description instead.
 *
 * Judgment (when to use Verify vs Assess, where the check belongs, how to wire
 * the branches) stays hand-written in the template — it is the part that does
 * not change when a parameter is renamed.
 *
 *   node scripts/generate-workflow-prompt.mjs           # write the prompt
 *   node scripts/generate-workflow-prompt.mjs --check   # fail if stale (CI)
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const TEMPLATE = resolve(root, 'scripts/workflow-prompt.template.md');
const OUTPUT = resolve(root, 'docs/n8n-workflow-prompt.md');
const BEGIN = '<!-- BEGIN GENERATED: node-facts -->';
const END = '<!-- END GENERATED -->';

const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
let Lenz;
try {
	({ Lenz } = require(resolve(root, 'dist/nodes/Lenz/Lenz.node.js')));
} catch {
	console.error('Could not load dist/nodes/Lenz/Lenz.node.js — run `npm run build` first.');
	process.exit(1);
}

const description = new Lenz().description;
const properties = description.properties;

// The node ships two layouts: a flat operation list on node version 1, and the
// Resource + Operation layout from 1.1 on. New workflows always get the highest
// version, so the prompt only ever describes 1.1.
const versions = Array.isArray(description.version) ? description.version : [description.version];
const typeVersion = Math.max(...versions);
const nodeType = `${pkg.name}.${description.name}`;
const credentialName = (description.credentials ?? [])[0]?.name ?? '';

const show = (p) => p.displayOptions?.show ?? {};
const isResourceScoped = (p) => Array.isArray(show(p).resource);

const resourceProp = properties.find((p) => p.name === 'resource');
const operationProps = properties.filter((p) => p.name === 'operation' && isResourceScoped(p));

/** Parameters a given operation actually shows, in the order the node lists them. */
function parametersFor(operationValue) {
	return properties
		.filter((p) => p.name !== 'resource' && p.name !== 'operation')
		.filter((p) => (show(p).operation ?? []).includes(operationValue))
		.map((p) => ({
			name: p.name,
			type: p.type,
			required: p.required === true,
			default: p.default,
		}));
}

const lines = [];
lines.push('| Field | Value |');
lines.push('|---|---|');
lines.push(`| Node type | \`${nodeType}\` |`);
lines.push(`| \`typeVersion\` | \`${typeVersion}\` |`);
lines.push(`| Credential type | \`${credentialName}\` — **omit the \`credentials\` block entirely** (see rules) |`);
lines.push(`| Inputs / outputs | ${description.inputs.length} main in, ${description.outputs.length} main out |`);
lines.push('');
lines.push(`Generated from \`${pkg.name}@${pkg.version}\`. Do not hand-edit.`);
lines.push('');

for (const opProp of operationProps) {
	const resourceValue = show(opProp).resource[0];
	const resourceLabel =
		resourceProp.options.find((o) => o.value === resourceValue)?.name ?? resourceValue;

	lines.push(`### \`resource: "${resourceValue}"\` — ${resourceLabel}`);
	lines.push('');
	lines.push('| `operation` | What it does | Parameters |');
	lines.push('|---|---|---|');

	for (const op of opProp.options) {
		const params = parametersFor(op.value);
		const rendered = params.length
			? params.map((p) => `\`${p.name}\`${p.required ? '**\\***' : ''}`).join(', ')
			: '—';
		const what = (op.description ?? op.action ?? op.name).replace(/\s+/g, ' ').trim();
		lines.push(`| \`${op.value}\` | ${what} | ${rendered} |`);
	}
	lines.push('');
}

lines.push('`*` = required. Parameters not listed for an operation are not shown by the node and');
lines.push('must not appear in the workflow JSON for it.');

const generated = lines.join('\n');
const template = readFileSync(TEMPLATE, 'utf8');
if (!template.includes(BEGIN) || !template.includes(END)) {
	console.error(`Template is missing the ${BEGIN} / ${END} markers.`);
	process.exit(1);
}

const next =
	template.slice(0, template.indexOf(BEGIN) + BEGIN.length) +
	'\n\n' +
	generated +
	'\n\n' +
	template.slice(template.indexOf(END));

if (process.argv.includes('--check')) {
	let current = '';
	try {
		current = readFileSync(OUTPUT, 'utf8');
	} catch {
		console.error(`${OUTPUT} does not exist. Run: npm run prompt:build`);
		process.exit(1);
	}
	if (current !== next) {
		console.error(
			'docs/n8n-workflow-prompt.md is out of date with the node.\nRun: npm run prompt:build',
		);
		process.exit(1);
	}
	console.log('Workflow prompt is up to date with the node.');
	process.exit(0);
}

writeFileSync(OUTPUT, next);
console.log(`Wrote ${OUTPUT} from ${pkg.name}@${pkg.version}`);
