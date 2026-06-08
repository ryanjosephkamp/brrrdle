import type { AuthState } from '../account/auth'
import type { MultiplayerGame, MultiplayerState } from './multiplayer'
import type { CustomGameLobby } from './customGames'
import { normalizeCustomGameLobby } from './customGames'
import {
  applyRatedMatch,
  createEmptyRatingState,
  normalizeRatingState,
  type MultiplayerRatingState,
  type MultiplayerRatingTransaction,
} from './rating'
import {
  createRatedEvidenceFromPerformance,
  projectMultiplayerPerformance,
  type MultiplayerMatchPerformance,
} from './scoring'

export interface MultiplayerCompetitiveState {
  readonly customGames: readonly CustomGameLobby[]
  readonly rating: MultiplayerRatingState
  readonly results: readonly MultiplayerMatchPerformance[]
}

export interface SettleMultiplayerResult {
  readonly performance?: MultiplayerMatchPerformance
  readonly state: MultiplayerCompetitiveState
  readonly transactions: readonly MultiplayerRatingTransaction[]
}

export function createEmptyCompetitiveMultiplayerState(): MultiplayerCompetitiveState {
  return {
    customGames: [],
    rating: createEmptyRatingState(),
    results: [],
  }
}

export function normalizeCompetitiveMultiplayerState(value: unknown): MultiplayerCompetitiveState {
  if (typeof value !== 'object' || value === null) {
    return createEmptyCompetitiveMultiplayerState()
  }
  const record = value as Record<string, unknown>
  const results = Array.isArray(record.results)
    ? record.results.flatMap((result): MultiplayerMatchPerformance[] => {
        if (typeof result !== 'object' || result === null) {
          return []
        }
        const row = result as MultiplayerMatchPerformance & { readonly transport?: unknown }
        return typeof row.sourceMatchId === 'string' ? [{
          bucket: row.bucket,
          customGameCode: row.customGameCode,
          dailyDateKey: row.dailyDateKey,
          endedAt: row.endedAt,
          mode: row.mode,
          players: row.players,
          ranked: row.ranked,
          scope: row.scope,
          sourceMatchId: row.sourceMatchId,
          status: row.status,
          summary: typeof row.summary === 'string' ? row.summary.replace(/\b(async|live)\b/gi, 'multiplayer') : row.summary,
          winnerPlayerId: row.winnerPlayerId,
        }] : []
      })
    : []
  return {
    customGames: Array.isArray(record.customGames) ? record.customGames.flatMap((game) => normalizeCustomGameLobby(game) ?? []) : [],
    rating: normalizeRatingState(record.rating),
    results,
  }
}

export function upsertCustomGameLobby(state: MultiplayerCompetitiveState, lobby: CustomGameLobby): MultiplayerCompetitiveState {
  const normalized = normalizeCompetitiveMultiplayerState(state)
  return {
    ...normalized,
    customGames: [lobby, ...normalized.customGames.filter((entry) => entry.id !== lobby.id)].slice(0, 25),
  }
}

function upsertPerformance(state: MultiplayerCompetitiveState, performance: MultiplayerMatchPerformance): MultiplayerCompetitiveState {
  return {
    ...state,
    results: [performance, ...state.results.filter((entry) => entry.sourceMatchId !== performance.sourceMatchId)].slice(0, 100),
  }
}

export function getLocalRatingUserIds(authState: AuthState): Partial<Record<'player-one' | 'player-two', string>> {
  if (authState.status !== 'authenticated' || !authState.user) {
    return {}
  }
  return {
    'player-one': authState.user.id,
    'player-two': 'matched-rival',
  }
}

function durableResultForPerformance(authState: AuthState, performance: MultiplayerMatchPerformance): boolean {
  return authState.status === 'authenticated'
    && performance.players.length === 2
    && performance.players.every((player) => player.userId && !player.userId.startsWith('preview-rival-'))
}

export function settleMultiplayerResult(
  state: MultiplayerCompetitiveState,
  game: MultiplayerGame,
  authState: AuthState,
): SettleMultiplayerResult {
  const normalized = normalizeCompetitiveMultiplayerState(state)
  const performance = projectMultiplayerPerformance(game)
  if (!performance) {
    return { state: normalized, transactions: [] }
  }
  const nextWithResult = upsertPerformance(normalized, performance)
  const applied = applyRatedMatch(
    nextWithResult.rating,
    createRatedEvidenceFromPerformance(performance, {
      authenticated: authState.status === 'authenticated',
      durableResult: durableResultForPerformance(authState, performance),
    }),
  )
  return {
    performance,
    state: { ...nextWithResult, rating: applied.state },
    transactions: applied.transactions,
  }
}

export function settleMultiplayerStateResults(
  state: unknown,
  multiplayer: MultiplayerState,
  authState: AuthState,
): MultiplayerCompetitiveState {
  return multiplayer.games.reduce(
    (nextState, game) => settleMultiplayerResult(nextState, game, authState).state,
    normalizeCompetitiveMultiplayerState(state),
  )
}

export function mergeCompetitiveMultiplayerStates(left: unknown, right: unknown): MultiplayerCompetitiveState {
  const local = normalizeCompetitiveMultiplayerState(left)
  const cloud = normalizeCompetitiveMultiplayerState(right)
  const profileMap = new Map(cloud.rating.profiles.map((profile) => [`${profile.bucket}:${profile.userId}`, profile]))
  for (const profile of local.rating.profiles) {
    const existing = profileMap.get(`${profile.bucket}:${profile.userId}`)
    if (!existing || profile.updatedAt >= existing.updatedAt) {
      profileMap.set(`${profile.bucket}:${profile.userId}`, profile)
    }
  }
  const transactionMap = new Map(cloud.rating.transactions.map((transaction) => [transaction.id, transaction]))
  for (const transaction of local.rating.transactions) {
    transactionMap.set(transaction.id, transaction)
  }
  const resultMap = new Map(cloud.results.map((result) => [result.sourceMatchId, result]))
  for (const result of local.results) {
    resultMap.set(result.sourceMatchId, result)
  }
  const customGameMap = new Map(cloud.customGames.map((game) => [game.id, game]))
  for (const game of local.customGames) {
    customGameMap.set(game.id, game)
  }
  return {
    customGames: Array.from(customGameMap.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 25),
    rating: {
      profiles: Array.from(profileMap.values()).sort((a, b) => a.bucket.localeCompare(b.bucket) || a.userId.localeCompare(b.userId)),
      transactions: Array.from(transactionMap.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 200),
    },
    results: Array.from(resultMap.values()).sort((a, b) => (b.endedAt ?? '').localeCompare(a.endedAt ?? '')).slice(0, 100),
  }
}
