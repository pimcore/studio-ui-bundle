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
  renameNode,
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

describe('element-tree-slice: renameNode', () => {
  it('updates the label and the real key of the renamed node', () => {
    const state = dispatchAll([
      updateNodesByParentId({
        treeId,
        parentId: '1',
        nodes: [{ ...createNode('10', '1'), label: 'car - test', realKey: 'car' }],
        total: 1
      }),
      renameNode({ nodeId: '10', elementType: 'data-object', newLabel: 'new-car' })
    ])

    const nodeProps = state[treeId].nodes['10'].treeNodeProps
    expect(nodeProps?.label).toBe('new-car')
    expect(nodeProps?.realKey).toBe('new-car')
  })
})
