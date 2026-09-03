#!/usr/bin/env node
/**
 * Refuses to push a commit an agent has not had reviewed.
 *
 * Runs as git's own `pre-push` hook rather than as a Claude Code PreToolUse
 * hook. That is the whole design: git invokes this for every push — any tool,
 * any shell, from a script, from `npm run release`, from a compound
 * `commit && push` — and hands it the refs actually being sent on stdin, as
 * `<local ref> <local sha> <remote ref> <remote sha>` lines. A gate that
 * instead pattern-matches one tool's command strings misses the PowerShell
 * tool, misses pushes made inside subprocesses, and reads HEAD *before* a
 * chained commit has created the commit being pushed.
 *
 * Scoped to agents. Enforced only when CLAUDECODE / AI_AGENT is set, which
 * Claude Code puts in its subprocess environment. A human pushing from their
 * own terminal is not gated — this exists to stop an agent shipping work it
 * has not checked, not to stand between you and your own repository.
 *
 * Fails CLOSED. Every internal failure exits non-zero with a message on
 * stderr, so a broken gate stops the push instead of waving it through. The
 * previous version of this idea failed open in four separate places and its
 * first draft did nothing at all while reporting success.
 *
 * Usage:
 *   review-gate.cjs           gate mode: reads the ref list on stdin
 *   review-gate.cjs --mark    record the current HEAD as reviewed
 */
const { execFileSync } = require('node:child_process');
const { readFileSync, writeFileSync, mkdirSync } = require('node:fs');
const path = require('node:path');

const ALL_ZERO = /^0+$/;
const KEEP_MARKS = 50;

function fail(message) {
	process.stderr.write(`review-gate: ${message}\n`);
	process.exit(1);
}

function repoRoot() {
	try {
		return execFileSync('git', ['rev-parse', '--show-toplevel'], {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		}).trim();
	} catch {
		return fail('could not locate the repository root — refusing the push.');
	}
}

function markerPath(root) {
	return path.join(root, '.claude', '.review-ok');
}

function readMarks(root) {
	try {
		return new Set(
			readFileSync(markerPath(root), 'utf8')
				.split('\n')
				.map((line) => line.trim())
				.filter(Boolean),
		);
	} catch {
		return new Set();
	}
}

function mark() {
	const root = repoRoot();
	let head;
	try {
		head = execFileSync('git', ['rev-parse', 'HEAD'], {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		}).trim();
	} catch {
		return fail('no HEAD to record.');
	}
	const marks = readMarks(root);
	marks.add(head);
	// Keep a bounded history rather than a single SHA: reviewing A, then B,
	// then pushing a branch that contains both should not need a re-review.
	const kept = [...marks].slice(-KEEP_MARKS);
	mkdirSync(path.dirname(markerPath(root)), { recursive: true });
	writeFileSync(markerPath(root), `${kept.join('\n')}\n`);
	process.stdout.write(`review-gate: recorded review of ${head.slice(0, 7)}.\n`);
}

function gate() {
	// Not an agent — leave the human alone.
	if (!process.env.CLAUDECODE && !process.env.AI_AGENT) return;

	let input;
	try {
		input = readFileSync(0, 'utf8');
	} catch {
		return fail('could not read the ref list on stdin — refusing the push.');
	}

	const root = repoRoot();
	const marks = readMarks(root);
	const blocked = [];

	for (const line of input.split('\n')) {
		const [localRef, localSha] = line.trim().split(/\s+/);
		if (!localRef || !localSha) continue;
		// Deleting a remote ref pushes nothing.
		if (ALL_ZERO.test(localSha)) continue;
		// Release tags are exempt: a tag here is what publishes to npm, and it
		// only ever points at a commit that already reached main through a
		// reviewed PR. Matched on the real ref, not on the text of a flag.
		if (localRef.startsWith('refs/tags/')) continue;
		if (!marks.has(localSha)) blocked.push(`${localRef} -> ${localSha.slice(0, 7)}`);
	}

	if (blocked.length === 0) return;

	process.stderr.write(
		[
			'',
			'review-gate: refusing to push commits that have not been reviewed.',
			'',
			...blocked.map((b) => `    ${b}`),
			'',
			'Run /code-review, deal with what it finds, then record it:',
			'    node .claude/hooks/review-gate.cjs --mark',
			'',
			'Recording is per-commit, so committing again after a review means',
			'reviewing again — the fixes are the part most likely to be wrong.',
			'Tag pushes are exempt. Humans pushing by hand are not gated.',
			'',
		].join('\n'),
	);
	process.exit(1);
}

if (process.argv.includes('--mark')) {
	mark();
} else {
	gate();
}
