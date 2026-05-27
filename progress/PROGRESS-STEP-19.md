# Progress Step Report — Step 19 (Phase 13 Execution: ADDITIONS-2026-05-27)

## Step
- **Major step / phase**: Phase 13 — full execution of `ADDITIONS-2026-05-27.md` (Word Explorer, Feedback, Sound Effects, Authentication Improvements, Repository Cleanup)
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §18 (13.0–13.6) and `ADDITIONS-2026-05-27.md`
- **Report file**: `progress/PROGRESS-STEP-19.md`
- **Date updated**: 2026-05-27T23:21:40Z
- **Status**: Completed — Awaiting user verification of Supabase / GitHub-label manual follow-up steps and PR review.

## Summary of Changes

Phase 13 (sub-steps 13.0 through 13.6) was executed autonomously in a single pass with explicit user authorization. Per the addendum constraints, no existing file was deleted, renamed in a lossy way, or had functionality removed; the daily 5-letter lock for og and go remains intact; practice 2..35 remains intact; no service-role key is exposed to the client; no secret was committed; no test was removed or weakened.

### 13.0 — Pre-flight & Risk Map
Baseline `npm ci`, `npm run lint`, `npm run test` (120/120), and `npm run build` all passed on `main` before any edits. Risk map (see "Decisions" below) was recorded inline in this report.

### 13.1 — Repository Cleanup (conservative)
The existing `src/` layout already groups code logically by concern: `account/`, `admin/`, `app/`, `data/`, `definitions/`, `game/`, `lib/`, `pwa/`, `stats/`, `test/`, `types/`, `ui/`. To minimize risk and avoid any breakage of `api/`, `vercel.json`, `tsconfig.api.json`, the PWA service worker cache, or GitHub Actions, **no existing file was moved or renamed**. The three new feature modules added by Phase 13.2–13.4 follow the existing convention by sitting as new sibling directories (`src/wordExplorer/`, `src/feedback/`, `src/sound/`). A larger structural reorganization can be performed safely in a future addendum once integration tests cover the new tabs end-to-end.

### 13.2 — Word Explorer Tab
- Added `src/wordExplorer/wordExplorerData.ts` with the union/dedupe/tag/filter/sort logic, driven off the same `loadBundledWordList` used by gameplay so the Vercel Blob / manifest → bundled JSON fallback chain is inherited without duplicating any loader.
- Added `src/wordExplorer/WordExplorerPanel.tsx` rendering the length selector (default 5, 2–35), live case-insensitive search, two combinable type checkboxes, sortable Word/Type column headers, per-row Copy-to-clipboard button, responsive single-column card layout on small screens, empty-state message, and the "Request this word" button that opens a pre-filled GitHub Issue URL in a new tab.
- Added `src/lib/githubIssue.ts` with shared, percent-encoded URL builders.
- Added the new `word-explorer` route and exposed it for all users (signed-out, signed-in non-admin, signed-in admin).

### 13.3 — Feedback Tab
- Added `src/feedback/FeedbackPanel.tsx` with the category dropdown, required description (2,000-char limit), optional details, optional email, accessible required-field error, and "Open pre-filled GitHub issue" submit button that opens the issue URL in a new tab. Nothing is sent automatically; the user reviews on github.com before submitting.
- Added the new `feedback` route and exposed it for all users.

### 13.4 — Sound Effects
- Added `src/sound/soundEngine.ts` (Web Audio synthesis, six events, no media autoplay, no asset files, no-op when disabled or when Web Audio is unavailable).
- Added `src/sound/SoundContext.ts` and `src/sound/SoundProvider.tsx` (React provider + hook split so `react-refresh/only-export-components` is satisfied).
- Added `src/sound/index.ts` barrel.
- Wrapped the root `App` in `<SoundProvider>`.
- Wired `keyboard-click`, `tile-flip`, `invalid-guess`, and `correct-guess` into both `OgGame.tsx` and `GoGame.tsx` at the input-submit seam.
- Wired `game-over-win` and `game-over-loss` into `App.tsx`'s game-complete handler.
- Added a Sound Effects toggle (On by default, persisted to `localStorage` under `brrrdle:sound-effects-enabled`) to Settings.

### 13.5 — Authentication Improvements
- Added `signInWithPassword`, `signUpWithPassword`, and `subscribeToAuthChanges` to `src/account/auth.ts`. Existing magic-link flow is unchanged.
- Rewrote `src/account/AuthPanel.tsx` to add a tabbed magic-link / email+password toggle, sign-in vs. create-account sub-modes, show/hide password toggle, password-length validation, and an accessible inline error/info message line.
- Threaded the new handlers and a `Supabase auth state change subscription` through `Settings.tsx` and `App.tsx`. Auth changes from another tab now propagate immediately.
- Confirmed admin role detection via `app_metadata.role === "admin"` (which Supabase maps to `raw_app_meta_data.role`) plus the existing `app_metadata.roles` array path; the Admin tab continues to render the manual refresh controls for admin users only.
- Supabase client already had `persistSession: true` and `autoRefreshToken: true` (verified in `supabaseClient.ts`), so session persistence across reloads is preserved.

