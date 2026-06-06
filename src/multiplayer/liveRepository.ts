import type { BrrrdleSupabaseClient } from '../account/supabaseClient'
import {
  createEmptyLiveMultiplayerState,
  getViewerLivePlayerId,
  joinLiveMultiplayerMatchAsSpectator,
  normalizeLiveMultiplayerState,
  type LiveMultiplayerLobby,
  type LiveMultiplayerMatch,
  type LiveMultiplayerMatchPhase,
  type LiveMultiplayerPlayerId,
  type LiveMultiplayerPlayerProgress,
  type LiveMultiplayerSpectator,
  type LiveMultiplayerState,
  type LiveWordLengthChoice,
  type LiveWordLengthSelection,
} from './liveMultiplayer'
import { normalizeMultiplayerProfileSummary, type MultiplayerProfileSummary } from './dailyMultiplayer'

export interface LiveMultiplayerRepositorySnapshot {
  readonly serverNow: string
  readonly state: LiveMultiplayerState
  readonly version: number
}

export interface LiveMultiplayerRepository {
  readonly getServerNow: () => Promise<string>
  readonly joinSpectator: (matchId: string, input: { readonly profile?: MultiplayerProfileSummary; readonly userId: string }) => Promise<LiveMultiplayerRepositorySnapshot>
  readonly load: () => Promise<LiveMultiplayerRepositorySnapshot>
  readonly save: (state: LiveMultiplayerState, expectedVersion?: number) => Promise<LiveMultiplayerRepositorySnapshot>
  readonly subscribe: (listener: (snapshot: LiveMultiplayerRepositorySnapshot) => void) => () => void
}

export const LIVE_MULTIPLAYER_STORAGE_KEY = 'brrrdle:live-multiplayer:v1'

export interface KeyValueStorage {
  readonly getItem: (key: string) => string | null
  readonly removeItem?: (key: string) => void
  readonly setItem: (key: string, value: string) => void
}

function getBrowserStorage(): KeyValueStorage | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }
  return window.localStorage
}

function createSnapshot(state: LiveMultiplayerState, version: number, now = new Date().toISOString()): LiveMultiplayerRepositorySnapshot {
  return {
    serverNow: now,
    state: normalizeLiveMultiplayerState(state),
    version,
  }
}

export function loadLiveMultiplayerState(storage: KeyValueStorage | undefined = getBrowserStorage()): LiveMultiplayerState {
  const raw = storage?.getItem(LIVE_MULTIPLAYER_STORAGE_KEY)
  if (!raw) {
    return createEmptyLiveMultiplayerState()
  }
  try {
    return normalizeLiveMultiplayerState(JSON.parse(raw) as unknown)
  } catch {
    return createEmptyLiveMultiplayerState()
  }
}

export function saveLiveMultiplayerState(state: LiveMultiplayerState, storage: KeyValueStorage | undefined = getBrowserStorage()): void {
  storage?.setItem(LIVE_MULTIPLAYER_STORAGE_KEY, JSON.stringify(normalizeLiveMultiplayerState(state)))
}

