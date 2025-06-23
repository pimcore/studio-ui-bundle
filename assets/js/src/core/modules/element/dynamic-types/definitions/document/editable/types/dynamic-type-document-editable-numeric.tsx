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
import { InputNumber } from '@sdk/components'
import { isNil } from 'lodash'
import cn from 'classnames'
import { toCssDimension } from '@sdk/utils'

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
      <InputNumber
        className={ cn('w-full', props.config?.class) }
        max={ props.config?.maxValue }
        min={ props.config?.minValue }
        style={ { maxWidth: toCssDimension(props.config?.width, props.defaultFieldWidth.small) } }
      />
    )
  }

  transformValue (value: any, props: NumericEditableDefinition): any {
    if (isNil(value)) {
      return props.config?.defaultValue
    }
    return value
  }
}
