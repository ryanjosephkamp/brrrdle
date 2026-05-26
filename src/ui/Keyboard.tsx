import type { KeyboardInput, KeyboardLetterStates } from '../game/useKeyboardInput'
import { classNames } from './classNames'

interface KeyboardProps {
  readonly disabled?: boolean
  readonly letterStates?: KeyboardLetterStates
  readonly onInput: (input: KeyboardInput) => void
}

const keyboardRows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'] as const

const stateClasses = {
  unknown: 'border-slate-600 bg-slate-800 text-slate-100 hover:border-[var(--color-ice-300)] hover:bg-slate-700',
  absent: 'border-slate-700 bg-slate-950 text-slate-400',
  present: 'border-amber-300/60 bg-amber-300/20 text-amber-50',
  correct: 'border-emerald-300/60 bg-emerald-300/25 text-emerald-50',
} as const

function KeyboardButton({
  children,
  className,
  disabled,
  onClick,
  state = 'unknown',
  title,
}: {
  readonly children: string
  readonly className?: string
  readonly disabled?: boolean
  readonly onClick: () => void
  readonly state?: keyof typeof stateClasses
  readonly title: string
}) {
  return (
    <button
      aria-label={title}
      className={classNames(
        'min-h-11 rounded-xl border px-2 text-sm font-bold uppercase shadow-lg shadow-slate-950/20 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-12 sm:px-3',
        stateClasses[state],
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

export function Keyboard({ disabled = false, letterStates = {}, onInput }: KeyboardProps) {
  return (
    <section aria-label="Keyboard" className="space-y-2">
      {keyboardRows.map((row, rowIndex) => (
        <div className="flex justify-center gap-1.5 sm:gap-2" key={row}>
          {rowIndex === 2 ? (
            <KeyboardButton className="px-3 text-xs sm:px-4" disabled={disabled} onClick={() => onInput({ type: 'submit' })} title="Submit guess">
              Enter
            </KeyboardButton>
          ) : null}
          {[...row].map((letter) => (
            <KeyboardButton
              disabled={disabled}
              key={letter}
              onClick={() => onInput({ type: 'letter', value: letter })}
              state={letterStates[letter] ?? 'unknown'}
              title={`Enter ${letter.toLocaleUpperCase('en-US')}`}
            >
              {letter}
            </KeyboardButton>
          ))}
          {rowIndex === 2 ? (
            <KeyboardButton className="px-3 text-xs sm:px-4" disabled={disabled} onClick={() => onInput({ type: 'delete' })} title="Delete letter">
              Del
            </KeyboardButton>
          ) : null}
        </div>
      ))}
    </section>
  )
}
