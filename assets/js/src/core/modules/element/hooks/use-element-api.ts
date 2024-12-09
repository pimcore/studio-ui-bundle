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

import { api as assetApi, type Asset, useAssetPatchByIdMutation } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { api as dataObjectApi, useDataObjectPatchByIdMutation } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { type ElementType } from 'types/element-type.d'
import { store, useAppDispatch } from '@Pimcore/app/store'

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
}

export const useElementApi = (elementType: ElementType): UseElementApiReturn => {
  const [assetPatch] = useAssetPatchByIdMutation()
  const [dataObjectPatch] = useDataObjectPatchByIdMutation()
  const dispatch = useAppDispatch()

  const elementPatch = async (args: ElementPatchArgs): Promise<void> => {
    if (elementType === 'asset') {
      await assetPatch(args)

      /* eslint-disable */
      const entries = assetApi.util.selectInvalidatedBy(
        store.getState() as any,
        ['ASSET_TREE']
      )

      entries.forEach((queryKeys) => {
        console.log(queryKeys)

        dispatch(assetApi.util.updateQueryData(
          // @ts-ignore typescript, constants, u know? - i dont - @daniel
          queryKeys.endpointName,
          queryKeys.originalArgs,
          (draft) => {
            if('items' in draft && typeof draft.items === 'object') {
              const entries = draft.items as Array<Asset>
              const indexToUpdate = entries.findIndex((entry) => entry.id === args.body.data[0].id)

              if(indexToUpdate !== -1) {
                draft.items![indexToUpdate].filename = args.body.data[0].key as string
              }
            }
          }
        ))
      })
    } else if (elementType === 'data-object') {
      await dataObjectPatch(args)
      console.log(dataObjectApi)
    }
  }

  return { elementPatch }
}
