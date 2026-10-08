# CONTEXT.md Format

This file acts as the project's Ubiquitous Language (Glossary). It defines terminology to prevent ambiguity across the codebase and documentation.

## AI Protocol (Operational Instructions)

1. **Scope Detection:**
   - Check for `CONTEXT-MAP.md` at root. If exists, follow map to find the relevant context folder.
   - If no map, use root `CONTEXT.md`.
2. **Lazy Creation:** Only create or update this file when a domain term is explicitly resolved or clarified during a session. Never pre-populate.
3. **Be Opinionated:** If multiple terms exist for one concept, pick the best one and list others under `_Avoid_`.
4. **Validation:**
   - Keep definitions tight (1-2 sentences max).
   - Ensure NO implementation details creep in — this is a glossary, not a technical spec.

## Mandatory Template

```md
# {Context Name}

{One or two sentence description of what this context is and why it exists.}

## Language

**{Canonical Term}**:
{A one or two sentence description of the term. Define what it IS, not what it does.}
_Avoid_: {Synonym 1}, {Synonym 2}

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request

**Customer**:
A person or organization that places orders.
_Avoid_: Client, buyer, account
```

## Rules

- **Be opinionated.** When multiple words exist for the same concept, pick the best one and list the others under `_Avoid_`.
- **Strict Avoid Syntax:** You MUST format rejected synonyms exactly as `_Avoid_: {Synonym}` (italicized with an underscore, followed by a colon). Do not use `**Avoid:**` or `*Avoid:*`. This strict formatting is required for automated regex parsing by the ArtifactConsistencyChecker.
- **Acronym Handling:** Use the spelled-out, full name as the Canonical Term unless the acronym is universally used in the industry (e.g., API). Place the acronym inside the definition. Do NOT create duplicate entries for an acronym and its full name.
- **Direct Overwrites:** If a domain term's definition evolves during the project, overwrite the existing definition directly. Do not keep a history or changelog inside this file.
- **Keep definitions tight.** One or two sentences max. Define what it IS, not what it does.
- **Exclude generic concepts.** Only include terms specific to this project's business context. General programming concepts (timeouts, error types, utility patterns) don't belong. Before adding a term, ask: is this a concept unique to this context, or a general programming concept? Only the former belongs.
- **Group terms under subheadings** when natural clusters emerge. If all terms belong to a single cohesive area, a flat list is fine.
- **No implementation details.** This is a glossary, not a scratch pad for code or architectural decisions.

## Single vs Multi-context Repos

**Single context (most repos):** One `CONTEXT.md` at the repo root.

**Multiple contexts:** A `CONTEXT-MAP.md` at the repo root lists the contexts, where they live, and how they relate to each other:

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md) — receives and tracks customer orders
- [Billing](./src/billing/CONTEXT.md) — generates invoices and processes payments
- [Fulfillment](./src/fulfillment/CONTEXT.md) — manages warehouse picking and shipping

## Relationships

- **Ordering → Fulfillment**: Ordering emits `OrderPlaced` events; Fulfillment consumes them to start picking
- **Fulfillment → Billing**: Fulfillment emits `ShipmentDispatched` events; Billing consumes them to generate invoices
- **Ordering ↔ Billing**: Shared types for `CustomerId` and `Money`
```

The skill infers which structure applies:

- If `CONTEXT-MAP.md` exists, read it to find contexts
- If only a root `CONTEXT.md` exists, single context
- If neither exists, create a root `CONTEXT.md` lazily when the first term is resolved

When multiple contexts exist, infer which one the current topic relates to. If unclear, ask.
