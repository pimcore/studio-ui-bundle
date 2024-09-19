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

import { Button, Dropdown, type MenuProps, Upload, type UploadProps } from 'antd'
import React, { useContext } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import type { UploadFile } from 'antd/es/upload/interface'
import { UploadContext } from '@Pimcore/modules/element/upload/upload-provider'
import { type TreeContextMenuProps } from '@Pimcore/modules/asset/tree/context-menu/context-menu'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { type UploadChangeParam } from 'antd/lib/upload'

export interface AssetTreeContextMenuProps {
  node: TreeContextMenuProps['node']
  children: React.ReactNode
}

export const AssetTreeContextMenu = (props: AssetTreeContextMenuProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const uploadContext = useContext(UploadContext)!
  const uploadFileRef = React.useRef<HTMLButtonElement>(null)
  const uploadZipRef = React.useRef<HTMLButtonElement>(null)

  const items: MenuProps['items'] = [
    {
      label: t('asset.tree.context-menu.add-assets'),
      key: '1',
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
          icon: <Icon name={ 'upload-cloud' } />,
          label: t('asset.tree.context-menu.add-assets.upload-zip'),
          key: '1-2',
          onClick: () => {
            if (uploadZipRef.current !== null) {
              uploadZipRef.current?.click()
            }
          }
        }
      ]
    }
  ]

  const onChange = ({ fileList }: UploadChangeParam<UploadFile<any>>): void => {
    const fileStates = fileList.map((file) => file.status)
    const allFullFilled = fileStates.every(item => item === 'done')

    if (allFullFilled) {
      dispatch(assetApi.util.invalidateTags(invalidatingTags.ASSET_TREE_ID(parseInt(props.node!.id))))
      uploadContext.setUploadFileList([])
      uploadContext.setUploadingNode(null)
    }

    uploadContext.setUploadFileList(fileList)
    uploadContext.setUploadingNode(props.node?.id ?? null)
  }

  const uploadFile: UploadProps = {
    action: `/studio/api/assets/add/${props.node?.id}`,
    name: 'file',
    multiple: true,
    showUploadList: false,
    onChange
  }

  const uploadZip: UploadProps = {
    action: `/studio/api/assets/add-zip/${props.node?.id}`,
    accept: '.zip, .rar, .7zip',
    name: 'file',
    multiple: true,
    showUploadList: false,
    onChange
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
