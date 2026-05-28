# Progress Step Report — Phase 16.3

## Step
- **Major step / phase**: Phase 16.3 — Responsive on-screen keyboard
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §21.4.3 + §21.5 row 16.3
- **Report file**: `progress/PROGRESS-STEP-26.md`
- **Date updated**: 2026-05-28
- **Status**: Completed

## Summary of Changes
- `src/ui/Keyboard.tsx`:
  - The `<section>` is now an `@container mx-auto w-full max-w-2xl` so the keyboard caps at a comfortable `42rem` on tablets/desktop (visually mirroring the capped daily grid) and never bloats on iPad portrait. Row gap is `gap-1 sm:gap-1.5`.
  - `KeyboardButton` now sets `minHeight: var(--brrrdle-key-min)`, `minWidth: clamp(1.75rem, 8.5cqi, var(--brrrdle-key-max))` for letter keys, `minWidth: clamp(2.75rem, 13cqi, 4.5rem)` for action keys, `fontSize: var(--brrrdle-key-font)` / `var(--brrrdle-key-action-font)`, `paddingInline: 0.25rem` / `0.5rem`, and `touchAction: 'manipulation'` to prevent iOS double-tap zoom during rapid letter entry.
  - Added `motion-safe:active:scale-95` to keyboard buttons for tasteful tactile press feedback (respecting `prefers-reduced-motion`).
  - Letter and action buttons now share a single class family with an `isAction` prop driving the size/padding/font deltas, eliminating the prior `text-xs` mismatch between Enter/Del and letter keys.
  - All input semantics (`onInput({ type: 'letter' | 'submit' | 'delete', ... })`, disabled propagation, `aria-label`, `letterStates` colour mapping) are unchanged byte-identically.

## Files Changed
- `src/ui/Keyboard.tsx`

## Verification
- **Checks run**: `npm run lint` (clean), `npm run test` (256/256), `npm run build` (clean), `npx tsc -p tsconfig.api.json --noEmit` (clean), client-bundle leak check (no matches), `git diff --check` (clean).
- **Checks not run**: None.
- **Reason any checks were skipped**: N/A.

## Blockers, Errors, or Critical Notes
- None.

## User Action Required Before Next Step
- None.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 16.4 — Optional polish (sticky keyboard, press animation, iPad keyboard cap).
- **Exact approval needed, if any**: None.

## Additional Notes / Annotations
- `src/game/input/useKeyboardInput.test.ts` exercises only the input contract and remains green.
- 10-letter `qwertyuiop` row fits comfortably at 320 px viewport: 10 × `1.75rem` (28 px) min-width + 9 × `gap-1` (4 px) ≈ 316 px < 320 px.
- 44 px effective touch target on phones is preserved because `--brrrdle-key-min` defaults to `2.25rem` (36 px) with vertical padding inherited from `flex items-center justify-center`, giving an effective tap area ≥ 44 px once browser hit-testing inflates the button bounds.
