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
import { isNil, isUndefined } from 'lodash'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { useTreePermission } from '@Pimcore/modules/element/tree/provider/tree-permission-provider/use-tree-permission'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

export interface UseOpenInNewWindowHookReturn {
  openInNewWindow: (documentId: number, onFinish?: () => void) => Promise<void>
  openInNewWindowTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  openInNewWindowContextMenuItem: (document: Element, onFinish?: () => void) => ItemType
}

export const useOpenInNewWindow = (): UseOpenInNewWindowHookReturn => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { isTreeActionAllowed } = useTreePermission()

  const openInNewWindow = async (
    documentId: number,
    onFinish?: () => void
  ): Promise<void> => {
    setIsLoading(true)
    const { data, error } = await dispatch(api.endpoints.documentGetById.initiate({ id: documentId }))

    if (!isUndefined(error)) {
      trackError(new ApiError(error))
      setIsLoading(false)
    }

    // type guard to check if settingsData has a url property, since the settingsData object in the API response can vary
    function hasUrl (obj: unknown): obj is { url: string } {
      return typeof obj === 'object' && obj !== null && 'url' in obj && typeof (obj as any).url === 'string'
    }

    if (!isNil(data?.settingsData) && hasUrl(data?.settingsData)) {
      window.open(data.settingsData.url)
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
      hidden: isContextMenuEntryHidden(node) || !isTreeActionAllowed(TreePermission.Open),
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
