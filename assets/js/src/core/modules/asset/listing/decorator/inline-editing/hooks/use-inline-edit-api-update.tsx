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

import { useAppDispatch } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { api, type AssetGetGridApiArg, useAssetPatchByIdMutation } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type UseInlineEditApiUpdateReturn } from '@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator'
import { isNil } from 'lodash'

export const useInlineEditApiUpdate = (): UseInlineEditApiUpdateReturn => {
  const [patchAsset] = useAssetPatchByIdMutation()
  const dispatch = useAppDispatch()

  const updateCache: UseInlineEditApiUpdateReturn['updateCache'] = (event) => {
    const { update, getGetRequestArgs } = event
    const { id, column: columnToUpdate, value } = update

    dispatch(api.util.updateQueryData('assetGetGrid', getGetRequestArgs as AssetGetGridApiArg, (oldData) => {
      item_loop:
      for (const item of oldData.items) {
        if (item.id !== id) {
          continue
        }

        for (const column of item.columns!) {
          if (column.key === columnToUpdate.key && column.locale === columnToUpdate.locale) {
            column.value = value
            // for now we assume that there can be only one value updated at the time
            break item_loop
          }
        }
      }

      return oldData
    }))
  }

  // todo: remove this as soon as backend added the type to the schema
  interface ExtendedMetadataItem {
    name: string
    language: string
    data: any
    type: string
  }

  const updateApiData: UseInlineEditApiUpdateReturn['updateApiData'] = async (event) => {
    const { update } = event
    const promise = patchAsset({
      body: {
        data: [
          {
            id: update.id,
            metadata: [
              {
                name: update.column.key,
                language: update.column.locale,
                data: update.value,
                type: update.column.type
              }
            ] as ExtendedMetadataItem[]
          }
        ]
      }
    })

    const result = await promise

    if (!isNil(result.error)) {
      trackError(new ApiError(result.error))
    }

    return result
  }

  return {
    updateCache,
    updateApiData
  }
}
