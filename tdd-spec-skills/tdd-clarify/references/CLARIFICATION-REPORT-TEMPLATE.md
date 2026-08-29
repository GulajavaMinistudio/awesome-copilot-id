# 🔍 TDD Clarification Report [Review Iteration {X}]

**Target Document:** {Document Path, e.g. docs/prd/prd-user-auth.md or /spec/spec-feature-orders.md}  
**Readiness Score:** {Score}/100  
**Status:** {Good Enough (>= 80) / Below Threshold (< 80)}

**Score Breakdown (Quality Gate Rubric):**
- **Completeness (max 40):** {Score} - {Reason regarding user stories, error states, and test seams}
- **Clarity & Testability (max 30):** {Score} - {Reason regarding concrete metrics and lack of subjective language}
- **Alignment & Constraints (max 30):** {Score} - {Reason regarding CONTEXT.md and CONSTRAINTS.md compliance}
- **Critical Flaw Veto:** {Triggered (Max 79) / None}

---

## 1. 🚨 Critical Findings (Untestable Blockers)
_List any remaining critical ambiguities or untestable constraints that must be resolved to reach the 80-point threshold. If none, write "None"._

- **Requirement / Section:** "{Quote exact text}"
  - **Testability Gap:** {Explain why this cannot be automatically verified in a RED test}
  - **Proposed Seam:** {Target public interface boundary}

## 2. 🧩 Resolved Items & Pre-Agreed Boundaries
_List the ambiguities, edge cases, and assumptions successfully resolved during this session through Heavy Lifting._

- **Original Ambiguity:** "{Quote exact text}"
  - **Resolution & Boundary:** {Agreed concrete metric, A/B choice, or BDD scenario}
  - **Target Seam:** {e.g. Unit: OrderService.validate() or Integration: POST /api/v1/orders}

## 3. ⚠️ Assumed / Auto-Resolved / Out of Scope (The 20% Tail)
_List minor edge cases or technical details that were automatically resolved using the AI's technical recommendations because the user chose to PROCEED._

- **Scenario / Question:** {Describe minor edge case}
  - **Handling:** `[Assumed / Auto-Resolved]` or `[Assumed / Out of Scope]` - {The AI's recommended technical resolution}

## 4. 📝 Next Steps
- If Score < 80: Author agent must remediate the document to resolve Section 1 blockers.
- If Score >= 80: Proceed to the next SDLC phase.
- If new canonical terms were agreed upon, update `CONTEXT.md`.
- If hard-to-reverse architectural decisions were made, document in `docs/adr/`.

---
> **User Decision Prompt:** (Only insert if Score >= 80 or Iterations >= 3)
> The document has achieved a Readiness Score of {Score}/100. It is testable and viable. Do you want to **PROCEED** to the next phase, or do you want to **REFINE** and clarify further?
