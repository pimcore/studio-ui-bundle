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

import { type RootState, useAppDispatch } from '@Pimcore/app/store'
import { type InternalNodeState, selectNodeState, setNodeExpanded, setNodeLoading, setNodePage, setNodeSearchTerm, setSelectedNodeIds, setNodeScrollTo, selectNodesByParentId, type TreeNode, setFetchTriggered, updateNodesByParentId, setNodeFetching } from '../element-tree-slice'
import { useSelector } from 'react-redux'
import { useTreeId } from '@Pimcore/modules/element/tree/provider/tree-id-provider/use-tree-id'
import { isUndefined } from 'lodash'
import { type NodeApiHook } from '../types/node-api-hook'
import { useContext } from 'react'
import { TreeContext } from '../element-tree'

export type NodeState = InternalNodeState & {
  isExpanded: boolean
}

export const useElementTree = (nodeId: string, nodeApiHookArg?: NodeApiHook): NodeState & {
  isExpanded: boolean
  setLoading: (loading: boolean) => void
  setFetching: (isFetching: boolean) => void
  setExpanded: (expanded: boolean) => void
  setPage: (page: number) => void
  setSearchTerm: (searchTerm?: string) => void
  setSelectedIds: (selectedNodeIds: string[]) => void
  setScrollTo: (scrollTo: boolean) => void
  refreshChildren: () => void
  getChildren: () => TreeNode[]
} => {
  const dispatch = useAppDispatch()
  const { treeId } = useTreeId()
  const { nodeApiHook } = useContext(TreeContext)
  const usedNodeApiHook = nodeApiHookArg ?? nodeApiHook

  const { fetchApiHookResult } = usedNodeApiHook({
    id: nodeId,
    internalKey: nodeId
  })
  const nodeState = useSelector((state: RootState) => selectNodeState(state, treeId, nodeId))

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

  const refreshChildren = (): void => {
    dispatch(setFetchTriggered({ treeId, nodeId, fetchTriggered: true }))

    if (isUndefined(usedNodeApiHook)) {
      throw new Error('nodeApiHook is required to refresh children')
    }
    if (nodeState?.isFetching === true) {
      return
    }

    if (isUndefined(nodeState?.isLoading)) {
      setLoading(true)
    }
    setFetching(true)

    fetchApiHookResult(resultNodeState).then((apiHookResult) => {
      if (!isUndefined(apiHookResult)) {
        dispatch(updateNodesByParentId({ treeId, parentId: nodeId, nodes: apiHookResult.nodes, total: apiHookResult.total }))
      }
      setLoading(false)
      setFetching(false)
    }).catch((error) => { console.error(error) })
  }

  const setLoading = (loading: boolean): void => {
    dispatch(setNodeLoading({ treeId, nodeId, loading }))
  }

  const setFetching = (isFetching: boolean): void => {
    dispatch(setNodeFetching({ treeId, nodeId, isFetching }))
  }

  const setExpanded = (expanded: boolean): void => {
    dispatch(setNodeExpanded({ treeId, nodeId, expanded }))
  }

  const setPage = (page: number): void => {
    dispatch(setNodePage({ treeId, nodeId, page }))
  }

  const setSearchTerm = (searchTerm: string): void => {
    dispatch(setNodeSearchTerm({ treeId, nodeId, searchTerm }))
  }

  const setSelectedIds = (selectedNodeIds: string[]): void => {
    dispatch(setSelectedNodeIds({ treeId, selectedNodeIds }))
  }

  const setScrollTo = (scrollTo: boolean): void => {
    dispatch(setNodeScrollTo({ treeId, nodeId, scrollTo }))
  }

  const internalNodes = useSelector((state: RootState) => selectNodesByParentId(state, treeId, nodeId))
  const getChildren = (): TreeNode[] => {
    if (!resultNodeState.isFetchTriggered && resultNodeState.isExpanded) {
      refreshChildren()
    }
    const children: TreeNode[] = []
    internalNodes.forEach((node) => {
      if (node.treeNodeProps !== undefined) {
        children.push(node.treeNodeProps)
      }
    })

    return children
  }

  return {
    ...resultNodeState,
    setLoading,
    setFetching,
    setExpanded,
    setPage,
    setSearchTerm,
    setSelectedIds,
    setScrollTo,
    refreshChildren,
    getChildren
  }
}
