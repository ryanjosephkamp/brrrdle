# AGENT-IMPLEMENTATION-PLAN.md

**Project**: brrrdle  
**Plan Version**: 1.2
**Date**: 2026-05-26  
**Status**: Draft for user review — amended with Hugging Face word-list source integration
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

**End of AGENT-IMPLEMENTATION-PLAN.md**
