import { invalidatingTags, providingTags, tagNames, type Tag } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './emails-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.EMAIL_BLOCKLIST, tagNames.EMAIL_BLOCKLIST_DETAIL],
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
    }
  }
})

export type * from './emails-api-slice.gen'
export const {
  useEmailBlocklistGetCollectionQuery,
  useEmailBlocklistAddMutation,
  useEmailBlocklistDeleteMutation,
  useEmailLogGetCollectionQuery,
  useEmailLogGetByIdQuery,
  useEmailLogDeleteMutation,
  useEmailLogGetHtmlQuery,
  useEmailLogGetParamsQuery,
  useEmailLogGetTextQuery,
  useEmailLogForwardByIdMutation,
  useEmailLogResendByIdMutation,
  useEmailSendTestMutation,
} = api