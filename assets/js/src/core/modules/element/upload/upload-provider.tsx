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
import { UploadModal } from '@Pimcore/components/upload/upload-modal/upload-modal'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'

type UploadType = 'zip' | 'file'

export interface UploadContextProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  uploadingNode: string | null
  setUploadingNode: (nodeId: string | null) => void
  finishUpload: () => void
  fileList: UploadFile[]
  successItems: UploadFile[]
  failedItems: UploadFile[]
  setUploadContext: (uploadType: UploadType, fileList: UploadFile[]) => void
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined)

export const UploadProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploadingNode, setUploadingNode] = useState<string | null>(null)
  const [successItems, setSuccessItems] = useState<UploadFile[]>([])
  const [failedItems, setFailedItems] = useState<UploadFile[]>([])
  const [uploadType, setUploadType] = useState<'zip' | 'file'>('file')
  const { refreshTree } = useRefreshTree('asset')

  const setUploadContext = (uploadType: UploadType, fileList: UploadFile[]): void => {
    setUploadType(uploadType)
    setFileList(fileList)
  }

  const finishUpload = (): void => {
    if (uploadType !== 'zip') {
      refreshTree(parseInt(uploadingNode!))
    }
    setFileList(() => [])
    setUploadingNode(null)
  }

  useEffect(() => {
    if (isOpen) {
      setSuccessItems(() => [])
      setFailedItems(() => [])
    } else {
      finishUpload()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen && fileList.length > 0) {
      setIsOpen(true)
    }

    const currentErrorItems = fileList.filter(file => file.status === 'error')
    setFailedItems(() => currentErrorItems)
    const currentSuccessItems = fileList.filter(file => file.status === 'done')
    setSuccessItems(() => currentSuccessItems)

    if (
      fileList.length > 0 &&
      fileList.length === currentSuccessItems.length
    ) {
      setIsOpen(false)
    }
  }, [fileList])

  const contextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    uploadingNode,
    setUploadingNode,
    finishUpload,
    fileList,
    successItems,
    failedItems,
    setUploadContext
  }), [uploadingNode, isOpen, fileList, successItems, failedItems])

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
