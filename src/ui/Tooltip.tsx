import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'
import { classNames } from './classNames'

interface TooltipProps {
  /** Accessible label for the trigger, e.g. "More information about Difficulty". */
  readonly label: string
  /** Tooltip body content shown on hover/focus. */
  readonly children: ReactNode
  readonly className?: string
}

/**
 * Accessible information tooltip. The trigger is a real `<button>` so it is
 * reachable by keyboard and announced by screen readers; the popup is linked
 * via `aria-describedby` and is revealed on hover and on focus, and dismissed
 * on blur, mouse-leave, or Escape. No hover-only behaviour, so it works for
 * keyboard and touch users alike.
 */
export function Tooltip({ label, children, className }: TooltipProps) {
  const tooltipId = useId()
  const [open, setOpen] = useState(false)

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Escape' && open) {
      event.stopPropagation()
      setOpen(false)
    }
  }

  return (
    <span className={classNames('relative inline-flex', className)}>
      <button
        aria-describedby={open ? tooltipId : undefined}
        aria-label={label}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 text-[0.65rem] font-bold text-slate-200 transition hover:border-[var(--color-ice-300)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
        onBlur={() => { setOpen(false) }}
        onFocus={() => { setOpen(true) }}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => { setOpen(true) }}
        onMouseLeave={() => { setOpen(false) }}
        type="button"
      >
        <span aria-hidden="true">?</span>
      </button>
      <span
        className={classNames(
          'pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-60 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-left text-xs font-normal leading-relaxed text-slate-200 shadow-xl shadow-slate-950/50 transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        )}
        id={tooltipId}
        role="tooltip"
      >
        {children}
      </span>
    </span>
  )
}
