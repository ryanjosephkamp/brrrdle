# Governance File Placement

**Status**: Active guide for the reorganized planning structure.

## Root Authority Entrypoints

These files remain at the repository root because future prompts, agents, and tooling expect them there:

- `CONSTITUTION.md`
- `BRRRDLE-SPEC.md`
- `BRRRDLE-OVERVIEW.md`
- `agents.md`
- `memory.md`
- `AGENT-IMPLEMENTATION-PLAN.md` (compatibility shim)
- `CHANGELOG.md` (compatibility shim)

## Planning Hub

The detailed planning system now lives under `planning/`:

- `planning/IMPLEMENTATION-PLAN.md`
- `planning/phase-24/IMPLEMENTATION-PLAN.md`
- `planning/phase-24/CHANGELOG.md`
- `planning/history/`
- `planning/specs/`
- `planning/testing/`

## Rule Of Thumb

- Keep active authority entrypoints at root.
- Put active phase plans under `planning/phase-XX/`.
- Put completed specs under `planning/specs/`.
- Put long completed histories under `planning/history/`.
- Keep progress tracking under root `progress/`.
