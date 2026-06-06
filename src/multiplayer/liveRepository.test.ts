import { describe, expect, it, vi } from 'vitest'
import {
  LIVE_MULTIPLAYER_STORAGE_KEY,
  createLocalStorageLiveMultiplayerRepository,
  createMemoryLiveMultiplayerRepository,
  createSupabaseLiveMultiplayerRepository,
  loadLiveMultiplayerState,
  saveLiveMultiplayerState,
} from './liveRepository'
import {
  chooseLivePracticeWordLength,
  createLiveMultiplayerLobby,
  getLiveMultiplayerAnswerWords,
  matchLiveMultiplayerLobby,
  resolveLivePracticeWordLength,
  startLiveMultiplayerMatch,
  submitLiveMultiplayerGuess,
} from './liveMultiplayer'
import type { BrrrdleSupabaseClient } from '../account/supabaseClient'

function createStorage(initial: Record<string, string> = {}) {
  const values = { ...initial }
  return {
    getItem: (key: string) => values[key] ?? null,
    setItem: (key: string, value: string) => {
      values[key] = value
    },
    values,
  }
}

describe('live multiplayer repository seam', () => {
  it('normalizes corrupted local storage to an empty live state', () => {
    const storage = createStorage({ [LIVE_MULTIPLAYER_STORAGE_KEY]: '{bad-json' })

    expect(loadLiveMultiplayerState(storage).matches).toEqual([])
    expect(loadLiveMultiplayerState(storage).lobbies).toEqual([])
  })

  it('saves and reloads live state through the local storage repository', async () => {
    const storage = createStorage()
    const repository = createLocalStorageLiveMultiplayerRepository(storage)
    const lobby = createLiveMultiplayerLobby({ mode: 'og', scope: 'practice' })

    await repository.save({ lobbies: [lobby], matches: [] }, 0)

    expect(loadLiveMultiplayerState(storage).lobbies[0].id).toBe(lobby.id)
  })

  it('notifies subscribers and rejects stale expected versions', async () => {
    const repository = createMemoryLiveMultiplayerRepository()
    const listener = vi.fn()
    const unsubscribe = repository.subscribe(listener)
    const snapshot = await repository.load()
    const lobby = createLiveMultiplayerLobby({ mode: 'og', scope: 'practice' })
    const saved = await repository.save({ lobbies: [lobby], matches: [] }, snapshot.version)

    expect(saved.version).toBe(1)
    expect(listener).toHaveBeenCalledTimes(2)
    await expect(repository.save({ lobbies: [], matches: [] }, snapshot.version)).rejects.toThrow('version conflict')

    unsubscribe()
    await repository.save({ lobbies: [], matches: [] }, saved.version)
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('writes normalized state through the standalone save helper', () => {
    const storage = createStorage()
    saveLiveMultiplayerState({ lobbies: [], matches: [] }, storage)

    expect(JSON.parse(storage.values[LIVE_MULTIPLAYER_STORAGE_KEY])).toEqual({ lobbies: [], matches: [] })
  })

  it('saves Supabase live projections through the table-backed adapter', async () => {
    const writes: Record<string, readonly unknown[]> = {}
    const send = vi.fn(async () => ({ error: null }))
    const channel = {
      on: vi.fn(() => channel),
      send,
      subscribe: vi.fn(() => channel),
    }
    const client = {
      channel: vi.fn(() => channel),
      from: vi.fn((table: string) => ({
        insert: vi.fn(async (rows: readonly unknown[]) => {
          writes[table] = rows
          return { error: null }
        }),
        select: vi.fn((columns: string) => columns === 'id'
          ? {
              in: vi.fn(async () => ({ data: [], error: null })),
            }
          : columns === 'id, projection'
            ? {
                in: vi.fn(async () => ({ data: [], error: null })),
              }
            : {
                order: vi.fn(async () => ({ data: [], error: null })),
              }),
        update: vi.fn((row: unknown) => ({
          eq: vi.fn(async () => {
            writes[`${table}:updated`] = [row]
            return { error: null }
          }),
        })),
        upsert: vi.fn(async (rows: readonly unknown[]) => {
          writes[table] = rows
          return { error: null }
        }),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    } as unknown as BrrrdleSupabaseClient
    const lobby = createLiveMultiplayerLobby({
      hostProfile: { accentColor: '#67e8f9', initials: 'HP', label: 'Host Pilot' },
      hostUserId: 'host-user',
      mode: 'og',
      scope: 'practice',
    })
    const matched = matchLiveMultiplayerLobby(
      { lobbies: [lobby], matches: [] },
      { joiningUserId: 'user-1', lobbyId: lobby.id, seed: 2 },
    )
    const repository = createSupabaseLiveMultiplayerRepository({ client, userId: 'user-1' })

    await repository.save(matched.state)

    expect((writes['live_lobbies:updated'][0] as { readonly id: string }).id).toBe(lobby.id)
    expect((writes['live_lobbies:updated'][0] as { readonly host_profile: { readonly label: string } }).host_profile.label).toBe('Host Pilot')
    expect((writes.live_matches[0] as { readonly projection: { readonly id: string } }).projection.id).toBe(matched.match?.id)
    expect((writes.live_match_participants[0] as { readonly user_id: string }).user_id).toBe('user-1')
    expect((writes.live_match_participants[0] as { readonly player_id: string }).player_id).toBe('player-two')
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ event: 'projection', type: 'broadcast' }))
  })

  it('persists a live lobby join across two Supabase-backed repository clients', async () => {
    const tables: Record<string, unknown[]> = {
      live_lobbies: [],
      live_match_spectators: [],
      live_match_participants: [],
      live_matches: [],
    }
    const createChannel = () => {
      const channel = {
        on: vi.fn(() => channel),
        send: vi.fn(async () => ({ error: null })),
        subscribe: vi.fn(() => channel),
      }
      return channel
    }
    const createClient = () => ({
      channel: vi.fn(createChannel),
      from: vi.fn((table: string) => ({
        insert: vi.fn(async (rows: readonly { readonly id?: string; readonly match_id?: string; readonly user_id?: string }[]) => {
          const keyFor = (row: { readonly id?: string; readonly match_id?: string; readonly user_id?: string }) => row.id ?? `${row.match_id}:${row.user_id}`
          const existing = new Map((tables[table] ?? []).map((row) => [keyFor(row as { readonly id?: string; readonly match_id?: string; readonly user_id?: string }), row]))
          for (const row of rows) {
            existing.set(keyFor(row), row)
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
        select: vi.fn((columns: string) => columns === 'id'
          ? {
              in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id })),
                error: null,
              })),
            }
          : columns === 'id, projection'
            ? {
                in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                  data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id, projection: (row as { readonly projection?: unknown }).projection })),
                  error: null,
                })),
              }
            : {
                order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
              }),
        update: vi.fn((row: { readonly id?: string }) => ({
          eq: vi.fn(async (_column: string, id: string) => {
            tables[table] = (tables[table] ?? []).map((entry) => (entry as { readonly id?: string }).id === id ? row : entry)
            return { error: null }
          }),
        })),
        upsert: vi.fn(async (rows: readonly { readonly id?: string; readonly match_id?: string; readonly user_id?: string }[]) => {
          const keyFor = (row: { readonly id?: string; readonly match_id?: string; readonly user_id?: string }) => row.id ?? `${row.match_id}:${row.user_id}`
          const existing = new Map((tables[table] ?? []).map((row) => [keyFor(row as { readonly id?: string; readonly match_id?: string; readonly user_id?: string }), row]))
          for (const row of rows) {
            existing.set(keyFor(row), row)
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    }) as unknown as BrrrdleSupabaseClient
    const hostRepository = createSupabaseLiveMultiplayerRepository({ client: createClient(), userId: 'host-user' })
    const rivalRepository = createSupabaseLiveMultiplayerRepository({ client: createClient(), userId: 'rival-user' })
    const lobby = createLiveMultiplayerLobby({ hostUserId: 'host-user', mode: 'og', scope: 'practice' })

    await hostRepository.save({ lobbies: [lobby], matches: [] })
    const rivalLoaded = await rivalRepository.load()
    const matched = matchLiveMultiplayerLobby(rivalLoaded.state, {
      joiningUserId: 'rival-user',
      lobbyId: lobby.id,
      seed: 2,
    })
    await rivalRepository.save(matched.state)
    const hostLoaded = await hostRepository.load()

    expect(rivalLoaded.state.lobbies[0].id).toBe(lobby.id)
    expect(hostLoaded.state.matches[0].playerUserIds?.['player-one']).toBe('host-user')
    expect(hostLoaded.state.matches[0].playerUserIds?.['player-two']).toBe('rival-user')
    expect(tables.live_match_participants).toHaveLength(1)
    expect((tables.live_match_participants[0] as { readonly player_id: string }).player_id).toBe('player-two')

    const spectatorRepository = createSupabaseLiveMultiplayerRepository({ client: createClient(), userId: 'spectator-user' })
    const spectatorSnapshot = await spectatorRepository.joinSpectator(hostLoaded.state.matches[0].id, {
      profile: { initials: 'SP', label: 'Spectator Pilot' },
      userId: 'spectator-user',
    })

    expect(tables.live_match_spectators).toHaveLength(1)
    expect((tables.live_match_spectators[0] as { readonly user_id: string }).user_id).toBe('spectator-user')
    expect(spectatorSnapshot.state.matches[0].spectators?.[0]?.profile?.label).toBe('Spectator Pilot')
  })

  it('merges stale live match saves so simultaneous players do not erase each other histories', async () => {
    const tables: Record<string, unknown[]> = {
      live_lobbies: [],
      live_match_spectators: [],
      live_match_participants: [],
      live_matches: [],
    }
    const createChannel = () => {
      const channel = {
        on: vi.fn(() => channel),
        send: vi.fn(async () => ({ error: null })),
        subscribe: vi.fn(() => channel),
      }
      return channel
    }
    const createClient = () => ({
      channel: vi.fn(createChannel),
      from: vi.fn((table: string) => ({
        insert: vi.fn(async (rows: readonly { readonly id?: string; readonly match_id?: string; readonly user_id?: string }[]) => {
          const keyFor = (row: { readonly id?: string; readonly match_id?: string; readonly user_id?: string }) => row.id ?? `${row.match_id}:${row.user_id}`
          const existing = new Map((tables[table] ?? []).map((row) => [keyFor(row as { readonly id?: string; readonly match_id?: string; readonly user_id?: string }), row]))
          for (const row of rows) {
            existing.set(keyFor(row), row)
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
        select: vi.fn((columns: string) => columns === 'id'
          ? {
              in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id })),
                error: null,
              })),
            }
          : columns === 'id, projection'
            ? {
                in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                  data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id, projection: (row as { readonly projection?: unknown }).projection })),
                  error: null,
                })),
              }
            : {
                order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
              }),
        update: vi.fn((row: { readonly id?: string }) => ({
          eq: vi.fn(async (_column: string, id: string) => {
            tables[table] = (tables[table] ?? []).map((entry) => (entry as { readonly id?: string }).id === id ? row : entry)
            return { error: null }
          }),
        })),
        upsert: vi.fn(async (rows: readonly { readonly id?: string; readonly match_id?: string; readonly user_id?: string }[]) => {
          const keyFor = (row: { readonly id?: string; readonly match_id?: string; readonly user_id?: string }) => row.id ?? `${row.match_id}:${row.user_id}`
          const existing = new Map((tables[table] ?? []).map((row) => [keyFor(row as { readonly id?: string; readonly match_id?: string; readonly user_id?: string }), row]))
          for (const row of rows) {
            existing.set(keyFor(row), row)
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    }) as unknown as BrrrdleSupabaseClient
    const hostRepository = createSupabaseLiveMultiplayerRepository({ client: createClient(), userId: 'host-user' })
    const rivalRepository = createSupabaseLiveMultiplayerRepository({ client: createClient(), userId: 'rival-user' })
    const lobby = createLiveMultiplayerLobby({
      hostUserId: 'host-user',
      mode: 'og',
      scope: 'practice',
    })

    await hostRepository.save({ lobbies: [lobby], matches: [] })
    const rivalLoaded = await rivalRepository.load()
    const matched = matchLiveMultiplayerLobby(rivalLoaded.state, {
      joiningUserId: 'rival-user',
      lobbyId: lobby.id,
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      seed: 2,
    })
    await rivalRepository.save(matched.state)

    const hostSnapshot = await hostRepository.load()
    let rivalSnapshot = await rivalRepository.load()
    const matchId = hostSnapshot.state.matches[0].id
    await hostRepository.save(chooseLivePracticeWordLength(hostSnapshot.state, {
      actorUserId: 'host-user',
      matchId,
      playerId: 'player-one',
      wordLength: 5,
    }).state)
    rivalSnapshot = await rivalRepository.save(chooseLivePracticeWordLength(rivalSnapshot.state, {
      actorUserId: 'rival-user',
      matchId,
      playerId: 'player-two',
      wordLength: 5,
    }).state)
    const resolved = resolveLivePracticeWordLength(rivalSnapshot.state, {
      matchId,
      now: '2026-06-04T12:00:10.000Z',
      randomSeed: 2,
    })
    await rivalRepository.save(resolved.state)
    const started = startLiveMultiplayerMatch((await hostRepository.load()).state, matchId, '2026-06-04T12:00:14.000Z')
    await hostRepository.save(started.state)

    const playingForHost = await hostRepository.load()
    const stalePlayingForRival = await rivalRepository.load()
    expect(getLiveMultiplayerAnswerWords(playingForHost.state.matches[0])).toHaveLength(1)
    const hostGuess = 'about'
    const rivalGuess = 'adieu'

    await hostRepository.save(submitLiveMultiplayerGuess(playingForHost.state, {
      actorUserId: 'host-user',
      guess: hostGuess,
      matchId,
      playerId: 'player-one',
    }).state)
    await rivalRepository.save(submitLiveMultiplayerGuess(stalePlayingForRival.state, {
      actorUserId: 'rival-user',
      guess: rivalGuess,
      matchId,
      playerId: 'player-two',
    }).state)
    const reloaded = await hostRepository.load()
    const progress = reloaded.state.matches[0].playerProgress

    expect(progress.find((entry) => entry.playerId === 'player-one')?.moves).toHaveLength(1)
    expect(progress.find((entry) => entry.playerId === 'player-two')?.moves).toHaveLength(1)
  })
})
