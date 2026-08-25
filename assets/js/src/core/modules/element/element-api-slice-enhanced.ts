/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AssetPermissions } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type DataObjectPermissions } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import {
  api as baseApi
} from '@Pimcore/modules/element/element-api-slice.gen'
import { invalidatingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { getPrefix } from '@sdk/api'
import { type DocumentPermissions } from '../document/document-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DATA_OBJECT_DETAIL, tagNames.ASSET_DETAIL, tagNames.ASSET_GRID, tagNames.DATA_OBJECT_GRID],
  endpoints: {
    elementDelete: {
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_DETAIL(args.elementType, args.id)
    },
    // Edit-lock ops are transient: drop the shared "Elements" cache tag so lock/unlock don't refetch
    // the status query (a redundant GET after POST/DELETE) or other element queries.
    elementGetEditlock: {
      providesTags: []
    },
    elementLock: {
      invalidatesTags: []
    },
    elementUnlock: {
      invalidatesTags: []
    }
  }
}).injectEndpoints({
  endpoints: (build) => ({
    /**
     * Delete info for a whole set of elements in one request.
     *
     * The endpoint exists on the backend (element_batch_delete_info) but is missing
     * from the generated client, so it is declared here: asking per element meant one
     * request per selected item before the confirm dialog could even open.
     */
    elementGetBatchDeleteInfo: build.query<ElementBatchDeleteInfoApiResponse, ElementBatchDeleteInfoApiArg>({
      query: (arg) => ({
        url: `${getPrefix()}/elements/${arg.elementType}/batch-delete-info`,
        method: 'POST',
        body: { ids: arg.ids }
      })
    })
  })
})

export { api }

export interface ElementBatchDeleteInfoApiResponse {
  hasDependencies: boolean
  canUseRecycleBin: boolean
}

export interface ElementBatchDeleteInfoApiArg {
  elementType: string
  ids: number[]
}

export type ElementPermissions = AssetPermissions | DataObjectPermissions | DocumentPermissions

export type ElementPermissionKeys = keyof (AssetPermissions & DataObjectPermissions)

export const {
  useElementDeleteMutation,
  useElementGetDeleteInfoQuery,
  useElementGetBatchDeleteInfoQuery,
  useElementFolderCreateMutation,
  useElementGetContextPermissionsQuery,
  useElementGetIdByPathQuery,
  useLazyElementGetIdByPathQuery,
  useElementGetSubtypeQuery,
  useElementResolveBySearchTermQuery,
  useLazyElementResolveBySearchTermQuery,
  useLazyElementGetEditlockQuery,
  useElementLockMutation,
  useElementUnlockMutation
} = api
