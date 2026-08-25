/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useStore } from 'react-redux'
import { type RootState } from '@sdk/app'
import { useTreeId } from '@Pimcore/components/element-tree/provider/tree-id-provider/use-tree-id'
import { selectAncestorNodeIds, selectSelectedNodes, type TreeNode } from '../element-tree-slice'

export interface UseElementTreeOptionalReturn {
  /** Empty outside a tree. */
  getSelectedNodes: () => TreeNode[]
  getAncestorIds: (nodeId: string) => string[]
}

/**
 * Read only access to the tree selection for actions that also run outside a tree
 * - element editor context menus, for instance. Outside a tree it reports an empty
 * selection instead of throwing, and it deliberately avoids the node api hook that
 * useElementTree needs.
 */
export const useElementTreeOptional = (): UseElementTreeOptionalReturn => {
  const { treeId } = useTreeId(true)
  const store = useStore()

  const getSelectedNodes = (): TreeNode[] => {
    if (treeId === '') {
      return []
    }

    return selectSelectedNodes(store.getState() as RootState, treeId)
  }

  const getAncestorIds = (nodeId: string): string[] => {
    if (treeId === '') {
      return []
    }

    return selectAncestorNodeIds(store.getState() as RootState, treeId, nodeId)
  }

  return { getSelectedNodes, getAncestorIds }
}
