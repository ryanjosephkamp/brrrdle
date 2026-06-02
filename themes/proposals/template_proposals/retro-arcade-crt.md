# Theme Proposal — Arcade CRT

- **Theme Name:** Arcade CRT
- **Category / Type:** Retro / 8-bit (surface + accent theme)
- **Author:** Claude Opus 4.8
- **Date:** 2026-06-02
- **Status:** Template (proposal only — not implemented)
- **Spec reference:** `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` · `AGENT-IMPLEMENTATION-PLAN.md` §26.8

## Description

A nostalgic 1980s arcade-cabinet theme rendered as if displayed on a curved CRT:
subtle scan lines, phosphor glow, slight screen curvature vignette, and chunky
pixel-flavored accents. Arcade CRT turns the unchanged Lunar Signal Deck layout
into a coin-op high-score machine — playful, punchy, and unmistakably retro —
without harming legibility.

The aesthetic target is "after-hours at the arcade": warm CRT bloom, a marquee
glow at the top, and crunchy chiptune feedback.

## Visual Style

- **Background (surface):** charcoal CRT black (`#0a0a0f`) with faint horizontal
  **scan lines**, a soft **phosphor bloom**, gentle **screen-curvature vignette**,
  and a slim glowing **marquee bar** across the header.
- **Colors / accents:** arcade magenta (`#f472b6`) primary, electric cyan
  (`#22d3ee`) secondary, with hot accents recalling CRT phosphors. Accent maps to
  `--color-ice-100/200/300`.
- **Type / chrome:** accents and labels lean into a blocky, pixel-adjacent feel
  via letter-spacing and uppercase chrome (body text remains the normal legible
  font — no hard-to-read pixel font for content).
- **Letter tile colors (must preserve state distinctions):**
  - **Correct** — emerald unchanged. **Present** — amber unchanged. **Absent** —
    slate unchanged.
  - Tiles gain a faint phosphor glow for cohesion only; correct/present/absent
    chroma and contrast are unchanged.

## Special Effects & Animations

- Animated scan-line drift (very subtle) + occasional CRT "flicker" pulse.
- Tile **flip** uses a crisp "pixel snap" with a brief glow trail.
- Correct guess triggers a short "score popup" glow.
- Win shows a marquee "HIGH SCORE!" flash (decorative); loss shows a brief
  "GAME OVER" CRT dim.
- All motion `prefers-reduced-motion` aware; scan lines reduce to a static, very
  faint overlay (no flicker) when reduced motion is requested.

## Sound Theme

- `keyboard-click` → crisp 8-bit blip.
- `tile-flip` → square-wave "pip".
- `correct-guess` → bright chiptune two-note jingle.
- `invalid-guess` → classic "error" descending buzz.
- `game-over-win` → triumphant chiptune fanfare.
- `game-over-loss` → downward "power-down" warble.

## Component / CSS Changes Needed

- No layout/markup changes. Attribute-driven.
- `.brrrdle-lunar-shell[data-surface='arcade-crt']` block (scan lines, phosphor
  bloom, vignette, marquee) and `:root[data-theme='arcade-crt']` accent block in
  `src/index.css`. Scan lines via a repeating-linear-gradient overlay; curvature
  via radial vignette mask (pure CSS, zero-JS).

## Implementation Notes for Codex

1. Add `'arcade-crt'` to `SURFACE_THEMES` and `THEMES` with metadata; keep defaults.
2. Implement the CRT overlay as a fixed pseudo-element layer scoped to the surface
   selector so it never bleeds into other surfaces; keep overlay opacity low for
   legibility.
3. Do not touch tile-state CSS; add only cohesion glow if desired.
4. Strongly recommended chiptune sound pack via `TONE_SPECS` (square-wave tones).
5. Keyframes under the surface selector; reduced-motion disables flicker/drift.
6. Add normalize/apply tests.

## Future Extensibility Notes

- Palette sub-variants: **Neon Magenta** (default), **Green Phosphor** (mono
  green), **Amber Terminal** (mono amber).
- The CRT-overlay primitive (scan lines + vignette) is reusable by any "screen"
  themed surface (terminal, vaporwave).
- Could later add an optional "insert coin" intro splash, off by default.
