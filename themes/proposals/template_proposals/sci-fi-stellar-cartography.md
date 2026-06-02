# Theme Proposal — Stellar Cartography

- **Theme Name:** Stellar Cartography
- **Category / Type:** Sci-Fi / Deep Space (surface + accent theme)
- **Author:** Claude Opus 4.8
- **Date:** 2026-06-02
- **Status:** Template (proposal only — not implemented)
- **Spec reference:** `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` · `AGENT-IMPLEMENTATION-PLAN.md` §26.8

## Description

A deep-space navigation theme styled like a starship's stellar cartography lab:
a dim cabin lit by a slowly rotating holographic star chart, constellation
filaments, and a faint nebula haze. It is the spiritual cousin of the retired
Lunar Signal Deck surface but pushed toward "interstellar atlas" rather than
"lunar landing": cooler indigos, violet nebulae, and gold star glints.

Calm, cinematic, and spacious — the board floats like a console readout over a
living chart, while the layout and tabs stay exactly as in Lunar Signal Deck.

## Visual Style

- **Background (surface):** deep indigo-black (`#04050f`) with a multi-layer
  parallax **star field**, a slow-rotating faint **constellation graticule**
  (thin gold lines + nodes), and a soft violet **nebula** gradient bloom drifting
  in the corners.
- **Colors / accents:** astral violet (`#a78bfa`) primary, star-gold (`#fbbf24`)
  highlight, cool indigo neutrals. Accent maps to `--color-ice-100/200/300`.
- **Panels:** dark glass consoles with thin violet edge glow; route chips read as
  "waypoints" with a gold active node.
- **Letter tile colors (must preserve state distinctions):**
  - **Correct** — emerald unchanged. **Present** — amber unchanged. **Absent** —
    slate unchanged.
  - Idle/empty tiles read as faint star-chart cells; violet/gold appear only on
    accents, borders, and glows. Tile-state semantics and contrast unchanged.

## Special Effects & Animations

- Parallax star field with occasional twinkles and a rare shooting star.
- Constellation graticule rotates very slowly (`~120s`).
- Tile **flip** emits a tiny "chart plot" gold spark on landing.
- Correct guess draws a brief constellation link between filled correct tiles.
- All motion `prefers-reduced-motion` aware (collapses to a static chart).

## Sound Theme

- `keyboard-click` → soft console key blip.
- `tile-flip` → airy "ping" with reverb tail.
- `correct-guess` → shimmering two-note "plot locked" tone.
- `invalid-guess` → low sonar "no fix" tone.
- `game-over-win` → rising arpeggio "course set" motif.
- `game-over-loss` → fading detuned "signal lost" tone.

## Component / CSS Changes Needed

- No layout/markup changes. Attribute-driven.
- New `.brrrdle-lunar-shell[data-surface='stellar-cartography']` block (star field
  layers, nebula bloom, graticule) in `src/index.css`, plus
  `:root[data-theme='stellar-cartography']` accent block.
- Star field may reuse a lightweight animated-canvas approach like the existing
  `LunarSignalStage` gating (rendered only under this surface) — or pure CSS
  layered radial-gradients for a zero-JS option.

## Implementation Notes for Codex

1. Add `'stellar-cartography'` to `SURFACE_THEMES` (`src/theme/surface.ts`) and
   `THEMES` (`src/theme/theme.ts`) with metadata; keep defaults.
2. Prefer **CSS-only** star/nebula layers for performance; if a canvas is used,
   gate rendering on the active surface exactly like `LunarSignalStage` does for
   `lunar-signal`.
3. Add accent + surface CSS in `src/index.css`; do not touch tile-state rules.
4. Optional sound pack via `TONE_SPECS` in `src/sound/soundEngine.ts`.
5. Keyframes under the surface selector; respect global reduced-motion block.
6. Add normalize/apply tests mirroring existing theme tests.

## Future Extensibility Notes

- Hue-swap sub-variants: **Nebula** (violet, default), **Crimson Drift** (red
  giant), **Aurora Belt** (teal/green).
- The parallax star-field primitive is reusable by any space/night surface.
- A future "star map" progress visualization could plug into the same backdrop.
