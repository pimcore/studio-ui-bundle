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
import { Icon } from '@Pimcore/components/icon/icon'

export interface AssetTreeContextMenuProps {
  children: React.ReactNode
  uploadFiles: (event: any) => Promise<void>
  fileInputRef: React.RefObject<HTMLInputElement>
  uploadArchive: (event: any) => Promise<void>
  archiveInputRef: React.RefObject<HTMLInputElement>
}

export const AssetTreeContextMenu = (props: AssetTreeContextMenuProps): React.JSX.Element => {
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
            if (props.fileInputRef.current !== null) {
              props.fileInputRef.current?.click()
            }
          }
        },
        {
          icon: <Icon name={ 'upload-cloud' } />,
          label: 'Upload Zip',
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
        onChange={ props.uploadFiles }
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
