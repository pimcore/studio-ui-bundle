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

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@Pimcore/app/store'
import { isUndefined } from 'lodash'
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
}

type TreeNodesState = Record<string, InternalNodeState>

type TreesState = Record<string, TreeNodesState>

export const initialNodeState: InternalNodeState = {
  isExpanded: false,
  isFetching: false,
  page: 1,
  isSelected: false,
  isScrollTo: false,
  isFetchTriggered: false
}

const initialState: TreesState = {}

const initializeNodeState = (state: TreesState, treeId: string, nodeId: string): void => {
  if (isUndefined(state[treeId])) {
    state[treeId] = {}
  }
  if (isUndefined(state[treeId][nodeId])) {
    state[treeId][nodeId] = { ...initialNodeState }
  }
}

const slice = createSlice({
  name: 'trees',
  initialState,
  reducers: {
    setNodeLoading: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, loading: boolean }>
    ) => {
      initializeNodeState(state, payload.treeId, payload.nodeId)
      state[payload.treeId][payload.nodeId].isLoading = payload.loading
    },
    setFetchTriggered: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, fetchTriggered: boolean }>
    ) => {
      initializeNodeState(state, payload.treeId, payload.nodeId)
      state[payload.treeId][payload.nodeId].isFetchTriggered = payload.fetchTriggered
    },
    setNodeExpanded: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, expanded: boolean }>
    ) => {
      initializeNodeState(state, payload.treeId, payload.nodeId)
      state[payload.treeId][payload.nodeId].isExpanded = payload.expanded
    },
    setNodePage: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, page: number }>
    ) => {
      initializeNodeState(state, payload.treeId, payload.nodeId)
      if (state[payload.treeId][payload.nodeId].page !== payload.page) {
        state[payload.treeId][payload.nodeId].isFetchTriggered = false
      }
      state[payload.treeId][payload.nodeId].page = payload.page
    },
    setNodeSearchTerm: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, searchTerm: string }>
    ) => {
      initializeNodeState(state, payload.treeId, payload.nodeId)
      if (state[payload.treeId][payload.nodeId].searchTerm !== payload.searchTerm) {
        state[payload.treeId][payload.nodeId].isFetchTriggered = false
      }
      state[payload.treeId][payload.nodeId].searchTerm = payload.searchTerm
    },
    setSelectedNodeIds: (
      state,
      { payload }: PayloadAction<{ treeId: string, selectedNodeIds: string[] }>
    ) => {
      if (isUndefined(state[payload.treeId])) {
        state[payload.treeId] = {}
      }
      Object.keys(state[payload.treeId]).forEach(nodeId => {
        initializeNodeState(state, payload.treeId, nodeId)
        state[payload.treeId][nodeId].isSelected = payload.selectedNodeIds.includes(nodeId)
      })
      payload.selectedNodeIds.forEach(nodeId => {
        initializeNodeState(state, payload.treeId, nodeId)
        state[payload.treeId][nodeId].isSelected = true
      })
    },
    setNodeScrollTo: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, scrollTo: boolean }>
    ) => {
      initializeNodeState(state, payload.treeId, payload.nodeId)
      state[payload.treeId][payload.nodeId].isScrollTo = payload.scrollTo
    },
    updateNodesByParentId: (
      state,
      { payload }: PayloadAction<{ treeId: string, parentId: string, nodes: TreeNode[], total: number }>
    ) => {
      if (isUndefined(state[payload.treeId])) {
        state[payload.treeId] = {}
      }

      state[payload.treeId][payload.parentId] = {
        ...state[payload.treeId][payload.parentId],
        total: payload.total
      }
      const currentNodes = state[payload.treeId]

      // Create a set of new node IDs
      const newNodeIds = new Set(payload.nodes.map(node => String(node.id)))

      // Create a new state object without the removed nodes
      const updatedNodes = Object.keys(currentNodes).reduce<Record<string, any>>((acc, nodeId) => {
        if (currentNodes[nodeId].treeNodeProps?.parentId !== payload.parentId || newNodeIds.has(nodeId)) {
          acc[nodeId] = currentNodes[nodeId] // Keep the node if it's not being removed
        }
        return acc
      }, {})

      // Add or update the new nodes
      payload.nodes.forEach(node => {
        const nodeId = String(node.id)
        initializeNodeState(updatedNodes, payload.treeId, nodeId)
        updatedNodes[nodeId] = {
          ...updatedNodes[nodeId],
          treeNodeProps: node
        }
      })

      // Assign the new object to the state (triggers an immutable update)
      state[payload.treeId] = updatedNodes
    },
    locateInTree: (
      state,
      { payload }: PayloadAction<{ treeId: string, treeLevelData: TreeLevelData[] }>
    ) => {
      if (isUndefined(state[payload.treeId])) {
        state[payload.treeId] = {}
      }
      payload.treeLevelData.forEach(({ parentId, pageNumber }) => {
        if (isUndefined(parentId)) {
          return
        }
        initializeNodeState(state, payload.treeId, String(parentId))
        state[payload.treeId][parentId].isExpanded = true
        state[payload.treeId][parentId].page = pageNumber
        state[payload.treeId][parentId].searchTerm = undefined
      })
    },
    setNodeFetching: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, isFetching: boolean }>
    ) => {
      initializeNodeState(state, payload.treeId, payload.nodeId)
      state[payload.treeId][payload.nodeId].isFetching = payload.isFetching
    }
  }
})

export const treeSliceName = slice.name

injectSliceWithState(slice)

export const { setNodeLoading, setNodeExpanded, setNodePage, setNodeSearchTerm, setSelectedNodeIds, setNodeScrollTo, updateNodesByParentId, locateInTree, setFetchTriggered, setNodeFetching } = slice.actions

export const selectNodeState = (state: RootState, treeId: string, nodeId: string): InternalNodeState | undefined => state.trees[treeId]?.[nodeId]

export const selectNodesByParentId = (state: RootState, treeId: string, parentId: string): InternalNodeState[] => {
  const tree: Record<string, InternalNodeState> = state.trees[treeId] ?? {}
  const treeNodes: InternalNodeState[] = Object.values(tree)
  return treeNodes.filter((node: InternalNodeState) => String(node.treeNodeProps?.parentId) === parentId)
}
