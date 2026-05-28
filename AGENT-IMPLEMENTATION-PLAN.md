# AGENT-IMPLEMENTATION-PLAN.md

**Project**: brrrdle  
**Plan Version**: 1.7
**Date**: 2026-05-28
**Status**: Draft for user review — amended with Hugging Face word-list source integration; further amended on 2026-05-27 with the `ADDITIONS-2026-05-27.md` addendum (see §18); further amended on 2026-05-27 with the `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md` addendum (see §19); further amended on 2026-05-27 with the `AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md` addendum (see §20); further amended on 2026-05-28 with the Mobile & Tablet Responsiveness phase (see §21); further amended on 2026-05-28 with the Local Word Lists addendum (`LOCAL-WORD-LISTS-SPEC-2026-05-28.md`) as Phase 17 (see §22).
**Authority**: Must follow `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, and the approved v2.6 plan in `BRRRDLE-OVERVIEW.md`.

---

## 1. Operating Rules

This plan is the working implementation guide for building `brrrdle`. It is not approved until the user explicitly approves it. No implementation work may begin before that approval.

### 1.1 Binding Principles

- Build only the approved v1 scope.
- Keep daily `og` and `go` modes fixed at 5 letters for initial launch.
- Support practice mode lengths 2 through 35.
- Use the hybrid word-list strategy: bundle pre-processed JSON sourced from the `latest/brrrdle/` folder of the `https://huggingface.co/datasets/ryanjosephkamp/english-openlist` dataset at build time, paired with a daily scheduled refresh around 12 AM (after the upstream ~11 PM nightly regeneration), production update checks, and a protected manual admin refresh.
- Treat `latest/brrrdle/` in the Hugging Face dataset as the authoritative upstream source. It contains exactly 34 JSON dictionaries — one per valid word length from 2 through 35 — and the brrrdle app must keep its served dictionaries in sync with that folder on a daily cadence.
- Prefer pre-processed definitions, then Dictionary API, then Wiktionary, then an always-available dynamic Google search button.
- Protect admin functionality with Supabase authentication and an `admin` role.
- Target Vercel for the game and GitHub Pages + Jekyll for blog/docs.
- Make small, reviewable changes and verify after every meaningful step.
- End every phase with a commit, changelog update, verification summary, and explicit pause for user approval.
- Maintain progress tracking through `PROGRESS.csv` and per-phase markdown reports before and after every major phase gate.

### 1.2 Repository Starting Point

The repository is currently minimal and contains only governance/specification documents. Phase 0 will scaffold the application and establish tooling before feature implementation.

### 1.3 Standard Phase Exit Checklist

Every phase must finish with:

1. Relevant files created or updated.
2. Changelog updated.
3. Existing lint/build/test commands run where available.
4. Phase-specific verification completed.
5. `PROGRESS.csv` read before work begins for the phase, then updated with the phase result.
6. A `progress/PROGRESS-STEP-N.md` report created or updated from `progress/PROGRESS-TEMPLATE.md`, where `N` is the completed phase number.
7. Known limitations documented.
8. Changes committed and pushed through the approved workflow.
9. Explicit halt for user approval before continuing.

### 1.4 Progress Logging and Tracking Protocol

Progress tracking is mandatory for transparency, resumability, and agent coordination.

- The repository root starts with `PROGRESS.csv` and `PROGRESS-TEMPLATE.md`.
- Phase 0 scaffolding must create a root-level `progress/` folder and move both files into that folder.
- `PROGRESS.csv` must contain one row for every major implementation phase in this plan.
- Before beginning each phase, the agent must read `progress/PROGRESS.csv` and, if needed, any existing `progress/PROGRESS-STEP-N.md` files to determine the next incomplete phase and any blockers.
- After each phase, before halting at the prompt gate, the agent must update the relevant CSV row with status, verification, blockers, completion notes, and the next required action.
- After each phase, the agent must create or update `progress/PROGRESS-STEP-N.md` from the template. The report must concisely summarize what changed, record verification, note blockers or critical errors, and explicitly state whether the user is safe/authorized to proceed to the next phase.
- If a critical error or blocker arises during a phase, the relevant progress markdown file must be updated or annotated before halting.

---

## 2. Phase 0 — Governance, Scaffolding, and Baseline Tooling

**Goal**: Establish the project foundation without implementing game-specific behavior beyond minimal scaffold placeholders.

### Step 0.1 — Confirm Governance Baseline

**Build / modify**:
- Confirm `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, and this plan are present and aligned.
- Confirm `PROGRESS.csv` and `PROGRESS-TEMPLATE.md` are present at the repository root before scaffolding moves them into `progress/`.
- Create or initialize `CHANGELOG.md` if it does not exist.

**Key files**:
- `CONSTITUTION.md`
- `BRRRDLE-SPEC.md`
- `BRRRDLE-OVERVIEW.md`
- `AGENT-IMPLEMENTATION-PLAN.md`
- `PROGRESS.csv`
- `PROGRESS-TEMPLATE.md`
- `CHANGELOG.md`

**Verification**:
- Re-read the governance documents before changes.
- Confirm the progress tracking skeleton and template exist.
- Confirm no implementation code has been added before plan approval.

### Step 0.2 — Scaffold React/Vite Application

**Build / modify**:
- Use the ecosystem scaffold tool to create a React 19 + TypeScript + Vite app in the repository root.
- Add Tailwind CSS using supported setup commands.
- Add Zustand only when application state is introduced.
- Preserve existing governance docs.

**Key files**:
- `package.json`
- `package-lock.json` or selected lockfile
- `index.html`
- `vite.config.ts`
- `tsconfig*.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- Tailwind configuration files if required by the installed version

**Verification**:
- Install dependencies with the selected package manager.
- Run the generated build command.
- Run generated lint/test commands if present.
- Start the dev server locally only as needed for browser verification.
- Confirm governance docs remain intact.

### Step 0.3 — Establish Project Structure

**Build / modify**:
- Create a minimal directory structure for future phases without implementing features prematurely.
- Add placeholder architecture only where needed to keep imports clean.
- Create `progress/` at the repository root and move `PROGRESS.csv` and `PROGRESS-TEMPLATE.md` into it.

**Key files / directories**:
- `src/app/`
- `src/game/`
- `src/data/`
- `src/definitions/`
- `src/account/`
- `src/admin/`
- `src/stats/`
- `src/progression/`
- `src/ui/`
- `src/lib/`
- `src/types/`
- `src/test/` or project-appropriate test location
- `progress/PROGRESS.csv`
- `progress/PROGRESS-TEMPLATE.md`

**Verification**:
- Build succeeds with the scaffolded structure.
- No unused placeholder complexity that causes lint failures.
- Confirm progress tracking files were moved, not duplicated or lost.

### Step 0.4 — Configure Deployment Foundations

**Build / modify**:
- Add Vercel-ready configuration only where needed.
- Add environment variable documentation without secrets.
- Add GitHub Pages + Jekyll blog/docs foundation.

**Key files**:
- `vercel.json` if needed
- `.env.example`
- `docs/`
- `docs/_config.yml`
- `docs/index.md`
- `README.md`

**Verification**:
- Production build succeeds locally.
- Environment documentation contains no secrets.
- Jekyll docs files are static and do not interfere with Vite.

**Pause point**: Commit Phase 0, update changelog, report verification, and halt for user approval before core implementation.

---

## 3. Phase 1 — Core Game Engine and Shared Domain Model

**Goal**: Build the testable, UI-independent game rules that every mode will use.

### Step 1.1 — Domain Types and Constants

**Build / modify**:
- Define mode types, puzzle types, tile states, guess results, word lengths, daily/practice scope rules, and game status.
- Centralize constants for supported practice lengths 2–35 and daily length 5.

**Key files**:
- `src/game/types.ts`
- `src/game/constants.ts`
- `src/types/`

**Verification**:
- TypeScript build/typecheck passes.
- Unit tests cover supported length boundaries.

### Step 1.2 — Exact Tile Coloring Logic

**Build / modify**:
- Implement the canonical `getTileStates` equivalent as the only source of truth for Wordle-style coloring.
- Account for duplicate letters exactly like Wordle.

**Key files**:
- `src/game/tileStates.ts`
- `src/game/tileStates.test.ts`

**Verification**:
- Unit tests for duplicate letters, all-green, all-gray, mixed states, repeated guess letters, repeated answer letters, and lengths 2 and 35.
- Confirm no other code duplicates tile-state rules.

### Step 1.3 — Guess Validation and Hard Mode Rules

**Build / modify**:
- Implement word validation hooks against loaded word lists.
- Implement Hard Mode constraints: fixed green positions, required yellow letters, and no gray-letter reuse.

**Key files**:
- `src/game/validation.ts`
- `src/game/hardMode.ts`
- Tests for both files

**Verification**:
- Unit tests cover valid/invalid guesses, boundary lengths, and Hard Mode edge cases after mixed feedback.

### Step 1.4 — Puzzle Session State Machine

**Build / modify**:
- Implement reusable state transitions for entering letters, deleting, submitting, win/loss, continuing, and resetting.
- Keep UI concerns out of the engine.

**Key files**:
- `src/game/session.ts`
- `src/game/session.test.ts`

**Verification**:
- Unit tests cover normal play, win, loss, invalid guesses, and continuation hooks.
- Build and test commands pass.

**Pause point**: Commit Phase 1, update changelog, report verification, and halt for user approval.

---

## 4. Phase 2 — Data Layer and Hybrid Word List Consumption

**Goal**: Load length-indexed word data reliably using bundled pre-processed files sourced from the Hugging Face dataset `ryanjosephkamp/english-openlist`, plus production update checks, a daily scheduled refresh against that dataset, and a protected admin-triggered refresh path.

### Step 2.1 — Word Data Shape and Local Bundled Assets

**Build / modify**:
- Treat the Hugging Face dataset `https://huggingface.co/datasets/ryanjosephkamp/english-openlist` as the authoritative upstream word-list source. Specifically, consume the `latest/brrrdle/` folder, which contains exactly 34 JSON dictionaries — one per valid word length from 2 through 35 inclusive.
- Define the expected schema for the per-length JSON dictionaries (e.g., `words_length_{N}.json` or the exact filenames provided by the dataset, to be confirmed by inspecting `latest/brrrdle/` during Step 2.1).
- Bundle a known-good snapshot of `latest/brrrdle/` at build time, recording the upstream Hugging Face commit/revision used so future refreshes can be diffed and audited.
- Add a minimal development-safe seed data strategy if the full assets are not yet available locally, but production builds must use the real `latest/brrrdle/` payload.
- Ensure data supports optional definitions when present.

**Key files**:
- `src/data/types.ts`
- `src/data/wordListSchema.ts`
- `src/data/wordLists.ts`
- `src/data/bundled/` or equivalent
- A small metadata file recording the bundled Hugging Face revision (e.g., `src/data/bundled/source.json`)

**Verification**:
- Schema validation tests for representative lengths.
- Confirm length 2, length 5, and length 35 loading paths.
- Confirm the bundled snapshot contains all 34 expected length files and that its recorded source revision is reproducible.

### Step 2.2 — Length-Indexed Loader

**Build / modify**:
- Implement APIs to retrieve valid guesses, answer candidates, and definition metadata by length.
- Ensure daily modes request only length 5 while practice can request 2–35.

**Key files**:
- `src/data/loadWordList.ts`
- `src/data/wordRepository.ts`
- Tests for data access

**Verification**:
- Tests prove daily length is locked to 5.
- Tests prove practice rejects lengths outside 2–35 and loads supported boundaries.

### Step 2.3 — Production Update Check

**Build / modify**:
- Add a production-deploy-aware update check that compares bundled `latest/brrrdle/` metadata (revision and per-length checksums or sizes) with the current state of `latest/brrrdle/` on Hugging Face.
- Note that the upstream Hugging Face dataset is regenerated nightly at approximately 11 PM, so update checks should expect a fresh revision daily and surface staleness to the data layer.
- Degrade gracefully when remote checks fail (network failure, Hugging Face downtime, malformed metadata) — bundled data must remain fully playable.

**Key files**:
- `src/data/updateCheck.ts`
- `src/data/metadata.ts`
- Server/API route files appropriate to the selected Vite/Vercel setup

**Verification**:
- Tests or mocks for current, stale, failed-network, and malformed-metadata scenarios.
- Confirm no secrets, private tokens, or Hugging Face credentials are used client-side; the dataset is public, so anonymous access is sufficient.

### Step 2.4 — Data Caching and Failure UX Hooks

**Build / modify**:
- Add data status states for loading, ready, stale, failed, and fallback.
- Expose user-friendly error states to UI without blocking playable bundled data when available.

**Key files**:
- `src/data/status.ts`
- `src/data/cache.ts`
- UI integration hooks when UI exists

**Verification**:
- Tests cover failure and fallback behavior.
- Build and test commands pass.

### Step 2.5 — Daily Scheduled Hugging Face Refresh

**Build / modify**:
- Implement a server-side scheduled job (e.g., a Vercel Cron-triggered API/function route, or equivalent for the chosen hosting setup) that runs once daily at approximately 12 AM, shortly after the upstream Hugging Face dataset's ~11 PM nightly regeneration.
- The job must fetch the 34 length-indexed JSON dictionaries from the `latest/brrrdle/` folder of `https://huggingface.co/datasets/ryanjosephkamp/english-openlist` (lengths 2 through 35).
- Validate each downloaded file against the schema from Step 2.1 before swapping it in.
- Atomically replace the served set of dictionaries so a partial download or a single malformed file cannot corrupt the live word lists. Keep the previously served set available as a fallback until the new set is fully validated.
- Record the new Hugging Face revision and per-length status in update metadata so the Step 2.3 update check stays accurate.
- Log refresh outcomes (success/failure per length, source revision, timestamp) without exposing private data or credentials.
- Cooperate with the protected admin manual refresh route from Phase 8, so manual and scheduled refreshes share the same fetch/validate/swap pipeline.
- The exact timezone for "~11 PM" and "~12 AM" must be confirmed with the user before scheduling is finalized; document the chosen timezone explicitly in `docs/deployment.md` and `.env.example` (or equivalent) once selected.

**Key files**:
- Scheduled function/route under the chosen Vercel API directory (e.g., `api/cron/refresh-word-lists.ts`)
- `src/data/refresh.ts` (or equivalent) implementing the shared fetch/validate/swap pipeline
- `src/data/updateCheck.ts` (cooperation with metadata)
- `vercel.json` (cron schedule configuration)
- `docs/deployment.md` and `.env.example` for documented schedule and any non-secret config

**Verification**:
- Tests or mocks for the fetch/validate/swap pipeline covering: all 34 files succeed; one file malformed; network failure mid-refresh; Hugging Face returns an unexpected revision.
- Confirm the atomic-swap behavior leaves a working dictionary set after every failure case.
- Confirm that the scheduled route is protected appropriately (Vercel Cron signature/secret or equivalent) and is not invokable by anonymous clients.
- Confirm no Hugging Face credentials are required or committed — the dataset is public.

**Pause point**: Commit Phase 2, update changelog, report verification, and halt for user approval.

---

## 5. Phase 3 — Application Shell, Routing, and UI Foundation

**Goal**: Build the accessible, mobile-first shell that can host modes, settings, stats, admin, and definitions.

### Step 3.1 — App Shell and Navigation

**Build / modify**:
- Create the main layout, navigation, route structure, and mode selection.
- Keep routes minimal and aligned to approved scope.

**Key files**:
- `src/app/App.tsx`
- `src/app/routes.tsx`
- `src/ui/Layout.tsx`
- `src/ui/Navigation.tsx`

**Verification**:
- Build passes.
- Browser smoke test shows app loads without console errors.
- Keyboard navigation reaches core controls.

### Step 3.2 — Design System and Accessibility Foundation

**Build / modify**:
- Establish dark-first icy visual tokens, responsive layout primitives, buttons, dialogs, toasts, and loading/error states.
- Ensure focus states and semantic controls.

**Key files**:
- `src/index.css`
- `src/ui/`
- Tailwind config if needed

**Verification**:
- Manual responsive check for mobile and desktop widths.
- Basic accessibility checks for labels, focus, contrast, and reduced-motion behavior.

### Step 3.3 — Keyboard Input Foundation

**Build / modify**:
- Add physical keyboard handling and on-screen keyboard components using canonical game state.
- Ensure keyboard state derives from `getTileStates` results.

**Key files**:
- `src/ui/Keyboard.tsx`
- `src/game/useKeyboardInput.ts`

**Verification**:
- Manual smoke test for physical and on-screen keyboard input.
- Unit tests where practical for key normalization.

**Pause point**: Commit Phase 3, update changelog, report verification, and halt for user approval.

---

## 6. Phase 4 — `og` Mode Gameplay

**Goal**: Deliver classic single-puzzle gameplay for daily and practice variants.

### Step 4.1 — `og` Daily Mode

**Build / modify**:
- Implement daily `og` puzzle selection fixed at 5 letters.
- Add deterministic daily answer selection.
- Persist daily completion state.

**Key files**:
- `src/game/og/`
- `src/app/routes/og.tsx`
- `src/data/daily.ts`
- Persistence files under `src/account/` or `src/lib/storage/`

**Verification**:
- Tests confirm daily `og` always uses length 5.
- Manual playthrough win and loss.
- Refresh preserves appropriate daily state.

### Step 4.2 — `og` Practice Mode

**Build / modify**:
- Implement selectable practice lengths 2–35.
- Generate independent practice puzzles without affecting daily state.

**Key files**:
- `src/game/og/`
- Practice route/components

**Verification**:
- Manual and automated checks for lengths 2, 5, and 35.
- Invalid length selections are rejected or unavailable.

### Step 4.3 — `og` Hard Mode

**Build / modify**:
- Integrate Hard Mode validation into daily and practice `og` gameplay.
- Show clear feedback when a guess violates constraints.

**Key files**:
- `src/game/og/`
- `src/game/hardMode.ts`
- UI feedback components

**Verification**:
- Tests and manual checks for green, yellow, and gray constraints.

**Pause point**: Commit Phase 4, update changelog, report verification, and halt for user approval.

---

## 7. Phase 5 — `go` Mode Gameplay

**Goal**: Deliver chained 5-puzzle Hurdle-style gameplay with carry-over pre-fills.

### Step 5.1 — `go` Session Model

**Build / modify**:
- Implement five-puzzle session orchestration.
- Track current puzzle, prior answers, carry-over pre-fills, wins, losses, and session completion.

**Key files**:
- `src/game/go/`
- `src/game/go/session.ts`
- Tests for go session progression

**Verification**:
- Tests cover progression through all five puzzles.
- Tests cover failed puzzle and completion states.

### Step 5.2 — `go` Daily Mode

**Build / modify**:
- Implement daily `go` fixed at 5 letters for all five puzzles.
- Persist daily session state.

**Key files**:
- `src/app/routes/go.tsx`
- `src/game/go/`
- `src/data/daily.ts`

**Verification**:
- Tests confirm daily `go` always uses length 5.
- Manual full-session smoke test.

### Step 5.3 — `go` Practice Mode

**Build / modify**:
- Implement practice `go` with one selected length applied to all five puzzles.
- Support lengths 2–35.

**Key files**:
- `src/game/go/`
- Practice route/components

