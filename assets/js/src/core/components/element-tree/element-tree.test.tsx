/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// antd-style is untranspiled ESM — every `.styles.ts` in the render tree goes through this
// factory, so stubbing it here avoids mocking each `.styles.ts` file individually
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

// element-tree.tsx only needs these as default prop/value fallbacks — the test supplies its own stubs
jest.mock('./node/tree-node', () => ({
  TreeNode: (): null => null,
  defaultProps: { id: '0', internalKey: '', icon: { type: 'name', value: 'folder' }, label: '', permissions: {}, level: 0, locked: null, isLocked: false, isRoot: false }
}))
jest.mock('./node/content/tree-node-content', () => ({ TreeNodeContent: (): null => null }))

jest.mock('./hooks/use-element-tree-node', () => ({
  useElementTreeNode: jest.fn()
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { ElementTree } from './element-tree'
// eslint-disable-next-line import/first
import { type TreeNode } from './element-tree-slice'
// eslint-disable-next-line import/first
import { type TreeNodeProps } from './node/tree-node'
// eslint-disable-next-line import/first
import { useElementTreeNode } from './hooks/use-element-tree-node'

const mockUseElementTreeNode = useElementTreeNode as jest.MockedFunction<typeof useElementTreeNode>

const StubTreeNode = (props: TreeNodeProps): React.JSX.Element => <div>{props.label}</div>
const StubTreeNodeContent = (): React.JSX.Element => <></>

const rootNodeFixture: TreeNode = {
  id: '1',
  icon: { type: 'name', value: 'home-root-folder' },
  label: 'home',
  internalKey: '1',
  permissions: {
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
  },
  locked: null,
  isLocked: false
}

// every node not explicitly given children below resolves to an empty list
const nodeStateFixture = (childrenByNodeId: Record<string, string[]>) => (nodeId: string): ReturnType<typeof useElementTreeNode> => ({
  isLoading: false,
  isFetching: false,
  isExpanded: false,
  isSelected: false,
  isScrollTo: false,
  isFetchTriggered: false,
  page: 1,
  total: childrenByNodeId[nodeId]?.length ?? 0,
  setLoading: jest.fn(),
  setFetching: jest.fn(),
  setExpanded: jest.fn(),
  setPage: jest.fn(),
  setSearchTerm: jest.fn(),
  setSelectedIds: jest.fn(),
  setScrollTo: jest.fn(),
  getChildren: () => childrenByNodeId[nodeId] ?? []
})

describe('ElementTree', () => {
  it('keys the tree list off the known node id while the root node has not loaded yet', () => {
    mockUseElementTreeNode.mockImplementation(nodeStateFixture({ 1: ['2'] }))

    render(
      <ElementTree
        nodeId={ 1 }
        renderNode={ StubTreeNode }
        renderNodeContent={ StubTreeNodeContent }
        rootNode={ undefined }
        showRoot
      />
    )

    expect(screen.queryByTestId('tree-list-undefined')).not.toBeInTheDocument()
    expect(screen.getByTestId('tree-list-1')).toBeInTheDocument()
  })

  it('still renders the loaded root node as its own node once available', () => {
    mockUseElementTreeNode.mockImplementation(nodeStateFixture({ 1: ['2'] }))

    render(
      <ElementTree
        nodeId={ 1 }
        renderNode={ StubTreeNode }
        renderNodeContent={ StubTreeNodeContent }
        rootNode={ rootNodeFixture }
        showRoot
      />
    )

    expect(screen.queryByTestId('tree-list-1')).not.toBeInTheDocument()
    expect(screen.getByText('home')).toBeInTheDocument()
  })
})
