# Progress Step 134 — Phase 23 Stage 18 Planning

**Date**: 2026-06-08
**Phase**: 23 - Multiplayer Foundations and Polish
**Stage**: 18 - Multiplayer GO Final Puzzle Behavior + Solo Practice GO Hard Mode Checkbox Fixes
**Progress CSV row**: `phase_id = 134`
**Status**: Completed - Awaiting user review before Stage 18 execution

## Authorization

The user authorized a planning and governance-only pass for `PHASE-23-STAGE-18-MULTIPLAYER-GO-FINAL-PUZZLE-AND-SOLO-PRACTICE-GO-HARD-MODE-FIXES-SPEC-2026-06-08.md`.

This pass did not authorize source-code edits, tests, UI/component changes, Supabase migrations, configuration changes, implementation branches, PR creation, merge, release, browser verification, Phase 24 work, or Stage 18 execution.

## Progress Numbering Decision

The last completed progress entry was `phase_id = 133` for Stage 17 final verification and handoff.

Stage 18 planning therefore uses the next sequential ID, `phase_id = 134`. No progress ID conflict or gap was found.

## Scope Recorded

Stage 18 is a final targeted three-bug pass inside Phase 23.

The scoped bugs:

- Solo Practice GO Hard Mode checkbox is not toggleable. Future execution must make the checkbox toggle, persist the choice, and enforce Hard Mode on the first guess, using Solo Practice OG as the closest working reference.
- Multiplayer GO is missing the final solved-row hold after puzzle 5. Future execution must apply the same all-green solved-row hold and transition used after puzzles 1-4 to both Practice Multiplayer GO and Daily Multiplayer GO final puzzle completion.
- Multiplayer GO chains can terminate prematurely on puzzle 5 after several wrong guesses. Future execution must ensure Practice Multiplayer GO and Daily Multiplayer GO keep alternating until a correct solve, then show the solved-row hold and terminal results.

Bug 3 is the highest priority during future execution because it breaks the final-puzzle alternating-turn-until-solved contract.

## Strict Boundaries

Future Stage 18 execution must not touch:

- Solo Practice OG.
- Daily Solo GO.
- Any OG mode, including Practice Multiplayer OG and Daily Multiplayer OG.
- Scoring, rating, or ELO logic.
- GO chain advancement rules for non-final puzzles.
- Multiplayer GO Hard Mode enforcement.
- Customize box behavior, layout, styling, or copy.
- Resume behavior.
- Seed behavior or the Stage 15 authenticated Practice seed system.
- UI theming or broad layout work.
- Broad refactors of `src/game/go/`, `src/multiplayer/`, session management, or app architecture.
- PR creation, merge, release, production deployment, full dedicated Multiplayer tab work, spectator expansion, notifications, floating manager, bots, social/export features, Phase 24 work, or later-phase work.

If the root cause of Bug 3 appears to require changes outside the narrow Stage 18 surfaces, future execution must stop and report rather than broadening scope.

## Invariants To Preserve

Future Stage 18 execution must preserve:

- All Stage 12 through Stage 17 wins.
- Daily Multiplayer as strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-lobby-control, answer-separated, and claim-safe.
- `playerSessions` as canonical per-viewer state.
- Shared `serializedSession` as compatibility/answer plumbing only.
- Solo Practice OG behavior unchanged.
- Daily OG/GO deterministic selection unchanged.
- No scoring, rating, or ELO rule changes.

## Future Execution Requirements

When the user later authorizes execution, Stage 18 must:

1. Reproduce first, especially the Multiplayer GO final-puzzle premature-termination bug with real two-client Supabase-backed browser E2E.
2. Make the smallest possible targeted change for each bug.
3. Run focused verification immediately after each logical fix before moving on.
4. Use real two-client Supabase-backed browser E2E for any Practice or Daily Multiplayer GO claim.
5. Pair multiplayer browser verification with remote Supabase probes and cleanup where relevant.
6. Run the final gate: focused changed-area tests, `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, desktop/tablet/390px browser smoke, Solo Practice OG non-regression, Stage 12-17 invariant checks, and resource/process sanity checks.

## Governance Updates

Updated in this planning pass:

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-134.md`

The Stage 18 spec file at repository root was read and incorporated as the binding source of truth.

No source files, test files, UI components, Supabase migrations, or configuration files were modified.

## Next Step

Halt for user review. Stage 18 implementation remains gated until the user explicitly authorizes execution in a future prompt.
