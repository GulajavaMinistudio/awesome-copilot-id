# 🔍 Code Review & Quality Audit: [Feature / PR Name]

**Reviewed Target:** `[Commit / Branch / File List]`  
**Specification Ref:** `docs/spec/{slug}-spec.md`  
**Plan Ref:** `docs/plan/{slug}-plan.md`  
**Review Status:** **{Approved / Remediation Required}**  
**Release Readiness Verdict:** **{GO | NO-GO}**  

---
<!-- markdownlint-disable-->

## 0. Pre-Review Verification Gates (Mutation Check & Epistemic Doubt)

### 0.1 Verify the Tests First (Mutation Check by Experiment)
- **Target Mutated Seam:** `[file_path:line]` — `{Brief description of temporary 1-line logic/condition inversion}`
- **Observed Test Outcome:** `[CAUGHT (Test Failed as Expected) / ESCAPED (False-Green Suite — Blocker!)]`
- **Reversion Confirmed:** `[Yes — Working tree restored clean]`

### 0.2 Adversarial Doubt Cycle (Pólya's "Examine Your Guess")
- **Tautological / Vacuous Assertions Checked:** `[PASS / FAIL]` — `{Details}`
- **Unverified Runtime Seams / Happy-Path Bias Checked:** `[PASS / FAIL]` — `{Details}`

### 0.3 5-Move Floor-Guard & Quality Ratchet Diff Audit
- **Move 1 (Deleted/Weakened Assertions):** `[0 Violations / FAIL]`
- **Move 2 (Skipped Tests — `.skip`, `xit`, `@Disabled`):** `[0 Violations / FAIL]`
- **Move 3 (Unapproved Linter/Type Suppressions):** `[0 Violations / Approved in ARCHITECTURE.md §8.4 / FAIL]`
- **Move 4 (Loosened Compiler/Linter Configs):** `[0 Violations / FAIL]`
- **Move 5 (Lowered Quality Ratchets — Coverage, Bundle, CWV, Complexity):** `[0 Violations / Ratchets Ratcheted Up / FAIL]`
- **Verification Scope Executed:** `[check:full / Scoped Suite: X/Y tests passed, 0 warnings]`

---

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
- **Zero Suppression Anti-Cheat:** Verified zero unapproved `@ts-ignore`, `eslint-disable`, `# noqa`, or skipped tests.

---

## 4. Defensive Security & Invariant Audit

| Security Vector | Assessment & Verification Criteria | Status | Notes / Findings |
| :--- | :--- | :---: | :--- |
| **Injection & Sanitization** | SQL/NoSQL queries parameterized; shell/HTML outputs sanitized at boundary adapters | [PASS / FAIL] | {Details} |
| **Authentication & Authorization** | BOLA/IDOR prevented; RBAC/tenant isolation enforced on every mutating use case | [PASS / FAIL] | {Details} |
| **Zero Secret Exposure** | Zero hardcoded API keys, JWT secrets, passwords, or private certificates in code/tests | [PASS / FAIL] | {Details} |
| **Payload & Deserialization Guard** | Mass assignment prohibited; payload size bounded; safe deserialization enforced | [PASS / FAIL] | {Details} |
| **DoS & Resource Exhaustion** | Rate limits, pagination caps, and timeout cancellation guards present on all I/O | [PASS / FAIL] | {Details} |
| **SSRF & Outbound URL Guards** | User-influenced URLs parsed & allowlisted; private/loopback/cloud metadata IPs (`169.254.169.254`) blocked | [PASS / FAIL / N/A] | {Details} |
| **Destructive File/Path Guards** | File deletions/writes resolve `realpath`, enforce non-empty root prefix, and reject `..` traversal | [PASS / FAIL / N/A] | {Details} |
| **Supply-Chain & Lockfile Hygiene** | Dependencies pinned in lockfile; zero unapproved/typosquatted packages or unpinned CI actions | [PASS / FAIL] | {Details} |
| **LLM / Agentic Input Guards** | Untrusted data isolated from system prompts; LLM outputs schema-validated before execution | [PASS / FAIL / N/A] | {Details} |

