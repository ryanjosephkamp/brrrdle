import { useId } from 'react'
import { Button, Panel, Tooltip } from '../../ui'
import { DIFFICULTY_TIERS, getDifficultyTierMeta, isDifficultyTier, type DifficultyTier } from '../../data'

interface CustomizeMenuProps {
  /** Difficulty currently applied to this game's puzzle. */
  readonly difficulty: DifficultyTier
  /** The player's saved global default, used to enable "Save as default". */
  readonly defaultDifficulty: DifficultyTier
  /**
   * When true the difficulty control is locked because the current puzzle has
   * already started (a guess was submitted). Changing difficulty starts a new
   * puzzle, so it is only allowed before the first guess.
   */
  readonly locked: boolean
  readonly onDifficultyChange: (tier: DifficultyTier) => void
  readonly onSaveDefault: () => void
}

/**
 * Phase 18.4 — per-game "Customize" quick menu. Lets the player pick a
 * difficulty tier for the current puzzle (initialized from their global
 * default) and optionally save that choice as the new default. The tier is
 * locked once the puzzle has started so difficulty cannot be changed mid-game.
 * Difficulty only affects which answers are selectable, never which guesses are
 * valid.
 */
export function CustomizeMenu({ difficulty, defaultDifficulty, locked, onDifficultyChange, onSaveDefault }: CustomizeMenuProps) {
  const selectId = useId()
  const canSaveDefault = difficulty !== defaultDifficulty

  return (
    <Panel className="space-y-3 text-sm text-slate-300" tone="muted">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-bold text-white">Customize</h3>
        <Tooltip label="More information about Customize">
          Pick a difficulty for this puzzle. Difficulty only changes which answers can appear — every valid guess stays allowed at every difficulty. You can change it until your first guess; after that, start a new puzzle to switch.
        </Tooltip>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid gap-1 text-sm font-semibold text-cyan-100" htmlFor={selectId}>
          Difficulty
          <select
            className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={locked}
            id={selectId}
            onChange={(event) => { if (isDifficultyTier(event.target.value)) onDifficultyChange(event.target.value) }}
            value={difficulty}
          >
            {DIFFICULTY_TIERS.map((tier) => (
              <option key={tier} value={tier}>{getDifficultyTierMeta(tier).label}</option>
            ))}
          </select>
        </label>
        <Button disabled={!canSaveDefault} onClick={onSaveDefault} variant="secondary">Save as default</Button>
      </div>
      <p className="text-xs text-slate-400">{getDifficultyTierMeta(difficulty).description}</p>
      {locked ? (
        <p className="text-xs text-amber-100">Difficulty is locked because this puzzle has started. Start a new puzzle to change it.</p>
      ) : null}
    </Panel>
  )
}
