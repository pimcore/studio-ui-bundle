/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags, providingTags, tagNames, type Tag } from '@Pimcore/app/api/pimcore/tags'
import { getPrefix } from '@sdk/api'
import { api as baseApi, type EmailLogGetCollectionApiResponse } from './emails-api-slice.gen'

interface EmailLogSearchApiArg {
  page: number
  pageSize: number
  email: string
}

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.EMAIL_BLOCKLIST, tagNames.EMAIL_BLOCKLIST_DETAIL, tagNames.EMAIL_LOG, tagNames.EMAIL_LOG_DETAIL],
  endpoints: {
    emailBlocklistGetCollection: {
      providesTags: (result, error, args) => {
        const blocklistCollection: Tag[] = []

        result?.items?.forEach((blocklistItem) => {
          blocklistCollection.push(...providingTags.EMAIL_BLOCKLIST_DETAIL(blocklistItem.email))
        })

        return [...blocklistCollection, ...providingTags.EMAIL_BLOCKLIST()]
      }
    },
    emailBlocklistAdd: {
      invalidatesTags: (result, error, args) => {
        return invalidatingTags.EMAIL_BLOCKLIST()
      }
    },
    emailBlocklistDelete: {
      invalidatesTags: (result, error, args) => {
        return invalidatingTags.EMAIL_BLOCKLIST_DETAIL(args.email!)
      }
    },
    emailLogGetCollection: {
      providesTags: (result, error, args) => {
        const logCollection: Tag[] = []

        result?.items?.forEach((blocklistItem) => {
          logCollection.push(...providingTags.EMAIL_LOG_DETAIL(blocklistItem.id))
        })

        return [...logCollection, ...providingTags.EMAIL_LOG()]
      }
    },
    emailLogDelete: {
      invalidatesTags: () => {
        return invalidatingTags.EMAIL_LOG()
      }
    }
  }
}).injectEndpoints({
  endpoints: (build) => ({
    emailLogSearch: build.query<EmailLogGetCollectionApiResponse, EmailLogSearchApiArg>({
      query: ({ page, pageSize, email }) => ({
        url: `${getPrefix()}/emails/search`,
        method: 'POST',
        body: {
          filters: {
            page,
            pageSize,
            columnFilters: [{ type: 'email', filterValue: email }]
          }
        }
      }),
      providesTags: providingTags.EMAIL_LOG()
    })
  }),
  overrideExisting: false
})

export type * from './emails-api-slice.gen'
export const {
  useEmailBlocklistGetCollectionQuery,
  useEmailBlocklistAddMutation,
  useEmailBlocklistDeleteMutation,
  useEmailLogGetCollectionQuery,
  useEmailLogSearchQuery,
  useEmailLogGetByIdQuery,
  useEmailLogDeleteMutation,
  useEmailLogGetHtmlQuery,
  useEmailLogGetParamsQuery,
  useEmailLogGetTextQuery,
  useEmailLogForwardByIdMutation,
  useEmailLogResendByIdMutation,
  useEmailSendTestMutation
} = api
