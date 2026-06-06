import { DEFAULT_DIFFICULTY_TIER, normalizeDifficultyTier, type DifficultyTier } from '../data/difficulty'
import { dateKeyToLocalDate, getNextUtcMidnight, getUtcDailyDateKey } from '../daily'
import { DEFAULT_GO_PUZZLE_COUNT, normalizeGoPuzzleCount, type GoPuzzleCount } from '../game/constants'
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
import type { GameMode, GuessResult, PlayScope, TileResult } from '../game/types'
import {
  createDailyMultiplayerGoSetup,
  createDailyMultiplayerOgSetup,
  normalizeMultiplayerProfileMap,
  normalizeMultiplayerProfileSummary,
  type MultiplayerProfileSummary,
} from './dailyMultiplayer'
import type { RatingBucketId } from './rating'

export const MAX_ASYNC_MULTIPLAYER_GAMES = 5

export type AsyncMultiplayerGameStatus = 'waiting' | 'playing' | 'won' | 'lost' | 'expired' | 'cancelled'
export type AsyncMultiplayerPlayerId = 'player-one' | 'player-two'

export interface AsyncMultiplayerPlayer {
  readonly id: AsyncMultiplayerPlayerId
  readonly label: string
}

export interface AsyncMultiplayerMove {
  readonly createdAt: string
  readonly guess: string
  readonly id: string
  readonly playerId: AsyncMultiplayerPlayerId
  readonly puzzleIndex: number
  readonly tiles: readonly TileResult[]
}

export type AsyncSerializedSession =
  | { readonly mode: 'og'; readonly session: SerializedOgSession }
  | { readonly mode: 'go'; readonly session: SerializedGoSession }

export interface AsyncMultiplayerGame {
  readonly createdAt: string
  readonly currentTurn: AsyncMultiplayerPlayerId
  readonly customGameCode?: string
  readonly dailyDateKey?: string
  readonly deadlineAt?: string
  readonly difficulty: DifficultyTier
  readonly endedAt?: string
  readonly goPuzzleCount?: GoPuzzleCount
  readonly id: string
  readonly matchmakingRequestId?: string
  readonly mode: GameMode
  readonly moves: readonly AsyncMultiplayerMove[]
  readonly playerUserIds?: Partial<Record<AsyncMultiplayerPlayerId, string>>
  readonly players: readonly AsyncMultiplayerPlayer[]
  readonly playerProfiles?: Partial<Record<AsyncMultiplayerPlayerId, MultiplayerProfileSummary>>
  readonly ranked?: boolean
  readonly ratingBucket?: RatingBucketId
  readonly scope: PlayScope
  readonly seed: number
  readonly serializedSession: AsyncSerializedSession
  readonly status: AsyncMultiplayerGameStatus
  readonly updatedAt: string
  readonly winnerId?: AsyncMultiplayerPlayerId
  readonly wordLength: number
}

export interface AsyncMultiplayerState {
  readonly games: readonly AsyncMultiplayerGame[]
}

export interface CreateAsyncMultiplayerGameInput {
  readonly createdAt?: string
  readonly customGameCode?: string
  readonly dailyDateKey?: string
  readonly difficulty?: DifficultyTier
  readonly goPuzzleCount?: GoPuzzleCount
  readonly matchmakingRequestId?: string
  readonly mode: GameMode
  readonly playerUserIds?: Partial<Record<AsyncMultiplayerPlayerId, string>>
  readonly playerProfiles?: Partial<Record<AsyncMultiplayerPlayerId, MultiplayerProfileSummary>>
  readonly ranked?: boolean
  readonly ratingBucket?: RatingBucketId
  readonly scope: PlayScope
  readonly seed?: number
  readonly wordLength?: number
}

export interface JoinAsyncMultiplayerGameInput {
  readonly gameId: string
  readonly now?: string
  readonly playerProfile?: MultiplayerProfileSummary
  readonly userId: string
}

