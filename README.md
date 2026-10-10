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

### Updating

**An installed copy does not update itself.** A fix only reaches your workflows once you update the node: **Settings → Community Nodes**, then **Update** on `n8n-nodes-lenz`. Worth doing if you installed it a while ago — an instance still on an early release keeps behaviour that has since been fixed. Before 0.1.10 in particular, a slow Verify gives up at 120 seconds with no way to collect the result afterwards: Get Verify Status arrived in 0.1.10, and Max Wait in 0.5.0.

Updating keeps your existing Lenz nodes on the node version they were added with, so saved workflows keep working unchanged. Two things do change underneath them, both deliberately:

- **Max Wait (Seconds) defaults to 300 from 0.6.0** (it was 120). A Verify node that never set Max Wait picks this up, because n8n does not save a parameter left at its default. It only ever makes a slow verification *finish* rather than time out; a fast one returns exactly as before. The limit is **per item**, and items are verified one after another, so the worst case for a run is the number of items times Max Wait — ten items can now block for up to fifty minutes where they used to give up after twenty. If a workflow must not block that long, or runs under a short execution timeout, set Max Wait explicitly.
- A node added on an old release keeps that release's layout. A node added **before 0.1.10 uses node version 1**, the original flat operation list, and stays on it after updating. Workflows built on it keep working. For anything new — templates especially — add a fresh Lenz node after updating so it uses the current layout.

## Operations

Operations are grouped under a **Resource** picker. (Nodes added before v0.1.10 stay on node version 1, which shows the original flat operation list — existing workflows are unaffected.)

### Claim — check something

| Operation | What it does |
|---|---|
| **Verify (Deep)** *(default)* | Full multi-model pipeline (research → debate → adjudication), ~90 seconds. Returns a verdict, confidence, `lenz_score` (1-10), `key_finding`, sourced citations, an executive summary, and a `suggested_rewrite` when the claim needs correcting. Reserve for high-stakes claims that need a thorough, cited answer. **Depth** trades work for price: *Low* searches fewer sources, skips the recovery fetch tiers and stops the debate after the opening arguments, for **5 credits instead of 10**. |
| **Assess (Fast)** | A quick 3-model panel verdict, ~15 seconds, one entry per claim identified in the input text. Good default for lower-stakes checks. Each entry carries a `verification_url`, **which is usually empty, and that is expected**: it is set only when the claim was already deep-checked with **Verify (Deep)** and that result is one you can read. A fresh panel verdict creates no stored verification, so there is no page to link to. If you need a link and sources for a claim, run Verify (Deep) on it. |
| **Extract Claims** | Free — pulls the verifiable factual claims out of a block of text without checking them. Useful as a first step before running Assess or Verify on each claim individually. **Focus** narrows the result to the claims you describe (300 characters, no extra cost); when none of them match, `status` comes back as `no_match` with an empty list rather than the unfocused claims. **Text** can also be a single public web page URL: Lenz reads the page, or a YouTube video's transcript, and extracts the claims from its first 50,000 characters. Pages behind a login (Facebook, Instagram, Threads, LinkedIn) can't be read, and a URL call typically takes 5-40 seconds. |

### Verification — manage submitted and stored work

