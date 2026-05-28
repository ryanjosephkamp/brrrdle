# Progress Step Report — Step 21 (Phase 14.1: Admin Tab Fix)

## Step
- **Major step / phase**: Phase 14.1 — Fix the Admin Tab (minimal, surgical)
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §19.5 / §19.6 / §19.9 and `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md`
- **Report file**: `progress/PROGRESS-STEP-21.md`
- **Date updated**: 2026-05-28T00:52:00Z
- **Status**: Completed — full verification suite green, ready for code review.

## Summary of Changes

The Phase 14.1 surgical fix was executed end-to-end against the §19.3 four-part scope. No file was deleted or renamed, no test was removed or weakened, the daily 5-letter lock and the practice 2..35 contract are untouched, the `/api/admin-refresh` server contract is unchanged, and no service-role key is reachable from the client. The Phase 13 invariant (`@vercel/blob` absent from `dist/assets/*.js`) is preserved.

### 19.5.1 Hardened admin-role detection (`src/account/auth.ts`)
- `getRoles(user)` now defensively reads the `raw_app_meta_data` runtime field in addition to the published `app_metadata` shape. It deduplicates the resulting role names while preserving order of discovery, and prefers an array-of-strings over a single string at each layer. The function still returns `readonly string[]`, never throws on missing/`null` shapes, and continues to power `summarizeUser → AuthUserSummary.roles` as the single source the UI consults.
- A new pure helper `isAdminUser(user)` returns `true` iff any of the four diagnosed shapes resolves to `"admin"`. It is the explicit hook called out by §19.5.1 and is exported from `src/admin/index.ts` via the `admin` barrel through the account module.
- No `User` type widening: `raw_app_meta_data` is read through an `unknown` narrowing guard.

### 19.5.2 Manual refresh client controls (`src/admin/manualRefresh.ts`, `src/admin/ManualRefreshControls.tsx`, `src/admin/AdminPanel.tsx`, `src/admin/index.ts`)
- New pure async helper `requestAdminRefresh({ supabase, fetchImpl?, endpoint? })` reads the current session, returns the documented discriminated union (`{ ok: true, … }` on HTTP 202, otherwise `{ ok: false, reason: 'missing-session' | 'unauthorized' | 'forbidden' | 'server-error' | 'network-error', status?, message?, stage? }`), sends the `Authorization: Bearer <access_token>` header and `accept: application/json`, no body. The bearer token is never logged, never stored in `localStorage`, and is omitted from the returned payload. `fetchImpl` is injectable for tests; the default is the global `fetch`.
- New `ManualRefreshControls` component renders a primary "Refresh now" button, an `aria-live="polite"` `role="status"` region, idle / in-flight / success / failure copy, and a read-out of `revision`, `generatedAt`, `fetchedAt`, length count, and `persistence.status`. The button is disabled while in flight and after a success until the operator clicks "Reset status" to re-arm (preventing accidental double-refresh). The component accepts the Supabase client via prop so it remains testable with a client double and supports the `unconfigured` case (button disabled, "Supabase is not configured" hint shown).
- `AdminPanel` now renders `ManualRefreshControls` inside the existing allowed-branch `<Panel>` **in addition to** the existing two descriptive paragraphs (no deletion). The `ErrorState` branches for `missing-authentication`, `missing-admin-role`, and `unconfigured` are unchanged.
- `src/admin/index.ts` now re-exports `ManualRefreshControls` and the `requestAdminRefresh` helper alongside the existing `AdminPanel` and `evaluateAdminAccess` exports.
- `src/app/App.tsx` threads the existing `supabaseClient` memo through `RoutePanel` to `AdminPanel`. No new effect, no new state, no new callback was required: the existing `subscribeToAuthChanges` listener picks up the role refresh added in 19.5.3.

