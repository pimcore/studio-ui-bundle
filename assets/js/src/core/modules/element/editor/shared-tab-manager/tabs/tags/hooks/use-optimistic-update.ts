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

import {
  api,
  type Tag,
  type TagGetCollectionForElementByTypeAndIdApiArg,
  type TagGetCollectionForElementByTypeAndIdApiResponse
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { useAppDispatch } from '@Pimcore/app/store'
import { type Key } from 'react'

// @TODO: Find replacement for PatchCollection since dist imports should not be used
// import { type PatchCollection } from '@reduxjs/toolkit/dist/query/core/buildThunks'
type PatchCollection = any

interface UpdateTagsForElementByTypeAndIdProps extends TagGetCollectionForElementByTypeAndIdApiArg {
  flatTags: Tag[]
  checkedTags: Key[]
}

interface UseOptimisticUpdateReturn {
  updateTagsForElementByTypeAndId: (props: UpdateTagsForElementByTypeAndIdProps) => PatchCollection
}

export const useOptimisticUpdate = (): UseOptimisticUpdateReturn => {
  const dispatch = useAppDispatch()

  const updateTagsForElementByTypeAndId = (props: UpdateTagsForElementByTypeAndIdProps): PatchCollection => {
    return dispatch(
      api.util.updateQueryData(
        'tagGetCollectionForElementByTypeAndId',
        {
          elementType: props.elementType,
          id: props.id
        },
        (draft): TagGetCollectionForElementByTypeAndIdApiResponse => {
          const items = props.flatTags
            .filter((tag) => props.checkedTags.includes(tag.id))

          return {
            totalItems: props.checkedTags.length,
            items
          }
        }
      )
    )
  }
  return {
    updateTagsForElementByTypeAndId
  }
}
