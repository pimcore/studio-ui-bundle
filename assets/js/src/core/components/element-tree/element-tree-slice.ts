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
  page: number
  searchTerm?: string
}

type TreeNodesState = Record<string, InternalNodeState>

type TreesState = Record<string, TreeNodesState>

export const initialNodeState: InternalNodeState = {
  isLoading: false,
  page: 1
}

const initialState: TreesState = {}

const slice = createSlice({
  name: 'trees',
  initialState,
  reducers: {
    setNodeLoading: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, loading: boolean }>
    ) => {
      if (isUndefined(state[payload.treeId])) {
        state[payload.treeId] = {}
      }
      if (isUndefined(state[payload.treeId][payload.nodeId])) {
        state[payload.treeId][payload.nodeId] = { ...initialNodeState }
      }
      state[payload.treeId][payload.nodeId].isLoading = payload.loading
    },
    setNodeExpanded: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, expanded: boolean }>
    ) => {
      if (isUndefined(state[payload.treeId])) {
        state[payload.treeId] = {}
      }
      if (isUndefined(state[payload.treeId][payload.nodeId])) {
        state[payload.treeId][payload.nodeId] = { ...initialNodeState }
      }
      state[payload.treeId][payload.nodeId].isExpanded = payload.expanded
    },
    setNodePage: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, page: number }>
    ) => {
      if (isUndefined(state[payload.treeId])) {
        state[payload.treeId] = {}
      }
      if (isUndefined(state[payload.treeId][payload.nodeId])) {
        state[payload.treeId][payload.nodeId] = { ...initialNodeState }
      }
      state[payload.treeId][payload.nodeId].page = payload.page
    },
    setNodeSearchTerm: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, searchTerm: string }>
    ) => {
      if (isUndefined(state[payload.treeId])) {
        state[payload.treeId] = {}
      }
      if (isUndefined(state[payload.treeId][payload.nodeId])) {
        state[payload.treeId][payload.nodeId] = { ...initialNodeState }
      }
      state[payload.treeId][payload.nodeId].searchTerm = payload.searchTerm
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
        if (isUndefined(state[payload.treeId][parentId])) {
          state[payload.treeId][parentId] = { ...initialNodeState }
        }
        state[payload.treeId][parentId].isExpanded = true
        state[payload.treeId][parentId].page = pageNumber
      })
    }
  }
})

export const treeSliceName = slice.name

injectSliceWithState(slice)

export const { setNodeLoading, setNodeExpanded, setNodePage, setNodeSearchTerm, locateInTree } = slice.actions

export const selectNodeState = (state: RootState, treeId: string, nodeId: string): InternalNodeState | undefined => state.trees[treeId]?.[nodeId]
