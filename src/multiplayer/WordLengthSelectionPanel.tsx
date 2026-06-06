import { useMemo, useState } from 'react'
import { MAX_PRACTICE_WORD_LENGTH, MIN_PRACTICE_WORD_LENGTH, SUPPORTED_PRACTICE_WORD_LENGTHS } from '../game/constants'
import { Button, Panel } from '../ui'
import { classNames } from '../ui/classNames'
import {
  LIVE_WORD_LENGTH_SELECTION_MS,
  type LiveMultiplayerMatch,
  type LiveMultiplayerPlayerId,
} from './liveMultiplayer'

interface WordLengthSelectionPanelProps {
  readonly match: LiveMultiplayerMatch
  readonly now?: Date
  readonly onChooseLength: (playerId: LiveMultiplayerPlayerId, wordLength: number) => void
  readonly onCompleteAnimation: () => void
  readonly onResolve: () => void
  readonly readOnly?: boolean
  readonly viewerPlayerId?: LiveMultiplayerPlayerId
}

function formatSeconds(ms: number): string {
  return `${Math.max(0, Math.ceil(ms / 1_000))}s`
}

export function WordLengthSelectionPanel({
  match,
  now = new Date(),
  onChooseLength,
  onCompleteAnimation,
  onResolve,
  readOnly = false,
  viewerPlayerId,
}: WordLengthSelectionPanelProps) {
  const selection = match.selection
  const [choices, setChoices] = useState<Record<LiveMultiplayerPlayerId, number>>({
    'player-one': selection?.choices.find((choice) => choice.playerId === 'player-one')?.wordLength ?? match.wordLength ?? 5,
    'player-two': selection?.choices.find((choice) => choice.playerId === 'player-two')?.wordLength ?? match.wordLength ?? 5,
  })
  const remainingMs = selection ? Date.parse(selection.endsAt) - now.getTime() : LIVE_WORD_LENGTH_SELECTION_MS
  const animationRemainingMs = selection?.animationEndsAt ? Date.parse(selection.animationEndsAt) - now.getTime() : 0
  const isAnimating = Boolean(selection?.animationEndsAt && animationRemainingMs > 0)
  const selectedLength = selection?.selectedWordLength
  const choicesByPlayer = useMemo(
    () => new Map(selection?.choices.map((choice) => [choice.playerId, choice.wordLength]) ?? []),
    [selection?.choices],
  )

  return (
    <Panel className="space-y-4" tone="accent">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Practice Live pre-game</p>
          <h4 className="mt-1 text-xl font-black text-white">Word length selection</h4>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">
            Both players have 1 minute to choose a length. If the choices differ, the committed result runs through a non-skippable highlight before play starts.
          </p>
        </div>
        <p className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-100" aria-live="polite">
          {selectedLength ? `Locked ${selectedLength}` : `Ends in ${formatSeconds(remainingMs)}`}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {match.players.map((player) => {
          const playerChoice = choicesByPlayer.get(player.id)
          const canChooseForPlayer = !readOnly && viewerPlayerId === player.id && !selection?.resolvedAt
          return (
            <div className="rounded-lg border border-white/10 bg-black/30 p-3" key={player.id}>
              <label className="grid gap-2 text-sm font-semibold text-cyan-100">
                {player.label}
                <select
                  className="min-h-10 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
                  disabled={!canChooseForPlayer}
                  onChange={(event) => setChoices((current) => ({ ...current, [player.id]: Number(event.target.value) }))}
                  value={choices[player.id]}
                >
                  {SUPPORTED_PRACTICE_WORD_LENGTHS.map((length) => (
                    <option key={length} value={length}>{length} letters</option>
                  ))}
                </select>
              </label>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button
                  disabled={!canChooseForPlayer}
                  onClick={() => onChooseLength(player.id, choices[player.id])}
                  size="sm"
                  variant="secondary"
                >
                  Choose
                </Button>
                <span className="text-xs text-slate-400">
                  {playerChoice ? `Current choice: ${playerChoice}` : `Pick ${MIN_PRACTICE_WORD_LENGTH}-${MAX_PRACTICE_WORD_LENGTH}`}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {selection?.selectionCandidates ? (
        <div className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-3" aria-live="polite">
          <p className="text-sm font-semibold text-cyan-50">Committed length result</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {selection.selectionCandidates.map((candidate) => (
              <span
                className={classNames(
                  'rounded-full border px-3 py-1 text-sm font-black',
                  candidate === selectedLength
                    ? 'border-cyan-200 bg-cyan-200 text-slate-950'
                    : 'border-white/10 bg-black/30 text-slate-200',
                  isAnimating && 'motion-safe:animate-pulse',
                )}
                key={candidate}
              >
                {candidate}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-cyan-100">
            {isAnimating ? `Highlight running: ${formatSeconds(animationRemainingMs)} remaining.` : 'Highlight complete; the match can enter countdown.'}
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap justify-end gap-2">
        <Button disabled={readOnly || Boolean(selection?.resolvedAt)} onClick={onResolve} variant="primary">
          Resolve selection
        </Button>
        {selection?.animationEndsAt ? (
          <Button disabled={readOnly || isAnimating} onClick={onCompleteAnimation} variant="primary">
            Enter countdown
          </Button>
        ) : null}
      </div>
    </Panel>
  )
}
