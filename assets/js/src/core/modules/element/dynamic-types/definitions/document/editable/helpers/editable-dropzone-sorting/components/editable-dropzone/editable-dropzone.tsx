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
import { useDroppable } from '@dnd-kit/core'
import { useEditableDropzoneStyles } from './editable-dropzone.styles'

export interface EditableDropzoneProps {
  id: string
  index: number
}

export const EditableDropzone = ({
  id,
  index
}: EditableDropzoneProps): React.JSX.Element => {
  const { styles } = useEditableDropzoneStyles()
  const { setNodeRef } = useDroppable({
    id
  })

  return (
    <div
      className={ `${styles.dropzone} pimcore-editable-dropzone` }
      data-pimcore-dropzone-id={ id }
      data-pimcore-dropzone-index={ index }
      ref={ setNodeRef }
    />
  )
}
