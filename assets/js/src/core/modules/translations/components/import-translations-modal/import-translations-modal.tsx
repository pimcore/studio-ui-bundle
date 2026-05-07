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
import { Modal, IconTextButton, IconButton, ModalFooter, Icon, Flex } from '@sdk/components'
import { Upload, Button } from 'antd'
import { t } from 'i18next'
import { useStyle } from './import-translations-modal.styles'
import type { UploadProps } from 'antd'
import trackError, { GeneralError } from '../../../app/error-handler'
import {
  useTranslationImportCsvMutation,
  useTranslationDetermineCsvSettingsForImportMutation
} from '../../../app/translations/translations-api-slice-enhanced'
import { ImportDeltaModal } from '../import-delta-modal'
import type { DeltaItem } from '../../../app/translations/translations-api-slice.gen'

const { Dragger } = Upload

interface ImportTranslationsModalProps {
  open: boolean
  domain: string
  onCancel: () => void
  onSuccess: () => void
}

export const ImportTranslationsModal = ({
  open,
  domain,
  onCancel,
  onSuccess
}: ImportTranslationsModalProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [deltaItems, setDeltaItems] = useState<DeltaItem[] | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [importCsv, { isLoading: isImporting }] = useTranslationImportCsvMutation()
  const [detectCsvSettings] = useTranslationDetermineCsvSettingsForImportMutation()

  useEffect(() => {
    if (open) {
      setSelectedFile(null)
      setDeltaItems(null)
      setFileError(null)
      if (fileInputRef.current !== null) {
        fileInputRef.current.value = ''
      }
    }
  }, [open])

  const handleUpload = async (): Promise<void> => {
    if (selectedFile === null) return

    try {
      // Read first few lines to auto-detect CSV settings using Blob.text()
      const sampleText = await selectedFile.slice(0, 4096).text()
      const sample = sampleText.split('\n').slice(0, 5).join('\n')

      const csvSettings = await detectCsvSettings({ body: { sample } }).unwrap()

      const result = await importCsv({
        domain,
        body: {
          file: selectedFile,
          csvSettings: {
            delimiter: csvSettings.delimiter,
            quoteChar: csvSettings.quoteChar,
            escapeChar: csvSettings.escapeChar,
            lineTerminator: csvSettings.lineTerminator
          }
        }
      }).unwrap()

      const importResult = result as { items?: DeltaItem[] }

      if (importResult.items !== undefined && importResult.items.length > 0) {
        setDeltaItems(importResult.items)
      } else {
        onSuccess()
      }
    } catch {
      trackError(new GeneralError('Failed to import translations'))
    }
  }

  const handleCancel = (): void => {
    setSelectedFile(null)
    setDeltaItems(null)
    onCancel()
  }

  const [fileError, setFileError] = useState<string | null>(null)

  const handleFileSelect = (file: File): void => {
    if (file.name.endsWith('.csv') || file.type === 'text/csv') {
      setSelectedFile(file)
      setFileError(null)
    } else {
      setFileError(t('translations.import.modal.invalid-file'))
    }
  }

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file !== undefined) {
      handleFileSelect(file)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.csv',
    beforeUpload: (file) => {
      handleFileSelect(file as File)
      return false
    },
    showUploadList: false,
    disabled: isImporting
  }

  if (deltaItems !== null) {
    return (
      <ImportDeltaModal
        deltaItems={ deltaItems }
        onClose={ () => {
          setDeltaItems(null)
          onSuccess()
        } }
        open
      />
    )
  }

  return (
    <Modal
      footer={
        <ModalFooter
          divider
          justify={ selectedFile === null ? 'space-between' : 'end' }
        >
          {selectedFile === null && (
            <IconTextButton
              disabled={ isImporting }
              icon={ { value: 'upload-import' } }
              onClick={ handleBrowseClick }
            >
              {t('translations.import.modal.browse')}
            </IconTextButton>
          )}
          <Button
            disabled={ selectedFile === null || isImporting }
            loading={ isImporting }
            onClick={ () => { void handleUpload() } }
            type="primary"
          >
            {t('translations.import.modal.import')}
          </Button>
        </ModalFooter>
      }
      onCancel={ handleCancel }
      open={ open }
      size="M"
      title={ t('translations.import.modal.title') }
    >
      <input
        accept=".csv"
        disabled={ isImporting }
        onChange={ handleInputChange }
        ref={ fileInputRef }
        style={ { display: 'none' } }
        type="file"
      />

      {selectedFile === null
        ? (
          <>
          <Dragger { ...uploadProps }>
            <Flex
              align="center"
              gap="mini"
              justify="center"
              style={ { padding: '20px' } }
              vertical
            >
              <div className="icon-container">
                <Flex
                  align="center"
                  gap="mini"
                  justify="center"
                >
                  <Icon
                    options={ { height: 20, width: 20 } }
                    value="new"
                  />
                  <Icon
                    options={ { height: 20, width: 20 } }
                    value="drop-target"
                  />
                </Flex>
              </div>
              <div className="file-target-title">
                {t('translations.import.modal.drag-drop')}
              </div>
            </Flex>
          </Dragger>
          {fileError !== null && (
            <div style={ { color: 'var(--ant-color-error)', marginTop: 8, fontSize: 12 } }>{fileError}</div>
          )}
          </>
          )
        : (
          <div className={ styles.uploadedFile }>
            <Flex
              align="start"
              gap={ 10 }
            >
              <Flex>
                <div>
                  <div className="file-name">{selectedFile.name}</div>
                  <div className="file-size">{formatFileSize(selectedFile.size)}</div>
                </div>
              </Flex>
              {!isImporting && (
                <IconButton
                  icon={ { value: 'close' } }
                  onClick={ () => {
                    setSelectedFile(null)
                    if (fileInputRef.current !== null) {
                      fileInputRef.current.value = ''
                    }
                  } }
                  type="link"
                  variant="minimal"
                />
              )}
            </Flex>
          </div>
          )}
    </Modal>
  )
}
