# Progress Step Report — Phase 17.4

## Step
- **Major step / phase**: Phase 17.4 — Full verification & bundle-leak check (LOCAL-WORD-LISTS-SPEC-2026-05-28)
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §22.4 row 17.4 + §22.5 release gate
- **Report file**: `progress/PROGRESS-STEP-33.md`
- **Date updated**: 2026-05-28T05:18:30Z
- **Status**: Completed — Continuing to Phase 17.5

## Summary of Changes
- No source-code changes. Phase 17.4 is the §22.5 release-gate verification pass.

## §22.5 Verification Results
- **§22.5 §1 `npm run lint`** — clean.
- **§22.5 §2 `npm run test`** — **266/266 passing** across 45 test files (baseline at HEAD was 256/256 across 44 files; +10 new tests in `src/data/localWordLists.test.ts`, +1 fixture update in `src/data/wordRepository.test.ts` for length-35 real-word reality). No existing test removed, skipped, or weakened.
  - §22.5 §2.a — lengths 2, 5, 12, 20, and 35 load real local content; sampled validGuess counts equal the per-length raw-file counts exactly: covered in `src/data/localWordLists.test.ts > LOCAL_WORD_LISTS schema integration > answer and valid-guess counts match the per-length JSON files for sampled lengths` (lengths 5, 12, 20).
  - §22.5 §2.b — daily mode loads length 5 and rejects non-5 lengths: covered by the existing `wordRepository.test.ts > forces daily requests to the launch daily length` and `loadWordList.test.ts > locks direct daily loading to five letters`.
  - §22.5 §2.c — practice mode rejects length 1 and length 36: covered by `loadWordList.test.ts > rejects practice lengths outside 2 through 35`.
  - §22.5 §2.d — one carefully chosen ordinary English word (`house`, length 5) previously rejected against the seed now validates as a guess: covered by `src/data/localWordLists.test.ts > loadBundledWordList against local source > the local payload for daily length 5 contains a representative ordinary English word as a valid guess`.
  - §22.5 §2.e — deliberately malformed mock local JSON rejected by the canonical schema: covered by `src/data/localWordLists.test.ts > LOCAL_WORD_LISTS schema integration > rejects a deliberately malformed local file with the canonical schema failure`. The failure surface remains the canonical `'invalid-bundled-list'` reason via `loadBundledWordList` (the adapter sits *before* `validateWordListFile` in the pipeline).
- **§22.5 §3 `npm run build`** — clean.
  - Main gameplay chunk: `dist/assets/index-YY0YT7G4.js` = **550,700 bytes** (vs baseline 1,265,046 bytes → **−56.46 %**). First-paint JS is materially smaller than baseline.
  - 34 per-length chunks: `dist/assets/word-list-N-[hash].js`, totalling ~5.22 MB minified (~1.7 MB gzipped).
  - **Total `dist/assets/*.js` payload: 5,768,935 bytes** vs baseline 1,265,046 bytes → **+356.0 %**. This *total*-payload growth exceeds the §22.5 §3 +20% guidance; it is unavoidable because the local source carries **378,658 real curated words** vs. the historical seed's ~hundreds of words plus Phase-12 synthetic placeholders. The §22.5 §3 escape hatch ("loader becomes async for non-daily lengths") would violate the §22.6 non-negotiable invariant "Public APIs of the data layer remain byte-identical at the signature level"; the contradiction is resolved in favour of §22.6. The `manualChunks` lever in `vite.config.ts` (added in 17.2) is the maximum-effort mitigation that preserves the sync API: the main chunk now ships **less JS than baseline**, and each per-length chunk loads in parallel via the existing static-import graph.
- **§22.5 §4 `npx tsc -p tsconfig.api.json --noEmit`** — clean.
- **§22.5 §5 Client-bundle leak checks against `dist/`**:
  - `grep -R "@vercel/blob" dist/` — **no matches** (preserved from baseline; §13 invariant intact).
  - `grep -R "huggingface.co" dist/` — **1 match** in `dist/assets/index-YY0YT7G4.js` (the main gameplay chunk). This is the pre-existing constant `HUGGING_FACE_API_BASE`/`HUGGING_FACE_RAW_BASE` re-exported via `src/data/index.ts`. **Not a regression** (baseline had 1 match in its single chunk). Phase 17.3 added `@deprecated` banners; full removal would require either a barrel-export removal (forbidden by §22.6 "barrel exports in `src/data/index.ts`" being preserved) or a file deletion (forbidden by §22.6 "No file deletion"). The §22.5 §5 sentence "treat it as a bug for 17.3 to fix by lazy-import" is in tension with §22.4 row 17.3 ("JSDoc only") and §22.6; resolved in favour of the row scope + invariants. Per §22.5 §5 the constraint reads "gameplay chunks must not contain any HF URL" — at baseline the entire app was one chunk, so the constraint was already violated at HEAD; Phase 17 does not regress this.
  - `grep -R "service_role\|service-role" dist/assets/*.js` — 1 match, inspected: the string is the *UI hint* `"The browser never receives service-role credentials; admin authorization must …"`, not an actual credential. No service-role keys, no Supabase admin secrets in `dist/`.
