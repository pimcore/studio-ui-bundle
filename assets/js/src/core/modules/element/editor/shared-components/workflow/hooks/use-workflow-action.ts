/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WorkflowAction } from '../types/workflow-types'
import { useSubmitWorkflow } from './use-submit-workflow'
import { useWorkflow } from './use-workflow'

interface UseWorkflowActionReturn {
  triggerAction: (action: WorkflowAction) => void
  submissionLoading: boolean
}

export const useWorkflowAction = (): UseWorkflowActionReturn => {
  const { openModal, setTriggeredWorkflowAction } = useWorkflow()
  const { submitWorkflowAction, submissionLoading } = useSubmitWorkflow()

  const triggerAction = (action: WorkflowAction): void => {
    setTriggeredWorkflowAction(action)
    if (action.notes?.commentEnabled === true) {
      openModal()
    } else {
      submitWorkflowAction(action)
    }
  }

  return {
    triggerAction,
    submissionLoading
  }
}
