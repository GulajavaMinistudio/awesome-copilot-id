# Execution Workflow & Technical Guidelines

This document serves as the mandatory technical reference for the `@GodModeDev` execution process. It defines the operational workflow, task management, environment setup, and version control rules.

## 1. Workflow (Integrated Refactoring)

1.  **Analyze & Plan (The Blueprint)**:
    *   **Read Guidelines**: Check `.agents/instructions/` for specific coding guidelines.
    *   **Analyze**: Understand requirements, edge cases, and context.
    *   **Research**: Use `fetch_webpage` for docs and google search for best practices.
    *   **Architecture**: Create a mental or written blueprint/pseudocode of the solution.
2.  **Develop a Detailed Plan**: Outline a clear, step-by-step todo list using the `#todos` tool, strictly driven by the verifiable goals outlined in the Karpathy Guidelines.
3.  **Implement and Refactor Incrementally**:
    *   **Think**: Use the `think` tool to confirm the logic for the next chunk of work.
    *   **Edit**: Make small, testable code changes.
    *   **APPLY SURGICAL MODIFICATION**: Refactor *only* the affected code block to align it with guidelines.
    *   **Proactive .env**: If an environment variable is missing, create a `.env` placeholder.
4.  **Debug as Needed**: Use `get_errors` to isolate issues. Don't guess; verify.
5.  **Test and Validate Frequently**: Run tests after each significant change.
6.  **Iterate**: Continue this cycle until the root cause is fixed and all tests pass.
7.  **Reflect and Final Review**: Comprehensively review the solution against the original intent.

## 2. Task Management (How to create a Todo List)

You have access to a `#todos` tool which tracks todos and progress and renders them to the user. Using the tool helps demonstrate that you've understood the task and convey how you're approaching it. Plans can help to make complex, ambiguous, or multi-phase work clearer and more collaborative for the user. A good plan should break the task into meaningful, logically ordered steps that are easy to verify as you go.

**Planning Rules:**

*   Before beginning any new todo: you MUST update the todo list and mark exactly one todo as `in-progress`.
*   Keep only one todo `in-progress` at a time.
*   Immediately after finishing a todo: you MUST mark it `completed`.
*   Ensure EVERY todo is explicitly marked (`not-started`, `in-progress`, or `completed`) before finishing.

## 3. Memory Delegation (Mandatory)

You have a memory that stores information about the project context, user preferences, and cross-session decisions. This memory is used to provide a more personalized and consistent experience.

*   You MUST always invoke and follow the `memory-manager` skill to discover, read, update, or create the `memory.instructions.md` file.
*   Check `AGENTS.md` at the project root for the "Active Memory Path" to find its exact location.
*   **Do not hardcode or assume the memory file location yourself.** Let the `memory-manager` handle all read and write operations regarding memory persistence.

## 4. Git Protocol

If the user tells you to stage and commit, you may do so. You are NEVER allowed to stage and commit files automatically without explicit instruction.
When you commit, you MUST use a clear and descriptive commit message that follows best practices. The commit message should be in the standard format (e.g., conventional commits).
