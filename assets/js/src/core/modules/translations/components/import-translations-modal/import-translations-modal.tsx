/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Modal, IconTextButton, ModalFooter } from '@sdk/components'
import { Button } from 'antd'
import { t } from 'i18next'
import { useImportCsv } from './hooks/use-import-csv'
import { FileSelectStep } from './file-select-step'
import { CsvSettingsStep } from './csv-settings-step'

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
  const {
    selectedFile,
    step,
    csvSettings,
    isDetecting,
    isImporting,
    fileError,
    form,
    fileInputRef,
    handleFileSelect,
    handleUpload,
    handleCancel,
    handleBack,
    handleBrowseClick,
    handleInputChange
  } = useImportCsv(domain, open, onCancel, onSuccess)

  return (
    <Modal
      footer={
        <ModalFooter
          divider
          justify={ step === 'file-select' ? 'space-between' : 'end' }
        >
          {step === 'file-select' && (
            <IconTextButton
              disabled={ isImporting }
              icon={ { value: 'upload-import' } }
              onClick={ handleBrowseClick }
            >
              {t('translations.import.modal.browse')}
            </IconTextButton>
          )}
          <Button
            disabled={ selectedFile === null || isImporting || isDetecting }
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

      {step === 'file-select'
        ? (
          <FileSelectStep
            fileError={ fileError }
            isImporting={ isImporting }
            onFileSelect={ handleFileSelect }
          />
          )
        : selectedFile !== null && (
          <CsvSettingsStep
            csvSettings={ csvSettings }
            form={ form }
            isDetecting={ isDetecting }
            isImporting={ isImporting }
            onBack={ handleBack }
            selectedFile={ selectedFile }
          />
        )}
    </Modal>
  )
}
