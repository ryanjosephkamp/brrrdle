import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { createAsyncMultiplayerGame, joinAsyncMultiplayerGame } from './asyncMultiplayer'
import { MultiplayerGameSurface } from './MultiplayerGameSurface'

describe('MultiplayerGameSurface', () => {
  it('renders a full board and on-screen keyboard without pay-to-continue controls', () => {
    const game = createAsyncMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const joined = joinAsyncMultiplayerGame({ games: [game] }, {
      gameId: game.id,
      userId: 'rival-user',
    })

    const html = renderToStaticMarkup(
      <MultiplayerGameSurface
        model={{ game: joined.game!, kind: 'async' }}
        onSubmitGuess={() => undefined}
        statusLabel="Your turn"
      />,
    )

    expect(html).toContain('Multiplayer guess grid')
    expect(html).toContain('Use the on-screen keyboard')
    expect(html).toContain('Q')
    expect(html).toContain('Enter')
    expect(html).not.toContain('Pay to Continue')
    expect(html).not.toContain('Reveal answer')
    expect(html).not.toContain('<input')
  })
})
