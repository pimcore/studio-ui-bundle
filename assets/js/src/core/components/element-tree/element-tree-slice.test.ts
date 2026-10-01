/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// antd-style is untranspiled ESM — the icon component pulled in via the lock action goes through this factory
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

jest.mock('@sdk/app', () => ({
  injectSliceWithState: jest.fn()
}))

// eslint-disable-next-line import/first
import { type Reducer, type UnknownAction } from '@reduxjs/toolkit'
// eslint-disable-next-line import/first
import { injectSliceWithState } from '@sdk/app'
// eslint-disable-next-line import/first
import {
  type InternalNodeState,
  locateInTree,
  setFetchTriggered,
  setNodePage,
  type TreeNode,
  updateNodesByParentId
} from './element-tree-slice'

type TreesState = Record<string, { nodes: Record<string, InternalNodeState> }>

interface SliceLike {
  name: string
  reducer: Reducer<TreesState>
}

const injectSliceWithStateMock = injectSliceWithState as unknown as jest.Mock
const slice = injectSliceWithStateMock.mock.calls
  .map((call: unknown[]) => call[0] as SliceLike)
  .find((registeredSlice) => registeredSlice.name === 'trees')!

const treeId = 'test-tree'

const permissions = {
  list: true,
  view: true,
  publish: false,
  unpublish: false,
  delete: false,
  rename: false,
  create: false,
  settings: false,
  versions: false,
  properties: false,
  save: false,
  localizedEdit: null,
  localizedView: null
}

const createNode = (id: string, parentId: string): TreeNode => ({
  id,
  parentId,
  elementType: 'data-object',
  icon: { type: 'name', value: 'folder' },
  label: `node-${id}`,
  permissions,
  locked: null,
  isLocked: false,
  internalKey: `${parentId}-${id}`
})

const dispatchAll = (actions: UnknownAction[]): TreesState => {
  let state = slice.reducer(undefined, { type: '@@INIT' })
  actions.forEach((action) => {
    state = slice.reducer(state, action)
  })
  return state
}

// hierarchy: root (1) -> folder 10 (paginated) -> object 20 -> variants 30/31
const loadedTreeActions = (): UnknownAction[] => [
  updateNodesByParentId({ treeId, parentId: '1', nodes: [createNode('10', '1')], total: 1 }),
  updateNodesByParentId({ treeId, parentId: '10', nodes: [createNode('20', '10'), createNode('21', '10')], total: 4 }),
  updateNodesByParentId({ treeId, parentId: '20', nodes: [createNode('30', '20'), createNode('31', '20')], total: 2 }),
  setFetchTriggered({ treeId, nodeId: '1', fetchTriggered: true }),
  setFetchTriggered({ treeId, nodeId: '10', fetchTriggered: true }),
  setFetchTriggered({ treeId, nodeId: '20', fetchTriggered: true })
]

describe('element-tree-slice: locateInTree', () => {
  it('selects and scrolls to the target node', () => {
    const state = dispatchAll([
      ...loadedTreeActions(),
      locateInTree({
        treeId,
        nodeId: '31',
        treeLevelData: [
          { elementId: 10, parentId: 1, pageNumber: 1 },
          { elementId: 20, parentId: 10, pageNumber: 1 },
          { elementId: 31, parentId: 20, pageNumber: 1 }
        ]
      })
    ])

    expect(state[treeId].nodes['31'].isSelected).toBe(true)
    expect(state[treeId].nodes['31'].isScrollTo).toBe(true)
    // everything is already on the requested pages — no refetch needed
    expect(state[treeId].nodes['20'].isFetchTriggered).toBe(true)
  })

  it('triggers a refetch when the target lives on another page', () => {
    const state = dispatchAll([
      ...loadedTreeActions(),
      // the variant list of node 20 got switched to page 2
      setNodePage({ treeId, nodeId: '20', page: 2 }),
      updateNodesByParentId({ treeId, parentId: '20', nodes: [createNode('32', '20'), createNode('33', '20')], total: 4 }),
      setFetchTriggered({ treeId, nodeId: '20', fetchTriggered: true }),
      locateInTree({
        treeId,
        nodeId: '30',
        treeLevelData: [
          { elementId: 10, parentId: 1, pageNumber: 1 },
          { elementId: 20, parentId: 10, pageNumber: 1 },
          { elementId: 30, parentId: 20, pageNumber: 1 }
        ]
      })
    ])

    expect(state[treeId].nodes['20'].page).toBe(1)
    expect(state[treeId].nodes['20'].isFetchTriggered).toBe(false)
    expect(state[treeId].nodes['20'].isExpanded).toBe(true)
    expect(state[treeId].nodes['30'].isSelected).toBe(true)
    expect(state[treeId].nodes['30'].isScrollTo).toBe(true)
  })

  it('triggers a refetch on every level below a cleared node so the target renders again', () => {
    const state = dispatchAll([
      ...loadedTreeActions(),
      // folder 10 got switched to page 2 — this clears the treeNodeProps of node 20 and its siblings
      setNodePage({ treeId, nodeId: '10', page: 2 }),
      updateNodesByParentId({ treeId, parentId: '10', nodes: [createNode('22', '10'), createNode('23', '10')], total: 4 }),
      setFetchTriggered({ treeId, nodeId: '10', fetchTriggered: true }),
      // locate variant 30 — it lives under node 20 on page 1 of folder 10
      locateInTree({
        treeId,
        nodeId: '30',
        treeLevelData: [
          { elementId: 10, parentId: 1, pageNumber: 1 },
          { elementId: 20, parentId: 10, pageNumber: 1 },
          { elementId: 30, parentId: 20, pageNumber: 1 }
        ]
      })
    ])

    // folder 10 switches back to page 1 and refetches
    expect(state[treeId].nodes['10'].page).toBe(1)
    expect(state[treeId].nodes['10'].isFetchTriggered).toBe(false)

    // node 20 got cleared by the page switch, so its variant list has to be refetched as well —
    // otherwise the cleared target node would never be rendered (and therefore never selected) again
    expect(state[treeId].nodes['20'].isFetchTriggered).toBe(false)
    expect(state[treeId].nodes['20'].isLoading).toBeUndefined()
    expect(state[treeId].nodes['20'].isExpanded).toBe(true)

    expect(state[treeId].nodes['30'].isSelected).toBe(true)
    expect(state[treeId].nodes['30'].isScrollTo).toBe(true)
  })
})
