
# AGENTS.md — Tanda Tangan Digital Flutter (TTDigital)

Selamat datang di repositori project **Tanda Tangan Digital Flutter** — migrasi
aplikasi tanda tangan digital dari Android native (Kotlin) ke Flutter Android.
Brand name: **TTDigital**.

**Last Updated**: April 2, 2026

<!-- markdownlint-disable -->

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
- **No Skip Phases**: Tidak boleh melompat fase, setiap tahap harus selesai sebelum lanjut
- **Documentation First**: Dokumentasi lengkap dan terstruktur harus ada sebelum mulai coding
- **Custom Agents Usage**: User menggunakan custom GitHub Copilot Agents sesuai dengan fase development:
  - `@ProductManagerPRD` untuk Requirements (PRD)
  - `@SpecificationArchitect` untuk Technical Specification
  - `@PlannerArchitect` untuk Implementation Planning
  - `@BeastModeDev`, `@GodModeDev`, atau `@MiniBeast` untuk Coding/Implementation
  - `@QATestArchitect` untuk Testing
  - `@DocumentationWriter` untuk User Documentation
  - `@CodeReviewSpecialist` untuk Code Review

- **New Session per Phase**: User prefer memulai sesi chat baru saat berpindah fase untuk menjaga fokus konteks
- **Verification Mindset**: Setiap output harus diverifikasi terhadap PRD dan Spec sebelum lanjut
- **Phase Completion Pattern**: Setelah fase selesai, user meminta pemisahan planning untuk fase berikutnya ke dokumen terpisah untuk review tim

## Format Markdown

- **Markdown Lint**: Semua file markdown harus mengikuti aturan markdown lint
- **Konsistensi**: Pastikan format heading, list, dan struktur konsisten
- **Standar**: Ikuti best practices markdown untuk readability dan maintainability
- **Validasi**: Pastikan markdown yang dibuat lolos validasi lint checker
- **Elemen**: Gunakan elemen markdown seperti heading, subheading, bullet points, code blocks sesuai kebutuhan
- **Pemformatan**: Gunakan pemformatan teks seperti bold, italic, dan inline code untuk menekankan poin penting
- **Tabel**: Gunakan tabel untuk menyajikan data terstruktur jika diperlukan
- **Blok Kode**: Gunakan blok kode untuk menyajikan contoh kode dengan penyorotan sintaks yang sesuai

## Repository Overview

- **Main Application**: `lib/main.dart` — Entry point aplikasi
- **App Layer**: `lib/src/app/` — Theme, routing, responsive framework
- **Features**: `lib/src/features/` — Feature modules (splash, main_menu, signature_workspace, help, about)
- **Specification**: `spec/` — 8 technical specification documents
- **Planning**: `plan/` — 13 implementation plans (291 tasks, 77 phases)
- **Documentation**: `docs/` — Technical guides dan workflow documents
- **Mockups**: `docs/mockups/` — 9 approved UI mockups (HTML)
- **Tests**: `test/` — Unit, widget, dan integration tests

### Architecture: 4-Layer Clean Architecture

```text
lib/src/features/<feature>/
├── presentation/   # Widgets, pages, Cubits
├── application/    # Use cases, DTOs
├── domain/         # Entities, value objects, business rules
└── infrastructure/ # Android adapters, platform integration
```

**Pattern**: BLoC Cubit untuk state management, constructor injection manual
(tanpa `get_it`), named routes bawaan Flutter (tanpa `go_router`).

## SDLC Status

| Fase          | Status                            | Artefak                                       |
| ------------- | --------------------------------- | --------------------------------------------- |
| PRD           | ✅ Selesai                         | `docs/prd-draft-migrasi-kotlin-ke-flutter.md` |
| Specification | ✅ Selesai (8 dokumen)             | `spec/` folder                                |
| Mockup Design | ✅ Approved v3.0                   | `docs/mockups/` (9 surface)                   |
| Planning      | ✅ Selesai (13 dokumen, 291 tasks) | `plan/` folder                                |
| **Coding**    | **✅ Selesai (13/13 plans)**       | `plan/` folder                                |
| Testing       | ⬜ Belum Dimulai                   | —                                             |
| Documentation | ⬜ Belum Dimulai                   | —                                             |

## Completed Features

