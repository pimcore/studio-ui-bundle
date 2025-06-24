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
import { type ManyToManyRelationValue } from '../../../objects/data-related/components/many-to-many-relation/hooks/use-value'
import { ManyToManyRelationLabel } from '../../../objects/data-related/helpers/relations/components/label/label'

export type RelationsEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
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
        allowedClasses={ props.config?.classes }
        allowedDataObjectTypes={ props.config?.subtypes?.object }
        allowedDocumentTypes={ props.config?.subtypes?.document }
        assetUploadPath={ props.config?.uploadPath ?? undefined }
        assetsAllowed={ isTypeAllowed(props.config?.types, 'asset') }
        className={ props.config?.class }
        dataObjectsAllowed={ isTypeAllowed(props.config?.types, 'object') }
        disableInlineUpload={ props.config?.disableInlineUpload ?? undefined }
        documentsAllowed={ isTypeAllowed(props.config?.types, 'document') }
        height={ props.config?.height ?? null }
        maxItems={ null }
        pathFormatterClass={ null }
        width={ props.config?.width ?? null }
      />
    )
  }

  transformValue (value: any): ManyToManyRelationValue | null {
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
        isPublished: null
      })
    })

    return result
  }

  getLabel (props: RelationsEditableDefinition): React.ReactElement | undefined {
    if (isNil(props.config?.title) || isEmpty(props.config?.title)) {
      return undefined
    }

    return (
      <ManyToManyRelationLabel
        label={ props.config?.title }
        name={ props.name }
      />
    )
  }
}
