import { useCallback, useEffect, useMemo, useState } from 'react'
import { BUNDLED_WORD_LIST_LENGTHS, DEFAULT_DIFFICULTY_TIER, type DifficultyTier } from '../../data'
import { DEFAULT_GO_PUZZLE_COUNT, type GoPuzzleCount } from '../../game/constants'
import type { CompletedGameInput, GoResumeSlot, ResumeCapture } from '../../account'
import { DefinitionPanel } from '../../definitions'
import {
  createDailyGoSetup,
  createGoSession,
  createPracticeGoSetup,
  continueGoAfterLoss,
  deleteGoLetter,
  deriveKeyboardLetterStates,
  enterGoLetter,
  getAvailableGoPracticeLengths,
  restoreGoSession,
  revealGoPuzzle,
  serializeGoSession,
  setGoHardMode,
  submitGoGuess,
  useKeyboardInput,
  type GoSessionSetup,
  type GoSessionState,
  type KeyboardInput,
  type PuzzleSessionState,
  type TileState,
  formatGoShare,
} from '../../game'
import { clearDailyGoStoredSession, loadDailyGoStoredSession, saveDailyGoStoredSession } from '../../game/storage/dailyGoStorage'
import { calculatePayToContinueCost } from '../../progression'
import { Button, Keyboard, Panel, ShareButton } from '../../ui'
import { useSound } from '../../sound'
import { classNames } from '../../ui/classNames'
import { CustomizeMenu } from './CustomizeMenu'

