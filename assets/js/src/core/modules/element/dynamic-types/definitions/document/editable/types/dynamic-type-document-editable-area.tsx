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
import { AreaEditable } from './components/area-editable/area-editable'
import { isNil } from 'lodash'

export interface AreaEditableConfig {
  type?: string
  allowed?: string[]
  optional?: boolean
  params?: Record<string, any>
  group?: string
  groupDescription?: string
  controlsAlign?: 'left' | 'right'
  controlsTrigger?: 'hover' | 'always'
  class?: string
  reload?: boolean
}

export interface AreaEditableValue {
  type: string
  subtype?: string
  data?: any
}

export type AreaEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: AreaEditableConfig
}

export class DynamicTypeDocumentEditableArea extends DynamicTypeDocumentEditableAbstract {
  id: string = 'area'

  getEditableDataComponent (props: AreaEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <AreaEditable
        config={ props.config }
        containerRef={ props.containerRef }
        disabled={ props.inherited }
        editableName={ props.name }
        onChange={ (newValue) => props.onChange?.(newValue) }
        value={ props.value }
      />
    )
  }

  transformValue (value: any, props: AreaEditableDefinition): AreaEditableValue | null {
    if (isNil(value)) {
      return null
    }

    if (typeof value === 'object') {
      return value
    }

    return null
  }

  transformValueForApi (value: AreaEditableValue | null, props: AreaEditableDefinition): any {
    return value
  }

  reloadOnChange (props: AreaEditableDefinition): boolean {
    return Boolean(props.config?.reload)
  }
}
