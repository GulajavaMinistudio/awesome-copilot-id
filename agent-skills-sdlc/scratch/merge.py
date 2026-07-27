import os
import re

mapping = {
    "BrainstormingExplorerAnalyst.md": "brainstorming/SKILL.md",
    "ProductManagerPRD.md": "prd/SKILL.md",
    "ClarificationAnalyst.md": "clarify/SKILL.md",
    "SpecificationArchitect.md": "spec/SKILL.md",
    "PlannerArchitect.md": "plan/SKILL.md",
    "GodModeDev.md": "implement/SKILL.md",
    "ExpertCodeReviewer.md": "review/SKILL.md",
    "BugRemediationArchitect.md": "bug-report/SKILL.md",
    "ArtifactConsistencyChecker.md": "consistency-check/SKILL.md",
    "DiataxisDocumentationArchitect.md": "docs/SKILL.md"
}

rules_dir = r"d:\WebstormProject\awesome-copilot-id\.agents\rules"
skills_dir = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills"

for rule_file, skill_file in mapping.items():
    rule_path = os.path.join(rules_dir, rule_file)
    skill_path = os.path.join(skills_dir, skill_file)
    
    if not os.path.exists(rule_path) or not os.path.exists(skill_path):
        print(f"Skipping {rule_file} (not found)")
        continue
        
    with open(rule_path, 'r', encoding='utf-8') as f:
        rule_content = f.read()
        
    with open(skill_path, 'r', encoding='utf-8') as f:
        skill_content = f.read()

    # Extract Intro (text between the first # Phase ... and the first ## )
    intro_match = re.search(r'# Phase [^\n]+\n\n(.*?)## ', rule_content, re.DOTALL)
    intro = intro_match.group(1).strip() if intro_match else ""

    # Extract Core Directives
    core_directives_match = re.search(r'(## 🛑 Core Directives.*?)(\n## |\Z)', rule_content, re.DOTALL)
    core_directives = core_directives_match.group(1).strip() if core_directives_match else ""
    if not core_directives:
        # Some rules might have different core directives header?
        pass

    # Extract Scope Boundary & Pushback
    pushback_match = re.search(r'(## 🚫 Scope Boundary.*?)(\n## |\Z)', rule_content, re.DOTALL)
    pushback = pushback_match.group(1).strip() if pushback_match else ""

    # Extract Documentation Standards
    docs_match = re.search(r'(## 📚 Documentation Standards.*?)(\n## |\Z)', rule_content, re.DOTALL)
    docs = docs_match.group(1).strip() if docs_match else ""

    # Now modify skill_content
    # 1. Insert Intro just after the main `# Skill Name` header
    skill_content = re.sub(r'(# [^\n]+Skill.*?\n)', r'\1\n' + intro + r'\n', skill_content, count=1)
    
    # 2. Insert Core Directives before `## 🔗 Dependencies`
    if core_directives:
        skill_content = re.sub(r'(## 🔗 Dependencies)', core_directives + r'\n\n\1', skill_content, count=1)
        
    # 3. Replace the short `## 🛑 Scope Boundary & Pushback Rules` with the detailed one
    # Note: New skill file might have `## 🛑 Scope Boundary & Pushback Rules` (plural) or similar
    if pushback:
        skill_content = re.sub(r'## 🛑 Scope Boundary.*?(\n## |\Z)', pushback + r'\n\n\1', skill_content, flags=re.DOTALL)
        
    # 4. Insert Documentation Standards at the end if it exists
    if docs:
        skill_content += r'\n\n' + docs + r'\n'

    with open(skill_path, 'w', encoding='utf-8') as f:
        f.write(skill_content)
        
    print(f"Updated {skill_file} with content from {rule_file}")
