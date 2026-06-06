import type { GameMode, PlayScope } from '../game/types'
import { getUtcDailyDateKey } from '../daily'
import { getRatingBucket, type RatingBucketId } from './rating'

export type MatchmakingStatus = 'queued' | 'matched' | 'cancelled' | 'expired'

export interface MatchmakingRequest {
  readonly createdAt: string
  readonly dailyDateKey?: string
  readonly expiresAt?: string
  readonly id: string
  readonly mode: GameMode
  readonly rating: number
  readonly ratingBucket: RatingBucketId
  readonly ranked: boolean
  readonly scope: PlayScope
  readonly status: MatchmakingStatus
  readonly userId: string
  readonly wordLength?: number
}

export interface MatchmakingSelection {
  readonly left: MatchmakingRequest
  readonly reason: string
  readonly right: MatchmakingRequest
  readonly ratingGap: number
  readonly searchBand: number
}

export interface CreateMatchmakingRequestInput {
  readonly createdAt?: string
  readonly dailyDateKey?: string
  readonly id?: string
  readonly mode: GameMode
  readonly rating?: number
  readonly ranked?: boolean
  readonly scope: PlayScope
  readonly userId: string
  readonly wordLength?: number
}

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function getSearchBand(request: MatchmakingRequest, now = new Date(request.createdAt)): number {
  const queuedMs = Math.max(0, now.getTime() - Date.parse(request.createdAt))
  const initial = request.rating === 1200 ? 200 : 100
  const stepMs = 10 * 60_000
  const step = Math.floor(queuedMs / stepMs) * 50
  return Math.min(600, initial + step)
}

export function createMatchmakingRequest(input: CreateMatchmakingRequestInput): MatchmakingRequest {
  const createdAt = input.createdAt ?? new Date().toISOString()
  const dailyDateKey = input.scope === 'daily'
    ? input.dailyDateKey ?? getUtcDailyDateKey(new Date(createdAt))
    : undefined
  return {
    createdAt,
    dailyDateKey,
    id: input.id ?? createId(`matchmaking-multiplayer-${input.mode}`),
    mode: input.mode,
    rating: Math.round(input.rating ?? 1200),
    ratingBucket: getRatingBucket(input.mode),
    ranked: input.ranked !== false,
    scope: input.scope,
    status: 'queued',
    userId: input.userId,
    wordLength: input.scope === 'practice' ? input.wordLength : undefined,
  }
}

export function isMatchmakingCompatible(left: MatchmakingRequest, right: MatchmakingRequest, now = new Date()): boolean {
  if (left.id === right.id || left.status !== 'queued' || right.status !== 'queued') {
    return false
  }
  if (!left.ranked || !right.ranked || left.userId === right.userId) {
    return false
  }
  if (left.mode !== right.mode || left.scope !== right.scope || left.ratingBucket !== right.ratingBucket) {
    return false
  }
  if (left.scope === 'daily') {
    const currentDaily = getUtcDailyDateKey(now)
    if (left.dailyDateKey !== right.dailyDateKey || left.dailyDateKey !== currentDaily) {
      return false
    }
  }
  if (left.scope === 'practice' && left.wordLength !== right.wordLength) {
    return false
  }
  if (left.expiresAt && Date.parse(left.expiresAt) <= now.getTime()) {
    return false
  }
  if (right.expiresAt && Date.parse(right.expiresAt) <= now.getTime()) {
    return false
  }
  const gap = Math.abs(left.rating - right.rating)
  return gap <= Math.max(getSearchBand(left, now), getSearchBand(right, now))
}

export function findBestMatchForRequest(request: MatchmakingRequest, candidates: readonly MatchmakingRequest[], now = new Date()): MatchmakingSelection | undefined {
  return candidates
    .filter((candidate) => isMatchmakingCompatible(request, candidate, now))
    .map((candidate) => ({
      left: request,
      ratingGap: Math.abs(request.rating - candidate.rating),
      reason: 'Compatible ranked match.',
      right: candidate,
      searchBand: Math.max(getSearchBand(request, now), getSearchBand(candidate, now)),
    }))
    .sort((left, right) => left.ratingGap - right.ratingGap || left.right.createdAt.localeCompare(right.right.createdAt))[0]
}

export function markMatched(requests: readonly MatchmakingRequest[], selection: MatchmakingSelection): readonly MatchmakingRequest[] {
  const matchedIds = new Set([selection.left.id, selection.right.id])
  return requests.map((request) => matchedIds.has(request.id) ? { ...request, status: 'matched' } : request)
}
