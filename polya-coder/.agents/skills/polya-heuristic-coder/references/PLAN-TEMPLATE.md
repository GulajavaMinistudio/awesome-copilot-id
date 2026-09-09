---
goal: "[Concise Title Describing the Implementation Plan]"
version: "1.0.0"
date_created: "[YYYY-MM-DD]"
last_updated: "[YYYY-MM-DD]"
status: "Planned" # Planned | In Progress | Completed | Paused
spec_ref: "spec/[slug]-spec.md"
tags: ["polya", "plan", "tracer-bullets", "vertical-slicing", "clean-architecture"]
---
<!-- markdownlint-disable -->

# Implementation Plan: [Feature / Task Name]

> [!IMPORTANT]
> **THE PAUSE RULE & VERTICAL SLICING MANDATE:**  
> All tasks in this plan are organized into **Vertical Feature Slices (Tracer Bullets)** spanning from DB/Domain to API and UI. Horizontal layer-by-layer slicing is strictly prohibited.  
> After each phase is verified, execution MUST halt for explicit user approval before proceeding to the next phase. Functional code MUST NOT be written until this plan is approved.

---

## 1. Overview & High-Level Mental Model

[Short concise overview of the execution plan and the architectural vision.]

### Topological Data Flow Diagram
```text
[UI / Trigger] ──▶ [Controller Adapter] ──▶ [Use Case Interactor] ──▶ [Domain Entity]
                                                    │
                                                    ▼
                                           [Repository Port] ──▶ [DB / Storage]
```

---

## 2. 📏 Task Sizing Matrix

Every task must fit into one focused session. AI agents work most reliably on XS to M tasks.

| Size   | Files Impacted | Scope                                           | Example                                                 |
| :----- | :------------: | :---------------------------------------------- | :------------------------------------------------------ |
| **XS** |       1        | Single pure function or config change           | Domain invariant rule / DTO definition                  |
| **S**  |      1-2       | Small focused vertical interaction              | Endpoint mapping + DTO validation                       |
| **M**  |      3-5       | Standard Vertical Feature Slice (Tracer Bullet) | Core user feature: Schema + Domain + UseCase + API + UI |
| **L**  |      5-8       | Multi-component vertical flow                   | Full checkout pipeline with payment gateway             |
| **XL** |       8+       | **Strictly Prohibited (Too Large)**             | Must be decomposed into smaller vertical slices         |

---

## 3. Phased Implementation Sequence (Vertical Tracer Bullets)

> **EXECUTION DIRECTIVE FOR AI AGENTS:**  
> Execute phase by phase. Run the specific testing/verification task at the end of each phase. After verification passes, **YOU MUST STOP AND WAIT** for user approval before moving to the next phase.

### Implementation Phase 1: Land — Minimal End-to-End Tracer Bullet
*Goal: Implement the minimal, fully-functional vertical slice connecting DB to UI with zero mocks.*

| Task     | Description                                                                                        | Ref ID  | AC Ref | Dep      |  Files  | Completed | Date  |
| :------- | :------------------------------------------------------------------------------------------------- | :------ | :----- | :------- | :-----: | :-------: | :---: |
| TASK-001 | User Registration Slice [Domain User Entity + RegisterUseCase + API Route + Register Form UI]      | REQ-001 | AC-001 | -        | 3-5 (M) |    [ ]    |       |
| TASK-00X | **VERIFY:** Execute end-to-end integration test for Tracer Bullet (`npm test` / integration suite) | -       | -      | TASK-001 |    -    |    [ ]    |       |
| TASK-00Y | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to proceed to Phase 2                 | -       | -      | -        |    -    |    [ ]    |       |

### Implementation Phase 2: Expand — Robustness, Edge Cases & Invariants
*Goal: Expand the baseline with error handling, validations, caching, and edge-case guards.*

| Task     | Description                                                                                       | Ref ID  | AC Ref | Dep      |  Files  | Completed | Date  |
| :------- | :------------------------------------------------------------------------------------------------ | :------ | :----- | :------- | :-----: | :-------: | :---: |
| TASK-002 | Duplicate Email & Rate Limiting Slice [Domain Invariant + Throttling Middleware + UI Error Toast] | REQ-002 | AC-002 | TASK-001 | 2-3 (S) |    [ ]    |       |
| TASK-003 | Session Persistence & Auto-Login Slice [Token Generator + LocalStorage Adapter + Auth Guard]      | REQ-003 | AC-003 | TASK-001 | 3-4 (M) |    [ ]    |       |
| TASK-00X | **VERIFY:** Run full test suite including extreme boundary conditions and regression suite        | -       | -      | TASK-003 |    -    |    [ ]    |       |
| TASK-00Y | **APPROVAL:** 🛑 Stop and wait for explicit user confirmation to declare plan complete             | -       | -      | -        |    -    |    [ ]    |       |

---

## 4. Contingency Plan B (Have Two Strings to Your Bow)

*Pólya Heuristic: Prepare for potential failure of the primary strategy.*

- **Risk / Failure Point:** [e.g., Third-party payment webhook is unreliable or has high latency]
- **Primary Strategy (Plan A):** [Synchronous webhook verification with timeout]
- **Contingency Strategy (Plan B):** [Asynchronous polling reconciliation cron job with idempotent replay]
- **Trigger Condition:** [When to pivot from Plan A to Plan B]

---

## 5. Symmetry & Architectural Invariants

- **Symmetric Operations:**
  - `subscribe` $\leftrightarrow$ `unsubscribe`
  - `acquireLock` $\leftrightarrow$ `releaseLock`
  - `serialize` $\leftrightarrow$ `deserialize`
  - `open` $\leftrightarrow$ `close`
- **SOLID Checks at Blueprint Stage:**
  - *Single Responsibility (SRP):* Does each modified file have only one reason to change?
  - *Dependency Inversion (DIP):* Do use cases depend only on abstract ports/interfaces?

---

## 6. Risks & Extracted Assumptions

*Extracted from upstream Spec's `[ASSUMPTION]` tags:*

- **[ASSUMPTION-001]:** [Extracted assumption] — *Mitigation:* [Action item]
- **[RISK-001]:** [Potential technical debt or migration hazard] — *Mitigation:* [Action item]

---

## 7. Rollback & Recovery Strategy

Step-by-step instructions to revert to a stable state if execution encounters unrecoverable issues:
1. Revert git commits: `git revert HEAD~N..HEAD`
2. Roll back database migrations: `[specific migration rollback command]`
3. Invalidate caches or restore environment configurations.

---

## 8. 🚩 Pre-Flight Self-Correction Checklist (Anti-Patterns)

Before presenting this plan to the user, verify it is free from these anti-patterns:
- [ ] **No Horizontal Slicing:** Tasks are NOT grouped layer-by-layer (e.g., "Create all tables", "Create all APIs"). All tasks are vertical feature slices.
- [ ] **No Bloated Tasks (XL):** No task touches $\ge 8$ files or connects unrelated subsystems.
- [ ] **Strict Traceability:** Every actionable task has valid `Ref ID` and `AC Ref` linking to the Spec.
- [ ] **Deterministic Dependencies:** The `Dep` column points strictly bottom-up to previously scheduled tasks.
- [ ] **Mandatory Verification & Approval:** Every phase ends with `VERIFY` and `APPROVAL` checkpoints.
