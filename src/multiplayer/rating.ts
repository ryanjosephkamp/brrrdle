import type { GameMode } from '../game/types'

export type RatingBucketId = `multiplayer:${GameMode}`
export type RatingOutcome = 'win' | 'loss' | 'draw'

export const INITIAL_MULTIPLAYER_RATING = 1200
export const MULTIPLAYER_PROVISIONAL_GAMES = 10
export const MULTIPLAYER_PROVISIONAL_K = 40
export const MULTIPLAYER_ESTABLISHED_K = 24

export interface MultiplayerRatingProfile {
  readonly bucket: RatingBucketId
  readonly draws: number
  readonly gamesPlayed: number
  readonly losses: number
  readonly provisional: boolean
  readonly rating: number
  readonly updatedAt: string
  readonly userId: string
  readonly wins: number
}

export interface MultiplayerRatingTransaction {
  readonly bucket: RatingBucketId
  readonly createdAt: string
  readonly expectedScore: number
  readonly id: string
  readonly matchId: string
  readonly newRating: number
  readonly oldRating: number
  readonly opponentUserId: string
  readonly outcome: RatingOutcome
  readonly ratingDelta: number
  readonly userId: string
}

export interface MultiplayerRatingState {
  readonly profiles: readonly MultiplayerRatingProfile[]
  readonly transactions: readonly MultiplayerRatingTransaction[]
}

export interface RatedMatchPlayerResult {
  readonly outcome: RatingOutcome
  readonly playerId: string
  readonly userId: string
}

export type RatedTerminalStatus = 'completed' | 'aborted' | 'expired' | 'corrupt'

export interface RatedMatchEvidence {
  readonly authenticated: boolean
  readonly bucket: RatingBucketId
  readonly durableResult: boolean
  readonly matchId: string
  readonly playerResults: readonly RatedMatchPlayerResult[]
  readonly ranked: boolean
  readonly terminalStatus: RatedTerminalStatus
}

export interface RatedEligibility {
  readonly eligible: boolean
  readonly reason: string
}

export interface ApplyRatedMatchResult {
  readonly eligibility: RatedEligibility
  readonly state: MultiplayerRatingState
  readonly transactions: readonly MultiplayerRatingTransaction[]
}

export function getRatingBucket(mode: GameMode): RatingBucketId {
  return `multiplayer:${mode}`
}

export function normalizeRatingBucket(value: unknown, fallback: RatingBucketId = 'multiplayer:og'): RatingBucketId {
  if (value === 'multiplayer:og' || value === 'async:og' || value === 'live:og') {
    return 'multiplayer:og'
  }
  if (value === 'multiplayer:go' || value === 'async:go' || value === 'live:go') {
    return 'multiplayer:go'
  }
  return fallback
}

export function createEmptyRatingState(): MultiplayerRatingState {
  return { profiles: [], transactions: [] }
}

function clampCount(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0
}

function normalizeOutcome(value: unknown): RatingOutcome | undefined {
  return value === 'win' || value === 'loss' || value === 'draw' ? value : undefined
}

export function createInitialRatingProfile(userId: string, bucket: RatingBucketId, now = new Date().toISOString()): MultiplayerRatingProfile {
  return {
    bucket,
    draws: 0,
    gamesPlayed: 0,
    losses: 0,
    provisional: true,
    rating: INITIAL_MULTIPLAYER_RATING,
    updatedAt: now,
    userId,
    wins: 0,
  }
}

export function normalizeRatingProfile(value: unknown): MultiplayerRatingProfile | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  if (typeof record.userId !== 'string' || !record.userId.trim()) {
    return undefined
  }
  const gamesPlayed = clampCount(record.gamesPlayed)
  return {
    bucket: normalizeRatingBucket(record.bucket),
    draws: clampCount(record.draws),
    gamesPlayed,
    losses: clampCount(record.losses),
    provisional: typeof record.provisional === 'boolean' ? record.provisional : gamesPlayed < MULTIPLAYER_PROVISIONAL_GAMES,
    rating: typeof record.rating === 'number' && Number.isFinite(record.rating) ? Math.round(record.rating) : INITIAL_MULTIPLAYER_RATING,
    updatedAt: typeof record.updatedAt === 'string' ? record.updatedAt : new Date(0).toISOString(),
    userId: record.userId,
    wins: clampCount(record.wins),
  }
}

