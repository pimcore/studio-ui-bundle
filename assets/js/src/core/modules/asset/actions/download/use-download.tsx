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

import {type ItemType} from '@Pimcore/components/dropdown/dropdown'
import {type Asset} from '@Pimcore/modules/asset/asset-api-slice.gen'
import {type TreeNodeProps} from '@Pimcore/components/element-tree/node/tree-node'
import {Icon} from '@Pimcore/components/icon/icon'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {getPrefix} from '@Pimcore/app/api/pimcore/route'
import {saveFileLocal} from '@Pimcore/utils/files'

export interface UseDownloadReturn {
  download: (id: string, label?: string) => Promise<void>
  downloadContextMenuItem: (node: Asset, onFinish?: () => void) => ItemType
  downloadTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useDownload = (): UseDownloadReturn => {
  const { t } = useTranslation()

  const download = (id: string, label?: string): void => {
    const downloadUrl = `${getPrefix()}/assets/${id}/download`
    saveFileLocal(downloadUrl, label)
  }

  const handleDownload = (node: Asset | TreeNodeProps, onFinish?: () => void): void => {
    const id = typeof node.id === 'string' ? node.id : node.id.toString()
    download(id)

    onFinish?.()
  }

  const downloadContextMenuItem = (node: Asset, onFinish?: () => void): ItemType => {
    return {
      label: t('asset.tree.context-menu.download'),
      key: 'download',
      icon: <Icon value={ 'download-02' } />,
      hidden: node.type === 'folder',
      onClick: () => handleDownload(node, onFinish)
    }
  }

  const downloadTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('asset.tree.context-menu.download'),
      key: 'download',
      icon: <Icon value={ 'download-02' } />,
      hidden: node.type === 'folder',
      onClick: () => handleDownload(node, onFinish)
    }
  }

  return {
    download,
    downloadContextMenuItem,
    downloadTreeContextMenuItem
  }
}
