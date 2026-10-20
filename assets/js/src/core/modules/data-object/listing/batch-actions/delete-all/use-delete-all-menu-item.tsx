/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@Pimcore/app/store'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useBatchDelete } from '@Pimcore/modules/data-object/actions/batch-delete/use-batch-delete'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { canDeleteAllChildren, type DeleteAllChild, isDeleteAllHidden } from './get-delete-all-state'

const CHILDREN_PAGE_SIZE = 1000

type FolderChild = DeleteAllChild & { fullPath?: string }

/**
 * Listing batch action that deletes all items of the listed data object folder, the folder itself stays.
 * Every direct child is deleted together with its own children, through the same batch delete
 * (confirmation, recycle bin and dependency warnings) as a delete of selected rows.
 */
export const useDeleteAllMenuItem = (hasSelectedItems: boolean): ItemType => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const messageApi = useMessage()
  const { id } = useElementContext()
  const { dataObject } = useDataObjectDraft(id)
  const { confirmBatchDelete } = useBatchDelete()

  const hidden = isDeleteAllHidden(dataObject, hasSelectedItems)

  // Loaded on click and not taken from the grid: the grid is paginated, may be filtered and only
  // shows one class, while the folder can contain items of any class and sub folders.
  const fetchChildren = async (): Promise<FolderChild[] | undefined> => {
    const children: FolderChild[] = []
    let page = 1
    let totalItems = 0

    do {
      const request = dispatch(dataObjectApi.endpoints.dataObjectGetTree.initiate(
        { parentId: id, page, pageSize: CHILDREN_PAGE_SIZE, excludeFolders: false },
        { forceRefetch: true }
      ))

      try {
        const { data, error } = await request

        if (!isUndefined(error) || isUndefined(data)) {
          if (!isUndefined(error)) {
            trackError(new ApiError(error))
          }
          return undefined
        }

        if (data.items.length === 0) {
          break
        }

        children.push(...data.items)
        totalItems = data.totalItems
      } finally {
        request.unsubscribe()
      }

      page++
    } while (children.length < totalItems)

    return children
  }

  return {
    key: 'delete-all',
    hidden,
    label: t('listing.actions.delete-all'),
    icon: <Icon value={ 'trash' } />,
    onClick: async () => {
      const children = await fetchChildren()

      if (children === undefined) {
        return
      }

      if (children.length === 0) {
        void messageApi.info(t('listing.actions.delete-all.empty'))
        return
      }

      if (!canDeleteAllChildren(children)) {
        void messageApi.warning(t('listing.actions.delete-all.not-allowed'))
        return
      }

      // The confirmation reads the path from grid row data, which names it "fullpath"
      const rowsData = Object.fromEntries(children.map((item) => [item.id, { fullpath: item.fullPath }]))

      await confirmBatchDelete(children.map((item) => item.id), rowsData)
    }
  }
}
