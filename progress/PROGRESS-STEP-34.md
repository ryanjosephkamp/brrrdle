# Progress Step Report — Phase 17.5

## Step
- **Major step / phase**: Phase 17.5 — Progress tracking, CHANGELOG, halt for user approval (LOCAL-WORD-LISTS-SPEC-2026-05-28)
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §22.4 row 17.5 + §22.9 + §22.10
- **Report file**: `progress/PROGRESS-STEP-34.md`
- **Date updated**: 2026-05-28T05:19:00Z
- **Status**: Completed — **Phase 17 complete. Awaiting user review and merge.**

## Summary of Changes
- Final progress-tracking and CHANGELOG sweep per §22.9.
- No source-code changes.

## Files Changed (in 17.5)
- New: `progress/PROGRESS-STEP-34.md` (this file)
- Updated: `progress/PROGRESS.csv` (appended `phase_id=34` row)
- Updated: `CHANGELOG.md` — final Phase 17 summary block

## Phase 17 Aggregate Outcome

### What was delivered (17.0 → 17.4)
1. **New local-source loader** (`src/data/localWordLists.ts`) that statically imports the 34 authoritative per-length JSONs at `src/latest/words_length_2.json`..`src/latest/words_length_35.json` plus `src/latest/manifest.json`, synthesizes the legacy `WordListMetadata` block, and exposes `LOCAL_WORD_LISTS`, `LOCAL_WORD_LIST_LENGTHS`, `LOCAL_WORD_LISTS_MANIFEST`, `LOCAL_WORD_LISTS_SOURCE_PATH`, and `normalizeLocalWordListFile`.
2. **Additive type & schema edits** — optional `WordListMetadata.curation?` field + canonical schema propagates it when present.
3. **Re-pointed gameplay source** — `src/data/wordLists.ts` is now a thin re-export of `LOCAL_WORD_LISTS` aliased as `BUNDLED_WORD_LISTS`. All downstream code (`loadBundledWordList`, `wordRepository`, schema validator, refresh store, admin route) is untouched.
4. **Seed-definition merge** — the small set of inline `answers[].definitions` from `src/data/bundled/words_length_{2,5}.json` (only `go` and `crane`) is merged into the local source so the existing definition-surface tests continue to pass.
5. **Build-config code-split** — `vite.config.ts` `manualChunks` splits the 34 per-length JSONs into dedicated `word-list-N-[hash].js` chunks; main gameplay chunk shrinks **−56.46 %** vs baseline.
6. **HF deprecation banners** — JSDoc `@deprecated` banners added to `src/data/huggingFaceSource.ts`, `src/data/refresh.ts`, `src/data/refreshStore.ts`, `src/data/updateCheck.ts`, and `api/admin-refresh.ts`. No logic changed; admin override remains fully functional.
7. **Historical-seed note** — `src/data/bundled/source.json.note` updated per §22.6.
8. **34 progress artifacts updated** (CSV rows `phase_id=29..34`, six `PROGRESS-STEP-{29..34}.md` reports, CHANGELOG entries for 17.0, 17.1, 17.2, 17.3, 17.4, and 17.5).
9. **+10 new tests**, +1 fixture update (real 35-letter word). Final: **266/266 tests passing across 45 test files**.

### Files added/modified across Phase 17
- New: `src/data/localWordLists.ts`
- New: `src/data/localWordLists.test.ts`
- Modified: `src/data/types.ts` (additive — optional `curation?`)
- Modified: `src/data/wordListSchema.ts` (additive — propagate `curation` when present)
- Modified: `src/data/wordLists.ts` (thin re-export of local source)
- Modified: `src/data/bundled/source.json` (historical-seed note)
- Modified: `src/data/wordRepository.test.ts` (length-35 fixture updated to real word)
- Modified: `vite.config.ts` (`manualChunks` for per-length JSONs)
- Modified: `src/data/huggingFaceSource.ts` (JSDoc only)
- Modified: `src/data/refresh.ts` (JSDoc only)
- Modified: `src/data/refreshStore.ts` (JSDoc only)
- Modified: `src/data/updateCheck.ts` (JSDoc only)
- Modified: `api/admin-refresh.ts` (JSDoc only)
- Updated: `progress/PROGRESS.csv` (rows 29..34)
- Updated: `CHANGELOG.md`
- New: `progress/PROGRESS-STEP-29.md` .. `progress/PROGRESS-STEP-34.md`

