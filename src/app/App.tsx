import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AccountBadge, AuthModal, ProfilePanel, classifyAuthError, createBrrrdleSupabaseClient, createResumeSlot, createSupabaseProgressRepository, createSyncStatus, getCurrentAuthState, getLatestResumeSlot, getResumeSlotKey, isCaptureInProgress, loadGuestProgress, normalizeResumeSlots, recordCompletedGame, sendPasswordResetEmail, resetGuestProgress, saveGuestProgress, sendMagicLink, Settings, signInWithPassword, signOut, signUpWithPassword, subscribeToAuthChanges, syncGuestProgress, updateProfile, type AuthState, type CompletedGameInput, type ProfileAccentColor, type ResumeCapture, type ResumeSlot, type ResumeSlotCollection } from '../account'
import { BUNDLED_WORD_LIST_LENGTHS, type DifficultyTier } from '../data'
import { DAILY_WORD_LENGTH, MAX_PRACTICE_WORD_LENGTH, MIN_PRACTICE_WORD_LENGTH, type GoPuzzleCount } from '../game/constants'
import { Button, Panel } from '../ui'
import { AdminPanel } from '../admin'
import { StatsDashboard } from '../stats'
import { WordExplorerPanel } from '../wordExplorer'
import { FeedbackPanel } from '../feedback'
import { SoundProvider, useSound } from '../sound'
import { applyTheme, getThemeMeta, isTheme, THEMES, type Theme } from '../theme'
import { GoGame } from './games/GoGame'
import { OgGame } from './games/OgGame'
import { LunarSignalStage } from './LunarSignalStage'
import { APP_ROUTES, DEFAULT_ROUTE_ID, getRouteById, getRoutesByGroup, type AppRoute } from './routes'

type PracticeMode = 'og' | 'go'

function isSameResumeSlot(left: ResumeSlot | undefined, right: ResumeSlot): boolean {
  if (!left) {
    return false
  }

  return left.difficulty === right.difficulty
    && left.mode === right.mode
    && left.scope === right.scope
    && left.wordLength === right.wordLength
    && (left.mode !== 'go' || (right.mode === 'go' && left.goPuzzleCount === right.goPuzzleCount))
    && JSON.stringify(left.serializedSession) === JSON.stringify(right.serializedSession)
}

function ModeCard({ route, onSelect }: { readonly route: AppRoute; readonly onSelect: (route: AppRoute) => void }) {
  return (
    <button
      className="brrrdle-prism-mode-card group relative overflow-hidden rounded-lg border border-white/10 bg-black/42 p-5 text-left shadow-2xl shadow-black/40 transition hover:border-[var(--color-ice-300)]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] motion-safe:hover:-translate-y-0.5"
      onClick={() => onSelect(route)}
      type="button"
    >
      <span className="text-xs font-semibold uppercase text-[var(--color-ice-200)]">{route.scope ?? 'support'}</span>
      <h2 className="mt-3 text-2xl font-black text-white">{route.label}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{route.description}</p>
      {route.wordLength ? (
        <p className="mt-4 text-sm font-semibold text-cyan-100">{route.wordLength} letters</p>
      ) : null}
    </button>
  )
}


