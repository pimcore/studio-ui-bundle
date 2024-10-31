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

import { useContext } from 'react'
import {
  type IWorkflowContext,
  WorkflowContext
} from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider'
import {
  useWorkflowActionSubmitMutation, type WorkflowActionSubmitApiArg
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'

interface UseWorkflowHookReturn extends IWorkflowContext {
  submitWorkflowAction: (transition: string, actionType: ActionType, workFlowName: string, workFlowOptions: WorkflowOptions) => void
  submissionLoading: boolean
}

export type ActionType = 'transition' | 'global'

export interface WorkflowOptions {
  notes?: string
  additional?: {
    timeWorked: string
  }
}

export const useWorkflow = (): UseWorkflowHookReturn => {
  const { openModal, closeModal, isModalOpen, workflowDetails, setWorkflowDetails } = useContext(WorkflowContext)
  const [fetchSubmitWorkflowAction, { isLoading: submissionLoading }] = useWorkflowActionSubmitMutation()
  const { id } = useAsset()

  const toSnakeCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
  }
  const workFlowTransition = (transition: string, actionType: ActionType, workFlowName: string, workFlowOptions: WorkflowOptions): WorkflowActionSubmitApiArg => ({
    submitAction: {
      actionType,
      elementId: id,
      elementType: 'asset',
      workflowName: toSnakeCase(workFlowName),
      transition,
      workflowOptions: workFlowOptions
    }
  })

  const submitWorkflowAction = (transition: string, actionType: ActionType, workFlowName: string, workFlowOptions: WorkflowOptions): void => {
    fetchSubmitWorkflowAction(workFlowTransition(transition, actionType, workFlowName, workFlowOptions)).then(() => {
    }).catch((error) => { console.error(`Failed to submit workflow action ${error}`) })
  }

  return {
    submitWorkflowAction, openModal, closeModal, isModalOpen, workflowDetails, setWorkflowDetails, submissionLoading
  }
}
