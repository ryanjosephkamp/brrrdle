# Theme Proposal — Command Center (Frozen Command Center, Upgraded)

- **Theme Name:** Command Center
- **Category / Type:** Tactical HUD / Sci-Mil (surface + accent theme)
- **Author:** Claude Opus 4.8
- **Date:** 2026-06-02
- **Status:** Template (proposal only — not implemented)
- **Spec reference:** `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` · `AGENT-IMPLEMENTATION-PLAN.md` §26.8

## Description

Command Center is the upgraded successor to the Phase 20 "Frozen Command Center"
layout exploration that was retired when "Lunar Signal Deck" was selected as the
final layout. Where the original restyled the whole app shell (and was therefore
removed for being layout-bound), this template is re-expressed as a pure **surface
+ accent theme**: it keeps the finalized Lunar Signal Deck layout and tab
structure untouched and instead dresses the existing shell in a frosted,
glass-and-steel tactical operations look — sharp framed panels, a faint aurora
band across the floor, scan-line readouts, and crisp cyan telemetry accents.

The intent is "mission control at a polar research station": cold, precise,
legible, and quietly alive with ambient telemetry, without ever competing with
the board for attention.

## Visual Style

- **Background (surface):** near-black steel `#05070b` base with a low-opacity
  perspective **grid floor** fading toward the horizon, plus a single slow
  horizontal **aurora band** (cyan→teal) drifting across the upper third at very
  low opacity. A faint vignette keeps focus centered.
- **Colors / accents:** frost cyan primary (`#7dd3fc`), arctic teal secondary
  (`#5eead4`), and steel slate neutrals (`#0f172a`/`#1e293b`). Accent maps to the
  existing ice tokens (`--color-ice-100/200/300`).
- **Panels / HUD frames:** glassy `slate-950/70` panels with sharpened `2px`
  corner brackets and a thin top "highlight" rule; active tab/route chips get a
  cyan underglow.
- **Letter tile colors (must preserve state distinctions):**
  - **Correct** — keep emerald (`emerald-300`) fill/border; add an optional thin
    cyan outer ring for theme cohesion only (never changes the green semantics).
  - **Present** — keep amber (`amber-300`) fill/border unchanged.
  - **Absent** — keep slate (`slate-700` border / `slate-950` fill) unchanged.
  - Empty tiles read as faint frosted glass. **Tile-state semantics and contrast
    are never altered.**

## Special Effects & Animations

- Slow-drifting aurora band (`~40s` linear loop) and a one-time radar "sweep" on
  route change.
- Tile **flip** gains a brief frost-shimmer on the leading edge as it lands.
- Correct guess triggers a subtle HUD "lock" pulse on the panel frame (cyan ring
  expands once, then fades).
- Active route chip shows an animated 1px scan line.
- All motion is gated by `prefers-reduced-motion: reduce` (animations collapse to
  static states), reusing the existing global reduced-motion block.

## Sound Theme

Mapped onto existing `SoundEvent`s (synthesized tones; no audio files):

- `keyboard-click` → short, dry mechanical "key" tick.
- `tile-flip` → soft filtered "thunk" with a tiny frost-tail.
- `correct-guess` → clean two-note rising "lock acquired" chirp.
- `invalid-guess` → low buzz "denied" tone.
- `game-over-win` → ascending three-note telemetry confirmation.
- `game-over-loss` → descending muted "signal lost" tone.

## Component / CSS Changes Needed

- No layout/markup changes to the Lunar Signal Deck shell. Theme is attribute-driven.
- New surface block in `src/index.css`: `.brrrdle-lunar-shell[data-surface='command-center']`
  (grid floor + aurora band + vignette), mirroring how `lunar-signal` is gated.
- New accent block `:root[data-theme='command-center']` swapping the ice tokens to
  frost cyan/teal and `--color-focus-ring` to a pale cyan.
- Optional cohesion-only tweaks (panel bracket pseudo-elements) scoped under the
  surface selector so they never affect other surfaces.

## Implementation Notes for Codex

1. **Surface:** add `'command-center'` to `SURFACE_THEMES` in
   `src/theme/surface.ts`; add `SURFACE_THEME_META` label/description; keep
   `DEFAULT_SURFACE_THEME = 'minimal'`.
2. **Accent:** add `'command-center'` to `THEMES` in `src/theme/theme.ts` with
   `THEME_META`; keep `DEFAULT_THEME = 'icy'`.
3. **CSS:** add the `.brrrdle-lunar-shell[data-surface='command-center']` and
   `:root[data-theme='command-center']` blocks in `src/index.css`. Reuse existing
   tokens (`--color-ice-*`, `--color-aurora-glow`, `--color-focus-ring`); do **not**
   touch tile-state rules.
4. **Sounds:** extend `TONE_SPECS` variants in `src/sound/soundEngine.ts` only if a
   per-theme sound pack is desired; otherwise inherit defaults.
5. **Effects:** add the aurora/scan keyframes in `src/index.css`, all under the
   surface selector and respecting the global `prefers-reduced-motion` block.
6. **Selection UI:** wiring a picker is a later concern; this template only needs
   the values + CSS to exist. Add unit tests mirroring `surface.ts`/`theme.ts`
   tests when implemented.

## Future Extensibility Notes

- Spawns sub-variants by swapping the aurora hue token: **Frozen** (cyan/teal,
  default), **Desert Ops** (amber/sand), **Night Vision** (phosphor green).
- The grid-floor + aurora primitives are reusable by any "control room" style
  surface; consider extracting them into shared CSS custom properties.
- A future telemetry HUD overlay (clock, streak readout) could attach to the same
  surface without layout changes.
