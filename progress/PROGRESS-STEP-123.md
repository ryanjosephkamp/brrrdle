# Progress Step 123 - Phase 23 Stage 15 Execution Kickoff

**Date**: 2026-06-08  
**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: 15 - GO Transition Polish + Practice Seed Per-Account Randomization  
**Progress CSV row**: `phase_id = 123`  
**Status**: Completed - Reproduction And Fixes Pending

## Authorization

The user explicitly authorized Stage 15 execution from `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`.

This checkpoint opens execution only for the two scoped Stage 15 bugs. PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, redesign, and out-of-scope work remain gated.

## Protected Starting State

- Current branch: `codex/phase-23-stage-10`.
- The working tree is intentionally dirty with the verified Phase 23 Stage 8 through Stage 15 planning state.
- The current dirty worktree is the source of truth.
- Do not reset, rebase, pull over, switch away from, discard, or overwrite the current state.

## Baseline Resource Snapshot

Captured before Stage 15 dev-server or browser testing:

- `ps aux -m | head -25`
- `top -l 1 -o mem | head -30`
- `vm_stat`
- listener check for common app/dev ports

Observed baseline:

- No local Vite app server was listening on the common app ports checked.
- One unrelated Python listener was present on `127.0.0.1:8765`.
- One existing Playwright-style Chrome process was visible before Stage 15 testing began; it was recorded rather than terminated because it was not started by this Stage 15 run.
- Memory pressure was elevated: `top` reported about 17 GB physical memory used, about 7.3 GB compressed, and about 132 MB unused.

Resource plan:

- Use one Vite dev server unless there is a clear reason otherwise.
- Use minimal browser contexts.
- Close contexts promptly after verification.
- Do not run full gates in parallel.
- Record and stop any long-running process started by this Stage 15 pass.

## Reproduction Plan

Both scoped bugs must be reproduced before source fixes.

### Bug 1 - GO Transition Regression

Goal: confirm previously completed GO puzzles disappear or reset during the brief all-green solved-row hold.

Plan:

- Inspect the current GO solved-row hold rendering path.
- Reproduce in Multiplayer GO with real two-client Supabase-backed browser E2E where practical.
- Check solo Practice GO and Daily GO if they share the affected rendering path.
- Document the exact reproduction evidence before editing source.

### Bug 2 - Practice Seed Predictability

Goal: confirm two distinct authenticated accounts receive identical Practice OG/GO sequences.

Plan:

- Use two distinct authenticated contexts/accounts where practical.
- Compare initial Practice OG and Practice GO answers/sequences before any seed fix.
- Pair browser evidence with code-level seed/session inspection.
- Document Daily OG/GO determinism expectations before editing seed logic.

## Stage 15 Checklist

1. Reproduce GO transition bug and document evidence.
2. Add focused failing regression coverage for GO prior-puzzle visibility during solved-row hold.
3. Implement the smallest GO transition fix.
4. Run focused verification for the GO fix and Stage 13 solved-row hold/coordinated advancement behavior.
5. Reproduce authenticated Practice seed predictability bug and document evidence.
6. Add focused failing regression coverage for authenticated Practice per-account seed uniqueness plus Daily determinism.
7. Implement the smallest Practice seed fix.
8. Run focused verification for the seed fix.
9. Run real Supabase-backed browser E2E where relevant.
10. Run full automated gate, responsive smoke, resource check, Vercel preview, and final handoff.

## Invariants To Preserve

- Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, row-write reduction, stale-save protections, timed Practice behavior, and scoring/result settlement.
- Stage 13 Practice solo one-shot resume behavior, submitted-row animation stability, post-game results visibility, Multiplayer GO solved-row hold, and coordinated advancement.
- Stage 14 hidden/inert Multiplayer foundations, Calendar/Practice as active multiplayer entry points, nonparticipant gameplay guard, and unified `async_multiplayer_games` path.
- Daily OG/GO globally deterministic selection for the same UTC day.
- Daily Multiplayer strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- `playerSessions` canonical for per-viewer multiplayer validation/mutation; shared `serializedSession` compatibility/answer plumbing only.

## Next Step

Begin reproduction-first investigation for the GO transition regression, then the authenticated Practice seed predictability bug. No source-code fixes have been made in this kickoff checkpoint.
