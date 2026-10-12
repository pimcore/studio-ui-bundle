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
import { act, renderHook } from '@testing-library/react'
import {
  WorkflowEditorCoordinator,
  WorkflowEditorCoordinatorFallback,
  useWorkflowEditorCoordinatorOptional,
  useWorkflowRunLock
} from './workflow-editor-coordinator'
import { useRegisterUnsavedChangesSaver } from './unsaved-changes-saver-context'

const coordinatorWrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <WorkflowEditorCoordinator>{children}</WorkflowEditorCoordinator>
)

describe('WorkflowEditorCoordinator', () => {
  /**
   * The save buttons register under the toolbar's WorkFlowProvider, the workflow tab's cards live
   * under a provider of their own: both must find the same saver through the editor's coordinator.
   */
  it('hands the saver registered in one subtree to every other subtree of the editor', async () => {
    const saver = jest.fn(async () => true)
    const { result, unmount } = renderHook(() => {
      useRegisterUnsavedChangesSaver(saver)

      return useWorkflowEditorCoordinatorOptional()
    }, { wrapper: coordinatorWrapper })

    const registered = result.current?.getSaver()
    expect(registered).toBeDefined()
    await expect(registered!()).resolves.toBe(true)
    expect(saver).toHaveBeenCalledTimes(1)

    unmount()
  })

  it('withdraws the saver when the registering component unmounts', () => {
    const coordinatorRef: { current: ReturnType<typeof useWorkflowEditorCoordinatorOptional> } = { current: null }
    const { unmount } = renderHook(() => {
      coordinatorRef.current = useWorkflowEditorCoordinatorOptional()
      useRegisterUnsavedChangesSaver(async () => true)
    }, { wrapper: coordinatorWrapper })

    expect(coordinatorRef.current?.getSaver()).toBeDefined()

    unmount()

    expect(coordinatorRef.current?.getSaver()).toBeUndefined()
  })

  it('lets only one run claim the editor at a time', () => {
    const { result } = renderHook(() => ({ first: useWorkflowRunLock(), second: useWorkflowRunLock() }), { wrapper: coordinatorWrapper })

    let claimed = false
    act(() => { claimed = result.current.first.beginRun() })
    expect(claimed).toBe(true)
    expect(result.current.first.isRunning).toBe(true)
    expect(result.current.second.isRunning).toBe(true)

    act(() => { claimed = result.current.second.beginRun() })
    expect(claimed).toBe(false)

    act(() => { result.current.first.endRun() })
    expect(result.current.second.isRunning).toBe(false)

    act(() => { claimed = result.current.second.beginRun() })
    expect(claimed).toBe(true)
  })

  it('falls back to a lock per hook instance without a coordinator', () => {
    const { result } = renderHook(() => ({ first: useWorkflowRunLock(), second: useWorkflowRunLock() }))

    act(() => { result.current.first.beginRun() })
    expect(result.current.first.isRunning).toBe(true)
    expect(result.current.second.isRunning).toBe(false)

    let claimed = false
    act(() => { claimed = result.current.second.beginRun() })
    expect(claimed).toBe(true)
  })

  it('supplies a coordinator of its own only where the editor did not', () => {
    const fallbackWrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
      <WorkflowEditorCoordinatorFallback>{children}</WorkflowEditorCoordinatorFallback>
    )
    const { result: standalone } = renderHook(() => useWorkflowEditorCoordinatorOptional(), { wrapper: fallbackWrapper })
    expect(standalone.current).not.toBeNull()

    const nestedWrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
      <WorkflowEditorCoordinator>
        <WorkflowEditorCoordinatorFallback>{children}</WorkflowEditorCoordinatorFallback>
      </WorkflowEditorCoordinator>
    )
    const saver = async (): Promise<boolean> => true
    const { result: nested } = renderHook(() => {
      const coordinator = useWorkflowEditorCoordinatorOptional()
      coordinator?.setSaver(saver)

      return coordinator
    }, { wrapper: nestedWrapper })
    // The nested fallback passes the editor's coordinator through instead of starting a new one.
    expect(nested.current?.getSaver()).toBe(saver)
  })
})
