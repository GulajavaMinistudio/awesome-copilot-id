import re
import os

rule_path = r"d:\WebstormProject\awesome-copilot-id\.agents\rules\SpecificationArchitect.md"
skill_path_old = r"d:\WebstormProject\awesome-copilot-id\.agents\skills\specification-architect\SKILL.md"
skill_path_new = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills\spec\SKILL.md"

with open(rule_path, 'r', encoding='utf-8') as f:
    rule_content = f.read()

with open(skill_path_old, 'r', encoding='utf-8') as f:
    old_skill = f.read()

# Extract from Rule (Source A)
persona_match = re.search(r'(# Phase 3: The Specification Architect.*?)(\n## |\Z)', rule_content, re.DOTALL)
persona = persona_match.group(1).strip() if persona_match else ""
persona = persona.replace("# Phase 3: The Specification Architect", "## 🧠 The Specification Architect Persona")

core_match = re.search(r'(## Core Directives.*?)(\n## |\Z)', rule_content, re.DOTALL)
core = core_match.group(1).strip() if core_match else ""
core = core.replace("## Core Directives", "## ⚙️ Core Directives")

docs_match = re.search(r'(## Documentation Standards.*?)(\n## |\Z)', rule_content, re.DOTALL)
docs = docs_match.group(1).strip() if docs_match else ""

# Extract from Old Skill (Source B)
yaml_frontmatter_match = re.search(r'^---.*?---\n', old_skill, re.DOTALL)
yaml_frontmatter = yaml_frontmatter_match.group(0) if yaml_frontmatter_match else ""
new_skill_name = "spec"
yaml_frontmatter = re.sub(r'^name:.*$', f"name: {new_skill_name}", yaml_frontmatter, flags=re.MULTILINE)

dynamic_persona_match = re.search(r'(## 🎭 Dynamic Persona Activation \[CRITICAL SYSTEM OVERRIDE\].*?)(?=\n## Overview|\Z)', old_skill, re.DOTALL)
dynamic_persona = dynamic_persona_match.group(1).strip() if dynamic_persona_match else ""

overview_match = re.search(r'(## Overview.*?)(\n## When to Use|\Z)', old_skill, re.DOTALL)
overview = overview_match.group(1).strip() if overview_match else ""

when_match = re.search(r'(## When to Use.*?)(\n---|\n## ⚙️ Operational Workflow|\Z)', old_skill, re.DOTALL)
when_to_use = when_match.group(1).strip() if when_match else ""

workflow_match = re.search(r'(## ⚙️ Operational Workflow.*?)(\n---|\n## Mandatory Specification Template|\Z)', old_skill, re.DOTALL)
workflow = workflow_match.group(1).strip() if workflow_match else ""

template_match = re.search(r'(## Mandatory Specification Template.*)', old_skill, re.DOTALL)
template = template_match.group(1).strip() if template_match else ""


# Cleanups
def cleanup_legacy(text):
    text = text.replace("@ClarificationAnalyst (or /clarification-analyst)", "/clarify")
    text = text.replace("@PlannerArchitect (or /planner-architect)", "/plan")
    text = text.replace("@ClarificationAnalyst", "/clarify")
    text = text.replace("@PlannerArchitect", "/plan")
    text = text.replace("@SpecificationArchitect", "/spec")
    text = text.replace("the `specification-architect` skill", "this skill")
    return text

persona = cleanup_legacy(persona)
core = cleanup_legacy(core)
overview = cleanup_legacy(overview)
when_to_use = cleanup_legacy(when_to_use)
workflow = cleanup_legacy(workflow)
template = cleanup_legacy(template)
dynamic_persona = cleanup_legacy(dynamic_persona)

docs = docs.replace("must be resolved by checking the workspace configuration folders in the following order of priority: (1) `.agents/standards/`, (2) `.github/standards/`, (3) `.omp/standards/`, (4) `.pi/standards/`, (5) `.codex/standards/`, (6) `.commandcode/standards/`, (7) `.opencode/standards/`. Use the first folder in this list that exists in the project root.", "is located at `.agents/standards/`.")

# Assemble the new file
new_content = yaml_frontmatter
new_content += "\n<!-- markdownlint-disable -->\n\n"
new_content += "# Specification Architect Skill (`/spec`)\n\n"
new_content += dynamic_persona + "\n\n"
new_content += persona + "\n\n"
new_content += "---\n\n"
new_content += core + "\n\n"
new_content += "---\n\n"
new_content += overview + "\n\n"
new_content += when_to_use + "\n\n"
new_content += "---\n\n"
new_content += workflow + "\n\n"
new_content += "---\n\n"
new_content += template + "\n\n"
new_content += "---\n\n"
new_content += docs + "\n"

with open(skill_path_new, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Tahap 3 Merge complete")
