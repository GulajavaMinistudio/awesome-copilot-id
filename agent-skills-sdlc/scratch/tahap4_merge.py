import re
import os

rule_path = r"d:\WebstormProject\awesome-copilot-id\.agents\rules\PlannerArchitect.md"
skill_path_old = r"d:\WebstormProject\awesome-copilot-id\.agents\skills\planner-architect\SKILL.md"
skill_path_new = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills\plan\SKILL.md"
name_prefix = "Planner Architect"
slash = "/plan"

def robust_cleanup(text):
    mapping = {
        "ProductManagerPRD": "/prd",
        "ClarificationAnalyst": "/clarify",
        "SpecificationArchitect": "/spec",
        "PlannerArchitect": "/plan",
        "GodModeDev": "/implement",
        "ExpertCodeReviewer": "/review",
        "BugRemediationArchitect": "/bug-report",
        "DiataxisDocumentationArchitect": "/docs",
        "ArtifactConsistencyChecker": "/consistency-check"
    }
    for old, new in mapping.items():
        pattern = r'`?@' + old + r'`?(?:\s*\(or\s*`?/[a-zA-Z0-9_-]+`?\))?'
        text = re.sub(pattern, f'`{new}`', text)
        
        old_skill_names = {
            "ProductManagerPRD": "product-manager-prd",
            "ClarificationAnalyst": "clarification-analyst",
            "SpecificationArchitect": "specification-architect",
            "PlannerArchitect": "planner-architect",
            "GodModeDev": "god-mode-dev",
            "ExpertCodeReviewer": "expert-code-reviewer",
            "BugRemediationArchitect": "bug-remediation-architect",
            "DiataxisDocumentationArchitect": "diataxis-documentation-architect",
            "ArtifactConsistencyChecker": "artifact-consistency-checker"
        }
        text = text.replace(f"the `{old_skill_names[old]}` skill", "this skill")

    text = text.replace("``/", "`/")
    text = text.replace("/``", "/`")
    return text

with open(rule_path, 'r', encoding='utf-8') as f:
    rule_content = f.read()

with open(skill_path_old, 'r', encoding='utf-8') as f:
    old_skill = f.read()

os.makedirs(os.path.dirname(skill_path_new), exist_ok=True)

persona_match = re.search(r'(#[^\n]*' + name_prefix.split()[0] + r'.*?)(\n## |\Z)', rule_content, re.DOTALL)
if not persona_match:
    persona_match = re.search(r'(#[^\n]*' + r'.*?)(\n## |\Z)', rule_content, re.DOTALL)
    
persona = persona_match.group(1).strip() if persona_match else ""
persona = re.sub(r'^#[^\n]*', f"## 🧠 The {name_prefix} Persona", persona)

core_match = re.search(r'(## Core Directives.*?)(\n## |\Z)', rule_content, re.DOTALL)
core = core_match.group(1).strip() if core_match else ""
core = core.replace("## Core Directives", "## ⚙️ Core Directives")

docs_match = re.search(r'(## Documentation Standards.*?)(\n## |\Z)', rule_content, re.DOTALL)
docs = docs_match.group(1).strip() if docs_match else ""

yaml_frontmatter_match = re.search(r'^---.*?---\n', old_skill, re.DOTALL)
yaml_frontmatter = yaml_frontmatter_match.group(0) if yaml_frontmatter_match else ""
new_skill_name = slash.replace("/", "")
yaml_frontmatter = re.sub(r'^name:.*$', f"name: {new_skill_name}", yaml_frontmatter, flags=re.MULTILINE)

dynamic_persona_match = re.search(r'(## 🎭 Dynamic Persona Activation \[CRITICAL SYSTEM OVERRIDE\].*?)(?=\n## Overview|\n## When to Use|\Z)', old_skill, re.DOTALL)
dynamic_persona = dynamic_persona_match.group(1).strip() if dynamic_persona_match else ""

overview_match = re.search(r'(## Overview.*?)(\n## When to Use|\n## ⚙️ Operational Workflow|\Z)', old_skill, re.DOTALL)
overview = overview_match.group(1).strip() if overview_match else ""

when_match = re.search(r'(## When to Use.*?)(\n---|\n## ⚙️ Operational Workflow|\Z)', old_skill, re.DOTALL)
when_to_use = when_match.group(1).strip() if when_match else ""

workflow_match = re.search(r'(## ⚙️ Operational Workflow.*?)(?=\n## Documentation Standards|\Z)', old_skill, re.DOTALL)
workflow = workflow_match.group(1).strip() if workflow_match else ""

persona = robust_cleanup(persona)
core = robust_cleanup(core)
overview = robust_cleanup(overview)
when_to_use = robust_cleanup(when_to_use)
workflow = robust_cleanup(workflow)
dynamic_persona = robust_cleanup(dynamic_persona)
docs = docs.replace("must be resolved by checking the workspace configuration folders in the following order of priority: (1) `.agents/standards/`, (2) `.github/standards/`, (3) `.omp/standards/`, (4) `.pi/standards/`, (5) `.codex/standards/`, (6) `.commandcode/standards/`, (7) `.opencode/standards/`. Use the first folder in this list that exists in the project root.", "is located at `.agents/standards/`.")

new_content = yaml_frontmatter
new_content += "\n<!-- markdownlint-disable -->\n\n"
new_content += f"# {name_prefix} Skill (`{slash}`)\n\n"
if dynamic_persona:
    new_content += dynamic_persona + "\n\n"
new_content += persona + "\n\n"
new_content += "---\n\n"
if core:
    new_content += core + "\n\n"
    new_content += "---\n\n"
if overview:
    new_content += overview + "\n\n"
if when_to_use:
    new_content += when_to_use + "\n\n"
    new_content += "---\n\n"
if workflow:
    new_content += workflow + "\n\n"
if docs:
    new_content += "---\n\n"
    new_content += docs + "\n"

with open(skill_path_new, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Merged {slash}")
