import type { SerializedGoSession } from '../go/session'
import type { KeyValueStorage } from './dailyOgStorage'

export interface DailyGoStoredSession {
  readonly dateKey: string
  readonly session: SerializedGoSession
}

export const DAILY_GO_STORAGE_KEY = 'brrrdle:daily-go:v1'

function getBrowserStorage(): KeyValueStorage | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  return window.localStorage
}

export function loadDailyGoStoredSession(storage: KeyValueStorage | undefined = getBrowserStorage()): DailyGoStoredSession | undefined {
  const rawValue = storage?.getItem(DAILY_GO_STORAGE_KEY)
  if (!rawValue) {
    return undefined
  }

  try {
    const parsed = JSON.parse(rawValue) as DailyGoStoredSession
    if (!parsed.dateKey || !Array.isArray(parsed.session?.puzzles)) {
      return undefined
    }

    return parsed
  } catch {
    return undefined
  }
}

export function saveDailyGoStoredSession(value: DailyGoStoredSession, storage: KeyValueStorage | undefined = getBrowserStorage()): void {
  storage?.setItem(DAILY_GO_STORAGE_KEY, JSON.stringify(value))
}

export function clearDailyGoStoredSession(storage: KeyValueStorage | undefined = getBrowserStorage()): void {
  storage?.removeItem(DAILY_GO_STORAGE_KEY)
}
