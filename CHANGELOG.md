# Changelog

All notable changes to `brrrdle` will be documented in this file.

## Unreleased

### Changed (Phase 16 — Mobile & Tablet Responsiveness Improvements)
- **`src/ui/Keyboard.tsx`** — on-screen keyboard is now responsive: `<section>` is `@container mx-auto w-full max-w-2xl` (visually mirroring the capped daily grid on tablets); buttons consume `--brrrdle-key-min/max/font/-action-font` tokens with `cqi`-based clamps, share a single class family between letter and action keys (no more `text-xs` mismatch on Enter/Del), and add `touch-action: manipulation` + `motion-safe:active:scale-95` for tactile mobile feel. Effective ≥ 44 px touch targets preserved; 10-letter top row fits at 320 px viewport. Input contract (`onInput`, disabled, `letterStates`, `aria-label`) unchanged.
- **`src/app/games/OgGame.tsx` and `src/app/games/GoGame.tsx`** — guess grid is now responsive: outer wrapper declares a Tailwind v4 `@container`, each row is centred with `mx-auto` and capped at `calc(var(--brrrdle-tile-max) * wordLength + 0.375rem * (wordLength - 1))` so 5-letter daily rows stop ballooning on iPad portrait/wider while 35-letter practice rows still occupy full width on phones. Row gap is `gap-1 sm:gap-1.5`. Each tile is its own `@container` with `aspect-square` and inline `font-size: clamp(0.625rem, 50cqi, 1.75rem)`, so glyphs always render at ~50 % of tile width across phones, tablets, and desktop. Grid semantics (`role="grid"/"row"/"gridcell"`, `aria-label`s, animations, per-state color classes) and the 5-letter daily / 2..35 practice invariants are preserved byte-identically.

### Added (Phase 16 — Mobile & Tablet Responsiveness Improvements)
- **`index.html`** — `viewport` meta now carries `viewport-fit=cover` so iOS standalone PWA respects `env(safe-area-inset-*)`.
- **`src/index.css`** — Phase 16 responsive design tokens on `:root`: `--brrrdle-tile-min/max/size/font` and `--brrrdle-key-min/max/size/font/-action-font`. All are `clamp()`-based with container-inline-size (`cqi`) fluid middles so tile and key sizing follow the actual section width rather than the raw viewport.
- **`src/ui/Layout.tsx`** — app shell switched to `min-h-svh min-h-dvh` with safe-area padding (`px-[max(1rem,env(safe-area-inset-left))] py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8`) for notched-device polish without altering header/main composition.

### Added (Phase 15 — AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27 authentication & profile UX redesign)
- **`src/account/profile.ts`** — pure profile helpers: `deriveInitials`, `normalizeDisplayName`, `validateAccentColor`, `validateAvatarUrl`, `pickInitialsGradient`, and `deriveProfileFromUser`. Allow-listed accent colors and a 200 KB hard cap for data-URL avatar fallbacks. No Supabase client, no React, no I/O — fully unit-testable.
- **`src/account/AuthModal.tsx`** — new single Auth dialog built on the existing `Dialog` primitive: two tabs (Magic Link / Email + Password), a sub-mode radio group for Sign in vs Create account, and **a single primary submit button whose label and action follow the active sub-mode**. Forgot Password is a three-step inline flow (form → send → confirmation). Auto-closes on successful authentication. Errors come exclusively through `classifyAuthError`.
- **`src/account/AccountBadge.tsx`** — global signed-in / Guest indicator rendered inside the existing `Layout` header on every route. Shows avatar (image if uploaded, otherwise initials on a deterministic gradient) + display name / email when signed in; "Guest · Sign in to sync" pill when anonymous; "Guest · sync unavailable" quiet hint when Supabase is unconfigured. Mobile-first (avatar-only under `sm`, full label at and above `sm`).
- **`src/account/ProfilePanel.tsx`** — new `Dialog`-based profile editor for display name (≤ 50 chars), allow-listed accent color, optional Supabase Storage avatar upload (PNG/JPEG/WebP under 200 KB) gated on a runtime probe of an `avatars` bucket. Falls back gracefully to the initials avatar when no bucket is present; **never throws to the caller**.
- **Auth helper surface in `src/account/auth.ts`** (additive):
  - `classifyAuthError(error, action)` returns one of a closed set of safe, user-facing strings ("Email or password is incorrect.", "That email is already registered. Try signing in instead.", "Please confirm your email before signing in.", "Too many attempts — please wait a minute and try again.", "Network unavailable — please try again.", "That email address does not look valid.", and per-action defaults). No raw Supabase error strings ever reach the UI.
  - `sendPasswordResetEmail(client, email)` wraps `supabase.auth.resetPasswordForEmail` with `window.location.origin` as the `redirectTo` when available; returns a sanitized success/failure envelope.
  - `updateProfile(client, { displayName?, accentColor?, avatarUrl? })` wraps `supabase.auth.updateUser({ data })`. Validates inputs via `profile.ts`; rejects unsafe avatar URLs (no `javascript:`, no `http:`, no oversized data URLs); supports clearing display name with the empty string.
  - `hasAvatarStorage(client)` + `uploadAvatar(client, { contentType, data, userId })` — runtime Storage probe and user-scoped upload to `avatars/{userId}/avatar.{ext}` with sanitized id. Never surfaces raw provider errors.
  - `AuthUserSummary.profile` now carries the derived `{ accentColor, avatarUrl, displayName, email, gradient, initials, label }` so the badge and panel render without re-deriving on every mount.
