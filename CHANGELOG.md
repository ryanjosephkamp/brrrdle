# Changelog

All notable changes to `brrrdle` will be documented in this file.

## Unreleased

### Fixed (Phase 12 — Diagnosis Report 2026-05-26)
- Fixed Vercel TypeScript build errors in `api/` by adding a dedicated `tsconfig.api.json` project reference (bundler-mode resolution, `types: ["node"]`, strict flags matching the app config) so `npm run build` (`tsc -b && vite build`) now type-checks the serverless functions locally with the same strictness Vercel applies in CI.
- Added explicit `.js` extensions to every relative import inside `api/_lib/vercelBlobStore.ts`, `api/_lib/wordListStore.ts`, `api/admin-refresh.ts`, `api/cron/refresh-word-lists.ts`, and `api/word-lists/manifest.ts`, satisfying both bundler- and NodeNext-style resolution and matching the recommendation in `DIAGNOSIS-REPORT-2026-05-26.md`.
- Reworked `VercelBlobWordListStore` to declare the auth-token field explicitly instead of using a TypeScript parameter property, restoring compatibility with the repository-wide `erasableSyntaxOnly` lint posture.
- Removed the floating "polish ready" Phase 9 debug toast, the "Phase 9 polish" sidebar panel, and the "Phase 9 shell notes" dialog from `src/app/App.tsx`. The reusable `Dialog`, `LoadingState`, and `ToastRegion` UI primitives remain in `src/ui/` for future use; only the temporary debug payload and its mount sites were removed so the production shell renders cleanly.
- Expanded the bundled word list catalogue to cover every supported practice length 2–35 (`src/data/bundled/words_length_<N>.json`). Lengths now ship real dictionary content where available (lengths 2–18) and deterministic synthetic placeholders for the long-tail lengths (19–35), so the practice length selector exposes the full Spec range and "word not in list" no longer mis-rejects valid guesses at previously unbundled lengths.
- Updated `getAvailableOgPracticeLengths()` and `getAvailableGoPracticeLengths()` to drive the selector off `SUPPORTED_PRACTICE_WORD_LENGTHS` intersected with `BUNDLED_WORD_LIST_LENGTHS`, so the UI reflects the canonical 2–35 contract rather than only the legacy three-length seed set.
- Refreshed the affected unit tests (`src/data/loadWordList.test.ts`, `src/data/cache.test.ts`, `src/data/updateCheck.test.ts`, `src/data/wordRepository.test.ts`, `src/game/og/session.test.ts`, `src/game/go/session.test.ts`) to assert the new 34-length bundled catalogue.

### Added
- Added a vendor-neutral `WordListStore` abstraction (`src/data/refreshStore.ts`) with atomic-swap semantics, plus reusable `InMemoryWordListStore` and `FailingInMemoryWordListStore` test doubles and a `projectManifest` helper that maps a refresh result onto the served-manifest shape.
- Added a production Vercel Blob persistence driver (`api/_lib/vercelBlobStore.ts`) using `@vercel/blob`. The driver uploads every length file under `word-lists/<revision>/words_length_<n>.json` first, then atomically swaps the `word-lists/manifest.json` pointer; per-length upload failures abort before the pointer is touched so the previously-served manifest stays intact.
- Added a server-side store factory (`api/_lib/wordListStore.ts`) that selects the Vercel Blob driver when `BLOB_READ_WRITE_TOKEN` is configured and otherwise returns a clearly-reasoned `skipped` status, keeping the cron pipeline safe in unconfigured environments.
- Wired `api/cron/refresh-word-lists.ts` and `api/admin-refresh.ts` to invoke `store.atomicSwap()` after a successful refresh; persistence outcomes (`swapped`, `skipped`, `failed`) are surfaced in the response and logged. Persistence failure returns `502` so a partial state cannot be reported as success.
- Added the public read endpoint `GET /api/word-lists/manifest` that returns the currently-served manifest (or `{ manifest: null }` when persistence is not configured) with a short cache for cheap polling.
- Added unit tests `src/data/refreshStore.test.ts` covering manifest projection, the empty-store initial state, the upload-then-swap discipline, prior-revision tracking on subsequent swaps, and the atomic-rollback contract on simulated per-length failure.
- Added `@vercel/blob@^2.4.0` as a server-only dependency (used exclusively by `api/_lib/vercelBlobStore.ts`; build output confirmed not present in the client bundle).
- Documented production deployment-environment configuration steps for `CRON_SECRET` and `BLOB_READ_WRITE_TOKEN` in `docs/deployment.md`, including a step-by-step setup walkthrough and an updated production verification checklist that includes the new `GET /api/word-lists/manifest` route. Added `BLOB_READ_WRITE_TOKEN` to `.env.example`.

