# Build me a Lenz fact-checking workflow for n8n

You are building an **n8n workflow** that uses the Lenz node to fact-check text.
I will describe what I want checked. You produce a workflow JSON that I paste
directly onto my n8n canvas.

Lenz checks factual claims against independent sources and returns a verdict, a
confidence, the citations behind it, and a ready-to-branch `passed` boolean.

## How to deliver the result

Output **one JSON code block** containing the whole workflow, then a short list
of what I need to do after pasting (pick the credential, set any expression I
should adjust). Nothing else — no step-by-step UI instructions, no screenshots.

I paste it by clicking anywhere on the n8n canvas and pressing **Ctrl+V**
(**Cmd+V** on Mac). n8n turns pasted workflow JSON into wired nodes. This works
on n8n Cloud and self-hosted alike.

If what I asked for is ambiguous in a way that changes the workflow's shape —
not its wording — ask **one** question first. Otherwise just build it and state
your assumptions in one line underneath.

<!-- BEGIN GENERATED: node-facts -->

| Field | Value |
|---|---|
| Node type | `n8n-nodes-lenz.lenz` |
| `typeVersion` | `1.1` |
| Credential type | `lenzApi` — **omit the `credentials` block entirely** (see rules) |
| Inputs / outputs | 1 main in, 1 main out |

Generated from `n8n-nodes-lenz`. Do not hand-edit.

### `resource: "claim"` — Claim

| `operation` | What it does | Parameters |
|---|---|---|
| `assess` | Fast 3-model panel verdict (~10s), one entry per claim found in the text | `text`**\***, `language` |
| `extract` | Pull verifiable claims out of text. Free, capped at 1000 calls per account per day, shared across your API keys (resets 00:00 UTC). | `text`**\***, `focus`, `language` |
| `verify` | Multi-model pipeline with sourced citations (~90s). Reserve for high-stakes claims. | `claim`**\***, `waitForCompletion`, `maxWaitSeconds`, `includeAudit`, `sourceUrl`, `webhookUrl`, `visibility`, `depth`, `language` |

### `resource: "verification"` — Verification

| `operation` | What it does | Parameters |
|---|---|---|
| `deleteVerification` | Permanently delete a stored verification | `verificationId`**\*** |
| `getVerification` | Retrieve a stored verification report by its ID | `verificationId`**\***, `includeAudit` |
| `listVerifications` | Retrieve the verifications stored against this API key | `returnAll`, `limit` |
| `verifyStatus` | Poll a submitted verification task by its task ID | `taskId`**\***, `includeAudit` |
| `listRelated` | Retrieve public verifications semantically related to a given one | `verificationId`**\***, `relatedLimit` |
| `select` | Resolve a needs-input interrupt by picking which offered claims to verify | `taskId`**\***, `selectedClaims`**\*** |
| `verifyBatch` | Submit up to 20 claims for deep verification at once, without waiting | `batchClaims`, `webhookUrl`, `visibility`, `depth`, `language` |

### `resource: "askResource"` — Ask

| `operation` | What it does | Parameters |
|---|---|---|
| `askHistory` | Retrieve the follow-up conversation and remaining follow-up questions | `verificationId`**\*** |
| `resetAsk` | Delete the follow-up conversation stored for a verification | `verificationId`**\*** |
| `ask` | Ask a grounded follow-up question about a completed Verify (Deep) result | `verificationId`**\***, `question`**\***, `language` |

### `resource: "account"` — Account

| `operation` | What it does | Parameters |
|---|---|---|
| `usage` | Check your account credit balance, what each operation costs, and when credits reset. Credits are per account, shared across your API keys. | — |

`*` = required. Parameters not listed for an operation are not shown by the node and
must not appear in the workflow JSON for it.

<!-- END GENERATED -->

## Choosing the operation

This is the part that actually decides whether the workflow is useful.

**`assess`** — a 3-model panel verdict. The default for anything high-volume or
low-stakes: moderating user posts, checking a batch of marketing lines,
screening LLM output before it goes to a human reviewer. Timings are in the
table above; take them from there rather than from this prose, which cannot be
regenerated when the node changes.

**`verify`** — the full multi-model pipeline (research → debate → adjudication).
Worth it when a wrong answer is expensive and someone will want to see the
reasoning: publishing, legal or medical copy, anything a customer sees unedited.
It returns citations, an executive summary, and a `verification_id` you can ask
follow-up questions about. Do not put a `verify` on a path that needs to respond
quickly — it is the slowest thing here by two orders of magnitude, which is a
long time inside a webhook. It also gives up if the pipeline overruns, returning
`status: "timeout"` rather than a verdict; see the branching rule below.

**`extract`** — free, and does not check anything. It pulls the verifiable
claims out of a block of text, as plain strings.

**For a paragraph, you usually do not need it before `assess`.** `assess`
already finds the claims in whatever text you hand it and returns one entry per
claim, so on short text `extract → assess` does the same work twice and costs
the same either way. Reach for it when something happens BETWEEN finding the
claims and checking them: showing a user what would be checked and letting them
choose, filtering or deduplicating the list, storing it, or checking a subset.

