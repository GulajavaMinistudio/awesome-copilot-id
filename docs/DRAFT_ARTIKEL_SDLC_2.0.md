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

**PRD ➡️ INTEROGASI ➡️ SPEC ➡️ VALIDASI ➡️ PLAN ➡️ KODE ➡️ DOKUMENTASI**

Kita memecah beban kerja ini kepada serangkaian *slash commands* yang mewakili agen spesialis. Setiap *skill* dipersenjatai dengan protokol “Zero Assumption” — jika mereka bingung, instruksinya ambigu, atau konteksnya kurang, mereka dilarang keras berasumsi dan wajib berhenti untuk bertanya kepada Anda (Pushback/Refuse).

### Lebih dari Sekadar Agent: Ekosistem Multi-Platform
Dalam pembaruan terbaru, repositori Awesome Copilot ID tidak hanya berisi Custom Agents untuk diajak mengobrol, melainkan sebuah ekosistem utuh berbasis eksekusi skill yang terdiri dari:

- **Agents & Skills (Slash Commands):** “Otak” spesialis AI yang dipanggil dengan format `/slash-command` untuk menjalankan alur kerja (SOP) spesifik secara berurutan.
- **Guardrails (Instructions / Rules):** File markdown global (seperti `AGENTS.md`) yang memaksa standar coding dan arsitektur yang ketat di seluruh proyek.
- **Otomatisasi (Prompts):** Perintah jalan pintas untuk mengeksekusi tugas berulang secara instan tanpa perlu mengetik prompt panjang.

*Catatan: Seluruh ekosistem ini sekarang bersifat multi-platform. Semua komponen di atas siap digunakan secara native untuk GitHub Copilot, OpenCode, CommandCode, dan Google Antigravity.*

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
Seringkali, saat AI disuruh menganalisis dokumen, ia akan memberondong kita dengan daftar 10 pertanyaan terbuka yang melelahkan secara kognitif (Machine Gun Questioning). Dengan protokol *Grill Me*, kita memaksa agen untuk mematuhi dua aturan ketat:
1. **Bertanya Satu Per Satu:** AI hanya boleh menanyakan satu ambiguitas dalam satu waktu.
2. **Do the Heavy Lifting:** AI diwajibkan memberikan opsi teknis yang konkret berdasarkan analisis codebase (Misal: Opsi A atau Opsi B).

Ini mengubah AI menjadi rekan *brainstorming* proaktif, dan semua keputusan krusial akan dibekukan menjadi Architecture Decision Record (ADR).

### Fase 3: Terjemahan Teknis Arsitektur (`/sdlc-define-specs`)
Setelah logika bisnis dipastikan kedap air, kita serahkan dokumen `prd.md` ke `/sdlc-define-specs`. Agen ini adalah jembatannya. Ia membaca PRD, menelusuri basis kode yang ada, dan merumuskan dokumen kontrak teknis di direktori `/spec/`. Dokumen ini mendefinisikan *interface*, kontrak data (skema JSON/tipe data statis), dan menegakkan aturan Clean Architecture. Sebagai fitur unggulan (*Mandatory Upstream Documents*), agen ini akan otomatis menolak bekerja (*pushback*) jika Anda tidak memberikan konteks PRD sebelumnya.

### Fase 4: Pengecekan Konsistensi Silang (`/sdlc-audit-consistency`)
Ini adalah pos pemeriksaan keamanan. Sebelum rencana eksekusi final dikunci, `/sdlc-audit-consistency` akan mengaudit dokumen `/spec/` dan menyandingkannya dengan `prd.md`. Tugas utamanya adalah validasi *traceability* (keterlacakan). Ia memastikan tidak ada satu pun requirements bisnis yang tertinggal dari spesifikasi teknis, dan sebaliknya, tidak ada fitur "siluman" yang ditambahkan ke dalam spek.

