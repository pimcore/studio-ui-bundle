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
import { isEmpty, isNil } from 'lodash'
import i18n from '@Pimcore/app/i18n'
import { SelectEditable } from '../components/select-editable/select-editable'
import { transformDocumentEditableStoreToOptions, type DocumentEditableStoreEntry } from '../utils/select-options'

export type SelectEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    store: DocumentEditableStoreEntry[]
    width?: number
    class?: string
    defaultValue?: string
    reload?: boolean
    editable?: boolean
  }
}

export class DynamicTypeDocumentEditableSelect extends DynamicTypeDocumentEditableAbstract {
  id: string = 'select'

  getEditableDataComponent (props: SelectEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    const baseOptions = transformDocumentEditableStoreToOptions(props.config?.store)

    const isEditable = Boolean(props.config?.editable)

    return (
      <SelectEditable
        className={ props.config?.class }
        editable={ isEditable }
        inherited={ props.inherited }
        onChange={ props.onChange }
        options={ baseOptions }
        value={ props.value }
        width={ props.config?.width }
      />
    )
  }

  transformValue (value: any, props: SelectEditableDefinition): any {
    if (isNil(value) || isEmpty(value)) {
      return props.config?.defaultValue ?? null
    }
    return value
  }
}
