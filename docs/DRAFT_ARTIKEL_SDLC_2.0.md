# Dari Ide ke Kode dengan SDLC 2.0: Mengorkestrasi Custom Agent AI dalam Metodologi Github Spec Kit

<placeholder gambar sampul/banner artikel>

Dunia rekayasa perangkat lunak (software engineering) sedang berubah dengan kecepatan yang belum pernah terjadi sebelumnya. Jika beberapa tahun lalu kita sudah cukup takjub dengan AI yang bisa melakukan autocomplete pada fungsi sederhana, kini kita berada di era di mana AI generatif mampu mengeksekusi proyek dari hulu ke hilir.

Namun, ada satu realitas pahit yang sering disembunyikan oleh euforia teknologi ini: **AI yang hebat tanpa orkestrasi yang jelas hanya akan menghasilkan “kode spaghetti” dengan kecepatan super.** Bayangkan Anda sedang membangun aplikasi mobile berskala besar. Anda memberikan prompt sederhana: “Buatkan fitur autentikasi dan profil pengguna.” Tanpa batasan yang jelas, AI akan langsung mengambil inisiatif sendiri. Ia mungkin akan merangkai state management sesuka hati, mengabaikan injeksi dependensi, dan menabrak prinsip Clean Architecture yang sudah susah payah Anda bangun. Kode tersebut mungkin bisa berjalan (berhasil di-compile), tetapi ketika saatnya tiba untuk pemeliharaan (maintenance) atau penambahan fitur, Anda akan berhadapan dengan utang teknis (technical debt) yang menggunung.

Inilah alasan mengapa kita tidak bisa lagi menggunakan cara lama. Pada artikel sebelumnya, kita telah membahas bagaimana memecah Software Development Life Cycle (SDLC) ke dalam orkestrasi custom agents. Kini, setelah berbagai eksperimen dan iterasi tingkat lanjut, saatnya kita melakukan upgrade ke versi 2.0.

Dalam pembaruan ini, kita mengadopsi pendekatan Github Spec Kit, sebuah metodologi yang secara harafiah memaksa AI untuk berpikir layaknya seorang Senior Software Architect sebelum ia berani menyentuh satu baris kode pun. Pendekatan ini adalah inti dari filosofi Vibe Coding, di mana Anda bertindak sebagai pengarah (sutradara) yang berinteraksi dengan AI secara otonom dan iteratif, namun dengan guardrails (pagar pembatas) yang sangat ketat.

