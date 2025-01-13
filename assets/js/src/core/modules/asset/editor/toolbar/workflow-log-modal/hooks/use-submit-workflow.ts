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

import {
  useWorkflowActionSubmitMutation, type WorkflowActionSubmitApiArg
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { t } from 'i18next'
import _ from 'lodash'
import {
  type TransitionType,
  useWorkflow
} from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

interface UseSubmitWorkflowReturn {
  submitWorkflowAction: (actionType: string, transition: TransitionType, workFlowName: string, workFlowOptions: WorkflowOptions) => void
  submissionLoading: boolean
  submissionSuccess: boolean
  submissionError: boolean
}

export interface WorkflowOptions {
  notes?: string
  additional?: {
    timeWorked: string
  }
}

export const useSubmitWorkflow = (workflowName: string): UseSubmitWorkflowReturn => {
  const { id, elementType } = useElementContext()
  const messageApi = useMessage()
  const { setContextWorkflowDetails } = useWorkflow()
  const [fetchSubmitWorkflowActionMutation, {
    isLoading: submissionLoading,
    isSuccess: submissionSuccess,
    isError: submissionError
  }] = useWorkflowActionSubmitMutation(
    { fixedCacheKey: `shared-submit-workflow-action-${workflowName}` }
  )
  const workFlowTransition = (transition: TransitionType, actionType: string, workFlowName: string, workFlowOptions: WorkflowOptions): WorkflowActionSubmitApiArg => {
    const workflowId = _.snakeCase(workFlowName)
    const transitionId = _.snakeCase(transition)

    return ({
      submitAction: {
        actionType,
        elementId: id,
        elementType,
        workflowId,
        transitionId,
        workflowOptions: workFlowOptions
      }
    })
  }

  const submitWorkflowAction = (transition: TransitionType, actionType: string, workflowName: string, workFlowOptions: WorkflowOptions): void => {
    setContextWorkflowDetails({ transition, action: actionType, workflowName })

    fetchSubmitWorkflowActionMutation(workFlowTransition(transition, actionType, workflowName, workFlowOptions)).unwrap().then((response) => {
      if ('data' in response) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        messageApi.success({
          content: t('action-applied-successfully') + ': ' + t(`${workflowName}`),
          type: 'success',
          duration: 3
        })
      } else if ('error' in response) {
        throw new Error(JSON.stringify(response.error))
      }
    }).catch((error) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error({
        content: t('action-could-not-be-applied') + ': ' + t(`${workflowName}`),
        type: 'error',
        duration: 3
      })
      console.error(`Failed to submit workflow action ${error}`)
    })
  }

  return {
    submitWorkflowAction,
    submissionLoading,
    submissionSuccess,
    submissionError
  }
}
