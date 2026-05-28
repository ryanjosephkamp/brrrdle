/**
 * Phase 17 — Local brrrdle Word List source.
 *
 * Statically imports the 34 authoritative per-length JSON dictionaries committed
 * at `src/latest/words_length_N.json` (lengths 2..35) plus `src/latest/manifest.json`,
 * synthesizes the legacy `WordListMetadata` block expected by the canonical
 * schema validator (`validateWordListFile`), and exposes:
 *
 *   - `LOCAL_WORD_LISTS`              — `Record<number, WordListFile-shaped>` keyed by length.
 *   - `LOCAL_WORD_LIST_LENGTHS`       — sorted `number[]` of available lengths.
 *   - `LOCAL_WORD_LISTS_MANIFEST`     — sanitized projection of `manifest.json`.
 *   - `LOCAL_WORD_LISTS_SOURCE_PATH`  — single loader-path constant for auditability.
 *   - `normalizeLocalWordListFile(raw, length)` — adapter used internally; exported for tests.
 *
 * Spec: `LOCAL-WORD-LISTS-SPEC-2026-05-28.md` and `AGENT-IMPLEMENTATION-PLAN.md` §22.
 *
 * Path reconciliation (per §22.1): the spec text refers to `src/latest/brrrdle/` while
 * the repository as-committed places the files directly at `src/latest/`. The on-disk
 * `src/latest/` layout is treated as authoritative; this single constant is the only
 * point that encodes the loader path so a future `git mv` can be a one-line change.
 *
 * Loader filename convention: `words_length_N.json` only. Transitional length-5
 * compatibility files (`brrrdle_words.json`, `brrrdle_words.txt`) at `src/latest/`
 * are intentionally ignored.
 */
import manifestJson from '../latest/manifest.json' with { type: 'json' }
import wordsLength2 from '../latest/words_length_2.json' with { type: 'json' }
import wordsLength3 from '../latest/words_length_3.json' with { type: 'json' }
import wordsLength4 from '../latest/words_length_4.json' with { type: 'json' }
import wordsLength5 from '../latest/words_length_5.json' with { type: 'json' }
import wordsLength6 from '../latest/words_length_6.json' with { type: 'json' }
import wordsLength7 from '../latest/words_length_7.json' with { type: 'json' }
import wordsLength8 from '../latest/words_length_8.json' with { type: 'json' }
import wordsLength9 from '../latest/words_length_9.json' with { type: 'json' }
import wordsLength10 from '../latest/words_length_10.json' with { type: 'json' }
import wordsLength11 from '../latest/words_length_11.json' with { type: 'json' }
import wordsLength12 from '../latest/words_length_12.json' with { type: 'json' }
import wordsLength13 from '../latest/words_length_13.json' with { type: 'json' }
import wordsLength14 from '../latest/words_length_14.json' with { type: 'json' }
import wordsLength15 from '../latest/words_length_15.json' with { type: 'json' }
import wordsLength16 from '../latest/words_length_16.json' with { type: 'json' }
import wordsLength17 from '../latest/words_length_17.json' with { type: 'json' }
import wordsLength18 from '../latest/words_length_18.json' with { type: 'json' }
import wordsLength19 from '../latest/words_length_19.json' with { type: 'json' }
import wordsLength20 from '../latest/words_length_20.json' with { type: 'json' }
import wordsLength21 from '../latest/words_length_21.json' with { type: 'json' }
import wordsLength22 from '../latest/words_length_22.json' with { type: 'json' }
import wordsLength23 from '../latest/words_length_23.json' with { type: 'json' }
import wordsLength24 from '../latest/words_length_24.json' with { type: 'json' }
import wordsLength25 from '../latest/words_length_25.json' with { type: 'json' }
import wordsLength26 from '../latest/words_length_26.json' with { type: 'json' }
import wordsLength27 from '../latest/words_length_27.json' with { type: 'json' }
import wordsLength28 from '../latest/words_length_28.json' with { type: 'json' }
import wordsLength29 from '../latest/words_length_29.json' with { type: 'json' }
import wordsLength30 from '../latest/words_length_30.json' with { type: 'json' }
import wordsLength31 from '../latest/words_length_31.json' with { type: 'json' }
import wordsLength32 from '../latest/words_length_32.json' with { type: 'json' }
import wordsLength33 from '../latest/words_length_33.json' with { type: 'json' }
import wordsLength34 from '../latest/words_length_34.json' with { type: 'json' }
import wordsLength35 from '../latest/words_length_35.json' with { type: 'json' }
/**
 * Historical seed JSONs at `src/data/bundled/` are kept on disk per §22.6
 * ("no file deletion"). They are no longer the gameplay source; however, the
 * tiny set of inline `answers[].definitions` they carry is merged into the
 * local source below when a seed answer is also present in the local list.
 * This preserves the existing definition behaviour for the small set of
 * curated answers documented in `src/data/bundled/source.json` without
 * re-introducing the seed as a primary loader (see §22.3 and §22.6).
 */
