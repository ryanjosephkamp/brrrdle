/**
 * Phase 17.2 (LOCAL-WORD-LISTS-SPEC-2026-05-28) — `BUNDLED_WORD_LISTS` is now a
 * thin re-export of `LOCAL_WORD_LISTS` from `./localWordLists.js`. The 34 per-length
 * JSON dictionaries committed at `src/latest/words_length_N.json` are the default
 * gameplay source; the historical Hugging Face seed under `src/data/bundled/` is
 * retained on disk as a historical snapshot (see `src/data/bundled/source.json`)
 * but is no longer loaded at runtime.
 *
 * Public surface preserved:
 *   - `BUNDLED_WORD_LISTS` — `Record<number, unknown>` keyed by length, consumed
 *     by `loadBundledWordList` in `./loadWordList.js`.
 *   - `BUNDLED_WORD_LIST_LENGTHS` — sorted `number[]` of available lengths.
 *
 * Downstream code (`loadBundledWordList`, `wordRepository`, schema validator,
 * refresh store, admin route) is untouched.
 */
import { LOCAL_WORD_LISTS, LOCAL_WORD_LIST_LENGTHS } from './localWordLists.js'

export const BUNDLED_WORD_LISTS: Readonly<Record<number, unknown>> = LOCAL_WORD_LISTS

export const BUNDLED_WORD_LIST_LENGTHS: readonly number[] = LOCAL_WORD_LIST_LENGTHS
