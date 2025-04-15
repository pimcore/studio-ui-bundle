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

import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import {
  type Asset, useAssetClearThumbnailMutation
} from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Icon } from '@Pimcore/components/icon/icon'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'

export interface UseClearThumbnailsHookReturn {
  clearImageThumbnailContextMenuItem: (node: Asset, onFinish?: () => void) => ItemType
  clearVideoThumbnailContextMenuItem: (node: Asset, onFinish?: () => void) => ItemType
  clearPdfThumbnailContextMenuItem: (node: Asset, onFinish?: () => void) => ItemType
}

export const useClearThumbnails = (): UseClearThumbnailsHookReturn => {
  const { t } = useTranslation()
  const [clearThumbnail, { isError, error }] = useAssetClearThumbnailMutation()

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  const handleClearThumbnails = async (node: Asset, onFinish?: () => void): Promise<void> => {
    const clearThumbnailTask = clearThumbnail({ id: node.id })

    await clearThumbnailTask
    onFinish?.()
  }

  const clearImageThumbnailContextMenuItem = (node: Asset, onFinish?: () => void): ItemType => {
    return {
      label: t('asset.tree.context-menu.clear-thumbnails'),
      key: ContextMenuActionName.clearImageThumbnails,
      icon: <Icon value={ 'remove-image-thumbnail' } />,
      hidden: node.type !== 'image' || !checkElementPermission(node.permissions, 'publish'),
      onClick: async () => { await handleClearThumbnails(node, onFinish) }
    }
  }

  const clearVideoThumbnailContextMenuItem = (node: Asset, onFinish?: () => void): ItemType => {
    return {
      label: t('asset.tree.context-menu.clear-thumbnails'),
      key: ContextMenuActionName.clearVideoThumbnails,
      icon: <Icon value={ 'remove-video-thumbnail' } />,
      hidden: node.type !== 'video' || !checkElementPermission(node.permissions, 'publish'),
      onClick: async () => { await handleClearThumbnails(node, onFinish) }
    }
  }

  const clearPdfThumbnailContextMenuItem = (node: Asset, onFinish?: () => void): ItemType => {
    return {
      label: t('asset.tree.context-menu.clear-thumbnails'),
      key: ContextMenuActionName.clearPdfThumbnails,
      icon: <Icon value={ 'remove-pdf-thumbnail' } />,
      hidden: node.mimeType !== 'application/pdf' || !checkElementPermission(node.permissions, 'publish'),
      onClick: async () => { await handleClearThumbnails(node, onFinish) }
    }
  }

  return {
    clearImageThumbnailContextMenuItem,
    clearVideoThumbnailContextMenuItem,
    clearPdfThumbnailContextMenuItem
  }
}
