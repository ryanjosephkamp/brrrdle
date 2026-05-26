import { BUNDLED_WORD_LIST_LENGTHS, getDailyAnswerIndex, getDailyDateKey, getWordRepository } from '../../data'
import { DAILY_WORD_LENGTH, GO_PUZZLE_COUNT, SUPPORTED_PRACTICE_WORD_LENGTHS } from '../constants'
import {
  createPuzzleSession,
  continueAfterLoss,
  deleteLetter,
  enterLetter,
  submitGuess,
  type PuzzleSessionState,
} from '../session'
import { getGuessResult } from '../tileStates'
import type { GameStatus } from '../types'

export interface GoPuzzleSetup {
  readonly answer: string
  readonly prefilledGuesses: readonly string[]
}

export interface GoSessionSetup {
  readonly dateKey?: string
  readonly puzzles: readonly GoPuzzleSetup[]
  readonly validGuesses: ReadonlySet<string>
  readonly wordLength: number
}

export interface GoSessionState {
  readonly currentPuzzleIndex: number
  readonly hardMode: boolean
  readonly priorAnswers: readonly string[]
  readonly puzzles: readonly PuzzleSessionState[]
  readonly status: GameStatus
  readonly validGuesses: ReadonlySet<string>
  readonly wordLength: number
}

export interface SerializedGoSession {
  readonly currentPuzzleIndex: number
  readonly hardMode: boolean
  readonly priorAnswers: readonly string[]
  readonly puzzles: readonly {
    readonly answer: string
    readonly continuationCount: number
    readonly currentGuess: string
    readonly guesses: readonly string[]
    readonly maxAttempts: number
    readonly prefilledGuesses: readonly string[]
  }[]
}

function selectAnswerSequence(answers: readonly { readonly word: string }[], seedIndex: number): readonly string[] {
  if (answers.length < 1) {
    throw new Error('At least one answer candidate is required for go gameplay.')
  }

  return Array.from({ length: GO_PUZZLE_COUNT }, (_, offset) => answers[(seedIndex + offset) % answers.length].word)
}

function createPuzzle(answer: string, validGuesses: ReadonlySet<string>, hardMode: boolean, prefilledGuesses: readonly string[]): PuzzleSessionState {
  const session = createPuzzleSession({ answer, hardMode, validGuesses })
  const guesses = prefilledGuesses.map((guess) => getGuessResult(guess, answer))

  return {
    ...session,
    guesses,
  }
}

function getStatus(puzzles: readonly PuzzleSessionState[], currentPuzzleIndex: number): GameStatus {
  const currentPuzzle = puzzles[currentPuzzleIndex]
  if (currentPuzzle.status === 'lost') {
    return 'lost'
  }

  return currentPuzzleIndex === GO_PUZZLE_COUNT - 1 && currentPuzzle.status === 'won' ? 'won' : 'playing'
}

export function getAvailableGoPracticeLengths(): readonly number[] {
  return SUPPORTED_PRACTICE_WORD_LENGTHS.filter((length) => BUNDLED_WORD_LIST_LENGTHS.includes(length))
}

export function createDailyGoSetup(date = new Date()): GoSessionSetup {
  const repository = getWordRepository({ mode: 'go', scope: 'daily', length: DAILY_WORD_LENGTH })
  if (!repository.ok) {
    throw new Error(repository.message)
  }

  const dateKey = getDailyDateKey(date)
  const answers = selectAnswerSequence(repository.answers, getDailyAnswerIndex(dateKey, repository.answers.length))
  const priorAnswers: string[] = []
  const puzzles = answers.map((answer) => {
    const prefilledGuesses = [...priorAnswers]
    priorAnswers.push(answer)
    return { answer, prefilledGuesses }
  })

  return {
    dateKey,
    puzzles,
    validGuesses: repository.validGuesses,
    wordLength: DAILY_WORD_LENGTH,
  }
}

export function createPracticeGoSetup(length: number, seed = Date.now()): GoSessionSetup {
  const repository = getWordRepository({ mode: 'go', scope: 'practice', length })
  if (!repository.ok) {
    throw new Error(repository.message)
  }

  const seedIndex = Math.abs(Math.trunc(seed)) % repository.answers.length
  const answers = selectAnswerSequence(repository.answers, seedIndex)
  const priorAnswers: string[] = []
  const puzzles = answers.map((answer) => {
    const prefilledGuesses = [...priorAnswers]
    priorAnswers.push(answer)
    return { answer, prefilledGuesses }
  })

  return {
    puzzles,
    validGuesses: repository.validGuesses,
    wordLength: repository.wordList.metadata.length,
  }
}

