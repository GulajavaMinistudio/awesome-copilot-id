---
title: "[Concise Title Describing the Specification's Goal]"
version: "1.0.0"
date_created: "[YYYY-MM-DD]"
last_updated: "[YYYY-MM-DD]"
status: "Draft" # Draft | Approved | Deprecated
tags: ["polya", "spec", "clean-architecture"]
---
<!-- markdownlint-disable-->

# Technical Specification: [Feature Name]

## 1. Pólya Phase 1: Understanding the Problem

### 1.1 The Unknown (Goal & Desired State)
- What exactly are we trying to calculate, transform, persist, or render?
- What constitutes a successful and complete solution from the user and system perspective?

### 1.2 The Data (Inputs, State & Environmental Context)
- What data inputs, query parameters, or payloads are provided?
- What existing database models, entities, or external APIs are involved?
- What state machine transitions or session contexts are active?

### 1.3 The Condition (Requirements, Constraints & Invariants)

*Every requirement and constraint MUST be assigned a unique ID for 100% bidirectional traceability with Implementation Plans (`/plan/`):*

- **REQ-001:** [Core functional capability required to satisfy the Unknown]
- **REQ-002:** [Secondary functional capability or business transaction rule]
- **CON-001 (Performance / SLA):** [e.g., Response time < 200ms, memory bound < 512MB]
- **CON-002 (Security & Invariants):** [e.g., Role-based authorization, session timeout, idempotency key]

### 1.4 Condition Sanity Check & Completeness Audit (Pólya, p. 7, 33)
- **Is the condition sufficient to determine the unknown?** [Yes / No - Explain]
- **Is it insufficient?** [Flag any missing inputs or undefined states]
- **Is it redundant or contradictory?** [Surface conflicting requirements]
- **Did you use ALL the data?** [Verify every input parameter, query field, and payload attribute is accounted for]
- **Did you use the WHOLE condition?** [Verify every constraint, SLA limit, and security invariant is explicitly mapped]

### 1.5 Indirect Proof & Negative Invariant Analysis (Pólya, p. 162–171)
*Assume the negation of the invariant (Reductio ad Absurdum) to verify defensive barriers:*
- **Negative Hypothesis (Assume Violation):** [e.g., What if an unauthenticated caller invokes this endpoint, or session expires mid-flight?]
- **Contradiction & Safe Rejection:** [Prove how the system rejects invalid states with typed domain errors, prevents corrupt state persistence, and fails fast]

---

## 2. Ubiquitous Language & Domain Glossary (`CONTEXT.md`)

*All business terminology below MUST strictly match `CONTEXT.md` in root or the relevant sub-context:*

- **[Canonical Term 1]:** [Definition - What it IS, not what it does]  
  _Avoid_: [Synonym A], [Synonym B]
- **[Canonical Term 2]:** [Definition]  
  _Avoid_: [Synonym C]

---

## 3. Assumptions & Open Clarifications

*All provisional guesses or unverified assumptions made during drafting:*

> [!WARNING] [ASSUMPTION-001]: [Description of assumption made to avoid blocking]  
> *Risk / Trade-off:* [Downstream risk if this assumption proves false]  
> *Proposed Verification:* [How to verify with user or tests]

- **[CLARIFICATION-001]:** [Open question regarding ambiguous requirement]

---

## 4. Setting Up Equations & Expressive Notation (Pólya, p. 134–141)

*Splitting natural language requirements clause-by-clause into formal structures and making invalid states unrepresentable via Type-Driven Design:*

- **Type-Driven Domain Invariants:** [Identify Value Objects, Discriminated Unions / Sealed Classes, Branded Types, or Enums that guarantee invalid states cannot compile]

### 4.1 Data Transfer Objects (DTOs) & Interfaces
```typescript
export interface ExampleRequestDTO {
  readonly id: string;
  readonly amountInCents: number;
}

export interface ExampleResponseDTO {
  readonly success: boolean;
  readonly transactionId: string;
}
```

### 4.2 Database Schema / Persistence Models
[Table structures, indexes, foreign keys, or document schemas]

---

## 5. Clean Architecture Seams & Component Boundaries

> [!NOTE]
> **Architectural Pragmatism Check:** Declare project architectural scope:
> - **Enterprise Core Domain:** Enforce full 4-layer directory segregation (`domain/`, `usecases/`, `adapters/`, `frameworks/`) with strict ports & DTOs.
> - **Standalone Script / Auxiliary CLI / Spike:** Defer heavy multi-layer ceremony. Focus on Clean Code micro-principles (SRP, pure functions, clear naming) in a self-contained, modular file structure.

```text
Entities (Domain Layer)
   └── Pure business logic, value objects, and domain invariants
Use Cases (Application Layer)
   └── Workflow orchestration, transaction boundaries, input/output ports
Interface Adapters (Controllers, Gateways, Presenters)
   └── HTTP controllers, repository implementations, external client adapters
Frameworks & Drivers (DB, Web Server, UI Runtimes)
   └── ORMs, web frameworks, third-party SDKs
```

- **Domain Layer:** [Specific entity or value object files]
- **Use Case Layer:** [Specific interactor or service files]
- **Adapter Layer:** [Specific controller or repository implementation files]
- **Dependency Inversion Seams:** [Port/interface defining boundaries]

---

## 6. Acceptance Criteria (Given-When-Then)

*Every Acceptance Criterion must have a unique ID that pairs with corresponding REQ IDs for verification in `/plan/`:*

- **AC-001 (Happy Path for REQ-001):**  
  *Given* [pre-conditions and initial state],  
  *When* [action triggered],  
  *Then* [expected state change and output].

- **AC-002 (Boundary / Edge Case for REQ-002):**  
  *Given* [empty input or limiting case],  
  *When* [action executed],  
  *Then* [graceful validation error returned without throwing 500].

---

## 7. Testing Strategy & Dimensional Bounds

- **Testing Seam:** [The public API or use-case boundary where tests will assert behavior]
- **Dimension Checks:** [Verify time units (ms vs s), currency (cents vs dollars), numeric bounds]
- **Extreme Limiting Cases (Specialization):** [Null, empty array, 0, max integer, concurrent race]

---

## 8. Architectural Decision Records (ADRs)

- [ADR-0001: Description](docs/adr/0001-slug.md) — [Short rationale for hard-to-reverse choice]
