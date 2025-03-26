/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import _ from 'lodash'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'
import { type ElementSelectorConfig } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'

export interface IRelationAllowedTypesClassDefinition {
  assetsAllowed: boolean
  assetTypes?: Array<{ assetTypes: string }>
  objectsAllowed: boolean
  classes?: Array<{ classes: string }>
  documentsAllowed: boolean
  documentTypes?: Array<{ documentTypes: string }>
}

export interface IRelationAllowedTypesDataComponent {
  allowedAssetTypes?: string[]
  allowedClasses?: string[]
  allowedDocumentTypes?: string[]
  assetsAllowed?: boolean
  documentsAllowed?: boolean
  dataObjectsAllowed?: boolean
}

export const convertAllowedTypes = (props: IRelationAllowedTypesClassDefinition): IRelationAllowedTypesDataComponent => {
  return {
    allowedAssetTypes: props.assetTypes?.map((assetType) => assetType.assetTypes) ?? [],
    allowedClasses: props.classes?.map((classType) => classType.classes) ?? [],
    allowedDocumentTypes: props.documentTypes?.map((documentType) => documentType.documentTypes) ?? [],
    assetsAllowed: props.assetsAllowed,
    documentsAllowed: props.documentsAllowed,
    dataObjectsAllowed: props.objectsAllowed
  }
}

export const isAllowedType = (type: ElementType, props: IRelationAllowedTypesDataComponent): boolean => {
  if (type === 'asset') {
    return props.assetsAllowed ?? false
  }

  if (type === 'document') {
    return props.documentsAllowed ?? false
  }

  if (type === 'data-object') {
    return props.dataObjectsAllowed ?? false
  }

  return false
}

export const isAllowedSubType = (type: ElementType, subType: string, props: IRelationAllowedTypesDataComponent): boolean => {
  if (!isAllowedType(type, props)) {
    return false
  }

  if (type === 'asset') {
    return isValidSubType(props.allowedAssetTypes, subType)
  }

  if (type === 'data-object') {
    return isValidSubType(props.allowedClasses, subType)
  }

  if (type === 'document') {
    return isValidSubType(props.allowedDocumentTypes, subType)
  }

  return false
}

const isValidSubType = (allowedTypes: string[] | null | undefined, subType: string): boolean => {
  if (allowedTypes === null || allowedTypes === undefined) {
    return true
  }

  if (allowedTypes.length === 0) {
    return true
  }

  return allowedTypes.includes(subType)
}

export const dndIsValidData = (info: DragAndDropInfo, props: IRelationAllowedTypesDataComponent): boolean => {
  if (info.data === null) {
    return false
  }
  const type: ElementType | null = mapToElementType(info.type)
  if (type === null) {
    return false
  }
  const subType: string = info.data.className !== undefined && !_.isEmpty(info.data.className) ? info.data.className : info.data.type
  return isAllowedSubType(type, subType, props)
}

export const createElementSelectorAreas = (config: IRelationAllowedTypesDataComponent): ElementSelectorConfig['areas'] => {
  return {
    asset: config.assetsAllowed ?? false,
    document: config.documentsAllowed ?? false,
    object: config.dataObjectsAllowed ?? false
  }
}
