import type { GameMode, PlayScope } from '../game/types'
import { DEFAULT_DIFFICULTY_TIER, normalizeDifficultyTier, type DifficultyTier } from '../data/difficulty'
import { DEFAULT_GO_PUZZLE_COUNT, normalizeGoPuzzleCount, type GoPuzzleCount } from '../game/constants'
import { DEFAULT_THEME, normalizeTheme, type Theme } from '../theme/theme'
import { createEmptyStatistics } from '../stats/statistics'
import type { StatisticsState } from '../stats/types'
import type { ResumeSlot } from './resumeSlot'
/**
 * Bumped to 2 in Phase 18.3 when `GuestSettingsState.difficultyDefault` was
 * added, and to 3 in Phase 19.2 when `GuestSettingsState.goPuzzleCountDefault`
 * was added. Older payloads (v1/v2) are upgraded by `migrateGuestProgress`
 * (see `guestStorage.ts`), which preserves all existing
 * coins/XP/history/stats and backfills any missing setting with its safe
 * default via `normalizeGuestSettings` — no data loss.
 */
export const GUEST_PROGRESS_SCHEMA_VERSION = 3

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
  /**
   * Phase 19.2 — global default go chain length (5/7/10). Additive; defaults to
   * 5 so existing players keep today's behaviour. Synced to the Supabase
   * profile alongside other preferences when signed in. The per-puzzle word
   * length is independent of this count.
   */
  readonly goPuzzleCountDefault: GoPuzzleCount
  /**
   * Phase 19.5 — global default visual theme (accent/border palette only).
   * Additive; defaults to `'icy'` so existing players keep today's look. The
   * per-puzzle layout and tile-state colors are unaffected. Synced to the
   * Supabase profile alongside other preferences when signed in.
   */
  readonly themeDefault: Theme
}

export interface GameHistoryEntry {
  readonly attemptsUsed: number
  readonly coinAward: number
  readonly completedAt: string
  /**
   * Phase 19.1 — additive, optional difficulty tier the game was played at.
   * Older history entries (pre-19.1) simply lack it and render in an
   * "untagged" group in tier-aware visualizations. Back-compatible: no
   * migration of historical rows and no default behaviour change.
   */
  readonly difficulty?: DifficultyTier
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
   * Phase 18.8 reserved a forward-compatible slot for "resume most recent
   * unfinished game"; Phase 19.3 gives it a concrete typed shape and activates
   * it. Populated only while a game is in progress and cleared on completion,
   * so it is omitted/undefined for everyone who is not mid-game (no behaviour
   * change). Validated on load via `normalizeResumeSlot` (untrusted-input safe).
   */
  readonly resumeSlot?: ResumeSlot
}

export function createDefaultGuestSettings(): GuestSettingsState {
  return {
    hardModeDefault: false,
    reducedMotion: false,
    difficultyDefault: DEFAULT_DIFFICULTY_TIER,
    goPuzzleCountDefault: DEFAULT_GO_PUZZLE_COUNT,
    themeDefault: DEFAULT_THEME,
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
    goPuzzleCountDefault: normalizeGoPuzzleCount(record.goPuzzleCountDefault),
    themeDefault: normalizeTheme(record.themeDefault),
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