**For a document, `extract` first is the designed path, not a redundancy.**
`assess` truncates a single text at 10,000 characters and says nothing about
having done so — the claims past the cut are silently never checked. `extract`
accepts 50,000. So anything article- or transcript-sized goes to `extract`,
then its claims to `assess`; one `extract` output is one `assess` call. Sending
a long document straight to `assess` is the silently-lossy option.

Billing note that changes workflow design: **`assess` bills per claim found in
the text, not per request.** A paragraph containing five claims costs five
assess units. If you are looping over many rows, mention this.

Two parameters change the result rather than just the request, so do not set
either one silently:

- **`depth: "low"` on `verify` halves the credits** — it searches fewer sources,
  skips the recovery fetch tiers and shortens the debate. That is a real
  reduction in evidence, not a free discount, so pick it only for a
  lower-stakes path and say that you did. (A low request answered from an
  existing standard verdict still costs the same as low and comes back marked
  standard.)
- **`focus` on `extract`** narrows the result to the claims it describes. It
  only selects among the claims the extractor already found — it cannot add
  one or reword one — and when nothing matches you get `status: "no_match"`
  and an empty list rather than the unfocused claims.

## Where the check belongs

Immediately after whatever step produces text a person will act on, and
immediately before the step that acts on it. A fact-check that runs after the
message is sent is decoration.

## Output shapes — these differ, and it matters for wiring

**`verify`** returns one item with the verdict at the top level:

```
{ status: "completed", passed: true, verdict: "True", confidence: ...,
  lenz_score: 1-10, key_finding: "...", citations: [...], verification_id: "..." }
```

Branch on `{{ $json.passed }}`.

**`assess`** returns **one item containing every claim it found**:

```
{ status: "ok", claims: [ { claim, verdict, confidence, passed, verification_url }, ... ] }
```

So `{{ $json.claims[0].passed }}` only looks at the first claim. If the text can
contain several claims and each should be routed on its own, insert a **Split
Out** node on the field `claims` after the Lenz node, then branch on
`{{ $json.passed }}`. If you only care whether *everything* passed, use a Code
or Filter node over `claims` instead. Choose deliberately and say which you chose.

`assess` can also return `status: "no_claim"` or `status: "ambiguous"` with
`candidate_claims` — there was nothing checkable in the text. Handle it rather
than letting it fall through the `passed` branch as a silent false.

**`extract`** returns the claims as **plain strings**, under a different field
name from `assess`, with a different set of status values:

```
{ status: "ready",       identified_claims: [ "Claim A", "Claim B" ], claim: "…", domain: "General" }
{ status: "not_a_claim", identified_claims: [], claim: "" }
{ status: "no_match",    identified_claims: [], claim: "", message: "…" }
```

Read that carefully before wiring it: the field is `identified_claims`, not
`claims`; the entries are strings, not objects, so there is no `.claim`,
`.passed` or `.verdict` on them; and the status is `"ready"`, not `"ok"`.

`not_a_claim` means there was nothing checkable in the text. `no_match` means a
`focus` was given and nothing matched it — the unfocused claims are NOT
substituted. In both, `identified_claims` is `[]` **and `claim` is the empty
string**.

**The trap that will not show up in your testing:** when the text contains
exactly ONE claim, `status` is `"ready"` but `identified_claims` is `[]` and the
claim is in `claim` instead. Split Out on `identified_claims` therefore yields
ZERO items for single-claim input — the workflow looks right on a multi-claim
paragraph and silently processes nothing on the one-line message it meets in
production. So never Split Out that field raw.

Gate on the status first, then coalesce. A **Code** node (Run Once for All
Items) that reads the input explicitly and returns properly-shaped items:

```javascript
const out = [];
for (const item of $input.all()) {
  const { status, identified_claims = [], claim = '' } = item.json;
  if (status !== 'ready') continue;              // not_a_claim / no_match
  const texts = identified_claims.length ? identified_claims : (claim ? [claim] : []);
  for (const text of texts) out.push({ json: { text } });
}
return out;
```

That emits one item per claim, so there is **nothing left to Split Out** — wire
it straight into the next Lenz node. Do not add a Split Out after it. Two
reasons the guard matters: a Code node must return `[{ json: … }]` (an array of
bare strings throws "Code doesn't return items properly"), and without the
`status`/`claim` check the empty string becomes an item, which the next node
answers with `{ skipped: true, reason: "empty_input" }` — a processed item that
checked nothing, which is the failure this whole section exists to prevent.

Empty input returns `{ skipped: true, reason: "empty_input" }` instead of
failing the batch, so nothing downstream sees either field — branch on `skipped`
if the input can be blank.

## Wiring patterns

**The gate.** Lenz → status filter → **IF** → true continues, false routes to
review:

```
[source] → [Lenz: assess] → [IF: {{ $json.status }} equals "ok"]
                               ├─ false → nothing checkable → its own path
                               └─ true  → [Split Out: claims] → [IF: {{ $json.passed }}]
                                                                   ├─ true  → continue
                                                                   └─ false → human review
```

