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

import { type ElementType } from '../../../../../../types/element-type.d'
import { useAppDispatch } from '@Pimcore/app/store'
import { type UseAssetDraftReturn } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { type UseDataObjectDraftReturn } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

interface UseRefreshElementHookReturn {
  refreshElement: () => void
}

export const useRefreshElement = (id: number, elementType: ElementType): UseRefreshElementHookReturn => {
  const dispatch = useAppDispatch()
  const draft = useElementDraft(id, elementType)

  const refreshElement = (): void => {
    if (elementType === 'asset') {
      (draft as any as UseAssetDraftReturn).removeAssetFromState()
      dispatch(
        assetApi.util.invalidateTags(
          invalidatingTags.ASSET_DETAIL_ID(id)
        )
      )
    } else if (elementType === 'data-object') {
      (draft as any as UseDataObjectDraftReturn).removeDataObjectFromState()
      dispatch(
        dataObjectApi.util.invalidateTags(
          invalidatingTags.DATA_OBJECT_DETAIL_ID(id)
        )
      )
    }
  }

  return {
    refreshElement
  }
}
