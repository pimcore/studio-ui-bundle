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

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: (): null => null
}))

// tree-node-content pulls in the whole sdk component index (untranspiled antd ESM) — stub it with a label renderer
jest.mock('@Pimcore/components/element-tree/node/content/tree-node-content', () => ({
  TreeNodeContent: ({ node }: { node: { label: string } }): string => node.label
}))

// the sdk app module re-exports the router and with it large parts of the app — the tree only needs the store bindings
jest.mock('@sdk/app', () => {
  const appStore = jest.requireActual('@Pimcore/app/store')
  return {
    injectSliceWithState: appStore.injectSliceWithState,
    useAppDispatch: appStore.useAppDispatch
  }
})

// eslint-disable-next-line import/first
import '@testing-library/jest-dom'
// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { act, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { Provider } from 'react-redux'
// eslint-disable-next-line import/first
import { store } from '@Pimcore/app/store'
// eslint-disable-next-line import/first
import { defaultTreeProps, ElementTree } from './element-tree'
// eslint-disable-next-line import/first
import { locateInTree, setNodeExpanded, setNodePage, setSelectedNodeIds, type TreeNode } from './element-tree-slice'
// eslint-disable-next-line import/first
import { TreeIdProvider } from './provider/tree-id-provider/tree-id-provider'
// eslint-disable-next-line import/first
import { TreeFilterProvider } from './provider/tree-filter-provider/tree-filter-provider'
// eslint-disable-next-line import/first
import { NodeApiHookProvider } from './provider/node-api-hook-provider/node-api-hook-provider'
// eslint-disable-next-line import/first
import { TreeNode as TreeNodeComponent } from './node/tree-node'
// eslint-disable-next-line import/first
import { type DataTransformerReturnType, type DataTransformerSourceNode, type NodeApiHookReturnType } from './types/node-api-hook'
// eslint-disable-next-line import/first
import { type NodeState } from './hooks/use-element-tree-node'

const treeId = 'locate-in-tree-test'

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

const createNode = (id: string, parentId: string, hasChildren = false): TreeNode => ({
  id,
  parentId,
  elementType: 'data-object',
  icon: { type: 'name', value: 'folder' },
  label: `node-${id}`,
  hasChildren,
  permissions,
  locked: null,
  isLocked: false,
  internalKey: `${parentId}-${id}`
})

// hierarchy: root (1) -> folder 10 (paginated: 20/21 on page 1, 22/23 on page 2) -> object 20 -> variants 30/31
const childrenByParentAndPage: Record<string, Record<number, TreeNode[]>> = {
  1: { 1: [createNode('10', '1', true)] },
  10: {
    1: [createNode('20', '10', true), createNode('21', '10')],
    2: [createNode('22', '10'), createNode('23', '10')]
  },
  20: { 1: [createNode('30', '20'), createNode('31', '20')] }
}

const totalsByParent: Record<string, number> = { 1: 1, 10: 4, 20: 2 }

const useNodeApiHookMock = (): NodeApiHookReturnType => {
  const fetchRoot = async (id: number | string): Promise<DataTransformerReturnType | undefined> => {
    return { nodes: [createNode(String(id), '0', true)], total: 1 }
  }

  const fetchChildren = async (node: DataTransformerSourceNode, nodeState: NodeState): Promise<DataTransformerReturnType | undefined> => {
    return {
      nodes: childrenByParentAndPage[node.id]?.[nodeState.page] ?? [],
      total: totalsByParent[node.id] ?? 0
    }
  }

  return { fetchRoot, fetchChildren } as const
}

const TestTree = (): React.JSX.Element => (
  <Provider store={ store }>
    <TreeIdProvider treeId={ treeId }>
      <TreeFilterProvider pageSize={ 2 }>
        <NodeApiHookProvider nodeApiHook={ useNodeApiHookMock }>
          <ElementTree
            nodeId={ 1 }
            renderNode={ TreeNodeComponent }
            renderNodeContent={ defaultTreeProps.renderNodeContent }
            showRoot={ false }
          />
        </NodeApiHookProvider>
      </TreeFilterProvider>
    </TreeIdProvider>
  </Provider>
)

describe('ElementTree: locate in tree', () => {
  it('renders and selects the target node even when its parent lives on another page', async () => {
    act(() => {
      store.dispatch(setNodeExpanded({ treeId, nodeId: '1', expanded: true }))
      store.dispatch(setNodeExpanded({ treeId, nodeId: '10', expanded: true }))
      store.dispatch(setNodeExpanded({ treeId, nodeId: '20', expanded: true }))
    })

    render(<TestTree />)

    // page 1 of folder 10 including the variants of node 20 gets loaded
    await waitFor(() => { expect(screen.getByText('node-30')).toBeInTheDocument() })

    // a variant gets selected, then folder 10 is switched to page 2 — node 20 and its subtree disappear
    act(() => {
      store.dispatch(setSelectedNodeIds({ treeId, selectedNodeIds: ['31'] }))
      store.dispatch(setNodePage({ treeId, nodeId: '10', page: 2 }))
    })

    await waitFor(() => { expect(screen.getByText('node-22')).toBeInTheDocument() })
    expect(screen.queryByText('node-30')).not.toBeInTheDocument()

    // locate variant 30 — it lives under node 20 on page 1 of folder 10
    act(() => {
      store.dispatch(locateInTree({
        treeId,
        nodeId: '30',
        treeLevelData: [
          { elementId: 10, parentId: 1, pageNumber: 1 },
          { elementId: 20, parentId: 10, pageNumber: 1 },
          { elementId: 30, parentId: 20, pageNumber: 1 }
        ]
      }))
    })

    // folder 10 switches back to page 1 and the target variant is rendered and highlighted again
    await waitFor(() => { expect(screen.getByText('node-30')).toBeInTheDocument() })

    const nodeContent = screen.getByTestId('tree-node-data-object-30').querySelector('.tree-node__content')
    expect(nodeContent).toHaveClass('tree-node__content--selected')
  })
})
