/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render, screen } from '@testing-library/react'

// the settings bundle under test; each case replaces it before rendering
let settings: Record<string, unknown> = {}

const layout = {
  structure: { id: 'root', children: [{ id: 'f1', children: [] }] },
  fieldDefinitions: {
    root: { fieldtype: 'panel', name: 'root' },
    f1: { fieldtype: 'input', name: 'title' }
  },
  invalidFieldDefinitionIds: [] as string[],
  currentFieldDefinitionId: null,
  copiedPath: undefined,
  addFieldDefinition: jest.fn(),
  addExternalFieldDefinition: jest.fn(),
  updateFieldDefinition: jest.fn(),
  setCurrentFieldDefinitionIdPath: jest.fn(),
  setCurrentFieldDefinitionId: jest.fn(),
  moveFieldDefinition: jest.fn(),
  removeFieldDefinition: jest.fn(),
  removeChildren: jest.fn(),
  cloneFieldDefinition: jest.fn(),
  copyFieldDefinition: jest.fn(),
  pasteFieldDefinition: jest.fn(),
  isValidChildFieldDefinition: () => true,
  isValidExternalChildFieldDefinition: () => true,
  getLayout: () => ({})
}

jest.mock('@Pimcore/modules/field-definitions/components/editor/settings-provider', () => ({
  useSettings: () => settings
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/provider', () => ({
  useItems: () => ({ detailView: 'layout', setDetailView: jest.fn() })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/area-provider', () => ({
  useArea: () => ({ area: ['class'] })
}))

jest.mock('@Pimcore/modules/field-definitions/utils/global-clipboard', () => ({
  useGlobalFieldDefinitionClipboard: () => ({ copiedLayout: undefined })
}))

// the real buildTree resolves the field-definition registry from the DI container; the
// sidebar's own item callback is what is under test, so a bare walk feeds it
jest.mock('@Pimcore/modules/field-definitions/utils/layout-helpers', () => ({
  buildTree: ({ structure, fieldDefinitions, itemCallback }: any) => {
    const build = (node: any, parentPath: string[]): any => {
      const currentPath: string[] = [...parentPath, String(node.id)]
      const item = {
        key: node.id,
        title: fieldDefinitions[node.id].name,
        meta: { currentPath },
        children: node.children.map((child: any) => build(child, currentPath))
      }

      return itemCallback({ fieldDefinition: fieldDefinitions[node.id], initialTreeItem: item })
    }

    return build(structure, [])
  }
}))

// the components barrel pulls antd-style (untranspiled ESM); the tree stand-in surfaces
// exactly what the sidebar decides per item: its classes, its actions, its rendered title
jest.mock('@sdk/components', () => ({
  Button: ({ children, onClick }: any) => <button onClick={ onClick }>{children}</button>,
  Content: ({ children }: any) => <div>{children}</div>,
  Draggable: ({ children }: any) => <div data-testid="draggable">{children}</div>,
  HotspotDroppable: ({ children }: any) => <div data-testid="droppable">{children}</div>,
  Icon: ({ value }: any) => <i>{value}</i>,
  Space: ({ children }: any) => <div>{children}</div>,
  TreeElement: ({ treeData, titleRender }: any) => {
    const renderItem = (item: any): React.JSX.Element => (
      <li
        data-actions={ JSON.stringify((item.actions ?? []).map((action: any) => action.key)) }
        data-classes={ item.className ?? '' }
        data-testid={ `node-${item.key}` }
        key={ item.key }
      >
        {titleRender({ key: item.key, meta: item.meta }, <span>{item.title}</span>)}
        <ul>{(item.children ?? []).map(renderItem)}</ul>
      </li>
    )

    return <ul>{treeData.map(renderItem)}</ul>
  }
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('antd', () => ({
  Divider: () => null,
  theme: { useToken: () => ({ token: {} }) }
}))

const { DetailSidebar } = jest.requireActual('./sidebar')

const renderSidebar = (overrides: Record<string, unknown>): void => {
  settings = {
    useLayout: () => layout,
    fieldDefinitionRegistry: {
      getDropdownActions: () => [{ key: 'add-input', icon: 'plus' }],
      getDynamicType: () => undefined
    },
    ...overrides
  }

  render(<DetailSidebar />)
}

describe('DetailSidebar', () => {
  it('offers actions and drag handles when editing', () => {
    renderSidebar({})

    const field = screen.getByTestId('node-f1')
    expect(JSON.parse(field.dataset.actions!)).toEqual(['add-input', 'copy', 'delete'])
    expect(field.dataset.classes).toContain('ant-tree-node--has-drag-and-drop')
    expect(screen.getAllByTestId('draggable').length).toBeGreaterThan(0)
  })

  it('renders a navigable tree with no way to change it in review mode', () => {
    renderSidebar({ readOnly: true })

    const field = screen.getByTestId('node-f1')
    expect(JSON.parse(field.dataset.actions!)).toEqual([])
    expect(field.dataset.classes).not.toContain('ant-tree-node--has-drag-and-drop')
    expect(screen.queryByTestId('draggable')).toBeNull()
    expect(screen.queryByTestId('droppable')).toBeNull()
    expect(screen.getByText('title')).toBeInTheDocument()
  })

  it('lets a decorator have the last word on every item', () => {
    const seen: string[][] = []
    renderSidebar({
      readOnly: true,
      decorateTreeItem: (item: any, context: { path: string[] }) => {
        seen.push(context.path)

        return { ...item, className: `${item.className} status-added`, title: <span>{item.title} ★</span> }
      }
    })

    const field = screen.getByTestId('node-f1')
    expect(field.dataset.classes).toContain('status-added')
    expect(screen.getByText('title ★')).toBeInTheDocument()
    expect(seen).toContainEqual(['root', 'f1'])
  })
})
