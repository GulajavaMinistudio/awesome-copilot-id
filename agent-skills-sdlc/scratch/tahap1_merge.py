import re

rule_path = r"d:\WebstormProject\awesome-copilot-id\.agents\rules\BrainstormingExplorerAnalyst.md"
skill_path_old = r"d:\WebstormProject\awesome-copilot-id\.agents\skills\brainstorming-explorer\SKILL.md"
skill_path_new = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills\brainstorming\SKILL.md"

with open(rule_path, 'r', encoding='utf-8') as f:
    rule_content = f.read()

with open(skill_path_old, 'r', encoding='utf-8') as f:
    old_skill = f.read()

# Extract from Rule (Source A)
persona_match = re.search(r'(## 🧠 The Senior Staff Engineer Persona.*?)(\n## |\Z)', rule_content, re.DOTALL)
persona = persona_match.group(1).strip() if persona_match else ""

core_match = re.search(r'(## ⚙️ Core Directives.*?)(\n## |\Z)', rule_content, re.DOTALL)
core = core_match.group(1).strip() if core_match else ""

anti_match = re.search(r'(## 🛑 Anti-Patterns \(What to Avoid\).*?)(\n## |\Z)', rule_content, re.DOTALL)
anti = anti_match.group(1).strip() if anti_match else ""

docs_match = re.search(r'(## Documentation Standards.*?)(\n## |\Z)', rule_content, re.DOTALL)
docs = docs_match.group(1).strip() if docs_match else ""

# Extract from Old Skill (Source B)
yaml_frontmatter = re.search(r'^---.*?---\n', old_skill, re.DOTALL).group(0)
new_skill_name = skill_path_new.split('\\')[-2]
yaml_frontmatter = re.sub(r'^name:.*$', f"name: {new_skill_name}", yaml_frontmatter, flags=re.MULTILINE)

dynamic_persona_match = re.search(r'(## 🎭 Dynamic Persona Activation \[CRITICAL SYSTEM OVERRIDE\].*?)(?=\n## Overview|\Z)', old_skill, re.DOTALL)
dynamic_persona = dynamic_persona_match.group(1).strip() if dynamic_persona_match else ""

overview_match = re.search(r'(## Overview.*?)(\n## When to Use|\Z)', old_skill, re.DOTALL)
overview = overview_match.group(1).strip() if overview_match else ""

when_match = re.search(r'(## When to Use.*?)(\n---|\n## ⚙️ Operational Workflow|\Z)', old_skill, re.DOTALL)
when_to_use = when_match.group(1).strip() if when_match else ""

workflow_match = re.search(r'(## ⚙️ Operational Workflow.*?)(\n---|\n## Mandatory Template|\Z)', old_skill, re.DOTALL)
workflow = workflow_match.group(1).strip() if workflow_match else ""

template_match = re.search(r'(## Mandatory Template: Project Discovery Draft.*?)(\n## Implementation Guidelines|\Z)', old_skill, re.DOTALL)
template = template_match.group(1).strip() if template_match else ""

guidelines_match = re.search(r'(## Implementation Guidelines.*)', old_skill, re.DOTALL)
guidelines = guidelines_match.group(1).strip() if guidelines_match else ""


# Cleanups
def cleanup_legacy(text):
    text = text.replace("@ProductManagerPRD (or /product-manager-prd)", "/prd")
    text = text.replace("@ProductManagerPRD", "/prd")
    text = text.replace("/product-manager-prd", "/prd")
    text = text.replace("@BrainstormingExplorerAnalyst", "/brainstorming")
    text = text.replace("the `brainstorming-explorer` skill", "this skill")
    return text

persona = cleanup_legacy(persona)
core = cleanup_legacy(core)
anti = cleanup_legacy(anti)
overview = cleanup_legacy(overview)
when_to_use = cleanup_legacy(when_to_use)
workflow = cleanup_legacy(workflow)
template = cleanup_legacy(template)
guidelines = cleanup_legacy(guidelines)
dynamic_persona = cleanup_legacy(dynamic_persona)

docs = docs.replace("must be resolved by checking the workspace configuration folders in the following order of priority: (1) `.agents/standards/`, (2) `.github/standards/`, (3) `.omp/standards/`, (4) `.pi/standards/`, (5) `.codex/standards/`, (6) `.commandcode/standards/`, (7) `.opencode/standards/`. Use the first folder in this list that exists in the project root.", "is located at `.agents/standards/`.")

# Assemble the new file
new_content = yaml_frontmatter
new_content += "\n<!-- markdownlint-disable -->\n\n"
new_content += "# Brainstorming Explorer Skill (`/brainstorming`)\n\n"
new_content += dynamic_persona + "\n\n"
new_content += persona + "\n\n"
new_content += "---\n\n"
new_content += core + "\n\n"
new_content += "---\n\n"
new_content += anti + "\n\n"
new_content += "---\n\n"
new_content += overview + "\n\n"
new_content += when_to_use + "\n\n"
new_content += "---\n\n"
new_content += workflow + "\n\n"
new_content += "---\n\n"
new_content += template + "\n\n"
new_content += guidelines + "\n\n"
new_content += "---\n\n"
new_content += docs + "\n"

with open(skill_path_new, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Tahap 1 Merge complete")
