/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useRef } from 'react'
import { Modal, IconTextButton, IconButton } from '@sdk/components'
import { Button } from 'antd'
import { t } from 'i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { useStyle } from './csv-import-modal.styles'
import cn from 'classnames'

interface CsvImportModalProps {
  open: boolean
  onCancel: () => void
  onImport: (file: File) => void
  loading?: boolean
}

export const CsvImportModal = ({ 
  open, 
  onCancel, 
  onImport, 
  loading = false 
}: CsvImportModalProps): React.JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { styles } = useStyle()
  const { getStateClasses } = useDroppable()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const handleFileSelect = (file: File): void => {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      setSelectedFile(file)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleUpload = (): void => {
    if (selectedFile) {
      onImport(selectedFile)
    }
  }

  const handleCancel = (): void => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onCancel()
  }

  const handleDropZoneClick = (): void => {
    if (!loading && !selectedFile) {
      fileInputRef.current?.click()
    }
  }

  const handleBrowseClick = (event: React.MouseEvent): void => {
    event.stopPropagation()
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDragOver = (event: React.DragEvent): void => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent): void => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <Modal
      title={t('redirects.csv-import-modal.redirects-import')}
      open={open}
      onCancel={handleCancel}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconTextButton
            icon={{ value: 'upload-import' }}
            onClick={handleBrowseClick}
            disabled={loading}
          >
            {t('redirects.browse-files')}
          </IconTextButton>
          <Button 
            type="primary" 
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            loading={loading}
          >
            {t('redirects.upload')}
          </Button>
        </div>
      }
      size="M"
    >
      {!selectedFile ? (
        <div
        ref={dropZoneRef}
        className={cn(styles.csvTargetContainer, ...getStateClasses())}
        onClick={handleDropZoneClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleInputChange}
          className={styles.hiddenInput}
          disabled={loading}
        />
          <Flex
            align="center"
            gap="mini"
            justify="center"
            style={{ height: '100%' }}
            vertical
          >
            <div className="icon-container">
              <Flex
                align="center"
                gap="mini"
                justify="center"
              >
                <Icon
                  options={{ height: 20, width: 20 }}
                  value="new"
                />
                <Icon
                  options={{ height: 20, width: 20 }}
                  value="drop-target"
                />
              </Flex>
            </div>
            <div className="csv-target-title">
              {t('redirects.import-drag-drop')}
            </div>
          </Flex>
        </div>
        )
        : (
          <div className={styles.uploadedFile}>
            <div className="file-info">
              <div className="file-details">
                <div>
                  <div className="file-name">{selectedFile.name}</div>
                  <div className="file-size">{formatFileSize(selectedFile.size)}</div>
                </div>
              </div>
              <IconButton
                icon={{ value: 'close' }}
                type="text"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedFile(null)
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
              />
            </div>
          </div>
        )}
    </Modal>
  )
}
