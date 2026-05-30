import { exportGuestProgress } from './guestStorage'
import type { GuestProgressState, GuestSettingsState } from './storageSchema'
import { AuthPanel } from './AuthPanel'
import { DELETE_ACCOUNT_CONFIRMATION, RESET_PROGRESS_CONFIRMATION } from './dangerZone'
import type { AuthState } from './auth'
import type { SyncStatusState } from './syncStatus'
import { Button, Panel, Tooltip } from '../ui'
import { DIFFICULTY_TIERS, getDifficultyTierMeta, isDifficultyTier } from '../data/difficulty'

interface SettingsProps {
  readonly authState: AuthState
  readonly authMessage?: string
  readonly guestProgress: GuestProgressState
  readonly onResetProgress: () => void
  readonly onSendMagicLink?: (email: string) => void
  readonly onSignInWithPassword?: (email: string, password: string) => void
  readonly onSignUpWithPassword?: (email: string, password: string) => void
  readonly onSignOut?: () => void
  readonly onOpenAuthModal?: () => void
  readonly onOpenProfilePanel?: () => void
  readonly soundEnabled?: boolean
  readonly onToggleSound?: (enabled: boolean) => void
  readonly onUpdateSettings?: (patch: Partial<GuestSettingsState>) => void
  readonly syncStatus: SyncStatusState
}

export function Settings({
  authState,
  authMessage,
  guestProgress,
  onResetProgress,
  onSendMagicLink,
  onSignInWithPassword,
  onSignUpWithPassword,
  onSignOut,
  onOpenAuthModal,
  onOpenProfilePanel,
  soundEnabled,
  onToggleSound,
  onUpdateSettings,
  syncStatus,
}: SettingsProps) {
  const { difficultyDefault, hardModeDefault } = guestProgress.settings
  return (
    <section className="space-y-4" aria-labelledby="settings-title">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">account and persistence</p>
      <h2 id="settings-title" className="text-3xl font-bold text-white">Settings</h2>
      {onUpdateSettings ? (
        <Panel className="space-y-4 text-sm leading-6 text-slate-300" tone="muted">
          <h3 className="text-xl font-bold text-white">Gameplay</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="font-semibold text-cyan-100" htmlFor="settings-difficulty">Default difficulty</label>
              <Tooltip label="More information about default difficulty">
                Difficulty only changes which answers can be chosen, never which guesses are allowed. Casual uses the most common answers, Standard adds more, and Expert allows every answer. The daily puzzle and any in-progress game keep their difficulty until you start a new one.
              </Tooltip>
            </div>
            <select
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-2 text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] sm:max-w-xs"
              id="settings-difficulty"
              onChange={(event) => { if (isDifficultyTier(event.target.value)) onUpdateSettings({ difficultyDefault: event.target.value }) }}
              value={difficultyDefault}
            >
              {DIFFICULTY_TIERS.map((tier) => (
                <option key={tier} value={tier}>{getDifficultyTierMeta(tier).label}</option>
              ))}
            </select>
            <p className="text-xs text-slate-400">{getDifficultyTierMeta(difficultyDefault).description}</p>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-3 text-slate-100">
              <input
                checked={hardModeDefault}
                onChange={(event) => onUpdateSettings({ hardModeDefault: event.target.checked })}
                type="checkbox"
              />
              <span className="flex items-center gap-2">
                Start games in Hard Mode by default
                <Tooltip label="More information about Hard Mode">
                  Hard Mode forces every guess to reuse all revealed hints (correct letters stay in place and present letters must be used). You can still toggle Hard Mode per game before your first guess.
                </Tooltip>
              </span>
            </label>
            <p className="text-xs text-slate-400">Applies to new games. You can still change it per game until your first guess.</p>
          </div>
        </Panel>
      ) : null}
      {authState.status === 'anonymous' && onOpenAuthModal ? (
        <Panel className="space-y-2 text-sm leading-6 text-slate-300" tone="muted">
          <h3 className="text-xl font-bold text-white">Sign in to brrrdle</h3>
          <p>Open a clean dialog with Magic Link, Email + Password, and Forgot Password.</p>
          <Button onClick={onOpenAuthModal} variant="primary">Sign in / Create account</Button>
        </Panel>
      ) : null}
      {authState.status === 'authenticated' && onOpenProfilePanel ? (
        <Panel className="space-y-2 text-sm leading-6 text-slate-300" tone="muted">
          <h3 className="text-xl font-bold text-white">Manage profile</h3>
          <p>Customize your display name, accent color, and avatar.</p>
          <Button onClick={onOpenProfilePanel} variant="primary">Manage profile</Button>
        </Panel>
      ) : null}
      <AuthPanel
        authEmail={authState.user?.email}
        authMessage={authMessage}
        authStatus={authState.status}
        onSendMagicLink={onSendMagicLink}
        onSignInWithPassword={onSignInWithPassword}
        onSignOut={onSignOut}
        onSignUpWithPassword={onSignUpWithPassword}
      />
      {onToggleSound ? (
        <Panel className="space-y-3 text-sm leading-6 text-slate-300" tone="muted">
          <h3 className="text-xl font-bold text-white">Sound Effects</h3>
          <label className="flex items-center gap-3 text-slate-100">
            <input
              checked={Boolean(soundEnabled)}
              onChange={(event) => onToggleSound(event.target.checked)}
              type="checkbox"
            />
            <span>Play tile flips, key clicks, win/loss tones, and invalid-guess feedback.</span>
          </label>
          <p className="text-xs text-slate-400">On by default. Toggle off to silence every sound immediately.</p>
        </Panel>
      ) : null}
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
