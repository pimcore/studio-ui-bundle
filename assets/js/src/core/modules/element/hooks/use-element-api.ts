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

import { type AssetGetByIdApiResponse, useAssetPatchByIdMutation } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import {
  type DataObjectGetByIdApiResponse,
  useDataObjectPatchByIdMutation
} from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useCacheUpdate } from '@Pimcore/modules/element/hooks/use-cache-update'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useAppDispatch } from '@Pimcore/app/store'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice.gen'

/**
 * Abstracts the logic for some basic API calls across element types (assets, data objects, documents)
 */

interface ElementPatchArgs {
  body: {
    data: Array<{
      id: number
      parentId?: number | null
      key?: string | null
      locked?: string | null
    }>
  }
}

interface UseElementApiReturn {
  elementPatch: (args: ElementPatchArgs) => Promise<void>
  getElementById: (id: number) => Promise<AssetGetByIdApiResponse | DataObjectGetByIdApiResponse | undefined>
}

export const useElementApi = (elementType: ElementType, cacheKey?: string): UseElementApiReturn => {
  const dispatch = useAppDispatch()
  const [assetPatch] = useAssetPatchByIdMutation({ fixedCacheKey: cacheKey })
  const [dataObjectPatch] = useDataObjectPatchByIdMutation({ fixedCacheKey: cacheKey })
  const { updateFieldValue: updateAssetFieldValue } = useCacheUpdate('asset', ['ASSET_TREE'])
  const { updateFieldValue: updateDataObjectFieldValue } = useCacheUpdate('data-object', ['DATA_OBJECT_TREE'])

  const elementPatch = async (args: ElementPatchArgs): Promise<void> => {
    if (elementType === 'asset') {
      await assetPatch(args)

      updateAssetFieldValue(
        args.body.data[0].id,
        'filename',
        args.body.data[0].key
      )
    } else if (elementType === 'data-object') {
      await dataObjectPatch(args)

      updateDataObjectFieldValue(
        args.body.data[0].id,
        'key',
        args.body.data[0].key
      )
    }
  }

  const getElementById = async (id: number): Promise<AssetGetByIdApiResponse | DataObjectGetByIdApiResponse | undefined> => {
    if (elementType === 'asset') {
      const { data } = await dispatch(assetApi.endpoints.assetGetById.initiate({ id }))

      if (data !== undefined) {
        return data
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {} as AssetGetByIdApiResponse
    }

    if (elementType === 'data-object') {
      const { data } = await dispatch(dataObjectApi.endpoints.dataObjectGetById.initiate({ id }))

      if (data !== undefined) {
        return data
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {} as DataObjectGetByIdApiResponse
    }
  }

  return {
    elementPatch,
    getElementById
  }
}
