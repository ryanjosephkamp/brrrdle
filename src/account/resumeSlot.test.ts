import { describe, expect, it } from 'vitest'
import {
  createResumeSlot,
  describeResumeSlot,
  getLatestResumeSlot,
  getResumeSlotKey,
  isCaptureInProgress,
  isGoSessionInProgress,
  isOgSessionInProgress,
  mergeResumeSlots,
  normalizeResumeSlot,
  normalizeResumeSlots,
  type ResumeCapture,
} from './resumeSlot'

function ogSession(overrides: Partial<Parameters<typeof isOgSessionInProgress>[0]> = {}) {
  return {
    answer: 'crane',
    continuationCount: 0,
    currentGuess: '',
    guesses: [],
    hardMode: false,
    maxAttempts: 6,
    ...overrides,
  }
}

function goSession(overrides: Partial<Parameters<typeof isGoSessionInProgress>[0]> = {}) {
  return {
    currentPuzzleIndex: 0,
    hardMode: false,
    priorAnswers: [],
    puzzles: [
      { answer: 'crane', continuationCount: 0, currentGuess: '', guesses: [], maxAttempts: 6, prefilledGuesses: [] },
      { answer: 'plumb', continuationCount: 0, currentGuess: '', guesses: [], maxAttempts: 6, prefilledGuesses: [] },
    ],
    ...overrides,
  }
}