import seedLength2 from './bundled/words_length_2.json' with { type: 'json' }
import seedLength5 from './bundled/words_length_5.json' with { type: 'json' }

/**
 * Single loader-path constant. Encodes the on-disk layout chosen during
 * Phase 17.0 reconciliation (`src/latest/`, not `src/latest/brrrdle/`).
 */
export const LOCAL_WORD_LISTS_SOURCE_PATH = 'src/latest' as const

export interface LocalWordListsManifest {
  readonly dataset: string
  readonly schemaVersion: string
  readonly releaseDate: string
  readonly generatedAt: string
  readonly supportedWordLengths: { readonly min: number; readonly max: number }
  readonly totalWordCount: number
  readonly perLengthCounts: Readonly<Record<string, number>>
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readStringField(record: Record<string, unknown>, key: string, fallback: string): string {
  const value = record[key]
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

function readNumberField(record: Record<string, unknown>, key: string, fallback: number): number {
  const value = record[key]
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function projectManifest(raw: unknown): LocalWordListsManifest {
  const record = isRecord(raw) ? raw : {}
  const supportedRaw = isRecord(record.supported_word_lengths) ? record.supported_word_lengths : {}
  const perLengthRaw = isRecord(record.per_length_counts) ? record.per_length_counts : {}
  const perLengthCounts: Record<string, number> = {}
  for (const [key, value] of Object.entries(perLengthRaw)) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      perLengthCounts[key] = value
    }
  }
  return {
    dataset: readStringField(record, 'dataset', 'english-openlist-brrrdle'),
    schemaVersion: readStringField(record, 'schema_version', '2.0'),
    releaseDate: readStringField(record, 'release_date', ''),
    generatedAt: readStringField(record, 'generated_at', ''),
    supportedWordLengths: {
      min: readNumberField(supportedRaw, 'min', 2),
      max: readNumberField(supportedRaw, 'max', 35),
    },
    totalWordCount: readNumberField(record, 'total_word_count', 0),
    perLengthCounts,
  }
}

export const LOCAL_WORD_LISTS_MANIFEST: LocalWordListsManifest = projectManifest(manifestJson)

/**
 * Synthesize a `WordListFile`-shaped object from a raw `src/latest/words_length_N.json`
 * payload by injecting the legacy `metadata` block (`length`, `source`, `version`,
 * `generatedAt`) derived from the per-length file plus the global manifest. Any
 * existing `metadata.curation` block is preserved on the additive optional
 * `WordListMetadata.curation` field. `answers` and `validGuesses` are passed
 * through as-is so the canonical `validateWordListFile` schema runs the heavy
 * validation downstream.
 *
 * Importantly, this adapter does **not** validate the payload itself — it only
 * synthesizes metadata. A malformed local file (missing `answers`/`validGuesses`,
 * wrong-length words, non-string entries, etc.) is rejected when the result is
 * fed to `validateWordListFile`, producing the canonical `'invalid-bundled-list'`
 * failure surface in `loadBundledWordList`.
 */
function buildSeedDefinitionsForLength(rawSeed: unknown): ReadonlyMap<string, Readonly<Record<string, unknown>>[]> {
  const map = new Map<string, Readonly<Record<string, unknown>>[]>()
  if (!isRecord(rawSeed)) return map
  const answers = Array.isArray(rawSeed.answers) ? rawSeed.answers : []
  for (const entry of answers) {
    if (!isRecord(entry)) continue
    const word = typeof entry.word === 'string' ? entry.word.trim().toLocaleLowerCase('en-US') : undefined
    if (!word) continue
    if (!Array.isArray(entry.definitions) || entry.definitions.length === 0) continue
    const definitions = entry.definitions.filter((d): d is Record<string, unknown> => isRecord(d))
    if (definitions.length > 0) {
      map.set(word, definitions)
    }
  }
  return map
}

/**
 * Per-length seed-definition supplement (additive only). Maps a word in the
 * local source's answers list to its inline definitions from the historical
 * `src/data/bundled/` seed. Empty for lengths whose seed file has no inline
 * `answers[].definitions`.
 */
const SEED_DEFINITIONS_BY_LENGTH: Readonly<Record<number, ReadonlyMap<string, Readonly<Record<string, unknown>>[]>>> = {
  2: buildSeedDefinitionsForLength(seedLength2),
  5: buildSeedDefinitionsForLength(seedLength5),
}

function mergeSeedDefinitionsIntoAnswers(rawAnswers: unknown, length: number): unknown {
  if (!Array.isArray(rawAnswers)) return rawAnswers
  const seedDefs = SEED_DEFINITIONS_BY_LENGTH[length]
  if (!seedDefs || seedDefs.size === 0) return rawAnswers
  return rawAnswers.map((entry) => {
    if (typeof entry !== 'string') return entry
    const normalized = entry.trim().toLocaleLowerCase('en-US')
    const definitions = seedDefs.get(normalized)
    return definitions ? { word: entry, definitions } : entry
  })
}

export function normalizeLocalWordListFile(raw: unknown, length: number): unknown {
  const record = isRecord(raw) ? raw : {}
  const rawMetadata = isRecord(record.metadata) ? record.metadata : {}
  const rawCuration = isRecord(rawMetadata.curation) ? rawMetadata.curation : undefined

  const synthesizedMetadata: Record<string, unknown> = {
    length,
    source: `${LOCAL_WORD_LISTS_SOURCE_PATH} (${LOCAL_WORD_LISTS_MANIFEST.dataset} ${LOCAL_WORD_LISTS_MANIFEST.releaseDate})`,
    version: LOCAL_WORD_LISTS_MANIFEST.releaseDate || LOCAL_WORD_LISTS_MANIFEST.schemaVersion,
    generatedAt: LOCAL_WORD_LISTS_MANIFEST.generatedAt,
  }
  if (rawCuration) {
    synthesizedMetadata.curation = rawCuration
  }

  return {
    ...record,
    metadata: synthesizedMetadata,
    answers: mergeSeedDefinitionsIntoAnswers(record.answers, length),
    validGuesses: record.validGuesses,
  }
}

const RAW_LOCAL_FILES: Readonly<Record<number, unknown>> = {
  2: wordsLength2,
  3: wordsLength3,
  4: wordsLength4,
  5: wordsLength5,
  6: wordsLength6,
  7: wordsLength7,
  8: wordsLength8,
  9: wordsLength9,
  10: wordsLength10,
  11: wordsLength11,
  12: wordsLength12,
  13: wordsLength13,
  14: wordsLength14,
  15: wordsLength15,
  16: wordsLength16,
  17: wordsLength17,
  18: wordsLength18,
  19: wordsLength19,
  20: wordsLength20,
  21: wordsLength21,
  22: wordsLength22,
  23: wordsLength23,
  24: wordsLength24,
  25: wordsLength25,
  26: wordsLength26,
  27: wordsLength27,
  28: wordsLength28,
  29: wordsLength29,
  30: wordsLength30,
  31: wordsLength31,
  32: wordsLength32,
  33: wordsLength33,
  34: wordsLength34,
  35: wordsLength35,
}

function buildLocalWordLists(): Readonly<Record<number, unknown>> {
  const result: Record<number, unknown> = {}
  for (const [lengthKey, raw] of Object.entries(RAW_LOCAL_FILES)) {
    const length = Number(lengthKey)
    result[length] = normalizeLocalWordListFile(raw, length)
  }
  return result
}

/**
 * Map of length → adapted `WordListFile`-shaped payload, ready to flow through
 * `validateWordListFile` and into the existing normalization pipeline used by
 * `loadBundledWordList`.
 */
export const LOCAL_WORD_LISTS: Readonly<Record<number, unknown>> = buildLocalWordLists()

export const LOCAL_WORD_LIST_LENGTHS: readonly number[] = Object.keys(LOCAL_WORD_LISTS)
  .map(Number)
  .sort((a, b) => a - b)
