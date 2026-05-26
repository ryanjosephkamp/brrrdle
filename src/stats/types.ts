import type { GameMode, GameStatus, PlayScope } from '../game/types'

export interface GameStatsBucket {
  readonly played: number
  readonly won: number
  readonly lost: number
  readonly currentStreak: number
  readonly maxStreak: number
  readonly totalAttempts: number
  readonly bestAttempts?: number
  readonly byLength: Readonly<Record<number, { readonly played: number; readonly won: number }>>
}

export type StatisticsState = Readonly<Record<GameMode, Readonly<Record<PlayScope, GameStatsBucket>>>>

export interface CompletedGameStatsInput {
  readonly attemptsUsed: number
  readonly mode: GameMode
  readonly scope: PlayScope
  readonly status: Exclude<GameStatus, 'playing'>
  readonly wordLength: number
}
