const phaseZeroFoundations = [
  'React 19 + TypeScript + Vite application scaffold',
  'Tailwind CSS build integration',
  'Future-facing source directories for game, data, definitions, admin, account, stats, progression, UI, and shared libraries',
  'Vercel and GitHub Pages documentation foundations',
]

function App() {
  return (
    <main className="min-h-svh bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto flex max-w-3xl flex-col gap-8 rounded-3xl border border-cyan-300/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/50">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
            brrrdle
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Phase 0 foundation is ready for implementation.
          </h1>
          <p className="text-base leading-7 text-slate-300">
            This scaffold intentionally avoids game-specific behavior until the approved phase gates introduce the core engine, data layer, modes, definitions, persistence, Supabase, and polish.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
          <h2 className="text-lg font-semibold text-cyan-100">Current foundation</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
            {phaseZeroFoundations.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default App
