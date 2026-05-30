import type { GameMode, PlayScope } from '../game/types'
import { DEFAULT_DIFFICULTY_TIER, normalizeDifficultyTier, type DifficultyTier } from '../data/difficulty'
import { createEmptyStatistics } from '../stats/statistics'
import type { StatisticsState } from '../stats/types'

/**
 * Bumped to 2 in Phase 18.3 when `GuestSettingsState.difficultyDefault` was
 * added. Older v1 payloads are upgraded by `migrateGuestProgress` (see
 * `guestStorage.ts`), which preserves all existing coins/XP/history/stats and
 * fills the new setting with its safe Expert default — no data loss.
 */
export const GUEST_PROGRESS_SCHEMA_VERSION = 2

export interface GuestProgressionState {
  readonly coins: number
  readonly consumables: {
    readonly removeIncorrectLetters: number
    readonly revealOneLetter: number
  }
  readonly level: number
  readonly xp: number
}

export interface GuestSettingsState {
  readonly hardModeDefault: boolean
  readonly reducedMotion: boolean
  /**
   * Phase 18.3 — global default answer difficulty tier. Additive; defaults to
   * Expert so existing players keep today's behaviour. Synced to the Supabase
   * profile alongside other preferences when signed in (Phase 18.8).
   */
  readonly difficultyDefault: DifficultyTier
}

export interface GameHistoryEntry {
  readonly attemptsUsed: number
  readonly coinAward: number
  readonly completedAt: string
  readonly gameId: string
  readonly mode: GameMode
  readonly scope: PlayScope
  readonly status: 'won' | 'lost'
  readonly word: string
  readonly wordLength: number
  readonly xpAward: number
}

export interface GuestProgressState {
  readonly completedGameIds: readonly string[]
  readonly history: readonly GameHistoryEntry[]
  readonly progression: GuestProgressionState
  readonly schemaVersion: typeof GUEST_PROGRESS_SCHEMA_VERSION
  readonly settings: GuestSettingsState
  readonly stats: StatisticsState
  /**
   * Phase 18.8 — reserved, forward-compatible slot for a future
   * "resume most recent unfinished game" feature. Always omitted/undefined in
   * this phase; reserving the name keeps the serialization shape stable so the
   * feature can be enabled later without another migration. No behaviour change.
   */
  readonly resumeSlot?: unknown
}

export function createDefaultGuestSettings(): GuestSettingsState {
  return {
    hardModeDefault: false,
    reducedMotion: false,
    difficultyDefault: DEFAULT_DIFFICULTY_TIER,
  }
}

/**
 * Normalize an untrusted settings record into a complete `GuestSettingsState`,
 * filling any missing field with its safe default. Used by the v1→v2 migration
 * so persisted preferences survive the schema bump.
 */
export function normalizeGuestSettings(raw: unknown): GuestSettingsState {
  const record = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>
  return {
    hardModeDefault: typeof record.hardModeDefault === 'boolean' ? record.hardModeDefault : false,
    reducedMotion: typeof record.reducedMotion === 'boolean' ? record.reducedMotion : false,
    difficultyDefault: normalizeDifficultyTier(record.difficultyDefault),
  }
}

export function createDefaultGuestProgress(): GuestProgressState {
  return {
    completedGameIds: [],
    history: [],
    progression: {
      coins: 0,
      consumables: {
        removeIncorrectLetters: 0,
        revealOneLetter: 0,
      },
      level: 1,
      xp: 0,
    },
    schemaVersion: GUEST_PROGRESS_SCHEMA_VERSION,
    settings: createDefaultGuestSettings(),
    stats: createEmptyStatistics(),
  }
}
