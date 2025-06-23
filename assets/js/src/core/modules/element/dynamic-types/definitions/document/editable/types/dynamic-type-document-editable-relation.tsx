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
import { ManyToOneRelation, ManyToOneRelationValue } from '@sdk/modules/element'
import { isEmpty, isNil } from 'lodash'

export type RelationEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    types?: string[]
    subtypes?: {
      asset?: string[]
      document?: string[]
      object?: string[]
    }
    classes?: string[]
    reload?: boolean
    width?: number
    uploadPath?: string
    class?: string
  }
}

const isTypeAllowed = (types: string[] | undefined, type: string): boolean => {
  if (isNil(types) || isEmpty(types)) {
    return true
  }

  return types.includes(type)
}

export class DynamicTypeDocumentEditableRelation extends DynamicTypeDocumentEditableAbstract {
  id: string = 'relation'

  getEditableDataComponent (props: RelationEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <ManyToOneRelation
        allowToClearRelation
        allowedAssetTypes={ props.config?.subtypes?.asset }
        allowedDocumentTypes={ props.config?.subtypes?.document }
        allowedDataObjectTypes={ props.config?.subtypes?.object }
        allowedClasses={ props.config?.classes }
        assetsAllowed={ isTypeAllowed(props.config?.types, 'asset') }
        dataObjectsAllowed={ isTypeAllowed(props.config?.types, 'object') }
        documentsAllowed={ isTypeAllowed(props.config?.types, 'document') }
        width={ props.config?.width }
        className={ props.config?.class }
      />
    )
  }

  transformValue(value: any): ManyToOneRelationValue | null {
    if (isNil(value)) {
      return null
    }

    return {
      id: value.id,
      type: value.elementType, 
      fullPath: value.path,
      subtype: value.subType,
    }
    
  }
}
