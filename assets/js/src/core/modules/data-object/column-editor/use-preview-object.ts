/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { api } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'

const SYSTEM_COLUMNS = [
  { key: 'id', type: 'system.id', group: ['system'] as string[], config: [] as never[] },
  { key: 'fullpath', type: 'system.string', group: ['system'] as string[], config: [] as never[] }
]

export interface UsePreviewObjectReturn {
  objectId: number | null
  openElementSelector: () => void
}

/**
 * The object the column previews render against: the first object of the class until the user
 * picks one. Scoped to the class - a class change drops a manual pick and never reuses the
 * previous class's object (`currentData`, not `data`, which keeps the old argument's result while
 * the new one loads).
 */
export const usePreviewObject = (
  resolvedClassId: string | undefined,
  entity: string | undefined
): UsePreviewObjectReturn => {
  const [objectId, setObjectId] = useState<number | null>(null)
  const hasManualSelection = useRef(false)
  const lastClassId = useRef(resolvedClassId)

  const { currentData: gridData } = api.endpoints.dataObjectGetGrid.useQuery(
    resolvedClassId !== undefined
      ? {
          classId: resolvedClassId,
          body: {
            folderId: 1,
            columns: SYSTEM_COLUMNS,
            filters: { includeDescendants: true, page: 1, pageSize: 1 }
          }
        }
      : skipToken
  )

  useEffect(() => {
    if (lastClassId.current !== resolvedClassId) {
      lastClassId.current = resolvedClassId
      hasManualSelection.current = false
      setObjectId(null)
    }

    if (hasManualSelection.current) return
    const firstItem = gridData?.items?.[0]
    if (firstItem?.id !== undefined) {
      setObjectId(firstItem.id)
    }
  }, [gridData?.items, resolvedClassId])

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: { object: true, asset: false, document: false },
    config: {
      objects: {
        allowedTypes: ['object'],
        ...(entity !== undefined ? { allowedClasses: [entity] } : {})
      }
    },
    onFinish: (event) => {
      const item = event?.items?.[0]
      if (item !== undefined) {
        hasManualSelection.current = true
        setObjectId(item.data.id)
      }
    }
  })

  return { objectId, openElementSelector }
}
