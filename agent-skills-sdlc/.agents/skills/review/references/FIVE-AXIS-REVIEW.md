# Five-Axis Code Review Reference

This document defines the comprehensive review framework for `@ExpertCodeReviewer`. Every code review MUST evaluate the submitted code along all five axes below. No axis may be skipped.
<!-- markdownlint-disable -->

---

## The Five Axes

### Axis 1: Correctness

**Goal:** Does the code do what it's supposed to do, with no bugs?

Review these sub-concerns in this order:

- **Happy path correctness:** Does the code produce the correct output for valid, expected inputs?
- **Edge case handling:** What happens at the boundaries? (empty inputs, null/nil/undefined values, zero, max integer, empty arrays, strings with special characters)
- **Error paths:** What happens when a dependency fails, a network call times out, or a file is missing? Are errors propagated correctly or silently swallowed?
- **Off-by-one errors:** Are loop bounds, slice indices, and pagination offsets correct?
- **Race conditions & concurrency:** If multiple threads or async processes interact with shared state, is access properly synchronized or avoided?
- **State consistency:** After a function runs, is the program's state consistent? Can partial failures leave data in a corrupted intermediate state?
- **Return value contracts:** Does the function always return a value of the declared type in all code paths, including error branches?

**Signal phrases to watch for:** "probably fine," "should work," "I think this handles it" — these are indicators that the author is not certain and correctness needs verification.

---

### Axis 2: Readability & Simplicity

**Goal:** Can a competent developer understand this code in under 5 minutes without asking the author?

- **Naming clarity:** Do variable, function, and class names honestly describe what they hold or do? A function named `process()` or a variable named `data` is a red flag. Names should reveal intent.
- **Function length & focus:** Does each function do one thing? A function that is longer than ~40 lines or requires scrolling is a signal to inspect its responsibilities.
- **Nesting depth:** Code with more than 3 levels of indented nesting (loops inside conditionals inside conditionals) is difficult to follow. Consider early returns (guard clauses) to flatten the structure.
- **Conditional complexity:** Long chains of `if/else if` or deeply nested ternary operators are smells. A complex condition should be extracted into a well-named boolean variable or function.
- **Dead code:** Are there commented-out blocks, unreachable branches, unused variables, or unused imports? Dead code creates confusion about whether it was intentional. List it explicitly and ask before deleting.
- **Abstraction cost:** Every abstraction has a cost. An abstraction is only worth it if it is used in multiple places or if it genuinely hides complexity. A single-use wrapper that adds no clarity is unnecessary complexity.
- **Magic numbers and strings:** Unexplained literal values (e.g., `86400`, `"v2"`, `7`) must be extracted into named constants with clear explanations.

---

### Axis 3: Architecture

**Goal:** Does this change respect and reinforce the system's structural integrity?

- **Module boundaries:** Does the code respect the intended boundaries between layers (e.g., presentation, domain, infrastructure)? Does a UI component reach directly into a database layer? Does a service import from another service's internal package?
- **Dependency direction:** Do dependencies flow in the correct direction? In clean architecture, outer layers depend on inner layers, not the reverse. Domain logic must never import from infrastructure.
- **Code duplication:** Is similar logic repeated in multiple places? Duplication is not just a readability issue; it is a maintenance hazard. Each duplicate is a future bug waiting to happen.
- **Complexity reduction vs. complexity relocation:** Does the change actually reduce complexity, or does it simply move it to a different file? Genuine simplification reduces the total number of things a developer needs to understand.
- **Single Responsibility:** Does each class or module have one primary reason to change? If a module changes for multiple unrelated reasons, it should be split.
- **Open/Closed:** Is the new code designed so future extensions can be added without modifying existing, stable code?
- **Dependency Inversion:** Does the code depend on abstractions (interfaces, protocols) rather than concrete implementations? This enables testability and future replacement.

---

### Axis 4: Security

**Goal:** Does the change introduce or leave unmitigated security risks?

> For detailed security review procedures, mandatory use of STRIDE threat modeling, and the full security checklist, **read `.agents/skills/expert-code-reviewer/references/SECURITY-HARDENING.md`** when performing a security-focused review.

The following are the minimum security checks to perform on **every** review, regardless of scope:

- **Input validation:** Is all data from external sources (user input, API responses, file contents, query parameters) validated at the system boundary before use?
- **Secret exposure:** Are there any hardcoded secrets (API keys, passwords, tokens, private URLs) in the code or in any file that would be committed to version control?
- **Authentication & authorization:** Do new or modified endpoints/functions verify that the caller is both authenticated (who they are) and authorized (what they are allowed to do)?
- **Output encoding:** Is user-supplied data encoded correctly before being rendered (HTML context, JSON context, SQL context) to prevent injection?
- **Trust boundaries:** Is the code treating external data (including LLM/AI output) as untrusted? Model output must be validated and encoded the same way as direct user input.
- **Error messaging:** Do error responses leak internal implementation details (stack traces, internal paths, database schema names)?

---

### Axis 5: Performance

**Goal:** Does the change avoid obviously wasteful or unbounded operations?

