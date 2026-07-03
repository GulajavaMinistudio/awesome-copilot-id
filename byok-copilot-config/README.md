# BYOK Copilot Config
<!-- markdownlint-disable -->
A collection of configuration and documentation for enabling **BYOK (Bring Your Own Key)** on GitHub Copilot in Visual Studio Code. This folder is intended for developers who want to use their **own API key** from various language model providers (OpenRouter, DeepSeek, Opencode Zen, Opencode Go, and others) while working with Copilot in VS Code.

---

## Table of Contents

- [BYOK Copilot Config](#byok-copilot-config)
  - [Table of Contents](#table-of-contents)
  - [About This Folder](#about-this-folder)
  - [Folder Contents](#folder-contents)
  - [How to Use](#how-to-use)
  - [Prerequisites](#prerequisites)
  - [Security Notes](#security-notes)
  - [Additional References](#additional-references)

---

## About This Folder

VS Code allows you to connect language models from any compatible provider through the **BYOK** mechanism. This folder provides reference materials so new users can easily:

- Understand BYOK concepts and its limitations.
- Add models from built-in providers, extensions, or custom endpoints.
- Copy a proven `chatLanguageModels.json` configuration example.
- Configure models for other features (inline chat, utility tasks, etc.).

---

## Folder Contents

| File                     | Description                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `byok-config-copilot.md` | Complete BYOK documentation for GitHub Copilot in VS Code, including model property references |
| `README.md`              | This file — the entry point and folder overview                                                |

---

## How to Use

1. **Read the main documentation** at [byok-config-copilot.md](byok-config-copilot.md) to understand concepts and configuration properties.
2. **Copy the example JSON** from the _Real-World Configuration Example_ section of that document into your `chatLanguageModels.json` file.
3. **Replace secret placeholders** `${input:chat.lm.secret.XXXX}` with your own VS Code secret input pattern. VS Code will automatically prompt for the API key when the configuration is first loaded.
4. **Select the model** you want to use via the model picker in the VS Code Chat panel.
5. **Configure utility models** (`chat.utilityModel` and `chat.utilitySmallModel`) if you are using BYOK without a GitHub account.

`chatLanguageModels.json` file location:

- **Windows**: `%APPDATA%\Code\User\chatLanguageModels.json`
- **macOS**: `~/Library/Application Support/Code/User/chatLanguageModels.json`
- **Linux**: `~/.config/Code/User/chatLanguageModels.json`

---

## Prerequisites

- **Visual Studio Code** version that supports BYOK configuration (check the official documentation for the minimum version).
- **API key** from the model provider you want to use (OpenRouter, DeepSeek, Opencode Zen, etc.).
- Optional: model provider extensions (e.g., AI Toolkit, Foundry Toolkit, Ollama) if you want to use local models or models from the extension marketplace.
- For **Copilot Business/Enterprise** users, the organization administrator must enable the **Bring Your Own Language Model Key in VS Code** policy in [Copilot policy settings](https://github.com/settings/copilot/features) on GitHub.com first.

---

## Security Notes

- **Never** write API keys in _plaintext_ inside `chatLanguageModels.json`, regardless of whether the file is stored in a public or private repository.
- Use the `${input:chat.lm.secret.XXXX}` pattern so that API keys are stored in VS Code's **Secret Storage** rather than in a file that could be committed.
- If you share the configuration to a public repository, ensure secret placeholders are **redacted** — only write the pattern, not the actual ID or value.
- Add `chatLanguageModels.json` to `.gitignore` if it contains your personal configuration.

---

## Additional References

- [Complete BYOK documentation in this folder](byok-config-copilot.md)
- [Official VS Code documentation — AI language models](https://code.visualstudio.com/docs/agent-customization/language-models)
- [Language models concepts](https://code.visualstudio.com/docs/agents/concepts/language-models)
- [Security considerations for AI in VS Code](https://code.visualstudio.com/docs/agents/security)
- [GitHub Copilot policy settings](https://github.com/settings/copilot/features)
