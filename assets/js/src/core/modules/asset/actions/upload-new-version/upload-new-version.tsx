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
import { api } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
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
import { updateNodeData, setNodeFetchingInAllTrees } from '@Pimcore/components/element-tree/element-tree-slice'
import { transformApiDataToNode } from '@Pimcore/modules/asset/tree/utils/transform-api-data-to-node'
import { addCacheBusterToUrl } from '@Pimcore/utils/url-cache-buster'

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

  const refreshTreeNode = async (id: number): Promise<void> => {
    dispatch(setNodeFetchingInAllTrees({ nodeId: String(id), elementType: 'asset', isFetching: true }))

    const fetcher = dispatch(api.endpoints.assetGetTree.initiate(
      { page: 1, pageSize: 1, pqlQuery: `id = ${id}`, pathIncludeParent: true },
      { forceRefetch: true }
    ))

    try {
      const { data } = await fetcher

      if (!isNil(data?.items?.[0])) {
        const freshNode = transformApiDataToNode(
          data.items[0],
          { id: String(id), internalKey: String(id) }
        )

        const assetItem = data.items[0]
        const cacheBustedItem = 'imageThumbnailPath' in assetItem && !isNil(assetItem.imageThumbnailPath)
          ? { ...assetItem, imageThumbnailPath: addCacheBusterToUrl(assetItem.imageThumbnailPath) }
          : assetItem

        const cacheBustedIcon = freshNode.icon.type === 'path'
          ? { ...freshNode.icon, value: addCacheBusterToUrl(freshNode.icon.value) }
          : freshNode.icon

        dispatch(updateNodeData({
          nodeId: String(id),
          elementType: 'asset',
          data: {
            icon: cacheBustedIcon,
            label: freshNode.label,
            metaData: { asset: cacheBustedItem }
          }
        }))
      }
    } finally {
      fetcher.unsubscribe()
      dispatch(setNodeFetchingInAllTrees({ nodeId: String(id), elementType: 'asset', isFetching: false }))
    }
  }

  const uploadNewVersion = (id: number, onFinish?: () => void): void => {
    triggerUpload({
      action: `${getPrefix()}/assets/${id}/replace`,
      maxItems: 1,
      multiple: false,
      onSuccess: async (result: any) => {
        await refreshTreeNode(id)
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
