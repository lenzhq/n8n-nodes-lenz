/** @type {import('jest').Config} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	// .cjs as well as .ts: the review-gate tests must spawn a process, which the
	// n8n community-node lint forbids in .ts files in this package.
	testMatch: ['**/*.test.ts', '**/*.test.cjs'],
	// Confine the crawl to source. modulePathIgnorePatterns alone doesn't stop
	// jest-haste-map walking dist/, which then reports dist/package.json and
	// package.json as a "Haste module naming collision" on every run.
	// .claude/hooks holds the pre-push review gate. Not shipped code, but it
	// decides whether unreviewed commits can leave the machine, and two earlier
	// versions of it shipped broken while looking fine — so its behaviour is
	// pinned by the same `npm test` that CI and publish already gate on.
	roots: ['<rootDir>/nodes', '<rootDir>/credentials', '<rootDir>/.claude/hooks'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	modulePathIgnorePatterns: ['<rootDir>/dist'],
	collectCoverageFrom: ['nodes/**/*.ts', 'credentials/**/*.ts'],
};
