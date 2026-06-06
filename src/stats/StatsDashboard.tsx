import type { GameHistoryEntry, GuestProgressionState } from '../account/storageSchema'
import { MultiplayerStatsPanel, type MultiplayerCompetitiveState } from '../multiplayer'
import { BarChart, CalendarHeatmap, ProgressMeter, TrendSparkline } from './charts'
import { getAverageAttempts, getStatsBucket, getWinRate } from './statistics'
import {
  selectCoinTrend,
  selectStreakCalendar,
  selectWinRateByLength,
  selectWinRateByScope,
  selectWinRateByTier,
  selectXpProgress,
} from './statsSelectors'
import type { StatisticsState } from './types'

interface StatsDashboardProps {
  readonly competitiveMultiplayer?: MultiplayerCompetitiveState
  readonly history?: readonly GameHistoryEntry[]
  readonly progression?: GuestProgressionState
  readonly stats: StatisticsState
}

const buckets = [
  { label: 'og daily', mode: 'og', scope: 'daily' },
  { label: 'og practice', mode: 'og', scope: 'practice' },
  { label: 'go daily', mode: 'go', scope: 'daily' },
  { label: 'go practice', mode: 'go', scope: 'practice' },
] as const

const EMPTY_HISTORY: readonly GameHistoryEntry[] = []
const EMPTY_PROGRESSION: GuestProgressionState = {
  coins: 0,
  consumables: { removeIncorrectLetters: 0, revealOneLetter: 0 },
  level: 1,
  xp: 0,
}

export function StatsDashboard({ competitiveMultiplayer, history = EMPTY_HISTORY, progression = EMPTY_PROGRESSION, stats }: StatsDashboardProps) {
  const winRateByScope = selectWinRateByScope(stats)
  const winRateByLength = selectWinRateByLength(stats)
  const winRateByTier = selectWinRateByTier(history)
  const calendar = selectStreakCalendar(history)
  const xpProgress = selectXpProgress(progression)
  const coinTrend = selectCoinTrend(history)

  return (
    <section className="space-y-6" aria-labelledby="stats-dashboard-title">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">local stats</p>
        <h2 id="stats-dashboard-title" className="text-3xl font-bold text-white">Guest statistics</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Stats are tracked locally by mode and scope, with per-length buckets and interactive, accessible charts derived from your play history.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {buckets.map((item) => {
          const bucket = getStatsBucket(stats, item.mode, item.scope)
          const averageAttempts = getAverageAttempts(bucket)
          return (
            <article className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4 text-sm text-slate-200" key={item.label}>
              <h3 className="text-lg font-bold text-white">{item.label}</h3>
              <dl className="mt-3 grid grid-cols-2 gap-3">
                <div><dt className="text-cyan-100">Played</dt><dd>{bucket.played}</dd></div>
                <div><dt className="text-cyan-100">Win rate</dt><dd>{getWinRate(bucket)}%</dd></div>
                <div><dt className="text-cyan-100">Current streak</dt><dd>{bucket.currentStreak}</dd></div>
                <div><dt className="text-cyan-100">Max streak</dt><dd>{bucket.maxStreak}</dd></div>
                <div><dt className="text-cyan-100">Best attempts</dt><dd>{bucket.bestAttempts ?? '—'}</dd></div>
                <div><dt className="text-cyan-100">Avg attempts</dt><dd>{averageAttempts ?? '—'}</dd></div>
              </dl>
            </article>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
          <BarChart caption="Win rate by mode & scope" data={winRateByScope} emptyMessage="Play a game to see win rates by mode." />
        </article>
        <article className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
          <BarChart caption="Win rate by word length" data={winRateByLength} emptyMessage="No length data yet — finish a game to populate this chart." />
        </article>
        <article className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
          <BarChart caption="Win rate by difficulty tier" data={winRateByTier} emptyMessage="Difficulty-tagged games appear here once you play with the new tier tracking." />
        </article>
        <article className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
          <ProgressMeter progress={xpProgress} />
        </article>
        <article className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
          <CalendarHeatmap caption="Recent activity" data={calendar} />
        </article>
        <article className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
          <TrendSparkline caption="Coins earned trend" data={coinTrend} emptyMessage="Earn coins by completing games to see your trend." />
        </article>
      </div>

      <MultiplayerStatsPanel state={competitiveMultiplayer} />
    </section>
  )
}
