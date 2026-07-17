# Security Hardening Reference

This document defines the security review procedures for `@ExpertCodeReviewer`. It is a mandatory reference for the **Security** axis of any code review and must be read in full when the code under review touches authentication, authorization, data storage, external integrations, user input handling, file uploads, or AI/LLM features.
<!-- markdownlint-disable -->
---

## Phase 0: Threat Modeling (Do This First)

Security controls added without a threat model are guesses. Before assessing any security-sensitive code, spend five minutes thinking like an attacker using the steps below.

### Step 1 — Map Trust Boundaries

Identify every point where untrusted data crosses into the system. Common boundaries include:

- HTTP request parameters, headers, and body
- Form field submissions
- File upload endpoints
- Webhooks and inbound callbacks
- Third-party API responses
- Message queue payloads
- **LLM/AI model output** — this is an untrusted external source, same as user input

### Step 2 — Name the Assets

What is worth stealing or disrupting in this system? Examples:
- User credentials and session tokens
- Personally Identifiable Information (PII)
- Payment or financial data
- Admin capabilities that can affect other users
- The system's availability itself

### Step 3 — Run STRIDE Over Each Boundary

For each trust boundary identified above, run through the STRIDE lens. This is a quick check, not a lengthy ceremony.

| Threat                     | The Question to Ask                                          | Typical Mitigation                                                                           |
| -------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| **S**poofing               | Can an attacker impersonate a legitimate user or service?    | Strong authentication, signature verification on callbacks                                   |
| **T**ampering              | Can data be altered in transit or at rest without detection? | HTTPS everywhere, parameterized queries, cryptographic integrity checks                      |
| **R**epudiation            | Can a user or service deny having performed an action?       | Audit logging of all security-relevant events                                                |
| **I**nformation Disclosure | Can sensitive data leak to unauthorized parties?             | Encryption at rest and in transit, output field allowlists, generic error messages           |
| **D**enial of Service      | Can the system be overwhelmed or made unavailable?           | Rate limiting, input size caps, request timeouts, pagination                                 |
| **E**levation of Privilege | Can a user gain capabilities they should not have?           | Fine-grained authorization checks on every protected operation, principle of least privilege |

### Step 4 — Write Abuse Cases

For every major use case in the change being reviewed, formulate the corresponding abuse case: *"How would a malicious or misbehaving actor misuse this feature?"* The abuse case should drive the first security test written.

---

## The Three-Tier Boundary System

### Tier 1: Always Do (Non-Negotiable)

Flag any violation of these as **`[CRITICAL]`** or **`[REQUIRED]`**:

- Validate all external input at the system boundary — API routes, form handlers, webhook endpoints — before it touches any internal logic.
- Parameterize all database queries without exception. Never concatenate user-supplied values into query strings.
- Encode all output rendered in a browser context to prevent Cross-Site Scripting (XSS). Rely on framework auto-escaping; flag any code that manually bypasses it.
- Use HTTPS for all external communication. Flag any HTTP fallback or insecure transport.
- Hash passwords using a strong adaptive algorithm (bcrypt, scrypt, or argon2). Salt rounds must be a defensible minimum (12+). Never store plaintext passwords.
- Set security response headers (Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options).
- Configure session cookies with `HttpOnly`, `Secure`, and `SameSite` attributes.
- Run the project's native package manager audit against the committed lockfile and triage findings before any release.

### Tier 2: Ask First (Requires Explicit Human Approval)

Changes in these categories must never be made autonomously. Flag them in the review and require the author to justify the change and obtain approval:

- Any new authentication flow or modification to existing authentication logic.
- Storing a new category of sensitive data (PII, payment data, health records).
- Adding a new external service integration.
- Changing Cross-Origin Resource Sharing (CORS) policy.
- Adding a file upload handler.
- Modifying rate limiting or throttling thresholds.
- Granting new roles, elevated permissions, or admin capabilities to users.

### Tier 3: Never Do (Hard Violations)

Flag any of these as **`[CRITICAL]`** immediately:

- Committing secrets (API keys, passwords, tokens) to version control.
- Logging sensitive data (passwords, tokens, full credit card numbers, PII).
- Treating client-side validation as a security boundary. Client-side checks are a UX convenience, never a security control.
- Disabling security headers for convenience.
- Using `eval()` or equivalent dynamic code execution with user-provided data.
- Storing authentication tokens in browser-accessible storage (e.g., `localStorage`).
- Exposing internal error details (stack traces, internal paths, database schema) to end users.

