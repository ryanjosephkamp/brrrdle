import type { BrrrdleSupabaseClient } from '../account/supabaseClient'
import {
  createEmptyAsyncMultiplayerState,
  normalizeAsyncMultiplayerState,
  type AsyncMultiplayerGame,
  type AsyncMultiplayerState,
} from './asyncMultiplayer'

export interface AsyncMultiplayerRepositorySnapshot {
  readonly serverNow: string
  readonly state: AsyncMultiplayerState
  readonly version: number
}

export interface AsyncMultiplayerRepository {
  readonly getServerNow: () => Promise<string>
  readonly load: () => Promise<AsyncMultiplayerRepositorySnapshot>
  readonly save: (state: AsyncMultiplayerState, expectedVersion?: number) => Promise<AsyncMultiplayerRepositorySnapshot>
  readonly subscribe: (listener: (snapshot: AsyncMultiplayerRepositorySnapshot) => void) => () => void
}

export const ASYNC_MULTIPLAYER_STORAGE_KEY = 'brrrdle:async-multiplayer:v1'

export interface AsyncKeyValueStorage {
  readonly getItem: (key: string) => string | null
  readonly removeItem?: (key: string) => void
  readonly setItem: (key: string, value: string) => void
}

function getBrowserStorage(): AsyncKeyValueStorage | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }
  return window.localStorage
}

function createSnapshot(state: AsyncMultiplayerState, version: number, now = new Date().toISOString()): AsyncMultiplayerRepositorySnapshot {
  return {
    serverNow: now,
    state: normalizeAsyncMultiplayerState(state),
    version,
  }
}

export function loadAsyncMultiplayerState(storage: AsyncKeyValueStorage | undefined = getBrowserStorage()): AsyncMultiplayerState {
  const raw = storage?.getItem(ASYNC_MULTIPLAYER_STORAGE_KEY)
  if (!raw) {
    return createEmptyAsyncMultiplayerState()
  }
  try {
    return normalizeAsyncMultiplayerState(JSON.parse(raw) as unknown)
  } catch {
    return createEmptyAsyncMultiplayerState()
  }
}

export function saveAsyncMultiplayerState(state: AsyncMultiplayerState, storage: AsyncKeyValueStorage | undefined = getBrowserStorage()): void {
  storage?.setItem(ASYNC_MULTIPLAYER_STORAGE_KEY, JSON.stringify(normalizeAsyncMultiplayerState(state)))
}

export function createLocalStorageAsyncMultiplayerRepository(
  storage: AsyncKeyValueStorage | undefined = getBrowserStorage(),
  initialState: unknown = createEmptyAsyncMultiplayerState(),
): AsyncMultiplayerRepository {
  const storedState = storage?.getItem(ASYNC_MULTIPLAYER_STORAGE_KEY)
  let snapshot = createSnapshot(storedState ? loadAsyncMultiplayerState(storage) : normalizeAsyncMultiplayerState(initialState), 0)
  const listeners = new Set<(next: AsyncMultiplayerRepositorySnapshot) => void>()
  const publish = () => {
    saveAsyncMultiplayerState(snapshot.state, storage)
    for (const listener of listeners) {
      listener(snapshot)
    }
  }

  return {
    getServerNow: async () => new Date().toISOString(),
    load: async () => snapshot,
    save: async (state, expectedVersion) => {
      if (expectedVersion !== undefined && expectedVersion !== snapshot.version) {
        throw new Error('Async multiplayer repository version conflict.')
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

export interface SupabaseAsyncMultiplayerRepositoryOptions {
  readonly client: BrrrdleSupabaseClient
  readonly userId: string
}

interface AsyncGameRow {
  readonly created_at?: string
  readonly id?: string
  readonly projection?: unknown
  readonly updated_at?: string
}

function gameToRow(game: AsyncMultiplayerGame, userId: string) {
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
    rating_bucket: game.ratingBucket ?? null,
    scope: game.scope,
    status: game.status,
    updated_at: game.updatedAt,
    winner_player_id: game.winnerId ?? null,
    word_length: game.wordLength,
  }
}

function rowToGame(row: AsyncGameRow): AsyncMultiplayerGame | undefined {
  return normalizeAsyncMultiplayerState({ games: [row.projection] }).games[0]
}

async function saveAsyncGameRows(client: BrrrdleSupabaseClient, rows: readonly ReturnType<typeof gameToRow>[]): Promise<void> {
  if (rows.length === 0) {
    return
  }

  const ids = rows.map((row) => row.id)
  const existingResult = await client
    .from('async_multiplayer_games')
    .select('id')
    .in('id', ids)
  if (existingResult.error) {
    throw new Error(`Unable to inspect async multiplayer games: ${existingResult.error.message}`)
  }

  const existingIds = new Set(
    Array.isArray(existingResult.data)
      ? existingResult.data.flatMap((row) => typeof (row as { readonly id?: unknown }).id === 'string' ? [(row as { readonly id: string }).id] : [])
      : [],
  )
  const insertRows = rows.filter((row) => !existingIds.has(row.id))
  const updateRows = rows.filter((row) => existingIds.has(row.id))

  if (insertRows.length > 0) {
    const { error } = await client.from('async_multiplayer_games').insert(insertRows)
    if (error) {
      throw new Error(`Unable to save async multiplayer games: ${error.message}`)
    }
  }

  for (const row of updateRows) {
    const { error } = await client.from('async_multiplayer_games').update(row).eq('id', row.id)
    if (error) {
      throw new Error(`Unable to save async multiplayer games: ${error.message}`)
    }
  }
}

async function updateAsyncGameRows(client: BrrrdleSupabaseClient, rows: readonly ReturnType<typeof gameToRow>[]): Promise<void> {
  for (const row of rows) {
    const { error } = await client.from('async_multiplayer_games').update(row).eq('id', row.id)
    if (error) {
      throw new Error(`Unable to save async multiplayer games: ${error.message}`)
    }
  }
}

export function createSupabaseAsyncMultiplayerRepository({ client, userId }: SupabaseAsyncMultiplayerRepositoryOptions): AsyncMultiplayerRepository {
  const channelName = `brrrdle-async:${userId}`
  let snapshot = createSnapshot(createEmptyAsyncMultiplayerState(), 0)
  const listeners = new Set<(next: AsyncMultiplayerRepositorySnapshot) => void>()
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
      ? gamesResult.data.flatMap((row) => rowToGame(row as AsyncGameRow) ?? [])
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
        throw new Error('Async multiplayer repository version conflict.')
      }
      snapshot = createSnapshot(state, snapshot.version + 1)
      const rows = snapshot.state.games
        .filter((game) => game.playerUserIds?.['player-one'] === userId || game.playerUserIds?.['player-two'] === userId)
        .map((game) => gameToRow(game, userId))
      await saveAsyncGameRows(client, rows.filter((row) => row.host_user_id === userId))
      await updateAsyncGameRows(client, rows.filter((row) => row.host_user_id !== userId))
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