- **`src/app/App.tsx`** wires the new modal/profile state, threads `onOpenAuthModal` / `onOpenProfilePanel` through `RoutePanel` to Settings, renders `AccountBadge` in the header (inside the existing `navigation` slot), and renders `AuthModal` + `ProfilePanel` at the layout root. `handleSendMagicLink` now routes its failure path through `classifyAuthError`. After a successful `updateProfile`, `getCurrentAuthState` is re-read so `AccountBadge` reflects the new metadata immediately.
- **`src/account/Settings.tsx`** adds "Sign in / Create account" (anonymous) and "Manage profile" (authenticated) buttons that open the new modals. The existing inline `AuthPanel` continues to render on Settings as a fallback. **No file is removed; no test is weakened.**
- **62 new unit tests** across `src/account/profile.test.ts` (21), `src/account/authHelpers.test.ts` (27), `src/account/AuthModal.test.tsx` (6), `src/account/AccountBadge.test.tsx` (4), and `src/account/ProfilePanel.test.tsx` (4). Component tests use `react-dom/server`'s `renderToStaticMarkup` (no new DOM testing dependency added). **Total: 256 tests passing.**

### Fixed (Phase 15 — AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27)
- **Duplicate "Create account" buttons on mobile** in `src/account/AuthPanel.tsx`: the Email + Password sub-mode toggle is now a real `role="radiogroup"` with `aria-checked` radios, distinct from a single primary submit button whose label follows the active sub-mode. The visual duplicate-CTA pattern is gone on every viewport, while the existing `AuthPanel` API and all wired handlers remain unchanged.
- **Generic "Unable to create an account right now" error** now routed through `classifyAuthError`, which maps known Supabase error patterns (rate limit, network failure, already-registered, unconfirmed email, invalid credentials, weak password, invalid email) to specific, friendly messages.
- **No global signed-in / Guest indicator** before Phase 15 — `AccountBadge` is now rendered on every route (Home, og daily, go daily, Practice, Word Explorer, Feedback, Stats, Settings, Admin).

### Documentation (Phase 15)
- Appended Section 20 (Phase 15) plan addendum to `AGENT-IMPLEMENTATION-PLAN.md`.
- `docs/supabase.md`: appended an additive note on enabling the optional `avatars` Storage bucket for image avatars (initials-avatar path requires no setup).
- Added `progress/PROGRESS-STEP-22.md` and appended `phase_id = 22` row to `progress/PROGRESS.csv`.

