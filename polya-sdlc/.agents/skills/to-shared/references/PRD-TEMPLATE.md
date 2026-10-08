# Product Requirements Document (PRD): {project_title}

> **Document Status:** Draft / Under Review / Approved  
> **Target Canonical Path:** `docs/prd/{slug}-prd.md`  
> **Upstream Context:** Discovery Draft (`docs/discovery/{slug}-discovery.md`)  
> **Downstream Target:** `/to-clarify` (Checkpoint Audit) OR `/to-spec` (Phase 1 Blueprint)

---

## 1. Product Overview

### 1.1 Document Metadata
- **Feature / Product Title:** {project_title}
- **Version:** {version_number} (e.g., 1.0.0)
- **Author / Lead PM:** {author_name}
- **Last Updated:** {YYYY-MM-DD}

### 1.2 Executive Summary
Brief 2–3 paragraph overview explaining the product problem, the proposed solution, and the anticipated business impact.

---

## 2. Pólya Problem Framing & Goals

Applying George Pólya's 1945 Heuristic Problem-Solving Framework (*How to Solve It*) to product definition:

### 2.1 The Unknown (Business Goals & Target Outcomes)
What business value and target outcomes are we seeking to achieve?
- **Primary Business Goal:** {Specific, measurable outcome}
- **Secondary Business Goals:**
  - {Goal 1}
  - {Goal 2}

### 2.2 The Data (User Goals & Discovered Pain Points)
What user needs, existing behaviors, and real-world inputs drive this initiative?
- **User Pain Points:**
  - {Current friction / blocker experienced by users}
- **User Desired Outcomes:**
  - {What users achieve once this feature is live}

### 2.3 The Condition (Non-Goals & Business Invariants)
What operational bounds, explicit exclusions, and invariant rules govern this problem?
- **Non-Goals (Strictly Out of Scope):**
  - {Explicitly excluded feature / capability 1}
  - {Explicitly excluded feature / capability 2}
- **Business Invariants:**
  - {Condition that MUST ALWAYS hold true, e.g., zero data loss during checkout}

---

## 3. User Personas & Role-Based Access

### 3.1 Primary Personas
- **{Persona 1 Name}**:
  - **Role:** {End-User / Admin / Support}
  - **Context:** {Background, goals, pain points}
  - **Usage Frequency:** {Daily / Occasional}

- **{Persona 2 Name}**:
  - **Role:** {e.g. Internal Operator}
  - **Context:** {Background, goals}

### 3.2 Role-Based Access & Permissions
| Role | Permissions / Scope | Guardrails |
| :--- | :--- | :--- |
| `{Role 1}` | {e.g., Read & Create} | {Cannot delete data} |
| `{Role 2}` | {e.g., Admin / Full Access} | {Requires 2FA} |

---

## 4. Functional Requirements

Categorized by priority level:
- **P0 (Must Have - MVP Core):** Essential for launch.
- **P1 (Should Have):** Important for high usability, can follow immediately.
- **P2 (Nice to Have):** Future enhancement.

### 4.1 P0 Core Requirements
- **FR-01: {Feature Title}**
  - **Description:** {Detailed behavioral description}
  - **Dependencies:** {Prerequisite features or APIs}

- **FR-02: {Feature Title}**
  - **Description:** {Detailed behavioral description}

### 4.2 P1 Important Requirements
- **FR-03: {Feature Title}**
  - **Description:** {Detailed behavioral description}

---

## 5. User Experience & Flows

### 5.1 Entry Points & First-Time User Experience (FTUX)
- Where does the user enter this flow? (e.g., dashboard banner, navigation menu, direct link)
- First-time experience highlights and onboarding cues.

### 5.2 Core User Journey (Step-by-Step)
```text
[ Step 1: User Navigates ] ──▶ [ Step 2: User Inputs Data ] ──▶ [ Step 3: Confirmation & Feedback ]
```
1. **Step 1:** {Description of trigger and initial screen state}
2. **Step 2:** {User action, input validation feedback}
3. **Step 3:** {Success state and next recommended action}

### 5.3 UI/UX Highlights, Edge Cases & Error States
- **Empty States:** {What is rendered when zero data exists?}
- **Loading States:** {Visual feedback during asynchronous processing}
- **Error Handling:** {Clear, user-friendly recovery messages}
- **Boundary Cases:** {Network failure, concurrent access, invalid characters}

---

## 6. Product Narrative

*Concise narrative (1–2 paragraphs) describing a day in the life of the user interacting with this feature:*
> "{User Persona} logs in to complete {Task}. Previously, this required {Manual Workaround}. With the new {Feature Name}, the user simply {Action}, immediately receives {Positive Result}, and continues their workday without friction."

---

## 7. Success Metrics & SLAs

### 7.1 User-Centric Metrics
- {e.g., Task completion rate > 90%}
- {e.g., CSAT / User satisfaction score improvement}

### 7.2 Business Metrics
- {e.g., Conversion rate increase by X%}
- {e.g., Customer support ticket reduction by Y%}

### 7.3 Technical & Quality Boundaries (Input for Engineering)
- **Response Time / Latency SLA:** {e.g., p95 < 300ms}
- **Availability:** {e.g., 99.9% uptime}

---

## 8. Technical Considerations (Engineering Seams)

> [!NOTE]
> The PRD defines behavioral contracts and constraints. The technical design, database schemas, and API payloads belong strictly to `/to-spec`.

### 8.1 Integration Points
- {Third-party services, payment gateways, internal microservices}

### 8.2 Data Privacy & Compliance
- {PII considerations, GDPR/CCPA compliance, encryption requirements}

### 8.3 Known Technical Risks
- {High-concurrency hotspots, third-party rate limits, legacy schema constraints}

---

## 9. Milestones & Task Sizing

### 9.1 Sizing Estimate
- **Estimated Size:** {XS / S / M / L / XL}
- **Target Timeline:** {e.g., 2 Sprints / 3 Weeks}

### 9.2 Suggested Phasing
- **Phase 1 (Baseline Slice):** {Core P0 workflow}
- **Phase 2 (Enhancements):** {P1 capabilities & error polish}

---

## 10. User Stories & SMART Acceptance Criteria

### 10.1 User Story US-01: {User Story Title}
- **ID:** `US-01`
- **Story:** As a `{user role}`, I want to `{perform action}`, so that `{achieve benefit}`.
- **Priority:** P0
- **Acceptance Criteria (SMART):**
  - [ ] **Given** `{precondition}`, **when** `{event occurs}`, **then** `{expected result}`.
  - [ ] Input validation enforces `{validation rule}`.
  - [ ] Error message `{error text}` is rendered when `{invalid condition}`.

### 10.2 User Story US-02: {User Story Title}
- **ID:** `US-02`
- **Story:** As a `{user role}`, I want to `{perform action}`, so that `{achieve benefit}`.
- **Priority:** P0
- **Acceptance Criteria (SMART):**
  - [ ] **Given** `{precondition}`, **when** `{event occurs}`, **then** `{expected result}`.
  - [ ] All required audit logs are persisted.

---

## 🎯 Next Steps & Handoff

Once this PRD is approved:
1. **Checkpoint Audit (Recommended for high-risk features):**
   ```text
   /to-clarify @docs/prd/{slug}-prd.md Interrogate assumptions, edge cases, and evaluate Readiness Score.
   ```
2. **Direct Technical Specification:**
   ```text
   /to-spec @docs/prd/{slug}-prd.md Formulate Technical Specification, DTO contracts, and Clean Architecture seams.
   ```
