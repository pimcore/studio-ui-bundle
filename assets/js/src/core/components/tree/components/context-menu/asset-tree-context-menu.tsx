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

import { Button, Dropdown, type FormInstance, type MenuProps } from 'antd'
import React, { useState } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { type TreeContextMenuProps } from '@Pimcore/modules/asset/tree/context-menu/context-menu'
import { UseFileUploader } from '@Pimcore/modules/element/upload/hook/use-file-uploader'
import { Upload, type UploadProps } from '@Pimcore/components/upload/upload'
import {
  api as assetApi,
  type AssetDeleteZipApiArg,
  useAssetPatchByIdMutation
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import {
  type ConfirmationModal,
  type InputModal,
  useFormModal
} from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { type Store } from 'antd/es/form/interface'
import { useAssetActions } from '@Pimcore/components/tree/components/context-menu/hooks/use-asset-actions'
import { Box } from '@Pimcore/components/box/box'
import { useElementDeleteMutation } from '@Pimcore/modules/element/element-api-slice.gen'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { createJob as createDeleteJob } from '@Pimcore/modules/execution-engine/jobs/delete/factory'

export interface AssetTreeContextMenuProps {
  node: TreeContextMenuProps['node']
  children: React.ReactNode
}

export const AssetTreeContextMenu = (props: AssetTreeContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { addJob } = useJobs()
  const { uploadFile: uploadFileProcessor, uploadZip: uploadZipProcessor } = UseFileUploader({ parentId: props.node?.id })
  const uploadFileRef = React.useRef<HTMLButtonElement>(null)
  const uploadZipRef = React.useRef<HTMLButtonElement>(null)
  const [defaultValue, setDefaultValue] = useState<Store>({})
  const [confirmationText, setConfirmationText] = useState<string | React.JSX.Element>('')
  const [assetRename] = useAssetPatchByIdMutation()
  const [assetDelete] = useElementDeleteMutation()
  const {
    addFolder,
    rename,
    cut,
    copy,
    paste,
    remove,
    downloadAsZip,
    advanced,
    refresh,
    requestTranslations
  } = useAssetActions()

  const onRenameSubmit = async (form: FormInstance<any>): Promise<void> => {
    const nodeId = parseInt(props.node!.id)
    const assetRenameTask = assetRename({
      body: {
        data: [{
          id: nodeId,
          key: form.getFieldValue('input')
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

  const onConfirmation = async (): Promise<void> => {
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

  const {
    showModal: showInputModal,
    renderModal: InputModal
  } = useFormModal<InputModal>({ type: 'input' })

  const {
    showModal: showConfirmationModal,
    renderModal: ConfirmationModal
  } = useFormModal<ConfirmationModal>({ type: 'confirmation' })

  const items: MenuProps['items'] = [
    {
      label: t('element.tree.context-menu.add-assets'),
      key: '1',
      icon: <Icon name={ 'mainAsset' } />,
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
    addFolder(),
    rename({
      onClick: () => {
        if (props.node !== undefined) {
          setDefaultValue({ input: props.node?.label })
          showInputModal()
        }
      }
    }),
    copy({ nodeId: props.node?.id ?? null }),
    paste(),
    cut(),
    remove({
      onClick: () => {
        setConfirmationText(() => (
          <Box component={ 'center' }>
            <span>Do you really want to delete this item?</span> <br />
            <b>{props.node?.label}</b>
          </Box>
        ))
        showConfirmationModal()
      }
    }),
    downloadAsZip({
      node: props.node ?? null
    }),
    advanced(),
    refresh({ nodeId: props.node?.id ?? null }),
    requestTranslations()
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
      <InputModal
        initialValues={ defaultValue }
        label={ 'Please enter the new name' }
        onSubmit={ onRenameSubmit }
        title={ 'Rename' }
      />

      <ConfirmationModal
        onSubmit={ onConfirmation }
        text={ confirmationText }
        title={ 'Confirmation' }
      />

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
