import { DEFAULT_DIFFICULTY_TIER, normalizeDifficultyTier, type DifficultyTier } from '../data/difficulty'
import { dateKeyToLocalDate, getNextUtcMidnight, getUtcDailyDateKey, MS_PER_SECOND } from '../daily'
import {
  DAILY_WORD_LENGTH,
  DEFAULT_GO_PUZZLE_COUNT,
  isSupportedPracticeWordLength,
  normalizeGoPuzzleCount,
  type GoPuzzleCount,
} from '../game/constants'
import {
  createGoSession,
  createOgSession,
  createPracticeGoSetup,
  createPracticeOgSetup,
  restoreGoSession,
  restoreOgSession,
  serializeGoSession,
  serializeOgSession,
  submitGoGuess,
  submitGuess,
  type GoSessionState,
  type PuzzleSessionState,
  type SerializedGoSession,
  type SerializedOgSession,
} from '../game'
import type { GameMode, GameStatus, GuessResult, PlayScope, TileResult } from '../game/types'
import {
  createDailyMultiplayerGoSetup,
  createDailyMultiplayerOgSetup,
  normalizeMultiplayerProfileMap,
  normalizeMultiplayerProfileSummary,
  type MultiplayerProfileSummary,
} from './dailyMultiplayer'
import type { RatingBucketId } from './rating'

export const LIVE_WORD_LENGTH_SELECTION_MS = 60 * MS_PER_SECOND
export const LIVE_WORD_LENGTH_RANDOMIZE_ANIMATION_MS = 1_800
export const LIVE_COUNTDOWN_MS = 3 * MS_PER_SECOND
export const MAX_LIVE_MULTIPLAYER_GAMES = 5

export type LiveMultiplayerPlayerId = 'player-one' | 'player-two'
export type LiveMultiplayerLobbyStatus = 'waiting' | 'matched' | 'cancelled' | 'expired'
export type LiveMultiplayerMatchPhase = 'word-length-selection' | 'countdown' | 'playing' | 'finished' | 'aborted' | 'expired'

export interface LiveMultiplayerPlayer {
  readonly connected: boolean
  readonly id: LiveMultiplayerPlayerId
  readonly label: string
  readonly lastSeenAt?: string
}

export interface LiveMultiplayerSpectator {
  readonly joinedAt: string
  readonly lastSeenAt?: string
  readonly profile?: MultiplayerProfileSummary
  readonly userId: string
}

export interface LiveMultiplayerLobby {
  readonly createdAt: string
  readonly customGameCode?: string
  readonly dailyDateKey?: string
  readonly difficulty: DifficultyTier
  readonly goPuzzleCount?: GoPuzzleCount
  readonly hostPlayerId: LiveMultiplayerPlayerId
  readonly hostProfile?: MultiplayerProfileSummary
  readonly hostUserId?: string
  readonly id: string
  readonly matchmakingRequestId?: string
  readonly matchId?: string
  readonly mode: GameMode
  readonly ranked?: boolean
  readonly ratingBucket?: RatingBucketId
  readonly scope: PlayScope
  readonly status: LiveMultiplayerLobbyStatus
  readonly updatedAt: string
}

export type LiveSerializedSession =
  | { readonly mode: 'og'; readonly session: SerializedOgSession }
  | { readonly mode: 'go'; readonly session: SerializedGoSession }

export interface LiveMultiplayerMove {
  readonly createdAt: string
  readonly guess: string
  readonly id: string
  readonly playerId: LiveMultiplayerPlayerId
  readonly puzzleIndex: number
  readonly tiles: readonly TileResult[]
}

export interface LiveMultiplayerPlayerProgress {
  readonly completedAt?: string
  readonly moves: readonly LiveMultiplayerMove[]
  readonly playerId: LiveMultiplayerPlayerId
  readonly serializedSession?: LiveSerializedSession
  readonly status: GameStatus
}

export interface LiveWordLengthChoice {
  readonly playerId: LiveMultiplayerPlayerId
  readonly updatedAt: string
  readonly wordLength: number
}

export interface LiveWordLengthSelection {
  readonly animationEndsAt?: string
  readonly animationStartedAt?: string
  readonly choices: readonly LiveWordLengthChoice[]
  readonly endsAt: string
  readonly resolvedAt?: string
  readonly selectionCandidates?: readonly number[]
  readonly selectedWordLength?: number
}

export interface LiveMultiplayerMatch {
  readonly abortReason?: string
  readonly countdownEndsAt?: string
  readonly createdAt: string
  readonly customGameCode?: string
  readonly dailyDateKey?: string
  readonly deadlineAt?: string
  readonly difficulty: DifficultyTier
  readonly endedAt?: string
  readonly firstPlayerId: LiveMultiplayerPlayerId
  readonly goPuzzleCount?: GoPuzzleCount
  readonly id: string
  readonly lobbyId?: string
  readonly matchmakingRequestId?: string
  readonly mode: GameMode
  readonly phase: LiveMultiplayerMatchPhase
  readonly playerUserIds?: Partial<Record<LiveMultiplayerPlayerId, string>>
  readonly playerProgress: readonly LiveMultiplayerPlayerProgress[]
  readonly playerProfiles?: Partial<Record<LiveMultiplayerPlayerId, MultiplayerProfileSummary>>
  readonly players: readonly LiveMultiplayerPlayer[]
  readonly ranked?: boolean
  readonly ratingBucket?: RatingBucketId
  readonly scope: PlayScope
  readonly seed: number
  readonly selection?: LiveWordLengthSelection
  readonly spectators?: readonly LiveMultiplayerSpectator[]
  readonly updatedAt: string
  readonly winnerId?: LiveMultiplayerPlayerId
  readonly wordLength?: number
}

export interface LiveMultiplayerState {
  readonly lobbies: readonly LiveMultiplayerLobby[]
  readonly matches: readonly LiveMultiplayerMatch[]
}

export interface CreateLiveMultiplayerLobbyInput {
  readonly createdAt?: string
  readonly customGameCode?: string
  readonly dailyDateKey?: string
  readonly difficulty?: DifficultyTier
  readonly goPuzzleCount?: GoPuzzleCount
  readonly hostProfile?: MultiplayerProfileSummary
  readonly hostUserId?: string
  readonly matchmakingRequestId?: string
  readonly mode: GameMode
  readonly ranked?: boolean
  readonly ratingBucket?: RatingBucketId
  readonly scope: PlayScope
}

export interface MatchLiveMultiplayerLobbyInput {
  readonly joiningProfile?: MultiplayerProfileSummary
  readonly lobbyId: string
  readonly joiningUserId?: string
  readonly now?: string
  readonly playerUserIds?: Partial<Record<LiveMultiplayerPlayerId, string>>
  readonly rivalLabel?: string
  readonly seed?: number
}

