import { useCallback, useMemo, useState } from 'react'
import { DEFAULT_GO_PUZZLE_COUNT } from '../game/constants'
import {
  createPracticeGoSetup,
  createPracticeOgSetup,
  deleteGoLetter,
  deleteLetter,
  deriveKeyboardLetterStates,
  enterGoLetter,
  enterLetter,
  restoreGoSession,
  restoreOgSession,
  submitGoGuess,
  submitGuess,
  useKeyboardInput,
  type GoSessionState,
  type KeyboardInput,
  type PuzzleSessionState,
  type TileState,
} from '../game'
import { dateKeyToLocalDate, getUtcDailyDateKey } from '../daily'
import { Keyboard } from '../ui'
import { classNames } from '../ui/classNames'
import type { AsyncMultiplayerGame } from './asyncMultiplayer'
import { createDailyMultiplayerGoSetup, createDailyMultiplayerOgSetup } from './dailyMultiplayer'
import type { LiveMultiplayerMatch, LiveMultiplayerPlayerProgress } from './liveMultiplayer'

type MultiplayerGameModel =
  | { readonly kind: 'async'; readonly game: AsyncMultiplayerGame }
  | { readonly kind: 'live'; readonly match: LiveMultiplayerMatch; readonly progress: LiveMultiplayerPlayerProgress }

interface MultiplayerGameSurfaceProps {
  readonly disabled?: boolean
  readonly model: MultiplayerGameModel
  readonly onSubmitGuess: (guess: string) => void
  readonly statusLabel: string
}

type GridTileState = TileState | 'empty' | 'current'

const tileStateClasses: Record<GridTileState, string> = {
  absent: 'border-slate-700 bg-slate-950 text-slate-400',
  correct: 'border-emerald-300/70 bg-emerald-300/25 text-emerald-50',
  current: 'border-cyan-200/70 bg-cyan-300/10 text-cyan-50',
  empty: 'border-slate-700 bg-slate-950/60 text-slate-500',
  present: 'border-amber-300/70 bg-amber-300/20 text-amber-50',
}

function getModelKey(model: MultiplayerGameModel): string {
  if (model.kind === 'async') {
    const session = model.game.serializedSession
    const currentGuess = session.mode === 'og'
      ? session.session.currentGuess
      : session.session.puzzles[session.session.currentPuzzleIndex]?.currentGuess ?? ''
    return `${model.game.id}:${model.game.updatedAt}:${model.game.currentTurn}:${model.game.status}:${currentGuess}`
  }
  const session = model.progress.serializedSession
  const currentGuess = session?.mode === 'og'
    ? session.session.currentGuess
    : session?.mode === 'go'
      ? session.session.puzzles[session.session.currentPuzzleIndex]?.currentGuess ?? ''
      : ''
  const moveKey = model.progress.moves.map((move) => `${move.id}:${move.createdAt}`).join('|')
  return `${model.match.id}:${model.progress.playerId}:${model.progress.status}:${model.progress.completedAt ?? ''}:${moveKey}:${currentGuess}`
}

function getValidGuesses(model: MultiplayerGameModel): ReadonlySet<string> {
  const mode = model.kind === 'async' ? model.game.mode : model.match.mode
  const scope = model.kind === 'async' ? model.game.scope : model.match.scope
  const dailyDateKey = model.kind === 'async' ? model.game.dailyDateKey : model.match.dailyDateKey
  const difficulty = model.kind === 'async' ? model.game.difficulty : model.match.difficulty
  const goPuzzleCount = model.kind === 'async' ? model.game.goPuzzleCount : model.match.goPuzzleCount
  const seed = model.kind === 'async' ? model.game.seed : model.match.seed
  const wordLength = model.kind === 'async' ? model.game.wordLength : model.match.wordLength ?? 5

  if (mode === 'og') {
    return scope === 'daily'
      ? createDailyMultiplayerOgSetup(dateKeyToLocalDate(dailyDateKey ?? getUtcDailyDateKey()), difficulty, model.kind).validGuesses
      : createPracticeOgSetup(wordLength, seed, difficulty).validGuesses
  }

  return scope === 'daily'
    ? createDailyMultiplayerGoSetup(dateKeyToLocalDate(dailyDateKey ?? getUtcDailyDateKey()), difficulty, goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT, model.kind).validGuesses
    : createPracticeGoSetup(wordLength, seed, difficulty, goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT).validGuesses
}

function getSerializedSession(model: MultiplayerGameModel) {
  return model.kind === 'async' ? model.game.serializedSession : model.progress.serializedSession
}

function restoreModelSession(model: MultiplayerGameModel): PuzzleSessionState | GoSessionState | undefined {
  const serialized = getSerializedSession(model)
  if (!serialized) {
    return undefined
  }
  const validGuesses = getValidGuesses(model)
  return serialized.mode === 'og'
    ? restoreOgSession(serialized.session, validGuesses)
    : restoreGoSession(serialized.session, validGuesses)
}

function getActivePuzzle(session: PuzzleSessionState | GoSessionState): PuzzleSessionState {
  return 'puzzles' in session ? session.puzzles[session.currentPuzzleIndex] : session
}

