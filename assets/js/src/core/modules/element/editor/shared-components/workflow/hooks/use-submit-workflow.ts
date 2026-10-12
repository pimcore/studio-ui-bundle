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
import { type WorkflowAction, type WorkflowActionSubject, type WorkflowOptions } from '../types/workflow-types'
import { useAlertModal } from '@sdk/components'
import { useWorkflowModalState } from './use-workflow-modal-state'
import { useWorkflowActionSubject } from '../provider/workflow-provider'
import { useWorkflowRunLock } from '../provider/workflow-editor-coordinator'

interface UseSubmitWorkflowReturn {
  submitWorkflowAction: (workflowAction: WorkflowAction, workflowOptions?: WorkflowOptions) => void
  submissionLoading: boolean
  submissionSuccess: boolean
  submissionError: boolean
}

/**
 * Fires a workflow transition/global action against the element supplied by the
 * WorkflowActionSubjectContext (the editor bridge in an editor, or an explicit `subject` elsewhere).
 * The success side-effect — refreshing the element, resetting a data-object layout — is owned by that
 * subject's `onApplied`, so this hook is not bound to the element editor.
 */
export const useSubmitWorkflow = (): UseSubmitWorkflowReturn => {
  const subject = useWorkflowActionSubject()
  const { closeModal } = useWorkflowModalState()
  const alertModal = useAlertModal()
  const messageApi = useMessage()
  // One run (guard plus submit) at a time per editor: the lock is shared by every workflow control
  // of the editor — toolbar menu, workflow tab cards, comment modal — so while the unsaved-changes
  // guard saves or asks, or the action is being submitted, no control can start another one.
  const { beginRun, endRun, isRunning } = useWorkflowRunLock()
  const [fetchSubmitWorkflowActionMutation, {
    isLoading: isSubmitting,
    isSuccess: submissionSuccess,
    isError: isSubmissionError
  }] = useWorkflowActionSubmitMutation(
  )

  const workFlowTransition = (workflowAction: WorkflowAction, workflowOptions: WorkflowOptions | undefined): WorkflowActionSubmitApiArg => {
    return ({
      submitAction: {
        actionType: workflowAction.actionType,
        elementId: subject?.elementId ?? 0,
        elementType: subject?.elementType ?? '',
        workflowId: workflowAction.workflowId,
        transitionId: workflowAction.transitionId,
        workflowOptions: workflowOptions ?? {}
      }
    })
  }

  const submitWorkflowAction = (workflowAction: WorkflowAction, workflowOptions?: WorkflowOptions): void => {
    if (subject === null) {
      return
    }

    if (!beginRun()) {
      return
    }

    const run = async (): Promise<void> => {
      const proceed = subject.beforeSubmit === undefined || await subject.beforeSubmit(workflowAction)

      if (!proceed) {
        closeModal()
        return
      }

      await submit(subject, workflowAction, workflowOptions)
    }

    run().catch((error) => {
      console.error(error)
      closeModal()
    }).finally(() => {
      endRun()
    })
  }

  const submit = async (subject: WorkflowActionSubject, workflowAction: WorkflowAction, workflowOptions?: WorkflowOptions): Promise<void> => {
    await fetchSubmitWorkflowActionMutation(workFlowTransition(workflowAction, workflowOptions)).unwrap().then(() => {
      void messageApi.success({
        content: t('action-applied-successfully') + ': ' + t(workflowAction.label),
        type: 'success',
        duration: 3
      })
      subject.onApplied?.(workflowAction)
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
    submissionLoading: isRunning || isSubmitting,
    submissionSuccess,
    submissionError: isSubmissionError
  }
}
