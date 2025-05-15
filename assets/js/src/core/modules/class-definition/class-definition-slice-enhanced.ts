/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './class-definition-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_DETAIL],
  endpoints: {

    classCustomLayoutEditorCollection: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
    },
    classFieldCollectionObjectLayout: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
    },
    classObjectBrickObjectLayout: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
    }
  }
})

export type * from './class-definition-slice.gen'

export const {
  useClassDefinitionCollectionQuery,
  useClassDefinitionFolderCollectionQuery,
  useClassCustomLayoutCollectionQuery,
  usePimcoreStudioApiClassCustomLayoutCreateMutation,
  usePimcoreStudioApiClassCustomLayoutGetQuery,
  usePimcoreStudioApiClassCustomLayoutUpdateMutation,
  usePimcoreStudioApiClassCustomLayoutDeleteMutation,
  useClassCustomLayoutEditorCollectionQuery,
  usePimcoreStudioApiClassCustomLayoutExportQuery,
  usePimcoreStudioApiClassCustomLayoutImportMutation,
  useClassFieldCollectionObjectLayoutQuery,
  useClassDefinitionGetQuery,
  useClassObjectBrickObjectLayoutQuery
} = api

export { api }
