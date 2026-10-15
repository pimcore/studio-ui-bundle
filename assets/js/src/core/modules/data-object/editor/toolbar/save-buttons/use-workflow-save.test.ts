/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { useWorkflowSave, type UseWorkflowSaveProps } from './use-workflow-save'
import { SaveTaskType } from '@Pimcore/modules/data-object/actions/save/use-save'
import {
  type UnsavedChangesSaver,
  useRegisterUnsavedChangesSaver
} from '@Pimcore/modules/element/editor/shared-components/workflow/provider/unsaved-changes-saver-context'

// Factories, so the real modules — and the SDK barrel they pull in — are never loaded.
jest.mock('@Pimcore/modules/data-object/actions/save/use-save', () => ({
  SaveTaskType: { AutoSave: 'autoSave', Publish: 'publish', Save: 'save', Unpublish: 'unpublish', Version: 'version' }
}))
jest.mock('@Pimcore/modules/element/editor/shared-components/workflow/provider/unsaved-changes-saver-context', () => ({
  useRegisterUnsavedChangesSaver: jest.fn()
}))
jest.mock(
  '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context',
  () => ({ useSaveContext: () => saveContext })
)

// The shared save state of the editor, read live by the hook on every render.
const saveContext: { runningTask?: SaveTaskType, queuedTask?: { task: SaveTaskType, editableData: Record<string, unknown> } } = {}

let registeredSaver: UnsavedChangesSaver | undefined
const startSave = jest.fn<undefined, [SaveTaskType, () => void]>()

const render = (props: Partial<UseWorkflowSaveProps> = {}): {
  rerender: (next: Partial<UseWorkflowSaveProps>) => void
} => {
  const base: UseWorkflowSaveProps = {
    getTask: () => SaveTaskType.Publish,
    startSave,
    isError: false,
    isSchedulesError: false,
    isSchedulesSuccess: false,
    ...props
  }

  const { rerender } = renderHook((hookProps: UseWorkflowSaveProps) => { useWorkflowSave(hookProps) }, { initialProps: base })

  return { rerender: (next) => { rerender({ ...base, ...next }) } }
}

beforeEach(() => {
  jest.clearAllMocks()
  registeredSaver = undefined
  saveContext.runningTask = undefined
  saveContext.queuedTask = undefined;
  (useRegisterUnsavedChangesSaver as jest.Mock).mockImplementation((saver: UnsavedChangesSaver) => { registeredSaver = saver })
})

describe('useWorkflowSave', () => {
  it('starts the save buttons\' save with their task and resolves once data and schedules are saved', async () => {
    const { rerender } = render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })

    expect(startSave).toHaveBeenCalledWith(SaveTaskType.Publish, expect.any(Function))

    // Schedules saved, data still running: not done yet.
    rerender({ isSchedulesSuccess: true })
    act(() => { startSave.mock.calls[0][1]() })

    await expect(result).resolves.toBe(true)
  })

  it('resolves to false when the data save fails', async () => {
    const { rerender } = render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })
    rerender({ isError: true })

    await expect(result).resolves.toBe(false)
  })

  it('resolves to false when the schedules fail', async () => {
    const { rerender } = render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })
    act(() => { startSave.mock.calls[0][1]() })
    rerender({ isSchedulesError: true })

    await expect(result).resolves.toBe(false)
  })

  /**
   * Queued behind an auto save, the save may be sent by the edit form's useSave instance, so
   * its failure never shows up as `isError` of the toolbar's. The editor going idle without the
   * data reported as saved is the signal then.
   */
  it('resolves to false when the save ends without the data being saved', async () => {
    const { rerender } = render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })

    saveContext.queuedTask = { task: SaveTaskType.Publish, editableData: {} }
    rerender({})
    saveContext.queuedTask = undefined
    saveContext.runningTask = SaveTaskType.Publish
    rerender({})
    saveContext.runningTask = undefined
    rerender({})

    await expect(result).resolves.toBe(false)
  })

  it('keeps waiting for the schedules once the data was saved and the editor is idle', async () => {
    const { rerender } = render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })

    saveContext.runningTask = SaveTaskType.Publish
    rerender({})
    act(() => { startSave.mock.calls[0][1]() })
    saveContext.runningTask = undefined
    rerender({})

    let settled = false
    void result!.then(() => { settled = true })
    await act(async () => { await Promise.resolve() })
    expect(settled).toBe(false)

    rerender({ isSchedulesSuccess: true })

    await expect(result).resolves.toBe(true)
  })

  it('does not save when the user cannot save the changes right now', async () => {
    render({ getTask: () => undefined })

    await expect(registeredSaver!()).resolves.toBe(false)
    expect(startSave).not.toHaveBeenCalled()
  })

  it('does not start a second save while one is pending', async () => {
    render()

    act(() => { void registeredSaver!() })

    await expect(registeredSaver!()).resolves.toBe(false)
    expect(startSave).toHaveBeenCalledTimes(1)
  })
})
