/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  useWorkflowActionSubmitMutation, type WorkflowActionSubmitApiArg
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { t } from 'i18next'
import { type WorkflowAction, type WorkflowOptions } from '../types/workflow-types'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useAlertModal } from '@sdk/components'
import { useWorkflow } from './use-workflow'
import { useElementRefresh } from '@sdk/modules/element'
import { useLayoutSelection } from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection'

interface UseSubmitWorkflowReturn {
  submitWorkflowAction: (workflowAction: WorkflowAction, workflowOptions?: WorkflowOptions) => void
  submissionLoading: boolean
  submissionSuccess: boolean
  submissionError: boolean
}

export const useSubmitWorkflow = (): UseSubmitWorkflowReturn => {
  const { id: elementId, elementType } = useElementContext()
  const { refreshElement } = useElementRefresh(elementType)
  const { closeModal } = useWorkflow()
  const alertModal = useAlertModal()
  const messageApi = useMessage()
  const { setCurrentLayout } = useLayoutSelection()
  const [fetchSubmitWorkflowActionMutation, {
    isLoading: submissionLoading,
    isSuccess: submissionSuccess,
    isError: isSubmissionError
  }] = useWorkflowActionSubmitMutation(
  )

  const workFlowTransition = (workflowAction: WorkflowAction, workflowOptions: WorkflowOptions | undefined): WorkflowActionSubmitApiArg => {
    return ({
      submitAction: {
        actionType: workflowAction.actionType,
        elementId,
        elementType,
        workflowId: workflowAction.workflowId,
        transitionId: workflowAction.transitionId,
        workflowOptions: workflowOptions ?? {}
      }
    })
  }

  const submitWorkflowAction = (workflowAction: WorkflowAction, workflowOptions?: WorkflowOptions): void => {
    fetchSubmitWorkflowActionMutation(workFlowTransition(workflowAction, workflowOptions)).unwrap().then(() => {
      void messageApi.success({
        content: t('action-applied-successfully') + ': ' + t(workflowAction.label),
        type: 'success',
        duration: 3
      })
      if (elementType === 'data-object') {
        setCurrentLayout(null)
      }
      refreshElement(elementId)
      closeModal()
    }).catch((error) => {
      void alertModal.error({
        title: t('action-could-not-be-applied'),
        content: error.data?.message ?? undefined
      })
      closeModal()
    })
  }

  return {
    submitWorkflowAction,
    submissionLoading,
    submissionSuccess,
    submissionError: isSubmissionError
  }
}
