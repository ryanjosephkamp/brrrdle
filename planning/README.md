# brrrdle Planning System

**Status**: Active planning hub after the Phase 23 to Phase 24 repository reorganization.

## Purpose

The `planning/` directory keeps current plans, phase specs, historical context, and testing strategy out of the repository root while preserving fast access for Codex and future agents.

## What To Read First

For normal future work, read:

1. The current user prompt.
2. Root [CONSTITUTION.md](../CONSTITUTION.md).
3. Root [BRRRDLE-SPEC.md](../BRRRDLE-SPEC.md).
4. Root [BRRRDLE-OVERVIEW.md](../BRRRDLE-OVERVIEW.md) when historical product-plan context matters.
5. Root [AGENT-IMPLEMENTATION-PLAN.md](../AGENT-IMPLEMENTATION-PLAN.md), which now points into this planning hub.
6. [planning/IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md).
7. The active phase plan, currently [planning/phase-24/IMPLEMENTATION-PLAN.md](phase-24/IMPLEMENTATION-PLAN.md), when Phase 24 is authorized.
8. [progress/PROGRESS.csv](../progress/PROGRESS.csv) and the latest matching progress report.

## Directory Map

- `planning/IMPLEMENTATION-PLAN.md`: lightweight living project plan.
- `planning/phase-24/`: active Phase 24 planning and changelog area.
- `planning/specs/phase-23/`: Phase 23 source specs and bug notes.
- `planning/specs/phase-24/`: future Phase 24 specs once provided.
- `planning/specs/archive/`: earlier phase specs and historical planning artifacts.
- `planning/history/`: long historical plans, changelogs, Vercel logs, and summaries.
- `planning/governance/`: guidance for active governance file locations.
- `planning/testing/`: testing-suite strategy and verification philosophy.

## Planning Rules

- Keep root entrypoints short and stable.
- Keep active phase plans concise.
- Move completed phase specs into `planning/specs/`.
- Keep long historical material under `planning/history/`.
- Do not treat planning documents as implementation authorization unless the user explicitly authorizes execution.
- Keep `progress/` at the repository root as the canonical progress ledger.

## Testing Strategy

The testing strategy is documented in [planning/testing/TESTING-SUITE.md](testing/TESTING-SUITE.md). It prioritizes core gameplay correctness, real multiplayer E2E for multiplayer claims, and smoke coverage that remains flexible enough for future UI changes.
