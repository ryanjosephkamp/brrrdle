import { useCallback, useEffect, useMemo, useState } from 'react'
import { createBrrrdleSupabaseClient, createSyncStatus, getCurrentAuthState, loadGuestProgress, recordCompletedGame, resetGuestProgress, saveGuestProgress, sendMagicLink, Settings, signOut, type AuthState, type CompletedGameInput } from '../account'
import { BUNDLED_WORD_LIST_LENGTHS } from '../data'
import { DAILY_WORD_LENGTH, MAX_PRACTICE_WORD_LENGTH, MIN_PRACTICE_WORD_LENGTH } from '../game/constants'
import { Button, Dialog, Layout, LoadingState, Navigation, Panel, ToastRegion, type ToastMessage } from '../ui'
import { AdminPanel } from '../admin'
import { StatsDashboard } from '../stats'
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


function PracticeGameSwitcher({
  coins,
  keyboardDisabled,
  onGameComplete,
  onSpendCoins,
}: {
  readonly coins: number
  readonly keyboardDisabled?: boolean
  readonly onGameComplete: (input: CompletedGameInput) => void
  readonly onSpendCoins: (amount: number) => boolean
}) {
  const [practiceMode, setPracticeMode] = useState<'og' | 'go'>('og')

  return (
    <section className="space-y-5" aria-label="Practice mode selector">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-700 bg-slate-950/60 p-2">
        <Button onClick={() => setPracticeMode('og')} variant={practiceMode === 'og' ? 'primary' : 'secondary'}>og practice</Button>
        <Button onClick={() => setPracticeMode('go')} variant={practiceMode === 'go' ? 'primary' : 'secondary'}>go practice</Button>
      </div>
      {practiceMode === 'og'
        ? <OgGame coins={coins} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onSpendCoins={onSpendCoins} scope="practice" />
        : <GoGame coins={coins} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onSpendCoins={onSpendCoins} scope="practice" />}
    </section>
  )
}

function RoutePanel({
  route,
  keyboardDisabled,
  guestProgress,
  onGameComplete,
  authState,
  onResetProgress,
  onSelectRoute,
  onSendMagicLink,
  onSpendCoins,
  onSignOut,
  syncStatus,
}: {
  readonly authState: AuthState
  readonly guestProgress: ReturnType<typeof loadGuestProgress>
  readonly keyboardDisabled?: boolean
  readonly onGameComplete: (input: CompletedGameInput) => void
  readonly onResetProgress: () => void
  readonly onSendMagicLink: (email: string) => void
  readonly onSignOut: () => void
  readonly route: AppRoute
  readonly onSelectRoute: (routeId: AppRoute['id']) => void
  readonly syncStatus: ReturnType<typeof createSyncStatus>
  readonly onSpendCoins: (amount: number) => boolean
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
    return <OgGame coins={guestProgress.progression.coins} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onSpendCoins={onSpendCoins} scope="daily" />
  }

  if (route.id === 'go-daily') {
    return <GoGame coins={guestProgress.progression.coins} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onSpendCoins={onSpendCoins} scope="daily" />
  }

  if (route.id === 'practice') {
    return <PracticeGameSwitcher coins={guestProgress.progression.coins} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onSpendCoins={onSpendCoins} />
  }

  if (route.id === 'stats') {
    return <StatsDashboard stats={guestProgress.stats} />
  }

  if (route.id === 'settings') {
    return <Settings authState={authState} guestProgress={guestProgress} onResetProgress={onResetProgress} onSendMagicLink={onSendMagicLink} onSignOut={onSignOut} syncStatus={syncStatus} />
  }

  if (route.id === 'admin') {
    return <AdminPanel authState={authState} />
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
    message: 'Sharing, installability, motion polish, accessibility refinements, and offline shell caching are active for Phase 9 review.',
    title: 'polish ready',
    tone: 'info',
  },
]

