# Project Quality Constraints (`CONSTRAINTS.md`)

<!--
  This document establishes the project's numerical quality bar and anti-cheat floor.
  It serves as a permanent contract for both human engineers and AI coding agents.
-->

## 1. Quality Thresholds

| Metric | Target Threshold | Hard Floor (CI Failure) | Enforcement Tool |
|---|---|---|---|
| **Unit Test Coverage** | >= 85% line coverage | >= 75% | Test Runner / LCOV |
| **Linter Errors** | 0 warnings, 0 errors | 0 errors | ESLint / Biome / Ruff |
| **Type Checking** | Strict mode (0 errors) | 0 errors | `tsc --noEmit` / `mypy` |
| **Bundle Size / LCP** | LCP < 2.5s, FID < 100ms | LCP < 4.0s | Lighthouse / DevTools |
| **Security Audit** | 0 Critical, 0 High | 0 High/Critical | `npm audit` / `pip-audit` |

---

## 2. Floor-Guard Anti-Cheat Policy

The agent is **strictly prohibited** from performing any of the following actions to achieve green status:

1. **Suppression Insertion:** Adding `@ts-ignore`, `@ts-nocheck`, `eslint-disable`, `# noqa`, or `// nolint` to silence genuine compiler or linter errors.
2. **Assertion Stripping:** Modifying or removing existing `expect(...)` or `assert` statements from existing tests without explicit user instruction.
3. **Test Skipping:** Adding `.skip`, `xit`, `@pytest.mark.skip`, or commenting out failing test suites.
4. **Tautological Testing:** Writing tests that replicate the internal code calculation (e.g. `expect(add(a,b)).toBe(a+b)`) instead of asserting against independent expected outputs.
5. **Threshold Lowering:** Modifying this `CONSTRAINTS.md` file or CI configuration to lower required passing percentages.

*Violations of the Floor-Guard policy will trigger immediate task abortion and rollback.*
