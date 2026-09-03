// The gate is a git hook, so it cannot be imported — it is exercised the way
// git runs it: spawned, fed ref lines on stdin, judged by its exit code.
//
// It is tested at all because earlier attempts at this gate shipped broken
// while looking fine, and one silently permitted everything.
//
// CommonJS, not TypeScript, for the same reason the gate itself is: the n8n
// community-node lint forbids `child_process`, `fs` and `process` in this
// package — rules about what may ship to n8n Cloud — and spawning a process is
// the whole point here. Those rules apply to `.ts`, not `.cjs`, and nothing
// here ships (`files` in package.json is `dist` only).
//
// Nothing below may depend on `origin/main` existing. CI checks out with
// actions/checkout@v4's default refspec, which creates no remote-tracking
// branch on a pull_request or tag event — a test that assumed otherwise would
// go red on every PR and, worse, fail the publish workflow's test step and
// block releases outright.
const { execFileSync, spawnSync } = require('node:child_process');
const { mkdtempSync, writeFileSync, readFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

const GATE = join(__dirname, '..', 'review-gate.cjs');
const ZERO = '0'.repeat(40);

const git = (args, opts = {}) =>
	execFileSync('git', args, { encoding: 'utf8', ...opts }).trim();

const sha = (rev) => git(['rev-parse', rev]);

/** A commit that is reachable from nothing: no parents, empty tree. Used for
 *  the "tag is not on main" case, which must not be expressed as "HEAD",
 *  because HEAD *is* on main the moment this branch merges — and then the test
 *  would fail on main for a reason that has nothing to do with the gate. */
function orphanCommit() {
	const emptyTree = git(['hash-object', '-t', 'tree', '--stdin'], { input: '' });
	return git(['commit-tree', emptyTree, '-m', 'review-gate test fixture'], { input: '' });
}

const mainResolvable = () =>
	spawnSync('git', ['rev-parse', '--verify', '--quiet', 'origin/main']).status === 0;

/** One line in the shape git writes to a pre-push hook's stdin. */
const refLine = (localRef, localSha) => `${localRef} ${localSha} ${localRef} ${ZERO}\n`;

const tempDirs = [];
function scratchMarks() {
	const dir = mkdtempSync(join(tmpdir(), 'review-gate-'));
	tempDirs.push(dir);
	return join(dir, 'marks');
}
afterAll(() => {
	for (const dir of tempDirs) rmSync(dir, { recursive: true, force: true });
});

/**
 * The parent environment is passed through so git keeps working on Windows,
 * but every variable that steers the gate is stripped first. A suite whose job
 * is pinning refusal behaviour must not be switchable by the shell it happens
 * to run in — an exported REVIEW_GATE_BYPASS would otherwise turn all three
 * refusal tests into silent passes-through.
 */
function gateEnv(overrides = {}) {
	const env = { ...process.env };
	for (const key of ['REVIEW_GATE_BYPASS', 'REVIEW_GATE_MARKS', 'CLAUDECODE', 'AI_AGENT']) {
		delete env[key];
	}
	return { ...env, CLAUDECODE: '1', ...overrides };
}

function runGate(stdin, { marks = scratchMarks(), env = {}, argv = [] } = {}) {
	return spawnSync(process.execPath, [GATE, ...argv], {
		input: stdin,
		encoding: 'utf8',
		env: gateEnv({ REVIEW_GATE_MARKS: marks, ...env }),
	});
}

describe('review gate - what it refuses', () => {
	it('refuses a branch whose tip has not been reviewed', () => {
		const { status, stderr } = runGate(refLine('refs/heads/feature', sha('HEAD')));
		expect(status).toBe(1);
		expect(stderr).toContain('not been reviewed');
		expect(stderr).toContain(sha('HEAD').slice(0, 7));
	});

	it('refuses a ref line it cannot parse rather than skipping it', () => {
		const { status, stderr } = runGate('this-is-not-a-ref-line\n');
		expect(status).toBe(1);
		expect(stderr).toContain('unrecognised ref line');
	});

	it('refuses an empty ref list instead of treating it as nothing to do', () => {
		// stdin redirected from /dev/null, closed, or truncated all look like
		// this, and none of them means "no commits are going".
		const { status, stderr } = runGate('');
		expect(status).toBe(1);
		expect(stderr).toContain('no refs to check');
	});

	it('refuses a tag whose commit is not on main', () => {
		const { status, stderr } = runGate(refLine('refs/tags/9.9.9', orphanCommit()));
		expect(status).toBe(1);
		// Either it checked and the commit was not there, or it could not
		// resolve main at all (CI's shallow checkout). Both are refusals.
		expect(stderr).toMatch(/not on |cannot resolve /);
	});

	it('does not tell the caller to record a review when a tag is the problem', () => {
		// Marking cannot unblock a tag — the tag path never reads the marks — so
		// suggesting it would send the caller round an identical loop forever.
		if (!mainResolvable()) return; // needs main to reach the tag-specific text
		const { stderr } = runGate(refLine('refs/tags/9.9.9', orphanCommit()));
		expect(stderr).toContain('Merge to main first');
	});
});

describe('review gate - what it lets through', () => {
	it('allows a branch tip recorded as reviewed', () => {
		const head = sha('HEAD');
		const marks = scratchMarks();
		writeFileSync(marks, `${head}\n`);
		expect(runGate(refLine('refs/heads/feature', head), { marks }).status).toBe(0);
	});

	it('allows a tag pointing at a commit already on main', () => {
		if (!mainResolvable()) return; // shallow CI checkout has no origin/main
		expect(runGate(refLine('refs/tags/0.0.1', sha('origin/main'))).status).toBe(0);
	});

	it('allows deleting a remote ref, which pushes no commits', () => {
		expect(runGate(refLine('refs/heads/gone', ZERO)).status).toBe(0);
	});

	it('does not gate a human: no agent environment, no enforcement', () => {
		const { status } = runGate(refLine('refs/heads/feature', sha('HEAD')), {
			env: { CLAUDECODE: undefined },
		});
		expect(status).toBe(0);
	});
});

describe('review gate - the bypass switch', () => {
	it('bypasses on exactly 1', () => {
		const { status } = runGate(refLine('refs/heads/feature', sha('HEAD')), {
			env: { REVIEW_GATE_BYPASS: '1' },
		});
		expect(status).toBe(0);
	});

	it('does NOT bypass on 0, which reads as off', () => {
		// Plain truthiness would disable the gate for anyone setting it to 0 to
		// turn the bypass off — the exact opposite of the intent.
		const { status } = runGate(refLine('refs/heads/feature', sha('HEAD')), {
			env: { REVIEW_GATE_BYPASS: '0' },
		});
		expect(status).toBe(1);
	});
});

describe('review gate - argument handling', () => {
	it('gates normally when git passes a remote called --mark', () => {
		// git invokes pre-push with <remote-name> <remote-url>, so argv is
		// repo-configurable. Scanning it for '--mark' would let a remote name
		// flip the hook into recording HEAD and exiting 0.
		const { status } = runGate(refLine('refs/heads/feature', sha('HEAD')), {
			argv: ['origin', 'https://example.invalid/--mark.git'],
		});
		expect(status).toBe(1);
	});
});

describe('review gate - recording a review', () => {
	it('records HEAD and then lets that exact commit through', () => {
		const marks = scratchMarks();
		const marked = spawnSync(process.execPath, [GATE, '--mark'], {
			encoding: 'utf8',
			env: gateEnv({ REVIEW_GATE_MARKS: marks }),
		});
		expect(marked.status).toBe(0);
		expect(marked.stdout).toContain('recorded review of');

		expect(runGate(refLine('refs/heads/feature', sha('HEAD')), { marks }).status).toBe(0);
	});

	it('keeps a re-marked commit instead of letting it age out', () => {
		// `Set.add` does not move an existing member to the end, so a bare add
		// would let a re-reviewed commit fall off the front of the rotation.
		const marks = scratchMarks();
		const head = sha('HEAD');
		writeFileSync(marks, `${head}\n${'a'.repeat(40)}\n`);
		spawnSync(process.execPath, [GATE, '--mark'], {
			encoding: 'utf8',
			env: gateEnv({ REVIEW_GATE_MARKS: marks }),
		});
		const lines = readFileSync(marks, 'utf8').split('\n').filter(Boolean);
		expect(lines[lines.length - 1]).toBe(head);
	});
});
