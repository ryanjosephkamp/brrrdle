# Progress Step 128 - Phase 23 Stage 16 Focused Fixes

**Date**: 2026-06-08
**Phase**: 23 - Multiplayer Foundations and Polish
**Stage**: 16 - Practice Multiplayer GO Bug Fixes
**Progress CSV row**: `phase_id = 128`
**Status**: Completed - Final Verification Pending

## Authorization

The user explicitly authorized Stage 16 execution from `PHASE-23-STAGE-16-PRACTICE-MULTIPLAYER-GO-BUGFIXES-SPEC-2026-06-08.md`.

This checkpoint remains inside the Stage 16 Practice Multiplayer GO-only scope. No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, scoring/rating work, broad refactor, redesign, Daily Multiplayer GO change, Multiplayer OG change, solo-mode change, or Stage 15 Practice seed change is authorized or performed here.

## Reproduction Evidence

Focused `MultiplayerGameSurface` regressions reproduced both Stage 16 bugs before source fixes:

1. **Missing previous solutions in the GO stack**
   - Flow: solve Practice Multiplayer GO puzzles 1 and 2, then project a shared non-terminal move on puzzle 3 for the rival.
   - Expected: row 1 = puzzle 1 solution, row 2 = puzzle 2 solution, row 3 = shared puzzle 3 move.
   - Actual before fix: the focused test failed; the projection did not keep the expected later-puzzle stack state.

2. **Keyboard state not reflecting prior solutions**
   - Flow: use the same later-puzzle projection and choose a prior-only gray/orange evidence letter from puzzles 1/2.
   - Expected: the key uses the existing non-unknown keyboard color state.
   - Actual before fix: the focused test failed because the key retained the unknown `border-slate-600 bg-slate-800` class.

## Fix Summary

Updated `src/multiplayer/MultiplayerGameSurface.tsx` with a minimal Practice Multiplayer GO display/projection fix:

- Preserve the Practice GO prior-row prefix before overlaying shared durable moves for the active puzzle.
- Derive keyboard colors from the merged display guesses rather than only the shared current-puzzle move list.
- Avoid re-entering a stale Practice GO solved-row hold after a newer move has arrived.

The fix is display/projection-only. It does not mutate another player's canonical `playerSessions`, and shared durable moves remain display evidence.

## Focused Verification

- Before the fix: `npx vitest run src/multiplayer/MultiplayerGameSurface.test.tsx` failed on the two new Stage 16 regressions.
- After the fix: `npx vitest run src/multiplayer/MultiplayerGameSurface.test.tsx` passed.
  - Test files: 1 passed
  - Tests: 6 passed

## Scope Confirmation

The focused code change is limited to `src/multiplayer/MultiplayerGameSurface.tsx` and the focused component regression tests.

Daily Multiplayer GO, Multiplayer OG, solo modes, the Stage 15 authenticated Practice seed system, Daily OG/GO deterministic selection, scoring/rating/ELO logic, spectator features, and full Multiplayer tab work were not intentionally modified.

## Pending Verification

Stage 16 is not complete yet. Pending work:

- Real two-client Supabase-backed Practice Multiplayer GO browser E2E.
- Remote Supabase probes and cleanup where relevant.
- Stage 12-15 non-regression checks, including Stage 15 Practice seed non-regression.
- Full automated gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Desktop, tablet-like, and 390px browser smoke.
- Final resource/process snapshot.
- Vercel preview/share verification.

## Next Step

Run the required browser/Supabase and full verification gates, then record final Stage 16 handoff if all checks pass.
