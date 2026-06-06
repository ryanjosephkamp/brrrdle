import { Panel } from '../ui'
import { normalizeCompetitiveMultiplayerState, type MultiplayerCompetitiveState } from './competitiveMultiplayer'

interface MultiplayerStatsPanelProps {
  readonly state?: MultiplayerCompetitiveState
}

function bucketLabel(bucket: string): string {
  const [, mode = 'og'] = bucket.split(':')
  return `multiplayer ${mode}`.toUpperCase()
}

export function MultiplayerStatsPanel({ state }: MultiplayerStatsPanelProps) {
  const competitive = normalizeCompetitiveMultiplayerState(state)
  const recentResults = competitive.results.slice(0, 6)
  const recentTransactions = competitive.rating.transactions.slice(0, 6)

  return (
    <section className="space-y-4" aria-labelledby="multiplayer-stats-title">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">multiplayer ratings</p>
        <h3 id="multiplayer-stats-title" className="text-2xl font-bold text-white">Competitive multiplayer</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
          Ranked results are tracked separately from solo stats. Guest/local preview matches stay unrated until they have authenticated durable result evidence.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel className="space-y-3 text-sm text-slate-300" tone="muted">
          <h4 className="text-lg font-bold text-white">Rating buckets</h4>
          {competitive.rating.profiles.length > 0 ? (
            <div className="grid gap-2">
              {competitive.rating.profiles.map((profile) => (
                <article className="rounded-lg border border-white/10 bg-black/30 p-3" key={`${profile.bucket}-${profile.userId}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-cyan-100">{bucketLabel(profile.bucket)}</p>
                    <p className="text-xl font-black text-white">{profile.rating}</p>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {profile.provisional ? 'Provisional' : 'Established'} · {profile.gamesPlayed} rated · {profile.wins}-{profile.losses}-{profile.draws}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-white/10 bg-black/30 p-3">
              No rated results yet. Ranked matches need two authenticated players and durable settlement before ELO changes.
            </p>
          )}
        </Panel>

        <Panel className="space-y-3 text-sm text-slate-300" tone="muted">
          <h4 className="text-lg font-bold text-white">Recent multiplayer results</h4>
          {recentResults.length > 0 ? (
            <div className="grid gap-2">
              {recentResults.map((result) => (
                <article className="rounded-lg border border-white/10 bg-black/30 p-3" key={result.sourceMatchId}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-cyan-100">{bucketLabel(result.bucket)} · {result.scope}</p>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{result.ranked ? 'ranked' : 'unranked'}</p>
                  </div>
                  <p className="mt-1">{result.summary}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-white/10 bg-black/30 p-3">No multiplayer results recorded yet.</p>
          )}
        </Panel>
      </div>

      {recentTransactions.length > 0 ? (
        <Panel className="space-y-3 text-sm text-slate-300" tone="muted">
          <h4 className="text-lg font-bold text-white">Rating changes</h4>
          <div className="grid gap-2 md:grid-cols-2">
            {recentTransactions.map((transaction) => (
              <article className="rounded-lg border border-white/10 bg-black/30 p-3" key={transaction.id}>
                <p className="font-semibold text-cyan-100">{bucketLabel(transaction.bucket)}</p>
                <p className="mt-1">
                  {transaction.outcome} · {transaction.oldRating} → {transaction.newRating}
                  {' '}
                  ({transaction.ratingDelta >= 0 ? '+' : ''}{transaction.ratingDelta})
                </p>
              </article>
            ))}
          </div>
        </Panel>
      ) : null}
    </section>
  )
}
