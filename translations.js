window.translations = {
  en: {
    // Head & General
    page_title: "Awesome Copilot Indonesia 🇮🇩 - Custom AI Agents & SDLC Workflows",
    
    // Navbar
    nav_overview: "Overview",
    nav_installation: "Installation",
    nav_agents: "Custom Agents",
    nav_examples: "Examples",
    nav_cta: "Get Started",
    
    // Hero
    hero_eyebrow: "Awesome Copilot Indonesia",
    hero_title: "Accelerate Your SDLC with Custom AI Agents",
    hero_desc: "A curated collection of custom AI agents, skills, rules, and prompts to optimize your AI-assisted development workflow across multiple platforms (Antigravity, Copilot, OpenCode, etc.).",
    hero_cta_install: "Get Started",
    hero_cta_agents: "Explore Agents",
    console_label: "terminal",
    console_content: `<strong>$</strong> /planner-architect create a step-by-step implementation plan based on @spec-shopping-cart.md
<span class="text-muted-custom">[Phase 3] Analyzing spec-shopping-cart.md...</span>
<span class="text-success">✔</span> Context validated (Traceability: 100%)
<span class="text-success">✔</span> Implementation plan drafted: plan-shopping-cart.md

<strong>$</strong> /god-mode-dev implement the shopping cart based on @plan-shopping-cart.md
<span class="text-muted-custom">[Phase 4] Loaded plan-shopping-cart.md...</span>
<span class="text-info">➜</span> Task 1/3: Scaffold cart service layer... <span class="text-success">Done</span>
<span class="text-info">➜</span> Task 2/3: Integrate UI view & styling... <span class="text-success">Done</span>
<span class="text-info">➜</span> Task 3/3: Write unit/integration tests... <span class="text-success">Done</span>
<span class="text-primary">> Running 18 tests in cart.spec.js...</span>
<span class="text-success">> All tests passed (18/18) with 100% coverage!</span>`,
    
    // Overview
    overview_title: "Overview",
    overview_desc: "Awesome Copilot Indonesia is a curated collection of custom AI agents, skills, rules, and prompts designed to accelerate your software development lifecycle (SDLC).",
    overview_agents_title: "Custom Agents",
    overview_agents_desc: "Specialized AI agents for each phase of development (PRD, Technical Specs, Strategic Planning, Coding, and Review).",
    overview_skills_title: "Specialized Skills",
    overview_skills_desc: "Advanced capabilities like Project Researcher for automated architecture mapping, Karpathy Guidelines, Ponytail lazy dev, and Fable Protocol for complex autonomous task execution.",
    overview_rules_title: "Rules & Instructions",
    overview_rules_desc: "Best practice coding guidelines tailored for popular languages and frameworks to maintain code quality.",
    overview_byok_title: "BYOK Copilot Config",
    overview_byok_desc: "Ready-to-use configuration templates for bringing your own API keys (OpenRouter, DeepSeek, etc.) to VS Code Copilot Chat.",
    overview_multi_title: "Multi-Platform Support",
    overview_multi_desc: "Out-of-the-box configurations for Google Antigravity (.agents), Claude Code (.claude), OpenCode, Copilot, CommandCode, ChatGPT Codex, Pi Dev, and Oh My Pi (omp).",
    
    // Getting Started
    install_title: "Getting Started",
    install_desc: "Choose either the fast automated installation or perform a manual setup based on the AI assistant platform you use.",
    install_prereq_title: "Platform Prerequisites",
    install_method1_tab: "Method 1: Automated (Recommended)",
    install_method2_tab: "Method 2: Manual",
    
    install_method1_desc: "Run a single one-liner command in your terminal at your project's root directory:",
    install_method2_step1: "Clone this repository:",
    install_method2_step2: "Choose your platform configuration:",
    install_method2_step2_desc: "Copy the relevant platform folder to your project root. Example: for Google Antigravity, copy the <code>.agents</code> directory. For GitHub Copilot, copy <code>.github</code>.",
    install_method2_step3: "Copy the <code>AGENTS.md</code> file to your project root:",
    install_method2_step3_desc: "<em>Important:</em> After copying, open <code>AGENTS.md</code> and edit it to:<br>1. Change the <code>[Your Application Name]</code> placeholder to your project name.<br>2. Add a brief <code>[Project Description]</code>.<br>3. Adjust the <code>Language:</code> preference to your desired output language.",
    install_general_warning: "<strong>Important:</strong> After installation is complete, open the <code>AGENTS.md</code> file in your project root and edit it to:<br>1. Change the <code>[Your Application Name]</code> placeholder to your project name.<br>2. Add a brief <code>[Project Description]</code>.<br>3. Adjust the <code>Language:</code> preference to your desired output language.",
    install_method2_step4: "Restart your IDE or AI assistant to apply changes.",
    
    // Custom Agents Section
    agents_title: "Custom Agents",
    agents_desc: "Leverage custom AI agents specialized for specific roles and tasks throughout the development lifecycle.",
    agent_group_1: "Phase 1-3: Strategy & Specs",
    agent_group_2: "Phase 4: Execution & Review",
    agent_group_3: "Phase 5: Documentation",
    agent_label_best: "Best For:",
    agent_label_prompt: "Usage Example:",
    
    agent_bea_desc: "Systematically explores the existing codebase, critiques architecture, maps repository structure into ARCHITECTURE.md using the Project Researcher skill, and generates raw project discovery drafts (Phase 0 Discovery).",
    agent_bea_best: "Understanding new or legacy codebases, analyzing technical debt, and generating architecture maps before drafting the PRD.",
    
    agent_pm_desc: "Generates comprehensive Product Requirements Documents (PRDs), including User Stories, flows, and acceptance criteria.",
    agent_pm_best: "Writing business and functional requirements for new features before technical specifications are drafted.",
    
    agent_ca_desc: "Interrogates PRDs, Technical Specs, or Plans to uncover ambiguities, hidden assumptions, and missing edge cases.",
    agent_ca_best: "Quality checking requirements before moving on to technical specs or coding phases.",
    
    agent_sa_desc: "Creates detailed technical specifications (API contracts, DB schemas, data models) and documents key architectural decisions (ADRs).",
    agent_sa_best: "Designing structured technical blueprints before starting the implementation phase.",
    
    agent_acc_desc: "Audits consistency and traceability across documents (PRD vs Spec vs Plan) to detect missing requirements coverage and scope creep.",
    agent_acc_best: "Ensuring that the SDLC pipeline is consistent and no feature or requirement is missed or drifted.",
    
    agent_pa_desc: "Breaks down technical specifications into strategic, sequential, and executable implementation plan tasks.",
    agent_pa_best: "Creating detailed coding task lists and checklists before developers start writing code.",
    
    agent_gmd_desc: "A high-performance autonomous developer agent that writes features, performs surgical refactoring, and authors robust unit/widget tests.",
    agent_gmd_best: "Writing feature code, refactoring modules, fixing bugs, and running tests directly within the workspace.",
    
    agent_ecr_desc: "Reviews code quality against SOLID, Clean Code, and security best practices, and generates structured refactoring plans.",
    agent_ecr_best: "Maintaining code quality and security standards before merging changes into the main branch.",
    
    agent_bra_desc: "Analyzes bug reports, performs Root Cause Analysis (RCA), and generates surgical bug-fix plans with safe rollback strategies.",
    agent_bra_best: "Resolving complex bugs in codebases without introducing regression issues.",
    
    agent_dda_desc: "Technical documentation specialist who writes clear user manuals, API guides, and reference documents following the Diátaxis framework.",
    agent_dda_best: "Writing user-facing manuals, API documentations, and clear system explanations.",
    
    // Examples & Stepper
    examples_title: "Workflow & Examples",
    examples_desc: "Understand how the software development lifecycle (SDLC) is executed sequentially using a suite of AI agents.",
    stepper_title: "AI Agent SDLC Sequence",
    
    step_label_0: "Discovery",
    step_label_1: "Requirements",
    step_label_2: "Specification",
    step_label_3: "Planning",
    step_label_4: "Execution",
    step_label_5: "Documentation",
    
    step_label_agent: "Agent:",
    step_label_input: "Input Document:",
    
    panel_0_title: "Phase 0: Project Discovery",
    panel_0_desc: "Explore the existing codebase, analyze the architecture, and generate a raw discovery draft before drafting the PRD. <strong>Business Brief</strong> is the initial brief detailing business goals, features, and project scope.",
    panel_0_input: "Business Brief / Ideas",
    
    panel_1_title: "Phase 1: Requirements & Clarification",
    panel_1_desc: "Draft a comprehensive PRD and run deep clarification rounds to eliminate ambiguity in feature requirements.",
    panel_1_input: "Discovery Draft",
    
    panel_2_title: "Phase 2: Technical Specification",
    panel_2_desc: "Design detailed architecture, write data schemas, define APIs, and record key architectural decisions (ADRs) while verifying traceability.",
    panel_2_input: "Approved PRD",
    
    panel_3_title: "Phase 3: Implementation Planning",
    panel_3_desc: "Break down technical specifications into strategic implementation tasks and create a safe coding checklist.",
    panel_3_input: "Approved Spec",
    
    panel_4_title: "Phase 4: Execution & Review",
    panel_4_desc: "Implement feature code incrementally based on the approved plan, add unit tests, and perform code reviews.",
    panel_4_input: "Approved Plan",
    
    panel_5_title: "Phase 5: User Documentation & Support",
    panel_5_desc: "Write user-friendly technical documentation or guides following the Diátaxis framework.",
    panel_5_input: "Approved Spec / Source Code",
    
    // Stepper Footer
    protocol_title: "Context Injection Protocol",
    protocol_desc: "To prevent context loss, hallucinations, and to enforce strict SDLC traceability, you MUST explicitly attach, mention (e.g., using @filename), or provide the required upstream documents in the prompt context when invoking an agent. <strong>You are also highly encouraged to include other relevant files or code snippets to complete the analysis.</strong>",
    protocol_th_agent: "Agent / Phase",
    protocol_th_doc: "Required Supporting Documents",
    protocol_pm_doc: "Project Discovery Draft (OR existing PRD for updates)",
    protocol_ca_doc: "PRD, Spec, OR Plan (depending on target)",
    protocol_sa_doc: "Approved PRD (OR existing Spec for updates)",
    protocol_pa_doc: "Approved Technical Spec (OR existing Plan for updates)",
    protocol_gmd_doc: "Implementation Plan OR Bug Remediation Plan",
    protocol_ecr_doc: "Technical Spec AND Implementation Plan",
    protocol_acc_doc: "PRD, Spec, AND Plan",
    protocol_dda_doc: "PRD, Technical Spec, Implementation Plan, OR Relevant Source Code files",
    
    prompt_bea_1: '@BrainstormingExplorerAnalyst explore the codebase and write a discovery draft for the new shopping cart',
    prompt_pm_1: '@ProductManagerPRD create a PRD for the user authentication module based on @discovery-draft.md',
    prompt_ca_1: '@ClarificationAnalyst interrogate the new @prd-shopping-cart.md for missing edge cases',
    prompt_sa_1: '@SpecificationArchitect design a technical specification based on @prd-shopping-cart.md',
    prompt_acc_1: '@ArtifactConsistencyChecker verify that @spec-shopping-cart.md covers all requirements in @prd-shopping-cart.md',
    prompt_pa_1: '@PlannerArchitect create a step-by-step implementation plan based on @spec-shopping-cart.md',
    prompt_gmd_1: '@GodModeDev implement the shopping cart based on @plan-shopping-cart.md',
    prompt_ecr_1: '@ExpertCodeReviewer review my service layer and suggest refactoring',
    prompt_bra_1: '@BugRemediationArchitect analyze the bug report in @issue-123.md and propose a fix for @cart.js',
    prompt_dda_1: '@DiataxisDocumentationArchitect write an API reference guide based on @spec-shopping-cart.md',
    prompt_bea_2: '@BrainstormingExplorerAnalyst explore the codebase and write a discovery draft for the new shopping cart feature based on @business-brief.md',
    prompt_pm_2: '@ProductManagerPRD create a PRD for the shopping cart feature based on @discovery-draft.md',
    prompt_sa_2: '@SpecificationArchitect design a technical specification based on @prd-shopping-cart.md',
    prompt_pa_2: '@PlannerArchitect create a step-by-step implementation plan based on @spec-shopping-cart.md',
    prompt_gmd_2: '@GodModeDev implement the shopping cart based on @plan-shopping-cart.md, and ensure all tests pass',
    prompt_dda_2: '@DiataxisDocumentationArchitect write an API reference guide based on @spec-shopping-cart.md and @cart.js',
    prompt_bea_3: '/brainstorming-explorer explore the codebase and write a discovery draft for the new shopping cart feature based on @business-brief.md',
    prompt_pm_3: '/product-manager-prd create a PRD for the shopping cart feature based on @discovery-draft.md',
    prompt_ca_3: '/clarification-analyst interrogate the new @prd-shopping-cart.md for missing edge cases',
    prompt_sa_3: '/specification-architect design a technical specification based on @prd-shopping-cart.md',
    prompt_acc_3: '/artifact-consistency-checker verify that @spec-shopping-cart.md strictly follows @prd-shopping-cart.md',
    prompt_pa_3: '/planner-architect create a step-by-step implementation plan based on @spec-shopping-cart.md',
    prompt_gmd_3: '/god-mode-dev implement the shopping cart based on @plan-shopping-cart.md. Target files are @cart.js and @style.css',
    prompt_dda_3: '/diataxis-documentation-architect write an API reference guide based on @spec-shopping-cart.md and @cart.js',
    prompt_bra_3: '/bug-remediation-architect analyze the bug report in @issue-123.md and propose a fix for @cart.js',

    bypass_title: "SDLC Bypass (Minor Tasks)",
    bypass_desc1: "For minor emergency fixes (e.g., updating text, tweaking CSS padding, or fixing typos), you can bypass the full SDLC using the <code>[Bypass SDLC]</code> tag.",
    bypass_desc2: "Even when bypassing, it is recommended to attach the target file in your chat prompt to provide appropriate context.",
    bypass_code_sample: "@GodModeDev [Bypass SDLC] Please fix the checkout button padding in @style.css for consistency.",
    
    // Use Case Tabs
    uc_tab_sdlc: "End-to-End SDLC (@Mentions)",
    uc_tab_bypass: "SDLC Bypass (Minor Fixes)",
    uc_tab_slash: "Advanced (Slash Commands)",
    slash_title: "Autonomous Workflows with Slash Commands",
    slash_desc: "In many platforms (such as VS Code Copilot, Antigravity, OpenCode), you can invoke the agent's underlying skill directly using the slash command syntax <code>/&lt;skill-name&gt;</code>. Here is the full workflow of using slash commands for a feature development lifecycle:",
    slash_p0_title: "Exploring Codebase & Brainstorming",
    slash_p1_title: "Creating PRD & Clarifying Requirements",
    slash_p2_title: "Designing Technical Specs & Auditing Consistency",
    slash_p3_title: "Creating Implementation Plan",
    slash_p4_title: "Writing & Implementing Code",
    slash_p5_title: "Writing Documentation & Fixing Bugs",
    
    // New SDLC Slash Workflow (Tab 4)
    uc_tab_sdlc_slash: "🚀 Advanced SDLC Workflow",
    install_sdlc_warning: "<strong>Important for Advanced SDLC Workflow (Option 9 / agent-skills-sdlc):</strong> You MUST copy the <code>AGENTS.md</code> file from the <code>agent-skills-sdlc/</code> folder to your project root. After copying, edit it to:<br>1. Change the <code>[Your Application Name]</code> placeholder to your project name.<br>2. Add a brief <code>[Project Description]</code>.<br>3. Adjust the <code>Language:</code> preference to your desired output language.",
    sdlc_slash_title: "⚡ Advanced SDLC Skills Workflow",
    sdlc_slash_desc: "This highly structured workflow uses a dedicated set of slash commands specifically mapped to each SDLC phase (defined in <code>agent-skills-sdlc/AGENTS.md</code>).",
    prompt_sdlc_0: "/sdlc-explore-ideas explore the codebase and write a discovery draft for the new shopping cart feature based on @business-brief.md",
    prompt_sdlc_1a: "/sdlc-draft-prd create a PRD for the shopping cart feature based on @discovery-draft.md",
    prompt_sdlc_1b: "/sdlc-clarify-reqs interrogate the new @prd-shopping-cart.md for missing edge cases",
    prompt_sdlc_2a: "/sdlc-define-specs design a technical specification based on @prd-shopping-cart.md",
    prompt_sdlc_2b: "/sdlc-audit-consistency verify that @spec-shopping-cart.md strictly follows @prd-shopping-cart.md",
    prompt_sdlc_3: "/sdlc-plan-tasks create a step-by-step implementation plan based on @spec-shopping-cart.md",
    prompt_sdlc_4a: "/sdlc-write-code implement the shopping cart based on @plan-shopping-cart.md. Target files are @cart.js and @style.css",
    prompt_sdlc_4b: "/sdlc-code-review review my service layer and suggest refactoring",
    prompt_sdlc_5a: "/sdlc-generate-docs write an API reference guide based on @spec-shopping-cart.md and @cart.js",
    prompt_sdlc_5b: "/sdlc-bug-report analyze the bug report in @issue-123.md and propose a fix for @cart.js",
    
    // Footer
    footer_col_platform: "Supported Platforms",
    footer_col_agents: "Core Agents",
    footer_col_repo: "Repository",
    footer_guide: "Installation Guide",
    footer_contrib: "Contributing Guidelines",
    footer_license: "MIT License",
    footer_copyright: "© {year} Awesome Copilot Indonesia. Made with ❤️ by Indonesian Developers.",
    footer_lang_selector: "English (EN)",
    footer_privacy: "Privacy",
    footer_terms: "Terms",
    footer_sitemap: "Sitemap"
  },
  id: {
    // Head & General
    page_title: "Awesome Copilot Indonesia 🇮🇩 - Custom AI Agents & SDLC Workflows",
    
    // Navbar
    nav_overview: "Overview",
    nav_installation: "Instalasi",
    nav_agents: "Custom Agents",
    nav_examples: "Contoh",
    nav_cta: "Mulai Sekarang",
    
    // Hero
    hero_eyebrow: "Awesome Copilot Indonesia",
    hero_title: "Akselerasi SDLC Anda dengan Custom AI Agents",
    hero_desc: "Koleksi agen, skill, aturan, dan prompt kustom yang siap pakai untuk mengoptimalkan alur kerja AI-assisted development Anda di berbagai platform (Antigravity, Copilot, OpenCode, dll).",
    hero_cta_install: "Mulai Instalasi",
    hero_cta_agents: "Jelajahi Agen",
    console_label: "terminal",
    console_content: `<strong>$</strong> /planner-architect create a step-by-step implementation plan based on @spec-shopping-cart.md
<span class="text-muted-custom">[Fase 3] Menganalisis spec-shopping-cart.md...</span>
<span class="text-success">✔</span> Konteks tervalidasi (Ketertelusuran: 100%)
<span class="text-success">✔</span> Rencana implementasi dirancang: plan-shopping-cart.md

<strong>$</strong> /god-mode-dev implement the shopping cart based on @plan-shopping-cart.md
<span class="text-muted-custom">[Fase 4] Memuat plan-shopping-cart.md...</span>
<span class="text-info">➜</span> Tugas 1/3: Membuat framework cart service... <span class="text-success">Selesai</span>
<span class="text-info">➜</span> Tugas 2/3: Integrasi tampilan UI & styling... <span class="text-success">Selesai</span>
<span class="text-info">➜</span> Tugas 3/3: Menulis unit/integration tests... <span class="text-success">Selesai</span>
<span class="text-primary">> Menjalankan 18 pengujian di cart.spec.js...</span>
<span class="text-success">> Semua pengujian berhasil (18/18) dengan 100% cakupan!</span>`,
    
    // Overview
    overview_title: "Overview",
    overview_desc: "Awesome Copilot Indonesia adalah koleksi konfigurasi agen AI, skill, aturan, dan prompt kustom yang siap pakai untuk mempercepat siklus hidup pengembangan perangkat lunak (SDLC) Anda.",
    overview_agents_title: "Custom Agents",
    overview_agents_desc: "Agen AI khusus untuk setiap fase pengembangan (PRD, Technical Specs, Strategic Planning, Coding, hingga Review).",
    overview_skills_title: "Specialized Skills",
    overview_skills_desc: "Kemampuan khusus seperti Project Researcher untuk pemetaan arsitektur otomatis, Karpathy Guidelines, Ponytail lazy dev, dan Fable Protocol untuk eksekusi tugas otonom yang kompleks.",
    overview_rules_title: "Rules & Instructions",
    overview_rules_desc: "Panduan coding terbaik yang disesuaikan dengan bahasa pemrograman dan framework populer untuk menjaga kualitas kode Anda.",
    overview_byok_title: "BYOK Copilot Config",
    overview_byok_desc: "Template konfigurasi siap pakai untuk menggunakan API key Anda sendiri (OpenRouter, DeepSeek, dll) di VS Code Copilot Chat.",
    overview_multi_title: "Dukungan Multi-Platform",
    overview_multi_desc: "Konfigurasi siap pakai untuk Google Antigravity (`.agents`), Claude Code (`.claude`), OpenCode, Copilot, CommandCode, ChatGPT Codex, Pi Dev, dan Oh My Pi (`omp`).",
    
    // Getting Started
    install_title: "Getting Started",
    install_desc: "Pilih metode instalasi otomatis yang cepat atau lakukan instalasi manual sesuai dengan platform asisten AI yang Anda gunakan.",
    install_prereq_title: "Prasyarat Platform",
    install_method1_tab: "Metode 1: Otomatis (Rekomendasi)",
    install_method2_tab: "Metode 2: Manual",
    
    install_method1_desc: "Jalankan satu perintah (one-liner) di terminal pada direktori root proyek Anda:",
    install_method2_step1: "Clone repositori ini:",
    install_method2_step2: "Pilih konfigurasi platform Anda:",
    install_method2_step2_desc: "Salin folder platform yang relevan ke root proyek Anda. Contoh: untuk Google Antigravity, salin folder <code>.agents</code>. Untuk GitHub Copilot, salin folder <code>.github</code>.",
    install_method2_step3: "Salin file <code>AGENTS.md</code> ke root proyek:",
    install_method2_step3_desc: "<em>Penting:</em> Setelah disalin, buka <code>AGENTS.md</code> dan ubah:<br>1. Placeholder <code>[Your Application Name]</code> dengan nama proyek Anda.<br>2. Tambahkan <code>[Project Description]</code> yang singkat.<br>3. Sesuaikan preferensi <code>Language:</code> sesuai kebutuhan Anda.",
    install_general_warning: "<strong>Penting:</strong> Setelah instalasi selesai, buka file <code>AGENTS.md</code> di root proyek Anda dan ubah:<br>1. Placeholder <code>[Your Application Name]</code> dengan nama proyek Anda.<br>2. Tambahkan <code>[Project Description]</code> yang singkat.<br>3. Sesuaikan preferensi <code>Language:</code> sesuai kebutuhan Anda.",
    install_method2_step4: "Mulai ulang IDE atau Asisten AI Anda untuk menerapkan perubahan.",
    
    // Custom Agents Section
    agents_title: "Custom Agents",
    agents_desc: "Gunakan agen AI kustom yang berspesialisasi dalam peran dan tugas tertentu dalam siklus pengembangan.",
    agent_group_1: "Fase 1-3: Strategi & Spesifikasi",
    agent_group_2: "Fase 4: Eksekusi & Review",
    agent_group_3: "Fase 5: Dokumentasi",
    agent_label_best: "Paling Cocok Untuk:",
    agent_label_prompt: "Contoh Prompt Penggunaan:",
    
    agent_bea_desc: "Mengeksplorasi basis kode secara sistematis, memberikan kritik arsitektur, memetakan struktur repositori ke dalam ARCHITECTURE.md menggunakan skill Project Researcher, dan menghasilkan draft penemuan proyek awal (Phase 0 Discovery).",
    agent_bea_best: "Memahami proyek baru atau lama, menganalisis utang teknis, dan menghasilkan peta arsitektur sebelum merumuskan PRD.",
    
    agent_pm_desc: "Menghasilkan Product Requirements Document (PRD) yang komprehensif, mencakup User Stories, alur pengguna, dan kriteria penerimaan.",
    agent_pm_best: "Menulis dokumentasi kebutuhan bisnis dan fungsionalitas fitur baru sebelum spesifikasi teknis ditulis.",
    
    agent_ca_desc: "Melakukan interogasi terhadap PRD, Spesifikasi Teknis, atau Rencana Implementasi untuk menemukan ambiguitas, asumsi tersembunyi, dan edge-case yang terlewat.",
    agent_ca_best: "Pengecekan kualitas kebutuhan sebelum melangkah ke spesifikasi teknis atau penulisan kode.",
    
    agent_sa_desc: "Membuat spesifikasi teknis detail (kontrak API, skema DB, model data) dan mendokumentasikan keputusan arsitektur penting (ADR).",
    agent_sa_best: "Merancang cetak biru teknis sistem yang terstruktur sebelum mulai menulis kode.",
    
    agent_acc_desc: "Mengaudit konsistensi dan ketertelusuran dokumen (PRD vs Spec vs Plan) untuk mendeteksi hilangnya cakupan kebutuhan dan scope creep.",
    agent_acc_best: "Memastikan alur SDLC konsisten dan tidak ada fitur yang terlupa atau melenceng dari rencana awal.",
    
    agent_pa_desc: "Memecah Spesifikasi Teknis menjadi langkah-langkah implementasi strategis yang terstruktur dan dapat dieksekusi secara berurutan.",
    agent_pa_best: "Menyusun jadwal tugas coding yang terperinci dan aman sebelum developer mulai menulis kode.",
    
    agent_gmd_desc: "Agen developer otonom tingkat tinggi untuk menulis kode, melakukan modifikasi bedah, dan menulis pengujian unit/integrasi secara ketat.",
    agent_gmd_best: "Menulis kode fitur, memodifikasi file, memperbaiki error, dan menguji fungsionalitas secara langsung di workspace.",
    
    agent_ecr_desc: "Meninjau kualitas kode berdasarkan prinsip SOLID, Clean Code, dan aspek keamanan, serta memberikan rencana refaktorisasi.",
    agent_ecr_best: "Menjaga standar kebersihan kode dan melakukan audit keamanan sebelum digabungkan (merge) ke branch utama.",
    
    agent_bra_desc: "Menganalisis laporan bug, melacak akar penyebab masalah (RCA), dan menyusun rencana perbaikan bedah beserta strategi rollback yang aman.",
    agent_bra_best: "Menyelesaikan masalah bug yang kompleks di codebase tanpa merusak bagian kode lainnya.",
    
    agent_dda_desc: "Penulis dokumentasi teknis profesional yang mengikuti kerangka kerja Diátaxis (Tutorial, Panduan, Referensi, Penjelasan).",
    agent_dda_best: "Menulis panduan pengguna, dokumentasi API, dan penjelasan sistem yang mudah dipahami.",
    
    // Examples & Stepper
    examples_title: "Alur Kerja & Contoh",
    examples_desc: "Pahami bagaimana siklus hidup pengembangan perangkat lunak (SDLC) dijalankan menggunakan rangkaian agen AI secara sekuensial.",
    stepper_title: "Sekuens Alur SDLC Agen AI",
    
    step_label_0: "Discovery",
    step_label_1: "Requirements",
    step_label_2: "Specification",
    step_label_3: "Planning",
    step_label_4: "Execution",
    step_label_5: "Documentation",
    
    step_label_agent: "Agen:",
    step_label_input: "Dokumen Input:",
    
    panel_0_title: "Phase 0: Project Discovery (Penemuan Proyek)",
    panel_0_desc: "Eksplorasi kode yang ada, analisis arsitektur, dan buat draf penemuan proyek awal sebelum merancang PRD. <strong>Business Brief</strong> adalah dokumen acuan awal yang menjabarkan tujuan bisnis, fitur utama, dan ruang lingkup proyek.",
    panel_0_input: "Business Brief / Ideas",
    
    panel_1_title: "Phase 1: Requirements & Clarification (Kebutuhan & Klarifikasi)",
    panel_1_desc: "Buat PRD yang terperinci dan lakukan klarifikasi/interogasi mendalam untuk menghilangkan ambiguitas kebutuhan fitur.",
    panel_1_input: "Discovery Draft",
    
    panel_2_title: "Phase 2: Technical Specification (Spesifikasi Teknis)",
    panel_2_desc: "Rancang arsitektur detail, buat skema data, definisikan API, dan catat keputusan arsitektur penting (ADR) serta pastikan ketertelusurannya dengan PRD.",
    panel_2_input: "Approved PRD",
    
    panel_3_title: "Phase 3: Implementation Planning (Rencana Implementasi)",
    panel_3_desc: "Pecah spesifikasi teknis menjadi langkah-langkah implementasi strategis dan buat checklist rencana coding yang aman.",
    panel_3_input: "Approved Spec",
    
    panel_4_title: "Phase 4: Execution & Review (Eksekusi Kode & Tinjauan)",
    panel_4_desc: "Tulis kode fitur secara bertahap dan teratur berdasarkan rencana yang disetujui, tambahkan pengujian unit, serta lakukan peninjauan kode.",
    panel_4_input: "Approved Plan",
    
    panel_5_title: "Phase 5: User Documentation & Support (Dokumentasi Pengguna)",
    panel_5_desc: "Tulis dokumentasi teknis atau panduan pengguna yang ramah dan terstruktur mengikuti standar Diátaxis.",
    panel_5_input: "Approved Spec / Source Code",
    
    // Stepper Footer
    protocol_title: "Protokol Injeksi Konteks",
    protocol_desc: "Untuk mencegah hilangnya konteks, halusinasi, dan untuk menegakkan keterlacakan SDLC yang ketat, Anda WAJIB melampirkan secara eksplisit, menyebutkan (misalnya menggunakan @filename), atau menyediakan dokumen hulu yang diperlukan dalam konteks prompt saat memanggil agen. <strong>Anda juga sangat disarankan untuk menyertakan file atau potongan kode relevan lainnya untuk melengkapi analisis.</strong>",
    protocol_th_agent: "Agen / Fase",
    protocol_th_doc: "Dokumen Pendukung Wajib",
    protocol_pm_doc: "Project Discovery Draft (atau PRD yang ada)",
    protocol_ca_doc: "PRD, Spec, ATAU Plan (tergantung target)",
    protocol_sa_doc: "PRD yang telah disetujui",
    protocol_pa_doc: "Spesifikasi Teknis yang disetujui",
    protocol_gmd_doc: "Rencana Implementasi ATAU Rencana Perbaikan Bug",
    protocol_ecr_doc: "Spesifikasi Teknis DAN Rencana Implementasi",
    protocol_acc_doc: "PRD, Spec, DAN Plan",
    protocol_dda_doc: "PRD, Spesifikasi Teknis, Rencana Implementasi, ATAU File Source Code Relevan",
    
    prompt_bea_1: '@BrainstormingExplorerAnalyst telusuri basis kode ini dan tulis draf penemuan untuk keranjang belanja baru',
    prompt_pm_1: '@ProductManagerPRD buat PRD untuk modul autentikasi pengguna berdasarkan @discovery-draft.md',
    prompt_ca_1: '@ClarificationAnalyst interogasi @prd-shopping-cart.md baru untuk mencari edge case yang terlewat',
    prompt_sa_1: '@SpecificationArchitect rancang spesifikasi teknis berdasarkan @prd-shopping-cart.md',
    prompt_acc_1: '@ArtifactConsistencyChecker verifikasi bahwa @spec-shopping-cart.md mencakup semua kebutuhan di @prd-shopping-cart.md',
    prompt_pa_1: '@PlannerArchitect buat rencana implementasi bertahap berdasarkan @spec-shopping-cart.md',
    prompt_gmd_1: '@GodModeDev implementasikan keranjang belanja berdasarkan @plan-shopping-cart.md',
    prompt_ecr_1: '@ExpertCodeReviewer tinjau lapisan layanan (service layer) saya dan berikan saran refactoring',
    prompt_bra_1: '@BugRemediationArchitect analisis laporan bug di @issue-123.md dan usulkan perbaikan untuk @cart.js',
    prompt_dda_1: '@DiataxisDocumentationArchitect tulis panduan referensi API berdasarkan @spec-shopping-cart.md',
    prompt_bea_2: '@BrainstormingExplorerAnalyst telusuri basis kode ini dan tulis draf penemuan untuk fitur keranjang belanja baru berdasarkan @business-brief.md',
    prompt_pm_2: '@ProductManagerPRD buat PRD untuk fitur keranjang belanja berdasarkan @discovery-draft.md',
    prompt_sa_2: '@SpecificationArchitect rancang spesifikasi teknis berdasarkan @prd-shopping-cart.md',
    prompt_pa_2: '@PlannerArchitect buat rencana implementasi bertahap berdasarkan @spec-shopping-cart.md',
    prompt_gmd_2: '@GodModeDev implementasikan keranjang belanja berdasarkan @plan-shopping-cart.md, dan pastikan semua tes lulus',
    prompt_dda_2: '@DiataxisDocumentationArchitect tulis panduan referensi API berdasarkan @spec-shopping-cart.md dan @cart.js',
    prompt_bea_3: '/brainstorming-explorer telusuri basis kode ini dan tulis draf penemuan untuk fitur keranjang belanja baru berdasarkan @business-brief.md',
    prompt_pm_3: '/product-manager-prd buat PRD untuk fitur keranjang belanja berdasarkan @discovery-draft.md',
    prompt_ca_3: '/clarification-analyst interogasi @prd-shopping-cart.md baru untuk mencari edge case yang terlewat',
    prompt_sa_3: '/specification-architect rancang spesifikasi teknis berdasarkan @prd-shopping-cart.md',
    prompt_acc_3: '/artifact-consistency-checker verifikasi bahwa @spec-shopping-cart.md secara ketat mengikuti @prd-shopping-cart.md',
    prompt_pa_3: '/planner-architect buat rencana implementasi bertahap berdasarkan @spec-shopping-cart.md',
    prompt_gmd_3: '/god-mode-dev implementasikan keranjang belanja berdasarkan @plan-shopping-cart.md. File target adalah @cart.js dan @style.css',
    prompt_dda_3: '/diataxis-documentation-architect tulis panduan referensi API berdasarkan @spec-shopping-cart.md dan @cart.js',
    prompt_bra_3: '/bug-remediation-architect analisis laporan bug di @issue-123.md dan usulkan perbaikan untuk @cart.js',

    bypass_title: "Bypass SDLC (Pekerjaan Minor)",
    bypass_desc1: "Untuk perbaikan kecil yang bersifat darurat (misal: mengganti teks, memperbaiki padding CSS, atau memperbaiki typo), Anda dapat melewati tahapan SDLC penuh menggunakan bendera penunjuk <code>[Bypass SDLC]</code>.",
    bypass_desc2: "Meskipun di-bypass, Anda tetap disarankan untuk melampirkan file yang akan dimodifikasi di dalam prompt obrolan Anda untuk memberikan konteks yang tepat.",
    bypass_code_sample: "@GodModeDev [Bypass SDLC] Tolong perbaiki padding tombol checkout di @style.css agar konsisten.",
    
    // Use Case Tabs
    uc_tab_sdlc: "End-to-End SDLC (@Mentions)",
    uc_tab_bypass: "SDLC Bypass (Perbaikan Minor)",
    uc_tab_slash: "Lanjutan (Slash Commands)",
    slash_title: "Alur Kerja Mandiri dengan Slash Commands",
    slash_desc: "Di sebagian besar platform (seperti VS Code Copilot, Antigravity, OpenCode), Anda dapat memanggil keahlian (skill) agen secara langsung menggunakan perintah garis miring (slash commands) <code>/&lt;nama-skill&gt;</code>. Berikut alur lengkap penggunaan perintah slash untuk siklus hidup pengembangan fitur:",
    slash_p0_title: "Mengeksplorasi Codebase & Brainstorming",
    slash_p1_title: "Membuat PRD & Mengklarifikasi Kebutuhan",
    slash_p2_title: "Menyusun Spek Teknis & Memeriksa Konsistensi",
    slash_p3_title: "Menyusun Rencana Implementasi",
    slash_p4_title: "Menulis & Mengimplementasikan Kode",
    slash_p5_title: "Menulis Dokumentasi & Memperbaiki Bug",
    
    // New SDLC Slash Workflow (Tab 4)
    uc_tab_sdlc_slash: "🚀 Advanced SDLC Workflow",
    install_sdlc_warning: "<strong>Penting untuk Advanced SDLC Workflow (Opsi 9 / agent-skills-sdlc):</strong> Anda WAJIB menyalin file <code>AGENTS.md</code> dari dalam folder <code>agent-skills-sdlc/</code> ke root proyek Anda. Setelah disalin, buka dan ubah:<br>1. Placeholder <code>[Your Application Name]</code> dengan nama proyek Anda.<br>2. Tambahkan <code>[Project Description]</code> yang singkat.<br>3. Sesuaikan preferensi <code>Language:</code> sesuai kebutuhan Anda.",
    sdlc_slash_title: "⚡ Alur Kerja Mandiri Advanced SDLC Skills",
    sdlc_slash_desc: "Alur kerja terstruktur ini menggunakan set perintah slash khusus yang dipetakan ke setiap fase SDLC (seperti yang didefinisikan dalam <code>agent-skills-sdlc/AGENTS.md</code>).",
    prompt_sdlc_0: "/sdlc-explore-ideas telusuri basis kode ini dan tulis draf penemuan untuk fitur keranjang belanja baru berdasarkan @business-brief.md",
    prompt_sdlc_1a: "/sdlc-draft-prd buat PRD untuk fitur keranjang belanja berdasarkan @discovery-draft.md",
    prompt_sdlc_1b: "/sdlc-clarify-reqs interogasi @prd-shopping-cart.md baru untuk mencari edge case yang terlewat",
    prompt_sdlc_2a: "/sdlc-define-specs rancang spesifikasi teknis berdasarkan @prd-shopping-cart.md",
    prompt_sdlc_2b: "/sdlc-audit-consistency verifikasi bahwa @spec-shopping-cart.md secara ketat mengikuti @prd-shopping-cart.md",
    prompt_sdlc_3: "/sdlc-plan-tasks buat rencana implementasi bertahap berdasarkan @spec-shopping-cart.md",
    prompt_sdlc_4a: "/sdlc-write-code implementasikan keranjang belanja berdasarkan @plan-shopping-cart.md. File target adalah @cart.js dan @style.css",
    prompt_sdlc_4b: "/sdlc-code-review tinjau lapisan layanan (service layer) saya dan berikan saran refactoring",
    prompt_sdlc_5a: "/sdlc-generate-docs tulis panduan referensi API berdasarkan @spec-shopping-cart.md dan @cart.js",
    prompt_sdlc_5b: "/sdlc-bug-report analisis laporan bug di @issue-123.md dan usulkan perbaikan untuk @cart.js",
    
    // Footer
    footer_col_platform: "Platform Dukungan",
    footer_col_agents: "Agen Utama",
    footer_col_repo: "Repositori",
    footer_guide: "Panduan Instalasi",
    footer_contrib: "Pedoman Kontribusi",
    footer_license: "Lisensi MIT",
    footer_copyright: "© {year} Awesome Copilot Indonesia. Made with ❤️ by Indonesian Developers.",
    footer_lang_selector: "Bahasa Indonesia (ID)",
    footer_privacy: "Privasi",
    footer_terms: "Ketentuan",
    footer_sitemap: "Sitemap"
  }
};
