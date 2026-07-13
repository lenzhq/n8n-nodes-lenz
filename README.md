# n8n-nodes-lenz

This is an n8n community node. It lets you use **Lenz** in your n8n workflows.

**Lenz** is an audit-grade AI fact-checking API. It catches hallucinations and gives sourced, branch-ready verdicts on any claim or piece of text — not just a bare confidence score.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation, and search for `n8n-nodes-lenz` under **Settings → Community Nodes → Install**.

## Operations

| Operation | What it does |
|---|---|
| **Verify (Deep)** *(default)* | Full 8-model pipeline (research → debate → adjudication), ~90 seconds. Returns a verdict, confidence, `lenz_score` (1-10), sourced citations, and an executive summary. Reserve for high-stakes claims that need a thorough, cited answer. |
| **Assess (Fast)** | A quick 3-model panel verdict, ~5-10 seconds, one entry per claim identified in the input text. Good default for lower-stakes checks. |
| **Extract Claims** | Free — pulls the verifiable factual claims out of a block of text without checking them. Useful as a first step before running Assess or Verify on each claim individually. |
| **Ask Follow-Up** | Asks a question grounded in the full research behind a completed **Verify (Deep)** result. Requires the `verification_id` that Verify returns — not usable standalone. |
| **Check Usage** | Returns remaining quota per capability (`assess` / `verify` / `ask`), current plan, and when quota resets. |

Every claim-checking operation returns a branch-ready `passed` boolean (derived from the verdict) alongside the raw verdict/confidence/citations, so you can wire an **IF** node directly off the result — e.g. route failed claims to human review.

## Credentials

You'll need a free Lenz API key:

1. Sign up at [lenz.io/api-integration](https://lenz.io/api-integration) to get a key (starts with `lenz_`).
2. In n8n, add new credentials of type **Lenz API**, paste the key, and click **Test** to confirm it's valid.

## Compatibility

Built against `n8n-workflow` (n8n API version 1) and tested against n8n v2.29.x. No known version incompatibilities.

## Usage

- **Verify (Deep) takes ~90 seconds** — it's the full multi-model pipeline, not an instant call. The node blocks/polls until the result is ready, so no separate polling setup is needed on your end.
- To feed data from a previous node instead of a fixed value, toggle a field to **Expression** and reference it, e.g. `{{ $json.output }}`.
- For **Ask Follow-Up**, keep the Question field as a fixed, generic string (e.g. `"What are the main sources supporting this verdict?"`) and only make the Verification ID dynamic via expression — that way the same follow-up question works for whatever claim was just verified.
- The node is `usableAsTool`, so it can also be called directly by an n8n **AI Agent** as a tool, not just as a manual workflow step.

New to n8n? See the [Try it out](https://docs.n8n.io/try-it-out/) documentation to get started with the basics first.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Lenz API documentation](https://lenz.io/developers)
* [lenz-io Node SDK](https://github.com/lenzhq/lenz-io-node) (this node is a thin wrapper around it)

## Version history

* **0.1.0** — Initial release. Verify (Deep), Assess (Fast), Extract Claims, Ask Follow-Up, and Check Usage operations; API-key credential with live test endpoint.
