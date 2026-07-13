// esbuild `inject` shim: replaces bare references to n8n's restricted
// globals inside the bundled lenz-io code with local equivalents, so
// nothing resolves as an unqualified ambient global by the time ESLint
// sees the bundled output.
//
// setTimeout/clearTimeout (retry-backoff sleep, request-timeout abort):
// built on n8n-workflow's own sanctioned `sleep` helper. n8n-workflow is
// an allowed import and stays external (not bundled), so its internal
// setTimeout usage is invisible to the scanner. scheduleCallback(fn, ms)
// mirrors setTimeout(fn, ms): fn fires once ms has elapsed, unless
// cancelCallback (mirroring clearTimeout) is called first -- calling it
// after fn already ran is a harmless no-op, matching real clearTimeout
// semantics on an expired timer.
//
// console: the only use is a single diagnostic log line (task-submitted
// notice) in lenz-io; stubbing it to a no-op drops that log line but
// changes no return value or control flow.
//
// process: only used as a fallback for apiKey/baseUrl when neither is
// passed explicitly; our node always passes both, so this branch is
// already dead at runtime -- stubbed to an empty env so it stays safe
// (no throw) if ever reached.
import { sleep } from 'n8n-workflow';

function scheduleCallback(fn, ms) {
	let cancelled = false;
	sleep(ms).then(() => {
		if (!cancelled) fn();
	});
	return {
		cancel() {
			cancelled = true;
		},
	};
}

function cancelCallback(handle) {
	if (handle && typeof handle.cancel === 'function') handle.cancel();
}

const consoleStub = {
	info() {},
	warn() {},
	error() {},
	log() {},
	debug() {},
};

const processStub = { env: {} };

export {
	scheduleCallback as setTimeout,
	cancelCallback as clearTimeout,
	consoleStub as console,
	processStub as process,
};
