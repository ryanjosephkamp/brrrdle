import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { DEFAULT_DIFFICULTY_TIER } from '../data/difficulty'
import { DEFAULT_GO_PUZZLE_COUNT } from '../game/constants'
import { LiveMultiplayerPanel } from './LiveMultiplayerPanel'
import {
  createEmptyLiveMultiplayerState,
  createLiveMultiplayerLobby,
  joinLiveMultiplayerMatchAsSpectator,
  matchLiveMultiplayerLobby,
  startLiveMultiplayerMatch,
} from './liveMultiplayer'

function noop() {}

describe('LiveMultiplayerPanel', () => {
  it('renders a Practice Live lobby surface', () => {
    const html = renderToStaticMarkup(
      <LiveMultiplayerPanel
        authStatus="anonymous"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={createEmptyLiveMultiplayerState()}
      />,
    )

    expect(html).toContain('Practice Live Multiplayer')
    expect(html).toContain('Sign in required')
    expect(html).toContain('Match type')
    expect(html).toContain('Sign in to create, join, or play shared live rooms')
  })

  it('renders Daily Live UTC language and existing matches', () => {
    const lobby = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'go',
      scope: 'daily',
    })
    const matched = matchLiveMultiplayerLobby(
      { lobbies: [lobby], matches: [] },
      { lobbyId: lobby.id, now: '2026-06-04T12:00:03.000Z' },
    )
    const html = renderToStaticMarkup(
      <LiveMultiplayerPanel
        authStatus="authenticated"
        dailyDateKey="2026-06-04"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="daily"
        state={matched.state}
      />,
    )

    expect(html).toContain('Daily Live Multiplayer')
    expect(html).toContain('midnight UTC')
    expect(html).toContain('GO')
    expect(html).toContain('Countdown')
    expect(html).not.toContain('Word length selection')
  })

  it('pulses the join action for a non-host who can join a selected lobby', () => {
    const lobby = createLiveMultiplayerLobby({
      hostUserId: 'host-user',
      mode: 'og',
      scope: 'practice',
    })
    const html = renderToStaticMarkup(
      <LiveMultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={{ lobbies: [lobby], matches: [] }}
        viewerUserId="rival-user"
      />,
    )

    expect(html).toContain('Join live lobby')
    expect(html).toContain('animate-pulse')
  })

  it('shows creator-only cancellation for an unjoined live lobby', () => {
    const lobby = createLiveMultiplayerLobby({
      hostUserId: 'host-user',
      mode: 'og',
      scope: 'practice',
    })
    const html = renderToStaticMarkup(
      <LiveMultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={{ lobbies: [lobby], matches: [] }}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('Cancel Lobby')
  })

  it('renders an authenticated spectator as read-only', () => {
    const lobby = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:00:00.000Z',
      hostUserId: 'host-user',
      mode: 'og',
      scope: 'daily',
    })
    let state = matchLiveMultiplayerLobby(
      { lobbies: [lobby], matches: [] },
      {
        joiningUserId: 'rival-user',
        lobbyId: lobby.id,
        playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
        seed: 2,
      },
    ).state
    const matchId = state.matches[0].id
    state = startLiveMultiplayerMatch(state, matchId, '2026-06-04T12:00:05.000Z').state
    state = joinLiveMultiplayerMatchAsSpectator(state, {
      matchId,
      profile: { initials: 'SP', label: 'Spectator Pilot' },
      userId: 'spectator-user',
    }).state
    const html = renderToStaticMarkup(
      <LiveMultiplayerPanel
        authStatus="authenticated"
        dailyDateKey={state.matches[0].dailyDateKey}
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="daily"
        state={state}
        viewerUserId="spectator-user"
      />,
    )

    expect(html).toContain('Spectating read-only')
    expect(html).toContain('Spectator Pilot')
    expect(html).not.toContain('Forfeit match')
    expect(html).not.toContain('Join as Spectator')
  })
})
