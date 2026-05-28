# Progress Step Report — Phase 17.0

## Step
- **Major step / phase**: Phase 17.0 — Pre-flight, baseline capture, reconciliation note (LOCAL-WORD-LISTS-SPEC-2026-05-28)
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §22.4 row 17.0
- **Report file**: `progress/PROGRESS-STEP-29.md`
- **Date updated**: 2026-05-28T05:04:22Z
- **Status**: Completed — Continuing to Phase 17.1 per user authorization

## Summary of Changes
- Read-only verification pass. No source files modified.
- Confirmed baseline at `HEAD` (`cf50051`) is clean: lint, test (256/256), build, and `npx tsc -p tsconfig.api.json --noEmit` all green; `git diff --check` clean.
- Confirmed the 34 authoritative per-length JSON files exist at `src/latest/words_length_2.json` through `src/latest/words_length_35.json`, plus `manifest.json`, `README.md`, and the transitional length-5 compatibility files `brrrdle_words.json` / `brrrdle_words.txt`.
- Inspected `src/latest/manifest.json` (`dataset: english-openlist-brrrdle`, `schema_version: 2.0`, `release_date: 2026-05-28`, `generated_at: 2026-05-28T01:39:10.899912+00:00`, `supported_word_lengths: 2..35`, `total_word_count: 378658`).
- Inspected representative per-length file (`words_length_5.json`): top-level keys are `metadata.curation`, `answers` (curated `string[]`, length 2175), `validGuesses` (`string[]`, length 9776 = full per-length count). Matches §22.2 diagnosis.

## Path Reconciliation Decision (per §22.1)
- **Spec text refers to `src/latest/brrrdle/`** (LOCAL-WORD-LISTS-SPEC-2026-05-28.md).
- **Repository as-committed places the 34 files directly at `src/latest/`** (verified at HEAD).
- **Decision**: keep the on-disk layout at `src/latest/` as authoritative. The single loader-path constant in `src/data/localWordLists.ts` (to be added in 17.1) will encode this path. The spec wording will be quoted in the CHANGELOG entry and Phase 17 progress notes so the discrepancy is auditable. No `git mv` performed — rationale: avoids unnecessary churn and keeps the diff strictly additive at the source-tree level.
- Loader will read only `words_length_N.json` filenames. The transitional `brrrdle_words.json` and `brrrdle_words.txt` length-5 compatibility files are intentionally ignored.

## Files Changed
- None. Phase 17.0 is read-only.

## Verification
- **Checks run**:
  - `npm ci` — clean (208 packages, 0 vulnerabilities).
  - `npm run lint` — clean.
  - `npm run test` — 256/256 passing across 44 test files.
  - `npm run build` — clean. Baseline gameplay bundle: `dist/assets/index-CGdt0r1N.js` = 1,265,046 bytes (1.265 MB) gzipped to ~412 kB; CSS 48.55 kB.
  - `npx tsc -p tsconfig.api.json --noEmit` — clean.
  - `git diff --check` — clean.
  - Bundle-leak baseline grep:
    - `grep -l "@vercel/blob" dist/assets/*.js` — no matches.
    - `grep -l "huggingface.co" dist/assets/*.js` — **matches in `dist/assets/index-CGdt0r1N.js`** (pre-existing at HEAD, since `src/data/index.ts` re-exports `huggingFaceSource`/`refresh`/`refreshStore`/`updateCheck` and the entire app currently builds as a single chunk). Phase 17 will treat this as a baseline to not regress; mitigation options for true gameplay/admin chunk separation are out of scope per §22.8 and the §22.4 17.3 row scoped to JSDoc-only edits.
  - File inventory: `ls src/latest/words_length_*.json | wc -l` = 34.
- **Checks not run**: CodeQL (no code changes in 17.0; will be run after 17.3).
- **Reason any checks were skipped**: Read-only pre-flight; nothing to scan.

## Blockers, Errors, or Critical Notes
- None.

## User Action Required Before Next Step
- None. User already explicitly authorized contiguous execution through 17.5.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 17.1 — Add local source loader & metadata adapter.
- **Exact approval needed, if any**: Already granted (user explicitly approved Phase 17).

## Additional Notes / Annotations
- Per §22.6, Phase 17 must not delete files or weaken tests, and must preserve daily 5-letter lock, practice 2..35, admin tab, `/api/admin-refresh`, and all auth/Word-Explorer/Feedback/SFX/PWA/responsive features.
- Per §22.5.5, the `huggingface.co` string in gameplay bundle is a pre-existing condition; Phase 17 only needs to ensure it does not regress further.
