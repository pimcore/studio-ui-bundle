/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, uniq } from 'lodash'
import { useAppDispatch } from '@Pimcore/app/store'
import { eventBus, eventTypes } from '@Pimcore/lib/event-bus'
import { deselectNodes, markNodesDeleting, refreshSourceNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { useElementTreeOptional } from '@Pimcore/components/element-tree/hooks/use-element-tree-optional'
import { resolveActionTargets } from '@Pimcore/components/element-tree/utils/selection-targets'
import { toTopmostElements } from '@Pimcore/components/element-tree/utils/drop-target-validation'
import { type ElementPermissions } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { AssetBatchDeleteJob } from '@Pimcore/modules/execution-engine/jobs/batch-delete/asset-batch-delete-job'
import { DataObjectBatchDeleteJob } from '@Pimcore/modules/execution-engine/jobs/batch-delete/data-object-batch-delete-job'
import { useRecycleBin } from '@Pimcore/modules/recycle-bin/hooks/use-recycle-bin'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'
import { useBatchDeleteConfirm } from './use-batch-delete-confirm'

/** What deciding and executing a batch delete needs from a node. */
export interface DeletableNode {
  id: string | number
  parentId?: string | number | null
  permissions: ElementPermissions
  isLocked?: boolean
  fullPath?: string
}

export interface UseTreeBatchDeleteReturn {
  /** False for documents, which have no batch delete endpoint. */
  isSupported: boolean
  /** The nodes a delete triggered on this node would remove. */
  getDeletableNodes: (node: DeletableNode) => DeletableNode[]
  confirmDeleteNodes: (nodes: DeletableNode[]) => Promise<void>
}

/**
 * Deletes a tree selection in one job.
 *
 * Reuses the confirm dialog of the grid batch delete, which already checks per
 * item whether the recycle bin can hold it, and reports back into the tree
 * instead of into a grid.
 */
export const useTreeBatchDelete = (elementType: ElementType): UseTreeBatchDeleteReturn => {
  const dispatch = useAppDispatch()
  const executionEngine = useExecutionEngine()
  const { confirmBatchDelete } = useBatchDeleteConfirm()
  const { getSelectedNodes, getAncestorIds } = useElementTreeOptional()
  const { refreshRecycleBin } = useRecycleBin()
  const { isMainWidgetOpen, closeWidget } = useWidgetManager()

  const isSupported = elementType !== elementTypes.document

  const getDeletableNodes = (node: DeletableNode): DeletableNode[] => {
    const targets = resolveActionTargets<DeletableNode>(node, getSelectedNodes())

    const deletable = targets.filter(
      target => checkElementPermission(target.permissions, 'delete') && !(target.isLocked ?? false)
    )

    // A folder takes its children with it, so deleting a selected child as well
    // would only produce a failure for something that is already gone.
    return toTopmostElements(deletable, getAncestorIds)
  }

  const confirmDeleteNodes = async (nodes: DeletableNode[]): Promise<void> => {
    if (nodes.length === 0) {
      return
    }

    const itemIds = nodes.map(node => Number(node.id))

    // The dialog lists paths, which it reads the same way the grid does.
    const selectedRowsData = Object.fromEntries(
      nodes.map(node => [Number(node.id), { fullpath: node.fullPath }])
    )

    const parentIds = uniq(
      nodes
        .map(node => node.parentId)
        .filter(parentId => !isNil(parentId))
        .map(parentId => String(parentId))
    )

    await confirmBatchDelete({
      elementType,
      itemIds,
      selectedRowsData,
      onOk: async () => {
        const nodeIds = itemIds.map(id => String(id))

        dispatch(markNodesDeleting({ nodeIds, elementType, isDeleting: true }))

        // Deleted ids never come back, so they leave the selection right away.
        dispatch(deselectNodes({ nodeIds, elementType }))

        const onFinish = async (): Promise<void> => {
          // Refreshing the parents also clears the deleting marker of anything the
          // job could not remove, since a reloaded node comes back undeleted.
          parentIds.forEach(parentId => {
            dispatch(refreshSourceNode({ nodeId: parentId, elementType }))
          })

          itemIds.forEach(id => {
            eventBus.publish({
              identifier: { type: eventTypes['element:item:deleted'] },
              payload: { id, elementType }
            })

            const widgetId = getWidgetId(elementType, id)

            if (isMainWidgetOpen(widgetId)) {
              closeWidget(widgetId)
            }
          })

          refreshRecycleBin()
        }

        const job = elementType === elementTypes.asset
          ? new AssetBatchDeleteJob({ itemIds, onFinish })
          : new DataObjectBatchDeleteJob({ itemIds, onFinish })

        await executionEngine.runJob(job)
      }
    })
  }

  return { isSupported, getDeletableNodes, confirmDeleteNodes }
}
