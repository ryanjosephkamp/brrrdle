/**
 * Phase 22 — Cross-page daily countdown indicator + subtle reset alert.
 *
 * Source of truth: PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02 / §27.
 *
 * A lightweight, non-intrusive pill that shows the time until the next local
 * daily reset. It is:
 *  - visible on every page (mounted at the app-shell level),
 *  - clickable (navigates to the daily game),
 *  - theme-ready (styled entirely through CSS variables + data attributes in
 *    `index.css`, so future themes can restyle it without touching this file),
 *  - the surface for the subtle, non-modal reset alert (a gentle glow + label
 *    swap + polite live-region announcement) when a new daily becomes available.
 *
 * It renders no audio itself; the unique reset sound is played by the app shell
 * when the underlying daily cycle reports a rollover.
 */

export interface DailyCountdownProps {
  /** Zero-padded `HH:MM:SS` time until the next local midnight. */
  readonly countdownLabel: string
  /** Device IANA timezone label, shown for clarity (e.g. `America/New_York`). */
  readonly timeZone: string
  /** True while the anti-gaming guard is withholding a new daily. */
  readonly clamped: boolean
  /** True briefly after a new daily becomes available (drives the glow). */
  readonly alerting: boolean
  /** Invoked when the player taps/clicks the indicator (navigate to daily). */
  readonly onActivate: () => void
}

export function DailyCountdown({ countdownLabel, timeZone, clamped, alerting, onActivate }: DailyCountdownProps) {
  const headline = alerting ? 'New daily ready' : 'Next daily'
  const ariaLabel = alerting
    ? 'A new daily puzzle is available. Open the daily game.'
    : `Next daily puzzle in ${countdownLabel} (${timeZone}). Open the daily game.`

  return (
    <div className="brrrdle-daily-countdown-region">
      <button
        aria-label={ariaLabel}
        className="brrrdle-daily-countdown"
        data-alerting={alerting ? 'true' : undefined}
        data-clamped={clamped ? 'true' : undefined}
        onClick={onActivate}
        type="button"
      >
        <span aria-hidden="true" className="brrrdle-daily-countdown-dot" />
        <span className="brrrdle-daily-countdown-body">
          <span className="brrrdle-daily-countdown-label">{headline}</span>
          <span className="brrrdle-daily-countdown-value">{alerting ? 'Play now' : countdownLabel}</span>
        </span>
      </button>
      <span aria-live="polite" className="brrrdle-visually-hidden" role="status">
        {alerting ? 'A new daily puzzle is now available.' : ''}
      </span>
    </div>
  )
}
