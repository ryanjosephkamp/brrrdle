import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { GoGame } from './GoGame'
import { OgGame } from './OgGame'

function spendNothing() {
  return false
}

describe('solo game Hard Mode defaults', () => {
  it('starts fresh og games in Hard Mode when requested by settings', () => {
    const html = renderToStaticMarkup(
      <OgGame
        coins={0}
        defaultHardMode
        keyboardDisabled
        onSpendCoins={spendNothing}
        scope="practice"
      />,
    )

    expect(html).toMatch(/<input[^>]*type="checkbox"[^>]*checked=""/)
    expect(html).toContain('Hard mode')
  })

  it('starts fresh go games in Hard Mode when requested by settings', () => {
    const html = renderToStaticMarkup(
      <GoGame
        coins={0}
        defaultHardMode
        keyboardDisabled
        onSpendCoins={spendNothing}
        scope="practice"
      />,
    )

    expect(html).toMatch(/<input[^>]*type="checkbox"[^>]*checked=""/)
    expect(html).toContain('Hard mode')
  })
})
