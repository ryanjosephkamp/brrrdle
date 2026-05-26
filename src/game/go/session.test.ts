import { describe, expect, it } from 'vitest'
import { DAILY_WORD_LENGTH, GO_PUZZLE_COUNT } from '../constants'
import { continueGoAfterLoss, createDailyGoSetup, createGoSession, createPracticeGoSetup, deleteGoLetter, enterGoLetter, getAvailableGoPracticeLengths, restoreGoSession, serializeGoSession, setGoHardMode, submitGoGuess } from './session'

function submitWord(state: ReturnType<typeof createGoSession>, word: string) {
  const filled = [...word].reduce((currentState, letter) => enterGoLetter(currentState, letter), state)
  return submitGoGuess(filled)
}

describe('go session model', () => {
  it('creates daily go sessions with five 5-letter puzzles', () => {
    const setup = createDailyGoSetup(new Date('2026-05-26T00:00:00.000Z'))

    expect(setup.wordLength).toBe(DAILY_WORD_LENGTH)
    expect(setup.puzzles).toHaveLength(GO_PUZZLE_COUNT)
    expect(setup.puzzles.every((puzzle) => puzzle.answer.length === DAILY_WORD_LENGTH)).toBe(true)
  })

  it('advances through all five puzzles and tracks prior answers', () => {
    const setup = createDailyGoSetup(new Date('2026-05-26T00:00:00.000Z'))
    let session = createGoSession(setup)

    for (const puzzle of setup.puzzles) {
      session = submitWord(session, puzzle.answer)
    }

    expect(session.status).toBe('won')
    expect(session.currentPuzzleIndex).toBe(GO_PUZZLE_COUNT - 1)
    expect(session.priorAnswers).toEqual(setup.puzzles.map((puzzle) => puzzle.answer))
  })

  it('pre-fills later puzzles with prior answer rows without blocking current input', () => {
    const setup = createDailyGoSetup(new Date('2026-05-26T00:00:00.000Z'))
    const session = submitWord(createGoSession(setup), setup.puzzles[0].answer)

    expect(session.currentPuzzleIndex).toBe(1)
    expect(session.puzzles[1].guesses[0].guess).toBe(setup.puzzles[0].answer)
    expect(deleteGoLetter(session).puzzles[1].currentGuess).toBe('')
  })

  it('marks the chain lost when the current puzzle is failed', () => {
    const setup = createPracticeGoSetup(5, 0)
    let session = createGoSession(setup)

    for (let attempt = 0; attempt < 6; attempt += 1) {
      session = submitWord(session, 'slate')
    }

    expect(session.status).toBe('lost')
    expect(session.puzzles[0].status).toBe('lost')
  })

  it('can continue the failed current puzzle with an extra attempt', () => {
    const setup = createPracticeGoSetup(5, 0)
    let session = createGoSession(setup)

    for (let attempt = 0; attempt < 6; attempt += 1) {
      session = submitWord(session, 'slate')
    }

    const continued = continueGoAfterLoss(session)
    expect(continued.status).toBe('playing')
    expect(continued.puzzles[0].status).toBe('playing')
    expect(continued.puzzles[0].maxAttempts).toBe(7)
    expect(continued.puzzles[0].continuationCount).toBe(1)
  })

  it('creates practice go sessions with one selected length for all puzzles', () => {
    expect(getAvailableGoPracticeLengths()).toEqual(
      Array.from({ length: 34 }, (_, index) => index + 2),
    )
    for (const length of [2, 5, 35]) {
      const setup = createPracticeGoSetup(length, 0)
      expect(setup.wordLength).toBe(length)
      expect(setup.puzzles.every((puzzle) => puzzle.answer.length === length)).toBe(true)
    }
  })

  it('restores serialized go sessions', () => {
    const setup = createDailyGoSetup(new Date('2026-05-26T00:00:00.000Z'))
    const session = submitWord(setGoHardMode(createGoSession(setup), true), setup.puzzles[0].answer)
    const restored = restoreGoSession(serializeGoSession(session), setup.validGuesses)

    expect(restored.currentPuzzleIndex).toBe(1)
    expect(restored.hardMode).toBe(true)
    expect(restored.priorAnswers).toEqual([setup.puzzles[0].answer])
  })
})