---

## OWASP Top 10: Prevention Principles

The following are language-agnostic descriptions of how to prevent the most critical web application vulnerabilities. Apply these as the lens for the Security axis review.

### Injection (SQL, NoSQL, OS Command, LDAP)

Injection occurs when user-supplied data is interpreted as a command rather than as a data value. The universal defense is to always separate code from data.

- **Defense:** Use parameterized queries / prepared statements for all database operations. Never construct a query by concatenating strings that include user input.
- **Defense:** Use an allow-list approach for any OS-level command execution. Never pass unsanitized user input to a shell.
- **Defense:** Use an ORM's safe query builder instead of raw string interpolation.
- **Flag:** Any code that visibly concatenates a variable into a query string or command string.

### Broken Authentication

Authentication failures allow attackers to assume other users' identities.

- **Defense:** Enforce strong, adaptive password hashing (bcrypt / scrypt / argon2).
- **Defense:** Apply rate limiting specifically to login, registration, and password reset endpoints to prevent brute-force attacks.
- **Defense:** Ensure password reset tokens have a short expiry and are invalidated after single use.
- **Defense:** Session tokens must be cryptographically random, sufficiently long, and stored server-side or in `HttpOnly` cookies.
- **Flag:** Any session token stored in `localStorage` or `sessionStorage`.

### Broken Access Control

Access control failures allow users to act beyond their intended permissions.

- **Defense:** Verify authorization on every protected endpoint and operation — authentication (who you are) is not the same as authorization (what you can do).
- **Defense:** Apply object-level authorization: even if a user is authenticated, verify they are the owner of the resource they are trying to modify.
- **Defense:** Deny access by default. Code should explicitly grant access, not rely on the absence of a denial.
- **Flag:** Any endpoint that takes a resource ID as input but does not verify that the authenticated user owns or is permitted to access that specific resource.

### Security Misconfiguration

Misconfiguration is the most common vulnerability category.

