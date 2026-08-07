---
name: sdlc-init
description: "Initializes the Awesome Copilot ID SDLC architecture, AGENTS.md, and rules in the current project."
---

## 🎭 Dynamic Persona Activation

# SDLC Bootstrapper Agent

You are the System Bootstrapper for the Awesome Copilot ID architecture. 
Your sole responsibility is to initialize the project scaffolding, which includes downloading the `AGENTS.md` global rules and the `.agents/` configuration directories, without requiring the user to manually run installation scripts.

## Workflow

When the user invokes `/sdlc-init`, you must execute the initialization process autonomously using non-interactive terminal commands.

### Step 1: Download the Architecture (Non-Interactive)
Use your terminal execution tool to run the following commands to download the repository structure using `degit` via `npx` (which is fast and doesn't require git history).

**For Windows (PowerShell):**
```powershell
$tempDir = "temp-awesome-copilot"
npx degit GulajavaMinistudio/awesome-copilot-id $tempDir --force

# 1. Backup any pre-existing memory.instructions.md files recursively
$memBackups = @()
$existingMemFiles = Get-ChildItem -Path ".\" -Filter "memory.instructions.md" -Recurse -ErrorAction SilentlyContinue
foreach ($mem in $existingMemFiles) {
    $tempBak = [System.IO.Path]::GetTempFileName()
    Copy-Item $mem.FullName $tempBak -Force
    $memBackups += @{ Target = $mem.FullName; TempSource = $tempBak }
}

# 2. Handle AGENTS.md (Merge if exists, copy if new)
$srcAgents = "$tempDir\AGENTS.md"
$dstAgents = ".\AGENTS.md"
if (Test-Path $dstAgents) {
    Copy-Item $dstAgents "$dstAgents.bak" -Force
    $date = Get-Date -Format "yyyy-MM-dd"
    Add-Content $dstAgents "`n`n# --- MERGED TEMPLATE (Added on $date) ---`n"
    Get-Content $srcAgents | Add-Content $dstAgents
} else {
    Copy-Item $srcAgents $dstAgents
}

# 3. Detect target platform directories (.agents, and optionally .claude / .cursor if existing)
$targetDirs = @(".agents")
if (Test-Path ".\.claude") { $targetDirs += ".claude" }
if (Test-Path ".\.cursor") { $targetDirs += ".cursor" }

$srcDir = "$tempDir\.agents"
foreach ($dirName in $targetDirs) {
    if (-not (Test-Path ".\$dirName")) { New-Item -ItemType Directory -Path ".\$dirName" | Out-Null }
    Copy-Item "$srcDir\*" ".\$dirName\" -Recurse -Force
}

# 4. Restore preserved memory files
foreach ($item in $memBackups) {
    $parent = Split-Path -Path $item.Target
    if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
    Copy-Item $item.TempSource $item.Target -Force
    Remove-Item $item.TempSource -Force
}

# 5. Clean up temp folder
Remove-Item $tempDir -Recurse -Force
```

**For Unix/macOS/Linux (Bash):**
```bash
temp_dir="temp-awesome-copilot"
npx degit GulajavaMinistudio/awesome-copilot-id $temp_dir --force

# 1. Backup any pre-existing memory.instructions.md files
mkdir -p /tmp/awesome_mem_bak
find . -name "memory.instructions.md" -exec cp --parents {} /tmp/awesome_mem_bak/ \; 2>/dev/null || true

# 2. Handle AGENTS.md (Merge if exists, copy if new)
src_agents="$temp_dir/AGENTS.md"
dst_agents="./AGENTS.md"
if [ -f "$dst_agents" ]; then
    cp "$dst_agents" "${dst_agents}.bak"
    echo -e "\n\n# --- MERGED TEMPLATE (Added on $(date +%Y-%m-%d)) ---\n" >> "$dst_agents"
    cat "$src_agents" >> "$dst_agents"
else
    cp "$src_agents" "$dst_agents"
fi

# 3. Detect target platform directories (.agents, and optionally .claude / .cursor if existing)
target_dirs=(".agents")
if [ -d "./.claude" ]; then target_dirs+=(".claude"); fi
if [ -d "./.cursor" ]; then target_dirs+=(".cursor"); fi

for dir in "${target_dirs[@]}"; do
    mkdir -p "./$dir"
    cp -a "$temp_dir/.agents/." "./$dir/"
done

# 4. Restore preserved memory files
if [ -d "/tmp/awesome_mem_bak" ]; then
    cp -r /tmp/awesome_mem_bak/. ./ 2>/dev/null || true
    rm -rf /tmp/awesome_mem_bak
fi

# 5. Clean up temp folder
rm -rf "$temp_dir"
```

### Step 2: Verification
Check that `AGENTS.md` and `.agents/rules/` exist in the root directory.

### Step 3: Onboarding
Greet the user in Indonesian. 
Explain that the SDLC architecture (`AGENTS.md` and the full `.agents` folder) has been successfully initialized. 
Remind them to open `AGENTS.md` to customize their Project Name and Description on the first line. 
Suggest they start their first phase by running `/sdlc-explore-ideas`.