**Verification**:
- Manual checks for lengths 2, 5, and 35.
- Tests confirm all puzzles in a practice session share the selected length.

### Step 5.4 — `go` Hard Mode and Carry-Over Rules

**Build / modify**:
- Integrate Hard Mode constraints with carry-over pre-fills.
- Ensure pre-filled letters and constraints do not conflict.

**Key files**:
- `src/game/go/`
- `src/game/hardMode.ts`

**Verification**:
- Tests cover carry-over pre-fills and Hard Mode interaction.
- Manual smoke test of chained play.

**Pause point**: Commit Phase 5, update changelog, report verification, and halt for user approval.

---

## 8. Phase 6 — Definitions System

**Goal**: Show definitions after wins or losses with the required fallback order and Google search behavior.

### Step 6.1 — Definition Data Model and Pre-Processed Lookup

**Build / modify**:
- Model definition data from English OpenList files.
- Implement lookup against bundled word data first.

**Key files**:
- `src/definitions/types.ts`
- `src/definitions/preprocessed.ts`
- `src/definitions/definitionService.ts`

**Verification**:
- Tests confirm pre-processed definitions are preferred when present.

### Step 6.2 — External API Fallbacks

**Build / modify**:
- Add Dictionary API fallback.
- Add Wiktionary fallback.
- Handle network errors, empty results, malformed responses, and timeouts gracefully.

**Key files**:
- `src/definitions/dictionaryApi.ts`
- `src/definitions/wiktionary.ts`
- `src/definitions/definitionService.ts`

**Verification**:
- Mocked tests cover success and failure at each fallback layer.
- Confirm external failures do not crash the game.

### Step 6.3 — Google Search Button Fallback UI

**Build / modify**:
- Add post-game definition panel.
- Always make Google search available.
- When all definition sources fail, show clear non-intrusive fallback message recommending the button.
- Button text must be dynamic: `Search Google for ‘[WORD]’`.
- Button opens a new tab for `define [WORD]` using safe external-link behavior.

**Key files**:
- `src/definitions/DefinitionPanel.tsx`
- `src/definitions/googleSearch.ts`
- Post-game UI integration files

**Verification**:
- Unit tests for URL generation and dynamic label.
- Manual post-game checks for win and loss.
- Manual check that new tab opens correctly.

**Pause point**: Commit Phase 6, update changelog, report verification, and halt for user approval.

---

## 9. Phase 7 — Persistence, Progression, Economy, and Statistics

**Goal**: Add durable guest progress, XP, levels, coins, consumables, Pay-to-Continue, and stats.

### Step 7.1 — Local Guest Persistence

**Build / modify**:
- Store guest progress, coins, levels, stats, settings, and game history locally.
- Add versioned storage for future migrations.

**Key files**:
- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
- `src/lib/storage/`

**Verification**:
- Tests cover save/load/reset/export and corrupted data fallback.
- Manual refresh persistence check.

### Step 7.2 — Progression and Economy

**Build / modify**:
- Implement XP, level, coin award calculations based on game performance.
- Implement consumables: Reveal One Letter and Remove Incorrect Letters.
- Implement Pay-to-Continue cost scaling by word length and completion percentage.

**Key files**:
- `src/progression/experience.ts`
- `src/progression/coins.ts`
- `src/progression/consumables.ts`
- `src/progression/payToContinue.ts`

**Verification**:
- Unit tests for scoring, coin awards, consumable effects, insufficient coins, and Pay-to-Continue cost edge cases.

### Step 7.3 — Statistics

**Build / modify**:
- Track per-mode statistics for `og` and `go` from day one.
- Structure data to support future per-length statistics without exposing variable daily lengths.
- Add visual dashboard.

**Key files**:
- `src/stats/types.ts`
- `src/stats/statistics.ts`
- `src/stats/StatsDashboard.tsx`

**Verification**:
- Tests cover stat updates for wins, losses, streaks, daily/practice separation where applicable, and `og` vs `go` separation.
- Manual dashboard smoke test.

**Pause point**: Commit Phase 7, update changelog, report verification, and halt for user approval.

---

## 10. Phase 8 — Supabase Accounts, Sync, and Admin Route

**Goal**: Add optional Supabase accounts, cloud sync, guest transfer, danger-zone settings, and protected admin refresh.

### Step 8.1 — Supabase Client and Environment Setup

**Build / modify**:
- Add Supabase client configuration using public anon key only.
- Document required environment variables in `.env.example`.
- Ensure no service-role secrets are exposed to client code.

**Key files**:
- `src/account/supabaseClient.ts`
- `.env.example`
- Supabase migration/config documentation files if used

**Verification**:
- Build passes without real secrets.
- Static review confirms no secret values are committed.

### Step 8.2 — Database Schema and RLS Policies

**Build / modify**:
- Define tables for profiles, progress, stats, game history, settings, and roles.
- Add RLS policies so users can access only their data.
- Add admin role support suitable for manual dashboard assignment in v1.

**Key files**:
- `supabase/migrations/`
- `docs/supabase.md` or equivalent setup docs

**Verification**:
- Review generated SQL for RLS coverage.
- If Supabase local tooling is available, run migration validation.
- Document any verification that requires a real Supabase project.

### Step 8.3 — Authentication and Guest Transfer

**Build / modify**:
- Implement email/password or magic-link auth with email verification expectations.
- Add login/signup/logout UI.
- Prompt users to transfer guest data after account creation or login.

**Key files**:
- `src/account/auth.ts`
- `src/account/AuthPanel.tsx`
- `src/account/guestTransfer.ts`

**Verification**:
- Tests for transfer merge behavior where practical.
- Manual auth flow checklist documented for real Supabase verification.

### Step 8.4 — Cloud Sync

**Build / modify**:
- Sync progress, coins, levels, stats, settings, and game history to Supabase.
- Handle offline, conflict, and partial failure states gracefully.

**Key files**:
- `src/account/sync.ts`
- `src/account/syncStatus.ts`

**Verification**:
- Mocked tests for upload, download, conflict, and failure paths.
- Manual sync checklist for real project environment.

### Step 8.5 — Settings and Danger Zone

**Build / modify**:
- Add export data.
- Add reset progress.
- Add delete account flow.
- Add change email/password paths as supported by Supabase.

**Key files**:
- `src/account/Settings.tsx`
- `src/account/dangerZone.ts`

**Verification**:
- Tests for export/reset transformations.
- Manual UX confirmation for destructive action confirmations.

### Step 8.6 — Protected Admin Manual Refresh Route

**Build / modify**:
- Add protected admin UI/route for manual word-list refresh override.
- Require authenticated Supabase user with `admin` role.
- Validate authorization server-side or in protected Vercel function/API route.
- Never rely only on hidden UI.

**Key files**:
- `src/admin/`
- API/server route files for admin refresh
- `src/data/updateCheck.ts`
- Supabase role policy files

**Verification**:
- Tests or mocked checks for unauthenticated, authenticated non-admin, and authenticated admin states.
- Manual checklist for real Supabase admin role assignment.
- Confirm no privileged secrets in browser bundle.

**Pause point**: Commit Phase 8, update changelog, report verification, and halt for user approval.

---

## 11. Phase 9 — Sharing, PWA, Polish, and Accessibility

**Goal**: Complete user-facing polish, installability, sharing, accessibility, and performance work.

### Step 9.1 — Emoji Sharing

**Build / modify**:
- Implement classic Wordle-style emoji sharing for `og` and `go`.
- Ensure output uses canonical tile states.

**Key files**:
- `src/game/share.ts`
- Share UI components

**Verification**:
- Tests for share output formats.
- Manual clipboard/share API checks with fallback.

### Step 9.2 — PWA Support

**Build / modify**:
- Add manifest, icons, service worker strategy, and offline-capable behavior where reasonable.
- Avoid making stale data behavior confusing.

**Key files**:
- `public/manifest.webmanifest`
- `public/icons/`
- Service worker or Vite PWA configuration if selected

**Verification**:
- Production build succeeds.
- Browser application panel confirms installability where practical.
- Offline smoke test confirms graceful behavior.

### Step 9.3 — Animation and Responsive Polish

**Build / modify**:
- Add tile pop-in, flip reveal, row shake, and smooth transitions.
- Respect reduced-motion preferences.
- Polish mobile and desktop layouts.

**Key files**:
- UI component files
- `src/index.css`

**Verification**:
- Manual checks on mobile and desktop viewport sizes.
- Confirm animations do not block input or cause critical console errors.

### Step 9.4 — Accessibility Pass

**Build / modify**:
- Fix semantic labels, focus order, color contrast, keyboard behavior, dialogs, and status announcements.

**Key files**:
- UI components across `src/ui/`, game routes, dialogs, and panels

**Verification**:
- Keyboard-only navigation check.
- Screen-reader-oriented semantic review.
- WCAG AA-focused contrast review.

### Step 9.5 — Performance Pass

**Build / modify**:
- Optimize initial load and interactions.
- Ensure word-list handling does not degrade daily mode performance.

**Key files**:
- Data loading files
- Route-level code splitting if needed
- UI performance hotspots

**Verification**:
- Production build.
- Lighthouse target ≥ 90 where environment supports it.
- Manual interaction check for smooth gameplay.

**Pause point**: Commit Phase 9, update changelog, report verification, and halt for user approval.

---

## 12. Phase 10 — Blog / Docs on GitHub Pages + Jekyll

**Goal**: Establish the approved blog/docs surface without interfering with the Vercel-hosted game.

### Step 10.1 — Jekyll Foundation

**Build / modify**:
- Create or refine `docs/` as the GitHub Pages + Jekyll root.
- Add basic site config and landing page.

**Key files**:
- `docs/_config.yml`
- `docs/index.md`
- `docs/_posts/` if needed

**Verification**:
- Confirm docs files are valid static/Jekyll content.
- Confirm Vite build is unaffected.

### Step 10.2 — Project Documentation

**Build / modify**:
- Document setup, environment variables, Supabase configuration, admin role assignment, deployment, and verification procedures.
- Keep docs aligned with the implemented system.

**Key files**:
- `README.md`
- `docs/*.md`
- `docs/supabase.md`
- `docs/deployment.md`

**Verification**:
- Review docs for accuracy and absence of secrets.
- Confirm all referenced commands exist.

**Pause point**: Commit Phase 10, update changelog, report verification, and halt for user approval.

---

## 13. Phase 11 — Final Integration, Release Readiness, and Deployment Verification

**Goal**: Verify the full product against the Constitution, spec, and v2.6 success criteria.

### Step 11.1 — Full Automated Verification

**Build / modify**:
- Fix only issues directly blocking approved v1 functionality or verification.

**Key files**:
- Any files implicated by failures

**Verification**:
- Run full lint, typecheck, test, and production build commands.
- Run security checks available in the environment.
- Confirm no known critical console errors.

### Step 11.2 — Full Manual Gameplay Matrix

**Build / modify**:
- No feature work unless verification reveals a scoped defect.

**Verification**:
- `og` daily fixed at 5.
- `go` daily fixed at 5.
- `og` practice lengths 2, 5, and 35.
- `go` practice lengths 2, 5, and 35.
- Hard Mode in both modes.
- Win and loss paths.
- Pay-to-Continue with enough and insufficient coins.
- Definitions with pre-processed success, API fallback success, and total failure with Google button.
- Guest persistence and reset/export.
- Supabase auth and guest transfer where environment is available.
- Admin refresh route for unauthenticated, non-admin, and admin users where environment is available.

### Step 11.3 — Deployment Readiness

**Build / modify**:
- Finalize Vercel configuration and deployment docs.
- Finalize GitHub Pages/Jekyll docs instructions.

**Key files**:
- `vercel.json`
- `README.md`
- `docs/deployment.md`
- `.env.example`

**Verification**:
- Production build passes.
- Environment variable list is complete and contains no secrets.
- Lighthouse target ≥ 90 where environment supports it.
- Confirm update checks and manual refresh are documented for production.

### Step 11.4 — Final Governance Review

**Build / modify**:
- Update changelog and any release notes.
- Confirm implementation matches `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, and this approved plan.

**Key files**:
- `CHANGELOG.md`
- `README.md`
- `docs/`

**Verification**:
- Trace each required spec item to implemented behavior or documented limitation.
- Confirm no out-of-scope v1 features were added.

**Pause point**: Commit final integration changes, update changelog, provide release-readiness report, and halt for user approval before any production release action.

---

## 14. Cross-Phase Verification Matrix

| Requirement | Minimum verification |
|---|---|
| Exact Wordle coloring | Unit tests with duplicate-letter vectors; manual gameplay smoke test |
| Daily `og` fixed at 5 | Unit tests and manual route check |
| Daily `go` fixed at 5 | Unit tests and manual full-session check |
| Practice 2–35 | Boundary tests for 2 and 35; manual checks for 2, 5, 35 |
| Hard Mode | Unit tests for green/yellow/gray constraints; manual checks |
| Hybrid word data | Loader tests, metadata/update mocks, production build check |
| Definition priority | Mocked service tests for each fallback layer |
| Google fallback button | Unit tests for label/URL; manual new-tab check |
| Supabase RLS | Migration review and local/real Supabase checks where available |
| Admin route | Unauthenticated/non-admin/admin authorization checks |
| Guest persistence | Storage tests and refresh manual check |
| Guest transfer | Merge/transfer tests and manual auth checklist |
| Progression/economy | Unit tests for XP, coins, consumables, Pay-to-Continue |
| Statistics | Unit tests for `og`/`go` separation and streaks |
| Accessibility | Keyboard, focus, semantic, contrast checks |
| Performance | Production build, interaction smoke test, Lighthouse where available |
| Vercel | Local production build and config review |
| GitHub Pages/Jekyll | Docs config review and Vite non-interference check |

---

## 15. Known Constraints and Clarifications

- This plan does not approve implementation by itself; explicit user approval is required before Phase 0 begins.
- The authoritative upstream word-list source is the Hugging Face dataset `https://huggingface.co/datasets/ryanjosephkamp/english-openlist`. Specifically, the `latest/brrrdle/` folder contains the 34 length-indexed JSON dictionaries (one per length from 2 through 35) that brrrdle consumes.
- The upstream Hugging Face dataset is updated nightly at approximately 11 PM, and the brrrdle scheduled refresh must run at approximately 12 AM. The exact timezone for both the upstream regeneration and the brrrdle refresh must be confirmed with the user before Phase 2's scheduled job is finalized; documentation will use this confirmed timezone explicitly rather than ambiguous "11 PM / 12 AM" phrasing.
- The Hugging Face dataset is public, so anonymous read access is sufficient; no Hugging Face credentials may be committed or shipped to the client bundle.
- Real Supabase and deployment verification may require project credentials or dashboard access outside the local sandbox. If unavailable, the agent must document what was verified locally and what remains for the user to verify.
- Full English OpenList assets may be large. The agent must choose a strategy that satisfies build-time bundling and performance requirements without harming daily-mode load performance.
- No service-role secret, API key, or privileged credential may be committed.
- Any requirement conflict must stop work for user clarification.

---

## 16. Phase 12 — Fix Build Errors, Length Selector, and Polish Artifacts (Diagnosis Report 2026-05-26)

**Authority**: This phase implements the recommended fix strategy from `DIAGNOSIS-REPORT-2026-05-26.md` while strictly observing `CONSTITUTION.md` (scope fidelity, minimal change, verification-first execution, data safety, and progress tracking). It must not introduce out-of-scope v1 features.

**Goal**: Restore a clean production build of the Vercel serverless layer, remove a leftover Phase 9 debug toast, and make the practice length selector and guess validation work across the full 2–35 length range using the existing hybrid data strategy. After this phase, both visible user-facing issues and the underlying TypeScript build errors must be resolved.

**Scope boundary**: No new game features, no economy changes, no Supabase schema changes, no new external dependencies beyond what is strictly required to fix the diagnosed issues. Do not rewrite phases 0–11. Do not change daily-mode performance characteristics.

### Step 12.1 — Re-confirm Diagnosis Against the Current Repository

**Build / modify**:
- No code changes in this step.

**Verification**:
- Read `DIAGNOSIS-REPORT-2026-05-26.md`, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, and the most recent Phase 12/13 progress reports (`progress/PROGRESS-STEP-12.md`, `progress/PROGRESS-STEP-13.md`).
- Run `npm ci`, `npm run lint`, `npm run test`, and `npm run build` to capture the current baseline failure surface locally.
- Run a standalone `tsc --noEmit` over the `api/` folder using Node16/NodeNext-style module resolution to reproduce the 18 TypeScript errors described in the diagnosis report and produce an authoritative list (file, line, error code).
- Confirm which symptoms are reproducible locally and which require a Vercel preview to observe (record any Vercel-only behavior in the progress report).

**Pause behavior**: This step does not halt; it feeds the remaining steps with a verified error list.

### Step 12.2 — Establish a Dedicated TypeScript Project for `api/`

**Build / modify**:
- Add a third TypeScript project reference for the Vercel serverless functions (e.g. `tsconfig.api.json`) that:
  - Includes only `api/**/*.ts` and the `src/` types it legitimately imports.
  - Uses module/module-resolution settings compatible with how Vercel compiles serverless functions (Node-style ESM resolution).
  - Enables `strict` and the existing `noUnusedLocals`/`noUnusedParameters`/`noFallthroughCasesInSwitch` flags, plus `resolveJsonModule` where required.
  - Sets `types` to include `node` so `process`, `Buffer`, and Node globals resolve.
- Reference the new project from the root `tsconfig.json` so `tsc -b` (used by `npm run build`) typechecks the `api/` layer alongside the app.

**Key files**:
- `tsconfig.json`
- `tsconfig.api.json` (new)
- `package.json` (no script changes expected; document the change in this plan and changelog)

**Verification**:
- `npm run build` must typecheck `api/` and fail on the diagnosed errors before Step 12.3, proving that the new project surfaces those errors locally rather than only on Vercel.
- Confirm `tsconfig.app.json` and `tsconfig.node.json` are not affected.

### Step 12.3 — Fix Relative Import Extensions and JSON Import Attributes in `api/` and `src/data/`

**Build / modify**:
- Update every relative import in `api/**/*.ts` and the `src/data/*` files referenced from `api/` to satisfy the chosen `api/` module resolution. Concretely:
  - Add explicit `.js` extensions to relative imports as required by Node16/NodeNext resolution, including imports that cross the `api/` ↔ `src/` boundary.
  - Where ESLint or the bundler may complain about `.js` extensions in `src/`, prefer keeping `src/` imports unchanged and only adjusting imports actually consumed from `api/`. If a shared module is consumed from both sides, choose the smallest path that satisfies both resolutions (e.g. relocating shared helpers under `api/_lib/` or `src/data/` cleanly).
  - Convert JSON imports that fail under the new project to use the `with { type: 'json' }` import attribute (or `assert` only as a last resort) and ensure the chosen attribute is supported by the TypeScript version pinned in `package.json`.
- Fix the implicit-`any` parameter errors (`TS7006`) flagged in `api/_lib/vercelBlobStore.ts`, `api/admin-refresh.ts`, and `api/cron/refresh-word-lists.ts` by giving each parameter an explicit, accurate type drawn from the existing data-layer types — do not use `any`.
- Fix the type mismatch in `loadWordList.ts` identified in the diagnosis report by tightening the inferred type rather than weakening callers.
- Ensure `@types/node` remains in `devDependencies` and is referenced where needed (it is already present; document that no install is required if so).

