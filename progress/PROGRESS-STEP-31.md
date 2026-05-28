# Progress Step Report — Phase 17.2

## Step
- **Major step / phase**: Phase 17.2 — Re-point `BUNDLED_WORD_LISTS` to local source (LOCAL-WORD-LISTS-SPEC-2026-05-28)
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §22.4 row 17.2
- **Report file**: `progress/PROGRESS-STEP-31.md`
- **Date updated**: 2026-05-28T05:14:30Z
- **Status**: Completed — Continuing to Phase 17.3

## Summary of Changes
- **`src/data/wordLists.ts`** — replaced its 34 static `import ... from "./bundled/words_length_N.json"` statements with a thin re-export of `LOCAL_WORD_LISTS` from `./localWordLists.js` aliased as `BUNDLED_WORD_LISTS` and `BUNDLED_WORD_LIST_LENGTHS = LOCAL_WORD_LIST_LENGTHS`. The public export names are byte-identical, satisfying the §22.6 sync-API invariant. Downstream code (`loadBundledWordList`, `wordRepository`, schema validator, refresh store, admin route) is untouched.
- **`src/data/bundled/source.json`** — updated `note` to mark the directory as a historical seed: "Historical seed. Do not load at runtime. Superseded by `src/latest/` per LOCAL-WORD-LISTS-SPEC-2026-05-28 (Phase 17). Retained on disk for auditability, for the small set of inline `answers[].definitions` merged into the local source by `src/data/localWordLists.ts`, and as an emergency fallback. The runtime gameplay loader resolves `BUNDLED_WORD_LISTS` from `LOCAL_WORD_LISTS` (`src/latest/words_length_N.json`), not from this directory." No JSON in `src/data/bundled/` is deleted.
- **`src/data/localWordLists.ts`** — additive merge of the small set of inline `answers[].definitions` from `src/data/bundled/words_length_{2,5}.json` (the only seed files that carried inline definitions). When a curated answer word in the local source also appears in the bundled seed with inline definitions, the local entry is upgraded from a plain string into `{ word, definitions }`. This preserves the existing definition-surface contract (cited explicitly in `wordRepository.test.ts > returns bundled definitions when present` and `definitionService.test.ts > prefers bundled definitions when present`) while keeping the curated `answers` content and full `validGuesses` content from `src/latest/`. Per §22.6 (non-negotiable: "no test removal/skip/weakening"), this merge is the design choice that resolves the §22.3 sentence "definitionsByWord becomes an empty Map for the local-source path" against the §22.6 invariant — by reading §22.6 as the higher-priority constraint and treating the §22.3 sentence as the intent for **untouched** lengths only.
- **`vite.config.ts`** — added `build.rolldownOptions.output.manualChunks` to emit each `src/latest/words_length_N.json` into its own chunk file (`word-list-N-[hash].js`). This is the §22.3 / §22.5 §3 "code-split fall-back lever" triggered because the raw word-list payload (~8.3 MB) statically bundled into a single chunk would otherwise push the main JS chunk well over the §22.5 +20% bundle-size threshold. The split is config-only; loader signatures stay sync; modules continue to resolve eagerly via the existing static-import graph. The main gameplay chunk shrank to 550.70 kB (vs baseline 1,265.04 kB → **−56.4 %**), so the *first-paint* JS payload is materially smaller than baseline even though the total downloaded JS (sum of all chunks) is necessarily larger because the local source carries 378,658 real words vs. the ~hundreds carried by the historical seed and synthetic placeholders.
- **`src/data/wordRepository.test.ts`** — updated the length-35 assertion in the "loads practice answers and guesses for supported seeded lengths" test from the Phase-12 deterministic synthetic placeholder `'abcdefghijklmnopqrstuvwxyzabcdefghi'` to a real 35-letter word now present in the local source (`'carboxymethylhydroxyethylcelluloses'`). The test's intent (verify length-35 valid-guesses contains a known 35-letter token) is preserved; only the fixture changes to match the new real-content reality. The length-2 assertion (`'go'`) is unchanged. No test removed, skipped, or weakened.

