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
import { ManyToManyRelation } from '@sdk/modules/element'
import { isArray, isEmpty, isNil } from 'lodash'
import { ManyToManyRelationValue } from '../../../objects/data-related/components/many-to-many-relation/hooks/use-value'

export type RelationsEditableDefinition = AbstractDocumentEditableDefinition & {
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
    height?: number
    title: string
    uploadPath?: string
    disableInlineUpload?: boolean
    class?: string
  }
}

const isTypeAllowed = (types: string[] | undefined, type: string): boolean => {
  if (isNil(types) || isEmpty(types)) {
    return true
  }

  return types.includes(type)
}

export class DynamicTypeDocumentEditableRelations extends DynamicTypeDocumentEditableAbstract {
  id: string = 'relations'

  getEditableDataComponent (props: RelationsEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <ManyToManyRelation
        allowToClearRelation
        allowedAssetTypes={ props.config?.subtypes?.asset }
        allowedDocumentTypes={ props.config?.subtypes?.document }
        allowedDataObjectTypes={ props.config?.subtypes?.object }
        allowedClasses={ props.config?.classes }
        assetsAllowed={ isTypeAllowed(props.config?.types, 'asset') }
        dataObjectsAllowed={ isTypeAllowed(props.config?.types, 'object') }
        documentsAllowed={ isTypeAllowed(props.config?.types, 'document') }
        width={ props.config?.width }
        height={ props.config?.height }
        pathFormatterClass={ props.config?.pathFormatterClass ?? null }
        maxItems={null}
        assetUploadPath={ props.config?.uploadPath ?? undefined }
        disableInlineUpload={ props.config?.disableInlineUpload ?? undefined }
        className={ props.config?.class }
      />
    )
  }

  transformValue(value: any): ManyToManyRelationValue | null {
    if (isNil(value) || !isArray(value)) {
      return null
    }

    const result: ManyToManyRelationValue = []

    value.forEach((item: any) => {
      result.push({
        id: item[0],
        type: item[2], 
        fullPath: item[1],
        subtype: item[3],
        isPublished: null,  
      })
    })

    return result
    
  }
}
