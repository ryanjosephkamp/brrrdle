# Progress Step Report — Step 20 (Phase 14.0: Admin Tab Fix Pre-flight & Reproduction Map)

## Step
- **Major step / phase**: Phase 14.0 — Admin Tab Fix Pre-flight & Reproduction Map
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §19.4 and `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md`
- **Report file**: `progress/PROGRESS-STEP-20.md`
- **Date updated**: 2026-05-28T00:46:00Z
- **Status**: Completed — baseline established; proceeded directly into Phase 14.1 per the user's explicit Section 19 approval.

## Summary of Changes
No source code, route table, server route, configuration file, or test was modified by this pre-flight step. Only progress artifacts and the changelog were touched as part of the Phase 14 entry point.

### Reproduction map verified at HEAD (`dce5801`)
- `src/admin/AdminPanel.tsx`'s `access.allowed === true` branch contained only descriptive paragraphs and no actionable refresh button. This matches §19.2's primary root cause.
- `src/account/auth.ts::getRoles` reads only `user.app_metadata.roles` (array) and `user.app_metadata.role` (string); it does not defensively read `user.raw_app_meta_data?.roles` / `user.raw_app_meta_data?.role`. This matches §19.2's "role-source coverage" secondary gap.
- `src/account/auth.ts::signInWithPassword` and `signUpWithPassword` never call `client.auth.refreshSession()` after success, and `subscribeToAuthChanges` only forwards the cached session user without re-deriving from `getUser()`. This matches §19.2's "stale session after login" secondary gap.
- `src/account/supabaseClient.ts::createBrrrdleSupabaseClient` already constructs the client with `persistSession: true` and `autoRefreshToken: true` — no blocker for §19.5.3.
- `api/admin-refresh.ts` already validates the bearer token, fetches the user from `/auth/v1/user`, and rejects non-admin requests with HTTP 403. No server change is required by this addendum.

### Baseline verification (run on `dce5801` before any edit)
- `npm ci` — succeeded (208 packages, 0 vulnerabilities).
- `npm run lint` — clean.
- `npm run test` — **167 / 167 passed**.
- `npm run build` (`tsc -b` + `vite build`) — clean; pre-existing >500 kB chunk-size warning remains.
- `npx tsc -p tsconfig.api.json --noEmit` — clean.
- Client-bundle leak check: `grep "@vercel/blob" dist/assets/*.js` returned **no matches** (Phase 13 invariant intact).
- `git diff --check` — clean.

### Planned change list (executed in §19.5 / Step 21)
1. Harden `getRoles` and introduce `isAdminUser` in `src/account/auth.ts`.
2. Add `src/admin/manualRefresh.ts` (client helper) and `src/admin/ManualRefreshControls.tsx` (UI component).
3. Render `ManualRefreshControls` inside the existing `AdminPanel` allowed branch alongside the existing descriptive paragraphs; thread `supabaseClient` through `App.tsx` → `RoutePanel` → `AdminPanel`.
4. Best-effort `refreshSession()` after successful `signInWithPassword` / `signUpWithPassword`; opportunistic `getCurrentAuthState(client)` re-derive on `SIGNED_IN` / `TOKEN_REFRESHED` / `USER_UPDATED` inside `subscribeToAuthChanges` (debounced to one in-flight refresh at a time).
5. Add unit tests for `isAdminUser` / `summarizeUser`, refresh-on-success / refresh-skipped-on-failure, post-event role re-derivation, `requestAdminRefresh` (missing-session / 401 / 403 / 502 / network / 202), structural admin-panel composition.

## User Action Required Before Next Step
- See `progress/PROGRESS-STEP-21.md` § "User Action Required Before Next Step".

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes — the user explicitly authorized autonomous execution of the entire Phase 14 (§19.1–§19.9) in the task prompt.
- **Next major step**: Phase 14.1 — `src/admin/` + `src/account/auth.ts` surgical fix (see `progress/PROGRESS-STEP-21.md`).
- **Exact approval needed, if any**: None for execution; user-side Supabase / browser-session hygiene steps documented in Step 21.