export interface SubmitAsyncMultiplayerGuessInput {
  readonly gameId: string
  readonly guess: string
  readonly now?: string
  readonly playerId?: AsyncMultiplayerPlayerId
}

export interface ForfeitAsyncMultiplayerGameInput {
  readonly gameId: string
  readonly now?: string
  readonly playerId: AsyncMultiplayerPlayerId
}

export interface CancelAsyncMultiplayerGameInput {
  readonly gameId: string
  readonly now?: string
  readonly userId: string
}

export interface SubmitAsyncMultiplayerGuessResult {
  readonly error?: string
  readonly game?: AsyncMultiplayerGame
  readonly state: AsyncMultiplayerState
}

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function createEmptyAsyncMultiplayerState(): AsyncMultiplayerState {
  return { games: [] }
}

function nextPlayerId(playerId: AsyncMultiplayerPlayerId): AsyncMultiplayerPlayerId {
  return playerId === 'player-one' ? 'player-two' : 'player-one'
}

function getSessionStatus(serializedSession: AsyncSerializedSession): AsyncMultiplayerGameStatus {
  if (serializedSession.mode === 'og') {
    const setup = createPracticeOgSetup(serializedSession.session.answer.length, 0)
    return restoreOgSession(serializedSession.session, setup.validGuesses).status
  }
  const firstPuzzle = serializedSession.session.puzzles[0]
  const setup = createPracticeGoSetup(firstPuzzle?.answer.length ?? 5, 0, undefined, normalizeGoPuzzleCount(serializedSession.session.puzzles.length))
  return restoreGoSession(serializedSession.session, setup.validGuesses).status
}

