/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { Droppable, type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { useEditableDropzoneStyles } from './editable-dropzone.styles'
import { configUtils } from '../../../../components/areablock-editable/utils/areablock-utils'
import { type AreablockEditableConfig } from '../../../../components/areablock-editable/areablock-editable'

export interface EnhancedEditableDropzoneProps {
  id: string
  index: number
  config?: AreablockEditableConfig
  onAddAreaAtIndex?: (areaType: string, index: number) => Promise<void>
}

export const EnhancedEditableDropzone = ({
  id,
  index,
  config,
  onAddAreaAtIndex
}: EnhancedEditableDropzoneProps): React.JSX.Element => {
  const { styles } = useEditableDropzoneStyles()
  const { setNodeRef } = useDroppable({ id })

  const handleNativeDrop = useCallback(async (dragInfo: DragAndDropInfo) => {
    if (dragInfo.type === 'areablock-type' && onAddAreaAtIndex) {
      const areaType = dragInfo.data.areablockType
      
      // Check if this type is allowed in this areablock
      if (configUtils.isTypeAllowed(config, areaType)) {
        await onAddAreaAtIndex(areaType, index)
      }
    }
  }, [config, index, onAddAreaAtIndex])

  const isValidDrop = useCallback((dragInfo: DragAndDropInfo): boolean => {
    return dragInfo.type === 'areablock-type' && 
           dragInfo.data.sourceType === 'sidebar' &&
           configUtils.isTypeAllowed(config, dragInfo.data.areablockType)
  }, [config])

  return (
    <Droppable
      isValidContext={isValidDrop}
      onDrop={handleNativeDrop}
      disableDndActiveIndicator={false}
    >
      <div
        className={`${styles.dropzone} pimcore-editable-dropzone`}
        data-pimcore-dropzone-id={id}
        data-pimcore-dropzone-index={index}
        ref={setNodeRef}
      />
    </Droppable>
  )
}
