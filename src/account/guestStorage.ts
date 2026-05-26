import { calculateCoinAward, calculateXpAward, getLevelForXp } from '../progression'
import { updateStatistics } from '../stats/statistics'
import type { CompletedGameStatsInput } from '../stats/types'
import { createDefaultGuestProgress, GUEST_PROGRESS_SCHEMA_VERSION, type GameHistoryEntry, type GuestProgressState } from './storageSchema'

export interface KeyValueStorage {
  readonly getItem: (key: string) => string | null
  readonly removeItem: (key: string) => void
  readonly setItem: (key: string, value: string) => void
}

export const GUEST_PROGRESS_STORAGE_KEY = 'brrrdle:guest-progress:v1'

function getBrowserStorage(): KeyValueStorage | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  return window.localStorage
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function isGuestProgressState(value: unknown): value is GuestProgressState {
  return isRecord(value)
    && value.schemaVersion === GUEST_PROGRESS_SCHEMA_VERSION
    && isRecord(value.progression)
    && typeof value.progression.xp === 'number'
    && typeof value.progression.level === 'number'
    && typeof value.progression.coins === 'number'
    && isRecord(value.settings)
    && isRecord(value.stats)
    && Array.isArray(value.history)
    && Array.isArray(value.completedGameIds)
}

export function loadGuestProgress(storage: KeyValueStorage | undefined = getBrowserStorage()): GuestProgressState {
  const rawValue = storage?.getItem(GUEST_PROGRESS_STORAGE_KEY)
  if (!rawValue) {
    return createDefaultGuestProgress()
  }

  try {
    const parsed: unknown = JSON.parse(rawValue)
    return isGuestProgressState(parsed) ? parsed : createDefaultGuestProgress()
  } catch {
    return createDefaultGuestProgress()
  }
}

export function saveGuestProgress(value: GuestProgressState, storage: KeyValueStorage | undefined = getBrowserStorage()): void {
  storage?.setItem(GUEST_PROGRESS_STORAGE_KEY, JSON.stringify(value))
}

export function resetGuestProgress(storage: KeyValueStorage | undefined = getBrowserStorage()): GuestProgressState {
  const progress = createDefaultGuestProgress()
  saveGuestProgress(progress, storage)
  return progress
}

export function exportGuestProgress(progress: GuestProgressState = loadGuestProgress()): string {
  return JSON.stringify(progress, null, 2)
}

export interface CompletedGameInput extends CompletedGameStatsInput {
  readonly gameId: string
  readonly maxAttempts: number
  readonly puzzleCount?: number
  readonly word: string
}

export function recordCompletedGame(
  input: CompletedGameInput,
  currentProgress: GuestProgressState = loadGuestProgress(),
): GuestProgressState {
  if (currentProgress.completedGameIds.includes(input.gameId)) {
    return currentProgress
  }

  const xpAward = calculateXpAward(input)
  const coinAward = calculateCoinAward(input)
  const xp = currentProgress.progression.xp + xpAward
  const historyEntry: GameHistoryEntry = {
    attemptsUsed: input.attemptsUsed,
    coinAward,
    completedAt: new Date().toISOString(),
    gameId: input.gameId,
    mode: input.mode,
    scope: input.scope,
    status: input.status,
    word: input.word,
    wordLength: input.wordLength,
    xpAward,
  }

  return {
    ...currentProgress,
    completedGameIds: [...currentProgress.completedGameIds, input.gameId],
    history: [historyEntry, ...currentProgress.history].slice(0, 200),
    progression: {
      ...currentProgress.progression,
      coins: currentProgress.progression.coins + coinAward,
      level: getLevelForXp(xp),
      xp,
    },
    stats: updateStatistics(currentProgress.stats, input),
  }
}
