/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { providingTags, tagNames, type Tag } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './application-logger-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.APPLICATION_LOGGER, tagNames.APPLICATION_LOGGER_DETAIL],
  endpoints: {
    bundleApplicationLoggerGetCollection: {
      providesTags: (result, error, args) => {
        const tagCollection: Tag[] = []

        result?.items?.forEach((entry) => {
          tagCollection.push(...providingTags.APPLICATION_LOGGER_DETAIL(entry.id))
        })

        return [...tagCollection, ...providingTags.APPLICATION_LOGGER()]
      }
    }
  }
})

export type * from './application-logger-api-slice.gen'
export const {
  useBundleApplicationLoggerGetCollectionQuery,
  useBundleApplicationLoggerListComponentsQuery,
  useBundleApplicationLoggerListPrioritiesQuery
} = api
