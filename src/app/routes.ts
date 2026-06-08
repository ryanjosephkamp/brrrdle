import type { GameMode, PlayScope } from '../game/types'

export type AppRouteId = 'home' | 'calendar' | 'og-daily' | 'go-daily' | 'practice' | 'multiplayer' | 'word-explorer' | 'feedback' | 'definitions' | 'stats' | 'settings' | 'about' | 'admin'

export interface AppRoute {
  readonly id: AppRouteId
  readonly label: string
  readonly shortLabel: string
  readonly description: string
  readonly navigationGroup: 'play' | 'support'
  readonly mode?: GameMode
  readonly scope?: PlayScope
  readonly wordLength?: number
  /**
   * Routes kept only for backward-compatible deep links or future inert route
   * foundations. Hidden routes are excluded from the primary navigation rail.
   */
  readonly hidden?: boolean
}

export const APP_ROUTES = [
  {
    id: 'home',
    label: 'Home',
    shortLabel: 'Home',
    description: 'Choose a brrrdle mode and review launch status.',
    navigationGroup: 'play',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    shortLabel: 'Calendar',
    description: 'Play today\u2019s daily puzzles or unlock and replay any past daily back to January 1, 2025.',
    navigationGroup: 'play',
    scope: 'daily',
  },
  {
    id: 'og-daily',
    label: 'og Daily',
    shortLabel: 'og',
    description: 'Classic daily brrrdle, fixed at five letters for launch.',
    navigationGroup: 'play',
    mode: 'og',
    scope: 'daily',
    wordLength: 5,
    hidden: true,
  },
  {
    id: 'go-daily',
    label: 'go Daily',
    shortLabel: 'go',
    description: 'Daily multi-board brrrdle, fixed at five letters for launch.',
    navigationGroup: 'play',
    mode: 'go',
    scope: 'daily',
    wordLength: 5,
    hidden: true,
  },
  {
    id: 'practice',
    label: 'Practice',
    shortLabel: 'Practice',
    description: 'Practice brrrdle with configurable word lengths from 2 through 35.',
    navigationGroup: 'play',
    scope: 'practice',
  },
  {
    id: 'multiplayer',
    label: 'Multiplayer',
    shortLabel: 'Multiplayer',
    description: 'Future home for Multiplayer routes. Current Practice and Daily Multiplayer entry points stay in Practice and Calendar.',
    navigationGroup: 'play',
    hidden: true,
  },
  {
    id: 'word-explorer',
    label: 'Word Explorer',
    shortLabel: 'Words',
    description: 'Browse and search the exact words brrrdle is using.',
    navigationGroup: 'support',
  },
  {
    id: 'definitions',
    label: 'Definitions',
    shortLabel: 'Defs',
    description: 'Definition results will appear here after games end.',
    navigationGroup: 'support',
  },
  {
    id: 'stats',
    label: 'Stats',
    shortLabel: 'Stats',
    description: 'Local and synced statistics will appear here in a later phase.',
    navigationGroup: 'support',
  },
  {
    id: 'settings',
    label: 'Settings',
    shortLabel: 'Settings',
    description: 'Preferences, accessibility options, and account controls will appear here.',
    navigationGroup: 'support',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    shortLabel: 'Feedback',
    description: 'Send a pre-filled bug report, feature request, or note.',
    navigationGroup: 'support',
  },
  {
    id: 'about',
    label: 'About Brrrdle',
    shortLabel: 'About',
    description: 'Project notes, rules context, credits, and release details for brrrdle.',
    navigationGroup: 'support',
  },
  {
    id: 'admin',
    label: 'Admin',
    shortLabel: 'Admin',
    description: 'Protected data refresh controls will appear here in the admin phase.',
    navigationGroup: 'support',
  },
] as const satisfies readonly AppRoute[]

export const DEFAULT_ROUTE_ID: AppRouteId = 'home'

export function getRouteById(routeId: AppRouteId): AppRoute {
  return APP_ROUTES.find((route) => route.id === routeId) ?? APP_ROUTES[0]
}

export function getRoutesByGroup(group: AppRoute['navigationGroup']): readonly AppRoute[] {
  return APP_ROUTES.filter((route) => route.navigationGroup === group)
}

export function getPrimaryNavigationRoutes(isAdmin: boolean): readonly AppRoute[] {
  return APP_ROUTES.filter((route) => {
    if (route.id === 'admin') {
      return isAdmin
    }

    return ['calendar', 'practice', 'word-explorer', 'settings', 'feedback', 'about'].includes(route.id)
  })
}
