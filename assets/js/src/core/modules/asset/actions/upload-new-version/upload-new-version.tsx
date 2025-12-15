/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useTreePermission } from '@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { useUploadModalContext } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { isNil } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { renameNode } from '@Pimcore/components/element-tree/element-tree-slice'

export interface UseUploadNewVersionReturn {
  uploadNewVersion: (id: number, onFinish?: () => void) => void
  uploadNewVersionContextMenuItem: (node: Asset, onFinish?: () => void) => ItemType
  uploadNewVersionTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useUploadNewVersion = (): UseUploadNewVersionReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { triggerUpload } = useUploadModalContext()
  const { isTreeActionAllowed } = useTreePermission()

  const uploadNewVersion = (id: number, onFinish?: () => void): void => {
    triggerUpload({
      action: `${getPrefix()}/assets/${id}/replace`,
      maxItems: 1,
      multiple: false,
      onSuccess: async (result: any) => {
        if (!isNil(result?.[0]?.response?.data)) {
          const newFilename = result[0].response.data
          
          dispatch(renameNode({
            nodeId: String(id),
            elementType: 'asset',
            newLabel: newFilename
          }))
        }
        onFinish?.()
      }
    })
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
          parseInt(node.id)
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
