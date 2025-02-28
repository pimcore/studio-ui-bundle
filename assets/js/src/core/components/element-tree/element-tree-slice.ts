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

export interface InternalNodeState {
  isExpanded?: boolean
  isLoading: boolean
  isSelected: boolean
  isScrollTo: boolean
  page: number
  searchTerm?: string
}

type TreeNodesState = Record<string, InternalNodeState>

type TreesState = Record<string, TreeNodesState>

export const initialNodeState: InternalNodeState = {
  isLoading: false,
  page: 1,
  isSelected: false,
  isScrollTo: false
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
      state[payload.treeId][payload.nodeId].page = payload.page
    },
    setNodeSearchTerm: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, searchTerm: string }>
    ) => {
      initializeNodeState(state, payload.treeId, payload.nodeId)
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
    }
  }
})

export const treeSliceName = slice.name

injectSliceWithState(slice)

export const { setNodeLoading, setNodeExpanded, setNodePage, setNodeSearchTerm, setSelectedNodeIds, setNodeScrollTo, locateInTree } = slice.actions

export const selectNodeState = (state: RootState, treeId: string, nodeId: string): InternalNodeState | undefined => state.trees[treeId]?.[nodeId]