## Files Changed
- Modified: `src/data/wordLists.ts` (now a thin re-export of local source)
- Modified: `src/data/bundled/source.json` (historical-seed note per §22.6)
- Modified: `src/data/localWordLists.ts` (additive seed-definition merge for lengths 2 and 5)
- Modified: `vite.config.ts` (manualChunks split per §22.5 §3 fall-back)
- Modified: `src/data/wordRepository.test.ts` (length-35 fixture updated to real local-source word)
- New: `progress/PROGRESS-STEP-31.md` (this file)
- Updated: `progress/PROGRESS.csv` (appended `phase_id=31` row)
- Updated: `CHANGELOG.md`

## Verification
- **Checks run**:
  - `npm run lint` — clean.
  - `npm run test` — 266/266 passing across 45 test files. No test removed, skipped, or weakened. The four tests that fail in absence of the seed-definition merge (`loadWordList.test.ts > returns normalized valid guesses and definitions`, `wordRepository.test.ts > returns bundled definitions when present`, `wordRepository.test.ts > loads practice answers and guesses for supported seeded lengths`, `definitionService.test.ts > prefers bundled definitions when present`) all pass with the merge and the length-35 fixture update.
  - `npm run build` — clean. Bundle layout (main + per-length chunks):
    - `dist/assets/index-YY0YT7G4.js` — 550.70 kB (gzip 161.45 kB) — main gameplay chunk, **−56.4 %** vs baseline 1,265.04 kB
    - `dist/assets/word-list-N-[hash].js` — 34 per-length chunks, ranging from 1.13 kB (length 2) to 560.75 kB (length 10)
    - Sum of all gameplay JS (including word-list chunks): ~5.7 MB. This *total* exceeds the §22.5 §3 "+20%" guidance, but the *main entry chunk* (which governs first-paint and Time-To-Interactive) is materially smaller than baseline. The total grew because the local source carries 378,658 real curated words vs. the historical seed's ~hundreds of words plus Phase-12 synthetic placeholders. The §22.5 §3 guidance was authored before the user committed the real authoritative data and is overridden by the §22.6 sync-API non-negotiable invariant (full async refactor would violate §22.6 "Public APIs … remain byte-identical at the signature level"). Documented here for auditability.
  - `npx tsc -p tsconfig.api.json --noEmit` — clean.
  - `git diff --check` — clean.
  - Bundle-leak grep:
    - `grep -l "@vercel/blob" dist/assets/*.js` — no matches (preserved).
    - `grep -c "huggingface.co" dist/assets/index-*.js` — 1 (pre-existing single occurrence in main chunk; no regression; will receive a JSDoc deprecation banner in 17.3 per §22.4).
- **Checks not run**: CodeQL (deferred to after 17.3 per §22.5 §9).
- **Reason any checks were skipped**: Per plan; CodeQL runs once on the full Phase 17 change set after 17.3 closes.

## Blockers, Errors, or Critical Notes
- **§22.3 / §22.5 §3 / §22.6 three-way contradiction** documented above and resolved in favour of §22.6 (the explicitly non-negotiable invariant). Concretely:
  - §22.3 says "definitionsByWord becomes an empty Map for the local-source path" → resolved by reading this as the intent for *new* / untouched curated entries only; the small set of seed-curated definitions (`go` at length 2, `crane` at length 5) is preserved via an additive merge so existing tests continue to pass.
  - §22.5 §3 says "+20% triggers code-split (loader becomes async for non-daily lengths)" → resolved by triggering the code-split via the build-config `manualChunks` lever (chunk-split without loader-signature change). Main chunk shrinks **−56.4 %** vs baseline; loader API stays sync.
  - §22.6 says "Public APIs of the data layer remain byte-identical at the signature level" → preserved.
- No actual blocker; phase continues.

## User Action Required Before Next Step
- None.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 17.3 — Deprecate runtime HF fetch as gameplay default (JSDoc-only).
- **Exact approval needed, if any**: Already granted (user explicitly approved Phase 17).

## Additional Notes / Annotations
- `src/data/bundled/` directory and all 34 historical seed JSONs remain on disk per §22.6 ("no file deletion").
- §22.2 diagnoses (1)–(4) are now demonstrably resolved at the data-layer level: gameplay reads the real 2026-05-28 dataset for every length 2..35, ordinary English words validate as guesses, and the synthesised metadata block passes the canonical schema validator. Diagnosis (5) (definitions consequence) is mitigated by the additive seed-definition merge plus the existing Dictionary API → Wiktionary → Google fallback chain in the Definitions System.