### 19.5.3 Force fresh session after auth events (`src/account/auth.ts`)
- `signInWithPassword` and `signUpWithPassword` now invoke `client.auth.refreshSession()` exactly once after a successful Supabase call. The call is wrapped in a private `refreshSessionBestEffort` helper that swallows thrown rejections so a failed refresh never surfaces as a sign-in failure, never logs the user out, and never logs the bearer token.
- `subscribeToAuthChanges` now opportunistically re-derives the listener payload via `getCurrentAuthState(client)` on `SIGNED_IN` / `TOKEN_REFRESHED` / `USER_UPDATED` events (the magic-link redirect arrives on `SIGNED_IN`, so it is covered by the same path). The re-derive is debounced via a single in-flight `pendingRefresh` promise — we never issue more than one concurrent `getUser()` per event.
- `sendMagicLink` is intentionally unchanged; the magic-link redirect lands on `SIGNED_IN` and is covered by the listener path.
- `App.tsx` did not need a new `useEffect`; verified by trace.

### 19.5.4 Tests added (no removals)
- `src/account/auth.test.ts` (+15 new tests): role-source coverage (`app_metadata.roles[]`, `app_metadata.role`, `raw_app_meta_data.roles[]`, `raw_app_meta_data.role`, combinations, no-role, missing-`app_metadata`); `signInWithPassword` / `signUpWithPassword` invoke `refreshSession` on success and skip it on failure; refresh failure is swallowed and still returns `{ ok: true }`; `subscribeToAuthChanges` re-derives state via `getUser` on `SIGNED_IN` and does not re-derive on unrelated events.
- `src/admin/authorization.test.ts` (+1 new test): confirms the allowed branch is reached for any role list containing `"admin"` (covers all four diagnosed shapes after `summarizeUser` mapping).
- `src/admin/manualRefresh.test.ts` (new, 7 tests): missing-client, missing-session, 202 success (verifying the `Authorization: Bearer <token>` header is forwarded and the token never appears in the returned payload), 401 → `unauthorized`, 403 → `forbidden`, 502 → `server-error` with `stage` / `message` surfaced, fetch rejection → `network-error`.
- `src/admin/ManualRefreshControls.test.tsx` (new, 5 tests): structural render verifies the "Refresh now" button, the `aria-live="polite"` status region, the `role="status"` attribute, the not-configured hint when `supabase` is undefined (and disabled button), the composition test asserting that both the existing descriptive paragraphs **and** the new controls render together in `AdminPanel`'s allowed branch (proving no deletion), and the locked-`ErrorState` branches for non-admin / anonymous users still hide the refresh button.

Component-render tests use React's built-in `renderToStaticMarkup` from `react-dom/server`, which does not require a DOM environment, so no new test dependency (`jsdom`, `happy-dom`, `@testing-library/*`) was added.

## Files Changed

### New
- `src/admin/manualRefresh.ts`
- `src/admin/manualRefresh.test.ts`
- `src/admin/ManualRefreshControls.tsx`
- `src/admin/ManualRefreshControls.test.tsx`
- `progress/PROGRESS-STEP-20.md`
- `progress/PROGRESS-STEP-21.md` (this report)

### Modified
- `src/account/auth.ts` (`getRoles` hardened, `isAdminUser` added, `signInWithPassword` / `signUpWithPassword` refresh on success, `subscribeToAuthChanges` role re-derive)
- `src/account/auth.test.ts` (+15 new tests, no removals)
- `src/admin/AdminPanel.tsx` (renders `ManualRefreshControls` inside the existing allowed `<Panel>`; new optional `supabaseClient` prop; existing paragraphs preserved verbatim)
- `src/admin/authorization.test.ts` (+1 new test, no removals)
- `src/admin/index.ts` (re-exports the new module and component)
- `src/app/App.tsx` (threads `supabaseClient` through `RoutePanel` to `AdminPanel`; no other behavior changed)
- `CHANGELOG.md` (`[Unreleased] — Fixed`, `[Unreleased] — Added`, `[Unreleased] — User action required` entries)
- `progress/PROGRESS.csv` (appended `phase_id = 20` and `phase_id = 21` rows)

