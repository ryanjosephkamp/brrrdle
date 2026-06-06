import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { DEFAULT_DIFFICULTY_TIER } from '../data/difficulty'
import { DEFAULT_GO_PUZZLE_COUNT } from '../game/constants'
import {
  addAsyncMultiplayerGame,
  cancelAsyncMultiplayerGame,
  createAsyncMultiplayerGame,
  createEmptyAsyncMultiplayerState,
} from './asyncMultiplayer'
import { AsyncMultiplayerPanel } from './AsyncMultiplayerPanel'

function noop() {}

describe('AsyncMultiplayerPanel', () => {
  it('shows creator-only cancellation for an unjoined async lobby', () => {
    const lobby = createAsyncMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const state = addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), lobby)
    const html = renderToStaticMarkup(
      <AsyncMultiplayerPanel
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

  it('shows join but not cancellation to a rival viewing a waiting async lobby', () => {
    const lobby = createAsyncMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const state = addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), lobby)
    const html = renderToStaticMarkup(
      <AsyncMultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={state}
        viewerUserId="rival-user"
      />,
    )

    expect(html).toContain('Join async match')
    expect(html).not.toContain('Cancel Lobby')
  })

  it('does not reveal answers for a cancelled daily async lobby', () => {
    const lobby = createAsyncMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'daily',
    })
    const cancelled = cancelAsyncMultiplayerGame(addAsyncMultiplayerGame(createEmptyAsyncMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'host-user',
    })
    const html = renderToStaticMarkup(
      <AsyncMultiplayerPanel
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
})