function getCurrentGuess(session: PuzzleSessionState | GoSessionState): string {
  return getActivePuzzle(session).currentGuess
}

function applyInput(session: PuzzleSessionState | GoSessionState, input: KeyboardInput): PuzzleSessionState | GoSessionState {
  if ('puzzles' in session) {
    if (input.type === 'letter') {
      return enterGoLetter(session, input.value)
    }
    if (input.type === 'delete') {
      return deleteGoLetter(session)
    }
    return submitGoGuess(session)
  }
  if (input.type === 'letter') {
    return enterLetter(session, input.value)
  }
  if (input.type === 'delete') {
    return deleteLetter(session)
  }
  return submitGuess(session)
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
    <div aria-label="Multiplayer guess grid" className="@container space-y-1.5 sm:space-y-2" role="grid">
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

export function MultiplayerGameSurface({ disabled = false, model, onSubmitGuess, statusLabel }: MultiplayerGameSurfaceProps) {
  const baseSession = useMemo(() => restoreModelSession(model), [model])
  const [sessionKey, setSessionKey] = useState(getModelKey(model))
  const [draftSession, setDraftSession] = useState<PuzzleSessionState | GoSessionState | undefined>(baseSession)
  const nextSessionKey = getModelKey(model)
  if (sessionKey !== nextSessionKey) {
    setSessionKey(nextSessionKey)
    setDraftSession(baseSession)
  }

  const activePuzzle = draftSession ? getActivePuzzle(draftSession) : undefined
  const isGo = draftSession ? 'puzzles' in draftSession : getSerializedSession(model)?.mode === 'go'
  const letterStates = activePuzzle ? deriveKeyboardLetterStates(activePuzzle.guesses) : {}
  const inputDisabled = disabled || !draftSession || getActivePuzzle(draftSession).status !== 'playing'

  const handleInput = useCallback((input: KeyboardInput) => {
    if (!draftSession || disabled) {
      return
    }
    if (input.type !== 'submit') {
      setDraftSession(applyInput(draftSession, input))
      return
    }

    const submitted = applyInput(draftSession, input)
    const submittedPuzzle = getActivePuzzle(submitted)
    if (submittedPuzzle.lastValidation) {
      setDraftSession(submitted)
      return
    }
    const guess = getCurrentGuess(draftSession)
    if (guess) {
      onSubmitGuess(guess)
    }
  }, [disabled, draftSession, onSubmitGuess])

  useKeyboardInput({ disabled: inputDisabled, onInput: handleInput })

  if (!draftSession || !activePuzzle) {
    return (
      <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3 text-sm text-slate-300">
        Waiting for the multiplayer session to initialize.
      </div>
    )
  }

  const statusMessage = isGo && 'puzzles' in draftSession
    ? `Puzzle ${draftSession.currentPuzzleIndex + 1} of ${draftSession.puzzles.length}; ${activePuzzle.maxAttempts - activePuzzle.guesses.length} attempts remaining.`
    : `${activePuzzle.maxAttempts - activePuzzle.guesses.length} attempts remaining.`

  return (
    <div className="space-y-4 rounded-lg border border-white/10 bg-slate-950/70 p-3">
      <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
        <div>
          <p className="font-semibold text-cyan-100">Board</p>
          <p>{activePuzzle.wordLength} letters</p>
        </div>
        <div>
          <p className="font-semibold text-cyan-100">Status</p>
          <p>{statusLabel}</p>
        </div>
        <div>
          <p className="font-semibold text-cyan-100">Attempts</p>
          <p>{statusMessage}</p>
        </div>
      </div>

      {'puzzles' in draftSession ? (
        <div className="grid gap-2 sm:grid-cols-5" aria-label="Multiplayer go puzzle progress">
          {draftSession.puzzles.map((puzzle, index) => (
            <div
              className={classNames(
                'rounded-2xl border p-3 text-sm',
                index === draftSession.currentPuzzleIndex ? 'border-cyan-200/70 bg-cyan-300/10 text-cyan-50' : 'border-slate-700 bg-slate-950/50 text-slate-300',
              )}
              key={`${puzzle.answer}-${index}`}
            >
              <p className="font-bold">Puzzle {index + 1}</p>
              <p className="capitalize">{puzzle.status}</p>
              {index < draftSession.currentPuzzleIndex ? <p>{puzzle.answer.toLocaleUpperCase('en-US')}</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      <GuessGrid session={activePuzzle} />

      <div aria-live="polite" className="rounded-2xl border border-slate-700 bg-black/30 p-3 text-sm leading-6 text-slate-200" role="status">
        <p>{inputDisabled ? statusLabel : 'Use the on-screen keyboard to enter your guess.'}</p>
        {activePuzzle.lastValidation ? <p className="mt-1 font-semibold text-amber-100">{activePuzzle.lastValidation.message}</p> : null}
      </div>

      <Keyboard disabled={inputDisabled} letterStates={letterStates} onInput={handleInput} />
    </div>
  )
}
