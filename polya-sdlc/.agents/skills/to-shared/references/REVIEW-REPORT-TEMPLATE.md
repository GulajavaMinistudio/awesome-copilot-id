# 🔍 Code Review & Quality Audit: [Feature / PR Name]

**Reviewed Target:** `[Commit / Branch / File List / Isolated Snippet]`  
**Specification Ref:** `docs/spec/{slug}-spec.md` *(or `N/A — Ad-Hoc Diff / Snippet`)*  
**Plan Ref:** `docs/plan/{slug}-plan.md` *(or `N/A — Ad-Hoc Diff / Snippet`)*  
**Risk Tier:** **`{Low (Tier 0) | Medium (Tier 1) | High/Critical (Tier 2)}`**  
**Review Mode:** **`{Quick | Standard | Deep | Focused Security}`**  
**Human Audit Gate:** **`{0 Approvals (Tier 0) | >= 1 Approval (Tier 1) | 🚨 >= 2 Approvals [MANDATORY HUMAN AUDIT REQUIRED] (Tier 2)}`**  
**Findings Summary:** **`[Important]: X | [Nit]: Y | [Pre-existing]: Z`** — **`{"No blocking issues found" | "Blocking issues require remediation"}`**  
**Review Status:** **{Approved / Remediation Required}**  
**Release Readiness Verdict:** **{GO | NO-GO}**  

---
<!-- markdownlint-disable-->

## 0. Pre-Review Verification Gates (Risk Tier, Mutation Check & Epistemic Doubt)

### 0.0 Risk Tier, Intent & Root-Cause Alignment
- **Blast Radius & Touched Paths:** `{Summary of touched layers, entrypoints, CI/CD, migrations, or governance files}`
- **Immutable Base-Branch Governance Check:** `[PASS — Evaluated against base branch AGENTS.md / REVIEW.md / ARCHITECTURE.md]`
- **Base-Branch Drift & Git Hygiene Check:** `[PASS — Up to date with main; selective atomic staging verified; Phase 3 NOTICED BUT NOT TOUCHING mapped to [Pre-existing]]`
- **Intent & Root-Cause Verification:** `[PASS / FAIL]` — `{Confirms the change solves the stated goal and addresses root causes rather than masking symptoms}`

### 0.1 Verify the Tests First (Mutation Check & 5-Way Test Classification)
- **5-Way File Classification Check (`TEST-WRITING-GUIDE.md`):** `[PASS — LOGIC, BOUNDARY, UI_COMPONENT, SECURITY_SURFACE, CONFIG_TRIVIAL covered proportionally]`
- **Target Mutated Seam:** `[file_path:line]` — `{Brief description of temporary 1-line logic/condition inversion}`
- **Observed Test Outcome:** `[CAUGHT (Test Failed as Expected) / ESCAPED (False-Green Suite — Blocker!)]`
- **Isolation / Reversion Confirmed:** `[Yes — Executed in isolated git worktree or static audit; main working tree untouched]`

### 0.2 Adversarial Doubt Cycle & Verification Ledger (Pólya's "Examine Your Guess")
- **Independent Refutation Audit:** `[EXECUTED / N/A]` — `{Fresh subagent or adversarial pass attempting to disprove candidate findings}`
- **Candidate Verdict Breakdown:** `[X Confirmed, Y Needs Validation, Z Rejected]`
- **Verifier Proof-of-Failure Filter:** `[PASS — Every [Important] finding verified with Call Chain + Trigger Condition + Failure Outcome; speculative warnings dropped]`
- **Tautological / Vacuous Assertions Checked:** `[PASS / FAIL]` — `{Details}`
- **Unverified Runtime Seams / Happy-Path Bias Checked:** `[PASS / FAIL]` — `{Details}`

