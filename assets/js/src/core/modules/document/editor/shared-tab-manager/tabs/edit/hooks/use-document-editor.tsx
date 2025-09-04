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
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { type ValueType } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'

export interface DocumentEditorContextProps {
  updateValue: (key: string, value: ValueType) => void
  updateValueWithReload: (key: string, value: ValueType) => void
  triggerSaveAndReload: () => void
  getValues: () => Record<string, ValueType>
  getValue: (key: string) => ValueType
  initializeData: (data: Record<string, ValueType>) => void
  removeValues: (keysToRemove: string[]) => void
  notifyReady: () => void
  getInheritanceState: (key: string) => boolean
  setInheritanceState: (key: string, inherited: boolean) => void
  initializeInheritanceState: (inheritanceState: Record<string, boolean>) => void
}

export const useDocumentEditor = (): DocumentEditorContextProps => {
  const { id } = useContext(DocumentContext)
  const readyNotified = useRef(false)

  const getDocumentEditableApi = useCallback(() => {
    const documentEditableApi = window.PimcoreDocumentEditor?.documentEditable
    if (documentEditableApi === null || documentEditableApi === undefined) {
      throw new Error('PimcoreDocumentEditor API not available')
    }
    return documentEditableApi
  }, [])

  const updateValue = useCallback((key: string, value: ValueType): void => {
    getDocumentEditableApi().updateValue(key, value)

    try {
      const { document: documentApi } = getPimcoreStudioApi()
      documentApi.triggerValueChange(id, key, value)
    } catch (error) {
      console.warn('Could not notify parent window of value change:', error)
    }
  }, [id])

  const updateValueWithReload = useCallback((key: string, value: ValueType): void => {
    getDocumentEditableApi().updateValue(key, value)

    try {
      const { document: documentApi } = getPimcoreStudioApi()
      documentApi.triggerValueChangeWithReload(id, key, value)
    } catch (error) {
      console.warn('Could not trigger reload for value change:', error)
    }
  }, [id])

  const getValues = (): Record<string, ValueType> => {
    return getDocumentEditableApi().getValues()
  }

  const getValue = (key: string): ValueType => {
    return getDocumentEditableApi().getValue(key)
  }

  const initializeData = (data: Record<string, ValueType>): void => {
    getDocumentEditableApi().initializeValues(data)
  }

  const removeValues = (keysToRemove: string[]): void => {
    getDocumentEditableApi().removeValues(keysToRemove)
  }

  const getInheritanceState = (key: string): boolean => {
    return getDocumentEditableApi().getInheritanceState(key)
  }

  const setInheritanceState = (key: string, inherited: boolean): void => {
    getDocumentEditableApi().setInheritanceState(key, inherited)
  }

  const initializeInheritanceState = (inheritanceState: Record<string, boolean>): void => {
    getDocumentEditableApi().initializeInheritanceState(inheritanceState)
  }

  const triggerSaveAndReload = useCallback((): void => {
    try {
      const { document: documentApi } = getPimcoreStudioApi()
      documentApi.triggerSaveAndReload(id)
    } catch (error) {
      console.warn('Could not trigger save and reload:', error)
    }
  }, [id])

  const notifyReady = useCallback((): void => {
    if (!readyNotified.current) {
      try {
        const { document: documentApi } = getPimcoreStudioApi()
        documentApi.notifyIframeReady(id)
        readyNotified.current = true
      } catch (error) {
        console.warn('Could not notify parent window that iframe is ready:', error)
      }
    }
  }, [id])

  return {
    updateValue,
    updateValueWithReload,
    triggerSaveAndReload,
    getValues,
    getValue,
    initializeData,
    removeValues,
    notifyReady,
    getInheritanceState,
    setInheritanceState,
    initializeInheritanceState
  }
}
