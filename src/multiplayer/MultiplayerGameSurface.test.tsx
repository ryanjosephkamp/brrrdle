import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { createPracticeOgSetup } from '../game'
import { createMultiplayerGame, getMultiplayerAnswerWords, joinMultiplayerGame, submitMultiplayerGuess } from './multiplayer'
import { MultiplayerGameSurface } from './MultiplayerGameSurface'

describe('MultiplayerGameSurface', () => {
  it('renders a full board and on-screen keyboard without pay-to-continue controls', () => {
    const game = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const joined = joinMultiplayerGame({ games: [game] }, {
      gameId: game.id,
      userId: 'rival-user',
    })

    const html = renderToStaticMarkup(
      <MultiplayerGameSurface
        game={joined.game!}
        onSubmitGuess={() => undefined}
        playerId="player-one"
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

  it('renders submitted multiplayer moves on the rival board and keyboard', () => {
    const game = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const setup = createPracticeOgSetup(5, 1)
    const answer = getMultiplayerAnswerWords(game)[0]
    const firstGuess = [...setup.validGuesses].find((candidate) => candidate !== answer)!
    const joined = joinMultiplayerGame({ games: [game] }, {
      gameId: game.id,
      userId: 'rival-user',
    })
    const submitted = submitMultiplayerGuess(joined.state, {
      gameId: game.id,
      guess: firstGuess,
      playerId: 'player-one',
    })

    const rivalHtml = renderToStaticMarkup(
      <MultiplayerGameSurface
        game={submitted.game!}
        onSubmitGuess={() => undefined}
        playerId="player-two"
        statusLabel="Your turn"
      />,
    )

    for (const [index, letter] of [...firstGuess].entries()) {
      expect(rivalHtml).toContain(`Row 1, tile ${index + 1}, ${letter}`)
    }
    const keyMatch = rivalHtml.match(new RegExp(`<button[^>]*aria-label="Enter ${firstGuess[0].toLocaleUpperCase('en-US')}"[^>]*class="([^"]*)"`))
    expect(keyMatch?.[1]).toBeDefined()
    expect(keyMatch?.[1]).not.toContain('border-slate-600 bg-slate-800')
    expect(rivalHtml).toContain('Use the on-screen keyboard')
  })
})
