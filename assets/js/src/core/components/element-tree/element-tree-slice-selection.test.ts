/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
// antd-style is untranspiled ESM - the icon component pulled in via the lock action goes
// through this factory. Same mock upstream uses in element-tree-slice.test.ts.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

// eslint-disable-next-line import/first
import { type Reducer } from '@reduxjs/toolkit'
// eslint-disable-next-line import/first
import { injectSliceWithState, type RootState } from '@sdk/app'
// eslint-disable-next-line import/first
import {
  clearSelection,
  deselectNodes,
  locateInTree,
  markNodeDeleting,
  markNodesDeleting,
  selectActiveNodeId,
  selectAnchorNodeId,
  selectIsSelectionLimitReached,
  selectNodeRange,
  selectSelectedNodeIds,
  selectSelectionCount,
  setNodeSearchTerm,
  setSelectedNodeIds,
  toggleNodeSelection,
  treeSelectionLimit,
  type TreeNode,
  updateNodesByParentId
} from './element-tree-slice'

jest.mock('@sdk/app', () => ({
  injectSliceWithState: jest.fn()
}))

const injectSliceWithStateMock = injectSliceWithState as unknown as jest.Mock

interface SliceLike {
  name: string
  reducer: Reducer<Record<string, any>>
}

// More than one slice is registered while this module graph loads, so the tree slice
// is picked by name rather than by call order.
const slice = injectSliceWithStateMock.mock.calls
  .map((call: unknown[]) => call[0] as SliceLike)
  .find((registeredSlice) => registeredSlice.name === 'trees')!

const treeId = 'asset-tree'

const nodePermissions: TreeNode['permissions'] = {
  list: true,
  view: true,
  publish: true,
  delete: true,
  rename: true,
  create: true,
  settings: true,
  versions: true,
  properties: true
}

const createNode = (id: string, parentId = '1'): TreeNode => ({
  id,
  parentId,
  elementType: 'asset',
  icon: { type: 'name', value: 'folder' },
  label: `node-${id}`,
  permissions: nodePermissions,
  locked: null,
  isLocked: false,
  internalKey: `0-${id}`
})

const emptyState = (): Record<string, any> => slice.reducer(undefined, { type: '@@INIT' })

/**
 * Loads the given ids as children of node "1" so the per node selected flags have
 * something to attach to.
 */
const withLoadedNodes = (ids: string[]): Record<string, any> => {
  return slice.reducer(emptyState(), updateNodesByParentId({
    treeId,
    parentId: '1',
    nodes: ids.map(id => createNode(id)),
    total: ids.length
  }))
}

const asRootState = (state: Record<string, any>): RootState => ({ trees: state }) as unknown as RootState

