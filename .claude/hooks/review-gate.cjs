#!/usr/bin/env node
/**
 * Refuses to push commits an agent has not had reviewed.
 *
 * Runs as git's own `pre-push` hook, not as a Claude Code hook: git invokes it
 * for every push whatever issued it — either shell tool, a script, a chained
 * `commit && push` — and hands it the refs actually being sent on stdin, as
 * `<local ref> <local sha> <remote ref> <remote sha>` lines.
 *
 * Scoped to agents, via CLAUDECODE / AI_AGENT. A human pushing from their own
 * terminal is never gated; this exists to stop an agent shipping work it has
 * not checked, not to stand between you and your repository.
 *
 * WHAT THIS IS NOT: a security control. The agent it gates composes the push
 * command, so `--no-verify` walks past it, and `--mark` asserts a review
 * rather than proving one. It makes reviewing the path of least resistance and
 * catches forgetting — it does not stop a determined bypass, and the docs must
 * not claim otherwise.
 *
 * Plain `.cjs`, deliberately: a git hook has to run directly from a fresh
 * clone with no build step and no `npm install`, so it cannot be TypeScript
 * compiled into `dist/`, and it cannot import anything. That is the specific
 * reason it sits outside the tsconfig and eslint scope; its behaviour is
 * pinned by tests instead (see `__tests__/review-gate.test.cjs`, which is
 * itself `.cjs` because spawning a process is banned in this package's `.ts`).
 *
 * Fails CLOSED: every internal failure and every line it cannot parse refuses
 * the push. A previous attempt at this failed open in four places, and its
 * first draft did nothing whatsoever while reporting success.
 *
 * Usage:
 *   review-gate.cjs           gate mode; expects the ref list on stdin
 *   review-gate.cjs --mark    record HEAD as reviewed
 */
const { execFileSync } = require('node:child_process');
const { readFileSync, writeFileSync, writeSync } = require('node:fs');
const path = require('node:path');

const ALL_ZERO = /^0+$/;
const KEEP_MARKS = 50;

/** Refusing is a control-flow decision, not a crash — carry it as one. */
class Refuse extends Error {}
const refuse = (message) => {
	throw new Refuse(message);
};

function git(args, { allowFailure = false } = {}) {
	try {
		return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
	} catch (err) {
		if (allowFailure) return null;
		throw err;
	}
}

/**
 * Marks live in the shared git directory, not the working tree: it is common
 * to every worktree, so a review recorded in one checkout counts in all of
 * them, and it survives `git worktree remove` — which is routine here and
 * would otherwise silently discard every review recorded in that worktree.
 */
function markerPath() {
	// Overridable so the tests can run against a scratch file instead of the
	// real marks. Not a weakening: the gated agent can already write the marks.
	if (process.env.REVIEW_GATE_MARKS) return path.resolve(process.env.REVIEW_GATE_MARKS);
	const common = git(['rev-parse', '--git-common-dir'], { allowFailure: true });
	if (!common) refuse('could not locate the git directory.');
	return path.resolve(common, 'review-gate-marks');
}

/** `missingIsEmpty`: absent marker = nothing reviewed yet. Any OTHER read
 *  failure is a real error and must not be mistaken for "no marks", or a
 *  rewrite would silently discard the whole history. */
function readMarks(file, { missingIsEmpty = true } = {}) {
	try {
		return new Set(
			readFileSync(file, 'utf8')
				.split('\n')
				.map((l) => l.trim())
				.filter(Boolean),
		);
	} catch (err) {
		if (err.code === 'ENOENT' && missingIsEmpty) return new Set();
		refuse(`could not read the review marks at ${file}: ${err.code || err.message}`);
	}
}

