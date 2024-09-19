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

import { Dropdown, type MenuProps, type UploadProps } from 'antd'
import React, { useContext } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import type { UploadFile } from 'antd/es/upload/interface'
import { UploadContext } from '@Pimcore/modules/element/upload/upload-provider'

export interface AssetTreeContextMenuProps {
  children: React.ReactNode
  uploadFiles: (event: any) => Promise<void>
  fileInputRef: React.RefObject<HTMLInputElement>
  uploadArchive: (event: any) => Promise<void>
  archiveInputRef: React.RefObject<HTMLInputElement>
}

export const AssetTreeContextMenu = (props: AssetTreeContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const uploadContext = useContext(UploadContext)!

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
            if (props.fileInputRef.current !== null) {
              props.fileInputRef.current?.click()
            }
          }
        },
        {
          icon: <Icon name={ 'upload-cloud' } />,
          label: t('asset.tree.context-menu.add-assets.upload-zip'),
          key: '1-2',
          onClick: () => {
            if (props.archiveInputRef.current !== null) {
              props.archiveInputRef.current?.click()
            }
          }
        }
      ]
    }
  ]

  return (
    <>
      <input
        hidden
        multiple
        onChange={ async (event) => {
          if (event.target.files !== undefined) {
            console.log('now')

            const files = event.target.files! as unknown as UploadFile[]
            const uploadFileList: UploadFile[] = Array.from(files).map((file) => {
              const uploadFile: UploadFile = {
                ...file,
                status: 'uploading',
                uid: crypto.randomUUID()
              }

              return uploadFile
            })

            uploadContext.setUploadFileList(uploadFileList)
          }
        } }
        ref={ props.fileInputRef }
        type="file"
      />

      <input
        accept={ '.zip, .rar, .7zip' }
        hidden
        multiple
        onChange={ props.uploadArchive }
        ref={ props.archiveInputRef }
        type="file"
      />

      <Dropdown
        menu={ { items } }
        trigger={ ['contextMenu'] }
      >
        {props.children}
      </Dropdown>
    </>
  )
}
