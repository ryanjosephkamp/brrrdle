import { describe, expect, it } from 'vitest'
import { clearDailyOgStoredSession, DAILY_OG_STORAGE_KEY, loadDailyOgStoredSession, saveDailyOgStoredSession, type KeyValueStorage } from './dailyOgStorage'

function createMemoryStorage(): KeyValueStorage & { readonly values: Map<string, string> } {
  const values = new Map<string, string>()
  return {
    values,
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  }
}

describe('daily og storage', () => {
  it('saves, loads, and clears daily sessions', () => {
    const storage = createMemoryStorage()
    const value = {
      dateKey: '2026-05-26',
      session: {
        answer: 'slate',
        continuationCount: 0,
        currentGuess: '',
        guesses: ['slate'],
        hardMode: true,
        maxAttempts: 6,
      },
    }

    saveDailyOgStoredSession(value, storage)
    expect(loadDailyOgStoredSession(storage)).toEqual(value)
    expect(storage.values.has(DAILY_OG_STORAGE_KEY)).toBe(true)

    clearDailyOgStoredSession(storage)
    expect(loadDailyOgStoredSession(storage)).toBeUndefined()
  })

  it('ignores invalid persisted JSON', () => {
    const storage = createMemoryStorage()
    storage.setItem(DAILY_OG_STORAGE_KEY, '{not json')

    expect(loadDailyOgStoredSession(storage)).toBeUndefined()
  })
})