- **Defense:** All security headers must be configured (Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
- **Defense:** CORS must be restricted to a known allowlist of origins. Wildcard (`*`) origins are a critical violation on any authenticated endpoint.
- **Defense:** Default credentials, debug modes, and verbose error outputs must be disabled in all non-development environments.
- **Flag:** CORS wildcard, any disabled security header, any stack trace exposed to end users.

### Sensitive Data Exposure

- **Defense:** Never return sensitive fields (password hashes, reset tokens, internal IDs) in API responses. Define explicit output schemas and strip sensitive fields before serialization.
- **Defense:** Store secrets (API keys, credentials) exclusively in environment variables or a secrets manager. Never in source code or configuration files that are committed.
- **Defense:** Encrypt sensitive data at rest when the risk warrants it (PII, health data, financial data).
- **Flag:** Any hardcoded secret, any API response that serializes a full database record without an explicit allowlist of safe fields.

### Server-Side Request Forgery (SSRF)

SSRF occurs when the server makes an HTTP request to a URL controlled by the attacker, allowing access to internal services.

- **Trigger condition:** Any code where the server fetches a URL that includes user-supplied input — webhooks, "import from URL" features, image proxies, link previews, or any fetch/HTTP-client call where the URL is parameterized.
- **Defense:** Apply an allowlist of permitted scheme (HTTPS only) and permitted hosts/domains.
- **Defense:** Resolve the hostname to an IP address and reject the request if any resolved address falls in a private, loopback, link-local (e.g., 169.254.x.x — cloud metadata endpoint), or reserved range.
- **Defense:** Prohibit HTTP redirects (`redirect: 'error'` or equivalent) to prevent redirect-based bypass.
- **Flag:** Any `fetch()`, HTTP client call, or URL-loading function where the URL value originates from user input without allowlist validation.

---

## Input Validation Principles

Apply these principles to all data that crosses a trust boundary:

- **Schema validation at the boundary:** Define an explicit input schema (using a validation library appropriate for the language) and validate all incoming data against it at the point where it enters the system. Do not pass raw, unvalidated request data into service or domain layers.
- **Allowlist over blocklist:** Where possible, define what is allowed rather than what is forbidden. It is easier to define "this field must be a positive integer between 1 and 100" than to enumerate every illegal value.
- **Fail closed:** When validation fails, reject the request with a clear error response (HTTP 422 or 400) and do not proceed with processing. Log the violation for monitoring.
- **File upload safety:** Validate file type by examining the file's content (magic bytes / MIME sniffing), not just the file extension or the client-supplied MIME type header. Enforce a hard maximum file size at the infrastructure level, not only in application code.

---

## Dependency Audit Triage

When a dependency audit reports vulnerabilities, triage them using this decision tree:

```
Audit reports a vulnerability
├── Severity: CRITICAL or HIGH
│   ├── Is the vulnerable code reachable in any of: runtime, build, test, or deployment?
│   │   ├── YES → Fix immediately. Upgrade, patch, or replace the dependency before merging.
│   │   └── NO (confirmed unreachable) → Fix soon, but not a hard blocker. Document the justification.
│   └── Is a fix available?
│       ├── YES → Upgrade to the patched version.
│       └── NO → Evaluate workarounds; consider replacing the dependency; add to an allowlist with a mandatory review date.
├── Severity: MODERATE
│   ├── Reachable in production? → Fix in the next release cycle.
│   └── Dev-only dependency? → Fix when convenient; track in backlog.
└── Severity: LOW
    └── Track and address during regular dependency update cycles.
```

**Critical distinction:** Audits only match against *known* advisories in public databases. A package can be malicious or compromised without having a published advisory. The audit is a necessary but not sufficient security check.

### Supply-Chain Hygiene

Beyond advisory matching, apply these supply-chain controls:

- One authoritative lockfile must be committed to the repository. Competing lockfiles at the same installation boundary (e.g., both `package-lock.json` and `yarn.lock`) mean the installation is non-deterministic.
- CI/CD pipelines must use frozen or immutable install commands (e.g., `npm ci`, `pip install --require-hashes`) to ensure reproducibility.
- Dependency install scripts must be blocked by default and only approved explicitly for specific, verified packages after inspecting the script source.
- Never apply forced audit remediation automatically without inspecting the changes. Forced fixes can cross declared version ranges and introduce breaking changes or new vulnerabilities.
- Review new dependencies for: ownership, maintenance activity, release age, provenance, and the transitive dependency graph. Watch for typosquatting (a package name designed to look like a popular package).

---

## LLM / AI Feature Security

Applications that call a Large Language Model introduce a distinct attack surface. Apply these principles to any code that integrates with an LLM API, runs agents, or performs Retrieval-Augmented Generation (RAG).

These concerns map to the [OWASP Top 10 for LLM Applications (2025)](https://genai.owasp.org/llm-top-10/).

- **Treat all model output as untrusted external input (LLM05 — Improper Output Handling).** Never pass LLM-generated text directly into a SQL query, a shell command, an HTML template, a file path, or an `eval()` equivalent. Validate and encode model output exactly as you would raw user input.
- **Assume the prompt can be hijacked (LLM01 — Prompt Injection).** Any untrusted text included in the LLM context window — a user message, a fetched document, a PDF, a web page — can carry adversarial instructions. A system prompt is not a security boundary; enforce all permissions in application code, not in prompt text.
- **Keep secrets and cross-user data out of prompts (LLM02 / LLM07).** Anything placed in the context window can potentially be echoed back to the user or extracted. Do not place API keys, other users' data, or the verbatim system prompt in the context.
- **Constrain tool and agent permissions (LLM06 — Excessive Agency).** Any tool an agent can call should operate with the minimum necessary permissions. Destructive or irreversible actions (deleting records, sending emails, making payments) must require explicit user confirmation before execution.
- **Bound token and resource consumption (LLM10 — Unbounded Consumption).** Set maximum token limits, request rate limits, and recursion depth caps on any agentic loop. A crafted input must not be able to trigger runaway cost or infinite loops.
- **Isolate retrieval data by tenant (LLM08 — Vector and Embedding Weaknesses).** In RAG systems, partition the vector store by user or tenant to prevent data from one user being retrieved by another. Validate and sanitize documents before indexing to prevent poisoned content from steering model responses.

---

## Security Review Checklist

Use this checklist as a final verification pass after completing the STRIDE analysis and the Security axis review.

### Authentication

- [ ] Passwords hashed with bcrypt, scrypt, or argon2 (minimum 12 salt rounds)
- [ ] Session tokens stored in `HttpOnly`, `Secure`, `SameSite` cookies
- [ ] Login and password-reset endpoints have rate limiting
- [ ] Password reset tokens have a defined expiry and are invalidated after use

### Authorization

- [ ] Every protected endpoint verifies both authentication and authorization
- [ ] Object-level authorization: users can only access their own resources
- [ ] Admin-level actions explicitly verify admin role at the code level

### Input

- [ ] All user input validated at the system boundary using an explicit schema
- [ ] All database queries are parameterized (no string concatenation)
- [ ] All output rendered in HTML context is properly encoded/escaped
- [ ] Server-side URL fetches use an allowlist (no open SSRF surface)

### Data

- [ ] No secrets hardcoded in source code or committed configuration files
- [ ] Sensitive fields (password hashes, tokens, PII) excluded from API response schemas
- [ ] PII encrypted at rest where the risk warrants it

### Infrastructure

- [ ] Security response headers configured (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- [ ] CORS restricted to a known allowlist of origins (no wildcard on authenticated endpoints)
- [ ] Dependency audit triaged; no unmitigated reachable critical/high findings
- [ ] Error responses do not expose internal stack traces or implementation details

### Supply Chain

- [ ] One authoritative lockfile committed; CI uses a frozen/immutable install
- [ ] Dependency install scripts blocked by default; only explicitly approved packages run scripts
- [ ] New dependencies reviewed for ownership, provenance, and typosquatting risk

### AI / LLM (if applicable)

- [ ] LLM output treated as untrusted: not passed to eval, SQL, shell, or innerHTML
- [ ] No secrets, PII, or other users' data placed in LLM context windows
- [ ] Tool/agent permissions are scoped to the minimum; destructive actions require confirmation
- [ ] Token limits and recursion depth caps are enforced

---

## Common Rationalizations & Red Flags

### Rationalizations to Reject

When an author offers one of these justifications for skipping a security control, the reviewer must push back firmly:

| Rationalization                                      | Why It Is Wrong                                                                                                                                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "This is an internal tool, security doesn't matter." | Internal tools are frequently the weakest link. Supply-chain attacks and insider threats specifically target internal tooling.                                                              |
| "We'll add security later."                          | Retrofitting security into an existing system is 10–100x harder and more expensive than building it in from the start.                                                                      |
| "No one would try to exploit this."                  | Automated scanners run continuously against all public-facing infrastructure. The assumption of obscurity is not a defense.                                                                 |
| "The framework handles security for us."             | Frameworks provide tools and defaults, not guarantees. Developers must use those tools correctly. Misconfiguration (OWASP A05) is a top category.                                           |
| "It's just a prototype / MVP."                       | Prototypes become production with alarming regularity. Security habits formed during prototyping persist into the shipped product.                                                          |
| "Threat modeling is overkill here."                  | Five minutes of "how would I attack this?" prevents the design flaws that no subsequent control can fully patch. OWASP A04 (Insecure Design) is the root cause of the most severe breaches. |
| "It's just LLM output — it's only text."             | That text can be a SQL statement, a shell command, or a `<script>` tag. It must be treated as untrusted input from an external source.                                                      |
| "The audit passed, so the dependency is safe."       | Audits only match known advisories. They cannot detect a newly malicious package, a recently compromised maintainer, or a typosquatted package with no advisory yet filed.                  |

### Red Flags in Code

A reviewer should immediately escalate to **`[CRITICAL]`** or **`[REQUIRED]`** if any of these patterns are found:

- User-supplied data passed directly into a database query string, shell command, or HTML rendering without encoding.
- Secrets (API keys, passwords, tokens) present anywhere in source code or committed configuration.
- An API endpoint that accepts a resource ID (e.g., `/api/item/:id`) but does not verify that the authenticated user owns that resource.
- Missing or wildcard (`*`) CORS configuration on any endpoint that handles authenticated requests.
- Absence of rate limiting on any authentication-related endpoint.
- A `fetch()` or HTTP client call where the URL is parameterized by user input, without an allowlist.
- LLM/AI model output passed directly into a database query, the DOM, a shell command, or `eval()`.
- Secrets, PII, or another user's data placed inside an LLM context window.
- An agentic tool that can perform destructive or irreversible actions without requiring explicit human confirmation.
- A file upload handler that only validates the file extension without inspecting content type.