export interface ChooseLivePracticeWordLengthInput {
  readonly actorUserId?: string
  readonly matchId: string
  readonly now?: string
  readonly playerId: LiveMultiplayerPlayerId
  readonly wordLength: number
}

export interface ResolveLivePracticeWordLengthInput {
  readonly matchId: string
  readonly now?: string
  readonly randomSeed?: number
}

export interface SubmitLiveMultiplayerGuessInput {
  readonly actorUserId?: string
  readonly guess: string
  readonly matchId: string
  readonly now?: string
  readonly playerId?: LiveMultiplayerPlayerId
}

export interface ForfeitLiveMultiplayerMatchInput {
  readonly actorUserId?: string
  readonly matchId: string
  readonly now?: string
  readonly playerId: LiveMultiplayerPlayerId
}

export interface CancelLiveMultiplayerLobbyInput {
  readonly lobbyId: string
  readonly now?: string
  readonly userId: string
}

export interface JoinLiveMultiplayerSpectatorInput {
  readonly matchId: string
  readonly now?: string
  readonly profile?: MultiplayerProfileSummary
  readonly userId: string
}

export interface LiveMultiplayerCommandResult {
  readonly error?: string
  readonly lobby?: LiveMultiplayerLobby
  readonly match?: LiveMultiplayerMatch
  readonly state: LiveMultiplayerState
}

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function nowIso(value?: string): string {
  return value ?? new Date().toISOString()
}

function plusMs(iso: string, ms: number): string {
  return new Date(Date.parse(iso) + ms).toISOString()
}

function pickFirstPlayer(seed: number): LiveMultiplayerPlayerId {
  return Math.abs(Math.trunc(seed)) % 2 === 0 ? 'player-one' : 'player-two'
}

function normalizeMode(value: unknown): GameMode {
  return value === 'go' ? 'go' : 'og'
}

function normalizeScope(value: unknown): PlayScope {
  return value === 'daily' ? 'daily' : 'practice'
}

function normalizePlayerId(value: unknown): LiveMultiplayerPlayerId {
  return value === 'player-two' ? 'player-two' : 'player-one'
}

function isTerminalPhase(phase: LiveMultiplayerMatchPhase): boolean {
  return phase === 'finished' || phase === 'aborted' || phase === 'expired'
}

function otherPlayerId(playerId: LiveMultiplayerPlayerId): LiveMultiplayerPlayerId {
  return playerId === 'player-one' ? 'player-two' : 'player-one'
}

function normalizePlayer(value: unknown, fallback: LiveMultiplayerPlayer): LiveMultiplayerPlayer {
  if (typeof value !== 'object' || value === null) {
    return fallback
  }
  const record = value as Record<string, unknown>
  return {
    connected: typeof record.connected === 'boolean' ? record.connected : fallback.connected,
    id: normalizePlayerId(record.id),
    label: typeof record.label === 'string' && record.label.trim() ? record.label : fallback.label,
    lastSeenAt: typeof record.lastSeenAt === 'string' ? record.lastSeenAt : fallback.lastSeenAt,
  }
}

function normalizeTiles(value: unknown): readonly TileResult[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value.flatMap((tile): TileResult[] => {
    if (typeof tile !== 'object' || tile === null) {
      return []
    }
    const record = tile as Record<string, unknown>
    if (typeof record.letter !== 'string' || (record.state !== 'absent' && record.state !== 'present' && record.state !== 'correct')) {
      return []
    }
    return [{ letter: record.letter, state: record.state }]
  })
}

function normalizeMove(value: unknown): LiveMultiplayerMove | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  if (typeof record.guess !== 'string') {
    return undefined
  }
  return {
    createdAt: typeof record.createdAt === 'string' ? record.createdAt : new Date(0).toISOString(),
    guess: record.guess,
    id: typeof record.id === 'string' ? record.id : createId('live-move'),
    playerId: normalizePlayerId(record.playerId),
    puzzleIndex: typeof record.puzzleIndex === 'number' ? Math.max(0, Math.trunc(record.puzzleIndex)) : 0,
    tiles: normalizeTiles(record.tiles),
  }
}

function normalizePlayerUserIds(value: unknown): Partial<Record<LiveMultiplayerPlayerId, string>> | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  const playerOne = typeof record['player-one'] === 'string' && record['player-one'].trim() ? record['player-one'] : undefined
  const playerTwo = typeof record['player-two'] === 'string' && record['player-two'].trim() ? record['player-two'] : undefined
  return playerOne || playerTwo ? { 'player-one': playerOne, 'player-two': playerTwo } : undefined
}

function profileLabel(profile: MultiplayerProfileSummary | undefined, fallback: string): string {
  return profile?.label ?? fallback
}

function isSerializedOg(value: unknown): value is SerializedOgSession {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return typeof record.answer === 'string'
    && typeof record.continuationCount === 'number'
    && typeof record.currentGuess === 'string'
    && Array.isArray(record.guesses)
    && record.guesses.every((guess) => typeof guess === 'string')
    && typeof record.hardMode === 'boolean'
    && typeof record.maxAttempts === 'number'
}

function isSerializedGo(value: unknown): value is SerializedGoSession {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return typeof record.currentPuzzleIndex === 'number'
    && typeof record.hardMode === 'boolean'
    && Array.isArray(record.priorAnswers)
    && record.priorAnswers.every((answer) => typeof answer === 'string')
    && Array.isArray(record.puzzles)
    && record.puzzles.length > 0
}

function normalizeSerializedSession(value: unknown): LiveSerializedSession | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  if (record.mode === 'og' && isSerializedOg(record.session)) {
    return { mode: 'og', session: record.session }
  }
  if (record.mode === 'go' && isSerializedGo(record.session)) {
    return { mode: 'go', session: record.session }
  }
  return undefined
}

function normalizePlayerProgress(value: unknown, fallbackId: LiveMultiplayerPlayerId): LiveMultiplayerPlayerProgress {
  if (typeof value !== 'object' || value === null) {
    return { moves: [], playerId: fallbackId, status: 'playing' }
  }
  const record = value as Record<string, unknown>
  const status = record.status === 'won' || record.status === 'lost' ? record.status : 'playing'
  return {
    completedAt: typeof record.completedAt === 'string' ? record.completedAt : undefined,
    moves: Array.isArray(record.moves) ? record.moves.flatMap((move) => normalizeMove(move) ?? []) : [],
    playerId: normalizePlayerId(record.playerId ?? fallbackId),
    serializedSession: normalizeSerializedSession(record.serializedSession),
    status,
  }
}

