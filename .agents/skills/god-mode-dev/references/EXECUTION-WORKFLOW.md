# Execution Workflow & Technical Guidelines

This document serves as the mandatory technical reference for the `@GodModeDev` execution process. It defines the operational workflow, task management, environment setup, and version control rules.

## 1. Workflow (Integrated Refactoring)

1. **Analyze & Plan (The Blueprint)**:
    * **Read Guidelines**: Check `.agents/instructions/` for specific coding guidelines.
    * **Analyze**: Understand requirements, edge cases, and context.
    * **Research**: Use `fetch_webpage` for docs and google search for best practices.
    * **Architecture**: Create a mental or written blueprint/pseudocode of the solution.
2. **Develop a Detailed Plan**: Outline a clear, step-by-step todo list using the `#todos` tool, strictly driven by the verifiable goals outlined in the Karpathy Guidelines.
3. **Implement and Refactor Incrementally**:
    * **Think**: Use the `think` tool to confirm the logic for the next chunk of work.
    * **Edit**: Make small, testable code changes.
    * **APPLY SURGICAL MODIFICATION**: Refactor *only* the affected code block to align it with guidelines.
    * **Proactive .env**: If an environment variable is missing, create a `.env` placeholder.
4. **Extreme Debugging**: Use terminal commands or logs to isolate issues. Don't guess; verify the root cause.
5. **Test and Validate Frequently**: Run tests after each significant change. Failing to test your code sufficiently rigorously is the NUMBER ONE failure mode of AI agents. You MUST verify your work using terminal commands (e.g., unit tests, linters) after every modification.
6. **Iterate Relentlessly**: Continue this cycle until the root cause is completely fixed and all hidden edge-cases are handled.
7. **Reflect and Final Review**: Comprehensively review the solution against the original intent.

## 2. Task Management (Platform-Agnostic Todo List)

Plan your execution using the Native Todo List feature provided by your current agent platform. For example, if your platform provides a specific `task.md` artifact tool, a built-in UI checklist, or a `#todos` tool, use that native feature. If no specific tool exists, maintain a standard markdown checklist in the chat or project root.

**Planning Rules:**

* **Break Down:** A good plan breaks the task into meaningful, logically ordered steps that are easy to verify.
* **Track Progress:** You MUST update the todo list and mark exactly one todo as `in-progress` before beginning a new step.
* **Complete:** Immediately after finishing a step, you MUST mark it as `completed` (`[x]`).
* **Visibility:** Ensure your progress (Not Started, In Progress, Completed) is regularly visible to the user so they can monitor your execution.

## 3. Memory Delegation (Mandatory)

You have a memory that stores information about the project context, user preferences, and cross-session decisions. This memory is used to provide a more personalized and consistent experience.

* You MUST always invoke and follow the `memory-manager` skill to discover, read, update, or create the `memory.instructions.md` file.
* Check `AGENTS.md` at the project root for the "Active Memory Path" to find its exact location.
* **Do not hardcode or assume the memory file location yourself.** Let the `memory-manager` handle all read and write operations regarding memory persistence.

## 4. Git Protocol

If the user tells you to stage and commit, you may do so. You are NEVER allowed to stage and commit files automatically without explicit instruction.
When you commit, you MUST use a clear and descriptive commit message that follows best practices. The commit message should be in the standard format (e.g., conventional commits).

## 5. Execution Requirements (Safeguards)

1. **Tests are Mandatory:** Every logical change must be accompanied by relevant unit or widget tests.
2. **No Lazy Placeholders:** Do not use `// ... keep existing code ...`. Always output complete, working code blocks or use surgical edit blocks properly.
3. **Traceability:** Every changed line should trace directly to the user's request and the approved implementation plan.
