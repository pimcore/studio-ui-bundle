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

import { useAppDispatch } from '@Pimcore/app/store'
import React from 'react'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice.gen'
import type { TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import {
  AssetTreeContextMenu as ContextMenu
} from '@Pimcore/components/tree/components/context-menu/asset-tree-context-menu'

interface TreeContextMenuProps {
  children: React.ReactNode
  node?: TreeNodeProps
}

export const AssetTreeContextMenu = ({ children, node }: TreeContextMenuProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const archiveInputRef = React.useRef<HTMLInputElement>(null)
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
    <ContextMenu
      archiveInputRef={ archiveInputRef }
      fileInputRef={ fileInputRef }
      uploadArchive={ uploadArchive }
      uploadFiles={ uploadFiles }
    >
      {children}
    </ContextMenu>
  )
}
