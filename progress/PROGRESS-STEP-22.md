# Progress Step Report — Phase 15

## Step
- **Major step / phase**: Phase 15 — Authentication & Profile UX Redesign
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` Section 20 (Phase 15 addendum) and `AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md`
- **Report file**: `progress/PROGRESS-STEP-22.md`
- **Date updated**: 2026-05-28
- **Status**: Completed — awaiting user verification of Supabase manual steps

## Summary of Changes

This step implements the AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27 in a single
PR. Every spec section is addressed; no file or test was removed; the daily
5-letter lock, practice 2..35 contract, Admin gating, Word Explorer,
Feedback, Sound Effects, sharing, definitions, stats, guest persistence,
Pay-to-Continue, sync stub, and danger-zone confirmations are unchanged.

### Architectural decisions (documented per Plan §20.1)
- Profile data (display name, accent color, avatar URL) is persisted in
  `auth.users.user_metadata` via `supabase.auth.updateUser({ data })`.
  This required no new tables, no new RLS policies, and is fully reversible.
- Image avatar uploads are gated on a runtime probe of an `avatars`
  Supabase Storage bucket. When the bucket is absent (the default), the
  upload affordance is hidden and the initials avatar is used everywhere.
- The duplicate-CTA bug in `AuthPanel.tsx` was fixed by promoting the
  sub-mode toggle to a `role="radiogroup"` with `aria-checked` radios,
  semantically distinct from the single primary submit button whose label
  follows the active sub-mode. `AuthPanel`'s external API is unchanged.
- All Supabase error strings are routed through a new `classifyAuthError`
  that maps known patterns to a closed set of safe, user-facing messages.
- One new function in `src/account/auth.ts` (`sendPasswordResetEmail`) is
  named to avoid colliding with the pre-existing (unused)
  `requestPasswordReset` in `src/account/dangerZone.ts`. The dangerZone
  helper is not removed (no deletions).

### Spec → implementation crosswalk
- §3.1 Global signed-in / Guest indicator → `src/account/AccountBadge.tsx`
  rendered inside `Layout`'s `navigation` slot in `src/app/App.tsx`.
- §3.2 Improved sign-in / sign-up → `src/account/AuthModal.tsx` (Dialog +
  two tabs + radiogroup + single primary CTA + inline validation +
  aria-live status).
- §3.3 Forgot Password → three-step inline flow inside `AuthModal`.
- §3.4 User profile & customization → `src/account/ProfilePanel.tsx` +
  helpers in `src/account/profile.ts`.
- §3.5 Agent creative freedom → documented above and in the plan addendum.
- §4 Technical requirements → no new env vars, no service-role on client,
  existing Supabase client unchanged, additive helpers in `auth.ts`.

## Files Changed

**New**
- `src/account/profile.ts` (pure helpers + tests in `profile.test.ts`)
- `src/account/AuthModal.tsx` (+ `AuthModal.test.tsx`)
- `src/account/AccountBadge.tsx` (+ `AccountBadge.test.tsx`)
- `src/account/ProfilePanel.tsx` (+ `ProfilePanel.test.tsx`)
- `src/account/authHelpers.test.ts`
- `progress/PROGRESS-STEP-22.md`

**Modified**
- `src/account/auth.ts` — additive helpers: `classifyAuthError`,
  `sendPasswordResetEmail`, `updateProfile`, `hasAvatarStorage`,
  `uploadAvatar`; `AuthUserSummary.profile`; `summarizeUser` enriched.
- `src/account/AuthPanel.tsx` — radiogroup + single primary CTA.
- `src/account/Settings.tsx` — adds open-modal buttons; existing
  AuthPanel/danger-zone surfaces preserved.
- `src/account/index.ts` — re-exports new components and helpers.
- `src/app/App.tsx` — modal/profile state, `AccountBadge` in header,
  modals rendered at layout root, profile re-derive after save.
- `src/account/auth.test.ts` — updated one assertion to add
  `profile` to the authenticated-state shape (no test weakening).
- `CHANGELOG.md` — Phase 15 Added/Fixed/Documentation entries.
- `AGENT-IMPLEMENTATION-PLAN.md` — Section 20 (Phase 15 addendum).
- `docs/supabase.md` — additive note on the optional `avatars` bucket.
- `progress/PROGRESS.csv` — appended `phase_id = 22` row.

## Verification

- **Checks run**:
  - `npm ci` — clean install
  - `npm run lint` — zero errors, zero warnings
  - `npm run test` — **256 tests passing** (was 194 at baseline; +62 new)
  - `npm run build` — `tsc -b && vite build` clean
  - `npx tsc -p tsconfig.api.json --noEmit` — clean
  - Client-bundle leak check: `grep -R "@vercel/blob" dist/assets/` returns
    no matches in shipped chunks.
  - `git diff --check` — clean (no whitespace issues)
- **Checks not run**:
  - Live Supabase smoke tests (sign-in, magic link, password reset, avatar
    upload, profile save) require a configured Supabase project the agent
    sandbox cannot reach; left as user-confirmable smoke checks below.
  - Mobile viewport visual smoke — no headless browser available in the
    agent sandbox; covered via static markup tests (`AuthModal`,
    `AccountBadge`, `ProfilePanel`) and verified Tailwind responsive
    classes.
- **Reason any checks were skipped**: Per CONSTITUTION §6.2 — external
  Supabase access and headless browser are unavailable in the sandbox.

## Blockers, Errors, or Critical Notes

- None.
- A pre-existing `requestPasswordReset` helper in `src/account/dangerZone.ts`
  is unused but preserved (no deletions). The new public helper for the
  AuthModal Forgot Password flow is therefore named
  `sendPasswordResetEmail` to avoid an `export *` collision in
  `src/account/index.ts`.

## User Action Required Before Next Step

- **Supabase (required)**: confirm the Email + Password provider is enabled
  in your Supabase project's Auth providers settings (carried over from
  Phase 13.5).
- **Supabase (required for Forgot Password)**: confirm the
  password-reset email template is configured.
- **Supabase (optional, for image avatars)**: create a public Storage
  bucket named `avatars` with an RLS policy that allows each authenticated
  user to read/write only paths under their own `auth.uid()/`. Without this
  bucket, brrrdle silently falls back to the initials avatar.
- **Supabase (carried over)**: ensure at least one user has
  `raw_app_meta_data.role = "admin"` so the Admin tab continues to render.
- **Vercel**: no env var changes required.

### Recommended manual smoke checks after deploy
- Sign in via magic link (existing flow) — still works.
- Sign in via Email + Password — opens the new `AuthModal`; verify the
  Email + Password tab shows a single primary "Sign in" button and a
  separate sub-mode toggle.
- Click "Forgot password?" — verify the inline form sends a reset email.
- Sign out — verify the `AccountBadge` reverts to the Guest pill.
- Verify the `AccountBadge` is present on every route (Home, og daily,
  go daily, Practice, Word Explorer, Feedback, Stats, Settings, Admin).
- Open the profile panel and save a display name + accent color — the
  badge updates immediately without a reload.

## Authorization to Proceed

- **Safe/authorized to proceed to next major step?**: Yes — pending user
  verification of the Supabase manual steps above.
- **Next major step**: User review and PR merge.
- **Exact approval needed, if any**: Explicit user approval ("APPROVE",
  "Merge", or similar) before any production deployment action, per
  CONSTITUTION §4.

## Additional Notes / Annotations

- No new ecosystem dependencies added (no React Testing Library, no
  jsdom). Component tests follow the existing `renderToStaticMarkup`
  pattern established in `src/admin/ManualRefreshControls.test.tsx`.
- The duplicate-CTA fix in `AuthPanel.tsx` uses ARIA roles
  (`role="radiogroup"`, `role="radio"`, `aria-checked`) so the visual
  distinction between sub-mode toggle and primary submit is also
  semantically conveyed to assistive tech.
- `AuthModal` and `ProfilePanel` use the React 19-recommended
  "compare-and-set-during-render" idiom to reset form state on open/close,
  satisfying the `react-hooks/set-state-in-effect` lint rule without
  weakening behavior.
- No `@vercel/blob` import is present in the client bundle. Verified via
  `grep -R "@vercel/blob" dist/assets/`.