| Feature                                  | Completion Date | Tests | Status      |
| ---------------------------------------- | --------------- | ----- | ----------- |
| Plan 01 — Project Foundation             | 2026-03-29      | 0     | ✅ Completed |
| Plan 02 — Theme & Design System          | 2026-03-30      | 72/72 | ✅ Completed |
| Plan 03 — Navigation & Routing           | 2026-03-30      | 11/11 | ✅ Completed |
| Plan 04 — Domain Core Layer              | 2026-03-30      | 75/75 | ✅ Completed |
| Plan 05 — Application Use Cases          | 2026-03-30      | 16/16 | ✅ Completed |
| Plan 06 — Infrastructure Android Storage | 2026-03-31      | 37/37 | ✅ Completed |
| Plan 07 — Splash Screen                  | 2026-03-31      | 9/9   | ✅ Completed |
| Plan 08 — Main Menu                      | 2026-03-31      | 7/7   | ✅ Completed |
| Plan 09 — Signature Workspace Canvas     | 2026-03-31      | 11/11 | ✅ Completed |
| Plan 10 — Color Picker                   | 2026-03-31      | 11/11 | ✅ Completed |
| Plan 11 — Save Dialog & Export           | 2026-03-31      | 14/14 | ✅ Completed |
| Plan 12 — Help & About Surfaces          | 2026-04-01      | 15/15 | ✅ Completed |
| Plan 13 — Integration QA & Readiness     | 2026-04-02      | 39/39 | ✅ Completed |

### Plan 13 — Integration QA & Readiness — File Inventory

| File                                                                                      | Keterangan                                                                                                 |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `integration_test/app_test.dart`                                                          | E2E integration test 7 skenario: JPG, PNG, clear, permission denied, help/about — diperbaiki 4 bug harness |
| `integration_test/device_matrix_test.dart`                                                | Runtime device matrix: branch contract, permission strategy, full UI save flow per API branch (3/3 pass)   |
| `integration_test/performance_benchmark_test.dart`                                        | Benchmark startup, save duration, gallery visibility, frame timing (profile mode)                          |
| `lib/src/features/signature_workspace/infrastructure/canvas_capture.dart`                 | Dipindah dari presentation → infrastructure (Clean Architecture compliance)                                |
| `lib/src/features/signature_workspace/infrastructure/image_exporter_impl.dart`            | Updated: import canvas_capture dari infrastructure, bukan presentation                                     |
| `test/features/signature_workspace/presentation/widgets/save_permission_denied_test.dart` | Widget + bloc_test: permanently denied → feedback + canvas tetap ada                                       |

**Device Matrix Evidence:**

| Cabang API | Device/Emulator            | Tanggal    | Branch Contract                      | Permission               | Save Flow           |
| ---------- | -------------------------- | ---------- | ------------------------------------ | ------------------------ | ------------------- |
| API 21-28  | Device fisik API 28        | 2026-04-02 | `file://` legacy + media scan        | `WRITE_EXTERNAL_STORAGE` | ✅ JPG + PNG visible |
| API 29-32  | Emulator Nexus_5X (API 29) | 2026-04-02 | `content://` + IS_PENDING            | Auto-granted             | ✅ JPG + PNG visible |
| API 33+    | Emulator Pixel_2 (API 35)  | 2026-04-01 | `content://` tanpa READ_MEDIA_IMAGES | Auto-granted             | ✅ JPG + PNG visible |

### Plan 10 — Color Picker — File Inventory

| File                                                                                  | Keterangan                                                                                             |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `lib/src/features/signature_workspace/presentation/widgets/color_picker_sheet.dart`   | `ColorPickerSheet` + `_ColorCircle`: grid 22 preset, indikator aktif border+check, responsive 560dp    |
| `lib/src/features/signature_workspace/presentation/widgets/action_row.dart`           | Updated: stub `_onGantiWarna` diganti `showModalBottomSheet` → `ColorPickerSheet`                      |
| `test/features/signature_workspace/presentation/widgets/color_picker_sheet_test.dart` | 11 widget/integration tests: structure (6), interaksi callback (2), integrasi workspace (1), bonus (2) |

### Plan 11 — Save Dialog & Export — File Inventory

