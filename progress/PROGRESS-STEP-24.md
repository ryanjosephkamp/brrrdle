# Progress Step Report — Phase 16.1

## Step
- **Major step / phase**: Phase 16.1 — Design tokens & viewport polish
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §21.4.1 + §21.4.4 + §21.5 row 16.1
- **Report file**: `progress/PROGRESS-STEP-24.md`
- **Date updated**: 2026-05-28
- **Status**: Completed

## Summary of Changes
- `index.html`: `viewport` meta now includes `viewport-fit=cover` so iOS standalone PWA respects `env(safe-area-inset-*)`.
- `src/index.css`: introduced Phase 16 responsive design tokens on `:root`:
  - `--brrrdle-tile-min` (`2rem`), `--brrrdle-tile-max` (`4.25rem`), `--brrrdle-tile-size` (`clamp(min, 14cqi, max)`), `--brrrdle-tile-font` (`clamp(0.875rem, 6.5cqi, 1.625rem)`).
  - `--brrrdle-key-min` (`2.25rem`), `--brrrdle-key-max` (`3.75rem`), `--brrrdle-key-size` (`clamp(min, 9cqi, max)`), `--brrrdle-key-font` (`clamp(0.75rem, 4.25cqi, 1.05rem)`), `--brrrdle-key-action-font` (`clamp(0.625rem, 3.5cqi, 0.95rem)`).
- `src/ui/Layout.tsx`: app shell now uses `min-h-svh min-h-dvh` (Tailwind v4 emits both; the later `dvh` wins where supported, `svh` is the safe fallback). Padding switched to `px-[max(1rem,env(safe-area-inset-left))] py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8` for notched-device polish.

## Files Changed
- `index.html`
- `src/index.css`
- `src/ui/Layout.tsx`

## Verification
- **Checks run**: `npm run lint` (clean), `npm run test` (256/256), `npm run build` (clean), `npx tsc -p tsconfig.api.json --noEmit` (clean), client-bundle leak check `grep -R "@vercel/blob" dist/assets/` (no matches), `git diff --check` (clean).
- **Checks not run**: None.
- **Reason any checks were skipped**: N/A.

## Blockers, Errors, or Critical Notes
- None.

## User Action Required Before Next Step
- None.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 16.2 — Responsive grid tiles.
- **Exact approval needed, if any**: None.

## Additional Notes / Annotations
- Tokens fall back gracefully when consumed outside a CSS container: `cqi` resolves to small-viewport inline %, so visuals remain coherent until §16.2/§16.3 add `@container` wrappers.
