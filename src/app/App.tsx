import { useCallback, useEffect, useMemo, useState } from 'react'
import { createBrrrdleSupabaseClient, createSyncStatus, getCurrentAuthState, loadGuestProgress, recordCompletedGame, resetGuestProgress, saveGuestProgress, sendMagicLink, Settings, signInWithPassword, signOut, signUpWithPassword, subscribeToAuthChanges, type AuthState, type CompletedGameInput } from '../account'
import { BUNDLED_WORD_LIST_LENGTHS } from '../data'
import { DAILY_WORD_LENGTH, MAX_PRACTICE_WORD_LENGTH, MIN_PRACTICE_WORD_LENGTH } from '../game/constants'
import { Button, Layout, Navigation, Panel } from '../ui'
import { AdminPanel } from '../admin'
import { StatsDashboard } from '../stats'
import { WordExplorerPanel } from '../wordExplorer'
import { FeedbackPanel } from '../feedback'
import { SoundProvider, useSound } from '../sound'
import { GoGame } from './GoGame'
import { OgGame } from './OgGame'
import { DEFAULT_ROUTE_ID, getPrimaryNavigationRoutes, getRouteById, getRoutesByGroup, type AppRoute } from './routes'

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
  authMessage,
  onResetProgress,
  onSelectRoute,
  onSendMagicLink,
  onSignInWithPassword,
  onSignUpWithPassword,
  onSpendCoins,
  onSignOut,
  soundEnabled,
  onToggleSound,
  syncStatus,
}: {
  readonly authState: AuthState
  readonly authMessage?: string
  readonly guestProgress: ReturnType<typeof loadGuestProgress>
  readonly keyboardDisabled?: boolean
  readonly onGameComplete: (input: CompletedGameInput) => void
  readonly onResetProgress: () => void
  readonly onSendMagicLink: (email: string) => void
  readonly onSignInWithPassword: (email: string, password: string) => void
  readonly onSignUpWithPassword: (email: string, password: string) => void
  readonly onSignOut: () => void
  readonly route: AppRoute
  readonly onSelectRoute: (routeId: AppRoute['id']) => void
  readonly soundEnabled: boolean
  readonly onToggleSound: (enabled: boolean) => void
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

  if (route.id === 'word-explorer') {
    return <WordExplorerPanel />
  }

  if (route.id === 'feedback') {
    return <FeedbackPanel />
  }

  if (route.id === 'stats') {
    return <StatsDashboard stats={guestProgress.stats} />
  }

  if (route.id === 'settings') {
    return (
      <Settings
        authMessage={authMessage}
        authState={authState}
        guestProgress={guestProgress}
        onResetProgress={onResetProgress}
        onSendMagicLink={onSendMagicLink}
        onSignInWithPassword={onSignInWithPassword}
        onSignOut={onSignOut}
        onSignUpWithPassword={onSignUpWithPassword}
        onToggleSound={onToggleSound}
        soundEnabled={soundEnabled}
        syncStatus={syncStatus}
      />
    )
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

function App() {
  return (
    <SoundProvider>
      <AppInner />
    </SoundProvider>
  )
}

function AppInner() {
  const sound = useSound()
  const [activeRouteId, setActiveRouteId] = useState(DEFAULT_ROUTE_ID)
  const [guestProgress, setGuestProgress] = useState(() => loadGuestProgress())
  const supabaseClient = useMemo(() => createBrrrdleSupabaseClient(), [])
  const [authState, setAuthState] = useState<AuthState>(() => supabaseClient ? { status: 'anonymous' } : { status: 'unconfigured' })
  const [authMessage, setAuthMessage] = useState<string | undefined>(undefined)
  const [syncStatus] = useState(() => createSyncStatus(supabaseClient ? 'idle' : 'error'))
  const activeRoute = getRouteById(activeRouteId)
  const navigationRoutes = useMemo(() => getPrimaryNavigationRoutes(authState.user?.roles.includes('admin') ?? false), [authState.user?.roles])
  const handleGameComplete = useCallback((input: CompletedGameInput) => {
    setGuestProgress((currentProgress) => {
      const nextProgress = recordCompletedGame(input, currentProgress)
      if (nextProgress !== currentProgress) {
        saveGuestProgress(nextProgress)
      }
      return nextProgress
    })
    if (input.status === 'won') {
      sound.play('game-over-win')
    } else if (input.status === 'lost') {
      sound.play('game-over-loss')
    }
  }, [sound])
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

    setAuthMessage(undefined)
    void sendMagicLink(supabaseClient, email).then((result) => {
      setAuthMessage(result.ok ? 'Magic link sent. Check your email.' : result.message)
    })
  }, [supabaseClient])
  const handleSignInWithPassword = useCallback((email: string, password: string) => {
    if (!supabaseClient) {
      return
    }
    setAuthMessage(undefined)
    void signInWithPassword(supabaseClient, email, password).then((result) => {
      if (!result.ok) {
        setAuthMessage(result.message)
      }
    })
  }, [supabaseClient])
  const handleSignUpWithPassword = useCallback((email: string, password: string) => {
    if (!supabaseClient) {
      return
    }
    setAuthMessage(undefined)
    void signUpWithPassword(supabaseClient, email, password).then((result) => {
      if (!result.ok) {
        setAuthMessage(result.message)
      } else {
        setAuthMessage('Check your email to confirm your account, if email confirmation is enabled.')
      }
    })
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
    const subscription = subscribeToAuthChanges(supabaseClient, (nextAuthState) => {
      if (isMounted) {
        setAuthState(nextAuthState)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [supabaseClient])

  return (
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

        <section className="grid gap-4">
          <RoutePanel
            authMessage={authMessage}
            authState={authState}
            guestProgress={guestProgress}
            onGameComplete={handleGameComplete}
            onResetProgress={handleResetProgress}
            onSelectRoute={setActiveRouteId}
            onSendMagicLink={handleSendMagicLink}
            onSignInWithPassword={handleSignInWithPassword}
            onSignOut={handleSignOut}
            onSignUpWithPassword={handleSignUpWithPassword}
            onSpendCoins={handleSpendCoins}
            onToggleSound={sound.setEnabled}
            route={activeRoute}
            soundEnabled={sound.enabled}
            syncStatus={syncStatus}
          />
        </section>
      </div>
    </Layout>
  )
}

export default App