function App() {
  const [activeRouteId, setActiveRouteId] = useState(DEFAULT_ROUTE_ID)
  const [guestProgress, setGuestProgress] = useState(() => loadGuestProgress())
  const supabaseClient = useMemo(() => createBrrrdleSupabaseClient(), [])
  const [authState, setAuthState] = useState<AuthState>(() => supabaseClient ? { status: 'anonymous' } : { status: 'unconfigured' })
  const [syncStatus] = useState(() => createSyncStatus(supabaseClient ? 'idle' : 'error'))
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const activeRoute = getRouteById(activeRouteId)
  const navigationRoutes = useMemo(() => APP_ROUTES, [])
  const handleGameComplete = useCallback((input: CompletedGameInput) => {
    setGuestProgress((currentProgress) => {
      const nextProgress = recordCompletedGame(input, currentProgress)
      if (nextProgress !== currentProgress) {
        saveGuestProgress(nextProgress)
      }
      return nextProgress
    })
  }, [])
  const handleResetProgress = useCallback(() => {
    setGuestProgress(resetGuestProgress())
  }, [])
  const handleSpendCoins = useCallback((amount: number) => {
    if (guestProgress.progression.coins < amount) {
      return false
    }

    const nextProgress = {
      ...guestProgress,
      progression: {
        ...guestProgress.progression,
        coins: guestProgress.progression.coins - amount,
      },
    }
    saveGuestProgress(nextProgress)
    setGuestProgress(nextProgress)
    return true
  }, [guestProgress])
  const handleSendMagicLink = useCallback((email: string) => {
    if (!supabaseClient || !email.trim()) {
      return
    }

    void sendMagicLink(supabaseClient, email)
  }, [supabaseClient])
  const handleSignOut = useCallback(() => {
    if (!supabaseClient) {
      return
    }

    void signOut(supabaseClient).then(() => setAuthState({ status: 'anonymous' }))
  }, [supabaseClient])

  useEffect(() => {
    let isMounted = true
    void getCurrentAuthState(supabaseClient).then((nextAuthState) => {
      if (isMounted) {
        setAuthState(nextAuthState)
      }
    })

    return () => {
      isMounted = false
    }
  }, [supabaseClient])

  return (
    <>
      <Layout
        description="An accessible, mobile-first shell for daily modes, practice, definitions, settings, stats, and future admin controls."
        eyebrow="brrrdle"
        navigation={<Navigation activeRouteId={activeRoute.id} onNavigate={setActiveRouteId} routes={navigationRoutes} />}
        title="Choose your puzzle path."
      >
        <div className="space-y-6">
          <section className="grid gap-4 rounded-3xl border border-[var(--color-ice-300)]/20 bg-cyan-950/20 p-5 text-sm leading-6 text-cyan-50 sm:grid-cols-5">
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
            <div>
              <p className="font-semibold text-cyan-100">Guest level</p>
              <p>{guestProgress.progression.level} ({guestProgress.progression.xp} XP)</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-100">Coins</p>
              <p>{guestProgress.progression.coins}</p>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_20rem]">
            <RoutePanel authState={authState} guestProgress={guestProgress} keyboardDisabled={isDialogOpen} onGameComplete={handleGameComplete} onResetProgress={handleResetProgress} onSelectRoute={setActiveRouteId} onSendMagicLink={handleSendMagicLink} onSpendCoins={handleSpendCoins} onSignOut={handleSignOut} route={activeRoute} syncStatus={syncStatus} />
            <aside className="space-y-4" aria-label="Interface readiness">
              <Panel className="space-y-4" tone="muted">
                <h2 className="text-xl font-bold text-white">Phase 9 polish</h2>
                <LoadingState label="Checking responsive, share, and offline-ready surfaces" />
                <Button onClick={() => setIsDialogOpen(true)} variant="primary">Review shell notes</Button>
              </Panel>
            </aside>
          </section>
        </div>
      </Layout>

      <Dialog
        description="A non-gameplay modal used to verify the reusable dialog pattern, Escape handling, labels, and focusable close control."
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Phase 9 shell notes"
      >
        <p>
          The shell now has reusable icy visual tokens, accessible primitives, keyboard input plumbing, and active og and go daily/practice gameplay, post-game definitions, local guest progression, optional Supabase account setup, emoji sharing, PWA shell caching, reduced-motion-aware animation, and accessibility refinements for Phase 9 review.
        </p>
      </Dialog>
      <ToastRegion messages={shellMessages} />
    </>
  )
}

export default App
