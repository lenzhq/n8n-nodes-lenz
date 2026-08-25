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
claims out of a block of text. Use it when the input is a paragraph and you want
to check claims individually, or to show a user what *would* be checked before
spending anything.

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
   is one I have to understand before I can trust the result.
