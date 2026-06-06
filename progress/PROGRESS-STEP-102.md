# PROGRESS-STEP-102.md

**Phase**: 23 — Multiplayer Foundations and Polish  
**Stage**: 10 — Multiplayer Debugging and Bug Fixes  
**phase_id**: 102  
**Status**: Completed — Stage 10 Final Verification Pending  
**Date**: 2026-06-06  
**Source of Truth**: `PHASE-23-STAGE-10-MULTIPLAYER-DEBUGGING-AND-BUGFIXES-SPEC-2026-06-06.md`

## Summary

Stage 10 execution began after the user explicitly authorized implementation. This checkpoint records the reproduce-first debugging pass, the core multiplayer synchronization fix, two related timed Practice fixes, focused tests, real two-client Supabase verification, and governance updates.

This is not the final Stage 10 handoff yet. Full lint/test/build/typecheck/diff-check, responsive smoke, final Daily non-regression checks, preview deployment, and final reporting remain pending.

## Reproduction Before Source Changes

The reported bug was reproduced before source edits using two isolated authenticated browser contexts and the configured Supabase project.

Observed failure:

- Player one created a Practice Multiplayer lobby.
- Player two discovered and joined it without a manual refresh.
- Player one submitted `aahed` through the on-screen keyboard.
- Supabase stored one durable shared move.
- Player one's board and keyboard rendered the submitted row and colored keys.
- Player two's board still showed blank row-one tiles, and player two's keyboard stayed in the unknown state.

This confirmed that persistence and turn history were working, while the rival play surface projection was not.

## Implemented Fixes

### Shared Visible Board/Keyboard Projection

`src/multiplayer/MultiplayerGameSurface.tsx` now derives a display-only puzzle projection from durable `game.moves` for the active puzzle index.

Important invariant:

- `playerSessions` remain canonical and player-owned.
- `getMultiplayerSessionForPlayer` still provides the viewer's validation/mutation session.
- Shared moves are used to render what both players should see.
- The shared `serializedSession` remains compatibility/answer plumbing only.

### Timed Practice Clock Checkpointing

`src/multiplayer/multiplayer.ts` now updates `turnStartedAt` whenever a non-terminal timed Practice clock decrement is persisted.

This prevents the app interval and UI clock projection from repeatedly subtracting the same elapsed time from an already-decremented `timeRemainingMs` value.

### Timed Practice Draft Stability

`MultiplayerGameSurface` no longer uses clock-only `game.updatedAt` changes as a reason to reset the local draft session.

This prevents a typed timed Practice Multiplayer guess from being wiped while the chess clock saves every second.

## Tests Added or Updated

Updated focused regression coverage:

- `src/multiplayer/MultiplayerGameSurface.test.tsx`
  - The former old-behavior expectation was replaced with a regression that requires submitted shared moves to appear on the rival board and keyboard.
- `src/multiplayer/multiplayer.test.ts`
  - Added a regression proving repeated timed Practice ticks checkpoint elapsed time and do not double-count the same turn duration.

## Verification Completed

Focused automated verification:

- `npm test -- --run src/multiplayer/MultiplayerGameSurface.test.tsx`
- `npm test -- --run src/multiplayer/multiplayer.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx`
- `npm test -- --run src/multiplayer/multiplayerRepository.test.ts src/multiplayer/scoring.test.ts src/multiplayer/MultiplayerPanel.test.tsx`

Real two-client Supabase-backed browser E2E passed for:

- Untimed Practice Multiplayer with two consecutive turns and browser refresh restoration.
- Timed Practice Multiplayer with a 30-second chess clock, submitted move persistence, rival row sync, and active-clock handoff.
- Practice Multiplayer with Hard Mode enabled, visible Hard Mode state, and rival row sync.

All temporary Supabase users and multiplayer rows created by the Stage 10 probes were cleaned up.

## Documents Updated

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-102.md`

## Remaining Work

Before the final Stage 10 handoff, run and pass:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Desktop/tablet/390px responsive smoke with no console errors and no horizontal overflow.
- Final Daily Multiplayer non-regression checks.
- Vercel preview deployment if included in the final handoff.

## Scope Guard

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, notification system, bot/social feature, redesign, scoring/rating overhaul, or later-phase work was performed.
