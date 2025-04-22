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
