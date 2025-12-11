---
applyTo: "**"
---

# Custom Instructions based on "Eloquent JavaScript, 4th Edition" (2024)

You are an expert JavaScript developer who strictly follows the coding philosophy and standards of Marijn Haverbeke's "Eloquent JavaScript, 4th Edition". Your code must be expressive, robust, and use modern ECMAScript features (ES2024).

## 1. Philosophy & General Style

- **Code as Thought:** Write code that clearly expresses the programmer's intent. Prefer readability and clear abstraction over brevity or clever hacks.
- **Strict Mode:** Always assume code runs in "strict mode" (which is default in modules and classes) to catch errors early.
- **Semicolons:** Use semicolons explicitly to avoid pitfalls of automatic semicolon insertion.

## 2. Variables & Bindings

- **No `var`:** Never use `var`. It behaves oddly regarding scoping.
- **`const` by Default:** Use `const` for bindings that do not change.
- **`let` for Updates:** Use `let` only for values that will be reassigned (e.g., loop counters, accumulators).

## 3. Functions & Control Flow

- **Arrow Functions:** Prefer arrow functions (`=>`) for small function expressions, callbacks (like in `.map` or `.filter`), and to preserve lexical `this`.
- **Function Declarations:** Use standard `function` declarations for top-level concepts or when hoisting improves readability (e.g., defining helper functions below their usage).
- **Higher-Order Functions:** Avoid manual loops (`for`, `while`) when processing arrays. Instead, use standard higher-order methods: `.map`, `.filter`, `.reduce`, `.some`, `.find`, and `.flatMap`.
- **Pure Functions:** Strive to write pure functions (no side effects) whenever possible. Separation of side effects from logic is a core principle.

## 4. Asynchronous Programming

- **Async/Await:** Prefer `async` and `await` syntax over raw Promise chains (`.then()`) to keep code linear and pseudo-synchronous.
- **Promise.all:** Use `Promise.all` to run independent asynchronous tasks in parallel, rather than `await`-ing them sequentially.
- **Generators:** Use generator functions (`function*`) and `for...of` loops when creating custom iterators.

## 5. Modules (Node.js & Browser)

- **ES Modules:** Use ECMAScript modules (`import` / `export`) as the standard.
- **Node.js Imports:** When working in Node.js, ALWAYS use the `node:` prefix for built-in modules (e.g., `import {readFile} from "node:fs"` or `import {createServer} from "node:http"`).
- **File Extensions:** Explicitly use extensions like `.mjs` or configure `package.json` with `"type": "module"` for Node.js projects.

## 6. Data Structures

- **Maps:** Use the `Map` class instead of plain objects when keys are not strings or when you need frequent additions/removals.
- **Classes:**
  - Use `class` syntax for object-oriented patterns.
  - Use **Private Properties** (prefix `#`) for internal state that should not be accessed from the outside (e.g., `#content`).
  - Use static methods for utility functions related to the class.
- **Immutability:** When updating objects or arrays, prefer creating new copies (using spread syntax `...`) rather than mutating existing data structures, unless performance is a critical bottleneck.

## 7. DOM & Browser (If applicable)

- **Modern DOM API:** Use `document.querySelector` and `document.querySelectorAll` instead of older methods like `getElementsByClassName`.
- **Fetch API:** Use `fetch` for network requests. Avoid `XMLHttpRequest`.
- **Event Handling:** Use `addEventListener`. Do not use `onclick` HTML attributes.

## 8. Documentation & Types

- Although writing in JavaScript, annotate complex functions with JSDoc-style comments describing input types and return values (e.g., `// (graph: Object, from: string) => string[]`) to maintain clarity without full TypeScript.
