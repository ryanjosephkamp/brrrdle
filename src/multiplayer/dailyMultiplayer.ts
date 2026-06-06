import { getDailyAnswerIndex, getDailyDateKey, getDailyGoSeedIndex, getWordRepository } from '../data'
import { DEFAULT_DIFFICULTY_TIER, type DifficultyTier } from '../data/difficulty'
import { DAILY_WORD_LENGTH, DEFAULT_GO_PUZZLE_COUNT, type GoPuzzleCount } from '../game/constants'
import type { GoSessionSetup } from '../game/go/session'
import type { OgPuzzleSetup } from '../game/og/session'
import type { MultiplayerTransport } from './rating'

export interface MultiplayerProfileSummary {
  readonly accentColor?: string
  readonly avatarUrl?: string
  readonly displayName?: string
  readonly gradient?: string
  readonly initials?: string
  readonly label: string
}

interface PublicProfileInput {
  readonly accentColor?: string
  readonly avatarUrl?: string
  readonly displayName?: string
  readonly gradient?: string
  readonly initials?: string
  readonly label?: string
}

function hashString(value: string): number {
  let hash = 0x811c9dc5
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return hash >>> 0
}

function cleanText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }
  // eslint-disable-next-line no-control-regex
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/gu, '').trim()
  if (!cleaned) {
    return undefined
  }
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned
}

function isPrivateLabel(value: string | undefined): boolean {
  return Boolean(value && value.includes('@'))
}

function initialsFromLabel(label: string): string {
  const parts = label.split(/[\s._-]+/u).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]!.charAt(0)}${parts[parts.length - 1]!.charAt(0)}`.toLocaleUpperCase('en-US')
  }
  return label.charAt(0).toLocaleUpperCase('en-US')
}

export function createMultiplayerProfileSummary(
  profile: PublicProfileInput | undefined,
  fallbackLabel = 'Player',
): MultiplayerProfileSummary {
  const displayName = cleanText(profile?.displayName, 50)
  const labelCandidate = cleanText(profile?.label, 50)
  const safeFallback = cleanText(fallbackLabel, 50) ?? 'Player'
  const label = displayName ?? (isPrivateLabel(labelCandidate) ? undefined : labelCandidate) ?? safeFallback
  const initials = cleanText(profile?.initials, 4) ?? initialsFromLabel(label)
  return {
    accentColor: cleanText(profile?.accentColor, 24),
    avatarUrl: cleanText(profile?.avatarUrl, 512),
    displayName,
    gradient: cleanText(profile?.gradient, 80),
    initials,
    label,
  }
}

export function normalizeMultiplayerProfileSummary(value: unknown): MultiplayerProfileSummary | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  const label = cleanText(record.label, 50)
  if (!label || isPrivateLabel(label)) {
    return undefined
  }
  return {
    accentColor: cleanText(record.accentColor, 24),
    avatarUrl: cleanText(record.avatarUrl, 512),
    displayName: cleanText(record.displayName, 50),
    gradient: cleanText(record.gradient, 80),
    initials: cleanText(record.initials, 4) ?? initialsFromLabel(label),
    label,
  }
}

export function normalizeMultiplayerProfileMap<PlayerId extends string>(
  value: unknown,
  playerIds: readonly PlayerId[],
): Partial<Record<PlayerId, MultiplayerProfileSummary>> | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  const entries = playerIds.flatMap((playerId) => {
    const summary = normalizeMultiplayerProfileSummary(record[playerId])
    return summary ? [[playerId, summary] as const] : []
  })
  return entries.length > 0 ? Object.fromEntries(entries) as Partial<Record<PlayerId, MultiplayerProfileSummary>> : undefined
}

function transportAnswerIndex(dateKey: string, answerCount: number, transport: MultiplayerTransport, family: 'go' | 'og'): number {
  if (answerCount < 1) {
    throw new Error('At least one answer candidate is required for daily multiplayer.')
  }
  if (answerCount === 1) {
    return 0
  }

  const baseIndex = family === 'go'
    ? getDailyGoSeedIndex(dateKey, answerCount)
    : getDailyAnswerIndex(dateKey, answerCount)
  const offset = 1 + (hashString(`${dateKey}:${family}:${transport}`) % (answerCount - 1))
  let candidate = (baseIndex + offset) % answerCount
  if (transport === 'live') {
    const asyncIndex = transportAnswerIndex(dateKey, answerCount, 'async', family)
    if (candidate === asyncIndex) {
      candidate = (candidate + 1) % answerCount
    }
  }
  return candidate
}

function answerSequence(answers: readonly { readonly word: string }[], seedIndex: number, puzzleCount: GoPuzzleCount): readonly string[] {
  if (answers.length < 1) {
    throw new Error('At least one answer candidate is required for daily multiplayer.')
  }
  return Array.from({ length: puzzleCount }, (_, offset) => answers[(seedIndex + offset) % answers.length].word)
}

export function createDailyMultiplayerOgSetup(
  date = new Date(),
  difficulty: DifficultyTier = DEFAULT_DIFFICULTY_TIER,
  transport: MultiplayerTransport = 'async',
): OgPuzzleSetup {
  const repository = getWordRepository({ difficulty, length: DAILY_WORD_LENGTH, mode: 'og', scope: 'daily' })
  if (!repository.ok) {
    throw new Error(repository.message)
  }
  const dateKey = getDailyDateKey(date)
  const index = transportAnswerIndex(dateKey, repository.answers.length, transport, 'og')
  return {
    answer: repository.answers[index]!.word,
    dateKey,
    validGuesses: repository.validGuesses,
    wordLength: DAILY_WORD_LENGTH,
  }
}

export function createDailyMultiplayerGoSetup(
  date = new Date(),
  difficulty: DifficultyTier = DEFAULT_DIFFICULTY_TIER,
  puzzleCount: GoPuzzleCount = DEFAULT_GO_PUZZLE_COUNT,
  transport: MultiplayerTransport = 'async',
): GoSessionSetup {
  const repository = getWordRepository({ difficulty, length: DAILY_WORD_LENGTH, mode: 'go', scope: 'daily' })
  if (!repository.ok) {
    throw new Error(repository.message)
  }
  const dateKey = getDailyDateKey(date)
  const seedIndex = transportAnswerIndex(dateKey, repository.answers.length, transport, 'go')
  const answers = answerSequence(repository.answers, seedIndex, puzzleCount)
  const priorAnswers: string[] = []
  const puzzles = answers.map((answer) => {
    const prefilledGuesses = [...priorAnswers]
    priorAnswers.push(answer)
    return { answer, prefilledGuesses }
  })
  return {
    dateKey,
    puzzles,
    validGuesses: repository.validGuesses,
    wordLength: DAILY_WORD_LENGTH,
  }
}
