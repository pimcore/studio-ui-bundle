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
import { useSavedTask } from './use-saved-task'
import { SaveTaskType } from '@Pimcore/modules/document/actions/save/use-save'
import { motionDuration } from '@Pimcore/utils/motion'

type TaskCallback = (task?: SaveTaskType) => void
type ErrorCallback = (error: unknown, task?: SaveTaskType) => void

// stands in for DocumentSaveTaskManager: emits task starts/ends and errors the same way
const taskCallbacks = new Set<TaskCallback>()
const errorCallbacks = new Set<ErrorCallback>()

jest.mock('@Pimcore/modules/document/services', () => ({
  DocumentSaveTaskManager: {
    getInstance: () => ({
      onRunningTaskChange: (callback: TaskCallback) => { taskCallbacks.add(callback); return () => taskCallbacks.delete(callback) },
      onErrorChange: (callback: ErrorCallback) => { errorCallbacks.add(callback); return () => errorCallbacks.delete(callback) }
    })
  }
}))

jest.mock('@Pimcore/modules/document/actions/save/use-save', () => ({
  SaveTaskType: { AutoSave: 'autoSave', Version: 'version', Publish: 'publish', Save: 'save' }
}))

// the confirmation waits for the schedules (a promise), so pending promises are flushed as well
const run = async (task?: SaveTaskType): Promise<void> => { await act(async () => { taskCallbacks.forEach((callback) => { callback(task) }) }) }
const fail = (task: SaveTaskType): void => { act(() => { errorCallbacks.forEach((callback) => { callback(new Error('failed'), task) }) }) }

describe('useSavedTask', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    taskCallbacks.clear()
    errorCallbacks.clear()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('confirms a manual save once it has ended, for a short moment', async () => {
    const { result } = renderHook(() => useSavedTask(1))

    await run(SaveTaskType.Publish)
    expect(result.current).toBeNull()

    await run(undefined)
    expect(result.current).toBe(SaveTaskType.Publish)

    act(() => { jest.advanceTimersByTime(motionDuration.confirmation) })
    expect(result.current).toBeNull()
  })

  it('confirms a save queued behind an auto save only after it ran itself', async () => {
    const { result } = renderHook(() => useSavedTask(1))

    await run(SaveTaskType.AutoSave)
    await run(undefined)
    expect(result.current).toBeNull()

    await run(SaveTaskType.Version)
    expect(result.current).toBeNull()

    await run(undefined)
    expect(result.current).toBe(SaveTaskType.Version)
  })

  it('does not confirm a failed save', async () => {
    const { result } = renderHook(() => useSavedTask(1))

    await run(SaveTaskType.Publish)
    fail(SaveTaskType.Publish)
    await run(undefined)

    expect(result.current).toBeNull()
  })

  it('does not confirm a save whose schedules failed', async () => {
    const { result } = renderHook(() => useSavedTask(1, async () => await Promise.resolve(false)))

    await run(SaveTaskType.Publish)
    await run(undefined)

    expect(result.current).toBeNull()
  })

  it('confirms a save once its schedules are saved as well', async () => {
    const { result } = renderHook(() => useSavedTask(1, async () => await Promise.resolve(true)))

    await run(SaveTaskType.Save)
    await run(undefined)

    expect(result.current).toBe(SaveTaskType.Save)
  })
})
