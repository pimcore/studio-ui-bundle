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
import { useFileUploader } from '@Pimcore/modules/asset/tree/context-menu/hooks/upload-files'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'

export interface UploadContextProps {
  uploadFileList: UploadFile[]
  setUploadFileList: (uploadFileList: UploadFile[]) => void
  uploadingNode: string | null
  setUploadingNode: (nodeId: string | null) => void
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined)

export const UploadProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([])
  const [uploadingNode, setUploadingNode] = useState<string | null>(null)
  const { uploadFiles } = useFileUploader({ parentId: uploadingNode ?? undefined })

  const contextValue = useMemo(() => ({
    uploadFileList,
    setUploadFileList,
    uploadingNode,
    setUploadingNode
  }), [uploadFileList, uploadingNode])

  const startFileUpload = async () => {
    if (uploadFileList.length > 0) {
      const fileStates = uploadFileList.map((file) => file.status)
      const allFullFilled = fileStates.every(item => item === 'done')

      try {
        await uploadFiles({
          files: uploadFileList as any as UploadFile[],
          onSuccess: (file: UploadFile) => {
            file.status = 'done'
          },
          onError: (file: UploadFile) => {
            file.status = 'error'
          }
        })
      } catch (error) {
        console.error(error)
      }

      if (allFullFilled && uploadingNode !== null) {
        dispatch(assetApi.util.invalidateTags(invalidatingTags.ASSET_TREE_ID(parseInt(uploadingNode))))
        setUploadFileList([])
        setUploadingNode(null)
      }
    }
  }

  return (
    <UploadContext.Provider value={ contextValue }>
      {children}
    </UploadContext.Provider>
  )
}