function normalizeChoice(value: unknown): LiveWordLengthChoice | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  if (typeof record.wordLength !== 'number' || !isSupportedPracticeWordLength(Math.trunc(record.wordLength))) {
    return undefined
  }
  return {
    playerId: normalizePlayerId(record.playerId),
    updatedAt: typeof record.updatedAt === 'string' ? record.updatedAt : new Date(0).toISOString(),
    wordLength: Math.trunc(record.wordLength),
  }
}

function normalizeSelection(value: unknown): LiveWordLengthSelection | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  if (typeof record.endsAt !== 'string') {
    return undefined
  }
  return {
    animationEndsAt: typeof record.animationEndsAt === 'string' ? record.animationEndsAt : undefined,
    animationStartedAt: typeof record.animationStartedAt === 'string' ? record.animationStartedAt : undefined,
    choices: Array.isArray(record.choices) ? record.choices.flatMap((choice) => normalizeChoice(choice) ?? []) : [],
    endsAt: record.endsAt,
    resolvedAt: typeof record.resolvedAt === 'string' ? record.resolvedAt : undefined,
    selectionCandidates: Array.isArray(record.selectionCandidates) ? record.selectionCandidates.flatMap((candidate): number[] => {
      if (typeof candidate !== 'number' || !isSupportedPracticeWordLength(Math.trunc(candidate))) {
        return []
      }
      return [Math.trunc(candidate)]
    }) : undefined,
    selectedWordLength: typeof record.selectedWordLength === 'number' && isSupportedPracticeWordLength(Math.trunc(record.selectedWordLength))
      ? Math.trunc(record.selectedWordLength)
      : undefined,
  }
}

function normalizeSpectator(value: unknown): LiveMultiplayerSpectator | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  if (typeof record.userId !== 'string' || !record.userId.trim()) {
    return undefined
  }
  return {
    joinedAt: typeof record.joinedAt === 'string' ? record.joinedAt : new Date(0).toISOString(),
    lastSeenAt: typeof record.lastSeenAt === 'string' ? record.lastSeenAt : undefined,
    profile: normalizeMultiplayerProfileSummary(record.profile),
    userId: record.userId,
  }
}

function normalizeLobby(value: unknown): LiveMultiplayerLobby | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  const status: LiveMultiplayerLobbyStatus =
    record.status === 'matched' || record.status === 'cancelled' || record.status === 'expired' ? record.status : 'waiting'
  const scope = normalizeScope(record.scope)
  const mode = normalizeMode(record.mode)
  return {
    createdAt: typeof record.createdAt === 'string' ? record.createdAt : new Date(0).toISOString(),
    customGameCode: typeof record.customGameCode === 'string' ? record.customGameCode : undefined,
    dailyDateKey: typeof record.dailyDateKey === 'string' ? record.dailyDateKey : undefined,
    difficulty: normalizeDifficultyTier(record.difficulty),
    goPuzzleCount: mode === 'go' && typeof record.goPuzzleCount === 'number' ? normalizeGoPuzzleCount(record.goPuzzleCount) : undefined,
    hostPlayerId: normalizePlayerId(record.hostPlayerId),
    hostProfile: normalizeMultiplayerProfileSummary(record.hostProfile),
    hostUserId: typeof record.hostUserId === 'string' ? record.hostUserId : undefined,
    id: typeof record.id === 'string' ? record.id : createId('live-lobby'),
    matchmakingRequestId: typeof record.matchmakingRequestId === 'string' ? record.matchmakingRequestId : undefined,
    matchId: typeof record.matchId === 'string' ? record.matchId : undefined,
    mode,
    ranked: record.ranked === true,
    ratingBucket: typeof record.ratingBucket === 'string' ? record.ratingBucket as RatingBucketId : undefined,
    scope,
    status,
    updatedAt: typeof record.updatedAt === 'string' ? record.updatedAt : new Date(0).toISOString(),
  }
}

function normalizeMatch(value: unknown): LiveMultiplayerMatch | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  const mode = normalizeMode(record.mode)
  const scope = normalizeScope(record.scope)
  const normalizedPhase: LiveMultiplayerMatchPhase | undefined =
    record.phase === 'countdown'
      || record.phase === 'playing'
      || record.phase === 'finished'
      || record.phase === 'aborted'
      || record.phase === 'expired'
      ? record.phase
      : record.phase === 'word-length-selection'
        ? 'word-length-selection'
        : undefined
  const phase: LiveMultiplayerMatchPhase = normalizedPhase ?? (scope === 'daily' ? 'countdown' : 'word-length-selection')
  const players = Array.isArray(record.players) ? record.players : []
  const progress = Array.isArray(record.playerProgress) ? record.playerProgress : []
  const wordLength = typeof record.wordLength === 'number' ? Math.trunc(record.wordLength) : undefined
  const playerProfiles = normalizeMultiplayerProfileMap<LiveMultiplayerPlayerId>(record.playerProfiles, ['player-one', 'player-two'])
  const normalizedPlayers: readonly LiveMultiplayerPlayer[] = [
    normalizePlayer(players[0], { connected: true, id: 'player-one', label: 'You' }),
    normalizePlayer(players[1], { connected: true, id: 'player-two', label: 'Rival' }),
  ].map((player) => ({ ...player, label: profileLabel(playerProfiles?.[player.id], player.label) }))
  return {
    abortReason: typeof record.abortReason === 'string' ? record.abortReason : undefined,
    countdownEndsAt: typeof record.countdownEndsAt === 'string' ? record.countdownEndsAt : undefined,
    createdAt: typeof record.createdAt === 'string' ? record.createdAt : new Date(0).toISOString(),
    customGameCode: typeof record.customGameCode === 'string' ? record.customGameCode : undefined,
    dailyDateKey: typeof record.dailyDateKey === 'string' ? record.dailyDateKey : undefined,
    deadlineAt: typeof record.deadlineAt === 'string' ? record.deadlineAt : undefined,
    difficulty: normalizeDifficultyTier(record.difficulty),
    endedAt: typeof record.endedAt === 'string' ? record.endedAt : undefined,
    firstPlayerId: normalizePlayerId(record.firstPlayerId),
    goPuzzleCount: mode === 'go' && typeof record.goPuzzleCount === 'number' ? normalizeGoPuzzleCount(record.goPuzzleCount) : undefined,
    id: typeof record.id === 'string' ? record.id : createId('live-match'),
    lobbyId: typeof record.lobbyId === 'string' ? record.lobbyId : undefined,
    matchmakingRequestId: typeof record.matchmakingRequestId === 'string' ? record.matchmakingRequestId : undefined,
    mode,
    phase,
    playerUserIds: normalizePlayerUserIds(record.playerUserIds),
    playerProgress: [
      normalizePlayerProgress(progress[0], 'player-one'),
      normalizePlayerProgress(progress[1], 'player-two'),
    ],
    playerProfiles,
    players: normalizedPlayers,
    ranked: record.ranked === true,
    ratingBucket: typeof record.ratingBucket === 'string' ? record.ratingBucket as RatingBucketId : undefined,
    scope,
    seed: typeof record.seed === 'number' ? record.seed : 0,
    selection: normalizeSelection(record.selection),
    spectators: Array.isArray(record.spectators) ? record.spectators.flatMap((spectator) => normalizeSpectator(spectator) ?? []) : undefined,
    updatedAt: typeof record.updatedAt === 'string' ? record.updatedAt : new Date(0).toISOString(),
    winnerId: record.winnerId === 'player-one' || record.winnerId === 'player-two' ? record.winnerId : undefined,
    wordLength: wordLength && (scope === 'daily' ? wordLength === DAILY_WORD_LENGTH : isSupportedPracticeWordLength(wordLength)) ? wordLength : undefined,
  }
}

