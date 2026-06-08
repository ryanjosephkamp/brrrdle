# Progress Step 129 - Phase 23 Stage 16 Real E2E Checkpoint

**Date**: 2026-06-08
**Phase**: 23 - Multiplayer Foundations and Polish
**Stage**: 16 - Practice Multiplayer GO Bug Fixes
**Progress CSV row**: `phase_id = 129`
**Status**: Completed - Full Gate Pending

## Authorization

The user explicitly authorized Stage 16 execution from `PHASE-23-STAGE-16-PRACTICE-MULTIPLAYER-GO-BUGFIXES-SPEC-2026-06-08.md`.

This checkpoint remains inside the Stage 16 Practice Multiplayer GO-only scope. No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, scoring/rating work, broad refactor, redesign, Daily Multiplayer GO change, Multiplayer OG change, solo-mode change, or Stage 15 Practice seed change is authorized or performed here.

## Scope Tightening

A read-only sub-agent review flagged that the first focused fix derived keyboard colors from merged display guesses for every multiplayer mode. The Stage 16 behavior target is Practice Multiplayer GO only, so the implementation was tightened:

- Practice GO still derives keyboard colors from merged display evidence so prior GO solution rows color the current puzzle keyboard.
- Non-Practice-GO multiplayer modes retain their previous keyboard source path.

Focused verification after the tightening:

- `npx vitest run src/multiplayer/MultiplayerGameSurface.test.tsx src/multiplayer/multiplayer.test.ts src/game/go/session.test.ts src/account/practiceSeeds.test.ts`
  - Test files: 4 passed
  - Tests: 44 passed

## Real Two-Client E2E Evidence

Real two-client Supabase-backed browser E2E was run against the local Vite app and the configured Supabase project with two isolated authenticated browser contexts.

The stronger distinct-wrong-guess run verified:

- Temporary host/rival users signed in through the app UI.
- Host created a Practice Multiplayer GO lobby through the UI.
- Rival joined the lobby through the UI.
- The first two GO puzzles were solved through the multiplayer on-screen keyboard.
- Puzzle 3 received a valid distinct wrong guess.
- Both clients showed the accumulated prior/current row sequence:
  - `erhus`
  - `ernes`
  - `escar`
- Both clients colored prior-only keyboard evidence:
  - letter `H`
  - board evidence state `absent`
- The five-puzzle GO chain finished without manual duplicate answer entry from the rival.
- Remote probe confirmed:
  - `scope = practice`
  - `mode = go`
  - `status = won`
  - `moves = 6`
  - both `player-one` and `player-two` sessions present

The earlier E2E run also passed and verified the same behavior with puzzle answers `blase`, `blate`, and a puzzle-3 projected move. The second run is the primary final evidence because its wrong guess was distinct from the first two prior rows.

## Remote Cleanup Evidence

Cleanup completed:

- Deleted `async_multiplayer_games` row `multiplayer-practice-go-817b8b79-1dbf-410e-9c54-f62b02f0c0fa`.
- Deleted `async_multiplayer_games` row `multiplayer-practice-go-14636837-c422-4ed7-af99-9c4088218e25`.
- Deleted both temporary auth users from each E2E run.
- Follow-up remote probe confirmed both Stage 16 E2E game ids had no remaining rows.

No secrets, passwords, protected share tokens, or service-role credentials were printed or committed.

## Scope Confirmation

The Stage 16 implementation remains display/projection-only and Practice Multiplayer GO-scoped.

Daily Multiplayer GO, Multiplayer OG, solo modes, the Stage 15 authenticated Practice seed system, Daily OG/GO deterministic selection, scoring/rating/ELO logic, spectator features, and full Multiplayer tab work were not intentionally modified.

## Pending Verification

Stage 16 is not complete yet. Pending work:

- Full automated gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Desktop, tablet-like, and 390px browser smoke.
- Stage 12-15 non-regression checks sufficient for this scoped change.
- Final resource/process snapshot.
- Vercel preview/share verification.
- Final Stage 16 progress report and handoff.

## Next Step

Run the remaining full verification gates and, if all checks pass, record the final Stage 16 handoff.
