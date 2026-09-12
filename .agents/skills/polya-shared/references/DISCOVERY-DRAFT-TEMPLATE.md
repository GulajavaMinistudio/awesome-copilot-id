# 🔭 Project Discovery Draft: [Initiative / Feature Name]

**Document Type:** Phase 0 Discovery Draft  
**Target Repository:** `[Repository Name / Scope]`  
**Status:** **[Draft / Under Review / Approved for Spec]**  
**Architect:** Veteran Principal Fullstack Engineer  

---
<!-- markdownlint-disable-->

## 1. Problem Statement & Business Opportunity (Getting Acquainted)

*Pólya Heuristic: Familiarity and Conception (Pólya, 1945, p. 33). Understand the problem as a whole, its primary purpose, and its overarching value.*

- **The Problem:** [What friction, inefficiency, or technical limitation exists today?]
- **Business Value & Why Now:** [What business outcome, cost reduction, or capability does solving this unlock?]
- **Target Persona & Users:** [Who benefits directly from this capability?]

---

## 2. The Unknown, Known Data, and Operational Bounds

*Pólya Heuristic: Isolate the principal parts of the problem: What is the unknown? What are the data? What is the condition?*

| Element | Description |
| :--- | :--- |
| **The Unknown** | [What is sought? e.g., A resilient multi-region webhook processing pipeline, a new checkout engine, or an automated reconciliation system] |
| **Known Data** | [Existing codebases, databases, third-party APIs, event topics, or infrastructure assets available] |
| **The Conditions & Invariants** | [High-level constraints: throughput SLA (e.g., < 200ms p99), idempotency guarantees, zero data loss, compliance requirements] |

---

## 3. Codebase Exploration & Architectural Critique

*Pólya Heuristic: Decomposing and Recombining (p. 75) & Analogy (p. 37). Examine existing components, critique architectural debt, and look for analogous solutions.*

### 3.1 Existing Topography Analysis

> [!NOTE]
> **Greenfield Projects:** If the repository is currently empty, skip existing code critique and utilize this section to propose the initial Clean Architecture folder topography and technology stack scaffold.

- **Relevant Directories & Modules:**
  - `[path/to/module]`: [Current responsibility and implementation pattern]
  - `[path/to/models]`: [Current data structures and storage representations]
- **Architectural Debt & Seam Vulnerabilities:**
  - [Critique existing architectural seams: e.g., tight coupling, leaky domain abstractions, missing transactional boundaries]

### 3.2 Analogous Solutions & Prior Art
- **Internal Analogies:** [Has a similar problem been solved in another package or module in this repository? Can we reuse proven patterns?]
- **External Analogies:** [How do standard production patterns in the industry address this problem?]

---

## 4. Candidate Architectures & Trade-Off Matrix

*Pólya Heuristic: The Inventor's Paradox (p. 121) — Evaluate whether a more general architectural abstraction provides a cleaner, more maintainable solution than narrow ad-hoc modifications.*

| Dimension | Option A: [Minimal / Direct] | Option B: [Target / Architectural] | Option C: [Comprehensive / Scalable] |
| :--- | :--- | :--- | :--- |
| **Summary** | [e.g., Extend existing synchronous service] | [e.g., Introduce Outbox Pattern + Event Queue] | [e.g., Dedicated Event-Driven Microservice] |
| **Clean Architecture Seams** | [Tightly coupled to current DB] | [Decoupled via Ports & Adapters] | [Isolated bounded context] |
| **Complexity & Risk** | [Low initial cost, high technical debt] | [Moderate effort, high long-term stability] | [High initial overhead, operational complexity] |
| **Reversibility (Two-Way Door?)** | [Hard to untangle later] | [Easy to refactor behind interface] | [High architectural commitment] |
| **Recommendation** | [Alternative] | **[RECOMMENDED]** | [Future Phase] |

---

## 5. Technical Feasibility Spikes & Open Risks

*Pólya Heuristic: Auxiliary Problem (p. 50). Can we introduce an easier, temporary stepping stone or prototype to resolve high-risk unknowns?*

- **Technical Unknown 1:** [e.g., Can provider X sustain 500 requests/second without rate limiting?]
  - **Spike / Feasibility Check:** [Minimal script or test harness executed to verify]
  - **Findings:** [Observed latency and limits]
- **Technical Unknown 2:** [e.g., Does our current ORM support optimistic concurrency locks cleanly?]
  - **Spike / Feasibility Check:** [Verification in isolated integration test]
  - **Findings:** [Confirmed support via version column]

---

## 6. Strategic Recommendation & Handoff to Specification

- **Selected Architectural Path:** [Option B - State clearly why this approach is selected]
- **High-Impact Decisions (ADR Candidate):** [Identify if an Architecture Decision Record is required under Triple-Gate rules]
- **Domain Vocabulary Candidates (`CONTEXT.md`):** [List newly identified domain terms to register]
- **Handoff Action:**
  ```text
  /polya-spec @docs/discovery/{slug}-discovery.md Formulate formal technical specification, data contracts, and Clean Architecture seams based on this approved Discovery Draft.
  ```
