# Pólya SDLC Coder 📐⚡
<!-- markdownlint-disable -->

> **Mathematical Problem-Solving Meets Uncle Bob's Clean Architecture for AI Coding Agents**  
> Inspired by George Pólya's 1945 masterpiece *How to Solve It*, Robert C. Martin's *Clean Architecture* & *Clean Code*, and Matt Pocock's *Skills for Real Engineers*.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-polya--sdlc--coder-181717?logo=github)](https://github.com/GulajavaMinistudio/polya-sdlc-coder)
[![Documentation](https://img.shields.io/badge/Documentation-Live%20Web-0ea5e9?logo=googlechrome&logoColor=white)](https://gulajavaministudio.github.io/polya-sdlc-coder/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/GulajavaMinistudio/polya-sdlc-coder/pulls)
[![Platforms](https://img.shields.io/badge/Platforms-Copilot%20%7C%20Antigravity%20%7C%20Cursor%20%7C%20Claude%20%7C%20Codex%20%7C%20Pi-blueviolet)](#-supported-platforms)

<p align="center">
  <img src="polya-sdlc-cats-compressed.jpg" alt="Pólya SDLC Coder Banner" width="760">
</p>

---

## 💡 Why Pólya SDLC Coder?

Most AI coding agents fail not because they cannot write code, but because they **start writing code too early**. 

When given an ambiguous prompt, agents hallucinate assumptions, skip edge cases, produce messy horizontal patches, break existing Clean Architecture seams, and generate unmaintainable boilerplate.

**Pólya SDLC Coder** equips your AI coding agent with a battle-tested, disciplined engineering system:

1. **First, Understand the Problem (`/to-spec`)**: Deconstruct *The Unknown*, *The Data*, and *The Condition*. Define Type-Driven contracts and map Clean Architecture seams before writing a single line of application code.
2. **Socratic Sparring & Stress-Testing (`/to-grill-me`)**: Pressure-test assumptions, explore sad paths, and force concrete A/B technical choices through turn-by-turn interview rounds with senior recommendations.
3. **Audit Condition & Readiness (`/to-clarify`)**: Interrogate ambiguities with a 5-axis sanity check and quantify an objective 0–100 Readiness Score before allocating implementation resources.
4. **Devise a Modular Plan (`/to-plan`)**: Break the feature into vertical tracer bullets (DB to UI) with Plan B contingencies.
5. **🛑 The Pause Rule Gate**: The agent **MUST** halt and receive explicit human verification before writing functional code.
6. **Carry Out the Plan (`/to-code`)**: Enforce Uncle Bob's Clean Code, the Boy Scout Rule, and a Two-Layer Testing Mandate with zero tolerance for cheating or suppressions.
7. **Look Back (`/to-review` & `/to-docs`)**: Audit 5 SOLID principles, test boundary invariants, and author structured Diátaxis documentation.

---

## 🌐 Interactive Web Documentation

Prefer an interactive visual guide? Explore the official web documentation and live skill catalog:

<p align="center">
  <a href="https://gulajavaministudio.github.io/polya-sdlc-coder/">
    <img src="https://img.shields.io/badge/Live%20Web%20Docs-gulajavaministudio.github.io%2Fpolya--sdlc--coder-0ea5e9?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Web Documentation">
  </a>
</p>

🔗 **Live URL:** [https://gulajavaministudio.github.io/polya-sdlc-coder/](https://gulajavaministudio.github.io/polya-sdlc-coder/)

### 🌟 What's in the Web Documentation?
- **🗂️ 15-Skill Interactive Catalog**: Deep dive into all 15 skills across the 6 SDLC phases with real-world chat prompts, input/output contracts, and Diátaxis documentation.
- **⚡ Copy-and-Paste Install Configurator**: One-click scripts and `npx skills` commands tailored for macOS, Linux, and Windows with instant clipboard affordance.
- **📐 6-Phase Lifecycle Visualizer**: Visual mapping of George Pólya's 1945 heuristic principles integrated with Uncle Bob's Clean Architecture seams and the **🛑 The Pause Rule Gate**.
- **📱 Apple HIG Aesthetics & Mobile-Ready**: Dark mode typography, smooth micro-interactions, responsive design across desktop, tablet, and smartphones.

---

## 📚 The Origin Story: Why George Pólya?

<p align="center">
  <img src="polya-books-cats.jpg" alt="George Pólya - How to Solve It" width="680">
</p>

### The Fundamental Flaw of Modern AI Coding

Large Language Models are, by their architectural nature, **greedy token generators**. When given a prompt like *"Build me an authentication service with Redis"*, an AI agent immediately begins emitting lines of code.

It plunges straight into writing implementation details without pausing to ask:
- *What are the precise invariants and boundaries of the problem?*
- *What data models already exist in the codebase?*
- *What edge cases will cause silent failures in production?*

The result is painfully familiar to anyone using AI assistants: hallucinated libraries, premature horizontal coding, broken architectural seams, and brittle patches that fall apart on the first edge case. **Over 90% of AI-generated bugs stem not from syntactic errors, but from premature implementation on top of misunderstood requirements.**

### George Pólya's 1945 Discovery (*How to Solve It*)

In 1945, Hungarian mathematician **George Pólya** (1887–1985) published *How to Solve It*, a foundational treatise on heuristics and mathematical problem-solving that went on to sell over a million copies worldwide.

Pólya demonstrated that human breakthroughs in mathematics and engineering do not occur by rushing into calculations or blind trial-and-error. Instead, they require a disciplined mental framework consisting of **Four Invariant Stages**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   GEORGE PÓLYA'S 4-STAGE HEURISTIC (1945)              │
├────────────────────────────────────────────────────────────────────────┤
│ 1. UNDERSTAND THE PROBLEM  ➔  What is the unknown? What are the data?  │
│                               What is the condition? Can it be met?    │
│ 2. DEVISE A PLAN           ➔  Find connections between data & unknown. │
│                               Isolate auxiliary problems. Restate it.  │
│ 3. CARRY OUT THE PLAN      ➔  Check each step. Can you prove that each │
│                               individual step is sound and correct?    │
│ 4. LOOK BACK (EXAMINE)     ➔  Check the result. Derive it differently. │
│                               Promote reusable patterns to memory.     │
└────────────────────────────────────────────────────────────────────────┘
```

> *"It is foolish to answer a question that you do not understand. It is sad to work for an end that you do not desire."*  
> — **George Pólya**, *How to Solve It (1945)*

### Bridging Mathematics, Uncle Bob's Clean Architecture & AI Agents

**Pólya SDLC Coder** was born from a simple realization: **AI coding agents need Pólya's mental discipline more than human developers do.**

By mapping Pólya's 1945 mathematical framework directly onto **Robert C. Martin's ("Uncle Bob") Clean Architecture** and modular agent skills, we transform unpredictable AI assistants into disciplined, principal-level engineering partners:

| George Pólya's Heuristic (1945) | Software Craftsmanship Seam | Pólya SDLC Agent Skill |
| :--- | :--- | :--- |
| **"Understanding the Problem"** | Domain Boundaries, DTOs & Contracts | [`/to-spec`](skills/to-spec) & [`/to-explore`](skills/to-explore) |
| **"Socratic Sparring & Challenging Premises"** | Adversarial Design Interview & A/B Trade-Offs | [`/to-grill-me`](skills/to-grill-me) |
| **"Interrogating the Condition"** | Edge-Case Invariants & Assumption Auditing | [`/to-clarify`](skills/to-clarify) |
| **"Devising a Plan & Auxiliary Problems"** | Vertical Tracer Bullets & Plan B | [`/to-plan`](skills/to-plan) |
| **"The Hesitation Before Calculating"** | Explicit Human Alignment Gate | **🛑 The Pause Rule Gate** |
| **"Carrying Out the Plan"** | Uncle Bob's Clean Code & Micro-TDD | [`/to-code`](skills/to-code) & [`/to-quick-fix`](skills/to-quick-fix) |
| **"Looking Back & Examining the Result"** | 5 SOLID Principles Audit & Diátaxis Docs | [`/to-review`](skills/to-review) & [`/to-docs`](skills/to-docs) |
| **"The Two Golden Questions (Memory)"** | Cross-Session Architectural Knowledge | [`/to-memory`](skills/to-memory) |

This system prevents the agent from writing a single line of application code until the problem is fully deconstructed, assumptions are verified, and you have personally given explicit approval at **The Pause Rule**.

---

## 🚀 Quick Start & Installation

> [!TIP]
> **Try the Interactive Web Configurator**: You can also use our [Live Web Installation Configurator](https://gulajavaministudio.github.io/polya-sdlc-coder/#install) to easily switch between operating systems and copy terminal scripts with one click.

You can install **Pólya SDLC Coder** into your project using any of the three methods below:

### Method 1: Agentic Installation via `npx skills` (Recommended)

The modern, package-manager-free way to install AI agent skills across tools (GitHub Copilot, Google Antigravity, Cursor, Claude Code, and more).

> [!NOTE]
> `npx skills` automatically inspects the [`skills/`](skills) directory in this repository to discover and pull the agent skills into your project.

#### Option A: Install the Bootstrapper Skill (`to-init`)

Install just the bootstrapper skill to keep your skills directory lightweight:

```bash
# Add to-init via GitHub shorthand
npx skills add GulajavaMinistudio/polya-sdlc-coder/skills/to-init
```

Then in your AI Assistant chat window, run:

```text
/to-init setup this project
```

The bootstrapper will autonomously configure project governance (`AGENTS.md`), orchestrator rules (`.agents/rules/PolyaOrchestrator.md`), standards, instructions, and all sub-skills into your repository.

#### Option B: Install All Skills Directly

If you prefer to install the entire 15-skill suite directly into your project:

```bash
# Add all skills from this repository
npx skills add GulajavaMinistudio/polya-sdlc-coder
```

After installation, run `/to-init` in your chat window to scaffold the root `AGENTS.md` and project governance files.

---

### Method 2: Automated Interactive Script (One-Liner)

Run the interactive installer from your terminal in the root of your target project. It safely backs up existing memory files and lets you choose target platforms (`.agents/`, `.claude/`, or `.cursor/`):

#### 🪟 Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/GulajavaMinistudio/polya-sdlc-coder/main/install.ps1 | iex
```

#### 🐧 Linux / macOS (Bash & Zsh)

```bash
curl -fsSL https://raw.githubusercontent.com/GulajavaMinistudio/polya-sdlc-coder/main/install.sh | bash
```

The interactive script will:
1. Clone or download the latest release of `polya-sdlc-coder`.
2. Ask you to select target platform folders (`.agents/`, `.claude/`, or `.cursor/`).
3. Preserve and merge existing `AGENTS.md` or `memory.instructions.md` safely.

---

### Method 3: Manual Installation

If you prefer full manual control:

```bash
# 1. Clone the repository
git clone https://github.com/GulajavaMinistudio/polya-sdlc-coder.git

# 2. Copy the configuration to your project
# For standard platforms (Copilot, Antigravity, Codex, Pi, OpenCode):
cp -r polya-sdlc-coder/.agents /path/to/your/project/
cp polya-sdlc-coder/AGENTS.md /path/to/your/project/

# For Claude Code:
cp -r polya-sdlc-coder/.agents /path/to/your/project/.claude
cp polya-sdlc-coder/AGENTS.md /path/to/your/project/

# For Cursor:
cp -r polya-sdlc-coder/.agents /path/to/your/project/.cursor
cp polya-sdlc-coder/AGENTS.md /path/to/your/project/
```

---

## 🔄 The Idea-to-Ship Spine

Pólya SDLC follows a strict, disciplined pipeline designed to eliminate ambiguity and prevent messy code iteration:

```text
====================================================================================================
               POLYA-SDLC COMPLETE PIPELINE: DISCOVERY ➔ SPEC ➔ PLAN ➔ CODE ➔ REVIEW ➔ DOCS
====================================================================================================

[ Phase 0: DISCOVERY & EXPLORATION ] (Pólya Phase 0: Getting Acquainted)
      │
      ▼
┌───────────────────────────────┐
│ /to-explore                   │ ──▶ [ docs/discovery/ ] ──▶ ( Topography Critique, Trade-Offs, Spikes )
└───────────────────────────────┘
      │
      ├─────────────────────────────────────────────────┐
      │ (Path A: Optional Business Requirements)       │ (Path B: Direct Technical Architecture)
      ▼                                                 │
┌───────────────────────────────┐                       │
│ /to-prd                       │ ──▶ [ docs/prd/ ]     │
└───────────────────────────────┘                       │
      │                                                 │
      └─────────────────────────┬───────────────────────┘
                                │
                                ▼
[ Phase 1: SPECIFICATION ] (Pólya Phase 1: Understand the Problem)
      │
      ▼
┌───────────────────────────────┐
│ /to-spec                      │ ──▶ [ docs/spec/ & docs/adr/ ] ──▶ ( Sanity Check & Equation Mapping )
└───────────────────────────────┘
      │
      ├─────────────────────────────────────────────────┐
      │ (Turn-by-turn design sparring)                  │ (Formal condition sanity check)
      ▼                                                 ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│ /to-grill-me                  │               │ /to-clarify                   │ ──▶ [ docs/audit/ ]
└───────────────────────────────┘               └───────────────────────────────┘
      │ (Decisions Log & ADRs)                          │ (Readiness Score >= 80)
      └─────────────────────────┬───────────────────────┘
                                │
                                ▼
[ Phase 2: PLANNING ] (Pólya Phase 2: Devising a Plan)
      │
      ▼
┌───────────────────────────────┐
│ /to-plan                      │ ──▶ [ docs/plan/ ] ──▶ ( Land & Expand / Tracer Bullets )
└───────────────────────────────┘
      │
      ├─────────────────────────────────────────────────┐
      │ (Plan Stress-Testing & Plan B)                  │ (Plan Readiness Gate)
      ▼                                                 ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│ /to-grill-me                  │               │ /to-clarify                   │
└───────────────────────────────┘               └───────────────────────────────┘
      │                                                 │
      └─────────────────────────┬───────────────────────┘
                                │
                                ▼
🛑 MANDATORY GATE: THE PAUSE RULE
(Halt execution! Await explicit user confirmation before writing functional code)
      │
      ▼ [Approved]
[ Phase 3: IMPLEMENTATION ] (Pólya Phase 3: Carrying Out the Plan)
      │
      ▼
┌───────────────────────────────┐
│ /to-code                      │ ──▶ ( Clean Code, Respice Finem, Boy Scout Rule, Surgical Edits )
└───────────────────────────────┘
      │
      ▼
[ Phase 4: REVIEW & AUDIT ] (Pólya Phase 4: Looking Back)
      │
      ├───────────────────────────────┐
      │ (If Verified & Approved)      │ (If Defects / Invariant Violations Emerge)
      ▼                               ▼
┌───────────────────────────────┐   ┌───────────────────────────────┐
│ /to-docs                      │   │ /to-fix                       │ ──▶ ( First Principles, Trace Broken Seam )
└───────────────────────────────┘   └───────────────────────────────┘
      │ [docs/{tutorials,how-to,reference,explanation}/]
      ▼
[ Phase 6: TECHNICAL DOCUMENTATION ] (Pedagogical Transfer & Diátaxis Framework)

════════════════════════════════════════════════════════════════════════════
[ AUTONOMOUS HUB / TRIAGE ]     ──▶ /to-ask-help   (Autonomous intent reconnaissance & diagnostic)
[ SOCRATIC SPARRING ]          ──▶ /to-grill-me   (Turn-by-turn design interview & stress-test)
[ FAST-TRACK BYPASS ]           ──▶ /to-quick-fix  (Routine, XS/S, One-Shot Fixes)
[ ARCHITECTURE TOPOGRAPHY ]     ──▶ /to-map        (Traverse, Seams, docs/ARCHITECTURE.md)
[ PERSISTENT MEMORY ]           ──▶ /to-memory     (Checkpoint to memory.instructions.md)
[ PROJECT BOOTSTRAPPER ]        ──▶ /to-init       (Scaffold AGENTS.md & .agents/ suite)
════════════════════════════════════════════════════════════════════════════
```

---

## 🧰 Skill Catalog

> [!TIP]
> Explore, search, and inspect the complete 15-skill catalog with copyable chat prompts in our [Interactive Web Skill Catalog](https://gulajavaministudio.github.io/polya-sdlc-coder/#skills).

Each skill in Pólya SDLC is modular, standalone, and focused on a single responsibility:

| Slash Command | Skill Folder | Phase / Role | Description & Pólya Heuristic Focus | Primary Output Artifact |
| :--- | :--- | :--- | :--- | :--- |
| **`/to-ask-help`** | [`to-ask-help`](skills/to-ask-help) | **Hub & Triage** | Autonomous codebase reconnaissance, intent classification, and Socratic 3-question diagnostic. | Triage Card & Routing Guidance |
| **`/to-explore`** | [`to-explore`](skills/to-explore) | **Phase 0: Discovery** | Problem framing, repository topography critique, architectural trade-offs (*Inventor's Paradox*), and spikes. | `docs/discovery/{slug}-discovery.md` |
| **`/to-prd`** | [`to-prd`](skills/to-prd) | **Phase 0.5: PRD** | Business problem framing, SMART user stories, and acceptance boundaries (*Optional branch*). | `docs/prd/{slug}-prd.md` |
| **`/to-spec`** | [`to-spec`](skills/to-spec) | **Phase 1: Spec** | Deconstruct *Unknown, Data, Condition*, *Setting Up Equations* (DTOs), and map Clean Architecture seams. | `docs/spec/{slug}-spec.md` + `docs/adr/` |
| **`/to-grill-me`** | [`to-grill-me`](skills/to-grill-me) | **Sparring: Socratic Interview** | Turn-by-turn design interview, Devil's Advocate, 1-question A/B trade-offs, and stress-testing. | Decisions Log & ADR Proposal |
| **`/to-clarify`** | [`to-clarify`](skills/to-clarify) | **Checkpoint: Clarify** | Interrogate ambiguities, `[ASSUMPTION]` tags, Condition Sanity Check, and Readiness Score (0–100). | `docs/audit/{slug}-clarification.md` |
| **`/to-plan`** | [`to-plan`](skills/to-plan) | **Phase 2: Plan** | *Working Backwards*, *Auxiliary Problems*, Land & Expand (Tracer Bullets), Plan B, and **The Pause Rule**. | `docs/plan/{slug}-plan.md` |
| **`/to-code`** | [`to-code`](skills/to-code) | **Phase 3: Implement** | Clean Code execution, single-responsibility small functions, and *Boy Scout Rule* compliance. | Production Source Code & Tests |
| **`/to-review`** | [`to-review`](skills/to-review) | **Phase 4: Review** | Risk-tiered code/PR review (`Quick`/`Standard`/`Deep`), 5 SOLID principles, 14-vector defensive security, `[Important]`/`[Nit]`/`[Pre-existing]` signal filtering, `Bug Class` sweeps, 3-round convergence, and `GO/NO-GO` release gate. Supports `/to-review security`. | `docs/reviews/{slug}-review.md` |
| **`/to-fix`** | [`to-fix`](skills/to-fix) | **Phase 5: Bug Fix** | Cease blind patching, return to First Principles, trace broken seams, and formulate reproduction test. | `docs/bug-reports/{slug}-bugfix.md` |
| **`/to-docs`** | [`to-docs`](skills/to-docs) | **Phase 6: Docs** | Author structured documentation based on the 4 Diátaxis quadrants (Tutorials, How-To, Reference, Explanation). | `docs/{quadrant}/{slug}.md` |
| **`/to-quick-fix`** | [`to-quick-fix`](skills/to-quick-fix) | **Fast-Track Bypass** | Routine problems, one-shot surgical fixes, and minor refactors (*Pedantry vs Mastery*, *The Excavator Rule*). | Surgical File Diff ($\le 2$ files) |
| **`/to-map`** | [`to-map`](skills/to-map) | **Utility: Topography** | Traverse directory structure, map Clean Architecture seams, and generate `docs/ARCHITECTURE.md`. | `docs/ARCHITECTURE.md` |
| **`/to-memory`** | [`to-memory`](skills/to-memory) | **Utility: Memory** | Read, write, and compact session context to/from `memory.instructions.md`. | `memory.instructions.md` |
| **`/to-init`** | [`to-init`](skills/to-init) | **Utility: Scaffolding** | Autonomous setup and architecture bootstrapper for project governance. | `AGENTS.md` + `.agents/` |

---

## 📖 How to Use: A Typical Workflow

### 1. Route Your Request (The Socratic Navigator)

Don't know which phase to start with? Simply ask:

```text
/to-ask-help Add real-time order tracking using WebSockets and Redis
```

The navigator conducts autonomous reconnaissance of your codebase, evaluates Unknown vs Data vs Condition, and presents a **Pólya Triage Card**:

```text
+-----------------------------------------------------------------------+
|                         POLYA TRIAGE CARD                             |
+-----------------------------------------------------------------------+
| The Unknown   : Real-time WebSocket order tracking stream             |
| The Data      : Order entity, Redis Pub/Sub adapter, React UI hook    |
| The Condition : Sub-100ms latency, automatic reconnection, JWT auth   |
| Seams Found   : Domain (Order), Adapters (RedisStream), UI (Hook)     |
| Recommended   : /to-explore or /to-spec @docs/spec/...                |
+-----------------------------------------------------------------------+
```

---

### 2. Problem Discovery & Architectural Spikes (`/to-explore`)

Before locking in schemas or code, explore feasibility, technology tradeoffs, and repository topology:

```text
/to-explore Investigate architecture options for real-time order tracking (WebSockets vs SSE vs Polling)
```

The agent surveys the codebase, benchmarks options against existing dependencies, and outputs `docs/discovery/order-tracking-discovery.md`:
- **Repository Topography Critique**: Evaluates existing state management, HTTP layers, and message buses.
- **Trade-Off Analysis (*The Inventor's Paradox*)**: Weighs WebSockets vs SSE vs Long-Polling across complexity, latency, and infrastructure cost.
- **Architectural Spikes**: Outlines minimal prototype verification without cluttering production seams.

---

### 3. (Optional) Define Business Requirements & User Stories (`/to-prd`)

When a feature requires deep product alignment, user stories, and business acceptance criteria:

```text
/to-prd @docs/discovery/order-tracking-discovery.md
```

The agent frames the business perspective and generates `docs/prd/order-tracking-prd.md`:
- **User Personas & Stories**: Formulates *As a customer, I want to track my delivery rider in real time...*
- **SMART Acceptance Criteria**: Defines observable metrics (e.g., location updates arrive within $\le 2$ seconds).
- **Explicit Non-Goals**: Enforces strict boundaries (e.g., in-app rider chat is out of scope for V1).

---

### 4. Specify & Map Architectural Seams (`/to-spec`)

Transform product requirements or discovery findings into a formal technical blueprint:

```text
/to-spec @docs/prd/order-tracking-prd.md
```
*(Or directly from discovery: `/to-spec @docs/discovery/order-tracking-discovery.md`)*

The agent creates `docs/spec/order-tracking-spec.md`, defining:
- **Clean Architecture Boundaries**: Entities ➔ Use Cases ➔ Interface Adapters ➔ Infrastructure.
- **DTOs & Discriminated Unions**: Complete payload schemas.
- **Invariants & Acceptance Criteria**: Tagged with sequential IDs (`REQ-001`, `AC-001`).
- **Assumptions Tagging**: Explicitly marked with `> [!WARNING] [ASSUMPTION-001]`.

---

### 5. Socratic Sparring & Design Interview (`/to-grill-me`)

Before locking in plans or when facing tough architectural trade-offs, put your design through an adversarial turn-by-turn design interview:

```text
/to-grill-me spec @docs/spec/order-tracking-spec.md
```

The agent assumes the role of **Pólya Socratic Sparring Partner (The Devil's Advocate)**:
- **1-Question Rule:** Never overwhelms you with a barrage of questions; asks exactly **ONE** sharp question per turn.
- **Do the Heavy Lifting:** Proposes 2–3 concrete, technically grounded options (Option A vs. Option B) derived from your repository.
- **Opinionated Senior Recommendation:** Always recommends the cleanest architectural choice with practical rationale.
- **Phase-Adaptive Versatility:** Can be summoned for raw ideas (`/to-grill-me "idea"`), PRDs (`/to-grill-me prd`), Specs (`/to-grill-me spec`), or execution plans (`/to-grill-me plan`).
- **Decisions Log:** Synthesizes settled choices into actionable document diffs or emits an ADR into `docs/adr/`.

---

### 6. Audit Condition & Readiness Gate (`/to-clarify`)

When the specification is drafted and design tensions are resolved, conduct a formal quality gate audit:

```text
/to-clarify @docs/spec/order-tracking-spec.md
```

The agent acts as a relentless **Pólya Clarification Analyst**:
- **5-Axis Sanity Check:** Verifies Goal/Premise, User Flows & 5 UI States, Sad Paths, Seams, and Scope Boundaries.
- **Epistemic Doubt:** Evaluates `> [!WARNING] [ASSUMPTION-XXX]` tags and hunts for unaddressed edge cases.
- **Readiness Score (0–100):** Evaluates Completeness (40%), Clarity (30%), and Alignment (30%). If the score is $< 80$, the feature cannot proceed to planning.

---

### 7. Create Vertical Tracer Bullets (`/to-plan`)

```text
/to-plan @docs/spec/order-tracking-spec.md
```

The agent creates `docs/plan/order-tracking-plan.md`, slicing implementation into vertical, demoable tracer bullets:
- **Task 1 (Tracer Bullet 1)**: Domain Event + Redis Pub/Sub port + Mock Test.
- **Task 2 (Tracer Bullet 2)**: WebSocket gateway + JWT authentication adapter.
- **Task 3 (Tracer Bullet 3)**: Frontend hook + UI connection status indicator.
- **Contingency Plan B**: Fallback polling if WebSocket fails.

---

### 8. 🛑 The Pause Rule Gate

> [!CAUTION]
> **The Pause Rule**: The agent stops automatically after generating the plan. No code may be written until the developer reviews and confirms:
> 
> *"Plan reviewed and approved. Proceed to implementation."*

---

### 9. Implement with Clean Code Discipline (`/to-code`)

```text
/to-code @docs/plan/order-tracking-plan.md @docs/spec/order-tracking-spec.md
```

The agent ingests the approved Implementation Plan and Technical Specification, executing Task 1 (Tracer Bullet 1) with strict engineering discipline:
- **Uncle Bob's Clean Code**: Functions under 25 lines, single level of abstraction, intention-revealing names.
- **Boy Scout Rule**: Leaves touched files cleaner than found.
- **Two-Layer Testing Mandate**: Runs fast typechecks (`check:fast`) and vertical slice tests (`check:task`) before completing each task.
- **Anti-Cheat Floor Guard**: Forbidden from using `@ts-ignore`, skipping tests, or leaving dummy `TODO` comments.

---

### 10. Review, Audit & Transfer Knowledge (`/to-review` & `/to-docs`)

```text
# Adaptive Quality & Release Audit (Quick / Standard / Deep based on Risk Tier)
/to-review @docs/plan/order-tracking-plan.md @docs/spec/order-tracking-spec.md

# Focused Adversarial Security Audit
/to-review security @docs/spec/order-tracking-spec.md
```
Classifies the change by blast-radius **Risk Tier (`Low` / `Medium` / `High-Critical`)** and Review Depth (**`Quick` / `Standard` / `Deep`**), flagging sensitive paths with `[MANDATORY HUMAN AUDIT REQUIRED]`. Audits the code against the 5 SOLID principles, boundary invariants, and 14 defensive security vectors (OWASP, tenant isolation, LLM/MCP boundaries). Filters out linter noise by tagging every finding with **`[Important]`**, **`[Nit]`**, or **`[Pre-existing]`** plus its **`Bug Class`**, enforces 3-round review convergence, and issues a definitive `GO | NO-GO` verdict using a 3-state security taxonomy (`CONFIRMED`, `NEEDS_VALIDATION`, `REJECTED`) inside `docs/reviews/order-tracking-review.md`.

```text
/to-docs @docs/spec/order-tracking-spec.md @docs/plan/order-tracking-plan.md
```
Generates clear documentation grounded in the verified contracts from the Specification and Plan, structured according to the **Diátaxis Framework** (Tutorial, How-To Guide, Reference, or Architectural Explanation) inside `docs/`.

---

## ⚡ Fast-Track Bypass (`/to-quick-fix`)

Need to fix a typo, update a configuration, or make a small 1–2 file mechanical change? You don't need a heavy 6-phase SDLC pipeline for minor edits:

```text
/to-quick-fix Fix typo in redis timeout config and update connection retry count
```

Adhering to Pólya's *Pedantry vs. Mastery* (1945), `/to-quick-fix` skips formal specs while upholding strict code quality, type checks, and atomic commits.

---

## 🔌 Supported Platforms

Pólya SDLC Coder supports all major modern AI coding agent platforms through a **Single Source of Truth** architecture:

| Platform | Configuration Directory | Detection & Setup |
| :--- | :--- | :--- |
| **GitHub Copilot** | `.agents/` | Native support in VS Code, JetBrains, and Copilot CLI |
| **Google Antigravity** | `.agents/` | Full skill and persona execution via Antigravity runner |
| **Cursor** | `.cursor/` or `.agents/` | Seamless skill dispatching and rules integration |
| **Claude Code** | `.claude/` | Direct plugin/skill integration |
| **OpenCode / CommandCode** | `.agents/` | Automated discovery of sub-skills |
| **ChatGPT Codex** | `.agents/` | Execution via project instruction files |
| **Pi Dev & Oh My Pi (`omp`)** | `.agents/` | First-class agent skill compatibility |

---

## 🧠 Persistent Session Memory

Pólya SDLC maintains durable context across chat sessions via [`memory.instructions.md`](.agents/instructions/memory.instructions.md):

- Run `/to-memory` to view, checkpoint, or compact current session learnings.
- Documents active tracer bullets, verified architectural decisions (ADRs), and known pitfalls.
- Prevents context loss between restarts or tool switches.

---

## 🤝 Contributing

Contributions are warmly welcomed! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-new-skill`.
3. Adhere to George Pólya's heuristics and Uncle Bob's Clean Architecture conventions.
4. Test and verify all skill definitions with lint checks.
5. Open a Pull Request with a clear, structured description.

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<p align="center">
  <i>"It is foolish to answer a question that you do not understand. It is sad to work for an end that you do not desire."</i><br>
  — <b>George Pólya</b>, <i>How to Solve It (1945)</i>
</p>
