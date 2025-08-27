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
import { injectable } from 'inversify'
import { DynamicTypeDocumentEditableAbstract, type AbstractDocumentEditableDefinition } from '../../dynamic-type-document-editable-abstract'
import { EditableDropzone } from '../../helpers/editable-dropzone-sorting/components/editable-dropzone/editable-dropzone'

export interface DropzoneEditableDefinition extends AbstractDocumentEditableDefinition {
  config: {
    index?: number
    isValidDrop?: (info: any) => boolean
    onDropItem?: (info: any, index: number) => Promise<void>
  }
}

@injectable()
export class DynamicTypeDocumentEditableDropzone extends DynamicTypeDocumentEditableAbstract {
  id: string = 'dropzone'

  getEditableDataComponent(props: DropzoneEditableDefinition): React.ReactElement {
    const { config } = props
    const dropzoneId = `dropzone-${props.id}`
    
    return (
      <EditableDropzone
        id={dropzoneId}
        index={config.index ?? 0}
        isValidDrop={config.isValidDrop}
        onDropItem={config.onDropItem}
        key={dropzoneId}
      />
    )
  }
}
