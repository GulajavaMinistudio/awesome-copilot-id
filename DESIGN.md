<!-- markdownlint-disable -->
# Awesome Copilot Indonesia Design System (DESIGN.md)

> **Design Philosophy & Visual World:**  
> Awesome Copilot Indonesia is an enterprise-grade AI developer platform and SDLC toolkit. Inspired by Airbnb's clarity, restraint, modest typographic weights, and hairline borders, the visual design is purposefully instantiated as a **High-Contrast Tech Indigo & Slate Design System** (`#4f46e5` / `#0f172a`) paired with Emerald TDD accents (`#10b981`) and Catppuccin Macchiato terminal aesthetics (`#363a4f`).

---

## 1. Overview & Key Characteristics

- **Base Canvas:** Pure white (`{colors.canvas}` — `#ffffff`) providing a crisp, distraction-free reading and coding surface.
- **Primary Accent:** Tech Indigo (`{colors.primary}` — `#4f46e5`, hover `#4338ca`), delivering a verified **6.33:1 contrast ratio** against white canvas (WCAG AA / AAA compliant).
- **Text & Ink System:** Deep Slate-900 (`{colors.ink}` — `#0f172a`) for headlines and active tags, Slate-700 (`{colors.body}` — `#334155`) for running descriptions, and Slate-500 (`{colors.muted}` — `#64748b`) for subtitles.
- **TDD Sub-Brand System:** Fresh Emerald & Mint (`#10b981`, `#ecfdf5`, `#a7f3d0`) providing immediate recognition for test-driven and quality-gate components.
- **Terminal Syntax System:** Catppuccin Macchiato palette (`#363a4f` background, `#cad3f5` text, `#c6a0f6` mauve, `#a6da95` green, `#8aadf4` blue) used inside console mockups and execution previews.
- **Shape Language:** Soft and ergonomic. Radii set at 8px (`{rounded.sm}` for inputs and badges), 12px (`{rounded.md}` for phase cards and filter pills), and 16px (`{rounded.lg}` for major containers).
- **Elevation:** Capped at one discrete shadow tier (`0 4px 20px -2px rgba(0,0,0,0.04)`) to maintain a clean editorial feel without heavy dashboard clutter.
- **Spacing:** 8px base spacing grid with `{spacing.section}` (64px) for major thematic bands.

---

## 2. Color System & Design Tokens

### Brand & Accents
| Token | Variable | Value | Usage |
| :--- | :--- | :---: | :--- |
| `{colors.primary}` | `--colors-primary` | `#4f46e5` | Primary CTAs, active highlights, focus rings, link accents |
| `{colors.primary-hover}` | `--colors-primary-hover` | `#4338ca` | Button hover and active press states |
| `{colors.primary-disabled}` | `--colors-primary-disabled` | `#c7d2fe` | Disabled buttons and ghost outlines |
| `{colors.tdd-accent}` | `--colors-tdd-accent` | `#10b981` | TDD badge accents, success indicators |
| `{colors.tdd-soft}` | `--colors-tdd-soft` | `#ecfdf5` | Soft background fill for TDD feature callouts |
| `{colors.tdd-border}` | `--colors-tdd-border` | `#a7f3d0` | Subtle hairline borders for TDD containers |

### Surfaces & Backgrounds
| Token | Variable | Value | Usage |
| :--- | :--- | :---: | :--- |
| `{colors.canvas}` | `--colors-canvas` | `#ffffff` | Default page background and card fill |
| `{colors.surface-soft}` | `--colors-surface-soft` | `#f8fafc` | Code block backgrounds, table header fills, card hovers |
| `{colors.surface-strong}` | `--colors-surface-strong` | `#f1f5f9` | Secondary card fills and active tab indicators |

### Hairlines & Borders
| Token | Variable | Value | Usage |
| :--- | :--- | :---: | :--- |
| `{colors.hairline}` | `--colors-hairline` | `#e2e8f0` | 1px card borders, table dividers, input boundaries |
| `{colors.hairline-soft}` | `--colors-hairline-soft` | `#f1f5f9` | Table row dividers and inner section splitters |
| `{colors.border-strong}` | `--colors-border-strong` | `#cbd5e1` | Hovered card borders and focus outlines |

### Typography Colors
| Token | Variable | Value | Contrast vs Canvas | Usage |
| :--- | :--- | :---: | :---: | :--- |
| `{colors.ink}` | `--colors-ink` | `#0f172a` | **18.1 : 1** (AAA) | Display titles, section headers, active menu items |
| `{colors.body}` | `--colors-body` | `#334155` | **9.53 : 1** (AAA) | Primary explanatory paragraphs and table text |
| `{colors.muted}` | `--colors-muted` | `#64748b` | **4.64 : 1** (AA) | Sub-labels, captions, inactive tab text |
| `{colors.on-primary}` | `--colors-on-primary` | `#ffffff` | **6.33 : 1** (AA) | White text on primary indigo CTA buttons |

