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

import { api as tagsApi, type Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { useAppDispatch } from '@Pimcore/app/store'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

interface UseShortcutActionsReturn {
  applyFolderTags: () => Promise<void>
  removeCurrentAndApplyFolderTags: () => Promise<void>
}

export const useShortcutActions = (): UseShortcutActionsReturn => {
  const { id, elementType } = useElementContext()
  const dispatch = useAppDispatch()
  const { element } = useElementDraft(id, elementType)
  const parentId = element?.parentId

  const getCurrentAndParentTags = async (): Promise<Awaited<any>> => {
    const parentTags = await dispatch(tagsApi.endpoints.tagGetCollectionForElementByTypeAndId.initiate({
      elementType,
      id: parentId!
    }))

    const currentTags = await dispatch(tagsApi.endpoints.tagGetCollectionForElementByTypeAndId.initiate({
      elementType,
      id
    }))

    return { parentTags, currentTags }
  }

  const applyFolderTags = async (): Promise<void> => {
    Promise.resolve(getCurrentAndParentTags())
      .then(async ({ parentTags, currentTags }) => {
        const saveParentTags = parentTags.data?.items ?? []
        const saveChildrenTags = currentTags.data?.items ?? []
        const items: Tag[] = { ...saveParentTags, ...saveChildrenTags }

        const tagIds = Object.keys(items).map(Number)

        const cacheUpdate = dispatch(
          tagsApi.util.updateQueryData(
            'tagGetCollectionForElementByTypeAndId',
            {
              elementType,
              id
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
          void await dispatch(tagsApi.endpoints.tagBatchAssignToElementsByType.initiate({
            elementType,
            elementTagIdCollection: {
              elementIds: [id],
              tagIds
            }
          }))
        } catch (error) {
          cacheUpdate.undo()
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

        const cacheUpdate = dispatch(
          tagsApi.util.updateQueryData(
            'tagGetCollectionForElementByTypeAndId',
            {
              elementType,
              id
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
          void await dispatch(tagsApi.endpoints.tagBatchReplaceForElementsByType.initiate({
            elementType,
            elementTagIdCollection: {
              elementIds: [id],
              tagIds
            }
          }))
        } catch (error) {
          cacheUpdate.undo()
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
