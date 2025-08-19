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
import { RenderletEditable, type RenderletEditableConfig, type RenderletValue } from '../components/renderlet-editable'

export type RenderletEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: RenderletEditableConfig
}

export class DynamicTypeDocumentEditableRenderlet extends DynamicTypeDocumentEditableAbstract {
  id: string = 'renderlet'

  getEditableDataComponent (props: RenderletEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <RenderletEditable
        className={ props.config?.class }
        config={ props.config }
        onChange={ (newValue) => props.onChange?.(newValue) }
        value={ props.value }
      />
    )
  }

  transformValue (value: any): RenderletValue | null {
    if (isNil(value)) {
      return null
    }

    if (typeof value === 'object' && !isNil(value.id)) {
      return {
        id: value.id,
        type: value.type,
        subtype: value.subtype
      }
    }

    return null
  }

  transformValueForApi (value: RenderletValue | null): any {
    if (isNil(value)) {
      return null
    }

    return {
      id: value.id ?? null,
      type: value.type ?? null,
      subtype: value.subtype ?? null
    }
  }
}
