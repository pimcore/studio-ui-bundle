/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// antd-style is untranspiled ESM, so `createStyles` is stubbed. Unlike the other tree tests this stub
// injects the authored CSS into the document (nesting flattened, at-rules dropped), so jsdom's cascade
// resolves the stylesheet-level indent that this test is about.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => {
  const tokenValues: Record<string, number> = { paddingMD: 16, paddingSM: 12, paddingXS: 8, paddingXXS: 4 }
  const token = new Proxy({}, { get: (_target, key: string) => tokenValues[key] ?? 1 })
  const css = (strings: TemplateStringsArray, ...values: unknown[]): string =>
    strings.reduce((out, part, index) => out + part + String(values[index] ?? ''), '')

  const flatten = (body: string, parents: string[]): string => {
    let out = ''
    let declarations = ''
    let index = 0
    while (index < body.length) {
      const open = body.indexOf('{', index)
      const semicolon = body.indexOf(';', index)
      if (open === -1 || (semicolon !== -1 && semicolon < open)) {
        if (semicolon === -1) { declarations += body.slice(index); break }
        declarations += body.slice(index, semicolon + 1)
        index = semicolon + 1
        continue
      }
      let depth = 1
      let close = open + 1
      while (depth > 0 && close < body.length) {
        if (body[close] === '{') depth++
        if (body[close] === '}') depth--
        close++
      }
      const selector = body.slice(index, open).trim()
      const inner = body.slice(open + 1, close - 1)
      index = close
      if (selector.startsWith('@')) continue
      const selectors = selector.split(',').flatMap((part) =>
        parents.map((parent) => part.includes('&') ? part.trim().replace(/&/g, parent) : `${parent} ${part.trim()}`)
      )
      out += flatten(inner, selectors)
    }
    if (declarations.trim() !== '') out = `${parents.join(', ')} { ${declarations} }\n${out}`
    return out
  }

  let counter = 0
  return {
    createStyles: (factory: (utils: { token: unknown, css: typeof css }) => Record<string, string>) => () => {
      const authored = factory({ token, css })
      const styles: Record<string, string> = {}
      const style = document.createElement('style')
      Object.entries(authored).forEach(([key, body]) => {
        styles[key] = `test-${key}-${counter++}`
        style.textContent += flatten(body.replace(/\/\*[\s\S]*?\*\//g, ''), [`.${styles[key]}`])
      })
      document.head.appendChild(style)
      return { styles, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} }
    }
  }
})

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: (): null => null
}))

jest.mock('@Pimcore/components/element-tree/node/content/tree-node-content', () => ({
  TreeNodeContent: ({ node }: { node: { label: string } }): string => node.label
}))

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
import { setNodeExpanded, type TreeNode } from './element-tree-slice'
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

// hierarchy: root (1) -> 10 (folder) -> 100
const childrenByParent: Record<string, TreeNode[]> = {
  1: [createNode('10', '1', true)],
  10: [createNode('100', '10')]
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
            rootNode={ showRoot ? createNode('1', '0', true) : undefined }
            showRoot={ showRoot }
          />
        </NodeApiHookProvider>
      </TreeFilterProvider>
    </TreeIdProvider>
  </Provider>
)

// jsdom resolves the cascade by source order only, so apply the browser rules here: an inline
// declaration wins, otherwise the most specific matching stylesheet rule (later one on a tie).
const specificityOf = (selector: string): number =>
  (selector.match(/#/g)?.length ?? 0) * 100 +
  (selector.match(/\.[\w-]+|\[|:(?!:)/g)?.length ?? 0) * 10 +
  (selector.match(/(^|[\s>+~])[a-z]/g)?.length ?? 0)

// jsdom's CSSOM does not expand shorthands, so read the left side out of `padding` when needed
const paddingLeftOfRule = (rule: CSSStyleRule): string => {
  const longhand = rule.style.getPropertyValue('padding-left')
  if (longhand !== '') return longhand
  const sides = rule.style.getPropertyValue('padding').trim().split(/\s+/)
  const value = sides.length === 4 ? sides[3] : sides.length >= 2 ? sides[1] : sides[0]
  return value === '0' ? '0px' : value
}

const cascadedPaddingLeft = (element: HTMLElement): string => {
  if (element.style.paddingLeft !== '') return element.style.paddingLeft
  let winner: { specificity: number, value: string } | undefined
  Array.from(document.styleSheets).forEach((sheet) => {
    Array.from(sheet.cssRules).forEach((rule) => {
      if (!(rule instanceof CSSStyleRule)) return
      const value = paddingLeftOfRule(rule)
      if (value === '') return
      rule.selectorText.split(',').map((part) => part.trim()).filter((part) => element.matches(part)).forEach((part) => {
        const specificity = specificityOf(part)
        if (winner === undefined || specificity >= winner.specificity) winner = { specificity, value }
      })
    })
  })
  return winner?.value ?? ''
}

const paddingLeftOfList = (nodeId: string): string => cascadedPaddingLeft(screen.getByTestId(`tree-list-${nodeId}`))

// Each nested child list is indented by the stylesheet (`.tree-node > .tree-list`); a list that is not
// inside a node keeps the ul defaults reset to 0.
describe('ElementTree: nested list indentation', () => {
  it.each([
    { showRoot: false, rootListIndent: '0px' },
    { showRoot: true, rootListIndent: '16px' }
  ])('indents every list rendered inside a tree node (showRoot: $showRoot)', async ({ showRoot, rootListIndent }) => {
    const treeId = `tree-list-indent-${String(showRoot)}`
    act(() => {
      store.dispatch(setNodeExpanded({ treeId, nodeId: '1', expanded: true }))
      store.dispatch(setNodeExpanded({ treeId, nodeId: '10', expanded: true }))
    })

    render(<TestTree
      showRoot={ showRoot }
      treeId={ treeId }
           />)
    await waitFor(() => { expect(screen.getByText('node-100')).toBeInTheDocument() })

    expect(paddingLeftOfList('1')).toBe(rootListIndent)
    expect(paddingLeftOfList('10')).toBe('16px')
  })
})
