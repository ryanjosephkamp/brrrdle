import { describe, expect, it, vi } from 'vitest'
import type { BrrrdleSupabaseClient } from '../account/supabaseClient'
import {
  cancelMultiplayerGame,
  createMultiplayerGame,
  expireTimedOutPracticeMultiplayerGames,
  getMultiplayerAnswerWords,
  joinMultiplayerGame,
  submitMultiplayerGuess,
} from './multiplayer'
import {
  MULTIPLAYER_STORAGE_KEY,
  createLocalStorageMultiplayerRepository,
  createSupabaseMultiplayerRepository,
  loadMultiplayerState,
} from './multiplayerRepository'

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

describe('multiplayer repository seam', () => {
  it('normalizes corrupted local storage to an empty multiplayer state', () => {
    const storage = createStorage({ [MULTIPLAYER_STORAGE_KEY]: '{bad-json' })

    expect(loadMultiplayerState(storage).games).toEqual([])
  })

  it('saves and reloads multiplayer state through the local storage repository', async () => {
    const storage = createStorage()
    const repository = createLocalStorageMultiplayerRepository(storage)
    const game = createMultiplayerGame({ mode: 'og', scope: 'practice', wordLength: 5 })

    await repository.save({ games: [game] }, 0)

    expect(loadMultiplayerState(storage).games[0].id).toBe(game.id)
  })

  it('seeds the local repository from legacy guest-progress multiplayer state when no multiplayer key exists', async () => {
    const storage = createStorage()
    const game = createMultiplayerGame({ mode: 'og', scope: 'practice', wordLength: 5 })
    const repository = createLocalStorageMultiplayerRepository(storage, { games: [game] })

    expect((await repository.load()).state.games[0].id).toBe(game.id)
  })

  it('saves only the current user multiplayer games through the Supabase adapter', async () => {
    const inserts: Record<string, readonly unknown[]> = {}
    const channel = {
      on: vi.fn(() => channel),
      subscribe: vi.fn(() => channel),
    }
    const fromMock = vi.fn((table: string) => ({
      upsert: vi.fn(async (rows: readonly unknown[]) => {
        inserts[table] = rows
        return { error: null }
      }),
      select: vi.fn((columns: string) => {
        if (columns === 'id') {
          return {
            in: vi.fn(async () => ({ data: [], error: null })),
          }
        }
        if (columns === 'projection') {
          return {
            eq: vi.fn(() => ({
              maybeSingle: vi.fn(async () => ({ data: null, error: null })),
            })),
          }
        }
        return {
          order: vi.fn(async () => ({ data: [], error: null })),
        }
      }),
      update: vi.fn((row: unknown) => ({
        eq: vi.fn(async () => {
          inserts[`${table}:updated`] = [row]
          return { error: null }
        }),
      })),
    }))
    const client = {
      channel: vi.fn(() => channel),
      from: fromMock,
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    } as unknown as BrrrdleSupabaseClient
    const ownedGame = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1' },
      ranked: true,
      ratingBucket: 'multiplayer:og',
      scope: 'practice',
      wordLength: 5,
    })
    const visibleOtherGame = createMultiplayerGame({
      mode: 'go',
      playerUserIds: { 'player-one': 'other-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })

    await repository.save({ games: [visibleOtherGame, ownedGame] })

    expect(inserts.async_multiplayer_games).toHaveLength(1)
    expect((inserts.async_multiplayer_games[0] as { readonly id: string }).id).toBe(ownedGame.id)
    expect((inserts.async_multiplayer_games[0] as { readonly rating_bucket: string }).rating_bucket).toBe('async:og')
    expect((inserts.async_multiplayer_games[0] as { readonly projection: typeof ownedGame }).projection.ratingBucket).toBe('multiplayer:og')
    expect(new Set(fromMock.mock.calls.map(([table]) => table))).toEqual(new Set(['async_multiplayer_games']))
  })

  it('skips unchanged Supabase multiplayer rows on follow-up saves', async () => {
    const tables: Record<string, unknown[]> = { async_multiplayer_games: [] }
    const upsertBatches: unknown[][] = []
    const updatedRows: unknown[] = []
    const channel = {
      on: vi.fn(() => channel),
      subscribe: vi.fn(() => channel),
    }
    const client = {
      channel: vi.fn(() => channel),
      from: vi.fn((table: string) => ({
        upsert: vi.fn(async (rows: readonly { readonly id?: string }[]) => {
          upsertBatches.push([...rows])
          const existing = new Map((tables[table] ?? []).map((row) => [(row as { readonly id?: string }).id, row]))
          for (const row of rows) {
            if (!existing.has(row.id)) {
              existing.set(row.id, row)
            }
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
        select: vi.fn((columns: string) => {
          if (columns === 'id') {
            return {
              in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id })),
                error: null,
              })),
            }
          }
          if (columns === 'projection') {
            return {
              eq: vi.fn((_column: string, id: string) => ({
                maybeSingle: vi.fn(async () => ({
                  data: (tables[table] ?? []).find((row) => (row as { readonly id?: string }).id === id) ?? null,
                  error: null,
                })),
              })),
            }
          }
          return {
            order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
          }
        }),
        update: vi.fn((row: { readonly id?: string }) => ({
          eq: vi.fn(async (_column: string, id: string) => {
            updatedRows.push(row)
            tables[table] = (tables[table] ?? []).map((entry) => (entry as { readonly id?: string }).id === id ? row : entry)
            return { error: null }
          }),
        })),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    } as unknown as BrrrdleSupabaseClient
    const gameA = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'practice',
      wordLength: 5,
    })
    const gameB = createMultiplayerGame({
      mode: 'go',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'practice',
      wordLength: 5,
    })
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })

    await repository.save({ games: [gameA, gameB] })
    await repository.save({ games: [{ ...gameA, updatedAt: '2026-06-04T12:00:05.000Z' }, gameB] })

    expect(upsertBatches[0]).toHaveLength(2)
    expect(updatedRows).toHaveLength(1)
    expect((updatedRows[0] as { readonly id: string }).id).toBe(gameA.id)
  })

  it('persists multiplayer turns across two Supabase-backed repository clients', async () => {
    const tables: Record<string, unknown[]> = { async_multiplayer_games: [] }
    const createChannel = () => {
      const channel = {
        on: vi.fn(() => channel),
        subscribe: vi.fn(() => channel),
      }
      return channel
    }
    const createClient = () => ({
      channel: vi.fn(createChannel),
      from: vi.fn((table: string) => ({
        upsert: vi.fn(async (rows: readonly { readonly id?: string }[]) => {
          const existing = new Map((tables[table] ?? []).map((row) => [(row as { readonly id?: string }).id, row]))
          for (const row of rows) {
            if (!existing.has(row.id)) {
              existing.set(row.id, row)
            }
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
        select: vi.fn((columns: string) => {
          if (columns === 'id') {
            return {
              in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id })),
                error: null,
              })),
            }
          }
          if (columns === 'projection') {
            return {
              eq: vi.fn((_column: string, id: string) => ({
                maybeSingle: vi.fn(async () => ({
                  data: (tables[table] ?? []).find((row) => (row as { readonly id?: string }).id === id) ?? null,
                  error: null,
                })),
              })),
            }
          }
          return {
            order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
          }
        }),
        update: vi.fn((row: { readonly id?: string }) => ({
          eq: vi.fn(async (_column: string, id: string) => {
            tables[table] = (tables[table] ?? []).map((entry) => (entry as { readonly id?: string }).id === id ? row : entry)
            return { error: null }
          }),
        })),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    }) as unknown as BrrrdleSupabaseClient
    const hostRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'host-user' })
    const rivalRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'rival-user' })
    const game = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })

    await hostRepository.save({ games: [game] })
    const rivalLoaded = await rivalRepository.load()
    const joined = joinMultiplayerGame(rivalLoaded.state, { gameId: game.id, userId: 'rival-user' })
    await rivalRepository.save(joined.state)
    const hostLoaded = await hostRepository.load()
    const submitted = submitMultiplayerGuess(hostLoaded.state, {
      gameId: game.id,
      guess: getMultiplayerAnswerWords(game)[0],
      playerId: 'player-one',
    })
    await hostRepository.save(submitted.state)
    const rivalReloaded = await rivalRepository.load()

    expect(rivalLoaded.state.games[0].status).toBe('waiting')
    expect(hostLoaded.state.games[0].playerUserIds?.['player-two']).toBe('rival-user')
    expect(rivalReloaded.state.games[0].moves).toHaveLength(1)
    expect(rivalReloaded.state.games[0].moves[0].playerId).toBe('player-one')
  })

  it('does not let a stale creator cancellation overwrite a newer rival join', async () => {
    const tables: Record<string, unknown[]> = { async_multiplayer_games: [] }
    const createChannel = () => {
      const channel = {
        on: vi.fn(() => channel),
        subscribe: vi.fn(() => channel),
      }
      return channel
    }
    const createClient = () => ({
      channel: vi.fn(createChannel),
      from: vi.fn((table: string) => ({
        upsert: vi.fn(async (rows: readonly { readonly id?: string }[]) => {
          const existing = new Map((tables[table] ?? []).map((row) => [(row as { readonly id?: string }).id, row]))
          for (const row of rows) {
            if (!existing.has(row.id)) {
              existing.set(row.id, row)
            }
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
        select: vi.fn((columns: string) => {
          if (columns === 'id') {
            return {
              in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id })),
                error: null,
              })),
            }
          }
          if (columns === 'projection') {
            return {
              eq: vi.fn((_column: string, id: string) => ({
                maybeSingle: vi.fn(async () => ({
                  data: (tables[table] ?? []).find((row) => (row as { readonly id?: string }).id === id) ?? null,
                  error: null,
                })),
              })),
            }
          }
          return {
            order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
          }
        }),
        update: vi.fn((row: { readonly id?: string }) => ({
          eq: vi.fn(async (_column: string, id: string) => {
            tables[table] = (tables[table] ?? []).map((entry) => (entry as { readonly id?: string }).id === id ? row : entry)
            return { error: null }
          }),
        })),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    }) as unknown as BrrrdleSupabaseClient
    const hostRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'host-user' })
    const rivalRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'rival-user' })
    const game = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })

    await hostRepository.save({ games: [game] })
    const rivalLoaded = await rivalRepository.load()
    const joined = joinMultiplayerGame(rivalLoaded.state, { gameId: game.id, userId: 'rival-user' })
    await rivalRepository.save(joined.state)
    const staleCancel = cancelMultiplayerGame({ games: [game] }, { gameId: game.id, userId: 'host-user' })
    await hostRepository.save(staleCancel.state)
    const reloaded = await rivalRepository.load()

    expect(reloaded.state.games[0].status).toBe('playing')
    expect(reloaded.state.games[0].playerUserIds?.['player-two']).toBe('rival-user')
  })

  it('does not let a stale timed timeout overwrite a newer submitted turn', async () => {
    const tables: Record<string, unknown[]> = { async_multiplayer_games: [] }
    const createChannel = () => {
      const channel = {
        on: vi.fn(() => channel),
        subscribe: vi.fn(() => channel),
      }
      return channel
    }
    const createClient = () => ({
      channel: vi.fn(createChannel),
      from: vi.fn((table: string) => ({
        upsert: vi.fn(async (rows: readonly { readonly id?: string }[]) => {
          const existing = new Map((tables[table] ?? []).map((row) => [(row as { readonly id?: string }).id, row]))
          for (const row of rows) {
            if (!existing.has(row.id)) {
              existing.set(row.id, row)
            }
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
        select: vi.fn((columns: string) => {
          if (columns === 'id') {
            return {
              in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id })),
                error: null,
              })),
            }
          }
          if (columns === 'projection') {
            return {
              eq: vi.fn((_column: string, id: string) => ({
                maybeSingle: vi.fn(async () => ({
                  data: (tables[table] ?? []).find((row) => (row as { readonly id?: string }).id === id) ?? null,
                  error: null,
                })),
              })),
            }
          }
          return {
            order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
          }
        }),
        update: vi.fn((row: { readonly id?: string }) => ({
          eq: vi.fn(async (_column: string, id: string) => {
            tables[table] = (tables[table] ?? []).map((entry) => (entry as { readonly id?: string }).id === id ? row : entry)
            return { error: null }
          }),
        })),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    }) as unknown as BrrrdleSupabaseClient
    const hostRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'host-user' })
    const rivalRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'rival-user' })
    const game = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      seed: 1,
      timeLimitMs: 30_000,
      wordLength: 5,
    })

    await hostRepository.save({ games: [game] })
    const rivalLoaded = await rivalRepository.load()
    const joined = joinMultiplayerGame(rivalLoaded.state, {
      gameId: game.id,
      now: '2026-06-04T12:00:00.000Z',
      userId: 'rival-user',
    })
    await rivalRepository.save(joined.state)
    const hostLoaded = await hostRepository.load()
    const submitted = submitMultiplayerGuess(hostLoaded.state, {
      gameId: game.id,
      guess: getMultiplayerAnswerWords(game)[0],
      now: '2026-06-04T12:00:05.000Z',
      playerId: 'player-one',
    })
    await hostRepository.save(submitted.state)
    const staleTimeout = expireTimedOutPracticeMultiplayerGames(joined.state, new Date('2026-06-04T12:00:31.000Z'))
    await rivalRepository.save(staleTimeout)
    const hostReloaded = await hostRepository.load()

    expect(hostReloaded.state.games[0].moves).toHaveLength(1)
    expect(hostReloaded.state.games[0].moves[0].playerId).toBe('player-one')
    expect(hostReloaded.state.games[0].timedOutPlayerId).toBeUndefined()
  })
})
