# brrrdle Planning Index

**Status**: Low-churn navigation aid for planning, governance, and progress files.
**Authority**: Index only. If a link or summary here conflicts with a source file, trust the source file and update this index.

## Active Gate

- Active area: Phase 23, Multiplayer Foundations and Polish.
- Stage 1: complete (`phase_id = 69`).
- Multi-agent scaffolding: documented (`phase_id = 71`).
- Stage 2: complete and verified (`phase_id = 72`).
- Stage 3 planning: documented (`phase_id = 73`).
- Stage 3 implementation: complete (`phase_id = 74`).
- Next allowed work: halt for user review; proceed to PR work, merge, release, or optional Stage 4 only after explicit user instruction.

## Highest-Use Files

| File | Purpose |
| --- | --- |
| `CONSTITUTION.md` | Binding governance, phase gates, verification rules, and multi-agent constraints. |
| `AGENT-IMPLEMENTATION-PLAN.md` | Current phase plan and phase index; see §28 for Phase 23. |
| `PHASE-23-MULTIPLAYER-FOUNDATIONS-AND-POLISH-SPEC-2026-06-03.md` | Approved Phase 23 scope and stage structure. |
| `agents.md` | Practical coordination guide for parallel sub-agent work. |
| `memory.md` | Compact project-state memory for future sessions. |
| `CHANGELOG.md` | User-facing and governance-facing change history. |
| `progress/PROGRESS.csv` | Monotonic progress ledger. |
| `progress/PROGRESS-STEP-69.md` | Phase 23 Stage 1 completion report. |
| `progress/PROGRESS-STEP-70.md` | Phase 23 Stage 2 planning report. |
| `progress/PROGRESS-STEP-71.md` | Multi-agent scaffolding report. |
| `progress/PROGRESS-STEP-72.md` | Phase 23 Stage 2 completion report. |
| `progress/PROGRESS-STEP-73.md` | Phase 23 Stage 3 planning report. |
| `progress/PROGRESS-STEP-74.md` | Phase 23 Stage 3 implementation report. |

## Root Spec Organization

The root currently contains approved historical and active phase specs. They are intentionally left in place during Phase 23 because many plan, changelog, and progress entries reference those exact root paths.

Future reorganization should be a separate docs-only pass that:

1. Moves specs into a stable folder such as `docs/planning/specs/`.
2. Updates all references in the plan, changelog, progress reports, README, and any source comments.
3. Runs a link/reference check.
4. Records the move in progress tracking.

## Phase 23 Reading Order

For any Phase 23 work, read in this order:

1. Current user prompt.
2. `CONSTITUTION.md`.
3. `agents.md`.
4. `memory.md`.
5. `AGENT-IMPLEMENTATION-PLAN.md` §28.
6. `PHASE-23-MULTIPLAYER-FOUNDATIONS-AND-POLISH-SPEC-2026-06-03.md`.
7. `progress/PROGRESS.csv`.
8. Latest relevant progress reports.

## Stage 3 Reminder

Stage 3 implementation is complete. Do not create a PR, merge, release, or begin optional Stage 4 until the user explicitly approves those later steps.
