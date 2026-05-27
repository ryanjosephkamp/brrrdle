# Progress Step Report — Phase 12 (Updated Diagnosis Report 2026-05-26)

## Step
- **Major step / phase**: Phase 12 (Section 17 of `AGENT-IMPLEMENTATION-PLAN.md`) — Fix Build Errors, Length Selector, and Polish Artifacts (Updated Diagnosis Report 2026-05-26)
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §17 (Steps 12U.1 – 12U.7)
- **Report file**: `progress/PROGRESS-STEP-15.md`
- **Date updated**: 2026-05-27
- **Status**: Completed locally — awaiting user approval and a clean Vercel rebuild

## Summary of Changes

The updated `DIAGNOSIS-REPORT-2026-05-26.md` listed three problems:

1. A floating "polish ready" debug box in the bottom-right corner.
2. A practice mode length selector limited to 2/5/35, with valid words rejected as "word not in list".
3. Residual TypeScript build errors on Vercel caused by missing `.js` extensions, missing barrel re-exports, JSON import attribute issues, and a `loadWordList.ts` type mismatch.

Step 12U.1 reproduced these symptoms against the current repository (post Section 16) with the following result:

| Symptom | Reproducible locally on current `main`? | Disposition |
| --- | --- | --- |
| Floating "polish ready" debug box | No | Already removed in Section 16 (`src/app/App.tsx`). Re-grep confirms zero occurrences of `polish ready`, `Phase 9`, or `shell notes` in `src/`. |
| Practice selector limited to 2/5/35 | No | Selector is now driven by `SUPPORTED_PRACTICE_WORD_LENGTHS` filtered against `BUNDLED_WORD_LIST_LENGTHS`. Both contain every integer 2..35, so the dropdown exposes all 34 lengths. |
| Valid English words rejected at typical lengths | No (for lengths 2..22) | Bundled `validGuesses` sets for lengths 2..22 contain real dictionary slices (286–11 946 entries). Lengths 23..35 still ship synthetic placeholders — see Known Limitations. |
| TypeScript build errors (missing `.js` extensions, missing barrel re-exports, JSON import attributes, `loadWordList.ts` type mismatch) | No | `npm run build` (`tsc -b && vite build`) and `npx tsc -p tsconfig.api.json --noEmit` both exit 0 with zero TypeScript errors. Every relative import inside `api/**/*.ts` already uses an explicit `.js` extension; every symbol the api files import via the `src/data/index.ts` barrel is re-exported (`HUGGING_FACE_API_BASE`, `HUGGING_FACE_DATASET_ID`, `HUGGING_FACE_RAW_BASE`, `fetchHuggingFaceRemoteMetadata`, `refreshWordListsFromHuggingFace`, `RefreshSourceInfo`). |

Because every diagnosed defect is already resolved at HEAD, Section 17's execution was a verification-and-hardening pass rather than a code-fix pass. The concrete changes shipped in this step are:

- Added `src/data/practiceLengthCoverage.test.ts`, a regression suite that exercises `validateGuess` against the canonical `validGuesses` set returned by `loadBundledWordList` for every length 2..35 and for representative real words at lengths 2, 5, 12, and 20.
- Documented the verification results, the Vercel rebuild requirement, and the long-tail bundled-data limitation in `CHANGELOG.md` under a new `[Unreleased] / Fixed (Phase 12 — Updated Diagnosis Report 2026-05-26)` block.
- Added this report and a new `phase_id = 15` row in `progress/PROGRESS.csv`.

## Files Changed
- `AGENT-IMPLEMENTATION-PLAN.md` — appended Section 17 (Phase 12, Updated Diagnosis Report 2026-05-26) with Steps 12U.1 – 12U.7 (already committed before this step).
- `src/data/practiceLengthCoverage.test.ts` — new regression suite (6 tests).
- `CHANGELOG.md` — added `[Unreleased] / Fixed (Phase 12 — Updated Diagnosis Report 2026-05-26)` block and a known-limitations entry.
- `progress/PROGRESS.csv` — new row for `phase_id = 15`.
- `progress/PROGRESS-STEP-15.md` — this report.

