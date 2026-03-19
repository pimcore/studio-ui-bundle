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
import { type Document } from '@Pimcore/modules/document/document-api-slice.gen'
import type { ElementType } from '../../types/enums/element/element-type'
import { type DragAndDropInfo } from '@sdk/components'
import { has, isBoolean, isPlainObject } from 'lodash'
import { baseUrl } from '@Pimcore/app/router/router'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { mapToLegacyElementType } from '@Pimcore/modules/element/utils/element-type'
import {
  ElementIconContext,
  type ElementIconProcessorRegistry
} from './services/processors/element-icon-processor-registry'

export type Element = Asset | DataObject | Document

export const getElementIcon = (element: Element, defaultIcon: ElementIcon): ElementIcon => {
  const icon = determineElementIcon(element, defaultIcon)

  // Execute processors to allow extensions to customize the icon
  const context = new ElementIconContext(element, defaultIcon, icon)
  const processorRegistry = container.get<ElementIconProcessorRegistry>(
    serviceIds['Element/ProcessorRegistry/IconProcessor']
  )
  processorRegistry.executeProcessors(context)

  return context.getIcon() ?? defaultIcon
}

const determineElementIcon = (element: Element, defaultIcon: ElementIcon): ElementIcon => {
  if (
    element.customAttributes?.icon !== undefined &&
    element.customAttributes?.icon !== null
  ) {
    return element.customAttributes.icon
  }

  if ('isSite' in element && element.isSite) {
    return { type: 'name' as const, value: 'home-root-folder' }
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

  if (elementType === 'document') {
    return (element as Document).key ?? ''
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
  elementType?: ElementType
  fullPath: string
  isPublished?: boolean | null
  subtype?: string
}

export const isElementReference = (data: any): data is ElementReference => {
  return (
    isPlainObject(data) &&
    has(data, 'id') &&
    has(data, 'type') &&
    has(data, 'fullPath')
  )
}

export const convertDragAndDropInfoToElementReference = (info: DragAndDropInfo, showPublishedState: boolean = true): ElementReference => {
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
    type: mapToLegacyElementType(info.type as ElementType),
    fullPath: String(elementData.fullPath),
    isPublished: (showPublishedState && isBoolean(published)) ? published : null,
    subtype: getSubType(info)
  }
}

export const getElementDeeplink = (elementType: ElementType, id: Element['id']): string => {
  return `${window.location.origin}${baseUrl}${elementType}/${id}`
}
