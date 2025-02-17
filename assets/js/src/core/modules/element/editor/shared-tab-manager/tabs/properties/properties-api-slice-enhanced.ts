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
import { api as baseApi } from './properties-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.ASSET_DETAIL, tagNames.DATA_OBJECT_DETAIL],
  endpoints: {
    propertyGetCollectionForElementByTypeAndId: {
      providesTags: (result, error, args) => {
        const propertyCollection: Tag[] = []

        result?.items?.forEach((property) => {
          propertyCollection.push(...providingTags.PROPERTY_DETAIL(property.key))
        })

        return [...propertyCollection, ...providingTags.ELEMENT_PROPERTIES(args.elementType, args.id)]
      }
    },
    propertyGetCollection: {
      providesTags: (result, error, args) => {
        const propertyCollection: Tag[] = []

        result?.items?.forEach((property) => {
          propertyCollection.push(...providingTags.PROPERTY_DETAIL(property.key))
        })

        return propertyCollection
      }
    },
    propertyUpdate: {
      invalidatesTags: (result, error, args) => invalidatingTags.PROPERTY_DETAIL(args.id)
    },
    propertyDelete: {
      invalidatesTags: (result, error, args) => invalidatingTags.PROPERTY_DETAIL(args.id)
    }
  }
})

export type * from './properties-api-slice.gen'

export const { usePropertyGetCollectionQuery, usePropertyGetCollectionForElementByTypeAndIdQuery } = api
