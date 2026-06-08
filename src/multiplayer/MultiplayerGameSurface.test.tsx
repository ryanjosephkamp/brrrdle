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
    expect(rivalHtml).toContain('5 attempts remaining.')
    expect(rivalHtml).toContain('Use the on-screen keyboard')
  })

  it('briefly renders a solved go puzzle on the rival board before showing the next puzzle', () => {
    const game = createMultiplayerGame({
      goPuzzleCount: 5,
      mode: 'go',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const answer = getMultiplayerAnswerWords(game)[0]
    const joined = joinMultiplayerGame({ games: [game] }, {
      gameId: game.id,
      userId: 'rival-user',
    })
    const submitted = submitMultiplayerGuess(joined.state, {
      gameId: game.id,
      guess: answer,
      playerId: 'player-one',
    })

    const rivalHtml = renderToStaticMarkup(
      <MultiplayerGameSurface
        disabled
        game={submitted.game!}
        onSubmitGuess={() => undefined}
        playerId="player-two"
        statusLabel="Advancing to the next puzzle"
      />,
    )

    expect(rivalHtml).toContain('Puzzle 1 of 5')
    for (const [index, letter] of [...answer].entries()) {
      expect(rivalHtml).toContain(`Row 1, tile ${index + 1}, ${letter}`)
    }
  })

  it('keeps prior go answers visible during the solved-row transition hold', () => {
    const game = createMultiplayerGame({
      goPuzzleCount: 5,
      mode: 'go',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const [firstAnswer, secondAnswer] = getMultiplayerAnswerWords(game)
    const joined = joinMultiplayerGame({ games: [game] }, {
      gameId: game.id,
      userId: 'rival-user',
    })
    const firstSolved = submitMultiplayerGuess(joined.state, {
      gameId: game.id,
      guess: firstAnswer,
      playerId: 'player-one',
    })
    const secondSolved = submitMultiplayerGuess(firstSolved.state, {
      gameId: game.id,
      guess: secondAnswer,
      playerId: 'player-two',
    })

    const rivalHtml = renderToStaticMarkup(
      <MultiplayerGameSurface
        disabled
        game={secondSolved.game!}
        onSubmitGuess={() => undefined}
        playerId="player-one"
        statusLabel="Advancing to the next puzzle"
      />,
    )

    expect(rivalHtml).toContain('Puzzle 2 of 5')
    for (const [index, letter] of [...firstAnswer].entries()) {
      expect(rivalHtml).toContain(`Row 1, tile ${index + 1}, ${letter}`)
    }
    for (const [index, letter] of [...secondAnswer].entries()) {
      expect(rivalHtml).toContain(`Row 2, tile ${index + 1}, ${letter}`)
    }
  })
})
