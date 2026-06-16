/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@sdk/app'
import {
  useElementLockMutation,
  useElementUnlockMutation,
  useLazyElementGetEditlockQuery
} from '@Pimcore/modules/element/element-api-slice-enhanced'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { EditLockWarning } from '@Pimcore/modules/element/components/edit-lock-warning/edit-lock-warning'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { closeWidget } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { elementOpeningService } from '@Pimcore/app/public-api/element/element-api'
import {
  beginEditLockCheck,
  clearEditLockCheck,
  registerEditLockRenewHandler,
  resolveEditLockCheck,
  unregisterEditLockRenewHandler
} from '@Pimcore/modules/element/services/edit-lock-gate'
import trackError, { ApiError, isApiErrorData } from '@Pimcore/modules/app/error-handler'

// Renew at most once per this interval (well under the backend lock TTL).
const LOCK_RENEW_INTERVAL_MS = 15 * 60 * 1000

export interface UseEditLockProps {
  id: number
  elementType: ElementType
  /** Editor dirty flag; the lock is acquired on the first clean → dirty transition. */
  modified: boolean
  /** Full path of the element, shown in the conflict modal. */
  path?: string
}

/**
 * Concurrent-editing edit lock (#2318), mirroring classic UI (admin-ui-classic-bundle #724):
 * acquire on first edit (not on open), warn when another session holds it, release on close/unload.
 */
export const useEditLock = ({ id, elementType, modified, path }: UseEditLockProps): void => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const modal = useFormModal()

  const [triggerGetEditlock] = useLazyElementGetEditlockQuery()
  const [lockElement] = useElementLockMutation()
  const [unlockElement] = useElementUnlockMutation()

  const acquiredRef = useRef(false)
  const checkedRef = useRef(false)
  const lastLockTouchRef = useRef(0)

  const acquire = useCallback(async (): Promise<void> => {
    try {
      await lockElement({ id, elementType }).unwrap()
      acquiredRef.current = true
      lastLockTouchRef.current = Date.now()
    } catch (error) {
      if (isApiErrorData(error)) {
        trackError(new ApiError(error))
      }
    }
  }, [id, elementType, lockElement])

  const renewIfDue = useCallback((): void => {
    if (!acquiredRef.current) {
      return
    }
    if (Date.now() - lastLockTouchRef.current < LOCK_RENEW_INTERVAL_MS) {
      return
    }

    // Stamp up front so concurrent autosaves don't all renew.
    lastLockTouchRef.current = Date.now()
    void lockElement({ id, elementType }).unwrap().catch((error) => {
      if (isApiErrorData(error)) {
        trackError(new ApiError(error))
      }
    })
  }, [id, elementType, lockElement])

  const takeOver = useCallback(async (): Promise<void> => {
    // DELETE then POST: edit_lock is keyed by id, so POST won't overwrite — remove the other lock first.
    try {
      await unlockElement({ id, elementType }).unwrap()
    } catch (error) {
      if (isApiErrorData(error)) {
        trackError(new ApiError(error))
      }
    }
    await acquire()
    resolveEditLockCheck(elementType, id, true)
  }, [id, elementType, unlockElement, acquire])

  const closeAndReopen = useCallback((): void => {
    dispatch(closeWidget(getWidgetId(elementType, id)))
    void elementOpeningService.openElement(id, elementType)
  }, [id, elementType, dispatch])

  const resolveLockOnFirstEdit = useCallback(async (): Promise<void> => {
    if (checkedRef.current) {
      return
    }
    checkedRef.current = true

    try {
      const status = await triggerGetEditlock({ id, elementType }).unwrap()

      if (status.isLocked) {
        modal.confirm({
          title: t('element.edit-lock.title'),
          content: (
            <EditLockWarning
              date={ status.date }
              elementType={ elementType }
              path={ path }
              userName={ status.user?.name }
            />
          ),
          okText: t('element.edit-lock.continue'),
          cancelText: t('element.edit-lock.cancel'),
          onOk: () => {
            void takeOver()
          },
          onCancel: () => {
            // Abort the held autosave and discard via close & reopen.
            resolveEditLockCheck(elementType, id, false)
            closeAndReopen()
          }
        })
        return
      }

      await acquire()
      resolveEditLockCheck(elementType, id, true)
    } catch (error) {
      // Check failed: proceed without a lock and don't re-check (the gate is armed once, on mount).
      resolveEditLockCheck(elementType, id, true)
      if (isApiErrorData(error)) {
        trackError(new ApiError(error))
      }
    }
  }, [id, elementType, path, triggerGetEditlock, modal, t, acquire, takeOver, closeAndReopen])

  // Arm the gate on mount — some editors flip `modified` and autosave in the same tick.
  useEffect(() => {
    beginEditLockCheck(elementType, id)

    return () => {
      clearEditLockCheck(elementType, id)
    }
  }, [id, elementType])

  // Renew the lock (throttled) on each autosave so long sessions don't hit the TTL.
  useEffect(() => {
    registerEditLockRenewHandler(elementType, id, renewIfDue)

    return () => {
      unregisterEditLockRenewHandler(elementType, id)
    }
  }, [id, elementType, renewIfDue])

  useEffect(() => {
    if (modified && !checkedRef.current) {
      void resolveLockOnFirstEdit()
    }
  }, [modified, resolveLockOnFirstEdit])

  useEffect(() => {
    return () => {
      if (acquiredRef.current) {
        acquiredRef.current = false
        void unlockElement({ id, elementType })
      }
    }
  }, [id, elementType, unlockElement])

  // Release on browser close/reload — `keepalive` fetch (not sendBeacon, which is POST-only).
  useEffect(() => {
    const releaseOnUnload = (): void => {
      if (!acquiredRef.current) {
        return
      }

      void fetch(`${getPrefix()}/elements/${elementType}/editlock/${id.toString()}`, {
        method: 'DELETE',
        keepalive: true
      })
    }

    window.addEventListener('beforeunload', releaseOnUnload)

    return () => {
      window.removeEventListener('beforeunload', releaseOnUnload)
    }
  }, [id, elementType])
}
