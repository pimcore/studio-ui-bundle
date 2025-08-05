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

export interface AreaEditableConfig {
  type?: string
  class?: string
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
      />
    )
  }
}
