/**
 * Phase 22 Addendum (§27.10) — Calendar panel.
 *
 * Source of truth: PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.
 *
 * The Calendar is the single, central hub for all daily play. It surfaces:
 *  - prominent "Play Today's OG" / "Play Today's GO" buttons,
 *  - a month grid (Jan 1 2025 → today) with per-day OG/GO completion badges,
 *  - coin-gated access to past dailies (fixed 60-coin unlock, confirmation
 *    modal, "first guess = permanently unlocked"),
 *  - current/longest daily streak readouts,
 * and it renders the full OG/GO daily experience inline (resume, hard mode,
 * stats, definitions) for whichever day the player launches.
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CompletedGameInput, loadGuestProgress, ResumeCapture } from '../account'
import type { DifficultyTier } from '../data'
import type { GoPuzzleCount } from '../game/constants'
import type { GameMode } from '../game/types'
import { Button, Dialog, Panel } from '../ui'
import { GoGame } from '../app/games/GoGame'
import { OgGame } from '../app/games/OgGame'
import {
  isDailyUnlocked,
  PAST_DAILY_UNLOCK_COST,
} from '../daily'
import {
  addMonths,
  buildCalendarMonth,
  type CalendarDay,
  deriveDailyCompletion,
  getDailyStreaks,
  monthOfKey,
  WEEKDAY_LABELS,
} from './calendarModel'

type GuestProgress = ReturnType<typeof loadGuestProgress>

export interface CalendarLaunchRequest {
  readonly mode: GameMode
  /** Target day; omit/equal-to-today for the live daily. */
  readonly dateKey: string
}

export interface CalendarPanelProps {
  readonly guestProgress: GuestProgress
  /** Granted current daily day key (handles anti-gaming / simulated clock). */
  readonly todayDateKey: string
  readonly keyboardDisabled?: boolean
  readonly onGameComplete: (input: CompletedGameInput) => void
  readonly onResumeCapture: (capture: ResumeCapture) => void
  readonly onSpendCoins: (amount: number) => boolean
  readonly onMarkPastDailyUnlocked: (mode: GameMode, dateKey: string) => void
  readonly onUpdateSettings: (patch: Partial<GuestProgress['settings']>) => void
  /** External launch request (countdown tap, resume, legacy route redirect). */
  readonly launchRequest?: CalendarLaunchRequest | null
  /** Called once an external launch request has been consumed. */
  readonly onLaunchConsumed?: () => void
}

interface ActiveDaily {
  readonly mode: GameMode
  readonly dateKey: string
  readonly isPast: boolean
}

function isUnlockedForPlay(
  guestProgress: GuestProgress,
  mode: GameMode,
  dateKey: string,
  completion: { readonly og: ReadonlySet<string>; readonly go: ReadonlySet<string> },
): boolean {
  if (isDailyUnlocked(guestProgress.unlockedDailies, mode, dateKey)) {
    return true
  }
  // A previously completed past daily stays accessible without paying again.
  return (mode === 'og' ? completion.og : completion.go).has(dateKey)
}