- **N+1 query problem:** Does the code execute a database query inside a loop, causing one query per item instead of a single batch query? This is the most common and severe performance anti-pattern in data access code.
- **Unbounded loops and lists:** Is there a loop or a data structure that could grow without limit based on user-controlled input? Unbounded growth is a denial-of-service risk.
- **Unnecessary re-renders (UI):** In reactive UI frameworks, does the change cause components to re-render or recompute when their dependencies have not changed?
- **Synchronous blocking in async context:** Is a slow, blocking operation (file I/O, network call, heavy computation) being performed on the main thread or in a context that should be non-blocking?
- **Redundant computation:** Is the same value being computed multiple times in a loop or within a single request lifecycle when it could be computed once and cached?
- **Hot path awareness:** Is the change on a code path that is called extremely frequently (e.g., inside a render loop, on every incoming message, per database row)? Changes on hot paths have disproportionate impact.
- **Pagination:** Does any new endpoint or query that returns a list of items implement pagination? Returning unbounded lists to clients is a common source of both performance problems and security issues.

---

## Severity Classification System

Every finding from any axis MUST be labeled with one of the following severity levels. Include the label as a prefix in the finding description to make priority crystal clear.

| Label            | Meaning                                                                                                                                 | Action Required                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **`[CRITICAL]`** | A defect that will cause data loss, a security breach, a system crash, or incorrect behavior in a clearly reachable scenario.           | Must be fixed before this change is merged. Non-negotiable.                                                           |
| **`[REQUIRED]`** | A clear violation of an established architectural principle, a significant code smell, or a flaw that will create maintenance problems. | Must be addressed. The author must either fix it or make a compelling case for why the principle does not apply here. |
| **`[NIT]`**      | A minor style inconsistency or naming preference that does not affect correctness or architecture.                                      | Optional. The author can fix it or leave it.                                                                          |
| **`[OPTIONAL]`** | A suggestion for a potentially better approach that is a matter of preference or trade-off.                                             | The author is free to take it or leave it. No justification required.                                                 |
| **`[FYI]`**      | Contextual information, a pointer to related code, or a heads-up that is not itself a flaw.                                             | No action required.                                                                                                   |

---

## Structural Remedies

When you identify an architectural issue, do not just flag it — propose a concrete remedy. Match the problem pattern to one of the following remedies:

| Problem Pattern                                                                    | Remedy                                                                                                                                                                 |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Long `if/else if` chain or `switch` on type                                        | Replace with a typed dispatch map (dictionary/object) or a polymorphic strategy. The caller selects a handler by key, not by conditional.                              |
| Two branches doing almost the same thing                                           | Collapse: extract the shared logic into one function. Pass the differing parts as parameters or use a simple flag only if the paths are truly just one decision apart. |
| A function that both orchestrates a workflow AND contains business logic           | Separate: the orchestrator should only call other functions; all business rules should be extracted into their own focused functions.                                  |
| Feature-specific logic living inside a shared utility module                       | Move: the shared module should only contain generic, reusable logic. Feature logic belongs in the feature's own module.                                                |
| A utility function being reimplemented when one already exists in the codebase     | Reuse: search the codebase for the canonical implementation and call it. Do not add a duplicate.                                                                       |
| Unclear data shapes passed as generic objects or maps                              | Make type boundaries explicit: define a dedicated type/struct/interface for the shape. Use it at every callsite for clarity and safety.                                |
| A wrapper class or function that only delegates to another without adding behavior | Delete: the pass-through wrapper adds indirection without value. Call the underlying function directly.                                                                |
| A single large file or function that handles too many responsibilities             | Extract helpers / split: create new files or modules for each distinct responsibility. Use the change-splitting strategies below to keep the PR reviewable.            |

---

## Change Sizing & Splitting Strategies

A change that is too large is a review risk: reviewers lose focus, bugs hide in volume, and merge conflicts multiply. Use these guidelines to evaluate the size of a submitted change and recommend splitting when necessary.

### Size Guidelines

| Lines Changed | Assessment                                                           |
| ------------- | -------------------------------------------------------------------- |
| ~100 lines    | Ideal. Easy to review thoroughly.                                    |
| ~300 lines    | Acceptable. May need extra care in review.                           |
| ~1,000+ lines | Must be split. A change of this size cannot be reviewed effectively. |

### File Size Signal

A file that exceeds ~1,000 total lines is itself a signal of accumulated complexity. When a review touches such a file, flag it for future splitting even if the current change is small.

### Splitting Strategies

When recommending that a change be split, suggest the appropriate strategy:

1. **Stack (Sequential):** Split into a series of dependent PRs that build on each other. PR #1 introduces the infrastructure, PR #2 uses it. Each must be merged in order.
2. **By file group (Parallel-safe):** If the changes touch independent files or modules, split them into separate PRs that can be reviewed and merged in any order.
3. **Horizontal (Layer-based):** Split by architectural layer. PR #1 makes the data model changes, PR #2 makes the service layer changes, PR #3 makes the UI changes.
4. **Vertical (Feature slice):** Split by feature completeness. PR #1 implements a narrow end-to-end slice (the core happy path), PR #2 adds error handling, PR #3 adds the UI polish.

### The Golden Rule of Splitting

**Keep refactoring and feature work separate.** A PR that both fixes architecture AND adds new functionality is the hardest to review and the most dangerous to revert. Refactoring should go in first, with tests passing, before the new feature is layered on top.
