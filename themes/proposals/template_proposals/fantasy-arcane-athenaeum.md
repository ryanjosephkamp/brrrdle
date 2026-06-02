# Theme Proposal — Arcane Athenaeum

- **Theme Name:** Arcane Athenaeum
- **Category / Type:** Fantasy / Mystical (surface + accent theme)
- **Author:** Claude Opus 4.8
- **Date:** 2026-06-02
- **Status:** Template (proposal only — not implemented)
- **Spec reference:** `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` · `AGENT-IMPLEMENTATION-PLAN.md` §26.8

## Description

A candle-lit wizard's library theme: aged parchment glints, floating arcane
runes, drifting dust in warm lamplight, and gilded amethyst accents. Arcane
Athenaeum frames each puzzle as a spell being inscribed — mystical and cozy —
over the unchanged Lunar Signal Deck layout and tabs.

The mood is "scholar's tower at midnight": deep umber shadows, soft golden
candlelight, and a hint of magic shimmering at the edges.

## Visual Style

- **Background (surface):** deep umber-black (`#0b0710`) with a warm **candlelight**
  radial bloom, sparse floating **rune glyphs** at very low opacity, drifting
  **dust motes**, and a faint **parchment-grain** texture overlay.
- **Colors / accents:** arcane amethyst (`#c084fc`) primary, gilded gold
  (`#eab308`) secondary, warm umber neutrals. Accent maps to `--color-ice-100/200/300`.
- **Panels:** "tome" panels with soft gold edge filigree and a warm inner glow;
  active route chips glow like lit candles.
- **Letter tile colors (must preserve state distinctions):**
  - **Correct** — emerald unchanged. **Present** — amber unchanged. **Absent** —
    slate unchanged.
  - Amethyst/gold appear only on accents, filigree, glows, and idle tiles. Idle
    tiles read as inked parchment cells. Tile-state semantics and contrast
    unchanged.

## Special Effects & Animations

- Gentle candlelight flicker (warm bloom breathing) + slow rune/dust drift.
- Tile **flip** has an "inkwell" reveal with a brief gold shimmer.
- Correct guess emits a small amethyst "spark of insight" glyph.
- Win shows a brief floating-runes flourish; loss dims the candlelight softly.
- All motion `prefers-reduced-motion` aware (flicker/drift become static).

## Sound Theme

- `keyboard-click` → soft quill scratch.
- `tile-flip` → muted parchment "turn".
- `correct-guess` → warm harp/chime two-note shimmer.
- `invalid-guess` → low "warding" thrum.
- `game-over-win` → rising mystical arpeggio.
- `game-over-loss` → soft, hollow bell fade.

## Component / CSS Changes Needed

- No layout/markup changes. Attribute-driven.
- `.brrrdle-lunar-shell[data-surface='arcane-athenaeum']` block (candlelight bloom,
  rune/dust layer, parchment grain) and `:root[data-theme='arcane-athenaeum']`
  accent block in `src/index.css`. Prefer CSS gradients/masks; reserve canvas only
  if rune density warrants it (gate like `LunarSignalStage`).

## Implementation Notes for Codex

1. Add `'arcane-athenaeum'` to `SURFACE_THEMES` and `THEMES` with metadata; keep
   defaults.
2. Keep the parchment-grain overlay subtle so body text and tiles stay crisp;
   verify contrast for accents and focus ring.
3. Add accent + surface CSS in `src/index.css`; do not touch tile-state rules.
4. Optional mystical sound pack via `TONE_SPECS`.
5. Keyframes under the surface selector; respect reduced-motion.
6. Add normalize/apply tests.

## Future Extensibility Notes

- Palette sub-variants: **Amethyst** (default), **Emerald Coven** (green/gold —
  must still keep emerald distinct for correct tiles), **Crimson Grimoire**
  (red/gold).
- The candlelight + dust + parchment primitives are reusable by other cozy/ancient
  surfaces (tavern, scriptorium).
- Could later tie a subtle "rune of the day" decoration to the daily puzzle seed.
