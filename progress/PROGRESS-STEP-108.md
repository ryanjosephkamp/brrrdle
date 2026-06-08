# Progress Step 108 — Phase 23 Final Stabilization Timed Practice Clock-Churn Fix

**Date**: 2026-06-07  
**Phase**: 23 — Multiplayer Foundations and Polish  
**Stage**: Final Stabilization & Broad Debugging Pass  
**Status**: Completed — final stabilization verification continues  
**Progress CSV row**: `phase_id = 108`

## Authorization

The user explicitly authorized the Phase 23 Final Stabilization & Broad Debugging Pass. This checkpoint remains inside the approved bug-fix/stabilization scope.

Still gated:

- PR creation
- Merge
- Release
- Dedicated Multiplayer tab
- Spectator expansion
- Notifications, bots, social features, redesign, scoring/rating rule changes, and later-phase work

## Bug Discovered

Real two-client Supabase-backed browser testing exposed a timed Practice Multiplayer race/performance issue: the chess-clock expiry loop was persisting non-terminal countdown ticks every second.

That durable clock-only churn could:

- Trigger unnecessary Supabase Realtime refreshes.
- Compete with actual move submissions.
- Intermittently delay or hide the rival board projection in timed Practice games.
- Increase memory and browser pressure during two-client testing.

## Fix

Timed Practice Multiplayer now keeps non-terminal chess-clock ticks local/display-only.

Durable writes now happen only when:

- A player submits a turn, checkpointing that player's elapsed time and starting the opponent clock.
- A player actually times out, saving the terminal timeout/loss state.

The UI still displays live countdowns from `turnStartedAt` + `timeRemainingMs`.

## Files Changed In This Checkpoint

- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayer.test.ts`
- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-108.md`
- `memory.md`
- `agents.md`

## Verification Completed

Passed:

```bash
npm test -- --run src/multiplayer/multiplayer.test.ts src/multiplayer/multiplayerRepository.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx src/multiplayer/MultiplayerPanel.test.tsx --maxWorkers=2
```

Result: 4 files / 33 tests passed.

Real two-client Supabase-backed browser E2E passed with temporary authenticated users for:

- Untimed Practice Multiplayer: create, discover, join, submit `dream` and `tesla`, board/keyboard/history sync, durable row moves, per-player sessions.
- Timed Practice Multiplayer: create 30-second timed lobby, wait before submit, submit `dream`, both boards sync, Player A elapsed time checkpoints, Player B remains at full time at handoff, no non-terminal clock-only row churn before submit.
- Practice Multiplayer Hard Mode: creator-selected Hard Mode visible to rival before join, locked after join, `dream` syncs to both boards, durable row retains `hardMode: true`.
- Daily Multiplayer: no Practice time controls, no Hard Mode controls, five-letter Daily game, `timeLimitMs = null`, `hardMode = false`, claim rows for both users, board sync, refresh restores board.

All temporary users, multiplayer rows, and claim rows created by these probes were cleaned up.

No console/page errors were captured during the successful probes.

## Pending Verification

Still pending for the final handoff:

- Full `npm run test`
- `npm run build`
- Final `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Desktop/tablet/390px responsive smoke
- Final memory/resource snapshot
- Vercel preview deployment/share URL

## Scope Guard

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating rule changes, or later-phase work was performed.
