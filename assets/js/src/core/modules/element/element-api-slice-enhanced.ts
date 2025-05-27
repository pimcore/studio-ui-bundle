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

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DATA_OBJECT_DETAIL, tagNames.ASSET_DETAIL],
  endpoints: {
    elementDelete: {
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_DETAIL(args.elementType, args.id)
    }
  }
})

export type ElementPermissions = AssetPermissions | DataObjectPermissions

export type ElementPermissionKeys = keyof (AssetPermissions & DataObjectPermissions)

export const {
  useElementDeleteMutation,
  useElementGetDeleteInfoQuery,
  useElementFolderCreateMutation,
  useElementGetContextPermissionsQuery,
  useElementGetIdByPathQuery,
  useElementGetSubtypeQuery,
  useElementResolveBySearchTermQuery,
  useLazyElementResolveBySearchTermQuery
} = api
