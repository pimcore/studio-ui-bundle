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
  useDataObjectUpdateByIdMutation: () => [async (argument: unknown) => await saveDataObject(argument), { isLoading: false }]
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

/**
 * Hands out a save request that stays open until `finish` is called, so another save
 * can collide with it.
 */
const openSave = (): { finish: () => void } => {
  let finish = (): void => {}
  const pending = new Promise<{ data: Record<string, unknown> }>((resolve) => {
    finish = () => { resolve({ data: {} }) }
  })

  saveDataObject.mockReturnValueOnce(pending)

  return { finish }
}

/**
 * Starts a save without awaiting it — an open one never settles — and waits until the
 * request left, so the next call sees it as running.
 */
const startSave = async (
  save: (data: Record<string, unknown>, task: SaveTaskType) => Promise<void>,
  data: Record<string, unknown>,
  task: SaveTaskType
): Promise<void> => {
  act(() => { void save(data, task) })

  await waitFor(() => { expect(saveDataObject).toHaveBeenCalledTimes(1) })
}

const sentPayloads = (): Array<Record<string, any>> =>
  saveDataObject.mock.calls.map(([argument]) => argument.body.data)

const wrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <DataObjectContext.Provider value={ { id: 1 } }>
    <SaveProvider>{children}</SaveProvider>
  </DataObjectContext.Provider>
)

beforeEach(() => {
  saveDataObject.mockReset()
  saveDataObject.mockResolvedValue({ data: {} })
})

describe('useSave', () => {
  it('runs a task queued behind an auto save with its onFinish', async () => {
    const running = openSave()
    const onFinish = jest.fn()
    const { result } = renderHook(() => ({ editForm: useSave(), toolbar: useSave() }), { wrapper })

    await startSave(result.current.editForm.save, { a: 1 }, SaveTaskType.AutoSave)
    await act(async () => { await result.current.toolbar.save({ a: 1 }, SaveTaskType.Publish, onFinish) })
    expect(saveDataObject).toHaveBeenCalledTimes(1)

    await act(async () => { running.finish() })

    await waitFor(() => { expect(saveDataObject).toHaveBeenCalledTimes(2) })
    expect(sentPayloads()[1]).toMatchObject({ task: SaveTaskType.Publish, editableData: { a: 1 } })
    await waitFor(() => { expect(onFinish).toHaveBeenCalledTimes(1) })
  })

  /**
   * A workflow transition that saves first queues the user's task behind a running
   * auto save and waits for its onFinish; a save the user issues meanwhile (the publish
   * shortcut) takes that queued place. The transition must still hear that the data was
   * saved, or it waits forever and keeps the workflow locked.
   */
  it('carries the onFinish of a queued task along when a later task takes its place', async () => {
    const running = openSave()
    const workflowOnFinish = jest.fn()
    const shortcutOnFinish = jest.fn()
    const { result } = renderHook(() => ({ editForm: useSave(), toolbar: useSave() }), { wrapper })

    await startSave(result.current.editForm.save, { a: 1 }, SaveTaskType.AutoSave)
    await act(async () => { await result.current.toolbar.save({ a: 1 }, SaveTaskType.Publish, workflowOnFinish) })
    await act(async () => { await result.current.toolbar.save({ a: 2 }, SaveTaskType.Publish, shortcutOnFinish) })

    await act(async () => { running.finish() })

    await waitFor(() => { expect(saveDataObject).toHaveBeenCalledTimes(2) })
    expect(sentPayloads()[1]).toMatchObject({ editableData: { a: 2 } })
    await waitFor(() => { expect(shortcutOnFinish).toHaveBeenCalledTimes(1) })
    expect(workflowOnFinish).toHaveBeenCalledTimes(1)
  })
})
