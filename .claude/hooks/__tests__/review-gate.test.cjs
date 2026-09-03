// The gate is a git hook, so it cannot be imported — it is exercised the way
// git runs it: spawned, fed ref lines on stdin, judged by its exit code.
//
// It is tested at all because two previous attempts at this gate shipped
// broken while looking fine, and one silently permitted everything. `npm test`
// is what CI and the publish workflow gate on, so the behaviour deciding
// whether pushes are actually stopped belongs there.
//
// CommonJS, not TypeScript, for the same reason the gate itself is: the n8n
// community-node lint forbids `child_process`, `fs` and `process` in this
// package — rules about what may ship to n8n Cloud — and spawning a process is
// the whole point here. Those rules apply to `.ts`, not `.cjs`, and this file
// never ships (`files` in package.json is `dist` only).
const { execFileSync, spawnSync } = require('node:child_process');
const { mkdtempSync, writeFileSync, readFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

const GATE = join(__dirname, '..', 'review-gate.cjs');
const ZERO = '0'.repeat(40);

const sha = (rev) => execFileSync('git', ['rev-parse', rev], { encoding: 'utf8' }).trim();

/** One line in the shape git writes to a pre-push hook's stdin. */
const refLine = (localRef, localSha) => `${localRef} ${localSha} ${localRef} ${ZERO}\n`;

const scratchMarks = () => join(mkdtempSync(join(tmpdir(), 'review-gate-')), 'marks');

function runGate(stdin, { marks = scratchMarks(), env = {} } = {}) {
	const result = spawnSync(process.execPath, [GATE], {
		input: stdin,
		encoding: 'utf8',
		env: { ...process.env, CLAUDECODE: '1', REVIEW_GATE_MARKS: marks, ...env },
	});
	return { ...result, marks };
}

describe('review gate - what it refuses', () => {
	it('refuses a branch whose tip has not been reviewed', () => {
		const { status, stderr } = runGate(refLine('refs/heads/feature', sha('HEAD')));
		expect(status).toBe(1);
		expect(stderr).toContain('not been reviewed');
		expect(stderr).toContain(sha('HEAD').slice(0, 7));
	});

	it('refuses a ref line it cannot parse rather than skipping it', () => {
		// Failing open on an unrecognised line is the defect that made an earlier
		// version permit everything, so it is pinned.
		const { status, stderr } = runGate('this-is-not-a-ref-line\n');
		expect(status).toBe(1);
		expect(stderr).toContain('unrecognised ref line');
	});

	it('refuses a tag whose commit never reached origin/main', () => {
		// Pushing a tag uploads the tagged commit too, and publishing fires on
		// any version tag — an unmerged commit must not ride out under a tag.
		const { status, stderr } = runGate(refLine('refs/tags/9.9.9', sha('HEAD')));
		expect(status).toBe(1);
		expect(stderr).toContain('not on origin/main');
	});
});

describe('review gate - what it lets through', () => {
	it('allows a branch tip recorded as reviewed', () => {
		const head = sha('HEAD');
		const marks = scratchMarks();
		writeFileSync(marks, `${head}\n`);
		expect(runGate(refLine('refs/heads/feature', head), { marks }).status).toBe(0);
	});

	it('allows a tag pointing at a commit already on origin/main', () => {
		expect(runGate(refLine('refs/tags/0.0.1', sha('origin/main'))).status).toBe(0);
	});

	it('allows deleting a remote ref, which pushes no commits', () => {
		expect(runGate(refLine('refs/heads/gone', ZERO)).status).toBe(0);
	});

	it('does not gate a human: no agent environment, no enforcement', () => {
		const { status } = runGate(refLine('refs/heads/feature', sha('HEAD')), {
			env: { CLAUDECODE: undefined, AI_AGENT: undefined },
		});
		expect(status).toBe(0);
	});
});

describe('review gate - recording a review', () => {
	it('records HEAD and then lets that exact commit through', () => {
		const marks = scratchMarks();
		const env = { ...process.env, CLAUDECODE: '1', REVIEW_GATE_MARKS: marks };

		const marked = spawnSync(process.execPath, [GATE, '--mark'], { encoding: 'utf8', env });
		expect(marked.status).toBe(0);
		expect(marked.stdout).toContain('recorded review of');

		expect(runGate(refLine('refs/heads/feature', sha('HEAD')), { marks }).status).toBe(0);
	});

	it('keeps a re-marked commit instead of letting it age out', () => {
		// `Set.add` does not move an existing member to the end, so a bare add
		// would let a re-reviewed commit fall off the front of the rotation
		// while dead ones survive.
		const marks = scratchMarks();
		const head = sha('HEAD');
		writeFileSync(marks, `${head}\n${'a'.repeat(40)}\n`);
		spawnSync(process.execPath, [GATE, '--mark'], {
			encoding: 'utf8',
			env: { ...process.env, CLAUDECODE: '1', REVIEW_GATE_MARKS: marks },
		});
		const lines = readFileSync(marks, 'utf8').split('\n').filter(Boolean);
		expect(lines[lines.length - 1]).toBe(head);
	});
});
