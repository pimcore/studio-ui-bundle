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

import { Dropdown, type MenuProps } from 'antd'
import React from 'react'
import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useAppDispatch } from '@Pimcore/app/store'
import { Icon } from '@Pimcore/components/icon/icon'

interface TreeContextMenuProps {
  children: React.ReactNode
  node?: TreeNodeProps
}

export const TreeContextMenu = ({ children, node }: TreeContextMenuProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const archiveInputRef = React.useRef<HTMLInputElement>(null)
  const items: MenuProps['items'] = [
    {
      label: 'Add Asset(s)',
      key: '1',
      children: [
        {
          icon: <Icon name={ 'upload-cloud' } />,
          label: 'Upload Files',
          key: '1-1',
          onClick: () => {
            if (fileInputRef.current !== null) {
              fileInputRef.current?.click()
            }
          }
        },
        {
          icon: <Icon name={ 'upload-cloud' } />,
          label: 'Upload Zip',
          key: '1-2',
          onClick: () => {
            if (archiveInputRef.current !== null) {
              archiveInputRef.current?.click()
            }
          }
        }
      ]
    }
  ]
  const assetUpload = assetApi.endpoints.assetAdd
  const archiveUpload = assetApi.endpoints.assetUploadZip

  const uploadFiles = async (event): Promise<void> => {
    const files = event.target.files as File[]

    if (files.length > 0 && node?.id !== undefined) {
      for (let i = 0; i < files.length; i++) {
        try {
          const formData = new FormData()
          const file = files[i]

          formData.append('file', file)

          if (formData.has('file')) {
            // @ts-expect-error - marvin will know why
            await dispatch(assetUpload.initiate({ body: formData, parentId: parseInt(node.id) })).unwrap()
          }

          console.log('File uploaded successfully')
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  const uploadArchive = async (event): Promise<void> => {
    const files = event.target.files as File[]

    if (files.length > 0 && node?.id !== undefined) {
      for (let i = 0; i < files.length; i++) {
        try {
          const formData = new FormData()
          const archive = files[i]
          formData.append('zipFile', archive)

          if (formData.has('zipFile')) {
            // @ts-expect-error - marvin will know why
            await dispatch(archiveUpload.initiate({ body: formData, parentId: parseInt(node.id) })).unwrap()
          }

          console.log('Archive uploaded successfully')
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  return (
    <>
      <input
        hidden
        multiple
        onChange={ uploadFiles }
        ref={ fileInputRef }
        type="file"
      />

      <input
        accept={ '.zip, .rar, .7zip' }
        hidden
        multiple
        onChange={ uploadArchive }
        ref={ archiveInputRef }
        type="file"
      />

      <Dropdown
        menu={ { items } }
        trigger={ ['contextMenu'] }
      >
        {children}
      </Dropdown>
    </>
  )
}
