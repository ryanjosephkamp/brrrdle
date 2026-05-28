# Progress Step Report — Phase 16.2

## Step
- **Major step / phase**: Phase 16.2 — Responsive grid tiles
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §21.4.2 + §21.5 row 16.2
- **Report file**: `progress/PROGRESS-STEP-25.md`
- **Date updated**: 2026-05-28
- **Status**: Completed

## Summary of Changes
- `src/app/games/OgGame.tsx` and `src/app/games/GoGame.tsx`:
  - Outer grid wrapper now declares `@container` (Tailwind v4 inline-size container) and uses `space-y-1.5 sm:space-y-2` for tighter phone spacing.
  - Each row gets `mx-auto` plus an inline `maxWidth: calc(var(--brrrdle-tile-max) * wordLength + 0.375rem * (wordLength - 1))` cap, which prevents 5-letter daily rows from ballooning on iPad portrait/wider while letting 35-letter practice rows still fill the available width.
  - Row gap is now `gap-1 sm:gap-1.5` (8 px on phones, 12 px on `sm+`) to keep narrow phones legible.
  - Each tile drops the fixed `min-h-8 sm:min-h-10 text-sm sm:text-base` and instead becomes its own `@container` with inline `style={{ fontSize: 'clamp(0.625rem, 50cqi, 1.75rem)' }}` so the letter always renders at ~50 % of tile width (== height because of `aspect-square`), naturally scaling with the row/panel width.
  - All existing semantics preserved: `role="grid"/"row"/"gridcell"`, `aria-label`, animation classes for current/submitted/row-shake, and per-state Tailwind color classes are unchanged.

## Files Changed
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`

## Verification
- **Checks run**: `npm run lint` (clean), `npm run test` (256/256), `npm run build` (clean), `npx tsc -p tsconfig.api.json --noEmit` (clean), client-bundle leak check (no matches), `git diff --check` (clean).
- **Checks not run**: None.
- **Reason any checks were skipped**: N/A.

## Blockers, Errors, or Critical Notes
- None.

## User Action Required Before Next Step
- None.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 16.3 — Responsive on-screen keyboard.
- **Exact approval needed, if any**: None.

## Additional Notes / Annotations
- No test depended on the old class strings; the keyboard input test in `src/game/input/useKeyboardInput.test.ts` is decoupled from styling and is unaffected.
- Daily 5-letter lock and practice 2..35 invariants are untouched: `gridTemplateColumns` still uses `repeat(${session.wordLength}, minmax(0, 1fr))`.
