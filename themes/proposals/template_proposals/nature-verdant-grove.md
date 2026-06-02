# Theme Proposal — Verdant Grove

- **Theme Name:** Verdant Grove
- **Category / Type:** Nature / Organic (surface + accent theme)
- **Author:** Claude Opus 4.8
- **Date:** 2026-06-02
- **Status:** Template (proposal only — not implemented)
- **Spec reference:** `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` · `AGENT-IMPLEMENTATION-PLAN.md` §26.8

## Description

A calm, organic forest-canopy theme: dappled sunlight filtering through leaves,
soft moss-and-bark neutrals, and gentle drifting motes. Verdant Grove is the
deliberate counterweight to the project's cooler, high-tech surfaces — warm,
grounded, and restful — while keeping the exact Lunar Signal Deck layout and tabs.

It aims for a "morning walk in a quiet wood" feeling: low-contrast greenery,
slow ambient motion, and tactile, woody sounds.

## Visual Style

- **Background (surface):** deep forest near-black-green (`#06100a`) with a soft
  **dappled-light** radial bloom, a faint **canopy silhouette** at the top edge,
  and sparse slow-drifting **pollen/leaf motes**.
- **Colors / accents:** leaf green (`#86efac`) primary, bark amber-brown
  (`#a16207`) secondary, moss neutrals. Accent maps to `--color-ice-100/200/300`.
- **Panels:** soft, rounded "river stone" panels with low elevation and warm edges.
- **Letter tile colors (must preserve state distinctions):**
  - **Correct** — emerald unchanged. **Present** — amber unchanged. **Absent** —
    slate unchanged.
  - Because the theme is green, take care: **correct stays emerald** and must keep
    its distinct chroma vs. the green backdrop/accents (use the existing
    emerald-300 token and its border/glow, not the leaf accent). Idle tiles read as
    smooth pebbles. Contrast minima preserved.

## Special Effects & Animations

- Slow dappled-light shimmer and sparse mote drift, looping, `prefers-reduced-motion`
  aware.
- Tile **flip** has a soft "leaf settle" ease with a faint green edge bloom.
- Correct guess emits a brief upward "growth" sparkle.
- Win shows a gentle falling-leaves flourish.

## Sound Theme

- `keyboard-click` → soft wooden tap.
- `tile-flip` → muted "leaf rustle".
- `correct-guess` → warm marimba two-note chime.
- `invalid-guess` → dull "stone knock".
- `game-over-win` → bright birdsong-flavored arpeggio.
- `game-over-loss` → low, soft "wind fade".

## Component / CSS Changes Needed

- No layout/markup changes. Attribute-driven.
- `.brrrdle-lunar-shell[data-surface='verdant-grove']` block (dappled bloom,
  canopy silhouette, mote layer) and `:root[data-theme='verdant-grove']` accent
  block in `src/index.css`. Prefer CSS gradients/masks for the canopy and motes
  (zero-JS).

## Implementation Notes for Codex

1. Add `'verdant-grove'` to `SURFACE_THEMES` and `THEMES` with metadata; keep
   defaults.
2. Implement dappled light + motes as layered CSS radial-gradients/masks; reserve
   canvas only if density warrants it (then gate like `LunarSignalStage`).
3. **Critical:** verify emerald (correct) and amber (present) remain clearly
   distinguishable against the green palette before shipping; do not remap
   tile-state tokens.
4. Optional sound pack via `TONE_SPECS`.
5. Keyframes under the surface selector; respect reduced-motion.
6. Add normalize/apply tests.

## Future Extensibility Notes

- Seasonal sub-variants by swapping the foliage palette: **Spring** (bright green,
  default), **Autumn** (amber/red leaves), **Winter Pine** (frosted green).
- The dappled-light + mote primitives are reusable by other organic surfaces
  (meadow, underwater, desert dunes).
- Could later pair with an ambient nature soundscape toggle.
