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
  registeredSaver = undefined;
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
