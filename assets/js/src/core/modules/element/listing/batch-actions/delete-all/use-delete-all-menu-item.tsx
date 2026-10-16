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
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { type DeleteAllTarget, getDeleteAllState } from './get-delete-all-state'

/**
 * Listing batch action that deletes the listed folder including all of its children.
 * It reuses the folder delete of the tree, so the confirmation shows the same recycle bin warning.
 */
export const useDeleteAllMenuItem = (elementType: ElementType, hasSelectedItems: boolean): ItemType => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const messageApi = useMessage()
  const { id } = useElementContext()
  const { element } = useElementDraft(id, elementType)
  const { deleteElement } = useDelete(elementType)

  const { hidden, disabled } = getDeleteAllState(
    element === undefined ? undefined : { ...element, isLocked: (element as { isLocked?: boolean }).isLocked },
    hasSelectedItems
  )

  // The draft is not updated when the folder gets locked or its permissions change elsewhere
  // (e.g. from the tree), so the folder is reloaded before deleting its whole subtree.
  const fetchCurrentFolder = async (): Promise<DeleteAllTarget | undefined> => {
    const request = elementType === 'asset'
      ? dispatch(assetApi.endpoints.assetGetById.initiate({ id }, { forceRefetch: true }))
      : dispatch(dataObjectApi.endpoints.dataObjectGetById.initiate({ id }, { forceRefetch: true }))

    try {
      const { data, error } = await request

      if (!isUndefined(error)) {
        trackError(new ApiError(error))
        return undefined
      }

      return data
    } finally {
      request.unsubscribe()
    }
  }

  return {
    key: 'delete-all',
    hidden,
    disabled,
    label: t('listing.actions.delete-all'),
    icon: <Icon value={ 'trash' } />,
    onClick: async () => {
      if (element === undefined) {
        return
      }

      const currentFolder = await fetchCurrentFolder()

      if (currentFolder === undefined) {
        return
      }

      if (getDeleteAllState(currentFolder, false).disabled) {
        void messageApi.warning(t('listing.actions.delete-all.not-allowed'))
        return
      }

      // The folder delete confirmation renders the label with a leading slash
      const label = (element.fullPath ?? String(id)).replace(/^\//, '')
      deleteElement(id, label, element.parentId, undefined, true)
    }
  }
}
