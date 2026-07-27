import os
import re

base_dir = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills"

for root, _, files in os.walk(base_dir):
    for file in files:
        if file == "SKILL.md":
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()

            # The block to remove is:
            # 3. **Core Rules Discovery:** Read the active platform's corresponding agent definition file for detailed constraints:
            #    - Path: .agents/rules/...
            #
            # Followed by:
            # 4. **Session Lock Adherence:**
            
            # Using regex to remove item 3 and renumber 4 to 3
            # We match "3. **Core Rules Discovery:**" and everything up to "4. **Session Lock Adherence:**"
            pattern = r"3\.\s+\*\*Core Rules Discovery:\*\*.*?4\.\s+(\*\*Session Lock Adherence:\*\*)"
            new_content = re.sub(pattern, r"3. \1", content, flags=re.DOTALL)

            if new_content != content:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {path}")
            else:
                print(f"No match in {path}")
