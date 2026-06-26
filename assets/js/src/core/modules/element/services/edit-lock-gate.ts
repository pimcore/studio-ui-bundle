/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType } from '@Pimcore/types/enums/element/element-type'

/**
 * Coordinates autosave with the edit-lock check (#2318): autosave waits on
 * {@link awaitEditLockPersistAllowed} and only persists once the check resolves in the user's favour.
 */

interface PendingCheck {
  promise: Promise<boolean>
  resolve: (allowed: boolean) => void
}

const pendingChecks = new Map<string, PendingCheck>()

const renewHandlers = new Map<string, () => void>()

const getKey = (elementType: ElementType, id: number): string => `${elementType}:${id.toString()}`

export const registerEditLockRenewHandler = (elementType: ElementType, id: number, handler: () => void): void => {
  renewHandlers.set(getKey(elementType, id), handler)
}

export const unregisterEditLockRenewHandler = (elementType: ElementType, id: number): void => {
  renewHandlers.delete(getKey(elementType, id))
}

export const beginEditLockCheck = (elementType: ElementType, id: number): void => {
  const key = getKey(elementType, id)

  // Resolve any previous (stale) check so its waiters do not hang.
  pendingChecks.get(key)?.resolve(true)

  let resolveRef: (allowed: boolean) => void = () => {}
  const promise = new Promise<boolean>((resolve) => {
    resolveRef = resolve
  })

  pendingChecks.set(key, { promise, resolve: resolveRef })
}

// `true` lets blocked autosaves through, `false` aborts them.
export const resolveEditLockCheck = (elementType: ElementType, id: number, allowed: boolean): void => {
  const key = getKey(elementType, id)
  const pending = pendingChecks.get(key)

  if (pending !== undefined) {
    pending.resolve(allowed)
    pendingChecks.delete(key)
  }
}

export const clearEditLockCheck = (elementType: ElementType, id: number): void => {
  resolveEditLockCheck(elementType, id, false)
}

// Resolves `true` when persisting is allowed (no pending check, or it resolved in the user's favour).
export const awaitEditLockPersistAllowed = async (elementType: ElementType, id: number): Promise<boolean> => {
  const key = getKey(elementType, id)
  const pending = pendingChecks.get(key)
  const allowed = pending === undefined ? true : await pending.promise

  // A persist is going through — give the lock owner a chance to renew it (throttled in the handler).
  if (allowed) {
    renewHandlers.get(key)?.()
  }

  return allowed
}
