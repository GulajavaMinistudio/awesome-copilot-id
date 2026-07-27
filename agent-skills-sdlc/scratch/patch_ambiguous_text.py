import os
import glob

skills_dir = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills"

for skill_file in glob.glob(os.path.join(skills_dir, "*", "SKILL.md")):
    with open(skill_file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "You no longer carry the workflow and templates in your core instructions. " in content:
        content = content.replace("You no longer carry the workflow and templates in your core instructions. ", "")
        with open(skill_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Patched: {skill_file}")

print("Done patching.")
