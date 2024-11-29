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
import { useMessage } from '@Pimcore/components/message/useMessage'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

export interface UseDownloadReturn {
  download: (id: string, label?: string) => Promise<void>
  downloadContextMenuItem: (node: Asset, onFinish?: () => void) => ItemType
  downloadTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useDownload = (): UseDownloadReturn => {
  const { t } = useTranslation()
  const messageApi = useMessage()

  const download = async (id: string, label?: string): Promise<void> => {
    const downloadUrl = `${getPrefix()}/assets/${id}/download`

    try {
      const response = await fetch(downloadUrl)

      if (label === undefined) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        const filename = response.headers.get('content-disposition') ?? ''
        const matches = filenameRegex.exec(filename)

        if (matches?.[1] !== undefined) {
          label = matches[1].replace(/['"]/g, '')
        }

        if (label === undefined) {
          label = 'download'
        }
      }

      if (!response.ok) {
        throw new Error('File download not possible')
      }

      // Get the blob from the response
      const blob = await response.blob()

      const link = document.createElement('a')
      link.download = label
      link.href = window.URL.createObjectURL(blob)
      link.click()
    } catch (e: any) {
      await messageApi.error({
        content: e.message
      })
    }
  }

  const handleDownload = async (node: Asset | TreeNodeProps, onFinish?: () => void): Promise<void> => {
    const id = typeof node.id === 'string' ? node.id : node.id.toString()

    await download(id)

    onFinish?.()
  }

  const downloadContextMenuItem = (node: Asset, onFinish?: () => void): ItemType => {
    return {
      label: t('asset.tree.context-menu.download'),
      key: 'download',
      icon: <Icon value={ 'download-02' } />,
      hidden: node.type === 'folder',
      onClick: () => {
        void handleDownload(node, onFinish)
      }
    }
  }

  const downloadTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('asset.tree.context-menu.download'),
      key: 'download',
      icon: <Icon value={ 'download-02' } />,
      hidden: node.type === 'folder',
      onClick: () => {
        void handleDownload(node)
      }
    }
  }

  return {
    download,
    downloadContextMenuItem,
    downloadTreeContextMenuItem
  }
}
