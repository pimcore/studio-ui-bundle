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

import React, { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { type UploadFile } from 'antd/es/upload/interface'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { UploadModal } from '@Pimcore/components/upload/upload-modal/upload-modal'

export interface UploadContextProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  uploadFileList: UploadFile[]
  setUploadFileList: (uploadFileList: UploadFile[]) => void
  uploadingNode: string | null
  setUploadingNode: (nodeId: string | null) => void
  finishUpload: () => void
  fileList: UploadFile[]
  setFileList: (fileList: UploadFile[]) => void
  successItems: UploadFile[]
  failedItems: UploadFile[]
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined)

export const UploadProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([])
  const [uploadingNode, setUploadingNode] = useState<string | null>(null)
  const [successItems, setSuccessItems] = useState<UploadFile[]>([])
  const [failedItems, setFailedItems] = useState<UploadFile[]>([])

  const finishUpload = (): void => {
    dispatch(
      assetApi.util.invalidateTags(
        invalidatingTags.ASSET_TREE_ID(parseInt(uploadingNode!))
      )
    )
    setFileList(() => [])
    setUploadingNode(null)
  }

  useEffect(() => {
    if (isOpen) {
      setSuccessItems(() => [])
      setFailedItems(() => [])
      setUploadFileList(() => [])
    }

    setFileList([])
  }, [isOpen])

  useEffect(() => {
    if (!isOpen && fileList.length > 0) {
      setIsOpen(true)
    }

    setFileList((currentFileList) => {
      setFailedItems(() => currentFileList.filter(file => file.status === 'error'))
      setSuccessItems(() => currentFileList.filter(file => file.status === 'done'))

      return currentFileList
    })
  }, [fileList])

  const contextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    uploadFileList,
    setUploadFileList,
    uploadingNode,
    setUploadingNode,
    finishUpload,
    fileList,
    setFileList,
    successItems,
    failedItems
  }), [uploadFileList, uploadingNode, isOpen, fileList, successItems, failedItems])

  return (
    <UploadContext.Provider value={ contextValue }>
      <UploadModal />

      {children}
    </UploadContext.Provider>
  )
}

export const useUploadContext = (): UploadContextProps => {
  const context = useContext(UploadContext)

  if (context === undefined) {
    throw new Error('useUploadContext must be used within a UploadProvider')
  }

  return context
}
