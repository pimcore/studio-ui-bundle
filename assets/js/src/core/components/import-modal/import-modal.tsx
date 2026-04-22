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
import { Modal, IconTextButton, ModalFooter, Button, Flex, useMessage } from '@sdk/components'
import type { UploadProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { isNil, isEmpty } from 'lodash'
import { useFileValidation } from './hooks/use-file-validation'
import { useFileUpload } from './hooks/use-file-upload'
import { FileDropZone } from './components/file-drop-zone/file-drop-zone'
import { SelectedFileView } from './components/selected-file-view/selected-file-view'
import { type FileEntry, type ImportModalProps } from './types'

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
  fileKey,
  filesKey,
  onUploadSuccess,
  onUploadError,
  showSuccessMessage = true,
  successMessage,
  multiple = false,
  children
}: ImportModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [internalOpen, setInternalOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileEntry[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileIdCounter = useRef(0)
  const messageApi = useMessage()

  const defaultValidateFile = useFileValidation({ accept, acceptMimeTypes, maxFileSize })

  const {
    uploadProgress,
    uploadStatus,
    loading,
    isUploading,
    upload,
    uploadMultiple,
    fileUploadStates,
    resetUploadState
  } = useFileUpload({
    action,
    headers,
    data,
    fileKey,
    filesKey,
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
    setSelectedFiles([])
    resetUploadState()
    if (!isNil(fileInputRef.current)) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileRemove = (id: string): void => {
    setSelectedFiles(prev => prev.filter(entry => entry.id !== id))
  }

  useEffect(() => {
    if (open) {
      setSelectedFiles([])
      resetUploadState()
      if (!isNil(fileInputRef.current)) {
        fileInputRef.current.value = ''
      }
    }
  }, [open, resetUploadState])

  const handleUpload = async (): Promise<void> => {
    if (isEmpty(selectedFiles)) return

    try {
      if (multiple) {
        await uploadMultiple(selectedFiles)
      } else {
        await upload(selectedFiles[0].file)
      }

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

    if (!isValid) {
      if (!isNil(onValidationError)) {
        onValidationError(file)
      }
      return
    }

    const entry: FileEntry = { id: `file_${fileIdCounter.current++}`, file }

    if (multiple) {
      setSelectedFiles(prev => [...prev, entry])
    } else {
      setSelectedFiles([entry])
    }
  }

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files

    if (isNil(files)) return

    Array.from(files).forEach(file => { handleFileSelect(file) })

    if (!isNil(fileInputRef.current)) {
      fileInputRef.current.value = ''
    }
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple,
    accept,
    beforeUpload: (file) => {
      handleFileSelect(file as File)
      return false
    },
    showUploadList: false,
    disabled: loading || isUploading
  }

  const hasFiles = !isEmpty(selectedFiles)
  const isProcessing = loading || isUploading

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
            justify={ !hasFiles ? 'space-between' : 'end' }
          >
            {!hasFiles && (
              <IconTextButton
                disabled={ isProcessing }
                icon={ { value: 'upload-import' } }
                onClick={ handleBrowseClick }
              >
                {browseButtonLabel ?? t('import-modal.browse-files')}
              </IconTextButton>
            )}
            <Button
              disabled={ !hasFiles || isProcessing }
              loading={ isProcessing }
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
          disabled={ isProcessing }
          multiple={ multiple }
          onChange={ handleInputChange }
          ref={ fileInputRef }
          style={ { display: 'none' } }
          type="file"
        />

        <Flex
          gap="mini"
          vertical
        >
          {!hasFiles && (
            <FileDropZone
              dragDropLabel={ dragDropLabel }
              uploadProps={ uploadProps }
            />
          )}

          {hasFiles && selectedFiles.map(({ id, file }) => {
            const fileState = fileUploadStates[id]
            const fileProgress = fileState?.progress ?? uploadProgress
            const fileStatus = fileState?.status ?? uploadStatus
            const fileIsUploading = fileState?.status === 'active'

            return (
              <SelectedFileView
                file={ file }
                isUploading={ multiple ? fileIsUploading : isUploading }
                key={ id }
                loading={ multiple ? fileIsUploading : loading }
                onRemove={ multiple ? () => { handleFileRemove(id) } : handleFileReset }
                uploadProgress={ multiple ? fileProgress : uploadProgress }
                uploadStatus={ multiple ? fileStatus : uploadStatus }
              />
            )
          })}
        </Flex>
      </Modal>
    </>
  )
}
