/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'
import { useLazyClassificationStoreGetLayoutByGroupQuery } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { subscribeToClassificationStoreConfigurationChange } from '@Pimcore/modules/data-object/classification-store/classification-store-configuration-change'
import type { ClassificationStoreGroupLayout2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { useClassificationStore } from '../provider'

// Assigning n keys sends n mutations that confirm one after the other; they settle into one refresh.
export const LAYOUT_REFRESH_DEBOUNCE_MS = 100

export interface UseLayoutRefreshProps {
  objectId: number
  fieldName: string
}

const arrivedKeyIds = (known: ClassificationStoreGroupLayout2, refreshed: ClassificationStoreGroupLayout2): string[] => {
  const knownKeyIds = new Set((known.keys ?? []).map((key) => key.id))
  return (refreshed.keys ?? []).filter((key) => !knownKeyIds.has(key.id)).map((key) => String(key.id))
}

/**
 * Re-requests the layout of every group the field holds one for whenever the classification store
 * configuration changed (a burst of changes counts once), and replaces the layout only. The form values are never touched.
 */
export const useLayoutRefresh = ({ objectId, fieldName }: UseLayoutRefreshProps): void => {
  const { currentLayoutData, updateCurrentLayoutData, markKeysAsNew } = useClassificationStore()
  const [fetchGroupLayout] = useLazyClassificationStoreGetLayoutByGroupQuery()

  const layoutRef = useRef(currentLayoutData)
  layoutRef.current = currentLayoutData
  const requestRef = useRef(0)

  useEffect(() => {
    // Bypasses the cache, so a layout fetched earlier is never served stale.
    const fetchGroupLayoutOrUndefined = async (groupId: number): Promise<ClassificationStoreGroupLayout2 | undefined> =>
      await fetchGroupLayout({ objectId, fieldName, groupId }, false).unwrap().catch(() => undefined)

    const refresh = async (): Promise<void> => {
      const requestId = ++requestRef.current
      const heldGroupIds = layoutRef.current.map((group) => group.id)
      if (heldGroupIds.length === 0) return

      const responses = await Promise.all(heldGroupIds.map(async (groupId) => await fetchGroupLayoutOrUndefined(groupId)))

      // A newer refresh superseded this one, or the field is gone.
      if (requestId !== requestRef.current) return

      const fresh = new Map<number, ClassificationStoreGroupLayout2>()
      responses.forEach((response) => {
        if (response !== undefined) fresh.set(response.id, response)
      })

      // Groups added or removed while the requests were in flight stay as they are now.
      const latest = layoutRef.current
      latest.forEach((group) => {
        const refreshed = fresh.get(group.id)
        if (refreshed !== undefined) markKeysAsNew(String(group.id), arrivedKeyIds(group, refreshed))
      })

      updateCurrentLayoutData(latest.map((group) => fresh.get(group.id) ?? group))
    }

    const runRefresh = (): void => { refresh().catch(() => undefined) }

    let timer: ReturnType<typeof setTimeout> | undefined
    const unsubscribe = subscribeToClassificationStoreConfigurationChange(() => {
      clearTimeout(timer)
      timer = setTimeout(runRefresh, LAYOUT_REFRESH_DEBOUNCE_MS)
    })

    return () => {
      clearTimeout(timer)
      requestRef.current++
      unsubscribe()
    }
  }, [objectId, fieldName, fetchGroupLayout, updateCurrentLayoutData, markKeysAsNew])
}
