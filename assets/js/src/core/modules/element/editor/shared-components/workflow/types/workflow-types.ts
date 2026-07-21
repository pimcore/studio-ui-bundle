/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty, isNil } from 'lodash'
import { type WorkflowDetails } from '../../../shared-tab-manager/tabs/workflow/workflow-api-slice.gen'

export type ActionType = 'transition' | 'global'

interface WorkflowAdditionalField {
  name: string
  fieldType: string
  title: string
  required?: boolean
  fieldTypeSettings?: Record<string, any>
}

interface WorkflowNotes {
  commentEnabled?: boolean
  commentRequired?: boolean
  commentPrefill?: string
  additionalFields?: WorkflowAdditionalField[]
}

export interface WorkflowAction {
  actionType: ActionType
  workflowId: string
  transitionId: string
  label: string
  notes?: WorkflowNotes
}

export interface WorkflowActionData {
  workflowOptions?: WorkflowOptions
}

export interface WorkflowOptions {
  notes?: string
  additional?: Record<string, any>
}

export type WorkflowActionsList = WorkflowAction[]

interface ActionItem {
  name: string
  label: string
  notes?: WorkflowNotes
}

const createWorkflowAction = (
  actionType: ActionType,
  workflowName: string,
  item: ActionItem
): WorkflowAction => ({
  actionType,
  workflowId: workflowName,
  transitionId: item.name,
  label: item.label,
  notes: isEmpty(item.notes) ? undefined : item.notes
})

export const getWorkflowActions = (workflow: WorkflowDetails): WorkflowActionsList => {
  const transitions: WorkflowAction[] = isNil(workflow.allowedTransitions)
    ? []
    : workflow.allowedTransitions.map((transition) =>
        createWorkflowAction('transition', workflow.workflowName, transition as ActionItem)
      )

  const globalActions: WorkflowAction[] = isNil(workflow.globalActions)
    ? []
    : workflow.globalActions.map((action) =>
        createWorkflowAction('global', workflow.workflowName, action as ActionItem)
      )

  return [...transitions, ...globalActions]
}
