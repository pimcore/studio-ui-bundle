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

import { type Asset, type AssetReplaceApiResponse, useAssetReplaceMutation } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useCacheUpdate } from '@Pimcore/modules/element/hooks/use-cache-update'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useTreePermission } from '@Pimcore/modules/element/tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'

export interface UseUploadNewVersionReturn {
  uploadNewVersion: (id: number, accept?: string) => void
  uploadNewVersionContextMenuItem: (node: Asset, onFinish?: () => void) => ItemType
  uploadNewVersionTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useUploadNewVersion = (): UseUploadNewVersionReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const messageApi = useMessage()
  const { updateFieldValue } = useCacheUpdate('asset', ['ASSET_TREE'])
  const [replaceAsset] = useAssetReplaceMutation()
  const { isTreeActionAllowed } = useTreePermission()

  const uploadNewVersion = (id: number, accept?: string, onFinish?: () => void): void => {
    modal.upload({
      title: t('asset.upload'),
      label: t('asset.upload.label'),
      accept,
      rule: {
        required: true,
        message: t('element.rename.validation')
      },
      onOk: async (value: FileList) => {
        const file = value[0]

        await uploadNewVersionMutation(id, file)
        onFinish?.()
      }
    })
  }

  const uploadNewVersionMutation = async (id: number, file: File): Promise<void> => {
    const formData = new FormData()
    formData.append('file', file)

    const replaceAssetTask = replaceAsset({
      id,
      body: formData as any
    })

    try {
      const response = (await replaceAssetTask) as any

      if (response.error !== undefined) {
        throw new Error(response.error.data.error as string)
      }

      const data = response.data as AssetReplaceApiResponse
      updateFieldValue(
        id,
        'filename',
        data.data
      )
    } catch (e: any) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error({
        content: e.message
      })
    }
  }

  const uploadNewVersionContextMenuItem = (node: Asset, onFinish?: () => void): ItemType => {
    return {
      label: t('asset.tree.context-menu.upload-new-version'),
      key: ContextMenuActionName.uploadNewVersion,
      icon: <Icon value={ 'upload-cloud' } />,
      hidden: node.type === 'folder' ||
        !checkElementPermission(node.permissions, 'list') ||
        !checkElementPermission(node.permissions, 'view') ||
        !checkElementPermission(node.permissions, 'publish') ||
        !checkElementPermission(node.permissions, 'versions'),
      onClick: () => {
        uploadNewVersion(
          node.id,
          node.mimeType as string | undefined,
          onFinish
        )
      }
    }
  }

  const uploadNewVersionTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('asset.tree.context-menu.upload-new-version'),
      key: ContextMenuActionName.uploadNewVersion,
      icon: <Icon value={ 'upload-cloud' } />,
      hidden: !isTreeActionAllowed(TreePermission.UploadNewVersion) ||
        node.type === 'folder' ||
        !checkElementPermission(node.permissions, 'list') ||
        !checkElementPermission(node.permissions, 'view') ||
        !checkElementPermission(node.permissions, 'publish') ||
        !checkElementPermission(node.permissions, 'versions'),
      onClick: () => {
        uploadNewVersion(
          parseInt(node.id),
          node.metaData.asset.mimeType as string | undefined
        )
      }
    }
  }

  return {
    uploadNewVersion,
    uploadNewVersionTreeContextMenuItem,
    uploadNewVersionContextMenuItem
  }
}