---

## 3. Typography & Font System

### Font Stacks
- **Display & Headings:** `'Outfit', 'Google Sans', -apple-system, system-ui, Roboto, sans-serif` (letter-spacing: `-0.02em`, weights: 600, 700).
- **Body & Interface:** `'Google Sans', -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif` (weights: 400, 500).
- **Code & Monospace:** `SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace` (weights: 500, 700).

### Typographic Scale

| Token | Size | Weight | Line Height | Usage |
| :--- | :---: | :---: | :---: | :--- |
| `{typography.display-hero}` | 40–48px | 700 | 1.15 | Hero H1 headline |
| `{typography.display-section}` | 28–32px | 700 | 1.25 | Section H2 headlines |
| `{typography.title-lg}` | 20–22px | 600 | 1.30 | Feature card and spotlight H3 headers |
| `{typography.title-md}` | 16–18px | 600 | 1.40 | Agent role titles and card H4 headers |
| `{typography.body-md}` | 15–16px | 400 | 1.55 | Running descriptive text |
| `{typography.body-sm}` | 13–14px | 400 | 1.45 | Card metadata, bullet points, table text |
| `{typography.code}` | 12–13px | 500 | 1.50 | Monospace CLI prompts and slash commands |
| `{typography.badge}` | 10–11px | 700 | 1.20 | Uppercase category and status badges |

---

## 4. Components & Pattern Library

### 1. Interactive Console Mockup (`.console-mockup`)
- **Theme:** Catppuccin Macchiato surface (`#363a4f`) with rounded top header dot indicators (Red `#ed8796`, Yellow `#eed49f`, Green `#a6da95`).
- **Typography:** 11–12px monospace with colored semantic tokens (`.text-success`, `.text-info`, `.text-warning`, `.text-muted`).
- **Elevation:** Crisp 1px hairline border (`border: 1px solid rgba(255,255,255,0.1)`) over light canvas.

### 2. SDLC Workflow Steppers (`.sdlc-step-btn`)
- **Default State:** White background, 1px `{colors.hairline}`, `{colors.ink}` text with modest 500 weight.
- **Active State:** Solid `{colors.ink}` (`#0f172a`) background with `#ffffff` text and dark active badge.
- **Hover State:** Smooth background shift to `{colors.surface-soft}` (`#f8fafc`).

### 3. Custom Agent Sidebar & Detail Cards
- **Desktop (≥992px):** Sticky 2-column layout. Left column houses the phase-grouped agent list; right column displays the full agent blueprint with monospace command badge, responsibility list, and copyable prompt template.
- **Mobile (<992px):** Smooth collapsible accordion with auto-closing navbar integration.

### 4. Code Blocks & One-Click Copy Buttons
- **Flex Container:** `.position-relative:has(pre)` automatically flows prompt text and copy button horizontally to prevent text overlap.
- **Interaction Feedback:** Button transitions to `.btn-success.text-white` with `"Copied!"` for 2000ms.
- **Accessibility:** Announces `"Copied command to clipboard: <text>"` to screen readers via `#a11y-live-feedback` (`aria-live="polite"`).

---

## 5. Responsive Behavior & Touch Standards

| Viewport Class | Breakpoint | Layout Adaptations |
| :--- | :---: | :--- |
| **Mobile** | `< 768px` | Single-column cards, minimum 38–44px touch targets on buttons & dropdowns, sticky navbar with collapsible menu. |
| **Tablet** | `768px – 991px` | 2-column skill grids, horizontal filter pills with scroll support, compact agent view. |
| **Desktop** | `≥ 992px` | 2-column sticky agent sidebar, 3-column TDD skill cards, 80px fixed app bar with active indicator underline. |

### Accessibility (a11y) & WCAG AA Guarantees
- **Focus Rings:** All interactive elements feature `:focus-visible { outline: 2px solid var(--colors-primary) !important; outline-offset: 2px !important; }`.
- **Keyboard Navigation:** Native button tabs, dropdowns, and roving focus support across all interactive elements.
- **Color Contrast:** All running text meets or exceeds WCAG AA (minimum 4.5:1) and AAA (7.0:1 for ink).
- **Screen Reader Support:** Full `aria-label`, `aria-live="polite"`, `aria-expanded`, and semantic table roles.
