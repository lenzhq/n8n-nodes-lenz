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
	// Coverage is NOT forced on here. `npm test` passes --coverage, so the
	// gate is still the command contributors and CI already run — but a
	// focused run (`npx jest credentials`, `-t '<name>'`, --watch,
	// --onlyChanged) collects nothing and is therefore judged by nothing.
	//
	// Forcing it on made every one of those exit 1 while reporting all tests
	// passed, because a subset of the suite cannot reach a whole-project floor:
	// `npx jest credentials` printed "5 passed" and then failed on "Coverage
	// for statements (5.81%) does not meet global threshold (92%)". That is the
	// entire TDD loop red by construction, with failure text pointing at
	// coverage rather than at anything the developer did.
	//
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
	// Branches is deliberately the tightest of the four, at 2.14 points of
	// slack against 3.11 for statements and 3.45 for lines. A line counts as
	// covered the moment it executes once, so an `if` whose else-branch no test
	// ever takes still reads green on every other metric — and the error paths
	// in this node are branches: the ones deciding whether a workflow retries,
	// dies, or silently loses a paid-for verification.
	//
	// Treat these as a ratchet: raise them when the measured number pulls away,
	// never lower them to make a red build green.
	coverageThreshold: {
		global: {
			statements: 92,
			branches: 87,
			functions: 95,
			lines: 92,
		},
		// PER-FILE, and the reason the gate is worth having. A glob key is
		// applied to each matching file on its own, unlike `global`, which is
		// one average over the project.
		//
		// The global floor alone cannot catch an untested module, which is the
		// case #20 was filed about. Proven rather than assumed: with the
		// credential's tests removed, LenzApi.credentials.ts reads 0% and the
		// project still measures 93.25/89.14/96.55/93.54 — above every global
		// floor — so jest exited 0 and the gate said nothing. An 8-line file
		// cannot move an average dominated by a 1800-line node.
		//
		// These floors are loose on purpose. They are not a per-file quality
		// bar; they are a tripwire for a file nobody tested at all, and a
		// tripwire that fires on ordinary work gets deleted.
		'./nodes/**/*.ts': {
			statements: 80,
			branches: 70,
			functions: 80,
			lines: 80,
		},
		'./credentials/**/*.ts': {
			statements: 80,
			branches: 70,
			functions: 80,
			lines: 80,
		},
	},
};
