# Project Constitution

<!--
  This document establishes the non-negotiable architectural and engineering principles for this project.
  It is established once at project inception and reviewed when major architectural paradigms shift.
-->

## Core Principles

### I. Test-First Mandate (NON-NEGOTIABLE)
- Functional code is NEVER written before a failing test exists at a pre-agreed seam.
- The Red-Green-Refactor cycle is strictly enforced across all development and bug remediation tasks.
- Tests assert **State and Outcomes**, never internal implementation details or interactions.

### II. Specification-Driven Truth
- Specifications in `/spec/` are executable sources of truth.
- Code serves the specification; changes to system behavior must originate in the specification before being reflected in code.

### III. Vertical Slicing (Tracer Bullets)
- Features are delivered as complete, end-to-end vertical slices (from database/contract through business logic to user interface).
- Layer-by-layer horizontal slicing is strictly forbidden.

### IV. Domain Language Fidelity
- All technical identifiers, database columns, API payloads, and test descriptions must strictly match the canonical terms defined in `CONTEXT.md`.

### V. Simplicity & Minimal Footprint (Rule 0)
- The simplest solution that passes the test suite is always chosen first.
- Premature abstractions (factories, generic handlers) are prohibited until at least three concrete use cases demand them.
