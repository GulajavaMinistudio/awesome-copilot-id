---
name: memory-manager
description: "Standardized workflow for discovering, reading, writing, and compacting the project's memory file (memory.instructions.md) to persist context across AI chat sessions, with a permanent Knowledge Base for cross-session decisions and lessons learned."
license: MIT
---

<!-- markdownlint-disable -->

# Memory Manager Skill

## Overview

This skill provides a standardized protocol for managing the project's persistent memory file (`memory.instructions.md`). It ensures that AI agents can reliably save and restore context across chat sessions, regardless of which instruction directory the project uses. This skill is **agent-agnostic** — any agent in the ecosystem can invoke it.

The memory file is divided into **two distinct zones**:

1. **🧠 Knowledge Base** — A permanent section at the top that accumulates cross-session knowledge: architectural decisions, proven patterns, dead-ends with root causes, and key metrics. This section survives compaction and is never deleted.
2. **📝 Session Checkpoints** — Append-only entries at the bottom that track per-session progress. These are rotated during compaction, with valuable knowledge promoted to the Knowledge Base before deletion.

For performance, the active memory path can be recorded in the project's `AGENTS.md` file as a fast-path shortcut. See **AGENTS.md Integration** below for details.

## When to Use

- **Write Mode:** At the end of a significant milestone or phase completion, when the user agrees to save progress.
- **Read Mode:** At the start of a new chat session to bootstrap context from prior sessions.
- **Compaction Mode:** When the user requests cleanup of old checkpoints, promoting valuable knowledge to the Knowledge Base before deleting stale entries.

---

## Workflow 1: File Discovery Protocol (Mandatory First Step)

> **⚠️ DIRECTIVE:** This workflow MUST be executed before ANY read or write operation. Never hardcode or assume the memory file path.

### Step 0: Fast Path via AGENTS.md (Optional but Preferred)

Before performing a recursive search, check if the active memory path is already recorded in the project's `AGENTS.md` file (located at the project root).

1. **Read `AGENTS.md`** at the project root (if it exists).
2. **Search for a `## Memory Configuration` section** containing an `Active Memory Path` entry.
3. **Resolution:**
   - **If found AND the file exists at that path:** Lock the discovered path as the target for all subsequent read/write operations. Skip the recursive search in Step 1. This is the **fast path** — it avoids scanning 6–7 instruction directories.
   - **If found BUT the file does NOT exist:** Warn the user that the recorded path is stale. Proceed to Step 1 (recursive search) as fallback. After a new file is found or created, offer to update the path in `AGENTS.md` (see Workflow 3, Step 5).
   - **If `AGENTS.md` does not exist OR no `Memory Configuration` section is found:** Proceed to Step 1 (recursive search) as normal.

### Step 1: Recursive Search (Fallback)

1. **Search recursively for `memory.instructions.md`** across ALL subdirectories within the project, prioritizing the following instruction roots and their subfolders:
   - `.agents/instructions/` (and subfolders)
   - `instructions/` (and subfolders at the project root)
2. **Use recursive search tools** (such as `grep_search` searching for filename `memory.instructions.md` or glob patterns like `**/memory.instructions.md`) to scan across subfolders, ignoring build/vendor folders (`node_modules`, `.git`, `dist`).
3. **Resolution:**
   - **If exactly ONE file is FOUND:** Lock the discovered path as the target for all subsequent read/write operations in this session.
   - **If MULTIPLE files are FOUND:** You MUST pause and present the list of found paths to the user. Ask the user which path should be locked as the active memory for this session. Do NOT proceed until the user explicitly chooses one.
   - **If NOT FOUND in any location:** Create the `instructions/` folder at the project root and initialize a new `memory.instructions.md` file inside it using the **Initial Memory Template** below.

> **Note:** If the fast path (Step 0) was skipped or failed, and a file is found via recursive search, offer to record the path in `AGENTS.md` during Workflow 3 (Write Mode, Step 5).

### Initial Memory Template (For New Files Only)

