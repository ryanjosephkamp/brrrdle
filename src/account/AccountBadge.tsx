import { classNames } from '../ui/classNames'
import type { AuthState } from './auth'

interface AccountBadgeProps {
  readonly authState: AuthState
  readonly onOpenAuthModal: () => void
  readonly onOpenProfile: () => void
}

/**
 * Phase 15.3 — Global signed-in / guest indicator.
 *
 * Renders one of three states on every route:
 *   - authenticated → avatar + display name / email; click → ProfilePanel
 *   - anonymous     → "Guest" pill + "Sign in to sync"; click → AuthModal
 *   - unconfigured  → "Guest (sync unavailable)" disabled button with tooltip
 */
export function AccountBadge({ authState, onOpenAuthModal, onOpenProfile }: AccountBadgeProps) {
  if (authState.status === 'authenticated' && authState.user) {
    const profile = authState.user.profile
    const label = profile?.label ?? authState.user.email ?? 'Account'
    const initials = profile?.initials ?? 'A'
    const gradient = profile?.gradient ?? 'from-cyan-500 to-sky-700'
    const avatarUrl = profile?.avatarUrl
    return (
      <button
        type="button"
        onClick={onOpenProfile}
        aria-label={`Open profile for ${label}`}
        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/75 px-2 py-1 text-sm text-slate-100 transition hover:border-[var(--color-ice-300)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
      >
        <span
          aria-hidden="true"
          className={classNames(
            'inline-grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-inner',
            gradient,
          )}
        >
          {avatarUrl ? (
            <img alt="" src={avatarUrl} className="h-full w-full object-cover" />
          ) : (
            <span>{initials}</span>
          )}
        </span>
        <span className="hidden max-w-[10rem] truncate sm:inline">{label}</span>
        <span className="sr-only">Signed in as {label}</span>
      </button>
    )
  }

  if (authState.status === 'unconfigured') {
    return (
      <span
        title="Sign-in is unavailable in this environment because Supabase is not configured."
        aria-label="Guest — sync unavailable"
        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400"
      >
        <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-slate-500" />
        <span>Guest · sync unavailable</span>
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={onOpenAuthModal}
      aria-label="Sign in or create an account to sync progress"
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ice-300)]/40 bg-slate-950/75 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-100 transition hover:border-[var(--color-ice-300)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
    >
      <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-cyan-300" />
      <span>Guest</span>
      <span className="hidden text-[10px] font-normal normal-case tracking-normal text-slate-300 sm:inline">· Sign in to sync</span>
    </button>
  )
}
