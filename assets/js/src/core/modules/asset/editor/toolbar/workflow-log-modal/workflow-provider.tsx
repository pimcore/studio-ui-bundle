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
  showWorkflowLogModal: boolean
  setShowWorkflowLogModal: (showWorkflowLog: boolean) => void
}

export const WorkflowContext = createContext<IWorkflowContext>({
  showWorkflowLogModal: false,
  setShowWorkflowLogModal: () => {}
})

export interface WorkFlowProviderProps {
  children: React.ReactNode
}

export const WorkFlowProvider = ({ children }: WorkFlowProviderProps): React.JSX.Element => {
  const [showWorkflowLogModal, setShowWorkflowLogModal] = useState<boolean>(false)

  return useMemo(() => (
    <WorkflowContext.Provider value={ { showWorkflowLogModal, setShowWorkflowLogModal } }>
      {children}
    </WorkflowContext.Provider>
  ), [showWorkflowLogModal, children])
}
