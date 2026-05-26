import { useMemo, useState } from 'react'
import { BUNDLED_WORD_LIST_LENGTHS } from '../data'
import { DAILY_WORD_LENGTH, MAX_PRACTICE_WORD_LENGTH, MIN_PRACTICE_WORD_LENGTH } from '../game/constants'
import { Button, Dialog, ErrorState, Layout, LoadingState, Navigation, Panel, ToastRegion, type ToastMessage } from '../ui'
import { GoGame } from './GoGame'
import { OgGame } from './OgGame'
import { APP_ROUTES, DEFAULT_ROUTE_ID, getRouteById, getRoutesByGroup, type AppRoute } from './routes'

function ModeCard({ route, onSelect }: { readonly route: AppRoute; readonly onSelect: (route: AppRoute) => void }) {
  return (
    <button
      className="group rounded-3xl border border-slate-700 bg-slate-950/70 p-5 text-left shadow-xl shadow-slate-950/30 transition hover:border-[var(--color-ice-300)] hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] motion-safe:hover:-translate-y-0.5"
      onClick={() => onSelect(route)}
      type="button"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">{route.scope ?? 'support'}</span>
      <h2 className="mt-3 text-2xl font-bold text-white">{route.label}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{route.description}</p>
      {route.wordLength ? (
        <p className="mt-4 text-sm font-semibold text-cyan-100">{route.wordLength} letters</p>
      ) : null}
    </button>
  )
}


function PracticeGameSwitcher({ keyboardDisabled }: { readonly keyboardDisabled?: boolean }) {
  const [practiceMode, setPracticeMode] = useState<'og' | 'go'>('og')

  return (
    <section className="space-y-5" aria-label="Practice mode selector">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-700 bg-slate-950/60 p-2">
        <Button onClick={() => setPracticeMode('og')} variant={practiceMode === 'og' ? 'primary' : 'secondary'}>og practice</Button>
        <Button onClick={() => setPracticeMode('go')} variant={practiceMode === 'go' ? 'primary' : 'secondary'}>go practice</Button>
      </div>
      {practiceMode === 'og' ? <OgGame keyboardDisabled={keyboardDisabled} scope="practice" /> : <GoGame keyboardDisabled={keyboardDisabled} scope="practice" />}
    </section>
  )
}

function RoutePanel({
  route,
  keyboardDisabled,
  onSelectRoute,
}: {
  readonly keyboardDisabled?: boolean
  readonly route: AppRoute
  readonly onSelectRoute: (routeId: AppRoute['id']) => void
}) {
  if (route.id === 'home') {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {getRoutesByGroup('play')
          .filter((playRoute) => playRoute.id !== 'home')
          .map((playRoute) => (
            <ModeCard key={playRoute.id} onSelect={(selectedRoute) => onSelectRoute(selectedRoute.id)} route={playRoute} />
          ))}
      </div>
    )
  }

  if (route.id === 'og-daily') {
    return <OgGame keyboardDisabled={keyboardDisabled} scope="daily" />
  }

  if (route.id === 'go-daily') {
    return <GoGame keyboardDisabled={keyboardDisabled} scope="daily" />
  }

  if (route.id === 'practice') {
    return <PracticeGameSwitcher keyboardDisabled={keyboardDisabled} />
  }

  return (
    <section className="space-y-4" aria-labelledby="route-title">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">{route.navigationGroup}</p>
      <h2 id="route-title" className="text-3xl font-bold text-white">{route.label}</h2>
      <p className="max-w-3xl text-base leading-7 text-slate-300">{route.description}</p>
      <Panel className="text-sm leading-6 text-slate-300" tone="muted">
        <p>
          This route is ready for later gameplay, definitions, persistence, account, and admin phases. No unfinished game behavior is exposed in Phase 3.3.
        </p>
      </Panel>
    </section>
  )
}

const shellMessages: readonly ToastMessage[] = [
  {
    id: 'shell-ready',
    message: 'Daily/practice gameplay now shows post-game definitions for Phase 6 review.',
    title: 'definitions ready',
    tone: 'info',
  },
]

function App() {
  const [activeRouteId, setActiveRouteId] = useState(DEFAULT_ROUTE_ID)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const activeRoute = getRouteById(activeRouteId)
  const navigationRoutes = useMemo(() => APP_ROUTES, [])

  return (
    <>
      <Layout
        description="An accessible, mobile-first shell for daily modes, practice, definitions, settings, stats, and future admin controls."
        eyebrow="brrrdle"
        navigation={<Navigation activeRouteId={activeRoute.id} onNavigate={setActiveRouteId} routes={navigationRoutes} />}
        title="Choose your puzzle path."
      >
        <div className="space-y-6">
          <section className="grid gap-4 rounded-3xl border border-[var(--color-ice-300)]/20 bg-cyan-950/20 p-5 text-sm leading-6 text-cyan-50 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-cyan-100">Daily launch length</p>
              <p>{DAILY_WORD_LENGTH} letters for og and go</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-100">Practice range</p>
              <p>{MIN_PRACTICE_WORD_LENGTH}–{MAX_PRACTICE_WORD_LENGTH} letters</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-100">Bundled seed lengths</p>
              <p>{BUNDLED_WORD_LIST_LENGTHS.join(', ')}</p>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_20rem]">
            <RoutePanel keyboardDisabled={isDialogOpen} onSelectRoute={setActiveRouteId} route={activeRoute} />
            <aside className="space-y-4" aria-label="Interface readiness">
              <Panel className="space-y-4" tone="muted">
                <h2 className="text-xl font-bold text-white">UI foundation</h2>
                <LoadingState label="Preparing future game surfaces" />
                <Button onClick={() => setIsDialogOpen(true)} variant="primary">Review shell notes</Button>
              </Panel>
              {activeRoute.id === 'admin' ? (
                <ErrorState
                  message="Protected refresh controls are intentionally unavailable until the Supabase admin phase."
                  title="Admin controls locked"
                />
              ) : null}
            </aside>
          </section>
        </div>
      </Layout>

      <Dialog
        description="A non-gameplay modal used to verify the reusable dialog pattern, Escape handling, labels, and focusable close control."
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Phase 6 shell notes"
      >
        <p>
          The shell now has reusable icy visual tokens, accessible primitives, keyboard input plumbing, and active og and go daily/practice gameplay plus post-game definitions for Phase 6 review.
        </p>
      </Dialog>
      <ToastRegion messages={shellMessages} />
    </>
  )
}

export default App
