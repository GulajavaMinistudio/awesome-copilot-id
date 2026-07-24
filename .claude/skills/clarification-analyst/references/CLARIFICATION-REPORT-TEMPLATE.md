# Clarification Report: {Project/Feature Name}

All clarification reports must use this Markdown format. This is generated as a FINAL SUMMARY after the Grill Session concludes.

## 1. 🚨 Resolved Critical Ambiguities (Blockers)

_List the requirements that were initially ambiguous and how they were resolved during our session._

- **Requirement:** "{Quote the exact text from the document}" (ID: {Ref ID})
  - **Resolution:** {Explain the agreed-upon concrete definition/metric}

## 2. 🧩 Addressed Edge Cases & Unhandled Scenarios

_List the extreme scenarios we discussed and their planned handling._

- **Scenario:** {Describe the edge case}
  - **Handling Strategy:** {How the system will respond based on user's answer}

## 3. 🔍 Validated Implicit Assumptions

_List the technical or business assumptions we validated._

- **Assumption:** {Describe the assumption}
  - **Validation:** {The definitive constraint agreed upon}

## 4. 📝 Next Steps

- The PRD document (e.g., `prd-*.md`), related specification, or implementation plan **MUST** be updated with these resolutions before proceeding to the next execution step.
- If new canonical business terms were agreed upon during the session, the Agent MUST offer to create or update the relevant Domain Glossary (via root `CONTEXT.md` or `CONTEXT-MAP.md`).
- If architectural decisions were made that are (1) hard to reverse, (2) surprising, and (3) a real trade-off, the Agent MUST offer to document this in an Architecture Decision Record (ADR) under `docs/adr/`.
