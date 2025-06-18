/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType } from '../../../../types/enums/element/element-type'
import { useAppDispatch } from '@sdk/app'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { removeAsset } from '@Pimcore/modules/asset/asset-draft-slice'
import { removeDataObject } from '@Pimcore/modules/data-object/data-object-draft-slice'
import { useDataObjectDraftFetcher } from '@Pimcore/modules/data-object/hooks/use-data-object-draft-fetcher'
import { useAssetDraftFetcher } from '@Pimcore/modules/asset/hooks/use-asset-draft-fetcher'
import { removeDocument } from '@Pimcore/modules/document/document-draft-slice'
import { useDocumentDraftFetcher } from '@Pimcore/modules/document/hooks/use-document-draft-fetcher'

interface UseElementRefreshHookReturn {
  refreshElement: (id: number, inElementTab?: boolean) => void
}

export const useElementRefresh = (elementType: ElementType): UseElementRefreshHookReturn => {
  const dispatch = useAppDispatch()
  const { updateDataObjectDraft } = useDataObjectDraftFetcher()
  const { updateAssetDraft } = useAssetDraftFetcher()
  const { updateDocumentDraft } = useDocumentDraftFetcher()

  const refreshElement = (id: number, inElementTab?: boolean): void => {
    if (elementType === 'asset') {
      dispatch(removeAsset(id))
      dispatch(
        assetApi.util.invalidateTags(
          invalidatingTags.ASSET_DETAIL_ID(id)
        )
      )

      if (inElementTab === true) {
        dispatch(
          assetApi.util.invalidateTags(
            invalidatingTags.PREDEFINED_ASSET_METADATA()
          )
        )
      }
      void updateAssetDraft(id, true)
    } else if (elementType === 'data-object') {
      dispatch(removeDataObject(id))
      dispatch(
        dataObjectApi.util.invalidateTags(
          invalidatingTags.DATA_OBJECT_DETAIL_ID(id)
        )
      )

      void updateDataObjectDraft(id, true)
    } else if (elementType === 'document') {
      dispatch(removeDocument(id))
      dispatch(
        dataObjectApi.util.invalidateTags(
          invalidatingTags.DOCUMENT_DETAIL_ID(id)
        )
      )

      void updateDocumentDraft(id, true)
    }
  }

  return {
    refreshElement
  }
}
