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

const run = (task?: SaveTaskType): void => { act(() => { taskCallbacks.forEach((callback) => { callback(task) }) }) }
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

  it('confirms a manual save once it has ended, for a short moment', () => {
    const { result } = renderHook(() => useSavedTask(1))

    run(SaveTaskType.Publish)
    expect(result.current).toBeNull()

    run(undefined)
    expect(result.current).toBe(SaveTaskType.Publish)

    act(() => { jest.advanceTimersByTime(motionDuration.confirmation) })
    expect(result.current).toBeNull()
  })

  it('confirms a save queued behind an auto save only after it ran itself', () => {
    const { result } = renderHook(() => useSavedTask(1))

    run(SaveTaskType.AutoSave)
    run(undefined)
    expect(result.current).toBeNull()

    run(SaveTaskType.Version)
    expect(result.current).toBeNull()

    run(undefined)
    expect(result.current).toBe(SaveTaskType.Version)
  })

  it('does not confirm a failed save', () => {
    const { result } = renderHook(() => useSavedTask(1))

    run(SaveTaskType.Publish)
    fail(SaveTaskType.Publish)
    run(undefined)

    expect(result.current).toBeNull()
  })
})
