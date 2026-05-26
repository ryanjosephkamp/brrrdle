import { describe, expect, it } from 'vitest'
import { createEmptyStatistics, getAverageAttempts, getWinRate, updateStatistics } from './statistics'

describe('statistics', () => {
  it('tracks wins, losses, streaks, attempts, scopes, modes, and lengths separately', () => {
    const empty = createEmptyStatistics()
    const ogWin = updateStatistics(empty, { attemptsUsed: 3, mode: 'og', scope: 'daily', status: 'won', wordLength: 5 })
    const ogLoss = updateStatistics(ogWin, { attemptsUsed: 6, mode: 'og', scope: 'daily', status: 'lost', wordLength: 5 })
    const goWin = updateStatistics(ogLoss, { attemptsUsed: 15, mode: 'go', scope: 'practice', status: 'won', wordLength: 5 })

    expect(goWin.og.daily.played).toBe(2)
    expect(goWin.og.daily.currentStreak).toBe(0)
    expect(goWin.og.daily.maxStreak).toBe(1)
    expect(goWin.og.daily.byLength[5]).toEqual({ played: 2, won: 1 })
    expect(goWin.go.practice.played).toBe(1)
    expect(goWin.go.daily.played).toBe(0)
    expect(getWinRate(goWin.og.daily)).toBe(50)
    expect(getAverageAttempts(goWin.og.daily)).toBe(4.5)
  })
})
