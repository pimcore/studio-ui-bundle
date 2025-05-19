/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { type TreeContextMenuProps } from '@Pimcore/components/element-tree/element-tree'
import { defaultProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useUploadNewVersion } from '@Pimcore/modules/asset/actions/upload-new-version/upload-new-version'
import { useZipDownload } from '@Pimcore/modules/asset/actions/zip-download/use-zip-download'
import { useAddFolder } from '@Pimcore/modules/element/actions/add-folder/use-add-folder'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useLock } from '@Pimcore/modules/element/actions/lock/use-lock'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { getElementActionCacheKey } from '@Pimcore/modules/element/element-helper'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { useTreePermission } from '@Pimcore/modules/element/tree/provider/tree-permission-provider/use-tree-permission'
import { useTranslation } from 'react-i18next'
import { useUpload } from '../../actions/upload/use-upload'
import { type IMenuProps, Menu } from '@Pimcore/components/menu/menu'

export const AssetTreeContextMenu = (props: TreeContextMenuProps): ReactElement => {
  const { t } = useTranslation()
  const node = props.node ?? defaultProps
  const { createZipDownloadTreeContextMenuItem } = useZipDownload({ type: 'folder' })
  const { addFolderTreeContextMenuItem } = useAddFolder('asset')
  const { renameTreeContextMenuItem } = useRename('asset', getElementActionCacheKey('asset', 'rename', parseInt(node.id)))
  const { deleteTreeContextMenuItem } = useDelete('asset', getElementActionCacheKey('asset', 'delete', parseInt(node.id)))
  const { refreshTreeContextMenuItem } = useRefreshTree('asset')
  const { downloadTreeContextMenuItem } = useDownload()
  const { copyTreeContextMenuItem, cutTreeContextMenuItem, pasteTreeContextMenuItem, pasteCutContextMenuItem } = useCopyPaste('asset')
  const { lockTreeContextMenuItem, lockAndPropagateTreeContextMenuItem, unlockTreeContextMenuItem, unlockAndPropagateTreeContextMenuItem, isLockMenuHidden } = useLock('asset')
  const { uploadNewVersionTreeContextMenuItem } = useUploadNewVersion()
  const { uploadContextMenuItem, zipUploadContextMenuItem } = useUpload()
  const { isTreeActionAllowed } = useTreePermission()

  const isUploadMenuHidden = isTreeActionAllowed(TreePermission.HideAdd) ||
    (!isTreeActionAllowed(TreePermission.AddUpload) && !isTreeActionAllowed(TreePermission.AddUploadZip)) ||
    !checkElementPermission(node.permissions, 'create') ||
    node?.type !== 'folder'

  const items: IMenuProps['items'] = [
    {
      label: t('element.tree.context-menu.new-assets'),
      key: 'new-assets',
      icon: <Icon value={ 'asset' } />,
      hidden: isUploadMenuHidden,
      children: [
        uploadContextMenuItem(node),
        zipUploadContextMenuItem(node)
      ]
    },
    addFolderTreeContextMenuItem(node),
    renameTreeContextMenuItem(node),
    copyTreeContextMenuItem(node),
    pasteTreeContextMenuItem(node),
    cutTreeContextMenuItem(node),
    pasteCutContextMenuItem(parseInt(node.id)),
    deleteTreeContextMenuItem(node),
    createZipDownloadTreeContextMenuItem(node),
    uploadNewVersionTreeContextMenuItem(node),
    downloadTreeContextMenuItem(node),
    {
      label: t('element.tree.context-menu.advanced'),
      key: 'advanced',
      icon: <Icon value={ 'more' } />,
      hidden: isLockMenuHidden(node),
      children: [
        {
          label: t('element.lock'),
          key: 'advanced-lock',
          icon: <Icon value={ 'lock' } />,
          hidden: isLockMenuHidden(node),
          children: [
            lockTreeContextMenuItem(node),
            lockAndPropagateTreeContextMenuItem(node),
            unlockTreeContextMenuItem(node),
            unlockAndPropagateTreeContextMenuItem(node)
          ]
        }
      ]
    },
    refreshTreeContextMenuItem(node)
  ]

  return (
    <Menu
      items={ items }
    />
  )
}
