/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// antd-style is untranspiled ESM — the tree context module pulls styles in through this factory
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: (): null => null
}))

jest.mock('@Pimcore/components/element-tree/node/content/tree-node-content', () => ({
  TreeNodeContent: (): null => null
}))

jest.mock('@sdk/app', () => {
  const appStore = jest.requireActual('@Pimcore/app/store')
  return {
    injectSliceWithState: appStore.injectSliceWithState,
    useAppDispatch: appStore.useAppDispatch
  }
})

// eslint-disable-next-line import/first
import React, { type KeyboardEvent, type MouseEvent } from 'react'
// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { type INodeRef, TreeContext, defaultTreeProps } from '../element-tree'
// eslint-disable-next-line import/first
import { type TreeNodeProps } from './tree-node'
// eslint-disable-next-line import/first
import { type TreeNodeInteractionState, useTreeNodeInteraction } from './use-tree-node-interaction'

/*
 * Rendered tree, top to bottom:
 *
 *   root (1)
 *     folder (10)       expanded
 *       object (20)
 *       object (21)
 *     object (11)
 */
const nodes: Array<Partial<TreeNodeProps>> = [
  { id: '1', internalKey: '1', isRoot: true, hasChildren: true },
  { id: '10', internalKey: '1-10', parentId: '1', hasChildren: true },
  { id: '20', internalKey: '1-10-20', parentId: '10' },
  { id: '21', internalKey: '1-10-21', parentId: '10' },
  { id: '11', internalKey: '1-11', parentId: '1' }
]

const buildRefs = (): Record<string, INodeRef> => Object.fromEntries(
  nodes.map(node => [node.internalKey!, { el: { focus: jest.fn() } as unknown as HTMLElement, node: node as TreeNodeProps }])
)

const buildState = (overrides: Partial<TreeNodeInteractionState> = {}): TreeNodeInteractionState => ({
  isExpanded: false,
  setExpanded: jest.fn(),
  setSelectedIds: jest.fn(),
  toggleSelection: jest.fn(),
  selectRange: jest.fn(),
  clearSelection: jest.fn(),
  setActive: jest.fn(),
  getSelectedIds: jest.fn(() => []),
  getAnchorId: jest.fn(() => undefined),
  isSelectionImplicit: jest.fn(() => false),
  ...overrides
})

const keyEvent = (key: string, modifiers: Partial<Pick<KeyboardEvent, 'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey'>> = {}): KeyboardEvent => ({
  key,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
  altKey: false,
  ...modifiers,
  preventDefault: jest.fn()
}) as unknown as KeyboardEvent

type Interaction = ReturnType<typeof useTreeNodeInteraction> & { refs: Record<string, INodeRef> }

const setup = (nodeId: string, state: TreeNodeInteractionState, selectionMode: 'single' | 'multiple' = 'multiple'): Interaction => {
  const refs = buildRefs()
  const node = nodes.find(candidate => candidate.id === nodeId) as TreeNodeProps

  const wrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
    <TreeContext.Provider
      value={ {
        ...defaultTreeProps,
        selectionMode,
        nodesRefs: { current: refs },
        nodeOrder: () => nodes.map(candidate => candidate.internalKey!)
      } }
    >
      {children}
    </TreeContext.Provider>
  )

  const { result } = renderHook(() => useTreeNodeInteraction(node, state), { wrapper })

  return { ...result.current, refs }
}

describe('useTreeNodeInteraction: starting a set while another node is open', () => {
  const click = (modifiers: { ctrlKey?: boolean, metaKey?: boolean, shiftKey?: boolean }): MouseEvent =>
    ({ ctrlKey: false, metaKey: false, shiftKey: false, ...modifiers, preventDefault: jest.fn() }) as unknown as MouseEvent

  // 11 was opened with a plain click: it is the anchor, but only implicitly
  const openedElsewhere = (): TreeNodeInteractionState => buildState({
    getAnchorId: jest.fn(() => '11'),
    isSelectionImplicit: jest.fn(() => true)
  })

  it('starts a new set at a Shift+clicked node outside the opened node\'s folder', () => {
    const state = openedElsewhere()
    const { onClick } = setup('21', state)

    onClick(click({ shiftKey: true }))

    expect(state.clearSelection).toHaveBeenCalled()
    expect(state.toggleSelection).toHaveBeenCalled()
    expect(state.selectRange).not.toHaveBeenCalled()
    // nothing gets opened
    expect(state.setActive).not.toHaveBeenCalled()
  })

  it('still ranges from the opened node within its own folder', () => {
    const state = openedElsewhere()
    const { onClick } = setup('10', state)

    onClick(click({ shiftKey: true }))

    expect(state.clearSelection).not.toHaveBeenCalled()
    expect(state.selectRange).toHaveBeenCalledWith(['10', '20', '21', '11'], false)
  })

  it('ranges from an anchor set by a modifier gesture, wherever it is', () => {
    const state = buildState({ getAnchorId: jest.fn(() => '11'), isSelectionImplicit: jest.fn(() => false) })
    const { onClick } = setup('21', state)

    onClick(click({ shiftKey: true }))

    expect(state.clearSelection).not.toHaveBeenCalled()
    expect(state.selectRange).toHaveBeenCalledWith(['21', '11'], false)
  })

  it('starts a new set on the first Ctrl/Cmd+click instead of adding the opened node', () => {
    const state = openedElsewhere()
    const { onClick } = setup('21', state)

    onClick(click({ ctrlKey: true }))

    expect(state.clearSelection).toHaveBeenCalled()
    expect(state.toggleSelection).toHaveBeenCalledTimes(1)
    expect(state.setActive).not.toHaveBeenCalled()
  })

  it('adds to an explicit set with Ctrl/Cmd+click', () => {
    const state = buildState({ isSelectionImplicit: jest.fn(() => false) })
    const { onClick } = setup('21', state)

    onClick(click({ metaKey: true }))

    expect(state.clearSelection).not.toHaveBeenCalled()
    expect(state.toggleSelection).toHaveBeenCalledTimes(1)
  })

  it('starts the keyboard range at the focused node when the opened node is elsewhere', () => {
    const state = openedElsewhere()
    const { onKeyDown } = setup('20', state)

    onKeyDown(keyEvent('ArrowDown', { shiftKey: true }))

    expect(state.clearSelection).toHaveBeenCalled()
    expect(state.toggleSelection).toHaveBeenCalled()
    expect(state.selectRange).toHaveBeenCalledWith(['20', '21'])
  })
})
