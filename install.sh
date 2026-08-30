#!/bin/bash
# install.sh
# Interactive installation script for awesome-copilot-id (Linux/macOS)

# Terminal colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}=== Awesome Copilot ID - Installer ===${NC}"

# 1. Define target directory (default: current directory)
# Redirect stdin from /dev/tty to allow reading from keyboard when piped via curl
read -p "Enter your target project path (default: .): " TARGET_PATH < /dev/tty
TARGET_PATH=${TARGET_PATH:-.}

# Convert to absolute path if possible
if [ -d "$TARGET_PATH" ]; then
    TARGET_PATH=$(cd "$TARGET_PATH" && pwd)
else
    echo -e "${RED}Error: Target directory '$TARGET_PATH' not found.${NC}"
    exit 1
fi

echo -e "Target directory: ${YELLOW}$TARGET_PATH${NC}"

# 2. Create temporary directory to download the repository
TEMP_DIR=$(mktemp -d -t awesome-copilot-XXXXXX)
ZIP_FILE="$TEMP_DIR/archive.zip"
EXTRACT_DIR="$TEMP_DIR/extracted"

# Handler to clean up temporary files on exit
cleanup() {
    if [ -d "$TEMP_DIR" ]; then
        echo -e "${CYAN}Cleaning up temporary files...${NC}"
        rm -rf "$TEMP_DIR"
    fi
}
trap cleanup EXIT

# 3. Determine download method (ZIP or Git Clone)
DOWNLOAD_METHOD=""
if command -v unzip >/dev/null 2>&1 && (command -v curl >/dev/null 2>&1 || command -v wget >/dev/null 2>&1); then
    DOWNLOAD_METHOD="zip"
elif command -v git >/dev/null 2>&1; then
    DOWNLOAD_METHOD="git"
else
    echo -e "${RED}Error: This script requires 'unzip' + 'curl'/'wget', or 'git' to download the repository.${NC}"
    exit 1
fi

SOURCE_CONTENT_DIR=""

if [ "$DOWNLOAD_METHOD" = "zip" ]; then
    echo -e "${CYAN}Downloading repository from GitHub (ZIP)...${NC}"
    REPO_ZIP_URL="https://github.com/GulajavaMinistudio/awesome-copilot-id/archive/refs/heads/main.zip"
    
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL "$REPO_ZIP_URL" -o "$ZIP_FILE"
    else
        wget -qO "$ZIP_FILE" "$REPO_ZIP_URL"
    fi
    
    if [ ! -f "$ZIP_FILE" ]; then
        echo -e "${RED}Error: Failed to download ZIP file from GitHub.${NC}"
        exit 1
    fi
    
    echo -e "${CYAN}Extracting files...${NC}"
    mkdir -p "$EXTRACT_DIR"
    unzip -q "$ZIP_FILE" -d "$EXTRACT_DIR"
    SOURCE_CONTENT_DIR="$EXTRACT_DIR/awesome-copilot-id-main"
else
    echo -e "${CYAN}Cloning repository from GitHub (Shallow Clone)...${NC}"
    REPO_GIT_URL="https://github.com/GulajavaMinistudio/awesome-copilot-id.git"
    git clone --depth=1 -q "$REPO_GIT_URL" "$EXTRACT_DIR"
    SOURCE_CONTENT_DIR="$EXTRACT_DIR"
fi

if [ ! -d "$SOURCE_CONTENT_DIR" ]; then
    echo -e "${RED}Error: Failed to find downloaded source directory.${NC}"
    exit 1
fi

# 4. Interactive menu for SDLC package selection
echo -e "\n${CYAN}Select the SDLC Methodology Package to install:${NC}"
echo -e "1) ${GREEN}Standard SDLC Package${NC} -> 12-Phase Full SDLC Pipeline (/sdlc-*), Code Janitor, Omni-Dev, UI Designer"
echo -e "2) ${GREEN}TDD-Spec SDLC Package${NC} -> Strict Test-First & Executable Spec Kit (21 /tdd-* skills, Seams Matrix, Floor-Guard)"
read -p "Enter your package choice (1-2, default: 1): " PKG_CHOICE < /dev/tty
PKG_CHOICE=${PKG_CHOICE:-1}

