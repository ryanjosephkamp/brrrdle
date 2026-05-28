# Progress Step Report — Phase 17.1

## Step
- **Major step / phase**: Phase 17.1 — Add local source loader & metadata adapter (LOCAL-WORD-LISTS-SPEC-2026-05-28)
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §22.4 row 17.1
- **Report file**: `progress/PROGRESS-STEP-30.md`
- **Date updated**: 2026-05-28T05:07:30Z
- **Status**: Completed — Continuing to Phase 17.2

## Summary of Changes
- Added new module `src/data/localWordLists.ts`:
  - Static-imports the 34 authoritative per-length JSONs from `src/latest/words_length_2.json`..`src/latest/words_length_35.json` plus `src/latest/manifest.json` via Vite's JSON import attribute (`with { type: 'json' }`).
  - Exports `LOCAL_WORD_LISTS` (record keyed by length), `LOCAL_WORD_LIST_LENGTHS`, `LOCAL_WORD_LISTS_MANIFEST`, `LOCAL_WORD_LISTS_SOURCE_PATH = 'src/latest'`, and the `normalizeLocalWordListFile(raw, length)` adapter.
  - The adapter synthesizes the legacy `WordListMetadata` block (`length`, `source = 'src/latest (english-openlist-brrrdle <release_date>)'`, `version = manifest.release_date`, `generatedAt = manifest.generated_at`) and preserves the raw `metadata.curation` block on the new optional `WordListMetadata.curation` field. `answers` and `validGuesses` are passed through unchanged so the canonical `validateWordListFile` continues to do the heavy validation.
  - Spec-vs-disk path reconciliation (§22.1) is encoded by the single `LOCAL_WORD_LISTS_SOURCE_PATH` constant. Transitional length-5 compatibility files at `src/latest/` (`brrrdle_words.json`, `brrrdle_words.txt`) are intentionally ignored.
- Added new test file `src/data/localWordLists.test.ts` (10 new tests):
  - Manifest projection (dataset, schema version, release date, generated at, supported word lengths).
  - All lengths 2..35 present in `LOCAL_WORD_LISTS` and `LOCAL_WORD_LIST_LENGTHS`.
  - `LOCAL_WORD_LISTS_SOURCE_PATH` pinned to `'src/latest'`.
  - `normalizeLocalWordListFile` synthesises metadata and preserves the `curation` block for length 5.
  - Canonical schema accepts the adapted payload for representative lengths 2, 5, 12, 20, 35.
  - Every length 2..35 in `LOCAL_WORD_LISTS` passes the canonical schema.
  - Sampled answer/valid-guess counts match the raw per-length JSON contents (5, 12, 20).
  - A deliberately malformed local payload (missing `validGuesses`, wrong-length answer) is rejected by `validateWordListFile`, exercising the `'invalid-bundled-list'` failure surface that `loadBundledWordList` will surface in 17.2.
  - Sanity guess `'house'` exists in the length-5 valid-guess list — the §22.2 "ordinary words now validate" expectation is testable right now from the local source.
  - Regression guard: `loadBundledWordList('daily', 5)` and `loadBundledWordList('practice', 35)` are still failure-free at 17.1 (the current bundled source is not yet re-pointed — that happens in 17.2).
- Additive edit to `src/data/types.ts`: `WordListMetadata` gains an optional `curation?: Readonly<Record<string, unknown>>` field. No existing field changed. All existing consumers ignore unknown fields.
- Additive edit to `src/data/wordListSchema.ts`: when the validated metadata carries a `curation` record, it is preserved on the returned `WordListFile.metadata`. No existing check removed or weakened; non-record `curation` values are silently dropped (existing behaviour for unknown fields).

## Files Changed
- New: `src/data/localWordLists.ts`
- New: `src/data/localWordLists.test.ts`
- Modified (additive only): `src/data/types.ts`
- Modified (additive only): `src/data/wordListSchema.ts`
- Updated: `progress/PROGRESS.csv` (appended `phase_id=30` row)
- New: `progress/PROGRESS-STEP-30.md` (this file)
- Updated: `CHANGELOG.md`

## Verification
- **Checks run**:
  - `npm run lint` — clean.
  - `npm run test` — 266/266 passing across 45 test files (+10 new tests in `src/data/localWordLists.test.ts`, no existing test removed/skipped/weakened).
  - `npm run build` — clean. Gameplay bundle: `dist/assets/index-BsDfnvcG.js` = 1,265,080 bytes (baseline 1,265,046; delta +34 bytes, +0.003%). Tree-shaking elides the new `LOCAL_WORD_LISTS` until 17.2 wires it in.
  - `npx tsc -p tsconfig.api.json --noEmit` — clean.
  - `git diff --check` — clean.
  - Bundle-leak grep:
    - `grep -l "@vercel/blob" dist/assets/*.js` — no matches (preserved).
    - `grep -c "huggingface.co" dist/assets/*.js` — 1 (pre-existing single occurrence at baseline; no regression).
- **Checks not run**: CodeQL (deferred to after 17.3 per §22.5 §9).
- **Reason any checks were skipped**: Per plan; CodeQL runs once on the full Phase 17 change set after 17.3 closes.

## Blockers, Errors, or Critical Notes
- None.

## User Action Required Before Next Step
- None.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 17.2 — Re-point `BUNDLED_WORD_LISTS` to local source; update `src/data/bundled/source.json` historical seed note.
- **Exact approval needed, if any**: Already granted (user explicitly approved Phase 17).

## Additional Notes / Annotations
- The `normalizeLocalWordListFile` adapter is intentionally tolerant of partial inputs so that schema rejection happens in the canonical validator — this preserves the existing `'invalid-bundled-list'` failure reason as the sole surface for malformed local data (per §22.1's "preferred is to reuse `'invalid-bundled-list'`").
- The optional `WordListMetadata.curation` field is purely additive; existing tests that compare against the metadata shape (none assert exact equality on metadata) remain valid.
- No new runtime dependency, no new env var, no service-role exposure, no `@vercel/blob` introduction, no UI change.
