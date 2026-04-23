/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags, providingTags, type Tag, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './notes-and-events-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.NOTES_AND_EVENTS, tagNames.ASSET_DETAIL, tagNames.DATA_OBJECT_DETAIL],
  endpoints: {
    noteGetCollection: {
      providesTags: (result, error, args): Tag[] => {
        const tags: Tag[] = [...providingTags.NOTES_AND_EVENTS()]

        result?.items.forEach((note) => {
          tags.push(...providingTags.NOTES_AND_EVENTS_DETAIL(note.id))
        })

        return tags
      }
    },
    noteElementGetCollection: {
      providesTags: (result, error, args) => {
        const tags: Tag[] = [...providingTags.NOTES_AND_EVENTS()]

        result?.items.forEach((note) => {
          tags.push(...providingTags.NOTES_AND_EVENTS_DETAIL(note.id))
        })

        return [...tags, ...providingTags.ELEMENT_NOTES_AND_EVENTS(args.elementType, args.id)]
      }
    },
    noteDeleteById: {
      invalidatesTags: invalidatingTags.NOTES_AND_EVENTS()
    },
    noteElementCreate: {
      invalidatesTags: invalidatingTags.NOTES_AND_EVENTS()
    }
  }
})

export type * from './notes-and-events-api-slice.gen'
export const { useNoteDeleteByIdMutation, useNoteElementCreateMutation, useNoteElementGetCollectionQuery, useNoteElementGetTypeCollectionQuery, useNoteGetCollectionQuery } = api
