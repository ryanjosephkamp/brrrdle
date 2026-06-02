# Theme Proposal — Holiday / Special Event (Reusable Template)

- **Theme Name:** Holiday / Special Event — `{{EVENT_NAME}}`
- **Category / Type:** Reusable / Seasonal (time-boxed surface + accent theme)
- **Author:** Claude Opus 4.8
- **Date:** 2026-06-02
- **Status:** Template (proposal only — not implemented)
- **Spec reference:** `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` · `AGENT-IMPLEMENTATION-PLAN.md` §26.8

## Description

A reusable template for **limited-time** holidays and special events (Halloween,
Winter Holidays, New Year, Lunar New Year, Valentine's, Pride, anniversaries,
launch milestones). One document spawns many seasonal themes by resolving
placeholders for palette, ornaments, ambient animation, and sounds, plus an
**active date window** so the theme can auto-enable/disable around the event.

It celebrates the moment with festive ambiance on the unchanged Lunar Signal Deck
layout, then quietly steps aside when the window closes — never permanently
altering the default experience.

## Placeholders

| Placeholder | Meaning | Example (`Winter Holidays`) |
| --- | --- | --- |
| `{{EVENT_NAME}}` | Display name | `Winter Holidays` |
| `{{EVENT_SLUG}}` | kebab id for attributes | `winter-holidays` |
| `{{ACCENT_HEX}}` | Festive UI accent | `#ef4444` |
| `{{ACCENT_SECONDARY}}` | Complement accent | `#22c55e` |
| `{{ORNAMENT_MOTIF}}` | Decorative motif | snowflakes / string lights |
| `{{AMBIENT_FX}}` | Background animation | gentle snowfall |
| `{{SOUND_MOTIF}}` | Festive timbre | sleigh-bell shimmer |
| `{{DATE_START}}` / `{{DATE_END}}` | Active window (ISO) | `2026-12-01` / `2027-01-02` |

## Visual Style

- **Background (surface):** minimalist near-black base + a low-opacity festive
  gradient using `{{ACCENT_HEX}}`/`{{ACCENT_SECONDARY}}`, plus a sparse animated
  `{{AMBIENT_FX}}` layer (e.g. drifting snow, floating hearts, fireworks embers).
- **Ornaments:** small, tasteful `{{ORNAMENT_MOTIF}}` decorations framing the
  header/footer (decorative, `aria-hidden`).
- **Accents:** festive accent mapped to `--color-ice-100/200/300` +
  `--color-focus-ring`.
- **Letter tile colors (must preserve state distinctions):**
  - **Correct** — emerald unchanged. **Present** — amber unchanged. **Absent** —
    slate unchanged.
  - Festive colors live only on accents/glows/ornaments/idle tiles. Even when an
    event palette is itself red/green (e.g. winter), the correct/present semantics
    stay emerald/amber so colorblind and contrast guarantees hold.

## Special Effects & Animations

- Ambient `{{AMBIENT_FX}}` at low density, looping, `prefers-reduced-motion` aware.
- Win celebration swaps to an event-specific flourish (e.g. fireworks burst for
  New Year, heart confetti for Valentine's).
- Optional one-time "first visit during event" greeting toast.

## Sound Theme

- `correct-guess` → festive chime in the `{{SOUND_MOTIF}}` timbre.
- `game-over-win` → short seasonal victory motif.
- Remaining events inherit defaults.

## Component / CSS Changes Needed

- No layout/markup changes. Attribute-driven.
- `:root[data-theme='event-{{EVENT_SLUG}}']` (accent) and
  `.brrrdle-lunar-shell[data-surface='event-{{EVENT_SLUG}}']` (gradient + ornaments
  + ambient FX) blocks in `src/index.css`, parameterized via `--event-*` custom
  properties so the same rule body is reused.

## Implementation Notes for Codex

1. Add an event registry (e.g. `src/theme/events.ts`) mapping `{{EVENT_SLUG}}` →
   palette/motif tokens **and** `{ start, end }` ISO dates.
2. Add a small **date-window helper** (`isEventActive(now, event)`) so a later
   phase can auto-suggest/auto-enable the theme only within `{{DATE_START}}`–
   `{{DATE_END}}`; the user's manual selection always overrides auto behavior.
3. Allow-list event slugs in the relevant theme/surface unions; keep defaults
   unchanged so the experience reverts cleanly after the window.
4. Never override tile-state CSS; validate festive palettes for contrast.
5. Add tests for the date-window helper (inside/outside/boundary) and for
   normalize-unknown → default.

## Future Extensibility Notes

- New holidays are **data-only** additions (registry entry + CSS variable set).
- The date-window helper enables a future "event calendar" and automatic seasonal
  rotation without per-event code.
- Could surface a non-intrusive "An event theme is available" hint during active
  windows, fully dismissible and off by default.
