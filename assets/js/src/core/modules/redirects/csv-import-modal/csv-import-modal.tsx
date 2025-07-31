/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { Modal, IconTextButton, IconButton } from '@sdk/components'
import { Button, Upload } from 'antd'
import { t } from 'i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyle } from './csv-import-modal.styles'
import type { UploadFile, UploadProps } from 'antd'

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
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { styles } = useStyle()

  const handleUpload = (): void => {
    if (selectedFile) {
      onImport(selectedFile)
      setSelectedFile(null)
      setFileList([])
    }
  }

  const handleCancel = (): void => {
    setSelectedFile(null)
    setFileList([])
    onCancel()
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
    accept: '.csv',
    fileList: [], 
    beforeUpload: (file) => {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file)
      }
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconTextButton
            icon={{ value: 'upload-import' }}
            onClick={() => {
              const uploadElement = document.querySelector('.ant-upload input[type="file"]') as HTMLInputElement
              uploadElement?.click()
            }}
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
              onClick={() => {
                setSelectedFile(null)
              }}
            />
          </div>
        </div>
      )}
    </Modal>
  )
}
