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
import { has, isNil, isString, isUndefined } from 'lodash'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { useTreePermission } from '@Pimcore/modules/element/tree/provider/tree-permission-provider/use-tree-permission'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

export interface UseOpenInNewWindowHookReturn {
  openInNewWindow: (documentId: number, onFinish?: () => void) => Promise<void>
  openInNewWindowTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  openInNewWindowContextMenuItem: (document: Element, onFinish?: () => void) => ItemType
  openPreviewInNewWindowContextMenuItem: (document: Element, previewUrl: string, onFinish?: () => void) => ItemType
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

    // Use settingsData.url if available, otherwise use fullPath
    if (!isNil(data?.settingsData) && has(data?.settingsData, 'url') && isString(data?.settingsData.url)) {
      const url: string = data.settingsData.url
      window.open(url)
      onFinish?.()
    } else if (!isNil(data?.fullPath)) {
      // Open document without preview parameters (just the plain URL)
      window.open(data.fullPath)
      onFinish?.()
    } else {
      console.error('Failed to fetch document data', data)
    }

    setIsLoading(false)
  }

  const isContextMenuEntryHidden = (node: Element | TreeNodeProps, options?: { preview?: boolean }): boolean => {
    return !checkElementPermission(node.permissions, 'view') ||
           ((isNil(options?.preview) || !options?.preview) && ['snippet', 'newsletter', 'folder', 'link', 'hardlink', 'email'].includes(node.type!)) ||
           (!isNil(options?.preview) && options.preview && ['folder', 'link', 'hardlink'].includes(node.type!))
  }

  const isTreeContextMenuEntryHidden = (node: Element | TreeNodeProps): boolean => {
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
      hidden: isTreeContextMenuEntryHidden(node) || !isTreeActionAllowed(TreePermission.Open),
      onClick: async () => {
        await openInNewWindow(parseInt(node.id))
      }
    }
  }

  const openPreviewInNewWindowContextMenuItem = (
    document: Element,
    previewUrl: string,
    onFinish?: () => void
  ): ItemType => {
    return {
      label: t('document.open-preview-in-new-window'),
      key: ContextMenuActionName.openPreviewInNewWindow,
      icon: <Icon value={ 'eye' } />,
      hidden: isContextMenuEntryHidden(document, { preview: true }),
      onClick: () => {
        window.open(previewUrl)
        onFinish?.()
      }
    }
  }

  return {
    openInNewWindow,
    openInNewWindowTreeContextMenuItem,
    openInNewWindowContextMenuItem,
    openPreviewInNewWindowContextMenuItem
  }
}
