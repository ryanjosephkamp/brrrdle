import { describe, expect, it } from 'vitest'
import {
  MAX_ASYNC_MULTIPLAYER_GAMES,
  addAsyncMultiplayerGame,
  canCreateAsyncMultiplayerGame,
  canViewerCancelAsyncGame,
  cancelAsyncMultiplayerGame,
  createAsyncMultiplayerGame,
  createEmptyAsyncMultiplayerState,
  expireStaleDailyMultiplayerGames,
  forfeitAsyncMultiplayerGame,
  getViewerAsyncPlayerId,
  getAsyncMultiplayerAnswerWords,
  hasDailyAsyncMultiplayerParticipation,
  joinAsyncMultiplayerGame,
  submitAsyncMultiplayerGuess,
} from './asyncMultiplayer'

describe('async multiplayer foundation', () => {
  it('creates a daily multiplayer game with a UTC date key and deadline', () => {
    const game = createAsyncMultiplayerGame({
      createdAt: '2026-05-26T23:30:00.000Z',
      mode: 'og',
      scope: 'daily',
    })

    expect(game.dailyDateKey).toBe('2026-05-26')
    expect(game.deadlineAt).toBe('2026-05-27T00:00:00.000Z')
    expect(game.wordLength).toBe(5)
  })

  it('submits a winning og turn and records the move history', () => {
    const game = createAsyncMultiplayerGame({ mode: 'og', scope: 'practice', wordLength: 5, seed: 1 })
    const answer = getAsyncMultiplayerAnswerWords(game)[0]
    const state = addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), game)
    const result = submitAsyncMultiplayerGuess(state, {
      gameId: game.id,
      guess: answer,
      now: '2026-05-26T12:00:00.000Z',
    })

    expect(result.error).toBeUndefined()
    expect(result.game?.status).toBe('won')
    expect(result.game?.winnerId).toBe('player-one')
    expect(result.game?.moves).toHaveLength(1)
    expect(result.game?.moves[0].guess).toBe(answer)
  })

  it('keeps online async matches waiting until a second user joins', () => {
    const game = createAsyncMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const waiting = addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), game)
    const blocked = submitAsyncMultiplayerGuess(waiting, {
      gameId: game.id,
      guess: getAsyncMultiplayerAnswerWords(game)[0],
      playerId: 'player-one',
    })
    const joined = joinAsyncMultiplayerGame(waiting, {
      gameId: game.id,
      userId: 'rival-user',
    })

    expect(game.status).toBe('waiting')
    expect(blocked.error).toContain('Waiting for another player')
    expect(joined.error).toBeUndefined()
    expect(joined.game?.status).toBe('playing')
    expect(joined.game?.playerUserIds?.['player-two']).toBe('rival-user')
    expect(getViewerAsyncPlayerId(joined.game!, 'rival-user')).toBe('player-two')
  })

  it('rejects a second Daily Async claim for the same user, day, and mode', () => {
    const claimed = createAsyncMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'daily',
    })
    const available = createAsyncMultiplayerGame({
      createdAt: '2026-06-04T12:05:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      playerUserIds: { 'player-one': 'other-user' },
      scope: 'daily',
    })
    const state = { games: [available, claimed] }
    const result = joinAsyncMultiplayerGame(state, {
      gameId: available.id,
      userId: 'user-1',
    })

    expect(hasDailyAsyncMultiplayerParticipation(state, '2026-06-04', 'og', 'user-1')).toBe(true)
    expect(result.error).toContain('already claimed')
  })

  it('allows separate Daily Async OG and GO claims for the same user and UTC day', () => {
    const og = createAsyncMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'daily',
    })
    const go = createAsyncMultiplayerGame({
      createdAt: '2026-06-04T12:02:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'go',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'daily',
    })
    const state = addAsyncMultiplayerGame(addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), og), go)

    expect(state.games.map((game) => game.mode).sort()).toEqual(['go', 'og'])
    expect(hasDailyAsyncMultiplayerParticipation(state, '2026-06-04', 'og', 'user-1')).toBe(true)
    expect(hasDailyAsyncMultiplayerParticipation(state, '2026-06-04', 'go', 'user-1')).toBe(true)
  })

  it('rejects async turns from the wrong player seat', () => {
    const game = createAsyncMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const joined = joinAsyncMultiplayerGame(addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), game), {
      gameId: game.id,
      userId: 'rival-user',
    })
    const rejected = submitAsyncMultiplayerGuess(joined.state, {
      gameId: game.id,
      guess: getAsyncMultiplayerAnswerWords(game)[0],
      playerId: 'player-two',
    })

    expect(rejected.error).toContain('not this player')
  })

  it('lets either player forfeit an online async match', () => {
    const game = createAsyncMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const joined = joinAsyncMultiplayerGame(addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), game), {
      gameId: game.id,
      userId: 'rival-user',
    })
    const forfeited = forfeitAsyncMultiplayerGame(joined.state, {
      gameId: game.id,
      now: '2026-06-04T13:00:00.000Z',
      playerId: 'player-two',
    })

    expect(forfeited.error).toBeUndefined()
    expect(forfeited.game?.status).toBe('lost')
    expect(forfeited.game?.winnerId).toBe('player-one')
    expect(forfeited.game?.endedAt).toBe('2026-06-04T13:00:00.000Z')
  })

  it('advances a go chain turn without losing the serialized chain state', () => {
    const game = createAsyncMultiplayerGame({ goPuzzleCount: 5, mode: 'go', scope: 'practice', wordLength: 5, seed: 1 })
    const firstAnswer = getAsyncMultiplayerAnswerWords(game)[0]
    const state = addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), game)
    const result = submitAsyncMultiplayerGuess(state, {
      gameId: game.id,
      guess: firstAnswer,
      now: '2026-05-26T12:00:00.000Z',
    })

    expect(result.error).toBeUndefined()
    expect(result.game?.status).toBe('playing')
    expect(result.game?.currentTurn).toBe('player-two')
    expect(result.game?.serializedSession.mode).toBe('go')
    if (result.game?.serializedSession.mode === 'go') {
      expect(result.game.serializedSession.session.currentPuzzleIndex).toBe(1)
    }
  })

  it('expires in-progress daily multiplayer games after their UTC day changes', () => {
    const game = createAsyncMultiplayerGame({
      createdAt: '2026-05-26T12:00:00.000Z',
      mode: 'og',
      scope: 'daily',
    })
    const expired = expireStaleDailyMultiplayerGames(
      addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), game),
      new Date('2026-05-27T00:00:01.000Z'),
    )

    expect(expired.games[0].status).toBe('expired')
    expect(expired.games[0].endedAt).toBe('2026-05-27T00:00:01.000Z')
  })

  it('enforces the five active async game limit', () => {
    let state = createEmptyAsyncMultiplayerState()
    for (let index = 0; index < MAX_ASYNC_MULTIPLAYER_GAMES; index += 1) {
      state = addAsyncMultiplayerGame(state, createAsyncMultiplayerGame({ mode: 'og', scope: 'practice', seed: index, wordLength: 5 }))
    }

    expect(canCreateAsyncMultiplayerGame(state)).toBe(false)
    const rejected = addAsyncMultiplayerGame(state, createAsyncMultiplayerGame({ mode: 'og', scope: 'practice', seed: 99, wordLength: 5 }))
    expect(rejected.games).toHaveLength(MAX_ASYNC_MULTIPLAYER_GAMES)
  })

  it('scopes the active async game limit to the authenticated player', () => {
    let state = createEmptyAsyncMultiplayerState()
    for (let index = 0; index < MAX_ASYNC_MULTIPLAYER_GAMES; index += 1) {
      state = addAsyncMultiplayerGame(state, createAsyncMultiplayerGame({
        mode: 'og',
        playerUserIds: { 'player-one': `other-${index}` },
        scope: 'practice',
        seed: index,
        wordLength: 5,
      }))
    }

    expect(canCreateAsyncMultiplayerGame(state, 'user-1')).toBe(true)

    for (let index = 0; index < MAX_ASYNC_MULTIPLAYER_GAMES; index += 1) {
      state = addAsyncMultiplayerGame(state, createAsyncMultiplayerGame({
        mode: 'og',
        playerUserIds: { 'player-one': 'user-1' },
        scope: 'practice',
        seed: 100 + index,
        wordLength: 5,
      }))
    }

    expect(canCreateAsyncMultiplayerGame(state, 'user-1')).toBe(false)
    const rejected = addAsyncMultiplayerGame(state, createAsyncMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'practice',
      seed: 999,
      wordLength: 5,
    }))
    expect(rejected.games.filter((game) => game.playerUserIds?.['player-one'] === 'user-1')).toHaveLength(MAX_ASYNC_MULTIPLAYER_GAMES)
  })

  it('blocks duplicate Daily Async creation in the domain layer', () => {
    const first = createAsyncMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'go',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'daily',
    })
    const duplicate = createAsyncMultiplayerGame({
      createdAt: '2026-06-04T12:02:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'go',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'daily',
    })
    const state = addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), first)
    const next = addAsyncMultiplayerGame(state, duplicate)

    expect(next.games.map((game) => game.id)).toEqual([first.id])
  })

  it('lets only the creator cancel an unjoined async lobby and releases the Daily claim', () => {
    const lobby = createAsyncMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'daily',
    })
    const state = addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), lobby)
    const rivalDenied = cancelAsyncMultiplayerGame(state, {
      gameId: lobby.id,
      userId: 'rival-user',
    })
    const cancelled = cancelAsyncMultiplayerGame(state, {
      gameId: lobby.id,
      now: '2026-06-04T12:05:00.000Z',
      userId: 'host-user',
    })

    expect(canViewerCancelAsyncGame(lobby, 'host-user')).toBe(true)
    expect(rivalDenied.error).toContain('Only the creator')
    expect(cancelled.error).toBeUndefined()
    expect(cancelled.game?.status).toBe('cancelled')
    expect(canCreateAsyncMultiplayerGame(cancelled.state, 'host-user')).toBe(true)
    expect(hasDailyAsyncMultiplayerParticipation(cancelled.state, '2026-06-04', 'og', 'host-user')).toBe(false)
  })
})
