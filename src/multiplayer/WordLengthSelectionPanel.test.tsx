import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { WordLengthSelectionPanel } from './WordLengthSelectionPanel'
import {
  chooseLivePracticeWordLength,
  createLiveMultiplayerLobby,
  matchLiveMultiplayerLobby,
  resolveLivePracticeWordLength,
} from './liveMultiplayer'

function noop() {}

function createSelectionMatch() {
  const lobby = createLiveMultiplayerLobby({ createdAt: '2026-06-04T12:00:00.000Z', mode: 'og', scope: 'practice' })
  let state = matchLiveMultiplayerLobby(
    { lobbies: [lobby], matches: [] },
    { lobbyId: lobby.id, now: '2026-06-04T12:00:05.000Z' },
  ).state
  const matchId = state.matches[0].id
  state = chooseLivePracticeWordLength(state, { matchId, playerId: 'player-one', wordLength: 5 }).state
  state = chooseLivePracticeWordLength(state, { matchId, playerId: 'player-two', wordLength: 8 }).state
  return state.matches[0]
}

describe('WordLengthSelectionPanel', () => {
  it('renders the 1-minute selection controls and player choices', () => {
    const html = renderToStaticMarkup(
      <WordLengthSelectionPanel
        match={createSelectionMatch()}
        now={new Date('2026-06-04T12:00:30.000Z')}
        onChooseLength={noop}
        onCompleteAnimation={noop}
        onResolve={noop}
      />,
    )

    expect(html).toContain('Word length selection')
    expect(html).toContain('Ends in 35s')
    expect(html).toContain('Current choice: 5')
    expect(html).toContain('Current choice: 8')
  })

  it('renders the committed randomization result as a non-skippable highlight state', () => {
    const match = createSelectionMatch()
    const resolved = resolveLivePracticeWordLength(
      { lobbies: [], matches: [match] },
      { matchId: match.id, now: '2026-06-04T12:00:40.000Z', randomSeed: 1 },
    )
    const html = renderToStaticMarkup(
      <WordLengthSelectionPanel
        match={resolved.state.matches[0]}
        now={new Date('2026-06-04T12:00:41.000Z')}
        onChooseLength={noop}
        onCompleteAnimation={noop}
        onResolve={noop}
      />,
    )

    expect(html).toContain('Committed length result')
    expect(html).toContain('Highlight running')
    expect(html).toContain('Locked 8')
  })
})
