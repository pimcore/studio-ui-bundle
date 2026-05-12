/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useRef, useEffect } from 'react'
import { Form, type formInstanceType } from '@sdk/components'
import trackError, { GeneralError } from '../../../../app/error-handler'
import {
  useTranslationImportCsvMutation,
  useTranslationDetermineCsvSettingsForImportMutation
} from '../../../../app/translations/translations-api-slice-enhanced'
import type { DeltaItem } from '../../../../app/translations/translations-api-slice.gen'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { setMergerData } from '../../translation-merger/merger-data-store'
import type { CsvSettings, ModalStep } from '../types'
import { DEFAULT_CSV_SETTINGS } from '../types'
import { t } from 'i18next'

interface UseImportCsvReturn {
  selectedFile: File | null
  step: ModalStep
  csvSettings: CsvSettings | null
  isDetecting: boolean
  isImporting: boolean
  fileError: string | null
  form: formInstanceType<CsvSettings>
  fileInputRef: React.RefObject<HTMLInputElement>
  handleFileSelect: (file: File) => void
  handleUpload: () => Promise<void>
  handleCancel: () => void
  handleBack: () => void
  handleBrowseClick: () => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const useImportCsv = (
  domain: string,
  open: boolean,
  onCancel: () => void,
  onSuccess: () => void
): UseImportCsvReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [step, setStep] = useState<ModalStep>('file-select')
  const [csvSettings, setCsvSettings] = useState<CsvSettings | null>(null)
  const [isDetecting, setIsDetecting] = useState<boolean>(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null!)
  const { openMainWidget } = useWidgetManager()
  const [form] = Form.useForm<CsvSettings>()

  const [importCsv, { isLoading: isImporting }] = useTranslationImportCsvMutation()
  const [detectCsvSettings] = useTranslationDetermineCsvSettingsForImportMutation()

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

      setCsvSettings({
        delimiter: detected.delimiter,
        quoteChar: detected.quoteChar,
        escapeChar: detected.escapeChar,
        lineTerminator: detected.lineTerminator
      })
    } catch {
      setCsvSettings(DEFAULT_CSV_SETTINGS)
    } finally {
      setIsDetecting(false)
    }
  }

  const handleFileSelect = (file: File): void => {
    if (file.name.endsWith('.csv') || file.type === 'text/csv') {
      setFileError(null)
      void handleFileSelected(file)
    } else {
      setFileError(t('translations.import.modal.invalid-file'))
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

  const handleBack = (): void => {
    setSelectedFile(null)
    setStep('file-select')
    setCsvSettings(null)
    form.resetFields()
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

  return {
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
  }
}
