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

import React, { useState, createContext, useMemo } from 'react'

export interface IWorkflowContext {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const WorkflowContext = createContext<IWorkflowContext>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {}
})

export interface WorkFlowProviderProps {
  children: React.ReactNode
}

export const WorkFlowProvider = ({ children }: WorkFlowProviderProps): React.JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const openModal = (): void => { setModalOpen(true) }
  const closeModal = (): void => { setModalOpen(false) }

  return useMemo(() => (
    <WorkflowContext.Provider value={ { isModalOpen, openModal, closeModal } }>
      {children}
    </WorkflowContext.Provider>
  ), [isModalOpen, children])
}
