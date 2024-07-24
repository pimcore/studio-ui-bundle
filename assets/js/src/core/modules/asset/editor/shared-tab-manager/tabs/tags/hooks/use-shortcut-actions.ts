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

import { api as tagsApi, type Tag } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useContext } from 'react'
import { useAppDispatch } from '@Pimcore/app/store'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice.gen'

interface UseShortcutActionsReturn {
  applyFolderTags: () => Promise<void>
  removeCurrentAndApplyFolderTags: () => Promise<void>
}

export const useShortcutActions = (): UseShortcutActionsReturn => {
  const { id } = useContext(AssetContext)
  const dispatch = useAppDispatch()
  const assetInfo = dispatch(assetApi.endpoints.getAssetById.initiate({ id: id! }))

  const getCurrentAndParentTags = async (): Promise<Awaited<any>> => {
    return await Promise.resolve(assetInfo)
      .then(({ data }) => {
        if (data !== undefined) {
          return data.parentId
        }

        throw new Error(`Asset with ID "${id}" not found`)
      })
      .then(async (parentId: number) => {
        const parentTags = await dispatch(tagsApi.endpoints.getTagsForElementByTypeAndId.initiate({
          elementType: 'asset',
          id: parentId
        }))

        const currentTags = await dispatch(tagsApi.endpoints.getTagsForElementByTypeAndId.initiate({
          elementType: 'asset',
          id: id!
        }))

        return { parentTags, currentTags }
      })
  }

  const applyFolderTags = async (): Promise<void> => {
    Promise.resolve(getCurrentAndParentTags())
      .then(async ({ parentTags, currentTags }) => {
        const saveParentTags = parentTags.data?.items ?? []
        const saveChildrenTags = currentTags.data?.items ?? []
        const items: Tag[] = { ...saveParentTags, ...saveChildrenTags }
        const tagIds = Object.keys(items).map(Number)

        dispatch(
          tagsApi.util.updateQueryData(
            'getTagsForElementByTypeAndId',
            {
              elementType: 'asset',
              id: id!
            },
            (draft): any => {
              return {
                totalItems: items.length,
                items
              }
            }
          )
        )

        try {
          void await dispatch(tagsApi.endpoints.batchAssignTagsForElements.initiate({
            elementType: 'asset',
            elementTagIdCollection: {
              elementIds: [id!],
              tagIds
            }
          }))
        } catch (error) {
          console.error(error)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const removeCurrentAndApplyFolderTags = async (): Promise<void> => {
    Promise.resolve(getCurrentAndParentTags())
      .then(async ({ parentTags }) => {
        const items: Tag[] = parentTags.data?.items ?? []
        const tagIds = Object.keys(items).map(Number)

        dispatch(
          tagsApi.util.updateQueryData(
            'getTagsForElementByTypeAndId',
            {
              elementType: 'asset',
              id: id!
            },
            (draft): any => {
              return {
                totalItems: Object.keys(items).length,
                items
              }
            }
          )
        )

        try {
          void await dispatch(tagsApi.endpoints.batchReplaceTagsForElements.initiate({
            elementType: 'asset',
            elementTagIdCollection: {
              elementIds: [id!],
              tagIds
            }
          }))
        } catch (error) {
          console.error(error)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return {
    applyFolderTags,
    removeCurrentAndApplyFolderTags
  }
}
