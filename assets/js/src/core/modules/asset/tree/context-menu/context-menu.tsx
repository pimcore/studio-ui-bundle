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
import {
  api as assetApi,
  useAssetCloneMutation,
  useAssetPatchByIdMutation
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { useAssetActions } from './hooks/use-asset-actions'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { UploadContext } from '@Pimcore/modules/element/upload/upload-provider'
import { type TreeContextMenuProps } from '@Pimcore/components/element-tree/element-tree'
import { useAddFolder } from '@Pimcore/modules/element/actions/add-folder/use-add-folder'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { useDelete } from '@Pimcore/modules/element/actions/delete/use-delete'

export const AssetTreeContextMenu = (props: TreeContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { uploadFile: uploadFileProcessor, uploadZip: uploadZipProcessor } = UseFileUploader({ parentId: props.node?.id })
  const uploadFileRef = React.useRef<HTMLButtonElement>(null)
  const uploadZipRef = React.useRef<HTMLButtonElement>(null)
  const [assetPatch] = useAssetPatchByIdMutation()
  const [assetClone] = useAssetCloneMutation()
  const {
    copy,
    paste,
    cut,
    pasteCut,
    downloadAsZip,
    lock,
    lockAndPropagate,
    unlock,
    unlockAndPropagate,
    refresh
  } = useAssetActions()
  const uploadContext = React.useContext(UploadContext)!
  const { addFolderContextMenuItem } = useAddFolder('asset')
  const { renameContextMenuItem } = useRename('asset')
  const { deleteContextMenuItem } = useDelete('asset')
  const node = props.node

  useEffect(() => {
    if (node !== undefined) {
      uploadContext.setUploadingNode(node.id)
    }
  }, [node])

  const pasteAssetOrFolder = async (node: TreeNodeProps): Promise<void> => {
    if (props.node !== undefined) {
      const parentId = parseInt(props.node.id)
      const id = parseInt(node.id)
      const assetCloneTask = assetClone({
        id,
        parentId
      })

      try {
        await assetCloneTask

        dispatch(
          assetApi.util.invalidateTags(
            invalidatingTags.ASSET_TREE_ID(parentId)
          )
        )

        dispatch(
          assetApi.util.invalidateTags(
            invalidatingTags.ASSET_TREE_ID(parseInt(node.parentId!))
          )
        )
      } catch (error) {
        console.error('Error cloning asset', error)
      }
    }
  }

  const pasteCutAssetOrFolder = async (node: TreeNodeProps): Promise<void> => {
    const nodeId = parseInt(props.node.id)
    const assetPasteCutTask = assetPatch({
      body: {
        data: [{
          id: parseInt(node.id),
          parentId: nodeId
        }]
      }
    })

    try {
      await assetPasteCutTask

      dispatch(
        assetApi.util.invalidateTags(
          invalidatingTags.ASSET_TREE_ID(nodeId)
        )
      )

      dispatch(
        assetApi.util.invalidateTags(
          invalidatingTags.ASSET_TREE_ID(parseInt(node.parentId!))
        )
      )
    } catch (error) {
      console.error('Error cutting')
    }
  }

  const items: DropdownMenuProps['items'] = [
    {
      label: t('element.tree.context-menu.add-assets'),
      key: '1',
      icon: <Icon name={ 'mainAsset' } />,
      hidden: props.node?.type !== 'folder',
      children: [
        {
          icon: <Icon name={ 'upload-cloud' } />,
          label: t('element.tree.context-menu.add-assets.upload-files'),
          key: '1-1',
          onClick: () => {
            if (uploadFileRef.current !== null) {
              uploadFileRef.current?.click()
            }
          }
        },
        {
          icon: <Icon name={ 'upload-zip' } />,
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
    addFolderContextMenuItem(props.node),
    renameContextMenuItem(props.node),
    copy({ node: props.node }),
    paste({
      onClick: pasteAssetOrFolder
    }),
    cut({
      hidden: props.node?.isLocked,
      node: props.node
    }),
    pasteCut({
      onClick: pasteCutAssetOrFolder
    }),
    deleteContextMenuItem(props.node),
    downloadAsZip({
      hidden: props.node?.type !== 'folder',
      node: props.node
    }),
    {
      label: t('element.tree.context-menu.advanced'),
      key: 'advanced',
      icon: <Icon name={ 'more' } />,
      children: [
        {
          label: t('element.tree.context-menu.lock'),
          key: 'advanced-lock',
          icon: <Icon name={ 'lock-01' } />,
          children: [
            lock({
              hidden: props.node?.isLocked,
              nodeId: props.node?.id
            }),
            lockAndPropagate({
              hidden: props.node?.isLocked,
              nodeId: props.node?.id
            }),
            unlock({
              hidden: !(props.node?.isLocked),
              nodeId: props.node?.id
            }),
            unlockAndPropagate({
              hidden: !(props.node?.isLocked),
              nodeId: props.node?.id
            })
          ]
        }
      ]
    },
    refresh({ nodeId: props.node?.id })
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
