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
import { type Asset, useAssetImageClearThumbnailMutation } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface UseClearThumbnailsHookReturn {
  clearThumbnailContextMenuItem: (node: Asset, onFinish?: () => void) => ItemType
}

export const useClearThumbnails = (): UseClearThumbnailsHookReturn => {
  const { t } = useTranslation()
  const [clearThumbnail] = useAssetImageClearThumbnailMutation()

  const handleClearThumbnails = async (node: Asset, onFinish?: () => void): Promise<void> => {
    const clearThumbnailTask = clearThumbnail({ id: node.id })

    try {
      await clearThumbnailTask
      onFinish?.()
    } catch (error) {
      console.error('Error clearing thumbnails (id: ' + node.id + ')', error)
    }
  }

  const clearThumbnailContextMenuItem = (node: Asset, onFinish?: () => void): ItemType => {
    return {
      label: t('asset.tree.context-menu.clear-thumbnails'),
      key: 'clear-thumbnails',
      icon: <Icon value={ 'download' } />,
      hidden: node.type !== 'image',
      onClick: async () => { await handleClearThumbnails(node, onFinish) }
    }
  }

  return {
    clearThumbnailContextMenuItem
  }
}
