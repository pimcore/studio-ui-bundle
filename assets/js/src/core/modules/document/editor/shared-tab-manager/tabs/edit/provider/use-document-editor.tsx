/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useContext, useRef } from 'react'
import { debounce } from 'lodash'
import { SaveTaskType, useSave } from '@Pimcore/modules/document/actions/save/use-save'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useTranslation } from 'react-i18next'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

interface ValueType { type: string, data: any }

export interface DocumentEditorContextProps {
  updateValue: (key: string, value: any) => void
  getValues: () => Record<string, any>
  getValue: (key: string) => any
  initializeData: (data: Record<string, ValueType>) => void
}


export const useDocumentEditor = (): DocumentEditorContextProps => {
  const modifiedRef = useRef<boolean>(false)
  const { save, isError } = useSave()
  const { id } = useContext(DocumentContext)
  const { markDocumentEditablesAsModified } = useDocumentDraft(id)
  const messageApi = useMessage()
  const { t } = useTranslation()

  // Handle auto-save errors
  if (isError) {
    void messageApi.error(t('auto-save-failed'))
  }

  // Helper function to get the document editable API - called lazily when needed
  const getDocumentEditableApi = useCallback(() => {
    const documentEditableApi = window.PimcoreDocumentEditor?.documentEditable
    if (documentEditableApi === null || documentEditableApi === undefined) {
      throw new Error('PimcoreDocumentEditor API not available')
    }
    return documentEditableApi
  }, [])

  const updateDraft = useCallback(debounce(async (): Promise<void> => {
    if (!modifiedRef.current) {
     // markDocumentEditablesAsModified()
      modifiedRef.current = true
    }

    const api = getDocumentEditableApi()
    console.log('Triggering auto-save for document editables', api.getValues())
    await save(api.getValues(), SaveTaskType.AutoSave)
  }, 800), [save, markDocumentEditablesAsModified, getDocumentEditableApi])

  const updateValue = useCallback((key: string, value: any): void => {
    const api = getDocumentEditableApi()
    
    // Get current value to preserve type information
    const currentValue = api.getValue(key)
    const valueWithType = (currentValue?.type !== null && currentValue?.type !== undefined) ? { type: currentValue.type, data: value } : value

    api.updateValue(key, valueWithType)
    
    console.log('Update value for key:', key, 'with value:', valueWithType)

    // Notify parent window that the document has been modified using the helper
    try {
      const studioApi = getPimcoreStudioApi()
      studioApi.document.markDraftAsModified(id)
    } catch (error) {
      console.warn('Could not notify parent window of document modification:', error)
    }

    // Trigger auto-save
    const draftUpdate = updateDraft()
    if (draftUpdate) {
      draftUpdate.catch((error) => {
        console.error('Error updating draft:', error)
      })
    }
  }, [updateDraft, getDocumentEditableApi, id])

  const getValues = useCallback((): Record<string, any> => {
    const api = getDocumentEditableApi()
    return api.getValues()
  }, [getDocumentEditableApi])

  const getValue = useCallback((key: string): any => {
    const api = getDocumentEditableApi()
    const value = api.getValue(key)
    // Extract data from structured value format
    return (value?.data !== null && value?.data !== undefined) ? value.data : value
  }, [getDocumentEditableApi])

  const initializeData = useCallback((data: Record<string, ValueType>): void => {
    console.log('Try Initializing document editable API with initial data:', data)
    const api = getDocumentEditableApi()
    console.log('Initializing document editable API with initial data:', data)
    api.initializeValues(data)
  }, [getDocumentEditableApi])

  return {
    updateValue,
    getValues,
    getValue,
    initializeData
  }
}
