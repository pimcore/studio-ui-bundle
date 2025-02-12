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

import { invalidatingTags, providingTags, type Tag, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './notes-and-events-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.NOTES_AND_EVENTS, tagNames.ASSET_DETAIL, tagNames.DATA_OBJECT_DETAIL],
  endpoints: {
    noteGetCollection: {
      providesTags: (result, error, args): Tag[] => {
        const tags: Tag[] = []

        result?.items.forEach((note) => {
          tags.push(...providingTags.NOTES_AND_EVENTS_DETAIL(note.id))
        })

        return tags
      }
    },
    noteDeleteById: {
      invalidatesTags: (result, error, args) => invalidatingTags.NOTES_AND_EVENTS_DETAIL(args.id)
    },
    noteElementGetCollection: {
      providesTags: (result, error, args) => {
        const tags: Tag[] = []

        result?.items.forEach((note) => {
          tags.push(...providingTags.NOTES_AND_EVENTS_DETAIL(note.id))
        })

        return [...tags, ...providingTags.ELEMENT_NOTES_AND_EVENTS(args.elementType, args.id)]
      }
    },
    noteElementCreate: {
      invalidatesTags: (result, error, args) => {
        const tags = invalidatingTags.ELEMENT_NOTES_AND_EVENTS(args.elementType, args.id)

        return tags.filter((tag) => tag !== undefined)
      }
    }
  }
})

export type * from './notes-and-events-api-slice.gen'
export const { useNoteDeleteByIdMutation, useNoteElementCreateMutation, useNoteElementGetCollectionQuery, useNoteElementGetTypeCollectionQuery, useNoteGetCollectionQuery } = api
