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
import { Modal, IconTextButton } from '@sdk/components'
import { Upload, Button } from 'antd'
import { t } from 'i18next'

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

  const handleFileSelect = (file: File): void => {
    setSelectedFile(file)
  }

  const handleUpload = (): void => {
    if (selectedFile) {
      onImport(selectedFile)
    }
  }

  const handleCancel = (): void => {
    setSelectedFile(null)
    onCancel()
  }

  return (
    <Modal
      title={t('redirects.csv-import')}
      open={open}
      onCancel={handleCancel}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<IconTextButton
            icon={{ value: 'open-folder' }}
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
      <Upload.Dragger
        accept=".csv"
        beforeUpload={(file) => {
          handleFileSelect(file)
          return false // Prevent default upload
        }}
        multiple={false}
        showUploadList={true}
        fileList={selectedFile ? [{
          uid: '1',
          name: selectedFile.name,
          status: 'done',
          size: selectedFile.size
        }] : []}
        onRemove={() => setSelectedFile(null)}
        disabled={loading}
        style={{ 
          padding: '40px 20px',
          textAlign: 'center'
        }}
      >
        <div>
          <p style={{ 
            fontSize: '16px', 
            marginBottom: '24px',
            color: '#666'
          }}>
            {t('redirects.import-drag-drop')}
          </p>
        </div>
      </Upload.Dragger>
    </Modal>
  )
}
