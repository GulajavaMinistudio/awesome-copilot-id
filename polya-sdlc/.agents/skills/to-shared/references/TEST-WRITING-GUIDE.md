<!-- markdownlint-disable -->
# 🧪 Pólya Test Engineering & Classification Reference Guide

> **Purpose:** On-demand modular reference for `/to-code`, `/to-quick-fix`, and `/to-review` governing file-type test classification, boundary-only mocking, security test injection, `GATE_ONLY` projects, and context-saving test runner execution.

---

## 1. 5-Way File Classification & Testing Strategy

Match the test type strictly to the architectural role of the modified file(s):

| File Category | Examples | Required Test Level & Focus |
| :--- | :--- | :--- |
| **1. Pure Domain & Business Logic (`logic`)** | Entities, Value Objects, Use Cases, state machines, parsers, calculators, reducers | **Fast In-Memory Unit Tests:** Test base cases ($n=0, 1$), inductive steps ($n \to n+1$), dimensional units (`ms` vs `s`, cents vs dollars), round-trip symmetry ($f^{-1}(f(x)) = x$), and *Reductio ad Absurdum* negative domain rejections. Zero network/DB spin-up. |
| **2. API Routes, Controllers & Adapters (`api/server`)** | HTTP handlers, GraphQL resolvers, RPC endpoints, repository adapters, webhook consumers | **Boundary Integration Tests:** Exercise request validation, status codes, serialized response DTOs, auth/authz enforcement, idempotency replay handling, and database constraint persistence against a test DB or realistic in-memory fake. |
| **3. UI Components (`component`)** | Reusable widgets, forms, modals, tables, design-system components | **Component / Widget Tests:** Query by accessible role/label (`getByRole`, `getByLabelText` — never brittle CSS classes or internal state). Verify user interactions (`userEvent`), keyboard operability, and the 5 UI states (`Loading`, `Empty`, `Error`, `Partial`, `Populated`). |
| **4. Full Screens & Critical User Journeys (`page/flow`)** | Multi-step checkout, authentication flow, onboarding wizard, primary dashboard | **End-to-End / Flow Tests:** Verify the complete vertical slice across mobile (`375px`) and desktop (`1280px`) viewports, checking real routing, persistence, and zero console/page errors. |
| **5. CLI & Automation Scripts (`cli`)** | Command-line entrypoints, code generators, migration runners | **Subprocess / Stream Execution Tests:** Assert exit codes (`0` vs non-zero), `stdout`/`stderr` output contracts, flag parsing, and safe handling of missing/invalid arguments. |

---

## 2. Boundary-Only Mocking Discipline

1. **Never Mock the Unit Under Test:** Never stub private/internal methods of the class or module being tested.
2. **Prefer Fakes / In-Memory Ports Over Heavy Mocks:** For Clean Architecture Output Ports (repositories, clocks, queues), prefer lightweight deterministic in-memory implementations over brittle call-order mock assertions (`expect(mockFn).toHaveBeenCalledTimes(1)`).
3. **Mock Only True External Boundaries:** Restrict mocks/stubs to third-party HTTP APIs, payment gateways, email/SMS providers, system clocks, or non-deterministic entropy sources.
4. **Assert Behavior & State, Not Implementation Details:** Tests must survive internal refactoring as long as the public contract and post-conditions remain unchanged.

---

## 3. Mandatory Default Security Test Cases

Whenever a modified slice touches **authentication, sessions, authorization/permissions, payments/billing, file uploads/paths, or inbound webhooks**, automatically include negative security test assertions covering:
- **Unauthenticated Caller (`401`):** Missing, malformed, or expired credentials/tokens fail closed.
- **Unauthorized Cross-Tenant / BOLA Caller (`403` / `404`):** Authenticated user `A` attempting to read or mutate resource owned by user/tenant `B` is rejected.
- **Malformed / Oversized / Injection Payload (`400` / `422`):** Invalid types, negative quantities, SQL/command/path-traversal strings (`../`), or stripped required fields are rejected at the boundary adapter.
- **Idempotency & Replay Safety:** Duplicate webhook event IDs or repeated mutation requests with the same idempotency key do not double-charge or corrupt state.

---

## 4. Handling `GATE_ONLY` Projects (Intentional No-Test-Runner Mode)

Some early-stage prototypes or lightweight static projects intentionally verify quality via typechecking, linting, and runtime smoke verification without an installed unit test runner:
- **Detection:** Check `docs/ARCHITECTURE.md` Section 8 (or project test configuration) to see if the project explicitly declares a **`GATE_ONLY` (`typecheck + lint + runtime verify`)** posture.
- **Behavior:**
  - If a test runner is configured (`vitest`, `jest`, `pytest`, `go test`, `cargo test`, `flutter test`), unit/integration tests are **mandatory** per the Two-Layer Testing Mandate.
  - If the project explicitly records `GATE_ONLY` (no test runner by design), do **not** install unrequested test frameworks mid-slice or raise false-positive "missing unit test" blockers in `/to-review`; instead, enforce strict compile-time type safety, linter cleanliness, and live runtime verification of every `AC-XXX`.

---

## 5. Context-Saving Test Runner Execution

To prevent verbose test runner logs from flooding the LLM context window (~75% budget rule):
1. **Use Terse Reporters First:** Run test suites with compact output flags when supported (`vitest run --reporter=dot`, `jest --silent`, `pytest -q --tb=short`, `go test ./...`, `cargo test -q`, `flutter test --reporter compact`).
2. **Isolate Failing Files on Retry:** If a test fails, re-run **only the specific failing test file or test name** (`vitest run path/to/file.test.ts -t "test name"`) while diagnosing and fixing, then run the full `check:task` / `check:full` suite once green.
