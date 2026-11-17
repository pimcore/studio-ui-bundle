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
import { isNil, isString, isUndefined } from 'lodash'
import { type AreablockManager } from '../utils/areablock-manager'
import { type AreablockEditableConfig, type AreaType } from '../areablock-editable'
import { configUtils } from '../utils/areablock-utils'
import {
  useBlockManagerDropzones,
  type UseBlockManagerDropzonesReturn
} from '../../../helpers/editable-dropzone-sorting/hooks/use-block-manager-dropzones'
import { type DragAndDropInfo } from '@sdk/components'

export interface UseAreablockDropzonesProps {
  areablockManager: AreablockManager
  areaTypes: AreaType[]
  config?: AreablockEditableConfig
  getCurrentElements?: () => HTMLElement[]
  onMoveArea: (fromIndex: number, toIndex: number) => void
  onDropAreablock?: (areaType: string, index: number) => Promise<void>
}

export interface UseAreablockDropzonesReturn extends UseBlockManagerDropzonesReturn {
  dragOverlayTitle: string | undefined
}

export const useAreablockDropzones = ({
  areablockManager,
  areaTypes,
  config,
  getCurrentElements,
  onMoveArea,
  onDropAreablock
}: UseAreablockDropzonesProps): UseAreablockDropzonesReturn => {
  const { t } = useTranslation()

  const isValidAreablockDrop = (info: DragAndDropInfo): boolean => {
    const areablockType = info.data?.areablockType
    if (info.type !== 'areablock-type' || !isString(areablockType)) {
      return false
    }

    if (!areaTypes.some(areaType => areaType.type === areablockType)) {
      return false
    }

    const countedElements = getCurrentElements?.() ?? areablockManager.queryElements()
    const typeUsageCounts = configUtils.getTypeUsageCounts(countedElements.map(el => areablockManager.getElementType(el)))
    return !configUtils.isTypeLimitReached(config, areablockType, typeUsageCounts[areablockType] ?? 0)
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
