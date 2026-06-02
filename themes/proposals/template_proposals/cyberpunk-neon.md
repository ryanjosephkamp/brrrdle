# Theme Proposal — Neon Cyberpunk

- **Theme Name:** Neon Cyberpunk
- **Category / Type:** Cyberpunk / Neon (surface + accent theme)
- **Author:** Claude Opus 4.8
- **Date:** 2026-06-02
- **Status:** Template (proposal only — not implemented)
- **Spec reference:** `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` · `AGENT-IMPLEMENTATION-PLAN.md` §26.8

## Description

A rain-slicked, neon-drenched megacity theme: glowing signage, magenta-and-cyan
reflections, a low synth hum, and a faint data-rain backdrop. Neon Cyberpunk is
the loudest, most saturated surface in the set — pure "Night City balcony at
3 a.m." — while still keeping the unchanged Lunar Signal Deck layout and tabs and
never compromising board legibility.

It leans on high-chroma neon edges and reflective glass rather than busy clutter,
so the energy stays in the accents and ambiance.

## Visual Style

- **Background (surface):** wet asphalt black (`#070510`) with a low **data-rain**
  column drizzle, neon **sign-glow** blooms (magenta + cyan) in the corners, and a
  faint reflective gradient along the bottom edge ("wet street").
- **Colors / accents:** neon magenta (`#e879f9`) primary, electric cyan
  (`#22d3ee`) secondary, with hot violet mids. Accent maps to
  `--color-ice-100/200/300`. (Reuses the spirit of the existing `neon` accent but
  pairs it with a full surface.)
- **Panels:** dark glass with bright neon edge strokes and subtle outer glow;
  active route chips "buzz" with a neon underline.
- **Letter tile colors (must preserve state distinctions):**
  - **Correct** — emerald unchanged. **Present** — amber unchanged. **Absent** —
    slate unchanged.
  - Neon magenta/cyan appear only on accents, edges, glows, and idle tiles. To
    avoid neon overpowering state cues, correct/present keep their solid
    emerald/amber fills with unchanged contrast.

## Special Effects & Animations

- Faint vertical data-rain (low density) + slow neon-bloom pulsing.
- Tile **flip** gets a quick neon "glitch" shear on landing.
- Correct guess triggers a magenta-cyan chromatic-aberration pulse on the tile
  (brief, subtle).
- Win shows a neon sign "flicker-on" flourish.
- All motion `prefers-reduced-motion` aware (rain + glitch disabled; static glow
  retained).

## Sound Theme

- `keyboard-click` → tight synth "tick".
- `tile-flip` → filtered synth "swish".
- `correct-guess` → bright neon two-note synth stab.
- `invalid-guess` → distorted "denied" zap.
- `game-over-win` → pulsing synthwave victory riff.
- `game-over-loss` → downward detuned "power-down" sweep.

## Component / CSS Changes Needed

- No layout/markup changes. Attribute-driven.
- `.brrrdle-lunar-shell[data-surface='neon-cyberpunk']` block (data-rain, neon
  blooms, wet-street reflection) and `:root[data-theme='neon-cyberpunk']` accent
  block in `src/index.css`. Prefer CSS for blooms/reflection; data-rain can be a
  lightweight CSS animation or a gated canvas (like `LunarSignalStage`).

## Implementation Notes for Codex

1. Add `'neon-cyberpunk'` to `SURFACE_THEMES` and `THEMES` with metadata; keep
   defaults.
2. Keep neon glow on **accents/edges only**; verify the emerald/amber tile states
   still dominate visually over neon accents (contrast check).
3. Add accent + surface CSS in `src/index.css`; do not touch tile-state rules.
4. Optional synthwave sound pack via `TONE_SPECS`.
5. If data-rain uses canvas, gate rendering on the active surface like
   `lunar-signal`; otherwise pure CSS. Respect reduced-motion.
6. Add normalize/apply tests.

## Future Extensibility Notes

- Palette sub-variants: **Magenta/Cyan** (default), **Acid Green**, **Synth
  Sunset** (orange/purple).
- The neon-bloom + glass-edge primitives are reusable by other high-energy
  surfaces.
- Could later add an optional intensity slider (glow/rain density), defaulting to
  a calm level.
