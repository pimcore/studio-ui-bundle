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
import { updateNodeData } from '@Pimcore/components/element-tree/element-tree-slice'
import { toTreeNodeWorkflowStates } from '@Pimcore/components/element-tree/utils/tree-node-workflow-states'
import {
  useWorkflowGetDetailsQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { isWorkflowAvailable } from '@Pimcore/modules/element/utils/workflow-availability'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { getVisibleWorkflowStatuses } from '../types/workflow-types'

export const useSyncTreeWorkflowStates = (id: number, elementType: ElementType, enabled: boolean): void => {
  const dispatch = useAppDispatch()
  const { element } = useElementDraft(id, elementType)
  const { data } = useWorkflowGetDetailsQuery(
    { elementType, elementId: id },
    { skip: !enabled || !isWorkflowAvailable(element, elementType) }
  )

  const workflowStates = useMemo(
    () => isUndefined(data) ? undefined : toTreeNodeWorkflowStates(getVisibleWorkflowStatuses(data.items)),
    [data]
  )

  useEffect(() => {
    if (isUndefined(workflowStates)) {
      return
    }

    dispatch(updateNodeData({ nodeId: String(id), elementType, data: { workflowStates } }))
  }, [dispatch, id, elementType, workflowStates])
}
