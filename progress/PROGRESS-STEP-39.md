# Progress Step Report — Phase 18.3

## Step
- **Major step / phase**: Phase 18.3 — Settings reorganization, global difficulty selector & accessible tooltips
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §23.5, §23.10 (`phase_id = 39`)
- **Report file**: `progress/PROGRESS-STEP-39.md`
- **Date updated**: 2026-05-30
- **Status**: Completed — continuing to Phase 18.4

## Summary of Changes
- Added a persisted, additive `difficultyDefault: DifficultyTier` (default Expert) to `GuestSettingsState`.
- Introduced a **data-preserving** guest-progress migration (`schemaVersion 1 → 2`): `migrateGuestProgress` upgrades any structurally-valid v1 payload in place, keeping all coins/XP/level/history/stats/settings and filling the new field via `normalizeGuestSettings`. Corrupt/unrecognizable payloads still fall back to a fresh default.
- Reserved a forward-compatible `resumeSlot?: unknown` field on `GuestProgressState` so a future "resume unfinished game" feature (Phase 18.8 groundwork) needs no further migration.
- Added an accessible `Tooltip` UI primitive (focusable button trigger, `aria-describedby`, hover **and** focus reveal, Escape/blur/mouse-leave dismiss, `role="tooltip"`), exported from `src/ui/index.ts`.
- Reorganized `Settings` with a new **Gameplay** panel co-locating the global default-difficulty `<select>` and a "Start games in Hard Mode by default" toggle, each with a tooltip clarifying that difficulty changes answers only (never valid guesses).
- Added an `onUpdateSettings` handler in `App` (persists a settings patch immediately) threaded through `RoutePanel` to `Settings`.

## Files Changed
- `src/account/storageSchema.ts` — `difficultyDefault` field; `GUEST_PROGRESS_SCHEMA_VERSION 1 → 2`; `createDefaultGuestSettings`/`normalizeGuestSettings` helpers; reserved `resumeSlot`.
- `src/account/guestStorage.ts` — `migrateGuestProgress`; `isGuestProgressState` accepts v1/v2 structurally; `loadGuestProgress` migrates on load.
- `src/account/guestStorage.test.ts` — schema-version assertions updated `1 → 2`; new v1→v2 migration test (no data loss + difficultyDefault filled).
- `src/ui/Tooltip.tsx` — new accessible tooltip primitive.
- `src/ui/index.ts` — export `Tooltip`.
- `src/account/Settings.tsx` — new Gameplay panel (difficulty select + Hard Mode default + tooltips); `onUpdateSettings` prop.
- `src/app/App.tsx` — `handleUpdateSettings`; threaded through `RoutePanel`/`Settings`.

## Verification
- **Checks run**: `npm run lint` (clean); `npm run test` (280/280, 1 new, 0 removed/skipped/weakened); `npm run build` (clean); `npx tsc -p tsconfig.api.json --noEmit` (clean); `git diff --check` (clean); client-bundle leak grep against `dist/` — no `@vercel/blob`, no `service_role`, Hugging Face URL occurrences unchanged from the Phase 17 baseline (1 in main chunk, pre-existing).
- **Checks not run**: CodeQL (deferred to the 18.9 release gate per the plan).
- **Reason any checks were skipped**: none material.

## Blockers, Errors, or Critical Notes
- The schema bump is paired with a migration; two existing assertions in `guestStorage.test.ts` that hard-coded `schemaVersion === 1` were updated to `2` (intentional version change, not a weakened test), and a new migration test guards against data loss.

## User Action Required Before Next Step
- None (contiguous execution authorized).

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 18.4 — Customize quick menu + per-game override (lock-on-start) + Save-as-default.
- **Exact approval needed, if any**: None.

## Additional Notes / Annotations
- Invariants preserved: valid guesses untouched; default Expert reproduces current behavior; daily 5-letter lock and practice 2–35 unaffected (settings only store a preference). The persisted default will sync via `progress_snapshots` automatically (finalized in 18.8).
