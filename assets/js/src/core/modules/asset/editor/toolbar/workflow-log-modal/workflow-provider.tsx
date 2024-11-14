/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { createContext, useMemo, useState } from 'react'
import { type TransitionType } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'

export interface WorkflowDetails {
  workflowName: string
  action: string
  transition: TransitionType
}
export interface IWorkflowContext {
  isModalOpen: boolean
  openModal: (workflowDetails: WorkflowDetails) => void
  closeModal: () => void
  contextWorkflowDetails: WorkflowDetails | null
  setContextWorkflowDetails: (details: WorkflowDetails | null) => void
}

export const WorkflowContext = createContext<IWorkflowContext>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  contextWorkflowDetails: null,
  setContextWorkflowDetails: () => {}
})

export interface WorkFlowProviderProps {
  children: React.ReactNode
}

export const WorkFlowProvider = ({ children }: WorkFlowProviderProps): React.JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [contextWorkflowDetails, setContextWorkflowDetails] = useState<WorkflowDetails | null>(null)

  const openModal = (workflowDetails: WorkflowDetails): void => {
    setContextWorkflowDetails(workflowDetails)
    setModalOpen(true)
  }
  const closeModal = (): void => {
    setModalOpen(false)
  }

  return useMemo(() => (
    <WorkflowContext.Provider value={ { isModalOpen, openModal, closeModal, contextWorkflowDetails, setContextWorkflowDetails } }>
      {children}
    </WorkflowContext.Provider>
  ), [isModalOpen, children, contextWorkflowDetails])
}
