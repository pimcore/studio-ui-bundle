/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useMemo } from 'react'
import { isUndefined } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { type TreeNodeWorkflowState, updateNodeData } from '@Pimcore/components/element-tree/element-tree-slice'
import { toTreeNodeWorkflowStates } from '@Pimcore/components/element-tree/utils/tree-node-workflow-states'
import {
  useWorkflowGetDetailsQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { isWorkflowAvailable } from '@Pimcore/modules/element/utils/workflow-availability'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { getVisibleWorkflowStatuses } from '../types/workflow-types'

const NO_WORKFLOW_STATES: TreeNodeWorkflowState[] = []

export const useSyncTreeWorkflowStates = (id: number, elementType: ElementType, enabled: boolean): void => {
  const dispatch = useAppDispatch()
  const { element } = useElementDraft(id, elementType)
  const hasWorkflow = isWorkflowAvailable(element, elementType)
  // a loaded element that lost its workflow keeps no dots; an element that is not loaded yet is left alone
  const hasLostWorkflow = enabled && element?.hasWorkflowAvailable === false
  const { data } = useWorkflowGetDetailsQuery(
    { elementType, elementId: id },
    { skip: !enabled || !hasWorkflow }
  )

  const workflowStates = useMemo(() => {
    if (hasLostWorkflow) {
      return NO_WORKFLOW_STATES
    }

    return isUndefined(data) ? undefined : toTreeNodeWorkflowStates(getVisibleWorkflowStatuses(data.items))
  }, [data, hasLostWorkflow])

  useEffect(() => {
    if (isUndefined(workflowStates)) {
      return
    }

    dispatch(updateNodeData({ nodeId: String(id), elementType, data: { workflowStates } }))
  }, [dispatch, id, elementType, workflowStates])
}
