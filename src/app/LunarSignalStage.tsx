import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { DEFAULT_SURFACE_THEME, type SurfaceTheme } from '../theme'
import type { AppRoute, AppRouteId } from './routes'

interface SignalMetric {
  readonly label: string
  readonly value: ReactNode
}

interface LunarSignalStageProps {
  readonly accountControls: ReactNode
  readonly activeRoute: AppRoute
  readonly children: ReactNode
  /**
   * Phase 22 Addendum (§27.10) — the daily countdown indicator, rendered at the
   * top of the shell (inside the account stack) in a context-aware, non-intrusive
   * position instead of the previous fixed bottom-corner overlay.
   */
  readonly dailyCountdown?: ReactNode
  readonly metrics: readonly SignalMetric[]
  readonly onNavigate: (routeId: AppRouteId) => void
  readonly routes: readonly AppRoute[]
  readonly statusLines: readonly SignalMetric[]
  /**
   * Surface theme controlling the shell backdrop. Defaults to the minimalist
   * surface; `lunar-signal` restores the animated Lunar Signal Deck treatment
   * (Phase 22 will let players select it).
   */
  readonly surfaceTheme?: SurfaceTheme
}

const signalColors = ['#f5fbff', '#ff4d45', '#55f4ff', '#ff66d4', '#8f7cff', '#ffe766', '#48ff9a', '#b8c4ff', '#ff9657']

function getRouteColor(index: number): string {
  return signalColors[index % signalColors.length]
}

function getRouteIndex(routeId: AppRouteId, routes: readonly AppRoute[]): number {
  return Math.max(0, routes.findIndex((route) => route.id === routeId))
}

function getRouteEyebrow(route: AppRoute): string {
  switch (route.id) {
    case 'calendar':
      return 'Daily'
    case 'og-daily':
    case 'go-daily':
      return 'Daily'
    case 'practice':
      return 'Practice'
    case 'word-explorer':
      return 'Library'
    case 'feedback':
      return 'Contact'
    case 'definitions':
      return 'Reference'
    case 'stats':
      return 'Progress'
    case 'settings':
      return 'Controls'
    case 'about':
      return 'Info'
    case 'admin':
      return 'Admin'
    default:
      return 'Deck'
  }
}

