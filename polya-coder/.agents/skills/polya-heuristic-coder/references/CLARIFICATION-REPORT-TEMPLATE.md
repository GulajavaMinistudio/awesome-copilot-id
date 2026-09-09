# 🔍 Clarification Report [Review Iteration {X}]

**Target Document:** `[{slug}-spec.md / {slug}-plan.md]`  
**Readiness Score:** **{Score} / 100**  
**Status:** **{Ready to Proceed (Score >= 80) / Refine Required (Score < 80)}**  

---
<!-- markdownlint-disable-->

## 📊 Score Breakdown (Quality Gate Rubric)

- **Completeness (max 40 pts):** `{Score}` / 40  
  *Rationale:* {Are Unknown, Data, Condition, and all Clean Architecture seams explicitly documented?}
- **Clarity (max 30 pts):** `{Score}` / 30  
  *Rationale:* {Is fuzzy language eliminated? Are contracts strictly typed with no ambiguous terms?}
- **Alignment (max 30 pts):** `{Score}` / 30  
  *Rationale:* {Does vocabulary strictly match `CONTEXT.md`? Are architectural decisions compliant with `docs/adr/`?}
- **Critical Flaw Veto:** `{Triggered / None}`  
  *(Note: If triggered, maximum allowable score is capped at 79 regardless of weighted points).*

---

## 1. 🚨 Critical Findings & Blocking Gaps

*Ambiguities, contradictions, or missing conditions that must be addressed:*

- **Condition / Requirement:** "{Quote exact text from document}"
  - **The Flaw:** {Explain why this condition is insufficient, redundant, or contradictory}
  - **Architectural Impact:** {Why this would cause rework or bugs during implementation}

---

## 2. 🧩 Resolved Items & Agreements (The "Grill Me" Log)

*Decisions made during Socratic interrogation with concrete A/B technical choices:*

- **Item 1:** {Topic of interrogation, e.g., Session expiration handling}
  - **Proposed Options:**
    - Option A: {Technical alternative A}
    - Option B: {Technical alternative B}
  - **Engineering Recommendation:** {Option chosen and why}
  - **Agreed Decision:** {User confirmed decision}

---

## 3. ⚠️ Assumed / Auto-Resolved / Out of Scope (The 20% We Skip)

*Edge cases and secondary details resolved automatically to maintain forward momentum:*

- **Scenario / Constraint:** {Description of non-critical edge case}
  - **Resolution:** `[Assumed / Auto-Resolved]` - {AI technical recommendation applied}

---

## 4. 📚 Domain Glossary (`CONTEXT.md`) & ADR Alignment

- **Domain Glossary Updates:** {New business terms added or updated with strict `_Avoid_` syntax, or "None"}
- **ADRs Required:** {High-impact decisions meeting Triple-Gate validation to be stored in `docs/adr/`, or "None"}

---

## 5. 📝 Next Actions

- [If Score < 80]: Update upstream Specification or Plan before proceeding.
- [If Score >= 80]: Proceed to next SDLC phase.

---

> **User Decision Prompt:** (Mandatory when Score >= 80 or Iteration >= 3)  
> *The document has achieved a Readiness Score of **{Score}/100**. It is ready for the next phase. Do you want to **PROCEED** to the next phase, or do you want to **REFINE** and clarify further?*
