#!/usr/bin/env node
/**
 * Refuses to push commits an agent has not had reviewed.
 *
 * Runs as git's own `pre-push` hook, not as a Claude Code hook: git invokes it
 * for every push whatever issued it — either shell tool, a script, a chained
 * `commit && push` — and hands it the refs actually being sent on stdin, as
 * `<local ref> <local sha> <remote ref> <remote sha>` lines, plus the remote
 * name and URL in argv.
 *
 * Scoped to agents, via CLAUDECODE / AI_AGENT. A human pushing from their own
 * terminal is never gated; this exists to stop an agent shipping work it has
 * not checked, not to stand between you and your repository.
 *
 * WHAT THIS IS NOT: a security control. The agent it gates composes the push
 * command, so `--no-verify` walks past it, and `--mark` asserts a review
 * rather than proving one. It makes reviewing the path of least resistance and
 * catches forgetting — it does not stop a determined bypass, and the docs must
 * not claim otherwise. Branch protection on the server is the layer that
 * enforces this unconditionally; this only shortens the feedback loop.
 *
 * Plain `.cjs`, deliberately: a git hook has to run directly from a fresh
 * clone with no build step and no `npm install`, so it cannot be TypeScript
 * compiled into `dist/`. That is the specific reason it sits outside the
 * tsconfig and eslint scope; its behaviour is pinned by
 * `__tests__/review-gate.test.cjs`, which is itself `.cjs` because spawning a
 * process is banned in this package's `.ts`.
 *
 * Fails CLOSED: every internal failure, every line it cannot parse, and an
 * empty ref list all refuse the push. Earlier versions of this failed open in
 * several places, and the first draft did nothing at all while reporting
 * success.
 *
 * Usage:
 *   review-gate.cjs [remote] [url]   gate mode; ref list on stdin (git's call)
 *   review-gate.cjs --mark           record HEAD as reviewed
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

/**
 * Returns trimmed stdout, or null on failure. git's stderr is captured and
 * attached to `lastGitError` rather than discarded: "could not locate the git
 * directory" with the real cause thrown away (dubious ownership, a corrupt
 * refs database) leaves no route to a fix.
 */
let lastGitError = '';
function git(args) {
	try {
		return execFileSync('git', args, {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'pipe'],
		}).trim();
	} catch (err) {
		lastGitError = String(err.stderr || '').trim();
		return null;
	}
}

const withCause = (message) => (lastGitError ? `${message}\n  git said: ${lastGitError}` : message);

/**
 * Marks live in the shared git directory, not the working tree: it is common
 * to every worktree, so a review recorded in one checkout counts in all of
 * them, and it survives `git worktree remove` — routine here, and it would
 * otherwise discard every review recorded in that worktree.
 */
function markerPath() {
	// Overridable so the tests can use a scratch file. Not a weakening: the
	// gated agent can already write the marks.
	if (process.env.REVIEW_GATE_MARKS) return path.resolve(process.env.REVIEW_GATE_MARKS);
	const common = git(['rev-parse', '--git-common-dir']);
	if (!common) refuse(withCause('could not locate the git directory.'));
	return path.resolve(common, 'review-gate-marks');
}

/** A missing marks file means nothing has been reviewed yet. Any other read
 *  failure is a real error: treating it as "no marks" would let `--mark`
 *  rewrite the file from empty and destroy every recorded review. */
function readMarks(file) {
	try {
		return new Set(
			readFileSync(file, 'utf8')
				.split('\n')
				.map((l) => l.trim())
				.filter(Boolean),
		);
	} catch (err) {
		if (err.code === 'ENOENT') return new Set();
		return refuse(`could not read the review marks at ${file}: ${err.code || err.message}`);
	}
}

function mark() {
	const head = git(['rev-parse', 'HEAD']);
	if (!head) refuse(withCause('no HEAD to record.'));
	const file = markerPath();
	const marks = readMarks(file);
	// delete-then-add moves an existing SHA to the end. A bare `add` leaves it
	// in place, so re-marking an old commit would not save it from eviction.
	marks.delete(head);
	marks.add(head);
	writeFileSync(file, `${[...marks].slice(-KEEP_MARKS).join('\n')}\n`);
	process.stdout.write(`review-gate: recorded review of ${head.slice(0, 7)}.\n`);
}

/**
 * The commit a release tag points at must already be on the remote's main.
 * Pushing a tag uploads the tagged commit's objects too, and publishing fires
 * on any version tag — so exempting tags on the ref name alone is a straight
 * path from an unreviewed commit to npm.
 *
 * Resolved once per push, not once per tag: `git push --tags` on a repo with
 * forty tags would otherwise spawn eighty git processes before any network
 * work, which is slow on Windows.
 */
