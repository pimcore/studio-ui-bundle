/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { type DragEndEvent } from '@dnd-kit/core'
import { type AreablockManager } from '../utils/areablock-manager'
import { type AreaType, type AreablockEditableConfig } from '../areablock-editable'
import { configUtils } from '../utils/areablock-utils'
import {
  useEditableDropzoneSorting,
  type UseEditableDropzoneSortingReturn,
  type EditableManager
} from '../../../helpers/editable-dropzone-sorting/hooks/use-editable-dropzone-sorting'
import { DROPZONE_CONFIG, DROPZONE_ATTRIBUTES } from '../../../helpers/editable-dropzone-sorting/constants/dropzone-constants'

export interface UseAreablockSortingWithAddProps {
  areablockManager: AreablockManager
  areaTypes: AreaType[]
  config?: AreablockEditableConfig
  onMoveArea: (fromIndex: number, toIndex: number) => void
  onAddArea: (areaType: string, index: number) => void
}

export interface UseAreablockSortingWithAddReturn extends UseEditableDropzoneSortingReturn {
  dragOverlayTitle: string | undefined
  handleDragEnd: (event: DragEndEvent) => void
}

export const useAreablockSortingWithAdd = ({
  areablockManager,
  areaTypes,
  config,
  onMoveArea,
  onAddArea
}: UseAreablockSortingWithAddProps): UseAreablockSortingWithAddReturn => {
  const { t } = useTranslation()

  const sortingResult = useEditableDropzoneSorting({
    editableManager: areablockManager as EditableManager,
    onMoveItem: onMoveArea
  })

  // Calculate drag overlay title for areablocks
  const dragOverlayTitle = useMemo(() => {
    if (sortingResult.activeId === null) return undefined

    // Check if this is a sidebar item being dragged
    if (sortingResult.activeId.startsWith('sidebar-areablock-')) {
      const parts = sortingResult.activeId.split('-')
      if (parts.length >= 3) {
        const areaType = parts[2]
        const foundType = areaTypes.find(type => type.type === areaType)
        return foundType ? t(foundType.name) : areaType
      }
    }

    // Handle existing area items
    const currentItemEntries = areablockManager.queryElements()
    const activeElement = currentItemEntries.find(el => areablockManager.getElementKey(el) === sortingResult.activeId)
    if (isUndefined(activeElement)) return undefined

    const activeType = areablockManager.getElementType(activeElement)
    const foundType = areaTypes.find(type => type.type === activeType)
    return foundType ? t(foundType.name) : activeType ?? undefined
  }, [sortingResult.activeId, areaTypes, areablockManager, t])

  // Enhanced drag end handler that can handle both sorting and adding
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    
    if (over === null) {
      // Call original handler for cleanup
      sortingResult.handleDragEnd(event)
      return
    }

    const overId = String(over.id)
    const activeId = String(active.id)

    // Check if this is a sidebar item being dropped
    if (activeId.startsWith('sidebar-areablock-')) {
      if (overId.startsWith(DROPZONE_CONFIG.ID_PREFIX)) {
        const dropzoneElement = document.querySelector(`[${DROPZONE_ATTRIBUTES.DATA_DROPZONE_ID}="${overId}"]`)
        const dropzoneIndexStr = dropzoneElement?.getAttribute(DROPZONE_ATTRIBUTES.DATA_DROPZONE_INDEX)
        const dropzoneIndex = dropzoneIndexStr ? parseInt(dropzoneIndexStr, 10) : NaN

        if (!isNaN(dropzoneIndex)) {
          // Extract area type from the drag data
          const dragData = active.data.current
          if (dragData?.type === 'areablock-type' && dragData?.areablockType) {
            const areaType = dragData.areablockType

            // Check if this type is allowed in this areablock
            if (configUtils.isTypeAllowed(config, areaType)) {
              onAddArea(areaType, dropzoneIndex)
            }
          }
        }
      }
      
      // Call original handler for cleanup
      sortingResult.handleDragEnd(event)
      return
    }

    // For existing items, use the original sorting logic
    sortingResult.handleDragEnd(event)
  }, [sortingResult, config, onAddArea, configUtils])

  return {
    ...sortingResult,
    dragOverlayTitle,
    handleDragEnd
  }
}
