# Progress Step 115 - Phase 23 Stage 13 Execution Kickoff

**Date**: 2026-06-07  
**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: 13 - Practice Solo UX Bugs + Multiplayer GO Result Propagation Fix  
**Progress CSV row**: `phase_id = 115`  
**Status**: Completed - Stage 13 Reproduction And Fixes Pending

## Authorization

The user explicitly authorized full Stage 13 execution from `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md`.

This is a strict three-bug pass only. It does not authorize PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, new gameplay features, scoring/rating/ELO changes, broad refactoring, redesign, or later-phase work.

## Protected Starting State

- Active branch: `codex/phase-23-stage-10`.
- The worktree is intentionally dirty with verified Stage 8-10, final-stabilization, Stage 12, and Stage 13 planning changes.
- The current local repository state is the source of truth. Do not reset, rebase, pull over, switch away from, or discard this dirty state.
- Restore point remains backup branch `backup/phase-23-stage-10-final-2026-06-06` with Draft PR #18. Do not merge it without explicit later authorization.

## Stage 13 Bug Checklist

### Bug 2 - Practice Solo Missing Results Screen

- Investigate Practice OG/GO post-game flow.
- Write a focused failing test before production changes.
- Fix so Practice solo shows the normal post-game result view after win/loss.
- Verify Play Again/New Game starts a new puzzle only after explicit user action.

### Bug 1 - Practice Solo Submitted Rows Re-Animating

- Reproduce before fixing where practical.
- Compare Daily Solo's working submitted-row animation behavior against Practice Solo.
- Write focused failing coverage for submitted rows not re-animating on later keyboard input where practical.
- Fix without changing Daily Solo behavior.

### Bug 3 - Multiplayer GO Solved-Puzzle Propagation

- Reproduce with real two-client Supabase-backed browser E2E.
- Verify the solver and rival both briefly see the all-green solved row.
- Fix so both clients advance together to the next puzzle or final definitions.
- Recheck timed/untimed Practice Multiplayer, Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, and Daily Multiplayer invariants.

## Baseline Resource Snapshot

Captured before Stage 13 source edits, local dev-server startup, or browser E2E.

### Worktree / Server State

- `git branch --show-current`: `codex/phase-23-stage-10`.
- `git status --short`: dirty with expected prior Stage 8-13 files.
- Listening server check: no local app dev server was detected.

### `ps aux -m | head -25`

Largest visible RSS entries included:

- Codex renderer: about 697 MB.
- Codex main process: about 498 MB.
- VS Code plugin helpers: about 416 MB and 390 MB.
- Finder: about 275 MB.
- Chrome main process: about 260 MB.
- Chrome renderers: about 227 MB, 195 MB, and 184 MB.

No Stage 7-style multi-GB `next-server`, Vite, Node, or Python app process was visible.

### `top -l 1 -o mem | head -30`

Notable memory state:

- Load average: about 3.25.
- Physical memory: about 16 GB used.
- Compressor: about 6.4 GB.
- Unused memory: about 1.2 GB.
- Long-lived unrelated GUI/Python processes remain visible.

### `vm_stat`

Notable memory state:

- Page size: 16 KB.
- Free pages: 72,496, about 1.1 GB.
- Pages stored in compressor: 1,827,482.
- Pages occupied by compressor: 414,546.

## Resource Safety Plan

- Use one local dev server unless a clear reason appears.
- Avoid running full lint/test/build/typecheck gates in parallel.
- Use minimal browser contexts for two-client E2E and close them promptly.
- Run multiplayer E2E flows sequentially.
- Avoid unbounded scripts, huge logs, repeated process spawning, or long-running instrumentation.
- Re-check memory/process usage during heavy browser testing and at final handoff.
- Gracefully terminate only agent-started runaway processes if needed.
- Do not kill unrelated or system-critical processes.

## Invariants

Stage 13 must preserve:

- Daily Multiplayer remains strictly asynchronous, fixed at five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- Practice Multiplayer remains the only multiplayer mode with time-limit and Hard Mode lobby settings.
- `playerSessions` plus `getMultiplayerSessionForPlayer` remain canonical for viewer state.
- Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, stale-save protections, timed Practice behavior, scoring/result settlement, and unchanged-projection save skipping remain working.
- Daily Solo keyboard animation and post-game behavior remain untouched.

## Next Step

Proceed with root-cause investigation and test-first implementation:

1. Investigate and test Bug 2 first.
2. Reproduce/test/fix Bug 1 second.
3. Reproduce/test/fix Bug 3 third with real two-client Supabase-backed browser E2E.
4. Update progress after each major verified fix.

## Scope Guard

No source-code fix, UI/component change, test change, Supabase migration, PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new feature, scoring/rating change, broad refactor, or later-phase work was performed in this kickoff checkpoint.
