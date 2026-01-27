/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { providingTags, type Tag, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './gdpr-data-extractor-api-slice.gen'
import { isNil } from 'lodash'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [
    tagNames.GDPR_DATA,
    tagNames.GDPR_DATA_DETAIL
  ],
  endpoints: {
    gdprSearchData: {
      providesTags: (result, error, args) => {
        let elementTags: Tag[] = []
        if (result !== undefined) {
          elementTags = result?.items.flatMap((item) => {
            if (isNil(item.data) || !('id' in item.data) || isNil(item.data.id)) {
              return []
            }

            return providingTags.GDPR_DATA_DETAIL(
              args.provider!,
              item.data.id as number
            )
          }).filter(Boolean) ?? []
        }

        return [
          ...elementTags,
          ...providingTags.GDPR_DATA(args.provider!)
        ]
      }
    }
  }
})

export const {
  useGdprExportQuery,
  useLazyGdprExportQuery,
  useGdprListProvidersQuery,
  useGdprSearchDataQuery,
  useLazyGdprSearchDataQuery
} = api

export { api }
export type * from './gdpr-data-extractor-api-slice.gen'
