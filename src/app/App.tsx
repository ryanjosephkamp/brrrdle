import { useCallback, useMemo, useState } from 'react'
import { BUNDLED_WORD_LIST_LENGTHS } from '../data'
import { DAILY_WORD_LENGTH, MAX_PRACTICE_WORD_LENGTH, MIN_PRACTICE_WORD_LENGTH } from '../game/constants'
import { deriveKeyboardLetterStates, getGuessResult, useKeyboardInput, type KeyboardInput } from '../game'
import { Button, Dialog, ErrorState, Keyboard, Layout, LoadingState, Navigation, Panel, ToastRegion, type ToastMessage } from '../ui'
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

function RoutePanel({
  route,
  onSelectRoute,
}: {
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

const keyboardPreviewAnswer = 'cacao'
const keyboardPreviewGuess = 'cigar'
const previewLetterStates = deriveKeyboardLetterStates([getGuessResult(keyboardPreviewGuess, keyboardPreviewAnswer)])

const shellMessages: readonly ToastMessage[] = [
  {
    id: 'shell-ready',
    message: 'Design tokens, focus states, shell primitives, and keyboard input plumbing are active for Phase 3.3 review.',
    title: 'Shell and keyboard foundation ready',
    tone: 'info',
  },
]

function App() {
  const [activeRouteId, setActiveRouteId] = useState(DEFAULT_ROUTE_ID)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [keyboardPreview, setKeyboardPreview] = useState('')
  const [keyboardStatus, setKeyboardStatus] = useState('Physical and on-screen keys are ready for future gameplay surfaces.')
  const activeRoute = getRouteById(activeRouteId)
  const navigationRoutes = useMemo(() => APP_ROUTES, [])
  const handleKeyboardInput = useCallback((input: KeyboardInput) => {
    if (input.type === 'letter') {
      setKeyboardPreview((currentValue) => {
        if (currentValue.length >= DAILY_WORD_LENGTH) {
          return currentValue
        }

        return `${currentValue}${input.value}`
      })
      setKeyboardStatus(`Accepted letter ${input.value.toLocaleUpperCase('en-US')} for the keyboard preview.`)
      return
    }

    if (input.type === 'delete') {
      setKeyboardPreview((currentValue) => currentValue.slice(0, -1))
      setKeyboardStatus('Deleted one preview letter.')
      return
    }

    setKeyboardStatus('Submit key received; gameplay submission remains disabled until Phase 4.')
  }, [])

  useKeyboardInput({ disabled: isDialogOpen, onInput: handleKeyboardInput })

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
            <RoutePanel onSelectRoute={setActiveRouteId} route={activeRoute} />
            <aside className="space-y-4" aria-label="Interface readiness">
              <Panel className="space-y-4" tone="muted">
                <h2 className="text-xl font-bold text-white">UI foundation</h2>
                <LoadingState label="Preparing future game surfaces" />
                <Button onClick={() => setIsDialogOpen(true)} variant="primary">Review shell notes</Button>
              </Panel>
              <Panel className="space-y-4" tone="muted">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white">Keyboard foundation</h2>
                  <p className="text-sm leading-6 text-slate-300">
                    Physical and on-screen keyboard input is normalized for future gameplay. Letter colors below are derived from canonical tile-state results.
                  </p>
                </div>
                <div aria-live="polite" className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3 text-sm text-slate-200">
                  <p className="font-semibold text-cyan-100">Preview input: {keyboardPreview || 'empty'}</p>
                  <p className="mt-1 text-slate-300">{keyboardStatus}</p>
                </div>
                <Keyboard letterStates={previewLetterStates} onInput={handleKeyboardInput} />
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
        title="Phase 3.3 shell notes"
      >
        <p>
          The shell now has reusable icy visual tokens, accessible button styles, panel surfaces, toast notifications, loading states, error states, dialog behavior, and keyboard input plumbing for future gameplay phases.
        </p>
      </Dialog>
      <ToastRegion messages={shellMessages} />
    </>
  )
}

export default App
