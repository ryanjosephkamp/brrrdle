import { describe, expect, it, vi } from 'vitest'
import type { BrrrdleSupabaseClient } from '../account/supabaseClient'
import {
  createAsyncMultiplayerGame,
  getAsyncMultiplayerAnswerWords,
  joinAsyncMultiplayerGame,
  submitAsyncMultiplayerGuess,
} from './asyncMultiplayer'
import {
  ASYNC_MULTIPLAYER_STORAGE_KEY,
  createLocalStorageAsyncMultiplayerRepository,
  createSupabaseAsyncMultiplayerRepository,
  loadAsyncMultiplayerState,
} from './asyncRepository'

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

describe('async multiplayer repository seam', () => {
  it('normalizes corrupted local storage to an empty async state', () => {
    const storage = createStorage({ [ASYNC_MULTIPLAYER_STORAGE_KEY]: '{bad-json' })

    expect(loadAsyncMultiplayerState(storage).games).toEqual([])
  })

  it('saves and reloads async state through the local storage repository', async () => {
    const storage = createStorage()
    const repository = createLocalStorageAsyncMultiplayerRepository(storage)
    const game = createAsyncMultiplayerGame({ mode: 'og', scope: 'practice', wordLength: 5 })

    await repository.save({ games: [game] }, 0)

    expect(loadAsyncMultiplayerState(storage).games[0].id).toBe(game.id)
  })

  it('seeds the local repository from legacy guest-progress async state when no async key exists', async () => {
    const storage = createStorage()
    const game = createAsyncMultiplayerGame({ mode: 'og', scope: 'practice', wordLength: 5 })
    const repository = createLocalStorageAsyncMultiplayerRepository(storage, { games: [game] })

    expect((await repository.load()).state.games[0].id).toBe(game.id)
  })

  it('saves only the current user async games through the Supabase adapter', async () => {
    const inserts: Record<string, readonly unknown[]> = {}
    const channel = {
      on: vi.fn(() => channel),
      subscribe: vi.fn(() => channel),
    }
    const client = {
      channel: vi.fn(() => channel),
      from: vi.fn((table: string) => ({
        insert: vi.fn(async (rows: readonly unknown[]) => {
          inserts[table] = rows
          return { error: null }
        }),
        select: vi.fn((columns: string) => columns === 'id'
          ? {
              in: vi.fn(async () => ({ data: [], error: null })),
            }
          : {
              order: vi.fn(async () => ({ data: [], error: null })),
            }),
        update: vi.fn((row: unknown) => ({
          eq: vi.fn(async () => {
            inserts[`${table}:updated`] = [row]
            return { error: null }
          }),
        })),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    } as unknown as BrrrdleSupabaseClient
    const ownedGame = createAsyncMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'practice',
      wordLength: 5,
    })
    const visibleOtherGame = createAsyncMultiplayerGame({
      mode: 'go',
      playerUserIds: { 'player-one': 'other-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const repository = createSupabaseAsyncMultiplayerRepository({ client, userId: 'user-1' })

    await repository.save({ games: [visibleOtherGame, ownedGame] })

    expect(inserts.async_multiplayer_games).toHaveLength(1)
    expect((inserts.async_multiplayer_games[0] as { readonly id: string }).id).toBe(ownedGame.id)
  })

  it('persists async turns across two Supabase-backed repository clients', async () => {
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
        insert: vi.fn(async (rows: readonly { readonly id?: string }[]) => {
          const existing = new Map((tables[table] ?? []).map((row) => [(row as { readonly id?: string }).id, row]))
          for (const row of rows) {
            existing.set(row.id, row)
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
          : {
              order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
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
    const hostRepository = createSupabaseAsyncMultiplayerRepository({ client: createClient(), userId: 'host-user' })
    const rivalRepository = createSupabaseAsyncMultiplayerRepository({ client: createClient(), userId: 'rival-user' })
    const game = createAsyncMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })

    await hostRepository.save({ games: [game] })
    const rivalLoaded = await rivalRepository.load()
    const joined = joinAsyncMultiplayerGame(rivalLoaded.state, { gameId: game.id, userId: 'rival-user' })
    await rivalRepository.save(joined.state)
    const hostLoaded = await hostRepository.load()
    const submitted = submitAsyncMultiplayerGuess(hostLoaded.state, {
      gameId: game.id,
      guess: getAsyncMultiplayerAnswerWords(game)[0],
      playerId: 'player-one',
    })
    await hostRepository.save(submitted.state)
    const rivalReloaded = await rivalRepository.load()

    expect(rivalLoaded.state.games[0].status).toBe('waiting')
    expect(hostLoaded.state.games[0].playerUserIds?.['player-two']).toBe('rival-user')
    expect(rivalReloaded.state.games[0].moves).toHaveLength(1)
    expect(rivalReloaded.state.games[0].moves[0].playerId).toBe('player-one')
  })
})
