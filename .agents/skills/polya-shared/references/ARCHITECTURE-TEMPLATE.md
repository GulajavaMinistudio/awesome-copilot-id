---
goal: Repository Architecture and Clean Architecture Seams Documentation
date_created: [YYYY-MM-DD]
last_updated: [YYYY-MM-DD]
status: 'Active'
tags: ["architecture", "clean-architecture", "polya-topography", "system-map"]
---
<!-- markdownlint-disable -->

# Repository Architecture Documentation

![Status: Active](https://img.shields.io/badge/status-active-brightgreen)

This document serves as the canonical architectural map of the repository. It outlines the system topology, Clean Architecture seams, directory responsibilities, and module constraints to assist developers and AI agents in navigating and maintaining the codebase safely.

---

## 1. Executive Overview & Domain Context

*(Derived from README.md, CONTEXT.md, and primary business specs)*

- **System Purpose:** [1-3 sentences describing what the application does, its core value proposition, and primary users]
- **Domain Ubiquitous Language:** [Reference to `CONTEXT.md` or key business concepts]
- **Target Environments:** [e.g., Cloud Web App, Mobile Runtime, Embedded Service, Desktop Client]

---

## 2. High-Level Tech Stack & Tooling

| Dimension | Technologies / Tools | Configuration Files |
| :--- | :--- | :--- |
| **Primary Language(s)** | [e.g., TypeScript, Kotlin, Dart, Go, Rust] | `tsconfig.json`, `Cargo.toml`, `go.mod` |
| **Core Frameworks** | [e.g., React, Express, Spring Boot, Flutter] | `package.json`, `pubspec.yaml`, `build.gradle` |
| **Persistence / Storage** | [e.g., PostgreSQL, Redis, DynamoDB, SQLite] | `docker-compose.yml`, migration scripts |
| **Build & Packaging** | [e.g., Vite, Gradle, Cargo, Turbo] | `vite.config.ts`, `turbo.json` |
| **Testing Harnesses** | [e.g., Vitest, Jest, Pytest, Mockito] | `vitest.config.ts`, `pytest.ini` |
| **Linter & Formatters** | [e.g., ESLint, Prettier, Ruff, Clippy] | `.eslintrc.json`, `pyproject.toml` |

---

## 3. Pólya's Topological Map ("Draw a Figure")

*Pólya Heuristic (How to Solve It, p. 99): "Draw a figure... to find a lucid representation for your nongeometrical problem is an important step."*

### 3.1 C4 / High-Level System Container Topology
```text
┌─────────────────────────────────────────────────────────────┐
│                       Client Runtimes                       │
│           [ Web SPA / Mobile App / CLI Consumer ]           │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / GraphQL / WebSocket
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 API Gateway / Ingress Layer                 │
│              [ Route Handlers, CORS, Auth ]                 │
└──────────────────────────────┬──────────────────────────────┘
                               │ Internal Commands & Queries
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  Clean Architecture Core                    │
│   Entities (Domain) ──▶ Use Cases (Application Orchestration)│
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼ (Port Interfaces)            ▼ (Port Interfaces)
┌──────────────────────────────┐┌─────────────────────────────┐
│   Persistence Adapters       ││  External Service Adapters  │
│  [ Repositories, SQL ORM ]   ││  [ Stripe, Auth0, S3, PubSub]│
└──────────────────────────────┘└─────────────────────────────┘
```

---

## 4. Clean Architecture Seams & Component Boundaries

*Dependency Rule: Source code dependencies MUST point inwards toward high-level business policies.*

```text
Entities (Domain Layer)
   └── Pure business logic, value objects, and domain invariants (Zero external dependencies)
Use Cases (Application Layer)
   └── Workflow orchestration, transaction boundaries, input/output ports
Interface Adapters (Controllers, Gateways, Presenters)
   └── HTTP controllers, repository implementations, external client adapters
Frameworks & Drivers (DB, Web Server, UI Runtimes)
   └── Web frameworks, ORM drivers, cloud SDKs, third-party libraries
```

### 4.1 Layer Breakdown
- **Domain Layer (`src/domain/` or equivalent):**
  - Contains: Entities, Value Objects, Domain Events, Repository Interface definitions.
  - Invariant: Zero framework imports, zero DB imports.
- **Application Layer (`src/application/` or equivalent):**
  - Contains: Use Case interactors, Command/Query handlers, Application Ports.
  - Invariant: Orchestrates domain rules without depending on external delivery mechanisms.
- **Interface Adapters (`src/adapters/` or equivalent):**
  - Contains: REST/GraphQL Controllers, Repository Implementations, DTO Mappers.
  - Invariant: Converts data from external formats to internal domain contracts.
- **Frameworks & Infrastructure (`src/infrastructure/` or equivalent):**
  - Contains: Database connections, third-party API clients, web server bootstrap.

---

## 5. Data Flow Lifecycle & Core Invariants

### 5.1 Standard Request/Execution Flow
```text
1. User / External Trigger
   └── Dispatches HTTP/gRPC request with payload
2. Controller (Interface Adapter)
   └── Validates DTO, parses params, delegates to Use Case Port
3. Use Case Interactor (Application Layer)
   └── Executes business workflow, loads Entity via Repository Port
4. Entity (Domain Layer)
   └── Enforces business invariants, transitions state
5. Repository Implementation (Infrastructure Layer)
   └── Persists state changes within a transactional boundary
6. Presenter / Response Formatter
   └── Returns sanitized Response DTO to caller
```

### 5.2 Architectural Invariants
- **INV-001 (Boundary Isolation):** Entities and Value Objects MUST NOT leak directly to external API callers; all boundary transfers MUST utilize strictly typed DTOs.
- **INV-002 (Dependency Inversion):** Application use cases depend only on abstract Repository/Gateway ports, never directly on ORM models or network libraries.
- **INV-003 (Symmetry & Lifecycle):** Dual operations (e.g., `acquireLock/releaseLock`, `subscribe/unsubscribe`) MUST guarantee symmetric teardown.

---

## 6. Directory Tree Map & Responsibilities

### 6.1 Repository Topography
```text
[Project Root]
├── .agents/          # AI agent configurations, skills, and SDLC standards
├── docs/             # Architecture maps, ADRs, audit reports, and reviews
│   ├── adr/          # Architecture Decision Records
│   └── ARCHITECTURE.md # This living architecture document
├── src/              # Application source code
│   ├── domain/       # Clean Architecture: Pure enterprise business rules
│   ├── application/  # Clean Architecture: Application business use cases
│   ├── adapters/     # Clean Architecture: Interface adapters & controllers
│   └── infrastructure/# Clean Architecture: DB drivers, frameworks, and SDKs
├── tests/            # Unit, integration, and end-to-end test suites
└── ...               # Build configuration files
```

### 6.2 Directory Responsibilities Matrix
| Directory / Module | Primary Purpose | Clean Architecture Layer | Allowed Dependencies | Rules & Constraints |
| :--- | :--- | :--- | :--- | :--- |
| `src/domain/` | Enterprise rules & entities | Entities (Core) | None (Pure Language) | No framework or DB dependencies |
| `src/application/` | Business workflow use cases | Use Cases | `src/domain/` | Driven by ports; no HTTP or ORM imports |
| `src/adapters/` | Controllers & Gateways | Interface Adapters | `src/application/`, `src/domain/` | Maps external DTOs to domain models |
| `src/infrastructure/`| DB, Frameworks, SDKs | Frameworks & Drivers | All inner layers | Implements ports defined by inner layers |
| `tests/` | Automated test suites | Verification | All layers | Mirror production structure; zero mock leaks |

---

## 7. Key Configuration Files & Entry Points

- **App Initialization:** `[path/to/main.ts or app.dart]` — Bootstraps dependency injection container and starts listeners.
- **Database / Migrations:** `[path/to/migrations or orm.config.ts]` — Persistence schema definitions.
- **Environment & Secret Config:** `[path/to/.env.example]` — Required runtime environment variables.
- **CI / Build Pipeline:** `[.github/workflows/ci.yml]` — Automated linting, testing, and deployment gates.

---

## 8. Architectural Health & Known Seams

- **Primary Seams:** [List public extension points, plugins, or adapter interfaces ready for extension]
- **Technical Debt / Hotspots:** [Document tightly-coupled modules or legacy areas requiring caution]
- **Recent Architecture Decisions:** [Link to relevant records in `docs/adr/`]
