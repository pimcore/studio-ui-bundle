/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Asset, type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { ElementType } from '../../types/enums/element/element-type'
import { type DragAndDropInfo } from '@sdk/components'
import { isBoolean } from 'lodash'

export type Element = Asset | DataObject

export const getElementIcon = (element: Element, defaultIcon: ElementIcon): ElementIcon => {
  if (
    element.customAttributes?.icon !== undefined &&
    element.customAttributes?.icon !== null
  ) {
    return element.customAttributes.icon
  }

  if (
    element.icon !== undefined &&
    element.icon !== null
  ) {
    return element.icon
  }

  return defaultIcon
}

export const getElementKey = (element: Element, elementType: ElementType): string => {
  if (elementType === 'asset') {
    return (element as Asset).filename ?? ''
  }

  if (elementType === 'data-object') {
    return (element as DataObject).key ?? ''
  }

  return ''
}

export const getElementActionCacheKey = (elementType: ElementType, action: string, id?: number): string => {
  let cacheKey = `${elementType}_ACTION_${action}`

  if (id !== undefined) {
    cacheKey += `_ID_${id}`
  }

  return cacheKey.toUpperCase()
}

// This data strcture is used for most API calls where element relations are used
export interface ElementReference {
  id: number
  type: 'asset' | 'object' | 'document'
  fullPath: string
  isPublished?: boolean | null
  subtype?: string
}

export const convertDragAndDropInfoToElementReference = (info: DragAndDropInfo): ElementReference => {
  const elementData = info.data as Element

  const getSubType = (info: DragAndDropInfo): string | undefined => {
    if (info.type === 'data-object') {
      return info.data.classname ?? 'folder'
    }
    return info.data.type ?? undefined
  }

  const published = 'published' in elementData ? elementData.published : null

  return {
    id: elementData.id,
    type: (info.type === 'data-object' ? 'object' : info.type) as ElementReference['type'],
    fullPath: String(elementData.fullPath),
    isPublished: isBoolean(published) ? published : null,
    subtype: getSubType(info)
  }
}
