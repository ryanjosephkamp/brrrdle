import { describe, expect, it } from 'vitest'
import { createDefaultGuestProgress } from './storageSchema'
import { exportGuestProgress, loadGuestProgress, recordCompletedGame, resetGuestProgress, saveGuestProgress, type KeyValueStorage } from './guestStorage'

function createMemoryStorage(initialValue?: string): KeyValueStorage & { readonly values: Map<string, string> } {
  const values = new Map<string, string>()
  if (initialValue) {
    values.set('brrrdle:guest-progress:v1', initialValue)
  }
  return {
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => { values.delete(key) },
    setItem: (key, value) => { values.set(key, value) },
    values,
  }
}

describe('guest storage', () => {
  it('saves, loads, exports, and resets versioned guest progress', () => {
    const storage = createMemoryStorage()
    const progress = createDefaultGuestProgress()
    saveGuestProgress({ ...progress, progression: { ...progress.progression, coins: 12 } }, storage)

    expect(loadGuestProgress(storage).progression.coins).toBe(12)
    expect(JSON.parse(exportGuestProgress(loadGuestProgress(storage))).schemaVersion).toBe(1)
    expect(resetGuestProgress(storage).progression.coins).toBe(0)
  })

  it('falls back to defaults for corrupted or incompatible data', () => {
    expect(loadGuestProgress(createMemoryStorage('{broken')).schemaVersion).toBe(1)
    expect(loadGuestProgress(createMemoryStorage(JSON.stringify({ schemaVersion: 99 }))).progression.level).toBe(1)
  })

  it('records completed games once for history, stats, XP, and coins', () => {
    const progress = recordCompletedGame({
      attemptsUsed: 3,
      gameId: 'daily-og-2026-05-26',
      maxAttempts: 6,
      mode: 'og',
      scope: 'daily',
      status: 'won',
      word: 'crane',
      wordLength: 5,
    }, createDefaultGuestProgress())
    const duplicate = recordCompletedGame({
      attemptsUsed: 3,
      gameId: 'daily-og-2026-05-26',
      maxAttempts: 6,
      mode: 'og',
      scope: 'daily',
      status: 'won',
      word: 'crane',
      wordLength: 5,
    }, progress)

    expect(progress.history).toHaveLength(1)
    expect(progress.stats.og.daily.played).toBe(1)
    expect(progress.progression.xp).toBeGreaterThan(0)
    expect(progress.progression.coins).toBeGreaterThan(0)
    expect(duplicate).toBe(progress)
  })
})
