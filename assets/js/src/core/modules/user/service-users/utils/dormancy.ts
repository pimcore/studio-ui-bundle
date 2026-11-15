/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNull } from 'lodash'

const SECONDS_PER_DAY = 86400
const WARNING_AFTER_DAYS = 90
const DORMANT_AFTER_DAYS = 180

export type DormancyStatus = 'never-used' | 'in-use' | 'warning' | 'dormant'

export interface ServiceUserFilter {
  searchTerm: string
  unusedForMoreThanDays: number | null
}

interface FilterableServiceUser {
  name: string
  lastLogin: number | null
}

export const nowInSeconds = (): number => Math.floor(Date.now() / 1000)

/**
 * A service user that never authenticated counts as unused: it holds credentials nobody uses.
 */
export const isUnusedForMoreThan = (lastLogin: number | null, days: number, now: number): boolean => {
  if (isNull(lastLogin)) {
    return true
  }

  return now - lastLogin > days * SECONDS_PER_DAY
}

export const getDormancyStatus = (lastLogin: number | null, now: number): DormancyStatus => {
  if (isNull(lastLogin)) {
    return 'never-used'
  }

  if (isUnusedForMoreThan(lastLogin, DORMANT_AFTER_DAYS, now)) {
    return 'dormant'
  }

  if (isUnusedForMoreThan(lastLogin, WARNING_AFTER_DAYS, now)) {
    return 'warning'
  }

  return 'in-use'
}

export const filterServiceUsers = <T extends FilterableServiceUser>(
  items: T[],
  { searchTerm, unusedForMoreThanDays }: ServiceUserFilter,
  now: number
): T[] => {
  const needle = searchTerm.trim().toLowerCase()

  return items.filter((item) => {
    if (needle !== '' && !item.name.toLowerCase().includes(needle)) {
      return false
    }

    return isNull(unusedForMoreThanDays) || isUnusedForMoreThan(item.lastLogin, unusedForMoreThanDays, now)
  })
}
