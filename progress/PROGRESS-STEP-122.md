# Progress Step 122 - Phase 23 Stage 15 Planning

**Date**: 2026-06-08  
**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: 15 - GO Transition Polish + Practice Seed Per-Account Randomization  
**Progress CSV row**: `phase_id = 122`  
**Status**: Completed - Awaiting User Review Before Stage 15 Execution

## Authorization

The user explicitly authorized a planning/governance-only pass for `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`.

This pass did not authorize source-code edits, test changes, UI/component work, Supabase migrations, configuration changes, implementation branches, PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, scoring/rating changes, broad refactoring, redesign, or Stage 15 execution.

## Context Reviewed

- `CONSTITUTION.md`
- `AGENT-IMPLEMENTATION-PLAN.md` v3.46, especially latest §28 entries
- `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-121.md`
- `agents.md`
- `memory.md`
- `CHANGELOG.md` Unreleased section

Stage 14 is complete and verified under `phase_id = 121`.

## Planning Updates Completed

- Bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.47.
- Added §28.50 for Stage 15 planning.
- Updated the Current Phase Index and current execution gate.
- Added a Stage 15 planning entry to `CHANGELOG.md`.
- Added Stage 15 coordination notes to `agents.md`.
- Updated `memory.md` with the new Stage 15 gate and durable planning decisions.
- Appended `phase_id = 122` to `progress/PROGRESS.csv`.
- Created this progress report.

## Planned Stage 15 Scope

Stage 15 is a narrow two-bug pass only:

1. **GO transition regression**: previously completed GO puzzles must remain visible and stable during the brief all-green solved-row hold.
2. **Practice seed predictability**: authenticated Practice OG and Practice GO puzzle sequences must become per-account so different accounts no longer receive identical Practice sequences.

Both bugs must be reproduced before any future source fixes are attempted.

## Required Future Execution Discipline

If Stage 15 execution is later authorized:

- Reproduce both bugs first and document the evidence.
- Fix one bug at a time using the smallest targeted change.
- Verify after each logical change before moving to the next.
- Prioritize the GO transition visibility fix first, then the Practice seed fix.
- Use real two-client Supabase-backed browser E2E for Multiplayer GO changes.
- Check authenticated Practice seed behavior with distinct accounts.
- Explicitly verify that Daily OG/GO remain globally deterministic for the same UTC day.

## Invariants To Preserve

- Stage 12 wins: Hard Mode enforcement, keyboard responsiveness, sound playback, row-write reduction, stale-save protections, timed Practice behavior, and scoring/result settlement.
- Stage 13 wins: Practice solo one-shot resume behavior, submitted-row animation stability, post-game results visibility, Multiplayer GO solved-row hold, and coordinated advancement.
- Stage 14 wins: hidden/inert Multiplayer foundations, Calendar/Practice as active multiplayer entry points, nonparticipant gameplay guard, and unified `async_multiplayer_games` path.
- Daily Multiplayer remains strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- `playerSessions` remain canonical for per-viewer multiplayer validation and mutation.
- Shared `serializedSession` remains compatibility/answer plumbing only.
- Daily OG/GO puzzle selection remains globally deterministic.

## Out Of Scope

- Broader Practice mode overhaul or new Practice features.
- Daily mode behavior or determinism changes.
- GO transition timing, sound, or animation-feel work beyond the direct prior-solution visibility regression.
- Spectator expansion, notifications, floating manager, bots, exports/GIFs, History/Theme tabs, scoring/rating/ELO changes, full dedicated Multiplayer tab implementation, PR creation, merge, release, production deployment, broad refactoring, redesign, or later-phase work.

## Verification For This Planning Pass

No implementation verification was run because this was a documentation/governance-only pass. Source code, tests, UI components, Supabase migrations, and configuration files were not intentionally modified.

## Next Step

Await user review. Stage 15 implementation remains gated until the user explicitly authorizes the execution prompt.
