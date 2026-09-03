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
	collectCoverageFrom: ['nodes/**/*.ts', 'credentials/**/*.ts'],
};
