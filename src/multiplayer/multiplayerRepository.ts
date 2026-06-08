import type { BrrrdleSupabaseClient } from '../account/supabaseClient'
import {
  createEmptyMultiplayerState,
  normalizeMultiplayerState,
  type MultiplayerGame,
  type MultiplayerState,
} from './multiplayer'

export interface MultiplayerRepositorySnapshot {
  readonly serverNow: string
  readonly state: MultiplayerState
  readonly version: number
}

export interface MultiplayerRepository {
  readonly getServerNow: () => Promise<string>
  readonly load: () => Promise<MultiplayerRepositorySnapshot>
  readonly save: (state: MultiplayerState, expectedVersion?: number) => Promise<MultiplayerRepositorySnapshot>
  readonly subscribe: (listener: (snapshot: MultiplayerRepositorySnapshot) => void) => () => void
}

export const MULTIPLAYER_STORAGE_KEY = 'brrrdle:async-multiplayer:v1'

export interface MultiplayerKeyValueStorage {
  readonly getItem: (key: string) => string | null
  readonly removeItem?: (key: string) => void
  readonly setItem: (key: string, value: string) => void
}

function getBrowserStorage(): MultiplayerKeyValueStorage | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }
  return window.localStorage
}

function createSnapshot(state: MultiplayerState, version: number, now = new Date().toISOString()): MultiplayerRepositorySnapshot {
  return {
    serverNow: now,
    state: normalizeMultiplayerState(state),
    version,
  }
}

export function loadMultiplayerState(storage: MultiplayerKeyValueStorage | undefined = getBrowserStorage()): MultiplayerState {
  const raw = storage?.getItem(MULTIPLAYER_STORAGE_KEY)
  if (!raw) {
    return createEmptyMultiplayerState()
  }
  try {
    return normalizeMultiplayerState(JSON.parse(raw) as unknown)
  } catch {
    return createEmptyMultiplayerState()
  }
}

export function saveMultiplayerState(state: MultiplayerState, storage: MultiplayerKeyValueStorage | undefined = getBrowserStorage()): void {
  storage?.setItem(MULTIPLAYER_STORAGE_KEY, JSON.stringify(normalizeMultiplayerState(state)))
}

