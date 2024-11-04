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

import React, { useState, createContext, useMemo, useEffect } from 'react'
import { type ActionType } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'
import {
  useWorkflowActionSubmitMutation, type WorkflowActionSubmitApiArg
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { t } from 'i18next'

export interface WorkflowDetails {
  workflowName: string
  transition: string
  actionType: ActionType
}
export interface IWorkflowContext {
  isModalOpen: boolean
  openModal: (workflowDetails: WorkflowDetails) => void
  closeModal: () => void
  workflowDetails: WorkflowDetails | null
  setWorkflowDetails: (details: WorkflowDetails | null) => void
  fetchSubmitWorkflowAction: (args: WorkflowActionSubmitApiArg) => Promise<any>
  submissionLoading: boolean
}

export const WorkflowContext = createContext<IWorkflowContext>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  workflowDetails: null,
  setWorkflowDetails: () => {},
  fetchSubmitWorkflowAction: async () => { await Promise.resolve() },
  submissionLoading: false
})

export interface WorkFlowProviderProps {
  children: React.ReactNode
}

export const WorkFlowProvider = ({ children }: WorkFlowProviderProps): React.JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [workflowDetails, setWorkflowDetails] = useState<WorkflowDetails | null>(null)
  const [fetchSubmitWorkflowAction, { isLoading: submissionLoading, isSuccess: submissionSuccess }] = useWorkflowActionSubmitMutation({
    fixedCacheKey: 'shared-submit-workflow-action'
  })

  const openModal = (workflowDetails: WorkflowDetails): void => {
    setWorkflowDetails(workflowDetails)
    setModalOpen(true)
  }
  const closeModal = (): void => {
    setModalOpen(false)
  }

  const messageApi = useMessage()

  useEffect(() => {
    if (submissionSuccess && workflowDetails !== null) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.success({
        content: t('action-applied-successfully') + ': ' + t(`workflow-transitions.${workflowDetails?.transition}`),
        type: 'success',
        duration: 3
      })
      setWorkflowDetails(null)
    }
  }
  , [submissionSuccess, submissionLoading])

  return useMemo(() => (
    <WorkflowContext.Provider value={ { isModalOpen, openModal, closeModal, workflowDetails, setWorkflowDetails, fetchSubmitWorkflowAction, submissionLoading } }>
      {children}

    </WorkflowContext.Provider>
  ), [isModalOpen, children, workflowDetails, fetchSubmitWorkflowAction, submissionLoading])
}