export function normalizeRatingState(value: unknown): MultiplayerRatingState {
  if (typeof value !== 'object' || value === null) {
    return createEmptyRatingState()
  }
  const record = value as Record<string, unknown>
  const profiles = Array.isArray(record.profiles) ? record.profiles.flatMap((profile) => normalizeRatingProfile(profile) ?? []) : []
  const transactions = Array.isArray(record.transactions)
    ? record.transactions.flatMap((transaction): MultiplayerRatingTransaction[] => {
        if (typeof transaction !== 'object' || transaction === null) {
          return []
        }
        const row = transaction as Record<string, unknown>
        const outcome = normalizeOutcome(row.outcome)
        if (
          typeof row.id !== 'string'
          || typeof row.matchId !== 'string'
          || typeof row.userId !== 'string'
          || typeof row.opponentUserId !== 'string'
          || !outcome
        ) {
          return []
        }
        return [{
          bucket: normalizeRatingBucket(row.bucket),
          createdAt: typeof row.createdAt === 'string' ? row.createdAt : new Date(0).toISOString(),
          expectedScore: typeof row.expectedScore === 'number' ? row.expectedScore : 0.5,
          id: row.id,
          matchId: row.matchId,
          newRating: typeof row.newRating === 'number' ? Math.round(row.newRating) : INITIAL_MULTIPLAYER_RATING,
          oldRating: typeof row.oldRating === 'number' ? Math.round(row.oldRating) : INITIAL_MULTIPLAYER_RATING,
          opponentUserId: row.opponentUserId,
          outcome,
          ratingDelta: typeof row.ratingDelta === 'number' ? Math.round(row.ratingDelta) : 0,
          userId: row.userId,
        }]
      })
    : []
  return { profiles, transactions }
}

function profileKey(userId: string, bucket: RatingBucketId): string {
  return `${bucket}:${userId}`
}

export function getRatingProfile(state: MultiplayerRatingState, userId: string, bucket: RatingBucketId, now?: string): MultiplayerRatingProfile {
  return normalizeRatingState(state).profiles.find((profile) => profile.userId === userId && profile.bucket === bucket)
    ?? createInitialRatingProfile(userId, bucket, now)
}

export function calculateExpectedScore(playerRating: number, opponentRating: number): number {
  return 1 / (1 + 10 ** ((opponentRating - playerRating) / 400))
}

export function getRatingKFactor(profile: Pick<MultiplayerRatingProfile, 'gamesPlayed' | 'provisional'>): number {
  return profile.provisional || profile.gamesPlayed < MULTIPLAYER_PROVISIONAL_GAMES
    ? MULTIPLAYER_PROVISIONAL_K
    : MULTIPLAYER_ESTABLISHED_K
}

function outcomeScore(outcome: RatingOutcome): number {
  if (outcome === 'win') {
    return 1
  }
  if (outcome === 'loss') {
    return 0
  }
  return 0.5
}

export function calculateRatingDelta(profile: MultiplayerRatingProfile, opponent: MultiplayerRatingProfile, outcome: RatingOutcome): number {
  const expected = calculateExpectedScore(profile.rating, opponent.rating)
  return Math.round(getRatingKFactor(profile) * (outcomeScore(outcome) - expected))
}

export function getRatedMatchEligibility(evidence: RatedMatchEvidence): RatedEligibility {
  if (!evidence.ranked) {
    return { eligible: false, reason: 'Unranked match.' }
  }
  if (!evidence.authenticated) {
    return { eligible: false, reason: 'Ranked matches require authenticated players.' }
  }
  if (!evidence.durableResult) {
    return { eligible: false, reason: 'Rating requires durable result evidence.' }
  }
  if (evidence.terminalStatus !== 'completed') {
    return { eligible: false, reason: `Terminal status ${evidence.terminalStatus} is not rateable.` }
  }
  if (evidence.playerResults.length !== 2) {
    return { eligible: false, reason: 'Exactly two rated player results are required.' }
  }
  const userIds = evidence.playerResults.map((result) => result.userId)
  if (userIds.some((userId) => !userId.trim())) {
    return { eligible: false, reason: 'Every rated player must have a user id.' }
  }
  if (new Set(userIds).size !== 2) {
    return { eligible: false, reason: 'Rated matches require two distinct users.' }
  }
  const outcomes = evidence.playerResults.map((result) => result.outcome)
  const validWinLoss = outcomes.includes('win') && outcomes.includes('loss')
  const validDraw = outcomes.every((outcome) => outcome === 'draw')
  if (!validWinLoss && !validDraw) {
    return { eligible: false, reason: 'Rated outcome must be win/loss or draw/draw.' }
  }
  return { eligible: true, reason: 'Eligible for rating.' }
}