export function createEmptyLiveMultiplayerState(): LiveMultiplayerState {
  return { lobbies: [], matches: [] }
}

export function normalizeLiveMultiplayerState(value: unknown): LiveMultiplayerState {
  if (typeof value !== 'object' || value === null) {
    return createEmptyLiveMultiplayerState()
  }
  const record = value as Record<string, unknown>
  return {
    lobbies: Array.isArray(record.lobbies) ? record.lobbies.flatMap((lobby) => normalizeLobby(lobby) ?? []) : [],
    matches: Array.isArray(record.matches) ? record.matches.flatMap((match) => normalizeMatch(match) ?? []) : [],
  }
}

export function createLiveMultiplayerLobby(input: CreateLiveMultiplayerLobbyInput): LiveMultiplayerLobby {
  const createdAt = input.createdAt ?? new Date().toISOString()
  const mode = input.mode
  const scope = input.scope
  const dailyDateKey = scope === 'daily' ? input.dailyDateKey ?? getUtcDailyDateKey(new Date(createdAt)) : undefined
  return {
    createdAt,
    customGameCode: input.customGameCode,
    dailyDateKey,
    difficulty: input.difficulty ?? DEFAULT_DIFFICULTY_TIER,
    goPuzzleCount: mode === 'go' ? input.goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT : undefined,
    hostPlayerId: 'player-one',
    hostProfile: normalizeMultiplayerProfileSummary(input.hostProfile),
    hostUserId: input.hostUserId,
    id: createId(`live-lobby-${scope}-${mode}`),
    matchmakingRequestId: input.matchmakingRequestId,
    mode,
    ranked: input.ranked === true,
    ratingBucket: input.ratingBucket,
    scope,
    status: 'waiting',
    updatedAt: createdAt,
  }
}

export function getViewerLivePlayerId(match: LiveMultiplayerMatch, userId: string | undefined): LiveMultiplayerPlayerId | undefined {
  if (!userId) {
    return undefined
  }
  if (match.playerUserIds?.['player-one'] === userId) {
    return 'player-one'
  }
  if (match.playerUserIds?.['player-two'] === userId) {
    return 'player-two'
  }
  return undefined
}

function liveLobbyBelongsToViewer(lobby: LiveMultiplayerLobby, userId: string | undefined): boolean {
  if (!userId) {
    return true
  }
  return !lobby.hostUserId || lobby.hostUserId === userId
}

function liveMatchBelongsToViewer(match: LiveMultiplayerMatch, userId: string | undefined): boolean {
  if (!userId) {
    return true
  }
  return match.playerUserIds?.['player-one'] === userId || match.playerUserIds?.['player-two'] === userId
}

export function getActiveLiveMultiplayerEntries(
  state: LiveMultiplayerState,
  userId?: string,
): readonly (LiveMultiplayerLobby | LiveMultiplayerMatch)[] {
  const normalized = normalizeLiveMultiplayerState(state)
  const activeLobbies = normalized.lobbies.filter((lobby) => lobby.status === 'waiting' && liveLobbyBelongsToViewer(lobby, userId))
  const activeMatches = normalized.matches.filter((match) => !isTerminalPhase(match.phase) && liveMatchBelongsToViewer(match, userId))
  return [...activeLobbies, ...activeMatches]
}

export function canCreateLiveMultiplayerLobby(state: LiveMultiplayerState, userId?: string): boolean {
  return getActiveLiveMultiplayerEntries(state, userId).length < MAX_LIVE_MULTIPLAYER_GAMES
}

export function canViewerJoinLiveLobby(lobby: LiveMultiplayerLobby, userId: string | undefined): boolean {
  return Boolean(
    userId
      && lobby.status === 'waiting'
      && lobby.hostUserId
      && lobby.hostUserId !== userId,
  )
}

export function canViewerCancelLiveLobby(lobby: LiveMultiplayerLobby, userId: string | undefined): boolean {
  return Boolean(
    userId
      && lobby.status === 'waiting'
      && lobby.hostUserId === userId
      && !lobby.matchId,
  )
}

export function getViewerLiveSpectator(match: LiveMultiplayerMatch, userId: string | undefined): LiveMultiplayerSpectator | undefined {
  if (!userId) {
    return undefined
  }
  return match.spectators?.find((spectator) => spectator.userId === userId)
}

export function canViewerSpectateLiveMatch(match: LiveMultiplayerMatch, userId: string | undefined): boolean {
  return Boolean(
    userId
      && !getViewerLivePlayerId(match, userId)
      && !getViewerLiveSpectator(match, userId)
      && match.phase !== 'aborted'
      && match.phase !== 'expired',
  )
}

export function hasDailyLiveMultiplayerParticipation(
  state: LiveMultiplayerState,
  dateKey: string | undefined,
  mode: GameMode,
  userId: string | undefined,
): boolean {
  if (!dateKey || !userId) {
    return false
  }
  const normalized = normalizeLiveMultiplayerState(state)
  return normalized.lobbies.some((lobby) => (
    lobby.scope === 'daily'
    && lobby.dailyDateKey === dateKey
    && lobby.mode === mode
    && lobby.hostUserId === userId
    && !(lobby.status === 'cancelled' && !lobby.matchId)
  )) || normalized.matches.some((match) => (
    match.scope === 'daily'
    && match.dailyDateKey === dateKey
    && match.mode === mode
    && (match.playerUserIds?.['player-one'] === userId || match.playerUserIds?.['player-two'] === userId)
  ))
}

