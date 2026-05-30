# Progress Step Report — Phase 19.5

## Step
- **Major step / phase**: Phase 19.5 — Light Theming Foundation
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §24.8, §24.10 (sub-phase 19.5)
- **Report file**: `progress/PROGRESS-STEP-52.md`
- **Date updated**: 2026-05-30
- **Status**: Completed — contiguous execution (Prompt 3 authorized); proceeding to Phase 19.6

## Summary of Changes
Added a four-theme, accent-only theming foundation. Themes swap a small set of CSS accent tokens via a `data-theme` attribute on `<html>`; they deliberately change neither layout nor the tile-state (correct/present/absent) colors, so contrast minima and gameplay legibility are preserved across every theme. The default `'icy'` reproduces today's look exactly. All logic lives in a pure, fully-tested module.

- **New `src/theme/theme.ts`** — `Theme = 'icy' | 'classic' | 'neon' | 'country-flag'`, `DEFAULT_THEME = 'icy'`, allow-list guards `isTheme`/`normalizeTheme` (untrusted-input safe), `getThemeMeta` (label/description), and `applyTheme` (writes/removes the `data-theme` attribute; no-op without a DOM). Re-exported from `src/theme/index.ts`.
- **New `src/theme/theme.test.ts`** — 9 tests (allow-list, default, normalize, metadata, attribute reflection incl. default-removes/invalid-coerces/no-root).
- **`src/index.css`** — `:root[data-theme='classic'|'neon'|'country-flag']` blocks override only `--color-ice-100/200/300`, `--color-focus-ring`, and `--color-aurora-glow`. No layout or tile-color rules touched.
- **`src/account/storageSchema.ts`** — additive `themeDefault: Theme` on `GuestSettingsState` (+ `createDefaultGuestSettings`, `normalizeGuestSettings` backfill to `'icy'`). **No schema bump**: `normalizeGuestSettings` runs on every load via `migrateGuestProgress`, so existing v3 payloads gain the field automatically.
- **`src/account/Settings.tsx`** — a "Theme" selector in the Gameplay panel (allow-list validated on change).
- **`src/app/App.tsx`** — an effect applies the active theme on load and whenever `themeDefault` changes via `applyTheme`.
- **`src/account/guestStorage.test.ts`** — added the `themeDefault === 'icy'` backfill assertion alongside the existing difficulty/go-count ones.

## Persistence & Sync
The theme persists to the guest profile (localStorage) like every other setting and **syncs to Supabase for free**: `guestTransfer.ts` merges settings through `normalizeGuestSettings`, the same path that already carries `difficultyDefault` and `goPuzzleCountDefault`. No separate `user_metadata` field was needed, keeping the change minimal while satisfying the "persist to guest + Supabase profile" requirement.

## Verification
- `npm run lint` — clean
- `npm run test` — 321/321 passing
- `npm run build` — clean
- `npx tsc -p tsconfig.api.json --noEmit` — clean
- Client-bundle leak check (`service_role` / `@vercel/blob` / `BLOB_READ_WRITE` in `dist/`) — none
- `git diff --check` — clean

## Invariants
All preserved: daily 5-letter lock; practice 2–35; valid guesses identical across difficulty tiers; default difficulty Expert; per-mode stats separation. Theming is accent-only and changes no gameplay logic.

## Next Step
Phase 19.6 — Final Integration & Release Gate.
