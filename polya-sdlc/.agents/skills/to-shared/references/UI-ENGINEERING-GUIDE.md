<!-- markdownlint-disable -->
# 🎨 Pólya UI Engineering & Design-to-Code Reference Guide

> **Purpose:** On-demand modular reference for `/to-code` when implementing or refactoring user-facing screens, components, layouts, or design tokens.

---

## 1. Two-Pass Execution & The 6 UI Disqualifiers

Every user-facing slice must ship as a complete, intentional product surface built in two passes:
1. **Pass 1 — Design the Surface (Phase 0 Gate):** Lock the screen composition, token hierarchy, and all 5 UI states before writing component markup.
2. **Pass 2 — Integrate into Codebase:** Wire semantic structure, design tokens, responsive layout, interactive states, and accessibility invariants.

### 🚫 The 6 UI Disqualifiers (Immediate Self-Audit Rejections)
1. **Stranded Widget:** A lone form, card, or input floating on an otherwise blank page without surrounding product context.
2. **Dead Zones:** Unbalanced whitespace, narrow stranded columns, or unstyled container wrappers.
3. **Naked Controls:** Unstyled native inputs, selects, or buttons lacking focus rings, hover states, and consistent sizing.
4. **Flat / Default-Only Styling:** Hairline borders and system defaults with zero typographic hierarchy, surface elevation, or intentional contrast.
5. **Missing Operational States:** Absent `Loading`, `Empty`, `Error`, or `Partial` states, or dead-end error views without a recovery action.
6. **Generic AI Visual Slop:** Gratuitous purple/indigo neon gradients, uniform `rounded-2xl` on every element, `Lorem ipsum` placeholder copy, or monotonous 3-column card grids.

---

## 2. Design Source Routing (4 Routes)

Before writing UI code, classify the design source and follow its exact route:

### Route A: Connected Design / Figma MCP
- Query the connected design MCP for real color/spacing/typography tokens, component variants, and named frame structure.
- Record extracted art direction in `design.md` (if used by the project) and map token values directly into the project's CSS/theme configuration.
- **Never** silently fall back to invented styles if a specified Figma/MCP source is unreachable—halt and inform the user.

### Route B: Screenshot / Reference Image(s) (Pixel-Fidelity Mode)
- **Multi-Image Classification (When $>1$ Image Provided):**
  - *Different viewport widths* $\to$ Treat as responsive breakpoint specifications (Mobile vs. Desktop).
  - *Different UI states* $\to$ Treat as state specifications (`Empty`, `Loading`, `Error`, `Populated`, modal open).
  - *Light + Dark variants* $\to$ Extract dual theme token palettes.
- **Strict Fidelity Mandate:** Reproduce exact layout proportions, hex colors, 16px-anchored type hierarchy, and 4px/8px spacing rhythm without unrequested embellishment.

### Route C: Existing Brownfield UI / Design System
- Inspect existing theme files (`tailwind.config.*`, CSS variables, `ThemeData`, design-system packages) and 2–3 representative screens (`[VERIFIED: file:line]`).
- **House Component Beats Native Widget:** Always reuse established project components (`Button`, `Modal`, `DataTable`, `FormField`) and semantic tokens before introducing new primitives or raw native elements.

### Route D: Greenfield UI Generation (Upfront Mathematical Token & WCAG Derivation)
When building a greenfield UI with no existing design system:
1. **Derive a 6-Step Accent-Tinted Neutral Ladder:**
   - Choose one primary `accent` hue and tint the neutral lightness ladder slightly toward that hue:
     `--color-canvas` $\to$ `--color-surface` $\to$ `--color-border` $\to$ `--color-muted` $\to$ `--color-body` $\to$ `--color-ink` (plus semantic `--color-success`, `--color-warning`, `--color-error`, and `--color-on-accent`).
2. **Upfront Mathematical WCAG 2.1 AA Contrast Check (Before Writing CSS):**
   - Calculate and verify contrast ratios separately for **Light** and **Dark** modes before emitting stylesheet rules:
     - `body` on `canvas` & `surface`: **$\ge 4.5:1$**
     - `ink` (headings) on `canvas` & `surface`: **$\ge 7.0:1$** (target) / **$\ge 4.5:1$** (minimum)
     - `muted` (secondary copy) on `canvas` & `surface`: **$\ge 4.5:1$** for meaningful text
     - `on-accent` on `accent`: **$\ge 4.5:1$**
     - `border` / interactive control boundary on `surface`: **$\ge 3.0:1$**
   - If any pair fails its threshold, adjust lightness and recompute before writing CSS.
