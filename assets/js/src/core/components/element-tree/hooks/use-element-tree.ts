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
import { type InternalNodeState, selectNodeState, setNodeExpanded, setNodeLoading, setNodePage, setNodeSearchTerm, setSelectedNodeIds, setNodeScrollTo, updateNodesByParentId, setNodeFetching } from '../element-tree-slice'
import { isUndefined } from 'lodash'
import { type DataTransformerSourceNode } from '../types/node-api-hook'
import { useNodeApiHook } from '../provider/node-api-hook-provider/use-node-api-hook'

export type NodeState = InternalNodeState

export interface UseElementTreeReturnType {
  setLoading: (treeId: string, nodeId: string, loading: boolean) => void
  setFetching: (treeId: string, nodeId: string, isFetching: boolean) => void
  setExpanded: (treeId: string, nodeId: string, expanded: boolean) => void
  setPage: (treeId: string, nodeId: string, page: number) => void
  setSearchTerm: (treeId: string, nodeId: string, searchTerm?: string) => void
  setSelectedIds: (treeId: string, selectedNodeIds: string[]) => void
  setScrollTo: (treeId: string, nodeId: string, scrollTo: boolean) => void
  refreshChildren: (treeId: string, nodeId: string, forceLoading: boolean) => void
}

export const useElementTree = (): UseElementTreeReturnType => {
  const dispatch = useAppDispatch()
  const { nodeApiHook } = useNodeApiHook()
  const { fetchApiHookResult } = nodeApiHook()

  const getNodeState = (treeId: string, nodeId: string): NodeState => {
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

  const refreshChildren = (treeId: string, nodeId: string, forceLoading: boolean): void => {
    const nodeState = getNodeState(treeId, nodeId)
    if (nodeState?.isFetching) {
      return
    }

    if (forceLoading) {
      dispatch(updateNodesByParentId({ treeId, parentId: nodeId, nodes: [], total: 0 }))
    }

    if (isUndefined(nodeState?.isLoading) || forceLoading) {
      setLoading(treeId, nodeId, true)
    }
    setFetching(treeId, nodeId, true)

    const node: DataTransformerSourceNode = {
      id: nodeId,
      internalKey: nodeId
    }

    fetchApiHookResult(node, nodeState).then((apiHookResult) => {
      if (!isUndefined(apiHookResult)) {
        dispatch(updateNodesByParentId({ treeId, parentId: nodeId, nodes: apiHookResult.nodes, total: apiHookResult.total }))
      }
      setLoading(treeId, nodeId, false)
      setFetching(treeId, nodeId, false)
    }).catch((error) => { console.error(error) })
  }

  const setLoading = (treeId: string, nodeId: string, loading: boolean): void => {
    dispatch(setNodeLoading({ treeId, nodeId, loading }))
  }

  const setFetching = (treeId: string, nodeId: string, isFetching: boolean): void => {
    dispatch(setNodeFetching({ treeId, nodeId, isFetching }))
  }

  const setExpanded = (treeId: string, nodeId: string, expanded: boolean): void => {
    dispatch(setNodeExpanded({ treeId, nodeId, expanded }))
  }

  const setPage = (treeId: string, nodeId: string, page: number): void => {
    dispatch(setNodePage({ treeId, nodeId, page }))
  }

  const setSearchTerm = (treeId: string, nodeId: string, searchTerm: string): void => {
    dispatch(setNodeSearchTerm({ treeId, nodeId, searchTerm }))
  }

  const setSelectedIds = (treeId: string, selectedNodeIds: string[]): void => {
    dispatch(setSelectedNodeIds({ treeId, selectedNodeIds }))
  }

  const setScrollTo = (treeId: string, nodeId: string, scrollTo: boolean): void => {
    dispatch(setNodeScrollTo({ treeId, nodeId, scrollTo }))
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
