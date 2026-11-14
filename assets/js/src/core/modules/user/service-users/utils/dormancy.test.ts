/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { filterServiceUsers, getDormancyStatus, isUnusedForMoreThan } from './dormancy'

const DAY = 86400
const NOW = 1_800_000_000

const serviceUser = (name: string, lastLogin: number | null): { name: string, lastLogin: number | null } => ({
  name,
  lastLogin
})

describe('isUnusedForMoreThan', () => {
  it('treats a service user that was never used as unused', () => {
    expect(isUnusedForMoreThan(null, 30, NOW)).toBe(true)
  })

  it('is false when the last use is within the period', () => {
    expect(isUnusedForMoreThan(NOW - (10 * DAY), 30, NOW)).toBe(false)
  })

  it('is false on the exact boundary and true one second after it', () => {
    expect(isUnusedForMoreThan(NOW - (30 * DAY), 30, NOW)).toBe(false)
    expect(isUnusedForMoreThan(NOW - (30 * DAY) - 1, 30, NOW)).toBe(true)
  })
})

describe('getDormancyStatus', () => {
  it('reports never used', () => {
    expect(getDormancyStatus(null, NOW)).toBe('never-used')
  })

  it('reports in use below 90 days', () => {
    expect(getDormancyStatus(NOW - (89 * DAY), NOW)).toBe('in-use')
  })

  it('warns after 90 days', () => {
    expect(getDormancyStatus(NOW - (91 * DAY), NOW)).toBe('warning')
  })

  it('reports dormant after 180 days', () => {
    expect(getDormancyStatus(NOW - (181 * DAY), NOW)).toBe('dormant')
  })
})

describe('filterServiceUsers', () => {
  const items = [
    serviceUser('svc-erp-sync', NOW - DAY),
    serviceUser('svc-pim-export', NOW - (100 * DAY)),
    serviceUser('svc-agent', null)
  ]

  it('returns every service user without a filter', () => {
    expect(filterServiceUsers(items, { searchTerm: '', unusedForMoreThanDays: null }, NOW)).toEqual(items)
  })

  it('keeps only the service users unused for more than N days', () => {
    const result = filterServiceUsers(items, { searchTerm: '', unusedForMoreThanDays: 90 }, NOW)

    expect(result.map((item) => item.name)).toEqual(['svc-pim-export', 'svc-agent'])
  })

  it('filters by name, case-insensitive', () => {
    const result = filterServiceUsers(items, { searchTerm: ' ERP ', unusedForMoreThanDays: null }, NOW)

    expect(result.map((item) => item.name)).toEqual(['svc-erp-sync'])
  })

  it('combines the name and the unused filter', () => {
    const result = filterServiceUsers(items, { searchTerm: 'export', unusedForMoreThanDays: 200 }, NOW)

    expect(result).toEqual([])
  })
})
