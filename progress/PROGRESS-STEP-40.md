# Progress Step Report — Phase 18.4

## Step
- **Major step / phase**: Phase 18.4 — Customize quick menu + per-game difficulty override (lock-on-start) + Save-as-default
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §23.6, §23.10 (`phase_id = 40`)
- **Report file**: `progress/PROGRESS-STEP-40.md`
- **Date updated**: 2026-05-30
- **Status**: Completed — continuing to Phase 18.5

## Summary of Changes
- Added a reusable `CustomizeMenu` component: a per-game difficulty `<select>` (initialized from the player's saved global default), an explanatory tooltip, and a "Save as default" button enabled only when the chosen tier differs from the saved default.
- `OgGame` and `GoGame` now own a per-game `difficulty` state seeded from `defaultDifficulty`, thread it through their setup `useMemo`, and include it in the session `key` so switching tiers cleanly restarts the puzzle. Works for both daily and practice scopes.
- **Lock-on-start**: the difficulty control is disabled once the current puzzle has a submitted guess (Og: `session.guesses.length > 0`; Go: any chain puzzle has guesses) with an inline note to start a new puzzle to change it.
- `App` passes `defaultDifficulty` (from `settings.difficultyDefault`) and `onSaveDifficultyDefault` (delegates to `onUpdateSettings`) into the daily Og/Go routes and the practice switcher, so saving a tier persists immediately.

## Files Changed
- `src/app/games/CustomizeMenu.tsx` — new per-game Customize quick menu.
- `src/app/games/OgGame.tsx` — `defaultDifficulty`/`onSaveDifficultyDefault` props; per-game difficulty state; setup + session-key threading; renders `CustomizeMenu`.
- `src/app/games/GoGame.tsx` — same wiring for the Go chain; lock uses per-puzzle guess counts.
- `src/app/App.tsx` — `DifficultyTier` import; `PracticeGameSwitcher` forwards difficulty props; daily Og/Go and practice routes pass `defaultDifficulty` + `onSaveDifficultyDefault`.

## Verification
- **Checks run**: `npm run lint` (clean); `npm run test` (280/280, 0 removed/skipped/weakened); `npm run build` (clean); `npx tsc -p tsconfig.api.json --noEmit` (clean); `git diff --check` (clean); client-bundle leak grep against `dist/` — no `@vercel/blob`, no `service_role`, Hugging Face occurrences unchanged from the Phase 17 baseline (1, pre-existing).
- **Checks not run**: CodeQL (deferred to the 18.9 release gate).
- **Reason any checks were skipped**: none material.

## Blockers, Errors, or Critical Notes
- For the daily puzzle, changing difficulty before the first guess regenerates the daily answer from the selected tier's pool; the stored daily session (keyed by `dateKey` + answer) simply starts fresh, and once a guess is submitted the tier is locked. This is intended behavior for the Customize menu.

## User Action Required Before Next Step
- None (contiguous execution authorized).

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 18.5 — Critical daily Og↔Go overlap fix (independent seed).
- **Exact approval needed, if any**: None.

## Additional Notes / Annotations
- Invariants preserved: valid guesses identical across tiers; default Expert reproduces today's behavior; daily 5-letter lock and practice 2–35 unaffected (difficulty narrows answer selection only).