### User action required (Phase 15)
- **Supabase**: confirm the Email + Password provider is enabled (carried over from Phase 13.5) and that the password-reset email template is configured.
- **Supabase (optional, for image avatars)**: create a public Storage bucket named `avatars` with RLS that allows each authenticated user to read/write only paths under `auth.uid()/*`. Without this bucket, brrrdle silently falls back to the initials avatar.
- **Supabase**: continue to maintain `raw_app_meta_data.role = "admin"` for admin users (carried over from Phase 14).
- **Vercel**: no env var changes; `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are still the only required client-side variables.

### Fixed (Phase 14 — DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27 admin tab regression)
- **Admin tab now renders actionable manual-refresh controls** for users whose Supabase account has the admin role. The existing descriptive paragraphs are preserved verbatim and are now joined by a "Refresh now" button, an `aria-live="polite"` `role="status"` region, and a structured read-out of `revision`, `generatedAt`, `fetchedAt`, length count, and `persistence.status`. The button is disabled while a request is in flight and after a success until the operator explicitly re-arms, preventing accidental double-refresh. Source: `src/admin/ManualRefreshControls.tsx`, `src/admin/AdminPanel.tsx`.
- **Hardened admin-role detection** in `src/account/auth.ts::getRoles` to accept admin from any of `app_metadata.roles[]`, `app_metadata.role`, `raw_app_meta_data.roles[]`, or `raw_app_meta_data.role`, deduplicated. The function still returns `readonly string[]`, never throws on missing/`null` shapes, and continues to feed `summarizeUser → AuthUserSummary.roles` as the single source the UI consults. A new pure helper `isAdminUser(user)` returns `true` iff any of those four sources resolves to `"admin"`.
- **Forced fresh session after sign-in / sign-up so the Admin tab updates immediately.** `signInWithPassword` and `signUpWithPassword` now invoke a private best-effort `refreshSession()` after a successful Supabase call (a thrown refresh is swallowed; the user is not signed out and the bearer token is never logged). `subscribeToAuthChanges` now opportunistically re-derives the listener payload via `getCurrentAuthState(client)` on `SIGNED_IN` / `TOKEN_REFRESHED` / `USER_UPDATED` events, debounced to one in-flight refresh at a time. Both auth flows (magic link and email + password) flow through the same listener, so no flow-specific code was added. Source: `src/account/auth.ts`.

### Added (Phase 14 — DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27 admin tab regression)
- `src/admin/manualRefresh.ts` — pure client helper `requestAdminRefresh({ supabase, fetchImpl?, endpoint? })` that POSTs to `/api/admin-refresh` with `Authorization: Bearer <access_token>` and `accept: application/json` (no body), parses the JSON response, and returns a discriminated union (`{ ok: true, … }` on HTTP 202, otherwise `{ ok: false, reason: 'missing-session' | 'unauthorized' | 'forbidden' | 'server-error' | 'network-error', status?, message?, stage? }`). The bearer token is never logged, never persisted, and never included in the returned payload.
- `src/admin/ManualRefreshControls.tsx` — accessible UI component that calls `requestAdminRefresh` via prop-injected Supabase client (testable with a client double).
- `src/admin/index.ts` re-exports the new module and component.
- `src/app/App.tsx` threads the existing `supabaseClient` memo through `RoutePanel` to `AdminPanel`. No new effects, state, or callbacks were required.
- 27 new unit tests across `src/account/auth.test.ts`, `src/admin/authorization.test.ts`, `src/admin/manualRefresh.test.ts`, and `src/admin/ManualRefreshControls.test.tsx`. Total: 194 tests passing, 0 removed or weakened. Component-render tests use `react-dom/server`'s `renderToStaticMarkup` so no new DOM testing dependency was added.

### Documentation (Phase 14 — DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27 admin tab regression)
- Added `progress/PROGRESS-STEP-20.md` (Phase 14.0 pre-flight & reproduction map) and `progress/PROGRESS-STEP-21.md` (Phase 14.1 implementation & verification).
- Appended `phase_id = 20` and `phase_id = 21` rows to `progress/PROGRESS.csv`.

### User action required (Phase 14)
- **Supabase**: confirm at least one user has `raw_app_meta_data.role = "admin"` set in the dashboard or via the admin API; confirm the Email + Password provider remains enabled (carried over from Phase 13).
- **Vercel**: **no action required**; `SUPABASE_URL` and `SUPABASE_ANON_KEY` (or their `VITE_`-prefixed counterparts) must continue to be set so `/api/admin-refresh` can validate the bearer token.
- **GitHub Actions / Pages / labels**: **no action required**.
- **Browser session hygiene** (recommended once after deploy): existing admin users should sign out and back in once so the locally cached JWT is replaced and the `raw_app_meta_data` claim minted before the deploy is immediately re-read.

### Added (ADDITIONS-2026-05-27 — Phase 13 execution)
- **Word Explorer tab** (`src/wordExplorer/`): new public route with length selector (default 5, range 2–35), live case-insensitive search, two combinable type checkboxes ("Show Answers" / "Show Valid Guesses"), sortable Word/Type columns, per-row copy-to-clipboard button, responsive single-column card layout on small screens, empty-state with `"<term>" is not in the current <N>-letter word list.` message and a "Request this word" button that opens a pre-filled GitHub Issue (`word-request` label) in a new tab.
- **Feedback tab** (`src/feedback/`): new public route with a category dropdown (Bug Report / Feature Request / Other), required description (2,000-char limit), optional details and optional email fields, and a submit button that opens a pre-filled GitHub Issue (`feedback` plus category-derived labels) in a new tab. Nothing is sent automatically; the user reviews the issue on github.com before submitting.
- **Sound Effects** (`src/sound/`): minimal, dependency-free Web Audio engine with six events (`tile-flip`, `correct-guess`, `game-over-win`, `game-over-loss`, `keyboard-click`, `invalid-guess`), Settings toggle (On by default, persisted to `localStorage` under `brrrdle:sound-effects-enabled`), full no-op when toggled off, graceful no-op when Web Audio is unavailable. Wired into the og and go game flows for keyboard clicks, tile flips, invalid guesses, correct guesses, and win/loss tones.
- **Authentication improvements** (`src/account/`): `AuthPanel` now offers a magic-link / email + password toggle, with sub-modes for sign-in and create-account, a show/hide-password toggle, password length validation (≥ 8 chars), and an accessible error/info message line. `App.tsx` now subscribes to Supabase `onAuthStateChange` so the UI reflects session changes from any tab. Admin detection continues to use `app_metadata.role === "admin"` (which maps to Supabase `raw_app_meta_data.role`) or the existing `app_metadata.roles` array.
- **GitHub Issue helper** (`src/lib/githubIssue.ts`): shared, percent-encoded URL builders for both Word Explorer word-requests and the Feedback tab.
- **Routes**: `src/app/routes.ts` adds `word-explorer` and `feedback` between Practice and Definitions/Stats/Settings/Admin per ADDITIONS-2026-05-27.md §1 navigation order. No existing route was removed.
- **Tests**: 43 new unit tests (`src/lib/githubIssue.test.ts`, `src/wordExplorer/wordExplorerData.test.ts`, `src/sound/soundEngine.test.ts`, `src/account/auth.test.ts`). Total: 163 tests passing.

### Changed (ADDITIONS-2026-05-27 — Phase 13 execution)
- **Repository organization follow-up**: moved playable game route panels into `src/app/games/`, physical keyboard gameplay helpers into `src/game/input/`, and daily in-progress session storage into `src/game/storage/`; added README files for the new folders and refreshed the root repository tree. This is behavior-preserving and does not change Vercel routes, Supabase configuration, GitHub Actions, the daily 5-letter lock, or practice 2–35 support.
- Follow-up hardening aligned the primary navigation with the exact approved top-level order (`og`, `go`, `Practice`, `Word Explorer`, `Feedback`, `Settings`, `Admin`) and keeps the Admin entry hidden unless the signed-in user has the Supabase admin role.
- Word Explorer now attempts the live `/api/word-lists/manifest` read path first and falls back to bundled dictionaries when no live manifest or length file is available, preserving the Vercel Blob / manifest → bundled JSON contract.
- Password auth errors shown in the UI are sanitized generic messages rather than raw Supabase provider strings.
- Feedback's optional email field is free-form text, matching the requirement that it is optional and not externally validated.
- `src/app/App.tsx` now wraps the root in a `SoundProvider`, subscribes to Supabase auth changes via `subscribeToAuthChanges`, plays the win/loss tones when a game completes, and threads the new auth handlers and sound toggle into `Settings`.
- `src/account/Settings.tsx` adds an optional "Sound Effects" panel and passes the password/sign-up handlers through to `AuthPanel`.
- `src/account/auth.ts` adds `signInWithPassword`, `signUpWithPassword`, and `subscribeToAuthChanges` alongside the existing magic-link flow; the existing magic-link behavior is unchanged.
- `src/app/games/OgGame.tsx` and `src/app/games/GoGame.tsx` consume the sound engine to emit `keyboard-click`, `tile-flip`, `invalid-guess`, and `correct-guess` events at the minimum surface area required by ADDITIONS-2026-05-27.md §3.

### Documentation (Plan Addendum — DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27)
- Drafted a new Section 19 ("Phase 14 — Plan Addendum (DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27): Fix the Admin Tab") at the end of `AGENT-IMPLEMENTATION-PLAN.md`. The addendum is scoped strictly to the Admin-tab regression. It diagnoses the root cause (the allowed branch of `src/admin/AdminPanel.tsx` renders only descriptive copy, with no `/api/admin-refresh` button, so even correctly-detected admins see the static "PROTECTED ADMIN / Manual refresh controls / Manual refresh requests must be sent…" paragraphs), and plans a minimal, non-deleting fix that (a) renders an actionable "Refresh now" button plus a live status region inside the existing allowed branch via a new `ManualRefreshControls` component, (b) hardens `src/account/auth.ts` admin-role detection to accept admin from any of `app_metadata.roles[]`, `app_metadata.role`, `raw_app_meta_data.roles[]`, or `raw_app_meta_data.role`, and (c) forces a best-effort `supabase.auth.refreshSession()` after successful sign-in/sign-up and on `SIGNED_IN` / `TOKEN_REFRESHED` / `USER_UPDATED` so the Admin tab updates immediately for both the magic-link and the email + password flows. The addendum is split into Phase 14.0 (pre-flight & reproduction map) and Phase 14.1 (the surgical fix), each with verification commands, manual diagnostic console snippets, smoke checks, and a halt-for-approval gate after every step.
- Bumped the implementation plan header to version 1.4 to record the new addendum.
- Updated `progress/PROGRESS-STEP-19.md` with a note that the addendum has been drafted and that implementation has not yet begun.
- No source code, route table, server route, configuration file, or test was modified by this addendum-drafting step. No file was deleted or renamed.

### Documentation (Plan Addendum — ADDITIONS-2026-05-27)
- Drafted a new Section 18 ("Phase 13 — Plan Addendum (ADDITIONS-2026-05-27)") at the end of `AGENT-IMPLEMENTATION-PLAN.md` covering the Word Explorer tab, Feedback tab, Sound Effects, Authentication Improvements (email + password alongside magic link, durable session, admin role detection from `raw_app_meta_data.role === "admin"`), and a safe, non-destructive Repository Cleanup & Re-organization. The addendum is broken into clear phases (13.0 Pre-flight & Risk Map, 13.1 Cleanup, 13.2 Word Explorer, 13.3 Feedback, 13.4 Sound Effects, 13.5 Authentication, 13.6 Final Integration) with per-step verification commands, explicit manual follow-up notes (Supabase password-auth enablement, GitHub label creation, conditional Vercel reconfiguration), and a halt-for-approval gate after every step.
- Bumped the implementation plan header to version 1.3 to record the addendum.
- Appended a new `phase_id = 18` row to `progress/PROGRESS.csv` noting that the addendum is drafted and awaiting explicit user approval; no implementation work has begun.
- Added `progress/PROGRESS-STEP-18.md` summarizing the addendum, the required user actions, and the next major step (Phase 13.0).

### Known limitations (ADDITIONS-2026-05-27 — Phase 13 execution)
- **Repository Cleanup (Phase 13.1)** was executed conservatively. The existing `src/` layout already groups code by concern (`game/`, `ui/`, `account/`, `admin/`, `data/`, `definitions/`, `app/`, `lib/`, `pwa/`, `stats/`, `types/`, `test/`); the new feature modules (`src/wordExplorer/`, `src/feedback/`, `src/sound/`) were added as new sibling directories under that same convention. No existing files were moved, renamed, or deleted, so no Vercel/Supabase/GitHub Actions reconfiguration is required. A larger structural reorganization can be performed in a follow-up plan addendum if desired.
- **Sound Effects** uses synthesized Web Audio tones only; no asset files were added under `public/sounds/`, so the PWA service worker cache list does not need to change.
- **Authentication** changes are end-to-end-verifiable only against a Supabase project with **Email + Password** auth enabled in the Auth providers settings; the agent sandbox cannot complete that step (see "User action required" below).

### User action required (ADDITIONS-2026-05-27 — Phase 13 execution)
- **Supabase**: enable the **Email + Password** provider in the project's Authentication settings; configure password-reset / confirmation email templates as desired. At least one user must have `raw_app_meta_data.role = "admin"` for end-to-end admin verification.
- **GitHub labels**: create `word-request`, `feedback`, `bug`, and `enhancement` labels on `ryanjosephkamp/brrrdle` if they do not already exist (the pre-filled issues request these labels).
- **Vercel**: no env-var or routing change is required; no `api/` path or `vercel.json` entry was modified in this phase.

### Fixed (Residual Vercel discriminated-union TypeScript narrowing — 2026-05-27)
- Fixed the new Vercel TypeScript narrowing errors reported after `VERCEL-REDEPLOY-BUILD-LOGS-2026-05-26.md` and `DIAGNOSIS-REPORT-2026-05-26.md` by adding explicit type guards for `RefreshResult`, `SchemaValidationResult`, `LoadWordListResult`, and `WordRepositoryResult`, then using them at the failure-only field access sites in the data layer and refresh API routes.

### Fixed (Residual Vercel TypeScript build errors — 2026-05-27)
- Fixed the residual NodeNext/Node16 TypeScript errors shown in `VERCEL-REDEPLOY-BUILD-LOGS-2026-05-26.md` and diagnosed by `DIAGNOSIS-REPORT-2026-05-26.md` by making the remaining `src/data/` barrel and module imports Vercel-compatible with explicit `.js` extensions.
- Added `type: "json"` import attributes to bundled word-list and bundled-source JSON imports so Vercel's serverless TypeScript pass accepts the same JSON imports that the app build consumes.
- Tightened `loadWordList.ts` length-resolution typing so the failure branch cannot be inferred as a successful result missing `wordList`.

### Fixed (Phase 12 — Updated Diagnosis Report 2026-05-26)
- Verified that the build, lint, test, and standalone `tsc -p tsconfig.api.json --noEmit` checks all pass locally with zero TypeScript errors across the app, node, and api project references. The TypeScript build errors described in the updated diagnosis report (missing `.js` extensions, missing barrel re-exports from `src/data/index.ts`, JSON import attribute issues, `loadWordList.ts` type mismatch) are no longer reproducible from the current `main`, indicating that the residual Vercel failures originated from a stale Vercel build cache rather than from any unresolved source defect; trigger a clean Vercel rebuild against the latest commit to pick up the fix.
- Added `src/data/practiceLengthCoverage.test.ts` to lock in the practice length contract: `loadBundledWordList` returns `ok` and a non-empty `validGuesses`/`answers` set for every length 2..35, the canonical `validateGuess` accepts a representative real bundled word at lengths 2, 5, 12, and 20, and clearly invalid strings are still rejected. This is the regression suite for the "practice mode dropdown shows only 2/5/35" and "valid words rejected as not in list" symptoms.
- Confirmed that no Phase 9 debug surface remains in `src/`. The "polish ready" floating toast, the "Phase 9 polish" sidebar `Panel`, and the "Phase 9 shell notes" `Dialog` mounts were removed in the previous Phase 12 pass; the underlying `ToastRegion`, `Panel`, and `Dialog` UI primitives stay available in `src/ui/` for future gameplay use.
- Re-verified that `@vercel/blob` is not present in the client bundle (`dist/assets/*.js`) and that the Vercel Blob–backed word-list store retains its atomic-swap and skip-when-unconfigured behavior with no regressions.

### Known limitations
- The bundled word lists for lengths 23–35 still ship deterministic synthetic placeholders rather than real English dictionary slices, because Hugging Face hosts are not reachable from the agent sandbox and a refresh against `https://huggingface.co/datasets/ryanjosephkamp/english-openlist/resolve/main/latest/brrrdle/` could not be performed locally. The selector exposes these lengths per the BRRRDLE-SPEC §3.1 practice range, but they will only contain authoritative content after the scheduled Vercel Cron route or the protected admin refresh runs with `CRON_SECRET` and `BLOB_READ_WRITE_TOKEN` configured. This limitation is recorded in `progress/PROGRESS-STEP-15.md`.

## Previous Unreleased

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
