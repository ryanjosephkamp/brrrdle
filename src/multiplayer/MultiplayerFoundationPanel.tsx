import { Panel } from '../ui'

export function MultiplayerFoundationPanel() {
  return (
    <section className="space-y-5" aria-labelledby="multiplayer-foundation-title">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">Multiplayer</p>
        <h2 id="multiplayer-foundation-title" className="text-3xl font-bold text-white">Multiplayer</h2>
      </div>
      <Panel className="text-sm leading-6 text-slate-300" tone="muted">
        <p>
          Multiplayer foundations are ready. Practice Multiplayer still opens from Practice, and Daily Multiplayer still opens from Calendar.
        </p>
      </Panel>
    </section>
  )
}
