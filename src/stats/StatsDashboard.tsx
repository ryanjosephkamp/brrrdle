import { getAverageAttempts, getStatsBucket, getWinRate } from './statistics'
import type { StatisticsState } from './types'

interface StatsDashboardProps {
  readonly stats: StatisticsState
}

const buckets = [
  { label: 'og daily', mode: 'og', scope: 'daily' },
  { label: 'og practice', mode: 'og', scope: 'practice' },
  { label: 'go daily', mode: 'go', scope: 'daily' },
  { label: 'go practice', mode: 'go', scope: 'practice' },
] as const

export function StatsDashboard({ stats }: StatsDashboardProps) {
  return (
    <section className="space-y-4" aria-labelledby="stats-dashboard-title">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">local stats</p>
        <h2 id="stats-dashboard-title" className="text-3xl font-bold text-white">Guest statistics</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Stats are tracked locally by mode and scope, with per-length buckets ready for future daily lengths.</p>
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
    </section>
  )
}
