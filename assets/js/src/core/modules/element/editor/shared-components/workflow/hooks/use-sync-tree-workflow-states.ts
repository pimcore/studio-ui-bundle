/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { useAppDispatch } from '@sdk/app'
import { setNodeWorkflowStates } from '@Pimcore/components/element-tree/element-tree-slice'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import type {
  WorkflowStatus
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen'

/**
 * Keeps the element's tree node in line with the states the editor shows, e.g. after a transition was applied.
 */
export const useSyncTreeWorkflowStates = (visibleStatuses: WorkflowStatus[] | undefined): void => {
  const dispatch = useAppDispatch()
  const { id, elementType } = useElementContext()
  const signature = visibleStatuses?.map((status) => `${status.title}:${status.color}:${status.label}`).join('|')

  useEffect(() => {
    if (visibleStatuses === undefined) {
      return
    }

    dispatch(setNodeWorkflowStates({
      nodeId: String(id),
      elementType,
      workflowStates: visibleStatuses.map(({ title, label, color }) => ({ title, label, color }))
    }))
  }, [id, elementType, signature])
}
