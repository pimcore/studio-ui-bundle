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
import { Wysiwyg } from '@sdk/modules/wysiwyg'

export class DynamicTypeDocumentEditableWysiwyg extends DynamicTypeDocumentEditableAbstract {
  id: string = 'wysiwyg'
  initializeInIframe: boolean = true

  getEditableDataComponent (props: AbstractDocumentEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <Wysiwyg/>
    )
  }
}
