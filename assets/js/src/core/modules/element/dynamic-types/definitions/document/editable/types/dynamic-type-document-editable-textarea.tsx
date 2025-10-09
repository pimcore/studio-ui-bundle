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

export type TextareaEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    placeholder?: string
    width?: number
    height?: number
    class?: string
    required?: boolean
  }
}

export class DynamicTypeDocumentEditableTextarea extends DynamicTypeDocumentEditableAbstract {
  id: string = 'textarea'

  getEditableDataComponent (props: TextareaEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <ContentEditable
        allowMultiLine
        className={ props.config?.class }
        height={ props.config?.height }
        inherited={ props.inherited }
        placeholder={ props.config?.placeholder }
        width={ props.config?.width }
      />
    )
  }

  isEmpty (value: any, props: TextareaEditableDefinition): boolean {
    return !isNonEmptyString(value)
  }
}