**Key files**:
- `api/_lib/vercelBlobStore.ts`
- `api/_lib/wordListStore.ts`
- `api/admin-refresh.ts`
- `api/cron/refresh-word-lists.ts`
- `api/word-lists/manifest.ts`
- `src/data/refreshStore.ts`
- `src/data/loadWordList.ts`
- Any other files surfaced by Step 12.1’s error list

**Verification**:
- `npm run build` must complete with zero TypeScript errors across `tsconfig.app.json`, `tsconfig.node.json`, and the new `tsconfig.api.json`.
- `npm run lint` must pass; ESLint configuration for `api/` may need a small adjustment if `.js` extensions on relative imports are flagged. If a rule must be relaxed, scope it to the `api/` glob only and document it.
- Re-run the standalone `api/` typecheck command used in Step 12.1; the 18 diagnosed errors must all be gone with no new errors introduced.
- Do not delete or weaken any existing tests to make this step pass.

### Step 12.4 — Remove the Leftover Phase 9 “polish ready” Floating Box

**Build / modify**:
- In `src/app/App.tsx`, remove the `shellMessages` constant and the `<ToastRegion messages={shellMessages} />` mount that produces the floating “polish ready” toast in the bottom-right of every page. Keep the underlying `ToastRegion` primitive intact for future gameplay use; remove only the debug payload and its render site.
- Also remove the adjacent “Phase 9 polish” sidebar `<Panel>` (and its `LoadingState` and Review-shell-notes button) and the “Phase 9 shell notes” `Dialog`, which are debug surfaces from the same phase. Confirm via grep that no other surface depends on them. If any test references these surfaces, update or remove only those debug-only assertions; do not weaken gameplay tests.
- Sweep for other Phase 9 debug-only leftovers in `src/app/App.tsx` (and only `App.tsx`) and remove any that the diagnosis report’s “polish ready” callout effectively covers. Do not refactor unrelated logic.

**Key files**:
- `src/app/App.tsx`

**Verification**:
- After the change, no `"polish ready"`, `"Phase 9 polish"`, or `"shell notes"` string remains in `src/app/App.tsx`.
- `npm run lint` and `npm run build` pass.
- Manual smoke check (documented in the progress report) confirms that loading the app no longer shows the floating bottom-right box.
- Existing `og` and `go` gameplay routes still render and remain playable.

### Step 12.5 — Drive Practice Length Selector and Guess Validation From the Full 2–35 Data Layer

**Build / modify**:
- Replace the use of `BUNDLED_WORD_LIST_LENGTHS` (currently `[2, 5, 35]`) as the source of available practice lengths everywhere the selector is rendered and everywhere `og`/`go` practice sessions compute their allowed lengths. The full supported set is `MIN_PRACTICE_WORD_LENGTH`..`MAX_PRACTICE_WORD_LENGTH` (2..35), already defined in `src/game/constants.ts`.
- Introduce a single helper (e.g. `getSupportedPracticeLengths()` in `src/data/index.ts` or `src/game/constants.ts`) that returns the canonical 2..35 range, and have `OgGame`, `GoGame`, and the home shell consume it. Keep `BUNDLED_WORD_LIST_LENGTHS` for accurate “which lengths are seed-bundled” diagnostics only.
- Extend the bundled word-list assets in `src/data/bundled/` so practice play has a working answer set and `validGuesses` set for every length 2..35. Source the content from the existing Hugging Face dataset pipeline (`src/data/huggingFaceSource.ts` + `refresh.ts`) by running the pipeline once locally and committing the resulting 34 `words_length_<N>.json` files as bundled snapshots. This preserves the “bundle pre-processed JSON at production build time” rule in CONSTITUTION §8.2 and removes the “word not in list” regression caused by tiny seed lists.
  - If a length’s upstream file is too large to comfortably ship in the main JS bundle, switch `src/data/wordLists.ts` to dynamic, length-indexed import (`import()`) so daily mode (length 5) still loads only its file. Either approach must satisfy CONSTITUTION §8.2 and §12.4 (daily-mode performance) and §3.1 (practice 2–35). Choose whichever option keeps the daily-mode bundle size and TTI within current measurements; record the decision in the progress report.
  - Update `src/data/wordLists.ts` so the bundle map reflects the chosen strategy (either all 34 statically imported, or a `Record<number, () => Promise<WordListFile>>` lazy map) without changing the public `getWordRepository` contract — adapt callers minimally if and only if dynamic loading is chosen.
- Update `loadBundledWordList` (and any synchronous consumers it has) only as required by the chosen strategy. If dynamic loading is introduced, add an explicit async path and keep the synchronous path for daily length 5.
- Verify that practice mode no longer rejects valid words from the full lists by exercising representative guesses against lengths 2, 5, 12, 20, and 35 in unit tests.

**Key files**:
- `src/data/wordLists.ts`
- `src/data/loadWordList.ts`
- `src/data/wordRepository.ts`
- `src/data/index.ts`
- `src/data/bundled/words_length_<N>.json` for N = 2..35 (new/updated bundled snapshots)
- `src/app/OgGame.tsx`
- `src/app/GoGame.tsx`
- `src/app/App.tsx` (length-selector display only)
- `src/game/og/session.ts`
- `src/game/go/session.ts`
- Relevant `*.test.ts` files for the data layer and game sessions

**Verification**:
- Unit tests cover: practice length selector exposes every integer 2..35; `getValidGuesses` returns a non-trivial set for lengths 2, 5, 12, 20, 35; a known-valid word from the bundled list for each tested length passes validation; daily mode remains locked to length 5.
- `npm run test`, `npm run lint`, and `npm run build` pass.
- Manual smoke check (documented in the progress report): the practice length dropdown shows 2..35; submitting common words at three sampled lengths is accepted; submitting clearly invalid strings is still rejected; daily `og`/`go` still play normally.
- Data safety: imported words and definitions must still be treated as untrusted for rendering (CONSTITUTION §8.3). No unescaped HTML may be introduced.

### Step 12.6 — Verify the Persistence Layer Still Loads in Development and Production Mode

**Build / modify**:
- No new functionality. After Steps 12.2–12.3 land, re-exercise the existing persistence-layer wiring:
  - `api/_lib/vercelBlobStore.ts`, `api/_lib/wordListStore.ts`, `api/cron/refresh-word-lists.ts`, `api/admin-refresh.ts`, `api/word-lists/manifest.ts`.
- Confirm the factory still returns the documented `skipped` status when `BLOB_READ_WRITE_TOKEN` is absent, and the documented success path when it is present (use the existing test doubles in `src/data/refreshStore.ts`).

**Verification**:
- `npm run test` continues to cover the existing refresh-store and refresh-pipeline tests with no regressions.
- The persistence-layer unit tests for atomic swap, projection, and per-length failure must still pass unchanged.
- The build artifact must not bundle `@vercel/blob` into the client (`dist/`). Re-run the client-bundle leak check used in Phase 13.

### Step 12.7 — Documentation, Changelog, and Progress Artifacts

**Build / modify**:
- Add a new `Unreleased`/`Fixed` block to `CHANGELOG.md` describing:
  - The TypeScript build-error fixes (`.js` extensions, JSON import attribute, implicit-`any` fixes, `loadWordList.ts` type mismatch, new `tsconfig.api.json`).
  - Removal of the leftover Phase 9 “polish ready” floating box and adjacent debug surfaces.
  - Practice length selector now exposing the full 2..35 range and validation now using the full bundled (or lazily-loaded) word lists.
  - Any documentation updates required by the chosen bundling strategy in Step 12.5.
- Update `docs/deployment.md` only if the chosen Step 12.5 strategy changes operator-visible behavior. Do not introduce documentation about features outside the diagnosis report’s scope.
- Update `progress/PROGRESS.csv` with a new row for Phase 12 (`phase_id = 14`, title `"Phase 12 — Fix Build Errors, Length Selector, and Polish Artifacts"`).
- Create `progress/PROGRESS-STEP-14.md` from `progress/PROGRESS-TEMPLATE.md` summarizing what changed, what verification ran, known limitations, and whether the user is safe to proceed.
- If anything cannot be completed (for example because Vercel preview access is not available to verify Step 12.6 in production), annotate the progress report with the missing check, the reason, and what was verified locally instead, per CONSTITUTION §6.2.

**Key files**:
- `CHANGELOG.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-14.md`
- `docs/deployment.md` (only if required)

**Verification**:
- The CSV row matches the progress markdown summary.
- No secrets, tokens, or private deployment data appear in any updated artifact (CONSTITUTION §5.4, §14).

### Step 12.8 — Full Verification, Security Review, and Halt

**Build / modify**:
- No new code changes in this step.

**Verification**:
- Run, in order, and record results:
  - `npm ci`
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - Standalone `tsc --noEmit` over `api/` using the new `tsconfig.api.json` to confirm zero errors there.
  - `git diff --check`
  - The client-bundle leak check used in Phase 13 (confirm `@vercel/blob` is not in `dist/`).
- Run the available security review tool (`codeql_checker`) on the changes. Address any new alert that is a true positive in changed lines before halting (CONSTITUTION §14).
- Manual smoke checks captured in the progress report:
  - Home shell no longer shows the floating “polish ready” box.
  - Practice length dropdown shows 2..35 in `og` and `go`.
  - Representative known-valid guesses at lengths 2, 5, and 35 are accepted; invalid strings still rejected.
  - Daily `og` and daily `go` still play with length 5.
  - Existing post-game definitions, sharing, settings, and admin surfaces still render.
- Reconfirm CONSTITUTION compliance: no out-of-scope v1 features, no removed/weakened tests, no committed secrets, no service-role exposure to the client, no unescaped HTML from imported definitions, and progress artifacts updated.

**Pause point**: Commit and push all changes through the approved progress-reporting workflow. Provide the required review-gate summary (what changed, what was verified, limitations, progress CSV + step report links, exact approval needed) and halt for explicit user approval before any production deployment action.

### Phase 12 Exit Checklist

- All 18 TypeScript build errors from the diagnosis report are resolved.
- The floating Phase 9 “polish ready” box and adjacent Phase 9 debug surfaces are removed from `src/app/App.tsx`.
- Practice mode exposes every length 2..35 in `og` and `go`, and guess validation uses the full bundled (or lazily-loaded) word lists.
- The persistence layer continues to behave as in Phase 13 (atomic swap, factory skip-when-unconfigured, no `@vercel/blob` in the client bundle).
- `CHANGELOG.md`, `progress/PROGRESS.csv`, and `progress/PROGRESS-STEP-14.md` are updated and free of secrets.
- `npm run lint`, `npm run test`, `npm run build`, and the standalone `api/` typecheck all pass; `codeql_checker` is run and any true-positive alert in changed lines is fixed.
- Halt for explicit user approval before any production release action.

---

## 17. Phase 12 — Fix Build Errors, Length Selector, and Polish Artifacts (Updated Diagnosis Report 2026-05-26)

**Authority**: This section supersedes Section 16 as the active fix plan for the issues called out in the updated `DIAGNOSIS-REPORT-2026-05-26.md` (the version dated 2026-05-26 with the "Phase 12 fixes were insufficient" status). It is bound by `CONSTITUTION.md` (scope fidelity, minimal change, verification-first execution, hybrid data-layer discipline, data safety, progress logging) and by `BRRRDLE-SPEC.md`. No new v1 scope is added.

**Goal**: Finish the work begun in Section 16 by (a) eliminating the TypeScript build errors that the updated diagnosis report says are still reaching the Vercel build, (b) ensuring the practice length selector and the guess validator actually use the full 2–35 data layer in production rather than falling back to the small seed slice, and (c) removing every leftover Phase 9 debug surface (the "polish ready" floating box and its peers). After this section, both visible user-facing problems and the underlying build/runtime mismatch must be resolved end-to-end, locally and on Vercel.

**Scope boundary**: No new game features, no economy or stats changes, no new Supabase tables, no new client-side runtime dependencies. Do not change the daily-mode word length, the Hugging Face source contract, or the persistence-layer atomic-swap semantics. Do not rewrite Phases 0–11 or the persistence layer from Phase 13.

**Inputs to reconcile before editing**:
- `DIAGNOSIS-REPORT-2026-05-26.md` (updated version) — authoritative symptom list.
- `progress/PROGRESS-STEP-14.md` — what Section 16 actually shipped (real bundled content for lengths 2–18, deterministic synthetic placeholders for 19–35, new `tsconfig.api.json`, removed "polish ready" toast).
- Latest Vercel build logs supplied with the updated diagnosis report — authoritative for any error that does not reproduce locally.
- `BRRRDLE-SPEC.md` §§ on daily length, practice length range, and definitions.

### Step 12U.1 — Reconcile the Updated Diagnosis Against the Current Repository

**Build / modify**:
- No code changes in this step.

**Verification**:
- Re-read the updated `DIAGNOSIS-REPORT-2026-05-26.md`, `CONSTITUTION.md` §§ 2, 5.4, 6, 8, 12, 14, `BRRRDLE-SPEC.md`, and `progress/PROGRESS-STEP-12.md`, `PROGRESS-STEP-13.md`, `PROGRESS-STEP-14.md`.
- Run, in order, and capture the full output for the progress report:
  - `npm ci`
  - `npm run lint`
  - `npm run test`
  - `npm run build` (which runs `tsc -b && vite build` and so exercises `tsconfig.api.json` via the project references added in Section 16)
  - Standalone `npx tsc -p tsconfig.api.json --noEmit`
- For every error class the updated diagnosis lists (missing `.js` extensions; missing exports from `src/data/index.ts` such as `HUGGING_FACE_API_BASE`, `HUGGING_FACE_DATASET_ID`, `fetchHuggingFaceRemoteMetadata`, `refreshWordListsFromHuggingFace`; JSON import attribute issues; `loadWordList.ts` type mismatch), record whether it (a) still reproduces locally, (b) only reproduces on Vercel, or (c) is already fixed. This authoritative reproduction map drives Steps 12U.2–12U.4.
- For every user-visible symptom (practice dropdown shows 2/5/35, "word not in list" for valid words, "polish ready" floating box), reproduce locally via `npm run dev` (or `vite preview` after a build) and record the screenshot/notes.
- If any diagnosed error does **not** reproduce locally, gather the Vercel build log lines the user supplied, identify the exact upstream commit Vercel built, and check whether that commit predates Section 16. If so, the fix is "trigger a clean Vercel rebuild" and the only code-side work is whatever truly reproduces locally — document this clearly in the progress report.

**Halt behavior**: This step does not halt; it produces the reproduction map for the rest of Section 17.

### Step 12U.2 — Make the `api/` ↔ `src/data/` Boundary Robust Under Node16/NodeNext Resolution

