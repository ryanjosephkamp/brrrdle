import type { SerializedOgSession } from '../og/session'

export interface DailyOgStoredSession {
  readonly dateKey: string
  readonly session: SerializedOgSession
}

export interface KeyValueStorage {
  readonly getItem: (key: string) => string | null
  readonly removeItem: (key: string) => void
  readonly setItem: (key: string, value: string) => void
}

export const DAILY_OG_STORAGE_KEY = 'brrrdle:daily-og:v1'

function getBrowserStorage(): KeyValueStorage | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  return window.localStorage
}

export function loadDailyOgStoredSession(storage: KeyValueStorage | undefined = getBrowserStorage()): DailyOgStoredSession | undefined {
  const rawValue = storage?.getItem(DAILY_OG_STORAGE_KEY)
  if (!rawValue) {
    return undefined
  }

  try {
    const parsed = JSON.parse(rawValue) as DailyOgStoredSession
    if (!parsed.dateKey || !parsed.session?.answer || !Array.isArray(parsed.session.guesses)) {
      return undefined
    }

    return parsed
  } catch {
    return undefined
  }
}

export function saveDailyOgStoredSession(value: DailyOgStoredSession, storage: KeyValueStorage | undefined = getBrowserStorage()): void {
  storage?.setItem(DAILY_OG_STORAGE_KEY, JSON.stringify(value))
}

export function clearDailyOgStoredSession(storage: KeyValueStorage | undefined = getBrowserStorage()): void {
  storage?.removeItem(DAILY_OG_STORAGE_KEY)
}
