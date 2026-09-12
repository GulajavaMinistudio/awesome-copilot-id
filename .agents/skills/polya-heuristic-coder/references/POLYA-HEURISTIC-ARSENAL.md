<!-- markdownlint-disable -->
# 🧠 George Pólya's Mathematical Heuristic Arsenal (1945)

> **Reference Purpose:** A centralized reference mapping George Pólya's 21 foundational mathematical heuristics (*How to Solve It*, Princeton University Press, 1945) to modern software engineering, clean architecture, and defensive systems design. Used by all sub-skills in the `polya-coder` ecosystem.

---

## 🧰 The Heuristic Arsenal Table

| # | Heuristic Tool | Mathematical Origin (1945) | Software Engineering & Clean Architecture Application |
| :-: | :--- | :--- | :--- |
| **1** | **Analogy** | Solve a problem analogous to the original one (p. 37–43). | Reuse proven architectural patterns (Ports & Adapters, Strategy, Repository) or similar well-tested modules already existing in the repository. |
| **2** | **Specialization** | Test extreme or limiting cases ($0$, $1$, $\infty$, empty set) (p. 190–197). | Unit and boundary testing: empty collections (`[]`, `null`, `""`), zero amounts, maximum payload sizes, single-element arrays, connection timeouts. |
| **3** | **Generalization** | State the problem in broader, more comprehensive terms (p. 108–110). | Refactoring duplicated business logic into a generic utility, reusable domain service, or parameterized abstraction. |
| **4** | **Test by Dimension** | Verify equations by comparing physical/geometric units (p. 202–205). | Strict type and unit validation: timestamps (milliseconds vs. seconds), monetary amounts (integer cents vs. float dollars), enum bounds, `Promise<T>` vs. resolved `T`. |
| **5** | **Decomposing & Recombining** | Break the figure into parts and examine different combinations (p. 75–84). | Decoupling monolithic services into pure utility helpers, distinct Clean Architecture layers, and single-responsibility domain functions. |
| **6** | **Working Backwards** | Assume what is sought as already found (Pappus Analysis, p. 225–232). | Test-Driven Development (TDD) / Contract-First Design: write the expected API output DTO or test assertion first, then work backwards to implement the logic that satisfies it. |
| **7** | **Auxiliary Problem** | Introduce an easier problem as a stepping stone (p. 50–57). | Spikes, proof-of-concept scripts, mock servers, in-memory repository adapters, or minimal reproducible examples. |
| **8** | **Setting Up Equations & Notation** | Translate ordinary language into mathematical symbols and unambiguous notation (p. 134, 174). | Translating unstructured user requirements clause-by-clause into strict DTO schemas, Value Objects, and Discriminated Unions to make invalid states unrepresentable. |
| **9** | **Symmetry & Invertibility** | Treat symmetrically what is naturally symmetrical (p. 199–201). | Ensuring dual operations pair cleanly and satisfy round-trip equality ($f^{-1}(f(x)) = x$): `subscribe/unsubscribe`, `serialize/deserialize`, `open/close`, `acquire/release`, `encrypt/decrypt`. |
| **10** | **Variation of the Problem** | Vary the problem by varying the data or condition (p. 209–214). | Property-based and fuzz testing across extreme boundary ranges (empty collections, negative values, large scales, random permutations). |
| **11** | **Restating the Problem** | State the problem in an alternative language or view (p. 75). | Paradigm shift: rewriting tangled procedural *if-else* logic as a Finite State Machine (FSM), Rules Engine, or Set Operation. |
| **12** | **Reductio ad Absurdum** | Derive a contradiction from assuming the contrary (p. 162–171). | Authoring negative test suites and invariant guard clauses proving that corrupt or contradictory states are decisively rejected at domain boundaries. |
| **13** | **Auxiliary Elements** | Introduce an auxiliary line or element not in original figure (p. 46–50). | Introducing auxiliary seams (in-memory mock ports, projection DTOs, correlation IDs, telemetry context) to unlock decoupling without polluting domain logic. |
| **14** | **Relaxing Conditions** | Drop part of condition temporarily to solve an easier sub-problem (p. 50, 150). | Anti-deadlock tactic: temporarily bypass caching, async concurrency, or auth middleware, verify the pure synchronous business logic first, then re-introduce and enforce the full invariant. |
| **15** | **Inductive Verification** | Mathematical induction: verify base cases and transition step (p. 114–121). | Verifying loops, pagination, recursive trees, and state machine transitions across Base Case $0$, Base Case $1$, and inductive step $n \to n+1$. |
| **16** | **All Data & Whole Condition** | Did you use all the data? Did you use the whole condition? (p. 33). | Completeness audit ensuring zero silently dropped request parameters, unparsed headers, or forgotten SLA/security constraints. |
| **17** | **Two Golden Questions** | Can you use the result? Can you use the method? (p. 61). | Review wrap-up: exporting reusable DTOs/ports and promoting proven patterns into permanent project memory (`memory.instructions.md`). |
| **18** | **Can You See It at a Glance?** | Can you see the whole solution at one glance? (p. 59–61). | Synthesizing complex implementations into an intuitive ASCII topology, sequence diagram, or C4 container map for instant 30-second comprehension. |
| **19** | **Intelligent Trial and Error** | Systematic bisection search vs. blind panic (Pólya's Mouse, p. 206–209). | Halving search spaces ($O(\log n)$ fault isolation: call graph, middleware chain, git bisect) to isolate broken seams mathematically. |
| **20** | **The Inventor's Paradox** | The more ambitious plan may have more chances to succeed; it may be easier to solve the more general problem (p. 121). | Instead of stacking fragile *if-else* patches for a thorny edge case, step back to design a clean general abstraction (State Pattern, Strategy, Generic Pipeline) that dissolves the edge case naturally. |
| **21** | **Subconscious Work & Incubation** | When prolonged conscious effort on an intractable problem reaches diminishing returns, step back rather than forcing erratic attempts (p. 197–198). | Anti-looping rule: When trapped in a debugging deadlock after multiple failed attempts, halt brute-force token generation, synthesize the exact contradiction, and present a structured dilemma to the user. |

---

## 🧭 Signs of Progress vs. Blind Alleys

During execution, continually monitor trajectory against Pólya's markers (p. 178–187):

| Favorable Signs of Progress (Keep Going) | Warning Signs of a Blind Alley (Turn Back Immediately) |
| :--- | :--- |
| • A previously unhandled constraint is cleanly satisfied.<br>• Data elements link cleanly to the unknown without hacks.<br>• A test fails for the *expected, exact* reason (TDD Red).<br>• The error surface area narrows with each step. | • Fixing one bug introduces new, unrelated errors in other files.<br>• The proposed patch requires increasing layers of nested `if-else` hacks.<br>• You must relax or compromise core business invariants to make it compile.<br>• The fix feels unnatural, complex, or fragile. |
