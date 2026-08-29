---
goal: Repository Architecture and Structure Documentation
date_created: [YYYY-MM-DD]
last_updated: [YYYY-MM-DD]
status: 'Active'
---

# Architecture Documentation
<!-- markdownlint-disable -->
![Status: <status>](https://img.shields.io/badge/status-<status>-<status_color>)

This document serves as the canonical architectural map of the repository. It outlines the design patterns, technical stack, directory structure, and module constraints to assist developers and AI agents in navigating and maintaining the codebase safely.

## 1. Project Overview

*(Note for AI: Provide a brief summary of what the project is, its main goals, and its intended audience. Derive this from the README.md or source code).*

## 2. High-Level Architecture & Tech Stack

- **Primary Language:** [e.g., TypeScript, Kotlin, Python]
- **Frameworks/Libraries:** [e.g., React, Flutter, Express, Spring Boot]
- **Architectural Pattern:** [e.g., Clean Architecture, MVC, Monorepo]
- **Build/Tooling:** [e.g., Vite, Gradle, Webpack, Docker]

## 3. Data Flow & Layer Dependencies

*(Note for AI: Document how data moves through the system. E.g., the lifecycle of a request from Router -> Controller -> Service -> Repository. If a clear layering pattern exists, generate a Mermaid diagram to visualize it).*

## 4. Dependencies & External Services

*(Note for AI: List major external dependencies such as databases, third-party APIs, messaging queues, or cloud services).*

- [Dependency 1]: [Purpose]
- [Dependency 2]: [Purpose]

## 5. Directory Tree Map

```text
[Project Root]
├── .agents/          # AI agent configurations and SDLC standards
├── docs/             # Project documentation, ADRs, and structure maps
...
```

*(Note for AI: Expand the tree above accurately based on the actual repository, keeping it deep enough to be useful but abstract enough to be readable. Do not list every single file, focus on directories and critical files).*

## 6. Directory Purposes & Responsibilities

*(Note for AI: GENERATE a dynamic table based strictly on the actual directories you discovered in this specific project. Use the columns: Directory/File | Primary Purpose | Contains | Rules / Constraints).*

## 7. Key Configuration Files

* `[File Name 1]`: [Explain what this configures and why it's important to the project's operation].
* `[File Name 2]`: [Explain purpose].

## 8. Entry Points

* **App Initialization:** Where does the application start? (e.g., `src/main.ts`, `lib/main.dart`).
* **Routing/Navigation:** Where is the main router defined?

## 9. Environment & Deployment

*(Note for AI: Document the deployment environments, CI/CD pipelines, and critical environment variables required to run the project).*

- **CI/CD:** [e.g., GitHub Actions, GitLab CI]
- **Deployment:** [e.g., Vercel, AWS ECS, Docker Compose]

## 10. Testing Strategy

*(Note for AI: Document where tests are located, what testing frameworks are used, and the basic commands to run them. Align with the Two-Layer Testing Mandate if applicable).*

- **Framework:** [e.g., Jest, PyTest, JUnit]
- **Location:** [e.g., `/tests`, alongside files `*.spec.ts`]
- **Run Command:** [e.g., `npm run test`]

## 11. AI Agent Boundaries

*(Note for AI: Document any explicit rules or constraints for AI agents working in this codebase. E.g., restricted folders, required validation steps, or file-naming conventions).*

- [Constraint 1]
- [Constraint 2]