function PracticeGameSwitcher({
  coins,
  defaultDifficulty,
  defaultGoPuzzleCount,
  keyboardDisabled,
  onGameComplete,
  onPracticeModeChange,
  onResumeCapture,
  onSaveDifficultyDefault,
  onSaveGoPuzzleCountDefault,
  onSpendCoins,
  practiceMode,
  resumeSlots,
}: {
  readonly coins: number
  readonly defaultDifficulty: DifficultyTier
  readonly defaultGoPuzzleCount: GoPuzzleCount
  readonly keyboardDisabled?: boolean
  readonly onGameComplete: (input: CompletedGameInput) => void
  readonly onPracticeModeChange: (mode: PracticeMode) => void
  readonly onResumeCapture: (capture: ResumeCapture) => void
  readonly onSaveDifficultyDefault: (tier: DifficultyTier) => void
  readonly onSaveGoPuzzleCountDefault: (count: GoPuzzleCount) => void
  readonly onSpendCoins: (amount: number) => boolean
  readonly practiceMode: PracticeMode
  readonly resumeSlots: ResumeSlotCollection
}) {
  const practiceOgResume = resumeSlots['practice-og']
  const practiceGoResume = resumeSlots['practice-go']

  return (
    <section className="space-y-5" aria-label="Practice mode selector">
      <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-slate-950/75 p-2 shadow-inner shadow-white/5">
        <Button onClick={() => onPracticeModeChange('og')} variant={practiceMode === 'og' ? 'primary' : 'secondary'}>og practice</Button>
        <Button onClick={() => onPracticeModeChange('go')} variant={practiceMode === 'go' ? 'primary' : 'secondary'}>go practice</Button>
      </div>
      {practiceMode === 'og'
        ? <OgGame coins={coins} defaultDifficulty={defaultDifficulty} initialResume={practiceOgResume?.mode === 'og' ? practiceOgResume : undefined} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={onSaveDifficultyDefault} onSpendCoins={onSpendCoins} scope="practice" />
        : <GoGame coins={coins} defaultDifficulty={defaultDifficulty} defaultGoPuzzleCount={defaultGoPuzzleCount} initialResume={practiceGoResume?.mode === 'go' ? practiceGoResume : undefined} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={onSaveDifficultyDefault} onSaveGoPuzzleCountDefault={onSaveGoPuzzleCountDefault} onSpendCoins={onSpendCoins} scope="practice" />}
    </section>
  )
}

function getAuthDisplay(authState: AuthState): string {
  if (authState.status === 'authenticated') {
    return 'Signed in'
  }

  if (authState.status === 'unconfigured') {
    return 'Local only'
  }

  return 'Guest'
}