export function createLocalStorageMultiplayerRepository(
  storage: MultiplayerKeyValueStorage | undefined = getBrowserStorage(),
  initialState: unknown = createEmptyMultiplayerState(),
): MultiplayerRepository {
  const storedState = storage?.getItem(MULTIPLAYER_STORAGE_KEY)
  let snapshot = createSnapshot(storedState ? loadMultiplayerState(storage) : normalizeMultiplayerState(initialState), 0)
  const listeners = new Set<(next: MultiplayerRepositorySnapshot) => void>()
  const publish = () => {
    saveMultiplayerState(snapshot.state, storage)
    for (const listener of listeners) {
      listener(snapshot)
    }
  }

  return {
    getServerNow: async () => new Date().toISOString(),
    load: async () => snapshot,
    save: async (state, expectedVersion) => {
      if (expectedVersion !== undefined && expectedVersion !== snapshot.version) {
        throw new Error('Multiplayer repository version conflict.')
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

export interface SupabaseMultiplayerRepositoryOptions {
  readonly client: BrrrdleSupabaseClient
  readonly userId: string
}

interface MultiplayerGameRow {
  readonly created_at?: string
  readonly id?: string
  readonly projection?: unknown
  readonly updated_at?: string
}

function getStorageRatingBucket(game: MultiplayerGame): 'async:og' | 'async:go' | null {
  if (game.ranked !== true) {
    return null
  }
  return game.mode === 'go' ? 'async:go' : 'async:og'
}

function gameToRow(game: MultiplayerGame, userId: string) {
  return {
    created_at: game.createdAt,
    current_turn: game.currentTurn,
    custom_game_code: game.customGameCode ?? null,
    daily_date_key: game.dailyDateKey ?? null,
    deadline_at: game.deadlineAt ?? null,
    difficulty: game.difficulty,
    ended_at: game.endedAt ?? null,
    go_puzzle_count: game.goPuzzleCount ?? null,
    host_user_id: game.playerUserIds?.['player-one'] ?? userId,
    id: game.id,
    matchmaking_request_id: game.matchmakingRequestId ?? null,
    mode: game.mode,
    player_one_user_id: game.playerUserIds?.['player-one'] ?? null,
    player_two_user_id: game.playerUserIds?.['player-two'] ?? null,
    projection: game,
    ranked: game.ranked === true,
    rating_bucket: getStorageRatingBucket(game),
    scope: game.scope,
    status: game.status,
    updated_at: game.updatedAt,
    winner_player_id: game.winnerId ?? null,
    word_length: game.wordLength,
  }
}

function rowToGame(row: MultiplayerGameRow): MultiplayerGame | undefined {
  return normalizeMultiplayerState({ games: [row.projection] }).games[0]
}

function hasGameProjectionChanged(previous: MultiplayerGame | undefined, next: MultiplayerGame): boolean {
  if (!previous) {
    return true
  }
  return JSON.stringify(previous) !== JSON.stringify(next)
}

async function saveMultiplayerGameRows(client: BrrrdleSupabaseClient, rows: readonly ReturnType<typeof gameToRow>[]): Promise<void> {
  if (rows.length === 0) {
    return
  }

  const ids = rows.map((row) => row.id)
  const existingResult = await client
    .from('async_multiplayer_games')
    .select('id')
    .in('id', ids)
  if (existingResult.error) {
    throw new Error(`Unable to inspect multiplayer games: ${existingResult.error.message}`)
  }

  const existingIds = new Set(
    Array.isArray(existingResult.data)
      ? existingResult.data.flatMap((row) => typeof (row as { readonly id?: unknown }).id === 'string' ? [(row as { readonly id: string }).id] : [])
      : [],
  )
  const insertRows = rows.filter((row) => !existingIds.has(row.id))
  const updateRows = rows.filter((row) => existingIds.has(row.id))

  if (insertRows.length > 0) {
    const { error } = await client.from('async_multiplayer_games').upsert(insertRows, {
      ignoreDuplicates: true,
      onConflict: 'id',
    })
    if (error) {
      throw new Error(`Unable to save multiplayer games: ${error.message}`)
    }
  }

  if (updateRows.length > 0) {
    await updateMultiplayerGameRows(client, updateRows)
  }
}

function isStaleIncomingGame(existing: MultiplayerGame | undefined, incoming: MultiplayerGame | undefined): boolean {
  if (!existing || !incoming || existing.id !== incoming.id) {
    return false
  }
  if (existing.playerUserIds?.['player-two'] && !incoming.playerUserIds?.['player-two']) {
    return true
  }
  if (existing.status !== 'waiting' && incoming.status === 'waiting') {
    return true
  }
  if (
    (existing.status === 'won' || existing.status === 'lost' || existing.status === 'expired')
    && incoming.status === 'playing'
    && incoming.moves.length <= existing.moves.length
  ) {
    return true
  }
  if (incoming.moves.length < existing.moves.length) {
    return true
  }
  const existingMoveIds = new Set(existing.moves.map((move) => move.id))
  const missingExistingMove = existing.moves.length > 0 && existing.moves.some((move) => !incoming.moves.some((incomingMove) => incomingMove.id === move.id))
  if (missingExistingMove && existingMoveIds.size >= incoming.moves.length) {
    return true
  }
  return false
}

async function loadExistingGameForUpdate(client: BrrrdleSupabaseClient, id: string): Promise<MultiplayerGame | undefined> {
  const result = await client
    .from('async_multiplayer_games')
    .select('projection')
    .eq('id', id)
    .maybeSingle()
  if (result.error) {
    return undefined
  }
  return rowToGame(result.data as MultiplayerGameRow)
}

async function updateMultiplayerGameRows(client: BrrrdleSupabaseClient, rows: readonly ReturnType<typeof gameToRow>[]): Promise<void> {
  for (const row of rows) {
    const existing = await loadExistingGameForUpdate(client, row.id)
    const incoming = normalizeMultiplayerState({ games: [row.projection] }).games[0]
    if (isStaleIncomingGame(existing, incoming)) {
      continue
    }
    const { error } = await client.from('async_multiplayer_games').update(row).eq('id', row.id)
    if (error) {
      throw new Error(`Unable to save multiplayer games: ${error.message}`)
    }
  }
}

export function createSupabaseMultiplayerRepository({ client, userId }: SupabaseMultiplayerRepositoryOptions): MultiplayerRepository {
  const channelName = `brrrdle-multiplayer:${userId}`
  let snapshot = createSnapshot(createEmptyMultiplayerState(), 0)
  const listeners = new Set<(next: MultiplayerRepositorySnapshot) => void>()
  const publish = () => {
    for (const listener of listeners) {
      listener(snapshot)
    }
  }

  const refresh = async () => {
    const [serverNow, gamesResult] = await Promise.all([
      (async () => {
        const { data, error } = await client.rpc('get_live_multiplayer_server_time')
        return error || typeof data !== 'string' ? new Date().toISOString() : data
      })(),
      client
        .from('async_multiplayer_games')
        .select('projection, created_at, updated_at')
        .order('updated_at', { ascending: false }),
    ])
    if (gamesResult.error) {
      return snapshot
    }
    const games = Array.isArray(gamesResult.data)
      ? gamesResult.data.flatMap((row) => rowToGame(row as MultiplayerGameRow) ?? [])
      : []
    snapshot = createSnapshot({ games }, snapshot.version + 1, serverNow)
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
    load: refresh,
    save: async (state, expectedVersion) => {
      if (expectedVersion !== undefined && expectedVersion !== snapshot.version) {
        throw new Error('Multiplayer repository version conflict.')
      }
      const previousGames = new Map(snapshot.state.games.map((game) => [game.id, game]))
      snapshot = createSnapshot(state, snapshot.version + 1)
      const rows = snapshot.state.games
        .filter((game) => game.playerUserIds?.['player-one'] === userId || game.playerUserIds?.['player-two'] === userId)
        .filter((game) => hasGameProjectionChanged(previousGames.get(game.id), game))
        .map((game) => gameToRow(game, userId))
      await saveMultiplayerGameRows(client, rows.filter((row) => row.host_user_id === userId))
      await updateMultiplayerGameRows(client, rows.filter((row) => row.host_user_id !== userId))
      publish()
      return snapshot
    },
    subscribe: (listener) => {
      listeners.add(listener)
      listener(snapshot)
      const channel = client.channel(channelName)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'async_multiplayer_games' },
          () => {
            void refresh()
          },
        )
        .subscribe()
      return () => {
        listeners.delete(listener)
        void client.removeChannel(channel)
      }
    },
  }
}
