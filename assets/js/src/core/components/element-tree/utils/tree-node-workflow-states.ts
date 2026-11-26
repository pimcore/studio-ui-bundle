/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import { type TreeNodeWorkflowState } from '../element-tree-slice'

interface WorkflowStateSource {
  title: string
  label: string
  color: string
}

export const toTreeNodeWorkflowStates = (
  workflowStates: WorkflowStateSource[] | null | undefined
): TreeNodeWorkflowState[] | undefined => {
  if (isNil(workflowStates)) {
    return undefined
  }

  return workflowStates.map(({ title, label, color }) => ({ title, label, color }))
}