### 13.6 — Final Integration & Release Gate
- Cross-feature smoke: with all features wired, every existing test still passes; new tests pass; daily 5-letter lock untouched; practice 2..35 unchanged; no `@vercel/blob` in client bundle; no api typecheck regression.

### 13.6 follow-up hardening — 2026-05-27T22:49:09Z
- Re-verified the Phase 13 implementation against the approved addendum and tightened several scope gaps:
  - Primary navigation now uses the exact approved top-level order (`og`, `go`, `Practice`, `Word Explorer`, `Feedback`, `Settings`, `Admin`) and hides Admin unless the authenticated Supabase user has the admin role.
  - Word Explorer now tries the live `/api/word-lists/manifest` path first and falls back to bundled dictionaries if the manifest or selected live length is unavailable.
  - Password auth errors are sanitized before display instead of surfacing raw Supabase provider error strings.
  - Feedback optional email is a free-form text field, matching the addendum's "optional email" requirement without external validation.

## Files Changed

### New
- `src/lib/githubIssue.ts`, `src/lib/githubIssue.test.ts`
- `src/wordExplorer/wordExplorerData.ts`, `src/wordExplorer/wordExplorerData.test.ts`, `src/wordExplorer/WordExplorerPanel.tsx`, `src/wordExplorer/index.ts`
- `src/feedback/FeedbackPanel.tsx`, `src/feedback/index.ts`
- `src/sound/soundEngine.ts`, `src/sound/soundEngine.test.ts`, `src/sound/SoundContext.ts`, `src/sound/SoundProvider.tsx`, `src/sound/index.ts`
- `src/account/auth.test.ts`
- `progress/PROGRESS-STEP-19.md` (this report)

### Modified
- `AGENT-IMPLEMENTATION-PLAN.md` (Section 18 addendum already present; no further edits in this step)
- `CHANGELOG.md` (new `[Unreleased]` Added/Changed/Known-limitations/User-action sections)
- `progress/PROGRESS.csv` (appended `phase_id = 19` row)
- `src/app/App.tsx` (SoundProvider wrap, auth subscription, new auth handlers, game-over sounds, new routes wired)
- `src/app/routes.ts`, `src/app/routes.test.ts` (added `word-explorer` and `feedback` routes between Practice and Definitions/Stats/Settings/Admin)
- `src/app/games/OgGame.tsx`, `src/app/games/GoGame.tsx` (sound engine wiring at input-submit seam after the cleanup follow-up)
- `src/account/AuthPanel.tsx` (magic-link / email+password toggle, sign-in vs. create-account, show/hide password)
- `src/account/Settings.tsx` (new auth props pass-through, Sound Effects panel)
- `src/account/auth.ts` (`signInWithPassword`, `signUpWithPassword`, `subscribeToAuthChanges`)
- 2026-05-27 follow-up: `src/app/routes.ts`, `src/app/App.tsx`, `src/app/routes.test.ts`, `src/wordExplorer/wordExplorerData.ts`, `src/wordExplorer/WordExplorerPanel.tsx`, `src/wordExplorer/wordExplorerData.test.ts`, `src/account/auth.ts`, `src/account/auth.test.ts`, `src/feedback/FeedbackPanel.tsx`, `CHANGELOG.md`, and this report.

### Not modified (intentional, per "no deletions" rule)
- All existing source files outside the modifications listed above are untouched. No `git mv` was performed.

## Verification
- **Checks run** (all on the head of the branch at completion):
  - `npm ci` — succeeded.
  - `npm run lint` — clean.
  - `npm run test` — **163 / 163 passed (43 new)**.
  - `npm run build` — clean (`tsc -b` + `vite build`), no TypeScript errors. Bundle-size warning is pre-existing.
  - `npx tsc -p tsconfig.api.json --noEmit` — clean.
  - Client-bundle leak check: `grep -R "@vercel/blob" dist/` returned **no matches** in shipped chunks (Phase 13 invariant preserved).
  - `codeql_checker` — to be run before final report (see next entry in CHANGELOG when results land).
  - 2026-05-27 baseline follow-up before edits: `npm ci`; `npm run lint`; `npm run test` (163/163); `npm run build`; `npx tsc -p tsconfig.api.json --noEmit`; client-bundle leak check; `git diff --check` — succeeded.
  - 2026-05-27 final follow-up verification: `npm ci`; `npm run lint`; `npm run test` (167/167); `npm run build`; `npx tsc -p tsconfig.api.json --noEmit`; client-bundle leak check (`grep -R "@vercel/blob" dist/assets/*.js`); `git diff --check` — succeeded. Vite reports the existing >500 kB chunk-size warning.
  - `codeql_checker` on the follow-up diff — 0 alerts.