### §22.10 Phase 17 Exit Checklist
- [x] All §22.2 diagnoses are demonstrably resolved (daily and practice 2–35 load real local content; ordinary words like `house` now validate; metadata is synthesized through the canonical schema; the malformed-file path still surfaces `'invalid-bundled-list'`).
- [x] All §22.6 invariants verified intact (see PROGRESS-STEP-33.md).
- [x] All §22.5 verification items green or documented-deviation (§22.5 §3 total-payload growth and §22.5 §5 main-chunk HF occurrence both resolved in favour of §22.6 non-negotiable invariants; documented in PROGRESS-STEP-31.md, PROGRESS-STEP-32.md, and PROGRESS-STEP-33.md).
- [x] `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, and `CHANGELOG.md` updated and free of sensitive data.
- [x] Halt for explicit user approval before any production release action.

## Verification (final pass)
- Already executed and documented in PROGRESS-STEP-33.md.

## Blockers, Errors, or Critical Notes
- None.

## User Action Required Before Next Step
- **Review the PR**: changes are focused, surgical, and additive; no file was deleted; no test was removed/skipped/weakened.
- **Confirm acceptance of the documented plan-vs-implementation deviations** (see PROGRESS-STEP-31.md "Blockers/Critical Notes" and PROGRESS-STEP-33.md "§22.5 Verification Results"):
  1. §22.3 "definitionsByWord becomes an empty Map for the local-source path" was relaxed via the seed-definition merge so the existing `wordRepository`/`definitionService` "bundled definitions" tests continue to pass. This preserves §22.6 "no test removal/skip/weakening". Net effect: the local source carries inline definitions for `go` (length 2) and `crane` (length 5); for all other ~378k local words, the post-game Definitions System falls back through Dictionary API → Wiktionary → Google as §22.3 describes.
  2. §22.5 §3 "+20% total-payload growth → code-split (loader becomes async for non-daily lengths)" was satisfied at the *main entry chunk* level (**−56.46 %** vs baseline) via build-config `manualChunks` without changing loader signatures. The *total* payload necessarily grew by +356 % because the local source carries 378,658 real curated words vs the historical seed's ~hundreds. A signature-changing async refactor would have violated §22.6.
  3. §22.5 §5 "gameplay chunks must not contain any HF URL" was already violated at baseline HEAD (single chunk contained HF URL). Phase 17 does not regress this; 17.3 added JSDoc deprecation banners as scoped in §22.4. Full removal would require deleting the HF modules (forbidden by §22.6 "No file deletion") or removing them from the `src/data/index.ts` barrel (forbidden by §22.6 "barrel exports preserved").

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: N/A — Phase 17 is the current phase and is now complete.
- **Next major step**: User review and merge of the PR.
- **Exact approval needed, if any**: Explicit user approval before any production release / merge.

## Additional Notes / Annotations
- The pull request branch is `copilot/brrrdle-auth-improvements-review` (continuation of the prior session).
- No new dependency was added, no new environment variable was introduced, no service-role credential reaches the client, and `@vercel/blob` remains absent from the client bundle.
- The user-facing impact on first paint is **faster** than baseline (main JS chunk is 56 % smaller); the user-facing impact on first-game responsiveness depends on browser parallel fetch of the relevant `word-list-N-[hash].js` chunk, which the modulepreload hints in `dist/index.html` already cover.
