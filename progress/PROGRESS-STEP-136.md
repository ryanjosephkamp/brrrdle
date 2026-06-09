# Progress Step 136: Phase 23 Stage 18 Final Verification And Handoff

**Phase**: 23 — Multiplayer Foundations and Polish
**Stage**: 18 — Multiplayer GO Final Puzzle Behavior + Solo Practice GO Hard Mode Checkbox Fixes
**Status**: Completed — Awaiting User Review Before PR Or Later Work
**Date**: 2026-06-08
**phase_id**: 136

## Summary

Stage 18 is complete for user review.

This final checkpoint records the reproduction evidence, scoped fixes, real two-client Supabase-backed E2E results, full verification gate, resource cleanup, and remaining governance boundary for the final targeted Stage 18 pass.

No PR, merge, release, production deployment, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating change, broad refactor, redesign, Phase 24 work, or out-of-scope work was performed.

## Bugs Reproduced And Fixed

### Bug 1 — Multiplayer GO Final Puzzle Premature Termination

Focused domain coverage reproduced the bug before the fix for both Practice and Daily Multiplayer GO:

- puzzles 1-4 were solved normally
- puzzle 5 received multiple wrong guesses
- the game incorrectly reached terminal `won` state before a correct final-puzzle solve

The fix is scoped to the multiplayer GO submission path. On the final GO puzzle only, the multiplayer session restore path extends the final puzzle attempt budget as needed so additional alternating turns remain available until a correct solve. Non-final GO advancement, scoring/rating/ELO rules, Solo GO behavior, and Daily determinism were not changed.

### Bug 2 — Multiplayer GO Final Solved-Row Hold

Focused panel coverage was strengthened to cover terminal-puzzle completion after multiple wrong final-puzzle guesses for both Practice and Daily Multiplayer GO.

The final solved-row hold now follows the same path as puzzles 1-4: after the correct fifth-puzzle answer, both clients briefly see the solved all-green row and `Advancing to final results` before terminal definitions/results appear.

### Bug 3 — Solo Practice GO Hard Mode Checkbox

Focused Solo Practice GO coverage reproduced the fresh-chain bug before the fix:

- a fresh Practice GO chain had the Hard Mode checkbox disabled before any actual submitted guess
- Solo Practice OG remained the behavioral reference

The fix uses the actual-submitted-guess Practice GO lock predicate for the Hard Mode checkbox, so fresh Solo Practice GO chains can toggle Hard Mode, post-first-guess chains lock as expected, and Solo Practice OG behavior remains unchanged.

## Focused Verification

Focused verification passed:

- `npx vitest run src/multiplayer/multiplayer.test.ts --testNamePattern "keeps the final|finishes both player go sessions"`
- `npx vitest run src/multiplayer/MultiplayerPanel.test.tsx --testNamePattern "completed .* go surface"`
- `npx vitest run src/app/games/soloHardModeDefaults.test.tsx --testNamePattern "Hard Mode toggle|fresh go games in Hard Mode|Customize"`
- `npx vitest run src/multiplayer/multiplayer.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/app/games/soloHardModeDefaults.test.tsx` passed 39 focused changed-area tests

## Real Multiplayer E2E And Supabase Evidence

Real two-client Supabase-backed browser E2E passed with isolated authenticated contexts for both Practice Multiplayer GO and Daily Multiplayer GO.

Practice Multiplayer GO evidence:

- Created and joined real Practice GO games with temporary authenticated host/rival contexts.
- Solved puzzles 1-4.
- Submitted wrong final-puzzle guesses `slate`, `crane`, `brisk`, and `cigar`.
- Remote probe confirmed the game stayed `playing` after those wrong final-puzzle turns.
- Submitted the correct final answer.
- Remote probe confirmed `status = won`, durable move history included the final correct answer, and both player sessions contained the final solution row.
- Browser check confirmed `Advancing to final results` during the terminal solved-row hold before terminal definitions/results.

Daily Multiplayer GO evidence:

- Created and joined a real Daily GO game with temporary authenticated host/rival contexts.
- Verified Daily Multiplayer remained no-Practice-controls/no-Hard-Mode-lobby-controls and claim-safe.
- Solved puzzles 1-4.
- Submitted wrong final-puzzle guesses `slate`, `crane`, `brisk`, and `cigar`.
- Remote probe confirmed the game stayed `playing` after those wrong final-puzzle turns.
- Submitted the correct final answer.
- Remote probe confirmed `status = won`, durable move history included the final correct answer, and both player sessions contained the final solution row.
- Browser check confirmed `Advancing to final results` with terminal definitions/results still withheld during the hold.

Remote cleanup:

- Temporary `async_multiplayer_games` rows were deleted.
- Temporary Daily claim rows were deleted.
- Temporary auth users were deleted.
- Generated Playwright CLI artifacts were removed from the worktree.

## Full Verification Gate

Full verification passed:

- `npm run lint`
- `npm run test` — 488 tests passing
- `npm run build` — succeeded with the existing large-chunk advisory
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Desktop browser smoke — no new console errors or horizontal overflow
- Tablet-like browser smoke — no new console errors or horizontal overflow
- 390px mobile browser smoke — no new console errors or horizontal overflow

## Resource And Process Safety

Stage 18 used one Vite dev server for browser verification. It was stopped after the browser checks.

Browser contexts and Playwright CLI sessions were closed. Final resource checks found no Stage 18-owned runaway dev-server or browser process. The unrelated Python listener on `127.0.0.1:8765` was present before Stage 18 and was not touched.

## Invariant And Scope Confirmation

Preserved:

- Stage 12 Practice Multiplayer Hard Mode, keyboard, sound, stale-save, timed Practice, and scoring/result wins.
- Stage 13 Practice solo and Multiplayer GO solved-row coordination wins.
- Stage 14 hidden/inert Multiplayer foundations, Calendar/Practice entry points, nonparticipant guard, and unified repository path.
- Stage 15 GO prior-puzzle visibility, authenticated Practice seeds, and Daily determinism.
- Stage 16 Practice Multiplayer GO prior-solution stack and keyboard-state projection.
- Stage 17 Solo Practice GO Customize lock behavior.
- Daily Multiplayer strict async, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-lobby-control, answer-separated, claim-safe invariants.
- `playerSessions` as canonical per-viewer multiplayer state.
- Shared `serializedSession` as compatibility/answer plumbing only.
- Solo Practice OG behavior and Daily OG/GO deterministic selection.
- No scoring/rating/ELO rule changes.

## Gate

Stage 18 is complete for user review under `phase_id = 136`.

Next step: the user may review the completed Stage 18 state and explicitly authorize any PR, merge, release, production deployment, Phase 24 work, or other later-phase action when ready.
