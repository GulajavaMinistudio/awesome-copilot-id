---
name: grilling
description: "Grill the user relentlessly about a plan or design. Use when the user wants to stress-test a plan before building, or uses any 'grill' trigger phrases."
license: MIT
---

<!-- markdownlint-disable -->

# Grilling Skill

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing. Asking multiple questions at once is bewildering.

If a _fact_ can be found by exploring the codebase, look it up rather than asking me. The _decisions_, though, are mine — put each one to me and wait for my answer.

## Domain Glossary & Architectural Decision Rules

During the grilling session, you MUST actively apply the project's documentation standards:

1. **Domain Glossary Integration:**
   If a question resolves ambiguous business terms or introduces new domain entities:
   - Apply **Scope Detection** (check for `CONTEXT-MAP.md` at root first; follow the map to the correct directory, or use root `CONTEXT.md`).
   - Offer to update the glossary **lazily** and immediately.
   - Record the chosen canonical term and list rejected synonyms under `_Avoid_` as defined in `.agents/standards/CONTEXT-FORMAT.md`.

2. **Architecture Decision Records (ADRs):**
   If a decision is a "hard-to-reverse" architectural choice:
   - Verify it meets **all three** criteria from `.agents/standards/ADR-FORMAT.md`: (1) Hard to reverse, (2) Surprising without context, (3) Real trade-off.
   - If it does, document it **lazily** as an ADR under `docs/adr/` using the format defined in `.agents/standards/ADR-FORMAT.md`. Do not embed the ADR in other documents.

Do not enact the plan until I confirm we have reached a shared understanding.