| File                                                                                    | Keterangan                                                                                                                               |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/src/features/signature_workspace/presentation/widgets/save_signature_sheet.dart`   | `SaveSignatureSheet`: form nama file + format selector (RadioGroup) + save pipeline + PopScope dismiss rules                             |
| `lib/src/features/signature_workspace/presentation/utils/canvas_capture.dart`           | `captureCanvas()`: RepaintBoundary capture, white bg compositing (JPG), transparan (PNG)                                                 |
| `lib/src/features/signature_workspace/infrastructure/image_exporter_impl.dart`          | `ImageExporterImpl`: bridges `ImageExporter` gateway → `captureCanvas()` utility                                                         |
| `lib/src/features/signature_workspace/presentation/widgets/action_row.dart`             | Updated: stub `_onSimpan` → `showModalBottomSheet` → `SaveSignatureSheet` + full save pipeline                                           |
| `lib/src/features/signature_workspace/presentation/signature_workspace_page.dart`       | Updated: lazy DI wiring `SaveSignatureUseCase` + all infrastructure deps                                                                 |
| `lib/src/features/signature_workspace/infrastructure/infrastructure.dart`               | Updated: barrel export `image_exporter_impl.dart`                                                                                        |
| `test/features/signature_workspace/presentation/widgets/save_signature_sheet_test.dart` | 14 widget tests: structure (6), validation (2), save pipeline (1), dismiss rules (2), integrasi Batal (1), subtitle (1), JPG default (1) |

### Plan 12 — Help & About Surfaces — File Inventory

| File                                                            | Keterangan                                                                                                           |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `lib/src/features/help/presentation/help_sheet.dart`            | `HelpSheet` + `_HelpStep`: 4 langkah cara pakai, CircleAvatar numbered, ConstrainedBox 560dp, SingleChildScrollView  |
| `lib/src/features/about/presentation/about_sheet.dart`          | `AboutSheet`: nama app, versi `v1.0.0` (hardcode), deskripsi singkat, ConstrainedBox 560dp                           |
| `lib/src/features/main_menu/presentation/main_menu_page.dart`   | Updated: stub `_showStubSnackBar` dihapus, kedua button `_SupportCard` wired ke `HelpSheet`/`AboutSheet`             |
| `test/features/help/presentation/help_sheet_test.dart`          | 9 widget tests: structure (8) + interaction Tutup (1), screen size fix `physicalSize 800×1600` untuk konten overflow |
| `test/features/about/presentation/about_sheet_test.dart`        | 6 widget tests: structure (5) + interaction Tutup (1)                                                                |
| `test/features/main_menu/presentation/main_menu_page_test.dart` | Updated: group stub tests diganti sheet presence tests (`findsOneWidget HelpSheet`/`AboutSheet`)                     |

### Plan 09 — Signature Workspace Canvas — File Inventory

| File                                                                                  | Keterangan                                                                          |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `lib/src/features/signature_workspace/presentation/cubit/workspace_state.dart`        | WorkspaceState (Equatable), WorkspaceStatus enum, copyWith closure pattern          |
| `lib/src/features/signature_workspace/presentation/cubit/workspace_cubit.dart`        | WorkspaceCubit: 11 methods, guards, state machine                                   |
| `lib/src/features/signature_workspace/presentation/model/stroke_path.dart`            | StrokePath model (Equatable): points, color, strokeWidth                            |
| `lib/src/features/signature_workspace/presentation/signature_workspace_page.dart`     | SignatureWorkspacePage final: BlocProvider + _WorkspaceView scaffold                |
| `lib/src/features/signature_workspace/presentation/widgets/signature_canvas.dart`     | SignatureCanvas + SignaturePainter + _CanvasPlaceholder                             |
| `lib/src/features/signature_workspace/presentation/widgets/action_row.dart`           | ActionRow: Ganti Warna (stub → Plan 10), Simpan (stub), Hapus (AlertDialog confirm) |
| `lib/src/features/signature_workspace/presentation/widgets/inline_status_region.dart` | InlineStatusRegion: BlocConsumer, Timer auto-dismiss 4s, AnimatedSwitcher           |
| `test/features/signature_workspace/presentation/cubit/workspace_cubit_test.dart`      | 8 unit tests: bloc_test + mocktail, state machine + guards                          |
| `test/features/signature_workspace/presentation/signature_workspace_page_test.dart`   | 3 widget tests: empty state, gesture dirty, AlertDialog clear flow                  |

### Plan 08 — Main Menu — File Inventory

| File                                                            | Keterangan                                                                         |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `lib/src/features/main_menu/presentation/main_menu_page.dart`   | MainMenuPage final: _HeroCard, _PrimaryActionCard, _SupportCard, responsive layout |
| `test/features/main_menu/presentation/main_menu_page_test.dart` | 7 widget tests: structure, navigation (mocktail), SnackBar stubs                   |
| `test/app/navigation_test.dart`                                 | Updated: tap target diubah dari "Buat Tanda Tangan" ke "Mulai"                     |

### Plan 07 — Splash Screen — File Inventory

| File                                                      | Keterangan                                                                    |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `lib/src/features/splash/presentation/splash_page.dart`   | Splash visual penuh: logo asset, title, subtitle, loading bar, auto-nav 2s    |
| `assets/images/logo_placeholder.png`                      | Placeholder logo PNG 144×144 untuk splash                                     |
| `pubspec.yaml`                                            | Updated: register `assets/images/`                                            |
| `test/features/splash/presentation/splash_page_test.dart` | 4 widget test: logo asset, title/subtitle, loading indicator, auto-navigation |
| `test/app/navigation_test.dart`                           | Updated assertions agar sesuai splash final UI                                |

### Plan 06 — Infrastructure Android Storage — File Inventory

| File                                                                                    | Keterangan                                                                       |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `pubspec.yaml`                                                                          | Updated: +`permission_handler ^11.3.1`, +`device_info_plus ^10.1.2`              |
| `android/app/src/main/AndroidManifest.xml`                                              | Updated: +`WRITE_EXTERNAL_STORAGE` dengan `android:maxSdkVersion="28"`           |
| `android/app/src/main/kotlin/com/gulajava/ttd_digital/MediaStoreChannel.kt`             | Custom Kotlin plugin: MediaStore (API 29+) + filesystem (API 21-28)              |
| `android/app/src/main/kotlin/com/gulajava/ttd_digital/MainActivity.kt`                  | Updated: register `MediaStoreChannel()` di `configureFlutterEngine`              |
| `lib/src/features/signature_workspace/infrastructure/permission_gateway_impl.dart`      | `PermissionGatewayImpl`: API 29+ auto-granted, API 21-28 via permission_handler  |
| `lib/src/features/signature_workspace/infrastructure/media_store_channel.dart`          | Dart wrapper MethodChannel `ttd_digital/media_store`                             |
| `lib/src/features/signature_workspace/infrastructure/media_storage_gateway_impl.dart`   | `MediaStorageGatewayImpl` + `MediaStorageException` error mapping                |
| `lib/src/features/signature_workspace/infrastructure/time_provider_impl.dart`           | `TimeProviderImpl`: `DateTime now() => DateTime.now()`                           |
| `lib/src/features/signature_workspace/infrastructure/media_visibility_verifier.dart`    | `MediaVisibilityVerifier`: polling `checkMediaVisibility`, timeout 10s           |
| `lib/src/features/signature_workspace/infrastructure/infrastructure.dart`               | Barrel export seluruh infrastructure layer                                       |
| `test/features/signature_workspace/infrastructure/permission_gateway_impl_test.dart`    | 10 unit test (5 check + 5 request, skenario API 33/29/27)                        |
| `test/features/signature_workspace/infrastructure/media_storage_gateway_impl_test.dart` | 17 unit test (fileExists, save sukses 3 API, error mapping, legacy API 21-28)    |
| `test/features/signature_workspace/infrastructure/time_provider_impl_test.dart`         | 4 unit test (interface, range waktu, sequential, local timezone)                 |
| `test/features/signature_workspace/infrastructure/media_visibility_verifier_test.dart`  | 6 unit test (visible first poll, mid-poll, timeout, exception swallow scenarios) |

### Plan 05 — Application Use Cases — File Inventory

| File                                                                              | Keterangan                                                         |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `lib/src/features/signature_workspace/application/gateways/*.dart`                | 4 gateway interfaces + `StorageResult` + barrel gateways           |
| `lib/src/features/signature_workspace/application/dtos/*.dart`                    | DTO request/response + barrel DTO                                  |
| `lib/src/features/signature_workspace/application/save_signature_use_case.dart`   | Orkestrasi save flow lengkap (permission, export, collision, save) |
| `lib/src/features/signature_workspace/application/clear_canvas_use_case.dart`     | Use case reset canvas contract (`Result<void>`)                    |
| `lib/src/features/signature_workspace/application/application.dart`               | Barrel export seluruh application layer                            |
| `test/features/signature_workspace/application/dtos/*.dart`                       | 6 unit test DTO                                                    |
| `test/features/signature_workspace/application/save_signature_use_case_test.dart` | 7 skenario unit test save use case                                 |
| `test/features/signature_workspace/application/clear_canvas_use_case_test.dart`   | 3 unit test clear canvas use case                                  |

### Plan 04 — Domain Core Layer — File Inventory

| File                                                                    | Keterangan                                            |
| ----------------------------------------------------------------------- | ----------------------------------------------------- |
| `lib/src/core/result/failure_reason.dart`                               | Base `FailureReason` untuk taxonomy error             |
| `lib/src/core/result/result.dart`                                       | Sealed `Result<T>` dengan `Success` / `Failure`       |
| `lib/src/core/result/result_types.dart`                                 | Barrel export core result types                       |
| `lib/src/core/core.dart`                                                | Updated: export result types dari core barrel         |
| `lib/src/features/signature_workspace/domain/export_format.dart`        | Enum format export JPG/PNG + invariant                |
| `lib/src/features/signature_workspace/domain/file_name.dart`            | Value object sanitasi nama file + exception           |
| `lib/src/features/signature_workspace/domain/file_name_validator.dart`  | Validator `Result<FileName>` + `EmptyFileNameFailure` |
| `lib/src/features/signature_workspace/domain/collision_resolver.dart`   | Collision suffix `_yyyyMMdd_HHmmss`                   |
| `lib/src/features/signature_workspace/domain/stroke_color.dart`         | Value object warna stroke                             |
| `lib/src/features/signature_workspace/domain/color_preset_catalog.dart` | Catalog 22 preset warna + default Hitam               |
| `lib/src/features/signature_workspace/domain/save_failure_reason.dart`  | Enum taxonomy 9 kegagalan simpan                      |
| `lib/src/features/signature_workspace/domain/domain.dart`               | Barrel export domain layer signature workspace        |
| `test/core/result/result_test.dart`                                     | 15 unit test untuk `Result<T>`                        |
| `test/features/signature_workspace/domain/*.dart`                       | 60 unit test untuk seluruh domain signature workspace |

### Plan 03 — Navigation & Routing — File Inventory

| File                                                                              | Keterangan                                             |
| --------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `lib/src/app/route_names.dart`                                                    | `AppRoutes` — 3 named route constants                  |
| `lib/src/app/app.dart`                                                            | Updated: `initialRoute` + `routes` map                 |
| `lib/main.dart`                                                                   | Updated: async main, portrait lock, edge-to-edge       |
| `lib/src/features/splash/presentation/splash_page.dart`                           | Placeholder + auto-nav ke menu (2s delay)              |
| `lib/src/features/main_menu/presentation/main_menu_page.dart`                     | Placeholder + tombol → `pushNamed` workspace           |
| `lib/src/features/signature_workspace/presentation/signature_workspace_page.dart` | Placeholder + AppBar back → `pop`                      |
| `test/app/route_names_test.dart`                                                  | 6 unit test route constants                            |
| `test/app/navigation_test.dart`                                                   | 5 widget test navigasi (splash, menu, workspace, back) |

### Plan 02 — Theme & Design System — File Inventory

| File                                               | Keterangan                                   |
| -------------------------------------------------- | -------------------------------------------- |
| `lib/src/app/theme/app_color_scheme.dart`          | ColorScheme light/dark + `AppColorSchemeX`   |
| `lib/src/app/theme/app_typography.dart`            | 15-slot TextTheme: Manrope + Inter           |
| `lib/src/app/theme/app_spacing.dart`               | Token: xs/sm/md/lg/xl (8–32dp)               |
| `lib/src/app/theme/app_radius.dart`                | Token: card/sheet/button BorderRadius        |
| `lib/src/app/theme/app_elevation.dart`             | Token: soft/card elevation doubles           |
| `lib/src/app/theme/app_theme.dart`                 | ThemeData assembly light/dark                |
| `lib/src/app/theme/app_dimens.dart`                | ScreenUtil scaled tokens (fontXs–Xl, radius) |
| `lib/src/app/theme/theme.dart`                     | Barrel export semua theme files              |
| `lib/src/app/responsive/breakpoints.dart`          | `DeviceCategory` enum + `resolveCategory()`  |
| `lib/src/app/responsive/layout_tokens.dart`        | Max content width per surface per category   |
| `lib/src/app/responsive/responsive_container.dart` | Reusable responsive wrapper widget           |
| `lib/src/app/app.dart`                             | Updated: ScreenUtilInit + AppTheme           |

## Local Workflow

```bash
flutter doctor && flutter pub get    # Setup environment
dart format . && dart analyze        # Code quality check
flutter test --reporter=expanded     # Run tests (REQUIRED format)
flutter run                          # Development di Android Emulator
```

Untuk comprehensive workflow, lihat [Development Workflow Guide](docs/DEVELOPMENT_WORKFLOW.md).

## Quick Reference Guides

Dokumentasi specialized untuk implementasi:

- **[Specification Overview](docs/SPECIFICATION_OVERVIEW.md)** — Overview 8 specs, dependency map, key design decisions, execution order
- **[Architecture Patterns](docs/ARCHITECTURE_PATTERNS.md)** — 4-layer Clean Architecture, Cubit pattern, canvas/export pipeline, gateway adapters
- **[Development Workflow](docs/DEVELOPMENT_WORKFLOW.md)** — Git workflow, commit standards, code quality, session memory management
- **[Execution Workflow](docs/EXECUTION_WORKFLOW.md)** — Phased execution strategy, 13-plan sequential order, checkpoint gates
- **[Testing Guide](docs/TESTING_GUIDE.md)** — Testing per layer (domain, application, Cubit, widget), coverage targets
- **[UI/UX Guide](docs/UI_UX_GUIDE.md)** — Material 3, responsive layout, theming, accessibility, ScreenUtil rules

## Behavioral Rules & Code Standards

Aturan behavioral (Surgical Assistant directives), Clean Architecture standards,
SOLID principles, dan Flutter UI/UX specialization didefinisikan di:

- `.github/instructions/taming-copilot.instructions.md` — Core behavioral rules
- `.github/instructions/clean-code-clean-architecture.instructions.md` — Clean Architecture & SOLID
- `.github/instructions/flutter-front-end-uiux.instructions.md` — Flutter UI/UX standards
- `.github/instructions/memory.instructions.md` — User preferences & communication
- `.github/instructions/markdown.instructions.md` — Markdown formatting rules
- `MIGRATION-HANDOFF.md` — Project context, SDLC status, AI instructions

## Proven Implementation Patterns

### Architecture Patterns

| Pattern                        | Penggunaan                                                            |
| ------------------------------ | --------------------------------------------------------------------- |
| **4-Layer Clean Architecture** | `presentation → application → domain → infrastructure`                |
| **BLoC Cubit**                 | State management tanpa event class, method-based intent               |
| **Gateway/Adapter**            | Abstraksi untuk Permission, MediaStorage, TimeProvider, ImageExporter |
| **Constructor Injection**      | DI manual via `BlocProvider`/`RepositoryProvider`                     |
| **Named Routes**               | `Navigator.pushNamed` via `MaterialApp.routes`                        |

### UI Patterns

| Pattern                    | Penggunaan                                                             |
| -------------------------- | ---------------------------------------------------------------------- |
| **Material 3**             | `useMaterial3: true`, `ColorScheme`, `TextTheme`                       |
| **Theme-Based Colors**     | `Theme.of(context).colorScheme.primary` — tanpa hardcoded hex          |
| **Responsive Native**      | `LayoutBuilder` + `MediaQuery.sizeOf` — bukan ScreenUtil               |
| **ScreenUtil Token Only**  | Hanya `.sp`, `.w`, `.h`, `.r` untuk font/spacing/radius                |
| **AppDimens for FontSize** | Semua override `fontSize` wajib lewat `AppDimens`, bukan angka literal |
| **Const Correctness**      | `const` constructors di mana pun memungkinkan                          |
| **Widget Extraction**      | Widget class terpisah, bukan helper methods                            |
| **Portrait-Only**          | Semua surface v1, termasuk tablet                                      |
| **Edge-to-Edge Aware**     | `SafeArea` pada surface dengan aksi penting                            |

## Style Notes

- Follow Effective Dart guidelines
- `const` constructors di mana mungkin
- Domain layer **tidak boleh** import `package:flutter/`
- Semua warna via `Theme.of(context)` — dilarang hardcode hex
- ScreenUtil **hanya** untuk font/spacing/radius tokens
- Ukuran font di widget harus memakai token `AppDimens` berbasis `.sp`, bukan `fontSize: 12/14/16` hardcoded
- Jika perlu ukuran font baru, tambahkan token baru di `lib/src/app/theme/app_dimens.dart` dulu, lalu pakai token tersebut di widget
- Responsive layout via `LayoutBuilder`/`MediaQuery` — bukan ScreenUtil
- `SafeArea` pada surface dengan konten/aksi penting
- Test setiap phase sebelum lanjut ke phase berikutnya
