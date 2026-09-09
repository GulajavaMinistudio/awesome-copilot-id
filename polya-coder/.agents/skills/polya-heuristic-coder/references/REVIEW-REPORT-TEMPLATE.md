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

---

## 3. Clean Code & Boy Scout Rule Verification

- **Intention-Revealing Names:** Are variables, functions, and classes named after what they mean, avoiding abbreviations or misleading names?
- **Small Functions:** Are functions concise, focused on one thing, and operating at a single level of abstraction?
- **Boy Scout Rule:** Was the code left cleaner than it was found?
- **Zero Suppression Anti-Cheat:** Verified zero `@ts-ignore`, `eslint-disable`, `# noqa`, or skipped tests.

---

## 4. Remediation Action Items

*Required surgical adjustments before declaring implementation complete:*

1. `[file_path:line]` - [Specific refactoring required]
2. `[file_path:line]` - [Missing boundary test to add]
