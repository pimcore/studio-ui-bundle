/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, useState } from 'react'
import { type WorkflowAction, type WorkflowActionSubject } from '../types/workflow-types'
import { EditorWorkflowSubjectBridge } from './editor-workflow-subject-bridge'

export interface IWorkflowContext {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  triggeredWorkflowAction: WorkflowAction | null
  setTriggeredWorkflowAction: (details: WorkflowAction | null) => void
}

export const WorkflowContext = createContext<IWorkflowContext>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  triggeredWorkflowAction: null,
  setTriggeredWorkflowAction: () => {}
})

/**
 * The element the workflow action applies to. `null` until a subject provider (the editor bridge, or a
 * host passing the `subject` prop) sets it — see {@link WorkflowActionSubject}.
 */
export const WorkflowActionSubjectContext = createContext<WorkflowActionSubject | null>(null)

export const useWorkflowActionSubject = (): WorkflowActionSubject | null => useContext(WorkflowActionSubjectContext)

export interface WorkFlowProviderProps {
  children: React.ReactNode
  /**
   * The element to apply actions to. Omit inside the element editor — the provider then derives it from
   * the editor context (and refreshes the element on success). Pass it explicitly from any other host
   * (e.g. the Collab task detail) that is not an element editor.
   */
  subject?: WorkflowActionSubject
}

export const WorkFlowProvider = ({ children, subject }: WorkFlowProviderProps): React.JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [triggeredWorkflowAction, setTriggeredWorkflowAction] = useState<WorkflowAction | null>(null)

  const openModal = (): void => {
    setModalOpen(true)
  }
  const closeModal = (): void => {
    setModalOpen(false)
  }

  return useMemo(() => (
    <WorkflowContext.Provider value={ { isModalOpen, openModal, closeModal, triggeredWorkflowAction, setTriggeredWorkflowAction } }>
      {subject === undefined
        ? <EditorWorkflowSubjectBridge>{children}</EditorWorkflowSubjectBridge>
        : (
          <WorkflowActionSubjectContext.Provider value={ subject }>
            {children}
          </WorkflowActionSubjectContext.Provider>
          )}
    </WorkflowContext.Provider>
  ), [isModalOpen, children, triggeredWorkflowAction, subject])
}
