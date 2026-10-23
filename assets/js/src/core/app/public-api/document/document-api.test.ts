/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type * as DocumentApiModule from './document-api'
import { type IframeRef } from '@Pimcore/components/iframe/iframe'

const saveDocument = jest.fn(async (documentId: number, task: string) => {})

jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: jest.fn(), getState: () => ({}) }
}))

jest.mock('@Pimcore/modules/document/document-draft-slice', () => ({
  markDocumentEditablesAsModified: jest.fn(),
  selectDocumentById: () => undefined
}))

jest.mock('@Pimcore/modules/document/document-editor-slice', () => ({
  setDocumentAreablockTypes: jest.fn(),
  mergeDocumentAreablockTypes: jest.fn(),
  setDocumentTimeSliderVisible: jest.fn(),
  setDocumentHighlightEditables: jest.fn(),
  selectDocumentHighlightEditables: () => false
}))

jest.mock('@Pimcore/modules/document/services', () => ({
  documentSaveService: { saveDocument: async (documentId: number, task: string) => { await saveDocument(documentId, task) } },
  SaveTaskType: { AutoSave: 'autoSave' }
}))

type DocumentApi = typeof DocumentApiModule

const loadModule = async (): Promise<DocumentApi> => {
  let module: DocumentApi | undefined
  await jest.isolateModulesAsync(async () => {
    module = await import('./document-api')
  })

  return module!
}

const registerIframe = (module: DocumentApi, documentId: number): IframeRef => {
  const iframe = document.createElement('iframe')
  document.body.appendChild(iframe)

  const iframeRef: IframeRef = {
    reload: jest.fn(),
    setReloading: jest.fn(),
    setReady: jest.fn(),
    getIframeElement: () => iframe,
    getElementRef: () => ({ current: iframe })
  }

  module.documentApi.registerIframe(documentId, iframe, { current: iframeRef })

  return iframeRef
}

const flushPromises = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 0))
}

describe('documentApi.triggerSaveAndReload', () => {
  beforeEach(() => {
    saveDocument.mockClear()
    document.body.innerHTML = ''
  })

  it('reloads the iframe without saving when the document has not been edited', async () => {
    const module = await loadModule()
    const iframeRef = registerIframe(module, 7)

    module.documentApi.triggerSaveAndReload(7)
    await flushPromises()

    expect(saveDocument).not.toHaveBeenCalled()
    expect(iframeRef.reload).toHaveBeenCalledTimes(1)
    expect(iframeRef.setReloading).not.toHaveBeenCalledWith(true)
  })

  it('saves the document before reloading once it has been edited', async () => {
    const module = await loadModule()
    const iframeRef = registerIframe(module, 7)

    module.documentApi.triggerValueChange(7, 'content:1.headline', { data: 'Hello' })
    module.documentApi.triggerSaveAndReload(7)
    await flushPromises()

    expect(saveDocument).toHaveBeenCalledWith(7, 'autoSave')
    expect(iframeRef.setReloading).toHaveBeenCalledWith(true)
    expect(iframeRef.reload).toHaveBeenCalledTimes(1)
  })

  it('keeps the reload-only path for later refreshes after the save flushed the edits', async () => {
    const module = await loadModule()
    const iframeRef = registerIframe(module, 7)

    module.documentApi.triggerValueChange(7, 'content:1.headline', { data: 'Hello' })
    module.documentApi.triggerSaveAndReload(7)
    await flushPromises()
    saveDocument.mockClear()

    module.documentApi.triggerSaveAndReload(7)
    await flushPromises()

    expect(saveDocument).not.toHaveBeenCalled()
    expect(iframeRef.reload).toHaveBeenCalledTimes(2)
  })
})