### Fase 5: Rencana Eksekusi Bertahap (`/sdlc-plan-tasks`)
Dokumen `/spec/` yang sudah divalidasi kemudian dieksekusi dengan `/sdlc-plan-tasks`. Tugas spesialis ini adalah memecah spesifikasi arsitektur menjadi tugas-tugas atomik berkonsep *Tracer Bullets* (vertical slicing) di dalam direktori `/plan/`. Di setiap akhir tabel implementasi pada dokumen Markdown, agen ini akan menyisipkan perintah verifikasi yang mewajibkan kode lulus tes dan approval dari pengguna.

### Fase 6: Eksekusi Kode (`/sdlc-write-code`)
Kini, panggung diserahkan kepada eksekutor utama kita menggunakan perintah `/sdlc-write-code`. Berbekal *Karpathy Guidelines*, perintah ini mengeksekusi agen layaknya mesin presisi tingkat tinggi. Karena semua beban kognitif (arsitektur, perancangan, validasi) telah diurus oleh dokumen `/plan/`, agen ini bisa fokus 100% pada penulisan kode (*Surgical Changes* & *Simplicity First*). 

*(Bypass Jalur Cepat: Jika Anda hanya ingin memperbaiki typo, bug kecil, atau minor refactor tanpa harus melewati semua birokrasi Fase 1-5 di atas, Anda dapat langsung memanggil **`/code-janitor`**. Ini adalah utilitas khusus untuk mengeksekusi perubahan secara kilat dan presisi di luar prosedur standar SDLC).*

### Fase 7: Quality Assurance & Remediasi Cerdas
Kode yang ditulis, sebaik apa pun, tetap butuh pengawasan:
- **`/sdlc-code-review`**: Skill ini membedah *Pull Request* atau *commit* lokal Anda. Ia menganalisis pelanggaran *Clean Code* dan mengaudit celah keamanan (OWASP Top 10) untuk menghasilkan rencana refactoring.
- **`/sdlc-bug-report`**: Saat sistem mengalami masalah, agen ini menolak tebak-tebakan. Ia meminta *stack trace*, menganalisis *root cause*, dan membuat rencana perbaikan dengan filosofi Test-Driven Bug Fixing (TDBF).

### Fase 8: Dokumentasi Standar Industri (`/sdlc-generate-docs`)
Dokumentasi yang buruk sama bahayanya dengan kode yang buruk. Agen pamungkas ini mengadopsi standar global Diátaxis Framework. Saat dipanggil, ia akan bertanya dan memastikan dokumen ditujukan dengan tepat sebagai Tutorial, How-To, Reference, atau Explanation, menjamin dokumentasi proyek Anda rapi dan profesional.

---

## Memilih “Otak” yang Tepat: Strategi Model AI (Thinking vs. Execution)

Satu kesalahan yang sering dilakukan oleh developer saat menggunakan orkestrasi AI adalah menggunakan model (LLM) yang sama untuk setiap tugas. Padahal, Software Engineering membutuhkan dua jenis kecerdasan yang berbeda: **Logika Mendalam (Thinking/Reasoning)** dan **Tindakan Cepat (Execution/Coding)**.

Agar workflow di atas berjalan optimal, Anda harus memasangkan *slash command* dengan model AI yang tepat.

**1. Model “Pemikir” (Thinking & Reasoning Models)**
Model-model ini memiliki kemampuan penalaran tingkat tinggi, sangat teliti, dan unggul dalam merangkai arsitektur serta mendeteksi cacat logika. 
*Rekomendasi Model:* Gemini Pro / Advanced, Claude Opus, GPT High / Extra High, atau varian analitik seperti DeepSeek Pro / Qwen Max.
*Kecocokan Slash Command:* `/sdlc-draft-prd`, `/sdlc-clarify-reqs`, `/sdlc-define-specs`, `/sdlc-plan-tasks`, `/sdlc-code-review`.

**2. Model “Eksekutor” (Action & Coding Models)**
Model ini sangat tangkas (agile), memiliki latency rendah, dan dilatih khusus (fine-tuned) untuk memahami sintaks pemrograman dan eksekusi instruksi dari terminal.
*Rekomendasi Model:* Claude Sonnet (raja coding interaktif), Gemini Flash (cepat dengan context window raksasa), DeepSeek Flash, Qwen.
*Kecocokan Slash Command:* `/sdlc-write-code`, `/code-janitor`, `/sdlc-generate-docs`, `/sdlc-audit-consistency`.