function normalizePlayer(value: unknown, fallback: AsyncMultiplayerPlayer): AsyncMultiplayerPlayer {
  if (typeof value !== 'object' || value === null) {
    return fallback
  }
  const record = value as Record<string, unknown>
  return {
    id: record.id === 'player-two' ? 'player-two' : fallback.id,
    label: typeof record.label === 'string' && record.label.trim() ? record.label : fallback.label,
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

function normalizeMove(value: unknown): AsyncMultiplayerMove | undefined {
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
    id: typeof record.id === 'string' ? record.id : createId('move'),
    playerId: record.playerId === 'player-two' ? 'player-two' : 'player-one',
    puzzleIndex: typeof record.puzzleIndex === 'number' ? Math.max(0, Math.trunc(record.puzzleIndex)) : 0,
    tiles: normalizeTiles(record.tiles),
  }
}

function normalizePlayerUserIds(value: unknown): Partial<Record<AsyncMultiplayerPlayerId, string>> | undefined {
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

function normalizeSerializedSession(value: unknown): AsyncSerializedSession | undefined {
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

function normalizeGame(value: unknown): AsyncMultiplayerGame | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }
  const record = value as Record<string, unknown>
  if ((record.mode !== 'og' && record.mode !== 'go') || (record.scope !== 'daily' && record.scope !== 'practice')) {
    return undefined
  }
  const serializedSession = normalizeSerializedSession(record.serializedSession)
  if (!serializedSession || serializedSession.mode !== record.mode) {
    return undefined
  }
  const players = Array.isArray(record.players) ? record.players : []
  const normalizedPlayers: readonly AsyncMultiplayerPlayer[] = [
    normalizePlayer(players[0], { id: 'player-one', label: 'You' }),
    normalizePlayer(players[1], { id: 'player-two', label: 'Rival' }),
  ]
  const status = record.status === 'waiting'
    || record.status === 'won'
    || record.status === 'lost'
    || record.status === 'expired'
    || record.status === 'cancelled'
    ? record.status
    : getSessionStatus(serializedSession)
  const wordLength = serializedSession.mode === 'og'
    ? serializedSession.session.answer.length
    : serializedSession.session.puzzles[0]?.answer.length ?? 5
  const playerProfiles = normalizeMultiplayerProfileMap<AsyncMultiplayerPlayerId>(record.playerProfiles, ['player-one', 'player-two'])
  return {
    createdAt: typeof record.createdAt === 'string' ? record.createdAt : new Date(0).toISOString(),
    currentTurn: record.currentTurn === 'player-two' ? 'player-two' : 'player-one',
    customGameCode: typeof record.customGameCode === 'string' ? record.customGameCode : undefined,
    dailyDateKey: typeof record.dailyDateKey === 'string' ? record.dailyDateKey : undefined,
    deadlineAt: typeof record.deadlineAt === 'string' ? record.deadlineAt : undefined,
    difficulty: normalizeDifficultyTier(record.difficulty),
    endedAt: typeof record.endedAt === 'string' ? record.endedAt : undefined,
    goPuzzleCount: typeof record.goPuzzleCount === 'number' ? normalizeGoPuzzleCount(record.goPuzzleCount) : undefined,
    id: typeof record.id === 'string' ? record.id : createId('async'),
    matchmakingRequestId: typeof record.matchmakingRequestId === 'string' ? record.matchmakingRequestId : undefined,
    mode: record.mode,
    moves: Array.isArray(record.moves) ? record.moves.flatMap((move) => normalizeMove(move) ?? []) : [],
    playerProfiles,
    playerUserIds: normalizePlayerUserIds(record.playerUserIds),
    players: normalizedPlayers.map((player) => ({ ...player, label: profileLabel(playerProfiles?.[player.id], player.label) })),
    ranked: record.ranked === true,
    ratingBucket: typeof record.ratingBucket === 'string' ? record.ratingBucket as RatingBucketId : undefined,
    scope: record.scope,
    seed: typeof record.seed === 'number' ? record.seed : 0,
    serializedSession,
    status,
    updatedAt: typeof record.updatedAt === 'string' ? record.updatedAt : new Date(0).toISOString(),
    winnerId: record.winnerId === 'player-one' || record.winnerId === 'player-two' ? record.winnerId : undefined,
    wordLength: typeof record.wordLength === 'number' ? Math.trunc(record.wordLength) : wordLength,
  }
}

export function normalizeAsyncMultiplayerState(value: unknown): AsyncMultiplayerState {
  if (typeof value !== 'object' || value === null) {
    return createEmptyAsyncMultiplayerState()
  }
  const record = value as Record<string, unknown>
  const games = Array.isArray(record.games) ? record.games.flatMap((game) => normalizeGame(game) ?? []) : []
  return { games }
}

function isActiveAsyncMultiplayerGame(game: AsyncMultiplayerGame): boolean {
  return game.status === 'waiting' || game.status === 'playing'
}

function asyncGameBelongsToViewer(game: AsyncMultiplayerGame, userId: string | undefined): boolean {
  if (!userId) {
    return true
  }
  const playerOne = game.playerUserIds?.['player-one']
  const playerTwo = game.playerUserIds?.['player-two']
  if (!playerOne && !playerTwo) {
    return true
  }
  return playerOne === userId || playerTwo === userId
}

export function getActiveAsyncMultiplayerGames(state: AsyncMultiplayerState, userId?: string): readonly AsyncMultiplayerGame[] {
  return normalizeAsyncMultiplayerState(state).games.filter((game) => isActiveAsyncMultiplayerGame(game) && asyncGameBelongsToViewer(game, userId))
}

export function canCreateAsyncMultiplayerGame(state: AsyncMultiplayerState, userId?: string): boolean {
  return getActiveAsyncMultiplayerGames(state, userId).length < MAX_ASYNC_MULTIPLAYER_GAMES
}

function createInitialSession(input: Required<Pick<CreateAsyncMultiplayerGameInput, 'difficulty' | 'goPuzzleCount' | 'mode' | 'scope' | 'seed' | 'wordLength'>> & { readonly dailyDateKey?: string }): AsyncSerializedSession {
  if (input.mode === 'og') {
    const setup = input.scope === 'daily'
      ? createDailyMultiplayerOgSetup(dateKeyToLocalDate(input.dailyDateKey ?? getUtcDailyDateKey()), input.difficulty, 'async')
      : createPracticeOgSetup(input.wordLength, input.seed, input.difficulty)
    return { mode: 'og', session: serializeOgSession(createOgSession(setup)) }
  }

  const setup = input.scope === 'daily'
    ? createDailyMultiplayerGoSetup(dateKeyToLocalDate(input.dailyDateKey ?? getUtcDailyDateKey()), input.difficulty, input.goPuzzleCount, 'async')
    : createPracticeGoSetup(input.wordLength, input.seed, input.difficulty, input.goPuzzleCount)
  return { mode: 'go', session: serializeGoSession(createGoSession(setup)) }
}

export function createAsyncMultiplayerGame(input: CreateAsyncMultiplayerGameInput): AsyncMultiplayerGame {
  const createdAt = input.createdAt ?? new Date().toISOString()
  const dailyDateKey = input.scope === 'daily' ? input.dailyDateKey ?? getUtcDailyDateKey(new Date(createdAt)) : undefined
  const isOnlineWaitingGame = Boolean(input.playerUserIds?.['player-one'] && !input.playerUserIds?.['player-two'])
  const playerProfiles = input.playerProfiles
  const normalizedInput = {
    difficulty: input.difficulty ?? DEFAULT_DIFFICULTY_TIER,
    goPuzzleCount: input.goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT,
    mode: input.mode,
    scope: input.scope,
    seed: input.seed ?? Date.parse(createdAt),
    wordLength: input.scope === 'daily' ? 5 : input.wordLength ?? 5,
    dailyDateKey,
  }
  return {
    createdAt,
    currentTurn: 'player-one',
    customGameCode: input.customGameCode,
    dailyDateKey,
    deadlineAt: input.scope === 'daily' ? getNextUtcMidnight(new Date(createdAt)).toISOString() : undefined,
    difficulty: normalizedInput.difficulty,
    goPuzzleCount: input.mode === 'go' ? normalizedInput.goPuzzleCount : undefined,
    id: createId(`async-${input.scope}-${input.mode}`),
    matchmakingRequestId: input.matchmakingRequestId,
    mode: input.mode,
    moves: [],
    playerProfiles,
    playerUserIds: input.playerUserIds,
    players: [
      { id: 'player-one', label: profileLabel(playerProfiles?.['player-one'], isOnlineWaitingGame ? 'Host' : 'You') },
      { id: 'player-two', label: profileLabel(playerProfiles?.['player-two'], 'Rival') },
    ],
    ranked: input.ranked === true,
    ratingBucket: input.ratingBucket,
    scope: input.scope,
    seed: normalizedInput.seed,
    serializedSession: createInitialSession(normalizedInput),
    status: isOnlineWaitingGame ? 'waiting' : 'playing',
    updatedAt: createdAt,
    wordLength: normalizedInput.wordLength,
  }
}

export function getViewerAsyncPlayerId(game: AsyncMultiplayerGame, userId: string | undefined): AsyncMultiplayerPlayerId | undefined {
  if (!userId) {
    return undefined
  }
  if (game.playerUserIds?.['player-one'] === userId) {
    return 'player-one'
  }
  if (game.playerUserIds?.['player-two'] === userId) {
    return 'player-two'
  }
  return undefined
}

export function canViewerJoinAsyncGame(game: AsyncMultiplayerGame, userId: string | undefined): boolean {
  return Boolean(
    userId
      && game.status === 'waiting'
      && game.playerUserIds?.['player-one']
      && game.playerUserIds['player-one'] !== userId
      && !game.playerUserIds?.['player-two'],
  )
}

export function canViewerCancelAsyncGame(game: AsyncMultiplayerGame, userId: string | undefined): boolean {
  return Boolean(
    userId
      && game.status === 'waiting'
      && game.playerUserIds?.['player-one'] === userId
      && !game.playerUserIds?.['player-two'],
  )
}

export function hasDailyAsyncMultiplayerParticipation(
  state: AsyncMultiplayerState,
  dateKey: string | undefined,
  mode: GameMode,
  userId: string | undefined,
): boolean {
  if (!dateKey || !userId) {
    return false
  }
  return normalizeAsyncMultiplayerState(state).games.some((game) => (
    game.scope === 'daily'
    && game.dailyDateKey === dateKey
    && game.mode === mode
    && !(game.status === 'cancelled' && game.playerUserIds?.['player-one'] === userId && !game.playerUserIds?.['player-two'])
    && (game.playerUserIds?.['player-one'] === userId || game.playerUserIds?.['player-two'] === userId)
  ))
}

export function joinAsyncMultiplayerGame(
  state: AsyncMultiplayerState,
  input: JoinAsyncMultiplayerGameInput,
): SubmitAsyncMultiplayerGuessResult {
  const normalized = normalizeAsyncMultiplayerState(state)
  const game = normalized.games.find((entry) => entry.id === input.gameId)
  if (!game) {
    return { error: 'Multiplayer game not found.', state: normalized }
  }
  if (!canViewerJoinAsyncGame(game, input.userId)) {
    return { error: 'This async match is not available to join.', game, state: normalized }
  }
  if (!canCreateAsyncMultiplayerGame(
    { games: normalized.games.filter((entry) => entry.id !== game.id) },
    input.userId,
  )) {
    return { error: 'You already have five active async multiplayer games.', game, state: normalized }
  }
  if (game.scope === 'daily' && hasDailyAsyncMultiplayerParticipation(
    { games: normalized.games.filter((entry) => entry.id !== game.id) },
    game.dailyDateKey,
    game.mode,
    input.userId,
  )) {
    return { error: 'You already claimed today\'s Daily Async game for this mode.', game, state: normalized }
  }

  const now = input.now ?? new Date().toISOString()
  const playerProfile = normalizeMultiplayerProfileSummary(input.playerProfile)
  const playerProfiles = playerProfile
    ? { ...game.playerProfiles, 'player-two': playerProfile }
    : game.playerProfiles
  const updated: AsyncMultiplayerGame = {
    ...game,
    playerProfiles,
    playerUserIds: {
      ...game.playerUserIds,
      'player-two': input.userId,
    },
    players: game.players.map((player) => player.id === 'player-two' ? { ...player, label: profileLabel(playerProfile, 'Rival') } : player),
    status: 'playing',
    updatedAt: now,
  }
  return {
    game: updated,
    state: {
      games: normalized.games.map((entry) => entry.id === updated.id ? updated : entry),
    },
  }
}

export function addAsyncMultiplayerGame(state: AsyncMultiplayerState, game: AsyncMultiplayerGame): AsyncMultiplayerState {
  const normalized = normalizeAsyncMultiplayerState(state)
  const ownerUserId = game.playerUserIds?.['player-one']
  if (!canCreateAsyncMultiplayerGame(normalized, ownerUserId)) {
    return normalized
  }
  if (
    game.scope === 'daily'
    && ownerUserId
    && hasDailyAsyncMultiplayerParticipation(normalized, game.dailyDateKey, game.mode, ownerUserId)
  ) {
    return normalized
  }
  return {
    games: [game, ...normalized.games],
  }
}

export function cancelAsyncMultiplayerGame(state: AsyncMultiplayerState, input: CancelAsyncMultiplayerGameInput): SubmitAsyncMultiplayerGuessResult {
  const normalized = normalizeAsyncMultiplayerState(state)
  const game = normalized.games.find((entry) => entry.id === input.gameId)
  if (!game) {
    return { error: 'Multiplayer game not found.', state: normalized }
  }
  if (!canViewerCancelAsyncGame(game, input.userId)) {
    return { error: 'Only the creator can cancel an unjoined async lobby.', game, state: normalized }
  }

  const now = input.now ?? new Date().toISOString()
  const updated: AsyncMultiplayerGame = {
    ...game,
    endedAt: now,
    status: 'cancelled',
    updatedAt: now,
  }
  return {
    game: updated,
    state: {
      games: normalized.games.map((entry) => entry.id === updated.id ? updated : entry),
    },
  }
}

function getValidGuesses(game: AsyncMultiplayerGame): ReadonlySet<string> {
  if (game.mode === 'og') {
    return game.scope === 'daily'
      ? createDailyMultiplayerOgSetup(dateKeyToLocalDate(game.dailyDateKey ?? getUtcDailyDateKey()), game.difficulty, 'async').validGuesses
      : createPracticeOgSetup(game.wordLength, game.seed, game.difficulty).validGuesses
  }
  return game.scope === 'daily'
    ? createDailyMultiplayerGoSetup(dateKeyToLocalDate(game.dailyDateKey ?? getUtcDailyDateKey()), game.difficulty, game.goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT, 'async').validGuesses
    : createPracticeGoSetup(game.wordLength, game.seed, game.difficulty, game.goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT).validGuesses
}

function applyGuessToSession(game: AsyncMultiplayerGame, guess: string): { readonly result?: GuessResult; readonly serializedSession?: AsyncSerializedSession; readonly status?: AsyncMultiplayerGameStatus; readonly error?: string } {
  if (game.serializedSession.mode === 'og') {
    const session = restoreOgSession(game.serializedSession.session, getValidGuesses(game))
    const filled: PuzzleSessionState = { ...session, currentGuess: guess.toLocaleLowerCase('en-US') }
    const next = submitGuess(filled)
    if (next.lastValidation) {
      return { error: next.lastValidation.message }
    }
    const result = next.guesses[next.guesses.length - 1]
    return {
      result,
      serializedSession: { mode: 'og', session: serializeOgSession(next) },
      status: next.status,
    }
  }

  const session = restoreGoSession(game.serializedSession.session, getValidGuesses(game))
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
    result,
    serializedSession: { mode: 'go', session: serializeGoSession(next) },
    status: next.status,
  }
}

