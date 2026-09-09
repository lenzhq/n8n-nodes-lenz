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
<!-- END GENERATED -->

## Choosing the operation

This is the part that actually decides whether the workflow is useful.

**`assess`** — a 3-model panel verdict in ~5–10 seconds. The default for
anything high-volume or low-stakes: moderating user posts, checking a batch of
marketing lines, screening LLM output before it goes to a human reviewer.

**`verify`** — the full 8-model pipeline (research → debate → adjudication) in
**~90 seconds**. Worth it when a wrong answer is expensive and someone will want
to see the reasoning: publishing, legal or medical copy, anything a customer
sees unedited. It returns citations, an executive summary, and a `verification_id`
you can ask follow-up questions about. Do not put a `verify` on a path that
needs to respond quickly — 90 seconds is a long time inside a webhook.

**`extract`** — free, and does not check anything. It pulls the verifiable
claims out of a block of text, as plain strings.

**You almost never need it before `assess`.** `assess` already finds the claims
in whatever text you hand it and returns one entry per claim, so
`extract → assess` does the same work twice and costs the same either way.
Reach for `extract` only when something happens BETWEEN finding the claims and
checking them: showing a user what would be checked and letting them choose,
filtering or deduplicating the list, storing it, or checking a subset. If
nothing happens in between, send the text straight to `assess`.

Billing note that changes workflow design: **`assess` bills per claim found in
the text, not per request.** A paragraph containing five claims costs five
assess units. If you are looping over many rows, mention this.

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
name from `assess`, with a different status value:

```
{ status: "ready", identified_claims: [ "Claim A", "Claim B" ], domain: "General" }
```

Read that carefully before wiring it: the field is `identified_claims`, not
`claims`; the entries are strings, not objects, so there is no `.claim`,
`.passed` or `.verdict` on them; and the status is `"ready"`, not `"ok"`.

**The trap that will not show up in your testing:** when the text contains
exactly ONE claim, `identified_claims` is `[]` and the claim is in `claim`
instead. Split Out on `identified_claims` therefore yields ZERO items for
single-claim input — the workflow looks right on a multi-claim paragraph and
silently processes nothing on the one-line message it meets in production. So
never Split Out that field raw. Coalesce first, with a **Code** node returning
`identified_claims.length ? identified_claims : [claim]` as items, and Split Out
the result of that.

Empty input returns `{ skipped: true, reason: "empty_input" }` instead of
failing the batch, so nothing downstream sees either field — branch on `skipped`
if the input can be blank.

## Wiring patterns

**The gate.** Lenz → **IF** → true continues, false routes to review:

```
[source] → [Lenz: assess] → [Split Out: claims] → [IF: {{ $json.passed }}]
                                                     ├─ true  → continue
                                                     └─ false → human review
```

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
   will cost in time — 90 seconds each, serially.
5. Prefer the smallest workflow that does the job. Every node I did not ask for
   is one I have to understand before I can trust the result. Smallest does not
   mean unfinished — see rule 6, which outranks this one.
6. **Route on the verdict, or the workflow is not finished.** The whole point is
   that a failed claim goes somewhere different from a passing one. Every
   workflow ends in a branch on `{{ $json.passed }}` — after a **Split Out** on
   `claims` for `assess`, or directly for `verify` — and BOTH sides of that
   branch lead to a node that does something. A workflow that computes a verdict
   and stops, or that leaves the false branch empty, has done the expensive part
   and thrown the answer away. Checking `status` is not this: `status` tells you
   whether there was anything to check, `passed` tells you the answer.

## Before you answer

Read your own JSON back and confirm all five. If one fails, fix it rather than
noting it:

1. Is there an **IF** on `{{ $json.passed }}`, with both branches leading
   somewhere? (rule 6)
2. Does every field name you read appear in "Output shapes" for the operation
   that produced it — `claims` for `assess`, `identified_claims` for `extract`?
   You may not read a field that is not documented there.
3. Is every `type`, `resource` and `operation` copied exactly from the table?
4. Is the `credentials` block absent from every node?
5. Does the JSON parse, with every `connections` entry closed?
