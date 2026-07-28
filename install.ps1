# install.ps1
# Interactive installation script for awesome-copilot-id (Windows Terminal/PowerShell)
# Requires -Version 5.1

$ErrorActionPreference = "Stop"

Write-Host "=== Awesome Copilot ID - Installer ===" -ForegroundColor Cyan

# 1. Define target directory (default: current directory)
$targetPath = Read-Host "Enter your target project path (default: .)"
if ([string]::IsNullOrWhiteSpace($targetPath)) { $targetPath = "." }

# Resolve to absolute path
try {
    $targetPath = Resolve-Path -Path $targetPath
} catch {
    Write-Host "Error: Target directory '$targetPath' not found." -ForegroundColor Red
    exit 1
}

Write-Host "Target directory: $targetPath" -ForegroundColor Yellow

# 2. Create temporary directory to download the repository
$tempDirName = "awesome-copilot-" + (Get-Random)
$tempDir = Join-Path $env:TEMP $tempDirName
$tempZip = Join-Path $tempDir "archive.zip"
$tempExtract = Join-Path $tempDir "extracted"

# Create temp folder
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

try {
    # 3. Download repository (using ZIP)
    Write-Host "Downloading repository from GitHub (ZIP)..." -ForegroundColor Cyan
    $repoZipUrl = "https://github.com/GulajavaMinistudio/awesome-copilot-id/archive/refs/heads/main.zip"
    
    # Use TLS 1.2 for secure connection
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $repoZipUrl -OutFile $tempZip -UseBasicParsing
    
    Write-Host "Extracting files..." -ForegroundColor Cyan
    Expand-Archive -Path $tempZip -DestinationPath $tempExtract
    
    $sourceContentDir = Join-Path $tempExtract "awesome-copilot-id-main"
    if (!(Test-Path $sourceContentDir)) {
        Write-Host "Error: Failed to find downloaded source directory." -ForegroundColor Red
        exit 1
    }

    # 4. Interactive menu for platform selection
    Write-Host ""
    Write-Host "Select the AI Assistant platform you want to install in your project:"
    Write-Host "1) GitHub Copilot (.github)"
    Write-Host "2) Google Antigravity (.agents)"
    Write-Host "3) OpenCode (.opencode)"
    Write-Host "4) CommandCode (.commandcode)"
    Write-Host "5) ChatGPT Codex (.codex)"
    Write-Host "6) Pi Dev Coding Agent (.pi)"
    Write-Host "7) Oh My Pi (.omp)"
    Write-Host "8) Claude Code (.claude)"
    Write-Host "9) Google Antigravity - Advanced Skills SDLC Workflow (.agents)"
    Write-Host "10) All Platforms (Install all standard configurations above)"
    Write-Host ""
    
    $choice = Read-Host "Enter your choice (1-10)"
    
    $platformDirs = @()
    $isSdlc = $false
    switch ($choice) {
        "1" { $platformDirs = @(".github") }
        "2" { $platformDirs = @(".agents") }
        "3" { $platformDirs = @(".opencode") }
        "4" { $platformDirs = @(".commandcode") }
        "5" { $platformDirs = @(".codex") }
        "6" { $platformDirs = @(".pi") }
        "7" { $platformDirs = @(".omp") }
        "8" { $platformDirs = @(".claude") }
        "9" { $platformDirs = @("agent-skills-sdlc/.agents"); $isSdlc = $true }
        "10" { $platformDirs = @(".github", ".agents", ".claude", ".opencode", ".commandcode", ".codex", ".pi", ".omp") }
        Default {
            Write-Host "Invalid choice. Process aborted." -ForegroundColor Red
            exit 1
        }
    }

    # 5. Copy chosen platform configuration directories
    foreach ($dir in $platformDirs) {
        $srcDir = Join-Path $sourceContentDir $dir
        $dstBase = Split-Path $dir -Leaf
        $dstDir = Join-Path $targetPath $dstBase
        
        if (Test-Path $srcDir) {
            $restoreList = @()
            
            # If destination directory already exists, check for memory.instructions.md
            if (Test-Path $dstDir) {
                $targetMemoryFiles = Get-ChildItem -Path $dstDir -Filter "memory.instructions.md" -Recurse -ErrorAction SilentlyContinue
                
                if ($targetMemoryFiles) {
                    foreach ($targetMem in $targetMemoryFiles) {
                        $relPath = Resolve-Path $targetMem.FullName -Relative
                        Write-Host "Found pre-existing memory file: $relPath" -ForegroundColor Yellow
                        $confirmMem = Read-Host "Do you want to: [k]eep the existing file, or [r]eplace it with the template? (K/r)"
                        $tempBackupPath = [System.IO.Path]::GetTempFileName()
                        Copy-Item -Path $targetMem.FullName -Destination $tempBackupPath -Force
                        
                        if ($confirmMem -match '^[Rr]$') {
                            # Replace: Back up to a temp location, will restore as .bak
                            $restoreList += @{ Target = $targetMem.FullName + ".bak"; TempSource = $tempBackupPath; Mode = "Replace" }
                            Write-Host "Will backup your memory file to .bak after folder copy." -ForegroundColor Yellow
                        } else {
                            # Keep: Back up to a temp location to restore after copy
                            $restoreList += @{ Target = $targetMem.FullName; TempSource = $tempBackupPath; Mode = "Keep" }
                        }
                    }
                }
                
                $confirmFolder = Read-Host "Folder '$dstBase' already exists in target. Overwrite entire folder? (y/N)"
                if ($confirmFolder -notmatch '^[Yy]$') {
                    Write-Host "Skipping copy of '$dstBase'..." -ForegroundColor Yellow
                    # Clean up temp files if copy is skipped
                    foreach ($item in $restoreList) {
                        if (Test-Path $item.TempSource) { Remove-Item -Path $item.TempSource -Force }
                    }
                    continue
                }
                
                Remove-Item -Path $dstDir -Recurse -Force
            }
            
            # Copy directory structure
            Copy-Item -Path $srcDir -Destination $targetPath -Recurse -Force
            Write-Host "Successfully copied $dstBase to $targetPath" -ForegroundColor Green
            
            # Restore kept memory files
            foreach ($item in $restoreList) {
                $parentDir = Split-Path -Path $item.Target
                if (!(Test-Path $parentDir)) {
                    New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
                }
                Copy-Item -Path $item.TempSource -Destination $item.Target -Force
                Remove-Item -Path $item.TempSource -Force
                if ($item.Mode -eq "Replace") {
                    Write-Host "Created backup of existing memory file at: $($item.Target)" -ForegroundColor Green
                } else {
                    Write-Host "Kept existing memory file: $($item.Target)" -ForegroundColor Green
                }
            }
        } else {
            Write-Host "Warning: Folder '$dir' not found in source repository." -ForegroundColor Yellow
        }
    }

    # 6. Copy AGENTS.md
    if ($isSdlc) {
        $srcAgents = Join-Path $sourceContentDir "agent-skills-sdlc/AGENTS.md"
    } else {
        $srcAgents = Join-Path $sourceContentDir "AGENTS.md"
    }
    $dstAgents = Join-Path $targetPath "AGENTS.md"

    if (Test-Path $srcAgents) {
        if (Test-Path $dstAgents) {
            Write-Host "File 'AGENTS.md' already exists in target." -ForegroundColor Yellow
            $agentsChoice = Read-Host "Do you want to: [k]eep existing, [r]eplace with template, or [m]erge them? (K/r/m)"
            
            if ($agentsChoice -match '^[Rr]$') {
                # Replace: Back up first, then overwrite
                $bakPath = $dstAgents + ".bak"
                Copy-Item -Path $dstAgents -Destination $bakPath -Force
                Copy-Item -Path $srcAgents -Destination $dstAgents -Force
                Write-Host "Replaced AGENTS.md. Old version backed up at: $bakPath" -ForegroundColor Green
            } elseif ($agentsChoice -match '^[Mm]$') {
                # Merge: Back up first, then append new template content
                $bakPath = $dstAgents + ".bak"
                Copy-Item -Path $dstAgents -Destination $bakPath -Force
                
                $currentDate = Get-Date -Format "yyyy-MM-dd"
                $mergeHeader = "`r`n`r`n# --- MERGED TEMPLATE (Added on $currentDate) ---`r`n"
                
                # Append content
                Add-Content -Path $dstAgents -Value $mergeHeader -Encoding utf8
                $newContent = Get-Content -Path $srcAgents -Raw
                Add-Content -Path $dstAgents -Value $newContent -Encoding utf8
                
                Write-Host "Merged new template into existing AGENTS.md. Backup created at: $bakPath" -ForegroundColor Green
            } else {
                Write-Host "Skipping copy of 'AGENTS.md'..." -ForegroundColor Yellow
            }
        } else {
            Copy-Item -Path $srcAgents -Destination $targetPath -Force
            Write-Host "Successfully copied AGENTS.md to $targetPath" -ForegroundColor Green
        }
    } else {
        Write-Host "Warning: File 'AGENTS.md' not found in source repository." -ForegroundColor Yellow
    }

    Write-Host ""
    Write-Host "[OK] Installation completed successfully!" -ForegroundColor Green
    Write-Host "[IMPORTANT]: Please review 'AGENTS.md' in your project to:" -ForegroundColor Yellow
    Write-Host "1. Customize the project name on the first line so that AI agents can recognize your project context." -ForegroundColor Yellow
    Write-Host "2. Change the language preference (default is Indonesian) to your preferred language if necessary." -ForegroundColor Yellow
    Write-Host ""

} finally {
    # 7. Clean up temporary files
    if (Test-Path $tempDir) {
        Write-Host "Cleaning up temporary files..." -ForegroundColor Cyan
        Remove-Item -Path $tempDir -Recurse -Force
    }
}
