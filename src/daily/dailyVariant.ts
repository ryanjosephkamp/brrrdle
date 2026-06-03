/**
 * Phase 22 — Daily variant descriptor (modular multiplayer preparation).
 *
 * Source of truth: PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02 / §27
 * goal 7: "Design the daily reset / rollover logic modularly so it can later
 * support a special multiplayer daily variant with separate statistics —
 * without implementing multiplayer in this phase."
 *
 * This module introduces a single seam — the `DailyVariant` — that the rollover
 * service, countdown, and anti-gaming guard are parameterised by. Today only
 * the `'solo'` variant exists and is the default everywhere. A future phase can
 * add a `'multiplayer'` variant (with its own storage namespace and separate
 * statistics) by extending the registry below, with **no** change to the
 * rollover/countdown/anti-gaming logic itself.
 *
 * NOTE: No multiplayer behaviour is implemented here. This is architecture only.
 */

export type DailyVariant = 'solo'

export interface DailyVariantDescriptor {
  /** Stable identifier used in storage keys and analytics. */
  readonly id: DailyVariant
  /** Human-readable label for UI surfaces. */
  readonly label: string
  /**
   * Storage-key prefix that namespaces this variant's persisted state (resume
   * slots, anti-gaming anchor, etc.). Keeping the prefix per-variant is what
   * lets a future multiplayer daily keep *separate statistics* without
   * colliding with the solo daily.
   */
  readonly storagePrefix: string
}

export const SOLO_DAILY_VARIANT: DailyVariantDescriptor = {
  id: 'solo',
  label: 'Daily',
  storagePrefix: 'brrrdle:daily',
}

export const DAILY_VARIANTS: Readonly<Record<DailyVariant, DailyVariantDescriptor>> = {
  solo: SOLO_DAILY_VARIANT,
}

export const DEFAULT_DAILY_VARIANT: DailyVariant = 'solo'

export function getDailyVariantDescriptor(variant: DailyVariant = DEFAULT_DAILY_VARIANT): DailyVariantDescriptor {
  return DAILY_VARIANTS[variant] ?? SOLO_DAILY_VARIANT
}
