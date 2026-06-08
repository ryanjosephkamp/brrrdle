# Progress Step 112 - Phase 23 Stage 12 First Fix Batch

**Date**: 2026-06-07  
**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: 12 - Multiplayer Hard Mode Enforcement + Performance & Responsiveness Fixes  
**Progress CSV row**: `phase_id = 112`  
**Status**: Completed - Stage 12 Final Verification Pending

## Authorization

The user explicitly authorized full Stage 12 execution from `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md`.

This checkpoint remains inside the targeted Stage 12 bug-fix scope. It does not authorize PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, new gameplay features, scoring/rating/ELO changes, broad refactoring, redesign, or later-phase work.

## Reproduction Evidence

Real two-client Supabase-backed browser E2E reproduced the Practice Multiplayer Hard Mode enforcement bug before source changes:

- Two isolated authenticated browser contexts signed into distinct temporary accounts.
- A Practice Multiplayer OG lobby was created with Hard Mode enabled.
- A rival joined from the second authenticated context.
- Player one submitted a valid first guess that created shared Hard Mode constraints.
- Player two submitted a valid dictionary guess that violated the shared Hard Mode constraint.
- Before the fix, the violating player-two guess was accepted and persisted as the second move.
- The durable row showed player one had the first canonical guess, while player two's canonical session had been empty before their invalid turn, confirming the gap between per-player sessions and the shared board projection.

## Fixes Implemented

### Practice Multiplayer Hard Mode Enforcement

- Added shared-board Practice Hard Mode validation in `submitMultiplayerGuess`.
- The validation derives previous guesses from shared `game.moves` for the active puzzle index and runs canonical `validateHardModeGuess` before mutating the current player's canonical session.
- Daily Multiplayer remains outside this path.
- `playerSessions` remain canonical and player-owned; the fix does not copy one player's submitted guesses into the rival's canonical session.

### Keyboard Responsiveness and Sound

- Updated `MultiplayerGameSurface` to use functional draft updates for letter/delete input, reducing stale-closure lag on quick keyboard taps.
- Added multiplayer sound calls for keyboard clicks, invalid guesses, tile flips, correct guesses, and terminal win/loss transitions.
- Updated the sound engine to request `AudioContext.resume()` when a user-triggered sound finds the context suspended.
- Updated displayed attempts to use the shared displayed board so the rival view reflects submitted shared moves.

### Supabase Row-Write Reduction

- Updated the Supabase multiplayer repository to skip unchanged participant row projections on follow-up saves.
- This reduces unnecessary writes and realtime events when a user has multiple visible games but only one changed.

## Verification So Far

Focused automated verification passed:

```bash
npm run test -- src/multiplayer/multiplayer.test.ts src/multiplayer/multiplayerRepository.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx src/sound/soundEngine.test.ts
```

Result: 4 test files passed, 43 tests passed.

Post-fix real two-client Supabase-backed browser E2E confirmed:

- The same class of alternating-turn Hard Mode violation is rejected.
- The durable move count stays at one.
- `currentTurn` remains with the violating player.
- The violating player's canonical session remains empty.
- The UI shows a Hard Mode validation message.

## Remaining Stage 12 Work

Before final handoff, continue with:

- Real two-client E2E for untimed Practice, timed Practice, Practice Hard Mode refresh/reconnect, and Daily Multiplayer non-regression.
- Browser sound verification with Settings enabled and browser user-gesture policies respected.
- Remote Supabase probes and cleanup of temporary users, rows, and claims.
- Desktop, tablet-like, and 390px mobile smoke.
- Resource/memory/process snapshot after browser testing.
- Full automated gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Vercel preview deployment/share URL.

## Scope Guard

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new gameplay feature, scoring/rating/ELO change, broad architecture rewrite, redesign, or out-of-scope feature work was performed in this checkpoint.