```md
# Project Memory Log

> Active Location: [path_where_this_file_is_created]
> This file is managed by the `memory-manager` skill.
> It persists context across AI chat sessions to prevent knowledge loss.
> Do NOT manually edit this file unless necessary.

---

## 🧠 Knowledge Base

> This section accumulates cross-session knowledge that must survive compaction.
> Updated during Compaction Mode (Workflow 4). Do NOT delete entries here.

### Architecture & Patterns

<!-- Proven patterns and architectural decisions. Add entries as bullet points. -->

### Dead-Ends (Do NOT Repeat)

<!-- Failed approaches with root cause and correct solution. Use table format:
| # | Attempted | Why It Failed | Correct Solution |
|---|-----------|---------------|------------------|
-->

### Key Metrics & Baselines

<!-- Stable metrics that serve as reference points (test counts, coverage, performance baselines). -->

---
```

---

## Workflow 2: Read Mode (Context Bootstrap)

Use this workflow to load context at the beginning of a new session.

1. **Execute Workflow 1** to locate the memory file.
2. **Read the entire file** using the appropriate read tool.
3. **Extract and internalize from the Knowledge Base section (if present):**
   - **Architecture & Patterns** — Proven patterns that should be followed.
   - **Dead-Ends** — Approaches that failed previously with their root causes and correct solutions. Do NOT repeat these.
   - **Key Metrics & Baselines** — Reference metrics (test counts, coverage, performance) for comparison.
4. **Extract and internalize from the most recent checkpoint entry:**
   - **Current SDLC Phase** — Which phase of the development lifecycle is active.
   - **Active Artifacts** — Status of key SDLC documents (PRD, Spec, Plan).
   - **Latest Milestones** — What was accomplished in the last session(s).
   - **Pending Actions / Blockers** — What remains to be done or what issues are unresolved.
   - **Checkpoint Tail** — The 1-sentence HTML comment at the bottom for rapid context recovery.
5. **Acknowledge to the user** that context has been loaded AND explicitly state the locked path. Mention both Knowledge Base and checkpoint context. Example:
   > _"I have read the project memory from `[discovered_path]`. The Knowledge Base contains [N] architectural patterns and [N] dead-ends. The last SDLC phase was [Phase]. Recent progress includes [Milestones]. I am ready to proceed."_
6. **Proceed** with the user's request, now fully informed by historical context.

---

## Workflow 3: Write Mode (Context Checkpoint)

Use this workflow to persist progress after a significant milestone.

1. **Execute Workflow 1** to locate the memory file.
2. **Synthesize** the current session's achievements. Do NOT copy-paste raw conversation. Summarize concisely:
   - What phase was completed or advanced.
   - What documents or files were created/modified.
   - What decisions were made.
   - What remains to be done next.
3. **Append** a new checkpoint entry to the **bottom** of the memory file (after all existing checkpoints) using the **Mandatory Checkpoint Template** below. Do NOT overwrite or delete existing entries unless the user explicitly requests a memory compaction.
4. **Confirm to the user** that the checkpoint has been saved AND explicitly state the locked path. Example:
   > _"Memory checkpoint has been saved to `[discovered_path]`. This session's progress has been recorded for continuity in the next session."_
5. **Offer to record the active memory path in `AGENTS.md`** (if not already recorded):
   - Check if `AGENTS.md` exists at the project root.
   - Check if a `## Memory Configuration` section with an `Active Memory Path` entry already exists and matches the current locked path.
   - **If the path is NOT yet recorded** (or `AGENTS.md` has no Memory Configuration section), ask the user:
     > _"Would you like to save this memory path to `AGENTS.md` to speed up the next session?"_
   - **If the user agrees:** Add or update the `## Memory Configuration` section in `AGENTS.md` using the format defined in **AGENTS.md Integration** below. Confirm to the user:
     > _"The memory path has been recorded in `AGENTS.md`. The next session will directly use this path without needing a recursive search."_
   - **If the user declines:** Respect the decision. Do not ask again in the same session.
   - **If the path is already recorded and matches:** Skip the offer silently. No update needed.
   - **If `AGENTS.md` does not exist:** Skip the offer. Inform the user that `AGENTS.md` was not found at the project root.

### Mandatory Checkpoint Template

