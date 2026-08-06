/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type RootState, useAppDispatch } from '@sdk/app'
import { type InternalNodeState, selectActiveNodeId, selectNodeState, setFetchTriggered } from '../element-tree-slice'
import { useSelector } from 'react-redux'
import { useTreeId } from '@Pimcore/components/element-tree/provider/tree-id-provider/use-tree-id'
import { useElementTree } from './use-element-tree'

export type NodeState = InternalNodeState

export const useElementTreeNode = (nodeId: string): NodeState & {
  isExpanded: boolean
  /** True for the node the editor follows, which is always one of the selected nodes. */
  isActive: boolean
  setLoading: (loading: boolean) => void
  setFetching: (isFetching: boolean) => void
  setExpanded: (expanded: boolean) => void
  setPage: (page: number) => void
  setSearchTerm: (searchTerm?: string) => void
  setSelectedIds: (selectedNodeIds: string[]) => void
  setScrollTo: (scrollTo: boolean) => void
  toggleSelection: () => void
  selectRange: (nodeIds: string[], additive?: boolean) => void
  clearSelection: () => void
  setActive: () => void
  getSelectedIds: () => string[]
  getAnchorId: () => string | undefined
  getChildren: () => string[]
} => {
  const dispatch = useAppDispatch()
  const { treeId } = useTreeId()
  const { refreshChildren, setLoading, setFetching, setExpanded, setPage, setSearchTerm, setSelectedIds, setScrollTo, toggleSelection, selectRange, clearSelection, setActiveId, getSelectedIds, getAnchorId } = useElementTree()

  const nodeState = useSelector((state: RootState) => selectNodeState(state, treeId, nodeId))

  // A boolean keeps the subscription cheap: only the two nodes whose active flag
  // flips actually re-render.
  const isActive = useSelector((state: RootState) => selectActiveNodeId(state, treeId) === nodeId)

  const resultInternalNodeState: InternalNodeState = nodeState ?? {
    isFetching: false,
    page: 1,
    isSelected: false,
    isScrollTo: false,
    isExpanded: false,
    isFetchTriggered: false
  }
  const resultNodeState: NodeState = {
    ...resultInternalNodeState,
    isExpanded: resultInternalNodeState.isExpanded,
    page: resultInternalNodeState.page ?? 1
  }

  const getChildren = (): string[] => {
    if (!resultNodeState.isFetchTriggered && resultNodeState.isExpanded) {
      dispatch(setFetchTriggered({ treeId, nodeId, fetchTriggered: true }))
      refreshChildren(nodeId, false)
    }

    return resultNodeState.childrenIds ?? []
  }

  return {
    ...resultNodeState,
    isActive,
    setLoading: (loading: boolean) => { setLoading(nodeId, loading) },
    setFetching: (isFetching: boolean) => { setFetching(nodeId, isFetching) },
    setExpanded: (expanded: boolean) => { setExpanded(nodeId, expanded) },
    setPage: (page: number) => { setPage(nodeId, page) },
    setSearchTerm: (searchTerm: string) => { setSearchTerm(nodeId, searchTerm) },
    setSelectedIds: (selectedNodeIds: string[]) => { setSelectedIds(selectedNodeIds) },
    setScrollTo: (scrollTo: boolean) => { setScrollTo(nodeId, scrollTo) },
    toggleSelection: () => { toggleSelection(nodeId) },
    selectRange: (nodeIds: string[], additive?: boolean) => { selectRange(nodeIds, additive) },
    clearSelection: () => { clearSelection() },
    setActive: () => { setActiveId(nodeId) },
    getSelectedIds,
    getAnchorId,
    getChildren
  }
}