describe('element-tree-slice selection', () => {
  it('registers the tree slice in the store on import', () => {
    expect(slice).toBeDefined()
  })

  it('setSelectedNodeIds selects the given nodes and anchors on the last one', () => {
    const state = slice.reducer(withLoadedNodes(['2', '3', '4']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['2', '3']
    }))

    expect(state[treeId].selectedNodeIds).toEqual(['2', '3'])
    expect(state[treeId].anchorNodeId).toBe('3')
    expect(state[treeId].nodes['2'].isSelected).toBe(true)
    expect(state[treeId].nodes['3'].isSelected).toBe(true)
    expect(state[treeId].nodes['4'].isSelected).toBe(false)
  })

  it('toggleNodeSelection adds a node and removes it again', () => {
    const withTwo = slice.reducer(withLoadedNodes(['2', '3']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['2']
    }))

    const added = slice.reducer(withTwo, toggleNodeSelection({ treeId, nodeId: '3' }))

    expect(added[treeId].selectedNodeIds).toEqual(['2', '3'])
    expect(added[treeId].anchorNodeId).toBe('3')
    expect(added[treeId].nodes['3'].isSelected).toBe(true)

    const removed = slice.reducer(added, toggleNodeSelection({ treeId, nodeId: '3' }))

    expect(removed[treeId].selectedNodeIds).toEqual(['2'])
    expect(removed[treeId].nodes['3'].isSelected).toBe(false)
  })

  it('selectNodeRange replaces the selection, or extends it when additive', () => {
    const base = slice.reducer(withLoadedNodes(['2', '3', '4', '5']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['2']
    }))

    const replaced = slice.reducer(base, selectNodeRange({ treeId, nodeIds: ['4', '5'] }))

    expect(replaced[treeId].selectedNodeIds).toEqual(['4', '5'])
    expect(replaced[treeId].nodes['2'].isSelected).toBe(false)

    const extended = slice.reducer(base, selectNodeRange({ treeId, nodeIds: ['4', '5'], additive: true }))

    expect(extended[treeId].selectedNodeIds).toEqual(['2', '4', '5'])
  })

  it('keeps the selection free of duplicates', () => {
    const state = slice.reducer(withLoadedNodes(['2', '3']), selectNodeRange({
      treeId,
      nodeIds: ['2', '3', '2']
    }))

    expect(state[treeId].selectedNodeIds).toEqual(['2', '3'])
  })

  it('caps the selection and reports that the limit was hit', () => {
    const ids = Array.from({ length: treeSelectionLimit + 10 }, (_, index) => String(index + 2))

    const state = slice.reducer(withLoadedNodes(['2']), selectNodeRange({ treeId, nodeIds: ids }))

    expect(state[treeId].selectedNodeIds).toHaveLength(treeSelectionLimit)
    expect(state[treeId].isSelectionLimitReached).toBe(true)

    const withinLimit = slice.reducer(state, selectNodeRange({ treeId, nodeIds: ['2', '3'] }))

    expect(withinLimit[treeId].isSelectionLimitReached).toBe(false)
  })

  it('clearSelection empties the selection and drops the anchor', () => {
    const selected = slice.reducer(withLoadedNodes(['2', '3']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['2', '3']
    }))

    const state = slice.reducer(selected, clearSelection({ treeId }))

    expect(state[treeId].selectedNodeIds).toEqual([])
    expect(state[treeId].anchorNodeId).toBeUndefined()
    expect(state[treeId].nodes['2'].isSelected).toBe(false)
    expect(state[treeId].nodes['3'].isSelected).toBe(false)
  })

  it('brings the selected flag back when a node is loaded again', () => {
    const selected = slice.reducer(withLoadedNodes(['2', '3']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['3']
    }))

    // Simulates a collapse and re-expand of the parent, which refetches children.
    const reloaded = slice.reducer(selected, updateNodesByParentId({
      treeId,
      parentId: '1',
      nodes: [createNode('2'), createNode('3')],
      total: 2
    }))

    expect(reloaded[treeId].selectedNodeIds).toEqual(['3'])
    expect(reloaded[treeId].nodes['3'].isSelected).toBe(true)
    expect(reloaded[treeId].nodes['2'].isSelected).toBe(false)
  })

  it('drops the selection when a level gets filtered', () => {
    const selected = slice.reducer(withLoadedNodes(['2', '3']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['2', '3']
    }))

    const filtered = slice.reducer(selected, setNodeSearchTerm({ treeId, nodeId: '1', searchTerm: 'car' }))

    expect(filtered[treeId].selectedNodeIds).toEqual([])
  })

  it('keeps the selection when the search term is set to the same value', () => {
    const filtered = slice.reducer(withLoadedNodes(['2', '3']), setNodeSearchTerm({
      treeId,
      nodeId: '1',
      searchTerm: 'car'
    }))

    const selected = slice.reducer(filtered, setSelectedNodeIds({ treeId, selectedNodeIds: ['2'] }))
    const unchanged = slice.reducer(selected, setNodeSearchTerm({ treeId, nodeId: '1', searchTerm: 'car' }))

    expect(unchanged[treeId].selectedNodeIds).toEqual(['2'])
  })

  it('keeps the selection when a node is marked as deleting, so a move does not lose it', () => {
    const selected = slice.reducer(withLoadedNodes(['2', '3']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['2', '3']
    }))

    const state = slice.reducer(selected, markNodeDeleting({
      nodeId: '3',
      elementType: 'asset',
      isDeleting: true
    }))

    expect(state[treeId].selectedNodeIds).toEqual(['2', '3'])
    expect(state[treeId].nodes['3'].isDeleting).toBe(true)
  })

  it('marks a whole set as deleting in one action', () => {
    const state = slice.reducer(withLoadedNodes(['2', '3', '4']), markNodesDeleting({
      nodeIds: ['2', '4'],
      elementType: 'asset',
      isDeleting: true
    }))

    expect(state[treeId].nodes['2'].isDeleting).toBe(true)
    expect(state[treeId].nodes['3'].isDeleting).toBe(false)
    expect(state[treeId].nodes['4'].isDeleting).toBe(true)
  })

  it('deselectNodes takes the given elements out of the selection', () => {
    const selected = slice.reducer(withLoadedNodes(['2', '3']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['2', '3']
    }))

    const state = slice.reducer(selected, deselectNodes({ nodeIds: ['3'], elementType: 'asset' }))

    expect(state[treeId].selectedNodeIds).toEqual(['2'])
    expect(state[treeId].nodes['3'].isSelected).toBe(false)
  })

  it('deselectNodes ignores elements of a different type', () => {
    const selected = slice.reducer(withLoadedNodes(['2', '3']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['2', '3']
    }))

    const state = slice.reducer(selected, deselectNodes({ nodeIds: ['3'], elementType: 'document' }))

    expect(state[treeId].selectedNodeIds).toEqual(['2', '3'])
  })

  it('locateInTree replaces the selection and sets the active node', () => {
    const selected = slice.reducer(withLoadedNodes(['2', '3']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['2', '3']
    }))

    const state = slice.reducer(selected, locateInTree({ treeId, nodeId: '3', treeLevelData: [] }))

    expect(state[treeId].selectedNodeIds).toEqual(['3'])
    expect(state[treeId].activeNodeId).toBe('3')
    expect(state[treeId].anchorNodeId).toBe('3')
    expect(state[treeId].nodes['3'].isScrollTo).toBe(true)
  })

  it('keeps selections of different trees apart', () => {
    const firstTree = slice.reducer(withLoadedNodes(['2', '3']), setSelectedNodeIds({
      treeId,
      selectedNodeIds: ['2']
    }))

    const bothTrees = slice.reducer(firstTree, setSelectedNodeIds({
      treeId: 'second-tree',
      selectedNodeIds: ['9']
    }))

    expect(bothTrees[treeId].selectedNodeIds).toEqual(['2'])
    expect(bothTrees['second-tree'].selectedNodeIds).toEqual(['9'])
  })
})

describe('element-tree-slice selection selectors', () => {
  const state = slice.reducer(withLoadedNodes(['2', '3']), setSelectedNodeIds({
    treeId,
    selectedNodeIds: ['2', '3']
  }))

  it('reads ids, count, anchor and limit from the root state', () => {
    const rootState = asRootState(state)

    expect(selectSelectedNodeIds(rootState, treeId)).toEqual(['2', '3'])
    expect(selectSelectionCount(rootState, treeId)).toBe(2)
    expect(selectAnchorNodeId(rootState, treeId)).toBe('3')
    expect(selectIsSelectionLimitReached(rootState, treeId)).toBe(false)
  })

  it('returns a stable empty array for unknown trees', () => {
    const rootState = asRootState(state)

    expect(selectSelectedNodeIds(rootState, 'unknown')).toEqual([])
    expect(selectSelectedNodeIds(rootState, 'unknown')).toBe(selectSelectedNodeIds(rootState, 'other'))
    expect(selectSelectionCount(rootState, 'unknown')).toBe(0)
    expect(selectActiveNodeId(rootState, 'unknown')).toBeUndefined()
  })
})
