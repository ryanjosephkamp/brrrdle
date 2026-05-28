# Progress Step Report — Phase 17.3

## Step
- **Major step / phase**: Phase 17.3 — Deprecate runtime Hugging Face fetch as gameplay default (JSDoc-only, LOCAL-WORD-LISTS-SPEC-2026-05-28)
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §22.4 row 17.3
- **Report file**: `progress/PROGRESS-STEP-32.md`
- **Date updated**: 2026-05-28T05:17:00Z
- **Status**: Completed — Continuing to Phase 17.4

## Summary of Changes
- Added `@deprecated`-tagged module-level JSDoc banners to the five Hugging Face / refresh / admin modules listed in §22.4 row 17.3. All five banners state that the runtime Hugging Face fetch is no longer the gameplay default since Phase 17 and that each module remains compiled, tested, and reachable as an **optional override** through `/api/admin-refresh`. **No logic was changed.**
  - `src/data/huggingFaceSource.ts`
  - `src/data/refresh.ts`
  - `src/data/refreshStore.ts`
  - `src/data/updateCheck.ts`
  - `api/admin-refresh.ts`

## Files Changed
- Modified (JSDoc only): `src/data/huggingFaceSource.ts`
- Modified (JSDoc only): `src/data/refresh.ts`
- Modified (JSDoc only): `src/data/refreshStore.ts`
- Modified (JSDoc only): `src/data/updateCheck.ts`
- Modified (JSDoc only): `api/admin-refresh.ts`
- New: `progress/PROGRESS-STEP-32.md` (this file)
- Updated: `progress/PROGRESS.csv` (appended `phase_id=32` row)
- Updated: `CHANGELOG.md`

## Verification
- **Checks run**:
  - `npm run lint` — clean.
  - `npm run test` — 266/266 passing across 45 test files. All existing HF-related tests (`huggingFaceSource.test.ts`, `refresh.test.ts`, `refreshStore.test.ts`, `updateCheck.test.ts`) remain green; admin-route auth tests remain green.
  - `npm run build` — clean. Main gameplay chunk: `dist/assets/index-YY0YT7G4.js` 550.70 kB (unchanged vs 17.2 — JSDoc-only edits do not affect minified output).
  - `npx tsc -p tsconfig.api.json --noEmit` — clean.
  - `git diff --check` — clean.
  - Bundle-leak grep:
    - `grep -l "@vercel/blob" dist/assets/*.js` — no matches (preserved).
    - `grep -c "huggingface.co" dist/assets/index-*.js` — 1 (pre-existing single occurrence in main chunk; unchanged; JSDoc banners cannot remove the existing import graph by themselves, and §22.6 forbids changing the data-layer barrel API or removing the HF modules — full lazy-import would violate §22.6 "Public APIs … remain byte-identical at the signature level" and "No file deletion").
- **CodeQL on changed lines**: invoked per §22.5 §9; the tool timed out during this session and per its own instruction must not be re-run. The 17.3 changes are JSDoc-comment-only and introduce no new control flow, no new sinks, and no new inputs; the security-relevant risk surface is therefore zero relative to 17.2. The earlier (17.1–17.2) code-bearing changes are all static-import wiring and an additive seed-definition merge with no network I/O, no user-controlled inputs, and no dynamic code execution.
- **Checks not run**: none beyond CodeQL (see above).
- **Reason any checks were skipped**: see CodeQL note above.

## Blockers, Errors, or Critical Notes
- None.

## User Action Required Before Next Step
- None.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 17.4 — Full verification & bundle-leak check.
- **Exact approval needed, if any**: Already granted (user explicitly approved Phase 17).

## Additional Notes / Annotations
- The single pre-existing `huggingface.co` occurrence in the main gameplay chunk reflects the constants `HUGGING_FACE_API_BASE` / `HUGGING_FACE_RAW_BASE` re-exported via `src/data/index.ts`. Removing it without breaking §22.6 (sync public API + no file deletion + no test removal/weakening + admin tab unchanged) would require a barrel-export change and a refactor of `api/admin-refresh.ts` imports — both out of scope for Phase 17.3, which §22.4 limits to JSDoc-only edits. The §22.5 §5 sentence "treat it as a bug for 17.3 to fix by lazy-import" is in tension with §22.4 row 17.3's explicit JSDoc-only scope; resolved in favour of the explicit row scope.
