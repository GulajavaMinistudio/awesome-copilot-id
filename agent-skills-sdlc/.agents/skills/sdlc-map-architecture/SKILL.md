---
name: sdlc-map-architecture
description: "Scans, analyzes, and documents the existing repository architecture, directories, and file purposes into docs/ARCHITECTURE.md."
license: MIT
---

<!-- markdownlint-disable -->

# Project Architecture Mapper Skill (`/sdlc-map-architecture`)

## Core Directives

1. **Language:** Follow the language policy defined in the project's AGENTS.md.
2. **Strict Scope Boundary:** You are an analyst and documentarian. Regardless of your active persona (e.g., GodModeDev, Senior Staff Engineer, Planner Architect, et al.), while executing _this specific skill_, you are **strictly forbidden** from modifying application source code or tests. Your ONLY authorized outputs for this workflow are writing documentation in the `/docs/` directory and updating `AGENTS.md` (or equivalent configuration files) to integrate references.
3. **No Session Lock:** This is a Utility Skill. It does not have a standalone persona and does not trigger Session Lock. Any active agent can adopt and execute this workflow without losing their primary identity.

## Overview

This skill outlines the workflow to explore an existing codebase, analyze its architectural structure, map out file/folder purposes, and generate a comprehensive `ARCHITECTURE.md` document. This is critical for context-sharing among other AI agents in the Spec-Driven Development ecosystem.

## When to Use

- When onboarding AI agents to an existing or legacy codebase.
- When the directory structure has undergone significant refactoring.
- When a user explicitly requests a breakdown of the repository's architecture.

## When NOT to Use

- Do NOT use this skill to generate Technical Specifications (use `/sdlc-define-specs` instead).
- Do NOT use this skill for code implementation, debugging, or bug fixing.

---

## Phase 1: Repository Exploration & Analysis Workflow

1.  **High-Level Scan:**
    - **Priority Read:** Read `README.md` first to understand the project's core purpose, tech stack, and setup instructions.
    - **Context Gathering:** Search for and read `CONTEXT.md`, `memory.instructions.md`, and any files in `docs/adr/` to absorb existing architectural decisions and domain knowledge.
    - **Configuration Scan:** Read root-level configuration files (`package.json`, `build.gradle`, `pom.xml`, `docker-compose.yml`, `tsconfig.json`, `.gitignore`, etc.). This reveals the tech stack, entry points, and dependencies.
    - **Monorepo Detection:** Check for multiple `package.json` files, `lerna.json`, or a `packages/` directory. If detected, analyze the architecture considering the monorepo structure.
    - **Prior Work Scan:** Read existing files in `docs/` and `spec/` directories to understand previously established architectures, API contracts, and business logic. Also, read any formatting rules in `.agents/standards/` if you need to generate new documentation.
2.  **Deep Directory Traversal:**
    - List the root directories.
    - Dive into key source directories (e.g., `src/`, `app/`, `lib/`), traversing up to 3 levels deep. Only read individual files when their purpose cannot be inferred from directory structure alone.
    - Identify architectural patterns (e.g., MVC, Clean Architecture, Feature-Sliced Design).
3.  **Purpose Inference:**
    - Analyze what each specific folder does based on its contents and naming conventions.
    - Identify where core business logic, UI components, utilities, and assets reside.
4.  **VERIFY:** Present a brief summary of your findings to the user.
5.  **APPROVAL:** Wait for explicit user confirmation before generating the formal document.

---

## Phase 2: Documentation Generation Workflow

1.  Check for the existence of `ARCHITECTURE.md` inside the `/docs/` directory. (If `/docs/` does not exist, create it). If `ARCHITECTURE.md` already exists, read its content first and ask the user whether to fully regenerate the document or update only the affected sections.
2.  **Content:** The file's content **MUST** adhere to the Mandatory Architecture Template. You MUST read this template from `.agents/skills/sdlc-map-architecture/references/ARCHITECTURE-TEMPLATE.md` before generating the document.
3.  **Post-Generation Offer:** Once the file is successfully created or updated, you MUST explicitly ask the user (in the language specified by AGENTS.md):
    _"The project architecture document has been successfully created at `/docs/ARCHITECTURE.md`. Would you like me to add a reference link to this document inside `AGENTS.md` (or other agent index files) so other agents can read it?"_
4.  **APPROVAL:** Wait for user confirmation before proceeding to Phase 3.

---

## Phase 3: Agent Index Integration Workflow (Conditional)

_Execute this phase ONLY if the user approved the offer in Phase 2, Step 4._

1.  Locate the `AGENTS.md` file (or the primary agent configuration/index file in the `.agents/` or root directory).
2.  Read the current contents of `AGENTS.md`.
3.  Inject a reference link to the newly created documentation. Add it under a relevant section (e.g., "Context Files", "Reference Documents", or "Project Map").
    - Format example: `- **Project Architecture Map:** Read [/docs/ARCHITECTURE.md](/docs/ARCHITECTURE.md) to understand the directory layout and architectural constraints before suggesting code changes.`
4.  Save the changes to `AGENTS.md`.
5.  Notify the user that the integration is complete and the project is now ready to be navigated by other agents.