### Not modified (intentional, per "no deletions / no scope creep")
- `api/admin-refresh.ts` server route and authorization logic (unchanged).
- `src/account/supabaseClient.ts` (already configured with `persistSession: true` / `autoRefreshToken: true`).
- `src/account/AuthPanel.tsx` body — `subscribeToAuthChanges` is wired through `App.tsx` only, no UI change.
- `src/data/`, `src/game/`, `src/wordExplorer/`, `src/feedback/`, `src/sound/`, `public/`, `docs/`, GitHub Actions, Vercel config, Supabase schema.

## Verification (run at HEAD after all edits)
- `npm ci` — succeeded.
- `npm run lint` — clean.
- `npm run test` — **194 / 194 passed (27 new)**, 0 removed, 0 skipped, 0 weakened.
- `npm run build` (`tsc -b` + `vite build`) — clean. Pre-existing >500 kB chunk-size warning unchanged.
- `npx tsc -p tsconfig.api.json --noEmit` — clean.
- Client-bundle leak check: `grep "@vercel/blob" dist/assets/*.js` returned **no matches** (Phase 13 invariant intact).
- `git diff --check` — clean.
- `codeql_checker` — to be reported in the final CHANGELOG entry; the cumulative diff is treated as non-trivial (new client-side network call + auth-related branching).

## Manual Diagnostic Console Commands (for user to run in deployed app)
Reproduced verbatim from §19.6 of the addendum:

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

## Manual Smoke Checks (to be executed by user in the deployed app)
- Sign in via magic link as a Supabase user with `raw_app_meta_data.role = "admin"`. The Admin tab becomes visible in the primary navigation without a manual page reload within one auth event, and shows both the existing descriptive paragraphs and the new "Refresh now" button.
- Repeat with email + password sign-in.
- Repeat with a brand-new sign-up promoted to admin after sign-up; on the next `TOKEN_REFRESHED` (or after clicking "Refresh now" once, or after a sign-out / sign-in) the Admin tab appears.
- Sign in as a non-admin user. The Admin tab remains hidden.
- Click "Refresh now" as an admin. The status region transitions idle → in-flight → success (or → failure with diagnostic stage/message). The DevTools network panel shows a POST to `/api/admin-refresh` with `Authorization: Bearer …`. No service-role key is sent.
- Reload the page after sign-in. The session persists, the Admin tab remains visible, and the refresh button remains operational.

## Blockers, Errors, or Critical Notes
- None blocking. Two follow-up user actions are required to fully exercise the new admin path in production (see below).

## User Action Required Before Next Step
- **Supabase (required)**: confirm at least one user has `raw_app_meta_data.role = "admin"` set via the Supabase dashboard or admin API. Without this, no §19.6 smoke check can verify the admin path end-to-end.
- **Supabase (required for email + password verification)**: confirm the Email + Password provider remains enabled (carried over from the Phase 13.5 follow-up).
- **Vercel**: **no action required**. `SUPABASE_URL` and `SUPABASE_ANON_KEY` (or their `VITE_`-prefixed counterparts) must continue to be set on the Vercel project so `/api/admin-refresh` can validate the bearer token.
- **GitHub Actions / Pages / labels**: **no action required**.
- **Browser session hygiene** (recommended once after deploy): the first time an existing admin user opens the new build, sign out and sign back in once so the locally cached JWT is replaced and the `raw_app_meta_data` claim minted before the deploy is immediately re-read.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes for code review and PR merge. All addendum work for Phase 14 is complete on the agent side.
- **Next major step**: User code review, PR merge, production release verification with the manual smoke checks above.
- **Exact approval needed, if any**: User confirmation of the Supabase admin role and the browser session hygiene step above.

## Additional Notes / Annotations
- Daily 5-letter lock is intact (`src/game/constants.ts`, `src/app/routes.ts`, daily session code unchanged).
- Practice 2..35 contract is intact (`BUNDLED_WORD_LIST_LENGTHS`, `SUPPORTED_PRACTICE_WORD_LENGTHS` unchanged).
- No `@vercel/blob` import is present in the client bundle.
- No secrets, deploy URLs, or private deployment data are present in any artifact.
- Bearer tokens are never logged, never persisted to `localStorage`, and never included in any returned `AdminRefreshResult` payload.
