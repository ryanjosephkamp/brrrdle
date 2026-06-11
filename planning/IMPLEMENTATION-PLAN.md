# brrrdle Lightweight Implementation Plan

**Status**: Active high-level plan after Phase 23.
**Updated**: 2026-06-10

## Current Project State

Phase 23 completed the major unified Multiplayer foundations and polish work. The latest verified progress record before repository reorganization is `phase_id = 144`, which completed Stage 20 status text synchronization and forfeit precedence fixes.

The full Phase 0 through Phase 23 historical plan is archived at:

- [planning/history/AGENT-IMPLEMENTATION-PLAN.md](history/AGENT-IMPLEMENTATION-PLAN.md)

## Active Gate

The repository is being reorganized between Phase 23 and Phase 24. Phase 24 implementation remains gated until the user provides and authorizes a Phase 24 scope/spec.

## Durable Invariants

- Current explicit user instructions remain highest authority.
- `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, and `BRRRDLE-OVERVIEW.md` remain root authority entrypoints.
- `progress/PROGRESS.csv` remains the canonical ledger.
- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-lobby-control, answer-separated, and claim-safe unless a later approved spec explicitly changes it.
- Multiplayer claims require real two-client Supabase-backed verification.
- PR, merge, production deploy, release, and new phase execution remain gated by explicit user authorization.

## Near-Term Plan

1. Complete repository reorganization and create a review PR.
2. Await user review and any merge authorization.
3. Await the Phase 24 specification or execution prompt.
4. Start Phase 24 only after explicit authorization.

## Planning Hygiene Going Forward

- Keep this file high-level.
- Put detailed phase work in `planning/phase-XX/IMPLEMENTATION-PLAN.md`.
- Put source specs in `planning/specs/phase-XX/`.
- Keep historical plans in `planning/history/`.
- Update `progress/` for durable gates and handoffs.
