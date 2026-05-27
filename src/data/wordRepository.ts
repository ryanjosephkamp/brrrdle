import { DAILY_WORD_LENGTH } from '../game/constants.js'
import type { GameMode, PlayScope } from '../game/types.js'
import type { LoadWordListFailure } from './loadWordList.js'
import { isLoadWordListFailure, loadBundledWordList } from './loadWordList.js'
import type { NormalizedWordList, WordDefinitionEntry, WordEntry } from './types.js'

export interface WordRepositorySuccess {
  readonly ok: true
  readonly wordList: NormalizedWordList
  readonly answers: readonly WordEntry[]
  readonly validGuesses: ReadonlySet<string>
}

export type WordRepositoryFailure = LoadWordListFailure
export type WordRepositoryResult = WordRepositorySuccess | WordRepositoryFailure

export function isWordRepositorySuccess(
  result: WordRepositoryResult,
): result is WordRepositorySuccess {
  return result.ok === true
}

export function isWordRepositoryFailure(
  result: WordRepositoryResult,
): result is WordRepositoryFailure {
  return result.ok === false
}

export interface WordRepositoryRequest {
  readonly mode: GameMode
  readonly scope: PlayScope
  readonly length: number
}

export function getRequestedWordLength(scope: PlayScope, length: number): number {
  return scope === 'daily' ? DAILY_WORD_LENGTH : length
}

export function getWordRepository(request: WordRepositoryRequest): WordRepositoryResult {
  const wordList = loadBundledWordList(request.scope, getRequestedWordLength(request.scope, request.length))
  if (isLoadWordListFailure(wordList)) {
    return wordList
  }

  return {
    ok: true,
    wordList: wordList.wordList,
    answers: wordList.wordList.answers,
    validGuesses: wordList.wordList.validGuesses,
  }
}

export function getAnswerCandidates(request: WordRepositoryRequest): readonly WordEntry[] {
  const repository = getWordRepository(request)
  return isWordRepositorySuccess(repository) ? repository.answers : []
}

export function getValidGuesses(request: WordRepositoryRequest): ReadonlySet<string> {
  const repository = getWordRepository(request)
  return isWordRepositorySuccess(repository) ? repository.validGuesses : new Set()
}

export function getDefinitionsForWord(
  request: WordRepositoryRequest,
  word: string,
): readonly WordDefinitionEntry[] {
  const repository = getWordRepository(request)
  if (isWordRepositoryFailure(repository)) {
    return []
  }

  return repository.wordList.definitionsByWord.get(word.trim().toLocaleLowerCase('en-US')) ?? []
}
