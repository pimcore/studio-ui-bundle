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

import {
  api as baseApi
} from './metadata-api-slice.gen'
import { providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.PREDEFINED_ASSET_METADATA],
  endpoints: {
    metadataGetCollection: {
      providesTags: (result, error, args) => providingTags.PREDEFINED_ASSET_METADATA()
    }
  }
})

export type * from './metadata-api-slice.gen'

export const {
  useAssetCustomMetadataGetByIdQuery,
  useMetadataGetCollectionQuery,
  useLazyMetadataGetCollectionQuery
} = api
