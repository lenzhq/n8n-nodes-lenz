/**
 * Tests for the pre-push review gate, kept apart from `npm test`.
 *
 * The gate is local workflow tooling, not shipped code. publish.yml gates
 * releases on `npm test`, so putting these there would mean a broken
 * developer-machine hook could block publishing the node — a much worse
 * failure than the one the gate prevents. CI runs this separately, so pull
 * requests still catch a broken gate.
 *
 * No ts-jest preset: these are plain CommonJS, because the community-node lint
 * forbids `child_process` in this package's TypeScript and spawning the hook
 * is the only way to test it.
 *
 * @type {import('jest').Config}
 */
module.exports = {
	testEnvironment: 'node',
	rootDir: __dirname,
	roots: ['<rootDir>/.claude/hooks'],
	testMatch: ['**/*.test.cjs'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	modulePathIgnorePatterns: ['<rootDir>/dist'],
};
