# PROGRESS-STEP-103.md

**Phase**: 23 — Multiplayer Foundations and Polish  
**Stage**: 10 — Multiplayer Debugging and Bug Fixes  
**phase_id**: 103  
**Status**: Completed — Awaiting User Review Before PR or Later Work  
**Date**: 2026-06-06  
**Source of Truth**: `PHASE-23-STAGE-10-MULTIPLAYER-DEBUGGING-AND-BUGFIXES-SPEC-2026-06-06.md`

## Summary

Stage 10 is complete for user review. The critical cross-client board/keyboard synchronization bug was reproduced first with real two-client Supabase-backed browser testing, fixed, and verified. Two nearby timed Practice bugs discovered during verification were also fixed.

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, notification system, bot/social feature, redesign, scoring/rating overhaul, or later-phase work was performed.

## Fixes Completed

### Cross-Client Board/Keyboard Sync

`MultiplayerGameSurface` now renders shared submitted moves from `game.moves` onto the visible board and keyboard for both players.

Canonical state remains safe:

- `playerSessions` are still player-owned and authoritative for validation/mutation.
- `getMultiplayerSessionForPlayer` remains the viewer-session access point.
- The shared `serializedSession` remains compatibility/answer plumbing only.

### Timed Practice Clock Checkpointing

Timed Practice clock ticks now checkpoint `turnStartedAt` when persisting a non-terminal `timeRemainingMs` decrement.

This prevents repeated app interval saves and UI clock reads from double-counting the same elapsed time.

### Timed Practice Draft Stability

Clock-only `updatedAt` churn no longer resets a local typed guess in `MultiplayerGameSurface`.

The local draft reset key now responds to gameplay changes such as move history, turn/status, player id, and serialized current guess, not ordinary clock-only saves.

## Verification

Automated verification passed:

- `npm run lint`
- `npm run test` — 69 files / 459 tests passed.
- `npm run build` — passed with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`

Focused tests passed:

- `npm test -- --run src/multiplayer/MultiplayerGameSurface.test.tsx`
- `npm test -- --run src/multiplayer/multiplayer.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx`
- `npm test -- --run src/multiplayer/multiplayerRepository.test.ts src/multiplayer/scoring.test.ts src/multiplayer/MultiplayerPanel.test.tsx`

Real two-client Supabase-backed browser E2E passed:

- Untimed Practice Multiplayer with two consecutive turns and browser refresh restoration.
- Timed Practice Multiplayer with a 30-second chess clock, submitted move persistence, rival row sync, and active-clock handoff.
- Practice Multiplayer with Hard Mode enabled, visible Hard Mode state, and rival row sync.

Responsive smoke passed:

- Desktop, tablet-like, and 390px mobile viewports.
- Landing, Calendar, Practice, and Settings route checks.
- Zero console/page errors.
- No horizontal overflow.
- Calendar/Daily smoke confirmed no Practice-only `Time per side` or `Hard Mode` controls appeared on the Daily Multiplayer surface.

## Preview

- Direct protected Vercel preview: `https://brrrdle-qkrszkoqp-ryanjosephkamps-projects.vercel.app`
- Share URL: `https://brrrdle-qkrszkoqp-ryanjosephkamps-projects.vercel.app/?_vercel_share=wJfg309HjQthxKiqe0vtRR0uUIeNIVPp`

The direct URL returned HTTP 401 because the preview is protected. The share URL was verified with the Vercel bypass-cookie flow and returned HTTP 200 after the bypass cookie was set.

## Cleanup

Temporary Supabase users and multiplayer rows created during the Stage 10 browser probes were cleaned up by the verification scripts.

## Updated Surfaces

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-102.md`
- `progress/PROGRESS-STEP-103.md`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/MultiplayerGameSurface.test.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayer.test.ts`

## Scope Guard

Stage 10 did not create a PR, merge, release, implement a dedicated Multiplayer tab, expand spectator functionality, add notifications/bots/social features, redesign the app, change scoring/rating rules, or begin later-phase work.