3. **Modular Type Scale & 4px/8px Spatial Rhythm:**
   - Base body size `16px` (`1rem`), line-height `1.5` for body copy (`60–75ch` max measure), `1.15–1.25` for headings, max 3 font weights.
   - Spacing on a strict `4px` base / `8px` rhythm (`4, 8, 12, 16, 24, 32, 48, 64px`).
   - 3-step border radius (`sm`, `md`, `full`) and 3-step motion timings (`~80ms` micro, `~160ms` transition, `~240ms` layout/drawer) respecting `prefers-reduced-motion: reduce`.
4. **Token Single Source of Truth:**
   - Store raw token **values** exclusively in CSS/theme files; never hardcode duplicate hex/pixel literals across component files.

---

## 3. Fonts, Assets & Placeholder Data Hygiene

### 3.1 Proprietary Font Substitution Map
If a reference design specifies a commercial font not present in local project assets, substitute with its metric-compatible open equivalent unless licensed files are provided:

| Proprietary Font | Open Equivalent | Category |
| :--- | :--- | :--- |
| `Söhne`, `Graphik`, `Helvetica Now`, `SF Pro` | `Inter` or `Plus Jakarta Sans` | Grotesque Sans |
| `Circular`, `Averta`, `Gilmer` | `DM Sans` | Geometric Sans |
| `Futura`, `Avant Garde` | `Jost` | Geometric Display |
| `GT Walsheim`, `Proxima Soft` | `Nunito` or `Outfit` | Humanist / Rounded Sans |
| `Canela`, `Editorial New` | `Playfair Display` or `Instrument Serif` | High-Contrast Serif |
| `Tiempos Text`, ` Lyon` | `Libre Baskerville` or `Newsreader` | Editorial Serif |
| `Berkeley Mono`, `Operator Mono` | `JetBrains Mono` or `Fira Code` | Monospace |

### 3.2 3-Step Asset Resolution
1. Scan local asset directories (`public/`, `assets/`, `src/assets/`, `images/`, `static/`) first.
2. If required illustrations/images are missing, use deterministic local SVG/CSS token placeholders or ask the user whether to wire local asset paths vs. a centralized placeholder constant with explicit `width`/`height` aspect ratios and descriptive `alt` text.
3. Never leave broken `src=""` paths or layout-shifting unsized images.

### 3.3 Typed Placeholder Data Isolation (When Mocking Upstream Data)
- If a slice temporarily uses mock data before backend wiring, isolate it in a dedicated typed module (e.g., `lib/<feature>.placeholder.ts`) covering all 5 states (`Populated`, `Empty`, `Loading`, `Error`, `Partial`) with an explicit header comment:
  `// PLACEHOLDER: replace with live use-case/API integration in [TASK-XXX]`

---

## 4. Accessibility & Interactive Completeness Checklist

Before marking any UI slice complete, verify all 8 items:
- [ ] **Semantic Landmarks & Primitives:** Proper `<main>`, single `<h1>`, native `<button>` for actions, `<a href>` for navigation, and native `<dialog>` / ARIA modal primitives.
- [ ] **Keyboard & Focus Discipline:** Every interactive element is reachable via `Tab`, activates via `Enter`/`Space`, displays a `:focus-visible` indicator ($\ge 3:1$ contrast), and modals trap/restore focus cleanly.
- [ ] **Persistent Labels & ARIA:** Every form control has a persistent visible `<label>` (placeholder text is never the sole label); icon-only buttons carry explicit `aria-label`; async regions use `aria-live="polite"` / `aria-busy="true"`.
- [ ] **All 5 UI States Implemented:** `Loading`, `Empty` (with helpful guidance/CTA), `Error` (with retry/recovery), `Partial`, and `Populated`.
- [ ] ** Interactive Control States:** `Default`, `Hover`, `Focus-visible`, `Active/Pressed`, and `Disabled` states are visually distinct.
- [ ] **Responsive & Touch Ergonomics:** Verified across mobile (`375px`) and desktop (`1280px+`) without horizontal overflow; interactive touch targets measure at least `44x44px`.
- [ ] **Token Discipline:** Zero raw hex colors or magic pixel literals bypassing the project's theme tokens.
- [ ] **Clean Runtime Console:** Zero console errors, zero uncaught promise rejections, and zero hydration mismatches when rendered in an `--isolated` browser session.
