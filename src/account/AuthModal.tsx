import { useEffect, useId, useState } from 'react'
import { Button, Dialog } from '../ui'

type AuthMethod = 'magic-link' | 'password'
type PasswordMode = 'sign-in' | 'sign-up'
type Phase = 'auth' | 'forgot-password'

interface AuthModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly authMessage?: string
  readonly busy?: boolean
  readonly onSendMagicLink: (email: string) => void
  readonly onSignInWithPassword: (email: string, password: string) => void
  readonly onSignUpWithPassword: (email: string, password: string) => void
  readonly onRequestPasswordReset: (email: string) => void
  /** Optional, supplied by App so we know when authentication has succeeded. */
  readonly authenticated?: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u

/**
 * Phase 15.2 — Single, clean Auth Modal.
 *
 * Replaces the duplicate-buttons pattern of the inline AuthPanel with:
 *   - one Magic Link / Email + Password tab pair
 *   - a single primary CTA whose label and action follow the active sub-mode
 *   - a Forgot Password inline flow with three states: form, busy, success
 *
 * Errors are shown via the parent-provided `authMessage` which is computed in
 * App with `classifyAuthError`, so this component never surfaces raw provider
 * strings.
 */
export function AuthModal({
  isOpen,
  onClose,
  authMessage,
  busy,
  onSendMagicLink,
  onSignInWithPassword,
  onSignUpWithPassword,
  onRequestPasswordReset,
  authenticated,
}: AuthModalProps) {
  const [method, setMethod] = useState<AuthMethod>('magic-link')
  const [passwordMode, setPasswordMode] = useState<PasswordMode>('sign-in')
  const [phase, setPhase] = useState<Phase>('auth')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validationError, setValidationError] = useState<string | undefined>(undefined)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const statusId = useId()

  const [lastIsOpen, setLastIsOpen] = useState(isOpen)
  if (lastIsOpen !== isOpen) {
    setLastIsOpen(isOpen)
    if (!isOpen) {
      setPassword('')
      setShowPassword(false)
      setValidationError(undefined)
      setMagicLinkSent(false)
      setResetSent(false)
      setPhase('auth')
    }
  }

  // Auto-close on successful authentication so the badge update is visible.
  useEffect(() => {
    if (isOpen && authenticated) {
      onClose()
    }
  }, [isOpen, authenticated, onClose])

  const trimmedEmail = email.trim()
  const isEmailValid = EMAIL_RE.test(trimmedEmail)

  function clearStatus() {
    setValidationError(undefined)
    setMagicLinkSent(false)
    setResetSent(false)
  }

  function handlePrimary() {
    clearStatus()
    if (!isEmailValid) {
      setValidationError('Please enter a valid email address.')
      return
    }
    if (method === 'magic-link') {
      onSendMagicLink(trimmedEmail)
      setMagicLinkSent(true)
      return
    }
    if (passwordMode === 'sign-up' && password.length < 8) {
      setValidationError('Password must be at least 8 characters.')
      return
    }
    if (!password) {
      setValidationError('Please enter your password.')
      return
    }
    if (passwordMode === 'sign-in') {
      onSignInWithPassword(trimmedEmail, password)
    } else {
      onSignUpWithPassword(trimmedEmail, password)
    }
  }

  function handleSendReset() {
    clearStatus()
    if (!isEmailValid) {
      setValidationError('Enter the email on your account first.')
      return
    }
    onRequestPasswordReset(trimmedEmail)
    setResetSent(true)
  }

  const primaryLabel = method === 'magic-link'
    ? 'Send magic link'
    : passwordMode === 'sign-in'
      ? 'Sign in'
      : 'Create account'

  const statusMessage = validationError
    ?? authMessage
    ?? (magicLinkSent ? 'Magic link sent. Check your email.' : undefined)
    ?? (resetSent ? 'Check your email for a reset link.' : undefined)

  return (
    <Dialog
      description="Sign in to sync progress, level up, and unlock the Admin tools for authorized users."
      isOpen={isOpen}
      onClose={onClose}
      title={phase === 'forgot-password' ? 'Reset your password' : 'Sign in to brrrdle'}
    >
      {phase === 'forgot-password' ? (
        <div className="space-y-3">
          <label className="grid gap-1 font-semibold text-cyan-100">
            Email address
            <input
              autoComplete="email"
              className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              onChange={(event) => { setEmail(event.target.value); clearStatus() }}
              type="email"
              value={email}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSendReset} variant="primary" disabled={busy}>Send reset link</Button>
            <Button onClick={() => { setPhase('auth'); clearStatus() }} variant="ghost">Back</Button>
          </div>
          {statusMessage ? (
            <p aria-live="polite" className="text-sm text-rose-200" id={statusId}>{statusMessage}</p>
          ) : null}
        </div>
      ) : (
        <div className="space-y-3">
          <div role="tablist" aria-label="Sign-in method" className="flex flex-wrap gap-2">
            <Button
              aria-selected={method === 'magic-link'}
              isActive={method === 'magic-link'}
              onClick={() => { setMethod('magic-link'); clearStatus() }}
              role="tab"
              size="sm"
              variant="secondary"
            >
              Magic link
            </Button>
            <Button
              aria-selected={method === 'password'}
              isActive={method === 'password'}
              onClick={() => { setMethod('password'); clearStatus() }}
              role="tab"
              size="sm"
              variant="secondary"
            >
              Email + password
            </Button>
          </div>

          <label className="grid gap-1 font-semibold text-cyan-100">
            Email address
            <input
              autoComplete="email"
              className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              onChange={(event) => { setEmail(event.target.value); clearStatus() }}
              type="email"
              value={email}
            />
          </label>

          {method === 'password' ? (
            <>
              <div role="radiogroup" aria-label="Password sub-mode" className="flex flex-wrap gap-2">
                <Button
                  aria-checked={passwordMode === 'sign-in'}
                  isActive={passwordMode === 'sign-in'}
                  onClick={() => { setPasswordMode('sign-in'); clearStatus() }}
                  role="radio"
                  size="sm"
                  variant="secondary"
                >
                  Sign in
                </Button>
                <Button
                  aria-checked={passwordMode === 'sign-up'}
                  isActive={passwordMode === 'sign-up'}
                  onClick={() => { setPasswordMode('sign-up'); clearStatus() }}
                  role="radio"
                  size="sm"
                  variant="secondary"
                >
                  Create account
                </Button>
              </div>

              <label className="grid gap-1 font-semibold text-cyan-100">
                Password
                <div className="flex gap-2">
                  <input
                    aria-label="Password"
                    autoComplete={passwordMode === 'sign-up' ? 'new-password' : 'current-password'}
                    className="flex-1 rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
                    onChange={(event) => { setPassword(event.target.value); clearStatus() }}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                  />
                  <Button
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((current) => !current)}
                    size="sm"
                    variant="secondary"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </label>

              <p className="text-xs text-slate-400">
                Passwords must be at least 8 characters. Email + password auth must be enabled in the Supabase project.
              </p>
            </>
          ) : (
            <p className="text-xs text-slate-400">We will email you a one-time sign-in link.</p>
          )}

          {/* Single primary CTA. Its label and action follow the active sub-mode. */}
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handlePrimary} variant="primary" disabled={busy}>
              {primaryLabel}
            </Button>
            {method === 'password' && passwordMode === 'sign-in' ? (
              <Button onClick={() => { setPhase('forgot-password'); clearStatus() }} variant="ghost" size="sm">
                Forgot password?
              </Button>
            ) : null}
          </div>

          {statusMessage ? (
            <p aria-live="polite" className="text-sm text-rose-200" id={statusId}>{statusMessage}</p>
          ) : null}
        </div>
      )}
    </Dialog>
  )
}