### 0.3 5-Move Floor-Guard & Quality Ratchet Diff Audit
- **Move 1 (Deleted/Weakened Assertions):** `[0 Violations / FAIL]`
- **Move 2 (Skipped Tests — `.skip`, `xit`, `@Disabled`):** `[0 Violations / FAIL]`
- **Move 3 (Unapproved Linter/Type Suppressions):** `[0 Violations / Approved in ARCHITECTURE.md §8.4 / FAIL]`
- **Move 4 (Loosened Compiler/Linter Configs):** `[0 Violations / FAIL]`
- **Move 5 (Lowered Quality Ratchets — Coverage, Bundle, CWV, Complexity):** `[0 Violations / Ratchets Ratcheted Up / FAIL]`
- **Verification Scope Executed:** `[check:full / Scoped Suite: X/Y tests passed, 0 warnings / GATE_ONLY]`

### 0.4 Runtime Evidence Ledger, AC Surface Conformance & Review Convergence
*Anti-Fabrication Rule: No evidence = No `MET ✅`. Static file reading never counts as runtime execution. Unapplied DB migrations on disk must be marked `SPECCED BUT NOT APPLIED ⚠️`.*
- **Trust Boundary Transitions Crossed:** `[e.g., Unauthenticated Public HTTP ➔ Order Service ➔ PostgreSQL]`
- **Prior Run Iteration & Convergence Status:** `[Iteration 1 (Initial Audit) / Iteration N of 3 — Delta-Scoped Re-Audit (Carried Forward: X, Revalidated: Y, Validly Dismissed: Z)]`

| AC / Surface ID | Target Surface (Route / Component / Migration / CLI) | Conformance Status (`MET ✅` \| `SPECCED BUT MISSING 🚫` \| `SPECCED BUT NOT APPLIED ⚠️` \| `BLOCKED ⚠️`) | Concrete Execution Evidence (Command, HTTP Status, DB Check, or Blocker Reason) |
| :--- | :--- | :---: | :--- |
| `AC-001` | `[e.g., POST /api/v1/orders]` | `MET ✅` | `[e.g., vitest order.test.ts (4 passed) + 201 Created smoke check]` |
| `AC-002` | `[e.g., 0004_add_orders_idx.sql]` | `MET ✅` | `[e.g., Migration applied to local DB; \d orders confirmed index]` |

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

