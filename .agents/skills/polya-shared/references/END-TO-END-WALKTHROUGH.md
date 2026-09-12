<!-- markdownlint-disable -->
# 🚀 End-to-End Walkthrough: Idempotent Webhook Processing Engine

> **Document Purpose:** A complete, realistic reference walkthrough demonstrating George Pólya's 4-stage heuristic problem-solving framework paired with Robert C. Martin's Clean Architecture. Use this document as a concrete golden blueprint for how human engineers and AI agents should interact across every phase of `polya-coder`.

---

## 📖 Scenario Context

* **Feature Goal:** An e-commerce platform receives asynchronous payment notifications from external payment providers (e.g., Stripe). Due to network retries, duplicate webhook events arrive concurrently, occasionally causing duplicate order fulfillment.
* **Objective:** Design and implement a robust, resilient **Idempotent Webhook Processing Engine** with distributed locking and dead-letter handling.

---

## Stage 1: Natural User Brief & Autonomous Triage (Option B)

### 1.1 User Prompt (Natural Intent Invocation)
The user invokes `/polya-spec` using **Option B** without manual file attachments:

```text
/polya-spec we want to build an idempotent payment webhook processing engine safe from duplicate events using redis distributed lock. Please design the architecture.
```

### 1.2 Autonomous Codebase Reconnaissance (Behind the Scenes)
The agent avoids bouncing back with *"which files should I read?"*. Instead, it autonomously inspects the workspace:
1. **Domain Extraction:** Identifies core nouns: `payment`, `webhook`, `order`, `redis`, `idempotency`.
2. **Topography Inspection:** Reads `docs/ARCHITECTURE.md` and detects established seams:
   - `src/domain/payment/` (Entity rules)
   - `src/usecases/webhook/` (Application handlers)
   - `src/adapters/redis/` (Distributed lock repository)
3. **Seam Grouping:** Synthesizes the discovered candidate context as "The Data".

### 1.3 The Pólya Triage Card Output
The agent begins its response with the standardized ASCII triage card:

```text
┌─ 🧭 Pólya Intent Deconstruction & Routing ───────────────────────────────────
│ • The Unknown   : Resilient, idempotent payment webhook processor with distributed locking
│ • The Data      : src/domain/payment, src/usecases/webhook, src/adapters/redis
│ • The Condition : Non-Routine | High Concurrency | Zero duplicate execution | At-least-once SLA
│ • Selected Phase: Phase 1 (spec) — Blueprint required before stateful concurrency coding
└──────────────────────────────────────────────────────────────────────────────
```

The agent announces discovered seams and presents the formal Technical Specification.

---

## Stage 2: Phase 1 — Specification (`spec/webhook-idempotency-spec.md`)

The agent drafts the formal specification adhering strictly to [`SPEC-TEMPLATE.md`](SPEC-TEMPLATE.md):

```markdown
# Technical Specification: Idempotent Webhook Processing Engine

## 1. Pólya Phase 1: Understanding the Problem

### 1.1 The Unknown (Goal & Desired State)
A centralized application service that accepts incoming payment webhook events, guarantees that identical event IDs are processed exactly once, and rejects concurrent duplicate events safely with a 200 OK acknowledgment.

### 1.2 The Data (Inputs & Stack)
- Ingress: HTTP POST `/api/v1/webhooks/payment` with JSON body (`eventId`, `provider`, `amount`, `orderId`).
- Stack: TypeScript / Node.js, Redis (io-redis) for distributed locks, PostgreSQL for transaction records.

### 1.3 The Condition (Requirements & Invariants)
- **REQ-001 (Idempotency Invariant):** If an event with `eventId` has already been processed (`status: COMPLETED`), the engine immediately acknowledges HTTP 200 without re-executing order fulfillment.
- **REQ-002 (Concurrency Locking):** When concurrent duplicate requests arrive within the processing window, exactly one request acquires the distributed lock; concurrent duplicates are queued or rejected safely.
- **CON-001 (Lock TTL & Fail-Safe):** Lock TTL must be bounded to 10 seconds to prevent deadlocks in case of unexpected node failure.
- **CON-002 (Performance SLA):** Total deduplication check overhead must not exceed 20ms at p99.

### 1.4 Indirect Proof & Negative Invariants (Reductio ad Absurdum)
- *Negative Hypothesis:* What if the worker process crashes after acquiring the Redis lock but before marking the event as COMPLETED in the database?
- *Defensive Barrier:* The Redis lock expires automatically via TTL (10s), and the database transaction rollback ensures the event remains in `PENDING` state, allowing safe replay by provider retries.

## 2. Ubiquitous Language & Domain Glossary (CONTEXT.md)
- **Idempotency Key:** Canonical identifier uniquely representing a single financial event.  
  _Avoid_: deduplication token, nonce, event ticket.
- **Processing Seam:** The boundary where ingress adapters hand untrusted payloads to use cases.

## 3. Assumptions & Open Clarifications
- > [!WARNING]
  > **[ASSUMPTION-001]:** We assume Redis is deployed as a high-availability cluster or Sentinel. If single-instance Redis fails, fallback to PostgreSQL row-level locks is required.

## 4. Contracts & Data Transfer Objects (DTOs)

```typescript
export interface WebhookEventDTO {
  readonly eventId: string;
  readonly provider: 'stripe' | 'midtrans';
  readonly orderId: string;
  readonly amountInCents: number;
  readonly timestamp: number;
}