interface GoGameProps {
  readonly coins: number
  readonly defaultDifficulty?: DifficultyTier
  readonly defaultGoPuzzleCount?: GoPuzzleCount
  readonly initialResume?: GoResumeSlot
  readonly keyboardDisabled?: boolean
  readonly onGameComplete?: (input: CompletedGameInput) => void
  readonly onResumeCapture?: (capture: ResumeCapture) => void
  readonly onSaveDifficultyDefault?: (tier: DifficultyTier) => void
  readonly onSaveGoPuzzleCountDefault?: (count: GoPuzzleCount) => void
  readonly onSpendCoins: (amount: number) => boolean
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

function createInitialDailySession(setup: ReturnType<typeof createDailyGoSetup>): GoSessionState {
  const stored = loadDailyGoStoredSession()
  if (
    stored &&
    stored.dateKey === setup.dateKey &&
    stored.session.puzzles.length === setup.puzzles.length &&
    stored.session.puzzles[0]?.answer === setup.puzzles[0]?.answer
  ) {
    return restoreGoSession(stored.session, setup.validGuesses)
  }

  clearDailyGoStoredSession()
  return createGoSession(setup)
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
    <div aria-label="Go guess grid" className="@container space-y-1.5 sm:space-y-2" role="grid">
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

function GoGameSession({
  coins,
  defaultDifficulty,
  defaultGoPuzzleCount,
  difficulty,
  goPuzzleCount,
  keyboardDisabled,
  onDifficultyChange,
  onGameComplete,
  onGoPuzzleCountChange,
  onPracticeLengthChange,
  onPracticeSeedChange,
  onResumeCapture,
  onSaveDifficultyDefault,
  onSaveGoPuzzleCountDefault,
  onSpendCoins,
  practiceLength,
  practiceLengths,
  restoreFrom,
  scope,
  setup,
}: {
  readonly coins: number
  readonly defaultDifficulty: DifficultyTier
  readonly defaultGoPuzzleCount: GoPuzzleCount
  readonly difficulty: DifficultyTier
  readonly goPuzzleCount: GoPuzzleCount
  readonly keyboardDisabled: boolean
  readonly onDifficultyChange: (tier: DifficultyTier) => void
  readonly onGameComplete?: (input: CompletedGameInput) => void
  readonly onGoPuzzleCountChange: (count: GoPuzzleCount) => void
  readonly onPracticeLengthChange: (length: number) => void
  readonly onPracticeSeedChange: () => void
  readonly onResumeCapture?: (capture: ResumeCapture) => void
  readonly onSaveDifficultyDefault?: (tier: DifficultyTier) => void
  readonly onSaveGoPuzzleCountDefault?: (count: GoPuzzleCount) => void
  readonly onSpendCoins: (amount: number) => boolean
  readonly practiceLength: number
  readonly practiceLengths: readonly number[]
  readonly restoreFrom?: ReturnType<typeof serializeGoSession>
  readonly scope: GoGameProps['scope']
  readonly setup: GoSessionSetup
}) {
  const [session, setSession] = useState(() => {
    if (restoreFrom) {
      return restoreGoSession(restoreFrom, setup.validGuesses)
    }
    return scope === 'daily' ? createInitialDailySession(setup) : createGoSession(setup)
  })
  const [continuationMessage, setContinuationMessage] = useState<string>()
  const [showDefinitions, setShowDefinitions] = useState(true)
  const currentPuzzle = session.puzzles[session.currentPuzzleIndex]
  const completionPercentage = getCompletionPercentage(currentPuzzle)
  const continuationCost = calculatePayToContinueCost({
    completionPercentage,
    continuationCount: currentPuzzle.continuationCount,
    wordLength: currentPuzzle.wordLength,
  })
  const canAffordContinuation = session.status === 'lost' && !session.revealedAnswer && coins >= continuationCost
  const canPayToContinue = session.status === 'lost' && !session.revealedAnswer
  const revealCost = calculatePayToContinueCost({
    completionPercentage,
    continuationCount: currentPuzzle.continuationCount,
    wordLength: currentPuzzle.wordLength,
  })
  const canReveal = scope === 'practice' && session.status === 'playing' && currentPuzzle.guesses.length > 0
  const solvedPuzzles = session.puzzles.filter((puzzle) => puzzle.status === 'won')

  useEffect(() => {
    if (scope !== 'daily' || !setup.dateKey) {
      return
    }

    saveDailyGoStoredSession({
      dateKey: setup.dateKey,
      session: serializeGoSession(session),
    })
  }, [scope, session, setup.dateKey])

  useEffect(() => {
    onResumeCapture?.({
      difficulty,
      goPuzzleCount,
      mode: 'go',
      scope,
      serializedSession: serializeGoSession(session),
      wordLength: session.wordLength,
    })
  }, [difficulty, goPuzzleCount, onResumeCapture, scope, session])

  useEffect(() => {
    if (session.status === 'playing') {
      return
    }

    if (session.status === 'lost' && canAffordContinuation) {
      return
    }

    const attemptsUsed = session.puzzles.reduce((total, puzzle) => total + puzzle.guesses.length, 0)
    const maxAttempts = session.puzzles.reduce((total, puzzle) => total + puzzle.maxAttempts, 0)
    const puzzleCount = session.status === 'won' ? session.puzzles.length : session.currentPuzzleIndex + 1
    onGameComplete?.({
      attemptsUsed,
      difficulty,
      gameId: scope === 'daily' ? `go:daily:${setup.dateKey}` : `go:practice:${practiceLength}:${setup.puzzles.map((puzzle) => puzzle.answer).join('-')}`,
      maxAttempts,
      mode: 'go',
      puzzleCount,
      scope,
      status: session.status,
      word: session.status === 'won' ? session.puzzles.map((puzzle) => puzzle.answer).join(',') : session.puzzles[session.currentPuzzleIndex].answer,
      wordLength: session.wordLength,
    })
  }, [canAffordContinuation, difficulty, onGameComplete, practiceLength, scope, session.currentPuzzleIndex, session.puzzles, session.status, session.wordLength, setup.dateKey, setup.puzzles])

  const sound = useSound()
  const handleInput = useCallback((input: KeyboardInput) => {
    setContinuationMessage(undefined)
    sound.play('keyboard-click')
    setSession((currentSession) => {
      if (input.type === 'letter') {
        return enterGoLetter(currentSession, input.value)
      }

      if (input.type === 'delete') {
        return deleteGoLetter(currentSession)
      }

      const nextSession = submitGoGuess(currentSession)
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

  useKeyboardInput({ disabled: keyboardDisabled, onInput: handleInput })

  const handlePayToContinue = useCallback(() => {
    if (session.status !== 'lost') {
      return
    }

    if (!onSpendCoins(continuationCost)) {
      setContinuationMessage(`You need ${continuationCost} coins to continue this puzzle.`)
      return
    }

    setSession((currentSession) => continueGoAfterLoss(currentSession))
    setContinuationMessage(`Spent ${continuationCost} coins for one more attempt.`)
  }, [continuationCost, onSpendCoins, session.status])

  const handleReveal = useCallback(() => {
    if (!canReveal) {
      return
    }

    if (!onSpendCoins(revealCost)) {
      setContinuationMessage(`You need ${revealCost} coins to reveal this answer.`)
      return
    }

    const revealedAnswer = currentPuzzle.answer.toLocaleUpperCase('en-US')
    setSession((currentSession) => revealGoPuzzle(currentSession))
    setContinuationMessage(`Revealed the answer: ${revealedAnswer}. This puzzle counts as a loss.`)
  }, [canReveal, currentPuzzle.answer, onSpendCoins, revealCost])

  const letterStates = deriveKeyboardLetterStates(currentPuzzle.guesses)
  const statusMessage = session.status === 'won'
    ? `Solved all ${session.puzzles.length} go puzzles. Daily completion is preserved on refresh.`
    : session.status === 'lost'
      ? `The chain ended on puzzle ${session.currentPuzzleIndex + 1}. The answer was ${currentPuzzle.answer.toLocaleUpperCase('en-US')}.`
      : `Puzzle ${session.currentPuzzleIndex + 1} of ${session.puzzles.length}; ${currentPuzzle.maxAttempts - currentPuzzle.guesses.length} attempts remaining.`

  return (
    <section className="space-y-5" aria-labelledby="go-game-title">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">go {scope}</p>
        <h2 id="go-game-title" className="text-3xl font-bold text-white">
          {scope === 'daily' ? 'Daily go chain' : 'Practice go chain'}
        </h2>
        <p className="max-w-3xl text-base leading-7 text-slate-300">
          {session.puzzles.length} linked brrrdles are active with prior answers carried forward as pre-filled rows on later puzzles.
        </p>
      </div>

      <Panel className="space-y-4" tone="muted">
        <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-4">
          <div>
            <p className="font-semibold text-cyan-100">Word length</p>
            <p>{session.wordLength} letters</p>
          </div>
          <div>
            <p className="font-semibold text-cyan-100">Current puzzle</p>
            <p>{session.currentPuzzleIndex + 1} of {session.puzzles.length}</p>
          </div>
          <div>
            <p className="font-semibold text-cyan-100">Chain status</p>
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
            <Button onClick={onPracticeSeedChange} variant="secondary">New go chain</Button>
            <p className="text-sm leading-6 text-slate-300">The selected length applies to all five practice puzzles.</p>
          </div>
        ) : null}

        {onSaveDifficultyDefault ? (
          <CustomizeMenu
            defaultDifficulty={defaultDifficulty}
            defaultGoPuzzleCount={defaultGoPuzzleCount}
            difficulty={difficulty}
            goPuzzleCount={goPuzzleCount}
            locked={session.puzzles.some((puzzle) => puzzle.guesses.length > 0)}
            onDifficultyChange={onDifficultyChange}
            onGoPuzzleCountChange={onGoPuzzleCountChange}
            onSaveDefault={() => onSaveDifficultyDefault(difficulty)}
            onSaveGoPuzzleCountDefault={onSaveGoPuzzleCountDefault ? () => onSaveGoPuzzleCountDefault(goPuzzleCount) : undefined}
          />
        ) : null}

        <label className="flex items-center gap-3 text-sm font-semibold text-cyan-100">
          <input
            checked={session.hardMode}
            className="h-4 w-4 accent-cyan-300"
            onChange={(event) => setSession((currentSession) => setGoHardMode(currentSession, event.target.checked))}
            type="checkbox"
          />
          Hard mode
        </label>

        <div className="grid gap-2 sm:grid-cols-5" aria-label="Go puzzle progress">
          {session.puzzles.map((puzzle, index) => (
            <div
              className={classNames(
                'rounded-2xl border p-3 text-sm',
                index === session.currentPuzzleIndex ? 'border-cyan-200/70 bg-cyan-300/10 text-cyan-50' : 'border-slate-700 bg-slate-950/50 text-slate-300',
              )}
              key={`${puzzle.answer}-${index}`}
            >
              <p className="font-bold">Puzzle {index + 1}</p>
              <p className="capitalize">{puzzle.status}</p>
              {index < session.currentPuzzleIndex ? <p>{puzzle.answer.toLocaleUpperCase('en-US')}</p> : null}
            </div>
          ))}
        </div>

        <GuessGrid session={currentPuzzle} />

        <div aria-live="polite" className="rounded-2xl border border-slate-700 bg-slate-950/70 p-3 text-sm leading-6 text-slate-200" role="status">
          <p>{statusMessage}</p>
          {currentPuzzle.lastValidation ? <p className="mt-1 font-semibold text-amber-100">{currentPuzzle.lastValidation.message}</p> : null}
        </div>

        {canPayToContinue ? (
          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
            <p className="font-bold">Pay to Continue</p>
            <p>Spend {continuationCost} coins for one more attempt on puzzle {session.currentPuzzleIndex + 1}. Current balance: {coins} coins.</p>
            <Button disabled={!canAffordContinuation} onClick={handlePayToContinue} variant="secondary">
              {canAffordContinuation ? `Pay ${continuationCost} coins to continue` : `Need ${continuationCost} coins to continue`}
            </Button>
            {continuationMessage ? <p className="mt-2 font-semibold">{continuationMessage}</p> : null}
          </div>
        ) : continuationMessage ? (
          <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-3 text-sm font-semibold text-cyan-50">{continuationMessage}</div>
        ) : null}

        {canReveal ? (
          <div className="rounded-2xl border border-rose-300/30 bg-rose-300/10 p-4 text-sm leading-6 text-rose-50">
            <p className="font-bold">Give Up / Reveal Answer</p>
            <p>Reveal puzzle {session.currentPuzzleIndex + 1} for {revealCost} coins. This counts as a loss for this puzzle. Current balance: {coins} coins.</p>
            <Button onClick={handleReveal} variant="secondary">
              Reveal answer ({revealCost} coins)
            </Button>
          </div>
        ) : null}

        <Keyboard disabled={session.status !== 'playing'} letterStates={letterStates} onInput={handleInput} />


        {session.status !== 'playing' ? (
          <ShareButton
            label="Share go result"
            text={formatGoShare({
              currentPuzzleIndex: session.currentPuzzleIndex,
              dateKey: setup.dateKey,
              mode: 'go',
              puzzles: session.puzzles,
              scope,
              status: session.status,
            })}
          />
        ) : null}

        {solvedPuzzles.length > 0 ? (
          <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-cyan-100">Solved puzzle definitions</p>
              <Button onClick={() => setShowDefinitions((value) => !value)} variant="ghost">
                {showDefinitions ? 'Hide Definitions' : 'Show All'}
              </Button>
            </div>
            {showDefinitions ? (
              <div className="mt-3 flex flex-col gap-3">
                {solvedPuzzles.map((puzzle, index) => (
                  <DefinitionPanel
                    enabled
                    key={`${puzzle.answer}-${index}`}
                    mode="go"
                    scope={scope}
                    word={puzzle.answer}
                    wordLength={puzzle.wordLength}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <DefinitionPanel
          enabled={session.status !== 'playing'}
          mode="go"
          scope={scope}
          word={currentPuzzle.answer}
          wordLength={currentPuzzle.wordLength}
        />
      </Panel>
    </section>
  )
}

export function GoGame({ coins, defaultDifficulty = DEFAULT_DIFFICULTY_TIER, defaultGoPuzzleCount = DEFAULT_GO_PUZZLE_COUNT, initialResume, keyboardDisabled = false, onGameComplete, onResumeCapture, onSaveDifficultyDefault, onSaveGoPuzzleCountDefault, onSpendCoins, scope }: GoGameProps) {
  const resumePractice = initialResume?.scope === 'practice' ? initialResume : undefined
  const practiceLengths = useMemo(() => getAvailableGoPracticeLengths(), [])
  const [practiceLength, setPracticeLength] = useState(() => resumePractice?.wordLength ?? 5)
  const [practiceSeed, setPracticeSeed] = useState(0)
  const [difficulty, setDifficulty] = useState<DifficultyTier>(resumePractice?.difficulty ?? defaultDifficulty)
  const [goPuzzleCount, setGoPuzzleCount] = useState<GoPuzzleCount>(resumePractice?.goPuzzleCount ?? defaultGoPuzzleCount)
  const [resumeConsumed, setResumeConsumed] = useState(false)
  const activeResume = resumePractice && !resumeConsumed ? resumePractice : undefined
  const setup = useMemo(
    () => scope === 'daily' ? createDailyGoSetup(new Date(), difficulty, goPuzzleCount) : createPracticeGoSetup(practiceLength, practiceSeed, difficulty, goPuzzleCount),
    [difficulty, goPuzzleCount, practiceLength, practiceSeed, scope],
  )
  const sessionKey = scope === 'daily'
    ? `${scope}-${difficulty}-${goPuzzleCount}-${setup.dateKey}`
    : `${scope}-${difficulty}-${goPuzzleCount}-${practiceLength}-${practiceSeed}${activeResume ? `-resume-${activeResume.updatedAt}` : ''}`

  return (
    <GoGameSession
      key={sessionKey}
      coins={coins}
      defaultDifficulty={defaultDifficulty}
      defaultGoPuzzleCount={defaultGoPuzzleCount}
      difficulty={difficulty}
      goPuzzleCount={goPuzzleCount}
      keyboardDisabled={keyboardDisabled}
      onDifficultyChange={(tier) => { setResumeConsumed(true); setDifficulty(tier) }}
      onGameComplete={onGameComplete}
      onGoPuzzleCountChange={(count) => { setResumeConsumed(true); setGoPuzzleCount(count) }}
      onPracticeLengthChange={(length) => { setResumeConsumed(true); setPracticeLength(length) }}
      onPracticeSeedChange={() => { setResumeConsumed(true); setPracticeSeed((seed) => seed + 1) }}
      onResumeCapture={onResumeCapture}
      onSaveDifficultyDefault={onSaveDifficultyDefault}
      onSaveGoPuzzleCountDefault={onSaveGoPuzzleCountDefault}
      onSpendCoins={onSpendCoins}
      practiceLength={practiceLength}
      practiceLengths={practiceLengths}
      restoreFrom={activeResume?.serializedSession}
      scope={scope}
      setup={setup}
    />
  )
}
