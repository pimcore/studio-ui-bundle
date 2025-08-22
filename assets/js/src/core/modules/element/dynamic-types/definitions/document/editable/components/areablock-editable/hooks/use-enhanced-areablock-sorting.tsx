/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { type AreaType, type AreablockEditableConfig } from '../areablock-editable'
import { type AreablockManager } from '../utils/areablock-manager'
import {
  useEnhancedEditableDropzoneSorting,
  type UseEnhancedEditableDropzoneSortingProps
} from '../../../helpers/editable-dropzone-sorting/hooks/use-enhanced-editable-dropzone-sorting'
import { type UseEditableDropzoneSortingReturn } from '../../../helpers/editable-dropzone-sorting/hooks/use-editable-dropzone-sorting'

export interface UseEnhancedAreablockSortingProps {
  areablockManager: AreablockManager
  areaTypes: AreaType[]
  config?: AreablockEditableConfig
  onMoveArea: (fromIndex: number, toIndex: number) => void
  onAddAreaAtIndex?: (areaType: string, index: number) => Promise<void>
}

export interface UseEnhancedAreablockSortingReturn extends UseEditableDropzoneSortingReturn {
  dragOverlayTitle: string
}

export const useEnhancedAreablockSorting = ({
  areablockManager,
  areaTypes,
  config,
  onMoveArea,
  onAddAreaAtIndex
}: UseEnhancedAreablockSortingProps): UseEnhancedAreablockSortingReturn => {
  const sortingProps: UseEnhancedEditableDropzoneSortingProps<AreablockManager> = useMemo(() => ({
    editableManager: areablockManager,
    onMoveItem: onMoveArea,
    onAddAreaAtIndex,
    config
  }), [areablockManager, onMoveArea, onAddAreaAtIndex, config])

  const sortingResult = useEnhancedEditableDropzoneSorting(sortingProps)

  const dragOverlayTitle = useMemo(() => {
    if (sortingResult.activeId === null) return ''

    const activeElement = areablockManager.queryElements().find(element => {
      const key = areablockManager.getElementKey(element)
      return key === sortingResult.activeId
    })

    if (activeElement === undefined) return ''

    const elementType = areablockManager.getElementType?.(activeElement)
    const areaType = areaTypes.find(type => type.type === elementType)

    return areaType?.name ?? elementType ?? ''
  }, [sortingResult.activeId, areablockManager, areaTypes])

  return {
    ...sortingResult,
    dragOverlayTitle
  }
}