export interface IdempotencyLockPort {
  acquireLock(eventId: string, ttlMs: number): Promise<boolean>;
  releaseLock(eventId: string): Promise<void>;
}
```

## 5. Clean Architecture Seams & Component Boundaries

> [!NOTE]
> **Architectural Pragmatism Check:** Enterprise Core Domain — enforce full 4-layer boundary separation.

```text
Entities (Domain Layer)
   └── src/domain/payment/IdempotentEvent.ts (Pure invariants & state validation)
Use Cases (Application Layer)
   └── src/usecases/webhook/ProcessPaymentWebhookUseCase.ts (Workflow orchestration)
Interface Adapters (Controller / Gateway)
   └── src/adapters/http/PaymentWebhookController.ts (HTTP parsing & DTO mapping)
   └── src/adapters/redis/RedisDistributedLockAdapter.ts (Implements IdempotencyLockPort)
Frameworks & Drivers
   └── Express Router, Redis Client, TypeORM/Prisma
```

## 6. Acceptance Criteria (Given-When-Then)
- **AC-001 (Happy Path for REQ-001):**  
  *Given* a new unique `eventId` "evt_123",  
  *When* the webhook payload is dispatched to the engine,  
  *Then* lock is acquired, payment is settled, order is marked paid, and HTTP 200 is returned.
- **AC-002 (Duplicate Replay for REQ-001):**  
  *Given* an event "evt_123" already completed in the database,  
  *When* a duplicate webhook is received,  
  *Then* order settlement is bypassed and HTTP 200 is returned with `status: ALREADY_PROCESSED`.
```

---

## Stage 3: Recurring Checkpoint — Clarification (`docs/audit/webhook-clarification.md`)

The user triggers `/polya-clarify @spec/webhook-idempotency-spec.md`. The agent acts as a Socratic interrogator using the **Grill-Me Protocol**:

### 3.1 The "Grill Me" Interrogation Dialogue
> **Agent:** *"I analyzed your specification. [ASSUMPTION-001] declares that Redis is available for distributed locking. However, what should happen if Redis encounters a connection timeout during lock acquisition?*
> 
> * **Option A (Strict Fail-Fast):** Throw a 503 Service Unavailable so the payment provider retries in 60 seconds.
> * **Option B (Database Fallback Seam - Recommended):** Fallback immediately to a PostgreSQL transactional row lock (`SELECT ... FOR UPDATE`) to preserve zero downtime during Redis failover.
> 
> *My recommendation is **Option B** to ensure zero lost transactions. What is your preference?"*
>
> **User:** *"I agree with Option B. Let's fallback to PostgreSQL row locks if Redis times out."*

### 3.2 Readiness Score Evaluation
```text
- Completeness (40%): 38 / 40 (All seams, DTOs, and error states mapped)
- Clarity (30%)     : 28 / 30 (Fuzzy language eliminated, explicit 10s TTL defined)
- Alignment (30%)   : 28 / 30 (Traceable to CONTEXT.md glossary and ADR standards)
─────────────────────────────────────────────────────────────────────────────
TOTAL READINESS SCORE: 94 / 100 [READY TO PROCEED]
```

---

## Stage 4: Phase 2 — Implementation Planning (`plan/webhook-idempotency-plan.md`)

The agent breaks down the specification into **Vertical Feature Slices (Tracer Bullets)**:

