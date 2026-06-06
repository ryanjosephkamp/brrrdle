import { describe, expect, it } from 'vitest'
import { createAsyncMultiplayerGame, forfeitAsyncMultiplayerGame, submitAsyncMultiplayerGuess } from './asyncMultiplayer'
import {
  acknowledgeLiveMultiplayerEntry,
  createLiveMultiplayerLobby,
  getLiveMultiplayerAnswerWords,
  matchLiveMultiplayerLobby,
  startLiveMultiplayerMatch,
  submitLiveMultiplayerGuess,
} from './liveMultiplayer'
import {
  createRatedEvidenceFromPerformance,
  projectAsyncMultiplayerPerformance,
  projectLiveMultiplayerPerformance,
} from './scoring'

describe('multiplayer scoring projections', () => {
  it('projects async terminal results without mutating solo stats', () => {
    const game = createAsyncMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-a', 'player-two': 'user-b' },
      ranked: true,
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const answer = game.serializedSession.mode === 'og' ? game.serializedSession.session.answer : ''
    const result = submitAsyncMultiplayerGuess({ games: [game] }, {
      gameId: game.id,
      guess: answer,
      now: '2026-06-04T12:00:10.000Z',
    })
    const performance = projectAsyncMultiplayerPerformance(result.game!)

    expect(performance?.summary).toContain('won the async match')
    expect(performance?.players.find((player) => player.playerId === 'player-one')?.outcome).toBe('win')
    expect(createRatedEvidenceFromPerformance(performance!, { authenticated: true, durableResult: true }).playerResults).toHaveLength(2)
  })

  it('projects async forfeits as rating losses', () => {
    const game = createAsyncMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-a', 'player-two': 'user-b' },
      ranked: true,
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const result = forfeitAsyncMultiplayerGame({ games: [game] }, {
      gameId: game.id,
      now: '2026-06-04T12:00:10.000Z',
      playerId: 'player-two',
    })
    const performance = projectAsyncMultiplayerPerformance(result.game!)

    expect(performance?.winnerPlayerId).toBe('player-one')
    expect(performance?.players.find((player) => player.playerId === 'player-one')?.outcome).toBe('win')
    expect(performance?.players.find((player) => player.playerId === 'player-two')?.outcome).toBe('loss')
  })

  it('projects live finished matches with rating bucket and summary', () => {
    const lobby = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      ranked: true,
      scope: 'daily',
    })
    let state = matchLiveMultiplayerLobby(
      { lobbies: [lobby], matches: [] },
      {
        joiningUserId: 'user-b',
        lobbyId: lobby.id,
        now: '2026-06-04T12:00:01.000Z',
        playerUserIds: { 'player-one': 'user-a', 'player-two': 'user-b' },
        seed: 2,
      },
    ).state
    const matchId = state.matches[0].id
    state = acknowledgeLiveMultiplayerEntry(state, {
      actorUserId: 'user-a',
      matchId,
      now: '2026-06-04T12:00:02.000Z',
      playerId: 'player-one',
    }).state
    state = startLiveMultiplayerMatch(state, matchId, '2026-06-04T12:00:05.000Z').state
    const answer = getLiveMultiplayerAnswerWords(state.matches[0])[0]
    const submitted = submitLiveMultiplayerGuess(state, {
      guess: answer,
      matchId,
      now: '2026-06-04T12:00:10.000Z',
      playerId: 'player-two',
    })
    const performance = projectLiveMultiplayerPerformance(submitted.match!)

    expect(performance?.bucket).toBe('live:og')
    expect(performance?.winnerPlayerId).toBe('player-two')
    expect(performance?.players.find((player) => player.playerId === 'player-two')?.outcome).toBe('win')
  })
})