export function createMemoryLiveMultiplayerRepository(initialState: unknown = createEmptyLiveMultiplayerState()): LiveMultiplayerRepository {
  let snapshot = createSnapshot(normalizeLiveMultiplayerState(initialState), 0)
  const listeners = new Set<(next: LiveMultiplayerRepositorySnapshot) => void>()
  const publish = () => {
    for (const listener of listeners) {
      listener(snapshot)
    }
  }

  return {
    getServerNow: async () => new Date().toISOString(),
    joinSpectator: async (matchId, input) => {
      const result = joinLiveMultiplayerMatchAsSpectator(snapshot.state, { matchId, profile: input.profile, userId: input.userId })
      if (result.error) {
        throw new Error(result.error)
      }
      snapshot = createSnapshot(result.state, snapshot.version + 1)
      publish()
      return snapshot
    },
    load: async () => snapshot,
    save: async (state, expectedVersion) => {
      if (expectedVersion !== undefined && expectedVersion !== snapshot.version) {
        throw new Error('Live multiplayer repository version conflict.')
      }
      snapshot = createSnapshot(state, snapshot.version + 1)
      publish()
      return snapshot
    },
    subscribe: (listener) => {
      listeners.add(listener)
      listener(snapshot)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

export function createLocalStorageLiveMultiplayerRepository(storage: KeyValueStorage | undefined = getBrowserStorage()): LiveMultiplayerRepository {
  let snapshot = createSnapshot(loadLiveMultiplayerState(storage), 0)
  const listeners = new Set<(next: LiveMultiplayerRepositorySnapshot) => void>()
  const publish = () => {
    saveLiveMultiplayerState(snapshot.state, storage)
    for (const listener of listeners) {
      listener(snapshot)
    }
  }

  return {
    getServerNow: async () => new Date().toISOString(),
    joinSpectator: async (matchId, input) => {
      const result = joinLiveMultiplayerMatchAsSpectator(snapshot.state, { matchId, profile: input.profile, userId: input.userId })
      if (result.error) {
        throw new Error(result.error)
      }
      snapshot = createSnapshot(result.state, snapshot.version + 1)
      publish()
      return snapshot
    },
    load: async () => snapshot,
    save: async (state, expectedVersion) => {
      if (expectedVersion !== undefined && expectedVersion !== snapshot.version) {
        throw new Error('Live multiplayer repository version conflict.')
      }
      snapshot = createSnapshot(state, snapshot.version + 1)
      publish()
      return snapshot
    },
    subscribe: (listener) => {
      listeners.add(listener)
      listener(snapshot)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

export interface SupabaseLiveMultiplayerRepositoryOptions {
  readonly client: BrrrdleSupabaseClient
  readonly userId: string
}

interface LiveLobbyRow {
  readonly created_at?: string
  readonly custom_game_code?: string | null
  readonly daily_date_key?: string | null
  readonly difficulty?: string
  readonly go_puzzle_count?: number | null
  readonly host_user_id?: string
  readonly host_profile?: unknown
  readonly id?: string
  readonly matchmaking_request_id?: string | null
  readonly match_id?: string | null
  readonly mode?: string
  readonly ranked?: boolean
  readonly rating_bucket?: string | null
  readonly scope?: string
  readonly status?: string
  readonly updated_at?: string
}

interface LiveMatchRow {
  readonly created_at?: string
  readonly id?: string
  readonly projection?: unknown
  readonly updated_at?: string
}

interface LiveSpectatorRow {
  readonly joined_at?: string
  readonly last_seen_at?: string | null
  readonly match_id?: string
  readonly profile?: unknown
  readonly user_id?: string
}

function lobbyToRow(lobby: LiveMultiplayerLobby, userId: string) {
  return {
    created_at: lobby.createdAt,
    custom_game_code: lobby.customGameCode ?? null,
    daily_date_key: lobby.dailyDateKey ?? null,
    difficulty: lobby.difficulty,
    go_puzzle_count: lobby.goPuzzleCount ?? null,
    host_profile: lobby.hostProfile ?? null,
    host_user_id: lobby.hostUserId ?? userId,
    id: lobby.id,
    matchmaking_request_id: lobby.matchmakingRequestId ?? null,
    match_id: lobby.matchId ?? null,
    mode: lobby.mode,
    ranked: lobby.ranked === true,
    rating_bucket: lobby.ratingBucket ?? null,
    scope: lobby.scope,
    status: lobby.status,
    updated_at: lobby.updatedAt,
  }
}

function rowToLobby(row: LiveLobbyRow): LiveMultiplayerLobby | undefined {
  if (!row.id || row.mode !== 'og' && row.mode !== 'go' || row.scope !== 'practice' && row.scope !== 'daily') {
    return undefined
  }
  return {
    createdAt: row.created_at ?? new Date(0).toISOString(),
    customGameCode: row.custom_game_code ?? undefined,
    dailyDateKey: row.daily_date_key ?? undefined,
    difficulty: row.difficulty,
    goPuzzleCount: row.go_puzzle_count ?? undefined,
    hostPlayerId: 'player-one',
    hostProfile: normalizeMultiplayerProfileSummary(row.host_profile),
    hostUserId: row.host_user_id,
    id: row.id,
    matchmakingRequestId: row.matchmaking_request_id ?? undefined,
    matchId: row.match_id ?? undefined,
    mode: row.mode,
    ranked: row.ranked === true,
    ratingBucket: row.rating_bucket ?? undefined,
    scope: row.scope,
    status: row.status,
    updatedAt: row.updated_at ?? new Date(0).toISOString(),
  } as LiveMultiplayerLobby
}

function matchToRow(match: LiveMultiplayerMatch) {
  return {
    countdown_ends_at: match.countdownEndsAt ?? null,
    created_at: match.createdAt,
    custom_game_code: match.customGameCode ?? null,
    daily_date_key: match.dailyDateKey ?? null,
    deadline_at: match.deadlineAt ?? null,
    difficulty: match.difficulty,
    ended_at: match.endedAt ?? null,
    first_player_id: match.firstPlayerId,
    go_puzzle_count: match.goPuzzleCount ?? null,
    id: match.id,
    lobby_id: match.lobbyId ?? null,
    matchmaking_request_id: match.matchmakingRequestId ?? null,
    mode: match.mode,
    phase: match.phase,
    projection: match,
    ranked: match.ranked === true,
    rating_bucket: match.ratingBucket ?? null,
    scope: match.scope,
    selected_word_length: match.wordLength ?? null,
    updated_at: match.updatedAt,
    winner_player_id: match.winnerId ?? null,
  }
}

function rowToMatch(row: LiveMatchRow): LiveMultiplayerMatch | undefined {
  return normalizeLiveMultiplayerState({ lobbies: [], matches: [row.projection] }).matches[0]
}

function parseTime(value: string | undefined): number {
  if (!value) {
    return 0
  }
  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function maxIso(left: string | undefined, right: string | undefined): string | undefined {
  if (!left) {
    return right
  }
  if (!right) {
    return left
  }
  return parseTime(left) >= parseTime(right) ? left : right
}

function maxIsoMany(values: readonly (string | undefined)[]): string | undefined {
  return values.reduce<string | undefined>((current, value) => maxIso(current, value), undefined)
}

function getLivePhaseRank(phase: LiveMultiplayerMatchPhase): number {
  switch (phase) {
    case 'word-length-selection':
      return 0
    case 'countdown':
      return 1
    case 'playing':
      return 2
    case 'finished':
    case 'aborted':
    case 'expired':
      return 3
  }
}

function isTerminalLivePhase(phase: LiveMultiplayerMatchPhase): boolean {
  return phase === 'finished' || phase === 'aborted' || phase === 'expired'
}

function compareProgress(left: LiveMultiplayerPlayerProgress | undefined, right: LiveMultiplayerPlayerProgress | undefined): number {
  if (!left && !right) {
    return 0
  }
  if (!left) {
    return -1
  }
  if (!right) {
    return 1
  }
  if (left.moves.length !== right.moves.length) {
    return left.moves.length - right.moves.length
  }
  const leftHasSession = Boolean(left.serializedSession)
  const rightHasSession = Boolean(right.serializedSession)
  if (leftHasSession !== rightHasSession) {
    return leftHasSession ? 1 : -1
  }
  const leftCompleted = parseTime(left.completedAt)
  const rightCompleted = parseTime(right.completedAt)
  if (leftCompleted !== rightCompleted) {
    return leftCompleted - rightCompleted
  }
  const statusRank = (status: LiveMultiplayerPlayerProgress['status']) => status === 'playing' ? 0 : status === 'lost' ? 1 : 2
  return statusRank(left.status) - statusRank(right.status)
}

function pickProgress(
  remote: LiveMultiplayerPlayerProgress | undefined,
  local: LiveMultiplayerPlayerProgress | undefined,
  preferLocalOnTie: boolean,
): LiveMultiplayerPlayerProgress | undefined {
  const comparison = compareProgress(local, remote)
  if (comparison > 0 || (preferLocalOnTie && comparison === 0 && local)) {
    return local
  }
  return remote ?? local
}

function mergeWordLengthChoices(
  remoteChoices: readonly LiveWordLengthChoice[] = [],
  localChoices: readonly LiveWordLengthChoice[] = [],
): readonly LiveWordLengthChoice[] {
  const choices = new Map<LiveMultiplayerPlayerId, LiveWordLengthChoice>()
  for (const choice of remoteChoices) {
    choices.set(choice.playerId, choice)
  }
  for (const choice of localChoices) {
    const existing = choices.get(choice.playerId)
    if (!existing || parseTime(choice.updatedAt) >= parseTime(existing.updatedAt)) {
      choices.set(choice.playerId, choice)
    }
  }
  return (['player-one', 'player-two'] as const).flatMap((playerId) => choices.get(playerId) ?? [])
}

function mergeWordLengthSelection(
  remote: LiveWordLengthSelection | undefined,
  local: LiveWordLengthSelection | undefined,
): LiveWordLengthSelection | undefined {
  if (!remote) {
    return local
  }
  if (!local) {
    return remote
  }
  return {
    ...remote,
    ...local,
    animationEndsAt: maxIso(remote.animationEndsAt, local.animationEndsAt),
    animationStartedAt: maxIso(remote.animationStartedAt, local.animationStartedAt),
    choices: mergeWordLengthChoices(remote.choices, local.choices),
    endsAt: maxIso(remote.endsAt, local.endsAt),
    resolvedAt: maxIso(remote.resolvedAt, local.resolvedAt),
    selectedWordLength: local.selectedWordLength ?? remote.selectedWordLength,
    selectionCandidates: local.selectionCandidates ?? remote.selectionCandidates,
  }
}

function mergePlayerEntryAt(
  remote: LiveMultiplayerMatch['playerEntryAt'],
  local: LiveMultiplayerMatch['playerEntryAt'],
): LiveMultiplayerMatch['playerEntryAt'] {
  const merged = {
    'player-one': maxIso(remote?.['player-one'], local?.['player-one']),
    'player-two': maxIso(remote?.['player-two'], local?.['player-two']),
  }
  return merged['player-one'] || merged['player-two'] ? merged : undefined
}

function getMergedWinner(
  progress: readonly LiveMultiplayerPlayerProgress[],
  firstPlayerId: LiveMultiplayerPlayerId,
): LiveMultiplayerPlayerId | undefined {
  const winners = progress.filter((entry) => entry.status === 'won')
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

function chooseBaseMatch(remote: LiveMultiplayerMatch, local: LiveMultiplayerMatch): LiveMultiplayerMatch {
  const remoteRank = getLivePhaseRank(remote.phase)
  const localRank = getLivePhaseRank(local.phase)
  if (localRank > remoteRank) {
    return local
  }
  if (remoteRank > localRank) {
    return remote
  }
  return parseTime(local.updatedAt) >= parseTime(remote.updatedAt) ? local : remote
}

function mergeLiveMatchForSave(
  remote: LiveMultiplayerMatch,
  local: LiveMultiplayerMatch,
  userId: string,
): LiveMultiplayerMatch {
  const actorPlayerId = getViewerLivePlayerId(local, userId) ?? getViewerLivePlayerId(remote, userId)
  const base = chooseBaseMatch(remote, local)
  const remoteProgress = new Map(remote.playerProgress.map((entry) => [entry.playerId, entry]))
  const localProgress = new Map(local.playerProgress.map((entry) => [entry.playerId, entry]))
  const playerProgress = (['player-one', 'player-two'] as const).flatMap((playerId) => {
    const progress = pickProgress(remoteProgress.get(playerId), localProgress.get(playerId), playerId === actorPlayerId)
    return progress ? [progress] : []
  })
  const selection = mergeWordLengthSelection(remote.selection, local.selection)
  const winnerId = isTerminalLivePhase(base.phase)
    ? base.winnerId
    : getMergedWinner(playerProgress, base.firstPlayerId) ?? base.winnerId
  const allFinished = playerProgress.length > 0 && playerProgress.every((entry) => entry.status !== 'playing')
  const phase = isTerminalLivePhase(base.phase)
    ? base.phase
    : (winnerId || allFinished) && base.phase === 'playing'
      ? 'finished'
      : base.phase
  const endedAt = phase === 'finished'
    ? base.endedAt ?? maxIsoMany(playerProgress.map((entry) => entry.completedAt)) ?? maxIso(remote.endedAt, local.endedAt)
    : maxIso(remote.endedAt, local.endedAt)
  const normalized = normalizeLiveMultiplayerState({
    lobbies: [],
    matches: [{
      ...base,
      endedAt,
      phase,
      playerEntryAt: mergePlayerEntryAt(remote.playerEntryAt, local.playerEntryAt),
      playerProgress,
      playerProfiles: {
        ...remote.playerProfiles,
        ...local.playerProfiles,
      },
      players: base.players,
      playerUserIds: {
        ...remote.playerUserIds,
        ...local.playerUserIds,
      },
      selection,
      spectators: [
        ...(remote.spectators ?? []),
        ...(local.spectators ?? []),
      ],
      updatedAt: maxIso(remote.updatedAt, local.updatedAt) ?? base.updatedAt,
      winnerId,
      wordLength: local.wordLength ?? remote.wordLength ?? base.wordLength,
    }],
  }).matches[0]
  return normalized ?? local
}

function liveMatchesEqual(left: LiveMultiplayerMatch, right: LiveMultiplayerMatch): boolean {
  return JSON.stringify(left) === JSON.stringify(right)
}

async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => globalThis.setTimeout(resolve, ms))
}

async function loadExistingLiveMatches(
  client: BrrrdleSupabaseClient,
  matchIds: readonly string[],
): Promise<Map<string, LiveMultiplayerMatch>> {
  if (matchIds.length === 0) {
    return new Map()
  }
  const { data, error } = await client
    .from('live_matches')
    .select('id, projection')
    .in('id', matchIds)
  if (error) {
    throw new Error(`Unable to inspect existing live matches: ${error.message}`)
  }
  const matches = new Map<string, LiveMultiplayerMatch>()
  if (Array.isArray(data)) {
    for (const row of data) {
      const match = rowToMatch(row as LiveMatchRow)
      if (match) {
        matches.set(match.id, match)
      }
    }
  }
  return matches
}

async function reconcileLiveMatchWrites(
  client: BrrrdleSupabaseClient,
  localMatches: readonly LiveMultiplayerMatch[],
  userId: string,
): Promise<readonly LiveMultiplayerMatch[]> {
  if (localMatches.length === 0) {
    return localMatches
  }

  let reconciled = [...localMatches]
  for (const delayMs of [75, 175]) {
    await wait(delayMs)
    const latest = await loadExistingLiveMatches(client, reconciled.map((match) => match.id))
    const next = reconciled.map((match) => {
      const remote = latest.get(match.id)
      return remote ? mergeLiveMatchForSave(remote, match, userId) : match
    })
    const changed = next.filter((match, index) => {
      const remote = latest.get(match.id)
      return remote && !liveMatchesEqual(remote, match) && !liveMatchesEqual(remote, next[index] ?? match)
    })
    if (changed.length > 0) {
      await updateRowsById(client, 'live_matches', changed.map((match) => matchToRow(match)), 'live matches')
    }
    reconciled = next
  }
  return reconciled
}

function spectatorToRow(matchId: string, spectator: LiveMultiplayerSpectator) {
  return {
    joined_at: spectator.joinedAt,
    last_seen_at: spectator.lastSeenAt ?? new Date().toISOString(),
    match_id: matchId,
    profile: spectator.profile ?? null,
    user_id: spectator.userId,
  }
}

function rowToSpectator(row: LiveSpectatorRow): { readonly matchId: string; readonly spectator: LiveMultiplayerSpectator } | undefined {
  if (!row.match_id || !row.user_id) {
    return undefined
  }
  return {
    matchId: row.match_id,
    spectator: {
      joinedAt: row.joined_at ?? new Date(0).toISOString(),
      lastSeenAt: row.last_seen_at ?? undefined,
      profile: normalizeMultiplayerProfileSummary(row.profile),
      userId: row.user_id,
    },
  }
}

function mergeSpectators(
  match: LiveMultiplayerMatch,
  spectators: readonly LiveMultiplayerSpectator[],
): LiveMultiplayerMatch {
  if (spectators.length === 0) {
    return match
  }
  const byUserId = new Map<string, LiveMultiplayerSpectator>()
  for (const spectator of match.spectators ?? []) {
    byUserId.set(spectator.userId, spectator)
  }
  for (const spectator of spectators) {
    byUserId.set(spectator.userId, spectator)
  }
  return { ...match, spectators: Array.from(byUserId.values()) }
}

interface LiveBroadcastChannel {
  readonly httpSend?: (event: string, payload: unknown) => Promise<unknown>
  readonly send: (message: { readonly event: string; readonly payload: unknown; readonly type: 'broadcast' }) => Promise<unknown>
}

async function publishLiveProjection(channel: LiveBroadcastChannel, snapshot: LiveMultiplayerRepositorySnapshot): Promise<void> {
  if (typeof channel.httpSend === 'function') {
    await channel.httpSend('projection', snapshot)
    return
  }
  await channel.send({
    event: 'projection',
    payload: snapshot,
    type: 'broadcast',
  })
}

async function publishLiveRefresh(channel: LiveBroadcastChannel, payload: { readonly sourceUserId: string }): Promise<void> {
  if (typeof channel.httpSend === 'function') {
    await channel.httpSend('refresh', payload)
    return
  }
  await channel.send({
    event: 'refresh',
    payload,
    type: 'broadcast',
  })
}

function getLiveRefreshRecipientUserIds(state: LiveMultiplayerState): readonly string[] {
  const userIds = new Set<string>()
  for (const lobby of state.lobbies) {
    if (lobby.hostUserId) {
      userIds.add(lobby.hostUserId)
    }
  }
  for (const match of state.matches) {
    for (const userId of Object.values(match.playerUserIds ?? {})) {
      if (userId) {
        userIds.add(userId)
      }
    }
  }
  return Array.from(userIds)
}

async function saveRowsById<Row extends { readonly id: string }>(
  client: BrrrdleSupabaseClient,
  table: string,
  rows: readonly Row[],
  errorContext: string,
): Promise<void> {
  if (rows.length === 0) {
    return
  }

  const ids = rows.map((row) => row.id)
  const existingResult = await client
    .from(table)
    .select('id')
    .in('id', ids)
  if (existingResult.error) {
    throw new Error(`Unable to inspect ${errorContext}: ${existingResult.error.message}`)
  }

  const existingIds = new Set(
    Array.isArray(existingResult.data)
      ? existingResult.data.flatMap((row) => typeof (row as { readonly id?: unknown }).id === 'string' ? [(row as { readonly id: string }).id] : [])
      : [],
  )
  const insertRows = rows.filter((row) => !existingIds.has(row.id))
  const updateRows = rows.filter((row) => existingIds.has(row.id))

  if (insertRows.length > 0) {
    const { error } = await client.from(table).insert(insertRows)
    if (error) {
      throw new Error(`Unable to save ${errorContext}: ${error.message}`)
    }
  }

  for (const row of updateRows) {
    const { error } = await client.from(table).update(row).eq('id', row.id)
    if (error) {
      throw new Error(`Unable to save ${errorContext}: ${error.message}`)
    }
  }
}

async function updateRowsById<Row extends { readonly id: string }>(
  client: BrrrdleSupabaseClient,
  table: string,
  rows: readonly Row[],
  errorContext: string,
): Promise<void> {
  for (const row of rows) {
    const { error } = await client.from(table).update(row).eq('id', row.id)
    if (error) {
      throw new Error(`Unable to save ${errorContext}: ${error.message}`)
    }
  }
}

/**
 * Stage 2 production seam for Supabase Realtime + durable Postgres.
 *
 * Supabase projects should apply the Phase 23 migration before enabling this
 * adapter in a deployment; the adapter intentionally keeps UI code from
 * calling Supabase tables directly.
 */
export function createSupabaseLiveMultiplayerRepository({ client, userId }: SupabaseLiveMultiplayerRepositoryOptions): LiveMultiplayerRepository {
  const channelName = `brrrdle-live:${userId}`
  let snapshot = createSnapshot(createEmptyLiveMultiplayerState(), 0)
  const listeners = new Set<(next: LiveMultiplayerRepositorySnapshot) => void>()
  const publish = () => {
    for (const listener of listeners) {
      listener(snapshot)
    }
  }

  const refresh = async () => {
    const [serverNow, lobbiesResult, matchesResult, spectatorsResult] = await Promise.all([
      (async () => {
        const { data, error } = await client.rpc('get_live_multiplayer_server_time')
        return error || typeof data !== 'string' ? new Date().toISOString() : data
      })(),
      client
        .from('live_lobbies')
        .select('*')
        .order('created_at', { ascending: false }),
      client
        .from('live_matches')
        .select('projection, created_at, updated_at')
        .order('created_at', { ascending: false }),
      client
        .from('live_match_spectators')
        .select('match_id, user_id, joined_at, last_seen_at, profile')
        .order('joined_at', { ascending: false }),
    ])
    if (lobbiesResult.error || matchesResult.error) {
      return snapshot
    }
    const lobbies = Array.isArray(lobbiesResult.data)
      ? lobbiesResult.data.flatMap((row) => rowToLobby(row as LiveLobbyRow) ?? [])
      : []
    const spectatorsByMatch = new Map<string, LiveMultiplayerSpectator[]>()
    if (!spectatorsResult.error && Array.isArray(spectatorsResult.data)) {
      for (const row of spectatorsResult.data) {
        const entry = rowToSpectator(row as LiveSpectatorRow)
        if (entry) {
          spectatorsByMatch.set(entry.matchId, [...(spectatorsByMatch.get(entry.matchId) ?? []), entry.spectator])
        }
      }
    }
    const matches = Array.isArray(matchesResult.data)
      ? matchesResult.data.flatMap((row) => {
          const match = rowToMatch(row as LiveMatchRow)
          return match ? [mergeSpectators(match, spectatorsByMatch.get(match.id) ?? [])] : []
        })
      : []
    snapshot = createSnapshot({ lobbies, matches }, snapshot.version + 1, serverNow)
    publish()
    return snapshot
  }

  return {
    getServerNow: async () => {
      const { data, error } = await client.rpc('get_live_multiplayer_server_time')
      if (error || typeof data !== 'string') {
        return new Date().toISOString()
      }
      return data
    },
    joinSpectator: async (matchId, input) => {
      const now = new Date().toISOString()
      const { error } = await client
        .from('live_match_spectators')
        .upsert([{
          joined_at: now,
          last_seen_at: now,
          match_id: matchId,
          profile: input.profile ?? null,
          user_id: input.userId,
        }], { onConflict: 'match_id,user_id' })
      if (error) {
        throw new Error(`Unable to join live spectator mode: ${error.message}`)
      }
      return refresh()
    },
    load: refresh,
    save: async (state, expectedVersion) => {
      if (expectedVersion !== undefined && expectedVersion !== snapshot.version) {
        throw new Error('Live multiplayer repository version conflict.')
      }
      let normalized = createSnapshot(state, snapshot.version + 1).state
      const participantMatches = normalized.matches.filter((match) => (
        match.playerUserIds?.['player-one'] === userId || match.playerUserIds?.['player-two'] === userId
      ))
      const existingMatches = await loadExistingLiveMatches(client, participantMatches.map((match) => match.id))
      const mergedMatches = participantMatches.map((match) => {
        const existing = existingMatches.get(match.id)
        return existing ? mergeLiveMatchForSave(existing, match, userId) : match
      })
      if (mergedMatches.length > 0) {
        const byId = new Map(mergedMatches.map((match) => [match.id, match]))
        normalized = {
          ...normalized,
          matches: normalized.matches.map((match) => byId.get(match.id) ?? match),
        }
      }
      snapshot = createSnapshot(normalized, snapshot.version + 1)
      normalized = snapshot.state
      const userMatchLobbyIds = new Set(
        normalized.matches
          .filter((match) => match.playerUserIds?.['player-one'] === userId || match.playerUserIds?.['player-two'] === userId)
          .flatMap((match) => match.lobbyId ? [match.lobbyId] : []),
      )
      const lobbyRows = normalized.lobbies
        .filter((lobby) => lobby.hostUserId === userId || userMatchLobbyIds.has(lobby.id))
        .map((lobby) => lobbyToRow(lobby, userId))
      const matchRows = normalized.matches
        .filter((match) => match.playerUserIds?.['player-one'] === userId || match.playerUserIds?.['player-two'] === userId)
        .map((match) => matchToRow(match))
      const spectatorRows = normalized.matches.flatMap((match) => (
        match.spectators ?? []
      ).filter((spectator) => spectator.userId === userId).map((spectator) => spectatorToRow(match.id, spectator)))
      await saveRowsById(client, 'live_lobbies', lobbyRows.filter((row) => row.host_user_id === userId), 'live lobbies')
      await updateRowsById(client, 'live_lobbies', lobbyRows.filter((row) => row.host_user_id !== userId), 'live lobbies')
      if (matchRows.length > 0) {
        await saveRowsById(client, 'live_matches', matchRows, 'live matches')
        const reconciledMatches = await reconcileLiveMatchWrites(client, mergedMatches, userId)
        if (reconciledMatches.some((match, index) => !liveMatchesEqual(match, mergedMatches[index] ?? match))) {
          const byId = new Map(reconciledMatches.map((match) => [match.id, match]))
          normalized = {
            ...normalized,
            matches: normalized.matches.map((match) => byId.get(match.id) ?? match),
          }
          snapshot = createSnapshot(normalized, snapshot.version + 1)
          normalized = snapshot.state
        }
        const participantRows = normalized.matches.flatMap((match) => {
          const playerId = match.playerUserIds?.['player-one'] === userId
            ? 'player-one'
            : match.playerUserIds?.['player-two'] === userId
              ? 'player-two'
              : undefined
          if (!playerId) {
            return []
          }
          return [{
            connected: true,
            display_label: match.players.find((player) => player.id === playerId)?.label ?? 'Player',
            last_seen_at: new Date().toISOString(),
            match_id: match.id,
            player_id: playerId,
            user_id: userId,
          }]
        })
        if (participantRows.length > 0) {
          const { error: participantError } = await client
            .from('live_match_participants')
            .upsert(participantRows, { onConflict: 'match_id,user_id' })
          if (participantError) {
            throw new Error(`Unable to save live participants: ${participantError.message}`)
          }
        }
      }
      if (spectatorRows.length > 0) {
        const { error: spectatorError } = await client
          .from('live_match_spectators')
          .upsert(spectatorRows, { onConflict: 'match_id,user_id' })
        if (spectatorError) {
          throw new Error(`Unable to save live spectators: ${spectatorError.message}`)
        }
      }
      await publishLiveProjection(client.channel(channelName) as LiveBroadcastChannel, snapshot)
      await Promise.all(getLiveRefreshRecipientUserIds(snapshot.state).map(async (recipientUserId) => {
        await publishLiveRefresh(client.channel(`brrrdle-live:${recipientUserId}`) as LiveBroadcastChannel, { sourceUserId: userId }).catch(() => undefined)
      }))
      publish()
      return snapshot
    },
    subscribe: (listener) => {
      listeners.add(listener)
      listener(snapshot)
      void refresh()
      const refreshInterval = globalThis.setInterval(() => {
        void refresh()
      }, 2_000)
      const channel = client.channel(channelName)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'live_lobbies' }, () => {
          void refresh()
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'live_matches' }, () => {
          void refresh()
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'live_match_participants' }, () => {
          void refresh()
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'live_match_spectators' }, () => {
          void refresh()
        })
        .on('broadcast', { event: 'projection' }, () => {
          void refresh()
        })
        .on('broadcast', { event: 'refresh' }, () => {
          void refresh()
        })
        .subscribe()
      return () => {
        listeners.delete(listener)
        globalThis.clearInterval(refreshInterval)
        void client.removeChannel(channel)
      }
    },
  }
}
