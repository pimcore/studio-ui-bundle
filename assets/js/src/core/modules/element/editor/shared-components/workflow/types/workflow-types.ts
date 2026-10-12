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

/**
 * What to do with unsaved changes when a transition is applied, as configured
 * per transition (`options.unsavedChangesBehaviour`): save them first, warn
 * that they will be lost, or ignore them.
 */
export type UnsavedChangesBehaviour = 'save' | 'warn' | 'ignore'

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
  unsavedChangesBehaviour?: UnsavedChangesBehaviour
}

export interface WorkflowActionData {
  workflowOptions?: WorkflowOptions
}

/**
 * The element a workflow action is applied to, plus an optional success side-effect. Supplied via the
 * WorkflowActionSubjectContext so the submit/modal flow is not bound to the element editor: the editor
 * provides it from its element context (with refresh + layout reset as onApplied); other hosts (e.g. the
 * Collab task detail) provide their own element and refetch.
 */
export interface WorkflowActionSubject {
  elementId: number
  elementType: string
  onApplied?: (action: WorkflowAction) => void
  /**
   * Runs before an action is submitted; resolving to false cancels it. The editor uses it to apply
   * the transition's unsavedChangesBehaviour.
   */
  beforeSubmit?: (action: WorkflowAction) => Promise<boolean>
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
  unsavedChangesBehaviour?: string
}

const isUnsavedChangesBehaviour = (value: string | undefined): value is UnsavedChangesBehaviour =>
  value === 'save' || value === 'warn' || value === 'ignore'

const createWorkflowAction = (
  actionType: ActionType,
  workflowName: string,
  item: ActionItem
): WorkflowAction => ({
  actionType,
  workflowId: workflowName,
  transitionId: item.name,
  label: item.label,
  notes: isEmpty(item.notes) ? undefined : item.notes,
  unsavedChangesBehaviour: isUnsavedChangesBehaviour(item.unsavedChangesBehaviour) ? item.unsavedChangesBehaviour : undefined
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
