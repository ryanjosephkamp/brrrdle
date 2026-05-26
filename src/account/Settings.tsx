import { exportGuestProgress } from './guestStorage'
import type { GuestProgressState } from './storageSchema'
import { AuthPanel } from './AuthPanel'
import { DELETE_ACCOUNT_CONFIRMATION, RESET_PROGRESS_CONFIRMATION } from './dangerZone'
import type { AuthState } from './auth'
import type { SyncStatusState } from './syncStatus'
import { Button, Panel } from '../ui'

interface SettingsProps {
  readonly authState: AuthState
  readonly guestProgress: GuestProgressState
  readonly onResetProgress: () => void
  readonly onSendMagicLink?: (email: string) => void
  readonly onSignOut?: () => void
  readonly syncStatus: SyncStatusState
}

export function Settings({ authState, guestProgress, onResetProgress, onSendMagicLink, onSignOut, syncStatus }: SettingsProps) {
  return (
    <section className="space-y-4" aria-labelledby="settings-title">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">account and persistence</p>
      <h2 id="settings-title" className="text-3xl font-bold text-white">Settings</h2>
      <AuthPanel authEmail={authState.user?.email} authStatus={authState.status} onSendMagicLink={onSendMagicLink} onSignOut={onSignOut} />
      <Panel className="space-y-3 text-sm leading-6 text-slate-300" tone="muted">
        <h3 className="text-xl font-bold text-white">Cloud sync</h3>
        <p>{syncStatus.message}</p>
        <p>After sign-in, guest progress can be transferred and synced to Supabase with conflict-safe merge behavior.</p>
      </Panel>
      <Panel className="space-y-3 text-sm leading-6 text-slate-300" tone="muted">
        <h3 className="text-xl font-bold text-white">Local guest progress</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div><p className="font-semibold text-cyan-100">Level</p><p>{guestProgress.progression.level}</p></div>
          <div><p className="font-semibold text-cyan-100">XP</p><p>{guestProgress.progression.xp}</p></div>
          <div><p className="font-semibold text-cyan-100">Coins</p><p>{guestProgress.progression.coins}</p></div>
        </div>
        <textarea
          className="h-40 w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-200"
          readOnly
          value={exportGuestProgress(guestProgress)}
        />
        <Button onClick={onResetProgress} variant="secondary">Reset local guest progress</Button>
      </Panel>
      <Panel className="space-y-2 text-sm leading-6 text-slate-300" tone="muted">
        <h3 className="text-xl font-bold text-white">Danger zone</h3>
        <p>Destructive actions must require typed confirmations: `{RESET_PROGRESS_CONFIRMATION}` for local resets and `{DELETE_ACCOUNT_CONFIRMATION}` for account deletion.</p>
        <p>Email changes and password resets use Supabase user-management flows when an account is configured.</p>
      </Panel>
    </section>
  )
}
