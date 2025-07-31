/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React, { useState } from 'react'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { useAppDispatch } from '@Pimcore/app/store'
import { api } from '@Pimcore/modules/document/document-api-slice.gen'
import { type Element } from '@Pimcore/modules/element/element-helper'
export interface UseOpenInNewWindowHookReturn {
  openInNewWindow: (documentId: number, onFinish?: () => void) => Promise<void>
  openInNewWindowTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  openInNewWindowContextMenuItem: (document: Element, onFinish?: () => void) => ItemType
}

export const useOpenInNewWindow = (): UseOpenInNewWindowHookReturn => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const openInNewWindow = async (
    documentId: number,
    onFinish?: () => void
  ): Promise<void> => {
    setIsLoading(true)
    const { data } = await dispatch(api.endpoints.documentGetById.initiate({ id: documentId }))

    if (data?.settingsData != null && typeof data.settingsData.url === 'string') {
      window.open(data.settingsData.url as string)
      onFinish?.()
    } else {
      console.error('Failed to fetch document data')
    }

    setIsLoading(false)
  }

  const isContextMenuEntryHidden = (node: Element | TreeNodeProps): boolean => {
    return node.type !== 'page' ||
        !checkElementPermission(node.permissions, 'view')
  }

  const openInNewWindowContextMenuItem = (
    document: Element,
    onFinish?: () => void
  ): ItemType => {
    return {
      label: t('document.open-in-new-window'),
      key: ContextMenuActionName.openInNewWindow,
      isLoading,
      icon: <Icon value={ 'share' } />,
      hidden: isContextMenuEntryHidden(document),
      onClick: async () => {
        await openInNewWindow(document.id, onFinish)
      }
    }
  }

  const openInNewWindowTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('document.open-in-new-window'),
      key: ContextMenuActionName.openInNewWindow,
      icon: <Icon value={ 'share' } />,
      hidden: isContextMenuEntryHidden(node),
      onClick: async () => {
        await openInNewWindow(parseInt(node.id))
      }
    }
  }

  return {
    openInNewWindow,
    openInNewWindowTreeContextMenuItem,
    openInNewWindowContextMenuItem
  }
}