- **Checks not run**:
  - Live Supabase end-to-end smoke for email+password sign-in/sign-up: requires the Supabase dashboard to have Email + Password auth enabled, which the agent cannot perform from the sandbox. The new auth functions are covered by unit tests against a Supabase client double.
  - Live device audio smoke: the agent sandbox has no audio device. The sound engine is covered by unit tests against an `AudioContextLike` double.

## Blockers, Errors, or Critical Notes
- None blocking. Two manual user actions are required to fully exercise the new auth and issue-creation flows in production (see below).

## User Action Required Before Next Step
- **Supabase (required for password auth)**: enable the **Email + Password** provider in the Supabase project's Auth settings; verify confirmation and reset email templates.
- **Supabase (required for end-to-end admin verification)**: ensure at least one user has `raw_app_meta_data.role = "admin"` so the Admin tab renders with the manual refresh controls.
- **GitHub labels (required for pre-filled issues)**: create `word-request`, `feedback`, `bug`, and `enhancement` labels on `ryanjosephkamp/brrrdle` if any are missing.
- **Vercel**: **no action required**. No `api/` path, `vercel.json` entry, or env-var binding was changed in this phase.
- **GitHub Pages / Jekyll docs**: **no action required**. No `docs/` file was moved or renamed.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes for code review and PR merge — pending user verification of the Supabase + GitHub-label manual steps above, all repository-side work for ADDITIONS-2026-05-27 is complete.
- **Next major step**: User code review, PR merge, then production release verification.
- **Exact approval needed, if any**: User confirmation that the Supabase Email+Password provider is enabled and that the GitHub labels exist (or that the user accepts these as follow-ups to perform post-merge).

## Additional Notes / Annotations
- Daily 5-letter lock is intact (`src/game/constants.ts`, `src/app/routes.ts`, daily session code unchanged).
- Practice 2..35 contract is intact (`BUNDLED_WORD_LIST_LENGTHS`, `SUPPORTED_PRACTICE_WORD_LENGTHS` unchanged).
- No `@vercel/blob` import is present in the client bundle.
- No secrets, deploy URLs, or private deployment data are present in any artifact.
- The optional email field on the Feedback tab is embedded only into the issue body the user reviews on github.com before submitting; it is never stored client-side beyond the form state.
- Sound preference persists under `localStorage` key `brrrdle:sound-effects-enabled` and defaults to On.

### Conservative repository reorganization follow-up — 2026-05-27T23:21:40Z
- User explicitly authorized a conservative follow-up reorganization after Phase 13.1 while retaining the non-deletion rule and requiring notes to be appended here instead of creating a new progress step.
- Files moved with `git mv`:
  - `src/app/OgGame.tsx` → `src/app/games/OgGame.tsx`
  - `src/app/GoGame.tsx` → `src/app/games/GoGame.tsx`
  - `src/game/useKeyboardInput.ts` → `src/game/input/useKeyboardInput.ts`
  - `src/game/useKeyboardInput.test.ts` → `src/game/input/useKeyboardInput.test.ts`
  - `src/lib/storage/dailyOgStorage.ts` → `src/game/storage/dailyOgStorage.ts`
  - `src/lib/storage/dailyOgStorage.test.ts` → `src/game/storage/dailyOgStorage.test.ts`
  - `src/lib/storage/dailyGoStorage.ts` → `src/game/storage/dailyGoStorage.ts`
  - `src/lib/storage/dailyGoStorage.test.ts` → `src/game/storage/dailyGoStorage.test.ts`
- New folders created with README files: `src/app/games/`, `src/game/input/`, and `src/game/storage/`.
- Import paths were updated in the app shell, moved game panels, game barrel exports, UI keyboard component, and moved storage/input tests. No `tsconfig`, Vite, ESLint, Vercel, Supabase, public asset, docs routing, or GitHub Actions path setting required a config change.
- Documentation updated: root `README.md` now includes a current repository organization tree; `src/app/README.md`, `src/game/README.md`, and `src/lib/README.md` were refreshed; `CHANGELOG.md` records the behavior-preserving reorganization under Unreleased.
- Manual follow-up: **Vercel — no action required** (no `api/` entry point, cron path, rewrite, output directory, or env binding changed). **Supabase — no action required** (client env names and auth settings unchanged). **GitHub Pages / Jekyll — no action required** (`docs/` did not move). **GitHub Actions — no action required** (no workflow path expression changed).
- Baseline verification before the follow-up passed: `npm ci`, `npm run lint`, `npm run test` (167/167), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, client-bundle leak check, and `git diff --check`.
- Post-move verification passed before documentation updates: `npm run lint`, `npm run test` (167/167), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, client-bundle leak check, and `git diff --check`.
- Final verification after all source/documentation updates passed: `npm run lint`, `npm run test` (167/167), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, client-bundle leak check (`grep -R "@vercel/blob" dist/assets/*.js` returned no matches), and `git diff --check`. Vite still reports the existing >500 kB chunk-size warning.
- `codeql_checker` was run with the changes classified as trivial behavior-preserving file moves/import updates plus documentation updates; it skipped analysis because all changes were trivial.

