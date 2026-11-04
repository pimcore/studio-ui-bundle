/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useSyncExternalStore } from 'react'

/**
 * The groups that have a batch of sub-group upserts still settling, keyed by store and group.
 *
 * Held outside the grid on purpose. `groups-tab.tsx` keys `KeyGroupRelationsGrid` on store and
 * group, so switching group remounts it, and a lock kept in that component's own state was
 * cleared by leaving a group and coming back while its batch was still in flight: the per-row
 * delete, the inline cells and a second batch all became available again, and an upsert that
 * reached the server after a delete recreated the relation it had just removed — the upsert
 * creates what it cannot find.
 *
 * Keyed by store and group so a batch in one group never holds another group's actions, and so
 * the selection can keep being reset on a group change without the lock going with it.
 */
const running = new Set<string>()
const listeners = new Set<() => void>()

const lockKey = (storeId: number, groupId: number): string => `${storeId}:${groupId}`

const notify = (): void => {
  listeners.forEach((listener) => { listener() })
}

/**
 * Takes the lock for one group, or reports that a batch over it is already settling.
 *
 * Synchronous on purpose: a second batch started before React has re-rendered with the disabled
 * buttons still has to be refused.
 */
export const acquireSubGroupAssignLock = (storeId: number, groupId: number): boolean => {
  const key = lockKey(storeId, groupId)

  if (running.has(key)) return false

  running.add(key)
  notify()

  return true
}

export const releaseSubGroupAssignLock = (storeId: number, groupId: number): void => {
  if (!running.delete(lockKey(storeId, groupId))) return

  notify()
}

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener)

  return () => { listeners.delete(listener) }
}

/** True while a batch of sub-group upserts over the given group is still settling. */
export const useSubGroupAssignLock = (storeId: number, groupId: number | undefined): boolean =>
  useSyncExternalStore(
    subscribe,
    () => groupId !== undefined && running.has(lockKey(storeId, groupId))
  )
