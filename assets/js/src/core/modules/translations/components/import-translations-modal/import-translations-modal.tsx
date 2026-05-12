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
import { Modal, IconTextButton, IconButton, ModalFooter, Icon, Flex, FormKit, Form, Input } from '@sdk/components'
import { Upload, Button, Spin } from 'antd'
import { t } from 'i18next'
import { useStyle } from './import-translations-modal.styles'
import type { UploadProps } from 'antd'
import trackError, { GeneralError } from '../../../app/error-handler'
import {
  useTranslationImportCsvMutation,
  useTranslationDetermineCsvSettingsForImportMutation
} from '../../../app/translations/translations-api-slice-enhanced'
import type { DeltaItem } from '../../../app/translations/translations-api-slice.gen'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { setMergerData } from '../translation-merger/merger-data-store'
import { formatDataUnit } from '@Pimcore/utils/data-unit'

const { Dragger } = Upload

interface CsvSettings {
  delimiter: string
  quoteChar: string
  escapeChar: string
  lineTerminator: string
}

type ModalStep = 'file-select' | 'csv-settings'

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
  const [step, setStep] = useState<ModalStep>('file-select')
  const [csvSettings, setCsvSettings] = useState<CsvSettings | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { openMainWidget } = useWidgetManager()
  const [form] = Form.useForm<CsvSettings>()

  const [importCsv, { isLoading: isImporting }] = useTranslationImportCsvMutation()
  const [detectCsvSettings] = useTranslationDetermineCsvSettingsForImportMutation()

  const [fileError, setFileError] = useState<string | null>(null)

  useEffect(() => {
    if (csvSettings !== null && !isDetecting) {
      form.setFieldsValue(csvSettings)
    }
  }, [csvSettings, isDetecting, form])

  useEffect(() => {
    if (open) {
      setSelectedFile(null)
      setFileError(null)
      setStep('file-select')
      setCsvSettings(null)
      setIsDetecting(false)
      form.resetFields()
      if (fileInputRef.current !== null) {
        fileInputRef.current.value = ''
      }
    }
  }, [open, form])

  const handleFileSelected = async (file: File): Promise<void> => {
    setSelectedFile(file)
    setIsDetecting(true)
    setStep('csv-settings')

    try {
      const sampleText = await file.slice(0, 4096).text()
      const sampleLines = sampleText.split(/(?<=\n)/)
      const sample = sampleLines.slice(0, 5).join('')
      const detected = await detectCsvSettings({ body: { sample } }).unwrap()

      const settings: CsvSettings = {
        delimiter: detected.delimiter,
        quoteChar: detected.quoteChar,
        escapeChar: detected.escapeChar,
        lineTerminator: detected.lineTerminator
      }

      setCsvSettings(settings)
    } catch {
      const defaults: CsvSettings = {
        delimiter: ',',
        quoteChar: '"',
        escapeChar: '"',
        lineTerminator: '0d0a'
      }
      setCsvSettings(defaults)
    } finally {
      setIsDetecting(false)
    }
  }

  const handleUpload = async (): Promise<void> => {
    if (selectedFile === null) return

    try {
      const values = await form.validateFields()

      const result = await importCsv({
        domain,
        body: {
          file: selectedFile,
          csvSettings: {
            delimiter: values.delimiter,
            quoteChar: values.quoteChar,
            escapeChar: values.escapeChar,
            lineTerminator: values.lineTerminator
          }
        }
      }).unwrap()

      const importResult = result as { items?: DeltaItem[] }

      if (importResult.items !== undefined && importResult.items.length > 0) {
        setMergerData({ domain, deltaItems: importResult.items })
        openMainWidget({
          name: 'Translation Merger',
          id: `translation-merger-${Date.now()}`,
          component: 'translation-merger',
          config: {
            translationKey: 'widget.translation-merger',
            icon: { type: 'name', value: 'translate' }
          }
        })
      }
      onSuccess()
    } catch {
      trackError(new GeneralError('Failed to import translations'))
    }
  }

  const handleCancel = (): void => {
    setSelectedFile(null)
    onCancel()
  }

  const handleFileSelect = (file: File): void => {
    if (file.name.endsWith('.csv') || file.type === 'text/csv') {
      setFileError(null)
      void handleFileSelected(file)
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

  const handleBack = (): void => {
    setSelectedFile(null)
    setStep('file-select')
    setCsvSettings(null)
    form.resetFields()
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

  const renderFileSelectStep = (): React.JSX.Element => (
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

  const renderCsvSettingsStep = (): React.JSX.Element => (
    <>
      {selectedFile !== null && (
        <div className={ styles.uploadedFile }>
          <Flex
            align="start"
            gap={ 10 }
          >
            <Flex>
              <div>
                <div className="file-name">{selectedFile.name}</div>
                <div className="file-size">{formatDataUnit(selectedFile.size)}</div>
              </div>
            </Flex>
            {!isImporting && (
              <IconButton
                icon={ { value: 'close' } }
                onClick={ handleBack }
                type="link"
                variant="minimal"
              />
            )}
          </Flex>
        </div>
      )}

      {isDetecting
        ? (
          <Flex
            align="center"
            justify="center"
            style={ { padding: '20px' } }
          >
            <Spin />
          </Flex>
          )
        : (
          <FormKit
            formProps={ {
              form,
              component: false,
              initialValues: csvSettings ?? {
                delimiter: ',',
                quoteChar: '"',
                escapeChar: '"',
                lineTerminator: '0d0a'
              }
            } }
          >
            <FormKit.Panel title={ t('translations.import.modal.csv-settings') }>
              <Form.Item
                label={ t('translations.import.modal.delimiter') }
                name="delimiter"
                rules={ [{ required: true, message: t('translations.import.modal.field-required') }] }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={ t('translations.import.modal.quotechar') }
                name="quoteChar"
                rules={ [{ required: true, message: t('translations.import.modal.field-required') }] }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={ t('translations.import.modal.escapechar') }
                name="escapeChar"
                rules={ [{ required: true, message: t('translations.import.modal.field-required') }] }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={ t('translations.import.modal.lineterminator') }
                name="lineTerminator"
                rules={ [{ required: true, message: t('translations.import.modal.field-required') }] }
              >
                <Input />
              </Form.Item>
            </FormKit.Panel>
          </FormKit>
          )}
    </>
  )

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

      {step === 'file-select' ? renderFileSelectStep() : renderCsvSettingsStep()}
    </Modal>
  )
}
