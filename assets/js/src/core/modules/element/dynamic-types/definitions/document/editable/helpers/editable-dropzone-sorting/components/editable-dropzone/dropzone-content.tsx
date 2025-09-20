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
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { useEditableDropzoneStyles } from './editable-dropzone.styles'
import cn from 'classnames'

export interface EditableDropzoneContentProps {
  id?: string
  index?: number
  setNodeRef?: (element: HTMLElement | null) => void
}

export const EditableDropzoneContent = ({ id, index, setNodeRef }: EditableDropzoneContentProps): React.JSX.Element => {
  const { styles } = useEditableDropzoneStyles()
  const { isDragActive, isOver, isValid } = useDroppable()

  return (
    <div
      className={ cn(
        styles.dropzone,
        'pimcore-editable-dropzone',
        {
          [styles.dropzoneDragActive]: isDragActive,
          [styles.dropzoneHover]: isOver && isValid,
          [styles.dropzoneRejected]: isOver && !isValid
        }
      ) }
      data-pimcore-dropzone-id={ id ?? 'default-dropzone' }
      data-pimcore-dropzone-index={ index ?? 0 }
      ref={ setNodeRef }
    />
  )
}