| Operation | What it does |
|---|---|
| **Get Status** | Polls a submitted verification by `task_id`. Pairs with Verify's **Wait for Completion** toggle and with webhook delivery. |
| **Select Claims** | Resolves a paused verification (see [Multi-claim input](#multi-claim-input)). |
| **Submit Batch** | Submits up to 20 claims at once without waiting. Returns one item per spawned task. Each claim can override the batch **Depth**, so one batch can mix 5- and 10-credit checks. |
| **Get** | Retrieves a stored verification report by `verification_id`. |
| **Get Many** | Lists the verifications stored in your Lenz account, with **Return All** / **Limit**. |
| **List Related** | Public verifications semantically related to a given one — useful for "see also" surfaces. |
| **Delete** | Permanently deletes one of your stored verifications. |

### Review — check a whole draft, or its citations

| Operation | What it does |
|---|---|
| **Review Draft** | Checks a whole draft (up to 50,000 characters, or one public web page by URL) in one call: finds its claims, quick-checks them (1 credit each, up to **Max Quick Checks**, default 20), deep-checks the doubtful ones (10 credits each, 5 at Low **Depth**, up to **Max Deep Checks**, default 5) and, with **Max Citations** above 0, checks whether each cited source says what the draft attributes to it (1 credit per citation). **Suggest Edits** adds the smallest edits that make the draft say what each correction says, at no extra cost. A review usually takes two to four minutes. |
| **Get Review** | Fetches a review by `review_id`, for one that outlasted the wait. **Issues Only** leaves out the full claim and citation lists. |
| **Check Citations** | Checks only the citations: either a **Text** with its links, DOIs or `[n]` markers and a reference list (**Max Citations**, default 20), or up to 20 **Statement-Source Pairs** you list, each with a URL or a DOI. 1 credit per citation checked; a source that could not be read is refunded. |
| **Get Citation Check** | Fetches a citation check by `citecheck_id`. |

Both hand on Lenz's result as it comes, plus `passed`: `true` only when `outcome` is `clean`, `false` for `issues_found`, `incomplete` or `unchecked`, and `null` until there is an outcome. **Branch on `outcome`** for anything finer: `issues[]` (claims Lenz found wrong, each with `verdict`, `key_finding` and `suggested_rewrite`) and `citation_issues[]` (citations whose source does not say what the text says, worst first) are the arrays to loop over, and `credits.charged` is what it cost.

**Waiting.** With **Wait for Completion** on, the node polls until the job finishes, for up to **Options → Max Wait (Seconds)**, default **600**. If that runs out you get `status: "timeout"` with the `review_id` or `citecheck_id`; nothing is cancelled or lost, so fetch it later with **Get Review** / **Get Citation Check**. For long drafts, turn Wait for Completion off and use a **Webhook URL** (also under Options) or fetch it later.

**Three at a time.** Lenz runs at most **3 reviews, and separately 3 citation checks, at once per account**. A fourth waits: the node holds it for up to five minutes until a slot opens, then submits it. Nothing is charged for the wait. If one item in a run fails for good, the error names the jobs earlier items already started, so a paid review is never lost with the run.

### Ask — follow-up questions

| Operation | What it does |
|---|---|
| **Send** | Asks a question grounded in the full research behind a completed **Verify (Deep)** result. Requires the `verification_id` that Verify returns — not usable standalone. |
| **Get History** | Returns the stored conversation for a verification, with `exchanges_used`, `exchange_limit` and `can_send` (whether another follow-up question can be asked). |
| **Reset History** | Deletes the stored conversation for a verification. |

### Account

| Operation | What it does |
|---|---|
| **Get Usage** | Returns your credit balance and the per-endpoint price list (`costs`), plus the same balance projected into each capability (`assess` / `verify` / `ask`), the `extract` daily cap, your current plan, and when credits reset. Prices that depend on a request parameter are under `cost_options` instead, nested capability → parameter → value — today `cost_options.verify.depth.low` is 5 against a default of 10. That is the only place it appears: it is a price rather than a capability, so it has no balance block of its own, and `costs` carries just the four capability keys (`verify`, `assess`, `ask`, `extract`). To size how many low-depth checks you can afford, divide `credits.remaining` by `cost_options.verify.depth.low`. If that block is missing, `costs.verify` is a safe fallback but it is the *standard* price, so it understates the answer by half. |
| **Get Webhook Secret** | OAuth connections only. Returns `webhook_secret`, the secret Lenz signs this connection's webhook deliveries with — verify each delivery's signature with it. Lenz creates it on this first call and refuses a **Webhook URL** until it exists; a reconnected connection starts with no secret until you run this again. An API key's secret is set and shown on [lenz.io/api-credentials](https://lenz.io/api-credentials) instead. |

The per-capability blocks (`verify` / `ask` / `assess`) and each block's `credits` alias are **deprecated, and kept for existing callers**. They are projections of the one balance, not separate allowances, so derive them instead and branch on the balance itself: `Math.floor(credits.remaining / costs[capability])`. Note the single slash — in an n8n expression `//` starts a comment, so the older form silently returned the raw balance. Only divide for a capability that costs credits: `costs.extract` is `0`. An **IF** node reading `{{ $json.verify.remaining }}` keeps resolving; new workflows should read the balance and `costs` instead.

Every claim-checking operation returns a branch-ready `passed` boolean (derived from the verdict) alongside the raw verdict/confidence/citations, so you can wire an **IF** node directly off the result — e.g. route failed claims to human review.

Verify and Get also expose an **Include Audit Trail** toggle, which adds the adjudication reasoning, debate transcript, per-panelist assessments, and panel agreement under `audit`. It's off by default because it's a lot of data per item. At Low depth the debate transcript carries no rebuttals, because that round does not run.

A completed verification — from **Verify (Deep)**, **Get Verify Status** or **Get** — also carries `suggested_rewrite`: a rewrite of the claim that the verification's findings support, for a person to review before using it. **It has not been verified itself**, so do not paste it over the original sentence without reading it. It is an empty string for a true claim, when no correction is established, and on verifications made before the field existed, so an **IF** node checking `{{ $json.suggested_rewrite }}` **is not empty** finds the claims that have one.

### Retry safety

Billable calls (Verify, Assess, Extract, Submit Batch, Select Claims, Ask Follow-Up) send an `Idempotency-Key` derived from the execution ID, a hash of the node's identity, the item index, and a fingerprint of the request — its path as well as its body. If n8n retries the node — via **Retry On Fail**, or after a dropped response — the input is identical, so Lenz replays the original response instead of charging you a second time. A fresh run of the workflow is a new execution, so it bills normally.

On **Ask Follow-Up** the key also keeps the conversation clean: an unkeyed retry asks the question again, so the question and a second answer are appended to the history that **Get Ask History** returns and that the next follow-up reads as context. A retry that arrives while the first question is still being answered gets a `409` — there is no answer yet to replay.

Including the request in the key is what makes repeated runs safe: **Loop Over Items** and **AI Agent** tool calls both execute the node several times within a single execution, each time restarting the item index at 0, so a position-only key would send one key with different inputs and the API would reject it. The path is part of it because **Ask Follow-Up** and **Select Claims** name what they act on in the URL rather than in the body — asking one fixed question of several verifications, the wiring suggested below, is otherwise indistinguishable from a retry of the first.

Note that **Assess bills per claim found in the text**, not per request: a paragraph containing five claims spends five assess units.

## Credentials

Connect with your Lenz account (**OAuth**, the default on a new node) or with an API key. When you create a credential from a Lenz node, the credential window lets you pick either one.

**OAuth (Lenz OAuth2 API)** — nothing to copy or paste:

1. On a Lenz node, open **Credential to connect with → Create new credential** and keep **OAuth** selected.
2. Click **Connect my account**, sign in to Lenz and click **Allow**.

n8n registers itself with Lenz the first time you connect, so there is no client ID, secret or redirect URL to set up, and any number of n8n instances and credentials can connect to the same Lenz account. It needs n8n 2.12.0 or later (see [Compatibility](#compatibility)). The OAuth Redirect URL n8n shows must be a public `https://` address, or `http://localhost` for an n8n on your own computer; if it shows an internal address, set `WEBHOOK_URL` to your instance's real address and restart n8n. Disconnect it any time under **Connected apps** in your Lenz account. To use a **Webhook URL** over OAuth, run **Account → Get Webhook Secret** once first: Lenz signs that connection's deliveries with it, and refuses a webhook URL until it has been fetched. A reconnected connection starts with no secret, so run **Get Webhook Secret** again before using a Webhook URL.

**API key (Lenz API):**

1. Get a free key at [lenz.io/api-credentials](https://lenz.io/api-credentials) (it starts with `lenz_`).
2. Create a credential, pick **API Key**, paste the key and click **Save**; n8n tests it straight away.

Nodes you added before OAuth existed keep using their API key: nothing changes for them unless you switch.

## Compatibility

Built against `n8n-workflow` (n8n API version 1) and tested against n8n v2.30.4; the OAuth credential against v2.41.6. **OAuth needs n8n 2.12.0 or later**, the first release that finds Lenz's OAuth metadata. On an older n8n, use an API key: a new Lenz node starts on OAuth, so pick **API Key** in the credential window.

## Usage

- **Verify (Deep) takes ~90 seconds** — it's the full multi-model pipeline, not an instant call. The node blocks/polls until the result is ready, so no separate polling setup is needed on your end.
- **If it outlasts Max Wait (Seconds)**, the node returns `status: "timeout"` with the `task_id` and `passed: null` instead of a verdict. Nothing is lost — giving up does not cancel anything, the verification keeps running server-side, and the credits were spent at submit either way. Collect it later with **Get Verify Status**, or raise **Max Wait (Seconds)** (default 300 — it was 120 before 0.6.0, which a standard-depth run can outlast; see [Updating](#updating)). Max Wait is a ceiling, not a delay: a verification that finishes sooner returns as soon as it does. A poll that fails with a 5xx, a 429 or a 408/425 is retried for as long as the window lasts rather than failing the item; a 429 waits the reopening time the API states instead of returning on the node's own cadence. A failure carrying no HTTP status at all — a DNS or TLS problem, say — is different: it could equally be a bug or a bad credential, so it gets two retries and is then surfaced as the error it is. If the window ends on a failed poll, the `timeout` result names it in `last_error` and `last_error_status`.
- **Low depth drops a debate round, not just sources.** As well as searching fewer sources and skipping the recovery fetch tiers, *Low* stops the debate after the opening arguments — so with **Include Audit Trail** on, `audit.debate_pro.rebuttal` and `audit.debate_con.rebuttal` come back as empty strings. Every step that does run uses the same models, so Low is a volume lever rather than a model downgrade — but it is one round of argument fewer, not merely a narrower search.
- **You are charged for the Depth you asked for, not the one you got.** A *Low* request that Lenz can answer from an existing *standard* verdict still costs 5 — and the `depth` field on the result reads `standard`, because it describes the evidence behind the verdict rather than the request. Seeing `standard` come back from a *Low* request is correct, not a bug.
- **Language.** The optional **Language** field takes an ISO 639-1 code (`es`, `de`, …) and defaults to English. **Assess, Verify, Ask, Extract and Review Draft also accept `auto`**, which answers in the language of the submitted text; on Extract it means the language of the text (of the page when the input is a URL), with English for a text too short to tell; on Ask it means the language of the claim being discussed, and on Review Draft the review comes back in the language of the draft, one language for the whole review. With several claims in one Assess request, `auto` picks a single language for the whole request (the one most items agree on, otherwise English), so enter a code for a list in mixed languages. Select, Verify Batch and Check Citations need a code, not `auto`. A code you enter always wins, and the field is sent exactly as typed.
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
3. Add an **IF node** after Lenz with the condition `{{ $json.status }}` **equals** `completed`. Send the false branch wherever unfinished work should go — a timeout, a `failed` pipeline or a `needs_input` interrupt is not a verdict, and its `passed` is `null`.
4. After that, add a second **IF node** with the condition `{{ $json.passed }}` **is true**.
5. Wire its true branch to continue the workflow normally, and its false branch to whatever your "needs review" path is (Slack alert, email, a manual-approval step, etc.).

> **Check `status` before `passed`.** `passed` only means something once a verdict exists. A timeout, a `failed` pipeline or a `needs_input` interrupt has no verdict, and `passed` is `null` or absent — which an IF reads as false. Branching straight on `passed` therefore reports "this claim did not pass" for a claim nobody ever checked, and a provider outage becomes a debunking.

For a lighter check on lower-stakes content, swap the Lenz operation to **Assess (Fast)** instead — same wiring, ~15s instead of ~90s.

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

### Multi-claim input

Verify pauses rather than guessing when the text contains several distinct claims. The result comes back with `status: "needs_input"` and a `reason`:

| `reason` | What the node returns | How to continue |
|---|---|---|
| `multi_claim` | `claims` — the distinct claims found in your text | Feed the ones you want into **Select Claims** with the same `task_id` |

**Select Claims** spawns one independent verification per selected claim and returns one item each, so you can poll them with **Get Status** or collect them via webhook:

```
[Lenz node]  ──▶  [IF node]  ──▶  [Lenz node]  ──▶  [Lenz node]
 Verify (Deep)     status ==        Select Claims     Get Status
                   needs_input      Task ID:          Task ID:
                                    {{ $json.task_id }}  {{ $json.task_id }}
                                    Selected Claims:
                                    {{ $json.claims[0].text }}
```

A paused task stays open for **24 hours from submission** (not 10 minutes, as earlier versions of this README said — resubmitting inside that window pays again for a check Select Claims would still have completed), and Select Claims only accepts text that was actually offered — so copy the claim text verbatim rather than retyping it.

### When a verification fails

A verification that stops before reaching a verdict comes back with `status: "failed"` and three fields a downstream **IF** node can branch on:

| Field | What it says |
|---|---|
| `failure_reason` | *Where* the pipeline stopped (e.g. `research_empty`, `framing_failed`) |
| `failure_class` | *Why*, from a closed set: `upstream_unavailable`, `insufficient_evidence`, `invalid_input`, `cancelled`, `internal` |
| `retryable` | `true` only for `upstream_unavailable` — resubmitting the same claim later can succeed. For every other class, retrying the same input will not help. |

Both `failure_class` and `retryable` are empty/`null` on verifications older than 2026-08. **Get** reports a stored verification that failed the same way, rather than as a completed one with no verdict.

Separately, a *submit* can be refused outright with **HTTP 503** and a typed body code — `capacity` (Lenz is at its concurrency ceiling) or `upstream_unavailable` (model providers down). The node reports these as transient and names the stated wait (typically 90-120s, jittered so callers return spread out). Nothing is charged for a refused submit.

The wait is longer than **Retry On Fail** can cover: that setting allows 2-5 tries spaced a few seconds apart, so it would spend every try inside the window and fail anyway — while re-sending the submit each time, which is the pile-on the jitter exists to prevent. Handle it in the workflow instead: set the node's **On Error** to *Continue (using error output)*, feed that output into a **Wait** node set to the stated seconds, and loop it back into the Lenz node. **Set the Wait node's Wait Unit to Seconds** — it defaults to Hours, so a 90 left on the default waits 90 hours. Re-running the workflow later works just as well.

So the Wait node has a number to read, the error output carries the refusal as fields rather than only as prose:

| Field | What it says |
|---|---|
| `retry_after` | Seconds to wait before submitting again — safe to point a Wait node's duration at, **with its Wait Unit set to Seconds** (the default is Hours). Emitted only when the wait is short enough to be worth waiting (a 503, or a short rate limit); a long cap reset comes back as `resets_in_seconds` instead, and a 402 has nothing to wait for |
| `code` | The typed reason, e.g. `capacity`, `upstream_unavailable`, `rate_limited`, `no_credits` |
| `status_code` | The HTTP status, e.g. `429`, `503` |
| `cost` | Credits the refused call needed, present only on an out-of-credits refusal |
| `credits_remaining` | Credits the account holds — `0` is a real value and is reported, not dropped |
| `error_message` / `error_description` | The same wording the node would have thrown, present only for a recognised billing, capacity, rate-limit or idempotency-conflict refusal (`code: "idempotency_conflict"`: an earlier attempt of the same request is still holding it, for up to 15 minutes, and nothing new was charged; Review Draft and Check Citations retry it for ~30 seconds first) |
| `resets_in_seconds` | Seconds until a rate limit clears, when that is too long to sit in a Wait node — see [Rate limits](#rate-limits-http-429) |
| `limit` | The limit the API stated, on a Lenz rate-limit refusal |
| `upgrade_url` | Where that limit or plan is raised — on a Lenz rate-limit refusal, and on an out-of-credits refusal |

Each of these is emitted when the API's response carries it, so treat the "when" column as what today's API does rather than as a guarantee.

`cost` and `credits_remaining` let an **IF** node tell a shortfall from an empty balance without reading the prose: `{{ $json.credits_remaining }}` above zero is one top-up away, zero is a plan decision.

`error` keeps the raw message it always carried, so existing workflows reading it are unaffected.

### Rate limits (HTTP 429)

**Extract Claims** is free and capped per account per day (resetting 00:00 UTC), so a 429 is the refusal a busy workflow is most likely to meet. Nothing is charged for a refused call. The body states `reset_in_seconds`, which the node reports under one of two names depending on how long it is — `retry_after` for a wait worth sitting through, `resets_in_seconds` for one that is not. The node's message says which you have:

- **A short reset** (roughly five minutes or less) arrives as `retry_after`, and is the Wait-node loop described above — error output into a **Wait** node with Wait Amount `{{ $json.retry_after }}` and **Wait Unit Seconds** (the default is Hours), looped back.
- **A longer reset** — anything over about five minutes — arrives as **`resets_in_seconds`**, and deliberately *not* as `retry_after`: waiting it out inside a workflow leaves the execution pending that long, where an execution timeout or a Cloud duration limit can cancel it before the limit clears. The daily cap is the common case: it resets at midnight UTC, so the wait can be tens of thousands of seconds. Re-run the workflow after the reset, schedule it for then, or raise the cap.

Splitting the two keys is what keeps `retry_after` meaning what this table says it means — a duration you can hand to a Wait node. A workflow already built on the documented pattern therefore keeps failing fast on a daily cap instead of silently parking for the rest of the day. To handle the long case, read `resets_in_seconds` explicitly.

Note that the wait is read from the response body, not from the `Retry-After` header. The API sends the header, but n8n wraps every failed request in a `NodeApiError` that keeps the parsed body and discards the response object, so by the time the node sees the error the header is gone.

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

* **0.2.0** — Out-of-credits is now reported as a billing problem instead of a generic API failure. The node re-wrapped every error as `new NodeApiError(node, { message })`, and because a bare `{message}` carries no status, `httpCode` was always `null` — so the node was structurally blind to the difference between 402, 403 and 429 regardless of what the API returned. The original error is now passed through, and an HTTP 402 gets an explicit branch naming the condition, linking to [lenz.io/plans](https://lenz.io/plans), and stating that retrying will not help. Also documents the `/extract` daily cap (1000 calls per key per day, resetting 00:00 UTC), which the operation description had only ever called "free".

  Also fixes an `Idempotency-Key` collision introduced in 0.1.10. The key was derived from the item index alone, so a node that ran more than once inside a single execution — **Loop Over Items**, or an **AI Agent** calling Lenz as a tool — reused the first run's key with different input, and the API rejected it (`422`, or `409` while the first call was still in flight). The key now includes a fingerprint of the request body, which keeps retry protection intact while letting repeated runs through. Verify also fails with a clear message if a submit returns no `task_id`, rather than polling an invalid status URL.

* **0.2.1** — A failed verification now returns `failure_reason`, `failure_class` (closed set: `upstream_unavailable` / `insufficient_evidence` / `invalid_input` / `cancelled` / `internal`) and `retryable` as explicit output fields, so an IF node can branch on *why* it failed instead of parsing the prose message. Capacity refusals (HTTP 503 with `code: capacity` or `upstream_unavailable`, sent when Lenz is shedding load or every model provider is down) are reported as transient with the stated wait and the Wait-node pattern that clears it, instead of a generic 503.

  Also repairs the error path both of those rely on. The node read the API's error body from `.body` / `.response.data`, but `httpRequestWithAuthentication` never rethrows the transport error — it wraps it in a `NodeApiError`, which moves the parsed body to `context.data`. Nothing matched, so the typed branches never ran. Attaching the wording then failed a second time: `new NodeApiError(node, error, { message })` returns the caught error untouched when that error is already a `NodeApiError`, discarding the message, description and status. The node now reads the body from where n8n puts it and sets the wording on the caught error, so the text actually reaches the user — this is also what makes 0.2.0's out-of-credits message work, which had never appeared in practice. The error tests now build their fixtures the way n8n does, since the previous hand-built shape could not exercise either path. On top of that, the error output carries `retry_after`, `code` and `status_code` so the documented Wait-node recovery has a value to read, and **Get** no longer reports a stored verification that failed as `completed` with a null verdict.

* **0.3.0** — Lenz replaced its six per-endpoint quotas with **one credit pool** per account, and the node now speaks it. Out-of-credits messages quote the two new fields on the 402 body — `cost` (what this call needed) beside `credits_remaining` (what you hold) — which is the difference between "you have 4 credits and this costs 10", one top-up away, and "you have nothing", a plan decision. **Get Usage** returns the balance and the live price list (`costs`) alongside the per-capability numbers, which are now projections of that one balance rather than separate allowances: spending on `assess` reduces what is left for `verify`, and those blocks are deprecated and kept for existing callers (the removal date announced in this entry has been withdrawn). `/extract` still costs nothing and keeps its own daily fair-use cap, which rejects 429, not 402. The error output carries both numbers as fields — `cost` and `credits_remaining` beside the existing `retry_after` / `code` / `status_code` — so an IF node can tell a shortfall from an empty balance without parsing the message. **Get Usage**'s description no longer says "quota" or "for the current API key": the pool is per account, shared across your keys, the same correction the extract cap description already carries. No breaking change to any node output: every field the node emitted before is still emitted.

* **0.4.0** — Exposes the two API parameters the node could not reach. **Verify (Deep)** and **Submit Batch** gain **Depth**: *Low* searches fewer sources, skips the recovery fetch tiers and stops the debate after the opening arguments for **half the credits** (5 against 10), running the same models at every step it runs — a volume lever, not a model downgrade. In a batch each claim can override the batch-wide default, so one submission can mix 5- and 10-credit checks. A completed verification now reports the `depth` its verdict was actually produced with, which is not always the one requested: a *Low* request that Lenz answers from an existing standard verdict is charged 5 and reads back `standard`. The echo describes the evidence, the charge follows the request, and without the field there was no way to tell the two apart. **Extract Claims** gains **Focus**, a free-text hint (300 characters, no extra cost) that narrows the result to the claims you describe. It only selects from what the extractor already found — it cannot add, reword or reorder claims. When nothing matches, the API answers `status: "no_match"` with an empty list rather than substituting the unfocused claims, and the node names that case in a `message` so an empty result is not mistaken for "nothing here". An over-long focus is refused before the request is sent, measured the way the API measures it — after collapsing whitespace — and never silently truncated, since a shortened focus returns a subset with nothing to show it happened. The low-depth price is readable on **Get Usage** at `cost_options.verify.depth.low`; it is a price rather than a capability, so it has no balance block of its own and never appears in `costs`. One UI consequence: adding Depth makes the per-claim batch row a five-field collection, which the n8n linter alphabetizes, so those fields render in a new order. (0.4.1 relabelled that row’s **Text** field to **Claim**, which sorts first again, so the required field is back at the top.) No output field was removed or renamed. *(Two claims in this entry were wrong — the low-depth price location and what Low actually skips. The wording above is the corrected text; see 0.4.2.)* Separately, the **Verify (Deep)** description no longer advertises a fixed "8-model" pipeline. The count has drifted once already — it read "7-model" until a docs sweep corrected it — so the copy now says "multi-model" and leaves the stage names (research, debate, adjudication) to carry the specificity they were always the ones carrying.

  **0.4.0 has no npm release.** The version bump reached `main` but was never tagged, so nothing published it; everything described above shipped inside 0.4.1. npm goes 0.3.0 → 0.4.1.

* **0.4.1** — The input field on **Assess (Fast)** and on each **Verify (Batch)** item is now labelled **Claim** instead of **Text**, matching the API's vocabulary: a document is `text` (**Extract Claims** keeps that label), a claim is `claim`. Labels only: the parameter keys saved in your workflows are unchanged, and so is every request the node sends.

* **0.4.2** — Two corrections to what 0.4.x said about **Depth**, both of them wrong rather than merely unclear. The low-depth price was documented as appearing in `costs` under `verify_low`, with the advice to divide `credits.remaining` by it: that key does not exist — the API carries the four capability keys in `costs` and nothing else — so the suggested expression evaluated to `NaN`. The price is readable only at `cost_options.verify.depth.low`, which is where the docs now point. Separately, *Low* was described as searching fewer sources and skipping the recovery fetch tiers; it also stops the debate after the opening arguments, so a Low verdict has no rebuttal round and comes back with an empty `rebuttal` on its debate entries under **Include Audit Trail**. Every description of Depth in the node and the README now says so.

  It also carries two fixes that are behaviour, not wording. The `Idempotency-Key` was built from the node's **display name**, which is user-editable free text. Node refuses to send a header value containing anything above U+00FF, so a node named in Cyrillic, Greek, Hebrew, Arabic or any CJK script — or carrying an emoji — failed **every billable call** before the request left the machine, with an error naming the header rather than the node. Latin-1 names such as `Prüfung` and `Vérification` were never affected, despite what an earlier draft of this entry said. The identity is now *hashed* into the key rather than written into it, which makes the guarantee structural rather than an assumption about what the id contains; the node id is preferred, so a rename mid-execution no longer changes the key, and the name never reaches the wire.

  Separately, a `sources` value that was not a list — or a list containing `null` — threw while mapping the result, failing a verification that had already completed and been charged for. A `null` entry now costs that one citation; a `sources` that is not a list returns none at all, which is worth knowing if you branch on `citations.length`. No output field was removed or renamed. Two things changed on the wire: the `User-Agent` version, and the `Idempotency-Key` format.

  This release also adds a `pre-push` git hook that refuses to push agent commits which have not been reviewed. It only affects contributors, needs `git config core.hooksPath .githooks` once per clone, and never gates a human pushing by hand — see AGENTS.md.

* **0.5.0** — **Verify (Deep) no longer loses a verification you have already paid for.** Credits are debited the moment a submit is accepted, and the poll loop that waits for the verdict had no tolerance for a failed poll: one 502 or network blip on any of roughly fifteen polls threw straight out of the operation and took the `task_id` with it, leaving a verification that was charged for, still running server-side, and unreachable — not even **Get Verify Status** could fetch it back. Transient poll failures (5xx, 429, and the 408/425 an intervening proxy produces) are now retried for as long as the wait lasts, and a 429 waits the reopening time the API states rather than returning on the node's own cadence, which is what tripped the limiter to begin with. A failure carrying no HTTP status is treated differently on purpose — a DNS or TLS problem is indistinguishable from a bug or a bad credential, so it gets a small bounded number of attempts and is then surfaced as the error it is, rather than retried for the window and reported as a timeout, which would invent a fact. The `task_id` now rides every post-submit failure, on the error output and on the thrown error alike. The hardcoded 120-second deadline becomes **Max Wait (Seconds)**, validated and clamped before the claim is submitted — validated afterwards, a non-numeric expression got the claim charged and then threw an error with nowhere to carry the task id, which is the same bug by another route. Non-verdict terminals now carry `passed: null` so the key is visible in n8n's output schema; be aware that null is still falsy, so an **IF** node reading `{{ $json.passed }}` alone routes a timeout down the false arm exactly as before. Checking `status` first is the actual fix, and the README's gate pattern now leads with it — a provider outage reading as a debunking was the real bug. A timeout that ends on a failed poll names it in `last_error` and `last_error_status`, instead of reporting success-shaped JSON that implies the task was seen running. Alongside that, four correctness fixes a first external user would hit: **Get Many** duplicated and skipped rows above Limit 100 (#21), **Select Claims** collided two paused tasks that offered the same claim text onto one Idempotency-Key (#22), validation failures surfaced as API errors with no HTTP code (#23), and **Ask Follow-Up** sent no Idempotency-Key, so a retry appended a second question and answer to the stored conversation. No output field was removed or renamed.

* **0.6.0** — **Three changes reach a workflow you already have, as soon as you update.** First, **Max Wait (Seconds) defaults to 300, up from 120.** A real verification finished in Lenz with a verdict and the credits were taken while the node had already given up at 120 seconds and returned `timeout`; Lenz measures a standard-depth run at about 90 seconds median with the tail past 120, so this was not rare. Because n8n does not save a parameter left at its default, every Verify node that never set Max Wait picks up the new value. It is a ceiling, not a delay — a fast verification returns exactly as before — but it is per item, so a ten-item run can now block for up to fifty minutes instead of twenty; set Max Wait explicitly if a workflow runs under a short execution timeout. Second, `progress` loses `content` and `step_stats` (below). Third, the `clarification_required` and `duplicate_found` pauses are gone, since the API no longer returns them: `multi_claim` is the one `needs_input` reason left, `candidates` and `similar_claims` stay on the output but are always empty (a removal date announced in this entry has been withdrawn), and Assess reports an empty result as `no_claim` rather than `ambiguous`. No parameter was renamed or removed. **Rate limits (HTTP 429) now have proper handling.** They arrived as n8n's stock "Request failed with status code 429"; the message now names the limit, when it clears and that nothing was charged. The documented Wait-node recovery was being fed `undefined`, because the error output read a key a 429 does not carry — a short reset now arrives as `retry_after`, and one too long to sit in a workflow, like the `/extract` daily cap that clears at midnight UTC, arrives as `resets_in_seconds` so that a workflow already wired to the Wait loop fails fast instead of parking for most of a day. The advice also names the Wait unit, because n8n's Wait node defaults to Hours and a bare `{{ $json.retry_after }}` turned a 45-second limit into a 45-hour wait. A 429 from a proxy or CDN in front of Lenz is no longer reported as your plan being too small. And a rate-limited status poll no longer abandons a verification you have paid for: a daily-cap 429 on the first poll used to sleep the whole of Max Wait in one go and then report `timeout` for a verification that had finished minutes in. The README gains an **Updating** section and explains why `verification_url` on Assess is usually empty. The rest of this entry covers the `progress` change and the other poll-loop fixes. **What a mid-run poll hands your workflow is now a fixed list.** While a Verify (Deep) runs, **Get Verify Status** returns a `progress` object, and the node used to pass whatever the API put in it straight onto the item. That endpoint was inherited from the consumer progress page and nothing shaped it, so what came through included `content` — the accumulated evidence pool, with full untruncated source quotes and every panelist's reasoning — and `step_stats`, Lenz's own per-step cost in EUR. Neither was ever part of the contract. `progress` now carries `step`, `index`, `total`, `elapsed_seconds` and `poll_after_seconds`, and nothing else; anything the API adds in future stays out until it is added deliberately. **If you mapped `progress.content` or `progress.step_stats`, those fields are gone** — that is the change, not a side effect of it. A `processing` response that states `poll_after_seconds` is now honoured instead of the node's own 2/4/8s cadence, since the server knows which stage it is in and how long that stage runs; a value outside the sane range is ignored rather than clamped. Reviewing that change turned up a fault in the poll loop that predated it: the deadline was enforced by the loop condition, so a wait clamped to the deadline was followed by the loop ending rather than by one more read — a verification that finished during that last wait was reported as a timeout, sending you to fetch a verdict that had already arrived. The loop now always ends on a read. Separately, a correction that was costing money: a paused task stays open for **24 hours from submission**, not the 10 minutes the Selected Claims field and this README both claimed. Anyone who believed that resubmitted, and paid a second time, for a **Select Claims** that would still have worked.

* **0.7.0** — **Connect with your Lenz account instead of an API key.** A new **Lenz OAuth2 API** credential signs in with Lenz: **Connect my account**, sign in, **Allow**, and nothing to copy or paste. n8n registers itself with Lenz on that first connection, so there is no client ID, secret or redirect URL to set up, and any number of n8n instances and credentials can connect to the same Lenz account side by side — each its own connection, disconnected separately under **Connected apps**. It needs **n8n 2.12.0 or later**, and n8n's OAuth Redirect URL must be a public `https://` address or `http://localhost` — a self-hosted n8n behind an internal address sets `WEBHOOK_URL` to its real address first (see [Credentials](#credentials)); on an older n8n, use an API key. **Nothing changes for a workflow you already have.** The node gains version 1.2, and only a Lenz node added from now on starts on OAuth; a node already in a workflow keeps its API key, because n8n does not save a parameter left at its default and changing the default in place would have switched every existing node off its key. The choice between OAuth and API Key is in the credential window when you create a credential from a Lenz node; that is also how an existing node moves to OAuth. **Account → Get Webhook Secret** is new and is for OAuth connections: Lenz signs that connection's webhook deliveries with the secret it returns, creates it on that first call, and refuses a **Webhook URL** on an OAuth connection until then; a reconnected connection starts with no secret, so run **Get Webhook Secret** again before using a Webhook URL and check signatures with the secret it returns. Completed verifications now carry **`suggested_rewrite`**, a rewrite of the claim that the verification's findings support — not verified itself, so read it before using it — and an empty string when there is none. No parameter or output field was renamed or removed.

* **0.8.0** — **Review a whole draft, or just its citations.** A new **Review** resource:
  * **Review Draft** finds a draft's claims, quick-checks them, deep-checks the doubtful ones, optionally checks its citations (in a pasted text; a draft given as a URL checks none) and suggests edits. That is one call instead of an Extract → Assess → Verify chain.
  * **Check Citations** checks whether each cited source says what the text says it does, from a text with its links, DOIs or `[n]` markers, or from statement-source pairs.
  * **Get Review** and **Get Citation Check** fetch either by ID.

  A review takes two to four minutes, so **Max Wait** for both sits under **Options** and defaults to **600 seconds**. When it runs out the node returns the ID, and nothing is cancelled. Lenz runs at most three reviews, and three citation checks, at once per account. A fourth waits up to five minutes for a slot instead of failing at once; if none opens, that item fails with a message saying so, and nothing is charged for the wait. If an item fails for good, the error lists the jobs that earlier Verify (Deep), Review Draft and Check Citations items already started, so their IDs are not lost with the run.

  **A workflow you already have keeps working.** No parameter or output field was renamed or removed. Verify behaves exactly as before, now polling through the same loop as the new operations. A version 1.1 or 1.2 node simply gains the Review resource. An OAuth2 credential that was never connected now says to click **Connect my account** instead of showing n8n's signing error; with Continue On Fail, its error output carries `code: "oauth_not_connected"` and the new text.

## Maintainer

[@David19782](https://github.com/David19782)
