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
import { api as assetApi, useAssetPatchByIdMutation } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { useInputModal } from '@Pimcore/components/modal/input-modal/hooks/use-input-modal'
import { type Store } from 'antd/es/form/interface'
import { useAssetActions } from '@Pimcore/components/tree/components/context-menu/hooks/use-asset-actions'

export interface AssetTreeContextMenuProps {
  node: TreeContextMenuProps['node']
  children: React.ReactNode
}

export const AssetTreeContextMenu = (props: AssetTreeContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { uploadFile: uploadFileProcessor, uploadZip: uploadZipProcessor } = UseFileUploader({ parentId: props.node?.id })
  const uploadFileRef = React.useRef<HTMLButtonElement>(null)
  const uploadZipRef = React.useRef<HTMLButtonElement>(null)
  const [defaultValue, setDefaultValue] = useState<Store>({})
  const [assetRename] = useAssetPatchByIdMutation()
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

  console.log('node', props.node)

  const renameSubmit = async (form: FormInstance<any>): Promise<void> => {
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
      await assetRenameTask.unwrap()

      // clear cache
      console.log('cacheClear')
      dispatch(
        assetApi.util.invalidateTags(
          invalidatingTags.ASSET_TREE_ID(15833)
          // invalidatingTags.ASSET_LIST()
        )
      )
    } catch (error) {
      console.error('Error renaming asset', error)
    }
  }

  const {
    showModal: showRenameModal,
    renderModal: RenameModal
  } = useInputModal({ type: 'input', submitCallback: renameSubmit })

  const items: MenuProps['items'] = [
    {
      label: t('asset.tree.context-menu.add-assets'),
      key: '1',
      icon: <Icon name={ 'mainAsset' } />,
      children: [
        {
          icon: <Icon name={ 'upload-cloud' } />,
          label: t('asset.tree.context-menu.add-assets.upload-files'),
          key: '1-1',
          onClick: () => {
            if (uploadFileRef.current !== null) {
              uploadFileRef.current?.click()
            }
          }
        },
        {
          icon: <Icon name={ 'upload-zip' } />,
          label: t('asset.tree.context-menu.add-assets.upload-zip'),
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
          showRenameModal()
        }
      }
    }),
    copy({ nodeId: props.node?.id ?? null }),
    paste(),
    cut(),
    remove(),
    downloadAsZip({
      node: props.node ?? null
    }),
    advanced(),
    refresh({ nodeId: props.node?.id ?? null }),
    requestTranslations()
  ]

  const uploadFile: UploadProps = {
    action: `/studio/api/assets/add/${props.node?.id}`,
    name: 'file',
    multiple: true,
    showUploadList: false,
    onChange: uploadFileProcessor
  }

  const uploadZip: UploadProps = {
    action: `/studio/api/assets/add-zip/${props.node?.id}`,
    accept: '.zip, .rar, .7zip',
    name: 'zipFile',
    multiple: true,
    showUploadList: false,
    onChange: uploadZipProcessor
  }

  return (
    <>
      <RenameModal
        initialValues={ defaultValue }
        label={ 'Please enter the new name' }
        title={ 'Rename' }
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