SRC_DIR=""
SRC_AGENTS=""
PACKAGE_NAME=""

case $PKG_CHOICE in
    1)
        SRC_DIR="$SOURCE_CONTENT_DIR/.agents"
        SRC_AGENTS="$SOURCE_CONTENT_DIR/AGENTS.md"
        PACKAGE_NAME="Standard SDLC Package"
        ;;
    2)
        SRC_DIR="$SOURCE_CONTENT_DIR/tdd-spec-skills/.agents"
        SRC_AGENTS="$SOURCE_CONTENT_DIR/tdd-spec-skills/AGENTS.md"
        PACKAGE_NAME="TDD-Spec SDLC Package"
        ;;
    *)
        echo -e "${RED}Invalid choice. Process aborted.${NC}"
        exit 1
        ;;
esac

echo -e "Selected Package: ${GREEN}$PACKAGE_NAME${NC}"

# 5. Interactive menu for platform selection
echo -e "\n${CYAN}Select the AI Assistant platform you want to install in your project:${NC}"
echo -e "1) ${GREEN}Standard Platforms${NC} (GitHub Copilot, Antigravity, OpenCode, CommandCode, Codex, Pi, OMP) -> installs to .agents/"
echo -e "2) ${GREEN}Claude Code${NC} -> installs to .claude/"
echo -e "3) ${GREEN}Cursor${NC} -> installs to .cursor/"
echo -e "4) ${GREEN}All Platforms${NC} (Install to .agents/, .claude/, and .cursor/)"
read -p "Enter your platform choice (1-4, default: 1): " CHOICE < /dev/tty
CHOICE=${CHOICE:-1}

DEST_DIRS=()
case $CHOICE in
    1) DEST_DIRS=(".agents") ;;
    2) DEST_DIRS=(".claude") ;;
    3) DEST_DIRS=(".cursor") ;;
    4) DEST_DIRS=(".agents" ".claude" ".cursor") ;;
    *) echo -e "${RED}Invalid choice. Process aborted.${NC}"; exit 1 ;;
esac

# 6. Copy chosen platform configuration directories

