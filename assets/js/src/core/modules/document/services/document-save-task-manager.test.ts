/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DocumentSaveTaskManager, SaveTaskType } from './document-save-task-manager'

// The manager under test only orchestrates; everything it touches to actually save is stubbed.
jest.mock('@Pimcore/app/store', () => ({
  store: { getState: () => ({}), dispatch: jest.fn() }
}))
jest.mock('@Pimcore/modules/document/document-api-slice.gen', () => ({ api: {} }))
jest.mock('@Pimcore/modules/document/document-draft-slice', () => ({
  selectDocumentById: () => ({ permissions: { save: true } }),
  setDraftData: jest.fn(() => ({ type: 'setDraftData' })),
  setModificationDate: jest.fn(() => ({ type: 'setModificationDate' }))
}))
jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  setNodePublished: jest.fn(() => ({ type: 'setNodePublished' })),
  setDocumentNodeStaticGeneratorEnabled: jest.fn(() => ({ type: 'setDocumentNodeStaticGeneratorEnabled' }))
}))
jest.mock('@Pimcore/app/public-api/helpers/api-helper', () => ({ getPimcoreStudioApi: jest.fn() }))
jest.mock('@Pimcore/modules/element/permissions/permission-helper', () => ({ checkElementPermission: () => true }))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ flushByTag: jest.fn() }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: { debouncedFormRegistry: 'debouncedFormRegistry' } }))
jest.mock('@Pimcore/modules/document/utils/document-debounce-tag', () => ({ createDocumentDebounceTag: () => 'tag' }))
jest.mock('./processors/document-save-data-processor-registry', () => ({ DocumentSaveDataContext: {} }))
jest.mock('@Pimcore/lib/event-bus', () => ({ eventBus: { publish: jest.fn() } }))
jest.mock('@Pimcore/lib/event-bus/event-types', () => ({ eventTypes: { 'document:editor:post-update': 'post-update' } }))

interface Deferred { resolve: () => void }

const flush = async (): Promise<void> => { await new Promise(resolve => { setTimeout(resolve, 0) }) }

describe('DocumentSaveTaskManager queuing', () => {
  let saveDocument: jest.SpyInstance
  let pending: Deferred[]

  beforeEach(() => {
    pending = []
    // Every save stays pending until the test resolves it, so "while a save is running" is controllable.
    saveDocument = jest.spyOn(DocumentSaveTaskManager.prototype as unknown as { saveDocument: () => Promise<unknown> }, 'saveDocument')
      .mockImplementation(async () => await new Promise(resolve => {
        pending.push({ resolve: () => { resolve({ success: true, data: {} }) } })
      }))
  })

  afterEach(() => {
    saveDocument.mockRestore()
    DocumentSaveTaskManager.cleanup(7)
  })

  const manager = (): DocumentSaveTaskManager => DocumentSaveTaskManager.getInstance(7)

  it('runs one trailing autosave when an autosave is requested while a save is running', async () => {
    const first = manager().executeSave(SaveTaskType.AutoSave)
    await flush()
    void manager().executeSave(SaveTaskType.AutoSave)
    await flush()

    expect(saveDocument).toHaveBeenCalledTimes(1)

    pending[0].resolve()
    await flush()

    expect(saveDocument).toHaveBeenCalledTimes(2)
    expect(saveDocument).toHaveBeenLastCalledWith(SaveTaskType.AutoSave, true)

    pending[1].resolve()
    await first
  })

  it('coalesces several autosaves requested while a save is running into a single trailing one', async () => {
    const first = manager().executeSave(SaveTaskType.AutoSave)
    await flush()
    void manager().executeSave(SaveTaskType.AutoSave)
    void manager().executeSave(SaveTaskType.AutoSave)
    void manager().executeSave(SaveTaskType.AutoSave)

    pending[0].resolve()
    await flush()
    pending[1].resolve()
    await first
    await flush()

    expect(saveDocument).toHaveBeenCalledTimes(2)
  })

  it('keeps a queued manual save ahead of autosaves requested meanwhile', async () => {
    const first = manager().executeSave(SaveTaskType.AutoSave)
    await flush()
    void manager().executeSave(SaveTaskType.Save)
    void manager().executeSave(SaveTaskType.AutoSave)

    pending[0].resolve()
    await flush()

    expect(saveDocument).toHaveBeenCalledTimes(2)
    expect(saveDocument).toHaveBeenLastCalledWith(SaveTaskType.Save, true)

    pending[1].resolve()
    await first
  })

  it('still ignores a repeated manual save while one is running', async () => {
    const first = manager().executeSave(SaveTaskType.Save)
    await flush()
    void manager().executeSave(SaveTaskType.Save)

    pending[0].resolve()
    await first
    await flush()

    expect(saveDocument).toHaveBeenCalledTimes(1)
  })
})
