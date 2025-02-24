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

import { type AssetPermissions } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type DataObjectPermissions } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { api as baseApi } from './element-api-slice.gen'
import { invalidatingTags, type Tag, tagNames } from '@Pimcore/app/api/pimcore/tags'

export type ElementPermissions = AssetPermissions & DataObjectPermissions

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.ASSET_DETAIL],
  endpoints: {
    elementFolderCreate: {
      invalidatesTags: (result, error, args) => {
        const tags: Tag[] = []

        if (args.elementType === 'asset') {
          tags.push(...invalidatingTags.ASSET_DETAIL_ID(args.parentId))
        }

        if (args.elementType === 'data-object') {
          tags.push(...invalidatingTags.DATA_OBJECT_DETAIL_ID(args.parentId))
        }

        return tags
      }
    }
  }
})

export type * from './element-api-slice.gen'

export const {
  useElementDeleteMutation,
  useElementGetDeleteInfoQuery,
  useElementFolderCreateMutation,
  useElementGetContextPermissionsQuery,
  useElementGetIdByPathQuery,
  useElementGetSubtypeQuery,
  useElementResolveBySearchTermQuery
} = api

export { api }