export function CalendarPanel({
  guestProgress,
  todayDateKey,
  keyboardDisabled,
  onGameComplete,
  onResumeCapture,
  onSpendCoins,
  onMarkPastDailyUnlocked,
  onUpdateSettings,
  launchRequest,
  onLaunchConsumed,
}: CalendarPanelProps) {
  const [viewMonth, setViewMonth] = useState(() => monthOfKey(todayDateKey))
  const [activeDaily, setActiveDaily] = useState<ActiveDaily | null>(null)
  const [consumedLaunch, setConsumedLaunch] = useState<CalendarLaunchRequest | null>(null)
  const [pendingUnlock, setPendingUnlock] = useState<{ readonly mode: GameMode; readonly dateKey: string } | null>(null)

  const coins = guestProgress.progression.coins
  const completion = useMemo(
    () => deriveDailyCompletion(guestProgress.completedGameIds),
    [guestProgress.completedGameIds],
  )
  const streaks = useMemo(() => getDailyStreaks(guestProgress.stats), [guestProgress.stats])
  const month = useMemo(
    () => buildCalendarMonth({ year: viewMonth.year, month: viewMonth.month, todayDateKey }),
    [todayDateKey, viewMonth.month, viewMonth.year],
  )

  const launchDaily = useCallback((mode: GameMode, dateKey: string) => {
    setActiveDaily({ mode, dateKey, isPast: dateKey !== todayDateKey })
  }, [todayDateKey])

  // Honor external launch requests (countdown tap, daily resume, legacy route
  // redirect). Setting local state during render of *this* component (guarded by
  // the previously consumed request) is the React-recommended way to react to a
  // changing prop without a cascading effect.
  if (launchRequest && launchRequest !== consumedLaunch) {
    setConsumedLaunch(launchRequest)
    setActiveDaily({
      mode: launchRequest.mode,
      dateKey: launchRequest.dateKey,
      isPast: launchRequest.dateKey !== todayDateKey,
    })
  }

  // Notify the parent that the request has been applied so it can clear it.
  useEffect(() => {
    if (launchRequest && launchRequest === consumedLaunch) {
      onLaunchConsumed?.()
    }
  }, [consumedLaunch, launchRequest, onLaunchConsumed])

  const requestDay = useCallback((mode: GameMode, day: CalendarDay) => {
    if (!day.dateKey || day.isFuture || day.isBeforeStart) {
      return
    }
    if (day.isToday) {
      launchDaily(mode, day.dateKey)
      return
    }
    if (isUnlockedForPlay(guestProgress, mode, day.dateKey, completion)) {
      launchDaily(mode, day.dateKey)
      return
    }
    setPendingUnlock({ mode, dateKey: day.dateKey })
  }, [completion, guestProgress, launchDaily])

  const confirmUnlock = useCallback(() => {
    if (!pendingUnlock) {
      return
    }
    if (!onSpendCoins(PAST_DAILY_UNLOCK_COST)) {
      return
    }
    const { mode, dateKey } = pendingUnlock
    setPendingUnlock(null)
    launchDaily(mode, dateKey)
  }, [launchDaily, onSpendCoins, pendingUnlock])

  const handleSaveDifficultyDefault = useCallback(
    (tier: DifficultyTier) => onUpdateSettings({ difficultyDefault: tier }),
    [onUpdateSettings],
  )
  const handleSaveGoPuzzleCountDefault = useCallback(
    (count: GoPuzzleCount) => onUpdateSettings({ goPuzzleCountDefault: count }),
    [onUpdateSettings],
  )

  if (activeDaily) {
    const isPast = activeDaily.isPast
    const pastDateKey = isPast ? activeDaily.dateKey : undefined
    const markUnlocked = isPast
      ? () => onMarkPastDailyUnlocked(activeDaily.mode, activeDaily.dateKey)
      : undefined
    return (
      <section className="space-y-4" aria-label="Daily puzzle">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button onClick={() => setActiveDaily(null)} variant="secondary">← Back to Calendar</Button>
          <p className="text-sm font-semibold text-[var(--color-ice-200)]">
            {activeDaily.mode.toUpperCase()} daily · {activeDaily.dateKey}
            {isPast ? ' · past' : ' · today'}
          </p>
        </div>
        {activeDaily.mode === 'og' ? (
          <OgGame
            coins={coins}
            defaultDifficulty={guestProgress.settings.difficultyDefault}
            keyboardDisabled={keyboardDisabled}
            onGameComplete={onGameComplete}
            onMarkDailyUnlocked={markUnlocked}
            onResumeCapture={onResumeCapture}
            onSaveDifficultyDefault={handleSaveDifficultyDefault}
            onSpendCoins={onSpendCoins}
            pastDailyDateKey={pastDateKey}
            scope="daily"
          />
        ) : (
          <GoGame
            coins={coins}
            defaultDifficulty={guestProgress.settings.difficultyDefault}
            defaultGoPuzzleCount={guestProgress.settings.goPuzzleCountDefault}
            keyboardDisabled={keyboardDisabled}
            onGameComplete={onGameComplete}
            onMarkDailyUnlocked={markUnlocked}
            onResumeCapture={onResumeCapture}
            onSaveDifficultyDefault={handleSaveDifficultyDefault}
            onSaveGoPuzzleCountDefault={handleSaveGoPuzzleCountDefault}
            onSpendCoins={onSpendCoins}
            pastDailyDateKey={pastDateKey}
            scope="daily"
          />
        )}
      </section>
    )
  }

  return (
    <section className="space-y-5" aria-labelledby="calendar-title">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">Daily hub</p>
        <h2 id="calendar-title" className="text-3xl font-bold text-white">Calendar</h2>
        <p className="max-w-3xl text-base leading-7 text-slate-300">
          Play today&rsquo;s puzzles or revisit any past daily back to January 1, 2025. Unlocking a past daily costs {PAST_DAILY_UNLOCK_COST} coins; once you make a guess it stays unlocked for good.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button onClick={() => launchDaily('og', todayDateKey)} variant="primary">Play Today&rsquo;s OG</Button>
        <Button onClick={() => launchDaily('go', todayDateKey)} variant="primary">Play Today&rsquo;s GO</Button>
      </div>

      <Panel className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2" tone="muted">
        <div>
          <p className="font-semibold text-cyan-100">OG daily streak</p>
          <p>Current {streaks.ogCurrent} · Longest {streaks.ogMax}</p>
        </div>
        <div>
          <p className="font-semibold text-cyan-100">GO daily streak</p>
          <p>Current {streaks.goCurrent} · Longest {streaks.goMax}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="font-semibold text-cyan-100">Coins</p>
          <p>{coins} available</p>
        </div>
      </Panel>

      <Panel className="space-y-4" tone="muted">
        <div className="flex items-center justify-between gap-3">
          <Button
            disabled={!month.canGoPrev}
            onClick={() => setViewMonth(addMonths(viewMonth.year, viewMonth.month, -1))}
            variant="secondary"
          >
            ← Prev
          </Button>
          <p className="text-lg font-bold text-white" aria-live="polite">{month.label}</p>
          <Button
            disabled={!month.canGoNext}
            onClick={() => setViewMonth(addMonths(viewMonth.year, viewMonth.month, 1))}
            variant="secondary"
          >
            Next →
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
          {WEEKDAY_LABELS.map((label) => (
            <div key={label} aria-hidden="true">{label}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {month.weeks.flat().map((day, index) => (
            <CalendarCell
              key={day.dateKey ?? `blank-${index}`}
              completion={completion}
              day={day}
              guestProgress={guestProgress}
              onRequestDay={requestDay}
            />
          ))}
        </div>
      </Panel>

      <Dialog
        isOpen={pendingUnlock !== null}
        onClose={() => setPendingUnlock(null)}
        title="Unlock past daily"
      >
        <p className="text-sm leading-6 text-slate-200">
          Unlock the {pendingUnlock?.mode.toUpperCase()} daily for {pendingUnlock?.dateKey} for {PAST_DAILY_UNLOCK_COST} coins?
          You currently have {coins} coins. Once you make at least one guess it stays unlocked permanently.
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <Button onClick={() => setPendingUnlock(null)} variant="secondary">Cancel</Button>
          <Button disabled={coins < PAST_DAILY_UNLOCK_COST} onClick={confirmUnlock} variant="primary">
            {coins >= PAST_DAILY_UNLOCK_COST ? `Spend ${PAST_DAILY_UNLOCK_COST} coins` : 'Not enough coins'}
          </Button>
        </div>
      </Dialog>
    </section>
  )
}

function CalendarCell({
  completion,
  day,
  guestProgress,
  onRequestDay,
}: {
  readonly completion: { readonly og: ReadonlySet<string>; readonly go: ReadonlySet<string> }
  readonly day: CalendarDay
  readonly guestProgress: GuestProgress
  readonly onRequestDay: (mode: GameMode, day: CalendarDay) => void
}) {
  if (!day.dateKey) {
    return <div aria-hidden="true" className="min-h-[3.5rem] rounded-md border border-transparent" />
  }

  const playable = day.isToday || day.isPast
  const ogDone = completion.og.has(day.dateKey)
  const goDone = completion.go.has(day.dateKey)
  const ogUnlocked = day.isToday || isUnlockedForPlay(guestProgress, 'og', day.dateKey, completion)
  const goUnlocked = day.isToday || isUnlockedForPlay(guestProgress, 'go', day.dateKey, completion)

  return (
    <div
      className="flex min-h-[3.5rem] flex-col rounded-md border border-white/10 bg-black/30 p-1 text-left"
      data-today={day.isToday ? 'true' : undefined}
    >
      <span className={`text-xs font-semibold ${day.isToday ? 'text-cyan-200' : 'text-slate-300'}`}>
        {day.dayOfMonth}
      </span>
      {playable ? (
        <div className="mt-auto flex gap-1">
          <DayModeButton done={ogDone} label="OG" locked={!ogUnlocked} onClick={() => onRequestDay('og', day)} />
          <DayModeButton done={goDone} label="GO" locked={!goUnlocked} onClick={() => onRequestDay('go', day)} />
        </div>
      ) : null}
    </div>
  )
}

function DayModeButton({
  done,
  label,
  locked,
  onClick,
}: {
  readonly done: boolean
  readonly label: string
  readonly locked: boolean
  readonly onClick: () => void
}) {
  const status = done ? 'done' : locked ? 'locked' : 'open'
  const title = `${label}${done ? ' · completed' : locked ? ' · locked (60 coins)' : ''}`
  return (
    <button
      aria-label={title}
      className="flex-1 rounded border border-white/10 px-1 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide transition hover:border-[var(--color-ice-300)]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus-ring)] data-[status=done]:border-emerald-400/60 data-[status=done]:text-emerald-200 data-[status=locked]:text-amber-200/80 data-[status=open]:text-slate-100"
      data-status={status}
      onClick={onClick}
      title={title}
      type="button"
    >
      {done ? `${label} ✓` : locked ? `${label} 🔒` : label}
    </button>
  )
}
