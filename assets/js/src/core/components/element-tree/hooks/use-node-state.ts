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
import { initialNodeState, type InternalNodeState, selectNodeState, setNodeExpanded, setNodeLoading, setNodePage, setNodeSearchTerm, setSelectedNodeIds } from '../element-tree-slice'
import { useContext } from 'react'
import { TreeContext } from '../element-tree'
import { useSelector } from 'react-redux'

export type NodeState = InternalNodeState & {
  isExpanded: boolean
}

export const useNodeState = (nodeId: string, initialState?: { isExpanded?: boolean }): NodeState & {
  isExpanded: boolean
  setLoading: (loading: boolean) => void
  setExpanded: (expanded: boolean) => void
  setPage: (page: number) => void
  setSearchTerm: (searchTerm?: string) => void
  setSelectedIds: (selectedNodeIds: string[]) => void
} => {
  const dispatch = useAppDispatch()
  const { treeId } = useContext(TreeContext)

  const nodeState = {
    ...initialNodeState,
    ...initialState,
    ...(useSelector((state: RootState) => selectNodeState(state, treeId, nodeId)) ?? {})
  }

  const setLoading = (loading: boolean): void => {
    dispatch(setNodeLoading({ treeId, nodeId, loading }))
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

  return {
    ...nodeState,
    isExpanded: nodeState.isExpanded ?? false,
    setLoading,
    setExpanded,
    setPage,
    setSearchTerm,
    setSelectedIds
  }
}
