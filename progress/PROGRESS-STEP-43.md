# Progress Step Report — Phase 18.7

## Step
- **Major step / phase**: Phase 18.7 — Go per-puzzle definitions + Hide/Show toggle + practice-only Reveal Answer
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §23.7, §23.10 (`phase_id = 43`)
- **Report file**: `progress/PROGRESS-STEP-43.md`
- **Date updated**: 2026-05-30
- **Status**: Completed — continuing to Phase 18.8

## Summary of Changes
- **Per-puzzle definitions**: solved go puzzles (`status === 'won'`) now render their definitions stacked below the grid, each reusing the existing `DefinitionPanel`/definition lookup. The original end-of-chain `DefinitionPanel` is preserved.
- **Hide/Show toggle**: a "Hide Definitions" / "Show All" button controls the stacked definition list; it only appears once at least one puzzle is solved. Defaults to showing definitions.
- **Give Up / Reveal Answer (practice only)**: new `revealGoPuzzle` session helper marks the current puzzle `lost` (loss-equivalent for stats) and sets a transient `revealedAnswer` flag. The Reveal button renders **only when `scope === 'practice'`** and the chain is still playing; daily go is unaffected (no button, penalty-locked).
- **Economy & edge cases**: revealing spends a coin penalty computed with the existing `calculatePayToContinueCost` helper (no new monetization). Insufficient coins blocks the reveal with a message. `revealedAnswer` suppresses Pay-to-Continue on a revealed puzzle (so `canAffordContinuation`/`canPayToContinue` become false) and the loss records immediately via the existing completion effect. Revealing on the last puzzle ends the chain as a loss like any other puzzle.

## Files Changed
- `src/game/go/session.ts` — `revealedAnswer?` on `GoSessionState`; new `revealGoPuzzle(state)` loss-equivalent helper.
- `src/app/games/GoGame.tsx` — import `revealGoPuzzle`; `showDefinitions` state; `canPayToContinue`/`canReveal`/`revealCost`/`solvedPuzzles` derivations; `handleReveal`; Pay-to-Continue gated on `canPayToContinue`; Reveal panel (practice only); stacked solved-puzzle definitions with Hide/Show toggle.
- `src/game/go/session.test.ts` — 3 new tests for `revealGoPuzzle`.

## Verification
- **Checks run**: `npm run lint` (clean); `npm run test` (289/289, 3 new, 0 removed/skipped/weakened); `npm run build` (clean); `npx tsc -p tsconfig.api.json --noEmit` (clean); `git diff --check` (clean); client-bundle leak grep against `dist/` — no `@vercel/blob`, no `service_role`, Hugging Face occurrences unchanged (1, pre-existing).
- **Checks not run**: CodeQL (deferred to the 18.9 release gate).
- **Reason any checks were skipped**: none material.

## Blockers, Errors, or Critical Notes
- `revealedAnswer` is intentionally transient (not serialized). Daily go never offers Reveal, so it is always `undefined` for the serialized/restored daily session; practice go is not persisted.

## User Action Required Before Next Step
- None (contiguous execution authorized).

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 18.8 — Supabase preference sync + resume-ready shapes.
- **Exact approval needed, if any**: None.

## Additional Notes / Annotations
- Invariants preserved: daily go remains penalty-locked (no Reveal); reveal reuses the existing economy helper with no new monetization mechanic; valid guesses untouched.
