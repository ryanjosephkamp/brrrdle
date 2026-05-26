import { describe, expect, it } from 'vitest'
import { createDefaultGuestProgress } from './storageSchema'
import { mergeGuestProgressIntoCloud } from './guestTransfer'

describe('guest transfer', () => {
  it('merges local and cloud progress without losing history or completed IDs', () => {
    const local = {
      ...createDefaultGuestProgress(),
      completedGameIds: ['local-game'],
      history: [{ attemptsUsed: 1, coinAward: 10, completedAt: '2026-05-26T01:00:00Z', gameId: 'local-game', mode: 'og', scope: 'daily', status: 'won', word: 'crane', wordLength: 5, xpAward: 50 }],
      progression: { ...createDefaultGuestProgress().progression, coins: 10, xp: 150 },
    } as const
    const cloud = {
      ...createDefaultGuestProgress(),
      completedGameIds: ['cloud-game'],
      history: [{ attemptsUsed: 2, coinAward: 8, completedAt: '2026-05-26T00:00:00Z', gameId: 'cloud-game', mode: 'go', scope: 'practice', status: 'won', word: 'brisk', wordLength: 5, xpAward: 40 }],
      progression: { ...createDefaultGuestProgress().progression, coins: 20, xp: 90 },
    } as const

    const merged = mergeGuestProgressIntoCloud(local, cloud)

    expect(merged.completedGameIds).toEqual(['cloud-game', 'local-game'])
    expect(merged.history.map((entry) => entry.gameId)).toEqual(['local-game', 'cloud-game'])
    expect(merged.progression.coins).toBe(20)
    expect(merged.progression.xp).toBe(150)
    expect(merged.progression.level).toBe(2)
  })
})
