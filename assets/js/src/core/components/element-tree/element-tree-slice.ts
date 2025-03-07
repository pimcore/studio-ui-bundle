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

/* eslint-disable max-lines */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@Pimcore/app/store'
import { isUndefined } from 'lodash'
import { createSelector } from 'reselect'
import { type TreeLevelData } from '@Pimcore/modules/element/element-api-slice.gen'
import { type ElementIcon } from 'src/sdk/main'
import { type ElementPermissions } from '@Pimcore/modules/element/element-api-slice-enhanced'

export interface TreeNode {
  id: string
  parentId?: string
  icon: ElementIcon
  label: string
  type?: string

  permissions: ElementPermissions
  isLocked: boolean
  hasChildren?: boolean
  metaData?: any

  internalKey: string
}

export interface InternalNodeState {
  isExpanded: boolean
  isLoading?: boolean
  isSelected: boolean
  isScrollTo: boolean
  isFetchTriggered: boolean
  isFetching: boolean
  page: number
  searchTerm?: string
  treeNodeProps?: TreeNode
  total?: number
  order?: number
}

type TreeNodesState = Record<string, InternalNodeState>

export interface LocateInTreeInfo {
  nodeId: string
  treeLevelData: TreeLevelData[]
}

interface TreeState {
  nodes: TreeNodesState
}

type TreesState = Record<string, TreeState>

export const initialNodeState: InternalNodeState = {
  isExpanded: false,
  isFetching: false,
  page: 1,
  isSelected: false,
  isScrollTo: false,
  isFetchTriggered: false
}

const initialTreeState: TreeState = {
  nodes: {}
}

const initialState: TreesState = {}

const initializeNodeState = (state: TreesState, treeId: string, nodeId: string): InternalNodeState => {
  if (isUndefined(state[treeId])) {
    state[treeId] = { ...initialTreeState }
  }
  if (isUndefined(state[treeId].nodes[nodeId])) {
    state[treeId] = {
      ...state[treeId],
      nodes: {
        ...state[treeId].nodes,
        [nodeId]: { ...initialNodeState }
      }
    }
  }
  return state[treeId].nodes[nodeId]
}

const updateNodeState = (
  state: TreesState,
  treeId: string,
  nodeId: string,
  updateFn: (node: InternalNodeState) => InternalNodeState
): void => {
  initializeNodeState(state, treeId, nodeId)
  state[treeId] = {
    ...state[treeId],
    nodes: {
      ...state[treeId].nodes,
      [nodeId]: updateFn(state[treeId].nodes[nodeId])
    }
  }
}

const removeDescendants = (nodes: TreeNodesState, parentId: string): TreeNodesState => {
  const descendants = Object.keys(nodes).filter(nodeId => nodes[nodeId].treeNodeProps?.parentId === parentId)
  let updatedNodes = { ...nodes }
  descendants.forEach(descendantId => {
    updatedNodes = removeDescendants(updatedNodes, descendantId)
    const { [descendantId]: _, ...rest } = updatedNodes
    updatedNodes = rest
  })
  return updatedNodes
}

const updateSelectedNodeIds = (state: TreesState, treeId: string, selectedNodeIds: string[]): void => {
  if (isUndefined(state[treeId])) {
    state[treeId] = { ...initialTreeState }
  }
  Object.keys(state[treeId].nodes).forEach(nodeId => {
    updateNodeState(state, treeId, nodeId, node => ({
      ...node,
      isSelected: selectedNodeIds.includes(nodeId)
    }))
  })
  selectedNodeIds.forEach(nodeId => {
    updateNodeState(state, treeId, nodeId, node => ({
      ...node,
      isSelected: true
    }))
  })
}

