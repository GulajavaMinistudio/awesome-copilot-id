# Consistency Audit Report: {Project/Feature Name}

All consistency reports must strictly use this Markdown format. Do not omit any sections.

## 1. 📊 Executive Summary

- **Documents Analyzed:** PRD ({version/name}), Spec ({version/name}), Plan ({version/name})
- **Overall Status:** {PASS / FAIL / PASS WITH WARNINGS}
- **Standards Compliance:** {PASS / FAIL} (Checked against `.agents/standards/`)

## 2. 🔍 Traceability Findings

_Mapping of requirements from business intent down to technical implementation._

- **Missing Coverage (PRD → Spec → Plan):**
  - **Item:** {Requirement ID or Feature Name}
  - **Gap:** {Explain what is missing. e.g., "Specified in PRD but no task in Plan"}
- **Orphaned Items (Scope Creep):**
  - **Item:** {Task or Tech Spec}
  - **Issue:** {Explain why it's scope creep. e.g., "Redis added in Plan, but no performance requirement in PRD"}
- **Contradictions (Cross-Document Conflicts):**
  - **Issue:** {Describe conflict. e.g., "PRD mandates 5MB max, but Spec allows 10MB"}

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
- **Approval Status:** {REQUIRED / NOT REQUIRED} _(Must be REQUIRED if Overall Status is FAIL)._