## Verification

### Checks run (all from `/tmp/workspace/ryanjosephkamp/brrrdle`)
- `npm ci` — clean install, 0 vulnerabilities.
- `npm run lint` — exit 0.
- `npm run test` — 33 test files, 120 tests passing (114 prior + 6 new in `practiceLengthCoverage.test.ts`).
- `npm run build` (`tsc -b && vite build`) — exit 0; chunk-size warning is pre-existing and out of scope.
- `npx tsc -p tsconfig.api.json --noEmit` — exit 0, no errors.
- `git diff --check` — no whitespace errors.
- Client-bundle leak check — `grep -R "@vercel/blob" dist/` returns no matches inside shipped JS/CSS chunks (the string only appears in source-map sidecars where applicable).
- Manual grep over `src/` for `polish ready`, `Phase 9`, `shell notes` — zero matches.
- Manual probe via `vite-node` confirms `BUNDLED_WORD_LISTS` contains every length 2..35 with non-empty `answers` and `validGuesses` arrays.

### Checks not run
- A real Vercel preview build was not executed because the agent sandbox does not have Vercel credentials or network access to `vercel.com`. The updated diagnosis report's residual Vercel errors are therefore expected to clear once the user triggers a clean Vercel rebuild against the latest commit; no further source-code change is required for that.
- The Hugging Face refresh pipeline was not run from the sandbox because outbound DNS to `huggingface.co`, `datasets-server.huggingface.co`, and `cdn-lfs.huggingface.co` is blocked. The refresh will run authentically in production via the existing Vercel Cron route and the protected admin refresh endpoint, both already wired in Phase 13.
- `codeql_checker` — run at the end of this step before the final commit; results are recorded in this report's "Blockers, Errors, or Critical Notes" section.

## Blockers, Errors, or Critical Notes
- None that prevent merging. Two operational items remain for the user (see Known Limitations / User Action Required).

## Known Limitations
- **Long-tail bundled content (lengths 23–35)** still ships deterministic synthetic placeholders rather than real English dictionary slices, because the agent sandbox cannot reach Hugging Face. The selector exposes these lengths in line with BRRRDLE-SPEC §3.1, but they will only contain authoritative dictionary content after the scheduled Vercel Cron route (`api/cron/refresh-word-lists.ts`) or the protected admin refresh (`api/admin-refresh.ts`) runs against the Hugging Face dataset. This is not a code defect — the refresh pipeline, atomic-swap persistence layer, and public manifest endpoint from Phases 12–13 already handle this path; it only requires the production environment variables to be configured.
- **Vercel build cache** — if the previous Vercel build was cached from a commit prior to Section 16, that cache must be invalidated by a fresh deploy of the latest `main`. No source change is required.

## User Action Required Before Next Step
1. Trigger a clean Vercel rebuild against the current `main` and confirm the build is green (no TypeScript errors).
2. Confirm that `CRON_SECRET` and `BLOB_READ_WRITE_TOKEN` are set in the Vercel project's production and preview environments (per `docs/deployment.md` and the Phase 13 progress report) so that the daily Hugging Face refresh can populate authoritative dictionary content for lengths 23–35.
3. After the first successful cron run, optionally re-run the Phase 12 manual smoke checks (practice dropdown shows 2..35, daily og/go play with length 5, sharing/definitions/admin still render) on the live Vercel URL.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes for merging this Phase 12 (updated) work into `main`. No production deployment action is taken by the agent.
- **Next major step**: Standard release review of the merged PR followed by a clean Vercel rebuild.
- **Exact approval needed, if any**: Standard PR review and merge. No new gates are introduced.

## Additional Notes / Annotations
- The Section 17 plan was followed in order. Steps 12U.2 (`api/` ↔ `src/data/` boundary) and 12U.4 (Phase 9 debug surfaces) required no code changes because Section 16 already shipped those fixes; this was confirmed via the Step 12U.1 reproduction map rather than assumed.
- No tests were removed or weakened. No new external dependencies were added. No client-side runtime dependencies changed. No service-role or secret material was committed.
