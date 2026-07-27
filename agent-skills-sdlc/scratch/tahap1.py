import re

rule_path = r"d:\WebstormProject\awesome-copilot-id\.agents\rules\BrainstormingExplorerAnalyst.md"
skill_path = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills\brainstorming\SKILL.md"

with open(rule_path, 'r', encoding='utf-8') as f:
    rule_content = f.read()

with open(skill_path, 'r', encoding='utf-8') as f:
    skill_content = f.read()

# Extract sections
# 1. 🧠 The Senior Staff Engineer Persona
persona_match = re.search(r'(## 🧠 The Senior Staff Engineer Persona.*?)(\n## |\Z)', rule_content, re.DOTALL)
persona = persona_match.group(1).strip() if persona_match else ""

# 2. ⚙️ Core Directives
core_match = re.search(r'(## ⚙️ Core Directives.*?)(\n## |\Z)', rule_content, re.DOTALL)
core = core_match.group(1).strip() if core_match else ""

# 3. 🛑 Anti-Patterns
anti_match = re.search(r'(## 🛑 Anti-Patterns \(What to Avoid\).*?)(\n## |\Z)', rule_content, re.DOTALL)
anti = anti_match.group(1).strip() if anti_match else ""

# 4. Documentation Standards
docs_match = re.search(r'(## Documentation Standards.*?)(\n## |\Z)', rule_content, re.DOTALL)
docs = docs_match.group(1).strip() if docs_match else ""

# Now inject into skill_content
# Inject persona right after Dynamic Persona Activation
skill_content = re.sub(
    r'(3\. \*\*Session Lock Adherence:\*\*.*?)\n\n---', 
    r'\1\n\n' + persona + r'\n\n---', 
    skill_content, 
    flags=re.DOTALL
)

# Inject core directives before Dependencies
skill_content = re.sub(
    r'(## 🔗 Dependencies & Skill Execution)', 
    core + r'\n\n\1', 
    skill_content
)

# Inject anti-patterns before Operational Workflow
skill_content = re.sub(
    r'(## ⚙️ Operational Workflow)', 
    anti + r'\n\n\1', 
    skill_content
)

# Inject docs at the end
skill_content = skill_content + "\n\n" + docs + "\n"

with open(skill_path, 'w', encoding='utf-8') as f:
    f.write(skill_content)
    
print("Tahap 1 complete")