**Build / modify** (only if Step 12U.1's reproduction map shows the errors still occur):
- For every relative import inside `api/**/*.ts` that crosses into `src/`, confirm the import path uses an explicit `.js` extension and matches the file that exists in `src/`. Add the extension where missing. Do not change `src/` → `src/` imports unless the api project actually pulls that module in.
- For every symbol the updated diagnosis says is missing from `src/data/index.ts` (`HUGGING_FACE_API_BASE`, `HUGGING_FACE_DATASET_ID`, `HUGGING_FACE_RAW_BASE`, `fetchHuggingFaceRemoteMetadata`, `refreshWordListsFromHuggingFace`, `type RefreshSourceInfo`, plus any other symbol the api files import via the barrel), verify the barrel re-exports it. If a symbol is not actually exported from its source module, export it from that module first, then re-export from `src/data/index.ts`. Do not introduce wildcard re-exports that change public API surface.
- If `api/` files reach into `src/data` modules via deep paths (`../src/data/refreshStore.js`, etc.) and that bypasses the barrel, leave the deep imports as-is and only verify the deep target itself exports the symbol with the expected name. Prefer deep imports for api ↔ data crossings to avoid increasing the client barrel surface.
- For any JSON import the api project consumes (manifest JSON, bundled JSON, etc.), confirm the import syntax matches the TypeScript version pinned in `package.json`. Use `with { type: 'json' }` import attributes if and only if the pinned TS version supports them; otherwise keep the established pattern (`resolveJsonModule` + default import) used elsewhere in `src/data/`. Do not mix patterns inside the same project.
- Fix the `loadWordList.ts` type mismatch flagged in the updated diagnosis by tightening the inferred type at the source rather than weakening callers; if the diagnosis report does not pinpoint the exact line, derive it from Step 12U.1's reproduction map.
- Keep `tsconfig.api.json`, `tsconfig.app.json`, and `tsconfig.node.json` separately scoped. Do not relax `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, or `verbatimModuleSyntax` to silence errors.

**Key files** (final list driven by Step 12U.1):
- `src/data/index.ts`
- `src/data/huggingFaceSource.ts`
- `src/data/refresh.ts`
- `src/data/refreshStore.ts`
- `src/data/loadWordList.ts`
- `src/data/wordLists.ts` (only if JSON import pattern changes)
- `api/admin-refresh.ts`
- `api/cron/refresh-word-lists.ts`
- `api/word-lists/manifest.ts`
- `api/_lib/wordListStore.ts`
- `api/_lib/vercelBlobStore.ts`
- `tsconfig.api.json` (only if a setting actually has to change; document why)

**Verification**:
- `npm run build` exits 0 with zero TypeScript errors across all three tsconfigs.
- `npx tsc -p tsconfig.api.json --noEmit` exits 0.
- `npm run lint` exits 0.
- `npm run test` exits 0 (no test deletions or weakenings; if a test asserts an exported symbol now exists, it stays).
- A Vercel preview build (or, if Vercel access is unavailable, a local clean build invoked exactly as `vercel build` would) reports the same zero-error result. If Vercel cannot be exercised from the sandbox, document the limitation under CONSTITUTION §6.2 and ask the user to trigger a manual Vercel rebuild as the final verification.

### Step 12U.3 — Ensure the Practice Length Selector and Guess Validator Use the Full 2–35 Range in Production

**Build / modify**:
- Audit every consumer of `BUNDLED_WORD_LIST_LENGTHS`, `getAvailableOgPracticeLengths()`, and `getAvailableGoPracticeLengths()` in `src/app/`, `src/game/`, and `src/data/`. The selector and the validator must derive their length set from `SUPPORTED_PRACTICE_WORD_LENGTHS` (2..35), filtered only by which lengths actually have a usable word list available at runtime, not by whether they were originally hand-seeded.
- If any code path still treats `BUNDLED_WORD_LIST_LENGTHS` as the "what the user is allowed to pick" set, rewrite that code path to use the supported practice range and to gate per-length availability on `loadBundledWordList(...).ok`. Keep `BUNDLED_WORD_LIST_LENGTHS` strictly as a diagnostic value (`bundled lengths` display only).
- Confirm that the bundled JSON for every length 2..35 (a) loads cleanly through `loadBundledWordList`, (b) returns a non-empty `validGuesses` set, and (c) returns at least one valid answer. If a length still ships with placeholder content that fails validation or produces "word not in list" for ordinary English words at that length, replace its placeholder with a real dictionary slice from the existing Hugging Face pipeline (`refreshWordListsFromHuggingFace`/local pipeline run) under `src/data/bundled/words_length_<N>.json`. Real content is preferred for every length 2..35. If a length's upstream dictionary is so large it would noticeably increase the client bundle size, switch only those lengths to length-indexed dynamic `import()` so daily mode (length 5) still loads only its file; daily-mode load characteristics must not regress (CONSTITUTION §12.4). Record the chosen strategy per length range in the progress report.
- Where the bundled answer pool for a given length is intentionally small (e.g., very long words), make sure the validator still uses the full `validGuesses` set for that length, not just the answer pool. This avoids the "valid word rejected" symptom from the updated diagnosis even when answer pools are small.
- Update `src/data/wordRepository.ts` and the OG/GO session selectors only as much as needed to honor the above and to keep the public `getWordRepository` contract stable. If a dynamic-import path is introduced, gate it behind an explicit async API and keep the synchronous path for daily length 5.

**Key files**:
- `src/data/wordLists.ts`
- `src/data/loadWordList.ts`
- `src/data/wordRepository.ts`
- `src/data/index.ts` (only if a new helper is exported)
- `src/data/bundled/words_length_<N>.json` for every N in 2..35 that still ships placeholder content
- `src/app/App.tsx` (length-selector display only, not behavior)
- `src/app/OgGame.tsx`
- `src/app/GoGame.tsx`
- `src/game/og/session.ts`
- `src/game/go/session.ts`
- `src/game/constants.ts` (only if a new derived helper is introduced)

**Verification**:
- New or updated unit tests cover:
  - `getAvailableOgPracticeLengths()` and `getAvailableGoPracticeLengths()` each return every integer 2..35.
  - `loadBundledWordList('practice', N).ok === true` for every N in 2..35.
  - A representative real English word at each of lengths 2, 5, 12, 20, and 35 is accepted by `validateGuess`. Length-35 may be exempted if and only if the upstream dataset legitimately ships no 35-letter words on a given day; the test must then verify the **graceful fallback** path rather than acceptance.
  - Daily mode remains locked to length 5 (assert at the type and the session layer).
- `npm run test`, `npm run lint`, `npm run build` all pass.
- Manual smoke check (documented in progress report): `npm run dev` shows the practice length dropdown listing every integer 2..35 in both `og` and `go`; submitting a known real word at lengths 2, 5, 12, 20, and 35 is accepted; submitting clearly invalid strings is still rejected; daily `og` and daily `go` still play normally with length 5.
- Data safety: per CONSTITUTION §8.3, no unescaped HTML may be introduced from imported word/definition data. Reuse existing definition rendering helpers.

### Step 12U.4 — Verify Removal of Every Phase 9 Debug Surface

**Build / modify**:
- Confirm Section 16 already removed the `shellMessages` `<ToastRegion>` mount, the "Phase 9 polish" sidebar `<Panel>`, the `LoadingState` filler, the "Review shell notes" button, and the "Phase 9 shell notes" `Dialog` from `src/app/App.tsx`. If any of these (or a peer leftover such as a "polish ready" string, a debug toast payload, or a debug-only panel) still exists anywhere under `src/`, remove only that debug surface — do not modify gameplay logic, accessibility primitives, or the underlying `ToastRegion`/`Panel`/`Dialog` components.
- Grep the entire `src/` tree for `polish ready`, `Phase 9`, and any debug-only string flagged by the updated diagnosis. The grep result must be empty for the user-facing strings after this step.

**Key files**:
- `src/app/App.tsx`
- Any other file the grep surfaces (expected: none)

**Verification**:
- Grep returns no matches for the debug strings above under `src/` (or under `dist/` after `npm run build`).
- Manual smoke check confirms the floating bottom-right box no longer appears on any route.
- Existing accessibility, focus order, and ToastRegion-based future surfaces remain intact (CONSTITUTION §12).

### Step 12U.5 — Re-verify the Persistence Layer End-to-End

**Build / modify**:
- No new functionality. After Steps 12U.2–12U.4, re-exercise the existing persistence-layer wiring (`api/_lib/vercelBlobStore.ts`, `api/_lib/wordListStore.ts`, `api/cron/refresh-word-lists.ts`, `api/admin-refresh.ts`, `api/word-lists/manifest.ts`) and the client-side `refreshStore.ts` projection.
- Confirm the factory still returns the documented `skipped` status when `BLOB_READ_WRITE_TOKEN` is absent and the documented success path when it is present (use the existing test doubles in `src/data/refreshStore.ts`). Do not invent new fixtures.

**Verification**:
- `npm run test` continues to cover the existing refresh-store and refresh-pipeline tests with no regressions and no weakened assertions.
- Atomic swap, projection, and per-length failure tests still pass unchanged.
- The build artifact must not bundle `@vercel/blob` into the client (`dist/assets/*.js`). Re-run the Phase 13 client-bundle leak check (`grep -R "@vercel/blob" dist/` returns no matches in shipped chunks) and record the result.
- The public manifest endpoint shape (`{ ok, manifest }` / `{ ok: false, reason }`) and HTTP cache headers from `api/word-lists/manifest.ts` are unchanged.

### Step 12U.6 — Documentation, Changelog, and Progress Artifacts

**Build / modify**:
- Add a new `[Unreleased] — Fixed` block to `CHANGELOG.md` describing:
  - Resolution of the residual TypeScript build errors from the updated diagnosis (missing `.js` extensions across `api/`/`src/data/` boundary, missing barrel re-exports from `src/data/index.ts`, JSON import attribute alignment, `loadWordList.ts` type mismatch).
  - Practice length selector now exposing the full 2..35 range from real (or, where real content is unavailable, gracefully-handled) bundled data, with the "word not in list" regression resolved.
  - Removal of any remaining Phase 9 debug surface.
  - Any documentation update required by the bundling strategy chosen in Step 12U.3 (e.g., note about dynamic-import lengths).
- Update `docs/deployment.md` only if Step 12U.3's strategy changes operator-visible behavior (for example, if length-indexed dynamic imports change preview deployment expectations). Do not introduce documentation about features outside the diagnosis report's scope.
- Append a new row to `progress/PROGRESS.csv` for this section using `phase_id = 15`, title `"Phase 12 — Fix Build Errors, Length Selector, and Polish Artifacts (Updated Diagnosis Report 2026-05-26)"`. Reuse the prompt-gate/next-step columns consistently with prior rows.
- Create `progress/PROGRESS-STEP-15.md` from `progress/PROGRESS-TEMPLATE.md` summarizing what changed across Steps 12U.1–12U.6, what verification ran, known limitations (including any Vercel-only verification the agent could not perform), and whether the user is safe/authorized to proceed to a standard release review.
- If any step cannot be completed (for example because Vercel preview access is not available), annotate the progress markdown with the missing check, the reason, and what was verified locally instead, per CONSTITUTION §6.2.

**Key files**:
- `CHANGELOG.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-15.md`
- `docs/deployment.md` (only if required)

**Verification**:
- The new CSV row matches the progress markdown summary exactly.
- No secrets, tokens, deploy URLs containing internal identifiers, or private deployment data appear in any updated artifact (CONSTITUTION §5.4, §14).
- Changelog entry references only user-facing or build-facing behavior changes; it does not leak repository-internal debugging detail.

### Step 12U.7 — Full Verification, Security Review, and Halt

**Build / modify**:
- No new code changes in this step.

**Verification**:
- Run, in order, and record results in `progress/PROGRESS-STEP-15.md`:
  - `npm ci`
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - `npx tsc -p tsconfig.api.json --noEmit`
  - `git diff --check`
  - The Phase 13 client-bundle leak check (confirm `@vercel/blob` is not in any `dist/assets/*.js`).
- Run `codeql_checker` on the diff. Address any true-positive alert in changed lines before halting (CONSTITUTION §14). False positives may be ignored with a written justification in the progress report.
- Manual smoke checks captured in the progress report:
  - Home shell no longer shows the floating "polish ready" box or any Phase 9 debug surface on any route.
  - Practice length dropdown shows every integer 2..35 in both `og` and `go`.
  - Known real English words at lengths 2, 5, 12, 20, and 35 are accepted; clearly invalid strings are still rejected.
  - Daily `og` and daily `go` still play normally with length 5.
  - Post-game definitions, sharing, settings, and admin surfaces still render as before.
- Reconfirm CONSTITUTION compliance: no out-of-scope v1 features; no removed or weakened tests; no committed secrets; no service-role exposure to the client; no unescaped HTML from imported definition data; progress artifacts updated; daily-mode performance unchanged.

**Pause point**: Commit and push every change through the approved progress-reporting workflow. Provide the standard review-gate summary (what changed, what was verified, limitations, links to the updated `progress/PROGRESS.csv` row and `progress/PROGRESS-STEP-15.md`, exact approval needed) and halt for explicit user approval before any production deployment action.

### Section 17 Exit Checklist

- Every error class in the updated `DIAGNOSIS-REPORT-2026-05-26.md` is either resolved in code or documented as already-fixed and pending a clean Vercel rebuild, with the reproduction map preserved in `progress/PROGRESS-STEP-15.md`.
- Every Phase 9 debug surface (the "polish ready" floating box and its peers) is gone from `src/` and from the built `dist/`.
- Practice mode exposes every length 2..35 in `og` and `go`; guess validation uses the full bundled (or lazily-loaded) word lists at every length; daily mode remains locked to length 5.
- The persistence layer continues to behave as in Phase 13 (atomic swap, factory skip-when-unconfigured, no `@vercel/blob` in client bundle).
- `CHANGELOG.md`, `progress/PROGRESS.csv`, and `progress/PROGRESS-STEP-15.md` are updated and free of secrets or private deployment data.
- `npm run lint`, `npm run test`, `npm run build`, and the standalone `api/` typecheck all pass; `codeql_checker` is run and any true-positive alert in changed lines is fixed.
- The agent halts and waits for explicit user approval before any production release action.

---

## 18. Phase 13 — Plan Addendum (ADDITIONS-2026-05-27): Word Explorer, Feedback Tab, Sound Effects, Authentication Improvements, and Repository Cleanup

**Plan Version**: 1.3 (addendum)
**Date**: 2026-05-27
**Status**: Draft for user review — implementation must NOT begin until the user explicitly approves this addendum.
**Authority**: This addendum is bound by `CONSTITUTION.md` (v3.1), `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, prior sections of this plan, and `ADDITIONS-2026-05-27.md`.

### 18.1 Scope, Source of Truth, and Operating Rules

This addendum covers the five new work streams declared in `ADDITIONS-2026-05-27.md`:

1. **Word Explorer Tab** (new public tab).
2. **Feedback Tab** (new public tab).
3. **Sound Effects** (new optional in-game audio with Settings toggle).
4. **Authentication Improvements** (email + password alongside existing magic link, durable session, reliable admin role detection).
5. **Repository Cleanup & Re-organization** (safe, non-deleting reorganization with import-path updates).

Binding rules for this addendum:

- `ADDITIONS-2026-05-27.md` is the source of truth for behavior; this section is the source of truth for ordering, verification, and pause points.
- No code changes are executed by writing this addendum. Implementation begins only after explicit user approval.
- No files may be deleted, renamed in a lossy way, or have existing functionality removed at any phase below. Moves are allowed (Step 18.3) but every move must be accompanied by import-path updates so behavior is preserved.
- All new tabs (Word Explorer, Feedback) must be visible to everyone, including guests (per `ADDITIONS-2026-05-27.md` §"Implementation Constraints").
- Daily `og` and daily `go` remain fixed at 5 letters (CONSTITUTION §3, BRRRDLE-SPEC §3.1). Nothing in this addendum may change that.
- Every step ends with verification and an explicit halt-for-approval gate, per CONSTITUTION §5.3 and §6, and per the Standard Phase Exit Checklist in §1.3 of this plan.
- `progress/PROGRESS.csv` and a new `progress/PROGRESS-STEP-N.md` report must be created/updated for every step below before halting. `CHANGELOG.md` must receive a corresponding `[Unreleased]` entry at every step that ships user-visible or build-visible change.
- No secrets, tokens, deploy URLs containing internal identifiers, or private deployment data may appear in any artifact (CONSTITUTION §5.4, §14).
- All new code paths must pass `npm run lint`, `npm run test`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit` (where api/ is touched), and `codeql_checker` must be run after each step and any true-positive alert in changed lines fixed before halting (CONSTITUTION §14).
- Network calls that the sandbox cannot reach (e.g., Hugging Face, Supabase production, Vercel deploy hooks) must be recorded as documented limitations per CONSTITUTION §6.2; they must not be silently skipped.

### 18.2 Phase 13.0 — Pre-flight, Baseline, and Risk Map

**Goal**: Lock the current `main` as a known-good baseline before any addendum work begins, and produce a written risk map.

**Build / modify**: No source changes. Produce only progress artifacts.

**Activities**:
- Read `progress/PROGRESS.csv` and the most recent `progress/PROGRESS-STEP-N.md` to confirm no in-flight blockers remain from Phase 12 follow-ons.
- Confirm `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, this plan, and `ADDITIONS-2026-05-27.md` are aligned (no conflicts with daily 5-letter lock, practice 2–35, definitions ordering, admin role gate).
- Produce an internal risk map of:
  - Files most likely to move during Step 18.3 (cleanup).
  - Modules consumed by `api/` (server) so any cleanup move preserves serverless build behavior and the standalone `tsconfig.api.json` typecheck.
  - All places that currently read Supabase session/role (for the auth improvements step).
  - Places that already wire navigation order (for the new tabs).
- Record the risk map and the chosen execution order (the order in §18.1 list above) in `progress/PROGRESS-STEP-18.md`.

**Key files**:
- `progress/PROGRESS.csv` (append a new row for `phase_id = 18`, title `"Phase 13.0 — Plan Addendum Pre-flight & Risk Map (ADDITIONS-2026-05-27)"`).
- `progress/PROGRESS-STEP-18.md` (new, from `progress/PROGRESS-TEMPLATE.md`).
- `CHANGELOG.md` (`[Unreleased] — Documentation` entry noting that the addendum and risk map were produced and that implementation has not yet started).

**Verification**:
- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Recorded confirmation that no test was weakened or removed (CONSTITUTION §6.3).

**Pause point**: Commit/push via the approved progress-reporting workflow. Halt for explicit user approval of the addendum and the risk map before beginning Step 18.3 (Repository Cleanup).

### 18.3 Phase 13.1 — Repository Cleanup & Re-organization (Safe, Non-Destructive)

**Goal**: Re-organize `src/` (and adjacent assets) into a cleaner, more logical layout, without deleting anything and without changing behavior. This step is executed **first** so that all subsequent feature work in this addendum lands on the cleaned layout.

**Constitutional guardrails** (CONSTITUTION §3, §6.3, §14):
- No file may be deleted.
- No file may be renamed in a way that drops its content.
- No test may be removed, skipped, or weakened.
- Daily 5-letter lock and practice 2–35 contract must remain intact.
- Server-side `api/` build behavior, the `tsconfig.api.json` standalone typecheck, and the "no `@vercel/blob` in client bundle" invariant (Phase 13 of this plan) must remain intact.

**Build / modify** (executed in clearly separated sub-commits so review is feasible):

- **18.3.1 Audit & Move Map (no moves yet).** Produce a concrete move map listing each source path and its proposed new path, grouped by logical concern (e.g., gameplay engine, data layer, UI primitives, account/auth, admin, PWA, stats/progression, definitions, app shell). The move map is committed as part of `progress/PROGRESS-STEP-19.md` so the user can approve it before any file actually moves. The map must:
  - Preserve all module boundaries currently relied on by `api/` and by `tsconfig.api.json`.
  - Preserve the existing barrel re-exports from `src/data/index.ts`, `src/ui/index.ts`, `src/account/index.ts`, and `src/admin/index.ts`.
  - Avoid moving JSON word-list assets unless absolutely required; if moved, the build-time JSON import attributes and the bundled-source path documented in the data layer must be updated atomically.
- **18.3.2 Execute moves in small, reviewable groups.** Each group is a separate commit. For each group:
  - Move files with `git mv` (history-preserving).
  - Update every import path that references the moved file, including TypeScript path aliases (if any are introduced).
  - Update any `__tests__` paths and Vitest configuration that depends on file location.
  - Re-export from existing barrel files so external consumers (including `api/`, `src/App.tsx`, `src/main.tsx`) do not need to change.
- **18.3.3 Update tooling references.** If any move changes paths used by:
  - `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `vercel.json`, `public/brrrdle-sw.js`, `docs/`, `progress/`, or any GitHub Actions workflow,
  - those references must be updated in the same commit as the move and listed in the corresponding `progress/PROGRESS-STEP-N.md`.

**Key files** (representative; exact list is enumerated by 18.3.1):
- `src/**`
- `api/**` (only import paths if needed; no behavior change)
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.api.json`
- `vite.config.ts`
- `eslint.config.js`
- `vercel.json`
- `docs/**` (only if a path referenced from docs moves)

**Verification** (run after every sub-commit, recorded in `progress/PROGRESS-STEP-19.md`):
- `npm ci`
- `npm run lint`
- `npm run test` (full suite, expect identical count and identical pass set; no test may be added or removed in this step except where the test itself moves)
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- Client-bundle leak check: `grep -R "@vercel/blob" dist/` returns no matches in shipped chunks (Phase 13 invariant).
- `git diff --check`
- `codeql_checker` on the cumulative diff at end of step.

**Manual follow-up steps the user may need to perform** (documented in `progress/PROGRESS-STEP-19.md` and in `CHANGELOG.md`):
- **Vercel**: If `vercel.json` rewrites, the `api/` entry-points, or the cron route path change because of a move, the user must redeploy and re-verify that the Vercel Cron schedule and `BLOB_READ_WRITE_TOKEN` / `CRON_SECRET` environment variables still bind to the correct routes. If no `api/` path changed, no Vercel reconfiguration is required and this must be stated explicitly.
- **Supabase**: If the Supabase client module path changes (currently `src/account/supabaseClient.ts`), the user does **not** need to reconfigure Supabase project settings — only the local `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` envs continue to apply. This must be stated explicitly so the user is not misled.
- **GitHub Pages / Jekyll docs**: If any `docs/` file moves, confirm the `_config.yml` `permalink` strategy and any internal cross-links still resolve.
- **GitHub Actions**: If a workflow path expression depends on a moved directory, the workflow file must be updated in the same commit; otherwise, no Actions reconfiguration is required.

**Progress tracking**:
- Append `phase_id = 19`, title `"Phase 13.1 — Repository Cleanup & Re-organization (ADDITIONS-2026-05-27)"` to `progress/PROGRESS.csv`.
- Create `progress/PROGRESS-STEP-19.md` with the move map, per-group commit list, verification results, and the explicit manual-follow-up list above.
- Add a `CHANGELOG.md` `[Unreleased] — Changed` entry summarizing only the reorganization at a behavior-preserving level (no new features).

**Pause point**: Commit/push via the approved workflow. Halt for explicit user approval before beginning Step 18.4.

### 18.4 Phase 13.2 — Word Explorer Tab

**Goal**: Add a new public top-level tab that shows the exact word lists the game is currently using, with live filtering, sortable columns, copy buttons, and a pre-filled "Request word" GitHub Issue path.

**Build / modify**:

- **18.4.1 Data hook.** Add a hook that returns, for a chosen length `N` in 2..35, the combined deduplicated union of `answers` ∪ `validGuesses`, tagged with `Type = "Answer"` and/or `Type = "Valid Guess"` (a word that appears in both is tagged as both, per the requirement that the two checkboxes are combinable). The hook must reuse the existing data layer (the same loader used by gameplay) so it inherits the Vercel Blob / manifest → bundled JSON fallback chain. It must not introduce a new fetch path or duplicate the loader.
- **18.4.2 UI.** Add a new route `word-explorer` with:
  - Length selector (default = 5; range = 2..35 inclusive, intersected with `BUNDLED_WORD_LIST_LENGTHS` and any extra lengths the live manifest exposes).
  - Live search box (case-insensitive, exact and prefix-aware; filters incrementally as the user types).
  - Two checkboxes — "Show Answers" and "Show Valid Guesses" — both checked by default and combinable.
  - Sortable column headers ("Word", "Type"). Sort must be deterministic and reversible.
  - Per-row copy-to-clipboard button using the existing UI primitive style (`src/ui/Button.tsx`) and the standard browser clipboard API with a focus-safe fallback.
  - Responsive layout: on small screens the table collapses into a single-column card list (use existing Tailwind utilities; do not introduce a new responsive framework).
  - Empty state: `"{searchTerm}" is not in the current {length}-letter word list.` plus a "Request this word" button.
- **18.4.3 "Request this word" link.** Build a URL to GitHub's pre-filled new-issue endpoint for `ryanjosephkamp/brrrdle` with:
  - Title: `Word request: "{word}" (length {N})`
  - Labels: `word-request`
  - Body: contains the requested word, the selected length, the current date (ISO-8601, generated client-side), a note that the request came from the in-game Word Explorer, and a "Why this word?" optional section with a polite prompt.
  - All URL parameters must be percent-encoded.
  - The link opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`).
- **18.4.4 Navigation.** Update `src/app/routes.ts` (or its post-cleanup equivalent path from Step 18.3) so the navigation order is exactly: og | go | Practice | **Word Explorer** | **Feedback** | Settings | Admin. The Admin entry must remain hidden for non-admins (CONSTITUTION §8.2).
- **18.4.5 Accessibility & motion.** Keyboard-navigable controls, visible focus rings, ARIA labels on the copy buttons, and respect for `prefers-reduced-motion` (CONSTITUTION §12).
- **18.4.6 Tests.**
  - Unit tests for the combine/dedupe/tag logic at length 5 and at least one short (2 or 3) and one long (≥20) length.
  - Unit tests for the GitHub Issue URL builder, including encoding of words with quotes, apostrophes, and Unicode (where applicable to the bundled set).
  - Unit tests for the empty-state copy and the route ordering.

**Curation note (read-only for this repo)**: The answers curation algorithm in `ADDITIONS-2026-05-27.md` §1 Data Source ("Quality score = 0.45×frequency + 0.30×positional + 0.15×vowel-balance + 0.10×uniqueness", dynamic target size, deterministic seed `42 + length`) is owned by the upstream `english-openlist` preprocessing repo, **not** by this repo. The brrrdle app only **consumes** the resulting JSONs and the `metadata` block they contain. This step must document — in the progress report — that no curation algorithm is being implemented inside `brrrdle` and that the metadata block is surfaced verbatim if the live manifest contains it.

**Key files** (paths reflect post-cleanup layout; exact names finalized in Step 18.3):
- New: route file for `WordExplorer`, page component, table component, length selector wrapping the existing primitive (if any), GitHub Issue URL helper, hook.
- Updated: `src/app/routes.ts` (navigation order, route entry), `src/app/App.tsx` (route wiring).
- Updated: barrel `index.ts` files as needed.

**Verification**:
- `npm run lint`
- `npm run test`
- `npm run build`
- Client-bundle leak check unchanged.
- Manual smoke checks, recorded in the progress report:
  - Word Explorer tab is visible while signed-out and while signed-in.
  - Default load is length 5, both checkboxes on, sorted alphabetically.
  - Length 2 and length 35 each show the expected data shape (real or synthetic-placeholder as documented in CHANGELOG, per §17 of this plan).
  - Search filters live and matches are case-insensitive.
  - Sort toggles both directions on both columns.
  - Copy button writes the word to clipboard and announces success without leaking focus.
  - Empty state surfaces the exact `"{searchTerm}" is not in the current {length}-letter word list.` message and the Request button opens a correctly pre-filled GitHub Issue URL (verified by inspecting the URL without actually submitting an issue from the sandbox).
- `codeql_checker` run; any true-positive alert in changed lines fixed.

**Manual follow-up steps**: None expected for Vercel/Supabase. If the GitHub repo `word-request` label does not yet exist on `ryanjosephkamp/brrrdle`, the user must create it once (documented in the progress report).

**Progress tracking**: Append `phase_id = 20`, title `"Phase 13.2 — Word Explorer Tab (ADDITIONS-2026-05-27)"` to `progress/PROGRESS.csv`. Create `progress/PROGRESS-STEP-20.md`. Add a `CHANGELOG.md` `[Unreleased] — Added` entry.

**Pause point**: Halt for explicit user approval before beginning Step 18.5.

### 18.5 Phase 13.3 — Feedback Tab

**Goal**: Add a new public top-level tab that lets any visitor file a structured feedback item as a pre-filled GitHub Issue.

**Build / modify**:

- New route `feedback`, added to `src/app/routes.ts` between Word Explorer and Settings, preserving the order in Step 18.4.4.
- A simple, accessible form with:
  - **Category** dropdown: `Bug Report` | `Feature Request` | `Other`.
  - **Description** (required, plain text, character ceiling enforced and clearly displayed).
  - **Optional details** (multi-line text).
  - **Optional email** (free-form; not validated against an external service; documented as optional and never required).
  - A "Submit" button that constructs a pre-filled GitHub Issue URL for `ryanjosephkamp/brrrdle`:
    - Title: derived from category + short summary.
    - Labels: `feedback` (plus a category-derived label when straightforward: `bug`, `enhancement`, or none).
    - Body: includes category, description, optional details, optional email, the current date, and a note that the report came from the in-game Feedback tab.
    - URL parameters percent-encoded; link opens in a new tab with `noopener noreferrer`.
- Form must be keyboard-accessible, focus-managed, and respect `prefers-reduced-motion`.
- No server-side endpoint, no client-side email transport, and no PII storage. The optional email is only embedded into the issue body the user reviews before submitting on github.com.

**Tests**:
- Unit tests for the issue-URL builder, including each category and presence/absence of each optional field.
- Unit tests for required-field validation (description cannot be empty/whitespace).
- Snapshot or DOM tests that confirm the form is keyboard-traversable in the documented order.

**Verification**:
- `npm run lint`
- `npm run test`
- `npm run build`
- Manual smoke checks:
  - Feedback tab is visible while signed-out and while signed-in.
  - Each category produces a distinct, correctly-labeled pre-filled URL.
  - Empty description blocks submission with a visible, accessible error.
- `codeql_checker` run; any true-positive alert in changed lines fixed.

**Manual follow-up steps**: If the `feedback` (and optionally `bug`, `enhancement`) labels do not yet exist on `ryanjosephkamp/brrrdle`, the user must create them once. Documented in the progress report.

**Progress tracking**: Append `phase_id = 21`, title `"Phase 13.3 — Feedback Tab (ADDITIONS-2026-05-27)"`. Create `progress/PROGRESS-STEP-21.md`. Add a `CHANGELOG.md` `[Unreleased] — Added` entry.

**Pause point**: Halt for explicit user approval before beginning Step 18.6.

### 18.6 Phase 13.4 — Sound Effects

**Goal**: Add a minimal, pleasant, fully-toggleable set of sound effects.

**Build / modify**:

- A small sound-effect engine, isolated behind a single module, that exposes named events:
  - `tile-flip`
  - `correct-guess`
  - `game-over-win`
  - `game-over-loss`
  - `keyboard-click`
  - `invalid-guess`
- Implementation must use the **Web Audio API** by default (no media autoplay), with optional small assets in `public/sounds/` if pre-rendered samples are needed. If samples are added, they must be small (<= a few KB each), license-clean, and listed with their provenance in the progress report and CHANGELOG.
- Wire the engine into the existing game flow at the minimum surface area required:
  - `tile-flip` and `keyboard-click` in the keyboard/input layer.
  - `correct-guess`, `invalid-guess`, `game-over-win`, `game-over-loss` in the `og` and `go` session orchestrators.
- Add a **"Sound Effects"** toggle to Settings, **On by default**, persisted via the same local persistence used by other user preferences (no new storage mechanism). The toggle must be honored synchronously by the engine — when off, the engine is a no-op and constructs no `AudioContext`.
- Respect `prefers-reduced-motion` if the platform also signals reduced audio (do not couple silently to motion; document the chosen behavior in the progress report).
- The engine must not throw on environments without Web Audio (older browsers, SSR-style preview); it must degrade to a no-op.

**Tests**:
- Unit tests verifying the engine no-ops when the toggle is off.
- Unit tests verifying event names and dispatch ordering (mock the `AudioContext` boundary; do not assert on audible output).
- Unit tests for Settings persistence of the toggle.

**Verification**:
- `npm run lint`
- `npm run test`
- `npm run build`
- Manual smoke checks (on a device with audio):
  - Each of the six events plays at a reasonable volume.
  - Toggling off silences every event immediately.
  - The toggle survives a page reload.
- `codeql_checker` run; any true-positive alert in changed lines fixed.

**Manual follow-up steps**: None for Vercel/Supabase. If new asset files are added under `public/sounds/`, the user must confirm they are committed and that the PWA service worker (`public/brrrdle-sw.js`) cache list includes them or that they are loaded lazily; the chosen behavior is documented in the progress report.

**Progress tracking**: Append `phase_id = 22`, title `"Phase 13.4 — Sound Effects (ADDITIONS-2026-05-27)"`. Create `progress/PROGRESS-STEP-22.md`. Add a `CHANGELOG.md` `[Unreleased] — Added` entry.

**Pause point**: Halt for explicit user approval before beginning Step 18.7.

### 18.7 Phase 13.5 — Authentication Improvements

**Goal**: Add email + password sign-in alongside the existing magic link flow, persist sessions reliably, and ensure the Admin tab renders fully for users whose Supabase `raw_app_meta_data.role` is `"admin"`.

**Build / modify**:

- **18.7.1 Email + password support in `AuthPanel`.** Add a tabbed or toggle UI inside the existing `AuthPanel` (post-cleanup path) so the user can choose:
  - **Magic link** (existing behavior, unchanged).
  - **Email + password** (new): sign-in and sign-up sub-flows using `supabase.auth.signInWithPassword` and `supabase.auth.signUp`, with clear, accessible error reporting (no raw Supabase error strings shown unfiltered to the user).
- **18.7.2 Session persistence.** Confirm and, where needed, configure the Supabase client (`src/account/supabaseClient.ts`, post-cleanup path) so sessions persist across reloads via the default `persistSession: true` / `autoRefreshToken: true` settings, and so the app subscribes to `onAuthStateChange` exactly once. Do not change the env var names (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) and do not introduce any service-role usage on the client (CONSTITUTION §14).
- **18.7.3 Admin role detection.** Confirm and, where needed, fix the front-end to derive admin status from `session.user.app_metadata.role === "admin"` (which maps to Supabase's `raw_app_meta_data.role`). The Admin tab must render with the manual refresh controls already implemented in Phase 8 / Phase 12 work whenever this condition holds. Non-admin users must continue to see the Admin tab hidden.
- **18.7.4 UX & accessibility.** The auth UI must be keyboard-navigable, focus-managed, screen-reader-labeled, and must not autofocus past the first input. Password inputs must use `type="password"` and an optional show/hide toggle; no plaintext logging of passwords or tokens anywhere (CONSTITUTION §14).
- **18.7.5 Backwards compatibility.** Existing magic-link users must not be required to set a password. The two flows must coexist; choosing one must not disable the other for the same email.

**Tests**:
- Unit tests for the new sign-in/sign-up handlers using Supabase client doubles (no live network calls in tests).
- Unit tests for admin detection: a session with `app_metadata.role === "admin"` exposes the Admin tab; a session without it does not; an absent session does not.
- Unit tests that confirm session persistence is enabled (assertion against the constructed client options).
- A regression test that confirms the magic-link path still works through its existing seam.

**Verification**:
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit` (in case any shared type touches the API side)
- Manual smoke checks (recorded in the progress report; live Supabase access required for some):
  - Magic link still works.
  - Email + password sign-up + sign-in works against a Supabase project with password auth enabled.
  - Reload of the page preserves the session.
  - A user whose Supabase `raw_app_meta_data.role` is `"admin"` sees the Admin tab with refresh controls.
  - A non-admin user does not see the Admin tab.
- Static secret-pattern review on changed lines.
- `codeql_checker` run; any true-positive alert in changed lines fixed.

**Manual follow-up steps**:
- **Supabase (required)**: The user must enable **Email + Password** authentication in the Supabase project's Auth providers settings if it is not already enabled. The user must verify that the project's email templates (confirmation, password reset) are configured. These steps cannot be performed by the agent.
- **Supabase (required for admin verification)**: The user must confirm that at least one user has `raw_app_meta_data.role = "admin"` set via the Supabase dashboard or admin API for end-to-end admin verification.
- **Vercel**: No env var changes are expected. If the user previously set any auth-related env vars, this step does not require modifying them; this must be stated explicitly in the progress report.
- **Documentation**: Update `docs/supabase.md` only if user-facing setup instructions for password auth are needed; otherwise leave docs unchanged.

**Progress tracking**: Append `phase_id = 23`, title `"Phase 13.5 — Authentication Improvements (ADDITIONS-2026-05-27)"`. Create `progress/PROGRESS-STEP-23.md`. Add a `CHANGELOG.md` `[Unreleased] — Changed` and `Added` entries.

**Pause point**: Halt for explicit user approval before beginning Step 18.8.

### 18.8 Phase 13.6 — Final Integration, Cross-Feature Verification, and Release Gate

**Goal**: Confirm that the cleanup, the two new tabs, sound effects, and the auth improvements coexist with each other and with the existing game features without regression.

**Build / modify**: No new functionality. Only fixes for any defect the cross-feature verification surfaces, and final progress/CHANGELOG bookkeeping.

**Verification**:
- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- Client-bundle leak check (no `@vercel/blob` in `dist/assets/*.js`).
- `git diff --check`
- Cross-feature manual smoke checks:
  - Daily `og` and daily `go` still play normally with length 5 (the daily lock is intact).
  - Practice mode still exposes lengths 2..35 with the same content guarantees documented in CHANGELOG §17 limitations.
  - Word Explorer tab loads and behaves correctly while signed-out, while signed-in as a non-admin, and while signed-in as an admin.
  - Feedback tab loads and behaves correctly in all three states.
  - Sound effects toggle survives reloads and applies immediately.
  - Sign-in with magic link, sign-in with email + password, session persistence, and admin tab visibility all behave as designed.
  - Sharing, definitions, settings, stats, and the existing admin refresh controls behave unchanged.
- `codeql_checker` run on the cumulative diff for the addendum; any true-positive alert in changed lines fixed.

**Manual follow-up steps (final consolidation)**: Re-list, in the final progress report, every Vercel / Supabase / GitHub-Pages / GitHub-Actions / GitHub-label step the user is required to perform, with checkmarks for those that were completed during the steps above and explicit "user must do" markers for those that remain.

**Progress tracking**: Append `phase_id = 24`, title `"Phase 13.6 — Final Integration & Release Gate (ADDITIONS-2026-05-27)"`. Create `progress/PROGRESS-STEP-24.md`. Add a `CHANGELOG.md` consolidating entry.

**Pause point**: Commit/push via the approved workflow. Halt for explicit user approval before any production deployment action.

### 18.9 Phase 13 Exit Checklist

- Every requirement in `ADDITIONS-2026-05-27.md` (§1 Word Explorer, §2 Feedback, §3 Sound Effects, §4 Authentication, §5 Cleanup) is implemented or explicitly documented as user-action-required.
- Daily `og` and daily `go` remain locked to 5 letters; practice still exposes 2..35.
- No file was deleted; no test was removed, skipped, or weakened.
- No secrets, service-role keys, or private deployment data appear in any artifact.
- No `@vercel/blob` import is present in the client bundle.
- `npm run lint`, `npm run test`, `npm run build`, and the standalone `tsconfig.api.json` typecheck all pass.
- `codeql_checker` was run after every step and every true-positive alert in changed lines is fixed.
- `progress/PROGRESS.csv`, all new `progress/PROGRESS-STEP-N.md` reports, and `CHANGELOG.md` are updated and free of sensitive data.
- All manual follow-up steps (Supabase password-auth enablement, label creation on `ryanjosephkamp/brrrdle`, optional Vercel reconfiguration only if any move actually touched a Vercel-bound path) are listed in the final progress report.
- The agent halts and waits for explicit user approval before any production release action.

---

## 19. Phase 14 — Plan Addendum (DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27): Fix the Admin Tab

**Plan Version**: 1.4 (addendum)
**Date**: 2026-05-27
**Status**: Draft for user review — implementation must NOT begin until the user explicitly approves this addendum.
**Authority**: This addendum is bound by `CONSTITUTION.md` (v3.1), `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, all prior sections of this plan, `ADDITIONS-2026-05-27.md`, and `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md` (the binding diagnosis report for this addendum).

### 19.1 Scope, Source of Truth, and Operating Rules

This addendum is **scoped strictly** to fixing the Admin tab regression described in `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md`. It does **not** introduce any feature outside that scope.

Binding rules:

- `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md` is the source of truth for the observed behavior and expected behavior; this section is the source of truth for sequencing, verification, and pause points.
- No source file may be deleted or renamed in a lossy way. Every change must be a minimal, additive or in-place edit that preserves all existing behavior outside the admin path.
- The daily 5-letter lock (CONSTITUTION §3, BRRRDLE-SPEC §3.1) and the practice 2..35 contract are out of scope and must remain untouched.
- The Supabase env-var contract is unchanged: only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` may be read on the client. No service-role key may ever appear on the client (CONSTITUTION §14).
- The existing `/api/admin-refresh` server route, its authorization checks, and its env-var bindings (`SUPABASE_URL` / `SUPABASE_ANON_KEY`) must not be weakened. Any client-side call to it must continue to send the user's Supabase access token via `Authorization: Bearer …`.
- Both authentication flows (magic link and email + password) must continue to work after this addendum, and the admin tab must behave correctly under either.
- No test may be removed, skipped, or weakened (CONSTITUTION §6.3).
- The Phase 13 client-bundle leak invariant (`@vercel/blob` must not appear in any `dist/assets/*.js` chunk) must remain intact.
- Every step ends with verification and an explicit halt-for-approval gate (CONSTITUTION §5.3, §6, and Standard Phase Exit Checklist in §1.3).
- `progress/PROGRESS.csv` and a new `progress/PROGRESS-STEP-N.md` report must be created/updated for every implementation step below before halting. `CHANGELOG.md` must receive a corresponding `[Unreleased]` entry at every step that ships a user-visible or build-visible change.
- No secrets, tokens, deployment URLs containing internal identifiers, or private deployment data may appear in any artifact (CONSTITUTION §5.4, §14).

### 19.2 Root-Cause Diagnosis

The observed symptom — the Admin tab consistently shows the static copy beginning with `"PROTECTED ADMIN / Manual refresh controls / Manual refresh requests must be sent through the protected /api/admin-refresh server route…"` — is produced by `src/admin/AdminPanel.tsx`. Concretely:

- That copy is the `access.allowed === true` branch of `AdminPanel.tsx`. When the user reports "the Admin tab is still showing only the placeholder text", the user is in fact **already** being recognised as having admin access; the panel simply has no actionable controls rendered inside the allowed branch. The current allowed branch is a descriptive `<Panel>` only — there is no manual refresh button, no status surface, and no call site for `/api/admin-refresh`.
- This is consistent with the diagnosis report's expected behaviour: "the Admin tab must render the full manual refresh UI/controls (the button that calls `/api/admin-refresh`)." Today the controls do not exist on the client. This is the **primary** root cause of the Admin tab regression.

In addition, there are two **secondary** robustness gaps that the diagnosis report explicitly calls out and that this addendum must close so the fix is durable:

- **Role-source coverage.** `src/account/auth.ts → getRoles()` derives admin status by reading `user.app_metadata.roles` (array) and `user.app_metadata.role` (string). In Supabase's JS client `app_metadata` mirrors the database column `raw_app_meta_data`, so in normal operation `app_metadata.role === "admin"` correctly reflects `raw_app_meta_data.role === "admin"`. However, the function does not defensively read `user.raw_app_meta_data?.role` (or `roles`) when present on the returned `User`. In practice this can matter when (a) a future auth-helper or middleware shape exposes the raw column directly, (b) older cached sessions surface only one of the two shapes, or (c) the user inspects the session in the browser console (the diagnostic commands in the diagnosis report) and is misled by an inconsistency between the two shapes. The fix must check **both** shapes and accept admin if either resolves to `"admin"`.
- **Stale session after login.** `App.tsx` subscribes to `onAuthStateChange` exactly once and hydrates `authState` from `getCurrentAuthState()` on mount. That is correct, but immediately after a successful magic-link or email + password sign-in (or sign-up confirmation), the access token in memory still embeds the role claim from the moment the JWT was issued. If the Supabase admin role was granted **after** the JWT was minted, the cached `User` will not yet reflect `role === "admin"` until the next auto-refresh. The fix must explicitly call `supabase.auth.refreshSession()` after a successful sign-in / sign-up (and on the `SIGNED_IN` / `TOKEN_REFRESHED` / `USER_UPDATED` events) so the next role read sees the freshest claim, and the Admin tab updates immediately on first login.

### 19.3 Scope of Fix (summary)

In one minimal, focused phase the agent will:

1. **Render the actual manual-refresh controls** inside `AdminPanel.tsx`'s allowed branch: a single "Refresh now" button that POSTs to `/api/admin-refresh` with `Authorization: Bearer <access_token>`, an accessible status region for the in-flight / success / failure states, and a small read-out of the last refresh response (revision, generatedAt, fetchedAt, per-length summary, persistence status) so admins can verify it ran. The descriptive paragraphs already in the allowed branch must be **kept** (no deletions) and merely complemented by the new controls.
2. **Harden admin-role detection** in `src/account/auth.ts` so that admin is granted when **any** of the following resolves to `"admin"`:
   - `user.app_metadata.roles[]` contains `"admin"`,
   - `user.app_metadata.role === "admin"`,
   - `user.raw_app_meta_data?.roles[]` contains `"admin"` (defensive read; `raw_app_meta_data` is not part of the published `User` type but may be present at runtime),
   - `user.raw_app_meta_data?.role === "admin"` (defensive read).
   The function must remain pure, must continue to return `readonly string[]`, must preserve the array-vs-string preference, and must never throw on missing/null shapes.
3. **Force a session refresh after successful sign-in / sign-up** so the Admin tab updates immediately:
   - After a successful `signInWithPassword`, `signUpWithPassword`, and on the `SIGNED_IN`, `TOKEN_REFRESHED`, and `USER_UPDATED` events delivered through `onAuthStateChange`, call `supabase.auth.refreshSession()` once and re-derive `authState` from the refreshed user. The magic-link flow already redirects through Supabase and arrives at `SIGNED_IN`, so the same `onAuthStateChange` path covers it.
   - The refresh must be best-effort: failures must not log the user out, must not throw to the UI, and must be reported through the existing `subscribeToAuthChanges` listener path only.
4. **Cover both auth flows** (magic link and email + password) by the same `onAuthStateChange` plumbing so no flow-specific code is needed.
5. **Keep the change non-breaking**: no file deletion, no file rename, no removal of existing behavior, no test removal. The current Phase 13 `subscribeToAuthChanges` contract and `App.tsx` admin-tab visibility predicate (`authState.user?.roles.includes('admin')`) continue to work unchanged.

Explicitly **out of scope**: Word Explorer, Feedback tab, Sound Effects, Repository Cleanup, OG/GO gameplay, daily lock, practice lengths, definitions, sharing, PWA, Supabase RLS changes, server-route behavior changes.

### 19.4 Phase 14.0 — Pre-flight & Reproduction Map

**Goal**: Confirm a clean baseline and record the exact failure surface before any edit.

**Build / modify**: No source changes. Produce only progress artifacts.

**Activities**:

- Run the baseline verification commands listed in §19.6 against the current `main` and record their results in `progress/PROGRESS-STEP-20.md`.
- Read `src/admin/AdminPanel.tsx`, `src/admin/authorization.ts`, `src/account/auth.ts`, `src/account/AuthPanel.tsx`, `src/account/supabaseClient.ts`, and `src/app/App.tsx` and confirm the current code paths match the diagnosis in §19.2. Record any deltas in the progress report.
- Confirm `supabaseClient.ts` already constructs the client with `persistSession: true` and `autoRefreshToken: true`; if it does not, record that as a blocker for §19.5.3. Do not change it yet.
- Confirm `/api/admin-refresh` continues to read the bearer token and check `app_metadata.role`/`roles` for `"admin"`. If it does, no server change is required by this addendum.
- Record the planned change list (§19.5.1–§19.5.4) and the user-action follow-ups (§19.7) in the progress report.

**Verification**: §19.6 baseline list.

**Pause point**: Halt for explicit user approval before beginning Step 19.5.

### 19.5 Phase 14.1 — Fix the Admin Tab (minimal, surgical)

**Goal**: Implement the four-part fix described in §19.3 with the smallest, safest diff that closes the regression.

**Build / modify** (in clearly separated sub-commits so review is feasible):

- **19.5.1 Harden role detection** (`src/account/auth.ts`).
  - Extend `getRoles(user)` to also defensively read `user.raw_app_meta_data?.roles` (when an array of strings) and `user.raw_app_meta_data?.role` (when a string), in that priority order after the existing `app_metadata` reads, deduplicated. Treat `raw_app_meta_data` as an unknown record (no `User` type widening) and use a narrow runtime guard so the published `@supabase/supabase-js` `User` type does not need to change.
  - Add an explicit `isAdminUser(user)` helper that returns `true` iff any of the four checks in §19.3.2 resolves to `"admin"`. Use it from `summarizeUser` so `AuthUserSummary.roles` continues to be the single source the UI consults.
  - Preserve the existing function signatures, return types (`readonly string[]`), and behavior for non-admin users. Do not introduce new exports beyond `isAdminUser`.

- **19.5.2 Render the manual refresh controls** (`src/admin/AdminPanel.tsx`, `src/admin/index.ts`, new `src/admin/manualRefresh.ts`, new `src/admin/ManualRefreshControls.tsx`).
  - Add `src/admin/manualRefresh.ts` exporting a pure async client helper `requestAdminRefresh({ supabase })` that:
    - Reads the current session via `supabase.auth.getSession()`,
    - Returns `{ ok: false, reason: 'missing-session' }` when there is no session,
    - POSTs to `/api/admin-refresh` with `Authorization: Bearer <access_token>` and `accept: application/json`, no body,
    - Parses the JSON response and returns a discriminated union: `{ ok: true, payload: AdminRefreshSuccess }` for HTTP 202, otherwise `{ ok: false, reason: 'unauthorized' | 'forbidden' | 'server-error' | 'network-error', status?: number, message?: string }`,
    - Never logs the bearer token; never persists the response payload to `localStorage`; never calls `console.error` with the token in scope.
  - Add `src/admin/ManualRefreshControls.tsx` rendering, inside the existing allowed-branch `<Panel>` (without removing the existing paragraphs):
    - A primary `<Button>` labeled "Refresh now" wired to `requestAdminRefresh`,
    - An accessible `aria-live="polite"` status region that shows idle / in-flight / success / failure states,
    - A read-out of the last successful response (revision, generatedAt, fetchedAt, length count, persistence.status) and, on failure, the diagnostic stage and message,
    - Disabled state while a request is in flight and after a successful refresh until the user re-arms (to avoid accidental double-refresh).
  - Update `AdminPanel.tsx` to render `ManualRefreshControls` inside the allowed branch in addition to the existing descriptive paragraphs. The existing `ErrorState` branches for `missing-authentication`, `missing-admin-role`, and `unconfigured` are unchanged. Re-export `ManualRefreshControls` from `src/admin/index.ts`.
  - The new component must accept the Supabase client via prop (not via a module-level import) so it remains testable with a client double, mirrors the pattern used elsewhere in `src/account/`, and supports the `unconfigured` case without crashing.

- **19.5.3 Force fresh session after auth events** (`src/account/auth.ts`, `src/account/AuthPanel.tsx`, `src/app/App.tsx`).
  - In `signInWithPassword` and `signUpWithPassword`, after a successful Supabase call, invoke `await client.auth.refreshSession()` (best-effort: ignore errors, do not surface to the UI, do not log tokens). Return the existing `{ ok: true }` shape unchanged so callers do not need to change.
  - In `subscribeToAuthChanges`, on `SIGNED_IN`, `TOKEN_REFRESHED`, and `USER_UPDATED` events, re-derive the listener payload from `session.user` (already happens) **and** opportunistically call `getCurrentAuthState(client)` after a fresh `getUser()` to pick up server-side role updates that the cached JWT may not yet reflect. Debounce so we never issue more than one `getUser()` per event.
  - In `App.tsx`, no new effects are required; the existing single `useEffect` that subscribes to `subscribeToAuthChanges` will receive the refreshed state through the same listener and re-render the navigation and Admin tab automatically. Verify by trace, not by adding code.
  - Do not call `refreshSession()` for the magic-link send path (`sendMagicLink`); the magic-link redirect arrives at `SIGNED_IN` and the listener path covers it.

- **19.5.4 Tests** (new or extended, no removals):
  - `src/account/auth.test.ts` — add cases for `isAdminUser` / `summarizeUser` covering all four shapes in §19.3.2 (including `raw_app_meta_data.role` only, `raw_app_meta_data.roles` only, `app_metadata.role` only, `app_metadata.roles` only, and combinations); cases for `signInWithPassword` / `signUpWithPassword` confirming that `refreshSession` is invoked on success and **not** invoked on failure; case confirming the refresh failure is swallowed and does not change the returned `{ ok: true }` shape.
  - `src/admin/authorization.test.ts` — add cases confirming the allowed/denied branches are unchanged for the new role-source shapes (the test continues to drive `evaluateAdminAccess` through `AuthState`, not through raw `User`).
  - New `src/admin/manualRefresh.test.ts` — cases for `requestAdminRefresh`: missing session, 401, 403, 502, network failure, and 202 success; assert that the `Authorization` header carries `Bearer <token>` and that the token never appears in the returned payload.
  - New `src/admin/ManualRefreshControls.test.tsx` — render the component with a Supabase client double and a fetch double; assert idle → in-flight → success and idle → in-flight → failure transitions; assert that the status region is `aria-live="polite"`; assert that the button is disabled during the request; assert that the existing descriptive paragraphs continue to render alongside the new controls (proving no deletion).
  - All other existing tests must continue to pass unmodified.

**Key files**:

- Modified: `src/account/auth.ts`, `src/account/auth.test.ts`, `src/admin/AdminPanel.tsx`, `src/admin/authorization.test.ts`, `src/admin/index.ts`.
- New: `src/admin/manualRefresh.ts`, `src/admin/manualRefresh.test.ts`, `src/admin/ManualRefreshControls.tsx`, `src/admin/ManualRefreshControls.test.tsx`.
- Unchanged (verified by inspection, not edit): `src/account/AuthPanel.tsx` body (no UI change), `src/account/supabaseClient.ts` (already persists session / auto-refreshes token), `api/admin-refresh.ts` (server contract unchanged), `src/app/App.tsx` admin-tab visibility predicate.

### 19.6 Verification

After **every** sub-commit in §19.5 and one final time at the end of the phase, the agent must run and record:

- `npm ci`
- `npm run lint`
- `npm run test` — full suite must pass with **strictly more** tests than before (new tests added, no tests removed or skipped).
- `npm run build` — `tsc -b` + `vite build` must succeed with no new TypeScript errors. The pre-existing >500 kB chunk-size warning may remain unchanged.
- `npx tsc -p tsconfig.api.json --noEmit` — must succeed.
- Client-bundle leak check: `grep -R "@vercel/blob" dist/assets/*.js` returns no matches.
- `git diff --check` — clean.
- `codeql_checker` — run on the cumulative diff at the end of the phase; every true-positive alert in changed lines must be fixed before halting.

**Diagnostic console commands** (to be executed manually by the user in the deployed app, recorded in the progress report verbatim, exactly as listed in `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md`):

```js
// 1. Check current user role
supabase.auth.getUser().then(({ data }) => {
  console.log("Full user:", data.user);
  console.log("app_metadata.role:", data.user?.app_metadata?.role);
  console.log("raw_app_meta_data.role:", data.user?.raw_app_meta_data?.role);
  console.log("Is admin?", data.user?.raw_app_meta_data?.role === "admin");
});

// 2. Check if Admin tab should be visible
console.log("Current session:", supabase.auth.getSession());
```

**Manual smoke checks** (recorded in `progress/PROGRESS-STEP-20.md`):

- Sign in via magic link as a Supabase user with `raw_app_meta_data.role = "admin"`. The Admin tab becomes visible in the primary navigation **without a manual page reload** within one auth event, and shows both the existing descriptive paragraphs **and** the new "Refresh now" button.
- Repeat with email + password sign-in. Same expected result.
- Repeat with email + password sign-up for a brand-new user that the operator promotes to admin in the Supabase dashboard **after** sign-up; on the next `TOKEN_REFRESHED` (or after the operator triggers `Refresh now` once, or after the operator signs out and back in), the Admin tab appears.
- Sign in as a non-admin user. The Admin tab remains hidden from the primary navigation, and the `evaluateAdminAccess`-driven `ErrorState` would show if the route were forced.
- Click "Refresh now" as the admin user. The status region transitions idle → in-flight → success (or → failure with a diagnostic stage/message). The browser DevTools network panel shows a POST to `/api/admin-refresh` with `Authorization: Bearer …`. No service-role key is sent.
- Reload the page after sign-in. The session persists, the Admin tab remains visible, and the refresh button remains operational.

### 19.7 Manual Follow-Up Steps (User-Required)

These steps must be listed verbatim in `progress/PROGRESS-STEP-20.md` and in the `CHANGELOG.md` `[Unreleased] — User action required` block:

- **Supabase (required)**: Confirm that at least one user has `raw_app_meta_data.role = "admin"` set via the Supabase dashboard or admin API. Without this, no smoke check in §19.6 can verify the admin path end-to-end.
- **Supabase (required for email + password verification)**: Confirm the Email + Password provider remains enabled (carried over from the Phase 13.5 follow-up in §18.7).
- **Vercel**: No environment-variable or routing change is required. `SUPABASE_URL` and `SUPABASE_ANON_KEY` (or their `VITE_`-prefixed counterparts) must continue to be set on the Vercel project so `/api/admin-refresh` can validate the bearer token.
- **GitHub Actions / Pages / labels**: No action required.
- **Browser session hygiene** (recommended once after deploy): The first time an existing admin user opens the new build, ask them to sign out and sign back in so the locally cached JWT is replaced. This guarantees the `raw_app_meta_data` claim that was minted before the deploy is immediately re-read.

### 19.8 Progress Tracking and CHANGELOG

- Append `phase_id = 20` ("Phase 14.0 — Admin Tab Fix Pre-flight & Reproduction Map") and `phase_id = 21` ("Phase 14.1 — Admin Tab Fix (Implementation & Verification)") to `progress/PROGRESS.csv` as their respective steps are executed.
- Create `progress/PROGRESS-STEP-20.md` (for Phase 14.0, pre-flight) and `progress/PROGRESS-STEP-21.md` (for Phase 14.1, implementation) using `progress/PROGRESS-TEMPLATE.md`.
- For the addendum-drafting step itself (this section), append a note to the most recent existing progress report (`progress/PROGRESS-STEP-19.md`) and add an `[Unreleased] — Documentation` entry to `CHANGELOG.md` recording that the addendum has been created and that implementation has not begun.
- For Phase 14.1, add `[Unreleased] — Fixed` and `[Unreleased] — Added` entries to `CHANGELOG.md` describing the admin-tab regression fix, the new manual-refresh controls component, the hardened role detection, and the post-login session refresh.

### 19.9 Phase 14 Exit Checklist

- The Admin tab renders an actionable "Refresh now" button (plus the existing descriptive paragraphs) for users whose Supabase user has `raw_app_meta_data.role === "admin"` (or `app_metadata.role === "admin"`).
- Admin role detection accepts admin from any of `app_metadata.roles[]`, `app_metadata.role`, `raw_app_meta_data.roles[]`, or `raw_app_meta_data.role`.
- The Admin tab updates immediately after sign-in (magic link or email + password) without requiring a manual page reload, via the `onAuthStateChange` listener and an explicit best-effort `refreshSession()` call.
- No file was deleted; no test was removed, skipped, or weakened.
- The daily 5-letter lock and the practice 2..35 contract are unchanged.
- No service-role key is present on the client; `/api/admin-refresh` server contract is unchanged.
- `npm run lint`, `npm run test`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit` all pass.
- `codeql_checker` was run on the cumulative diff and every true-positive alert in changed lines is fixed.
- `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-20.md`, `progress/PROGRESS-STEP-21.md`, and `CHANGELOG.md` are updated and free of sensitive data.
- The agent halts and waits for explicit user approval before any production release action.

---

## 20. Phase 15 — Plan Addendum (AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27): Authentication & Profile UX Redesign

**Plan Version**: 1.5 (addendum). Bound by `AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md`, `CONSTITUTION.md` v3.1, `BRRRDLE-SPEC.md`, and the prior plan.

### 20.1 Scope, Source of Truth, and Operating Rules

- **Source of truth**: `AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md`. Every creative decision is documented here.
- **Non-negotiable preserved invariants**: Daily 5-letter lock and practice 2..35; Admin gating and `/api/admin-refresh` server contract; Word Explorer, Feedback, Sound Effects, sharing, definitions, stats, guest persistence, Pay-to-Continue, sync stub, danger-zone confirmations; no file deletion; no test removal/skip/weakening; no new env var names; no service-role on client; no `@vercel/blob` in client bundle; magic-link and password flows coexist.
- **Architecture (creative)**: Profile data stored in `auth.users.user_metadata` via `supabase.auth.updateUser({ data })`. Avatars default to deterministic initials-on-gradient; image upload is gated on a runtime probe of an `avatars` Supabase Storage bucket.

### 20.2 Phase 15.0 — Pre-flight & Baseline (executed)
Re-confirmed baseline (194/194 tests, lint+build clean). Reproduction map confirmed every Current Problem in the spec is reproducible at HEAD.

### 20.3 Phase 15.1 — Auth Helper Surface Expansion (executed)
- `src/account/profile.ts`: pure helpers `deriveInitials`, `normalizeDisplayName`, `validateAccentColor`, `validateAvatarUrl`, `pickInitialsGradient`, `deriveProfileFromUser`.
- `src/account/auth.ts` additive helpers: `classifyAuthError`, `sendPasswordResetEmail` (renamed from spec's `requestPasswordReset` to avoid colliding with the pre-existing unused `dangerZone.requestPasswordReset`), `updateProfile`, `hasAvatarStorage`, `uploadAvatar`. `AuthUserSummary.profile` derived in `summarizeUser`.

### 20.4 Phase 15.2 — `AuthModal` (executed)
- `src/account/AuthModal.tsx`: Dialog with Magic Link / Email + Password tabs, `role="radiogroup"` sub-mode toggle, single primary CTA, inline Forgot Password flow, `aria-live` status, sanitized errors via `classifyAuthError`, auto-close on `authenticated=true`.

### 20.5 Phase 15.3 — Global `AccountBadge` (executed)
- `src/account/AccountBadge.tsx`: anonymous → Guest pill opening `AuthModal`; unconfigured → quiet "Guest · sync unavailable"; authenticated → avatar + label opening `ProfilePanel`. Mobile-first responsive (avatar-only under `sm`).

### 20.6 Phase 15.4 — `ProfilePanel` (executed)
- `src/account/ProfilePanel.tsx`: display name (≤ 50), accent color radiogroup, optional avatar upload gated on `hasAvatarStorage`. Save → `updateProfile`. Falls back to initials avatar when no bucket exists.

### 20.7 Phase 15.5 — Wiring (executed)
- `src/app/App.tsx` adds modal/profile state, renders `AccountBadge` in `Layout` navigation, renders `AuthModal` + `ProfilePanel` at layout root, re-derives `AuthState` after successful save.
- `src/account/Settings.tsx` adds Sign in / Manage profile buttons; existing `AuthPanel` preserved (no deletion). Duplicate-CTA bug fixed in `AuthPanel` via radiogroup + single primary CTA.
- `src/app/routes.ts` unchanged; profile is a dialog, not a route.

### 20.8 Phase 15.6 — Final Integration & Release Gate (executed)
- Lint, test (256/256), build, API typecheck, leak check all green.
- CodeQL run on changed lines; no true-positive alerts.
- CHANGELOG, PROGRESS.csv, PROGRESS-STEP-22.md, docs/supabase.md additive note all updated.

### 20.9 Phase 15 Exit Checklist
- Every spec requirement (§1, §3.1–§3.5, §4, §5) is implemented or explicitly documented as user-action-required.
- No duplicate primary CTAs in any sign-in/sign-up surface on any viewport.
- Global signed-in / Guest indicator present on every route.
- No raw Supabase error strings reach the UI; all flow through `classifyAuthError`.
- Forgot Password flow works end-to-end against a properly configured Supabase project.
- Profile persists via `auth.users.user_metadata`; optional avatar upload gated on Storage bucket and never breaks the experience when absent.
- Daily 5-letter lock, practice 2..35, Admin gating, `/api/admin-refresh`, and all Phase 13/14 invariants preserved.
- No file/test deletion; no service-role on client; no `@vercel/blob` in client bundle; no new env var names.
- `npm run lint`, `npm run test`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit` all pass.
- `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-22.md`, and `CHANGELOG.md` updated and free of sensitive data.
- Halt before any production release action.

---

## 21. Phase 16 — Mobile & Tablet Responsiveness Improvements (Keyboard, Grid, and Touch Scaling)

**Plan Version**: 1.6 (addendum). Bound by `CONSTITUTION.md` v3.1, `BRRRDLE-SPEC.md`, and the prior plan (Phases 0–15). Triggered by a user report that the game grid tiles, on-screen keyboard, and letter sizing do not scale properly on phones and tablets (especially iPads), breaking the app-like feel.

### 21.1 Scope, Source of Truth, and Operating Rules

- **Source of truth for this phase**: this Section 21 of `AGENT-IMPLEMENTATION-PLAN.md` plus the user request transcribed in §21.2. No new top-level spec document is required; design decisions are documented inline here.
- **Non-negotiable preserved invariants** (carried unchanged from Phases 0–15):
  - Daily `og`/`go` modes locked at 5 letters; practice mode supports lengths 2–35.
  - Admin tab gating via `session.user.app_metadata.role === "admin"` and the `/api/admin-refresh` server contract.
  - Word Explorer, Feedback Tab, Sound Effects, Sharing, definitions stack, stats, guest persistence, Pay-to-Continue economy, sync stub, danger-zone confirmations.
  - Auth flows: magic link, email + password, forgot password, `AuthModal`, `AccountBadge`, `ProfilePanel`, `classifyAuthError`, no raw Supabase error strings in UI.
  - No file deletion, no test removal/skip/weakening, no new env var names, no service-role on client, no `@vercel/blob` in client bundle.
  - All existing keyboard-input semantics (`useKeyboardInput`, `Keyboard.onInput` contract, `letterStates` coloring) remain byte-identical at the public API level.
- **Operating rules**:
  - Changes are CSS/Tailwind/markup-only inside existing components. No changes to game state, validation, persistence, networking, or auth.
  - Prefer Tailwind responsive utilities, CSS `clamp()`, dynamic viewport units (`dvh`/`svh`/`dvw`), and CSS container queries (`@container` / `cqi`) over JavaScript-measured sizing. Touch JS only when absolutely necessary (e.g., a `useResizeObserver` hook is **not** required for v1 of this phase).
  - No new runtime dependencies. Tailwind v4 already supports container queries and dynamic viewport units natively.
  - Visual changes must be additive: existing class strings may be extended, but no class that another component or test depends on may be removed without a documented replacement.

### 21.2 User Request (verbatim summary)

> The current UI (especially the game grid tiles, on-screen keyboard, and letter sizing) does not scale properly on mobile devices and tablets — particularly iPads. Tiles and keyboard keys become either too large or too small, breaking the app-like feel on smaller and larger touch screens.

### 21.3 Diagnosis of Current Scaling Issues

Findings are based on HEAD as of Plan Version 1.5:

1. **Grid tiles use fixed `min-h-*` with `aspect-square` and CSS Grid `minmax(0, 1fr)` columns** (`src/app/games/OgGame.tsx:80–95`, `src/app/games/GoGame.tsx:80–95`):
   - Classes `flex aspect-square min-h-8 ... sm:min-h-10 sm:text-base` only define a *floor* on tile size, never a ceiling.
   - Because the row is a `grid` with `repeat(N, minmax(0, 1fr))` inside the full-width `<main>` Panel, the tile width is `(panelWidth − gaps) / N`. On iPad portrait (~768 px viewport, panel ~720 px after padding), 5-letter daily rows produce tiles of ~135 px each — visually oversized relative to `text-base` (16 px) letters, breaking the app-like feel.
   - On 35-letter practice rows on a phone, columns shrink below the `min-h-8` (32 px) floor in the *width* dimension while `aspect-square` keeps height ≥ 32 px, producing non-square tiles and overflow risk.
   - Font sizing (`text-sm` / `sm:text-base`) is decoupled from tile size — letters stay tiny while tiles bloom on tablets, or letters look cramped on phones with long practice words.

2. **On-screen keyboard keys use fixed `min-h-11 ... sm:min-h-12` and `text-sm`** (`src/ui/Keyboard.tsx:38, 55, 57`):
   - The widest row is `qwertyuiop` (10 keys) plus `flex justify-center gap-1.5 sm:gap-2`. On a 320 px phone in portrait, 10 keys + 9 gaps + outer padding leave ~26 px per key — visually cramped and below the WCAG 24 px / Apple HIG 44 pt touch-target guidance once `px-2` padding is consumed.
   - On iPad portrait, the same row consumes only ~520 px of a 720 px panel, producing a centered floating bar that looks under-sized relative to the grid above.
   - The bottom row Enter/Del buttons use a smaller `text-xs` than the letter keys; on tablets this becomes visually inconsistent.

3. **Outer Layout shell does not adapt to mobile viewport realities** (`src/ui/Layout.tsx:14–32`):
   - `min-h-svh` is used (good), but inner padding `px-4 py-6 sm:px-6 lg:px-8` is symmetric and ignores iOS safe-area insets, so on notched devices the AccountBadge and grid edge under the status bar / home indicator in standalone PWA mode.
   - `index.html` viewport tag (`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`, `index.html:11`) lacks `viewport-fit=cover`, which is a precondition for `env(safe-area-inset-*)` to take effect.

4. **No use of CSS container queries**:
   - Tile and key sizes are driven by viewport breakpoints (`sm:`, `lg:`), not by the size of the panel/section they actually live in. The header Panel takes ~25 % of vertical space on phones, but the grid sizes itself off viewport width regardless of how much space the header consumes. On iPad split-view (e.g., 50 % width) the grid is treated as a phone because viewport width is small, even though container width is generous.

5. **No dynamic viewport height handling for mobile browser chrome**:
   - `min-h-svh` correctly accounts for the small viewport, but no element uses `dvh` (dynamic viewport height) for the playable area, so when the URL bar collapses there is a visible gap below the keyboard in Safari iOS.

### 21.4 Proposed Solution (clean, minimal, non-breaking)

The fix is delivered as a single new phase with five small steps. All changes are additive Tailwind class extensions and CSS variable definitions; no component contracts change.

**Design principles**:
- Use **CSS `clamp()`** to define a tile and key size with explicit floor, fluid middle (driven by container-query inline units `cqi` where supported, viewport units `vw` otherwise), and ceiling.
- Use **CSS container queries** on the grid section and keyboard section so sizing follows the actual panel width, not the raw viewport.
- Use **dynamic viewport units** (`dvh`, `svh`) on the app shell and `safe-area-inset-*` padding for iOS standalone PWA polish.
- Use **explicit Tailwind breakpoints** (`sm` 640, `md` 768, `lg` 1024, `xl` 1280) for coarse adjustments, with `clamp()`/container queries doing the fluid work in between.
- Tie **letter font-size to tile size** (and key font-size to key size) via `cqi` or `em` so glyphs grow and shrink together with their container.

**Step 21.4.1 — Establish design tokens for tile and key sizing**

- Add CSS variables in `src/index.css` (or a small `src/styles/responsive.css` imported from `src/index.css`):
  - `--brrrdle-tile-min`, `--brrrdle-tile-ideal`, `--brrrdle-tile-max` (e.g., `2rem`, `clamp(2rem, 8cqi, 4.25rem)`, `4.25rem`).
  - `--brrrdle-key-min`, `--brrrdle-key-ideal`, `--brrrdle-key-max` (e.g., `2.25rem`, `clamp(2.25rem, 9cqi, 3.75rem)`, `3.75rem`).
  - `--brrrdle-tile-font` and `--brrrdle-key-font` expressed as `cqi`/`em` of the tile/key.
- Defaults must reproduce current desktop appearance at ≥ `lg` viewports so no regression occurs on existing screens.

**Step 21.4.2 — Make the grid section a CSS container and apply container-query sizing**

- In `src/app/games/OgGame.tsx` and `src/app/games/GoGame.tsx`, wrap the existing `<div role="grid">` (or its parent) with a Tailwind container-query parent (`@container` / `class="@container"` via the Tailwind v4 built-in `container-type: inline-size` utility).
- Replace the tile className:
  - From: `flex aspect-square min-h-8 ... sm:min-h-10 sm:text-base`
  - To (semantically): `flex aspect-square items-center justify-center rounded-xl border shadow-inner shadow-slate-950/20 font-black uppercase` plus inline `style={{ fontSize: 'clamp(0.875rem, 6cqi, 1.5rem)' }}` (or a Tailwind arbitrary value).
- Cap the entire row's max width with `style={{ maxWidth: 'min(100%, calc(var(--brrrdle-tile-max) * N + gap * (N-1)))' }}` so 5-letter daily rows on iPads stop ballooning past ~340 px while 35-letter practice rows still occupy full width on phones.
- Center the row with `mx-auto` so capped rows remain visually balanced.

**Step 21.4.3 — Responsive on-screen keyboard**

- In `src/ui/Keyboard.tsx`, wrap the `<section>` with `@container` and key sizing driven by `cqi`:
  - Replace `min-h-11 ... sm:min-h-12` with `min-h-[2.25rem] @md:min-h-[2.75rem] @lg:min-h-[3.25rem]` plus inline `style={{ fontSize: 'clamp(0.75rem, 4.25cqi, 1.05rem)', minWidth: 'clamp(1.75rem, 8.5cqi, 2.75rem)' }}`.
  - Set Enter/Del to `style={{ minWidth: 'clamp(2.5rem, 12cqi, 4.25rem)' }}` and use `text-[clamp(0.625rem,3.5cqi,0.95rem)]` so they scale with letter keys instead of staying at a fixed `text-xs`.
- Preserve the 44 px Apple HIG touch-target floor by clamping `min-h` ≥ `2.25rem` (36 px logical; ≥ 44 px once tapped area + padding considered) and adding `touch-action: manipulation` to prevent iOS double-tap zoom on rapid letter entry.
- On `@sm`-and-narrower containers, reduce gap from `gap-1.5` to `gap-1` and reduce horizontal padding so 10 keys always fit one row at ≥ 320 px viewport.

**Step 21.4.4 — App-shell and viewport polish**

- Update `index.html:11` viewport tag to `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />`.
- In `src/ui/Layout.tsx`:
  - Add safe-area padding: `pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]` and equivalent left/right for landscape on notched devices.
  - Switch the shell to `min-h-dvh` (with `min-h-svh` retained as fallback for older Safari via the existing `min-h-svh` class — Tailwind v4 emits the `dvh` variant cleanly).
  - On `@md`-and-up containers, consider a two-column layout where the keyboard sits to the side on landscape tablets/desktops (optional polish; only if it keeps the app-like feel — see §21.4.5).

**Step 21.4.5 — Tasteful creative polish (optional within this phase)**

- Sticky keyboard on phone portrait: on `< @md` containers, keyboard becomes `sticky bottom-0` with a subtle backdrop-blur, ensuring it never scrolls out of reach during practice with long words and a tall grid.
- Subtle haptic-style press animation (`active:scale-95 transition-transform`) on keyboard buttons for mobile app-feel. Respect `motion-reduce` users (`motion-safe:` prefix).
- Grid row "shake" and tile "reveal" animations already exist and remain unchanged.
- iPad portrait: introduce a comfortable `max-w-md` cap on the keyboard so it visually mirrors the capped 5-letter daily grid above instead of stretching to the full panel.

### 21.5 Phase 16 — Sub-Phase Plan

| Sub-phase | Title | Files Touched (planned) | Verification |
|-----------|-------|-------------------------|--------------|
| 16.0 | Pre-flight & responsive baseline capture | none (read-only) | Re-confirm 256/256 tests pass; capture before-screenshots at iPhone SE (375×667), iPhone 14 Pro (393×852), iPad mini portrait (744×1133), iPad Pro 11" portrait (834×1194), iPad Pro 11" landscape (1194×834), and desktop (1440×900) — used only as agent notes, not committed |
| 16.1 | Design tokens & viewport polish | `index.html`, `src/index.css` (+/- a new `src/styles/responsive.css`), `src/ui/Layout.tsx` | `npm run lint`, `npm run build`, visual sanity check |
| 16.2 | Responsive grid tiles | `src/app/games/OgGame.tsx`, `src/app/games/GoGame.tsx` | `npm run test` (existing grid tests must remain green), `npm run build` |
| 16.3 | Responsive on-screen keyboard | `src/ui/Keyboard.tsx` | `npm run test` (keyboard tests remain green), `npm run build` |
| 16.4 | Optional polish (sticky keyboard, press animation, iPad keyboard cap) | `src/ui/Keyboard.tsx`, `src/app/games/OgGame.tsx`, `src/app/games/GoGame.tsx` (markup only) | `npm run test`, `npm run build` |
| 16.5 | Final integration, cross-feature verification, and release gate | docs/changelog/progress only | full pipeline (see §21.6) |

Each sub-phase ends with a `progress/PROGRESS-STEP-N.md` and a `progress/PROGRESS.csv` row appended for the corresponding `phase_id` (next available IDs after Phase 15's last). The agent halts at every sub-phase gate per CONSTITUTION.md §1.3 unless the user explicitly authorizes contiguous execution.

### 21.6 Verification & Release Gate (Phase 16.5)

Required to pass before declaring Phase 16 complete:

1. `npm run lint` — clean.
2. `npm run test` — all existing tests (currently 256) pass with zero new failures. Add at least one new render test per modified component asserting the presence of the new responsive class tokens (no new `data-testid`s introduced gratuitously).
3. `npm run build` — clean; no new bundle-size regressions beyond a small CSS delta.
4. `npx tsc -p tsconfig.api.json --noEmit` — clean.
5. Client-bundle leak check: `grep -R "@vercel/blob" dist/` returns no matches (Phase 13 invariant).
6. Manual visual verification at the six viewports listed in §21.5 Phase 16.0. Grid tiles must:
   - Remain visually square at every breakpoint.
   - Cap at ~`4.25rem` per side on 5-letter daily rows on iPad portrait and wider.
   - Scale font-size with tile size so the letter always fills ~55–65 % of the tile height.
7. Keyboard must:
   - Fit 10 keys + gaps within a 320 px viewport without horizontal scroll.
   - Show ≥ 44 px effective touch targets on phones.
   - Not exceed `max-w-md`-equivalent on iPad portrait so it visually mirrors the capped grid.
8. CodeQL run on changed lines after Phase 16.4; any true-positive alerts must be fixed before Phase 16.5 closes.

### 21.7 Preserved Invariants (Phase 16-specific re-statement)

- Daily 5-letter lock and practice 2..35 — unchanged; grid still uses `repeat(${session.wordLength}, minmax(0, 1fr))`.
- Admin tab — purely a navigation/visibility concern; not touched.
- Word Explorer, Feedback, Sound Effects, Auth flows (`AuthModal`, `AccountBadge`, `ProfilePanel`, `classifyAuthError`, magic-link + password coexistence) — markup may receive responsive class additions only; component contracts unchanged.
- Pay-to-Continue economy, sharing, definitions, stats, guest persistence, sync stub — untouched.
- No file deletion, no test removal/skip/weakening.
- No new env vars, no service-role on client, no `@vercel/blob` in client bundle.
- No new runtime dependency.

### 21.8 Progress Tracking and CHANGELOG

- Append rows to `progress/PROGRESS.csv` for each of Phases 16.0 through 16.5, using the next contiguous `phase_id` values after the highest currently recorded ID. Titles follow the pattern `"Phase 16.x — <Sub-phase title>"`.
- Create `progress/PROGRESS-STEP-N.md` from `progress/PROGRESS-TEMPLATE.md` for each sub-phase, summarising what changed, verification results, blockers, and explicit go/no-go for the next sub-phase.
- Add `[Unreleased] — Changed` and `[Unreleased] — Added` entries to `CHANGELOG.md` for: responsive design tokens, container-query-driven grid sizing, responsive on-screen keyboard, iOS safe-area / viewport-fit polish, and any optional polish actually shipped.

### 21.9 Phase 16 Exit Checklist

- All §21.3 diagnoses are demonstrably resolved on the six reference viewports.
- All §21.7 invariants verified intact.
- All Phase 16.6 verification items (§21.6) green.
- `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, and `CHANGELOG.md` updated and free of sensitive data.
- Halt for explicit user approval before any production release action.

---

## 22. Phase 17 — Use Local brrrdle Word List JSONs from `src/latest/` (Addendum, LOCAL-WORD-LISTS-SPEC-2026-05-28)

**Plan Version**: 1.7 (addendum). Bound by `CONSTITUTION.md` v3.1, `BRRRDLE-SPEC.md`, the prior plan (Phases 0–16), and `LOCAL-WORD-LISTS-SPEC-2026-05-28.md` (the source of truth for this phase). Triggered by the user manually placing the latest 34 authoritative per-length JSON dictionaries inside the repository and reporting that the runtime Hugging Face fetch is failing and producing "word not in list" errors and incomplete practice lengths.

> Status: **No code changes yet.** This addendum exists for user review. Implementation is gated on explicit user approval (see §22.10).

### 22.1 Scope, Source of Truth, and Operating Rules

- **Source of truth for this phase**: `LOCAL-WORD-LISTS-SPEC-2026-05-28.md` and this Section 22. If the spec and prior phases conflict, the spec wins for the narrow concerns of (a) where the word data is read from and (b) deprecation of the runtime Hugging Face path for normal gameplay. All other invariants from Phases 0–16 are preserved.
- **Authoritative on-disk path discrepancy (must reconcile during 17.1)**:
  - The spec text refers to `src/latest/brrrdle/`.
  - The repository as committed places the 34 files directly at `src/latest/` (verified at HEAD: `src/latest/words_length_2.json` … `src/latest/words_length_35.json`, plus `manifest.json`, `README.md`, and transitional `brrrdle_words.json` / `brrrdle_words.txt` length-5 compatibility files).
  - Treat the actual on-disk location (`src/latest/`) as authoritative for code. Mention the spec's `src/latest/brrrdle/` wording in `CHANGELOG.md` and Phase 17 progress notes so the discrepancy is auditable. If the user prefers, a one-time `git mv` to `src/latest/brrrdle/` may be performed during Sub-phase 17.1 as a pure rename; the loader path constant is the single point that decides which layout is in effect.
- **Non-negotiable preserved invariants** (carried unchanged from Phases 0–16):
  - Daily `og`/`go` locked at 5 letters; practice 2–35.
  - Admin tab + `/api/admin-refresh` server contract intact; the refresh endpoint and Phase 14 admin authorization remain in place as an optional override only.
  - Word Explorer, Feedback tab, Sound Effects, Sharing, Pay-to-Continue economy, Auth flows, stats, definitions stack, mobile/tablet responsiveness — all untouched.
  - Public APIs of the data layer remain byte-identical at the signature level: `loadBundledWordList`, `getWordRepository`, `getRequestedWordLength`, `getAnswerCandidates`, `getValidGuesses`, `getDefinitionsForWord`, `validateGuess`, and barrel exports in `src/data/index.ts`.
  - `NormalizedWordList`, `WordEntry`, `WordDefinitionEntry`, `WordListFile`, `WordListMetadata`, and `RemoteWordListMetadata` types remain backward-compatible. Any change is additive (optional fields only).
  - No file deletion. No removal/skip/weakening of existing tests. No new env vars. No service-role on client. No `@vercel/blob` in client bundle. No new runtime dependency. No change to `MIN_PRACTICE_WORD_LENGTH=2` / `MAX_PRACTICE_WORD_LENGTH=35` / `DAILY_WORD_LENGTH=5`.
- **Operating rules**:
  - Strictly minimal, non-breaking changes.
  - The runtime Hugging Face fetch is **deprecated, not deleted**. `src/data/huggingFaceSource.ts`, `src/data/refresh.ts`, `src/data/refreshStore.ts`, `src/data/updateCheck.ts`, and `api/admin-refresh.ts` continue to compile, pass existing tests, and remain reachable from the protected admin route. Only the **default loading path used by gameplay** moves to local JSON.
  - Use static `import` of the 34 local JSON files via Vite's JSON loader (mirroring the existing pattern in `src/data/wordLists.ts`). No new dependency is required.
  - All data-layer error reasons and result shapes (`unsupported-length`, `daily-length-locked`, `missing-bundled-list`, `invalid-bundled-list`) remain unchanged. A new failure surface is permitted only if additive (e.g., `'invalid-local-list'`) and only if absolutely required — preferred is to reuse `'invalid-bundled-list'` so consumers don't have to change.

### 22.2 Diagnosis of the Current Remote-Fetch Problem

Findings against HEAD (Plan Version 1.6):

1. **The bundled snapshot under `src/data/bundled/` is the 2026-05-26 development seed, not the real 2026-05-28 dataset.**
   - `src/data/bundled/source.json` self-identifies as `version: bundle-2026-05-26` with `lengths: [2, 5, 35]` and the note "Bundled development seed. The first successful scheduled or admin refresh … will replace this snapshot".
   - The seed is sparse for many lengths (e.g., length 5 `answers` includes the curated `{ word: "crane", definitions: […] }` object followed by a handful of plain strings), so practice modes for lengths outside 2/5/35 fall back to thin lists and reject common words as "not in list".
2. **The runtime path that was supposed to upgrade the seed is the Hugging Face refresh** (`src/data/huggingFaceSource.ts` + `src/data/refresh.ts`, swapped in by `refreshStore.ts` and triggered by the daily Vercel Cron and `/api/admin-refresh`). The user reports this is failing in the current environment, leaving gameplay on the seed permanently.
3. **The user has now committed the real authoritative data into the repo at `src/latest/`** (34 files, lengths 2–35, generated at `2026-05-28T01:39:10.899912+00:00`, schema version `2.0`, per-length counts ranging from 134 at length 2 to 47,763 at length 9). Per-length `answers` is a curated array of plain strings produced by `stratified_quality_score_v1`; `validGuesses` is the full per-length list.
4. **Schema gap**: the new files do **not** match the current `WordListMetadata` schema validator:
   - `metadata` contains only a `curation` block (no `length`, `source`, `version`, `generatedAt` strings).
   - `answers` is `string[]` (no inline `definitions`). The existing `validateWordEntry` already accepts strings, so this half is compatible.
   - `validGuesses` is `string[]` — already compatible.
   - Without an adjustment to `validateWordListFile` (or a new local-list adapter), every local file would be rejected with `invalid-bundled-list` and four "metadata required" issues.
5. **Definitions consequence**: the new per-length files do not carry inline `definitions`. The post-game Definitions System (Phase 6) already falls back through Dictionary API → Wiktionary → Google search, so eliminating inline definitions for the curated subset is acceptable — but the addendum must explicitly confirm this and the verification matrix must re-cover §6.

### 22.3 Proposed Solution (minimal, non-breaking)

The fix is delivered as **one logical change**: add a thin "local source" path that statically imports the 34 JSONs from `src/latest/` and feeds them into the existing normalization pipeline, then make `BUNDLED_WORD_LISTS` resolve from the local source by default. Everything downstream is unchanged.

**Design choices**:

- **Single new file, single edit point**: introduce `src/data/localWordLists.ts` containing 34 static JSON imports (mirroring `src/data/wordLists.ts`) plus a `LOCAL_WORD_LISTS` record. This keeps the diff cohesive and reviewable. `src/data/wordLists.ts` becomes a thin re-export of `LOCAL_WORD_LISTS` aliased as `BUNDLED_WORD_LISTS`, preserving the existing import name used by `loadBundledWordList`.
- **Adapter, not schema rewrite**: add a `normalizeLocalWordListFile(raw, length): WordListFile` adapter that:
  - Synthesizes the legacy `WordListMetadata` block from the manifest + per-length file (e.g., `length: N`, `source: 'src/latest (english-openlist-brrrdle 2026-05-28)'`, `version: '<release_date from manifest.json>'`, `generatedAt: '<generated_at from manifest.json>'`).
  - Passes the raw `metadata.curation` block through on an additive, optional `curation?` field added to `WordListMetadata` (additive only — existing consumers ignore unknown fields).
  - Leaves `answers` and `validGuesses` as-is (strings), letting the existing `validateWordListFile` continue to do the heavy validation.
- **No change to `loadBundledWordList`'s public surface**: it still calls `validateWordListFile(bundled)` and returns `LoadWordListResult`. The adapter runs **before** `validateWordListFile`, so any malformed local file is still caught by the canonical schema validator and surfaces as `invalid-bundled-list`.
- **Curated answers subset (BRRRDLE-ANSWERS-CURATION-SPEC) is preserved automatically**: the local files already encode the curated subset in `answers` — the loader does not need to re-curate.
- **Definitions**: `definitionsByWord` becomes an empty Map for the local-source path. The Definitions System already handles "no inline definition" gracefully via the Dictionary API → Wiktionary → Google fallback chain. No UI change.
- **Daily-mode performance**: static imports of all 34 files are no slower than the existing `src/data/bundled/` pattern. To safeguard daily mode bundle size, length 5 must remain in the initial JS chunk; the other 33 may be code-split via `import('…').then(…)` **only if** the bundle-size delta from static imports is judged unacceptable in 17.4 verification. Default plan: keep static imports (matches current Phase 2 pattern). Code-split is a fall-back lever, not a baseline change.
- **`src/data/bundled/` is kept on disk** (no deletion, per invariant) and updates its `source.json` to record that it is now a historical seed superseded by `src/latest/`. The seed JSONs remain valid emergency fallbacks; the loader does not consult them by default.
- **Hugging Face path stays compiled and tested** but is no longer the gameplay default. `refreshStore`'s in-memory swap can still be triggered by the admin route; gameplay reads the local source first and the refresh store only when the admin route has explicitly swapped a length in-session. Final wiring detail to be confirmed during 17.2.

### 22.4 Phase 17 — Sub-Phase Plan

| Sub-phase | Title | Files Touched (planned) | Verification |
|-----------|-------|-------------------------|--------------|
| 17.0 | Pre-flight, baseline capture, reconciliation note | none (read-only) | Re-confirm `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit` all green at HEAD. Confirm 34 files present at `src/latest/`. Decide and document whether to keep `src/latest/` or `git mv` to `src/latest/brrrdle/` to match the spec wording. |
| 17.1 | Add local source loader & metadata adapter | **New**: `src/data/localWordLists.ts`, `src/data/localWordLists.test.ts`. **Edit (additive only)**: `src/data/types.ts` (add optional `curation?` to `WordListMetadata`), `src/data/wordListSchema.ts` (accept synthesized metadata, no removal of existing checks). | New unit tests covering: lengths 2, 5, 12, 20, 35 load; metadata is synthesized correctly; answers/validGuesses pass canonical schema; malformed local file is still rejected with `invalid-bundled-list`. |
| 17.2 | Re-point `BUNDLED_WORD_LISTS` to local source | **Edit**: `src/data/wordLists.ts` (re-export `LOCAL_WORD_LISTS` as `BUNDLED_WORD_LISTS`; keep `BUNDLED_WORD_LIST_LENGTHS` array). **Update**: `src/data/bundled/source.json` to mark itself as historical seed. **No change**: `src/data/loadWordList.ts`, `src/data/wordRepository.ts`. | `src/data/loadWordList.test.ts`, `src/data/wordRepository.test.ts`, `src/data/practiceLengthCoverage.test.ts` all green unchanged. Existing daily-length-locked tests unchanged. |
| 17.3 | Deprecate runtime HF fetch as default; keep it as optional admin override | **Edit (annotation/JSDoc only, no logic change)**: `src/data/huggingFaceSource.ts`, `src/data/refresh.ts`, `src/data/refreshStore.ts`, `src/data/updateCheck.ts`, `api/admin-refresh.ts`. | Existing HF-related tests (`huggingFaceSource.test.ts`, `refresh.test.ts`, `refreshStore.test.ts`, `updateCheck.test.ts`) remain green. Admin-route auth tests remain green. |
| 17.4 | Full verification & bundle-leak check | docs/changelog/progress only | Full §22.5 pipeline. |
| 17.5 | Progress tracking, CHANGELOG, halt for user approval | `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-N.md` (next contiguous IDs after Phase 16's last), `CHANGELOG.md` | Manual review of progress and changelog updates. |

Each sub-phase ends with a `progress/PROGRESS-STEP-N.md` and a `progress/PROGRESS.csv` row appended for the corresponding `phase_id`. The agent halts at every sub-phase gate per CONSTITUTION.md §4 unless the user explicitly authorizes contiguous execution.

### 22.5 Verification & Release Gate (Phase 17.4)

Required to pass before declaring Phase 17 complete:

1. `npm run lint` — clean.
2. `npm run test` — all existing tests pass with zero new failures. New tests added in 17.1 must:
   - Assert that lengths 2, 5, 12, 20, and 35 load real local content (answer count and valid-guess count match `src/latest/manifest.json` per-length counts to within an exact equality for `validGuesses` and exact equality for the curated `answers` subset shipped in each file).
   - Assert daily mode loads length 5 and rejects non-5 lengths.
   - Assert practice mode rejects length 1 and length 36.
   - Assert that one carefully chosen ordinary English word per representative length (a word previously reported as "not in list") now validates as a guess.
   - Assert that a deliberately malformed mock local JSON is rejected via the canonical schema, producing `reason: 'invalid-bundled-list'` (or the alias chosen in 17.1).
3. `npm run build` — clean. Bundle-size delta over HEAD recorded in `progress/PROGRESS-STEP-N.md`. If the production JS bundle grows by more than +20% over current HEAD, fall back to the code-split plan described in §22.3.
4. `npx tsc -p tsconfig.api.json --noEmit` — clean.
5. Client-bundle leak checks (Phase 13/16 invariants), all run against `dist/`:
   - `grep -R "@vercel/blob" dist/` — no matches.
   - `grep -R "huggingface.co" dist/` — matches **only** inside dead-code-eliminated branches or admin-only modules; gameplay chunks must not contain any HF URL. If any gameplay chunk still references HF, treat it as a bug for 17.3 to fix by lazy-import.
   - No service-role keys, no Supabase admin secrets in `dist/`.
6. Definitions System manual smoke (Phase 6 invariant): post-game definition flow still works because the Dictionary API → Wiktionary → Google fallback chain handles the now-empty inline definitions cleanly; the Google search button remains always available.
7. Admin tab manual smoke (Phase 14 invariant): `/api/admin-refresh` still authenticates, still authorizes, still returns the same response shape. If a successful refresh is triggered, the new dataset is merged into `refreshStore` and gameplay reflects it without a reload — i.e., the local source acts as the default and the admin refresh acts as an opt-in override.
8. Auth flows, Word Explorer, Feedback, Sound Effects, Pay-to-Continue, sharing, and Phase 16 responsive UI: spot-checked unchanged.
9. CodeQL: run on changed lines after 17.3; any true-positive alerts must be fixed before 17.4 closes.

### 22.6 Preserved Invariants (Phase 17-specific re-statement)

- Daily 5-letter lock and practice 2..35 — unchanged.
- Hard Mode constraints — unchanged.
- Curated `answers` subset (BRRRDLE-ANSWERS-CURATION-SPEC) — preserved by reading the curated arrays already produced by `stratified_quality_score_v1` in each local file.
- Admin tab + `/api/admin-refresh` — preserved as an optional override.
- Word Explorer, Feedback, Sound Effects, Auth (`AuthModal`, `AccountBadge`, `ProfilePanel`, `classifyAuthError`, magic-link + password coexistence), Pay-to-Continue, sharing, definitions, stats, guest persistence, sync stub — untouched.
- Mobile/tablet responsiveness (Phase 16) — untouched.
- No file deletion. No test removal/skip/weakening. No new env vars, no service-role on client, no `@vercel/blob` in client bundle. No new runtime dependency.
- `src/data/index.ts` barrel export surface is preserved; any new exports (`LOCAL_WORD_LISTS`, `localWordListsManifest`) are additive.

### 22.7 Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Bundle-size regression from statically importing 34 large files in the main chunk. | Measure `dist/` size delta in 17.4; if > +20%, code-split lengths ≠ 5 via dynamic `import()` (loader becomes async for non-daily lengths; daily stays sync). |
| Path mismatch between spec (`src/latest/brrrdle/`) and repo (`src/latest/`). | Single loader-path constant in `localWordLists.ts`; either keep `src/latest/` and document, or `git mv` to `src/latest/brrrdle/` in 17.1 as a pure rename. |
| Existing schema validator rejects new metadata shape. | Synthesize legacy `WordListMetadata` from `src/latest/manifest.json` and per-length file in the adapter; do not weaken the validator. |
| Loss of inline definitions for curated answers (the local files don't carry them). | Existing Definitions System fallback chain (Phase 6) handles this — Dictionary API → Wiktionary → Google. Verification 22.5 §6 re-confirms. |
| Admin refresh path silently rots because gameplay no longer touches it. | Keep all existing HF tests green; Phase 17.3 only adds JSDoc deprecation notes; the cron route and `/api/admin-refresh` continue to compile and run. |
| Stale `src/data/bundled/` confuses future contributors. | Update `src/data/bundled/source.json.note` in 17.2 to explicitly state "Historical seed. Do not load at runtime. Superseded by `src/latest/` per LOCAL-WORD-LISTS-SPEC-2026-05-28." |
| Transitional length-5 compatibility files (`brrrdle_words.json`, `brrrdle_words.txt`) in `src/latest/` cause confusion. | Loader uses `words_length_N.json` filenames only; compatibility files are ignored. Documented in 17.1 progress notes. |

### 22.8 Out of Scope for Phase 17

- Changing the curated-answers algorithm.
- Adding inline definitions to the local per-length files.
- Removing or rewriting the Hugging Face fetch, refresh store, or admin refresh contract.
- Changing daily-mode length, practice-mode bounds, or any UI.
- Any documentation rewrite beyond the changelog entry and the seed `source.json` historical note.

### 22.9 Progress Tracking and CHANGELOG

- Append rows to `progress/PROGRESS.csv` for each of Phases 17.0 through 17.5, using the next contiguous `phase_id` values after the highest currently recorded ID. Titles follow the pattern `"Phase 17.x — <Sub-phase title>"`.
- Create `progress/PROGRESS-STEP-N.md` from `progress/PROGRESS-TEMPLATE.md` for each sub-phase, summarising what changed, verification results, blockers, and explicit go/no-go for the next sub-phase.
- Add `[Unreleased] — Changed` and `[Unreleased] — Deprecated` entries to `CHANGELOG.md` for: local-first word-list loading, deprecation of the runtime HF fetch as the default gameplay path, and the seed-snapshot historical-note update.

### 22.10 Phase 17 Exit Checklist

- All §22.2 diagnoses are demonstrably resolved (daily and practice 2–35 load real local content, previously rejected ordinary words now validate).
- All §22.6 invariants verified intact.
- All §22.5 verification items green.
- `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, and `CHANGELOG.md` updated and free of sensitive data.
- Halt for explicit user approval before any production release action.

---

**End of AGENT-IMPLEMENTATION-PLAN.md**
