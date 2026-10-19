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

describe('useTreeNodeInteraction', () => {
  describe('Ctrl/Cmd + A', () => {
    it('selects every rendered node in visible order, without the root', () => {
      const state = buildState()
      const { onKeyDown } = setup('20', state)
      const event = keyEvent('a', { ctrlKey: true })

      onKeyDown(event)

      expect(state.selectRange).toHaveBeenCalledWith(['10', '20', '21', '11'])
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('works with the meta key and an upper case letter as well', () => {
      const state = buildState()
      const { onKeyDown } = setup('20', state)

      onKeyDown(keyEvent('A', { metaKey: true }))

      expect(state.selectRange).toHaveBeenCalledWith(['10', '20', '21', '11'])
    })

    it('leaves other modifier combinations alone', () => {
      const state = buildState()
      const { onKeyDown } = setup('20', state)

      onKeyDown(keyEvent('a', { ctrlKey: true, shiftKey: true }))
      onKeyDown(keyEvent('a'))

      expect(state.selectRange).not.toHaveBeenCalled()
    })
  })

  describe('arrow keys', () => {
    it('opens a closed node on ArrowRight instead of moving on', () => {
      const state = buildState({ isExpanded: false })
      const { onKeyDown, refs } = setup('10', state)

      onKeyDown(keyEvent('ArrowRight'))

      expect(state.setExpanded).toHaveBeenCalledWith(true)
      expect(refs['1-10-20'].el.focus).not.toHaveBeenCalled()
    })

    it('steps into the children of an open node on ArrowRight', () => {
      const state = buildState({ isExpanded: true })
      const { onKeyDown, refs } = setup('10', state)

      onKeyDown(keyEvent('ArrowRight'))

      expect(state.setExpanded).not.toHaveBeenCalled()
      expect(refs['1-10-20'].el.focus).toHaveBeenCalled()
    })

    it('closes an open node on ArrowLeft', () => {
      const state = buildState({ isExpanded: true })
      const { onKeyDown, refs } = setup('10', state)

      onKeyDown(keyEvent('ArrowLeft'))

      expect(state.setExpanded).toHaveBeenCalledWith(false)
      expect(refs['1'].el.focus).not.toHaveBeenCalled()
    })

    it('steps out to the parent on ArrowLeft from a closed node', () => {
      const state = buildState({ isExpanded: false })
      const { onKeyDown, refs } = setup('21', state)

      onKeyDown(keyEvent('ArrowLeft'))

      expect(state.setExpanded).not.toHaveBeenCalled()
      expect(refs['1-10'].el.focus).toHaveBeenCalled()
    })
  })

  describe('Home and End', () => {
    it('jump to the first and the last rendered node', () => {
      const state = buildState()
      const { onKeyDown, refs } = setup('20', state)

      onKeyDown(keyEvent('Home'))
      onKeyDown(keyEvent('End'))

      expect(refs['1'].el.focus).toHaveBeenCalled()
      expect(refs['1-11'].el.focus).toHaveBeenCalled()
    })

    it('extend the selection from the anchor with Shift', () => {
      const state = buildState({ getAnchorId: jest.fn(() => '20') })
      const { onKeyDown } = setup('20', state)

      onKeyDown(keyEvent('End', { shiftKey: true }))

      expect(state.selectRange).toHaveBeenCalledWith(['20', '21', '11'], false)
    })
  })

  describe('without the multi selection opt in', () => {
    const click = (modifiers: { ctrlKey?: boolean, metaKey?: boolean, shiftKey?: boolean }): MouseEvent =>
      ({ ctrlKey: false, metaKey: false, shiftKey: false, ...modifiers, preventDefault: jest.fn() }) as unknown as MouseEvent

    it('treats Ctrl/Cmd and Shift clicks as plain clicks', () => {
      const state = buildState({ getAnchorId: jest.fn(() => '20') })
      const { onClick } = setup('21', state, 'single')

      onClick(click({ ctrlKey: true }))
      onClick(click({ metaKey: true }))
      onClick(click({ shiftKey: true }))

      expect(state.toggleSelection).not.toHaveBeenCalled()
      expect(state.selectRange).not.toHaveBeenCalled()
      expect(state.setSelectedIds).toHaveBeenCalledTimes(3)
      expect(state.setSelectedIds).toHaveBeenLastCalledWith(['21'])
    })

    it('ignores Ctrl/Cmd + A and Ctrl/Cmd + Space', () => {
      const state = buildState()
      const { onKeyDown } = setup('20', state, 'single')

      onKeyDown(keyEvent('a', { ctrlKey: true }))
      onKeyDown(keyEvent(' ', { metaKey: true }))

      expect(state.selectRange).not.toHaveBeenCalled()
      expect(state.toggleSelection).not.toHaveBeenCalled()
    })

    it('moves focus with Shift + arrow keys without building a range', () => {
      const state = buildState({ getAnchorId: jest.fn(() => '20') })
      const { onKeyDown, refs } = setup('20', state, 'single')

      onKeyDown(keyEvent('ArrowDown', { shiftKey: true }))

      expect(refs['1-10-21'].el.focus).toHaveBeenCalled()
      expect(state.selectRange).not.toHaveBeenCalled()
    })
  })
})
