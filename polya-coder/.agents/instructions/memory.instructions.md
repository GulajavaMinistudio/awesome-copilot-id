# Project Memory Log

> Active Location: `.agents/instructions/memory.instructions.md`
> This file is managed by the `memory-manager` skill.
> It persists context across AI chat sessions to prevent knowledge loss.
> Do NOT manually edit this file unless necessary.

---

## 🧠 Knowledge Base

> This section accumulates cross-session knowledge that must survive compaction.
> Updated during Compaction Mode (Workflow 4). Do NOT delete entries here.

### Architecture & Patterns

- **Clean Architecture Seams:** Decoupled boundaries enforced (Entities ➔ Use Cases ➔ Adapters ➔ Frameworks).
- **Pólya Heuristic Pipeline:** Spec ➔ Clarify ➔ Plan ➔ Pause Rule ➔ Implement ➔ Review / Bug Fix.
- **Vertical Slicing Mandate:** All tasks organized into DB-to-UI tracer bullets; horizontal slicing prohibited.

### Dead-Ends (Do NOT Repeat)

| # | Attempted | Why It Failed | Correct Solution |
|---|-----------|---------------|------------------|
| 1 | Premature Coding | Bypassing Spec/Plan leads to 90% rework | Enforce Polya Phase 1 & The Pause Rule |
| 2 | Horizontal Slicing | Slicing by technical layer breaks incremental demoability | Formulate end-to-end vertical tracer bullets |
| 3 | Blind Shotgun Patching | Patching without First Principles & reproduction test leads to infinite error loops | Apply Bisection search & Incubation Circuit-Breaker (Hard-Stop after 2-3 fails) |
| 4 | Dogmatic Over-engineering | Forcing 4-layer directories onto single-file scripts / CLI tools creates useless overhead | Apply Scope Proportionality & Clean Code micro-principles (SRP, pure functions) |

### Key Metrics & Baselines

- **Target Test Coverage:** 100% test pass with zero linter suppressions (Floor-Guard).
- **Readiness Score Gate:** Minimum 80/100 to proceed between SDLC phases.

---
