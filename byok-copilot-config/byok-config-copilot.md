# BYOK (Bring Your Own Key) for GitHub Copilot in VS Code
<!-- markdownlint-disable -->
This documentation explains how to configure **BYOK (Bring Your Own Key)** in Visual Studio Code so you can use your **own API key** from various language model providers (Azure, Anthropic, Gemini, OpenAI, OpenRouter, DeepSeek, Ollama, and others) with the GitHub Copilot chat feature. This approach is particularly useful for developers who want to:

- Access models from providers other than the built-in Copilot ones.
- Run models locally (offline) without an internet connection.
- Use models that are not yet available as built-in options in VS Code.
- Continue leveraging the full VS Code Copilot chat experience and tools with their own model of choice.

> **Important Note**
> BYOK models only apply to **chat** and **utility tasks** (such as title generation, commit messages, and intent detection). Features that **still require a GitHub account** are: **semantic search**, **inline suggestions** (code completions), and features that rely on embeddings. For **Copilot Business/Enterprise** users, the organization administrator must enable the **Bring Your Own Language Model Key in VS Code** policy in [Copilot policy settings](https://github.com/settings/copilot/features) on GitHub.com first.

---

## Table of Contents

- [BYOK (Bring Your Own Key) for GitHub Copilot in VS Code](#byok-bring-your-own-key-for-github-copilot-in-vs-code)
  - [Table of Contents](#table-of-contents)
  - [What Is BYOK](#what-is-byok)
  - [Model Provider Options](#model-provider-options)
  - [Adding Models from Built-in Providers](#adding-models-from-built-in-providers)
  - [Adding Models from Extensions](#adding-models-from-extensions)
  - [Adding Models via Custom Endpoint](#adding-models-via-custom-endpoint)
  - [Configuring the `chatLanguageModels.json` File](#configuring-the-chatlanguagemodelsjson-file)
    - [Provider-Level Properties](#provider-level-properties)
  - [Real-World Configuration Example](#real-world-configuration-example)
    - [Explanation of the Example Structure Above](#explanation-of-the-example-structure-above)
  - [Model Property Reference](#model-property-reference)
  - [Updating Provider Details](#updating-provider-details)
  - [Configuring Models for Other Features](#configuring-models-for-other-features)
    - [Configuring the Model for Inline Chat](#configuring-the-model-for-inline-chat)
    - [Configuring the Model for Inline Suggestions (Code Completions)](#configuring-the-model-for-inline-suggestions-code-completions)
    - [Configuring the Model for Utility Tasks](#configuring-the-model-for-utility-tasks)
  - [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
    - [How do I enable BYOK for Copilot Business or Enterprise?](#how-do-i-enable-byok-for-copilot-business-or-enterprise)
    - [Can I use local (self-hosted) models with Copilot in VS Code?](#can-i-use-local-self-hosted-models-with-copilot-in-vs-code)
    - [Can I use local models without an internet connection?](#can-i-use-local-models-without-an-internet-connection)
    - [Can I use local models without a Copilot plan?](#can-i-use-local-models-without-a-copilot-plan)
  - [Related References](#related-references)

---

## What Is BYOK

**BYOK (Bring Your Own Key)** is a VS Code feature that allows you to connect language models from any compatible provider, **without signing in to a GitHub account** and **without a Copilot subscription**. You can use BYOK to:

1. **Access models from other providers** (e.g., Azure OpenAI, Anthropic, Gemini, or OpenAI-compatible endpoints).
2. **Run models locally** (e.g., Ollama) for offline scenarios.
3. **Use specific models** that are not yet available as built-in options in VS Code.

BYOK models can be used to **replace the default models** for the following features:

- Main chat (conversations in the Chat panel).
- Inline chat (chat within the editor).
- Utility tasks (title generation, commit messages, rename suggestions, and more).

---

## Model Provider Options

VS Code provides **three options** for adding new language models:

| Option                 | Best For                                                                                                       | Example Providers                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Built-in providers** | Providers already natively supported by VS Code                                                                | Azure, Anthropic, Gemini, OpenAI                 |
| **Extensions**         | Providers available as Marketplace extensions                                                                  | AI Toolkit, Foundry Toolkit, Ollama              |
| **Custom endpoint**    | Self-hosted, enterprise, or third-party endpoints compatible with Chat Completions, Responses, or Messages API | OpenRouter, DeepSeek, Kilo Gateway, Opencode Zen |

---

## Adding Models from Built-in Providers

VS Code provides a ready-to-use list of built-in providers. To add a model from one of these providers:

1. Open the **Language Models editor** by selecting the **gear icon (Manage Language Models)** from the model picker in the Chat panel, or run the `Chat: Manage Language Models` command from the Command Palette.
2. Select **Add Models**, then choose a model provider from the list that appears.
3. Enter a **group name** for organizing models. This name will appear in the model picker and Language Models editor. You can change it later from the Language Models editor at any time.
4. Enter the provider-specific details, such as the **API key** or **endpoint URL**.
5. If the provider requires additional configuration, VS Code will open the `chatLanguageModels.json` file for you to fill in the model and provider details. Configuration properties can be found in the [Model Property Reference](#model-property-reference) section.

Example configuration for **Azure OpenAI** with Entra ID authentication:

```json
[
  {
    "name": "Azure",
    "vendor": "azure",
    "models": [
      {
        "id": "<my-deployment-name>",
        "name": "GPT-5.5",
        "url": "https://<my-endpoint>.openai.azure.com",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 200000,
        "maxOutputTokens": 64000
      }
    ]
  }
]
```

6. Once the configuration is saved, the model will appear in the model picker in the Chat panel.

> **Important**
> For a model to be usable by an **agent** (mode with tool calling), the model **must** support `toolCalling: true`. If the model does not support tool calling, it **will not appear** in the model picker when using agent mode.

---

## Adding Models from Extensions

The VS Code Marketplace offers extensions that add language model providers, both cloud-hosted and locally running ones. A popular example is **Foundry Toolkit for VS Code**, which provides access to both local and cloud Foundry models.

To add a model from an extension:

1. Open the **Language Models editor** via the gear icon in the model picker, or run `Chat: Manage Language Models` from the Command Palette.
2. Select **Install Model Providers**. VS Code will open the **Extensions** view filtered to language model provider extensions. You can also open the Extensions view and search with the `@tag:language-models` tag.
3. Select **Install** to install the desired extension (e.g., Foundry Toolkit for VS Code).
4. Follow the setup instructions provided by the extension to configure model access.
5. The extension's models will appear in the model picker and Language Models editor. If the models do not appear immediately, **reload VS Code**.

---

## Adding Models via Custom Endpoint

**Custom Endpoint** replaces the deprecated **OpenAI Compatible** provider and supports more API types. You can connect any compatible endpoint that supports:

- **Chat Completions** API
- **Responses** API
- **Messages** API

To add a model with Custom Endpoint:

1. Open the **Language Models editor** from the model picker or Command Palette.
2. Select **Add Models**, then choose **Custom Endpoint** from the list.
3. Enter a **group name** for your models.
4. Enter a **display name** and **API key** for the endpoint.
5. Select the **API type** supported: `chat-completions`, `responses`, or `messages`. Make sure the model on the server side actually supports the API type you choose.
6. VS Code will open the `chatLanguageModels.json` file. Fill in the model details (id, url, capabilities, etc.) and save the file. Details for each property are available in the [Model Property Reference](#model-property-reference).

Example **Messages API** configuration for an **Anthropic** endpoint:

```json
[
  {
    "name": "Anthropic",
    "vendor": "customendpoint",
    "apiKey": "YOUR_API_KEY",
    "apiType": "messages",
    "models": [
      {
        "id": "claude-sonnet-4-6",
        "name": "Claude Sonnet 4.6",
        "url": "https://api.anthropic.com/v1/messages",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 200000,
        "maxOutputTokens": 64000
      }
    ]
  }
]
```

7. Once saved, the model can be selected from the model picker in Chat.

> **Tip**
> If the newly added model does not immediately appear in the model picker, **restart VS Code** to reload the configuration.

---

## Configuring the `chatLanguageModels.json` File

The `chatLanguageModels.json` file is the primary place for managing BYOK configuration. VS Code will automatically open this file when you add a new model, but you can also manually edit it at any time.

Configuration file location:

- **Windows**: `%APPDATA%\Code\User\chatLanguageModels.json`
- **macOS**: `~/Library/Application Support/Code/User/chatLanguageModels.json`
- **Linux**: `~/.config/Code/User/chatLanguageModels.json`

Its structure is a **JSON array** with two configuration levels:

1. **Provider-level** — information about the provider (name, vendor, API key, model list).
2. **Model-level** — details for each model (id, url, capabilities, context window, etc.).

### Provider-Level Properties

| Property | Type     | Required | Description                                                                |
| -------- | -------- | -------- | -------------------------------------------------------------------------- |
| `vendor` | `string` | Yes      | The model provider, e.g., `azure`, `openai`, `anthropic`, `customendpoint` |
| `name`   | `string` | Yes      | The display name (group name) shown in the UI                              |
| `models` | `array`  | No       | Array of model configurations provided by this provider                    |

---

## Real-World Configuration Example

Below is an example of a `chatLanguageModels.json` file commonly used by developers. This configuration combines **multiple providers** (built-in Copilot, OpenRouter, DeepSeek, Opencode Zen, and Opencode Go) with both free and paid models.

> **Security Note**
> In the example below, all API key placeholders use the `${input:chat.lm.secret.XXXX}` format. This pattern is a **VS Code Secret Input** that references secrets stored in VS Code's Secret Storage, **not** literal keys in the file. Never write API keys in plaintext in this file, especially if it will be committed to a public repository.

```json
[
  {
    "name": "OpenRouter",
    "vendor": "openrouter",
    "apiKey": "${input:chat.lm.secret.XXXX}"
  },
  {
    "name": "Copilot",
    "vendor": "copilot",
    "settings": {
      "gpt-5.4": {
        "reasoningEffort": "xhigh"
      },
      "gpt-5.3-codex": {
        "reasoningEffort": "xhigh"
      },
      "gpt-5-mini": {
        "reasoningEffort": "high"
      },
      "gpt-5.2-codex": {
        "reasoningEffort": "high"
      },
      "gpt-5.2": {
        "reasoningEffort": "high"
      },
      "gpt-5.4-mini": {
        "reasoningEffort": "xhigh"
      },
      "gemini-3.5-flash": {
        "reasoningEffort": "high"
      }
    }
  },
  {
    "name": "Copilot CLI",
    "vendor": "copilot",
    "settings": {
      "claude-sonnet-4.6": {
        "reasoningEffort": "high"
      },
      "gpt-5.4": {
        "reasoningEffort": "high"
      }
    }
  },
  {
    "name": "Deepseek Platform",
    "vendor": "customendpoint",
    "apiKey": "${input:chat.lm.secret.XXXX}",
    "apiType": "chat-completions",
    "models": [
      {
        "id": "deepseek-v4-flash",
        "name": "Deepseek v4 Flash",
        "url": "https://api.deepseek.com",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 384000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "deepseek-v4-pro",
        "name": "Deepseek v4 Pro",
        "url": "https://api.deepseek.com",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 384000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      }
    ],
    "settings": {
      "deepseek-v4-flash": {
        "reasoningEffort": "high"
      },
      "deepseek-v4-pro": {
        "reasoningEffort": "max"
      }
    }
  },
  {
    "name": "Kilo Gateway",
    "vendor": "customendpoint",
    "apiKey": "${input:chat.lm.secret.XXXX}",
    "apiType": "chat-completions",
    "models": [
      {
        "id": "kilo-auto/free",
        "name": "Kilo Auto Free",
        "url": "https://api.kilo.ai/api/gateway",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 128000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      }
    ]
  },
  {
    "name": "Opencode Zen",
    "vendor": "customendpoint",
    "apiKey": "${input:chat.lm.secret.XXXX}",
    "apiType": "chat-completions",
    "models": [
      {
        "id": "deepseek-v4-flash-free",
        "name": "DeepSeek V4 Flash Free",
        "url": "https://opencode.ai/zen/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 128000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "mimo-v2.5-free",
        "name": "MiMo-V2.5 Free",
        "url": "https://opencode.ai/zen/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 128000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "big-pickle",
        "name": "Big Pickle Free",
        "url": "https://opencode.ai/zen/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 128000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "nemotron-3-ultra-free",
        "name": "Nemotron 3 Ultra Free",
        "url": "https://opencode.ai/zen/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 128000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      }
    ],
    "settings": {
      "deepseek-v4-flash-free": {
        "reasoningEffort": "max"
      },
      "mimo-v2.5-free": {
        "reasoningEffort": "max"
      }
    }
  },
  {
    "name": "OpenRouter-AutoFree",
    "vendor": "customendpoint",
    "apiKey": "${input:chat.lm.secret.XXXX}",
    "apiType": "chat-completions",
    "models": [
      {
        "id": "openrouter/free",
        "name": "OpenRouter-Free",
        "url": "https://openrouter.ai/api/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 128000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["high", "max"]
      }
    ]
  },
  {
    "name": "Opencode Go",
    "vendor": "customendpoint",
    "apiKey": "${input:chat.lm.secret.XXXX}",
    "apiType": "chat-completions",
    "models": [
      {
        "id": "glm-5.2",
        "name": "GLM-5.2",
        "url": "https://opencode.ai/zen/go/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 256000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "kimi-k2.7-code",
        "name": "Kimi K2.7 Code",
        "url": "https://opencode.ai/zen/go/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 256000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "kimi-k2.6",
        "name": "Kimi K2.6",
        "url": "https://opencode.ai/zen/go/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 256000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "deepseek-v4-pro",
        "name": "DeepSeek V4 Pro",
        "url": "https://opencode.ai/zen/go/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 384000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "deepseek-v4-flash",
        "name": "DeepSeek V4 Flash",
        "url": "https://opencode.ai/zen/go/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 384000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "mimo-v2.5",
        "name": "MiMo-V2.5",
        "url": "https://opencode.ai/zen/go/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 256000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "mimo-v2.5-pro",
        "name": "MiMo-V2.5-Pro",
        "url": "https://opencode.ai/zen/go/v1",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 256000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "minimax-m3",
        "name": "MiniMax M3",
        "url": "https://opencode.ai/zen/go/v1",
        "apiType": "messages",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 256000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "minimax-m2.7",
        "name": "MiniMax M2.7",
        "url": "https://opencode.ai/zen/go/v1",
        "apiType": "messages",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 256000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "qwen3.7-max",
        "name": "Qwen3.7 Max",
        "url": "https://opencode.ai/zen/go/v1",
        "apiType": "messages",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 256000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      },
      {
        "id": "qwen3.7-plus",
        "name": "Qwen3.7 Plus",
        "url": "https://opencode.ai/zen/go/v1",
        "apiType": "messages",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 256000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high", "max"]
      }
    ],
    "settings": {
      "minimax-m3": {
        "reasoningEffort": "max"
      }
    }
  }
]
```

### Explanation of the Example Structure Above

- **OpenRouter** (`vendor: openrouter`) — uses a built-in vendor, so models are automatically available without needing to explicitly declare them in the `models` array.
- **Copilot** & **Copilot CLI** (`vendor: copilot`) — uses built-in Copilot models, only requires setting `reasoningEffort` per model in the `settings` block.
- **Deepseek Platform, Kilo Gateway, Opencode Zen, OpenRouter-AutoFree, Opencode Go** (`vendor: customendpoint`) — custom endpoints compatible with the Chat Completions API, with explicitly declared models.
- Some models in **Opencode Go** (`minimax-m3`, `minimax-m2.7`, `qwen3.7-max`, `qwen3.7-plus`) use `apiType: messages` at the model level to override the provider's `apiType`, since those endpoints use the Messages API.
- The `settings` block is **optional** and is only used to set the default `reasoningEffort` per model on a specific provider.
- All secret API keys use the `${input:chat.lm.secret.XXXX}` pattern which references VS Code's **Secret Storage**. When VS Code first loads the configuration, it will prompt you to enter the API key for each placeholder.

---

## Model Property Reference

Each model in the `models` array supports the following properties:

| Property                   | Type      | Required | Description                                                                                                                                                                                                  |
| -------------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                       | `string`  | Yes      | Model identifier sent to the API (e.g., deployment name for Foundry)                                                                                                                                         |
| `name`                     | `string`  | Yes      | Display name shown in the model picker                                                                                                                                                                       |
| `url`                      | `string`  | Yes      | Full endpoint URL for the model                                                                                                                                                                              |
| `apiType`                  | `string`  | No       | Override the API type per model: `chat-completions`, `responses`, or `messages`. Defaults to the provider-level `apiType`                                                                                    |
| `toolCalling`              | `boolean` | Yes      | Set `true` if the model supports tool calling (required for agent mode)                                                                                                                                      |
| `vision`                   | `boolean` | Yes      | Set `true` if the model supports image inputs                                                                                                                                                                |
| `maxInputTokens`           | `number`  | Yes      | Maximum number of input tokens. Used together with `maxOutputTokens` to determine the context window                                                                                                         |
| `maxOutputTokens`          | `number`  | Yes      | Maximum number of output tokens. Used together with `maxInputTokens` to determine the context window                                                                                                         |
| `editTools`                | `array`   | No       | List of edit tools the model supports. Valid values: `find-replace`, `multi-find-replace`, `apply-patch`, `code-rewrite`. If not set, the editor tries multiple edit tools and picks the best one            |
| `thinking`                 | `boolean` | No       | Set `true` if the model supports thinking capabilities. Default `false`                                                                                                                                      |
| `streaming`                | `boolean` | No       | Set `true` if the model supports streaming responses. Default `true`                                                                                                                                         |
| `zeroDataRetentionEnabled` | `boolean` | No       | Set `true` if Zero Data Retention (ZDR) is enabled for this endpoint. When enabled, `previous_response_id` is not sent in Responses API requests. Default `false`                                            |
| `supportsReasoningEffort`  | `array`   | No       | List of reasoning effort levels the model supports, e.g., `["low", "medium", "high"]`. When set, a **Thinking Effort** picker appears in the model picker. Common levels: `minimal`, `low`, `medium`, `high` |
| `reasoningEffortFormat`    | `string`  | No       | Body shape used to forward reasoning effort. `chat-completions` sends a top-level `reasoning_effort` string. `responses` sends a nested `reasoning.effort` object. When unset, the format follows the URL    |
| `requestHeaders`           | `object`  | No       | Object of additional HTTP headers to include with requests to this model. Reserved headers (forbidden, forwarding, internal) are ignored if present                                                          |

> **Note**
> The sum of `maxInputTokens` + `maxOutputTokens` **must not exceed** the model's context window. VS Code uses the total of both as the model's context window (for displaying usage in the Chat view). Typically, `maxInputTokens` is set to `contextWindow - maxOutputTokens`. Always check your model provider's documentation for the valid context window.

---

## Updating Provider Details

To update the configuration of an existing provider (e.g., changing the API key or endpoint URL):

1. Select **Manage Language Models** (gear icon) from the model picker in the Chat panel, or run `Chat: Manage Language Models` from the Command Palette.
2. In the Language Models editor, select the **gear** icon next to the provider you want to update.
3. Modify the provider details as needed, such as the API key or endpoint URL.

---

## Configuring Models for Other Features

In addition to the main chat model, VS Code also uses lightweight models in the background for the following features. You can configure which model is used for each:

### Configuring the Model for Inline Chat

Use the `inlineChat.defaultModel` setting to specify the default model used for inline chat in the editor. If you change the model mid-session during an inline chat, the selection persists for the remainder of that session. After reloading VS Code, the model reverts to the value specified in `inlineChat.defaultModel`.

### Configuring the Model for Inline Suggestions (Code Completions)

To change the model used for generating inline suggestions in the editor:

1. Select **Configure Inline Suggestions...** from the Chat menu in the VS Code title bar.
2. Select **Change Completions Model...**, then choose one of the models from the list.

> **Note**
> The list of available models may vary and change over time. If no alternative models are available, the option to change the model will not be displayed.

### Configuring the Model for Utility Tasks

VS Code uses lightweight models for utility tasks such as title generation, commit messages, and intent detection. By default, these tasks use the **built-in utility model** from GitHub Copilot. You can override which model is used with any available model, including BYOK and extension-provided models.

There are **two settings** for utility models:

- `chat.utilityModel` — Override the model for general utility flows, such as title generation, summaries, settings search, and Git review.
- `chat.utilitySmallModel` — Override the model for fast, lightweight utility flows, such as commit messages, rename suggestions, branch name generation, prompt categorization, and intent detection. A fast and inexpensive model is recommended.

Both settings default to `Default`, which uses the built-in utility model from GitHub Copilot.

> **Important for BYOK Offline Users**
> If you use BYOK models **without signing into a GitHub account**, the built-in utility models **are not available**. VS Code will show a notification in the Chat view prompting you to configure utility models. Set `chat.utilityModel` and `chat.utilitySmallModel` to a BYOK model to enable utility features like title generation and commit messages.

---

## Frequently Asked Questions (FAQ)

### How do I enable BYOK for Copilot Business or Enterprise?

If you are a Copilot Business or Enterprise user, the organization administrator must enable the **Bring Your Own Language Model Key in VS Code** policy in [Copilot policy settings](https://github.com/settings/copilot/features) on GitHub.com. Once the policy is enabled, you can add models with your own API key just like an Individual plan user.

### Can I use local (self-hosted) models with Copilot in VS Code?

Yes, you can use local models with BYOK through several approaches:

- **Built-in providers** that support local models.
- **Extensions** from the Visual Studio Marketplace, e.g., AI Toolkit for VS Code with Foundry Local.
- **Custom endpoints** pointing to your local server.

Local models work **without a GitHub account**, **without a Copilot plan**, and **without an internet connection**. To fully enable utility features (title generation, commit messages, etc.), configure `chat.utilityModel` and `chat.utilitySmallModel` to a local model.

> **Note**
> Currently, local models are **not supported** for inline suggestions (code completions). VS Code provides the `InlineCompletionItemProvider` API for extensions to contribute a custom completion provider.

### Can I use local models without an internet connection?

Yes, you can use local models **completely offline**. Add a local model (e.g., Ollama) via `Chat: Manage Language Models`, select the model in chat, and start using it. To enable utility features like title generation and commit messages, set `chat.utilityModel` and `chat.utilitySmallModel` to a local model. Features that depend on the GitHub Copilot service — such as semantic search, inline suggestions, and embeddings — **are not available** offline.

### Can I use local models without a Copilot plan?

Yes, BYOK models (including local models) can be used **without a Copilot plan** and **without signing into a GitHub account**. Add a model with `Chat: Manage Language Models`, then select the model in chat. Features that depend on the GitHub Copilot service (semantic search, inline suggestions, embeddings) still require a Copilot plan.

---

## Related References

- [Language models concepts](https://code.visualstudio.com/docs/agents/concepts/language-models) — Fundamental concepts of language models in VS Code
- [Available language models in GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode) — List of built-in Copilot models
- [Choosing the right AI model for your task](https://docs.github.com/en/copilot/using-github-copilot/ai-models/choosing-the-right-ai-model-for-your-task) — Guide to choosing the right model
- [Security considerations for AI in VS Code](https://code.visualstudio.com/docs/agents/security) — Security considerations for AI in VS Code
- [Official VS Code BYOK documentation](https://code.visualstudio.com/docs/agent-customization/language-models)
- [VS Code Secret Input (`${input:...}`) reference](https://code.visualstudio.com/docs/agent-customization/secret-storage) — Secure API key storage patterns in VS Code
