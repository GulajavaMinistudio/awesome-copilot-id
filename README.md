# Awesome Copilot Indonesia 🇮🇩

A curated collection of custom agents, instructions, and prompts for GitHub Copilot, specifically tailored for Indonesian developers and development workflows.

[![GitHub](https://img.shields.io/badge/GitHub-Copilot-blue)](https://github.com/features/copilot)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 📋 Overview

This repository provides a comprehensive set of tools to enhance your GitHub Copilot experience, including:

- **🤖 Custom Agents**: Specialized AI agents for different development scenarios
- **📝 Instructions**: Best practices and coding guidelines for various languages and frameworks
- **💡 Prompts**: Ready-to-use prompts for common development tasks

## 🚀 Getting Started

### Prerequisites

- GitHub Copilot subscription (Individual, Business, or Enterprise)
- Visual Studio Code or compatible IDE with GitHub Copilot extension

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/awesome-copilot-id.git
   ```

2. **Choose what you need**: Browse through the available agents, instructions, and prompts to select only what fits your workflow.

   > [!IMPORTANT]
   > **Don't copy everything!** Only select the agents, instructions, or prompts that match your development needs. Having too many can create conflicts or unwanted behavior.

3. Copy selected files to your project's `.github` directory:

   ```bash
   # Create .github directory if it doesn't exist
   mkdir -p .github

   # Example: Copy only specific agents you need
   mkdir -p .github/agents
   cp awesome-copilot-id/agents/GodModeDev.agent.md .github/agents/
   cp awesome-copilot-id/agents/PlannerArchitect.agent.md .github/agents/

   # Example: Copy only specific instructions you need
   mkdir -p .github/instructions
   cp awesome-copilot-id/instructions/nodejs-codestyle.instructions.md .github/instructions/
   cp awesome-copilot-id/instructions/clean-code-clean-architecture.instructions.md .github/instructions/

   # Example: Copy only specific prompts you need
   mkdir -p .github/prompts
   cp awesome-copilot-id/prompts/create-readme.prompt.md .github/prompts/
   cp awesome-copilot-id/prompts/review-and-refactor.prompt.md .github/prompts/
   ```

4. Restart your IDE to apply the changes

> [!TIP]
> You can also reference these files from a central location in your system and symlink them to your projects for easier management.

## 🤖 Custom Agents

Custom agents are specialized AI assistants for specific development roles and tasks. Each agent can have its own behavior, available tools, and instructions. Place them in `.github/agents/` directory.

| Agent                      | Description                                                 | Best For                                                |
| -------------------------- | ----------------------------------------------------------- | ------------------------------------------------------- |
| **GodModeDev**             | Senior Expert Software Engineer with deep thinking protocol | Complex architectural decisions, full-stack development |
| **BeastModeDev**           | Highly autonomous development agent                         | End-to-end feature implementation                       |
| **MiniBeast**              | Lightweight version of BeastModeDev                         | Quick tasks and iterations                              |
| **PlannerArchitect**       | Strategic planning and architecture design                  | System design, technical planning                       |
| **SpecificationArchitect** | Technical specification creation                            | Writing detailed specs and documentation                |
| **ProductManagerPRD**      | Product requirement document creation                       | Feature planning, PRD writing                           |
| **QATestArchitect**        | Testing strategy and test case design                       | Test planning, QA workflows                             |
| **DocumentationWriter**    | Technical documentation specialist                          | Writing docs, guides, and tutorials                     |

### How to Use Custom Agents

1. **From Agent Dropdown**: Select the custom agent from the agents dropdown in the Chat view
2. **Type in Chat**: Use `#agent-name` syntax in chat

   ```text
   #GodModeDev implement authentication system with JWT
   #PlannerArchitect design microservices architecture
   ```

### Custom Agent File Structure

Custom agent files use the `.agent.md` extension with:

**Header (YAML frontmatter)**:

```yaml
---
description: "Generate an implementation plan"
name: "Planner"  # Optional, defaults to filename
argument-hint: "Optional hint for users"
tools: ["search", "fetch", "usages"]  # Available tools
model: "Claude Sonnet 4"  # Optional model selection
handoffs:  # Optional workflow transitions
  - label: "Implement Plan"
    agent: "agent"
    prompt: "Implement the plan outlined above."
    send: false
---
```

**Body**: Instructions and guidelines for the agent behavior. You can:

- Reference other files using Markdown links
- Use `#tool:toolName` syntax to reference specific tools
- Define specialized instructions for the agent's role

> [!TIP]
> Use handoffs to create guided sequential workflows between agents. For example, planning → implementation → review.

## 📝 Instructions

Instructions are rules and guidelines that GitHub Copilot follows when generating code. Place them in `.github/instructions/` directory.

| Instruction                              | Description                                           | Apply To                |
| ---------------------------------------- | ----------------------------------------------------- | ----------------------- |
| **taming-copilot**                       | Core directives for precise, surgical code assistance | All files (`**`)        |
| **clean-code-clean-architecture**        | Clean code principles and architecture patterns       | All files (`**`)        |
| **strict-clean-code-clean-architecture** | Strict enforcement of clean code/architecture         | All files (`**`)        |
| **nodejs-codestyle**                     | Node.js best practices and conventions                | `**/*.js`, `**/*.ts`    |
| **eloquent-js-codestyle**                | Eloquent JavaScript style guide                       | `**/*.js`               |
| **php-laravel-codestyle**                | Laravel framework conventions                         | `**/*.php`              |
| **flutter-codestyle**                    | Flutter and Dart best practices                       | `**/*.dart`             |
| **html-css-responsive**                  | Responsive HTML/CSS design principles                 | `**/*.html`, `**/*.css` |
| **markdown**                             | Markdown formatting standards                         | `**/*.md`               |
| **memory**                               | Project-specific context and preferences              | All files (`**`)        |

### Instruction Format

```markdown
---
applyTo: "**/*.js"
description: "Node.js coding standards"
---

# Your instruction content here
```

## 💡 Prompts

Prompt files are reusable templates for common development tasks like generating code, performing code reviews, or scaffolding project components. They are standalone prompts you can run directly in chat. Place them in `.github/prompts/` directory.

| Prompt                         | Description                         |
| ------------------------------ | ----------------------------------- |
| **create-readme**              | Generate comprehensive README files |
| **create-specification**       | Create technical specifications     |
| **update-specification**       | Update existing specifications      |
| **create-implementation-plan** | Generate implementation plans       |
| **update-implementation-plan** | Update implementation plans         |
| **breakdown-feature-prd**      | Break down features from PRD        |
| **documentation-writer**       | Write technical documentation       |
| **review-and-refactor**        | Code review and refactoring         |
| **boost-prompt**               | Enhance and improve prompts         |
| **fixing-prompt**              | Debug and fix issues                |
| **remember**                   | Store project context               |
| **project-memory-keeper**      | Maintain project memory             |

### How to Use Prompt Files

You have multiple options to run a prompt file:

1. **In Chat View**: Type `/` followed by the prompt name in the chat input field

   ```text
   /create-specification for user authentication module
   /create-readme
   ```

2. **From Command Palette**: Run `Chat: Run Prompt` command (Ctrl+Shift+P) and select a prompt file

3. **From Editor**: Open the prompt file and press the play button in the editor title area

> [!TIP]
> You can add extra information in the chat input field. For example: `/create-react-form formName=MyForm` or `/breakdown-feature-prd for shopping cart`

### Prompt File Structure

Prompt files use the `.prompt.md` extension and can include:

**Header (YAML frontmatter)**:

```yaml
---
description: "A short description of the prompt"
name: "prompt-name"  # Optional, defaults to filename
argument-hint: "Optional hint text for users"
agent: "agent"  # ask, edit, agent, or custom agent name
model: "gpt-4"  # Optional language model
tools: ["edit", "search", "runCommands"]  # Available tools
---
```

**Body**: The prompt text with instructions. You can use:

- **Variables**: `${workspaceFolder}`, `${selection}`, `${file}`, `${input:variableName}`
- **Markdown links**: Reference other workspace files using relative paths
- **Tool references**: Use `#tool:toolName` syntax (e.g., `#tool:githubRepo`)

## 🎯 Use Cases

### Feature Development

```markdown
@workspace #breakdown-feature-prd implement shopping cart feature
@workspace #create-implementation-plan for shopping cart
@workspace /chat #GodModeDev implement the shopping cart based on the plan
```

### Code Quality

```markdown
@workspace #review-and-refactor src/services/payment.js
```

### Documentation

```markdown
@workspace #create-readme
@workspace #documentation-writer for API endpoints
```

### Project Planning

```markdown
@workspace /chat #PlannerArchitect design microservices architecture
@workspace #create-specification for API gateway service
```

## 🌟 Best Practices

1. **Start with Planning**: Use `PlannerArchitect` or `create-specification` before implementation
2. **Follow Instructions**: Ensure relevant instruction files are in your `.github/instructions/` directory
3. **Use Appropriate Agents**: Match the agent to your task complexity
4. **Leverage Memory**: Use `#remember` to store project-specific context
5. **Iterate**: Use prompts like `update-implementation-plan` to refine your approach

## 🛠️ Customization

You can implement customizations incrementally, starting with the simplest options and gradually adding more complexity as needed.

### 1. Set Up Basic Guidelines (Custom Instructions)

Create custom instructions for consistent results across all your chat interactions. Custom instructions let you define common guidelines or rules for tasks like generating code, performing code reviews, or generating commit messages.

**File location**: `.github/instructions/` or `.github/copilot-instructions.md`

**Format**:

```markdown
---
applyTo: "**/*.ts"
description: "TypeScript coding standards"
---

# Your instruction content here

- Use strict type checking
- Follow functional programming principles
- Always handle errors explicitly
```

**Use custom instructions to**:

- Specify coding practices, preferred technologies, or project requirements
- Provide guidelines about commit messages or PR descriptions
- Set rules for code reviews (security, performance, coding standards)

#### Quick Start: Generate Instructions from Programming Books

You can use AI assistants to help create custom instructions based on programming books or documentation:

1. **Upload a programming book PDF** (e.g., "Eloquent JavaScript", "Clean Code", "Design Patterns") to:
   - Gemini AI (supports PDF upload)
   - Claude AI (supports PDF upload)
   - ChatGPT (supports PDF upload with Plus/Pro subscription)

2. **Use this prompt**:

   ```text
   Study this programming book PDF carefully and create a GitHub Copilot custom instruction file based on the principles, patterns, and best practices from the book. 
   
   The instruction should:
   - Follow the .instructions.md format with YAML frontmatter
   - Include key principles from the book
   - Provide specific coding guidelines
   - Be practical and actionable for daily development
   ```

3. **Review and customize** the generated instruction file to match your team's needs

4. **Save** the file to `.github/instructions/` with a descriptive name (e.g., `eloquent-js-codestyle.instructions.md`)

> [!TIP]
> This method is especially useful for creating language-specific or framework-specific instructions based on authoritative sources.

### 2. Add Task Automation (Prompt Files)

Prompt files let you define reusable prompts for common and repeatable development tasks. They're standalone prompts you can run directly in chat.

**File location**: `.github/prompts/`

**Format**:

```markdown
---
agent: "agent"
description: "Create technical specifications"
---

## Role
You are a technical architect...

## Task
1. Analyze the feature requirements
2. Create a detailed technical specification
```

**Use prompt files to**:

- Create reusable prompts for common coding tasks (scaffolding components, generating tests)
- Define prompts for code reviews
- Create step-by-step guides for complex processes
- Generate implementation plans or architectural designs

### 3. Create Specialized Workflows (Custom Agents)

Custom agents are specialist assistants for specific roles or tasks. Within a custom agent file, you describe its scope, capabilities, which tools it can access, and preferred language model.

**File location**: `.github/agents/`

**Format**:

```markdown
---
description: "Frontend Developer Specialist"
tools: ["edit", "search", "runCommands"]
---

# Frontend Developer Agent

You are a frontend development specialist focusing on React and TypeScript...
```

**Use custom agents to**:

- Create a planning agent with read-only access for implementation plans
- Define a research agent that can reach external resources
- Create specialized agents for specific domains (frontend, backend, database, etc.)

### 4. Extend Capabilities (MCP and Tools)

Connect external services and specialized tools through Model Context Protocol (MCP) to extend chat capabilities beyond code.

**Use MCP and tools to**:

- Connect database tools to query and analyze data
- Integrate with external APIs for real-time information

### 5. Choose the Right Model (Language Models)

Switch between different AI models optimized for specific tasks using the model picker in chat.

**Use different models for**:

- Fast models for quick code suggestions and simple refactoring
- Capable models for complex architectural decisions or detailed reviews
- Specialized models for vision processing or other specific tasks

## 🤝 Contributing

Contributions are welcome! Whether it's:

- Adding new agents for specific development scenarios
- Improving existing instructions
- Creating new prompt templates
- Fixing bugs or improving documentation

Please feel free to submit a Pull Request.

## 📚 Resources

- [GitHub Copilot Customization Overview](https://code.visualstudio.com/docs/copilot/customization/overview) - Official VS Code documentation for customizing GitHub Copilot
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code GitHub Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [Awesome Copilot](https://github.com/github/awesome-copilot) - A curated list of GitHub Copilot resources, extensions, and examples

## ⭐ Support

If you find this repository helpful, please consider giving it a star! It helps others discover these resources.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## **Made with ❤️ for Indonesian Developers**
