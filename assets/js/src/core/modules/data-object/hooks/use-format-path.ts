/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef } from 'react'
import { store } from '@Pimcore/app/store'
import type { DataObjectFormatPathApiResponse } from '../data-object-api-slice.gen'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import type { ApiErrorData } from '@Pimcore/modules/app/error-handler/classes/api-error'
import { api } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { isNil } from 'lodash'

export interface IFormatPathItem {
  id: number
  type: string
  fullPath: string
}

type FormatPathCache = Map<string, string>

interface UseFormatPathReturn {
  formatPath: (items: IFormatPathItem[], fieldName: string, dataObjectId: number) => Promise<DataObjectFormatPathApiResponse | undefined>
}

export const useFormatPath = (): UseFormatPathReturn => {
  const formatPathCacheRef = useRef<FormatPathCache>(new Map())

  const buildCacheKey = (dataObjectId: number, fieldName: string, type: string, itemId: number): string => {
    return `${dataObjectId}_${fieldName}_${type}_${itemId}`
  }

  const checkCacheForItems = (
    items: IFormatPathItem[],
    dataObjectId: number,
    fieldName: string,
    formatPathCache: FormatPathCache
  ): { cachedItems: Record<string, string>, itemsToRequest: IFormatPathItem[] } => {
    const cachedItems: Record<string, string> = {}
    const itemsToRequest: IFormatPathItem[] = []

    items.forEach(item => {
      const cacheKey = buildCacheKey(dataObjectId, fieldName, item.type, item.id)
      const cachedPath = formatPathCache.get(cacheKey)

      if (cachedPath !== undefined) {
        cachedItems[`${item.type}_${item.id}`] = cachedPath
      } else {
        itemsToRequest.push(item)
      }
    })

    return { cachedItems, itemsToRequest }
  }

  const buildCachedResponse = (cachedItems: Record<string, string>): DataObjectFormatPathApiResponse => {
    const cachedSelectOptions = Object.entries(cachedItems).map(([objectReference, formatedPath]) => ({
      objectReference,
      formatedPath
    }))

    return {
      totalItems: cachedSelectOptions.length,
      items: cachedSelectOptions
    }
  }

  const buildApiTargets = (itemsToRequest: IFormatPathItem[]): Record<string, any> => {
    return itemsToRequest.reduce((acc, item) => {
      acc[`${item.type}_${item.id}`] = {
        id: item.id,
        type: item.type,
        label: item.fullPath,
        path: item.fullPath,
        nicePathKey: `${item.type}_${item.id}`
      }
      return acc
    }, {})
  }

  const cacheApiResults = (
    data: DataObjectFormatPathApiResponse,
    dataObjectId: number,
    fieldName: string,
    formatPathCache: FormatPathCache,
    itemsToRequest: IFormatPathItem[]
  ): void => {
    data.items?.forEach(item => {
      const originalItem = itemsToRequest.find(reqItem => `${reqItem.type}_${reqItem.id}` === item.objectReference)
      if (!isNil(originalItem)) {
        const cacheKey = buildCacheKey(dataObjectId, fieldName, originalItem.type, originalItem.id)
        formatPathCache.set(cacheKey, item.formatedPath)
      }
    })
  }

  const combineResults = (
    cachedItems: Record<string, string>,
    apiData: DataObjectFormatPathApiResponse
  ): DataObjectFormatPathApiResponse => {
    const allItems = [
      ...Object.entries(cachedItems).map(([objectReference, formatedPath]) => ({
        objectReference,
        formatedPath
      })),
      ...(apiData.items ?? [])
    ]

    return {
      totalItems: allItems.length,
      items: allItems
    }
  }

  const formatPath = async (items: IFormatPathItem[], fieldName: string, dataObjectId: number): Promise<DataObjectFormatPathApiResponse | undefined> => {
    const formatPathCache = formatPathCacheRef.current

    const { cachedItems, itemsToRequest } = checkCacheForItems(items, dataObjectId, fieldName, formatPathCache)

    if (itemsToRequest.length === 0) {
      return buildCachedResponse(cachedItems)
    }

    const targets = buildApiTargets(itemsToRequest)

    if (Object.keys(targets).length === 0) {
      return undefined
    }

    const { data, error } = await store.dispatch(api.endpoints.dataObjectFormatPath.initiate({
      body: {
        objectId: dataObjectId,
        targets,
        fieldName
      }
    }))

    if (data === undefined) {
      trackError(new ApiError(error as unknown as ApiErrorData))
      return undefined
    }

    cacheApiResults(data, dataObjectId, fieldName, formatPathCache, itemsToRequest)

    return combineResults(cachedItems, data)
  }

  return { formatPath }
}