export function addLiveMultiplayerLobby(state: LiveMultiplayerState, lobby: LiveMultiplayerLobby): LiveMultiplayerState {
  const normalized = normalizeLiveMultiplayerState(state)
  if (!canCreateLiveMultiplayerLobby(normalized, lobby.hostUserId)) {
    return normalized
  }
  if (
    lobby.scope === 'daily'
    && lobby.hostUserId
    && hasDailyLiveMultiplayerParticipation(normalized, lobby.dailyDateKey, lobby.mode, lobby.hostUserId)
  ) {
    return normalized
  }
  return { ...normalized, lobbies: [lobby, ...normalized.lobbies] }
}

export function cancelLiveMultiplayerLobby(state: LiveMultiplayerState, input: CancelLiveMultiplayerLobbyInput): LiveMultiplayerCommandResult {
  const normalized = normalizeLiveMultiplayerState(state)
  const lobby = normalized.lobbies.find((entry) => entry.id === input.lobbyId)
  if (!lobby) {
    return { error: 'Live lobby not found.', state: normalized }
  }
  if (!canViewerCancelLiveLobby(lobby, input.userId)) {
    return { error: 'Only the creator can cancel an unjoined live lobby.', lobby, state: normalized }
  }

  const now = nowIso(input.now)
  const updated: LiveMultiplayerLobby = {
    ...lobby,
    status: 'cancelled',
    updatedAt: now,
  }
  return {
    lobby: updated,
    state: {
      ...normalized,
      lobbies: normalized.lobbies.map((entry) => entry.id === updated.id ? updated : entry),
    },
  }
}

function createSerializedSession(input: {
  readonly dailyDateKey?: string
  readonly difficulty: DifficultyTier
  readonly goPuzzleCount?: GoPuzzleCount
  readonly mode: GameMode
  readonly scope: PlayScope
  readonly seed: number
  readonly wordLength: number
}): LiveSerializedSession {
  if (input.mode === 'og') {
    const setup = input.scope === 'daily'
      ? createDailyMultiplayerOgSetup(dateKeyToLocalDate(input.dailyDateKey ?? getUtcDailyDateKey()), input.difficulty, 'live')
      : createPracticeOgSetup(input.wordLength, input.seed, input.difficulty)
    return { mode: 'og', session: serializeOgSession(createOgSession(setup)) }
  }

  const setup = input.scope === 'daily'
    ? createDailyMultiplayerGoSetup(dateKeyToLocalDate(input.dailyDateKey ?? getUtcDailyDateKey()), input.difficulty, input.goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT, 'live')
    : createPracticeGoSetup(input.wordLength, input.seed, input.difficulty, input.goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT)
  return { mode: 'go', session: serializeGoSession(createGoSession(setup)) }
}

function createPlayerProgressForMatch(match: LiveMultiplayerMatch, wordLength: number): readonly LiveMultiplayerPlayerProgress[] {
  return match.players.map((player) => ({
    moves: [],
    playerId: player.id,
    serializedSession: createSerializedSession({
      dailyDateKey: match.dailyDateKey,
      difficulty: match.difficulty,
      goPuzzleCount: match.goPuzzleCount,
      mode: match.mode,
      scope: match.scope,
      seed: match.seed,
      wordLength,
    }),
    status: 'playing',
  }))
}

function createCountdownMatch(match: LiveMultiplayerMatch, wordLength: number, now: string): LiveMultiplayerMatch {
  return {
    ...match,
    countdownEndsAt: plusMs(now, LIVE_COUNTDOWN_MS),
    phase: 'countdown',
    playerProgress: createPlayerProgressForMatch(match, wordLength),
    selection: match.selection,
    updatedAt: now,
    wordLength,
  }
}

export function matchLiveMultiplayerLobby(state: LiveMultiplayerState, input: MatchLiveMultiplayerLobbyInput): LiveMultiplayerCommandResult {
  const normalized = normalizeLiveMultiplayerState(state)
  const lobby = normalized.lobbies.find((entry) => entry.id === input.lobbyId)
  if (!lobby) {
    return { error: 'Live lobby not found.', state: normalized }
  }
  if (lobby.status !== 'waiting') {
    return { error: 'This live lobby is no longer waiting.', state: normalized }
  }
  if (!canCreateLiveMultiplayerLobby(
    {
      lobbies: normalized.lobbies.filter((entry) => entry.id !== lobby.id),
      matches: normalized.matches,
    },
    input.joiningUserId,
  )) {
    return { error: 'You already have five active live multiplayer games.', state: normalized }
  }
  if (lobby.scope === 'daily' && hasDailyLiveMultiplayerParticipation(
    {
      lobbies: normalized.lobbies.filter((entry) => entry.id !== lobby.id),
      matches: normalized.matches,
    },
    lobby.dailyDateKey,
    lobby.mode,
    input.joiningUserId,
  )) {
    return { error: 'You already claimed today\'s Daily Live game for this mode.', state: normalized }
  }

  const now = nowIso(input.now)
  const seed = input.seed ?? Date.parse(now)
  const firstPlayerId = pickFirstPlayer(seed)
  const playerUserIds = input.playerUserIds ?? {
    'player-one': lobby.hostUserId,
    'player-two': input.joiningUserId,
  }
  const joiningProfile = normalizeMultiplayerProfileSummary(input.joiningProfile)
  const playerProfiles = {
    ...(lobby.hostProfile ? { 'player-one': lobby.hostProfile } : {}),
    ...(joiningProfile ? { 'player-two': joiningProfile } : {}),
  } satisfies Partial<Record<LiveMultiplayerPlayerId, MultiplayerProfileSummary>>
  const players: readonly LiveMultiplayerPlayer[] = [
    { connected: true, id: 'player-one', label: profileLabel(lobby.hostProfile, 'Host'), lastSeenAt: now },
    { connected: true, id: 'player-two', label: profileLabel(joiningProfile, input.rivalLabel ?? 'Rival'), lastSeenAt: now },
  ]
  const baseMatch: LiveMultiplayerMatch = {
    createdAt: now,
    customGameCode: lobby.customGameCode,
    dailyDateKey: lobby.dailyDateKey,
    deadlineAt: lobby.scope === 'daily' ? getNextUtcMidnight(new Date(now)).toISOString() : undefined,
    difficulty: lobby.difficulty,
    firstPlayerId,
    goPuzzleCount: lobby.goPuzzleCount,
    id: createId(`live-match-${lobby.scope}-${lobby.mode}`),
    lobbyId: lobby.id,
    matchmakingRequestId: lobby.matchmakingRequestId,
    mode: lobby.mode,
    phase: lobby.scope === 'practice' ? 'word-length-selection' : 'countdown',
    playerUserIds,
    playerProgress: players.map((player) => ({ moves: [], playerId: player.id, status: 'playing' })),
    playerProfiles,
    players,
    ranked: lobby.ranked === true,
    ratingBucket: lobby.ratingBucket,
    scope: lobby.scope,
    seed,
    updatedAt: now,
  }
  const match = lobby.scope === 'daily'
    ? createCountdownMatch({ ...baseMatch, wordLength: DAILY_WORD_LENGTH }, DAILY_WORD_LENGTH, now)
    : {
        ...baseMatch,
        selection: {
          choices: [],
          endsAt: plusMs(now, LIVE_WORD_LENGTH_SELECTION_MS),
        },
      }

  return {
    match,
    state: {
      lobbies: normalized.lobbies.map((entry) => entry.id === lobby.id ? { ...entry, matchId: match.id, status: 'matched', updatedAt: now } : entry),
      matches: [match, ...normalized.matches],
    },
  }
}

