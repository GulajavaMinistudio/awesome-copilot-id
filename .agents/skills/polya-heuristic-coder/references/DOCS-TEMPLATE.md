# 📚 Technical Documentation Templates (Diátaxis Framework)
<!-- markdownlint-disable -->
This file contains the canonical templates for generating technical documentation within the **Pólya Heuristic Coder** engineering suite (`/polya-heuristic-coder docs`).

All documentation generated in this phase MUST adhere strictly to the **Diátaxis Framework** (<https://diataxis.fr/>). Every document must serve **one single purpose** and belong to exactly one quadrant. **Never mix quadrants in a single document.**

---

## 🧭 Quadrant Selector & Directory Structure

| Quadrant            | Purpose                               | Orientation            | Target Directory    | File Naming             |
| :------------------ | :------------------------------------ | :--------------------- | :------------------ | :---------------------- |
| **1. Tutorial**     | Learning by doing                     | Learning-oriented      | `docs/tutorials/`   | `{slug}-tutorial.md`    |
| **2. How-To Guide** | Solving a specific task               | Task-oriented          | `docs/how-to/`      | `{slug}-guide.md`       |
| **3. Reference**    | Technical description of machinery    | Information-oriented   | `docs/reference/`   | `{slug}-reference.md`   |
| **4. Explanation**  | Deep understanding & design rationale | Understanding-oriented | `docs/explanation/` | `{slug}-explanation.md` |

---

## Template 1: 🎓 Tutorial (Learning-Oriented)

```markdown
---
type: tutorial
title: "[Tutorial Title: e.g., Getting Started with Payment Processing]"
audience: "[Beginner / New Developer / Integrator]"
prerequisites: "[What must be installed or configured before starting]"
time_to_complete: "[e.g., 15 minutes]"
---
<!-- markdownlint-disable -->

# [Tutorial Title: e.g., Building Your First Order Seam]

> **Goal:** By the end of this tutorial, you will have built a complete, running [feature/module] from scratch using [Framework/Service].

## What You Will Build

[1-2 sentences describing the finished outcome. Include a quick ASCII topological sketch if helpful.]

## Prerequisites

- [ ] [Prerequisite 1: e.g., Node.js >= 20 installed]
- [ ] [Prerequisite 2: e.g., Local development server running]

---

## Step 1: [First Actionable Step: e.g., Setting Up the Seam Port]

[Clear, prescriptive instruction. Tell the user what to do, what code to type, and where to put it.]

```typescript
// Example snippet
export interface PaymentPort {
  charge(amount: number): Promise<PaymentReceipt>;
}
```

### Verification
Run the following command to verify this step:
```bash
npm test -- test/payment-port.test.ts
```
Expected output:
```text
✔ PaymentPort interface initialized successfully
```

---

## Step 2: [Second Actionable Step: e.g., Implementing the Adapter]

[Prescriptive instruction for the next step. Keep the pace steady. No alternate branches or choices.]

```typescript
// Example snippet
```

### Verification
[How the user checks that Step 2 worked.]

---

## Step 3: [Third Actionable Step: e.g., Wiring the Presentation View]

[Final step that completes the vertical slice.]

---

## Conclusion & Next Steps

Congratulations! You have successfully built and verified [Feature Name].

**Where to go next:**
- To solve a specific problem, read the [How-To Guide](../how-to/{slug}-guide.md).
- To inspect all parameters and options, consult the [API Reference](../reference/{slug}-reference.md).
- To understand why we designed the seams this way, read the [Architecture Explanation](../explanation/{slug}-explanation.md).
```

---

## Template 2: 🛠️ How-To Guide (Task-Oriented)

```markdown
---
type: how-to
title: "[How-To Title: e.g., How to Implement Idempotent Webhook Processing]"
audience: "[Developer facing a concrete problem]"
prerequisites: "[System components required to follow this recipe]"
---
<!-- markdownlint-disable -->

# How to [Perform Specific Task: e.g., Handle Stripe Webhook Retries]

> **Problem:** [1-2 sentences describing the specific practical problem to solve, e.g., Network retries from third-party payment gateways can cause duplicate order records if not handled idempotently.]

## Prerequisites

- [Existing Service / Database configured]
- [Access to environment secrets]

---

## Solution Overview

[Brief 1-paragraph summary of the approach, e.g., We use an Idempotency-Key header verified against a Redis lock cache before executing the domain use case.]

---

## Step-by-Step Recipe

### 1. [First Action: e.g., Extract Idempotency Key from Request Header]

```typescript
const idempotencyKey = request.headers['x-idempotency-key'];
if (!idempotencyKey) {
  throw new BadRequestException('Missing x-idempotency-key header');
}
```

### 2. [Second Action: e.g., Acquire Distributed Lock via Port]

```typescript
const isAcquired = await lockService.acquire(idempotencyKey, { ttlSeconds: 60 });
if (!isAcquired) {
  return response.status(409).json({ error: 'Concurrent transaction in progress' });
}
```

### 3. [Third Action: e.g., Execute Domain Use Case with Transaction Isolation]

```typescript
try {
  const result = await processOrderUseCase.execute(payload);
  return response.status(200).json(result);
} finally {
  await lockService.release(idempotencyKey);
}
```

---

## Verification & Testing

Verify that the recipe works using curl or a unit test:

```bash
curl -X POST http://localhost:3000/webhooks/stripe \
  -H "x-idempotency-key: test-uuid-123" \
  -d '{"event": "charge.succeeded"}'
```

Expected response:
```json
{
  "status": "processed",
  "receiptId": "rec_999"
}
```

---

## Common Pitfalls & Edge Cases

- **Lock Release in Error Scenarios:** Always release locks in a `finally` block to prevent deadlocks.
- **Clock Drift:** When using Redis cluster TTLs, allow a 500ms safety skew buffer.

---

## Related References
- [API Reference](../reference/{slug}-reference.md)
- [Architecture Explanation](../explanation/{slug}-explanation.md)
```

---

## Template 3: 📖 Reference (Information-Oriented)

```markdown
---
type: reference
title: "[Component Name / API Reference: e.g., OrderService API Reference]"
package: "[Package / Module Name]"
version: "[API Version: e.g., v1.2.0]"
---
<!-- markdownlint-disable -->

# Reference: [Component / Module Name]

> **Purpose:** Authoritative, exhaustive technical specification of the interfaces, classes, public endpoints, and data contracts for `[Component Name]`.

---

## Public Interfaces & DTO Contracts

### `OrderDTO`

| Field         | Type                   | Required | Description                       | Constraints              |
| :------------ | :--------------------- | :------: | :-------------------------------- | :----------------------- |
| `id`          | `UUID` (string)        |   Yes    | Unique order identifier           | RFC 4122 compliant       |
| `customerId`  | `string`               |   Yes    | Customer reference ID             | Non-empty, max 64 chars  |
| `amountCents` | `number` (integer)     |   Yes    | Total transaction amount in cents | $\\ge 0$, integer only   |
| `currency`    | `enum (IDR, USD)`      |   Yes    | 3-letter ISO currency code        | Must match tenant ISO    |
| `status`      | `enum (PENDING, PAID)` |   Yes    | Current order lifecycle status    | Initialized as `PENDING` |

---

## Public Methods / Endpoints

### `POST /api/v1/orders`

Creates and persists a new order transaction.

#### Request Headers
| Header            | Type     | Required | Description                   |
| :---------------- | :------- | :------: | :---------------------------- |
| `Content-Type`    | `string` |   Yes    | Must be `application/json`    |
| `Idempotency-Key` | `UUID`   |    No    | Prevents duplicate processing |

#### Request Payload
```json
{
  "customerId": "cust_12345",
  "amountCents": 150000,
  "currency": "IDR"
}
```

#### Response Codes
|     Status Code     | Reason                     | Schema          | Notes                                        |
| :-----------------: | :------------------------- | :-------------- | :------------------------------------------- |
|   **201 Created**   | Order created successfully | `OrderDTO`      | Returned when successfully persisted         |
| **400 Bad Request** | Validation failed          | `ErrorResponse` | Invalid currency or negative amount          |
|  **409 Conflict**   | Idempotency collision      | `ErrorResponse` | Transaction with key is currently processing |
|  **500 Internal**   | Gateway timeout            | `ErrorResponse` | Database connectivity failure                |

---

## Error Codes Matrix

| Error Code             | HTTP Status | Description                        | Remediation                |
| :--------------------- | :---------: | :--------------------------------- | :------------------------- |
| `ERR_INVALID_CURRENCY` |     400     | Currency not supported by merchant | Use supported ISO currency |
| `ERR_NEGATIVE_AMOUNT`  |     400     | `amountCents` was $< 0$            | Pass non-negative integer  |
| `ERR_ORDER_NOT_FOUND`  |     404     | Order UUID does not exist in store | Verify ID with GET list    |

---

## Architectural Seam Diagram

```text
+-------------------+        +--------------------+        +---------------------+
| Presentation (API)| -----> | OrderService (App) | -----> | OrderRepositoryPort |
+-------------------+        +--------------------+        +---------------------+
                                                                      |
                                                                      v
                                                           +---------------------+
                                                           | PostgresAdapter     |
                                                           +---------------------+
```
```

---

## Template 4: 💡 Explanation (Understanding-Oriented)

```markdown
---
type: explanation
title: "[Concept / Architecture Topic: e.g., Clean Architecture Seams in Billing]"
domain: "[Domain Area]"
audience: "[Software Architects, Senior Engineers, Team Leads]"
---
<!-- markdownlint-disable -->

# Understanding: [Architecture / Design Topic]

> **Executive Summary:** [A high-level conceptual summary explaining the "Why", background context, and fundamental design decisions behind this subsystem.]

---

## Background & Historical Context

[Why does this system exist? What problem does it solve that simpler approaches could not? What trade-offs were considered?]

---

## The Mental Model

```text
[ ASCII or Mermaid diagram illustrating the conceptual model and data flow ]
```

### Core Concepts

1. **[Concept 1: e.g., Pre-Agreed Test Seams]**  
   [Detailed explanation of the concept, why it matters, and how it protects architectural boundaries.]

2. **[Concept 2: e.g., Separation of Domain from Infrastructure]**  
   [Explanation of why domain logic is kept pure and framework-agnostic.]

---

## Design Decisions & Trade-Offs

### Decision: [e.g., Using Optimistic Concurrency Control instead of Pessimistic Locking]

| Factor            | Option A: Optimistic Locking        | Option B: Pessimistic Locking       |
| :---------------- | :---------------------------------- | :---------------------------------- |
| **Throughput**    | High (No database table locking)    | Low (Contention under high traffic) |
| **Complexity**    | Requires retry handling in use case | Simple SQL `SELECT ... FOR UPDATE`  |
| **Chosen Option** | **Option A (Chosen)**               | Rejected due to deadlocks           |

**Rationale:** [Deep dive into why Option A was selected, referencing ADR `docs/adr/0002-order-locking.md` if applicable.]

---

## Anti-Patterns to Avoid

- **Leaking Infrastructure DTOs into Domain Entities:** Never import ORM models directly into business policies.
- **Mixed Quadrants in Documentation:** Keep tutorial steps out of architectural explanations.

---

## Related Documents
- [Architecture Map](../../docs/ARCHITECTURE.md)
- [Relevant ADR](../../docs/adr/0001-order-seam-architecture.md)
- [API Reference](../reference/{slug}-reference.md)
```
