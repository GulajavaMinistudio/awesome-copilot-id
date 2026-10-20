---
title: "[Concise Title Describing the Specification's Goal]"
version: "1.0.0"
date_created: "[YYYY-MM-DD]"
last_updated: "[YYYY-MM-DD]"
status: "Draft" # Draft | Approved | Deprecated
prd_ref: "docs/prd/{slug}-prd.md" # Optional: populate when derived from an approved PRD
tags: ["polya", "spec", "clean-architecture"]
---
<!-- markdownlint-disable-->

# Technical Specification: [Feature Name]

## 1. Pólya Phase 1: Understanding the Problem

### 1.1 The Unknown (Goal & Desired State)
- What exactly are we trying to calculate, transform, persist, or render?
- What constitutes a successful and complete solution from the user and system perspective?
- **Explicit Non-Goals (Out of Scope):** [Carry over Non-Goals from PRD/Discovery so downstream plans never re-introduce them]

### 1.2 The Data (Inputs, State & Source-Grounded Context)
- What data inputs, query parameters, or payloads are provided?
- What existing database models, entities, or external APIs are involved? *(Cite existing codebase files as `[VERIFIED: file_path:line]`)*
- What state machine transitions or session contexts are active?

### 1.3 The Condition (Requirements, Constraints & Invariants)

*Every requirement and constraint MUST be assigned a unique ID for 100% bidirectional traceability with PRDs (`docs/prd/`) and Implementation Plans (`docs/plan/`):*

- **REQ-001 `[PRD Ref: US-01 / FR-01]`:** [Core functional capability required to satisfy the Unknown]
- **REQ-002 `[PRD Ref: US-02 / FR-02]`:** [Secondary functional capability or business transaction rule]
- **CON-001 (Performance / SLA & Quality Ratchets):** [e.g., Response time < 200ms, memory bound < 512MB, `docs/ARCHITECTURE.md` Section 8 ratchets]
- **CON-002 (Security & Invariants):** [e.g., Role-based authorization, session timeout, idempotency key, SSRF/path guards]

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

### 4.2 Database Schema / Persistence Models & Migration Strategy
- **Schema / Indexes:** [Table structures, composite indexes, foreign keys, or document schemas]
- **Backward Compatibility (Expand-Migrate-Contract):** [How schema/API changes remain zero-downtime and reversible]

### 4.3 API Error Contract, Idempotency & 5 UI States Matrix
- **Error Contract (RFC 7807 / Typed Domain Errors):** [Exact error codes, HTTP status mappings, and retryability flags]
- **Idempotency & Pagination:** [Idempotency key mechanism for mutations; cursor/limit bounds for collections]
- **5 UI States Matrix (If UI/Frontend Applicable):**
  - **Loading:** [Skeleton / spinner behavior & threshold]
  - **Empty:** [Zero-data state message & primary CTA]
  - **Error:** [User-facing recovery action & retry capability]
  - **Partial:** [Paginated / degraded / partial-load behavior]
  - **Populated:** [Ideal rendered state & keyboard/ARIA accessibility invariants]

### 4.4 Observability, Telemetry & SLIs (RED / USE Metrics)
- **Structured Logging:** [Key domain events logged with correlation IDs and zero PII/secrets]
- **Metrics & Alerts:** [Rate, Errors, Duration (RED) or Utilization, Saturation, Errors (USE) signals]

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

*Every Acceptance Criterion must have a unique ID that pairs with corresponding REQ IDs for verification in `docs/plan/`:*

- **AC-001 (Happy Path for REQ-001):**  
  *Given* [pre-conditions and initial state],  
  *When* [action triggered],  
  *Then* [expected state change and output].

- **AC-002 (Boundary / Edge Case for REQ-002):**  
  *Given* [empty input or limiting case],  
  *When* [action executed],  
  *Then* [graceful validation error returned without throwing 500].

### 6.1 Value Sourcing & Positive Input Coverage Table

*Every value that the feature produces, computes, persists, or displays in `AC-001..N` MUST have an explicit named source (zero unstated derivations):*

| Required Output / Computed / Displayed Value | AC Ref | Named Source (`Input DTO` / `DB Column [file:line]` / `Derivation Formula` / `Config`) | Boundary / Edge Variation (`Timezone` / `Locale` / `Currency` / `Tenant` / `Null`) |
| :--- | :---: | :--- | :--- |
| `[e.g., invoiceTotalInCents]` | `AC-001` | `Derived: sum(lineItems.amountInCents) - discountInCents + taxInCents` | `0 items, negative discount guard, integer cents rounding` |
| `[e.g., billingTimezone]` | `AC-001` | `DB Column: organizations.timezone [VERIFIED: schema.prisma:42]` | `UTC vs. Asia/Jakarta (+07:00) day-boundary rollover` |

---

## 7. Testing Strategy & Dimensional Bounds

- **Testing Seam:** [The public API or use-case boundary where tests will assert behavior]
- **Dimension Checks:** [Verify time units (ms vs s), currency (cents vs dollars), numeric bounds]
- **Extreme Limiting Cases (Specialization):** [Null, empty array, 0, max integer, concurrent race]

---

## 8. Architectural Decision Records (ADRs)

- [ADR-0001: Description](docs/adr/0001-slug.md) — [Short rationale for hard-to-reverse choice]
