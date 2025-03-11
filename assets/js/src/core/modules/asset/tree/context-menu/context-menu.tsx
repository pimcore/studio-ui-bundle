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

import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { type TreeContextMenuProps } from '@Pimcore/components/element-tree/element-tree'
import { defaultProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import { Upload } from '@Pimcore/components/upload/upload'
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
import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useUploadContext } from '@Pimcore/modules/element/upload/upload-provider'
import { ZipUpload } from '@Pimcore/components/upload/zip-upload'

export const AssetTreeContextMenu = (props: TreeContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const node = props.node ?? defaultProps
  const uploadFileRef = React.useRef<HTMLButtonElement>(null)
  const uploadZipRef = React.useRef<HTMLButtonElement>(null)
  const { setUploadingNode } = useUploadContext()
  const { createZipDownloadTreeContextMenuItem } = useZipDownload({ type: 'folder' })
  const { addFolderTreeContextMenuItem } = useAddFolder('asset')
  const { renameTreeContextMenuItem } = useRename('asset', getElementActionCacheKey('asset', 'rename', parseInt(node.id)))
  const { deleteTreeContextMenuItem } = useDelete('asset', getElementActionCacheKey('asset', 'delete', parseInt(node.id)))
  const { refreshTreeContextMenuItem } = useRefreshTree('asset')
  const { downloadTreeContextMenuItem } = useDownload()
  const { copyTreeContextMenuItem, cutTreeContextMenuItem, pasteTreeContextMenuItem, pasteCutContextMenuItem } = useCopyPaste('asset')
  const { lockTreeContextMenuItem, lockAndPropagateTreeContextMenuItem, unlockTreeContextMenuItem, unlockAndPropagateTreeContextMenuItem, isLockMenuHidden } = useLock('asset')
  const { uploadNewVersionTreeContextMenuItem } = useUploadNewVersion()
  const { isTreeActionAllowed } = useTreePermission()

  useEffect(() => {
    if (node !== undefined) {
      setUploadingNode(node.id)
    }
  }, [node])

  const isUploadMenuHidden = isTreeActionAllowed(TreePermission.HideAdd) ||
    (!isTreeActionAllowed(TreePermission.AddUpload) && !isTreeActionAllowed(TreePermission.AddUploadZip)) ||
    !checkElementPermission(node.permissions, 'create') ||
    node?.type !== 'folder'

  const items: DropdownMenuProps['items'] = [
    {
      label: t('element.tree.context-menu.new-assets'),
      key: 'new-assets',
      icon: <Icon value={ 'asset' } />,
      hidden: isUploadMenuHidden,
      children: [
        {
          icon: <Icon value={ 'upload-cloud' } />,
          label: t('element.tree.context-menu.add-assets.upload-files'),
          key: 'add-upload',
          hidden: !isTreeActionAllowed(TreePermission.AddUpload),
          onClick: () => {
            if (uploadFileRef.current !== null) {
              uploadFileRef.current?.click()
            }
          }
        },
        {
          icon: <Icon value={ 'upload-zip' } />,
          label: t('element.tree.context-menu.add-assets.upload-zip'),
          key: 'add-upload-zip',
          hidden: !isTreeActionAllowed(TreePermission.AddUploadZip),
          onClick: () => {
            if (uploadZipRef.current !== null) {
              uploadZipRef.current?.click()
            }
          }
        }
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
    <>
      <Upload>
        <Button
          ref={ uploadFileRef }
          style={ { display: 'none' } }
        ></Button>
      </Upload>

      <ZipUpload>
        <Button
          ref={ uploadZipRef }
          style={ { display: 'none' } }
        ></Button>
      </ZipUpload>

      <Dropdown
        menu={ { items } }
        trigger={ ['contextMenu'] }
      >
        {props.children}
      </Dropdown>
    </>
  )
}