const slice = createSlice({
  name: 'trees',
  initialState,
  reducers: {
    setNodeLoading: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, loading: boolean }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => ({
        ...node,
        isLoading: payload.loading
      }))
    },
    setFetchTriggered: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, fetchTriggered: boolean }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => ({
        ...node,
        isFetchTriggered: payload.fetchTriggered
      }))
    },
    setNodeExpanded: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, expanded: boolean }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => ({
        ...node,
        isExpanded: payload.expanded
      }))
    },
    setNodePage: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, page: number }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => {
        const isFetchTriggered = node.page !== payload.page ? false : node.isFetchTriggered
        return {
          ...node,
          page: payload.page,
          isFetchTriggered
        }
      })
    },
    setNodeSearchTerm: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, searchTerm: string }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => {
        const isFetchTriggered = node.searchTerm !== payload.searchTerm ? false : node.isFetchTriggered
        return {
          ...node,
          searchTerm: payload.searchTerm,
          isFetchTriggered
        }
      })
    },
    setSelectedNodeIds: (
      state,
      { payload }: PayloadAction<{ treeId: string, selectedNodeIds: string[] }>
    ) => {
      updateSelectedNodeIds(state, payload.treeId, payload.selectedNodeIds)
    },
    setNodeScrollTo: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, scrollTo: boolean }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => ({
        ...node,
        isScrollTo: payload.scrollTo
      }))
    },
    updateNodesByParentId: (
      state,
      { payload }: PayloadAction<{ treeId: string, parentId: string, nodes: TreeNode[], total: number }>
    ) => {
      updateNodeState(state, payload.treeId, payload.parentId, node => ({
        ...node,
        total: payload.total
      }))

      const currentNodes = state[payload.treeId].nodes

      const updatedNodes = removeDescendants(currentNodes, payload.parentId)

      // Add or update the new nodes
      let order = 0
      payload.nodes.forEach(node => {
        const nodeId = String(node.id)
        updatedNodes[nodeId] = initializeNodeState(state, payload.treeId, nodeId)
        updatedNodes[nodeId] = {
          ...updatedNodes[nodeId],
          treeNodeProps: node,
          order: order++
        }
      })

      // Assign the new object to the state (triggers an immutable update)
      state[payload.treeId].nodes = updatedNodes
    },
    locateInTree: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, treeLevelData: TreeLevelData[] }>
    ) => {
      if (isUndefined(state[payload.treeId])) {
        state[payload.treeId] = { ...initialTreeState }
      }

      let hasParentChanged = false
      payload.treeLevelData.forEach(({ parentId, elementId, pageNumber }) => {
        if (isUndefined(parentId)) {
          return
        }

        const isParentIdCurrent = state[payload.treeId]?.nodes[String(elementId)]?.treeNodeProps?.parentId === String(parentId)
        if (hasParentChanged || !isParentIdCurrent) {
          hasParentChanged = true
          updateNodeState(state, payload.treeId, String(elementId), node => {
            return {
              ...node,
              treeNodeProps: undefined
            }
          })
        }

        updateNodeState(state, payload.treeId, String(parentId), node => {
          const isItemOnPage = node.page === pageNumber && isUndefined(node.searchTerm) && isParentIdCurrent

          return {
            ...node,
            isLoading: !isItemOnPage ? undefined : node.isLoading,
            isFetchTriggered: !isItemOnPage ? false : node.isFetchTriggered,
            isExpanded: true,
            page: pageNumber,
            searchTerm: undefined
          }
        })
      })

      updateNodeState(state, payload.treeId, payload.nodeId, node => ({
        ...node,
        isSelected: true,
        isScrollTo: true
      }))

      updateSelectedNodeIds(state, payload.treeId, [payload.nodeId])
    },
    setNodeFetching: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, isFetching: boolean }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => ({
        ...node,
        isFetching: payload.isFetching
      }))
    }
  }
})

export const treeSliceName = slice.name

injectSliceWithState(slice)

export const { setNodeLoading, setNodeExpanded, setNodePage, setNodeSearchTerm, setSelectedNodeIds, setNodeScrollTo, updateNodesByParentId, locateInTree, setFetchTriggered, setNodeFetching } = slice.actions

export const selectNodeState = createSelector(
  (state: RootState) => state.trees,
  (state: RootState, treeId: string) => treeId,
  (state: RootState, treeId: string, nodeId: string) => nodeId,
  (trees, treeId, nodeId) => trees[treeId]?.nodes[nodeId]
)

export const selectNodesByParentId = createSelector(
  (state: RootState) => state.trees,
  (state: RootState, treeId: string) => treeId,
  (state: RootState, treeId: string, parentId: string) => parentId,
  (trees, treeId, parentId) => {
    const tree: TreeNodesState = trees[treeId]?.nodes ?? {}
    const treeNodes: InternalNodeState[] = Object.values(tree)
    return treeNodes
      .filter((node: InternalNodeState) => String(node.treeNodeProps?.parentId) === parentId)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }
)

export const selectLocateInTree = createSelector(
  (state: RootState) => state.trees,
  (state: RootState, treeId: string) => treeId,
  (trees, treeId) => trees[treeId]?.locateInTree
)
