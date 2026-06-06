# PROGRESS-STEP-73 — Phase 23 Stage 3 Planning

## Summary

Completed a documentation/governance-only planning update for Phase 23 Stage 3. No Stage 3 implementation code, ELO/rating logic, matchmaking logic, scoring logic, custom-game UI, Supabase Stage 3 migration, PR creation, merge, or production release was performed.

Stage 3 planning scope:

- ELO / rating system.
- Advanced matchmaking.
- Scoring and performance records.
- Custom games and ranked/unranked separation.
- Multiplayer stats surfaces.
- Additive data-model and Supabase/RLS considerations.
- Fairness, anti-abuse, and verification strategy.

## Repository State

- Pulled latest `origin/main`; repository was already up to date.
- Confirmed the current branch contains the latest `origin/main` commit.
- Confirmed Stage 2 is recorded as complete under `phase_id = 72` in:
  - `AGENT-IMPLEMENTATION-PLAN.md`
  - `progress/PROGRESS.csv`
  - `progress/PROGRESS-STEP-72.md`

## Governance Confirmed

- `CONSTITUTION.md` v3.4 remains the active authority for multi-agent workflow.
- `agents.md`, `memory.md`, `docs/planning-index.md`, and `progress/README.md` remain subordinate coordination surfaces.
- Phase 23 Stage 2 implementation is complete and verified.
- Phase 23 Stage 3 implementation is not authorized by this step.
- PR creation and merge remain gated pending explicit user approval.

## Documents Updated

- `AGENT-IMPLEMENTATION-PLAN.md`
  - Bumped Plan Version from 3.5 to 3.6.
  - Added the v3.6 latest-amendment note.
  - Updated the Current Phase Index to show Stage 3 planning documented under `phase_id = 73`.
  - Expanded §28.6 into a detailed Stage 3 planning section.
  - Expanded optional Stage 4 high-level planning notes.
  - Updated the Phase 23 governance workflow table.
- `agents.md`
  - Updated the current phase gate to include Stage 3 planning.
  - Added recommended Stage 3 parallel work slices for future execution.
- `memory.md`
  - Recorded the Stage 3 planning state and future execution gate.
  - Added the Stage 3 planning decisions future sessions must preserve.
- `docs/planning-index.md`
  - Added `PROGRESS-STEP-73.md` and updated the active gate.
- `progress/README.md`
  - Added `phase_id = 73` to the current progress ledger.
- `CHANGELOG.md`
  - Added this Stage 3 planning/governance entry.
- `progress/PROGRESS.csv`
  - Appended `phase_id = 73`.
- `progress/PROGRESS-STEP-73.md`
  - Created this report.

## Stage 3 Planning Added

The implementation plan now records:

- Separate multiplayer rating buckets for `async:og`, `async:go`, `live:og`, and `live:go`.
- Initial rating of `1200`, a 10-game provisional window, and proposed K-factor defaults of `40` for provisional players and `24` for established players.
- Ranked eligibility constraints: authenticated distinct users, completed ranked match, durable result evidence, one settlement per match, and server-side/auditable settlement path.
- Async ranked caveat: guest/local-first async games remain unranked until Stage 3 adds authenticated durable result settlement.
- Scoring model direction that records guesses used, time pressure, completion status, forfeits/expiry, match points, and tie-break metadata without changing canonical OG/GO gameplay rules.
- Advanced matchmaking plan with queue filters, rating bands, wait-time widening, Practice length preferences, Daily UTC policy, and graceful no-op fallback.
- Custom-game direction: invite-code/private games default to unranked unless a later prompt explicitly approves ranked custom constraints.
- Additive data-model plan for rating profiles, rating transactions, match results, player results, matchmaking queue records, and custom-game lobbies.
- Supabase/RLS guidance to prefer RPC or narrowly-scoped policies for authoritative settlement and rating mutation.
- Fairness and anti-abuse rules for repeat opponents, duplicate users, disconnects/forfeits, replay protection, and client-trust boundaries.
- Parallel work slices for future Stage 3 execution.
- Verification strategy for pure math tests, repository/RLS tests, UI tests, responsive smoke, and full local gates.

## Stage 4 Planning Added

Optional Stage 4 notes now cover:

- Calendar density after ranked/live/async indicators.
- Mobile ergonomics for multiplayer-heavy surfaces.
- Accessibility and keyboard interaction checks.
- Animation/performance budget.
- Theme-token readiness for future visual work.

## Multi-Agent Notes

A read-only planning sub-agent reviewed Stage 3 architecture and recommended:

- Defining ranked/unranked boundaries before UI work.
- Keeping rating math, scoring, matchmaking, Supabase/RLS, and UI work in separate lanes.
- Treating client-side live projections as display state only, not as authoritative rating evidence.
- Keeping guest/local preview multiplayer unranked unless durable authenticated settlement is added.

Coordinator-owned integration should cover `src/app/App.tsx`, shared multiplayer seams, governance files, and final progress/changelog updates when execution is later authorized.

## Verification

- `git diff --check` — clean.
- `progress/PROGRESS.csv` parse check — clean; all rows have 12 columns and the final row is `phase_id = 73`.
- Source-code modification audit for this step — documentation/tracking files only.
- No lint/test/build run was required because this step was documentation-only and did not modify game/source code.

## Blockers

None.

## Gate

Halt here for user review. Stage 3 ELO/rating, advanced matchmaking, scoring, custom games, PR creation, merge, and release remain unauthorized until the user explicitly approves a later step.