export function submitAsyncMultiplayerGuess(state: AsyncMultiplayerState, input: SubmitAsyncMultiplayerGuessInput): SubmitAsyncMultiplayerGuessResult {
  const normalized = normalizeAsyncMultiplayerState(state)
  const game = normalized.games.find((entry) => entry.id === input.gameId)
  if (!game) {
    return { error: 'Multiplayer game not found.', state: normalized }
  }
  if (game.status === 'waiting') {
    return { error: 'Waiting for another player to join this async match.', game, state: normalized }
  }
  if (game.status !== 'playing') {
    return { error: 'This multiplayer game is already finished.', game, state: normalized }
  }
  const playerId = input.playerId ?? game.currentTurn
  if (playerId !== game.currentTurn) {
    return { error: "It is not this player's turn.", game, state: normalized }
  }

  const now = input.now ?? new Date().toISOString()
  const applied = applyGuessToSession(game, input.guess)
  if (applied.error || !applied.result || !applied.serializedSession || !applied.status) {
    return { error: applied.error ?? 'Unable to submit that guess.', game, state: normalized }
  }

  const move: AsyncMultiplayerMove = {
    createdAt: now,
    guess: applied.result.guess,
    id: createId('move'),
    playerId,
    puzzleIndex: game.serializedSession.mode === 'go' ? game.serializedSession.session.currentPuzzleIndex : 0,
    tiles: applied.result.tiles,
  }
  const status = applied.status
  const updated: AsyncMultiplayerGame = {
    ...game,
    currentTurn: status === 'playing' ? nextPlayerId(playerId) : game.currentTurn,
    endedAt: status === 'playing' ? undefined : now,
    moves: [...game.moves, move],
    serializedSession: applied.serializedSession,
    status,
    updatedAt: now,
    winnerId: status === 'won' ? playerId : undefined,
  }

  return {
    game: updated,
    state: {
      games: normalized.games.map((entry) => entry.id === updated.id ? updated : entry),
    },
  }
}

