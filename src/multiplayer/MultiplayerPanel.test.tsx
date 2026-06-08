import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { DEFAULT_DIFFICULTY_TIER } from '../data/difficulty'
import { DEFAULT_GO_PUZZLE_COUNT } from '../game/constants'
import {
  addMultiplayerGame,
  cancelMultiplayerGame,
  createMultiplayerGame,
  createEmptyMultiplayerState,
  getMultiplayerAnswerWords,
  joinMultiplayerGame,
  submitMultiplayerGuess,
} from './multiplayer'
import { MultiplayerPanel } from './MultiplayerPanel'

function noop() {}

describe('MultiplayerPanel', () => {
  it('shows creator-only cancellation for an unjoined multiplayer lobby', () => {
    const lobby = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const state = addMultiplayerGame(createEmptyMultiplayerState(), lobby)
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={state}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('Cancel Lobby')
    expect(html).not.toContain('Forfeit match')
  })

  it('shows join but not cancellation to a rival viewing a waiting multiplayer lobby', () => {
    const lobby = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const state = addMultiplayerGame(createEmptyMultiplayerState(), lobby)
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={state}
        viewerUserId="rival-user"
      />,
    )

    expect(html).toContain('Join multiplayer match')
    expect(html).not.toContain('Cancel Lobby')
  })

  it('does not reveal answers for a cancelled daily multiplayer lobby', () => {
    const lobby = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'daily',
    })
    const cancelled = cancelMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'host-user',
    })
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        dailyDateKey="2026-06-04"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        readOnly
        scope="daily"
        state={cancelled.state}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('cancelled')
    expect(html).not.toContain('Answer and definitions')
  })

  it('shows the Practice time limit picker before a lobby is created', () => {
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={createEmptyMultiplayerState()}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('Time per side')
    expect(html).toContain('No time limit')
    expect(html).toContain('30 seconds')
  })

  it('shows Practice Hard Mode creation controls and rival-visible lobby status', () => {
    const lobby = createMultiplayerGame({
      hardMode: true,
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const state = addMultiplayerGame(createEmptyMultiplayerState(), lobby)
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={state}
        viewerUserId="rival-user"
      />,
    )

    expect(html).toContain('Hard Mode')
    expect(html).toContain('On')
    expect(html).toContain('Join multiplayer match')
  })

  it('does not show Practice Hard Mode lobby controls for Daily Multiplayer', () => {
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        dailyDateKey="2026-06-04"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="daily"
        state={createEmptyMultiplayerState()}
        viewerUserId="host-user"
      />,
    )

    expect(html).not.toContain('Hard Mode')
    expect(html).not.toContain('Time per side')
  })

  it('keeps a completed go surface visible briefly before terminal definitions', () => {
    const lobby = createMultiplayerGame({
      goPuzzleCount: 5,
      mode: 'go',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const joined = joinMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'rival-user',
    })
    const answers = getMultiplayerAnswerWords(joined.game!)
    let state = joined.state
    let current = joined.game!
    for (const answer of answers) {
      const submitted = submitMultiplayerGuess(state, {
        gameId: current.id,
        guess: answer,
        playerId: current.currentTurn,
      })
      state = submitted.state
      current = submitted.game!
    }

    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={state}
        viewerUserId="host-user"
      />,
    )

    expect(current.status).toBe('won')
    expect(html).toContain('Multiplayer guess grid')
    expect(html).toContain('Advancing to final results')
    expect(html).not.toContain('Answer and definitions')
  })

  it('does not mount the gameplay surface for an authenticated nonparticipant observer', () => {
    const lobby = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const joined = joinMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'rival-user',
    })
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={joined.state}
        viewerUserId="observer-user"
      />,
    )

    expect(joined.game?.status).toBe('playing')
    expect(html).toContain('Status: playing')
    expect(html).not.toContain('Multiplayer guess grid')
    expect(html).not.toContain('Forfeit match')
  })
})