Dengan memisahkan model berdasarkan spesialisasinya, Anda tidak hanya meningkatkan kualitas produk akhir, namun juga mengoptimalkan kecepatan workflow dan menghemat biaya API.

---

## Ekosistem yang Menyatu (The Vibe Coding Setup)

<placeholder gambar panel komik kucing ilustrasi setiap agent yang berjalan - WAJIB DIUPDATE textnya jadi /slash-command>

Bagi Anda yang menyukai alur kerja minimalis namun bertenaga ekstrem, pendekatan SDLC ini terasa sangat magis jika diintegrasikan dengan tools yang tepat. Anda bisa menggunakan editor teks di satu monitor untuk menulis PRD secara asinkron, dan di layar sebelahnya Anda memanggil *slash commands* ini melalui terminal.

### Cara Memasang Custom Agents (Slash Commands) ke Proyek Anda

Jika Anda menggunakan VS Code dengan ekstensi GitHub Copilot Chat, OpenCode, atau Google Antigravity, mengintegrasikan ekosistem *Awesome Copilot ID* sangatlah mudah:

<placeholder gambar konfigurasi di GitHub Copilot VS Code - Update tampilan tree bila berbeda>

1. Buka *root directory* proyek Anda.
2. Unduh atau salin struktur folder `.agents/` dari repositori [Awesome Copilot ID](https://github.com/GulajavaMinistudio/awesome-copilot-id). Pastikan Anda menyalin folder `skills/` yang mencakup semua *slash commands* beserta file `SKILL.md`-nya (misalnya direktori `sdlc-clarify-reqs/SKILL.md`, `sdlc-define-specs/SKILL.md`, dll).
3. Salin file *rulebook* `AGENTS.md` dari repositori ke dalam *root directory* proyek Anda. Sesuaikan isi `AGENTS.md` agar selaras dengan konteks bahasa dan *stack* proyek yang sedang Anda kerjakan.
4. Hubungkan file-file *guardrails* ini dengan sistem AI *Workspace* Anda. (Misal: menaruhnya di folder `.github/copilot-instructions.md` untuk GitHub Copilot).

<placeholder gambar tampilan Google Antigravity editor>
<placeholder gambar konfigurasi agent di Google Antigravity>
<placeholder gambar menjalankan Opencode di Terminal>
<placeholder gambar pemilihan agen di Opencode>
<placeholder gambar agen Antigravity dan Opencode berjalan bersamaan>

Setelah terpasang, Anda tinggal mengetikkan *slash command* langsung di kolom *chat* (contoh: `/sdlc-clarify-reqs tolong interogasi prd.md ini`). Sistem AI secara otomatis akan mematuhi protokol “Zero Assumption” dan *SOP* yang tertulis di dalam `SKILL.md` bersangkutan.

<placeholder gambar Agent siap dipanggil di CommandCode CLI>

## Kesimpulan

<placeholder gambar Ilustrasi Alur SDLC dengan Spec Kit dan AI Workflow (diagram kompleks) - WAJIB DIUPDATE label agen dari @ menjadi /slash-command>

Membangun perangkat lunak di era AI generatif bukan tentang menyerahkan seluruh kemudi kepada mesin, melainkan tentang membangun batasan (guardrails) yang cerdas. Dengan memecah siklus hidup pengembangan ke dalam orkestra perintah spesifik, mengawalnya dengan dokumen statis, dan menugaskan model AI (*Thinking vs. Execution*) pada tempat yang seharusnya, kita memastikan kecepatan pengkodean tidak pernah mengorbankan kualitas produk dan integritas arsitektur.

Tertarik mencoba dan membangun ulang cara Anda memproduksi kode? Silakan pelajari, gunakan, dan *fork* ekosistem ini secara bebas dari repositori resminya di: **github.com/GulajavaMinistudio/awesome-copilot-id**

Mari ubah paradigma kita dalam menulis perangkat lunak. *Happy Vibe Coding!*
