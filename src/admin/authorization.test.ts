import { describe, expect, it } from 'vitest'
import { evaluateAdminAccess } from './authorization'

describe('admin authorization', () => {
  it('requires authenticated admin role', () => {
    expect(evaluateAdminAccess({ status: 'unconfigured' })).toEqual({ allowed: false, reason: 'unconfigured' })
    expect(evaluateAdminAccess({ status: 'anonymous' })).toEqual({ allowed: false, reason: 'missing-authentication' })
    expect(evaluateAdminAccess({ status: 'authenticated', user: { id: 'user', roles: [] } })).toEqual({ allowed: false, reason: 'missing-admin-role' })
    expect(evaluateAdminAccess({ status: 'authenticated', user: { id: 'admin', roles: ['admin'] } })).toEqual({ allowed: true })
  })
})
