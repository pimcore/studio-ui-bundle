/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useDroppable as useDndKitDroppable } from '@dnd-kit/core'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { useEditableDropzoneStyles } from './editable-dropzone.styles'
import cn from 'classnames'

export interface EditableDropzoneProps {
  id: string
  index: number
  onDropItem?: (info: any, index: number) => Promise<void>
  isValidDrop?: (info: any) => boolean
}

const DropzoneContent = ({ id, index, onDropItem, isValidDrop }: EditableDropzoneProps): React.JSX.Element => {
  const { styles } = useEditableDropzoneStyles()
  // Original dropzone for sorting
  const { setNodeRef } = useDndKitDroppable({ id })
  // New droppable for add functionality
  const { isDragActive, isOver } = useDroppable()

  return (
    <div
      className={ cn(
        styles.dropzone,
        'pimcore-editable-dropzone',
        {
          [styles.dropzoneDragActive]: isDragActive,
          [styles.dropzoneHover]: isOver
        }
      ) }
      data-pimcore-dropzone-id={ id }
      data-pimcore-dropzone-index={ index }
      ref={ setNodeRef }
    />
  )
}

export const EditableDropzone = ({ id, index, onDropItem, isValidDrop }: EditableDropzoneProps): React.JSX.Element => {
  const handleDrop = async (info: any): Promise<void> => {
    if (onDropItem != null) {
      await onDropItem(info, index)
    }
  }

  // Default validation if none provided
  const defaultValidation = (info: any): boolean => {
    return info.type === 'areablock-type' && info.data?.areablockType != null
  }

  const validateDrop = isValidDrop ?? defaultValidation

  return (
    <Droppable
      disableDndActiveIndicator={ false }
      isValidContext={ validateDrop }
      isValidData={ validateDrop }
      onDrop={ handleDrop }
    >
      <DropzoneContent
        id={ id }
        index={ index }
        isValidDrop={ isValidDrop }
        onDropItem={ onDropItem }
      />
    </Droppable>
  )
}
