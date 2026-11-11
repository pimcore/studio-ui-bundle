/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { useSave } from './use-save'

const saveDocument = jest.fn(async (documentId: number, task?: string) => {})
let mockAutoSaveEnabled = true

jest.mock('../../document-provider', () => ({
  DocumentContext: jest.requireActual('react').createContext({ id: 7 })
}))

jest.mock('../../hooks/use-document-draft', () => ({
  useDocumentDraft: () => ({ document: undefined })
}))

jest.mock('../../services', () => ({
  documentSaveService: { saveDocument: async (documentId: number, task?: string) => { await saveDocument(documentId, task) } }
}))

jest.mock('../../utils/document-auto-save', () => ({
  isDocumentAutoSaveEnabled: () => mockAutoSaveEnabled
}))

jest.mock('@sdk/modules/data-object', () => ({
  SaveTaskType: { AutoSave: 'autoSave' }
}))

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => jest.fn()
}))

jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  setDocumentNodeNavigationExclude: jest.fn()
}))

describe('useSave debouncedAutoSave', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    saveDocument.mockClear()
  })

  afterEach(() => {
    jest.useRealTimers()
    mockAutoSaveEnabled = true
  })

  it('auto-saves the document after the debounce', () => {
    const { result } = renderHook(() => useSave())

    result.current.debouncedAutoSave()
    jest.runAllTimers()

    expect(saveDocument).toHaveBeenCalledWith(7, 'autoSave')
  })

  it('does not auto-save the document when auto-save is disabled', () => {
    mockAutoSaveEnabled = false
    const { result } = renderHook(() => useSave())

    result.current.debouncedAutoSave()
    jest.runAllTimers()

    expect(saveDocument).not.toHaveBeenCalled()
  })
})
