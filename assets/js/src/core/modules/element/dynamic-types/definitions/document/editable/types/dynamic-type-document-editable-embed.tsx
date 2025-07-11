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
import { EmbedComponent } from '../components/embed/embed'

export type EmbedEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    width?: number | string
    height?: number | string
    class?: string
    reload?: boolean
  }
}

export class DynamicTypeDocumentEditableEmbed extends DynamicTypeDocumentEditableAbstract {
  id: string = 'embed'

  getEditableDataComponent (props: EmbedEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <EmbedComponent
        className={ props.config?.class }
        containerRef={ props.containerRef }
        disabled={ props.inherited }
      />
    )
  }

  reloadOnChange (props: EmbedEditableDefinition): boolean {
    return true
  }
}
