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

import { useAssetPatchByIdMutation } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useDataObjectPatchByIdMutation } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useCacheUpdate } from '@Pimcore/modules/element/hooks/use-cache-update'
import { type ElementType } from 'types/element-type.d'

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
  const { updateFieldValue: updateAssetFieldValue } = useCacheUpdate('asset', ['ASSET_TREE'])
  const { updateFieldValue: updateDataObjectFieldValule } = useCacheUpdate('data-object', ['DATA_OBJECT_TREE'])

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

      updateDataObjectFieldValule(
        args.body.data[0].id,
        'key',
        args.body.data[0].key
      )
    }
  }

  return { elementPatch }
}