describe('resume slot model', () => {
  it('treats an untouched og board as not in progress', () => {
    expect(isOgSessionInProgress(ogSession())).toBe(false)
  })

  it('treats a started, unsolved og board as in progress', () => {
    expect(isOgSessionInProgress(ogSession({ currentGuess: 'cr' }))).toBe(true)
    expect(isOgSessionInProgress(ogSession({ guesses: ['plumb'] }))).toBe(true)
  })

  it('treats a solved or lost og board as finished', () => {
    expect(isOgSessionInProgress(ogSession({ guesses: ['crane'] }))).toBe(false)
    expect(isOgSessionInProgress(ogSession({ guesses: ['plumb', 'plumb', 'plumb', 'plumb', 'plumb', 'plumb'] }))).toBe(false)
  })

  it('detects an in-progress go chain and a won/lost chain', () => {
    expect(isGoSessionInProgress(goSession())).toBe(false)
    expect(isGoSessionInProgress(goSession({ currentPuzzleIndex: 1, priorAnswers: ['crane'] }))).toBe(true)
    const won = goSession({
      currentPuzzleIndex: 1,
      priorAnswers: ['crane'],
      puzzles: [
        { answer: 'crane', continuationCount: 0, currentGuess: '', guesses: ['crane'], maxAttempts: 6, prefilledGuesses: [] },
        { answer: 'plumb', continuationCount: 0, currentGuess: '', guesses: ['plumb'], maxAttempts: 6, prefilledGuesses: ['crane'] },
      ],
    })
    expect(isGoSessionInProgress(won)).toBe(false)
    const lost = goSession({
      puzzles: [
        { answer: 'crane', continuationCount: 0, currentGuess: '', guesses: ['aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa', 'aaaaa'], maxAttempts: 6, prefilledGuesses: [] },
        { answer: 'plumb', continuationCount: 0, currentGuess: '', guesses: [], maxAttempts: 6, prefilledGuesses: [] },
      ],
    })
    expect(isGoSessionInProgress(lost)).toBe(false)
  })

  it('stamps a capture with a timestamp and reports progress', () => {
    const capture: ResumeCapture = { difficulty: 'expert', mode: 'og', scope: 'practice', serializedSession: ogSession({ currentGuess: 'cr' }), wordLength: 5 }
    expect(isCaptureInProgress(capture)).toBe(true)
    const slot = createResumeSlot(capture, '2026-05-30T06:00:00.000Z')
    expect(slot.updatedAt).toBe('2026-05-30T06:00:00.000Z')
  })

  it('round-trips a valid og slot through normalization', () => {
    const slot = createResumeSlot({ difficulty: 'casual', mode: 'og', scope: 'practice', serializedSession: ogSession({ currentGuess: 'cr' }), wordLength: 5 }, '2026-05-30T06:00:00.000Z')
    expect(normalizeResumeSlot(slot)).toEqual(slot)
  })

  it('round-trips a valid go slot and normalizes the count', () => {
    const slot = createResumeSlot({ difficulty: 'expert', goPuzzleCount: 7, mode: 'go', scope: 'daily', serializedSession: goSession({ currentPuzzleIndex: 1, priorAnswers: ['crane'] }), wordLength: 5 }, '2026-05-30T06:00:00.000Z')
    expect(normalizeResumeSlot(slot)).toEqual(slot)
    expect(normalizeResumeSlot({ ...slot, goPuzzleCount: 99 })?.mode === 'go' && normalizeResumeSlot({ ...slot, goPuzzleCount: 99 })).toMatchObject({ goPuzzleCount: 5 })
  })

  it('rejects malformed, finished, or unknown-mode slots', () => {
    expect(normalizeResumeSlot(undefined)).toBeUndefined()
    expect(normalizeResumeSlot({ mode: 'og' })).toBeUndefined()
    expect(normalizeResumeSlot({ mode: 'tetris', scope: 'practice', wordLength: 5, serializedSession: ogSession({ currentGuess: 'cr' }) })).toBeUndefined()
    // A finished session is not resumable.
    expect(normalizeResumeSlot(createResumeSlot({ difficulty: 'expert', mode: 'og', scope: 'practice', serializedSession: ogSession({ guesses: ['crane'] }), wordLength: 5 }))).toBeUndefined()
  })

  it('describes a slot for the resume button', () => {
    const og = createResumeSlot({ difficulty: 'expert', mode: 'og', scope: 'practice', serializedSession: ogSession({ currentGuess: 'cr' }), wordLength: 5 })
    expect(describeResumeSlot(og)).toContain('og practice')
    const go = createResumeSlot({ difficulty: 'expert', goPuzzleCount: 10, mode: 'go', scope: 'daily', serializedSession: goSession({ currentPuzzleIndex: 1, priorAnswers: ['crane'] }), wordLength: 5 })
    expect(describeResumeSlot(go)).toContain('10 puzzles')
  })

  it('normalizes independent resume slots by lane and finds the newest one', () => {
    const practiceOg = createResumeSlot({ difficulty: 'expert', mode: 'og', scope: 'practice', serializedSession: ogSession({ currentGuess: 'cr' }), wordLength: 5 }, '2026-05-30T06:00:00.000Z')
    const practiceGo = createResumeSlot({ difficulty: 'expert', goPuzzleCount: 5, mode: 'go', scope: 'practice', serializedSession: goSession({ currentPuzzleIndex: 1, priorAnswers: ['crane'] }), wordLength: 5 }, '2026-05-30T07:00:00.000Z')
    const slots = normalizeResumeSlots({
      'practice-og': practiceOg,
      'practice-go': practiceGo,
      'daily-og': practiceGo,
    })

    expect(getResumeSlotKey(practiceOg)).toBe('practice-og')
    expect(slots['practice-og']).toEqual(practiceOg)
    expect(slots['practice-go']).toEqual(practiceGo)
    expect(slots['daily-og']).toBeUndefined()
    expect(getLatestResumeSlot(slots)).toEqual(practiceGo)
  })

  it('merges independent resume slots by keeping the newest per lane', () => {
    const older = createResumeSlot({ difficulty: 'expert', mode: 'og', scope: 'practice', serializedSession: ogSession({ currentGuess: 'cr' }), wordLength: 5 }, '2026-05-30T06:00:00.000Z')
    const newer = createResumeSlot({ difficulty: 'expert', mode: 'og', scope: 'practice', serializedSession: ogSession({ currentGuess: 'cra' }), wordLength: 5 }, '2026-05-30T07:00:00.000Z')
    const daily = createResumeSlot({ difficulty: 'expert', goPuzzleCount: 5, mode: 'go', scope: 'daily', serializedSession: goSession({ currentPuzzleIndex: 1, priorAnswers: ['crane'] }), wordLength: 5 }, '2026-05-30T06:30:00.000Z')

    expect(mergeResumeSlots({ 'practice-og': older }, { 'practice-og': newer, 'daily-go': daily })).toEqual({
      'daily-go': daily,
      'practice-og': newer,
    })
  })
})
