/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useRef, useMemo, useState } from 'react'
import { ModalUpload, type ModalUploadProps } from '../../modal-upload'
import { UploadModal } from '../../components/upload-modal/upload-modal'
import { type UploadFile } from 'antd'

type UploadProviderProps = ModalUploadProps & {
  children: React.ReactNode
}

/** Progress of the duplicate-filename check that runs before any upload starts. */
export interface UploadCheckProgress {
  done: number
  total: number
}

export interface UploadContextProps {
  triggerUpload: (props: ModalUploadProps) => void
  setIsModalOpen: (open: boolean) => void
  setShowUploadError: (showUploadError: boolean) => void
  setShowProcessing: (showProcessing: boolean) => void
  setFileList: (fileList: UploadFile[]) => void
  setCheckProgress: (checkProgress: UploadCheckProgress | null) => void
  fileList: UploadFile[]

}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined)

export const UploadModalProvider: React.FC<UploadProviderProps> = ({ children, ...defaultUploadProps }) => {
  const uploadRef = useRef<HTMLDivElement>(null)
  const [uploadState, setUploadState] = useState<ModalUploadProps>({
    ...defaultUploadProps
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showUploadError, setShowUploadError] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [checkProgress, setCheckProgress] = useState<UploadCheckProgress | null>(null)

  const triggerUpload = (props: ModalUploadProps): void => {
    setUploadState({ ...defaultUploadProps, ...props })
    setTimeout(() => uploadRef.current?.click(), 0)
  }

  const contextValue = useMemo(() => ({
    triggerUpload,
    setIsModalOpen,
    setShowUploadError,
    setShowProcessing,
    setFileList,
    setCheckProgress,
    fileList
  }), [defaultUploadProps, fileList])

  const closeModal = (): void => {
    setIsModalOpen(false)
    setFileList([])
    setShowUploadError(false)
    setShowProcessing(false)
    setCheckProgress(null)
  }

  return (
    <UploadContext.Provider value={ contextValue }>
      <div style={ { display: 'none' } }>
        <ModalUpload
          { ...uploadState }
        >
          <span ref={ uploadRef } />
        </ModalUpload>
      </div>

      { isModalOpen && (
        <UploadModal
          checkProgress={ checkProgress }
          closeModal={ closeModal }
          fileList={ fileList }
          open
          showProcessing={ showProcessing }
          showUploadError={ showUploadError }
        />
      )}

      {children}
    </UploadContext.Provider>
  )
}
