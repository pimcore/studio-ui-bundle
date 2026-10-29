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
import { render } from '@testing-library/react'
import { type TreeNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { TreeContainer as AssetTreeContainer } from '@Pimcore/modules/asset/tree/tree-container'
import { TreeContainer as DataObjectTreeContainer } from '@Pimcore/modules/data-object/tree/tree-container'
import { TreeContainer as DocumentTreeContainer } from '@Pimcore/modules/document/tree/tree-container'

const mockOpenAsset = jest.fn()
const mockOpenDataObject = jest.fn()
const mockOpenDocument = jest.fn()
let mockOnSelect: ((node: TreeNode) => Promise<void>) | undefined

jest.mock('@Pimcore/components/element-tree/element-tree', () => ({
  defaultTreeProps: { renderNodeContent: () => null },
  ElementTree: (props: { onSelect: (node: TreeNode) => Promise<void> }) => {
    mockOnSelect = props.onSelect
    return null
  }
}))

jest.mock('@Pimcore/components/element-tree/node/tree-node', () => ({ TreeNode: () => null }))
jest.mock('@Pimcore/components/element-tree/pager/pager-container', () => ({ PagerContainer: () => null }))
jest.mock('@Pimcore/components/element-tree/skeleton/skeleton', () => ({ Skeleton: () => null }))
jest.mock('@Pimcore/components/box/box', () => ({ Box: () => null }))
jest.mock('@Pimcore/modules/element/tree/node/with-droppable/with-droppable-styling', () => ({
  withDroppableStyling: (component: unknown) => component
}))
jest.mock('@Pimcore/modules/asset/tree/search/search-container', () => ({ SearchContainer: () => null }))
jest.mock('@Pimcore/modules/asset/tree/node/with-draggable', () => ({ withDraggable: (component: unknown) => component }))
jest.mock('@Pimcore/modules/asset/tree/node/with-droppable/with-droppable', () => ({ withDroppable: (component: unknown) => component }))
jest.mock('@Pimcore/modules/asset/tree/node/with-action-states', () => ({ withActionStates: (component: unknown) => component }))
jest.mock('@Pimcore/modules/asset/tree/node/with-dnd-upload', () => ({ withDndUpload: (component: unknown) => component }))
jest.mock('@Pimcore/modules/asset/tree/node/with-context-menu', () => ({ withContextMenu: (component: unknown) => component }))
jest.mock('@Pimcore/modules/data-object/tree/search/search-container', () => ({ SearchContainer: () => null }))
jest.mock('@Pimcore/modules/data-object/tree/node/with-draggable', () => ({ withDraggable: (component: unknown) => component }))
jest.mock('@Pimcore/modules/data-object/tree/node/with-droppable/with-droppable', () => ({ withDroppable: (component: unknown) => component }))
jest.mock('@Pimcore/modules/data-object/tree/node/with-action-states', () => ({ withActionStates: (component: unknown) => component }))
jest.mock('@Pimcore/modules/data-object/tree/node/with-context-menu', () => ({ withContextMenu: (component: unknown) => component }))
jest.mock('@Pimcore/modules/document/tree/search/search-container', () => ({ SearchContainer: () => null }))
jest.mock('@Pimcore/modules/document/tree/node/with-draggable', () => ({ withDraggable: (component: unknown) => component }))
jest.mock('@Pimcore/modules/document/tree/node/with-droppable/with-droppable', () => ({ withDroppable: (component: unknown) => component }))
jest.mock('@Pimcore/modules/document/tree/node/with-action-states', () => ({ withActionStates: (component: unknown) => component }))
jest.mock('@Pimcore/modules/document/tree/node/with-context-menu', () => ({ withContextMenu: (component: unknown) => component }))

jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  setNodeOpeningInAllTree: () => ({ type: 'element-tree/setNodeOpeningInAllTree' })
}))

jest.mock('@Pimcore/components/element-tree/hooks/use-element-tree-root-node', () => ({
  useElementTreeRootNode: () => ({ rootNode: undefined, isLoading: false })
}))

jest.mock('@Pimcore/modules/app/component-registry/use-component-registry', () => ({
  useComponentRegistry: () => ({ get: () => undefined })
}))

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => jest.fn()
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ info: jest.fn() })
}))

jest.mock('@Pimcore/modules/asset/services/asset-opening-service', () => ({
  assetOpeningService: { openAsset: async (...args: unknown[]) => mockOpenAsset(...args) }
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-helper', () => ({
  useDataObjectHelper: () => ({ openDataObject: async (...args: unknown[]) => mockOpenDataObject(...args) })
}))

jest.mock('@Pimcore/modules/document/hooks/use-document-helper', () => ({
  useDocumentHelper: () => ({ openDocument: async (...args: unknown[]) => mockOpenDocument(...args) })
}))

const createNode = (view: boolean): TreeNode => ({
  id: '9',
  icon: { type: 'name', value: 'folder' },
  label: 'workspace-parent',
  permissions: { list: true, view },
  locked: null,
  isLocked: false
} as unknown as TreeNode)

describe.each([
  ['asset', AssetTreeContainer, mockOpenAsset],
  ['data object', DataObjectTreeContainer, mockOpenDataObject],
  ['document', DocumentTreeContainer, mockOpenDocument]
])('%s tree container', (_name, Container, mockOpen) => {
  beforeEach(() => {
    mockOnSelect = undefined
    mockOpen.mockClear()
    render(<Container id={ 1 } />)
  })

  it('does not open a node the user may only list', async () => {
    await mockOnSelect!(createNode(false))

    expect(mockOpen).not.toHaveBeenCalled()
  })

  it('opens a node the user may view', async () => {
    await mockOnSelect!(createNode(true))

    expect(mockOpen).toHaveBeenCalledTimes(1)
  })
})
