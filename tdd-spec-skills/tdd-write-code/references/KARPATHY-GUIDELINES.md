<!-- markdownlint-disable -->
# Karpathy Behavioral Guidelines

This document defines the strict behavioral guidelines to eliminate common LLM coding mistakes, derived from Andrej Karpathy's foundational observations on LLM engineering discipline.

## 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface trade-offs.**

Before implementing:
- **State Assumptions Explicitly:** Write down what you assume about the code, contracts, and requirements. If uncertain, halt and ask.
- **Surface Trade-offs:** If multiple interpretations or architectural choices exist, present them clearly — do not pick silently.
- **Simpler Approach:** If a simpler, more direct approach exists, state it openly and push back against unnecessary complexity.
- **Stop and Ask:** If anything is ambiguous, stop. Name what is confusing, and ask the user directly.

## 2. Simplicity First (Minimum Code / Anti-Speculative)
**Minimum code that solves the problem. Nothing speculative.**

- **Zero Speculative Code:** Write only what is strictly required to satisfy the failing test (GREEN).
- **No Unrequested Abstractions:** Do not create generic helper classes, abstract base classes, or factories for single-use logic.
- **No Speculative Flexibility:** Reject unrequested configuration options, flags, or premature extensibility hooks.
- **No Impossible Error Handling:** Avoid writing defensive code for impossible internal invariants.
- **Pruning & Refactoring:** If 200 lines were written where 50 lines suffice, rewrite and simplify.
- **Seniority Check:** Ask yourself: *"Would a principal engineer say this is overcomplicated?"* If yes, simplify immediately.

## 3. Surgical Changes (Blast Radius Containment)
**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- **No Drive-By Refactoring:** Do NOT "improve", reformat, or alter adjacent code, comments, or whitespace that is not part of the active ticket.
- **Don't Refactor What Isn't Broken:** Only touch the exact lines necessary.
- **Match Existing Conventions:** Adopt existing project idioms and naming styles, even if you prefer a different pattern.
- **Unrelated Dead Code:** If you notice unrelated dead code, mention it to the user — do NOT delete it autonomously.
- **Clean Up Your Orphans:** Remove unused imports, variables, and helpers introduced by *your* changes.
- **Traceability Test:** Every single changed line MUST trace directly to an acceptance criterion in the approved plan.

## 4. Goal-Driven Execution (Verifiable Loops)
**Define success criteria. Loop until verified.**

Transform tasks into verifiable, boolean goals:
- *"Add validation"* ➔ *"Write tests for invalid inputs (RED) ➔ Implement validation guard (GREEN) ➔ Verify suite (VERIFY)"*
- *"Fix bug"* ➔ *"Write a test reproducing the bug (RED) ➔ Fix root cause (GREEN) ➔ Verify suite (VERIFY)"*
- *"Refactor module"* ➔ *"Ensure tests pass before and after refactoring"*

For multi-step tasks, follow the verifiable loop:
```text
1. [RED Phase]    → Write failing test at public seam → verify: test fails for expected reason
2. [GREEN Phase]  → Write surgical minimal code       → verify: test passes
3. [VERIFY Phase] → Run suite, typecheck, lint        → verify: 0 errors & 0 suppressions
4. [COMMIT Phase] → Atomic git commit
```
