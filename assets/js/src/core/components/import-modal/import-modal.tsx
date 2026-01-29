/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useRef, useEffect } from 'react'
import { Modal, IconTextButton, ModalFooter, Button, useMessage } from '@sdk/components'
import type { UploadProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { useFileValidation } from './hooks/use-file-validation'
import { useFileUpload } from './hooks/use-file-upload'
import { FileDropZone } from './components/file-drop-zone/file-drop-zone'
import { SelectedFileView } from './components/selected-file-view/selected-file-view'

export interface ImportModalProps {
  action: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  uploadButtonLabel?: string
  browseButtonLabel?: string
  dragDropLabel?: string
  accept?: string
  acceptMimeTypes?: string[]
  validateFile?: (file: File) => boolean
  onValidationError?: (file: File) => void
  maxFileSize?: number
  headers?: Record<string, string>
  data?: Record<string, any>
  onUploadSuccess?: (response: any, file: File) => void
  onUploadError?: (error: Error, file: File) => void
  showSuccessMessage?: boolean
  successMessage?: React.ReactNode
  children?: React.ReactNode
}

export const ImportModal = ({
  action,
  open: controlledOpen,
  onOpenChange,
  title,
  uploadButtonLabel,
  browseButtonLabel,
  dragDropLabel,
  accept,
  acceptMimeTypes,
  validateFile,
  onValidationError,
  maxFileSize,
  headers,
  data,
  onUploadSuccess,
  onUploadError,
  showSuccessMessage = true,
  successMessage,
  children
}: ImportModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [internalOpen, setInternalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messageApi = useMessage()

  const defaultValidateFile = useFileValidation({ accept, acceptMimeTypes, maxFileSize })

  const {
    uploadProgress,
    uploadStatus,
    loading,
    isUploading,
    upload,
    resetUploadState
  } = useFileUpload({
    action,
    headers,
    data,
    onUploadSuccess,
    onUploadError
  })

  const isControlled = !isNil(controlledOpen)
  const open = isControlled ? controlledOpen : internalOpen

  const setOpenState = (newOpenState: boolean): void => {
    if (isControlled) {
      onOpenChange?.(newOpenState)
    } else {
      setInternalOpen(newOpenState)
    }
  }

  const handleFileReset = (): void => {
    setSelectedFile(null)
    resetUploadState()
    if (!isNil(fileInputRef.current)) {
      fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    if (open) {
      setSelectedFile(null)
      resetUploadState()
      if (!isNil(fileInputRef.current)) {
        fileInputRef.current.value = ''
      }
    }
  }, [open, resetUploadState])

  const handleUpload = async (): Promise<void> => {
    if (isNil(selectedFile)) return

    try {
      await upload(selectedFile)

      if (showSuccessMessage) {
        void messageApi.success(successMessage ?? t('upload.success'))
      }

      handleClose()
    } catch {
      // Error already handled in useFileUpload hook
    }
  }

  const handleClose = (): void => {
    handleFileReset()
    setOpenState(false)
  }

  const handleOpen = (): void => {
    setOpenState(true)
  }

  const handleFileSelect = (file: File): void => {
    const isValid = !isNil(validateFile) ? validateFile(file) : defaultValidateFile(file)

    if (isValid) {
      setSelectedFile(file)
    } else if (!isNil(onValidationError)) {
      onValidationError(file)
    }
  }

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (!isNil(file)) {
      handleFileSelect(file)
    }
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept,
    beforeUpload: (file) => {
      handleFileSelect(file as File)
      return false
    },
    showUploadList: false,
    disabled: loading || isUploading
  }

  return (
    <>
      {!isNil(children) && (
        <div
          aria-label={ title ?? t('import-modal.title') }
          onClick={ handleOpen }
          onKeyDown={ (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOpen()
            }
          } }
          role="button"
          style={ { display: 'contents' } }
          tabIndex={ 0 }
        >
          {children}
        </div>
      )}

      <Modal
        footer={
          <ModalFooter
            divider
            justify={ isNil(selectedFile) ? 'space-between' : 'end' }
          >
            {isNil(selectedFile) && (
              <IconTextButton
                disabled={ loading || isUploading }
                icon={ { value: 'upload-import' } }
                onClick={ handleBrowseClick }
              >
                {browseButtonLabel ?? t('import-modal.browse-files')}
              </IconTextButton>
            )}
            <Button
              disabled={ isNil(selectedFile) || loading || isUploading }
              loading={ loading || isUploading }
              onClick={ handleUpload }
              type="primary"
            >
              {uploadButtonLabel ?? t('import-modal.upload')}
            </Button>
          </ModalFooter>
        }
        maskClosable={ false }
        onCancel={ handleClose }
        open={ open }
        size="M"
        title={ title ?? t('import-modal.title') }
      >
        <input
          accept={ accept }
          aria-label={ browseButtonLabel ?? t('import-modal.browse-files') }
          disabled={ loading || isUploading }
          onChange={ handleInputChange }
          ref={ fileInputRef }
          style={ { display: 'none' } }
          type="file"
        />

        {isNil(selectedFile)
          ? (
            <FileDropZone
              dragDropLabel={ dragDropLabel }
              uploadProps={ uploadProps }
            />
            )
          : (
            <SelectedFileView
              file={ selectedFile }
              isUploading={ isUploading }
              loading={ loading }
              onRemove={ handleFileReset }
              uploadProgress={ uploadProgress }
              uploadStatus={ uploadStatus }
            />
            )}
      </Modal>
    </>
  )
}
