# Progress Step 95 — Phase 23 Stage 8 Planning

**Phase / step**: Phase 23 Stage 8 — Multiplayer Unification + Time-Limited Practice Games  
**phase_id**: 95  
**Status**: Completed — planning/governance only; awaiting user review before implementation  
**Date**: 2026-06-06  
**Source of truth**: `PHASE-23-STAGE-8-MULTIPLAYER-UNIFICATION-AND-TIME-LIMITS-SPEC-2026-06-05.md`

## Authorization

The user explicitly authorized a documentation and governance pass only for the Stage 8 spec. This pass did not authorize source-code edits, UI work, tests, Supabase migrations, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or Stage 8 execution.

## Context Reviewed

- `CONSTITUTION.md` v3.4.
- `agents.md`.
- `memory.md`.
- `AGENT-IMPLEMENTATION-PLAN.md`, especially §28 and Stage 7 sections.
- `PHASE-23-STAGE-8-MULTIPLAYER-UNIFICATION-AND-TIME-LIMITS-SPEC-2026-06-05.md`.
- `progress/PROGRESS-STEP-92.md` through `progress/PROGRESS-STEP-94.md`.
- `progress/PROGRESS.csv`.
- `CHANGELOG.md` Unreleased section.
- Current multiplayer source map, including async/live panels, domain modules, repositories, Calendar/App integration surfaces, and Supabase migration history.

## Planning Summary

Stage 8 is planned as a significant multiplayer simplification and performance pass:

- Collapse the current Async/Live split into a single user-facing **Multiplayer** model.
- Preserve the reliable async/durable-row pattern as the baseline for all multiplayer.
- Remove or migrate Live-specific terminology, code paths, panels, state machines, subscriptions, Calendar indicators, and persistence surfaces.
- Keep Daily Multiplayer strictly asynchronous with no time limits, UTC-midnight expiry only, five-letter daily invariant, separate OG/GO answers, and preserved Daily claim rules.
- Add Practice Multiplayer time-limit options selected by the lobby creator: no limit, 30 seconds, 1 minute, 2 minutes, 5 minutes, 10 minutes, 30 minutes, and 1 hour.
- Model Practice timing as a chess clock: total time per player for the whole game, visible clocks, active-player clock only, timeout as a loss.
- Treat memory/performance remediation as blocking scope, especially for two concurrent authenticated browser sessions.

## Key Work Areas Documented

- Unified domain/state model.
- Practice time-limit system and timeout settlement.
- Daily Multiplayer preservation and claim compatibility.
- User-facing terminology cleanup.
- Persistence and Supabase migration/compatibility strategy.
- Ratings, scoring, stats, and historical bucket migration considerations.
- Memory and performance investigation.
- Real two-client browser and remote Supabase verification requirements.

## Recommended Execution Slices

- Read-only baseline and instrumentation.
- Unified model design and compatibility plan.
- Domain/timer implementation with focused tests.
- Repository/Supabase seam consolidation.
- UI integration for unified Practice/Daily Multiplayer.
- Removal of unused Live-specific code and terminology.
- Full verification, memory checks, and preview deployment.

Suggested parallel lanes:

- Domain/timer model.
- Persistence/Supabase compatibility.
- UI/terminology/Calendar integration.
- Performance audit and fixes.
- Coordinator-owned App/progress/changelog/final verification.

## Risks and Considerations

- Stage 8 is a large refactor and should not be combined with a dedicated Multiplayer tab, spectator expansion, notification system, bots, social features, or redesign.
- Existing async/live local and Supabase records may require compatibility or migration handling.
- Daily invariants must remain untouched: Daily remains five letters, UTC-based for Multiplayer, no time limits, and restricted by the unified Daily claim policy.
- Timed Practice games need fair server-time-aware accounting; client timers should not be the sole authority.
- Rating bucket terminology must be changed without unsafe historical mixing or double rating settlement.
- Memory fixes must be measured and real; removing labels alone does not solve duplicate clients, subscriptions, intervals, or oversized projections.

## Files Updated

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-95.md`

## Verification

Documentation-only checks performed:

- Confirmed this pass only edited governance/tracking surfaces.
- Reviewed current multiplayer file map and recent Stage 7 progress before planning.
- Did not run lint/test/build/typecheck because implementation was not authorized and no source/test/config files were edited.

## Gate

Stage 8 implementation remains gated. The next step is user review. Do not edit `src/`, `api/`, `supabase/`, tests, UI components, build config, or create implementation branches until the user explicitly authorizes Stage 8 execution in a later prompt.
