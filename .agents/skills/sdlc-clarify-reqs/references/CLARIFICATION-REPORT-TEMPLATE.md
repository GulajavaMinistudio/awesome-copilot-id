# 🔍 Clarification Report [Review Iteration {X}]

**Readiness Score:** {Score}/100
**Status:** {Good Enough / Below Threshold}

**Score Breakdown:**

- **Completeness (max 40):** {Score} - {Reason}
- **Clarity (max 30):** {Score} - {Reason}
- **Alignment (max 30):** {Score} - {Reason}
- **Critical Flaw Veto:** {Yes/No} - {Explain if triggered, otherwise "None"}

---

## 1. 🚨 Critical Findings (Blockers)

_List any remaining critical ambiguities or blocking issues that must be fixed to reach the 80-point threshold. If none, write "None"._

- **Requirement:** "{Quote exact text}"
  - **Issue:** {Explain why this is blocking}

## 2. 🧩 Resolved Items & Agreements

_List the ambiguities and edge cases that were successfully resolved during this session._

- **Requirement:** "{Quote exact text}"
  - **Resolution:** {Explain the agreed-upon handling}

## 3. ⚠️ Assumed / Auto-Resolved / Out of Scope (The 20% we skip)

_List extreme edge cases, unknown details, or remaining questions that were automatically resolved by the AI's "Heavy Lifting" recommendation because the user chose to PROCEED._

- **Scenario / Question:** {Describe the edge case / unasked question}
  - **Handling:** `[Assumed / Auto-Resolved]` or `[Assumed / Out of Scope]` - {Brief reason / The AI's technical recommendation}

## 4. 📝 Next Steps

- The upstream document (PRD/Spec/Plan) MUST be updated with these resolutions (by the respective author agent) if the score is below 80.
- If new canonical business terms were agreed upon, update the Domain Glossary (`CONTEXT.md`).
- If architectural decisions were made, document them as an ADR under `docs/adr/`.

---
> **User Decision Prompt:** (Only insert this block if Score >= 80 or Iteration >= 3)
> The document has achieved a Readiness Score of {Score}/100. It is ready for the next phase. Do you want to **PROCEED** to the next phase, or do you want to **REFINE** and clarify further?
