/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { store, useAppDispatch } from '@Pimcore/app/store'
import { type InternalNodeState, selectNodeState, setNodeExpanded, setNodeLoading, setNodePage, setNodeSearchTerm, setSelectedNodeIds, setNodeScrollTo, updateNodesByParentId, setNodeFetching, setNodeHasChildren } from '../element-tree-slice'
import { isUndefined } from 'lodash'
import { type DataTransformerReturnType, type DataTransformerSourceNode } from '../types/node-api-hook'
import { useNodeApiHook } from '../provider/node-api-hook-provider/use-node-api-hook'
import { useTreeId } from '@Pimcore/modules/element/tree/provider/tree-id-provider/use-tree-id'

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
    refreshChildren
  }
}
