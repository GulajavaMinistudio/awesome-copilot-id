import re

rule_path = r"d:\WebstormProject\awesome-copilot-id\.agents\rules\ProductManagerPRD.md"
skill_path = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills\prd\SKILL.md"

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
core = core.replace("the `product-manager-prd` skill", "this skill")
core = core.replace("invoke `@ClarificationAnalyst` (or `/clarification-analyst`)", "invoke `/clarify`")
core = core.replace("followed by `@SpecificationArchitect` (or `/specification-architect`)", "followed by `/spec`")

# 1. Insert Intro just after the main `# Skill Name` header
skill_content = re.sub(r'(# [^\n]+Skill.*?\n)', r'\1\n' + intro + r'\n\n', skill_content, count=1)

# 2. Insert Core Directives before `## 🔗 Dependencies`
skill_content = re.sub(r'(## 🔗 Dependencies)', core + r'\n\n\1', skill_content, count=1)

# 3. Replace the short `## 🛑 Scope Boundary & Pushback Rules` with the detailed one if any
# (Wait, PRD doesn't have a separate scope boundary, it's inside Core Directives in the old rule)
# We will leave the new one as it is or let it be. Let's not remove the new Scope Boundary because PRD rule doesn't have one explicitly named.

# 4. Insert Documentation Standards at the end
skill_content = skill_content + "\n\n" + docs + "\n"

with open(skill_path, 'w', encoding='utf-8') as f:
    f.write(skill_content)
    
print("Tahap 2 complete")
