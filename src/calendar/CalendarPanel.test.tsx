import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { CalendarPanel } from './CalendarPanel'
import { createDefaultGuestProgress } from '../account/storageSchema'

function noop() {}

function renderPanel(overrides: Partial<Parameters<typeof CalendarPanel>[0]> = {}) {
  return renderToStaticMarkup(
    <CalendarPanel
      guestProgress={createDefaultGuestProgress()}
      keyboardDisabled
      onGameComplete={noop}
      onMarkPastDailyUnlocked={noop}
      onResumeCapture={noop}
      onSpendCoins={() => true}
      onUpdateSettings={noop}
      todayDateKey="2025-06-15"
      {...overrides}
    />,
  )
}

describe('CalendarPanel', () => {
  it('renders the daily hub with today quick-play buttons and a month grid', () => {
    const html = renderPanel()
    expect(html).toContain('Calendar')
    expect(html).toContain('Play Today')
    expect(html).toContain('June 2025')
    // Quick-play buttons for both modes are present.
    expect(html).toContain('OG')
    expect(html).toContain('GO')
  })

  it('shows the daily streak readouts from stats', () => {
    const html = renderPanel()
    expect(html).toContain('OG daily streak')
    expect(html).toContain('GO daily streak')
  })

  it('launches the requested daily when given an external launch request', () => {
    const html = renderPanel({ launchRequest: { mode: 'og', dateKey: '2025-06-15' } })
    // Once launched, the inline daily view shows the back-to-calendar control.
    expect(html).toContain('Back to Calendar')
  })
})
