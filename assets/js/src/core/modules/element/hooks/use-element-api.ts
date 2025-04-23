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
import { api as assetApi, useAssetCloneMutation } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { api as dataObjectApi, useDataObjectCloneMutation } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { isUndefined } from 'lodash'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'

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

export interface CloneParameters {
  recursive: boolean
  updateReferences: boolean
}

interface ElementCloneArgs {
  id: number
  parentId: number
  cloneParameters: CloneParameters
}

interface ElementCloneResponse {
  success: boolean
  jobRunId?: number
}

interface UseElementApiReturn {
  elementPatch: (args: ElementPatchArgs) => Promise<boolean>
  getElementById: (id: number) => Promise<AssetGetByIdApiResponse | DataObjectGetByIdApiResponse | undefined>
  elementClone: (args: ElementCloneArgs) => Promise<ElementCloneResponse>
}

export const useElementApi = (elementType: ElementType, cacheKey?: string): UseElementApiReturn => {
  const dispatch = useAppDispatch()
  const [assetPatch] = useAssetPatchByIdMutation({ fixedCacheKey: cacheKey })
  const [dataObjectPatch] = useDataObjectPatchByIdMutation({ fixedCacheKey: cacheKey })
  const [assetClone] = useAssetCloneMutation()
  const [dataObjectClone] = useDataObjectCloneMutation()
  const { updateFieldValue: updateAssetFieldValue } = useCacheUpdate('asset', ['ASSET_TREE'])
  const { updateFieldValue: updateDataObjectFieldValue } = useCacheUpdate('data-object', ['DATA_OBJECT_TREE'])

  const elementPatch = async (args: ElementPatchArgs): Promise<boolean> => {
    try {
      if (elementType === 'asset') {
        const response = await assetPatch(args)
        if (!isUndefined(response.error)) {
          trackError(new ApiError(response.error))
        }

        updateAssetFieldValue(args.body.data[0].id, 'filename', args.body.data[0].key)

        return isUndefined(response.error)
      } else if (elementType === 'data-object') {
        const response = await dataObjectPatch(args)
        if (!isUndefined(response.error)) {
          trackError(new ApiError(response.error))
        }

        updateDataObjectFieldValue(args.body.data[0].id, 'key', args.body.data[0].key)

        return isUndefined(response.error)
      }
    } catch {
      trackError(new GeneralError('Error while patching element'))
    }
    return false
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

  const elementClone = async (args: ElementCloneArgs): Promise<ElementCloneResponse> => {
    try {
      if (elementType === 'asset') {
        const response = await assetClone(args)
        if (!isUndefined(response.error)) {
          trackError(new ApiError(response.error))
          return { success: false }
        }
        return {
          success: true,
          jobRunId: response.data?.jobRunId
        }
      } else if (elementType === 'data-object') {
        const response = await dataObjectClone(args)
        if (!isUndefined(response.error)) {
          trackError(new ApiError(response.error))
          return { success: false }
        }
        return {
          success: true,
          jobRunId: response.data?.jobRunId ?? undefined
        }
      }
    } catch (error) {
      console.error(error)
    }
    return {
      success: false
    }
  }

  return {
    elementPatch,
    getElementById,
    elementClone
  }
}
