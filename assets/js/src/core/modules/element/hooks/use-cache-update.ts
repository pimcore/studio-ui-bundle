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

import { store, useAppDispatch } from '@Pimcore/app/store'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { type TagDescription } from '@reduxjs/toolkit/query'
import { type ElementType } from '../../../types/enums/element/element-type'
import { type Element } from '../element-helper'

interface UseCacheUpdateHookReturn {
  update: (props: UpdateCacheProps) => void
  updateFieldValue: (id: number, field: string, value: any) => void
}

interface UpdateCacheProps {
  updateFn: (draft: any) => void
}

export const useCacheUpdate = (elementType: ElementType, tags: ReadonlyArray<TagDescription<string>>): UseCacheUpdateHookReturn => {
  const dispatch = useAppDispatch()
  const api = getElementTypeDependantApi()
  const cacheEntries = getCacheEntries(tags)

  function getCacheEntries (tags: ReadonlyArray<TagDescription<string>>): Array<{
    endpointName: string
    originalArgs: any
    queryCacheKey: string
  }> {
    return api.util.selectInvalidatedBy(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      store.getState() as any,
      tags
    )
  }

  function getElementTypeDependantApi (): typeof assetApi | typeof dataObjectApi {
    if (elementType === 'asset') {
      return assetApi
    }

    if (elementType === 'data-object') {
      return dataObjectApi
    }

    throw new Error('Unknown element type')
  }

  const update = ({ updateFn }: UpdateCacheProps): void => {
    cacheEntries.forEach((cacheEntry) => {
      // @ts-expect-error not compatible with the current type definitions
      dispatch(api.util.updateQueryData(
        cacheEntry.endpointName,
        cacheEntry.originalArgs,
        updateFn
      ))
    })
  }

  const updateFieldValue = (id: number, field: string, value: any): void => {
    update({
      updateFn: (draft: any) => {
        if ('items' in draft && typeof draft.items === 'object') {
          const entries = draft.items as Element[]
          const indexToUpdate = entries.findIndex((entry) => entry.id === id)

          if (indexToUpdate !== -1 && field in draft.items![indexToUpdate]) {
            draft.items![indexToUpdate][field] = value
          }
        }
      }
    })
  }

  return {
    update,
    updateFieldValue
  }
}
