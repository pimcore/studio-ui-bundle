/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type RootState } from '@sdk/app'
import { useSelector } from 'react-redux'
import { useTreeId } from '@Pimcore/components/element-tree/provider/tree-id-provider/use-tree-id'
import {
  selectActiveNodeId,
  selectIsSelectionLimitReached,
  selectSelectedNodeIds,
  selectSelectionCount,
  treeSelectionLimit
} from '../element-tree-slice'
import { useElementTree } from './use-element-tree'

export interface UseTreeSelectionReturnType {
  selectedNodeIds: string[]
  count: number
  activeNodeId?: string
  /** True once a selection attempt exceeded the limit. */
  isLimitReached: boolean
  limit: number
  clear: () => void
  setSelectedIds: (selectedNodeIds: string[]) => void
}

/**
 * Tree wide view on the current selection, for anything that acts on the
 * selection as a whole rather than on a single node.
 */
export const useTreeSelection = (): UseTreeSelectionReturnType => {
  const { treeId } = useTreeId()
  const { clearSelection, setSelectedIds } = useElementTree()

  const selectedNodeIds = useSelector((state: RootState) => selectSelectedNodeIds(state, treeId))
  const count = useSelector((state: RootState) => selectSelectionCount(state, treeId))
  const activeNodeId = useSelector((state: RootState) => selectActiveNodeId(state, treeId))
  const isLimitReached = useSelector((state: RootState) => selectIsSelectionLimitReached(state, treeId))

  return {
    selectedNodeIds,
    count,
    activeNodeId,
    isLimitReached,
    limit: treeSelectionLimit,
    clear: clearSelection,
    setSelectedIds
  }
}
