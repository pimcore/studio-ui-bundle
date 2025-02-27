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
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { saveFileLocal } from '@Pimcore/utils/files'
import type { GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useTreePermission } from '@Pimcore/modules/element/tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'

export interface UseDownloadReturn {
  download: (id: string, label?: string) => void
  downloadContextMenuItem: (node: Asset, onFinish?: () => void) => ItemType
  downloadTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  downloadGridContextMenuItem: (row: any) => ItemType | undefined
}

export const useDownload = (): UseDownloadReturn => {
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()

  const download = (id: string, label?: string): void => {
    const downloadUrl = `${getPrefix()}/assets/${id}/download`
    saveFileLocal(downloadUrl, label)
  }

  const handleDownload = (node: Asset | TreeNodeProps | GridContextMenuProps, onFinish?: () => void): void => {
    const id = typeof node.id === 'string' ? node.id : node.id.toString()
    download(id)

    onFinish?.()
  }

  const downloadContextMenuItem = (node: Asset, onFinish?: () => void): ItemType => {
    return {
      label: t('asset.tree.context-menu.download'),
      key: 'download',
      icon: <Icon value={ 'download' } />,
      hidden: node.type === 'folder' || !checkElementPermission(node.permissions, 'view'),
      onClick: () => { handleDownload(node, onFinish) }
    }
  }

  const downloadTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('asset.tree.context-menu.download'),
      key: 'download',
      icon: <Icon value={ 'download' } />,
      hidden: !isTreeActionAllowed(TreePermission.Download) || node.type === 'folder' || !checkElementPermission(node.permissions, 'view'),
      onClick: () => { handleDownload(node) }
    }
  }

  const downloadGridContextMenuItem = (row: any): ItemType | undefined => {
    const data: GridContextMenuProps = row.original ?? {}
    if (data.id === undefined || data.isLocked === undefined || data.permissions === undefined) {
      return
    }

    return {
      label: t('asset.tree.context-menu.download'),
      key: 'download',
      icon: <Icon value={ 'download' } />,
      onClick: () => { handleDownload(data) }
    }
  }

  return {
    download,
    downloadContextMenuItem,
    downloadTreeContextMenuItem,
    downloadGridContextMenuItem
  }
}
