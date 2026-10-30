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
import { useDocumentEditor } from './use-document-editor'

const documentApi = {
  triggerValueChange: jest.fn(),
  triggerValueChangeWithReload: jest.fn(),
  triggerSaveAndReload: jest.fn(),
  reloadIframe: jest.fn()
}

jest.mock('@Pimcore/app/public-api/helpers/api-helper', () => ({
  getPimcoreStudioApi: () => ({ document: documentApi })
}))

jest.mock('@Pimcore/modules/document/document-provider', () => ({
  DocumentContext: jest.requireActual('react').createContext({ id: 42 })
}))

const editableStore = { updateValue: jest.fn() }

describe('useDocumentEditor persistence', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (window as unknown as { PimcoreDocumentEditor: unknown }).PimcoreDocumentEditor = { documentEditable: editableStore }
  })

  it('setValue writes to the store without telling the parent window', () => {
    const { result } = renderHook(() => useDocumentEditor())
    const before = result.current.getPersistenceVersion()

    result.current.setValue('headline', { type: 'input', data: 'x' })

    expect(editableStore.updateValue).toHaveBeenCalledWith('headline', { type: 'input', data: 'x' })
    expect(documentApi.triggerValueChange).not.toHaveBeenCalled()
    expect(result.current.getPersistenceVersion()).toBe(before)
  })

  it('counts every notification that makes the parent window persist', () => {
    const { result } = renderHook(() => useDocumentEditor())
    const before = result.current.getPersistenceVersion()

    result.current.updateValue('headline', { type: 'input', data: 'x' })
    result.current.updateValueWithReload('headline', { type: 'input', data: 'y' })
    result.current.triggerSaveAndReload()
    result.current.reloadIframe()

    expect(documentApi.triggerValueChange).toHaveBeenCalledTimes(1)
    expect(documentApi.triggerValueChangeWithReload).toHaveBeenCalledTimes(1)
    expect(result.current.getPersistenceVersion()).toBe(before + 4)
  })

  it('shares the persistence counter between hook instances', () => {
    // The dialog snapshot and the editables on the page use separate hook instances.
    const dialog = renderHook(() => useDocumentEditor())
    const pageEditable = renderHook(() => useDocumentEditor())
    const before = dialog.result.current.getPersistenceVersion()

    pageEditable.result.current.updateValue('pageTitle', { type: 'input', data: 'x' })

    expect(dialog.result.current.getPersistenceVersion()).toBe(before + 1)
  })

  it('still counts a persistence request the parent window could not be told about', () => {
    documentApi.triggerValueChange.mockImplementationOnce(() => { throw new Error('parent gone') })
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const { result } = renderHook(() => useDocumentEditor())
    const before = result.current.getPersistenceVersion()

    expect(() => { result.current.updateValue('headline', { type: 'input', data: 'x' }) }).not.toThrow()
    expect(editableStore.updateValue).toHaveBeenCalledWith('headline', { type: 'input', data: 'x' })
    expect(result.current.getPersistenceVersion()).toBe(before + 1)

    warn.mockRestore()
  })

  it('setValue fails loudly when the editable store is not available', () => {
    (window as unknown as { PimcoreDocumentEditor: unknown }).PimcoreDocumentEditor = undefined
    const { result } = renderHook(() => useDocumentEditor())

    expect(() => { result.current.setValue('headline', { type: 'input', data: 'x' }) }).toThrow('PimcoreDocumentEditor API not available')
  })
})
