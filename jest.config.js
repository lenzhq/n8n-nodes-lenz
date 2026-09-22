const path = require('node:path');

// coverageThreshold glob keys are resolved with path.resolve() against
// process.cwd(), and jest-config passes them through without interpolating
// <rootDir>. Run from anywhere but the package root — a VS Code jest runner,
// `npm test --prefix`, a wrapper in a parent directory — and the globs match
// nothing, the group falls through to jest's default handling, and the run
// hard-fails with "Coverage data for ./nodes/**/*.ts was not found" after
// every test has passed. Anchoring them to __dirname makes the gate
// independent of where it was invoked from.
const fromRoot = (glob) => path.join(__dirname, glob);

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
	// Coverage is NOT forced on here, and `npm test` does not pass --coverage
	// either. `npm run test:ci` does, and that is what CI runs. The gate is
	// therefore opt-in by command, so any focused run — `npm test -- credentials`,
	// `-t '<name>'`, --watch, --onlyChanged — collects nothing and is judged
	// only by whether its tests pass.
	//
	// Both looser arrangements were tried and both were wrong. Forcing it on in
	// this config broke `npx jest <pattern>`; moving --coverage into the `test`
	// script fixed that but left `npm test -- <pattern>` broken, which is the
	// npm-scoped form and the one anyone reading the script list reaches for.
	// Either way the symptom is the same and it is nasty: every test reported
	// passing, then exit 1 on "Coverage for statements (5.81%) does not meet
	// global threshold (92%)" — a subset of the suite cannot reach a
	// whole-project floor, so the tool blames coverage for a run that was fine.
	//
	// Explicit, and load-bearing. Without it Jest reports only on files some
	// test already imported, so a module with NO test is invisible — it cannot
	// drag the average down because it is not in the average. That is exactly
	// the file a threshold exists to catch, and it was not hypothetical here:
	// the first measurement put LenzApi.credentials.ts at 0%, because nothing
	// imported it. It has tests now.
	// The __tests__ exclusion is not redundant with testMatch. Jest skips
	// instrumenting files that match testMatch (`**/*.test.ts`), but a shared
	// test-support module — say helpers.ts holding the IExecuteFunctions mock,
	// extracted out of a growing suite — matches neither testMatch nor any
	// ignore pattern, so it would be instrumented and then judged by the
	// production per-file tripwire below. Failing CI because test scaffolding
	// is under-covered is noise.
	collectCoverageFrom: ['nodes/**/*.ts', 'credentials/**/*.ts', '!**/__tests__/**'],
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
	// Read these as counts, not percentages — the denominators differ by an
	// order of magnitude and the percentages hide it:
	//
	//   functions   29 total, 1 uncovered costs 3.45 points
	//   branches   645 total, 1 uncovered costs 0.16 points
	//   statements/lines ~420 total
	//
	// So `functions: 90` is the coarsest floor here, not the loosest: it
	// permits 2 uncovered functions and the third turns CI red. It sits at 90
	// rather than 95 for exactly that reason — at 95 a single new untested
	// helper failed the build, which is a tripwire that fires on ordinary work
	// and therefore gets deleted.
	//
	// Branches is the metric that matters most for THIS node even though its
	// floor absorbs the most individual misses: a line counts as covered the
	// moment it executes once, so an `if` whose else-branch no test takes reads
	// green everywhere else — and the error paths here are branches, the ones
	// deciding whether a workflow retries, dies, or silently loses a paid-for
	// verification. It is the number to ratchet first.
	//
	// Treat these as a ratchet: raise them when the measured number pulls away,
	// never lower them to make a red build green.
	coverageThreshold: {
		global: {
			statements: 92,
			branches: 87,
			functions: 90,
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
		[fromRoot('nodes/**/*.ts')]: {
			statements: 80,
			branches: 70,
			functions: 80,
			lines: 80,
		},
		[fromRoot('credentials/**/*.ts')]: {
			statements: 80,
			branches: 70,
			functions: 80,
			lines: 80,
		},
	},
};