for dst_dir_name in "${DEST_DIRS[@]}"; do
    DST_DIR="$TARGET_PATH/$dst_dir_name"
    
    if [ -d "$SRC_DIR" ]; then
        RESTORE_LATER=()
        RESTORE_TARGETS=()
        RESTORE_MODES=()
        
        # If destination directory already exists, check for memory.instructions.md
        if [ -d "$DST_DIR" ]; then
            MEMORY_FILES=($(find "$DST_DIR" -name "memory.instructions.md" 2>/dev/null))
            
            if [ ${#MEMORY_FILES[@]} -gt 0 ]; then
                for mem_file in "${MEMORY_FILES[@]}"; do
                    echo -e "${YELLOW}Found pre-existing memory file: $mem_file${NC}"
                    read -p "Do you want to: [k]eep the existing file, or [r]eplace it with the template? (K/r): " MEM_CHOICE < /dev/tty
                    MEM_CHOICE=${MEM_CHOICE:-k}
                    
                    TEMP_BAK=$(mktemp)
                    cp "$mem_file" "$TEMP_BAK"
                    
                    if [[ "$MEM_CHOICE" =~ ^[Rr]$ ]]; then
                        # Replace: Back up to a temporary file, will restore as .bak
                        RESTORE_LATER+=("$TEMP_BAK")
                        RESTORE_TARGETS+=("${mem_file}.bak")
                        RESTORE_MODES+=("Replace")
                        echo -e "${YELLOW}Will backup your memory file to .bak after folder copy.${NC}"
                    else
                        # Keep: Back up to a temporary file to restore after copy
                        RESTORE_LATER+=("$TEMP_BAK")
                        RESTORE_TARGETS+=("$mem_file")
                        RESTORE_MODES+=("Keep")
                    fi
                done
            fi
            
            read -p "Folder '$dst_dir_name' already exists in target. Overwrite entire folder? (y/N): " CONFIRM < /dev/tty
            CONFIRM=${CONFIRM:-n}
            if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
                rm -rf "$DST_DIR"
            else
                echo -e "${YELLOW}Skipping copy of '$dst_dir_name'...${NC}"
                # Clean up temporary backups if copy is skipped
                for temp_bak in "${RESTORE_LATER[@]}"; do
                    rm -f "$temp_bak"
                done
                continue
            fi
        fi
        
        # Create destination directory and copy contents
        mkdir -p "$DST_DIR"
        cp -a "$SRC_DIR/." "$DST_DIR/"
        echo -e "Successfully copied agents configuration to ${GREEN}$TARGET_PATH/$dst_dir_name${NC}"
        
        # Restore kept memory files if any
        if [ ${#RESTORE_LATER[@]} -gt 0 ]; then
            for i in "${!RESTORE_LATER[@]}"; do
                temp_bak="${RESTORE_LATER[$i]}"
                target_mem="${RESTORE_TARGETS[$i]}"
                mode="${RESTORE_MODES[$i]:-Keep}"
                # Re-create parent directory just in case it was deleted
                mkdir -p "$(dirname "$target_mem")"
                cp "$temp_bak" "$target_mem"
                rm -f "$temp_bak"
                if [ "$mode" = "Replace" ]; then
                    echo -e "Created backup of existing memory file at: ${GREEN}$target_mem${NC}"
                else
                    echo -e "Kept existing memory file: ${GREEN}$target_mem${NC}"
                fi
            done
        fi
    else
        echo -e "${RED}Error: Source folder '.agents' not found in source repository.${NC}"
        exit 1
    fi
done

# 7. Copy AGENTS.md
DST_AGENTS="$TARGET_PATH/AGENTS.md"

if [ -f "$SRC_AGENTS" ]; then
    if [ -f "$DST_AGENTS" ]; then
        echo -e "${YELLOW}File 'AGENTS.md' already exists in target.${NC}"
        read -p "Do you want to: [k]eep existing, [r]eplace with template, or [m]erge them? (K/r/m): " AGENTS_CHOICE < /dev/tty
        AGENTS_CHOICE=${AGENTS_CHOICE:-k}
        
        if [[ "$AGENTS_CHOICE" =~ ^[Rr]$ ]]; then
            # Replace: Back up first, then overwrite
            cp "$DST_AGENTS" "${DST_AGENTS}.bak"
            cp "$SRC_AGENTS" "$DST_AGENTS"
            echo -e "Replaced AGENTS.md. Old version backed up at: ${GREEN}${DST_AGENTS}.bak${NC}"
        elif [[ "$AGENTS_CHOICE" =~ ^[Mm]$ ]]; then
            # Merge: Back up first, then append new template content
            cp "$DST_AGENTS" "${DST_AGENTS}.bak"
            echo -e "\n\n# --- MERGED TEMPLATE (Added on $(date +%Y-%m-%d)) ---\n" >> "$DST_AGENTS"
            cat "$SRC_AGENTS" >> "$DST_AGENTS"
            echo -e "Merged new template into existing AGENTS.md. Backup created at: ${GREEN}${DST_AGENTS}.bak${NC}"
        else
            echo -e "${YELLOW}Skipping copy of 'AGENTS.md'...${NC}"
        fi
    else
        # Just copy if it doesn't exist
        cp "$SRC_AGENTS" "$TARGET_PATH/"
        echo -e "Successfully copied ${GREEN}AGENTS.md${NC} to $TARGET_PATH/"
    fi
else
    echo -e "${RED}Warning: File 'AGENTS.md' not found in source repository.${NC}"
fi

echo -e "\n${GREEN}[OK] Installation completed successfully!${NC}"
echo -e "${YELLOW}[IMPORTANT]: Please review 'AGENTS.md' in your project to:"
echo -e "1. Customize the project name on the first line so that AI agents can recognize your project context."
echo -e "2. Change the language preference in the '## Communication' section if necessary.${NC}"
if [ "$PKG_CHOICE" = "2" ]; then
    echo -e "${CYAN}3. For TDD-Spec SDLC, start by typing '/tdd-init' (to bootstrap constitution/constraints) or '/tdd-ask-help' for guidance.${NC}\n"
else
    echo -e "${CYAN}3. For Standard SDLC, start by typing '/sdlc-explore-ideas' to begin discovery.${NC}\n"
fi
