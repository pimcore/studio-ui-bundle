/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

/**
 * Saves the element through the editor's own save flow before a workflow transition with
 * `unsavedChangesBehaviour: save` is applied. Resolves once the save has completed: true when it
 * succeeded, false when it failed or could not run.
 */
export type UnsavedChangesSaver = () => Promise<boolean>

export interface IWorkflowEditorCoordinator {
  /** Registers (or, with undefined, withdraws) the saver of the editor's save flow. */
  setSaver: (saver: UnsavedChangesSaver | undefined) => void
  getSaver: () => UnsavedChangesSaver | undefined
  /**
   * Claims the editor's single workflow run (guard plus submit). Returns false, without claiming,
   * while another run is still going.
   */
  beginRun: () => boolean
  endRun: () => void
  /** True while a run is going, from whichever control started it. */
  isRunning: boolean
}

/**
 * One per element editor. An editor offers its workflow in several places — the toolbar's
 * transition menu, the cards on the workflow tab, the comment modal — each with its own
 * `WorkFlowProvider`. What must be shared between them lives here: the saver the editor's save flow
 * registered (so a `save` transition saves from every entry point) and the in-flight run (so a
 * second transition cannot be submitted while one is still saving, asking or submitting).
 */
export const WorkflowEditorCoordinatorContext = createContext<IWorkflowEditorCoordinator | null>(null)

export const useWorkflowEditorCoordinatorOptional = (): IWorkflowEditorCoordinator | null =>
  useContext(WorkflowEditorCoordinatorContext)

interface WorkflowEditorCoordinatorProps {
  children: React.ReactNode
}

export const WorkflowEditorCoordinator = ({ children }: WorkflowEditorCoordinatorProps): React.JSX.Element => {
  const saverRef = useRef<UnsavedChangesSaver | undefined>(undefined)
  const runningRef = useRef<boolean>(false)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const beginRun = useCallback((): boolean => {
    if (runningRef.current) {
      return false
    }

    runningRef.current = true
    setIsRunning(true)

    return true
  }, [])

  const endRun = useCallback((): void => {
    runningRef.current = false
    setIsRunning(false)
  }, [])

  const value = useMemo<IWorkflowEditorCoordinator>(() => ({
    setSaver: (saver) => { saverRef.current = saver },
    getSaver: () => saverRef.current,
    beginRun,
    endRun,
    isRunning
  }), [beginRun, endRun, isRunning])

  return (
    <WorkflowEditorCoordinatorContext.Provider value={ value }>
      {children}
    </WorkflowEditorCoordinatorContext.Provider>
  )
}

/**
 * Supplies a coordinator where the editor did not: hosts that render a `WorkFlowProvider` without
 * the editor's coordinator above it get one of their own, so the run lock and saver still work
 * within that provider.
 */
export const WorkflowEditorCoordinatorFallback = ({ children }: WorkflowEditorCoordinatorProps): React.JSX.Element => {
  const coordinator = useWorkflowEditorCoordinatorOptional()

  if (coordinator !== null) {
    return <>{children}</>
  }

  return <WorkflowEditorCoordinator>{children}</WorkflowEditorCoordinator>
}

interface UseWorkflowRunLockReturn {
  beginRun: () => boolean
  endRun: () => void
  isRunning: boolean
}

/**
 * The editor-wide run lock, or a lock private to the calling hook instance when no coordinator is
 * around (a host that passes an explicit workflow subject outside an editor).
 */
export const useWorkflowRunLock = (): UseWorkflowRunLockReturn => {
  const coordinator = useWorkflowEditorCoordinatorOptional()
  const localRunningRef = useRef<boolean>(false)
  const [isLocalRunning, setIsLocalRunning] = useState<boolean>(false)

  const beginLocalRun = useCallback((): boolean => {
    if (localRunningRef.current) {
      return false
    }

    localRunningRef.current = true
    setIsLocalRunning(true)

    return true
  }, [])

  const endLocalRun = useCallback((): void => {
    localRunningRef.current = false
    setIsLocalRunning(false)
  }, [])

  if (coordinator !== null) {
    return { beginRun: coordinator.beginRun, endRun: coordinator.endRun, isRunning: coordinator.isRunning }
  }

  return { beginRun: beginLocalRun, endRun: endLocalRun, isRunning: isLocalRunning }
}
