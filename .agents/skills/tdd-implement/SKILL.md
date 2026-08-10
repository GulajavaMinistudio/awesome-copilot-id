---
name: tdd-implement
description: Test-Driven Development (TDD) and Incremental Implementation discipline. Use when implementing any feature or fixing bugs to enforce Red-Green-Refactor, vertical slicing, and atomic commits.
---

# TDD & Incremental Implementation (`tdd-implement`)

## Overview

Build in thin **vertical slices** (from DB to UI) and drive every implementation with tests (**TDD**). Avoid implementing an entire feature or rewriting an entire file in one pass. Each increment should leave the system in a working, testable, and committable state.

## 🔄 The Implementation Loop

Execute this loop for *every single task or slice* you implement:

1. **Scope Selection:** Pick the smallest complete piece of functionality (e.g., a single vertical slice).
2. **Stack Discovery:** Identify the repository's test and build commands. 
   - *Tip:* Prefer checked-in wrappers (e.g., `./gradlew` instead of `gradle`). If unsure, check CI workflows (e.g., `.github/workflows/`) to see how the server runs tests. Do not assume defaults like `npm test`.
3. **RED (Failing Test):** Write a failing test at a public interface (seam). A test that passes immediately proves nothing.
   - *For Bug Fixes (Prove-It Pattern):* Start by writing a test that reproduces the bug (it must fail) before touching production code. **Tip:** For complex bugs, you may `invoke_subagent` to write this failing test to ensure it is written strictly without bias or knowledge of the incoming fix.
4. **GREEN (Implementation):** Write the *simplest, most minimal* code required to make the test pass.
5. **VERIFY:** Run the focused test to ensure it passes, then run the full test suite to check for regressions. You MUST also run the build command, the **Type Checker** (e.g., `npx tsc --noEmit`), and the **Linter** to ensure the codebase remains completely clean.
6. **COMMIT:** Save your progress with a descriptive atomic commit. If a feature isn't complete but needs merging, use **Feature Flags**.
7. **REFACTOR (Deferred):** Perform only minor cleanups here. Heavy structural refactoring is NOT part of the Red-Green loop and should be deferred to the Code Review phase so it doesn't distract from feature completion.

```text
┌─────────────────────────────────────────┐
│                                         │
│   Write Failing Test (RED)              │
│       │                                 │
│       ▼                                 │
│   Implement Minimal Code (GREEN)        │
│       │                                 │
│       ▼                                 │
│   Verify & Commit (REFACTOR) ────────┐  │
│       │                              │  │
│       ▼                              │  │
│   Next Vertical Slice ◄──────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## 🛡️ Core Rules & Disciplines

### 1. Scope Discipline (Anti-Scope Creep)
Touch **only** what the task requires. 
- Do NOT "clean up" adjacent code, refactor unrelated imports, or modernize syntax in files you are only reading.
- If you notice something broken or messy outside your scope, **do not fix it silently**. Instead, report it to the user at the end of your message: *"I noticed X is broken in file Y. Want me to create a task/ticket for this?"*

### 2. Pre-Agreed Seams (Boundaries)
A **seam** is the public boundary you test at. 
- Test only at public interfaces, never against internal implementation details (Implementation-coupled).
- Test **State, not Interactions**. Assert the outcome of an operation, not whether a specific internal method was called.
- **Context Alignment:** Test names and variables MUST strictly use the domain vocabulary defined in `CONTEXT.md` (if it exists). Tests should read like business specifications.

### 3. Slicing Strategies
Build in thin, complete increments.
- **Vertical Slices (Preferred):** Build one complete path through the stack at a time (e.g., Create Task: DB + API + UI -> Test -> Commit). Avoid horizontal slicing (building all DB tables, then all APIs).
- **Contract-First Slicing:** If building frontend and backend simultaneously, define the API contract first, then build UI against mocks and backend against API tests.
- **Risk-First Slicing:** Tackle the most uncertain or risky piece first (e.g., WebSocket connection) before investing time in the rest of the feature.

### 4. Simplicity First (Rule 0)
Before writing code, ask: "What is the simplest thing that could work?". Three similar lines of code is better than a premature abstraction. Optimize only after correctness is proven with tests.

### 5. Safe Defaults & Rollback-Friendly
New code should default to safe, conservative behavior (e.g., disabled by default, opt-in). Each increment must be independently revertable via `git revert`.

### 6. Arrange-Act-Assert (AAA)
Structure every test using the AAA pattern for maximum readability:
- **Arrange:** Set up the initial state and mock data.
- **Act:** Execute the specific function or endpoint under test.
- **Assert:** Verify the outcome matches expectations.

## 🚩 Agent Red Flags & Rationalizations (Self-Correction)

If you find yourself doing, or thinking, any of the following, STOP and self-correct immediately:
- **"I'll test it all at the end" / "This is too simple to test" / "It's just a prototype"** -> NO. These are lazy rationalizations. Tests must be written first.
- Writing more than 100 lines of code without running tests.
- Running the exact same build/test command twice in a row without making any code changes in between.
- Building abstractions (factories, generic interfaces) before there are at least three concrete use cases demanding them.
- Relying entirely on slow E2E tests instead of writing fast Unit/Integration tests (The Test Pyramid / Beyonce Rule).

## 🚫 Test Anti-Patterns to Avoid

- **Tautological Tests:** The assertion recomputes the expected value exactly the way the code does (e.g., `expect(add(a,b)).toBe(a+b)`). Expected values must come from an independent source of truth (a literal or spec).
- **Over-Mocking:** Prefer real implementations > fakes > stubs > mocks. Mock only at boundaries where real dependencies are slow or non-deterministic.
- **Over-DRY Tests:** In tests, **DAMP (Descriptive And Meaningful Phrases)** is better. Duplication in tests is acceptable if it makes each test independently readable as a specification.
