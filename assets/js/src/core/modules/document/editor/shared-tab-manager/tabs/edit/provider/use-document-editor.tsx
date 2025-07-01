/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useContext } from 'react'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { type ValueType } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'

export interface DocumentEditorContextProps {
  updateValue: (key: string, value: ValueType) => void
  getValues: () => Record<string, ValueType>
  getValue: (key: string) => ValueType
  initializeData: (data: Record<string, ValueType>) => void
}


export const useDocumentEditor = (): DocumentEditorContextProps => {
  const { id } = useContext(DocumentContext)

  const getDocumentEditableApi = useCallback(() => {
    const documentEditableApi = window.PimcoreDocumentEditor?.documentEditable
    if (documentEditableApi === null || documentEditableApi === undefined) {
      throw new Error('PimcoreDocumentEditor API not available')
    }
    return documentEditableApi
  }, [])

  const updateValue = useCallback((key: string, value: ValueType): void => {
    const api = getDocumentEditableApi()
    
    api.updateValue(key, value)

    try {
      const studioApi = getPimcoreStudioApi()
      studioApi.document.triggerValueChange(id, key, value)
    } catch (error) {
      console.warn('Could not notify parent window of value change:', error)
    }
  }, [getDocumentEditableApi, id])

  const getValues = useCallback((): Record<string, ValueType> => {
    const api = getDocumentEditableApi()
    return api.getValues()
  }, [getDocumentEditableApi])

  const getValue = useCallback((key: string): ValueType => {
    const api = getDocumentEditableApi()
    return api.getValue(key)
  }, [getDocumentEditableApi])

  const initializeData = useCallback((data: Record<string, ValueType>): void => {
    const api = getDocumentEditableApi()
    api.initializeValues(data)
  }, [getDocumentEditableApi])

  return {
    updateValue,
    getValues,
    getValue,
    initializeData
  }
}
