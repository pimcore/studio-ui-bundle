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

import { Button } from 'antd'
import React, { useEffect } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { UseFileUploader } from '@Pimcore/modules/element/upload/hook/use-file-uploader'
import { Upload, type UploadProps } from '@Pimcore/components/upload/upload'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { UploadContext } from '@Pimcore/modules/element/upload/upload-provider'
import { type TreeContextMenuProps } from '@Pimcore/components/element-tree/element-tree'
import { useAddFolder } from '@Pimcore/modules/element/actions/add-folder/use-add-folder'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useCopyPaste } from '@Pimcore/modules/element/actions/copy-paste/use-copy-paste'
import { useLock } from '@Pimcore/modules/element/actions/lock/use-lock'
import { useZipDownload } from '@Pimcore/modules/asset/actions/zip-download/use-zip-download'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useDownload } from '@Pimcore/modules/asset/actions/download/use-download'
import { useUploadNewVersion } from '@Pimcore/modules/asset/actions/upload-new-version/upload-new-version'

export const AssetTreeContextMenu = (props: TreeContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { uploadFile: uploadFileProcessor, uploadZip: uploadZipProcessor } = UseFileUploader({ parentId: props.node?.id })
  const uploadFileRef = React.useRef<HTMLButtonElement>(null)
  const uploadZipRef = React.useRef<HTMLButtonElement>(null)

  const uploadContext = React.useContext(UploadContext)!
  const { createZipDownloadContextMenuItem } = useZipDownload({ type: 'folder' })
  const { addFolderTreeContextMenuItem } = useAddFolder('asset')
  const { renameTreeContextMenuItem } = useRename('asset')
  const { deleteTreeContextMenuItem } = useDelete('asset')
  const { refreshTreeContextMenuItem } = useRefreshTree('asset')
  const { downloadTreeContextMenuItem } = useDownload()
  const { copyTreeContextMenuItem, cutTreeContextMenuItem, pasteTreeContextMenuItem, pasteCutContextMenuItem } = useCopyPaste('asset')
  const { lockTreeContextMenuItem, lockAndPropagateTreeContextMenuItem, unlockTreeContextMenuItem, unlockAndPropagateTreeContextMenuItem } = useLock('asset')
  const { uploadNewVersionTreeContextMenuItem } = useUploadNewVersion()
  const node = props.node

  useEffect(() => {
    if (node !== undefined) {
      uploadContext.setUploadingNode(node.id)
    }
  }, [node])

  const items: DropdownMenuProps['items'] = [
    {
      label: t('element.tree.context-menu.add-assets'),
      key: '1',
      icon: <Icon value={ 'asset' } />,
      hidden: !checkElementPermission(props.node.permissions, 'create') || props.node?.type !== 'folder',
      children: [
        {
          icon: <Icon value={ 'upload-cloud' } />,
          label: t('element.tree.context-menu.add-assets.upload-files'),
          key: '1-1',
          onClick: () => {
            if (uploadFileRef.current !== null) {
              uploadFileRef.current?.click()
            }
          }
        },
        {
          icon: <Icon value={ 'upload-zip' } />,
          label: t('element.tree.context-menu.add-assets.upload-zip'),
          key: '1-2',
          onClick: () => {
            if (uploadZipRef.current !== null) {
              uploadZipRef.current?.click()
            }
          }
        }
      ]
    },
    addFolderTreeContextMenuItem(props.node),
    renameTreeContextMenuItem(props.node),
    copyTreeContextMenuItem(props.node),
    pasteTreeContextMenuItem(props.node),
    cutTreeContextMenuItem(props.node),
    pasteCutContextMenuItem(parseInt(props.node.id)),
    deleteTreeContextMenuItem(props.node),
    createZipDownloadContextMenuItem(props.node),
    uploadNewVersionTreeContextMenuItem(props.node),
    downloadTreeContextMenuItem(props.node),
    {
      label: t('element.tree.context-menu.advanced'),
      key: 'advanced',
      icon: <Icon value={ 'more' } />,
      children: [
        {
          label: t('element.lock'),
          key: 'advanced-lock',
          icon: <Icon value={ 'lock' } />,
          hidden: !checkElementPermission(props.node.permissions, 'publish') || props.node.isLocked,
          children: [
            lockTreeContextMenuItem(props.node),
            lockAndPropagateTreeContextMenuItem(props.node),
            unlockTreeContextMenuItem(props.node),
            unlockAndPropagateTreeContextMenuItem(props.node)
          ]
        }
      ]
    },
    refreshTreeContextMenuItem(props.node)
  ]

  const uploadFile: UploadProps = {
    action: `/pimcore-studio/api/assets/add/${props.node?.id}`,
    name: 'file',
    multiple: true,
    showUploadList: false,
    onChange: uploadFileProcessor
  }

  const uploadZip: UploadProps = {
    action: `/pimcore-studio/api/assets/add-zip/${props.node?.id}`,
    accept: '.zip, .rar, .7zip',
    name: 'zipFile',
    multiple: true,
    showUploadList: false,
    onChange: uploadZipProcessor
  }

  return (
    <>
      <Upload { ...uploadFile }>
        <Button
          ref={ uploadFileRef }
          style={ { display: 'none' } }
        ></Button>
      </Upload>

      <Upload { ...uploadZip }>
        <Button
          ref={ uploadZipRef }
          style={ { display: 'none' } }
        ></Button>
      </Upload>

      <Dropdown
        menu={ { items } }
        trigger={ ['contextMenu'] }
      >
        {props.children}
      </Dropdown>
    </>
  )
}