export function createGoSession(setup: GoSessionSetup, hardMode = false): GoSessionState {
  return {
    currentPuzzleIndex: 0,
    hardMode,
    priorAnswers: [],
    puzzles: setup.puzzles.map((puzzle) => createPuzzle(puzzle.answer, setup.validGuesses, hardMode, puzzle.prefilledGuesses)),
    status: 'playing',
    validGuesses: setup.validGuesses,
    wordLength: setup.wordLength,
  }
}

export function enterGoLetter(state: GoSessionState, letter: string): GoSessionState {
  if (state.status !== 'playing') {
    return state
  }

  const puzzles = [...state.puzzles]
  puzzles[state.currentPuzzleIndex] = enterLetter(puzzles[state.currentPuzzleIndex], letter)
  return { ...state, puzzles }
}

export function deleteGoLetter(state: GoSessionState): GoSessionState {
  if (state.status !== 'playing') {
    return state
  }

  const puzzles = [...state.puzzles]
  puzzles[state.currentPuzzleIndex] = deleteLetter(puzzles[state.currentPuzzleIndex])
  return { ...state, puzzles }
}

export function submitGoGuess(state: GoSessionState): GoSessionState {
  if (state.status !== 'playing') {
    return state
  }

  const puzzles = [...state.puzzles]
  const submittedPuzzle = submitGuess(puzzles[state.currentPuzzleIndex])
  puzzles[state.currentPuzzleIndex] = submittedPuzzle

  if (submittedPuzzle.status === 'lost') {
    return { ...state, puzzles, status: 'lost' }
  }

  if (submittedPuzzle.status !== 'won') {
    return { ...state, puzzles }
  }

  const priorAnswers = [...state.priorAnswers, submittedPuzzle.answer]
  if (state.currentPuzzleIndex === GO_PUZZLE_COUNT - 1) {
    return { ...state, priorAnswers, puzzles, status: 'won' }
  }

  const currentPuzzleIndex = state.currentPuzzleIndex + 1
  const nextPuzzle = puzzles[currentPuzzleIndex]
  puzzles[currentPuzzleIndex] = {
    ...nextPuzzle,
    hardMode: state.hardMode,
    lastValidation: undefined,
  }

  return {
    ...state,
    currentPuzzleIndex,
    priorAnswers,
    puzzles,
    status: getStatus(puzzles, currentPuzzleIndex),
  }
}

export function setGoHardMode(state: GoSessionState, hardMode: boolean): GoSessionState {
  if (state.status !== 'playing') {
    return state
  }

  return {
    ...state,
    hardMode,
    puzzles: state.puzzles.map((puzzle) => ({ ...puzzle, hardMode, lastValidation: undefined })),
  }
}

export function continueGoAfterLoss(state: GoSessionState, extraAttempts = 1): GoSessionState {
  if (state.status !== 'lost') {
    return state
  }

  const puzzles = [...state.puzzles]
  puzzles[state.currentPuzzleIndex] = continueAfterLoss(puzzles[state.currentPuzzleIndex], extraAttempts)

  return {
    ...state,
    puzzles,
    status: 'playing',
  }
}

export function serializeGoSession(state: GoSessionState): SerializedGoSession {
  return {
    currentPuzzleIndex: state.currentPuzzleIndex,
    hardMode: state.hardMode,
    priorAnswers: state.priorAnswers,
    puzzles: state.puzzles.map((puzzle, index) => ({
      answer: puzzle.answer,
      continuationCount: puzzle.continuationCount,
      currentGuess: puzzle.currentGuess,
      guesses: puzzle.guesses.map((guess) => guess.guess),
      maxAttempts: puzzle.maxAttempts,
      prefilledGuesses: state.priorAnswers.slice(0, index),
    })),
  }
}

export function restoreGoSession(serialized: SerializedGoSession, validGuesses: ReadonlySet<string>): GoSessionState {
  const puzzles = serialized.puzzles.map((puzzle) => {
    const guesses = puzzle.guesses.map((guess) => getGuessResult(guess, puzzle.answer))
    const solved = guesses.some((guess) => guess.tiles.every((tile) => tile.state === 'correct'))
    const status = solved ? 'won' : guesses.length >= puzzle.maxAttempts ? 'lost' : 'playing'

    return {
      answer: puzzle.answer,
      continuationCount: puzzle.continuationCount,
      currentGuess: puzzle.currentGuess,
      guesses,
      hardMode: serialized.hardMode,
      lastValidation: undefined,
      maxAttempts: puzzle.maxAttempts,
      status,
      validGuesses,
      wordLength: puzzle.answer.length,
    } satisfies PuzzleSessionState
  })
  const currentPuzzleIndex = Math.min(serialized.currentPuzzleIndex, puzzles.length - 1)

  return {
    currentPuzzleIndex,
    hardMode: serialized.hardMode,
    priorAnswers: serialized.priorAnswers,
    puzzles,
    status: getStatus(puzzles, currentPuzzleIndex),
    validGuesses,
    wordLength: puzzles[currentPuzzleIndex].wordLength,
  }
}
