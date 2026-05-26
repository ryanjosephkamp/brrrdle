import { useCallback, useEffect, useMemo, useState } from 'react'
import { BUNDLED_WORD_LIST_LENGTHS } from '../data'
import {
  createDailyOgSetup,
  createOgSession,
  createPracticeOgSetup,
  deleteLetter,
  deriveKeyboardLetterStates,
  enterLetter,
  getAvailableOgPracticeLengths,
  restoreOgSession,
  serializeOgSession,
  submitGuess,
  useKeyboardInput,
  type KeyboardInput,
  type OgPuzzleSetup,
  type PuzzleSessionState,
  type TileState,
} from '../game'
import { clearDailyOgStoredSession, loadDailyOgStoredSession, saveDailyOgStoredSession } from '../lib/storage/dailyOgStorage'
import { Button, Keyboard, Panel } from '../ui'
import { classNames } from '../ui/classNames'

interface OgGameProps {
  readonly keyboardDisabled?: boolean
  readonly scope: 'daily' | 'practice'
}

type GridTileState = TileState | 'empty' | 'current'

const tileStateClasses: Record<GridTileState, string> = {
  absent: 'border-slate-700 bg-slate-950 text-slate-400',
  correct: 'border-emerald-300/70 bg-emerald-300/25 text-emerald-50',
  current: 'border-cyan-200/70 bg-cyan-300/10 text-cyan-50',
  empty: 'border-slate-700 bg-slate-950/60 text-slate-500',
  present: 'border-amber-300/70 bg-amber-300/20 text-amber-50',
}

function createInitialDailySession(setup: ReturnType<typeof createDailyOgSetup>): PuzzleSessionState {
  const stored = loadDailyOgStoredSession()
  if (stored && stored.dateKey === setup.dateKey && stored.session.answer === setup.answer) {
    return restoreOgSession(stored.session, setup.validGuesses)
  }

  clearDailyOgStoredSession()
  return createOgSession(setup)
}

