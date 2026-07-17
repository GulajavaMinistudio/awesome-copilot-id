# Clean Code & Clean Architecture Principles

This document serves as the mandatory evaluation rubric for the **Standards Axis** during a Code Review. It defines the specific, non-negotiable principles of Clean Code, SOLID, and Clean Architecture by Robert C. Martin.

When reviewing code, prioritize macro-architecture (Clean Architecture, SOLID) over micro-architecture (Clean Code syntax), unless the micro-level violations severely impact readability or safety.

## 1. Clean Code (Micro-Level / Methods & Classes)

* **Meaningful Names (Intention-Revealing):**
  * Variables, functions, and classes must reveal their intent, why they exist, and what they do.
  * Avoid magic numbers; use named constants instead.
  * Avoid abbreviations or generic names (e.g., `data`, `info`, `manager` unless explicitly justified).
* **Functions (Small & Focused):**
  * **Do One Thing:** A function should do one thing, do it well, and do it only.
  * **One Level of Abstraction:** Statements within a function should all be at the same level of abstraction.
  * **Minimize Arguments:** Functions should ideally have 0-2 arguments. Three or more require justification or grouping into an object.
* **Comments:**
  * Code should explain itself. Do not use comments to explain "WHAT" the code is doing.
  * Only use comments to explain "WHY" (business decisions, workarounds, or technical constraints).
* **Error Handling:**
  * Use **Exceptions** over returning error codes.
  * **Do not pass `null`** and **do not return `null`**. Return empty collections or use the Null Object pattern instead.
* **DRY (Don't Repeat Yourself):**
  * Avoid duplicating code. Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

## 2. SOLID Principles (Mid-Level / Class Design)

* **S - Single Responsibility Principle (SRP):**
  * A class or module should have one, and only one, reason to change.
  * Gather together things that change for the same reasons. Separate things that change for different reasons.
* **O - Open/Closed Principle (OCP):**
  * Software entities should be open for extension but closed for modification.
  * New behavior should be added by writing new code, not by changing existing working code.
* **L - Liskov Substitution Principle (LSP):**
  * Derived classes must be substitutable for their base classes without breaking system behavior.
* **I - Interface Segregation Principle (ISP):**
  * Make fine-grained interfaces that are client-specific.
  * Clients should not be forced to depend on methods they do not use.
* **D - Dependency Inversion Principle (DIP):**
  * High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).
  * Abstractions should not depend on details. Details should depend on abstractions.

## 3. Clean Architecture (Macro-Level / System & Boundaries)

* **The Dependency Rule:**
  * Source code dependencies MUST point **inward**, toward higher-level policies (Entities and Use Cases).
  * Nothing in an inner circle can know anything at all about something in an outer circle.
* **Separation of Layers:**
  1. **Entities (Enterprise Business Rules):** Encapsulate the most general and high-level rules. They are the least likely to change when something external changes.
  2. **Use Cases (Application Business Rules):** Encapsulate and implement all use cases of the system. They orchestrate the flow of data to and from the entities.
  3. **Interface Adapters:** Convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency such as the DB or the Web. (e.g., Controllers, Presenters, Gateways).
  4. **Frameworks & Drivers:** The outermost layer is generally composed of frameworks and tools such as the Database, the Web Framework, UI, etc.
* **Independent of Details:**
  * The architecture must not depend on the UI, the database, or any external agency. These are "plugins" to the business rules. Business rules should not know about SQL, HTTP, or screen renders.
