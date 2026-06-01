import { describe, expect, it } from 'vitest'
import { APP_ROUTES, DEFAULT_ROUTE_ID, getPrimaryNavigationRoutes, getRouteById, getRoutesByGroup } from './routes'

describe('APP_ROUTES', () => {
  it('defines unique route ids with a home default', () => {
    const routeIds = APP_ROUTES.map((route) => route.id)

    expect(new Set(routeIds).size).toBe(routeIds.length)
    expect(getRouteById(DEFAULT_ROUTE_ID).id).toBe('home')
  })

  it('keeps launch daily modes fixed at five letters', () => {
    expect(getRouteById('og-daily')).toMatchObject({ mode: 'og', scope: 'daily', wordLength: 5 })
    expect(getRouteById('go-daily')).toMatchObject({ mode: 'go', scope: 'daily', wordLength: 5 })
  })

  it('includes minimal play and support navigation groups', () => {
    expect(getRoutesByGroup('play').map((route) => route.id)).toEqual(['home', 'og-daily', 'go-daily', 'practice'])
    expect(getRoutesByGroup('support').map((route) => route.id)).toEqual(['word-explorer', 'feedback', 'definitions', 'stats', 'settings', 'about', 'admin'])
  })

  it('keeps the primary navigation in the ADDITIONS-2026-05-27 order and hides admin for non-admins', () => {
    expect(getPrimaryNavigationRoutes(false).map((route) => route.id)).toEqual([
      'og-daily',
      'go-daily',
      'practice',
      'word-explorer',
      'feedback',
      'settings',
      'about',
    ])
    expect(getPrimaryNavigationRoutes(true).map((route) => route.id)).toEqual([
      'og-daily',
      'go-daily',
      'practice',
      'word-explorer',
      'feedback',
      'settings',
      'about',
      'admin',
    ])
  })
})