Kabar baiknya? Semua agen spesialis yang akan kita bahas di artikel ini telah saya kumpulkan, sempurnakan, dan buka untuk publik (open-source) di repositori GitHub [Awesome Copilot Indonesia](https://github.com/GulajavaMinistudio/awesome-copilot-id).

Mari kita bedah bagaimana mengatur orkestra AI tingkat dewa ini, dari sebuah ide abstrak hingga peluncuran produksi.

## Mengakhiri “Halusinasi Asumsi” AI dengan Spec Kit

Masalah fundamental dari AI coding saat ini adalah “halusinasi asumtif”. Saat menghadapi kebingungan atau kekosongan konteks, model bahasa (Large Language Models) cenderung menebak-nebak daripada bertanya.

Pendekatan Spec Kit menyelesaikan masalah ini dengan mencabut kebebasan AI untuk menebak. Kita memisahkan siklus hidup pengembangan ke dalam serangkaian dokumen statis berbasis teks biasa (Markdown), dan mewajibkan persetujuan (approval) di setiap titik transisinya. Alurnya menjadi sangat linier, disiplin, dan deterministik:

**DISCOVERY ➡️ PRD ➡️ INTEROGASI ➡️ SPEC ➡️ KONSISTENSI ➡️ PLAN ➡️ KODE ➡️ DOKUMENTASI**

Kita memecah beban kerja ini kepada serangkaian *skills* spesialis yang dieksekusi melalui **Slash Commands (`/`)**. Setiap perintah dipersenjatai dengan protokol “Zero Assumption” — jika mereka bingung, instruksinya ambigu, atau konteksnya kurang, mereka dilarang keras berasumsi dan wajib berhenti untuk bertanya kepada Anda (Pushback/Refuse).

### Lebih dari Sekadar Agen: Ekosistem Multi-Platform (Single Source of Truth)
Dalam pembaruan terbaru, repositori Awesome Copilot ID tidak lagi memerlukan duplikasi folder terpisah untuk tiap editor AI. Kita mengadopsi arsitektur **Single Source of Truth**:

- **Struktur Terpusat (`.agents/`):** Seluruh *skills*, SOP, instruksi spesialis, dan persona AI disimpan di direktori `.agents/skills/`.
- **Aturan Induk (`AGENTS.md`):** Satu file *rulebook* global di *root* proyek yang menjadi pedoman standar coding, arsitektur, dan bahasa bagi semua agen AI.
- **Dukungan 9 Platform Sekaligus:** Seluruh ekosistem ini sekarang bersifat multi-platform dan siap digunakan secara native untuk **GitHub Copilot**, **Google Antigravity**, **OpenCode**, **CommandCode**, **ChatGPT Codex**, **Pi Dev Coding Agent** (`pi.dev`), **Oh My Pi** (`omp.sh`), **Claude Code** (via `.claude/`), dan **Cursor** (via `.cursor/`).

---

## Orkestra Fase SDLC Bersama Spesialis AI (Slash Commands)

<placeholder gambar ALUR KERJA PENGEMBANGAN AGEN AI: GITHUB SPEC KIT - WAJIB DIUPDATE label agen dari @ menjadi /slash-command>

Di dalam repositori Awesome Copilot Indonesia, sistem pemanggilan agen kini telah berevolusi. Kita tidak lagi menggunakan format mention (`@agent`) untuk sekadar mengajak AI berdiskusi. Sebagai gantinya, kita memicu eksekusi *skill* secara deterministik menggunakan **Slash Commands (`/`)**. Setiap perintah memiliki batasan wewenang yang tegas. 

Berikut adalah bagaimana mereka bekerja secara estafet:

### Fase 0: Discovery & Onboarding (`/sdlc-explore-ideas`)
Bagaimana jika Anda tidak memulai proyek dari nol, melainkan masuk ke codebase legacy yang minim dokumentasi? Di sinilah SDLC 2.0 dimulai dengan Fase 0.

Alih-alih menyuruh AI langsung menebak dan memodifikasi kode, kita menjalankan skill `/sdlc-explore-ideas`. Agen ini bertindak murni dengan persona *Senior Staff Engineer* yang bersifat *read-only*. Tugasnya adalah memetakan titik masuk (entry points), mendeteksi tumpukan *tech debt*, dan mengkritisi struktur kode saat ini (misalnya, mengingatkan jika logika bisnis bocor ke UI layer, menyalahi prinsip Clean Architecture).

**Superpower agen ini:** Setelah ia selesai melakukan *brainstorming* interaktif dengan Anda, ia akan proaktif menawarkan pembuatan dokumen “Project Discovery Draft”. Dokumen mentah inilah yang nantinya akan diserahkan ke agen Product Manager di Fase 1 agar penyusunan fitur baru tidak menabrak batasan arsitektur yang sudah ada.

### Fase 1: Ideation & Product Definition (`/sdlc-draft-prd`)
Semuanya dimulai dari masalah bisnis. Kesalahan fatal developer adalah langsung memikirkan skema database saat mendengar ide baru. Di fase ini, kita mengeksekusi `/sdlc-draft-prd`. Ia memiliki aturan keras: **Dilarang menulis atau mengeksekusi kode.** Tugas utamanya adalah mewawancarai Anda. Ia akan menggali metrik kesuksesan, target pengguna, dan yang paling penting: Non-Goals (apa yang TIDAK masuk dalam cakupan rilis ini). Hasil akhirnya adalah dokumen `prd.md` yang memuat *User Stories* terstruktur dan *Acceptance Criteria* yang sangat jelas.

### Fase 2: Interogasi & Resolusi Ambiguitas (`/sdlc-clarify-reqs`)
Sebuah PRD sering kali masih menyimpan celah logika yang tak terlihat. Di sinilah `/sdlc-clarify-reqs` masuk mengambil peran sebagai *Devil's Advocate*. Alih-alih menyetujui segalanya, perintah ini akan memicu AI untuk "menyerang" dokumen Anda dengan pertanyaan ekstrem (interogasi). *Bagaimana jika pengguna kehilangan koneksi internet saat fungsi ini dipanggil? Apa yang terjadi pada antrean data jika API pihak ketiga mengalami timeout?* Agen ini memaksa Anda menambal semua *edge cases* (kasus tepi) sebelum kode apa pun ditulis.

**Mengadopsi Protokol “Grill Me”**
Seringkali, saat AI disuruh menganalisis dokumen, ia akan memberondong kita dengan daftar 10 pertanyaan terbuka yang melelahkan secara kognitif (*Machine Gun Questioning*). Dengan protokol *Grill Me*, kita memaksa agen untuk mematuhi dua aturan ketat:
1. **Bertanya Satu Per Satu:** AI hanya boleh menanyakan satu ambiguitas dalam satu waktu.
2. **Do the Heavy Lifting:** AI diwajibkan memberikan opsi teknis yang konkret berdasarkan analisis codebase (Misal: "Opsi A: Retry 3x di background, Opsi B: Tampilkan tombol Try Again ke user. Saya merekomendasikan opsi A").

Semua keputusan krusial (terutama yang *hard-to-reverse*) dari sesi ini akan otomatis dibekukan menjadi dokumen **Architecture Decision Record (ADR)**.

> [!TIP]
> **Quality Gate: Readiness Score (40/30/30)**
> Untuk mencegah siklus perdebatan dokumen tanpa akhir (*infinite clarification loop*), agen audit menggunakan formula skor kesiapan: **Kelengkapan (40%)**, **Kejelasan (30%)**, dan **Keselarasan (30%)**. Dokumen hanya dinyatakan resmi layak lanjut ke fase berikutnya jika mencapai skor $\ge 80/100$.

### Fase 3: Terjemahan Teknis Arsitektur (`/sdlc-define-specs`)
Setelah logika bisnis dipastikan kedap air, kita serahkan dokumen `prd.md` ke `/sdlc-define-specs`. Agen ini adalah jembatannya. Ia membaca PRD, menelusuri basis kode yang ada, dan merumuskan dokumen kontrak teknis di direktori `/spec/`. Dokumen ini mendefinisikan *interface*, kontrak data (skema JSON/tipe data statis), dan menegakkan aturan Clean Architecture.

Sebagai bagian dari **Mandatory Upstream Documents Protocol**, agen ini akan otomatis menolak bekerja (*pushback*) jika Anda tidak melampirkan konteks PRD atau dokumen hulu sebelumnya!

*(Catatan Efisiensi: Jika Anda memilih jalan pintas "PRD Bypass", agen Spec akan melakukan Heavy Lifting dengan menebak detail teknis yang belum ada dan menandainya dengan tag `[ASSUMPTION]` agar dapat diuji di fase berikutnya).*

### Fase 4: Pengecekan Konsistensi Silang (`/sdlc-audit-consistency`)
Ini adalah pos pemeriksaan keamanan. Sebelum rencana eksekusi final dikunci, `/sdlc-audit-consistency` akan mengaudit dokumen `/spec/` dan menyandingkannya dengan `prd.md`. Tugas utamanya adalah validasi *traceability* (keterlacakan). Ia memastikan tidak ada satu pun requirements bisnis yang tertinggal dari spesifikasi teknis, dan sebaliknya, tidak ada fitur "siluman" yang ditambahkan ke dalam spek tanpa pernah diminta oleh PRD.

### Fase 5: Rencana Eksekusi Bertahap (`/sdlc-plan-tasks`)
Dokumen `/spec/` yang sudah divalidasi kemudian dieksekusi dengan `/sdlc-plan-tasks`. Tugas spesialis ini adalah memecah spesifikasi arsitektur menjadi tugas-tugas atomik berkonsep **Tracer Bullets (Vertical Slicing)** di dalam direktori `/plan/`.

Alih-alih memotong kode secara horizontal (*layer-by-layer* yang sulit diuji), *tracer bullets* memotong dari database, logika bisnis, hingga UI dalam irisan vertikal tipis yang bisa langsung didemokan dan diverifikasi. Di setiap akhir tabel implementasi pada dokumen Markdown, agen ini menyisipkan rem pengaman: perintah **VERIFY** (wajib lulus unit/integration test) dan **APPROVAL** (AI wajib berhenti total dan menunggu lampu hijau dari Anda).

### Fase 6: Eksekusi Kode Presisi (`/sdlc-write-code`)
Kini, panggung diserahkan kepada eksekutor utama kita menggunakan perintah `/sdlc-write-code`. Berbekal **Karpathy Guidelines**, perintah ini mengeksekusi agen layaknya mesin presisi tingkat tinggi. Karena semua beban kognitif (arsitektur, perancangan, validasi) telah diurus oleh dokumen `/plan/`, agen ini bisa fokus 100% pada penulisan kode (*Surgical Changes* & *Simplicity First*).

> [!IMPORTANT]
> **Jalur Cepat (Escape Hatch): `/code-janitor`**
> Bagaimana jika Anda hanya ingin memperbaiki *typo*, mengubah padding CSS, atau *minor refactor* satu fungsi? Menjalankan siklus penuh PRD ➔ Spec ➔ Plan tentu terlalu berlebihan.
> Untuk kebutuhan ad-hoc seperti ini, Anda dapat langsung memanggil **`/code-janitor`**. Utilitas ini memadukan perencanaan mikro dan eksekusi instan dalam satu tarikan napas, melewati birokrasi dokumen SDLC standar namun tetap menjaga kerapian kode tanpa komplikasi.

### Fase 7: Quality Assurance & Remediasi Cerdas
Kode yang ditulis, sebaik apa pun, tetap butuh pengawasan independen:
- **`/sdlc-code-review`**: Skill ini membedah *Pull Request* atau *commit* lokal Anda. Ia menganalisis pelanggaran *Clean Code* dan mengaudit celah keamanan (OWASP Top 10) untuk menghasilkan rencana refactoring formal.
- **`/sdlc-bug-report`**: Saat sistem mengalami masalah, agen ini menolak tebak-tebakan (*Detective Protocol*). Ia meminta *stack trace*, menganalisis *root cause*, dan menerapkan filosofi **Test-Driven Bug Fixing (TDBF)** dengan *Prove-It Pattern*: wajib menulis test yang GAGAL mereproduksi bug terlebih dahulu sebelum menyentuh kode aplikasi, dilengkapi prosedur *rollback*.

### Fase 8: Dokumentasi Standar Industri (`/sdlc-generate-docs`)
Dokumentasi yang buruk sama bahayanya dengan kode yang buruk. Agen pamungkas ini mengadopsi standar global **Diátaxis Framework**. Sebelum menulis satu kata pun, ia akan mengklasifikasikan dokumen ke dalam 4 kuadran: **Tutorial** (pembelajaran langkah demi langkah), **How-To** (resep solusi masalah), **Reference** (spesifikasi faktual API), atau **Explanation** (penjelasan konsep arsitektur).

*(Tips Tambahan: Anda juga dapat memanggil **`/sdlc-map-architecture`** kapan pun untuk memindai struktur direktori proyek secara otomatis dan membekukannya menjadi peta topografi hidup di `docs/ARCHITECTURE.md`).*

---

## Memilih “Otak” yang Tepat: Strategi Model AI (Thinking vs. Execution)

Satu kesalahan yang sering dilakukan oleh developer saat menggunakan orkestrasi AI adalah menggunakan model (LLM) yang sama untuk setiap tugas. Padahal, rekayasa perangkat lunak membutuhkan dua jenis kecerdasan yang berbeda: **Logika Mendalam (Thinking/Reasoning)** dan **Tindakan Cepat (Execution/Coding)**.

Agar workflow di atas berjalan optimal, Anda disarankan memasangkan *slash command* dengan model AI yang tepat:

| Kategori Model | Karakteristik & Rekomendasi Model | Kecocokan Slash Command |
| :--- | :--- | :--- |
| **1. Model “Pemikir”<br/>*(Thinking & Reasoning)*** | Memiliki parameter besar, kemampuan penalaran mendalam (*deep reasoning*), sangat teliti mendeteksi cacat logika arsitektur.<br/><br/>**Rekomendasi:**<br/>• Claude 3.7 Sonnet (*Thinking Mode*) / Claude 3.5 Sonnet<br/>• Gemini 2.5 Pro / Gemini 1.5 Pro<br/>• OpenAI o3-mini / GPT-4o<br/>• DeepSeek R1 | • `/sdlc-draft-prd`<br/>• `/sdlc-clarify-reqs`<br/>• `/sdlc-define-specs`<br/>• `/sdlc-plan-tasks`<br/>• `/sdlc-code-review` |
| **2. Model “Eksekutor”<br/>*(Action & Coding)*** | Latensi sangat rendah, gesit (*agile*), konteks raksasa, dioptimalkan secara khusus (*fine-tuned*) untuk sintaks pemrograman, eksekusi terminal, dan modifikasi file bedah.<br/><br/>**Rekomendasi:**<br/>• Claude 3.7 / 3.5 Sonnet (*Standard Coding*)<br/>• Gemini 2.5 Flash / Gemini 2.0 Flash<br/>• DeepSeek V3 / Qwen 2.5 Coder | • `/sdlc-write-code`<br/>• `/code-janitor`<br/>• `/sdlc-audit-consistency`<br/>• `/sdlc-generate-docs`<br/>• `/sdlc-map-architecture` |

Dengan memisahkan model berdasarkan spesialisasinya, Anda tidak hanya meningkatkan kualitas produk akhir, namun juga mengoptimalkan kecepatan workflow dan menghemat biaya API secara drastis.

---

## Ekosistem yang Menyatu (The Vibe Coding Setup)

<placeholder gambar panel komik kucing ilustrasi setiap agent yang berjalan - WAJIB DIUPDATE textnya jadi /slash-command>

Bagi Anda yang menyukai alur kerja minimalis namun bertenaga ekstrem, pendekatan SDLC ini terasa sangat magis jika diintegrasikan dengan tools yang tepat.

Bayangkan setup berikut:
- Di monitor sebelah kiri, Anda membuka **Google Antigravity** atau **VS Code** sebagai teks editor utama untuk membaca dan menyunting ide-ide PRD, Spec, dan Plan secara asinkron.
- Di monitor sebelah kanan, Anda menjalankan terminal **OpenCode** atau **CommandCode** sebagai mesin eksekutor agen.

Saat Anda menyimpan dokumen di editor, agen di terminal dapat membaca perubahan file Markdown tersebut secara *real-time* dan langsung mengeksekusi langkah berikutnya. Semuanya saling berkomunikasi melalui satu *single source of truth*: **kontrak teks Markdown**. Bersih, deterministik, dan Anda memegang kendali 100%.

---

## 3 Cara Mudah Memasang Ekosistem ke Proyek Anda

Anda tidak perlu lagi menyalin file satu per satu ke banyak folder. Repositori Awesome Copilot Indonesia kini menyediakan 3 metode instalasi yang sangat fleksibel:

<placeholder gambar: Terminal saat menjalankan instalasi via npx skills atau install script>

### Metode 1: Agentic Installation via `npx skills` (Paling Direkomendasikan! 🚀)
Jika Anda menggunakan editor berbasis agen modern (seperti Google Antigravity, Cursor, Claude Code, atau GitHub Copilot), Anda cukup mengunduh *bootstrapper* resmi menggunakan CLI `skills`:

```bash
npx skills add GulajavaMinistudio/awesome-copilot-id/.agents/skills/sdlc-init
```

Setelah terpasang, buka kolom *chat* AI Anda dan jalankan perintah:

```text
/sdlc-init setup this project
```

Secara otonom, agen *bootstrapper* akan mengunduh seluruh arsitektur `.agents/`, mengonfigurasi `AGENTS.md`, menyelaraskan aturan bahasa proyek, dan menyiapkan seluruh *slash commands* untuk Anda. Sangat elegan!

---

### Metode 2: Skrip Otomatis Satu Baris (One-Liner Script)
Buka terminal di *root directory* proyek Anda dan jalankan perintah berikut:

- **Linux / macOS (Bash/Zsh):**
  ```bash
  curl -fsSL https://raw.githubusercontent.com/GulajavaMinistudio/awesome-copilot-id/main/install.sh | bash
  ```
- **Windows Terminal (PowerShell):**
  ```powershell
  irm https://raw.githubusercontent.com/GulajavaMinistudio/awesome-copilot-id/main/install.ps1 | iex
  ```

Skrip interaktif ini akan menanyakan paket yang Anda inginkan (Standar SDLC atau TDD-Spec) dan otomatis memetakan file ke direktori target yang sesuai (`.agents/`, `.claude/`, atau `.cursor/`).

---

### Metode 3: Manual Copy (Single Source of Truth)
Bagi Anda yang lebih suka menyalin secara manual:
1. *Clone* repositori: `git clone https://github.com/GulajavaMinistudio/awesome-copilot-id.git`
2. Salin folder `.agents/` dan file `AGENTS.md` langsung ke *root directory* proyek Anda. *(Untuk Claude Code salin isi `.agents/` ke `.claude/`, dan untuk Cursor ke `.cursor/`)*.
3. Buka file `AGENTS.md` dan sesuaikan nama proyek serta preferensi bahasa komunikasi di dalamnya.

Selesai! Sekarang Anda dapat langsung mengetikkan perintah di chat seperti:
```text
/sdlc-clarify-reqs tolong interogasi dokumen @prd.md ini
/sdlc-write-code implementasikan fitur keranjang belanja berdasarkan @plan.md
```

---

## Fitur Ekosistem Unggulan Lainnya

Selain 12 fase SDLC standar di atas, repositori Awesome Copilot ID terus berkembang dengan fitur-fitur mutakhir yang sayang untuk dilewatkan:

### 1. 🧪 TDD-Spec SDLC Package (21 Skills untuk Penganut Test-First)
Bagi tim yang menerapkan standar rekayasa perangkat lunak ultra-ketat, repositori ini menyediakan paket kembar: **TDD-Spec SDLC** (tersedia di direktori `tdd-spec-skills/`). Paket ini memuat 21 *skills* spesialis (`/tdd-*`) yang menegakkan:
- **Red-Green-Refactor Murni:** Menolak menulis kode sebelum unit test yang gagal ditulis terlebih dahulu (*Floor-Guard anti-cheat*).
- **Living Architecture Maps (`docs/ARCHITECTURE.md`):** Pemetaan *test seams* dan struktur aplikasi secara otomatis.
- **Navigator Proyek Interaktif (`/tdd-ask-help`):** AI pemandu yang mendeteksi artefak proyek Anda dan memandu langkah berikutnya secara sokratik.

### 2. 🔑 BYOK (Bring Your Own Key) Copilot Config
Ingin menggunakan model AI murah atau gratis seperti DeepSeek V3/R1, Qwen, atau OpenRouter di dalam GitHub Copilot VS Code tanpa langganan mahal?
Repositori ini menyediakan template siap pakai di folder `byok-copilot-config/` (`chatLanguageModels.json`). Anda cukup memasukkan API Key pribadi Anda untuk membuka deretan model LLM kustom langsung di dalam Copilot Chat!

---

## Kesimpulan

Membangun perangkat lunak di era AI generatif bukan tentang menyerahkan seluruh kemudi kepada mesin, melainkan tentang **membangun batasan (*guardrails*) yang cerdas**.

<placeholder gambar Ilustrasi Alur SDLC dengan Spec Kit dan AI Workflow (diagram kompleks) - WAJIB DIUPDATE label agen dari @ menjadi /slash-command>

Dengan memecah siklus hidup pengembangan ke dalam orkestra perintah spesifik, mengawalnya dengan dokumen teks statis melalui metodologi Github Spec Kit, dan menugaskan model AI (*Thinking vs. Execution*) pada tempat yang tepat, kita memastikan kecepatan penulisan kode tidak pernah mengorbankan kualitas produk dan integritas arsitektur.

Tertarik mencoba dan membangun ulang cara Anda memproduksi kode? Silakan pelajari, gunakan, dan *fork* ekosistem ini secara bebas dari repositori resminya:

👉 **[GitHub: GulajavaMinistudio/awesome-copilot-id](https://github.com/GulajavaMinistudio/awesome-copilot-id)**

Mari ubah paradigma kita dalam menulis perangkat lunak. Jika ada pertanyaan, jangan ragu untuk meninggalkan pesan di kolom komentar. *Happy Vibe Coding!* 🚀🚀🚀
