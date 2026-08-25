/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store, useAppDispatch } from '@Pimcore/app/store'
import { type InternalNodeState, selectActiveNodeId, selectAnchorNodeId, selectNodeState, selectSelectedNodeIds, selectSelectedNodes, type TreeNode, setActiveNodeId, setNodeExpanded, setNodeLoading, setNodePage, setNodeSearchTerm, setSelectedNodeIds, setNodeScrollTo, updateNodesByParentId, setNodeFetching, setNodeHasChildren, toggleNodeSelection, selectNodeRange, clearSelection as clearSelectionAction } from '../element-tree-slice'
import { isUndefined } from 'lodash'
import { type DataTransformerReturnType, type DataTransformerSourceNode } from '../types/node-api-hook'
import { useNodeApiHook } from '../provider/node-api-hook-provider/use-node-api-hook'
import { useTreeId } from '@Pimcore/components/element-tree/provider/tree-id-provider/use-tree-id'

export type NodeState = InternalNodeState

export interface UseElementTreeReturnType {
  setLoading: (nodeId: string, loading: boolean) => void
  setFetching: (nodeId: string, isFetching: boolean) => void
  setExpanded: (nodeId: string, expanded: boolean) => void
  setPage: (nodeId: string, page: number) => void
  setSearchTerm: (nodeId: string, searchTerm?: string) => void
  setSelectedIds: (selectedNodeIds: string[]) => void
  setScrollTo: (nodeId: string, scrollTo: boolean) => void
  refreshChildren: (nodeId: string, forceLoading: boolean) => void

  /** Adds the node to the selection or removes it, and makes it the range anchor. */
  toggleSelection: (nodeId: string) => void
  /** Replaces the selection with the given ids, or adds them when additive. */
  selectRange: (nodeIds: string[], additive?: boolean) => void
  clearSelection: () => void
  setActiveId: (nodeId: string) => void

  /**
   * Imperative readers for event handlers. Reading through the store instead of
   * a subscription keeps nodes from re-rendering whenever the selection changes.
   */
  getSelectedIds: () => string[]
  /** Node data of the selection; omits selected nodes that are not loaded. */
  getSelectedNodes: () => TreeNode[]
  getAnchorId: () => string | undefined
  getActiveId: () => string | undefined
}

export const useElementTree = (): UseElementTreeReturnType => {
  const dispatch = useAppDispatch()
  const { nodeApiHook } = useNodeApiHook()
  const { fetchChildren } = nodeApiHook()
  const { treeId } = useTreeId()

  const getNodeState = (nodeId: string): NodeState => {
    const nodeState = selectNodeState(store.getState(), treeId, nodeId)

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

    return resultNodeState
  }

  const doRefreshChildren = async (nodeId: string, forceLoading: boolean): Promise<DataTransformerReturnType | undefined> => {
    const nodeState = getNodeState(nodeId)

    if (forceLoading) {
      dispatch(updateNodesByParentId({ treeId, parentId: nodeId, nodes: [], total: 0 }))
    }

    if (isUndefined(nodeState?.isLoading) || forceLoading) {
      setLoading(nodeId, true)
    }
    setFetching(nodeId, true)

    const node: DataTransformerSourceNode = {
      id: nodeId,
      internalKey: nodeId
    }

    return await fetchChildren(node, nodeState)
  }

  const refreshChildren = (nodeId: string, forceLoading: boolean): void => {
    doRefreshChildren(nodeId, forceLoading)
      .then((apiHookResult) => {
        if (!isUndefined(apiHookResult)) {
          dispatch(updateNodesByParentId({ treeId, parentId: nodeId, nodes: apiHookResult.nodes, total: apiHookResult.total }))

          if (getNodeState(nodeId).page > 1 && apiHookResult.nodes.length === 0) {
            setPage(nodeId, 1)
          }
          if (getNodeState(nodeId).page === 1) {
            updateHasChildren(nodeId, apiHookResult.nodes.length > 0)
          }
        }
        setLoading(nodeId, false)
        setFetching(nodeId, false)
      }).catch((error) => { console.error(error) })
  }

  const setLoading = (nodeId: string, loading: boolean): void => {
    dispatch(setNodeLoading({ treeId, nodeId, loading }))
  }

  const setFetching = (nodeId: string, isFetching: boolean): void => {
    dispatch(setNodeFetching({ treeId, nodeId, isFetching }))
  }

  const setExpanded = (nodeId: string, expanded: boolean): void => {
    dispatch(setNodeExpanded({ treeId, nodeId, expanded }))
  }

  const setPage = (nodeId: string, page: number): void => {
    dispatch(setNodePage({ treeId, nodeId, page }))
  }

  const setSearchTerm = (nodeId: string, searchTerm: string): void => {
    dispatch(setNodeSearchTerm({ treeId, nodeId, searchTerm }))
  }

  const setSelectedIds = (selectedNodeIds: string[]): void => {
    dispatch(setSelectedNodeIds({ treeId, selectedNodeIds }))
  }

  const toggleSelection = (nodeId: string): void => {
    dispatch(toggleNodeSelection({ treeId, nodeId }))
  }

  const selectRange = (nodeIds: string[], additive: boolean = false): void => {
    dispatch(selectNodeRange({ treeId, nodeIds, additive }))
  }

  const clearSelection = (): void => {
    dispatch(clearSelectionAction({ treeId }))
  }

  const setActiveId = (nodeId: string): void => {
    dispatch(setActiveNodeId({ treeId, nodeId }))
  }

  const getSelectedIds = (): string[] => selectSelectedNodeIds(store.getState(), treeId)

  const getSelectedNodes = (): TreeNode[] => selectSelectedNodes(store.getState(), treeId)

  const getAnchorId = (): string | undefined => selectAnchorNodeId(store.getState(), treeId)

  const getActiveId = (): string | undefined => selectActiveNodeId(store.getState(), treeId)

  const setScrollTo = (nodeId: string, scrollTo: boolean): void => {
    dispatch(setNodeScrollTo({ treeId, nodeId, scrollTo }))
  }

  const updateHasChildren = (nodeId: string, hasChildren: boolean): void => {
    if (getNodeState(nodeId).treeNodeProps?.hasChildren !== hasChildren) {
      dispatch(setNodeHasChildren({ treeId, nodeId, hasChildren }))
    }
  }

  return {
    setLoading,
    setFetching,
    setExpanded,
    setPage,
    setSearchTerm,
    setSelectedIds,
    setScrollTo,
    refreshChildren,
    toggleSelection,
    selectRange,
    clearSelection,
    setActiveId,
    getSelectedIds,
    getSelectedNodes,
    getAnchorId,
    getActiveId
  }
}
