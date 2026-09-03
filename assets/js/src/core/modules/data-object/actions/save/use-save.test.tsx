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
import { act, renderHook, waitFor } from '@testing-library/react'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import {
  SaveProvider
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider'
import { SaveTaskType, useSave } from './use-save'

const saveDataObject = jest.fn()

jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  useDataObjectUpdateByIdMutation: () => [saveDataObject, { isLoading: false }]
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: { changes: {} }, properties: [], setDraftData: jest.fn() })
}))

jest.mock('@sdk/app', () => ({ useAppDispatch: () => jest.fn() }))

jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({ setNodePublished: jest.fn() }))

jest.mock('@Pimcore/modules/data-object/data-object-draft-slice', () => ({ setModificationDate: jest.fn() }))

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ executeProcessors: jest.fn() }) }
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))

jest.mock('@Pimcore/modules/data-object/services/processors/data-object-save-data-processor-registry', () => ({
  DataObjectSaveDataContext: function DataObjectSaveDataContext () {}
}))

jest.mock('@Pimcore/lib/event-bus', () => ({ eventBus: { publish: jest.fn() } }))

jest.mock('@Pimcore/lib/event-bus/event-types', () => ({ eventTypes: {} }))

jest.mock('@Pimcore/modules/element/services/edit-lock-gate', () => ({
  awaitEditLockPersistAllowed: async () => true
}))

/** A save the test holds open, so the next one collides with it. */
const openSave = (): { finish: () => void } => {
  let finish = (): void => {}
  const pending = new Promise<{ data: Record<string, unknown> }>((resolve) => {
    finish = () => { resolve({ data: {} }) }
  })

  saveDataObject.mockReturnValueOnce(pending)

  return { finish }
}

const sentPayloads = (): Array<Record<string, unknown>> =>
  saveDataObject.mock.calls.map(([argument]) => argument.body.data)

/**
 * Puts a save in flight and waits until it is, so what follows really collides with
 * it. Awaiting matters: an auto save waits on the edit-lock gate before it claims the
 * running slot, so issuing the next call too early would race that instead.
 */
const startSave = async (
  save: (data: Record<string, unknown>, task: SaveTaskType) => Promise<void>,
  data: Record<string, unknown>,
  task: SaveTaskType
): Promise<void> => {
  act(() => { void save(data, task) })

  await waitFor(() => { expect(saveDataObject).toHaveBeenCalledTimes(1) })
}

const wrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <DataObjectContext.Provider value={ { id: 1 } }>
    <SaveProvider>{children}</SaveProvider>
  </DataObjectContext.Provider>
)

beforeEach(() => {
  // Reset, not clear: a mockReturnValueOnce left unconsumed by a test would otherwise
  // be handed to the next one.
  saveDataObject.mockReset()
  saveDataObject.mockResolvedValue({ data: {} })
})

describe('useSave', () => {
  /**
   * The regression this guards: restoring a field's inheritance writes the draft
   * without changing the form, so if that write is dropped nothing follows to carry
   * it and the draft silently keeps the own value.
   */
  it('runs an auto save that collided with a running one once the running one finishes', async () => {
    const running = openSave()
    const { result } = renderHook(() => useSave(), { wrapper })

    await startSave(result.current.save, { a: 1 }, SaveTaskType.AutoSave)
    await act(async () => { await result.current.save({ restored: null }, SaveTaskType.AutoSave) })

    expect(saveDataObject).toHaveBeenCalledTimes(1)

    await act(async () => { running.finish() })

    await waitFor(() => { expect(saveDataObject).toHaveBeenCalledTimes(2) })
    expect(sentPayloads()[1].editableData).toEqual({ restored: null })
  })

  it('keeps only the latest of several collided auto saves, which carries them all', async () => {
    const running = openSave()
    const { result } = renderHook(() => useSave(), { wrapper })

    await startSave(result.current.save, { a: 1 }, SaveTaskType.AutoSave)
    await act(async () => { await result.current.save({ a: 1, b: 2 }, SaveTaskType.AutoSave) })
    await act(async () => { await result.current.save({ a: 1, b: 2, c: 3 }, SaveTaskType.AutoSave) })

    await act(async () => { running.finish() })

    await waitFor(() => { expect(saveDataObject).toHaveBeenCalledTimes(2) })
    expect(sentPayloads()[1].editableData).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('does not let an auto save displace a queued task the user is waiting on', async () => {
    const running = openSave()
    const { result } = renderHook(() => useSave(), { wrapper })

    await startSave(result.current.save, { a: 1 }, SaveTaskType.AutoSave)
    await act(async () => { await result.current.save({ a: 1 }, SaveTaskType.Publish) })
    await act(async () => { await result.current.save({ a: 1 }, SaveTaskType.AutoSave) })

    await act(async () => { running.finish() })

    await waitFor(() => { expect(saveDataObject).toHaveBeenCalledTimes(2) })
    expect(sentPayloads()[1].task).toBe(SaveTaskType.Publish)
  })

  it('drops an auto save that collides with a task the user is waiting on', async () => {
    const running = openSave()
    const { result } = renderHook(() => useSave(), { wrapper })

    await startSave(result.current.save, { a: 1 }, SaveTaskType.Publish)
    await act(async () => { await result.current.save({ b: 2 }, SaveTaskType.AutoSave) })

    await act(async () => { running.finish() })

    await waitFor(() => { expect(saveDataObject).toHaveBeenCalledTimes(1) })
  })
})
