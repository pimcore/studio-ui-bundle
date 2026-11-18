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
import { getWorkflowSaveTask, useWorkflowSave, type UseWorkflowSaveProps } from './use-workflow-save'
import { type ElementPermissions } from '@Pimcore/modules/element/permissions/permission-helper'
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
const startSave = jest.fn<Promise<boolean>, [SaveTaskType, () => void]>()

// Resolves the schedules save started by the n-th startSave call.
let resolveSchedules: Array<(saved: boolean) => void> = []

const render = (props: Partial<UseWorkflowSaveProps> = {}): { rerender: () => void } => {
  const base: UseWorkflowSaveProps = {
    getTask: () => SaveTaskType.Version,
    startSave,
    ...props
  }

  const { rerender } = renderHook((hookProps: UseWorkflowSaveProps) => { useWorkflowSave(hookProps) }, { initialProps: base })

  return { rerender: () => { rerender(base) } }
}

const reportDataSaved = (call = 0): void => {
  act(() => { startSave.mock.calls[call][1]() })
}

const reportSchedules = async (saved: boolean, call = 0): Promise<void> => {
  await act(async () => {
    resolveSchedules[call](saved)
    await Promise.resolve()
  })
}

const isSettled = async (result: Promise<boolean>): Promise<boolean> => {
  let settled = false
  void result.then(() => { settled = true })
  await act(async () => { await Promise.resolve() })
  return settled
}

beforeEach(() => {
  jest.clearAllMocks()
  registeredSaver = undefined
  resolveSchedules = []
  saveContext.runningTask = undefined
  saveContext.queuedTask = undefined;
  (useRegisterUnsavedChangesSaver as jest.Mock).mockImplementation((saver: UnsavedChangesSaver) => { registeredSaver = saver })
  startSave.mockImplementation(async () => await new Promise<boolean>((resolve) => { resolveSchedules.push(resolve) }))
})

describe('useWorkflowSave', () => {
  it('starts the save buttons\' save with their task and resolves once data and schedules are saved', async () => {
    render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })

    expect(startSave).toHaveBeenCalledWith(SaveTaskType.Version, expect.any(Function))

    // Schedules saved, data still running: not done yet.
    await reportSchedules(true)
    expect(await isSettled(result!)).toBe(false)

    reportDataSaved()

    await expect(result).resolves.toBe(true)
  })

  it('resolves to false when the schedules fail', async () => {
    render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })
    reportDataSaved()
    await reportSchedules(false)

    await expect(result).resolves.toBe(false)
  })

  it('resolves to false when the data save fails', async () => {
    const { rerender } = render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })
    await reportSchedules(true)

    saveContext.runningTask = SaveTaskType.Version
    rerender()
    saveContext.runningTask = undefined
    rerender()

    await expect(result).resolves.toBe(false)
  })

  /**
   * Queued behind an auto save, the save may be sent by the edit form's useSave instance, so
   * its outcome never reaches the toolbar's mutation flags. The editor going idle without the
   * data reported as saved is the signal then.
   */
  it('resolves to false when a queued save ends without the data being saved', async () => {
    const { rerender } = render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })

    saveContext.queuedTask = { task: SaveTaskType.Version, editableData: {} }
    rerender()
    saveContext.queuedTask = undefined
    saveContext.runningTask = SaveTaskType.Version
    rerender()
    saveContext.runningTask = undefined
    rerender()

    await expect(result).resolves.toBe(false)
  })

  it('keeps waiting for the schedules once the data was saved and the editor is idle', async () => {
    const { rerender } = render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })

    saveContext.runningTask = SaveTaskType.Version
    rerender()
    reportDataSaved()
    saveContext.runningTask = undefined
    rerender()

    expect(await isSettled(result!)).toBe(false)

    await reportSchedules(true)

    await expect(result).resolves.toBe(true)
  })

  it('does not count the outcome of an earlier save', async () => {
    render()

    // first run: fails on the schedules
    let first: Promise<boolean> | undefined
    act(() => { first = registeredSaver!() })
    reportDataSaved(0)
    await reportSchedules(false, 0)
    await expect(first).resolves.toBe(false)

    // second run: data saved first, schedules still being saved — the earlier failure is not reused
    let second: Promise<boolean> | undefined
    act(() => { second = registeredSaver!() })
    reportDataSaved(1)
    expect(await isSettled(second!)).toBe(false)

    await reportSchedules(true, 1)
    await expect(second).resolves.toBe(true)
  })

  it('resolves to false when the save flow throws', async () => {
    startSave.mockRejectedValueOnce(new Error('boom'))
    jest.spyOn(console, 'error').mockImplementation(() => {})
    render()

    let result: Promise<boolean> | undefined
    act(() => { result = registeredSaver!() })

    await expect(result).resolves.toBe(false)
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

describe('getWorkflowSaveTask', () => {
  const permissions = (granted: { save?: boolean, publish?: boolean }): ElementPermissions =>
    ({ save: granted.save === true, publish: granted.publish === true }) as unknown as ElementPermissions

  const dataObject = (
    published: boolean,
    granted: { save?: boolean, publish?: boolean },
    type = 'object'
  ): { type: string, changes: Record<string, boolean>, published: boolean, permissions: ElementPermissions } => ({
    type,
    changes: { name: true },
    published,
    permissions: permissions(granted)
  })

  // The classic admin UI saves a published object as a version before a transition; it never publishes.
  it.each([
    ['save and publish', { save: true, publish: true }],
    ['save only', { save: true }]
  ])('saves a draft of a published object (%s permission)', (_label, granted) => {
    expect(getWorkflowSaveTask(dataObject(true, granted), undefined)).toBe(SaveTaskType.Version)
  })

  it.each([
    ['save and publish', { save: true, publish: true }],
    ['save only', { save: true }]
  ])('saves an unpublished object as it is (%s permission)', (_label, granted) => {
    expect(getWorkflowSaveTask(dataObject(false, granted), undefined)).toBe(SaveTaskType.Save)
  })

  it('saves a folder as it is', () => {
    expect(getWorkflowSaveTask(dataObject(true, { save: true }, 'folder'), undefined)).toBe(SaveTaskType.Save)
  })

  // The backend checks the save permission for both the version and the save task.
  it.each([
    ['published, publish only', true, { publish: true }],
    ['unpublished, publish only', false, { publish: true }],
    ['published, no permission', true, {}],
    ['unpublished, no permission', false, {}]
  ])('cannot save without the save permission (%s)', (_label, published, granted) => {
    expect(getWorkflowSaveTask(dataObject(published, granted), undefined)).toBeUndefined()
  })

  it('cannot save without changes', () => {
    expect(getWorkflowSaveTask({ published: true, permissions: permissions({ save: true }) }, undefined)).toBeUndefined()
    expect(getWorkflowSaveTask(undefined, undefined)).toBeUndefined()
  })

  it('does not queue behind a running save of the user, only behind an auto save', () => {
    const object = dataObject(true, { save: true })

    expect(getWorkflowSaveTask(object, SaveTaskType.Version)).toBeUndefined()
    expect(getWorkflowSaveTask(object, SaveTaskType.Publish)).toBeUndefined()
    expect(getWorkflowSaveTask(object, SaveTaskType.AutoSave)).toBe(SaveTaskType.Version)
  })
})