function AboutBrrrdlePanel() {
  return (
    <section className="space-y-5" aria-labelledby="about-brrrdle-title">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">About</p>
        <h2 id="about-brrrdle-title" className="text-3xl font-bold text-white">About Brrrdle</h2>
        <p className="max-w-3xl text-base leading-7 text-slate-300">
          Brrrdle is a word-game playground built around og single boards, go chains, daily puzzles, and wide-range practice lengths.
        </p>
      </div>

      <Panel className="grid gap-4 text-sm leading-6 text-slate-300 md:grid-cols-3" tone="muted">
        <div>
          <p className="font-semibold text-cyan-100">Game modes</p>
          <p>Notes about og, go, daily, and practice rules can live here as the interface settles.</p>
        </div>
        <div>
          <p className="font-semibold text-cyan-100">Word lists</p>
          <p>Future copy can explain how answer banks, valid guesses, difficulty tiers, and definitions work.</p>
        </div>
        <div>
          <p className="font-semibold text-cyan-100">Credits</p>
          <p>Credits, release notes, design notes, and contact details can move here from temporary surfaces.</p>
        </div>
      </Panel>
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
  onResumeCapture,
  onSelectRoute,
  onSendMagicLink,
  onSignInWithPassword,
  onSignUpWithPassword,
  onSpendCoins,
  onSignOut,
  onOpenAuthModal,
  onOpenProfilePanel,
  onPracticeModeChange,
  practiceMode,
  resumeSlots,
  soundEnabled,
  onToggleSound,
  onUpdateSettings,
  supabaseClient,
  syncStatus,
}: {
  readonly authState: AuthState
  readonly authMessage?: string
  readonly guestProgress: ReturnType<typeof loadGuestProgress>
  readonly keyboardDisabled?: boolean
  readonly onGameComplete: (input: CompletedGameInput) => void
  readonly onResetProgress: () => void
  readonly onResumeCapture: (capture: ResumeCapture) => void
  readonly onPracticeModeChange: (mode: PracticeMode) => void
  readonly onSendMagicLink: (email: string) => void
  readonly onSignInWithPassword: (email: string, password: string) => void
  readonly onSignUpWithPassword: (email: string, password: string) => void
  readonly onSignOut: () => void
  readonly onOpenAuthModal: () => void
  readonly onOpenProfilePanel: () => void
  readonly practiceMode: PracticeMode
  readonly resumeSlots: ResumeSlotCollection
  readonly route: AppRoute
  readonly onSelectRoute: (routeId: AppRoute['id']) => void
  readonly soundEnabled: boolean
  readonly onToggleSound: (enabled: boolean) => void
  readonly onUpdateSettings: (patch: Partial<ReturnType<typeof loadGuestProgress>['settings']>) => void
  readonly supabaseClient: ReturnType<typeof createBrrrdleSupabaseClient>
  readonly syncStatus: ReturnType<typeof createSyncStatus>
  readonly onSpendCoins: (amount: number) => boolean
}) {
  if (route.id === 'home') {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {getRoutesByGroup('play')
            .filter((playRoute) => playRoute.id !== 'home')
            .map((playRoute) => (
              <ModeCard key={playRoute.id} onSelect={(selectedRoute) => onSelectRoute(selectedRoute.id)} route={playRoute} />
            ))}
        </div>
      </div>
    )
  }

  if (route.id === 'og-daily') {
    return <OgGame coins={guestProgress.progression.coins} defaultDifficulty={guestProgress.settings.difficultyDefault} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })} onSpendCoins={onSpendCoins} scope="daily" />
  }

  if (route.id === 'go-daily') {
    return <GoGame coins={guestProgress.progression.coins} defaultDifficulty={guestProgress.settings.difficultyDefault} defaultGoPuzzleCount={guestProgress.settings.goPuzzleCountDefault} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })} onSaveGoPuzzleCountDefault={(count) => onUpdateSettings({ goPuzzleCountDefault: count })} onSpendCoins={onSpendCoins} scope="daily" />
  }

  if (route.id === 'practice') {
    return <PracticeGameSwitcher coins={guestProgress.progression.coins} defaultDifficulty={guestProgress.settings.difficultyDefault} defaultGoPuzzleCount={guestProgress.settings.goPuzzleCountDefault} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onPracticeModeChange={onPracticeModeChange} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })} onSaveGoPuzzleCountDefault={(count) => onUpdateSettings({ goPuzzleCountDefault: count })} onSpendCoins={onSpendCoins} practiceMode={practiceMode} resumeSlots={resumeSlots} />
  }

  if (route.id === 'word-explorer') {
    return <WordExplorerPanel />
  }

  if (route.id === 'feedback') {
    return <FeedbackPanel />
  }

  if (route.id === 'stats') {
    return <StatsDashboard history={guestProgress.history} progression={guestProgress.progression} stats={guestProgress.stats} />
  }

  if (route.id === 'settings') {
    return (
      <Settings
        authMessage={authMessage}
        authState={authState}
        guestProgress={guestProgress}
        onOpenAuthModal={onOpenAuthModal}
        onOpenProfilePanel={onOpenProfilePanel}
        onResetProgress={onResetProgress}
        onSendMagicLink={onSendMagicLink}
        onSignInWithPassword={onSignInWithPassword}
        onSignOut={onSignOut}
        onSignUpWithPassword={onSignUpWithPassword}
        onToggleSound={onToggleSound}
        onUpdateSettings={onUpdateSettings}
        soundEnabled={soundEnabled}
        syncStatus={syncStatus}
      />
    )
  }

  if (route.id === 'about') {
    return <AboutBrrrdlePanel />
  }

  if (route.id === 'admin') {
    return <AdminPanel authState={authState} supabaseClient={supabaseClient} />
  }

  return (
    <section className="space-y-4" aria-labelledby="route-title">
      <p className="text-sm font-semibold uppercase text-[var(--color-ice-200)]">{route.navigationGroup}</p>
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
  const [authBusy, setAuthBusy] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [profilePanelOpen, setProfilePanelOpen] = useState(false)
  const [profileMessage, setProfileMessage] = useState<string | undefined>(undefined)
  const [profileBusy, setProfileBusy] = useState(false)
  const [syncStatus, setSyncStatus] = useState(() => createSyncStatus(supabaseClient ? 'idle' : 'error'))
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('og')
  const autoResumedRef = useRef(false)
  const guestProgressRef = useRef(guestProgress)
  const activeRoute = getRouteById(activeRouteId)
  const resumeSlots = useMemo(() => normalizeResumeSlots(guestProgress.resumeSlots), [guestProgress.resumeSlots])
  const isAdmin = authState.user?.roles.includes('admin') ?? false
  const prismRoutes = useMemo(() => APP_ROUTES.filter((route) => route.id !== 'home' && (route.id !== 'admin' || isAdmin)), [isAdmin])
  const handleNavigate = useCallback((routeId: AppRoute['id']) => {
    setActiveRouteId(routeId)
  }, [])
  const handleResumeCapture = useCallback((capture: ResumeCapture) => {
    setGuestProgress((currentProgress) => {
      const slotKey = getResumeSlotKey(capture)
      const currentSlots = normalizeResumeSlots(currentProgress.resumeSlots)
      const currentSlot = currentSlots[slotKey]
      if (isCaptureInProgress(capture)) {
        const nextSlot = createResumeSlot(capture)
        if (isSameResumeSlot(currentSlot, nextSlot)) {
          return currentProgress
        }
        const nextSlots = { ...currentSlots, [slotKey]: nextSlot }
        const nextProgress = { ...currentProgress, resumeSlot: getLatestResumeSlot(nextSlots), resumeSlots: nextSlots }
        saveGuestProgress(nextProgress)
        return nextProgress
      }
      if (!currentSlot) {
        return currentProgress
      }
      const nextSlots = { ...currentSlots }
      delete nextSlots[slotKey]
      const resumeSlotsForSave = Object.keys(nextSlots).length > 0 ? nextSlots : undefined
      const nextProgress = { ...currentProgress, resumeSlot: getLatestResumeSlot(resumeSlotsForSave ?? {}), resumeSlots: resumeSlotsForSave }
      saveGuestProgress(nextProgress)
      return nextProgress
    })
  }, [])
  const navigateToResumeSlot = useCallback((slot: ResumeSlot | undefined) => {
    if (!slot) {
      return
    }
    if (slot.scope === 'practice') {
      setPracticeMode(slot.mode)
      setActiveRouteId('practice')
      return
    }
    setActiveRouteId(slot.mode === 'og' ? 'og-daily' : 'go-daily')
  }, [])
  // Auto-resume the most recent unfinished game once per signed-in load (spec §2).
  // Called from async auth callbacks (not synchronously in an effect body).
  const maybeAutoResume = useCallback((nextAuthState: AuthState) => {
    if (nextAuthState.status !== 'authenticated' || autoResumedRef.current) {
      return
    }
    const slot = getLatestResumeSlot(normalizeResumeSlots(guestProgressRef.current.resumeSlots))
    if (!slot) {
      return
    }
    autoResumedRef.current = true
    navigateToResumeSlot(slot)
  }, [navigateToResumeSlot])
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
  const handleUpdateSettings = useCallback((patch: Partial<ReturnType<typeof loadGuestProgress>['settings']>) => {
    setGuestProgress((currentProgress) => {
      const nextSettings = { ...currentProgress.settings, ...patch }
      const nextProgress = { ...currentProgress, settings: nextSettings }
      saveGuestProgress(nextProgress)
      return nextProgress
    })
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
    setAuthBusy(true)
    void sendMagicLink(supabaseClient, email).then((result) => {
      setAuthBusy(false)
      setAuthMessage(result.ok ? 'Magic link sent. Check your email.' : classifyAuthError({ message: result.message }, 'magic-link'))
    })
  }, [supabaseClient])
  const handleSignInWithPassword = useCallback((email: string, password: string) => {
    if (!supabaseClient) {
      return
    }
    setAuthMessage(undefined)
    setAuthBusy(true)
    void signInWithPassword(supabaseClient, email, password).then((result) => {
      setAuthBusy(false)
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
    setAuthBusy(true)
    void signUpWithPassword(supabaseClient, email, password).then((result) => {
      setAuthBusy(false)
      if (!result.ok) {
        setAuthMessage(result.message)
      } else {
        setAuthMessage('Check your email to confirm your account, if email confirmation is enabled.')
      }
    })
  }, [supabaseClient])
  const handleRequestPasswordReset = useCallback((email: string) => {
    if (!supabaseClient) {
      return
    }
    setAuthMessage(undefined)
    setAuthBusy(true)
    void sendPasswordResetEmail(supabaseClient, email).then((result) => {
      setAuthBusy(false)
      if (!result.ok) {
        setAuthMessage(result.message)
      } else {
        setAuthMessage('Check your email for a reset link.')
      }
    })
  }, [supabaseClient])
  const handleSignOut = useCallback(() => {
    if (!supabaseClient || authBusy) {
      return
    }

    setAuthMessage(undefined)
    setProfileMessage(undefined)
    setAuthBusy(true)
    void signOut(supabaseClient).then((result) => {
      setAuthBusy(false)
      if (!result.ok) {
        setAuthMessage(result.message)
        setProfileMessage(result.message)
        return
      }

      setAuthState({ status: 'anonymous' })
      setAuthModalOpen(false)
      setProfilePanelOpen(false)
    })
  }, [authBusy, supabaseClient])
  const handleOpenAuthModal = useCallback(() => {
    setAuthMessage(undefined)
    setAuthModalOpen(true)
  }, [])
  const handleCloseAuthModal = useCallback(() => {
    setAuthModalOpen(false)
  }, [])
  const handleOpenProfilePanel = useCallback(() => {
    setProfileMessage(undefined)
    setProfilePanelOpen(true)
  }, [])
  const handleCloseProfilePanel = useCallback(() => {
    setProfilePanelOpen(false)
  }, [])
  const handleAccountHudClick = useCallback(() => {
    if (authState.status === 'authenticated') {
      handleOpenProfilePanel()
      return
    }

    if (authState.status === 'anonymous') {
      handleOpenAuthModal()
      return
    }

    handleNavigate('settings')
  }, [authState.status, handleNavigate, handleOpenAuthModal, handleOpenProfilePanel])
  const handleSyncNow = useCallback(() => {
    if (authState.status !== 'authenticated' || !authState.user || !supabaseClient) {
      if (authState.status === 'anonymous') {
        handleOpenAuthModal()
      } else {
        handleNavigate('settings')
      }
      setSyncStatus(createSyncStatus(supabaseClient ? 'idle' : 'error'))
      return
    }

    setSyncStatus(createSyncStatus('syncing'))
    void syncGuestProgress({
      isOnline: typeof navigator === 'undefined' ? true : navigator.onLine,
      localProgress: guestProgressRef.current,
      localUpdatedAt: new Date().toISOString(),
      repository: createSupabaseProgressRepository(supabaseClient),
      userId: authState.user.id,
    }).then((result) => {
      setGuestProgress(result.progress)
      saveGuestProgress(result.progress)
      setSyncStatus(result.status)
    })
  }, [authState, handleNavigate, handleOpenAuthModal, supabaseClient])
  const handleSaveProfile = useCallback(async (input: { readonly displayName?: string; readonly accentColor?: ProfileAccentColor; readonly avatarUrl?: string }) => {
    if (!supabaseClient) {
      return
    }
    setProfileMessage(undefined)
    setProfileBusy(true)
    const result = await updateProfile(supabaseClient, input)
    setProfileBusy(false)
    if (!result.ok) {
      setProfileMessage(result.message)
      return
    }
    setProfileMessage('Profile saved.')
    // Re-derive AuthState so the new metadata flows to AccountBadge immediately.
    const fresh = await getCurrentAuthState(supabaseClient)
    setAuthState(fresh)
    setProfilePanelOpen(false)
  }, [supabaseClient])

  useEffect(() => {
    guestProgressRef.current = guestProgress
  }, [guestProgress])

  useEffect(() => {
    applyTheme(guestProgress.settings.themeDefault)
  }, [guestProgress.settings.themeDefault])

  useEffect(() => {
    let isMounted = true
    void getCurrentAuthState(supabaseClient).then((nextAuthState) => {
      if (isMounted) {
        setAuthState(nextAuthState)
        maybeAutoResume(nextAuthState)
      }
    })
    const subscription = subscribeToAuthChanges(supabaseClient, (nextAuthState) => {
      if (isMounted) {
        setAuthState(nextAuthState)
        maybeAutoResume(nextAuthState)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [maybeAutoResume, supabaseClient])

  return (
    <>
      <LunarSignalStage
        accountControls={<AccountBadge authState={authState} onOpenAuthModal={handleOpenAuthModal} onOpenProfile={handleOpenProfilePanel} />}
        activeRoute={activeRoute}
        metrics={[
          { label: 'daily', value: `${DAILY_WORD_LENGTH} letters` },
          { label: 'practice', value: `${MIN_PRACTICE_WORD_LENGTH}-${MAX_PRACTICE_WORD_LENGTH}` },
          { label: 'go chain', value: `${guestProgress.settings.goPuzzleCountDefault} boards` },
          { label: 'banks', value: BUNDLED_WORD_LIST_LENGTHS.length },
        ]}
        onNavigate={handleNavigate}
        routes={prismRoutes}
        statusLines={[
          {
            label: 'Account',
            value: (
              <button className="brrrdle-lunar-line-action" onClick={handleAccountHudClick} type="button">
                {getAuthDisplay(authState)}
              </button>
            ),
          },
          {
            label: 'Sync',
            value: (
              <button className="brrrdle-lunar-line-action" onClick={handleSyncNow} type="button">
                {syncStatus.kind}
              </button>
            ),
          },
          {
            label: 'Sound',
            value: (
              <button
                aria-checked={sound.enabled}
                className="brrrdle-lunar-switch"
                onClick={() => sound.setEnabled(!sound.enabled)}
                role="switch"
                type="button"
              >
                <span aria-hidden="true" />
                <strong>{sound.enabled ? 'On' : 'Off'}</strong>
              </button>
            ),
          },
          {
            label: 'Theme',
            value: (
              <select
                aria-label="Theme"
                className="brrrdle-lunar-line-select"
                onChange={(event) => {
                  if (isTheme(event.target.value)) {
                    handleUpdateSettings({ themeDefault: event.target.value as Theme })
                  }
                }}
                value={guestProgress.settings.themeDefault}
              >
                {THEMES.map((theme) => (
                  <option key={theme} value={theme}>{getThemeMeta(theme).label}</option>
                ))}
              </select>
            ),
          },
        ]}
      >
          <RoutePanel
            authMessage={authMessage}
            authState={authState}
            guestProgress={guestProgress}
            onGameComplete={handleGameComplete}
            onOpenAuthModal={handleOpenAuthModal}
            onOpenProfilePanel={handleOpenProfilePanel}
            onPracticeModeChange={setPracticeMode}
            onResetProgress={handleResetProgress}
            onResumeCapture={handleResumeCapture}
            onSelectRoute={handleNavigate}
            onSendMagicLink={handleSendMagicLink}
            onSignInWithPassword={handleSignInWithPassword}
            onSignOut={handleSignOut}
            onSignUpWithPassword={handleSignUpWithPassword}
            onSpendCoins={handleSpendCoins}
            onToggleSound={sound.setEnabled}
            onUpdateSettings={handleUpdateSettings}
            practiceMode={practiceMode}
            resumeSlots={resumeSlots}
            route={activeRoute}
            soundEnabled={sound.enabled}
            supabaseClient={supabaseClient}
            syncStatus={syncStatus}
          />
      </LunarSignalStage>

      <AuthModal
        authenticated={authState.status === 'authenticated'}
        authMessage={authMessage}
        busy={authBusy}
        isOpen={authModalOpen}
        onClose={handleCloseAuthModal}
        onRequestPasswordReset={handleRequestPasswordReset}
        onSendMagicLink={handleSendMagicLink}
        onSignInWithPassword={handleSignInWithPassword}
        onSignUpWithPassword={handleSignUpWithPassword}
      />

      <ProfilePanel
        authState={authState}
        busy={profileBusy}
        isOpen={profilePanelOpen}
        onClose={handleCloseProfilePanel}
        onSave={handleSaveProfile}
        onSignOut={handleSignOut}
        statusMessage={profileMessage}
        supabaseClient={supabaseClient}
      />
    </>
  )
}

export default App
