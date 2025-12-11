---
applyTo: "**"
---

# Memory - Preferensi Pengguna

## Komunikasi

- **Bahasa**: Komunikasi harus menggunakan bahasa Indonesia yang jelas dan baku
- **Gaya**: Formal namun tetap ramah dan profesional
- **Format**: Gunakan struktur yang rapi dengan bullet points dan code blocks sesuai kebutuhan

## Penjelasan dan Dokumentasi

- **Kejelasan**: Penjelasan harus jelas, terstruktur, dan mudah dipahami
- **Struktur**: Gunakan format bertingkat dengan heading, subheading, dan poin-poin yang logis
- **Dokumentasi**: Semua dokumentasi yang dibuat harus jelas, komprehensif, dan mudah dimengerti
- **Detail**: Berikan konteks yang cukup tanpa terlalu bertele-tele
- **Contoh**: Sertakan contoh praktis jika diperlukan untuk memperjelas konsep

## Gaya Komunikasi User

- Menggunakan bahasa Indonesia formal tapi santai
- Suka detail teknis dan penjelasan komprehensif
- Meminta dokumentasi yang lengkap dan terstruktur
- Memperhatikan kualitas kode dan testing standards

## Workflow & Metodologi

- **SDLC Strict Adherence**: User mengikuti alur SDLC yang ketat dan terstruktur
- **Sequential Development**: Harus mengikuti urutan: PRD → Spec → Plan → Code
- **No Skip Phases**: Tidak boleh melompat fase, setiap tahap harus selesai
  sebelum lanjut
- **Documentation First**: Dokumentasi lengkap dan terstruktur harus ada sebelum
  mulai coding
- **Custom Agents Usage**: User menggunakan custom GitHub Copilot Agents sesuai
  dengan fase development:
  - `@ProductManagerPRD` untuk Requirements (PRD)
  - `@SpecificationArchitect` untuk Technical Specification
  - `@PlannerArchitect` untuk Implementation Planning
  - `@BeastModeDev` atau `@MiniBeast` untuk Coding/Implementation
  - `@QATestArchitect` untuk Testing
  - `@DocumentationWriter` untuk User Documentation
- **New Session per Phase**: User prefer memulai sesi chat baru saat berpindah
  fase untuk menjaga fokus konteks
- **Verification Mindset**: Setiap output harus diverifikasi terhadap PRD dan
  Spec sebelum lanjut
- **Phase Completion Pattern**: Setelah fase selesai, user meminta pemisahan
  planning untuk fase berikutnya ke dokumen terpisah untuk review tim

## Format Markdown

- **Markdown Lint**: Semua file markdown harus mengikuti aturan markdown lint
- **Konsistensi**: Pastikan format heading, list, dan struktur konsisten
- **Standar**: Ikuti best practices markdown untuk readability dan maintainability
- **Validasi**: Pastikan markdown yang dibuat lolos validasi lint checker
- **Elemen**: Gunakan elemen markdown seperti heading, subheading, bullet points, code blocks, dan lainnya sesuai kebutuhan
- **Tautan dan Gambar**: Gunakan tautan dan gambar dengan benar untuk mendukung konten
- **Pemformatan**: Gunakan pemformatan teks seperti bold, italic, dan inline code untuk menekankan poin penting
- **Tabel**: Gunakan tabel untuk menyajikan data terstruktur jika diperlukan
- **Blok Kode**: Gunakan blok kode untuk menyajikan contoh kode dengan penyorotan sintaks yang sesuai
- **Daftar**: Gunakan daftar bernomor atau berpoin untuk menyajikan informasi secara terstruktur
- **Pemecahan Paragraf**: Pecah paragraf panjang menjadi bagian yang lebih pendek untuk meningkatkan keterbacaan
