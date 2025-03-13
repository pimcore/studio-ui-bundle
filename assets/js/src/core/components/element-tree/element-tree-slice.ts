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
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface TreeNode {
  id: string
  elementType?: ElementType
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
  isDeleting: boolean
  page: number
  searchTerm?: string
  treeNodeProps?: TreeNode
  total?: number
  order?: number
  isRoot?: boolean
  isRootFetchTriggered?: boolean
}

type TreeNodesState = Record<string, InternalNodeState>

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
  isFetchTriggered: false,
  isDeleting: false
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

const getDescendants = (nodes: TreeNodesState, parentId: string, recursive: boolean = false): string[] => {
  const descendants = Object.keys(nodes).filter(nodeId => nodes[nodeId].treeNodeProps?.parentId === parentId)
  let allDescendants = [...descendants]
  if (recursive) {
    descendants.forEach(descendantId => {
      allDescendants = [...allDescendants, ...getDescendants(nodes, descendantId, true)]
    })
  }
  return allDescendants
}

const removeDescendants = (nodes: TreeNodesState, parentId: string, keepBasicStates: boolean = false): TreeNodesState => {
  const descendants = getDescendants(nodes, parentId, !keepBasicStates)
  const result: TreeNodesState = {}
  Object.keys(nodes).forEach(nodeId => {
    if (!descendants.includes(nodeId)) {
      result[nodeId] = nodes[nodeId]
    } else if (keepBasicStates) {
      result[nodeId] = {
        ...nodes[nodeId],
        treeNodeProps: undefined
      }
    }
  })
  return result
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
    setRootFetchTriggered: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, rootFetchTriggered: boolean }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => ({
        ...node,
        isRootFetchTriggered: payload.rootFetchTriggered
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
    setNodeHasChildren: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, hasChildren: boolean }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => ({
        ...node,
        treeNodeProps: !isUndefined(node.treeNodeProps)
          ? {
              ...node.treeNodeProps,
              hasChildren: payload.hasChildren
            }
          : undefined
      }))
    },
    setNodePage: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, page: number }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => {
        const isFetchTriggered = node.page !== payload.page ? false : node.isFetchTriggered
        const isLoading = node.page !== payload.page ? undefined : node.isLoading
        return {
          ...node,
          page: payload.page,
          isFetchTriggered,
          isLoading
        }
      })
    },
    setNodeSearchTerm: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, searchTerm: string }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => {
        const isFetchTriggered = node.searchTerm !== payload.searchTerm ? false : node.isFetchTriggered
        const isLoading = node.searchTerm !== payload.searchTerm ? undefined : node.isLoading
        return {
          ...node,
          searchTerm: payload.searchTerm,
          isFetchTriggered,
          isLoading
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

      const updatedNodes = removeDescendants(currentNodes, payload.parentId, true)

      // Add or update the new nodes
      let order = 0
      payload.nodes.forEach(node => {
        const nodeId = String(node.id)
        updatedNodes[nodeId] = initializeNodeState(state, payload.treeId, nodeId)
        updatedNodes[nodeId] = {
          ...updatedNodes[nodeId],
          isDeleting: false,
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
    },
    refreshNodeChildren: (
      state,
      { payload }: PayloadAction<{ nodeId: string, elementType: ElementType }>
    ) => {
      Object.keys(state).forEach(treeId => {
        if (state[treeId].nodes[payload.nodeId]?.treeNodeProps?.elementType === payload.elementType) {
          updateNodeState(state, treeId, payload.nodeId, node => ({
            ...node,
            isLoading: undefined,
            isExpanded: true,
            isFetchTriggered: false
          }))

          state[treeId].nodes = removeDescendants(state[treeId].nodes, payload.nodeId)
        }
      })
    },
    renameNode: (
      state,
      { payload }: PayloadAction<{ nodeId: string, elementType: ElementType, newLabel: string }>
    ) => {
      Object.keys(state).forEach(treeId => {
        if (state[treeId].nodes[payload.nodeId]?.treeNodeProps?.elementType === payload.elementType) {
          updateNodeState(state, treeId, payload.nodeId, node => ({
            ...node,
            treeNodeProps: !isUndefined(node.treeNodeProps)
              ? {
                  ...node.treeNodeProps,
                  label: payload.newLabel
                }
              : undefined
          }))
        }
      })
    },

    refreshTargetNode: (
      state,
      { payload }: PayloadAction<{ nodeId: string, elementType: ElementType }>
    ) => {
      Object.keys(state).forEach(treeId => {
        if (state[treeId].nodes[payload.nodeId]?.treeNodeProps?.elementType === payload.elementType) {
          updateNodeState(state, treeId, payload.nodeId, node => ({
            ...node,
            isExpanded: true,
            isFetchTriggered: false,
            treeNodeProps: !isUndefined(node.treeNodeProps)
              ? {
                  ...node.treeNodeProps,
                  hasChildren: true
                }
              : undefined
          }))

          // state[treeId].nodes = removeDescendants(state[treeId].nodes, payload.nodeId)
        }
      })
    },
    refreshSourceNode: (
      state,
      { payload }: PayloadAction<{ nodeId: string, elementType: ElementType }>
    ) => {
      Object.keys(state).forEach(treeId => {
        if (state[treeId].nodes[payload.nodeId]?.treeNodeProps?.elementType === payload.elementType) {
          updateNodeState(state, treeId, payload.nodeId, node => ({
            ...node,
            isFetchTriggered: false
          }))
        }
      })
    },
    markNodeDeleting: (
      state,
      { payload }: PayloadAction<{ nodeId: string, elementType: ElementType, isDeleting: boolean }>
    ) => {
      Object.keys(state).forEach(treeId => {
        if (state[treeId].nodes[payload.nodeId]?.treeNodeProps?.elementType === payload.elementType) {
          updateNodeState(state, treeId, payload.nodeId, node => ({
            ...node,
            isDeleting: payload.isDeleting
          }))
        }
      })
    },
    setRootNode: (
      state,
      { payload }: PayloadAction<{ treeId: string, nodeId: string, rootNode: TreeNode }>
    ) => {
      updateNodeState(state, payload.treeId, payload.nodeId, node => ({
        ...node,
        treeNodeProps: payload.rootNode,
        isExpanded: true,
        isRoot: true
      }))
    }
  }
})

export const treeSliceName = slice.name

injectSliceWithState(slice)

export const { setNodeLoading, setNodeExpanded, setNodeHasChildren, setNodePage, setNodeSearchTerm, setSelectedNodeIds, setNodeScrollTo, updateNodesByParentId, locateInTree, setFetchTriggered, setRootFetchTriggered, setNodeFetching, refreshNodeChildren, refreshTargetNode, refreshSourceNode, markNodeDeleting, renameNode, setRootNode } = slice.actions

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
