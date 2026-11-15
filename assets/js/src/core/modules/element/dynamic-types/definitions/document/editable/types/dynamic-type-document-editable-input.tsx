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
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import ContentEditable from '../components/content-editable/content-editable'
import { ColorInputEditable } from '../components/color-input-editable/color-input-editable'

export type InputEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    placeholder?: string
    width?: number
    nowrap?: boolean
    class?: string
    required?: boolean
    /** Draw the value as a colour picker: a swatch with its hex code. The value stays the hex text. */
    color?: boolean
  }
}

export class DynamicTypeDocumentEditableInput extends DynamicTypeDocumentEditableAbstract {
  id: string = 'input'

  getEditableDataComponent (props: InputEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    if (props.config?.color === true) {
      return (
        <ColorInputEditable
          className={ props.config?.class }
          inherited={ props.inherited }
          placeholder={ props.config?.placeholder }
        />
      )
    }

    return (
      <ContentEditable
        className={ props.config?.class }
        inherited={ props.inherited }
        nowrap={ props.config?.nowrap }
        placeholder={ props.config?.placeholder }
        width={ props.config?.width }
      />
    )
  }

  isEmpty (value: any, props: InputEditableDefinition): boolean {
    return !isNonEmptyString(value)
  }
}