The status filter is not optional padding. When `assess` finds nothing it
returns `no_claim` or `ambiguous` **with no `claims` key at all**, and Split Out
throws on a missing field — so without the first IF that item fails the whole
execution rather than routing anywhere.

**Ambiguous input (verify only).** `verify` pauses instead of guessing when the
text is not one unambiguous claim: `status: "needs_input"` with a `reason` of
`multi_claim`, `clarification_required`, or `duplicate_found`. The first two are
resolved by feeding the chosen claim text into `resource: "verification"`,
`operation: "select"` with the same `taskId`. Only add this branch if the input
is genuinely freeform — for a single known claim it is noise.

**Capacity refusals.** Lenz can refuse a submit with HTTP 503 when it is at
capacity, stating a wait of roughly 90–120 seconds. Do not solve this with
**Retry On Fail** — its tries are spaced seconds apart, so they all land inside
the wait and re-send the submit each time. If the workflow must survive this,
set the Lenz node's **On Error** to *Continue (using error output)* and send the
error output into a **Wait** node set to `{{ $json.retry_after }}` seconds, then
loop back into the Lenz node. Only add this to unattended/scheduled workflows;
for an interactive one, let it fail.

## Workflow JSON shape

```json
{
  "name": "Fact-check before publishing",
  "nodes": [
    {
      "parameters": {},
      "id": "a1",
      "name": "Start",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [0, 0]
    },
    {
      "parameters": {
        "resource": "claim",
        "operation": "assess",
        "text": "={{ $json.text }}"
      },
      "id": "a2",
      "name": "Lenz",
      "type": "n8n-nodes-lenz.lenz",
      "typeVersion": 1.1,
      "position": [220, 0]
    }
  ],
  "connections": {
    "Start": { "main": [[{ "node": "Lenz", "type": "main", "index": 0 }]] }
  }
}
```

- `connections` is keyed by the **node's `name`**, not its id.
- `id` can be any string, unique within the workflow.
- `position` is `[x, y]`; space nodes about 220px apart so the result is readable.
- An expression goes in as a string starting with `=`, e.g. `"={{ $json.text }}"`.
  A literal value has no `=`.

## Rules

1. **Omit the `credentials` block.** You cannot know my credential's ID, and a
   made-up one pastes as a broken reference. Left out, n8n shows a dropdown and
   I pick mine in one click. Tell me to do that.
2. **Use the exact strings in the table above.** A `type`, `resource`, or
   `operation` value that is close but wrong pastes as a broken node with no
   indication of which string was wrong.
3. **Do not invent parameters.** If a parameter is not listed for that
   operation, the node does not show it and it does nothing.
4. **Do not add a `verify` to a high-volume loop** without telling me what it
   will cost in time — see the table, and remember they run serially.
5. Prefer the smallest workflow that does the job. Every node I did not ask for
   is one I have to understand before I can trust the result. Smallest does not
   mean unfinished — see rule 6, which outranks this one.
6. **If the workflow produces a verdict, route on it, or it is not finished.**
   The whole point is that a failed claim goes somewhere different from a
   passing one. So a workflow whose last Lenz call is `assess` or `verify` ends
   in a branch on `{{ $json.passed }}` — after a **Split Out** on `claims` for
   `assess`, or directly for `verify` — and BOTH sides lead to a node that does
   something. Computing a verdict and stopping, or leaving the false branch
   empty, does the expensive part and throws the answer away.

   Two limits on this rule, both of which matter more than the rule:

   - **Only `assess` and `verify` emit `passed`.** `extract`, `verifyBatch`,
     `ask`, `usage`, `select`, the `verifyStatus` poll and every list or delete
     operation do not. Do not put an IF on `passed` after one of those — the
     field is `undefined` and every item takes the false branch. A workflow that
     ends in "list my verifications" is finished when it has listed them.
   - **Check `status` BEFORE `passed`, never instead of it.** `passed` is only
     meaningful once you know a verdict exists. `assess` returns `no_claim` or
     `ambiguous` with no `claims` array at all, and `verify` returns
     `needs_input`, `failed`, `timeout` or `queued` whose `passed` is `null`
     (`queued` omits it entirely). Null is falsy, so branching straight on
     `passed` reports every one of those as "the claim is false" — a provider
     outage becomes a debunking. Gate on `status` first, route the non-verdict
     statuses somewhere of their own, and only then branch on `passed`.

## Before you answer

Read your own JSON back and confirm all five. If one fails, fix it rather than
noting it:

1. If the last Lenz call is `assess` or `verify`: is `status` checked before
   `passed`, and is there an **IF** on `{{ $json.passed }}` with both branches
   leading somewhere? If it is any other operation, skip this. (rule 6)
2. For the operations documented under "Output shapes", are you reading the
   field names given there — `claims` for `assess`, `identified_claims` for
   `extract` — rather than the other one's? That section is not a complete
   field list for every operation, so a field it does not mention is not
   forbidden; but where it does specify the shape, match it exactly.
3. Is every `type`, `resource` and `operation` copied exactly from the table?
4. Is the `credentials` block absent from every node?
5. Does the JSON parse, with every `connections` entry closed?
