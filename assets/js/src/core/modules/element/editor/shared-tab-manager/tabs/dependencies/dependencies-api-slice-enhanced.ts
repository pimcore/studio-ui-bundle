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
import { api as baseApi } from './dependencies-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.ASSET_DETAIL, tagNames.DATA_OBJECT_DETAIL, tagNames.DEPENDENCIES],
  endpoints: {
    dependencyGetCollectionByElementType: {
      providesTags: (result, error, args) => {
        const tags = providingTags.ELEMENT_DEPENDENCIES(args.elementType, args.id)

        return tags.filter((tag) => tag !== undefined)
      }
    }
  }
})

export type * from './dependencies-api-slice.gen'
export const { useDependencyGetCollectionByElementTypeQuery } = api