export function forfeitAsyncMultiplayerGame(state: AsyncMultiplayerState, input: ForfeitAsyncMultiplayerGameInput): SubmitAsyncMultiplayerGuessResult {
  const normalized = normalizeAsyncMultiplayerState(state)
  const game = normalized.games.find((entry) => entry.id === input.gameId)
  if (!game) {
    return { error: 'Multiplayer game not found.', state: normalized }
  }
  if (game.status !== 'waiting' && game.status !== 'playing') {
    return { error: 'This multiplayer game is already finished.', game, state: normalized }
  }
  if (!game.playerUserIds?.[input.playerId]) {
    return { error: 'Only a player in this match can forfeit.', game, state: normalized }
  }

  const now = input.now ?? new Date().toISOString()
  const opponentId = nextPlayerId(input.playerId)
  const winnerId = game.playerUserIds?.[opponentId] ? opponentId : undefined
  const updated: AsyncMultiplayerGame = {
    ...game,
    endedAt: now,
    status: 'lost',
    updatedAt: now,
    winnerId,
  }
  return {
    game: updated,
    state: {
      games: normalized.games.map((entry) => entry.id === updated.id ? updated : entry),
    },
  }
}

export function expireStaleDailyMultiplayerGames(state: AsyncMultiplayerState, now = new Date()): AsyncMultiplayerState {
  const currentUtcKey = getUtcDailyDateKey(now)
  const nowIso = now.toISOString()
  return {
    games: normalizeAsyncMultiplayerState(state).games.map((game) => {
      if (game.scope !== 'daily' || (game.status !== 'playing' && game.status !== 'waiting')) {
        return game
      }
      const expiredByDate = Boolean(game.dailyDateKey && game.dailyDateKey < currentUtcKey)
      const expiredByDeadline = Boolean(game.deadlineAt && Date.parse(game.deadlineAt) <= now.getTime())
      if (!expiredByDate && !expiredByDeadline) {
        return game
      }
      return {
        ...game,
        endedAt: game.endedAt ?? nowIso,
        status: 'expired',
        updatedAt: nowIso,
      }
    }),
  }
}