| Security Vector | Assessment & Verification Criteria | Status (`PASS` \| `CONFIRMED` \| `NEEDS_VALIDATION` \| `N/A`) | Notes / Findings & Verification Recipes |
| :--- | :--- | :---: | :--- |
| **Injection & Second-Order Sinks** | SQL/NoSQL queries parameterized; shell/HTML outputs sanitized; data stored safely does not become dangerous in downstream sinks (regex, paths, shell args) | [PASS / CONFIRMED / NEEDS_VALIDATION] | {Details} |
| **Tenant & Data Isolation Lifecycle** | Row-level/query-level filtering enforced on every read/write; cache keys & object paths tenant-namespaced; derived copies (indexes/caches/exports) follow ACL updates | [PASS / CONFIRMED / NEEDS_VALIDATION] | {Details} |
| **Auth & Access Control (BOLA/IDOR)** | BOLA/IDOR prevented; RBAC/ABAC enforced per mutating use case; authority cannot expand during restore/export | [PASS / CONFIRMED / NEEDS_VALIDATION] | {Details} |
| **AI, LLM & MCP Agentic Boundaries** | Code-level authorization enforced (never rely on prompt guardrails); tool arguments validated; action-binding & confused-deputy guards present; persistent memory poisoning prevented | [PASS / CONFIRMED / NEEDS_VALIDATION / N/A] | {Details} |
| **DoS, Amplification & Cancellation** | Computational amplification guarded (ReDoS, $O(n^2)$ parsing); pre-auth work bounded; client cancellation (`AbortSignal`) propagated downstream | [PASS / CONFIRMED / NEEDS_VALIDATION] | {Details} |
| **SSRF & Outbound URL Guards** | Outbound URLs allowlist `https:`, resolve all DNS records, reject non-unicast/loopback/cloud metadata IPs (`169.254.169.254`), and forbid redirects | [PASS / CONFIRMED / NEEDS_VALIDATION / N/A] | {Details} |
| **Web & Identity Boundaries** | JWT algorithm confusion prevented & claims verified; OAuth state/redirects validated; CORS origin reflection rejected; auth cookies `HttpOnly`/`Secure` | [PASS / CONFIRMED / NEEDS_VALIDATION / N/A] | {Details} |
| **Client-Side Sinks & DOM** | Zero unescaped `innerHTML`/`javascript:` sinks; prototype pollution rejected in deep merges; `postMessage` origin allowlisted; tokens omitted from `localStorage` | [PASS / CONFIRMED / NEEDS_VALIDATION / N/A] | {Details} |
| **Destructive File/Path Guards** | File deletions/writes resolve `realpath`, enforce non-empty root prefix, and reject `..` traversal | [PASS / CONFIRMED / NEEDS_VALIDATION / N/A] | {Details} |
| **Zero Secret Exposure & Git Hygiene** | Zero hardcoded API keys, JWT secrets, passwords in code/tests; git history audited for committed/reverted secrets | [PASS / CONFIRMED / NEEDS_VALIDATION] | {Details} |
| **CI/CD, Supply-Chain & Provenance** | Dependencies pinned in lockfile; `--ignore-scripts` enforced; CI workflow expression injection prevented; actions pinned by commit SHA | [PASS / CONFIRMED / NEEDS_VALIDATION] | {Details} |
| **Desktop, Mobile & Local-IPC** | Deep links bind to session nonces; webview native bridges origin-allowlisted; local IPC (sockets, Android exported components) scoped | [PASS / CONFIRMED / NEEDS_VALIDATION / N/A] | {Details} |
| **Async Queues, Webhooks & Idempotency** | Idempotency keys enforced on side-effecting workers; webhook HMAC signatures & timestamp skew ($\le 5\text{m}$) verified; envelope vs body alignment | [PASS / CONFIRMED / NEEDS_VALIDATION / N/A] | {Details} |
| **Cloud Config & Workload Secret Containment** | Deployment overlays do not disable auth/TLS; secrets not exposed in CLI args (`ps aux`) or build artifacts; instance metadata blocked | [PASS / CONFIRMED / NEEDS_VALIDATION / N/A] | {Details} |
| **Binary, Memory & FFI Safety** | Bounds checks, pointer arithmetic, null termination, and concurrency/race-condition guards verified (when native/FFI code exists) | [PASS / CONFIRMED / NEEDS_VALIDATION / N/A] | {Details} |
| **Wildcard & Code Debt Smells** | UI vs API asymmetry checked; weird subsystem feature combinations verified; `temp`/`hack`/`TODO` comments checked | [PASS / CONFIRMED / NEEDS_VALIDATION] | {Details} |

---

## 5. Database, Caching & Performance Audit (Keep-or-Revert Gate)

- **Query & Index Verification (`EXPLAIN ANALYZE`):** `[Verified / N/A]` — `{Zero N+1 loops, unbounded scans, or missing composite indexes}`
- **Cache Invalidation & Stampede Protection:** `[Verified / N/A]` — `{Explicit TTL, deterministic invalidation on write, single-flight/jitter protection}`
- **Performance Attempt Ledger (Keep-or-Revert Rule):** `[Verified / N/A]` — `{Any complexity-adding optimization includes before/after benchmark evidence; unverified micro-optimizations reverted}`

### 5.5 Frontend, Accessibility & UI Disqualifier Audit (`UI-ENGINEERING-GUIDE.md` — When UI Files Are Touched)
- **4 Mandatory UI States & Breakpoints (`375px` / `768px` / `1280px`):** `[Verified / N/A]` — `{Empty, Loading aria-busy="true", Error, and Success states verified}`
- **WCAG 2.1 AA & Keyboard Accessibility:** `[Verified / N/A]` — `{Contrast >= 4.5:1 / >= 3:1, semantic <button>, aria-label, Enter/Space navigation, focus trapping}`
- **Zero 6 UI Disqualifiers, 8 Banned AI Defaults & Clean Console:** `[Verified / N/A]` — `{Zero overflow/overlap/raw debug strings, zero inline fake data, 0 console errors/warnings in --isolated session}`

---

## 6. Remediation Action Items

*Required surgical adjustments before declaring implementation complete. Apply standardized Lean Action Tags:*