```md
## 📝 Session Checkpoint: [YYYY-MM-DD]

- **Active Memory Path:** [path_to_this_file]
- **Current SDLC Phase:** [e.g., Planning / Specification / Implementation / Review / Documentation]
- **Active Artifacts:**
  - `[path/to/prd-*.md]` — Status: ✅ Finalized (Readiness Score: [XX]/100)
  - `[path/to/spec.md]` — Status: 🔄 In Progress (Readiness Score: [XX]/100)
  - `[path/to/plan.md]` — Status: ⏳ Pending
- **Achieved Milestones:**
  - [Concise description of what was accomplished]
  - [Another achievement, if any]
- **Dead-Ends (Do NOT Repeat):**
  - **Attempted:** [Approach that was tried and failed]
  - **Reason:** [Why it failed / root cause]
  - **Note:** If this dead-end recurs across sessions, flag it for promotion to Knowledge Base during next compaction.
- **Updated Files:**
  - `[relative/path/to/file1]` — [Brief description of change]
  - `[relative/path/to/file2]` — [Brief description of change]
- **Decisions Made:**
  - [Key architectural or design decision, if any]
- **Next Action / Pending:**
  - [What the next agent or session should pick up]
  - [Any unresolved blockers or open questions]

<!-- checkpoint-tail: [1-sentence summary for rapid context recovery by AI at session start] -->

---
```

---

## Workflow 4: Compaction Mode (Knowledge Promotion & Checkpoint Cleanup)

Use this workflow when the user requests memory cleanup or when checkpoints accumulate beyond a reasonable threshold.

> **⚠️ DIRECTIVE:** NEVER delete checkpoints without first promoting valuable knowledge to the Knowledge Base. The Knowledge Base is the permanent record; checkpoints are ephemeral.

1. **Execute Workflow 1** to locate the memory file.
2. **Read the entire file** and identify all session checkpoints.
3. **Determine which checkpoints to compact:**
   - Keep the **2–3 most recent** checkpoints for continuity.
   - Mark all older checkpoints as candidates for compaction.
4. **Before deleting any checkpoint, extract and promote valuable knowledge:**
   - **Architecture & Patterns:** Proven patterns, conventions, or design decisions that remain valid. Add as bullet points to the Knowledge Base `### Architecture & Patterns` section.
   - **Dead-Ends:** Failed approaches with root cause AND correct solution. Add to the Knowledge Base `### Dead-Ends (Do NOT Repeat)` table. Only promote if the dead-end is generalizable (not specific to a one-off session issue).
   - **Key Metrics & Baselines:** Stable metrics that serve as reference points (e.g., test counts, coverage percentages, performance baselines). Add to the Knowledge Base `### Key Metrics & Baselines` section. Only promote finalized, stable metrics — not in-progress numbers.
   - **Decisions Made:** Architectural or design decisions that have lasting impact. Promote to Architecture & Patterns if they define a convention.
5. **Update the Knowledge Base** by appending or merging the extracted entries. Do NOT duplicate entries already present in the Knowledge Base.
6. **Delete the compacted checkpoints** from the file, keeping only the 2–3 most recent.
7. **Update the Knowledge Base header note** with the compaction date and range of sessions compacted. Example:
   > _"Checkpoints for Sessions 1–18 compacted on 2026-07-07. Knowledge promoted to this section."_
8. **Present the compaction summary to the user** before finalizing. Include:
   - Which sessions were compacted.
   - What knowledge was promoted (count of patterns, dead-ends, metrics).
   - Which checkpoints were retained.
9. **Confirm to the user** after the compaction is complete. Example:
   > _"Memory compaction complete at `[discovered_path]`. [N] checkpoints deleted, [N] entries promoted to Knowledge Base. [N] most recent checkpoints retained."_
10. **Verify AGENTS.md path (if recorded):** After compaction is complete, if the active memory path is recorded in `AGENTS.md`, verify that the file still exists at that path. If the file was moved or renamed during compaction (unlikely but possible), update the path in `AGENTS.md` to reflect the new location.

### Knowledge Base Update Template (For Compaction Only)