function SignalCanvas({
  activeRouteId,
  focusedRouteId,
  isAwake,
  onActivateRoute,
  onFocusRoute,
  routes,
}: {
  readonly activeRouteId: AppRouteId
  readonly focusedRouteId: AppRouteId
  readonly isAwake: boolean
  readonly onActivateRoute: (routeId: AppRouteId) => void
  readonly onFocusRoute: (routeId: AppRouteId) => void
  readonly routes: readonly AppRoute[]
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ x: 0.62, y: 0.55 })
  const focusedRouteRef = useRef(focusedRouteId)
  const activeIndex = getRouteIndex(activeRouteId, routes)
  const focusedIndex = getRouteIndex(focusedRouteId, routes)

  useEffect(() => {
    focusedRouteRef.current = focusedRouteId
  }, [focusedRouteId])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stars = Array.from({ length: 92 }, (_, index) => ({
      alpha: 0.18 + ((index * 17) % 80) / 100,
      phase: index * 0.41,
      size: 0.7 + ((index * 11) % 24) / 12,
      x: ((index * 73) % 997) / 997,
      y: ((index * 47) % 991) / 991,
    }))
    let frame = 0
    let elapsed = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawGlossyModule = (x: number, y: number, size: number, angle: number, color: string, alpha: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.globalAlpha = alpha
      const gradient = ctx.createLinearGradient(-size, -size, size, size)
      gradient.addColorStop(0, 'rgba(255,255,255,0.92)')
      gradient.addColorStop(0.42, color)
      gradient.addColorStop(1, 'rgba(0,0,0,0.78)')
      ctx.fillStyle = gradient
      ctx.shadowBlur = size * 0.42
      ctx.shadowColor = color
      ctx.beginPath()
      ctx.roundRect(-size * 0.16, -size * 0.95, size * 0.32, size * 1.9, size * 0.16)
      ctx.roundRect(-size * 0.95, -size * 0.16, size * 1.9, size * 0.32, size * 0.16)
      ctx.fill()
      ctx.globalAlpha = alpha * 0.62
      ctx.strokeStyle = 'rgba(255,255,255,0.8)'
      ctx.lineWidth = Math.max(1, size * 0.025)
      ctx.stroke()
      ctx.restore()
    }

    const render = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const pointer = pointerRef.current
      const activeColor = getRouteColor(isAwake ? activeIndex : focusedIndex)
      elapsed += reducedMotion ? 0 : 0.012

      ctx.clearRect(0, 0, width, height)
      const base = ctx.createLinearGradient(0, 0, width, height)
      base.addColorStop(0, '#020207')
      base.addColorStop(0.42, '#050712')
      base.addColorStop(0.72, '#07151a')
      base.addColorStop(1, '#020207')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      stars.forEach((star) => {
        const twinkle = reducedMotion ? 0.75 : 0.5 + Math.sin(elapsed * 1.8 + star.phase) * 0.32
        ctx.globalAlpha = star.alpha * twinkle
        ctx.fillStyle = star.phase % 2 > 1 ? '#ff5b52' : star.phase % 3 > 1 ? '#61f6ff' : '#ffffff'
        ctx.beginPath()
        ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()

      const cursorGlow = ctx.createRadialGradient(width * pointer.x, height * pointer.y, 0, width * pointer.x, height * pointer.y, Math.max(width, height) * 0.38)
      cursorGlow.addColorStop(0, 'rgba(255,255,255,0.18)')
      cursorGlow.addColorStop(0.18, `${activeColor}34`)
      cursorGlow.addColorStop(0.58, 'rgba(66,233,255,0.06)')
      cursorGlow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = cursorGlow
      ctx.fillRect(0, 0, width, height)

      const moonX = width * (isAwake ? 0.7 : 0.55)
      const moonY = height * (isAwake ? 0.22 : 0.34)
      const moonRadius = Math.min(width, height) * (isAwake ? 0.18 : 0.24)
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const moon = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.42, moonX, moonY, moonRadius * 1.08)
      moon.addColorStop(0, 'rgba(255,255,255,0)')
      moon.addColorStop(0.58, 'rgba(255,255,255,0.03)')
      moon.addColorStop(0.82, 'rgba(255,255,255,0.72)')
      moon.addColorStop(0.89, `${activeColor}66`)
      moon.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = moon
      ctx.beginPath()
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 0.2
      ctx.lineWidth = 1
      for (let i = 1; i <= 4; i += 1) {
        ctx.beginPath()
        ctx.ellipse(moonX, moonY, moonRadius * (1 + i * 0.25), moonRadius * (0.34 + i * 0.1), elapsed * 0.05 + i * 0.18, 0, Math.PI * 2)
        ctx.strokeStyle = i % 2 ? 'rgba(255,255,255,0.32)' : `${activeColor}44`
        ctx.stroke()
      }
      ctx.restore()

      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const moduleBaseY = height * (isAwake ? 0.88 : 0.75)
      for (let i = 0; i < 8; i += 1) {
        const x = width * (0.1 + i * 0.13) + Math.sin(elapsed * 0.8 + i) * 12
        const y = moduleBaseY + Math.cos(elapsed * 0.6 + i * 0.8) * 20
        const color = i % 3 === 0 ? '#f6f8ff' : i % 3 === 1 ? '#0f38ff' : '#050506'
        drawGlossyModule(x, y, Math.min(width, height) * (0.038 + (i % 3) * 0.01), elapsed * 0.16 + i, color, isAwake ? 0.13 : 0.24)
      }
      ctx.restore()

      if (!reducedMotion) {
        frame = window.requestAnimationFrame(render)
      }
    }

    resize()
    render()
    const observer = new ResizeObserver(() => {
      resize()
      render()
    })
    observer.observe(canvas)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [activeIndex, focusedIndex, isAwake])

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    pointerRef.current = { x, y }
    if (!isAwake && routes.length) {
      const routeIndex = Math.min(routes.length - 1, Math.max(0, Math.floor(x * routes.length)))
      const route = routes[routeIndex]
      if (route && route.id !== focusedRouteRef.current) {
        onFocusRoute(route.id)
      }
    }
  }

  const handleClick = () => {
    if (!isAwake) {
      onActivateRoute(focusedRouteRef.current)
    }
  }

  return <canvas aria-label="Interactive lunar route field" className="brrrdle-lunar-canvas" onClick={handleClick} onPointerMove={handlePointerMove} ref={canvasRef} />
}

