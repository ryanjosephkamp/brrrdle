# Progress Step Report — Residual Vercel TypeScript Build Fix

## Step
- **Major step / phase**: Residual Phase 12 Vercel build-error fix — `VERCEL-REDEPLOY-BUILD-LOGS-2026-05-26.md`
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §17, especially Steps 12U.2, 12U.6, and 12U.7
- **Report file**: `progress/PROGRESS-STEP-16.md`
- **Date updated**: 2026-05-27
- **Status**: Completed locally — awaiting clean Vercel rebuild

## Summary of Changes
- Made the remaining `src/data/` imports and `src/data/index.ts` barrel exports explicit-ESM compatible by adding `.js` extensions to relative TypeScript imports/exports.
- Added NodeNext-compatible `with { type: 'json' }` import attributes to bundled JSON imports in `src/data/metadata.ts`, `src/data/wordLists.ts`, and JSON-consuming data tests.
- Tightened `src/data/loadWordList.ts` length-resolution typing and branch narrowing so TypeScript cannot infer a successful length-resolution object as a `LoadWordListResult` without `wordList`.
- Verified `api/` imports already used explicit `.js` extensions and added a focused NodeNext reproduction typecheck for `api/**/*.ts`, which exercises the `api/` → `src/data/` boundary that Vercel reported.
- Updated `CHANGELOG.md` under Unreleased with a Fixed entry referencing `DIAGNOSIS-REPORT-2026-05-26.md` and `VERCEL-REDEPLOY-BUILD-LOGS-2026-05-26.md`.

## Files Changed
- `CHANGELOG.md`
- `src/data/cache.ts`
- `src/data/daily.ts`
- `src/data/huggingFaceSource.ts`
- `src/data/index.ts`
- `src/data/loadWordList.ts`
- `src/data/metadata.ts`
- `src/data/refresh.ts`
- `src/data/refreshStore.ts`
- `src/data/types.ts`
- `src/data/updateCheck.ts`
- `src/data/wordListSchema.ts`
- `src/data/wordLists.ts`
- `src/data/wordRepository.ts`
- `src/data/*.test.ts` import-path/JSON-attribute updates only
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-16.md`

## Verification
- **Checks run**:
  - Baseline before edits: `npm ci`; `npm run lint`; `npm run test`; `npm run build`; `npx tsc -p tsconfig.api.json --noEmit` — all passed.
  - Import audit for `src/data/` and `api/` — passed; no relative TypeScript import/export in those folders is missing `.js`, and JSON imports have `type: 'json'` attributes.
  - `codeql_checker` — passed with 0 JavaScript alerts.
  - Final verification: `npm ci` — passed, 0 vulnerabilities.
  - Final verification: `npm run lint` — passed.
  - Final verification: `npm run test` — passed, 33 files / 120 tests.
  - Final verification: `npm run build` — passed (`tsc -b && vite build`); Vite chunk-size warning remains non-fatal and pre-existing.
  - Final verification: `npx tsc -p tsconfig.api.json --noEmit` — passed.
  - Final verification: focused Vercel-style API NodeNext typecheck with `/tmp/brrrdle-tsconfig-api-nodenext.json` — passed.
  - Final verification: client-bundle leak check `! grep -R "@vercel/blob" dist/assets/*.js` — passed.
  - Final verification: `git diff --check` — passed.
- **Checks not run**:
  - Live Vercel deploy/build.
- **Reason any checks were skipped**:
  - The agent sandbox does not have Vercel project credentials. The local NodeNext reproduction check covers the TypeScript error class from the supplied Vercel logs.

## Blockers, Errors, or Critical Notes
- No code blockers are known.
- A real Vercel build still needs to be triggered by the user or deployment automation after these changes are pushed.

## User Action Required Before Next Step
- Trigger a clean Vercel rebuild against the latest commit and confirm the TypeScript errors from `VERCEL-REDEPLOY-BUILD-LOGS-2026-05-26.md` no longer appear.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes. Final local verification and CodeQL completed successfully.
- **Next major step**: Clean Vercel rebuild / standard release review.
- **Exact approval needed, if any**: User approval before any production release action.

## Additional Notes / Annotations
- No features, unrelated refactors, dependency changes, test weakening, strictness relaxation, or client-side Vercel Blob imports were introduced.