When promoting knowledge during compaction, append to the existing Knowledge Base sections using these formats:

**Architecture & Patterns (bullet list):**

```md
- **[Pattern Name]:** [Concise description]. [Source: Session X, still valid as of YYYY-MM-DD]
```

**Dead-Ends (table row):**

```md
| [id] | [What was attempted] | [Why it failed / root cause] | [Correct solution] |
```

**Key Metrics & Baselines (bullet list):**

```md
- **[Metric Name]:** [Value] — [Context, e.g., "296 tests, 14 files, 0 fail"]
```

---

## AGENTS.md Integration

The active memory path can be recorded in the project's `AGENTS.md` file to enable a **fast path** during Workflow 1 (File Discovery). This avoids a recursive search across 6–7 instruction directories on every session bootstrap.

### When to Record

- **After first checkpoint save** (Workflow 3, Step 5): If the path is not yet recorded in `AGENTS.md`, offer to record it.
- **After path changes** (user selects a different file during multi-file discovery): Update the recorded path to match the new selection.
- **After stale path detection** (Workflow 1, Step 0 detects file not found): After fallback discovery finds the correct file, offer to update the stale path.
- **Never automatic:** Recording or updating the path always requires explicit user consent. Do NOT modify `AGENTS.md` without asking.

### Format in AGENTS.md

Add a `## Memory Configuration` section to `AGENTS.md`. Place it after the `## Communication` section or near the end of the file, before `## Agents Specific Guidelines`.

```md
## Memory Configuration

- **Active Memory Path:** `.agents/instructions/memory.instructions.md`
- **Managed by:** `memory-manager` skill
- **Last Recorded:** [YYYY-MM-DD]
```

### Rules

- **Single entry only:** There must be exactly one `Active Memory Path` entry. If multiple paths are found during discovery, the user chooses one, and only that one is recorded.
- **Always verify before using:** Even when the fast path finds a recorded path, verify the file exists before locking it. A stale path must trigger fallback to recursive search.
- **Update on change:** If the memory file is moved, renamed, or a different file is selected, update the `Active Memory Path` and `Last Recorded` fields in `AGENTS.md`.
- **Non-destructive:** Adding or updating the `## Memory Configuration` section must NOT alter any other content in `AGENTS.md`.
- **No AGENTS.md, no recording:** If `AGENTS.md` does not exist at the project root, skip the recording offer. The fast path is simply unavailable; recursive search remains the fallback.

---

## Anti-Patterns (What to Avoid)

- **Hardcoding paths:** Never assume the memory file is always in `.opencode/instructions/`. Always run the Discovery Protocol (Step 0 fast path, then Step 1 fallback) first.
- **Dumping raw logs:** The checkpoint must be a synthesis, not a transcript. Keep entries concise and actionable.
- **Overwriting history:** Always append new checkpoints. Never delete old entries unless the user explicitly asks for memory compaction.
- **Skipping acknowledgment:** Always confirm to the user that the read or write operation was successful.
- **Deleting checkpoints without promotion:** NEVER delete a checkpoint without first extracting and promoting its valuable knowledge (dead-ends, patterns, decisions) to the Knowledge Base. Knowledge loss is irreversible.
- **Duplicating dead-ends in checkpoints:** If a dead-end is already documented in the Knowledge Base, do NOT re-write the full text in a checkpoint. Instead, reference it by ID or short label (e.g., "See KB Dead-End #3"). This prevents drift between Knowledge Base and checkpoint descriptions.
- **Promoting ephemeral state to Knowledge Base:** Do NOT promote in-progress metrics, session-specific file lists, or temporary blockers to the Knowledge Base. Only promote finalized, stable, and generalizable knowledge.
- **Trusting AGENTS.md path without verification:** NEVER assume the recorded `Active Memory Path` in `AGENTS.md` is still valid. Always verify the file exists before locking the path. A stale path must trigger fallback to recursive search (Step 1).
- **Modifying AGENTS.md without consent:** NEVER add, update, or remove the `## Memory Configuration` section in `AGENTS.md` without explicitly asking the user. The fast path is a convenience, not a silent side effect.

