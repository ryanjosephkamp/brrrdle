# Theme Proposals

This folder holds **theme proposal documents** for `brrrdle`. It is part of the
Phase 21 addendum governance step that incorporates
`PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md`
(see `AGENT-IMPLEMENTATION-PLAN.md` §26.8). No themes are implemented from these
documents until a later, separately approved phase (Phase 22 and beyond).

## Structure

- `template_proposals/` — Markdown **template** proposal documents. Each file is a
  reusable, fully fleshed-out theme template (visual style, effects, sounds, component/
  CSS changes, implementation notes, future extensibility). Authored in the approved
  execution step; currently empty.
- `full_proposals/` — reserved for later **fully implemented** theme proposals.
  Left empty for now.
- `theme_proposals.csv` — index of every proposed template. Planned columns:
  Template Name, Category/Type, Proposed Date, Status (Template), Markdown File,
  Description/Notes. Populated in the approved execution step; currently empty.
- `../themes.csv` (i.e. `themes/themes.csv`) — reserved for later **actual implemented**
  themes. Left untouched by the proposal workflow.

> Note: the binding spec refers to these paths as `Themes/proposals/template-proposals/`,
> `full-proposals/`, and `theme_proposals.csv`. On disk they are realized (case/separator
> normalized) as `themes/proposals/template_proposals/`, `full_proposals/`, and
> `theme_proposals.csv`.

## Status

Governance / planning only (`phase_id = 62`). The folder structure is acknowledged here,
but no proposal Markdown files have been authored and `theme_proposals.csv` has not been
populated yet. Those happen only after explicit user approval of the execution step.
