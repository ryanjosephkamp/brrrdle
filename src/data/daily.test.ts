import { describe, expect, it } from 'vitest'
import { DAILY_WORD_LENGTH } from '../game/constants.js'
import { getDailyAnswerIndex, getDailyDateKey, getDailyGoSeedIndex, getDailyOgPuzzle, selectDailyAnswer } from './daily.js'
import { createDailyGoSetup } from '../game/go/session.js'

describe('daily puzzle selection', () => {
  it('uses stable UTC date keys', () => {
    expect(getDailyDateKey(new Date('2026-05-26T23:59:59.000Z'))).toBe('2026-05-26')
  })

  it('selects deterministic answer indexes for a date key', () => {
    expect(getDailyAnswerIndex('2026-05-26', 3)).toBe(getDailyAnswerIndex('2026-05-26', 3))
    expect(getDailyAnswerIndex('2026-05-26', 3)).toBeGreaterThanOrEqual(0)
    expect(getDailyAnswerIndex('2026-05-26', 3)).toBeLessThan(3)
  })

  it('always creates daily og puzzles at the launch daily length', () => {
    const puzzle = getDailyOgPuzzle(new Date('2026-05-26T00:00:00.000Z'))

    expect(puzzle.length).toBe(DAILY_WORD_LENGTH)
    expect(puzzle.answer).toHaveLength(DAILY_WORD_LENGTH)
  })

  it('selects from provided answers deterministically', () => {
    const answers = [{ word: 'crane' }, { word: 'slate' }, { word: 'brisk' }]

    expect(selectDailyAnswer(answers, new Date('2026-05-26T00:00:00.000Z'))).toMatchObject({
      answer: 'slate',
      dateKey: '2026-05-26',
      index: 1,
      length: 5,
    })
  })

  it('derives an independent, deterministic daily go seed that never equals the og index', () => {
    for (let offset = 0; offset < 400; offset += 1) {
      const date = new Date('2026-01-01T00:00:00.000Z')
      date.setUTCDate(date.getUTCDate() + offset)
      const dateKey = getDailyDateKey(date)
      const ogIndex = getDailyAnswerIndex(dateKey, 2175)
      const goIndex = getDailyGoSeedIndex(dateKey, 2175)

      expect(goIndex).toBe(getDailyGoSeedIndex(dateKey, 2175))
      expect(goIndex).toBeGreaterThanOrEqual(0)
      expect(goIndex).toBeLessThan(2175)
      expect(goIndex).not.toBe(ogIndex)
    }
  })

  it('falls back to the og index only when there is a single answer candidate', () => {
    expect(getDailyGoSeedIndex('2026-05-26', 1)).toBe(getDailyAnswerIndex('2026-05-26', 1))
  })

  it('keeps the daily go chain first word distinct from the daily og answer at length 5', () => {
    for (let offset = 0; offset < 120; offset += 1) {
      const date = new Date('2026-03-01T00:00:00.000Z')
      date.setUTCDate(date.getUTCDate() + offset)
      const ogAnswer = getDailyOgPuzzle(date).answer
      const goSetup = createDailyGoSetup(date)

      expect(goSetup.puzzles).toHaveLength(5)
      expect(goSetup.puzzles[0].answer).not.toBe(ogAnswer)
      // The five daily go words remain mutually distinct.
      expect(new Set(goSetup.puzzles.map((puzzle) => puzzle.answer)).size).toBe(5)
    }
  })
})