export function chooseLivePracticeWordLength(state: LiveMultiplayerState, input: ChooseLivePracticeWordLengthInput): LiveMultiplayerCommandResult {
  const normalized = normalizeLiveMultiplayerState(state)
  const match = normalized.matches.find((entry) => entry.id === input.matchId)
  if (!match) {
    return { error: 'Live match not found.', state: normalized }
  }
  if (match.scope !== 'practice' || match.phase !== 'word-length-selection' || !match.selection) {
    return { error: 'This match is not selecting a practice length.', match, state: normalized }
  }
  if (!isSupportedPracticeWordLength(input.wordLength)) {
    return { error: 'Choose a word length from 2 to 35.', match, state: normalized }
  }
  if (match.selection.resolvedAt) {
    return { error: 'Word length has already been resolved.', match, state: normalized }
  }
  if (input.actorUserId && match.playerUserIds?.[input.playerId] !== input.actorUserId) {
    return { error: 'Only the signed-in player for this seat can choose a word length.', match, state: normalized }
  }
  const now = nowIso(input.now)
  const choice: LiveWordLengthChoice = {
    playerId: input.playerId,
    updatedAt: now,
    wordLength: input.wordLength,
  }
  const choices = [
    ...match.selection.choices.filter((entry) => entry.playerId !== input.playerId),
    choice,
  ].sort((left, right) => left.playerId.localeCompare(right.playerId))
  const updated: LiveMultiplayerMatch = {
    ...match,
    selection: {
      ...match.selection,
      choices,
    },
    updatedAt: now,
  }
  return {
    match: updated,
    state: {
      ...normalized,
      matches: normalized.matches.map((entry) => entry.id === updated.id ? updated : entry),
    },
  }
}

function chooseResolvedLength(choices: readonly LiveWordLengthChoice[], randomSeed: number): {
  readonly candidates: readonly number[]
  readonly selected?: number
} {
  const unique = Array.from(new Set(choices.map((choice) => choice.wordLength))).sort((a, b) => a - b)
  if (unique.length === 0) {
    return { candidates: [] }
  }
  if (unique.length === 1) {
    return { candidates: unique, selected: unique[0] }
  }
  return {
    candidates: unique,
    selected: unique[Math.abs(Math.trunc(randomSeed)) % unique.length],
  }
}

export function resolveLivePracticeWordLength(state: LiveMultiplayerState, input: ResolveLivePracticeWordLengthInput): LiveMultiplayerCommandResult {
  const normalized = normalizeLiveMultiplayerState(state)
  const match = normalized.matches.find((entry) => entry.id === input.matchId)
  if (!match) {
    return { error: 'Live match not found.', state: normalized }
  }
  if (match.scope !== 'practice' || match.phase !== 'word-length-selection' || !match.selection) {
    return { error: 'This match is not selecting a practice length.', match, state: normalized }
  }
  if (match.selection.resolvedAt) {
    return { error: 'Word length has already been resolved.', match, state: normalized }
  }

  const now = nowIso(input.now)
  const selectionExpired = Date.parse(now) >= Date.parse(match.selection.endsAt)
  const bothPlayersChose = match.selection.choices.length >= 2
  if (!selectionExpired && !bothPlayersChose) {
    return { error: 'Waiting for both players or the 1-minute selection deadline.', match, state: normalized }
  }
  if (match.selection.choices.length === 0) {
    const aborted: LiveMultiplayerMatch = {
      ...match,
      abortReason: 'No player chose a word length before the selection deadline.',
      endedAt: now,
      phase: 'aborted',
      selection: {
        ...match.selection,
        resolvedAt: now,
      },
      updatedAt: now,
    }
    return {
      match: aborted,
      state: { ...normalized, matches: normalized.matches.map((entry) => entry.id === aborted.id ? aborted : entry) },
    }
  }

  const resolved = chooseResolvedLength(match.selection.choices, input.randomSeed ?? Date.parse(now))
  if (!resolved.selected) {
    return { error: 'Unable to resolve word length.', match, state: normalized }
  }
  const needsAnimation = resolved.candidates.length > 1
  const selection: LiveWordLengthSelection = {
    ...match.selection,
    animationEndsAt: needsAnimation ? plusMs(now, LIVE_WORD_LENGTH_RANDOMIZE_ANIMATION_MS) : undefined,
    animationStartedAt: needsAnimation ? now : undefined,
    resolvedAt: now,
    selectionCandidates: resolved.candidates,
    selectedWordLength: resolved.selected,
  }
  const updated = needsAnimation
    ? {
        ...match,
        selection,
        updatedAt: now,
      }
    : createCountdownMatch({ ...match, selection }, resolved.selected, now)
  return {
    match: updated,
    state: { ...normalized, matches: normalized.matches.map((entry) => entry.id === updated.id ? updated : entry) },
  }
}

export function completeLiveWordLengthAnimation(state: LiveMultiplayerState, matchId: string, now = new Date().toISOString()): LiveMultiplayerCommandResult {
  const normalized = normalizeLiveMultiplayerState(state)
  const match = normalized.matches.find((entry) => entry.id === matchId)
  if (!match) {
    return { error: 'Live match not found.', state: normalized }
  }
  if (match.phase !== 'word-length-selection' || !match.selection?.selectedWordLength || !match.selection.animationEndsAt) {
    return { error: 'No word-length animation is ready to complete.', match, state: normalized }
  }
  if (Date.parse(now) < Date.parse(match.selection.animationEndsAt)) {
    return { error: 'Word-length animation is still running.', match, state: normalized }
  }
  const updated = createCountdownMatch(match, match.selection.selectedWordLength, now)
  return {
    match: updated,
    state: { ...normalized, matches: normalized.matches.map((entry) => entry.id === updated.id ? updated : entry) },
  }
}

