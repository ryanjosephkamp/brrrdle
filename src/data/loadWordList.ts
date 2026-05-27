import { DAILY_WORD_LENGTH, isSupportedDailyWordLength, isSupportedPracticeWordLength } from '../game/constants.js'
import type { PlayScope } from '../game/types.js'
import type { NormalizedWordList, WordDefinitionEntry, WordListFile } from './types.js'
import { isSchemaValidationFailure, validateWordListFile } from './wordListSchema.js'
import { BUNDLED_WORD_LISTS } from './wordLists.js'

export interface LoadWordListSuccess {
  readonly ok: true
  readonly wordList: NormalizedWordList
}

export interface LoadWordListFailure {
  readonly ok: false
  readonly reason: 'unsupported-length' | 'daily-length-locked' | 'missing-bundled-list' | 'invalid-bundled-list'
  readonly message: string
}

export type LoadWordListResult = LoadWordListSuccess | LoadWordListFailure

export function isLoadWordListSuccess(
  result: LoadWordListResult,
): result is LoadWordListSuccess {
  return result.ok === true
}

export function isLoadWordListFailure(
  result: LoadWordListResult,
): result is LoadWordListFailure {
  return result.ok === false
}

interface ResolveWordListLengthSuccess {
  readonly ok: true
  readonly length: number
}

type ResolveWordListLengthResult = LoadWordListFailure | ResolveWordListLengthSuccess

function normalizeWordList(file: WordListFile): NormalizedWordList {
  const validGuesses = new Set(file.validGuesses)
  const definitionsByWord = new Map<string, readonly WordDefinitionEntry[]>()

  for (const answer of file.answers) {
    if (answer.definitions && answer.definitions.length > 0) {
      definitionsByWord.set(answer.word, answer.definitions)
    }
  }

  return {
    metadata: file.metadata,
    answers: file.answers,
    validGuesses,
    definitionsByWord,
  }
}

export function resolveWordListLength(scope: PlayScope, length: number): ResolveWordListLengthResult {
  if (scope === 'daily' && !isSupportedDailyWordLength(length)) {
    return {
      ok: false,
      reason: 'daily-length-locked',
      message: `Daily puzzles are locked to ${DAILY_WORD_LENGTH} letters at launch.`,
    }
  }

  if (!isSupportedPracticeWordLength(length)) {
    return {
      ok: false,
      reason: 'unsupported-length',
      message: `Practice length ${length} is outside the supported 2–35 range.`,
    }
  }

  return { ok: true, length }
}

export function loadBundledWordList(scope: PlayScope, length: number): LoadWordListResult {
  const resolvedLength = resolveWordListLength(scope, length)
  if (resolvedLength.ok === false) {
    return resolvedLength
  }

  const bundled = BUNDLED_WORD_LISTS[resolvedLength.length as keyof typeof BUNDLED_WORD_LISTS]
  if (!bundled) {
    return {
      ok: false,
      reason: 'missing-bundled-list',
      message: `No bundled word list is available for length ${resolvedLength.length}.`,
    }
  }

  const validation = validateWordListFile(bundled)
  if (isSchemaValidationFailure(validation)) {
    return {
      ok: false,
      reason: 'invalid-bundled-list',
      message: validation.issues.map((issue) => `${issue.path}: ${issue.message}`).join('; '),
    }
  }

  return {
    ok: true,
    wordList: normalizeWordList(validation.value),
  }
}
