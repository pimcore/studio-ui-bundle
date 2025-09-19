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
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import { isNil } from 'lodash'
import { MultiSelectEditable } from '../components/multiselect-editable/multiselect-editable'
import { transformDocumentEditableStoreToOptions, type DocumentEditableStoreEntry } from '../utils/select-options'

export type MultiSelectEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    store: DocumentEditableStoreEntry[]
    width?: number
    class?: string
  }
}
export class DynamicTypeDocumentEditableMultiSelect extends DynamicTypeDocumentEditableAbstract {
  id: string = 'multiselect'

  getEditableDataComponent (props: MultiSelectEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    const options = transformDocumentEditableStoreToOptions(props.config?.store)

    return (
      <MultiSelectEditable
        className={ props.config?.class }
        inherited={ props.inherited }
        onChange={ props.onChange }
        options={ options }
        value={ props.value }
        width={ props.config?.width }
      />
    )
  }

  transformValue (value: any, props: MultiSelectEditableDefinition): any {
    if (isNil(value)) {
      return null
    }
    return value
  }
}