function updateProfileForOutcome(profile: MultiplayerRatingProfile, delta: number, outcome: RatingOutcome, now: string): MultiplayerRatingProfile {
  const gamesPlayed = profile.gamesPlayed + 1
  return {
    ...profile,
    draws: profile.draws + (outcome === 'draw' ? 1 : 0),
    gamesPlayed,
    losses: profile.losses + (outcome === 'loss' ? 1 : 0),
    provisional: gamesPlayed < MULTIPLAYER_PROVISIONAL_GAMES,
    rating: profile.rating + delta,
    updatedAt: now,
    wins: profile.wins + (outcome === 'win' ? 1 : 0),
  }
}

export function applyRatedMatch(state: MultiplayerRatingState, evidence: RatedMatchEvidence, now = new Date().toISOString()): ApplyRatedMatchResult {
  const normalized = normalizeRatingState(state)
  const eligibility = getRatedMatchEligibility(evidence)
  if (!eligibility.eligible) {
    return { eligibility, state: normalized, transactions: [] }
  }
  if (normalized.transactions.some((transaction) => transaction.matchId === evidence.matchId && transaction.bucket === evidence.bucket)) {
    return {
      eligibility: { eligible: false, reason: 'Rating transaction already exists for this match and bucket.' },
      state: normalized,
      transactions: [],
    }
  }

  const [leftResult, rightResult] = evidence.playerResults
  const leftProfile = getRatingProfile(normalized, leftResult.userId, evidence.bucket, now)
  const rightProfile = getRatingProfile(normalized, rightResult.userId, evidence.bucket, now)
  const leftExpected = calculateExpectedScore(leftProfile.rating, rightProfile.rating)
  const rightExpected = calculateExpectedScore(rightProfile.rating, leftProfile.rating)
  const leftDelta = calculateRatingDelta(leftProfile, rightProfile, leftResult.outcome)
  const rightDelta = calculateRatingDelta(rightProfile, leftProfile, rightResult.outcome)
  const updatedProfiles = new Map(normalized.profiles.map((profile) => [profileKey(profile.userId, profile.bucket), profile]))
  updatedProfiles.set(profileKey(leftProfile.userId, leftProfile.bucket), updateProfileForOutcome(leftProfile, leftDelta, leftResult.outcome, now))
  updatedProfiles.set(profileKey(rightProfile.userId, rightProfile.bucket), updateProfileForOutcome(rightProfile, rightDelta, rightResult.outcome, now))

  const transactions: readonly MultiplayerRatingTransaction[] = [
    {
      bucket: evidence.bucket,
      createdAt: now,
      expectedScore: leftExpected,
      id: `rating-${evidence.matchId}-${evidence.bucket}-${leftProfile.userId}`,
      matchId: evidence.matchId,
      newRating: leftProfile.rating + leftDelta,
      oldRating: leftProfile.rating,
      opponentUserId: rightProfile.userId,
      outcome: leftResult.outcome,
      ratingDelta: leftDelta,
      userId: leftProfile.userId,
    },
    {
      bucket: evidence.bucket,
      createdAt: now,
      expectedScore: rightExpected,
      id: `rating-${evidence.matchId}-${evidence.bucket}-${rightProfile.userId}`,
      matchId: evidence.matchId,
      newRating: rightProfile.rating + rightDelta,
      oldRating: rightProfile.rating,
      opponentUserId: leftProfile.userId,
      outcome: rightResult.outcome,
      ratingDelta: rightDelta,
      userId: rightProfile.userId,
    },
  ]

  return {
    eligibility,
    state: {
      profiles: Array.from(updatedProfiles.values()).sort((left, right) => left.bucket.localeCompare(right.bucket) || left.userId.localeCompare(right.userId)),
      transactions: [...transactions, ...normalized.transactions].slice(0, 200),
    },
    transactions,
  }
}
