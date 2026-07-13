// Inlines lenz-io (and its dependency tree) into the compiled node output so
// the published package has zero runtime dependencies, as required for n8n
// Cloud verification. tsc still runs first (via `n8n-node build`) for
// type-checking and .d.ts declaration output; this step then re-bundles
// Lenz.node.js from TypeScript SOURCE, overwriting tsc's compiled output.
//
// Bundling from source (real `import { Lenz } from 'lenz-io'` syntax)
// instead of from tsc's already-compiled dist file matters: tsc downlevels
// our import to `require("lenz-io")`, and esbuild resolves a require() call
// through lenz-io's CJS entry point, wrapping it in a CJS-interop shim that
// can't tree-shake individual named exports. Bundling the original ESM
// import lets esbuild resolve lenz-io's ESM build and tree-shake unused
// exports (e.g. the LenzWebhooks signature-verification code and its
// Buffer/node:buffer usage, which this node never imports) at the
// named-export level.
import { build } from 'esbuild';

await build({
	entryPoints: ['nodes/Lenz/Lenz.node.ts'],
	outfile: 'dist/nodes/Lenz/Lenz.node.js',
	allowOverwrite: true,
	bundle: true,
	platform: 'node',
	format: 'cjs',
	target: 'node18',
	treeShaking: true,
	external: ['n8n-workflow'],
});

console.log('Bundled lenz-io into dist/nodes/Lenz/Lenz.node.js');
