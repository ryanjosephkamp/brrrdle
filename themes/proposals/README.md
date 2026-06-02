# Theme Proposals

This folder holds **theme proposal documents** for `brrrdle`. It is part of the
Phase 21 addendum that incorporates
`PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md`
(see `AGENT-IMPLEMENTATION-PLAN.md` §26.8). The proposals here are **planning
artifacts only**: they describe, in Codex-ready detail, themes that a later,
separately approved phase (Phase 22 and beyond) may implement. No theme code is
written from these documents until that phase is explicitly authorized.

## Folder structure

| Path | Purpose | Status |
| --- | --- | --- |
| `template_proposals/` | Reusable, fully fleshed-out **theme template** Markdown docs (visual style, effects, sounds, component/CSS changes, implementation notes, extensibility). | **Populated** — see table below. |
| `full_proposals/` | Reserved for later **fully implemented** theme proposals (a concrete theme derived from a template, ready to ship). | Empty / reserved. |
| `theme_proposals.csv` | Index of every proposed **template** in `template_proposals/`. | **Populated.** |
| `README.md` | This file — documents the folder structure and purpose. | — |
| `../themes.csv` (`themes/themes.csv`) | Reserved for later **actual implemented** themes. | Untouched by this workflow. |

> **Path naming note:** the binding spec refers to these paths as
> `Themes/proposals/template-proposals/`, `Themes/proposals/full-proposals/`, and
> `Themes/proposals/theme_proposals.csv`. On disk they are realized (case- and
> separator-normalized) as `themes/proposals/template_proposals/`,
> `full_proposals/`, and `theme_proposals.csv`.

## What is a "template" vs. a "full" proposal?

- A **template** (this folder's `template_proposals/`) is a *reusable pattern*.
  It may contain `{{PLACEHOLDERS}}` (e.g. country name, holiday accent color) so
  that one document can spawn many concrete themes. Templates describe the whole
  surface + accent treatment, effects, sounds, and exact implementation steps
  without committing to a single instance.
- A **full proposal** (`full_proposals/`, reserved) is a *concrete instance*:
  one specific, named, implementation-ready theme with every placeholder
  resolved. None exist yet.

## How a template becomes a real theme (later phases)

Each template's **Implementation Notes for Codex** section maps onto the existing,
already-shipped theming foundation so no architecture invention is required:

- **Accent palette** — add a new value to `Theme` in `src/theme/theme.ts` and a
  matching `:root[data-theme='…']` block in `src/index.css`. Accent themes swap
  only `--color-ice-100/200/300`, `--color-aurora-glow`, and `--color-focus-ring`.
- **Surface / backdrop** — add a new value to `SurfaceTheme` in
  `src/theme/surface.ts` and a matching `.brrrdle-lunar-shell[data-surface='…']`
  block in `src/index.css`. The default surface stays `minimal`.
- **Sounds** — extend `SoundEvent` / `TONE_SPECS` in `src/sound/soundEngine.ts`
  (synthesized tones; no binary assets required).
- **Non-negotiable invariant** — every template **preserves the correct / present
  / absent tile distinctions** (correct = emerald, present = amber, absent =
  slate). Themes change accents, backdrops, and sounds — never the tile-state
  semantics or legibility (CONSTITUTION §7.1, §12.2).

## Templates in this folder

| # | Template | Category / Type | File |
| --- | --- | --- | --- |
| 1 | Command Center (Frozen Command Center, upgraded) | Tactical HUD / Sci-Mil | `template_proposals/command-center.md` |
| 2 | Country / Nationality | Reusable / Localization | `template_proposals/country-nationality.md` |
| 3 | Holiday / Special Event | Reusable / Seasonal | `template_proposals/holiday-special-event.md` |
| 4 | Stellar Cartography | Sci-Fi / Deep Space | `template_proposals/sci-fi-stellar-cartography.md` |
| 5 | Verdant Grove | Nature / Organic | `template_proposals/nature-verdant-grove.md` |
| 6 | Arcade CRT | Retro / 8-bit | `template_proposals/retro-arcade-crt.md` |
| 7 | Neon Cyberpunk | Cyberpunk / Neon | `template_proposals/cyberpunk-neon.md` |
| 8 | Arcane Athenaeum | Fantasy / Mystical | `template_proposals/fantasy-arcane-athenaeum.md` |

The authoritative machine-readable index is `theme_proposals.csv`.

## Status

Execution complete for the Phase 21 addendum template-proposal step
(`phase_id = 63`). The README, the eight template documents, and the populated
`theme_proposals.csv` are planning artifacts only — **no theme code was
implemented**, `full_proposals/` and `themes/themes.csv` are untouched, and the
minimalist default surface plus the Lunar Signal Deck layout/tab structure remain
intact.
