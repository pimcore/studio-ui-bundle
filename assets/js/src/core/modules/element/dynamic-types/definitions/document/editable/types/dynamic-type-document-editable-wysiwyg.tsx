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
import { isString } from 'lodash'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { stripTags } from '@Pimcore/utils/html'
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import { WysiwygEditable } from '../components/wysiwyg-editable/wysiwyg-editable'
import { WysiwygContext } from '@sdk/modules/wysiwyg'

export interface WysiwygEditableConfig {
  width?: string | number
  height?: string | number
  maxCharacters?: number
  placeholder?: string
  editorConfig?: Record<string, any>
  class?: string
  required?: boolean
}

export type WysiwygEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: WysiwygEditableConfig
}

export class DynamicTypeDocumentEditableWysiwyg extends DynamicTypeDocumentEditableAbstract {
  id: string = 'wysiwyg'
  initializeInIframe: boolean = true

  getEditableDataComponent (props: WysiwygEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <WysiwygEditable
        context={ WysiwygContext.DOCUMENT }
        editorConfig={ props.config?.editorConfig }
        height={ props.config?.height }
        inherited={ props.inherited }
        maxCharacters={ props.config?.maxCharacters }
        placeholder={ props.config?.placeholder }
        width={ props.config?.width }
      />
    )
  }

  isEmpty (value: any, props: WysiwygEditableDefinition): boolean {
    if (isString(value)) {
      const textContent = stripTags(value)
      return !isNonEmptyString(textContent)
    }

    return true
  }
}