export function getAsyncMultiplayerGamesForDate(state: AsyncMultiplayerState, dateKey: string): readonly AsyncMultiplayerGame[] {
  return normalizeAsyncMultiplayerState(state).games.filter((game) => game.scope === 'daily' && game.dailyDateKey === dateKey)
}

export function hasDailyMultiplayerGame(state: AsyncMultiplayerState, dateKey: string, mode: GameMode): boolean {
  return getAsyncMultiplayerGamesForDate(state, dateKey).some((game) => game.mode === mode)
}

export function getAsyncMultiplayerAnswerWords(game: AsyncMultiplayerGame): readonly string[] {
  if (game.serializedSession.mode === 'og') {
    return [game.serializedSession.session.answer]
  }
  return game.serializedSession.session.puzzles.map((puzzle) => puzzle.answer)
}

export function mergeAsyncMultiplayerStates(left: unknown, right: unknown): AsyncMultiplayerState {
  const gamesById = new Map<string, AsyncMultiplayerGame>()
  for (const game of normalizeAsyncMultiplayerState(right).games) {
    gamesById.set(game.id, game)
  }
  for (const game of normalizeAsyncMultiplayerState(left).games) {
    const existing = gamesById.get(game.id)
    if (!existing || game.updatedAt >= existing.updatedAt) {
      gamesById.set(game.id, game)
    }
  }
  return {
    games: Array.from(gamesById.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
  }
}
