import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { DailyCountdown } from './DailyCountdown'

function noop() {}

describe('DailyCountdown', () => {
  it('renders the countdown value and an accessible label in the default state', () => {
    const html = renderToStaticMarkup(
      <DailyCountdown
        alerting={false}
        clamped={false}
        countdownLabel="04:05:06"
        onActivate={noop}
        timeZone="America/New_York"
      />,
    )
    expect(html).toContain('04:05:06')
    expect(html).toContain('Next daily')
    expect(html).toMatch(/aria-label="Next daily puzzle in 04:05:06 \(America\/New_York\)/)
    expect(html).not.toContain('data-alerting')
  })

  it('switches to the reset-alert state with a live announcement', () => {
    const html = renderToStaticMarkup(
      <DailyCountdown
        alerting
        clamped={false}
        countdownLabel="00:00:00"
        onActivate={noop}
        timeZone="UTC"
      />,
    )
    expect(html).toContain('data-alerting="true"')
    expect(html).toContain('New daily ready')
    expect(html).toContain('Play now')
    expect(html).toContain('A new daily puzzle is now available.')
  })

  it('marks the clamped state via a data attribute', () => {
    const html = renderToStaticMarkup(
      <DailyCountdown
        alerting={false}
        clamped
        countdownLabel="12:00:00"
        onActivate={noop}
        timeZone="UTC"
      />,
    )
    expect(html).toContain('data-clamped="true"')
  })
})
