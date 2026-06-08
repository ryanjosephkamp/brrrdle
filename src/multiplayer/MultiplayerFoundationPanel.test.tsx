import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MultiplayerFoundationPanel } from './MultiplayerFoundationPanel'

describe('MultiplayerFoundationPanel', () => {
  it('renders the inert future Multiplayer shell without launching current flows', () => {
    const html = renderToStaticMarkup(<MultiplayerFoundationPanel />)

    expect(html).toContain('Multiplayer')
    expect(html).toContain('Practice Multiplayer still opens from Practice')
    expect(html).toContain('Daily Multiplayer still opens from Calendar')
    expect(html).not.toContain('Open multiplayer match')
    expect(html).not.toContain('Join multiplayer match')
  })
})
