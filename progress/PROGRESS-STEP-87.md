# Progress Step 87 - Stage 6 Testing Addendum and Stage 7 Planning

**Phase / step**: Phase 23 - Stage 6 real multiplayer testing addendum and Stage 7 whole-game bug-bash planning
**Date**: 2026-06-05
**Status**: Completed - awaiting user review before any execution
**Authority**: User asked for guidance on combining Stage 6 execution with meaningful real multiplayer testing and a broad autonomous debugging pass; documentation/governance updates only were authorized in this prompt.
**Gates preserved**: No source code, UI components, tests, Supabase migrations, build/config changes, PR, merge, release, dedicated Multiplayer tab, deferred feature work, or implementation.

## Decision

The recommended path is to split the work:

1. **Stage 6 execution** should remain the critical six-bug Live Multiplayer stability and Daily claim-release pass.
2. **Stage 7 execution** should be the separate broad autonomous whole-game bug bash after Stage 6 is completed and reviewed.

This preserves the Stage 6 bug-only boundary while still planning the broader debugging pass the user wants.

## Planning Updates Made

- Bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.17.
- Tightened §28.19 with a required **Meaningful Real Multiplayer Testing Requirement**.
- Added §28.20, **Stage 7 Planning - Whole-Game Autonomous Bug Bash and Stabilization**.
- Updated `CHANGELOG.md` under Unreleased.
- Updated `agents.md` with Stage 6 two-client testing notes and Stage 7 execution lanes.
- Updated `memory.md` with the Stage 6/Stage 7 split and durable testing expectations.
- Appended `phase_id = 87` to `progress/PROGRESS.csv`.
- Created this progress report.

## Stage 6 Testing Addendum

If Stage 6 execution is later authorized, it must include:

- Two isolated authenticated browser contexts.
- Two distinct real or temporary accounts.
- Real create/discover/join/play flows for Live Practice and Live Daily.
- Verification of cancellation/reclaim behavior, board updates, turn-history updates, word-length selection visibility, gameplay transition stability, and browser-refresh restoration.
- Remote Supabase probes for durable row/RLS/subscription behavior.
- Clear reporting of what was verified by browser E2E, repository/domain tests, and remote Supabase probes.

## Stage 7 Planned Scope

If Stage 7 execution is later authorized, it should cover a broad bug-fix pass across:

- Core solo gameplay.
- Daily and Calendar systems.
- Async Multiplayer.
- Live Multiplayer regression after Stage 6.
- Auth and sync.
- Stats, economy, and history.
- Words, definitions, and admin surfaces.
- Responsive, accessibility, and performance smoke.

Stage 7 should fix clear bugs only unless a later prompt explicitly authorizes features or redesign.

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

These were intentionally not run because this step was governance/documentation only and no implementation was authorized.

## Gate

Halt for user review. Stage 6 execution, Stage 7 execution, source edits, tests, Supabase migrations, build/config changes, PR creation, merge, release, dedicated Multiplayer tab work, deferred feature work, and broad debugging execution remain gated until explicit user approval.
