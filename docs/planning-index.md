# brrrdle Planning Index

**Status**: Low-churn navigation aid for planning, governance, and progress files.
**Authority**: Index only. If a link or summary here conflicts with a source file, trust the source file and update this index.

## Active Gate

- Active area: repository reorganization between Phase 23 and Phase 24.
- Latest completed implementation stage before reorganization: Phase 23 Stage 20 (`phase_id = 144`).
- Repository reorganization: `phase_id = 145`.
- Phase 24 implementation remains gated until the user explicitly authorizes it.

## Highest-Use Files

| File | Purpose |
| --- | --- |
| `CONSTITUTION.md` | Binding governance, phase gates, verification rules, and multi-agent constraints. |
| `BRRRDLE-SPEC.md` | Current product specification after the Phase 23 audit. |
| `BRRRDLE-OVERVIEW.md` | Historical v2.6 project plan. |
| `AGENT-IMPLEMENTATION-PLAN.md` | Root compatibility shim for implementation-plan locations. |
| `CHANGELOG.md` | Root compatibility shim for changelog locations. |
| `agents.md` | Practical coordination guide for parallel sub-agent work. |
| `memory.md` | Compact project-state memory for future sessions. |
| `planning/README.md` | Main planning-system guide. |
| `planning/IMPLEMENTATION-PLAN.md` | Lightweight living implementation plan. |
| `planning/phase-24/IMPLEMENTATION-PLAN.md` | Phase 24 placeholder plan. |
| `planning/history/AGENT-IMPLEMENTATION-PLAN.md` | Full historical implementation plan through Phase 23. |
| `planning/history/CHANGELOG.md` | Full historical changelog through Phase 23. |
| `planning/specs/phase-23/` | Phase 23 specs and bug notes. |
| `planning/specs/archive/` | Earlier phase specs and historical planning artifacts. |
| `planning/testing/TESTING-SUITE.md` | Testing philosophy and future suite foundation. |
| `progress/PROGRESS.csv` | Monotonic progress ledger. |
| `progress/PROGRESS-STEP-145.md` | Repository reorganization progress report. |

## Reading Order

For future work, read in this order:

1. Current user prompt.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `BRRRDLE-OVERVIEW.md` if historical product-plan context matters.
5. `AGENT-IMPLEMENTATION-PLAN.md` root shim.
6. `planning/README.md`.
7. `planning/IMPLEMENTATION-PLAN.md`.
8. The active phase plan/spec under `planning/phase-XX/` or `planning/specs/phase-XX/`.
9. `agents.md`.
10. `memory.md`.
11. `progress/PROGRESS.csv` and the latest relevant `progress/PROGRESS-STEP-*.md`.

## Spec Organization

- Active authority entrypoints stay at root.
- Full historical plans and changelogs live in `planning/history/`.
- Phase 23 specs live in `planning/specs/phase-23/`.
- Earlier phase specs live in `planning/specs/archive/`.
- Future Phase 24 specs should be placed in `planning/specs/phase-24/`.

Keep future root clutter low by adding new specs to `planning/specs/` instead of the repository root.
