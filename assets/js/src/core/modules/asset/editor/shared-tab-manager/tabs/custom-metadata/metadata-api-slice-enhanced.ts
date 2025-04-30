/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
