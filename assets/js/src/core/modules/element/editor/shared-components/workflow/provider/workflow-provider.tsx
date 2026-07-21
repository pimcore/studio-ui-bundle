/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useState } from 'react'
import { type WorkflowAction } from '../types/workflow-types'

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

export interface WorkFlowProviderProps {
  children: React.ReactNode
}

export const WorkFlowProvider = ({ children }: WorkFlowProviderProps): React.JSX.Element => {
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
      {children}
    </WorkflowContext.Provider>
  ), [isModalOpen, children, triggeredWorkflowAction])
}