export function startLiveMultiplayerMatch(state: LiveMultiplayerState, matchId: string, now = new Date().toISOString()): LiveMultiplayerCommandResult {
  const normalized = normalizeLiveMultiplayerState(state)
  const match = normalized.matches.find((entry) => entry.id === matchId)
  if (!match) {
    return { error: 'Live match not found.', state: normalized }
  }
  if (match.phase !== 'countdown') {
    return { error: 'This live match is not in countdown.', match, state: normalized }
  }
  if (!match.wordLength) {
    return { error: 'This live match does not have a word length.', match, state: normalized }
  }
  const updated: LiveMultiplayerMatch = {
    ...match,
    phase: 'playing',
    updatedAt: now,
  }
  return {
    match: updated,
    state: { ...normalized, matches: normalized.matches.map((entry) => entry.id === updated.id ? updated : entry) },
  }
}

function getValidGuesses(match: LiveMultiplayerMatch): ReadonlySet<string> {
  if (match.mode === 'og') {
    return match.scope === 'daily'
      ? createDailyMultiplayerOgSetup(dateKeyToLocalDate(match.dailyDateKey ?? getUtcDailyDateKey()), match.difficulty, 'live').validGuesses
      : createPracticeOgSetup(match.wordLength ?? DAILY_WORD_LENGTH, match.seed, match.difficulty).validGuesses
  }
  return match.scope === 'daily'
    ? createDailyMultiplayerGoSetup(dateKeyToLocalDate(match.dailyDateKey ?? getUtcDailyDateKey()), match.difficulty, match.goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT, 'live').validGuesses
    : createPracticeGoSetup(match.wordLength ?? DAILY_WORD_LENGTH, match.seed, match.difficulty, match.goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT).validGuesses
}

function applyGuessToSession(match: LiveMultiplayerMatch, progress: LiveMultiplayerPlayerProgress, guess: string): {
  readonly error?: string
  readonly puzzleIndex?: number
  readonly result?: GuessResult
  readonly serializedSession?: LiveSerializedSession
  readonly status?: GameStatus
} {
  if (!progress.serializedSession) {
    return { error: 'Player session is not ready yet.' }
  }
  if (progress.serializedSession.mode === 'og') {
    const session = restoreOgSession(progress.serializedSession.session, getValidGuesses(match))
    const filled: PuzzleSessionState = { ...session, currentGuess: guess.toLocaleLowerCase('en-US') }
    const next = submitGuess(filled)
    if (next.lastValidation) {
      return { error: next.lastValidation.message }
    }
    const result = next.guesses[next.guesses.length - 1]
    return {
      puzzleIndex: 0,
      result,
      serializedSession: { mode: 'og', session: serializeOgSession(next) },
      status: next.status,
    }
  }

  const session = restoreGoSession(progress.serializedSession.session, getValidGuesses(match))
  const currentPuzzle = session.puzzles[session.currentPuzzleIndex]
  const puzzles = [...session.puzzles]
  puzzles[session.currentPuzzleIndex] = {
    ...currentPuzzle,
    currentGuess: guess.toLocaleLowerCase('en-US'),
  }
  const filled: GoSessionState = { ...session, puzzles }
  const next = submitGoGuess(filled)
  const submittedPuzzle = next.puzzles[session.currentPuzzleIndex]
  if (submittedPuzzle.lastValidation) {
    return { error: submittedPuzzle.lastValidation.message }
  }
  const result = submittedPuzzle.guesses[submittedPuzzle.guesses.length - 1]
  return {
    puzzleIndex: session.currentPuzzleIndex,
    result,
    serializedSession: { mode: 'go', session: serializeGoSession(next) },
    status: next.status,
  }
}

function getWinner(progress: readonly LiveMultiplayerPlayerProgress[], firstPlayerId: LiveMultiplayerPlayerId): LiveMultiplayerPlayerId | undefined {
  const winners = progress.filter((entry) => entry.status === 'won' && entry.completedAt)
  if (winners.length === 0) {
    return undefined
  }
  const sorted = [...winners].sort((left, right) => {
    const byTime = (left.completedAt ?? '').localeCompare(right.completedAt ?? '')
    if (byTime !== 0) {
      return byTime
    }
    if (left.moves.length !== right.moves.length) {
      return left.moves.length - right.moves.length
    }
    return left.playerId === firstPlayerId ? -1 : 1
  })
  return sorted[0]?.playerId
}

export function submitLiveMultiplayerGuess(state: LiveMultiplayerState, input: SubmitLiveMultiplayerGuessInput): LiveMultiplayerCommandResult {
  const normalized = normalizeLiveMultiplayerState(state)
  const match = normalized.matches.find((entry) => entry.id === input.matchId)
  if (!match) {
    return { error: 'Live match not found.', state: normalized }
  }
  if (match.phase !== 'playing') {
    return { error: 'This live match is not accepting guesses.', match, state: normalized }
  }
  const playerId = input.playerId ?? 'player-one'
  if (input.actorUserId && match.playerUserIds?.[playerId] !== input.actorUserId) {
    return { error: 'Only the signed-in player for this seat can submit live guesses.', match, state: normalized }
  }
  const progress = match.playerProgress.find((entry) => entry.playerId === playerId)
  if (!progress) {
    return { error: 'Player progress not found.', match, state: normalized }
  }
  if (progress.status !== 'playing') {
    return { error: 'This player has already finished.', match, state: normalized }
  }
  const now = nowIso(input.now)
  const applied = applyGuessToSession(match, progress, input.guess)
  if (applied.error || !applied.result || !applied.serializedSession || !applied.status || applied.puzzleIndex === undefined) {
    return { error: applied.error ?? 'Unable to submit that guess.', match, state: normalized }
  }
  const appliedStatus = applied.status
  const appliedSerializedSession = applied.serializedSession
  const move: LiveMultiplayerMove = {
    createdAt: now,
    guess: applied.result.guess,
    id: createId('live-move'),
    playerId,
    puzzleIndex: applied.puzzleIndex,
    tiles: applied.result.tiles,
  }
  const nextProgress: readonly LiveMultiplayerPlayerProgress[] = match.playerProgress.map((entry) => entry.playerId === playerId
    ? {
        ...entry,
        completedAt: appliedStatus === 'playing' ? entry.completedAt : now,
        moves: [...entry.moves, move],
        serializedSession: appliedSerializedSession,
        status: appliedStatus,
      }
    : entry)
  const winnerId = getWinner(nextProgress, match.firstPlayerId)
  const allFinished = nextProgress.every((entry) => entry.status !== 'playing')
  const finished = Boolean(winnerId) || allFinished
  const updated: LiveMultiplayerMatch = {
    ...match,
    endedAt: finished ? now : match.endedAt,
    phase: finished ? 'finished' : 'playing',
    playerProgress: nextProgress,
    updatedAt: now,
    winnerId,
  }
  return {
    match: updated,
    state: { ...normalized, matches: normalized.matches.map((entry) => entry.id === updated.id ? updated : entry) },
  }
}

