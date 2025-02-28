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

import React, { createContext, type ReactNode, useMemo, useState } from 'react'
import { type UploadFile } from 'antd/es/upload/interface'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { UploadProgress } from '@Pimcore/components/upload/upload-progress/upload-progress'

export interface UploadContextProps {
  uploadFileList: UploadFile[]
  setUploadFileList: (uploadFileList: UploadFile[]) => void
  uploadingNode: string | null
  setUploadingNode: (nodeId: string | null) => void
  finishUpload: () => void
  displayComponent: React.FC
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined)

export const UploadProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([])
  const [uploadingNode, setUploadingNode] = useState<string | null>(null)

  const finishUpload = (): void => {
    dispatch(
      assetApi.util.invalidateTags(
        invalidatingTags.ASSET_TREE_ID(parseInt(uploadingNode!))
      )
    )
    setUploadFileList([])
    setUploadingNode(null)
  }

  const DisplayComponent = (): React.JSX.Element => {
    return (
      <UploadProgress
        items={ uploadFileList }
        locale={ { uploading: 'uploading' } }
        showRemoveIcon={ false }
      />
    )
  }

  const contextValue = useMemo(() => ({
    uploadFileList,
    setUploadFileList,
    uploadingNode,
    setUploadingNode,
    finishUpload,
    displayComponent: DisplayComponent
  }), [uploadFileList, uploadingNode])

  return (
    <UploadContext.Provider value={ contextValue }>
      {children}
    </UploadContext.Provider>
  )
}
