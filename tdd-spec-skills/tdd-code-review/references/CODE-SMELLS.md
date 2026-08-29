# Code Smell Baseline

This document provides a baseline of code smells derived from Martin Fowler's *Refactoring*. These heuristics apply to any codebase and represent structural weaknesses that make code harder to read, maintain, or extend.

When performing a code review (specifically evaluating the **Readability** and **Architecture** axes), use these smells as a detection lens.

> **Important Constraint:** These smells are *heuristics*, not hard rules. A documented repository standard always overrides this baseline. If the repo explicitly endorses a pattern that would normally be flagged as a smell, suppress the finding.

---
<!-- markdownlint-disable -->

## The 12 Baseline Smells

For each smell you spot, name the smell in your review finding, quote the relevant code hunk, and suggest the remedy below.

### 1. Mysterious Name

- **What it is:** A function, variable, parameter, class, or module whose name does not reveal what it does, what it holds, or why it exists.
- **Example:** `processData(d)`, `Manager`, `handleStuff()`, `flag1`.
- **How to fix:** Rename it to honestly reflect its purpose. If you cannot find an honest, clear name, it often indicates that the design itself is murky or the component has too many responsibilities.

### 2. Duplicated Code

- **What it is:** The exact same logic or the same structural shape of logic appears in more than one place in the change.
- **Example:** Two functions in different files that both fetch a user, handle a specific error, and parse the result in the exact same sequence.
- **How to fix:** Extract the shared logic into a single canonical function or module, and have all sites call that central implementation.

### 3. Feature Envy

- **What it is:** A method or function that reaches into another object's or module's data more frequently than it accesses its own. It "envies" the data of the other component.
- **Example:** A `UserPrinter` class that calls `user.getFirstName()`, `user.getLastName()`, and `user.getAge()` to format a string, rather than the `User` object formatting itself.
- **How to fix:** Move the method (or the envied portion of the method) onto the object or module that actually holds the data.

### 4. Data Clumps

- **What it is:** The same group of 3 or 4 variables (fields, parameters) constantly travel together across multiple functions or classes. They are a domain concept waiting to be born.
- **Example:** Passing `startDate` and `endDate` together to five different reporting functions.
- **How to fix:** Bundle the variables into a single data structure or class (e.g., `DateRange`), and pass that single object instead.

### 5. Primitive Obsession

- **What it is:** Using built-in primitive types (strings, integers, booleans) to represent domain concepts that deserve their own types, especially when those concepts have rules or validation.
- **Example:** Using a `string` for a Zip Code or a `string` for a Phone Number, resulting in validation logic scattered everywhere the string is used.
- **How to fix:** Create a small, dedicated type or value object (e.g., `ZipCode`, `PhoneNumber`) that encapsulates the primitive and its validation logic.

### 6. Repeated Switches

- **What it is:** The exact same `switch` statement or `if/else if` chain switching on the same type code appears in multiple places across the change.
- **Example:** Switching on `user.role` to determine UI rendering, and then switching on `user.role` again in a different file to determine routing.
- **How to fix:** Replace the conditional logic with polymorphism, or extract the logic into a single shared map/dictionary that all sites reference. When a new type is added, you should only have to update it in one place.

### 7. Shotgun Surgery

- **What it is:** Making a single logical change or adding a single feature requires making scattered, minor edits across many different files.
- **Example:** Adding a new database field requires touching the schema file, the repository, the service layer, the controller, and three different UI components.
- **How to fix:** Gather the scattered logic that changes together and move it into a single cohesive module.

### 8. Divergent Change

- **What it is:** A single file, class, or module is frequently edited for multiple, entirely unrelated reasons. It has lost its single responsibility.
- **Example:** A `UserService` file that is modified when the database schema changes AND when the password hashing algorithm changes AND when the email notification format changes.
- **How to fix:** Split the module so that each resulting component changes for only one reason (e.g., `UserRepository`, `PasswordHasher`, `UserNotifier`).

### 9. Speculative Generality

- **What it is:** Abstractions, hooks, parameters, or generic interfaces added for future needs that do not currently exist in the spec or PRD.
- **Example:** Adding an `ISmsProvider` interface and a factory when the system only uses, and only plans to use, Twilio.
- **How to fix:** Delete it. Inline the abstractions back down to concrete implementations. Wait until a real, second use case emerges before generalizing.

### 10. Message Chains

- **What it is:** Long navigation chains where a client asks an object for another object, which asks for another object, and so on. The caller becomes tightly coupled to the entire navigation structure.
- **Example:** `customer.getAddress().getCountry().getIsoCode()`.
- **How to fix:** Hide the delegation chain. Create a single method on the first object that directly provides the needed value: `customer.getCountryIsoCode()`.

### 11. Middle Man

- **What it is:** A class, module, or function that does almost nothing except delegate calls to another component. It adds indirection without adding value.
- **Example:** A controller that just calls a service method with the exact same arguments, and the service method just calls the repository with the exact same arguments.
- **How to fix:** Cut out the middle man. Let the caller invoke the real target directly, unless the middle man is explicitly required by the architecture (e.g., for transaction boundaries).

### 12. Refused Bequest

- **What it is:** A subclass or implementer that ignores, overrides, or throws `NotImplementedError` for most of the methods it inherits from its parent or interface.
- **Example:** A `Bird` base class with a `fly()` method, and a `Penguin` subclass that overrides `fly()` to throw an error.
- **How to fix:** The inheritance hierarchy is wrong. Drop the inheritance and use composition, or extract the shared behavior into a new, smaller interface.

### 13. Lazy Placeholders (LLM Artifacts)

- **What it is:** Code containing comments like `// ... keep existing code ...` or `// implement later`, often generated by AI assistants, that breaks compilation or leaves production logic incomplete.
- **Example:** A submitted PR where a function body is literally replaced with `// TODO: rest of logic`.
- **How to fix:** This is a **[CRITICAL]** violation. The code must be fully implemented before being merged. Reject the change and instruct the author (or agent) to write the complete, working code.

---

## Dead Code Hygiene

Dead code is a specific type of code smell that creates immediate confusion. It forces the reader to ask: *"Is this incomplete? Was it left here for a reason? Is it safe to delete?"*

When reviewing code, actively look for:

1. **Commented-out code blocks:** Code should be in version control, not in comments.
2. **Unreachable branches:** `if (false)` or logic after an unconditional `return`.
3. **Unused variables or parameters:** Especially parameters in new functions that were declared but never referenced.
4. **Unused imports:** Clutter that slows down IDEs and readers.
5. **Orphaned code after refactoring:** A function that was replaced by a new implementation, but the old one was never deleted.

**Reviewer Action:** List all dead code explicitly. Because the reviewer agent must not delete code without user consent, your recommendation should be: *"This appears to be dead code. If it is no longer needed, please delete it to reduce cognitive load."*
