// Inlines lenz-io (and its dependency tree) into the compiled node output so
// the published package has zero runtime dependencies, as required for n8n
// Cloud verification. tsc still does the type-checking and declaration
// output; this just re-bundles the one file that imports an external SDK.
import { build } from 'esbuild';

await build({
	entryPoints: ['dist/nodes/Lenz/Lenz.node.js'],
	outfile: 'dist/nodes/Lenz/Lenz.node.js',
	allowOverwrite: true,
	bundle: true,
	platform: 'node',
	format: 'cjs',
	target: 'node18',
	external: ['n8n-workflow'],
});

console.log('Bundled lenz-io into dist/nodes/Lenz/Lenz.node.js');