function GuessGrid({ session }: { readonly session: PuzzleSessionState }) {
  type GridTile = { readonly letter: string; readonly state: GridTileState }
  const rows = Array.from({ length: session.maxAttempts }, (_, rowIndex) => {
    const submittedGuess = session.guesses[rowIndex]
    if (submittedGuess) {
      return submittedGuess.tiles.map((tile): GridTile => ({ letter: tile.letter, state: tile.state }))
    }

    if (rowIndex === session.guesses.length && session.status === 'playing') {
      return Array.from({ length: session.wordLength }, (_, tileIndex): GridTile => ({
        letter: session.currentGuess[tileIndex] ?? '',
        state: session.currentGuess[tileIndex] ? 'current' : 'empty',
      }))
    }

    return Array.from({ length: session.wordLength }, (): GridTile => ({ letter: '', state: 'empty' }))
  })

  return (
    <div aria-label="Guess grid" className="space-y-2">
      {rows.map((row, rowIndex) => (
        <div className="grid gap-1.5" key={rowIndex} style={{ gridTemplateColumns: `repeat(${session.wordLength}, minmax(0, 1fr))` }}>
          {row.map((tile, tileIndex) => (
            <div
              aria-label={`Row ${rowIndex + 1}, tile ${tileIndex + 1}${tile.letter ? `, ${tile.letter}` : ''}`}
              className={classNames(
                'flex aspect-square min-h-8 items-center justify-center rounded-xl border text-sm font-black uppercase shadow-inner shadow-slate-950/20 sm:min-h-10 sm:text-base',
                tileStateClasses[tile.state],
              )}
              key={`${rowIndex}-${tileIndex}`}
            >
              {tile.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function OgGameSession({
  keyboardDisabled,
  onPracticeLengthChange,
  onPracticeSeedChange,
  practiceLength,
  practiceLengths,
  scope,
  setup,
}: {
  readonly keyboardDisabled: boolean
  readonly onPracticeLengthChange: (length: number) => void
  readonly onPracticeSeedChange: () => void
  readonly practiceLength: number
  readonly practiceLengths: readonly number[]
  readonly scope: OgGameProps['scope']
  readonly setup: OgPuzzleSetup
}) {
  const [session, setSession] = useState(() => scope === 'daily' ? createInitialDailySession(setup) : createOgSession(setup))

  useEffect(() => {
    if (scope !== 'daily' || !setup.dateKey) {
      return
    }

    saveDailyOgStoredSession({
      dateKey: setup.dateKey,
      session: serializeOgSession(session),
    })
  }, [scope, session, setup.dateKey])

  const handleInput = useCallback((input: KeyboardInput) => {
    setSession((currentSession) => {
      if (input.type === 'letter') {
        return enterLetter(currentSession, input.value)
      }

      if (input.type === 'delete') {
        return deleteLetter(currentSession)
      }

      return submitGuess(currentSession)
    })
  }, [])

  useKeyboardInput({ disabled: keyboardDisabled, onInput: handleInput })

  const letterStates = deriveKeyboardLetterStates(session.guesses)
  const statusMessage = session.status === 'won'
    ? 'Solved. Daily completion is preserved on refresh.'
    : session.status === 'lost'
      ? `Out of attempts. The answer was ${session.answer.toLocaleUpperCase('en-US')}.`
      : `${session.maxAttempts - session.guesses.length} attempts remaining.`

  return (
    <section className="space-y-5" aria-labelledby="og-game-title">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">og {scope}</p>
        <h2 id="og-game-title" className="text-3xl font-bold text-white">
          {scope === 'daily' ? 'Daily og puzzle' : 'Practice og puzzle'}
        </h2>
        <p className="max-w-3xl text-base leading-7 text-slate-300">
          Classic single-board brrrdle is active with canonical tile states, physical keyboard input, on-screen keyboard input, and optional hard mode.
        </p>
      </div>

      <Panel className="space-y-4" tone="muted">
        <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-cyan-100">Word length</p>
            <p>{session.wordLength} letters</p>
          </div>
          <div>
            <p className="font-semibold text-cyan-100">Puzzle status</p>
            <p className="capitalize">{session.status}</p>
          </div>
          <div>
            <p className="font-semibold text-cyan-100">Seed lists</p>
            <p>{BUNDLED_WORD_LIST_LENGTHS.join(', ')}</p>
          </div>
        </div>

        {scope === 'practice' ? (
          <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-700 bg-slate-950/50 p-3">
            <label className="grid gap-1 text-sm font-semibold text-cyan-100">
              Practice length
              <select
                className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
                onChange={(event) => onPracticeLengthChange(Number(event.target.value))}
                value={practiceLength}
              >
                {practiceLengths.map((length) => (
                  <option key={length} value={length}>{length} letters</option>
                ))}
              </select>
            </label>
            <Button onClick={onPracticeSeedChange} variant="secondary">New practice puzzle</Button>
            <p className="text-sm leading-6 text-slate-300">Practice uses available bundled launch seed lengths while the full data refresh pipeline is completed later.</p>
          </div>
        ) : null}

        <label className="flex items-center gap-3 text-sm font-semibold text-cyan-100">
          <input
            checked={session.hardMode}
            className="h-4 w-4 accent-cyan-300"
            onChange={(event) => setSession((currentSession) => ({ ...currentSession, hardMode: event.target.checked, lastValidation: undefined }))}
            type="checkbox"
          />
          Hard mode
        </label>

        <GuessGrid session={session} />

        <div aria-live="polite" className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3 text-sm leading-6 text-slate-200">
          <p>{statusMessage}</p>
          {session.lastValidation ? <p className="mt-1 font-semibold text-amber-100">{session.lastValidation.message}</p> : null}
        </div>

        <Keyboard disabled={session.status !== 'playing'} letterStates={letterStates} onInput={handleInput} />
      </Panel>
    </section>
  )
}

export function OgGame({ keyboardDisabled = false, scope }: OgGameProps) {
  const practiceLengths = useMemo(() => getAvailableOgPracticeLengths(), [])
  const [practiceLength, setPracticeLength] = useState(5)
  const [practiceSeed, setPracticeSeed] = useState(0)
  const setup = useMemo(
    () => scope === 'daily' ? createDailyOgSetup() : createPracticeOgSetup(practiceLength, practiceSeed),
    [practiceLength, practiceSeed, scope],
  )
  const sessionKey = scope === 'daily' ? `${scope}-${setup.dateKey}` : `${scope}-${practiceLength}-${practiceSeed}`

  return (
    <OgGameSession
      key={sessionKey}
      keyboardDisabled={keyboardDisabled}
      onPracticeLengthChange={setPracticeLength}
      onPracticeSeedChange={() => setPracticeSeed((seed) => seed + 1)}
      practiceLength={practiceLength}
      practiceLengths={practiceLengths}
      scope={scope}
      setup={setup}
    />
  )
}
