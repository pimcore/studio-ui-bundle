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
import { type InternalNodeState, selectNodeState, setFetchTriggered } from '../element-tree-slice'
import { useSelector } from 'react-redux'
import { useTreeId } from '@Pimcore/modules/element/tree/provider/tree-id-provider/use-tree-id'
import { useElementTree } from './use-element-tree'

export type NodeState = InternalNodeState

export const useElementTreeNode = (nodeId: string): NodeState & {
  isExpanded: boolean
  setLoading: (loading: boolean) => void
  setFetching: (isFetching: boolean) => void
  setExpanded: (expanded: boolean) => void
  setPage: (page: number) => void
  setSearchTerm: (searchTerm?: string) => void
  setSelectedIds: (selectedNodeIds: string[]) => void
  setScrollTo: (scrollTo: boolean) => void
  getChildren: () => string[]
} => {
  const dispatch = useAppDispatch()
  const { treeId } = useTreeId()
  const { refreshChildren, setLoading, setFetching, setExpanded, setPage, setSearchTerm, setSelectedIds, setScrollTo } = useElementTree()

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

  const getChildren = (): string[] => {
    if (!resultNodeState.isFetchTriggered && resultNodeState.isExpanded) {
      dispatch(setFetchTriggered({ treeId, nodeId, fetchTriggered: true }))
      refreshChildren(nodeId, false)
    }

    return resultNodeState.childrenIds ?? []
  }

  return {
    ...resultNodeState,
    setLoading: (loading: boolean) => { setLoading(nodeId, loading) },
    setFetching: (isFetching: boolean) => { setFetching(nodeId, isFetching) },
    setExpanded: (expanded: boolean) => { setExpanded(nodeId, expanded) },
    setPage: (page: number) => { setPage(nodeId, page) },
    setSearchTerm: (searchTerm: string) => { setSearchTerm(nodeId, searchTerm) },
    setSelectedIds: (selectedNodeIds: string[]) => { setSelectedIds(selectedNodeIds) },
    setScrollTo: (scrollTo: boolean) => { setScrollTo(nodeId, scrollTo) },
    getChildren
  }
}
