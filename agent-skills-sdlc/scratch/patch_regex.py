import os
import glob
import re

skills_dir = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills"

for skill_file in glob.glob(os.path.join(skills_dir, "*", "SKILL.md")):
    with open(skill_file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Catch any variant like "You no longer carry the ... in your core instructions. "
    pattern = r'You no longer carry.*?in your core instructions\.\s*'
    if re.search(pattern, content):
        content = re.sub(pattern, "", content)
        with open(skill_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Patched regex: {skill_file}")

print("Done patching with regex.")
