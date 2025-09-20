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
import { isNil, isUndefined } from 'lodash'
import { type AreablockManager } from '../utils/areablock-manager'
import { type AreaType } from '../areablock-editable'
import {
  useBlockManagerDropzones,
  type UseBlockManagerDropzonesReturn
} from '../../../helpers/editable-dropzone-sorting/hooks/use-block-manager-dropzones'
import { type DragAndDropInfo } from '@sdk/components'

export interface UseAreablockDropzonesProps {
  areablockManager: AreablockManager
  areaTypes: AreaType[]
  onMoveArea: (fromIndex: number, toIndex: number) => void
  onDropAreablock?: (areaType: string, index: number) => Promise<void>
}

export interface UseAreablockDropzonesReturn extends UseBlockManagerDropzonesReturn {
  dragOverlayTitle: string | undefined
}

export const useAreablockDropzones = ({
  areablockManager,
  areaTypes,
  onMoveArea,
  onDropAreablock
}: UseAreablockDropzonesProps): UseAreablockDropzonesReturn => {
  const { t } = useTranslation()

  const isValidAreablockDrop = (info: DragAndDropInfo): boolean => {
    if (info.type !== 'areablock-type' || info.data?.areablockType == null) {
      return false
    }

    const areablockType = info.data.areablockType
    return areaTypes.some(areaType => areaType.type === areablockType)
  }

  const handleAreablockDrop = async (info: DragAndDropInfo, index: number): Promise<void> => {
    if (!isNil(onDropAreablock)) {
      const areaType = (info.data?.areablockType as string) ?? (info.title) ?? 'default'
      await onDropAreablock(areaType, index)
    }
  }

  const dropzoneActions = useBlockManagerDropzones({
    blockManager: areablockManager,
    onMoveItem: onMoveArea,
    onDropItem: handleAreablockDrop,
    isValidDrop: isValidAreablockDrop
  })

  const dragOverlayTitle = useMemo(() => {
    if (dropzoneActions.activeId === null) return undefined

    const currentItemEntries = areablockManager.queryElements()
    const activeElement = currentItemEntries.find(el => areablockManager.getElementKey(el) === dropzoneActions.activeId)
    if (isUndefined(activeElement)) return undefined

    if (!isUndefined(areablockManager.getElementType) && areaTypes.length > 0) {
      const elementType = areablockManager.getElementType(activeElement)
      const areaType = areaTypes.find(type => type.type === elementType)
      return (areaType?.name != null) ? t(areaType.name) : undefined
    }

    return undefined
  }, [dropzoneActions.activeId, areablockManager, areaTypes])

  return {
    ...dropzoneActions,
    dragOverlayTitle
  }
}
