---
description: 'Documentation and content creation standards'
applyTo: '**/*.md'
---

## Markdown Content Rules

The following markdown content rules are enforced in the validators:

1. **Headings**: Start every standalone SDLC artifact or documentation file with a single top-level `# H1` title, followed by hierarchical subheadings (`##` for H2, `###` for H3). Avoid deep nesting beyond H4.
2. **Lists**: Use bullet points (`-`) or numbered lists (`1.`) with consistent two-space indentation for nested items.
3. **Code Blocks**: Use fenced code blocks with triple backticks and always specify the language identifier (e.g., `typescript`, `python`, `sql`, `bash`, `text`, `mermaid`).
4. **Links**: Use descriptive link text and valid relative or `file://` paths. Never use vague link labels like "click here".
5. **Images & Diagrams**: Include descriptive alt text for images. Prefer ASCII topology diagrams or fenced `mermaid` diagrams (`flowchart`, `sequenceDiagram`, `stateDiagram-v2`, `classDiagram`, `erDiagram`) for architecture and data flows. Quote Mermaid node labels that contain parentheses or brackets (e.g., `id["Label (Detail)"]`).
6. **Tables**: Use GitHub Flavored Markdown tables with aligned pipe (`|`) columns and header separator rows to present matrices, traceability maps, and audit checklists.
7. **GitHub-Style Alerts**: Use standard GitHub callouts (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`) for critical context and sequential assumption tags (`> [!WARNING] [ASSUMPTION-001]: ...`). Do not nest or place alerts consecutively without separating prose.
8. **Whitespace**: Separate headings, paragraphs, code blocks, lists, and tables with a single blank line for clean rendering and lint compliance.
9. **Front Matter**: When authoring canonical SDLC artifacts (`docs/discovery/`, `docs/prd/`, `docs/spec/`, `docs/plan/`, `docs/bug-reports/`), include the YAML front matter defined by the corresponding template in `.agents/skills/to-shared/references/`.

## Formatting and Structure

Follow these guidelines for formatting and structuring your markdown content:

- **English-Only Technical Artifacts**: All generated SDLC markdown artifacts (`PRD`, `Spec`, `Plan`, `Clarification`, `Review`, `ADR`, `ARCHITECTURE.md`, and `Diátaxis` docs) MUST be written in clear, precise English per `AGENTS.md`.
- **Zero Lazy Placeholders**: Never leave `TODO`, `TBD`, or `...` placeholders in finalized sections. If an architectural detail must be assumed during fast-track synthesis, tag it explicitly with `> [!WARNING] [ASSUMPTION-XXX]: ...`.
- **Traceability Identifiers**: Preserve exact uppercase identifiers (`REQ-XXX`, `CON-XXX`, `AC-XXX`, `TASK-XXX`, `[ASSUMPTION-XXX]`) across documents so downstream skills can verify bidirectional traceability.

## Validation Requirements

Ensure compliance with the following validation requirements before finalizing any markdown file:

- **Template Fidelity**: Verify that all required sections from the canonical template in `.agents/skills/to-shared/references/` are present and populated.
- **Link & Seam Accuracy**: Verify that all referenced file paths, code symbols, and upstream artifact paths (`spec_ref`, `docs/adr/NNNN-slug.md`) exist in the workspace.
- **Markdown Lint Compliance**: Ensure balanced code fences, properly formatted tables, and valid heading hierarchy.
