import { useCallback, useEffect, useMemo, useState } from 'react'
import { BUNDLED_WORD_LIST_LENGTHS, DEFAULT_DIFFICULTY_TIER, type DifficultyTier } from '../../data'
import type { CompletedGameInput, OgResumeSlot, ResumeCapture } from '../../account'
import { DefinitionPanel } from '../../definitions'
import {
  createDailyOgSetup,
  createOgSession,
  createPracticeOgSetup,
  continueAfterLoss,
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
  formatOgShare,
} from '../../game'
import { clearDailyOgStoredSession, loadDailyOgStoredSession, saveDailyOgStoredSession } from '../../game/storage/dailyOgStorage'
import { dateKeyToLocalDate, getActiveDailyDate } from '../../daily'
import { calculatePayToContinueCost } from '../../progression'
import { useSound } from '../../sound'
import { Button, Keyboard, Panel, ShareButton } from '../../ui'
import { classNames } from '../../ui/classNames'
import { CustomizeMenu } from './CustomizeMenu'

interface OgGameProps {
  readonly coins: number
  readonly defaultDifficulty?: DifficultyTier
  readonly initialResume?: OgResumeSlot
  readonly keyboardDisabled?: boolean
  readonly onGameComplete?: (input: CompletedGameInput) => void
  readonly onResumeCapture?: (capture: ResumeCapture) => void
  readonly onSaveDifficultyDefault?: (tier: DifficultyTier) => void
  readonly onSpendCoins: (amount: number) => boolean
  readonly scope: 'daily' | 'practice'
  /**
   * Phase 22 Addendum (§27.10) — when set, this daily renders a specific *past*
   * day (instead of today's granted daily). The puzzle, persistence, and stats
   * are all keyed to this date so it behaves as a full daily experience.
   */
  readonly pastDailyDateKey?: string
  /**
   * Invoked once the player makes their first guess on a past daily, so the
   * caller can mark it permanently unlocked.
   */
  readonly onMarkDailyUnlocked?: () => void
}

type GridTileState = TileState | 'empty' | 'current'

const tileStateClasses: Record<GridTileState, string> = {
  absent: 'border-slate-700 bg-slate-950 text-slate-400',
  correct: 'border-emerald-300/70 bg-emerald-300/25 text-emerald-50',
  current: 'border-cyan-200/70 bg-cyan-300/10 text-cyan-50',
  empty: 'border-slate-700 bg-slate-950/60 text-slate-500',
  present: 'border-amber-300/70 bg-amber-300/20 text-amber-50',
}

function createInitialDailySession(setup: ReturnType<typeof createDailyOgSetup>, pastDailyDateKey?: string): PuzzleSessionState {
  const stored = loadDailyOgStoredSession(undefined, pastDailyDateKey)
  if (stored && stored.dateKey === setup.dateKey && stored.session.answer === setup.answer) {
    return restoreOgSession(stored.session, setup.validGuesses)
  }

  clearDailyOgStoredSession(undefined, pastDailyDateKey)
  return createOgSession(setup)
}

