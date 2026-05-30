# Progress Step Report — Phase 18.6

## Step
- **Major step / phase**: Phase 18.6 — Word Explorer difficulty column + Define modal
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §23.7, §23.10 (`phase_id = 42`)
- **Report file**: `progress/PROGRESS-STEP-42.md`
- **Date updated**: 2026-05-30
- **Status**: Completed — continuing to Phase 18.7

## Summary of Changes
- `WordExplorerEntry` now carries `difficulty?: DifficultyTier`, computed via `classifyAnswerTier(length, word)` (the minimal tier the word belongs to as an answer; `undefined` for valid-guess-only words). `buildWordExplorerEntries` takes the list length to classify.
- Added a sortable **Difficulty** column to the Word Explorer table (and mobile cards) with nested-inclusion labels from a new `difficultyBadgeLabel` helper.
- Added a **Difficulty filter** select that filters rows by tier using nested inclusion (Standard shows Casual + Standard; valid-guess-only excluded from any tier filter).
- Added a per-row **Define** button (desktop + mobile) that opens a `Dialog` hosting the existing `DefinitionPanel` for the selected word.

## Files Changed
- `src/wordExplorer/wordExplorerData.ts` — `difficulty` field; difficulty filter/sort; `difficultyBadgeLabel`; `buildWordExplorerEntries(file, length)`.
- `src/wordExplorer/WordExplorerPanel.tsx` — difficulty filter control, Difficulty column, Define button + Definitions dialog.
- `src/wordExplorer/wordExplorerData.test.ts` — 6 new tests.

## Verification
- **Checks run**: `npm run lint` (clean); `npm run test` (286/286, 6 new, 0 removed/skipped/weakened); `npm run build` (clean); `npx tsc -p tsconfig.api.json --noEmit` (clean); `git diff --check` (clean); client-bundle leak grep against `dist/` — no `@vercel/blob`, no `service_role`, Hugging Face occurrences unchanged from the Phase 17 baseline (1, pre-existing).
- **Checks not run**: CodeQL (deferred to the 18.9 release gate).
- **Reason any checks were skipped**: none material.

## Blockers, Errors, or Critical Notes
- For the live word-list source, difficulty classification is computed against the in-repo bundled difficulty model for the same length (the tiers are defined by the in-repo heuristic). Words not present in that model show as "Valid guess only", which is the correct fallback.

## User Action Required Before Next Step
- None (contiguous execution authorized).

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 18.7 — Go per-puzzle definitions + Hide/Show + practice-only Reveal.
- **Exact approval needed, if any**: None.

## Additional Notes / Annotations
- Invariants preserved: difficulty is answer-only metadata; valid guesses untouched; the Define modal reuses the existing definition service with no new network sinks.
