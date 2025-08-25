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
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { type AreablockManager } from '../utils/areablock-manager'
import { type AreaType, type AreablockEditableConfig } from '../areablock-editable'
import {
  useEditableDropzoneSorting,
  type UseEditableDropzoneSortingReturn,
  type EditableManager
} from '../../../helpers/editable-dropzone-sorting/hooks/use-editable-dropzone-sorting'

export interface UseAreablockSortingProps {
  areablockManager: AreablockManager
  areaTypes: AreaType[]
  onMoveArea: (fromIndex: number, toIndex: number) => void
}

export interface UseAreablockSortingReturn extends UseEditableDropzoneSortingReturn {
  dragOverlayTitle: string | undefined
}

export const useAreablockSorting = ({
  areablockManager,
  areaTypes,
  onMoveArea
}: UseAreablockSortingProps): UseAreablockSortingReturn => {
  const { t } = useTranslation()

  const sortingResult = useEditableDropzoneSorting({
    editableManager: areablockManager as EditableManager,
    onMoveItem: onMoveArea
  })

  // Calculate drag overlay title for areablocks
  const dragOverlayTitle = useMemo(() => {
    if (sortingResult.activeId === null) return undefined

    const currentItemEntries = areablockManager.queryElements()
    const activeElement = currentItemEntries.find(el => areablockManager.getElementKey(el) === sortingResult.activeId)
    if (isUndefined(activeElement)) return undefined

    // Try to get type-specific title if manager supports it
    if (!isUndefined(areablockManager.getElementType) && areaTypes.length > 0) {
      const elementType = areablockManager.getElementType(activeElement)
      const areaType = areaTypes.find(type => type.type === elementType)
      return (areaType?.name != null) ? t(areaType.name) : undefined
    }

    return undefined
  }, [sortingResult.activeId, areablockManager, areaTypes, t])

  return {
    ...sortingResult,
    dragOverlayTitle
  }
}