export function forfeitLiveMultiplayerMatch(state: LiveMultiplayerState, input: ForfeitLiveMultiplayerMatchInput): LiveMultiplayerCommandResult {
  const normalized = normalizeLiveMultiplayerState(state)
  const match = normalized.matches.find((entry) => entry.id === input.matchId)
  if (!match) {
    return { error: 'Live match not found.', state: normalized }
  }
  if (isTerminalPhase(match.phase)) {
    return { error: 'This live match is already finished.', match, state: normalized }
  }
  if (!match.playerUserIds?.[input.playerId]) {
    return { error: 'Only a player in this match can forfeit.', match, state: normalized }
  }
  if (input.actorUserId && match.playerUserIds[input.playerId] !== input.actorUserId) {
    return { error: 'Only the signed-in player for this seat can forfeit.', match, state: normalized }
  }

  const now = nowIso(input.now)
  const winnerId = otherPlayerId(input.playerId)
  const nextProgress = match.playerProgress.map((entry) => {
    if (entry.playerId === input.playerId) {
      return { ...entry, completedAt: entry.completedAt ?? now, status: 'lost' as const }
    }
    if (entry.playerId === winnerId) {
      return { ...entry, completedAt: entry.completedAt ?? now, status: 'won' as const }
    }
    return entry
  })
  const updated: LiveMultiplayerMatch = {
    ...match,
    abortReason: `${match.players.find((player) => player.id === input.playerId)?.label ?? input.playerId} forfeited.`,
    endedAt: now,
    phase: 'finished',
    playerProgress: nextProgress,
    updatedAt: now,
    winnerId,
  }
  return {
    match: updated,
    state: { ...normalized, matches: normalized.matches.map((entry) => entry.id === updated.id ? updated : entry) },
  }
}

export function joinLiveMultiplayerMatchAsSpectator(
  state: LiveMultiplayerState,
  input: JoinLiveMultiplayerSpectatorInput,
): LiveMultiplayerCommandResult {
  const normalized = normalizeLiveMultiplayerState(state)
  const match = normalized.matches.find((entry) => entry.id === input.matchId)
  if (!match) {
    return { error: 'Live match not found.', state: normalized }
  }
  if (getViewerLivePlayerId(match, input.userId)) {
    return { error: 'Players already have an active seat in this live match.', match, state: normalized }
  }
  if (match.phase === 'aborted' || match.phase === 'expired') {
    return { error: 'This live match is not available to spectate.', match, state: normalized }
  }

  const now = nowIso(input.now)
  const profile = normalizeMultiplayerProfileSummary(input.profile)
  const existing = getViewerLiveSpectator(match, input.userId)
  const spectator: LiveMultiplayerSpectator = {
    joinedAt: existing?.joinedAt ?? now,
    lastSeenAt: now,
    profile: profile ?? existing?.profile,
    userId: input.userId,
  }
  const updated: LiveMultiplayerMatch = {
    ...match,
    spectators: [
      ...(match.spectators ?? []).filter((entry) => entry.userId !== input.userId),
      spectator,
    ],
    updatedAt: now,
  }
  return {
    match: updated,
    state: {
      ...normalized,
      matches: normalized.matches.map((entry) => entry.id === updated.id ? updated : entry),
    },
  }
}

export function expireStaleDailyLiveMultiplayerMatches(state: LiveMultiplayerState, now = new Date()): LiveMultiplayerState {
  const currentUtcKey = getUtcDailyDateKey(now)
  const nowIsoValue = now.toISOString()
  return {
    ...normalizeLiveMultiplayerState(state),
    matches: normalizeLiveMultiplayerState(state).matches.map((match) => {
      if (match.scope !== 'daily' || isTerminalPhase(match.phase)) {
        return match
      }
      const expiredByDate = Boolean(match.dailyDateKey && match.dailyDateKey < currentUtcKey)
      const expiredByDeadline = Boolean(match.deadlineAt && Date.parse(match.deadlineAt) <= now.getTime())
      if (!expiredByDate && !expiredByDeadline) {
        return match
      }
      return {
        ...match,
        endedAt: match.endedAt ?? nowIsoValue,
        phase: 'expired',
        updatedAt: nowIsoValue,
      }
    }),
  }
}

export function getLiveMultiplayerMatchesForDate(state: LiveMultiplayerState, dateKey: string): readonly LiveMultiplayerMatch[] {
  return normalizeLiveMultiplayerState(state).matches.filter((match) => match.scope === 'daily' && match.dailyDateKey === dateKey)
}

export function hasDailyLiveMultiplayerMatch(state: LiveMultiplayerState, dateKey: string, mode: GameMode): boolean {
  return getLiveMultiplayerMatchesForDate(state, dateKey).some((match) => match.mode === mode)
}

export function getLiveMultiplayerAnswerWords(match: LiveMultiplayerMatch): readonly string[] {
  const progress = match.playerProgress.find((entry) => entry.serializedSession)
  if (!progress?.serializedSession) {
    return []
  }
  if (progress.serializedSession.mode === 'og') {
    return [progress.serializedSession.session.answer]
  }
  return progress.serializedSession.session.puzzles.map((puzzle) => puzzle.answer)
}

export function mergeLiveMultiplayerStates(left: unknown, right: unknown): LiveMultiplayerState {
  const lobbiesById = new Map<string, LiveMultiplayerLobby>()
  for (const lobby of normalizeLiveMultiplayerState(right).lobbies) {
    lobbiesById.set(lobby.id, lobby)
  }
  for (const lobby of normalizeLiveMultiplayerState(left).lobbies) {
    const existing = lobbiesById.get(lobby.id)
    if (!existing || lobby.updatedAt >= existing.updatedAt) {
      lobbiesById.set(lobby.id, lobby)
    }
  }

  const matchesById = new Map<string, LiveMultiplayerMatch>()
  for (const match of normalizeLiveMultiplayerState(right).matches) {
    matchesById.set(match.id, match)
  }
  for (const match of normalizeLiveMultiplayerState(left).matches) {
    const existing = matchesById.get(match.id)
    if (!existing || match.updatedAt >= existing.updatedAt) {
      matchesById.set(match.id, match)
    }
  }

  return {
    lobbies: Array.from(lobbiesById.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    matches: Array.from(matchesById.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
  }
}