export function LunarSignalStage({
  accountControls,
  activeRoute,
  children,
  dailyCountdown,
  metrics,
  onNavigate,
  routes,
  statusLines,
  surfaceTheme = DEFAULT_SURFACE_THEME,
}: LunarSignalStageProps) {
  const isLunarSurface = surfaceTheme === 'lunar-signal'
  const initialFocus = useMemo(() => routes.find((route) => route.id === activeRoute.id)?.id ?? routes[0]?.id ?? activeRoute.id, [activeRoute.id, routes])
  const [focusedRouteId, setFocusedRouteId] = useState<AppRouteId>(initialFocus)
  const [isAwake, setIsAwake] = useState(false)
  const shellRef = useRef<HTMLDivElement>(null)
  const cursorFrameRef = useRef(0)
  const cursorPointRef = useRef({ clientX: '62vw', clientY: '54vh', x: '62%', y: '54%' })
  const activeRouteIndex = useMemo(() => getRouteIndex(activeRoute.id, routes), [activeRoute.id, routes])
  const focusedRoute = useMemo(() => routes.find((route) => route.id === focusedRouteId) ?? routes[0] ?? activeRoute, [activeRoute, focusedRouteId, routes])
  const focusedRouteIndex = useMemo(() => getRouteIndex(focusedRoute.id, routes), [focusedRoute.id, routes])

  useEffect(() => () => {
    window.cancelAnimationFrame(cursorFrameRef.current)
  }, [])

  const focusRoute = (routeId: AppRouteId) => {
    setFocusedRouteId(routeId)
  }

  const activateRoute = (routeId: AppRouteId) => {
    setFocusedRouteId(routeId)
    onNavigate(routeId)
    setIsAwake(true)
  }

  const handleShellPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isLunarSurface) {
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100))
    cursorPointRef.current = {
      clientX: `${event.clientX}px`,
      clientY: `${event.clientY}px`,
      x: `${x}%`,
      y: `${y}%`,
    }

    if (!cursorFrameRef.current) {
      cursorFrameRef.current = window.requestAnimationFrame(() => {
        const shell = shellRef.current
        const point = cursorPointRef.current
        if (shell) {
          shell.style.setProperty('--signal-client-x', point.clientX)
          shell.style.setProperty('--signal-client-y', point.clientY)
          shell.style.setProperty('--signal-x', point.x)
          shell.style.setProperty('--signal-y', point.y)
        }
        cursorFrameRef.current = 0
      })
    }
  }

  const shellStyle = {
    '--signal-color': getRouteColor(isAwake ? activeRouteIndex : focusedRouteIndex),
    '--signal-client-x': '62vw',
    '--signal-client-y': '54vh',
    '--signal-x': '62%',
    '--signal-y': '54%',
  } as CSSProperties

  return (
    <div className={`brrrdle-lunar-shell min-h-svh min-h-dvh text-white ${isAwake ? 'is-awake' : 'is-dormant'}`} data-surface={isLunarSurface ? 'lunar-signal' : undefined} onPointerMove={handleShellPointerMove} ref={shellRef} style={shellStyle}>
      {isLunarSurface ? (
        <>
          <SignalCanvas activeRouteId={activeRoute.id} focusedRouteId={focusedRoute.id} isAwake={isAwake} onActivateRoute={activateRoute} onFocusRoute={focusRoute} routes={routes} />
          <div className="brrrdle-lunar-cursor" aria-hidden="true" />
        </>
      ) : null}
      <div className="brrrdle-lunar-noise" aria-hidden="true" />

      <div className="brrrdle-lunar-interface">
        <header className="brrrdle-lunar-topbar" aria-label="Brrrdle lunar controls">
          <button
            className="brrrdle-lunar-brand"
            onClick={() => {
              onNavigate('home')
              setIsAwake(false)
            }}
            type="button"
          >
            <span>brrrdle</span>
            <small>Lunar Command Deck</small>
          </button>
          <div className="brrrdle-lunar-account-stack">
            <div className="brrrdle-lunar-account">
              {accountControls}
            </div>
            {dailyCountdown}
            {!isAwake ? (
              <span className="brrrdle-lunar-daily-status">
                <span aria-hidden="true" />
                Daily puzzle ready
              </span>
            ) : null}
          </div>
        </header>

        {!isAwake ? (
          <main className="brrrdle-lunar-intro" aria-label="Brrrdle route selector">
            <section className="brrrdle-lunar-hero">
              <span>
                {isLunarSurface
                  ? `Glide across the lunar field to preview a destination, then click a colored tab below to open ${focusedRoute.label}.`
                  : `Pick a colored tab below to open ${focusedRoute.label}.`}
              </span>
            </section>

            <nav aria-label="Lunar route dock" className="brrrdle-lunar-dock">
              {routes.map((route, index) => {
                const isFocused = route.id === focusedRoute.id
                return (
                  <button
                    aria-current={isFocused ? 'true' : undefined}
                    className="brrrdle-lunar-dock-chip"
                    key={route.id}
                    onClick={() => activateRoute(route.id)}
                    onFocus={() => focusRoute(route.id)}
                    onPointerEnter={() => focusRoute(route.id)}
                    style={{ '--signal-color': getRouteColor(index) } as CSSProperties}
                    type="button"
                  >
                    <span aria-hidden="true" />
                    {route.shortLabel}
                  </button>
                )
              })}
            </nav>
          </main>
        ) : (
          <main className="brrrdle-lunar-grid">
            <nav aria-label="Brrrdle destinations" className="brrrdle-lunar-rail">
              {routes.map((route, index) => {
                const isActive = route.id === activeRoute.id
                return (
                  <button
                    aria-current={isActive ? 'page' : undefined}
                    className="brrrdle-lunar-rail-button"
                    key={route.id}
                    onClick={() => activateRoute(route.id)}
                    onFocus={() => focusRoute(route.id)}
                    onPointerEnter={() => focusRoute(route.id)}
                    style={{ '--signal-color': getRouteColor(index) } as CSSProperties}
                    type="button"
                  >
                    <span className="brrrdle-lunar-rail-light" aria-hidden="true" />
                    <span>
                      <strong>{route.shortLabel}</strong>
                      <small>{getRouteEyebrow(route)}</small>
                    </span>
                  </button>
                )
              })}
            </nav>

            <section className="brrrdle-lunar-playfield" style={{ '--signal-color': getRouteColor(activeRouteIndex) } as CSSProperties} aria-labelledby="active-route-title">
              <div className="brrrdle-lunar-route-head">
                <div>
                  <p>Current tab</p>
                  <h1 id="active-route-title">{activeRoute.label}</h1>
                  <span>{activeRoute.description}</span>
                </div>
                <span className="brrrdle-lunar-live-chip">Ready</span>
              </div>
              <div className="brrrdle-lunar-route-body">
                {children}
              </div>
            </section>

            <aside className="brrrdle-lunar-side" aria-label="Deck readout">
              <section className="brrrdle-lunar-panel brrrdle-lunar-status">
                <p>Mode deck</p>
                <h2>{activeRoute.shortLabel}</h2>
                <span>Use the rail to switch tabs, or tap brrrdle to return to the lunar route field.</span>
              </section>

              <section className="brrrdle-lunar-panel brrrdle-lunar-metrics" aria-label="Brrrdle status">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </section>

              <section className="brrrdle-lunar-panel brrrdle-lunar-lines" aria-label="System readout">
                {statusLines.map((line) => (
                  <p key={line.label}>
                    <span>{line.label}</span>
                    <span className="brrrdle-lunar-line-value">{line.value}</span>
                  </p>
                ))}
              </section>

            </aside>
          </main>
        )}
      </div>
    </div>
  )
}
