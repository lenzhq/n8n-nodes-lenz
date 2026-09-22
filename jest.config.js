/** @type {import('jest').Config} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.test.ts'],
	// Confine the crawl to source. modulePathIgnorePatterns alone doesn't stop
	// jest-haste-map walking dist/, which then reports dist/package.json and
	// package.json as a "Haste module naming collision" on every run.
	//
	// The pre-push review gate under .claude/hooks is deliberately NOT here.
	// It is local workflow tooling, and publish.yml gates releases on this
	// `npm test` — routing it through here would let a broken developer hook
	// block publication of the node. It has its own config and its own script.
	roots: ['<rootDir>/nodes', '<rootDir>/credentials'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	modulePathIgnorePatterns: ['<rootDir>/dist'],
	// Coverage is always on, so `npm test` IS the gate and a contributor
	// reproduces CI with the command they already run. It costs about 0.7s.
	collectCoverage: true,
	// Explicit, and load-bearing. Without it Jest reports only on files some
	// test already imported, so a module with NO test is invisible — it cannot
	// drag the average down because it is not in the average. That is exactly
	// the file a threshold exists to catch, and it was not hypothetical here:
	// the first measurement put LenzApi.credentials.ts at 0%, because nothing
	// imported it. It has tests now.
	collectCoverageFrom: ['nodes/**/*.ts', 'credentials/**/*.ts'],
	// `lcovonly`, not `lcov`. The `lcov` reporter also writes an HTML report,
	// and that report ships PNG assets — which the n8n build's static-file sweep
	// copied into dist/coverage/lcov-report/, putting them in the published
	// tarball. Caught by checking `npm pack` after adding coverage: the package
	// went from 9 files to 11. lcovonly emits coverage/lcov.info and nothing
	// else, which is all any external coverage tool wants anyway.
	//
	// Not fixable from the lint side either: `n8n.strict` in package.json makes
	// n8n-node lint reject any eslint.config.mjs that differs from the default,
	// so `coverage/` cannot be added to the ignores. Choosing a reporter that
	// generates nothing to ignore is the whole fix, not half of one.
	coverageReporters: ['text', 'lcovonly'],
	// Floors, not targets. Taken from the first honest measurement — 95.11
	// statements, 89.14 branches, 100 functions, 95.45 lines — and set a few
	// points under it. A floor above what the suite achieves blocks every PR on
	// day one; a floor far below can never fire, which is the same as having
	// none.
	//
	// Branches is the number that matters and the one set closest to the bone.
	// A line counts as covered the moment it executes once, so an `if` whose
	// else-branch no test ever takes still reads green on every other metric.
	// The error paths in this node — the ones deciding whether a workflow
	// retries, dies, or silently loses a paid-for verification — are branches.
	//
	// Treat these as a ratchet: raise them when the measured number pulls away,
	// never lower them to make a red build green.
	coverageThreshold: {
		global: {
			statements: 92,
			branches: 86,
			functions: 95,
			lines: 92,
		},
	},
};
