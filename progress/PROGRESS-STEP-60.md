# Progress Step Report — Phase 21 Prompt 3 (Full Execution)

## Step
- **Major step / phase**: Phase 21 Prompt 3 — Full Execution of UI Polish & Theming Foundation
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §26
- **Report file**: `progress/PROGRESS-STEP-60.md`
- **CSV row**: `phase_id = 61`
- **Date**: 2026-06-02
- **Status**: Completed — Phase 21 implementation complete; PR created for review/merge.

## Summary
Phase 21 polishes the finalized Phase 20 "Lunar Signal Deck" layout into a sophisticated, theming-ready foundation **without changing the layout or tab structure**. The default app backdrop is now a very minimalist near-black surface with a faint static grid, and the original heavier Lunar Signal Deck treatment (signal glow, animated star/moon canvas, scan grid, custom cursor) is captured as **one individual, opt-in surface theme** (`lunar-signal`) that Phase 22 can enable. Every gameplay mechanic, accent theme, and supporting feature is preserved 100% intact, and the Phase 22 dramatic theming system itself is intentionally **not** implemented.

## Refined User Instructions Honored
- Kept the overall Lunar Signal Deck layout and tab structure mostly the same.
- Made the default background very minimalist (near-black + a simple static grid pattern).
- Turned the current Lunar Signal Deck visual style into one individual theme (`lunar-signal`) that will be enabled in Phase 22.
- Polished component structure and CSS architecture without breaking or significantly removing anything.
- Did not change any core gameplay mechanics, word logic, daily/practice rules, difficulty tiers, definitions, stats, economy, auth/sync, resume, or sharing.

## Files Changed
- **`src/theme/surface.ts`** (new): pure surface-theme foundation module — `SURFACE_THEMES = ['minimal','lunar-signal']`, `DEFAULT_SURFACE_THEME = 'minimal'`, plus `isSurfaceTheme`, `normalizeSurfaceTheme`, `getSurfaceThemeMeta`, and `applySurfaceTheme` (reflects the active surface onto `<html>` as a `data-surface` attribute; default removes it). Mirrors the existing accent `theme.ts` conventions.
- **`src/theme/surface.test.ts`** (new): unit tests for the allow-list, normalizer, metadata, and `applySurfaceTheme` attribute behavior (9 tests).
- **`src/theme/index.ts`**: re-exports the surface-theme API; removed the dead `Layout` re-export from the UI barrel is handled in `src/ui/index.ts`.
- **`src/index.css`**:
  - `.brrrdle-lunar-shell` default is now a plain minimalist near-black surface; the original radial signal-glow background is gated behind `.brrrdle-lunar-shell[data-surface='lunar-signal']`.
  - `.brrrdle-lunar-noise` default is a faint static grid that fades toward the edges; the original screen-blended scan grid is restored only under `lunar-signal`.
  - Removed dead Phase-20 exploration CSS: the entire `.brrrdle-command-shell` block and all `.brrrdle-prism-*` rules except the still-used `.brrrdle-prism-mode-card::before` accent overlay, plus the now-unused `--prism-*` custom properties.
- **`src/app/LunarSignalStage.tsx`**: accepts a `surfaceTheme` prop (default `minimal`); sets `data-surface` on the shell; renders the animated `SignalCanvas` and the custom cursor **only** under `lunar-signal`; skips the background pointer-tracking work when not lunar; hero copy is now accurate for both surfaces.
- **`src/app/App.tsx`**: imports `applySurfaceTheme`/`DEFAULT_SURFACE_THEME`, applies the default minimal surface on mount, and passes `surfaceTheme={DEFAULT_SURFACE_THEME}` to `LunarSignalStage`. No future-phase surface-switching UI was added.
- **`src/ui/Layout.tsx`** (removed) and **`src/ui/index.ts`**: deleted the unused `Layout` component (the only consumer of the removed `command-shell` CSS) and its barrel export.
- **Docs/tracking**: `AGENT-IMPLEMENTATION-PLAN.md` (v2.5 → v2.6, §26 status + phase index), `CHANGELOG.md`, `progress/PROGRESS.csv` (`phase_id = 61`), and this report.

## Explicitly Not Changed
- Lunar Signal Deck layout and tab structure preserved (top bar, route dock, left rail, center playfield, right deck readout).
- No change to gameplay, word logic, daily/practice rules, difficulty tiers, definitions, stats, economy, auth/sync, resume, sharing, PWA, or sound.
- The four accent themes (`icy`/`classic`/`neon`/`country-flag`) and their `data-theme` behavior are untouched.
- The Phase 22 dramatic theming system / surface-switching UI is **not** implemented — only the foundation.
- About Brrrdle remains a dedicated page.

## Verification
- `npm run lint` — clean.
- `npx tsc -p tsconfig.app.json --noEmit` — clean.
- `npm run test` — **338/338** passing (9 new surface-theme tests added; no tests weakened or removed).
- `npm run build` — clean (with the pre-existing Vite chunk-size advisory only).
- `npx tsc -p tsconfig.api.json --noEmit` — clean.
- `git diff --check` — clean.
- `progress/PROGRESS.csv` parse check — every row has 12 columns; last row is `phase_id = 61`.
- Browser smoke (preview build): minimalist default home + active Practice surface render correctly with no console errors and the layout/tabs intact; manually setting `data-surface='lunar-signal'` restores the Lunar Signal Deck backdrop, confirming the opt-in surface foundation works.

## Blockers, Errors, or Critical Notes
- None.

## Next Step
- Phase 22 (Dramatic Theming System) — only after explicit user instruction. Phase 22 can enable the `lunar-signal` surface and add additional surfaces on top of this foundation.
