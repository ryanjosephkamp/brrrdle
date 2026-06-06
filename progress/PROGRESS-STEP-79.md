# Progress Step 79 - Phase 23 Stage 4 Planning

**Phase / step**: Phase 23 Stage 4 planning - Daily Multiplayer fixes and spectator foundations
**Phase ID**: 79
**Date**: 2026-06-05
**Status**: Completed - awaiting user review before Stage 4 implementation, PR, merge, release, or dedicated Multiplayer tab work

## Scope

This step incorporates `PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md` into the Phase 23 implementation plan.

This is a governance and planning step only. No game code, UI components, Supabase migrations, tests, PR creation, merge, release, or dedicated Multiplayer tab implementation was performed.

## Documents Reviewed

- `CONSTITUTION.md`
- `AGENT-IMPLEMENTATION-PLAN.md`
- `agents.md`
- `memory.md`
- `progress/PROGRESS-STEP-78.md`
- `docs/supabase.md`
- `CHANGELOG.md`
- `PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md`

## Planning Added

- Bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.12.
- Added §28.15, "Stage 4 Planning - Daily Multiplayer Fixes and Spectator Foundations."
- Updated the Current Phase Index to record Stage 4 planning under `phase_id = 79`.
- Recorded that Stage 4 implementation remains unauthorized until a later explicit user prompt.

## Planned Stage 4 Scope

- Fix Daily Async and Daily Live lobby visibility so lobbies created by other users appear without manual refresh.
- Close the Daily Multiplayer "already played" / claim bypass so blocked users cannot still create/open a new same-day lobby.
- Confirm and enforce the five-lobby limit per authenticated user rather than globally.
- Add creator-only cancellation for unjoined lobbies and ensure cancellation releases the creator's active-lobby slot.
- Add a clear lobby cancellation UI only for the creator before a rival joins.
- Carry forward safe rival identity display across waiting, active, terminal, and spectator states where gaps remain.
- Add Live spectator foundations as authenticated read-only participation in active Live matches.
- Keep dedicated Multiplayer tab implementation deferred.

## Key Planning Decisions

- Daily lobby visibility fixes should begin by comparing Practice multiplayer subscription/state-reconciliation behavior against Daily Async and Daily Live behavior.
- The existing Daily Multiplayer claim system should remain authoritative. Stage 4 should extend `multiplayer_daily_claims` and `src/multiplayer/dailyMultiplayer.ts` helpers rather than creating a parallel claim system.
- Creator cancellation should be modeled as an explicit terminal/unavailable lobby state rather than a hard delete, unless implementation discovery proves a softer local abstraction is safer.
- Spectators should be modeled as a third role, separate from `player-one` and `player-two`; spectators must never mutate game state, resolve selection, forfeit, or affect rating/scoring.
- Any Supabase/RLS work in the future execution pass should be additive, privacy-preserving, and minimal.
- Dedicated Multiplayer tab work remains out of scope for Stage 4 implementation unless separately authorized.

## Suggested Future Work Slices

- **Lane A - Daily repository refresh and limits**: Practice-vs-Daily subscription comparison, Daily lobby refresh fix, per-user active-count helper, repository tests.
- **Lane B - Claim and cancellation domain**: claim bypass closure, cancellation status/action model, slot release behavior, domain tests.
- **Lane C - Live spectator domain and persistence**: spectator role/projection, read-only repository/RLS model, mutation-denial tests.
- **Lane D - UI integration**: cancellation controls, spectator view, safe identity display, accessible states, responsive checks.
- **Coordinator lane**: App/Calendar/Practice integration, high-conflict docs/progress, final verification, and Vercel preview.

## Files Updated

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-79.md`

## Verification

- Documentation-only step.
- `git diff --check` clean.
- `progress/PROGRESS.csv` parse check clean: all rows have 12 columns and the last `phase_id = 79`.
- Lint, tests, build, API typecheck, Supabase migrations, and browser smoke were not run because implementation was not authorized and no game/source files were intentionally changed in this step.

## Gate

Halt for user review. Do not implement Stage 4, write game code, modify UI components, add Supabase migrations, create tests, create a PR, merge, release, or implement a dedicated Multiplayer tab until the user explicitly authorizes the next execution pass.
