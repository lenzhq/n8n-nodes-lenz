/** @type {import('jest').Config} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.test.ts'],
	// Confine the crawl to source. modulePathIgnorePatterns alone doesn't stop
	// jest-haste-map walking dist/, which then reports dist/package.json and
	// package.json as a "Haste module naming collision" on every run.
	roots: ['<rootDir>/nodes', '<rootDir>/credentials'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	modulePathIgnorePatterns: ['<rootDir>/dist'],
	collectCoverageFrom: ['nodes/**/*.ts', 'credentials/**/*.ts'],
};