| Action Tag | Trigger Condition | Remediation Guideline |
| :--- | :--- | :--- |
| `delete:` | Dead code, speculative features, unused wrappers | Delete immediately. Best code is no code. |
| `reuse:` | Re-invented helper or wheel | Replace with existing house domain helper or utility. |
| `stdlib:` | Hand-rolled logic available in standard library | Replace with built-in standard library methods. |
| `native:` | Complex one-off wrapper around native platform API (excluding project design-system / house components) | Reuse project house component first; otherwise use standard platform widget/API directly. |
| `yagni:` | Speculative flexibility, unused config parameters | Strip unused options/parameters down to current requirement. |
| `shrink:` | Over-engineered, over-nested algorithm | Flatten and simplify to straightforward linear logic. |
| `merge:` | Duplicated logic across multiple near-identical functions | Consolidate into a single parameterized function. |
| `split:` | Single function handling multiple distinct responsibilities | Extract helper for SRP at natural cohesion seam. |

### Categorized Findings (`[Important]` ➔ `[Nit]` ➔ `[Pre-existing]`)

*Order findings strictly by severity (`[Important]` blockers first, then capped `[Nit]`s, then `[Pre-existing]` legacy debt). If `[Important] = 0`, state explicitly: **"No blocking issues found."***

*For general code quality & logic findings:*
1. **`[Important | Nit | Pre-existing]` `[file_path:line]` (or `[function_name:relative_line]`) - `[action_tag]` [Brief Title]**
   - **Bug Class & Sibling Sweep:** `[e.g., Hand-Rolled Stdlib Duplication / Unchecked Optional Unwrap — Checked 3 sibling files in module]`
   - **What this is:** `[Exact construct, e.g., custom date formatter function]`
   - **Problem:** `[Hand-rolled date formatting duplicating stdlib Intl.DateTimeFormat]`
   - **Fix:** `[stdlib: Replace with native Intl.DateTimeFormat]`
   - **If we skip it:** `[Maintenance overhead, potential timezone edge case bugs]`

*For security & boundary integrity findings (Section 4):*
2. **`[Important | Pre-existing]` `[file_path:line]` - `[CONFIRMED | NEEDS_VALIDATION]` [Security Finding Title]**
   - **Root-Cause Fingerprint:** `[seam:file:line:slug]`
   - **Bug Class & Severity / CWE:** `[e.g., BOLA / Missing Tenant Scope Filter]` — `[CRITICAL | HIGH | MEDIUM | LOW]` (e.g., `CWE-89` / `CWE-79` / `CWE-862` / `CWE-918`)
   - **What this is:** `[Exact file, line range, and vulnerable construct]`
   - **Source Trace:** `[Entrypoint]` $\to$ `[Propagation / Handler]` $\to$ `[Dangerous Sink / Broken Invariant]`
   - **Actor & Impact:** `[Attacker privilege level]` $\to$ `[Affected principal]` $\to$ `[Capability / data exposed]`
   - **Smallest Effective Fix:** `[Minimal surgical fix using stdlib or house components; avoid speculative security wrapper layers]`
   - **Validation Plan / Blocker (if `NEEDS_VALIDATION`):** `[Exact missing deployment/IAM/infra fact and owner-executable verification command]`

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

### 9.3 Release & Launch Readiness Gate (`GO | NO-GO`), Pre-Merge Proofs & Rollback Plan
- **Release Decision:** **`{GO | NO-GO}`** *(Any unresolved `[Important]` finding, `CONFIRMED` vulnerability, or Floor-Guard violation forces `NO-GO`)*
- **Pre-Merge Runnable Proofs Checklist:**
  - [ ] `{Targeted test / verification command, e.g., npm run check:task / vitest run ...}`
  - [ ] `{Build / typecheck / migration dry-run / UI state verification}`
- **Backward Compatibility & Migration Safety:** `[Verified Expand-Migrate-Contract / N/A]`
- **Timed Rollback Plan (`< 15 Minutes` — How to Revert):**
  1. **Revert Trigger:** `{Exact error rate, latency spike, or healthcheck failure that triggers rollback}`
  2. **Rollback Command / Action:** `{git revert <sha> / feature-flag toggle / reversible migration step}`
  3. **Post-Rollback Verification:** `{Smoke check confirming system recovery}`
