/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import type { DragAndDropInfo } from '@sdk/components'
import { isNil } from 'lodash'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'
import { type ElementSelectorConfig } from '@sdk/modules/element'

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
  allowedDataObjectTypes?: string[]
  assetsAllowed?: boolean
  documentsAllowed?: boolean
  dataObjectsAllowed?: boolean
}

export const convertAllowedTypes = (props: IRelationAllowedTypesClassDefinition): IRelationAllowedTypesDataComponent => {
  const objectAllowedTypes: string[] = []
  const objectAllowedClasses: string[] = []

  props.classes?.forEach((classConfig) => {
    if (classConfig.classes === 'folder') {
      objectAllowedTypes.push('folder')
    } else {
      objectAllowedClasses.push(classConfig.classes)
    }
  })

  if (objectAllowedClasses.length > 0) {
    objectAllowedTypes.push('object', 'variant')
  }

  return {
    allowedAssetTypes: props.assetTypes?.map((assetType) => assetType.assetTypes) ?? [],
    allowedDocumentTypes: props.documentTypes?.map((documentType) => documentType.documentTypes) ?? [],
    allowedClasses: objectAllowedClasses.length > 0 ? objectAllowedClasses : undefined,
    allowedDataObjectTypes: objectAllowedTypes.length > 0 ? objectAllowedTypes : undefined,
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
    return isValidType(props.allowedAssetTypes, subType)
  }

  if (type === 'data-object') {
    return isValidType(props.allowedDataObjectTypes, subType)
  }

  if (type === 'document') {
    return isValidType(props.allowedDocumentTypes, subType)
  }

  return false
}

export const isAllowedClass = (type: ElementType, className: string, props: IRelationAllowedTypesDataComponent): boolean => {
  if (type === 'data-object') {
    // If no classes are specified, allow all classes
    if (isNil(props.allowedClasses) || props.allowedClasses.length === 0) {
      return true
    }
    return props.allowedClasses.includes(className)
  }
  return true
}

const isValidType = (allowedTypes: string[] | null | undefined, subType: string): boolean => {
  if (isNil(allowedTypes)) {
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

  const subType: string = info.data.type

  if (type === 'data-object' && subType !== 'folder') {
    const className = String(info.data.className)
    if (!isAllowedClass(type, className, props)) {
      return false
    }
  }

  return isAllowedSubType(type, subType, props)
}

export const createElementSelectorAreas = (config: IRelationAllowedTypesDataComponent): ElementSelectorConfig['areas'] => {
  return {
    asset: config.assetsAllowed ?? false,
    document: config.documentsAllowed ?? false,
    object: config.dataObjectsAllowed ?? false
  }
}

export const createElementSelectorConfig = (config: IRelationAllowedTypesDataComponent): ElementSelectorConfig['config'] => {
  return {
    assets: {
      allowedTypes: config.allowedAssetTypes
    },
    documents: {
      allowedTypes: config.allowedDocumentTypes
    },
    objects: {
      allowedTypes: config.allowedDataObjectTypes,
      allowedClasses: config.allowedClasses
    }
  }
}
