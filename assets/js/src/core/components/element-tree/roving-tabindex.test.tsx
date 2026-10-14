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
import { setNodeExpanded, setSelectedNodeIds, type TreeNode } from './element-tree-slice'
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

// hierarchy: root (1) -> 10 (folder), 11, 12
const childrenByParent: Record<string, TreeNode[]> = {
  1: [createNode('10', '1', true), createNode('11', '1'), createNode('12', '1')]
}

const useNodeApiHookMock = (): NodeApiHookReturnType => {
  const fetchRoot = async (id: number | string): Promise<DataTransformerReturnType | undefined> => {
    return { nodes: [createNode(String(id), '0', true)], total: 1 }
  }

  const fetchChildren = async (node: DataTransformerSourceNode, _nodeState: NodeState): Promise<DataTransformerReturnType | undefined> => {
    const nodes = childrenByParent[node.id] ?? []
    return { nodes, total: nodes.length }
  }

  return { fetchRoot, fetchChildren } as const
}

const TestTree = ({ treeId, showRoot }: { treeId: string, showRoot: boolean }): React.JSX.Element => (
  <Provider store={ store }>
    <TreeIdProvider treeId={ treeId }>
      <TreeFilterProvider pageSize={ 10 }>
        <NodeApiHookProvider nodeApiHook={ useNodeApiHookMock }>
          <ElementTree
            nodeId={ 1 }
            renderNode={ TreeNodeComponent }
            renderNodeContent={ defaultTreeProps.renderNodeContent }
            // The caller loads the root (useElementTreeRootNode); here it is given.
            rootNode={ showRoot ? createNode('1', '0', true) : undefined }
            showRoot={ showRoot }
          />
        </NodeApiHookProvider>
      </TreeFilterProvider>
    </TreeIdProvider>
  </Provider>
)

const tabStops = (): HTMLElement[] => screen.getAllByRole('treeitem').filter((item) => item.tabIndex === 0)
const treeItemOf = (id: string): HTMLElement => screen.getByTestId(`tree-node-data-object-${id}`).querySelector<HTMLElement>('[role="treeitem"]')!

// A roving tabindex: Tab reaches the tree once, on the selected node, or on the first node while none is selected.
describe('ElementTree: roving tabindex', () => {
  it.each([
    { showRoot: false, first: '10' },
    { showRoot: true, first: '1' }
  ])('gives an unselected tree exactly one tab stop, its first node (showRoot: $showRoot)', async ({ showRoot, first }) => {
    const treeId = `roving-tabindex-unselected-${String(showRoot)}`
    act(() => { store.dispatch(setNodeExpanded({ treeId, nodeId: '1', expanded: true })) })

    render(<TestTree
      showRoot={ showRoot }
      treeId={ treeId }
           />)

    await waitFor(() => { expect(screen.getByText('node-12')).toBeInTheDocument() })
    await waitFor(() => { expect(tabStops()).toEqual([treeItemOf(first)]) })
  })

  it.each([false, true])('moves the tab stop to a newly selected node instead of adding one (showRoot: %s)', async (showRoot) => {
    const treeId = `roving-tabindex-selected-${String(showRoot)}`
    act(() => { store.dispatch(setNodeExpanded({ treeId, nodeId: '1', expanded: true })) })

    render(<TestTree
      showRoot={ showRoot }
      treeId={ treeId }
           />)
    await waitFor(() => { expect(screen.getByText('node-12')).toBeInTheDocument() })

    act(() => { store.dispatch(setSelectedNodeIds({ treeId, selectedNodeIds: ['12'] })) })
    await waitFor(() => { expect(tabStops()).toEqual([treeItemOf('12')]) })

    act(() => { store.dispatch(setSelectedNodeIds({ treeId, selectedNodeIds: ['11'] })) })
    await waitFor(() => { expect(tabStops()).toEqual([treeItemOf('11')]) })
  })

  it('falls back to the first node when the selected one is collapsed away', async () => {
    const treeId = 'roving-tabindex-collapsed'
    act(() => { store.dispatch(setNodeExpanded({ treeId, nodeId: '1', expanded: true })) })

    render(<TestTree
      showRoot
      treeId={ treeId }
           />)
    await waitFor(() => { expect(screen.getByText('node-12')).toBeInTheDocument() })

    act(() => { store.dispatch(setSelectedNodeIds({ treeId, selectedNodeIds: ['12'] })) })
    await waitFor(() => { expect(tabStops()).toEqual([treeItemOf('12')]) })

    act(() => { store.dispatch(setNodeExpanded({ treeId, nodeId: '1', expanded: false })) })
    await waitFor(() => { expect(screen.queryByText('node-12')).not.toBeInTheDocument() })
    await waitFor(() => { expect(tabStops()).toEqual([treeItemOf('1')]) })
  })
})
