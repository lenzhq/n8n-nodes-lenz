# n8n-nodes-lenz

This is an n8n community node. It lets you use **Lenz** in your n8n workflows.

**Lenz** is an audit-grade AI fact-checking API. It catches hallucinations and gives sourced, branch-ready verdicts on any claim or piece of text — not just a bare confidence score.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Example workflow](#example-workflow)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation, and search for `n8n-nodes-lenz` under **Settings → Community Nodes → Install**.

## Operations

Operations are grouped under a **Resource** picker. (Nodes added before v0.1.10 stay on node version 1, which shows the original flat operation list — existing workflows are unaffected.)

### Claim — check something

| Operation | What it does |
|---|---|
| **Verify (Deep)** *(default)* | Full 8-model pipeline (research → debate → adjudication), ~90 seconds. Returns a verdict, confidence, `lenz_score` (1-10), `key_finding`, sourced citations, and an executive summary. Reserve for high-stakes claims that need a thorough, cited answer. |
| **Assess (Fast)** | A quick 3-model panel verdict, ~5-10 seconds, one entry per claim identified in the input text. Good default for lower-stakes checks. |
| **Extract Claims** | Free — pulls the verifiable factual claims out of a block of text without checking them. Useful as a first step before running Assess or Verify on each claim individually. |

### Verification — manage submitted and stored work

| Operation | What it does |
|---|---|
| **Get Status** | Polls a submitted verification by `task_id`. Pairs with Verify's **Wait for Completion** toggle and with webhook delivery. |
| **Select Claims** | Resolves a paused verification (see [Ambiguous and multi-claim input](#ambiguous-and-multi-claim-input)). |
| **Submit Batch** | Submits up to 20 claims at once without waiting. Returns one item per spawned task. |
| **Get** | Retrieves a stored verification report by `verification_id`. |
| **Get Many** | Lists the verifications stored against this API key, with **Return All** / **Limit**. |
| **List Related** | Public verifications semantically related to a given one — useful for "see also" surfaces. |
| **Delete** | Permanently deletes one of your stored verifications. |

### Ask — follow-up questions

| Operation | What it does |
|---|---|
| **Send** | Asks a question grounded in the full research behind a completed **Verify (Deep)** result. Requires the `verification_id` that Verify returns — not usable standalone. |
| **Get History** | Returns the stored conversation for a verification plus how many follow-up questions are left. |
| **Reset History** | Deletes the stored conversation for a verification. |

### Account

| Operation | What it does |
|---|---|
| **Get Usage** | Returns your credit balance and the per-endpoint price list (`costs`), plus the same balance projected into each capability (`assess` / `verify` / `ask`), the `extract` daily cap, your current plan, and when credits reset. |

Every claim-checking operation returns a branch-ready `passed` boolean (derived from the verdict) alongside the raw verdict/confidence/citations, so you can wire an **IF** node directly off the result — e.g. route failed claims to human review.

Verify and Get also expose an **Include Audit Trail** toggle, which adds the adjudication reasoning, debate transcript, per-panelist assessments, and panel agreement under `audit`. It's off by default because it's a lot of data per item.

### Retry safety

Billable calls (Verify, Assess, Extract, Submit Batch, Select Claims) send an `Idempotency-Key` derived from the execution ID, node name, item index, and a fingerprint of the request body. If n8n retries the node — via **Retry On Fail**, or after a dropped response — the input is identical, so Lenz replays the original response instead of charging you a second time. A fresh run of the workflow is a new execution, so it bills normally.

Including the body in the key is what makes repeated runs safe: **Loop Over Items** and **AI Agent** tool calls both execute the node several times within a single execution, each time restarting the item index at 0, so a position-only key would send one key with different inputs and the API would reject it.

Note that **Assess bills per claim found in the text**, not per request: a paragraph containing five claims spends five assess units.

## Credentials

You'll need a free Lenz API key:

1. Sign up at [lenz.io/api-credentials](https://lenz.io/api-credentials) to get a key (starts with `lenz_`).
2. In n8n, add new credentials of type **Lenz API**, paste the key, and click **Test** to confirm it's valid.

## Compatibility

Built against `n8n-workflow` (n8n API version 1) and tested against n8n v2.30.4. No known version incompatibilities.

## Usage

- **Verify (Deep) takes ~90 seconds** — it's the full multi-model pipeline, not an instant call. The node blocks/polls until the result is ready, so no separate polling setup is needed on your end.
- To feed data from a previous node instead of a fixed value, toggle a field to **Expression** and reference it, e.g. `{{ $json.output }}`.
- For **Ask Follow-Up**, keep the Question field as a fixed, generic string (e.g. `"What are the main sources supporting this verdict?"`) and only make the Verification ID dynamic via expression — that way the same follow-up question works for whatever claim was just verified.
- The node is `usableAsTool`, so it can also be called directly by an n8n **AI Agent** as a tool, not just as a manual workflow step.

New to n8n? See the [Try it out](https://docs.n8n.io/try-it-out/) documentation to get started with the basics first.

## Example workflow

A simple "fact-check gate" pattern — verify an LLM's output before acting on it:

```
[LLM node]  ──▶  [Lenz node]  ──▶  [IF node]  ──┬─▶ (true)  continue normally
 generates          Operation:        checks         └─▶ (false) route to human review
 an answer          Verify (Deep)     {{ $json.passed }}
                     Claim: {{ $json.text }}
```

1. Add an **LLM node** (or any node producing text) upstream.
2. Add the **Lenz node**, set Operation to **Verify (Deep)**, and set the Claim field to an expression referencing the upstream output, e.g. `{{ $json.text }}`.
3. Add an **IF node** after Lenz with the condition `{{ $json.passed }}` **is true**.
4. Wire the true branch to continue the workflow normally, and the false branch to whatever your "needs review" path is (Slack alert, email, a manual-approval step, etc.).

For a lighter check on lower-stakes content, swap the Lenz operation to **Assess (Fast)** instead — same wiring, ~5-10s instead of ~90s.

### Follow-up questions on a completed verification

Ask a grounded question about the evidence behind a Verify (Deep) result, by chaining two Lenz nodes:

```
[Lenz node]  ──▶  [Lenz node]
 Operation:          Operation:
 Verify (Deep)       Ask Follow-Up
                     Verification ID: {{ $json.verification_id }}
                     Question: "What are the main sources supporting this verdict?"
```

1. Add a **Lenz node**, set Operation to **Verify (Deep)**, and run it.
2. Add a second **Lenz node** after it, with Operation set to **Ask Follow-Up**.
3. Set the Verification ID field to an expression referencing the first node's output: `{{ $json.verification_id }}`.
4. Keep the Question field as a fixed string (e.g. `"What are the main sources supporting this verdict?"`) — it works for whatever claim was just verified, since only the Verification ID needs to change per run.

### Ambiguous and multi-claim input

Verify pauses rather than guessing when the text isn't a single unambiguous claim. The result comes back with `status: "needs_input"` and a `reason`:

| `reason` | What the node returns | How to continue |
|---|---|---|
| `multi_claim` | `claims` — the distinct claims found in your text | Feed the ones you want into **Select Claims** with the same `task_id` |
| `clarification_required` | `candidates` — the possible readings of one ambiguous claim | Feed the intended reading into **Select Claims** with the same `task_id` |
| `duplicate_found` | `similar_claims` — existing verifications that already cover this | Reuse one of those `verification_id`s, or rephrase to force a fresh check |

**Select Claims** spawns one independent verification per selected claim and returns one item each, so you can poll them with **Get Status** or collect them via webhook:

```
[Lenz node]  ──▶  [IF node]  ──▶  [Lenz node]  ──▶  [Lenz node]
 Verify (Deep)     status ==        Select Claims     Get Status
                   needs_input      Task ID:          Task ID:
                                    {{ $json.task_id }}  {{ $json.task_id }}
                                    Selected Claims:
                                    {{ $json.claims[0].text }}
```

A paused task expires **10 minutes** after it pauses, and Select Claims only accepts text that was actually offered — so copy the claim text verbatim rather than retyping it.

### When a verification fails

A verification that stops before reaching a verdict comes back with `status: "failed"` and three fields a downstream **IF** node can branch on:

| Field | What it says |
|---|---|
| `failure_reason` | *Where* the pipeline stopped (e.g. `research_empty`, `framing_failed`) |
| `failure_class` | *Why*, from a closed set: `upstream_unavailable`, `insufficient_evidence`, `invalid_input`, `cancelled`, `internal` |
| `retryable` | `true` only for `upstream_unavailable` — resubmitting the same claim later can succeed. For every other class, retrying the same input will not help. |

Both `failure_class` and `retryable` are empty/`null` on verifications older than 2026-08. **Get** reports a stored verification that failed the same way, rather than as a completed one with no verdict.

Separately, a *submit* can be refused outright with **HTTP 503** and a typed body code — `capacity` (Lenz is at its concurrency ceiling) or `upstream_unavailable` (model providers down). The node reports these as transient and names the stated wait (typically 90-120s, jittered so callers return spread out). Nothing is charged for a refused submit.

The wait is longer than **Retry On Fail** can cover: that setting allows 2-5 tries spaced a few seconds apart, so it would spend every try inside the window and fail anyway — while re-sending the submit each time, which is the pile-on the jitter exists to prevent. Handle it in the workflow instead: set the node's **On Error** to *Continue (using error output)*, feed that output into a **Wait** node set to the stated seconds, and loop it back into the Lenz node. Re-running the workflow later works just as well.

So the Wait node has a number to read, the error output carries the refusal as fields rather than only as prose:

| Field | What it says |
|---|---|
| `retry_after` | Seconds to wait before submitting again — point the Wait node's duration at `{{ $json.retry_after }}` |
| `code` | The typed reason, e.g. `capacity`, `upstream_unavailable`, `no_credits` |
| `status_code` | The HTTP status, e.g. `503` |
| `error_message` / `error_description` | The same wording the node would have thrown, present only for a recognised billing or capacity refusal |

`error` keeps the raw message it always carried, so existing workflows reading it are unaffected.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Lenz API documentation](https://lenz.io/developers)
* [lenz-io Node SDK](https://github.com/lenzhq/lenz-io-node) (a standalone SDK for the same Lenz API, if you're building outside n8n)

## Version history

* **0.1.0** — Initial release. Verify (Deep), Assess (Fast), Extract Claims, Ask Follow-Up, and Check Usage operations; API-key credential with live test endpoint.
* **0.1.1 - 0.1.3** — Publishing pipeline fixes (GitHub Actions provenance, npm trusted publishing).
* **0.1.4** — Bundled `lenz-io` at build time (zero runtime dependencies, required for n8n Cloud verification); added a Jest test suite; fixed an error-message bug in the `NodeApiError` wrapping; replaced the placeholder icon with the real Lenz brand mark.
* **0.1.5** — Corrected the maintainer email in `package.json` to match the npm account.
* **0.1.6** — Fixed every violation found by n8n's official `@n8n/scan-community-package` compliance scanner: test files no longer ship in the package; the bundled `lenz-io` SDK is properly tree-shaken (dropping unused webhook-signature-verification code); replaced remaining restricted-global usage (`setTimeout`, `process`, `console`, `globalThis`) with scanner-safe equivalents; and stopped emitting unused `.d.ts` declaration files. Also fixed a dormant bug in the npm publish workflow.
* **0.1.7** — Clarified the Verification ID field description and added an Ask Follow-Up wiring example to the README.
* **0.1.8** — Rewrote the node to call the Lenz REST API directly via n8n's `httpRequestWithAuthentication` helper, removing the `lenz-io` SDK dependency entirely (zero runtime dependencies, no build-time bundling). This resolves the source-level restricted-import violations required for n8n Cloud verification.
* **0.1.9** — Send a `User-Agent: n8n-nodes-lenz/<version>` header on every API request so Lenz can attribute API usage to the n8n integration.
* **0.1.10** — Brought the node up to the full Lenz Public API v1 surface. Added operations for batch verification, claim selection, status polling, stored-verification management (get / list / delete / related), and ask history (get / reset). Verify now accepts `source_url`, `webhook_url`, and `visibility`, can skip waiting via **Wait for Completion**, and surfaces the fields the API had been returning but the node discarded — `key_finding`, `domain`, `entities`, `presumed_intent`, `warnings`, `language`, timestamps, full source detail (`snippet` / `source_name` / `date`), and an opt-in `audit` trail. A `needs_input` result now returns the offered claims and a reason-specific next step instead of dead-ending. Billable POSTs send an `Idempotency-Key` so an n8n retry cannot double-charge quota, and every request pins `X-Lenz-API-Version`. Operations are now organised under a **Resource** picker in node version 1.1; nodes already saved on version 1 keep their original flat operation list and behaviour.

* **0.3.0** — Lenz replaced its six per-endpoint quotas with **one credit pool** per account, and the node now speaks it. Out-of-credits messages quote the two new fields on the 402 body — `cost` (what this call needed) beside `credits_remaining` (what you hold) — which is the difference between "you have 4 credits and this costs 10", one top-up away, and "you have nothing", a plan decision. **Get Usage** returns the balance and the live price list (`costs`) alongside the per-capability numbers, which are now projections of that one balance rather than separate allowances: spending on `assess` reduces what is left for `verify`. `/extract` still costs nothing and keeps its own daily fair-use cap, which rejects 429, not 402. No breaking change to any node output: every field the node emitted before is still emitted.
* **0.2.0** — Out-of-credits is now reported as a billing problem instead of a generic API failure. The node re-wrapped every error as `new NodeApiError(node, { message })`, and because a bare `{message}` carries no status, `httpCode` was always `null` — so the node was structurally blind to the difference between 402, 403 and 429 regardless of what the API returned. The original error is now passed through, and an HTTP 402 gets an explicit branch naming the condition, linking to [lenz.io/plans](https://lenz.io/plans), and stating that retrying will not help. Also documents the `/extract` daily cap (1000 calls per key per day, resetting 00:00 UTC), which the operation description had only ever called "free".

  Also fixes an `Idempotency-Key` collision introduced in 0.1.10. The key was derived from the item index alone, so a node that ran more than once inside a single execution — **Loop Over Items**, or an **AI Agent** calling Lenz as a tool — reused the first run's key with different input, and the API rejected it (`422`, or `409` while the first call was still in flight). The key now includes a fingerprint of the request body, which keeps retry protection intact while letting repeated runs through. Verify also fails with a clear message if a submit returns no `task_id`, rather than polling an invalid status URL.

* **0.2.1** — A failed verification now returns `failure_reason`, `failure_class` (closed set: `upstream_unavailable` / `insufficient_evidence` / `invalid_input` / `cancelled` / `internal`) and `retryable` as explicit output fields, so an IF node can branch on *why* it failed instead of parsing the prose message. Capacity refusals (HTTP 503 with `code: capacity` or `upstream_unavailable`, sent when Lenz is shedding load or every model provider is down) are reported as transient with the stated wait and the Wait-node pattern that clears it, instead of a generic 503.

  Also repairs the error path both of those rely on. The node read the API's error body from `.body` / `.response.data`, but `httpRequestWithAuthentication` never rethrows the transport error — it wraps it in a `NodeApiError`, which moves the parsed body to `context.data`. Nothing matched, so the typed branches never ran. Attaching the wording then failed a second time: `new NodeApiError(node, error, { message })` returns the caught error untouched when that error is already a `NodeApiError`, discarding the message, description and status. The node now reads the body from where n8n puts it and sets the wording on the caught error, so the text actually reaches the user — this is also what makes 0.2.0's out-of-credits message work, which had never appeared in practice. The error tests now build their fixtures the way n8n does, since the previous hand-built shape could not exercise either path. On top of that, the error output carries `retry_after`, `code` and `status_code` so the documented Wait-node recovery has a value to read, and **Get** no longer reports a stored verification that failed as `completed` with a null verdict.

## Maintainer

[@David19782](https://github.com/David19782)