function GuessGrid({ session }: { readonly session: PuzzleSessionState }) {
  type GridTile = { readonly isSubmitted: boolean; readonly letter: string; readonly state: GridTileState }
  const rows = useMemo(() => Array.from({ length: session.maxAttempts }, (_, rowIndex) => {
    const submittedGuess = session.guesses[rowIndex]
    if (submittedGuess) {
      return submittedGuess.tiles.map((tile): GridTile => ({ isSubmitted: true, letter: tile.letter, state: tile.state }))
    }

    if (rowIndex === session.guesses.length && session.status === 'playing') {
      return Array.from({ length: session.wordLength }, (_, tileIndex): GridTile => ({
        isSubmitted: false,
        letter: session.currentGuess[tileIndex] ?? '',
        state: session.currentGuess[tileIndex] ? 'current' : 'empty',
      }))
    }

    return Array.from({ length: session.wordLength }, (): GridTile => ({ isSubmitted: false, letter: '', state: 'empty' }))
  }), [session.currentGuess, session.guesses, session.maxAttempts, session.status, session.wordLength])

  return (
    <div aria-label="Guess grid" className="@container space-y-1.5 sm:space-y-2" role="grid">
      {rows.map((row, rowIndex) => (
        <div
          className={classNames('mx-auto grid gap-1 sm:gap-1.5', session.lastValidation && rowIndex === session.guesses.length ? 'motion-safe:animate-[brrrdle-row-shake_180ms_ease-in-out]' : undefined)}
          key={rowIndex}
          role="row"
          style={{
            gridTemplateColumns: `repeat(${session.wordLength}, minmax(0, 1fr))`,
            maxWidth: `calc(var(--brrrdle-tile-max) * ${session.wordLength} + 0.375rem * ${session.wordLength - 1})`,
          }}
        >
          {row.map((tile, tileIndex) => (
            <div
              aria-label={`Row ${rowIndex + 1}, tile ${tileIndex + 1}${tile.letter ? `, ${tile.letter}` : ''}`}
              className={classNames(
                '@container flex aspect-square items-center justify-center rounded-xl border font-black uppercase shadow-inner shadow-slate-950/20',
                tileStateClasses[tile.state],
                tile.state === 'current' ? 'motion-safe:animate-[brrrdle-tile-pop_180ms_ease-out]' : undefined,
                tile.isSubmitted ? 'motion-safe:animate-[brrrdle-tile-reveal_360ms_ease-out]' : undefined,
              )}
              key={`${rowIndex}-${tileIndex}`}
              role="gridcell"
              style={{ fontSize: 'clamp(0.625rem, 50cqi, 1.75rem)' }}
            >
              {tile.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function getCompletionPercentage(session: PuzzleSessionState): number {
  const bestCorrectTiles = session.guesses.reduce((best, guess) => {
    const correctTiles = guess.tiles.filter((tile) => tile.state === 'correct').length
    return Math.max(best, correctTiles)
  }, 0)

  return Math.round((bestCorrectTiles / session.wordLength) * 100)
}

function OgGameSession({
  coins,
  defaultDifficulty,
  difficulty,
  keyboardDisabled,
  onDifficultyChange,
  onGameComplete,
  onPracticeLengthChange,
  onPracticeSeedChange,
  onResumeCapture,
  onMarkDailyUnlocked,
  pastDailyDateKey,
  onSaveDifficultyDefault,
  onSpendCoins,
  practiceLength,
  practiceLengths,
  practiceSeed,
  restoreFrom,
  scope,
  setup,
}: {
  readonly coins: number
  readonly defaultDifficulty: DifficultyTier
  readonly difficulty: DifficultyTier
  readonly keyboardDisabled: boolean
  readonly onDifficultyChange: (tier: DifficultyTier) => void
  readonly onGameComplete?: (input: CompletedGameInput) => void
  readonly onPracticeLengthChange: (length: number) => void
  readonly onPracticeSeedChange: () => void
  readonly onResumeCapture?: (capture: ResumeCapture) => void
  readonly onMarkDailyUnlocked?: () => void
  readonly pastDailyDateKey?: string
  readonly onSaveDifficultyDefault?: (tier: DifficultyTier) => void
  readonly onSpendCoins: (amount: number) => boolean
  readonly practiceLength: number
  readonly practiceLengths: readonly number[]
  readonly practiceSeed: number
  readonly restoreFrom?: ReturnType<typeof serializeOgSession>
  readonly scope: OgGameProps['scope']
  readonly setup: OgPuzzleSetup
}) {
  const [session, setSession] = useState(() => {
    if (restoreFrom) {
      return restoreOgSession(restoreFrom, setup.validGuesses)
    }
    return scope === 'daily' ? createInitialDailySession(setup, pastDailyDateKey) : createOgSession(setup)
  })
  const [continuationMessage, setContinuationMessage] = useState<string>()
  const [revealedAnswer, setRevealedAnswer] = useState(false)
  const completionPercentage = getCompletionPercentage(session)
  const continuationCost = calculatePayToContinueCost({
    completionPercentage,
    continuationCount: session.continuationCount,
    wordLength: session.wordLength,
  })
  const canAffordContinuation = session.status === 'lost' && !revealedAnswer && coins >= continuationCost
  const canReveal = scope === 'practice' && session.status === 'playing' && session.guesses.length > 0

  useEffect(() => {
    if (scope !== 'daily' || !setup.dateKey) {
      return
    }

    saveDailyOgStoredSession({
      dateKey: setup.dateKey,
      session: serializeOgSession(session),
    }, undefined, pastDailyDateKey)
  }, [pastDailyDateKey, scope, session, setup.dateKey])

  // Phase 22 Addendum (§27.10): the first guess on a past daily permanently
  // unlocks it, so the player never has to pay the coin cost again.
  useEffect(() => {
    if (pastDailyDateKey && session.guesses.length > 0) {
      onMarkDailyUnlocked?.()
    }
  }, [onMarkDailyUnlocked, pastDailyDateKey, session.guesses.length])

  useEffect(() => {
    onResumeCapture?.({
      difficulty,
      mode: 'og',
      scope,
      serializedSession: serializeOgSession(session),
      wordLength: session.wordLength,
    })
  }, [difficulty, onResumeCapture, scope, session])

  useEffect(() => {
    if (session.status === 'playing') {
      return
    }

    if (session.status === 'lost' && canAffordContinuation) {
      return
    }

    onGameComplete?.({
      attemptsUsed: session.guesses.length,
      difficulty,
      gameId: scope === 'daily' ? `og:daily:${setup.dateKey}` : `og:practice:${practiceLength}:${practiceSeed}:${setup.answer}`,
      maxAttempts: session.maxAttempts,
      mode: 'og',
      scope,
      status: session.status,
      word: session.answer,
      wordLength: session.wordLength,
      ...(pastDailyDateKey ? { affectsStreak: false } : {}),
    })
  }, [canAffordContinuation, difficulty, onGameComplete, pastDailyDateKey, practiceLength, practiceSeed, scope, session.answer, session.guesses.length, session.maxAttempts, session.status, session.wordLength, setup.answer, setup.dateKey])

  const sound = useSound()
  const handleInput = useCallback((input: KeyboardInput) => {
    setContinuationMessage(undefined)
    sound.play('keyboard-click')
    setSession((currentSession) => {
      if (input.type === 'letter') {
        return enterLetter(currentSession, input.value)
      }

      if (input.type === 'delete') {
        return deleteLetter(currentSession)
      }

      const nextSession = submitGuess(currentSession)
      if (nextSession === currentSession) {
        sound.play('invalid-guess')
      } else {
        sound.play('tile-flip')
        if (nextSession.status === 'won') {
          sound.play('correct-guess')
        }
      }
      return nextSession
    })
  }, [sound])

  const handlePayToContinue = useCallback(() => {
    if (session.status !== 'lost') {
      return
    }

    if (!onSpendCoins(continuationCost)) {
      setContinuationMessage(`You need ${continuationCost} coins to continue this puzzle.`)
      return
    }

    setSession((currentSession) => continueAfterLoss(currentSession))
    setRevealedAnswer(false)
    setContinuationMessage(`Spent ${continuationCost} coins for one more attempt.`)
  }, [continuationCost, onSpendCoins, session.status])

  const handleReveal = useCallback(() => {
    if (!canReveal) {
      return
    }

    if (!onSpendCoins(continuationCost)) {
      setContinuationMessage(`You need ${continuationCost} coins to reveal this answer.`)
      return
    }

    const answer = session.answer.toLocaleUpperCase('en-US')
    setRevealedAnswer(true)
    setSession((currentSession) => ({
      ...currentSession,
      currentGuess: '',
      lastValidation: undefined,
      status: 'lost',
    }))
    setContinuationMessage(`Revealed the answer: ${answer}. This puzzle counts as a loss.`)
  }, [canReveal, continuationCost, onSpendCoins, session.answer])

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

        {onSaveDifficultyDefault ? (
          <CustomizeMenu
            defaultDifficulty={defaultDifficulty}
            difficulty={difficulty}
            locked={session.guesses.length > 0}
            onDifficultyChange={onDifficultyChange}
            onSaveDefault={() => onSaveDifficultyDefault(difficulty)}
          />
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

        <div aria-live="polite" className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3 text-sm leading-6 text-slate-200" role="status">
          <p>{statusMessage}</p>
          {session.lastValidation ? <p className="mt-1 font-semibold text-amber-100">{session.lastValidation.message}</p> : null}
        </div>

        {session.status === 'lost' ? (
          !revealedAnswer ? (
            <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
              <p className="font-bold">Pay to Continue</p>
              <p>Spend {continuationCost} coins for one more attempt. Current balance: {coins} coins.</p>
              <Button disabled={!canAffordContinuation} onClick={handlePayToContinue} variant="secondary">
                {canAffordContinuation ? `Pay ${continuationCost} coins to continue` : `Need ${continuationCost} coins to continue`}
              </Button>
              {continuationMessage ? <p className="mt-2 font-semibold">{continuationMessage}</p> : null}
            </div>
          ) : continuationMessage ? (
            <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-3 text-sm font-semibold text-cyan-50">{continuationMessage}</div>
          ) : null
        ) : continuationMessage ? (
          <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-3 text-sm font-semibold text-cyan-50">{continuationMessage}</div>
        ) : null}

        {canReveal ? (
          <div className="rounded-2xl border border-rose-300/30 bg-rose-300/10 p-4 text-sm leading-6 text-rose-50">
            <p className="font-bold">Give Up / Reveal Answer</p>
            <p>Reveal this answer for {continuationCost} coins. This counts as a loss. Current balance: {coins} coins.</p>
            <Button onClick={handleReveal} variant="secondary">
              Reveal answer ({continuationCost} coins)
            </Button>
          </div>
        ) : null}

        <Keyboard disabled={session.status !== 'playing'} letterStates={letterStates} onInput={handleInput} />


        {session.status !== 'playing' ? (
          <ShareButton
            label="Share og result"
            text={formatOgShare({
              dateKey: setup.dateKey,
              guesses: session.guesses,
              maxAttempts: session.maxAttempts,
              mode: 'og',
              scope,
              status: session.status,
            })}
          />
        ) : null}

        <DefinitionPanel
          enabled={session.status !== 'playing'}
          mode="og"
          scope={scope}
          word={session.answer}
          wordLength={session.wordLength}
        />
      </Panel>
    </section>
  )
}

export function OgGame({ coins, defaultDifficulty = DEFAULT_DIFFICULTY_TIER, initialResume, keyboardDisabled = false, onGameComplete, onResumeCapture, onSaveDifficultyDefault, onSpendCoins, scope, pastDailyDateKey, onMarkDailyUnlocked }: OgGameProps) {
  const resumePractice = initialResume?.scope === 'practice' ? initialResume : undefined
  const practiceLengths = useMemo(() => getAvailableOgPracticeLengths(), [])
  const [practiceLength, setPracticeLength] = useState(() => resumePractice?.wordLength ?? 5)
  const [practiceSeed, setPracticeSeed] = useState(0)
  const [difficulty, setDifficulty] = useState<DifficultyTier>(resumePractice?.difficulty ?? defaultDifficulty)
  const [resumeConsumed, setResumeConsumed] = useState(false)
  const activeResume = resumePractice && !resumeConsumed ? resumePractice : undefined
  const dailyDate = useMemo(
    () => pastDailyDateKey ? dateKeyToLocalDate(pastDailyDateKey) : getActiveDailyDate(),
    [pastDailyDateKey],
  )
  const setup = useMemo(
    () => scope === 'daily' ? createDailyOgSetup(dailyDate, difficulty) : createPracticeOgSetup(practiceLength, practiceSeed, difficulty),
    [dailyDate, difficulty, practiceLength, practiceSeed, scope],
  )
  const sessionKey = scope === 'daily'
    ? `${scope}-${difficulty}-${setup.dateKey}`
    : `${scope}-${difficulty}-${practiceLength}-${practiceSeed}${activeResume ? `-resume-${activeResume.updatedAt}` : ''}`

  return (
    <OgGameSession
      key={sessionKey}
      coins={coins}
      defaultDifficulty={defaultDifficulty}
      difficulty={difficulty}
      keyboardDisabled={keyboardDisabled}
      onDifficultyChange={(tier) => { setResumeConsumed(true); setDifficulty(tier) }}
      onGameComplete={onGameComplete}
      onMarkDailyUnlocked={onMarkDailyUnlocked}
      onPracticeLengthChange={(length) => { setResumeConsumed(true); setPracticeLength(length) }}
      onPracticeSeedChange={() => { setResumeConsumed(true); setPracticeSeed((seed) => seed + 1) }}
      onResumeCapture={pastDailyDateKey ? undefined : onResumeCapture}
      onSaveDifficultyDefault={onSaveDifficultyDefault}
      onSpendCoins={onSpendCoins}
      pastDailyDateKey={pastDailyDateKey}
      practiceLength={practiceLength}
      practiceLengths={practiceLengths}
      practiceSeed={practiceSeed}
      restoreFrom={activeResume?.serializedSession}
      scope={scope}
      setup={setup}
    />
  )
}
