<!-- markdownlint-disable -->
# 🔍 Consistency & Traceability Audit Report [Review Iteration {X}]

**Readiness Score:** {Score}/100  
**Status:** {Good Enough / Below Threshold}  
**Upstream Artifacts:**
- [ ] PRD: `docs/prd/{feature}.md`
- [ ] Spec: `spec/spec-{feature}.md`
- [ ] Plan: `plan/plan-{feature}.md`
- [ ] Glossary: `CONTEXT.md`

---

## 1. 📊 Score Breakdown (Quality Gate 40/30/30)

- **Completeness (max 40):** {Score}/40 - {Reason}
- **Clarity (max 30):** {Score}/30 - {Reason}
- **Alignment (max 30):** {Score}/30 - {Reason}
- **Critical Flaw Veto:** {Yes/No} - {Explain if triggered, otherwise "None"}

---

## 2. 🔍 Traceability & Blast Radius Findings

### 🚨 Critical Blockers (Must Fix to reach >= 80)
- **Missing Coverage (Upstream ➔ Downstream):**
  - **Item:** {Requirement ID or Feature Name}
  - **Gap:** {Specified in PRD/Spec but missing from Implementation Plan}
- **Orphaned Items (Scope Creep):**
  - **Item:** {Task or Component}
  - **Issue:** {Added in Plan/Spec but no justification in PRD or Business Goals}
- **Cross-Document Contradictions:**
  - **Issue:** {e.g. PRD mandates 200ms latency, Plan assumes sync batching taking 2s}

### ⚠️ Minor Gaps (Assumed / Backlog - The 20% we defer)
- **Item:** {Minor edge case or formatting nuance}
  - **Handling:** `[Assumed / Backlog]` - {Reason why acceptable under Quality Gate}

---

## 3. 🛡️ Standards & Testability Audit
- **ADR Format Compliance:** {PASS / FAIL} (Triple-gate validation)
- **Domain Glossary Alignment:** {PASS / FAIL} (Canonical terms & `_Avoid_` syntax in `CONTEXT.md`)
- **Codebase Reality & Test Seams:** {PASS / FAIL} (Check against database connections and testability traps)

---

## 4. 📝 Action Plan (Corrective Actions)
- [ ] **PRD Updates:** {Specific fixes or "None"}
- [ ] **Spec Updates:** {Specific fixes or "None"}
- [ ] **Plan Updates:** {Specific fixes or "None"}

---
> **User Decision Prompt:** (Only insert if Score >= 80 or Iteration >= 3)
> The document has achieved a Readiness Score of {Score}/100. It is ready for the next phase. Do you want to **PROCEED** to the next phase, or do you want to **REFINE** and clarify further?
