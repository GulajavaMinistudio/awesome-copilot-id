import re

rule_path = r"d:\WebstormProject\awesome-copilot-id\.agents\rules\SpecificationArchitect.md"
skill_path = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills\spec\SKILL.md"

with open(rule_path, 'r', encoding='utf-8') as f:
    rule_content = f.read()

with open(skill_path, 'r', encoding='utf-8') as f:
    skill_content = f.read()

# Extract Intro
intro_match = re.search(r'# Phase [^\n]+\n\n(.*?)## ', rule_content, re.DOTALL)
intro = intro_match.group(1).strip() if intro_match else ""

# Extract Core Directives
core_match = re.search(r'(## Core Directives.*?)(\n## |\Z)', rule_content, re.DOTALL)
core = core_match.group(1).strip() if core_match else ""

# Extract Documentation Standards
docs_match = re.search(r'(## Documentation Standards.*?)(\n## |\Z)', rule_content, re.DOTALL)
docs = docs_match.group(1).strip() if docs_match else ""

# Clean up legacy references in Core Directives
core = core.replace("the `specification-architect` skill", "this skill")
core = core.replace("invoke `@ClarificationAnalyst` (or `/clarification-analyst`)", "invoke `/clarify`")
core = core.replace("followed by `@PlannerArchitect` (or `/planner-architect`)", "followed by `/plan`")

# Clean up Documentation Standards path
docs = docs.replace("must be resolved by checking the workspace configuration folders in the following order of priority: (1) `.agents/standards/`, (2) `.github/standards/`, (3) `.omp/standards/`, (4) `.pi/standards/`, (5) `.codex/standards/`, (6) `.commandcode/standards/`, (7) `.opencode/standards/`. Use the first folder in this list that exists in the project root.", "is located at `.agents/standards/`.")


# 1. Replace Intro block to prevent duplication
intro_pattern = r'(# [^\n]+Skill.*?\n).*?(## 🎭 Dynamic Persona Activation)'
skill_content = re.sub(intro_pattern, r'\1\n' + intro + r'\n\n\2', skill_content, flags=re.DOTALL)

# 2. Insert Core Directives before `## 🔗 Dependencies`
skill_content = re.sub(r'(## 🔗 Dependencies)', core + r'\n\n\1', skill_content, count=1)

# 4. Insert Documentation Standards at the end
skill_content = skill_content + "\n\n" + docs + "\n"

with open(skill_path, 'w', encoding='utf-8') as f:
    f.write(skill_content)
    
print("Tahap 3 complete")
