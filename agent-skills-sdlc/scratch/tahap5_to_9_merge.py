import os
import re
import shutil

# Base paths
rules_dir = r"d:\WebstormProject\awesome-copilot-id\.agents\rules"
skills_dir_old = r"d:\WebstormProject\awesome-copilot-id\.agents\skills"
skills_dir_new = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills"

# Definitions for Tahap 5 to 9
stages = [
    # Tahap 5: Clarification
    {
        "rule": "ClarificationAnalyst.md",
        "old_skill": "clarification-analyst",
        "new_skill": "clarify",
        "name_prefix": "Clarification Analyst"
    },
    # Tahap 6: Consistency Check
    {
        "rule": "ArtifactConsistencyChecker.md",
        "old_skill": "artifact-consistency-checker",
        "new_skill": "consistency-check",
        "name_prefix": "Artifact Consistency Checker"
    },
    # Tahap 7: Code Review
    {
        "rule": "ExpertCodeReviewer.md",
        "old_skill": "expert-code-reviewer",
        "new_skill": "review",
        "name_prefix": "Expert Code Reviewer"
    },
    # Tahap 8: Bug Remediation
    {
        "rule": "BugRemediationArchitect.md",
        "old_skill": "bug-remediation-architect",
        "new_skill": "bug-report",
        "name_prefix": "Bug Remediation Architect"
    },
    # Tahap 9: Diataxis Docs
    {
        "rule": "DiataxisDocumentationArchitect.md",
        "old_skill": "diataxis-documentation-architect",
        "new_skill": "docs",
        "name_prefix": "Diátaxis Documentation Architect"
    }
]

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
        old_skill_name = old_skill_names[old]
        text = text.replace(f"the `{old_skill_name}` skill", "this skill")
        
        # Replace the hardcoded path for templates/references to use the new skill directory name
        new_skill_dir = new.replace('/', '')
        text = text.replace(f".agents/skills/{old_skill_name}/", f".agents/skills/{new_skill_dir}/")

    text = text.replace("``/", "`/")
    text = text.replace("/``", "/`")
    
    # Remove ambiguous sentence
    pattern = r'You no longer carry.*?in your core instructions\.\s*'
    text = re.sub(pattern, "", text)
    
    # Remove redundant Core Rules Discovery block and renumber
    pattern = r"3\.\s+\*\*Core Rules Discovery:\*\*.*?4\.\s+(\*\*Session Lock Adherence:\*\*)"
    text = re.sub(pattern, r"3. \1", text, flags=re.DOTALL)
    
    return text

for stage in stages:
    rule_path = os.path.join(rules_dir, stage["rule"])
    skill_path_old = os.path.join(skills_dir_old, stage["old_skill"], "SKILL.md")
    skill_path_new = os.path.join(skills_dir_new, stage["new_skill"], "SKILL.md")
    name_prefix = stage["name_prefix"]
    slash = f"/{stage['new_skill']}"
    
    if not os.path.exists(rule_path) or not os.path.exists(skill_path_old):
        print(f"Skipping {slash}, missing source files.")
        continue
        
    print(f"Processing {slash}...")
    
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
    if not dynamic_persona_match:
        dynamic_persona_match = re.search(r'(## Dynamic Persona Activation \[CRITICAL SYSTEM OVERRIDE\].*?)(?=\n## Overview|\n## When to Use|\Z)', old_skill, re.DOTALL)
    dynamic_persona = dynamic_persona_match.group(1).strip() if dynamic_persona_match else ""
    if dynamic_persona and "🎭" not in dynamic_persona:
        dynamic_persona = dynamic_persona.replace("## Dynamic Persona Activation", "## 🎭 Dynamic Persona Activation")

    overview_match = re.search(r'(## Overview.*?)(\n## When to Use|\n## Phase 1|\n## ⚙️ Operational Workflow|\Z)', old_skill, re.DOTALL)
    overview = overview_match.group(1).strip() if overview_match else ""

    when_match = re.search(r'(## When to Use.*?)(\n---|\n## Phase 1|\n## ⚙️ Operational Workflow|\Z)', old_skill, re.DOTALL)
    when_to_use = when_match.group(1).strip() if when_match else ""

    idx = old_skill.find(when_to_use)
    if idx != -1:
        workflow = old_skill[idx + len(when_to_use):].strip()
        if workflow.startswith("---"):
            workflow = workflow[3:].strip()
    else:
        workflow = ""

    docs_idx = workflow.find("## Documentation Standards")
    if docs_idx != -1:
        workflow = workflow[:docs_idx].strip()

    if workflow.endswith("---"):
        workflow = workflow[:-3].strip()

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
    
    # Copy any extra files/folders from old_skill to new_skill (excluding SKILL.md)
    old_dir = os.path.dirname(skill_path_old)
    new_dir = os.path.dirname(skill_path_new)
    for item in os.listdir(old_dir):
        if item.lower() == 'skill.md':
            continue
        
        src_path = os.path.join(old_dir, item)
        dst_path = os.path.join(new_dir, item)
        
        if os.path.isdir(src_path):
            shutil.copytree(src_path, dst_path, dirs_exist_ok=True)
        else:
            shutil.copy2(src_path, dst_path)
            
    print(f"Successfully processed {slash}")

print("All Tahap 5-9 completed.")