---

## 5. Database, Caching & Performance Audit (Keep-or-Revert Gate)

- **Query & Index Verification (`EXPLAIN ANALYZE`):** `[Verified / N/A]` — `{Zero N+1 loops, unbounded scans, or missing composite indexes}`
- **Cache Invalidation & Stampede Protection:** `[Verified / N/A]` — `{Explicit TTL, deterministic invalidation on write, single-flight/jitter protection}`
- **Performance Attempt Ledger (Keep-or-Revert Rule):** `[Verified / N/A]` — `{Any complexity-adding optimization includes before/after benchmark evidence; unverified micro-optimizations reverted}`

---

## 6. Remediation Action Items

*Required surgical adjustments before declaring implementation complete. Apply standardized Lean Action Tags:*

| Action Tag | Trigger Condition | Remediation Guideline |
| :--- | :--- | :--- |
| `delete:` | Dead code, speculative features, unused wrappers | Delete immediately. Best code is no code. |
| `reuse:` | Re-invented helper or wheel | Replace with existing house domain helper or utility. |
| `stdlib:` | Hand-rolled logic available in standard library | Replace with built-in standard library methods. |
| `native:` | Complex wrapper around native UI widget/API | Use standard platform widget/API directly. |
| `yagni:` | Speculative flexibility, unused config parameters | Strip unused options/parameters down to current requirement. |
| `shrink:` | Over-engineered, over-nested algorithm | Flatten and simplify to straightforward linear logic. |
| `merge:` | Duplicated logic across multiple near-identical functions | Consolidate into a single parameterized function. |
| `split:` | Single function handling multiple distinct responsibilities | Extract helper for SRP at natural cohesion seam. |

### Findings (4-Part Structure)

1. **`[file_path:line]` - `[action_tag]` [Brief Title]**
   - **What this is:** [Exact construct, e.g., custom date formatter function]
   - **Problem:** [Hand-rolled date formatting duplicating stdlib Intl.DateTimeFormat]
   - **Fix:** [`stdlib:` Replace with native Intl.DateTimeFormat]
   - **If we skip it:** [Maintenance overhead, potential timezone edge case bugs]

---

## 7. Pólya's Two Golden Questions (Looking Back & Knowledge Promotion)

*Pólya Heuristic: Can you use the result? Can you use the method? (Pólya, 1945, p. 61)*

- **Can you use the result?**
  - [Reusable Artifacts]: {List exported DTOs, domain models, or public ports ready for reuse in other modules, or "None"}
- **Can you use the method?**
  - [Promoted Pattern]: {Describe any novel architectural pattern, testing harness, or refactoring technique discovered}
  - [Memory Promotion]: {Recommend adding this method to `memory.instructions.md` Knowledge Base via `/to-memory`, or "None"}

---

## 8. Can You See It at a Glance? (Holistic Perception - Pólya, p. 59–61)

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

---

## 9. Lean Scoreboard, Transparency & Release Readiness Gate

### 9.1 Lean Scoreboard
- **Lines Deleted:** [count or 0]
- **Helpers Reused:** [count or 0]
- **Net Diff Impact:** [-X lines / +Y lines]

### 9.2 Scope Limitations & Transparency
- **Not checked:** [Unverified environments, scale thresholds, or edge cases outside current scope]
- **Residual Risks / Upgrade Triggers:** [Known capacity ceilings, deliberate shortcuts, or future upgrade milestones]

### 9.3 Release & Launch Readiness Gate (`GO | NO-GO`)
- **Release Decision:** **`{GO | NO-GO}`**
- **Backward Compatibility & Migration Safety:** `[Verified Expand-Migrate-Contract / N/A]`
- **Timed Rollback Plan (`< 15 Minutes`):**
  1. **Revert Trigger:** `{Exact error rate, latency spike, or healthcheck failure that triggers rollback}`
  2. **Rollback Command / Action:** `{git revert <sha> / feature-flag toggle / reversible migration step}`
  3. **Post-Rollback Verification:** `{Smoke check confirming system recovery}`
