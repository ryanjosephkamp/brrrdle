import { describe, expect, it } from 'vitest'
import type { AuthState } from '../account/auth'
import {
  createMultiplayerGame,
  getMultiplayerAnswerWords,
  submitMultiplayerGuess,
} from './multiplayer'
import {
  createEmptyCompetitiveMultiplayerState,
  settleMultiplayerStateResults,
} from './competitiveMultiplayer'

const authenticated: AuthState = {
  status: 'authenticated',
  user: {
    id: 'user-a',
    roles: [],
  },
}

describe('competitive multiplayer settlement', () => {
  it('settles terminal games that arrive through a multiplayer state snapshot', () => {
    const game = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-a', 'player-two': 'user-b' },
      ranked: true,
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const submitted = submitMultiplayerGuess({ games: [game] }, {
      gameId: game.id,
      guess: getMultiplayerAnswerWords(game)[0],
      now: '2026-06-04T12:00:10.000Z',
      playerId: 'player-one',
    })

    const settled = settleMultiplayerStateResults(
      createEmptyCompetitiveMultiplayerState(),
      submitted.state,
      authenticated,
    )
    const settledAgain = settleMultiplayerStateResults(settled, submitted.state, authenticated)

    expect(settled.results).toHaveLength(1)
    expect(settled.results[0].sourceMatchId).toBe(game.id)
    expect(settled.rating.transactions).toHaveLength(2)
    expect(settledAgain.results).toHaveLength(1)
    expect(settledAgain.rating.transactions).toHaveLength(2)
  })
})
