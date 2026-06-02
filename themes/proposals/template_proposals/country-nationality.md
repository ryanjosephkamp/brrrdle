# Theme Proposal — Country / Nationality (Reusable Template)

- **Theme Name:** Country / Nationality — `{{COUNTRY_NAME}}`
- **Category / Type:** Reusable / Localization (surface + accent theme, parameterized)
- **Author:** Claude Opus 4.8
- **Date:** 2026-06-02
- **Status:** Template (proposal only — not implemented)
- **Spec reference:** `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` · `AGENT-IMPLEMENTATION-PLAN.md` §26.8

## Description

A single reusable template that can spawn a polished theme for **any** country or
nationality by resolving a small set of placeholders (flag palette, emblem, motifs,
sounds). It is a more elaborate, fully parameterized successor to the existing
`country-flag` accent theme: instead of one fixed red/white/blue accent, this
template defines an entire surface + accent + effects + sound treatment driven by
per-country tokens, so one document yields dozens of concrete themes (e.g.
`country-japan`, `country-brazil`, `country-kenya`).

The goal is a respectful, celebratory national flavor — tasteful palette and
motifs, never caricature — layered on the unchanged Lunar Signal Deck layout.

## Placeholders

| Placeholder | Meaning | Example (`Japan`) |
| --- | --- | --- |
| `{{COUNTRY_NAME}}` | Display name | `Japan` |
| `{{COUNTRY_SLUG}}` | kebab id for `data-theme` / `data-surface` | `japan` |
| `{{FLAG_PRIMARY}}` | Primary flag color | `#bc002d` |
| `{{FLAG_SECONDARY}}` | Secondary flag color | `#ffffff` |
| `{{FLAG_TERTIARY}}` | Optional third color | `—` |
| `{{ACCENT_HEX}}` | Chosen UI accent (derived from flag) | `#e4607a` |
| `{{EMBLEM_MOTIF}}` | Tasteful national motif | rising-sun rays |
| `{{AMBIENT_MOTIF}}` | Subtle background pattern | faint sakura drift |
| `{{SOUND_MOTIF}}` | Instrument/tone flavor | koto pluck |

## Visual Style

- **Background (surface):** minimalist near-black base + a very low-opacity
  ambient motif (`{{AMBIENT_MOTIF}}`) tinted with `{{FLAG_PRIMARY}}`. A soft
  diagonal flag-stripe gradient sits at the screen edges at low opacity.
- **Colors / accents:** UI accent = `{{ACCENT_HEX}}` (a legibility-checked
  derivative of `{{FLAG_PRIMARY}}`/`{{FLAG_SECONDARY}}`), mapped to
  `--color-ice-100/200/300` and `--color-focus-ring`.
- **Emblem:** a single, low-key `{{EMBLEM_MOTIF}}` watermark behind the header
  (decorative, non-interactive, `aria-hidden`).
- **Letter tile colors (must preserve state distinctions):**
  - **Correct** — emerald (`emerald-300`) unchanged.
  - **Present** — amber (`amber-300`) unchanged.
  - **Absent** — slate unchanged.
  - National colors appear only on **accents, borders, glows, and empty/idle
    tiles**, never on correct/present/absent fills. Per-country palettes must pass
    the same contrast minima.

## Special Effects & Animations

- Optional gentle ambient drift for `{{AMBIENT_MOTIF}}` (e.g. petals, snow, leaves)
  at very low density, `prefers-reduced-motion` aware.
- Win celebration tints confetti/glow toward `{{FLAG_PRIMARY}}`/`{{FLAG_SECONDARY}}`.
- Route-chip active state uses the national accent underglow.

## Sound Theme

Inherits default `SoundEvent` tones, optionally flavored by `{{SOUND_MOTIF}}`:

- `correct-guess` → accent chime in the `{{SOUND_MOTIF}}` timbre.
- `game-over-win` → short national-flavored victory motif (3–4 synthesized notes).
- Other events inherit defaults to keep the pack small.

## Component / CSS Changes Needed

- No layout/markup changes. Attribute-driven (`data-theme`, `data-surface`).
- One **parameterized** CSS block per country, generated from the placeholders:
  `:root[data-theme='country-{{COUNTRY_SLUG}}']` (accent tokens) and
  `.brrrdle-lunar-shell[data-surface='country-{{COUNTRY_SLUG}}']` (ambient motif +
  edge stripes). Prefer a small set of `--country-*` custom properties so the same
  rule body is reused and only the values differ per country.

## Implementation Notes for Codex

1. Define a typed registry (e.g. `src/theme/countries.ts`) mapping
   `{{COUNTRY_SLUG}}` → palette/motif tokens; this keeps `theme.ts` small and makes
   adding a country a data-only change.
2. Extend `Theme`/`SurfaceTheme` (or a dedicated country union) so each country
   slug is allow-listed; keep defaults unchanged.
3. Emit accent + surface CSS from the `--country-*` variables; **never** override
   tile-state rules.
4. Validate each new country palette against WCAG contrast for focus/accents
   before adding it.
5. Add tests mirroring `theme.ts`/`surface.ts` (normalize unknown → default).

## Future Extensibility Notes

- Adding a country is a **data-only** change (one registry entry) once the
  template machinery exists — ideal for community contributions.
- Pairs naturally with the existing daily/practice word lists if localized word
  packs are added later.
- A "region" grouping (continents) or "World Tour" rotation could cycle countries
  automatically without new code.