function mark() {
	const head = git(['rev-parse', 'HEAD'], { allowFailure: true });
	if (!head) refuse('no HEAD to record.');
	const file = markerPath();
	// Read strictly here: rewriting from a Set we failed to load would destroy
	// every previously recorded review.
	const marks = readMarks(file, { missingIsEmpty: true });
	// delete-then-add moves an existing SHA to the end. A bare `add` leaves it
	// in place, so re-marking an old commit would not save it from eviction.
	marks.delete(head);
	marks.add(head);
	writeFileSync(file, `${[...marks].slice(-KEEP_MARKS).join('\n')}\n`);
	process.stdout.write(`review-gate: recorded review of ${head.slice(0, 7)}.\n`);
}

/**
 * A tag is exempt only if what it points at already reached origin/main.
 * Pushing a tag uploads the tagged commit's objects too, and this repo's
 * publish workflow fires on any `*.*.*` tag — so exempting tags on the ref
 * name alone is a straight path from an unreviewed commit to npm. The old
 * version asserted this invariant in a comment; this checks it.
 */
function tagIsOnMain(sha) {
	if (!git(['rev-parse', '--verify', '--quiet', 'origin/main'], { allowFailure: true })) {
		refuse('cannot resolve origin/main, so a tag cannot be verified — fetch first.');
	}
	try {
		execFileSync('git', ['merge-base', '--is-ancestor', sha, 'origin/main'], { stdio: 'ignore' });
		return true;
	} catch {
		return false;
	}
}

function gate() {
	if (!process.env.CLAUDECODE && !process.env.AI_AGENT) return; // human push
	// Documented escape for `npm run release`, which commits and pushes in one
	// step so its commit can never have been marked in advance. Named loudly
	// on purpose: it should be visible in a transcript when it is used.
	if (process.env.REVIEW_GATE_BYPASS) {
		writeSync(2, 'review-gate: bypassed via REVIEW_GATE_BYPASS.\n');
		return;
	}

	if (process.stdin.isTTY) {
		refuse('gate mode reads the ref list on stdin; git supplies it. Use --mark to record a review.');
	}

	let input;
	try {
		input = readFileSync(0, 'utf8');
	} catch (err) {
		refuse(`could not read the ref list on stdin: ${err.code || err.message}`);
	}

	const marks = readMarks(markerPath());
	const blocked = [];

	for (const raw of input.split('\n')) {
		const line = raw.trim();
		if (!line) continue;
		const fields = line.split(/\s+/);
		// Anything git sends that does not look like a ref line is refused, not
		// skipped: silently waving through a line we failed to understand is
		// the fail-open this gate exists to avoid.
		if (fields.length < 2) refuse(`unrecognised ref line from git: ${JSON.stringify(line)}`);
		const [localRef, localSha] = fields;
		if (ALL_ZERO.test(localSha)) continue; // deleting a remote ref pushes nothing
		if (localRef.startsWith('refs/tags/')) {
			if (tagIsOnMain(localSha)) continue;
			blocked.push(`${localRef} -> ${localSha.slice(0, 7)} (tagged commit is not on origin/main)`);
			continue;
		}
		if (!marks.has(localSha)) blocked.push(`${localRef} -> ${localSha.slice(0, 7)}`);
	}

	if (blocked.length === 0) return;

	refuse(
		[
			'refusing to push commits that have not been reviewed.',
			'',
			...blocked.map((b) => `    ${b}`),
			'',
			'Run /code-review, deal with what it finds, then record it:',
			'    node .claude/hooks/review-gate.cjs --mark',
			'',
			'Recording is per-commit, so committing again after a review means',
			'reviewing again — the fixes are the part most likely to be wrong.',
		].join('\n'),
	);
}

try {
	if (process.argv.includes('--mark')) mark();
	else gate();
} catch (err) {
	if (!(err instanceof Refuse)) throw err;
	// writeSync, not process.stderr.write + process.exit: exit() discards
	// whatever is still buffered on a pipe, and git runs hooks with stderr
	// piped — which would turn an explained refusal into a bare failure.
	writeSync(2, `\nreview-gate: ${err.message}\n\n`);
	process.exitCode = 1;
}