### Added (Hugging Face source integration — plan v1.2 amendment)
- Added Hugging Face word-list source integration: `src/data/huggingFaceSource.ts` defines the dataset (`ryanjosephkamp/english-openlist`), the `latest/brrrdle/` folder, the 34 expected length-indexed dictionaries (lengths 2–35), per-length URL builders, and a `RemoteWordListMetadata` projection of the dataset's current revision.
- Added the shared atomic `refreshWordListsFromHuggingFace` pipeline in `src/data/refresh.ts`. The pipeline fetches each length file via an injected `fetchJson`, validates against the existing word-list schema, accepts either full schema-shaped payloads or flat string-array payloads, and returns all-or-nothing success so the caller can perform an atomic swap into production storage.
- Added the scheduled Vercel Cron route `api/cron/refresh-word-lists.ts`, configured in `vercel.json` to run daily at `0 0 * * *` (00:00 UTC). The route verifies `Authorization: Bearer ${CRON_SECRET}`, fetches the current Hugging Face dataset revision, runs the shared refresh pipeline, and returns validated dictionaries (with per-length counts) or per-length failure detail.
- Wired `api/admin-refresh.ts` to invoke the same refresh pipeline after Supabase admin authorization succeeds, so manual and scheduled refreshes share one fetch/validate path.
- Recorded the bundled snapshot's Hugging Face dataset, folder, revision, and note in `src/data/bundled/source.json` and exposed it as `BUNDLED_SOURCE` from the data layer.
- Added `CRON_SECRET` to `.env.example` and documented the upstream dataset, the cron schedule, the UTC timezone default plus override instructions, persistence-layer guidance, and the expanded production verification checklist in `docs/deployment.md`.
- Added unit tests `src/data/huggingFaceSource.test.ts` and `src/data/refresh.test.ts` covering URL construction, the 34-length expectation, malformed dataset info, all-success refresh, flat-array payload coercion, per-length schema failure, and per-length network failure (atomic abort).

### Added (prior unreleased entries)
- Added v1 production release preparation documentation for Vercel deployment, environment variable handling, PWA assets, and the protected `/api/admin-refresh` route.
- Added Phase 11 Pay-to-Continue gameplay integration for `og` and `go` losses plus final release-readiness documentation updates.
- Added Phase 10 GitHub Pages/Jekyll documentation foundation, deployment guide, and updated setup/Supabase/admin docs.
- Added Phase 9 emoji sharing, PWA manifest/icons/service worker, reduced-motion-aware tile animations, accessibility refinements, and responsive polish.
- Added Phase 8 optional Supabase accounts, cloud sync foundations, RLS migration, danger-zone settings helpers, and protected admin authorization surfaces.
- Added Phase 7 local guest persistence, XP/level/coin progression, consumable and Pay-to-Continue economy calculators, and statistics dashboard.
- Added Phase 6 post-game definitions with bundled lookup, Dictionary API and Wiktionary fallbacks, and Google define-search buttons.
- Added Phase 5 go daily and practice gameplay with five-puzzle chains, carry-over pre-filled rows, daily persistence, and hard mode support.
- Added Phase 4 og daily and practice gameplay with deterministic daily selection, local daily persistence, hard mode, and playable keyboard-driven UI.
- Added Phase 3.3 physical keyboard normalization, on-screen keyboard component, keyboard-state derivation, and shell preview plumbing.
- Added Phase 3.2 dark-first UI tokens, reusable button/panel/dialog/toast/status primitives, and accessibility-focused shell states.
- Added Phase 3.1 app shell with minimal route definitions, layout, navigation, and mode-selection placeholders.
- Added Phase 2 bundled word-list data layer with schema validation and seed data.
- Added length-indexed repository APIs for answers, valid guesses, and bundled definitions.
- Added remote metadata update checks plus data status and cache/fallback helpers.
- Added Phase 2 data-layer unit tests.
- Added Phase 1 UI-independent core game engine domain types and constants.
- Added canonical Wordle-style tile coloring with duplicate-letter accounting.
- Added guess validation, hard-mode constraints, and puzzle session state transitions.
- Added Vitest unit tests for Phase 1 game engine behavior.
- Initialized Phase 0 React, TypeScript, Vite, and Tailwind CSS scaffold.
- Added baseline project directories for future implementation phases.
- Added Vercel, environment, README, and GitHub Pages/Jekyll documentation foundations.
- Moved progress tracking files into `progress/` for phase-by-phase implementation tracking.
