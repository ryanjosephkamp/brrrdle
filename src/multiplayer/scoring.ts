import type { GameMode, PlayScope } from '../game/types'
import type { AsyncMultiplayerGame, AsyncMultiplayerPlayerId } from './asyncMultiplayer'
import type { LiveMultiplayerMatch, LiveMultiplayerPlayerId } from './liveMultiplayer'
import { getRatingBucket, type MultiplayerTransport, type RatingBucketId, type RatingOutcome, type RatedMatchEvidence } from './rating'

export type MultiplayerResultStatus = 'completed' | 'aborted' | 'expired'
export type MultiplayerResultPlayerId = AsyncMultiplayerPlayerId | LiveMultiplayerPlayerId

export interface MultiplayerPlayerPerformance {
  readonly attemptsUsed: number
  readonly completedAt?: string
  readonly outcome: RatingOutcome
  readonly playerId: MultiplayerResultPlayerId
  readonly puzzlesSolved: number
  readonly summary: string
  readonly userId?: string
}

export interface MultiplayerMatchPerformance {
  readonly bucket: RatingBucketId
  readonly customGameCode?: string
  readonly dailyDateKey?: string
  readonly endedAt?: string
  readonly mode: GameMode
  readonly ranked: boolean
  readonly scope: PlayScope
  readonly sourceMatchId: string
  readonly status: MultiplayerResultStatus
  readonly summary: string
  readonly transport: MultiplayerTransport
  readonly winnerPlayerId?: MultiplayerResultPlayerId
  readonly players: readonly MultiplayerPlayerPerformance[]
}

function otherPlayer(playerId: MultiplayerResultPlayerId): MultiplayerResultPlayerId {
  return playerId === 'player-one' ? 'player-two' : 'player-one'
}

function outcomeFor(playerId: MultiplayerResultPlayerId, winnerPlayerId: MultiplayerResultPlayerId | undefined, status: MultiplayerResultStatus): RatingOutcome {
  if (status !== 'completed' || !winnerPlayerId) {
    return 'draw'
  }
  return playerId === winnerPlayerId ? 'win' : 'loss'
}

function playerSummary(outcome: RatingOutcome, attemptsUsed: number, puzzlesSolved: number, mode: GameMode, totalPuzzles = 1): string {
  const result = outcome === 'draw' ? 'Drew' : outcome === 'win' ? 'Won' : 'Lost'
  if (mode === 'go') {
    return `${result} with ${puzzlesSolved}/${totalPuzzles} boards solved`
  }
  return `${result} in ${attemptsUsed || 0} ${attemptsUsed === 1 ? 'guess' : 'guesses'}`
}

export function projectAsyncMultiplayerPerformance(game: AsyncMultiplayerGame): MultiplayerMatchPerformance | undefined {
  if (game.status === 'waiting' || game.status === 'playing' || game.status === 'cancelled') {
    return undefined
  }
  const lastMove = game.moves[game.moves.length - 1]
  const status: MultiplayerResultStatus = game.status === 'expired' ? 'expired' : 'completed'
  const winnerPlayerId = game.winnerId ?? (game.status === 'lost' && lastMove ? otherPlayer(lastMove.playerId) : undefined)
  const bucket = game.ratingBucket ?? getRatingBucket('async', game.mode)
  const players = game.players.map((player): MultiplayerPlayerPerformance => {
    const moves = game.moves.filter((move) => move.playerId === player.id)
    const outcome = outcomeFor(player.id, winnerPlayerId, status)
    const totalPuzzles = game.serializedSession.mode === 'go' ? game.serializedSession.session.puzzles.length : 1
    const puzzlesSolved = game.mode === 'go'
      ? new Set(moves.map((move) => move.puzzleIndex)).size
      : outcome === 'win' ? 1 : 0
    return {
      attemptsUsed: moves.length,
      completedAt: game.endedAt,
      outcome,
      playerId: player.id,
      puzzlesSolved,
      summary: playerSummary(outcome, moves.length, puzzlesSolved, game.mode, totalPuzzles),
      userId: game.playerUserIds?.[player.id],
    }
  })
  return {
    bucket,
    customGameCode: game.customGameCode,
    dailyDateKey: game.dailyDateKey,
    endedAt: game.endedAt,
    mode: game.mode,
    players,
    ranked: game.ranked === true,
    scope: game.scope,
    sourceMatchId: game.id,
    status,
    summary: status === 'expired'
      ? 'Async match expired before completion'
      : winnerPlayerId
        ? `${game.players.find((player) => player.id === winnerPlayerId)?.label ?? winnerPlayerId} won the async match`
        : 'Async match ended in a draw',
    transport: 'async',
    winnerPlayerId,
  }
}

export function projectLiveMultiplayerPerformance(match: LiveMultiplayerMatch): MultiplayerMatchPerformance | undefined {
  if (match.phase !== 'finished' && match.phase !== 'expired' && match.phase !== 'aborted') {
    return undefined
  }
  const status: MultiplayerResultStatus = match.phase === 'finished' ? 'completed' : match.phase
  const bucket = match.ratingBucket ?? getRatingBucket('live', match.mode)
  const players = match.players.map((player): MultiplayerPlayerPerformance => {
    const progress = match.playerProgress.find((entry) => entry.playerId === player.id)
    const moves = progress?.moves ?? []
    const outcome = outcomeFor(player.id, match.winnerId, status)
    const totalPuzzles = progress?.serializedSession?.mode === 'go' ? progress.serializedSession.session.puzzles.length : 1
    const puzzlesSolved = match.mode === 'go'
      ? progress?.status === 'won' ? progress.serializedSession?.mode === 'go' ? progress.serializedSession.session.puzzles.length : 0 : 0
      : progress?.status === 'won' ? 1 : 0
    return {
      attemptsUsed: moves.length,
      completedAt: progress?.completedAt,
      outcome,
      playerId: player.id,
      puzzlesSolved,
      summary: playerSummary(outcome, moves.length, puzzlesSolved, match.mode, totalPuzzles),
      userId: match.playerUserIds?.[player.id],
    }
  })
  return {
    bucket,
    customGameCode: match.customGameCode,
    dailyDateKey: match.dailyDateKey,
    endedAt: match.endedAt,
    mode: match.mode,
    players,
    ranked: match.ranked === true,
    scope: match.scope,
    sourceMatchId: match.id,
    status,
    summary: status === 'expired'
      ? 'Live match expired at the UTC deadline'
      : status === 'aborted'
        ? match.abortReason ?? 'Live match was aborted'
        : match.winnerId
          ? `${match.players.find((player) => player.id === match.winnerId)?.label ?? match.winnerId} won the live match`
          : 'Live match ended in a draw',
    transport: 'live',
    winnerPlayerId: match.winnerId,
  }
}

export function createRatedEvidenceFromPerformance(
  performance: MultiplayerMatchPerformance,
  input: {
    readonly authenticated: boolean
    readonly durableResult: boolean
  },
): RatedMatchEvidence {
  return {
    authenticated: input.authenticated,
    bucket: performance.bucket,
    durableResult: input.durableResult,
    matchId: performance.sourceMatchId,
    playerResults: performance.players.flatMap((player) => player.userId ? [{
      outcome: player.outcome,
      playerId: player.playerId,
      userId: player.userId,
    }] : []),
    ranked: performance.ranked,
    terminalStatus: performance.status === 'completed' ? 'completed' : performance.status,
  }
}
