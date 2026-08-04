# 🔍 Consistency Audit Report [Review Iteration {X}]

**Readiness Score:** {Score}/100
**Status:** {Good Enough / Below Threshold}

**Score Breakdown:**

- **Completeness (max 40):** {Score} - {Reason}
- **Clarity (max 30):** {Score} - {Reason}
- **Alignment (max 30):** {Score} - {Reason}
- **Critical Flaw Veto:** {Yes/No} - {Explain if triggered, otherwise "None"}

---

## 1. 📊 Executive Summary

- **SDLC Phase:** {PRD-Only / Spec / Plan}
- **Documents Analyzed:**
  - [ ] PRD: {version/name or N/A}
  - [ ] Spec: {version/name or N/A}
  - [ ] Plan: {version/name or N/A}
- **Standards Compliance:** {PASS / FAIL} (Checked against `.agents/standards/`)

## 2. 🔍 Traceability Findings

_Mapping of requirements from business intent down to technical implementation (if downstream documents exist)._

### 🚨 Critical Blockers (Must Fix)

_List fatal contradictions, massive scope creep, or complete missing coverage that prevents the score from reaching 80._

- **Missing Coverage (Upstream -> Downstream):**
  - **Item:** {Requirement ID or Feature Name}
  - **Gap:** {Explain what is missing. e.g., "Specified in PRD but no task in Plan"}
- **Orphaned Items (Scope Creep):**
  - **Item:** {Task or Tech Spec}
  - **Issue:** {Explain why it's scope creep. e.g., "Redis added in Plan, but no performance requirement in PRD"}
- **Contradictions (Cross-Document Conflicts):**
  - **Issue:** {Describe conflict. e.g., "PRD mandates 5MB max, but Spec allows 10MB"}

### ⚠️ Minor Gaps (Assumed / Backlog - The 20% we skip)

_Minor inconsistencies or trivial missing details that are acceptable under the Quality Gate (Score >= 80)._

- **Item:** {Requirement ID, Task, or Feature Name}
  - **Handling:** `[Assumed / Backlog]` - {Brief reason why this can be deferred as tech debt}

## 3. 🛡️ Standards Compliance (Documentation Audit)

_Auditing adherence to project standards._

- **ADR Format Compliance:** {PASS / FAIL}
  - **Issue:** {If FAIL, specify which ADR violates `.agents/standards/ADR-FORMAT.md`}
- **Context/Glossary Alignment:** {PASS / FAIL}
  - **Issue:** {If FAIL, identify terms used in documents that contradict `CONTEXT.md`}
- **Codebase Reality Check:** {PASS / FAIL}
  - **Issue:** {If FAIL, specify what part of the plan contradicts the existing code/database schema}

## 4. 📝 Action Plan (Corrective Actions)

_Clear checklist for the user to fix before invoking `/sdlc-write-code`._

- **Updates Required:**
  - [ ] **PRD:** {Specific correction needed, or "None"}
  - [ ] **Spec:** {Specific correction needed, or "None"}
  - [ ] **Plan:** {Specific correction needed, or "None"}
  - [ ] **Standards (ADR/Context):** {Specific correction needed, or "None"}

---
> **User Decision Prompt:** (Only insert this block if Score >= 80 or Iteration >= 3)
> The document has achieved a Readiness Score of {Score}/100. It is ready for the next phase. Do you want to **PROCEED** to the next phase, or do you want to **REFINE** and clarify further?
