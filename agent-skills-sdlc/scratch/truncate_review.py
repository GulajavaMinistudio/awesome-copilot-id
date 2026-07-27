path = r"d:\WebstormProject\awesome-copilot-id\agent-skills-sdlc\.agents\skills\review\SKILL.md"

with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Truncate at line 230
new_lines = lines[:230]

with open(path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Truncated review SKILL.md successfully.")
