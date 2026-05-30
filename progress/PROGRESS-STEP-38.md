# Progress Step Report — Phase 18.2

## Step
- **Major step / phase**: Phase 18.2 — Difficulty-tier data model & answer-subset logic
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §23.4, §23.10 (`phase_id = 38`)
- **Report file**: `progress/PROGRESS-STEP-38.md`
- **Date updated**: 2026-05-30
- **Status**: Completed — continuing to Phase 18.3

## Summary of Changes
- Added a new `src/data/difficulty/` module implementing the difficulty-tier model, a deterministic in-repo word-quality heuristic, and the nested answer-subset derivation. Tiers subset the `answers` pool only; `validGuesses` is always the full per-length list.
- Threaded an **additive, defaulted** `difficulty?: DifficultyTier` through the answer-selection path (`getWordRepository`, `getDailyOgPuzzle`, `createDailyOgSetup`/`createPracticeOgSetup`, `createDailyGoSetup`/`createPracticeGoSetup`). Default tier is Expert, so every existing caller and test reproduces today's behaviour.

## Documented Refinement (binding user answer #1)
- The plan (§23.4) floated shipping a curated `standard-5` JSON built from the classic Wordle + Hurdle answer sets for length 5. User answer #1 is the binding decision: **compute tiers in-repo via a deterministic heuristic with no external data dependency.**
- This build therefore applies the nested top-fraction derivation **uniformly across all lengths (including 5)**. Benefits: `Casual ⊆ Standard ⊆ Expert` is provably true at every length; no third-party answer list is embedded; the loader stays forward-compatible with explicit per-word tier tags if a future data regeneration ships them.

## Files Changed
- `src/data/difficulty/tiers.ts` — new: tier type, constants, metadata, guards.
- `src/data/difficulty/heuristic.ts` — new: deterministic pure quality scorer (`stratified_quality_score_v1` weights).
- `src/data/difficulty/subset.ts` — new: nested subset derivation, memoised; `getTierAnswerWords`, `getAnswerSubset`, `classifyAnswerTier`.
- `src/data/difficulty/index.ts` — new: barrel.
- `src/data/difficulty/subset.test.ts` — new tests (nesting invariant, scaling, classification, determinism).
- `src/data/wordRepository.difficulty.test.ts` — new tests (valid-guess identity across tiers, default reproduces Expert, daily lock).
- `src/data/wordRepository.ts` — additive `difficulty` request field; subsets answers, keeps validGuesses full.
- `src/data/daily.ts` — `getDailyOgPuzzle(date, difficulty)`.
- `src/game/og/session.ts`, `src/game/go/session.ts` — setup helpers accept optional tier (default Expert).
- `src/data/index.ts` — export the difficulty barrel.

## Verification
- **Checks run**: `npm run lint` (clean); `npm run test` (279/279, 13 new, 0 removed/skipped/weakened); `npm run build` (clean); `npx tsc -p tsconfig.api.json --noEmit` (clean); `git diff --check` (clean); client-bundle leak grep against `dist/` — no `@vercel/blob`, no `service_role`, Hugging Face URL occurrences unchanged from the Phase 17 baseline (1 in main chunk, pre-existing).
- **Checks not run**: CodeQL (deferred to the 18.9 release gate per the plan; changes are pure data/logic with no new sinks).
- **Reason any checks were skipped**: none material.

## Blockers, Errors, or Critical Notes
- None.

## User Action Required Before Next Step
- None (contiguous execution authorized).

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 18.3 — Settings reorg + global difficulty selector + tooltips.
- **Exact approval needed, if any**: None.

## Additional Notes / Annotations
- Central correctness rule for the phase (valid guesses identical across all three tiers) is now covered by `wordRepository.difficulty.test.ts`.
