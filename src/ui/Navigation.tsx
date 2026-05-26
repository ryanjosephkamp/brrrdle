import type { AppRoute, AppRouteId } from '../app/routes'
import { Button } from './Button'

interface NavigationProps {
  readonly routes: readonly AppRoute[]
  readonly activeRouteId: AppRouteId
  readonly onNavigate: (routeId: AppRouteId) => void
}

export function Navigation({ routes, activeRouteId, onNavigate }: NavigationProps) {
  return (
    <nav aria-label="Primary" className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
      {routes.map((route) => {
        const isActive = route.id === activeRouteId
        return (
          <Button
            aria-current={isActive ? 'page' : undefined}
            isActive={isActive}
            key={route.id}
            onClick={() => onNavigate(route.id)}
            size="sm"
            variant="secondary"
          >
            {route.shortLabel}
          </Button>
        )
      })}
    </nav>
  )
}
