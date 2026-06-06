import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MultiplayerStatsPanel } from './MultiplayerStatsPanel'

describe('MultiplayerStatsPanel', () => {
  it('renders empty competitive multiplayer state without touching solo stats', () => {
    const html = renderToStaticMarkup(<MultiplayerStatsPanel />)

    expect(html).toContain('Competitive multiplayer')
    expect(html).toContain('No rated results yet')
    expect(html).toContain('No multiplayer results recorded yet')
  })

  it('renders rating profiles and recent result summaries', () => {
    const html = renderToStaticMarkup(
      <MultiplayerStatsPanel
        state={{
          customGames: [],
          rating: {
            profiles: [{
              bucket: 'multiplayer:og',
              draws: 0,
              gamesPlayed: 1,
              losses: 0,
              provisional: true,
              rating: 1220,
              updatedAt: '2026-06-04T12:00:00.000Z',
              userId: 'user-a',
              wins: 1,
            }],
            transactions: [],
          },
          results: [{
            bucket: 'multiplayer:og',
            mode: 'og',
            players: [],
            ranked: true,
            scope: 'practice',
            sourceMatchId: 'match-1',
            status: 'completed',
            summary: 'You won the multiplayer match',
          }],
        }}
      />,
    )

    expect(html).toContain('1220')
    expect(html).toContain('MULTIPLAYER OG')
    expect(html).toContain('You won the multiplayer match')
  })
})