function resolveMain(remote) {
	for (const candidate of [`${remote}/main`, 'origin/main']) {
		if (git(['rev-parse', '--verify', '--quiet', candidate])) return candidate;
	}
	return null;
}

function gate(argv) {
	if (!process.env.CLAUDECODE && !process.env.AI_AGENT) return; // human push

	// Documented escape for `npm run release`, which commits and pushes in one
	// step so its commit cannot have been marked beforehand. Compared to an
	// exact value: plain truthiness would make REVIEW_GATE_BYPASS=0 — which
	// reads as "off" — silently disable the gate.
	if (process.env.REVIEW_GATE_BYPASS === '1') {
		writeSync(2, 'review-gate: bypassed via REVIEW_GATE_BYPASS=1.\n');
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

	const lines = input
		.split('\n')
		.map((l) => l.trim())
		.filter(Boolean);
	// No ref lines at all is not "nothing to push" — git does not invoke the
	// hook for that. It means stdin was redirected from /dev/null, closed, or
	// truncated, which the isTTY guard above does not catch. Refuse rather than
	// permit silently: that shape of fail-open is this gate's own history.
	if (lines.length === 0) refuse('git supplied no refs to check — refusing rather than assuming none.');

	const marks = readMarks(markerPath());
	const remote = argv[0] && !argv[0].startsWith('-') ? argv[0] : 'origin';
	let mainRef; // resolved lazily, and only once, and only if a tag shows up
	let mainResolved = false;

	const unreviewed = [];
	const offMain = [];

	for (const line of lines) {
		const fields = line.split(/\s+/);
		// Anything that does not look like a ref line is refused, not skipped:
		// waving through a line we failed to understand is the fail-open this
		// gate exists to avoid.
		if (fields.length < 2) refuse(`unrecognised ref line from git: ${JSON.stringify(line)}`);
		const [localRef, localSha] = fields;
		if (ALL_ZERO.test(localSha)) continue; // deleting a remote ref pushes nothing

		if (localRef.startsWith('refs/tags/')) {
			if (!mainResolved) {
				mainRef = resolveMain(remote);
				mainResolved = true;
			}
			if (!mainRef) {
				refuse(
					`cannot resolve ${remote}/main or origin/main, so a tag cannot be checked.\n` +
						'Fetch first, or set REVIEW_GATE_BYPASS=1 if this is a release.',
				);
			}
			try {
				execFileSync('git', ['merge-base', '--is-ancestor', localSha, mainRef], { stdio: 'ignore' });
			} catch {
				offMain.push(`${localRef} -> ${localSha.slice(0, 7)}`);
			}
			continue;
		}

		if (!marks.has(localSha)) unreviewed.push(`${localRef} -> ${localSha.slice(0, 7)}`);
	}

	if (unreviewed.length === 0 && offMain.length === 0) return;

	const parts = [];
	if (unreviewed.length) {
		parts.push(
			'refusing to push commits that have not been reviewed.',
			'',
			...unreviewed.map((r) => `    ${r}`),
			'',
			'Run /code-review, deal with what it finds, then record it:',
			'    node .claude/hooks/review-gate.cjs --mark',
			'',
			'Recording is per-commit, so committing again after a review means',
			'reviewing again — the fixes are the part most likely to be wrong.',
		);
	}
	if (offMain.length) {
		// Marking cannot help a tag: the tag branch never consults the marks.
		// Saying "record a review" here would send the caller round a loop that
		// produces byte-identical output every time.
		if (parts.length) parts.push('');
		parts.push(
			`refusing to push tags whose commit is not on ${mainRef}:`,
			'',
			...offMain.map((r) => `    ${r}`),
			'',
			'Pushing a tag uploads its commit too, and publishing fires on a',
			'version tag. Merge to main first, fetch if main is stale, or set',
			'REVIEW_GATE_BYPASS=1 if you know what this tag is for.',
		);
	}
	refuse(parts.join('\n'));
}

try {
	// argv[2] onward is what git passes pre-push: <remote-name> <remote-url>.
	// Matched positionally rather than scanned with includes(), because a
	// remote name or URL containing "--mark" would otherwise flip the hook from
	// gating the push to recording HEAD and exiting 0.
	const args = process.argv.slice(2);
	if (args[0] === '--mark') mark();
	else gate(args);
} catch (err) {
	if (!(err instanceof Refuse)) throw err;
	// writeSync, not process.stderr.write + process.exit: exit() discards
	// whatever is still buffered on a pipe, and git runs hooks with stderr
	// piped — which would turn an explained refusal into a bare failure.
	writeSync(2, `\nreview-gate: ${err.message}\n\n`);
	process.exitCode = 1;
}
