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
import { isNil } from 'lodash'
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import { NumericEditable } from '../components/numeric-editable/numeric-editable'

export type NumericEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    minValue?: number
    maxValue?: number
    width?: number
    class?: string
    defaultValue?: string
    required?: boolean
  }
}
export class DynamicTypeDocumentEditableNumeric extends DynamicTypeDocumentEditableAbstract {
  id: string = 'numeric'

  getEditableDataComponent (props: NumericEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <NumericEditable
        config={ props.config }
        inherited={ props.inherited }
        onChange={ props.onChange }
        value={ props.value }
      />
    )
  }

  transformValue (value: any, props: NumericEditableDefinition): any {
    if (isNil(value)) {
      return props.config?.defaultValue
    }
    return value
  }

  isEmpty (value: any, props: NumericEditableDefinition): boolean {
    return isNil(value) || value === ''
  }
}
