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
import { useDroppable as useSortDroppable } from '@dnd-kit/core'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { EditableDropzoneContent } from './dropzone-content'

export interface EditableDropzoneProps {
  id: string
  index: number
  onDropItem?: (info: any, index: number) => Promise<void>
  isValidDrop?: (info: any) => boolean
}

export const EditableDropzone = ({ id, index, onDropItem, isValidDrop }: EditableDropzoneProps): React.JSX.Element => {
  const { setNodeRef } = useSortDroppable({ id })
  
  const handleDrop = async (info: any): Promise<void> => {
    if (onDropItem != null) {
      await onDropItem(info, index)
    }
  }

  const validateDrop = isValidDrop ?? (() => false)

  return (
    <Droppable
      disableDndActiveIndicator={ false }
      isValidContext={ validateDrop }
      isValidData={ validateDrop }
      onDrop={ handleDrop }
    >
      <EditableDropzoneContent
        id={ id }
        index={ index }
        setNodeRef={ setNodeRef }
      />
    </Droppable>
  )
}
