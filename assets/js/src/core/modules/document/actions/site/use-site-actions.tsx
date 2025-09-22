/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback } from 'react'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useDocumentDeleteSiteMutation } from '@Pimcore/modules/document/document-api-slice.gen'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { useTreePermission } from '@Pimcore/modules/element/tree/provider/tree-permission-provider/use-tree-permission'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { useAppDispatch } from '@sdk/app'
import { isNil } from 'lodash'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export interface UseSiteActionsHookReturn {
  removeSiteTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useSiteActions = (): UseSiteActionsHookReturn => {
  const { t } = useTranslation()
  const [documentDeleteSite, { isError, error }] = useDocumentDeleteSiteMutation()
  const modal = useFormModal()
  const dispatch = useAppDispatch()
  const { isTreeActionAllowed } = useTreePermission()

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError, error])

  const removeSite = async (id: number): Promise<void> => {
    const response = await documentDeleteSite({ id })

    if (response.error !== undefined) {
      return
    }

    // Refresh the tree to reflect the changes
    dispatch(refreshNodeChildren({
      nodeId: String(id),
      elementType: 'document'
    }))
  }

  const showRemoveSiteConfirmation = (id: number): void => {
    modal.confirm({
      title: t('document.site.remove-site'),
      content: t('document.site.remove-site-confirmation'),
      okText: t('remove'),
      onOk: async () => {
        await removeSite(id)
      }
    })
  }

  const removeSiteTreeContextMenuItem = useCallback((node: TreeNodeProps): ItemType => {
    const documentData = node.metaData?.document
    const isSite = documentData?.isSite === true
    
    return {
      key: 'removeSite',
      label: t('document.site.remove-site'),
      icon: <Icon value={ 'trash' } />,
      hidden: node.type !== 'page' || !isSite || !isAllowed('sites'),
      onClick: (): void => {
        showRemoveSiteConfirmation(parseInt(node.id))
      }
    }
  }, [t, showRemoveSiteConfirmation, isAllowed])

  return {
    removeSiteTreeContextMenuItem
  }
}