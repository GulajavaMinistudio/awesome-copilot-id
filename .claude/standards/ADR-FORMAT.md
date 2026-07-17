# ADR (Architecture Decision Record) Format

ADRs live in `docs/adr/` and serve as the project's architectural memory.

## AI Protocol (Operational Instructions)

1. **Lazy Creation:** Create the `docs/adr/` directory ONLY when the first ADR is needed.
2. **Numbering:** Scan `docs/adr/` for the highest existing number and increment by one (e.g., `0001`, `0002`). Name files: `NNNN-slug.md`.
3. **Validation:** Before drafting, verify the decision meets **all three** criteria:
   - **Hard to reverse:** Cost of changing mind is meaningful.
   - **Surprising without context:** A reader will wonder "why on earth did they do it this way?"
   - **Real trade-off:** There were distinct alternatives and you picked one for specific reasons.
   *If a decision is easy to reverse or obvious, skip the ADR.*
4. **Terminology Compliance:** You **MUST** strictly use the terminology defined in the project's `CONTEXT.md` (Domain Glossary) when writing the ADR. Do not introduce synonyms or generic terms for established domain concepts.

## Mandatory Template

```md
# {Sequential-Number} - {Short title of the decision}

**Date:** {YYYY-MM-DD}  
**Status:** {Proposed | Accepted | Deprecated | Superseded by ADR-NNNN}  

## Context
{1-3 sentences: Explain the problem, the context, and the constraints. Why do we need to make this decision?}

## Decision
{1-2 sentences: What did we explicitly decide to do or not do?}

## Consequences
{1-2 sentences: What are the non-obvious downstream effects or trade-offs we are accepting?}
```

*Note: While the template provides structure, keep the content as concise as possible. The value is in recording **that** a decision was made and **why**, not in writing a novel.*

## Optional Sections

Only include these when they add genuine value:

- **Considered Options:** Only list rejected alternatives if the rejection reason is non-obvious and worth remembering.

## When to offer an ADR

If any of the three criteria (Hard to reverse, Surprising, Real trade-off) is missing, skip the ADR. If there was no real alternative, there's nothing to record beyond "we did the obvious thing."

## What Qualifies for an ADR

- **Architectural shape:** e.g., monorepo, event-sourced write models
- **Integration patterns between contexts:** e.g., domain events vs synchronous HTTP
- **Technology choices that carry lock-in:** Database, message bus, auth provider, deployment target — not every library, just the ones that would take a quarter to swap out
- **Boundary and scope decisions:** "Customer data is owned by the Customer context; other contexts reference it by ID only." The explicit no-s are as valuable as the yes-s
- **Deliberate deviations from the obvious path:** "We're using manual SQL instead of an ORM because X." Anything where a reasonable reader would assume the opposite. These stop the next engineer from "fixing" something that was deliberate
- **Constraints not visible in the code:** "We can't use AWS because of compliance requirements." "Response times must be under 200ms because of the partner API contract."
- **Rejected alternatives when the rejection is non-obvious:** If you considered GraphQL and picked REST for subtle reasons, record it — otherwise someone will suggest GraphQL again in six months
