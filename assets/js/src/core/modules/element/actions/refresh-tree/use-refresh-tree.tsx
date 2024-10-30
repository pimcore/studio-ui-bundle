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

import { type ElementType } from 'types/element-type.d'
import { useAppDispatch } from '@Pimcore/app/store'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'

export interface UseRefreshTreeHookReturn {
  refreshTree: (parentId: number) => void
}

export const useRefreshTree = (elementType: ElementType): UseRefreshTreeHookReturn => {
  const dispatch = useAppDispatch()

  const refreshTree = (parentId: number): void => {
    if (elementType === 'asset') {
      dispatch(
        assetApi.util.invalidateTags(
          invalidatingTags.ASSET_TREE_ID(parentId)
        )
      )
    } else if (elementType === 'data-object') {
      dispatch(
        dataObjectApi.util.invalidateTags(
          invalidatingTags.DATA_OBJECT_TREE_ID(parentId)
        )
      )
    }
  }

  return {
    refreshTree
  }
}
