import { normalizeDifficultyTier, type DifficultyTier } from '../data/difficulty'
import { normalizeGoPuzzleCount, type GoPuzzleCount } from '../game/constants'
import type { SerializedGoSession } from '../game/go/session'
import type { SerializedOgSession } from '../game/og/session'
import type { PlayScope } from '../game/types'

/**
 * Phase 19.3 — typed "resume most recent unfinished game" slot. Replaces the
 * forward-compatible `resumeSlot?: unknown` reserved in Phase 18.8. The slot is
 * additive: it is only ever populated while a game is genuinely in progress and
 * is cleared the moment that game finishes, so the default behaviour (no slot)
 * is preserved for everyone who is not mid-game.
 */
export interface OgResumeSlot {
  readonly difficulty: DifficultyTier
  readonly mode: 'og'
  readonly scope: PlayScope
  readonly serializedSession: SerializedOgSession
  readonly updatedAt: string
  readonly wordLength: number
}

export interface GoResumeSlot {
  readonly difficulty: DifficultyTier
  readonly goPuzzleCount: GoPuzzleCount
  readonly mode: 'go'
  readonly scope: PlayScope
  readonly serializedSession: SerializedGoSession
  readonly updatedAt: string
  readonly wordLength: number
}

export type ResumeSlot = OgResumeSlot | GoResumeSlot

/** A resume slot without its timestamp, as captured by a live game component. */
export type ResumeCapture = Omit<OgResumeSlot, 'updatedAt'> | Omit<GoResumeSlot, 'updatedAt'>

function isScope(value: unknown): value is PlayScope {
  return value === 'daily' || value === 'practice'
}

/**
 * True when an og session has been started but is neither solved nor out of
 * attempts — i.e. it is worth offering to resume.
 */
export function isOgSessionInProgress(session: SerializedOgSession): boolean {
  const solved = session.guesses.some((guess) => guess === session.answer)
  const lost = !solved && session.guesses.length >= session.maxAttempts
  const started = session.guesses.length > 0 || session.currentGuess.length > 0
  return started && !solved && !lost
}

/**
 * True when a go chain has been started but is neither fully solved nor lost on
 * the active puzzle.
 */
export function isGoSessionInProgress(session: SerializedGoSession): boolean {
  if (session.puzzles.length === 0) {
    return false
  }

  const current = session.puzzles[Math.min(session.currentPuzzleIndex, session.puzzles.length - 1)]
  const currentSolved = current.guesses.some((guess) => guess === current.answer)
  const currentLost = !currentSolved && current.guesses.length >= current.maxAttempts
  const chainWon = currentSolved && session.currentPuzzleIndex >= session.puzzles.length - 1
  const started = session.currentPuzzleIndex > 0 || session.puzzles.some((puzzle) => puzzle.guesses.length > 0 || puzzle.currentGuess.length > 0)
  return started && !chainWon && !currentLost
}

/** True when the captured session is in progress for its mode. */
export function isCaptureInProgress(capture: ResumeCapture): boolean {
  return capture.mode === 'og' ? isOgSessionInProgress(capture.serializedSession) : isGoSessionInProgress(capture.serializedSession)
}

/** Stamp a capture with a timestamp to produce a persisted resume slot. */
export function createResumeSlot(capture: ResumeCapture, updatedAt: string = new Date().toISOString()): ResumeSlot {
  return { ...capture, updatedAt }
}

function isSerializedOgSession(value: unknown): value is SerializedOgSession {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return (
    typeof record.answer === 'string' &&
    typeof record.continuationCount === 'number' &&
    typeof record.currentGuess === 'string' &&
    Array.isArray(record.guesses) &&
    record.guesses.every((guess) => typeof guess === 'string') &&
    typeof record.hardMode === 'boolean' &&
    typeof record.maxAttempts === 'number'
  )
}

function isSerializedGoSession(value: unknown): value is SerializedGoSession {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  if (typeof record.currentPuzzleIndex !== 'number' || typeof record.hardMode !== 'boolean') {
    return false
  }
  if (!Array.isArray(record.priorAnswers) || !record.priorAnswers.every((answer) => typeof answer === 'string')) {
    return false
  }
  if (!Array.isArray(record.puzzles) || record.puzzles.length === 0) {
    return false
  }
  return record.puzzles.every((puzzle) => {
    if (typeof puzzle !== 'object' || puzzle === null) {
      return false
    }
    const entry = puzzle as Record<string, unknown>
    return (
      typeof entry.answer === 'string' &&
      typeof entry.continuationCount === 'number' &&
      typeof entry.currentGuess === 'string' &&
      Array.isArray(entry.guesses) &&
      entry.guesses.every((guess) => typeof guess === 'string') &&
      typeof entry.maxAttempts === 'number' &&
      Array.isArray(entry.prefilledGuesses) &&
      entry.prefilledGuesses.every((guess) => typeof guess === 'string')
    )
  })
}

/**
 * Validate and normalize an untrusted persisted resume slot. Returns `undefined`
 * for any malformed, finished, or missing slot so a corrupt payload can never
 * break load or surface a dead "Resume" button.
 */
export function normalizeResumeSlot(value: unknown): ResumeSlot | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  if (!isScope(record.scope) || typeof record.wordLength !== 'number' || record.wordLength <= 0) {
    return undefined
  }
  const updatedAt = typeof record.updatedAt === 'string' ? record.updatedAt : new Date(0).toISOString()
  const base = {
    difficulty: normalizeDifficultyTier(record.difficulty),
    scope: record.scope,
    updatedAt,
    wordLength: Math.trunc(record.wordLength),
  }

  if (record.mode === 'og' && isSerializedOgSession(record.serializedSession)) {
    const slot: OgResumeSlot = { ...base, mode: 'og', serializedSession: record.serializedSession }
    return isOgSessionInProgress(slot.serializedSession) ? slot : undefined
  }

  if (record.mode === 'go' && isSerializedGoSession(record.serializedSession)) {
    const slot: GoResumeSlot = {
      ...base,
      goPuzzleCount: normalizeGoPuzzleCount(record.goPuzzleCount),
      mode: 'go',
      serializedSession: record.serializedSession,
    }
    return isGoSessionInProgress(slot.serializedSession) ? slot : undefined
  }

  return undefined
}

/** Human-readable summary used for the home-screen Resume button. */
export function describeResumeSlot(slot: ResumeSlot): string {
  const mode = slot.mode === 'og' ? 'og' : 'go'
  const where = slot.scope === 'daily' ? 'daily' : 'practice'
  if (slot.mode === 'go') {
    return `Resume ${mode} ${where} — ${slot.goPuzzleCount} puzzles, ${slot.wordLength} letters`
  }
  return `Resume ${mode} ${where} — ${slot.wordLength} letters`
}
