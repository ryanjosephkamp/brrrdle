# Progress Step 143 — Phase 23 Stage 20 Focused Reproduction And Fixes

**Date**: 2026-06-10  
**Phase / Stage**: Phase 23 Stage 20 — Multiplayer Status Text Synchronization + Forfeit Win/Loss Precedence  
**Status**: Completed - Final Verification Pending  
**Authority**: User-authorized Stage 20 execution from `PHASE-23-STAGE-20-MULTIPLAYER-STATUS-TEXT-AND-FORFEIT-LOGIC-BUGFIXES-SPEC-2026-06-09.md`

## Summary

This checkpoint records the focused reproduction and targeted fixes for the two scoped Stage 20 bugs:

1. Multiplayer status/message text could remain stale for one player after shared lobby, join, turn, or terminal events.
2. Forfeit result projection could allow a post-guess forfeiting player to win on points in some projections, and pre-guess forfeits were still recorded as losses.

Final Stage 20 verification remains pending. This checkpoint does not authorize or perform PR creation, merge, release, production deployment, Phase 24 work, or any out-of-scope feature work.

## Reproduction Evidence

Focused tests were added before source fixes and failed against the original behavior:

- `MultiplayerPanel` regressions reproduced stale status text when a rival joined and when a turn was submitted by another player.
- Multiplayer domain/scoring regressions reproduced forfeit precedence failures where a forfeiting player could still project as the winner on points when durable forfeiter evidence was absent or insufficient.
- A pre-guess forfeit regression reproduced that a brand-new multiplayer lobby with no submitted guesses was treated as a loss instead of a cancellation/non-result.
- A timeout non-regression test was added to keep existing timeout-loser precedence intact.

## Fix Summary

- Added shared-state-derived multiplayer status messaging based on the current `MultiplayerGame` state and viewer player id.
- Cleared local success messages after shared state changes so stale client-local text no longer overrides the current shared lobby/turn/terminal state.
- Added durable `forfeitedPlayerId` evidence to multiplayer game state and normalization.
- Changed pre-guess forfeits to cancel without a winner.
- Changed result projection so post-guess forfeit evidence takes precedence over points fallback while preserving existing timeout precedence and scoring formulas.

## Scope And Invariants

The fixes stayed inside Stage 20 scope:

- Multiplayer status/message text synchronization.
- Forfeit-specific win/loss precedence.
- Minimal supporting state/projection/test changes.

The checkpoint did not intentionally change gameplay board rendering, letter tiles, keyboard behavior, tile coloring, Hard Mode validation, solved-row holds, GO/OG advancement rules, scoring formulas, rating/ELO logic, Daily Multiplayer rules, or any Phase 24/dedicated Multiplayer tab behavior.

Protected invariants remain:

- All Stage 12 through Stage 19 wins.
- Daily Multiplayer remains strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-lobby-control, answer-separated, and claim-safe.
- `playerSessions` remain canonical per-viewer state.
- Shared projections remain display/compatibility plumbing only.
- Timeout-loser precedence remains unchanged.

## Focused Verification

Passed after the fixes:

```bash
npm run test -- src/multiplayer/multiplayer.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/scoring.test.ts
npm run test -- src/multiplayer
```

Results:

- Changed-area tests: 45 passing.
- Wider `src/multiplayer` suite: 78 passing.

## Remaining Verification

Stage 20 final verification remains pending:

- Real two-client Supabase-backed browser E2E for affected Practice OG, Practice GO, Daily OG, and Daily GO flows where applicable.
- Remote Supabase probes and cleanup for temporary rows/users/claims.
- Timeout non-regression in an integrated flow where practical.
- Full automated gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Desktop, tablet-like, and 390px browser smoke with no new console errors or horizontal overflow.
- Final resource/process snapshot.
- Optional Vercel preview if useful for review after the local gate passes.

## Files Updated In This Checkpoint

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-143.md`

Source/test files were also already changed for the focused fixes and are awaiting final Stage 20 verification:

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayer.test.ts`
- `src/multiplayer/scoring.ts`
- `src/multiplayer/scoring.test.ts`

## Current Gate

Stage 20 remains in execution. Final verification and handoff are pending. No PR, merge, release, production deployment, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, redesign, Phase 24 work, or out-of-scope work has been performed.
