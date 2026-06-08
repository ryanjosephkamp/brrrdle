import { describe, expect, it } from 'vitest'
import { DEFAULT_GO_PUZZLE_COUNT } from '../game/constants'
import { createPracticeGoSetup } from '../game'
import {
  createMultiplayerGame,
  forfeitMultiplayerGame,
  getMultiplayerSessionForPlayer,
  submitMultiplayerGuess,
} from './multiplayer'
import {
  createRatedEvidenceFromPerformance,
  projectMultiplayerPerformance,
} from './scoring'

describe('multiplayer scoring projections', () => {
  it('projects multiplayer terminal results without mutating solo stats', () => {
    const game = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-a', 'player-two': 'user-b' },
      ranked: true,
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const answer = game.serializedSession.mode === 'og' ? game.serializedSession.session.answer : ''
    const result = submitMultiplayerGuess({ games: [game] }, {
      gameId: game.id,
      guess: answer,
      now: '2026-06-04T12:00:10.000Z',
    })
    const performance = projectMultiplayerPerformance(result.game!)

    expect(performance?.summary).toContain('won the multiplayer match')
    expect(performance?.players.find((player) => player.playerId === 'player-one')?.outcome).toBe('win')
    expect(createRatedEvidenceFromPerformance(performance!, { authenticated: true, durableResult: true }).playerResults).toHaveLength(2)
  })

  it('projects multiplayer forfeits as rating losses', () => {
    const game = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-a', 'player-two': 'user-b' },
      ranked: true,
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const result = forfeitMultiplayerGame({ games: [game] }, {
      gameId: game.id,
      now: '2026-06-04T12:00:10.000Z',
      playerId: 'player-two',
    })
    const performance = projectMultiplayerPerformance(result.game!)

    expect(performance?.winnerPlayerId).toBe('player-one')
    expect(performance?.players.find((player) => player.playerId === 'player-one')?.outcome).toBe('win')
    expect(performance?.players.find((player) => player.playerId === 'player-two')?.outcome).toBe('loss')
  })

  it('awards deterministic points and declares a points winner when nobody solves OG', () => {
    const game = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-a', 'player-two': 'user-b' },
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const terminal = {
      ...game,
      endedAt: '2026-06-04T12:10:00.000Z',
      moves: [
        {
          createdAt: '2026-06-04T12:00:10.000Z',
          guess: 'abcde',
          id: 'move-1',
          playerId: 'player-one' as const,
          puzzleIndex: 0,
          tiles: [
            { letter: 'a', state: 'correct' as const },
            { letter: 'b', state: 'present' as const },
            { letter: 'c', state: 'absent' as const },
            { letter: 'd', state: 'absent' as const },
            { letter: 'e', state: 'absent' as const },
          ],
        },
        {
          createdAt: '2026-06-04T12:01:10.000Z',
          guess: 'fghij',
          id: 'move-2',
          playerId: 'player-two' as const,
          puzzleIndex: 0,
          tiles: [
            { letter: 'f', state: 'present' as const },
            { letter: 'g', state: 'absent' as const },
            { letter: 'h', state: 'absent' as const },
            { letter: 'i', state: 'absent' as const },
            { letter: 'j', state: 'absent' as const },
          ],
        },
      ],
      status: 'lost' as const,
      winnerId: 'player-one' as const,
    }

    const performance = projectMultiplayerPerformance(terminal)

    expect(performance?.winnerPlayerId).toBe('player-one')
    expect(performance?.players.find((player) => player.playerId === 'player-one')?.points).toBeGreaterThan(
      performance?.players.find((player) => player.playerId === 'player-two')?.points ?? 0,
    )
    expect(performance?.summary).toContain('won on points')
  })

  it('adds a modest Hard Mode bonus to solved multiplayer scores', () => {
    const normalGame = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-a', 'player-two': 'user-b' },
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const hardGame = { ...normalGame, hardMode: true }
    const answer = normalGame.serializedSession.mode === 'og' ? normalGame.serializedSession.session.answer : ''
    const normal = submitMultiplayerGuess({ games: [normalGame] }, {
      gameId: normalGame.id,
      guess: answer,
      now: '2026-06-04T12:00:10.000Z',
      playerId: 'player-one',
    })
    const hard = submitMultiplayerGuess({ games: [hardGame] }, {
      gameId: hardGame.id,
      guess: answer,
      now: '2026-06-04T12:00:10.000Z',
      playerId: 'player-one',
    })

    const normalPoints = projectMultiplayerPerformance(normal.game!)?.players.find((player) => player.playerId === 'player-one')?.points
    const hardPoints = projectMultiplayerPerformance(hard.game!)?.players.find((player) => player.playerId === 'player-one')?.points

    expect(hardPoints).toBeGreaterThan(normalPoints ?? 0)
  })

  it('declares GO winners by total points across the full session', () => {
    const game = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      goPuzzleCount: DEFAULT_GO_PUZZLE_COUNT,
      mode: 'go',
      playerUserIds: { 'player-one': 'user-a', 'player-two': 'user-b' },
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const setup = createPracticeGoSetup(5, 1, undefined, DEFAULT_GO_PUZZLE_COUNT)
    let current = game
    for (let turn = 0; current.status === 'playing' && turn < 40; turn += 1) {
      const playerId = current.currentTurn
      const playerSession = getMultiplayerSessionForPlayer(current, playerId)
      if (playerSession.mode !== 'go') {
        throw new Error('Expected GO multiplayer session')
      }
      const puzzle = playerSession.session.puzzles[playerSession.session.currentPuzzleIndex]
      const wrongGuess = [...setup.validGuesses].find((candidate) => candidate !== puzzle.answer)
      const result = submitMultiplayerGuess({ games: [current] }, {
        gameId: current.id,
        guess: playerId === 'player-one' ? puzzle.answer : wrongGuess!,
        now: `2026-06-04T12:00:${(turn + 1).toString().padStart(2, '0')}.000Z`,
        playerId,
      })
      if (result.error || !result.game) {
        throw new Error(result.error ?? 'Expected GO submission to continue')
      }
      current = result.game
    }
    const performance = projectMultiplayerPerformance(current)

    expect(current.status).toBe('won')
    expect(performance?.winnerPlayerId).toBe('player-one')
    expect(performance?.summary).toContain('won on points')
    expect(performance?.players.find((player) => player.playerId === 'player-one')?.points).toBeGreaterThan(
      performance?.players.find((player) => player.playerId === 'player-two')?.points ?? 0,
    )
  })
})
