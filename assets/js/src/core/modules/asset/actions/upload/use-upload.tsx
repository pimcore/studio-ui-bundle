/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { useUploadModalContext } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { useTreePermission } from '@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { ZipUploadJob } from '@Pimcore/modules/execution-engine/jobs/zip-upload/zip-upload-job'

export interface UseUploadHookReturn {
  upload: (id: string) => void
  zipUpload: (id: string) => void
  uploadContextMenuItem: (node: TreeNodeProps) => ItemType
  zipUploadContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useUpload = (): UseUploadHookReturn => {
  const { triggerUpload } = useUploadModalContext()
  const { t } = useTranslation()
  const { refreshTree } = useRefreshTree('asset')
  const { isTreeActionAllowed } = useTreePermission()
  const executionEngine = useExecutionEngine()

  const upload = (id: string): void => {
    triggerUpload({
      targetFolderId: parseInt(id),
      skipAssetFetch: true,
      onSuccess: async (): Promise<void> => {
        refreshTree(parseInt(id))
      }
    })
  }

  const zipUpload = (id: string): void => {
    void executionEngine.runJob(new ZipUploadJob({
      triggerUpload,
      parentFolder: id,
      onJobCompletion: async () => {
        refreshTree(parseInt(id))
      }
    }))
  }

  const isUploadHidden = (node: TreeNodeProps): boolean => {
    return !checkElementPermission(node.permissions, 'create') || node?.type !== 'folder'
  }

  const uploadContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.context-menu.add-assets.upload-files'),
      key: ContextMenuActionName.upload,
      icon: <Icon value={ 'upload-cloud' } />,
      hidden: isUploadHidden(node) || !isTreeActionAllowed(TreePermission.AddUpload),
      onClick: () => { upload(node.id) }
    }
  }

  const zipUploadContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.context-menu.add-assets.upload-zip'),
      key: ContextMenuActionName.uploadZip,
      icon: <Icon value={ 'upload-zip' } />,
      hidden: isUploadHidden(node) || !isTreeActionAllowed(TreePermission.AddUploadZip),
      onClick: () => { zipUpload(node.id) }
    }
  }

  return {
    upload,
    zipUpload,
    uploadContextMenuItem,
    zipUploadContextMenuItem
  }
}
