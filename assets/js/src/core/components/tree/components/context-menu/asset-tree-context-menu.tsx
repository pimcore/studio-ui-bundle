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
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { type TreeContextMenuProps } from '@Pimcore/modules/asset/tree/context-menu/context-menu'
import { UseFileUploader } from '@Pimcore/modules/element/upload/hook/use-file-uploader'
import { Upload, type UploadProps } from '@Pimcore/components/upload/upload'
import {
  api as assetApi,
  type AssetDeleteZipApiArg,
  useAssetCloneMutation,
  useAssetPatchByIdMutation
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { useAssetActions } from '@Pimcore/components/tree/components/context-menu/hooks/use-asset-actions'
import { useElementDeleteMutation, useElementFolderCreateMutation } from '@Pimcore/modules/element/element-api-slice.gen'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { createJob as createDeleteJob } from '@Pimcore/modules/execution-engine/jobs/delete/factory'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'

export interface AssetTreeContextMenuProps {
  node: TreeContextMenuProps['node']
  children: React.ReactNode
}

export const AssetTreeContextMenu = (props: AssetTreeContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { addJob } = useJobs()
  const [modal, contextHolder] = useFormModal()
  const { uploadFile: uploadFileProcessor, uploadZip: uploadZipProcessor } = UseFileUploader({ parentId: props.node?.id })
  const uploadFileRef = React.useRef<HTMLButtonElement>(null)
  const uploadZipRef = React.useRef<HTMLButtonElement>(null)
  const [assetPatch] = useAssetPatchByIdMutation()
  const [assetDelete] = useElementDeleteMutation()
  const [elementAddFolder] = useElementFolderCreateMutation()
  const [assetClone] = useAssetCloneMutation()
  const {
    addFolder,
    rename,
    copy,
    paste,
    cut,
    pasteCut,
    remove,
    downloadAsZip,
    lock,
    lockAndPropagate,
    unlock,
    unlockAndPropagate,
    refresh
  } = useAssetActions()

  const renameAssetOrElement = async (value: string): Promise<void> => {
    const nodeId = parseInt(props.node!.id)
    const assetRenameTask = assetPatch({
      body: {
        data: [{
          id: nodeId,
          key: value
        }]
      }
    })

    try {
      await assetRenameTask

      dispatch(
        assetApi.util.invalidateTags(
          invalidatingTags.ASSET_TREE_ID(parseInt(props.node!.parentId!))
        )
      )
    } catch (error) {
      console.error('Error renaming asset', error)
    }
  }

  const removeAssetOrFolder = async (): Promise<void> => {
    const isFolder = props.node!.type === 'folder'

    // TODO: add multiple deletion // this also requires mercure
    if (isFolder) {
      addJob(createDeleteJob({
        title: 'Deleting Folder',
        topics: [topics['deletion-finished'], ...defaultTopics],
        action: async () => {
          const promise = assetDelete({
            id: parseInt(props.node!.id),
            elementType: 'asset'
          })

          promise.catch(() => {
            console.error('Error deleting asset')
          })

          const response = (await promise) as any

          if (response.data === undefined || response.data === null) {
            throw new Error(response.error.data.message as string ?? 'Error deleting Asset')
          }

          const data = response.data as AssetDeleteZipApiArg
          return data.jobRunId
        },
        parentFolder: props.node!.parentId!
      }))
    }

    try {
      if (!isFolder) {
        await assetDelete({
          id: parseInt(props.node!.id),
          elementType: 'asset'
        })

        dispatch(
          assetApi.util.invalidateTags(
            invalidatingTags.ASSET_TREE_ID(parseInt(props.node!.parentId!))
          )
        )
      }
    } catch (error) {
      console.error('Error deleting asset', error)
    }
  }

  const addElementFolder = async (value: string): Promise<void> => {
    const parentId = parseInt(props.node!.id ?? 1)
    const elementAddFolderTask = elementAddFolder({
      parentId,
      elementType: 'asset',
      folderData: {
        folderName: value
      }
    })

    try {
      await elementAddFolderTask

      dispatch(
        assetApi.util.invalidateTags(
          invalidatingTags.ASSET_TREE_ID(parentId)
        )
      )
    } catch (error) {
      console.error('Error creating folder', error)
    }
  }

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
    const nodeId = parseInt(props.node!.id)
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
    addFolder({
      hidden: props.node?.type !== 'folder',
      onClick: () => {
        if (props.node !== undefined) {
          modal.input({
            title: t('element.tree.context-menu.add-folder'),
            label: t('element.tree.context-menu.add-folder.label'),
            rule: {
              required: true,
              message: t('element.tree.context-menu.add-folder.validation')
            },
            onOk: addElementFolder
          })
        }
      }
    }),
    rename({
      hidden: props.node?.isLocked,
      onClick: () => {
        if (props.node !== undefined) {
          modal.input({
            title: t('element.tree.context-menu.rename'),
            label: t('element.tree.context-menu.rename.label'),
            initialValue: props.node?.label,
            rule: {
              required: true,
              message: t('element.tree.context-menu.rename.validation')
            },
            onOk: renameAssetOrElement
          })
        }
      }
    }),
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
    remove({
      hidden: props.node?.isLocked,
      onClick: () => {
        modal.confirm({
          title: t('element.tree.context-menu.delete.title'),
          content: <>
            <span>{t('element.tree.context-menu.delete.text')}</span>
            <br />
            <b>{props.node?.label}</b>
          </>,
          okText: t('element.tree.context-menu.delete.ok'),
          cancelText: t('button.cancel'),
          onOk: removeAssetOrFolder
        })
      }
    }),
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
              hidden: true,
              nodeId: props.node?.id
            }),
            lockAndPropagate({
              hidden: props.node?.isLocked,
              nodeId: props.node?.id
            }),
            unlock({
              hidden: props.node?.isLocked !== true,
              nodeId: props.node?.id
            }),
            unlockAndPropagate({
              hidden: props.node?.isLocked !== true,
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
      {contextHolder}

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
