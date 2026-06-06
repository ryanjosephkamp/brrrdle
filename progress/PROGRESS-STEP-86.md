# Progress Step 86 - Phase 23 Stage 6 Planning

**Phase / step**: Phase 23 Stage 6 - Live Multiplayer stability and Daily claim release fixes planning
**Date**: 2026-06-05
**Status**: Completed - awaiting user review before Stage 6 implementation
**Authority**: User explicitly authorized a planning/governance-only pass for `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md`
**Gates preserved**: No source code, UI components, tests, Supabase migrations, build/config changes, PR, merge, release, spectator work, dedicated Multiplayer tab, deferred feature work, or new feature work.

## Scope Documented

Stage 6 is planned as a critical bug-only stability pass. The six required bugs are:

1. Daily Multiplayer claim release after creator cancellation before any rival joins.
2. Reliable Live board and turn-history realtime updates for both players.
3. Practice Live flashing/glitching after word-length selection resolves.
4. Creator-side word-length selection visibility without manual refresh after a rival joins.
5. Browser refresh preserving the current multiplayer tab/game instead of returning to the dashboard.
6. General Live Multiplayer instability cleanup where it shares causes with the specific bugs above.

## Planning Updates Made

- Bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.16.
- Added §28.19, documenting Stage 6 scope, explicit out-of-scope items, recommended implementation approach, work slices, risks, verification strategy, and gate language.
- Updated `CHANGELOG.md` under Unreleased with the Stage 6 planning entry.
- Updated `agents.md` with Stage 6 coordination notes, ownership lanes, and high-conflict surfaces.
- Updated `memory.md` with durable Stage 6 planning decisions and the narrow Daily claim-release exception.
- Appended `phase_id = 86` to `progress/PROGRESS.csv`.
- Created this progress report.

## Key Planning Decisions

- Stage 6 must remain bug-only. Spectator work, dedicated Multiplayer tab work, notifications, floating manager, History/Theme tabs, bots, exports/GIFs, redesign work, and broad refactors remain out of scope.
- The Daily claim-release behavior changes only for creator cancellation before a rival joins. Joined, terminal, forfeited, expired, or spectator-involved games should not become claim-reset loopholes.
- Live realtime synchronization is the highest-risk lane and should be compared against the more reliable async repository/subscription pattern.
- `src/app/App.tsx`, `src/multiplayer/liveRepository.ts`, `src/multiplayer/liveMultiplayer.ts`, and `src/multiplayer/LiveMultiplayerPanel.tsx` should be single-writer or explicitly sequenced during implementation.
- Remote Supabase two-client verification is required when implementation is later authorized.

## Verification

Documentation-only checks:

- `git diff --check` clean.
- `progress/PROGRESS.csv` parse check clean.
- Source-code modification audit confirms this step touched planning/tracking Markdown and CSV only.

Not run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- Browser smoke

These were intentionally not run because this step was documentation/governance only and no implementation was authorized.

## Gate

Halt for user review. Stage 6 implementation, source edits, tests, Supabase migrations, build/config changes, PR creation, merge, release, spectator testing/expansion, dedicated Multiplayer tab work, deferred features, and new feature work remain gated until explicit user approval.
