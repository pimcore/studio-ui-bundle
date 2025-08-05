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
import { BlockEditable, type BlockEditableConfig, type BlockValue } from './components/block-editable/block-editable'

export interface BlockEditableDefinition extends Omit<AbstractDocumentEditableDefinition, 'config'> {
  config?: BlockEditableConfig
}

export class DynamicTypeDocumentEditableBlock extends DynamicTypeDocumentEditableAbstract {
  id: string = 'block'

  getEditableDataComponent (props: BlockEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <BlockEditable
        className={props.config?.class}
        config={props.config}
        editableName={props.name}
        containerRef={props.containerRef}
        disabled={props.inherited}
        onChange={(newValue) => props.onChange?.(newValue)}
        value={props.value}
      />
    )
  }

  transformValue (value: any): BlockValue | null {
    if (Array.isArray(value)) {
      return value
    }
    
    return []
  }

  reloadOnChange (props: BlockEditableDefinition): boolean {
    return Boolean(props.config?.reload)
  }
}