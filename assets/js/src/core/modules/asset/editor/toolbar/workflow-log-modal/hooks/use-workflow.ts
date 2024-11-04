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

import { useContext, useEffect } from 'react'
import {
  type IWorkflowContext,
  WorkflowContext
} from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { t } from 'i18next'
import _ from 'lodash'
import {
  type WorkflowActionSubmitApiArg
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen'

interface UseWorkflowHookReturn extends IWorkflowContext {
  submitWorkflowAction: (transition: string, actionType: ActionType, workFlowName: string, workFlowOptions: WorkflowOptions) => void
  submissionLoading: boolean
  submissionSuccess: boolean
}

export type ActionType = 'transition' | 'global'

export interface WorkflowOptions {
  notes?: string
  additional?: {
    timeWorked: string
  }
}

export const useWorkflow = (): UseWorkflowHookReturn => {
  const { openModal, closeModal, isModalOpen, workflowDetails, setWorkflowDetails, fetchSubmitWorkflowAction, submissionLoading, submissionSuccess } = useContext(WorkflowContext)
  const { id } = useAsset()
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

  const workFlowTransition = (transition: string, actionType: ActionType, workFlowName: string, workFlowOptions: WorkflowOptions): WorkflowActionSubmitApiArg => ({
    submitAction: {
      actionType,
      elementId: id,
      elementType: 'asset',
      workflowName: _.snakeCase(workFlowName),
      transition,
      workflowOptions: workFlowOptions
    }
  })

  const submitWorkflowAction = (transition: string, actionType: ActionType, workflowName: string, workFlowOptions: WorkflowOptions): void => {
    setWorkflowDetails({ transition, actionType, workflowName })
    fetchSubmitWorkflowAction(workFlowTransition(transition, actionType, workflowName, workFlowOptions)).then(() => {
    }).catch((error) => { console.error(`Failed to submit workflow action ${error}`) })
  }

  return {
    submitWorkflowAction, openModal, closeModal, isModalOpen, workflowDetails, setWorkflowDetails, fetchSubmitWorkflowAction, submissionLoading, submissionSuccess
  }
}