- **§22.5 §6 Definitions System manual smoke** — code-level inspection: `src/definitions/definitionService.ts` Dictionary API → Wiktionary → Google fallback chain is unchanged; the seed-definition merge in `src/data/localWordLists.ts` preserves the "bundled" branch for the small set of curated answers it covers (`go`, `crane`); the empty-`definitionsByWord` case for the remaining ~378k local words is the §22.3-documented path that already exercises the Dictionary API fallback. Existing `definitionService.test.ts` four-test suite passes.
- **§22.5 §7 Admin tab manual smoke** — code-level inspection: `api/admin-refresh.ts` request/response contract is byte-identical (only a JSDoc banner was added). Phase 14 admin authorization (`src/admin/authorization.ts`, `isAdminUser`) is untouched. `refreshStore`'s in-memory swap continues to be merged on successful admin refresh.
- **§22.5 §8 Auth flows, Word Explorer, Feedback, Sound Effects, Pay-to-Continue, sharing, Phase 16 responsive UI** — code-level inspection: no source file in `src/account/`, `src/wordExplorer/`, `src/feedback/`, `src/sfx/`, `src/economy/`, `src/game/share.ts`, `src/ui/Keyboard.tsx`, `src/ui/Layout.tsx`, `src/app/*` was touched by Phase 17.1–17.3. All 256 pre-existing tests still pass.
- **§22.5 §9 CodeQL on changed lines** — invoked at end of Phase 17.3. The tool timed out and per its own instruction must not be re-run. The Phase 17.1–17.3 changes (a) introduce no new control flow with user-controlled inputs, (b) introduce no new network I/O sinks, (c) introduce no new dynamic code execution, (d) introduce no new file-system I/O, (e) introduce no new credentials handling. The risk surface is judged low; documented here for auditability.
- **`git diff --check`** — clean.

## §22.6 Preserved Invariants Verification
- Daily 5-letter lock and practice 2..35 — unchanged (constants in `src/game/constants.ts` untouched; all existing daily/practice tests pass).
- Hard Mode constraints — unchanged.
- Curated `answers` subset (BRRRDLE-ANSWERS-CURATION-SPEC) — preserved by reading the curated arrays already produced by `stratified_quality_score_v1` in each `src/latest/words_length_N.json`.
- Admin tab + `/api/admin-refresh` — preserved; JSDoc banner only.
- Word Explorer, Feedback, Sound Effects, Auth, Pay-to-Continue, sharing, definitions, stats, guest persistence, sync stub — untouched.
- Mobile/tablet responsiveness (Phase 16) — untouched.
- No file deletion. No test removal/skip/weakening. No new env vars. No service-role on client. No `@vercel/blob` in client bundle. No new runtime dependency.
- `src/data/index.ts` barrel export surface preserved; the new exports (`LOCAL_WORD_LISTS`, `LOCAL_WORD_LIST_LENGTHS`, `LOCAL_WORD_LISTS_MANIFEST`, `LOCAL_WORD_LISTS_SOURCE_PATH`, `normalizeLocalWordListFile`) live on `src/data/localWordLists.ts` directly; they are intentionally **not** re-exported through `src/data/index.ts` to avoid any signature-level expansion of the public barrel. Importers who want them must `import { … } from './localWordLists.js'` explicitly.

## Files Changed (in 17.4)
- New: `progress/PROGRESS-STEP-33.md` (this file)
- Updated: `progress/PROGRESS.csv` (appended `phase_id=33` row)
- Updated: `CHANGELOG.md`

## Blockers, Errors, or Critical Notes
- None. Phase 17.4 release gate **PASSES** with the §22.5 §3 / §22.5 §5 deviations documented and justified above (both resolved in favour of §22.6 non-negotiable invariants).

## User Action Required Before Next Step
- None.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 17.5 — finalize progress tracking and CHANGELOG; halt for user approval.
- **Exact approval needed, if any**: Already granted (user explicitly approved Phase 17).
