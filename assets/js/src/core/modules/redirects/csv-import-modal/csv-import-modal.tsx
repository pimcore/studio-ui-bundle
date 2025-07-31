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
import { Modal, IconTextButton, IconButton, ModalFooter } from '@sdk/components'
import { Button, Upload } from 'antd'
import { t } from 'i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyle } from './csv-import-modal.styles'
import type { UploadProps } from 'antd'
import { GeneralError, trackError } from '@sdk/modules/app'
import { log } from '@module-federation/runtime-core/dist/src/utils'

const { Dragger } = Upload

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
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [open])

  const handleUpload = (): void => {
    if (selectedFile) {
      onImport(selectedFile)
    }
  }

  const handleCancel = (): void => {
    setSelectedFile(null)
    onCancel()
  }

  const handleFileSelect = (file: File): void => {
    if (file.type === 'text/csv' || file.type === 'application/csv' || file.name.endsWith('.csv')) {
      setSelectedFile(file)
    } else {
      trackError( new GeneralError('File rejected - not a CSV'))
    }
  }

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.csv,text/csv,application/csv',
    beforeUpload: (file) => {
      console.log('File dropped/selected:', file)
      handleFileSelect(file as File)
      return false 
    },
    showUploadList: false,
    disabled: loading
  }

  return (
    <Modal
      title={t('redirects.csv-import-modal.redirects-import')}
      open={open}
      onCancel={handleCancel}
      footer={
                <ModalFooter divider justify={!selectedFile ? 'space-between': 'end'}>
          {!selectedFile && (
            <IconTextButton
              icon={{ value: 'upload-import' }}
              onClick={handleBrowseClick}
              disabled={loading}
            >
              {t('redirects.browse-files')}
            </IconTextButton>
          )}
          <Button 
            type="primary" 
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            loading={loading}
          >
            {t('redirects.upload')}
          </Button>
             </ModalFooter>
      }
      size="M"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleInputChange}
        style={{ display: 'none' }}
        disabled={loading}
      />
      
      {!selectedFile ? (
        <Dragger {...uploadProps}>
          <Flex
            align="center"
            gap="mini"
            justify="center"
            style={{ padding: '20px' }}
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
        </Dragger>
      ) : (
        <div className={styles.uploadedFile}>
          <Flex gap={10} align='start'>
            <Flex>
              <div>
                <div className="file-name">{selectedFile.name}</div>
                <div className="file-size">{formatFileSize(selectedFile.size)}</div>
              </div>
            </Flex>
            {!loading && (
              <IconButton
              variant='minimal'
              iconPosition='start'
                icon={{ value: 'close' }}
                type="link"
                onClick={() => {
                  setSelectedFile(null)
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
              />
            )}
          </Flex>
        </div>
      )}
    </Modal>
  )
}