```markdown
# Implementation Plan: Idempotent Webhook Processing Engine

## 1. Phased Task Sequence (Vertical Tracer Bullets)

### Phase 1: Land — Minimal In-Memory Vertical Slice (Tracer Bullet)
*Goal: Implement the core idempotency state machine from Domain to HTTP Controller.*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| TASK-001 | Implement IdempotentEvent domain entity & state transitions | REQ-001 | AC-001 | - | 1 (XS) | [ ] |
| TASK-002 | Implement ProcessPaymentWebhookUseCase with in-memory lock port | REQ-001 | AC-001 | TASK-001 | 2 (S) | [ ] |
| TASK-003 | Author E2E integration test proving duplicate replay is rejected | REQ-001 | AC-002 | TASK-002 | 1 (XS) | [ ] |
| TASK-00X | **VERIFY:** Run `npm test tests/integration/webhook.test.ts` (MUST PASS) | - | - | TASK-003 | - | [ ] |
| TASK-00Y | **APPROVAL:** 🛑 Stop and wait for user confirmation before Phase 2 | Gate | - | - | - | [ ] |

### Phase 2: Expand — Redis Distributed Lock & Postgres Fallback Seam
*Goal: Wire production infrastructure adapters (Redis Redlock + DB Fallback).*

| Task | Description | Ref ID | AC Ref | Dep | Files | Completed |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| TASK-004 | Implement RedisDistributedLockAdapter implementing IdempotencyLockPort | REQ-002 | AC-001 | TASK-002 | 2 (S) | [ ] |
| TASK-005 | Implement PostgresRowLockFallback on Redis connection timeout | CON-001 | AC-002 | TASK-004 | 2 (S) | [ ] |
| TASK-006 | Add boundary variation tests (100 concurrent duplicate requests fuzz test) | CON-002 | AC-002 | TASK-005 | 1 (XS) | [ ] |
| TASK-00X | **VERIFY:** Run full test suite including concurrency benchmarks | - | - | TASK-006 | - | [ ] |
| TASK-00Y | **APPROVAL:** 🛑 Stop and wait for user review to declare complete | Gate | - | - | - | [ ] |

## 2. Contingency Plan B (Have Two Strings to Your Bow)
- **Primary Strategy (Plan A):** Redis distributed lock via Redlock algorithm.
- **Contingency Strategy (Plan B):** PostgreSQL `INSERT INTO webhook_events ON CONFLICT DO NOTHING`.
- **Trigger:** If Redis connection pool latency exceeds 200ms for 3 consecutive calls.
```

### 4.1 The Mandatory Pause Rule Gate
The agent halts execution:
> *"Does this vertical slicing and contingency Plan B align with your architectural goals? Shall we proceed to implementation?"*
*(The user approves: "Proceed!").*

---

## Stage 5: Phase 3 — Implementation & Atomic Commits

The developer/agent executes the plan following Uncle Bob's Clean Code and the **Floor-Guard Anti-Cheat Enforcement**:

### 5.1 Floor-Guard Verification Check
- Zero `@ts-ignore` or `eslint-disable`.
- Zero skipped tests (`.skip()` or `xit()`).
- All negative test assertions assert typed domain exceptions (`DuplicateEventError`).

### 5.2 Conventional Commits History (Atomic Per Vertical Slice)
Each commit represents a green, bisectable repository state:

```text
git log --oneline -n 4
f4a9b1c feat(webhook): add redis lock adapter and postgres fallback seam [TASK-004, TASK-005]
c2e8a7d test(webhook): add e2e concurrency replay test [TASK-003]
b7d3f21 feat(webhook): implement ProcessPaymentWebhookUseCase [TASK-002]
a1c9e82 feat(payment): implement IdempotentEvent domain entity [TASK-001]
```

---

## Stage 6: Phase 4 — Looking Back (`docs/reviews/webhook-idempotency-review.md`)

The agent audits the final implementation against SOLID principles and boundary specialization:

```markdown
# Quality Audit & SOLID Review: Idempotent Webhook Processing Engine

## 1. SOLID Principles Audit
- **SRP (Single Responsibility):** PASS — `IdempotentEvent` only validates domain state; `RedisDistributedLockAdapter` only touches Redis wire protocol.
- **DIP (Dependency Inversion):** PASS — `ProcessPaymentWebhookUseCase` depends purely on `IdempotencyLockPort` interface, zero direct Redis imports.

## 2. Boundary Specialization & Limiting Cases
- [x] Empty or corrupted payload (`null`, `{}`) rejected with HTTP 400 at controller boundary.
- [x] 100 concurrent requests with identical `eventId` executed in parallel: exactly 1 acquired lock, 99 acknowledged safely with HTTP 200 `ALREADY_PROCESSED`.
- [x] Dimension check: Redis TTL verified in milliseconds (`10_000ms`), not seconds.

## 3. Pólya's Two Golden Questions
- **Can you use the result?** Yes, `IdempotencyLockPort` is exported for reuse in background cron reconciliation jobs.
- **Can you use the method?** Yes, promote the *Redis-to-Postgres Lock Fallback Seam* to `memory.instructions.md` Knowledge Base via `/memory-manager`.
```

---

## 🎯 Summary Checklist

| Step | Pólya Principle | Uncle Bob Standard | Produced Artifact |
| :--- | :--- | :--- | :--- |
| **Stage 1** | Getting Acquainted | Architecture Seams | `Pólya Triage Card` |
| **Stage 2** | Understand the Problem | The Dependency Rule & DTOs | `/spec/{slug}-spec.md` |
| **Stage 3** | Condition Sanity Check | Anti-Ambiguity Protocol | `docs/audit/{slug}-clarification.md` |
| **Stage 4** | Devising a Plan | Tracer Bullets & Plan B | `/plan/{slug}-plan.md` |
| **Stage 5** | Carrying Out the Plan | Boy Scout Rule & Floor-Guard | Atomic Git Commits |
| **Stage 6** | Looking Back | SOLID & Dimension Audit | `docs/reviews/{slug}-review.md` |
