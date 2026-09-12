# 🔍 Code Review & Quality Audit: [Feature / PR Name]

**Reviewed Target:** `[Commit / Branch / File List]`  
**Specification Ref:** `spec/[slug]-spec.md`  
**Plan Ref:** `plan/[slug]-plan.md`  
**Review Status:** **{Approved / Remediation Required}**  

---
<!-- markdownlint-disable-->

## 1. Uncle Bob's 5 SOLID Principles Audit

| Principle                       | Assessment                                               |    Status     | Notes / Findings |
| :------------------------------ | :------------------------------------------------------- | :-----------: | :--------------- |
| **SRP** (Single Responsibility) | Does each class/function have only 1 reason to change?   | [PASS / FAIL] | {Details}        |
| **OCP** (Open-Closed)           | Are behaviors extendable without modifying core sources? | [PASS / FAIL] | {Details}        |
| **LSP** (Liskov Substitution)   | Can subtypes substitute base types without side effects? | [PASS / FAIL] | {Details}        |
| **ISP** (Interface Segregation) | Are client interfaces small, cohesive, and decoupled?    | [PASS / FAIL] | {Details}        |
| **DIP** (Dependency Inversion)  | Do high-level use cases depend only on abstractions?     | [PASS / FAIL] | {Details}        |

---

## 2. Pólya Heuristics Boundary Audit

### 2.1 Specialization & Limiting Cases
- [ ] Empty inputs / collections handled gracefully without null pointer exceptions.
- [ ] Zero values, negative values, and maximum numeric bounds tested.
- [ ] Network timeout, disconnected state, and async cancellation handled.

### 2.2 Test by Dimension
- [ ] Time units validated (milliseconds vs seconds consistency).
- [ ] Currency values strictly typed (integer cents vs floating point dollars).
- [ ] Enums bounded with exhaustive switch matching (no unhandled default leaks).

### 2.3 Inductive Invariant Verification (Pólya, p. 114)
- [ ] Base Case 0: Empty collection / initial state handled gracefully.
- [ ] Base Case 1: Single element input behaves deterministically.
- [ ] Inductive Step ($n \to n+1$): Iterations, batch pagination, and state transitions preserve all domain invariants.

### 2.4 All Data & Whole Condition Audit (Pólya, p. 33)
- [ ] All Data Check: Zero silently dropped query params or unparsed payload attributes.
- [ ] Whole Condition Check: All SLA limits, business constraints, and security invariants verified.

### 2.5 Indirect Proof Audit (Reductio ad Absurdum - Pólya, p. 162–171)
- [ ] Fail-Fast Contradiction: Negative test cases explicitly verify that illegal states (unauthorized caller, expired session, corrupted payload) cannot persist and are rejected immediately.
- [ ] Typed Domain Rejection: Negative execution paths produce typed domain errors rather than unhandled 500 crashes or silent fallbacks.

### 2.6 Symmetry & Round-Trip Invariant Audit (Pólya, p. 199–200)
- [ ] Reversible Operations: Invertible operations satisfy round-trip equality (e.g., `deserialize(serialize(x)) === x`, `decrypt(encrypt(x)) === x`).
- [ ] Resource Lifecycle Symmetry: Every allocation or subscription has a matching guaranteed deallocation or teardown (`open/close`, `acquire/release`, `subscribe/unsubscribe`).

### 2.7 Variation of the Problem & Boundary Audit (Pólya, p. 209–214)
- [ ] Domain Variation: Test cases vary inputs across extreme ranges (empty states, negative values, max boundary limits, unicode strings, fuzz data) rather than relying exclusively on static happy-path examples.

---

## 3. Clean Code & Boy Scout Rule Verification

- **Intention-Revealing Names:** Are variables, functions, and classes named after what they mean, avoiding abbreviations or misleading names?
- **Small Functions:** Are functions concise, focused on one thing, and operating at a single level of abstraction?
- **Boy Scout Rule:** Was the code left cleaner than it was found?
- **Architectural Pragmatism & Scope Check:** Verified that architectural ceremony fits the problem scale (zero forced 4-layer over-engineering on single-file scripts/CLI tools; strict Clean Architecture preserved on core business domain modules).
- **Zero Suppression Anti-Cheat:** Verified zero `@ts-ignore`, `eslint-disable`, `# noqa`, or skipped tests.

---

## 4. Remediation Action Items

*Required surgical adjustments before declaring implementation complete:*

1. `[file_path:line]` - [Specific refactoring required]
2. `[file_path:line]` - [Missing boundary test to add]

---

## 5. Pólya's Two Golden Questions (Looking Back & Knowledge Promotion)

*Pólya Heuristic: Can you use the result? Can you use the method? (Pólya, 1945, p. 61)*

- **Can you use the result?**
  - [Reusable Artifacts]: {List exported DTOs, domain models, or public ports ready for reuse in other modules, or "None"}
- **Can you use the method?**
  - [Promoted Pattern]: {Describe any novel architectural pattern, testing harness, or refactoring technique discovered}
  - [Memory Promotion]: {Recommend adding this method to `memory.instructions.md` Knowledge Base via `/memory-manager`, or "None"}

---

## 6. Can You See It at a Glance? (Holistic Perception - Pólya, p. 59–61)

*Pólya Heuristic: Can you see the whole solution at a glance? Compress the implementation into a 30-second mental model.*

```text
[Component / Client]
       │
       ▼ (Request DTO)
[Interface Adapter / Controller]
       │
       ▼ (Use Case Interactor)
[Domain Entity / Invariant Check]
       │
       ▼ (Port / Repository)
[Infrastructure / DB / External Service]
```

- **At-a-Glance Summary:** [1-2 sentences capturing the entire data flow and primary invariant]
- **Visual Diagram Validated:** [Yes / No - Can a new developer understand the topology without reading the full diff?]
