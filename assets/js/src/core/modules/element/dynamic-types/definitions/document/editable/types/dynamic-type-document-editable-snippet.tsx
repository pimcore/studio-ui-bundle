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
import { SnippetEditable, type SnippetEditableConfig, type SnippetValue } from '../components/snippet-editable'

export type SnippetEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: SnippetEditableConfig
}

export class DynamicTypeDocumentEditableSnippet extends DynamicTypeDocumentEditableAbstract {
  id: string = 'snippet'

  getEditableDataComponent (props: SnippetEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <SnippetEditable
        className={ props.config?.class }
        config={ props.config }
        onChange={ (newValue) => props.onChange?.(newValue) }
        value={ props.value }
      />
    )
  }

  transformValue (value: any): SnippetValue | null {
    if (isNil(value)) {
      return null
    }

    if (typeof value === 'object' && !isNil(value.id)) {
      return {
        id: value.id,
        path: value.path
      }
    }

    return null
  }

  reloadOnChange (props: SnippetEditableDefinition): boolean {
    return Boolean(props.config?.reload)
  }
}
