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
import { ManyToOneRelation } from '@sdk/modules/element'

export class DynamicTypeDocumentEditableRelation extends DynamicTypeDocumentEditableAbstract {
  id: string = 'relation'

  getEditableDataComponent (props: AbstractDocumentEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <ManyToOneRelation
        allowToClearRelation
        assetsAllowed
        dataObjectsAllowed
        documentsAllowed
      />
    )
  }
}
