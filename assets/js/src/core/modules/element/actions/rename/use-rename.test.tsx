/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const modalInput = jest.fn()
const elementPatch = jest.fn()
const getElementById = jest.fn()
const refreshGrid = jest.fn()
const dispatch = jest.fn()

jest.mock('@Pimcore/app/router/router', () => ({ baseUrl: '' }))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ input: modalInput })
}))

jest.mock('@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid', () => ({
  useRefreshGrid: () => ({ refreshGrid })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-api', () => ({
  useElementApi: () => ({ elementPatch, getElementById })
}))

jest.mock('@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission', () => ({
  useTreePermission: () => ({ isTreeActionAllowed: () => true })
}))

jest.mock('@Pimcore/modules/element/permissions/permission-helper', () => ({
  checkElementPermission: () => true
}))

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => dispatch
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => null
}))

jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  renameNode: (payload: unknown) => ({ type: 'renameNode', payload }),
  setNodeLoadingInAllTree: (payload: unknown) => ({ type: 'setNodeLoadingInAllTree', payload })
}))

jest.mock('@Pimcore/modules/data-object/data-object-draft-slice', () => ({
  updateKey: (payload: unknown) => ({ type: 'updateDataObjectKey', payload })
}))

jest.mock('@Pimcore/modules/document/document-draft-slice', () => ({
  updateKey: (payload: unknown) => ({ type: 'updateDocumentKey', payload })
}))

jest.mock('@Pimcore/modules/asset/asset-draft-slice', () => ({
  updateFilename: (payload: unknown) => ({ type: 'updateAssetFilename', payload })
}))

jest.mock('..', () => ({
  ContextMenuActionName: { rename: 'rename' }
}))

// eslint-disable-next-line import/first
import { act, renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useRename } from './use-rename'
// eslint-disable-next-line import/first
import { type Element } from '@Pimcore/modules/element/element-helper'
// eslint-disable-next-line import/first
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'

const customAttributes = {
  icon: null,
  tooltip: null,
  additionalIcons: [],
  key: 'car - test',
  additionalCssClasses: []
}

const buildDataObject = (): Element => ({
  id: 5,
  key: 'car',
  parentId: 1,
  isLocked: false,
  permissions: {},
  customAttributes
}) as unknown as Element

const buildTreeNode = (overrides: Partial<TreeNodeProps> = {}): TreeNodeProps => ({
  id: '5',
  parentId: '1',
  label: 'car - test',
  realKey: 'car',
  isLocked: false,
  permissions: {},
  ...overrides
}) as unknown as TreeNodeProps

const clickItem = async (item: unknown): Promise<void> => {
  await (item as { onClick: () => unknown }).onClick()
}

const lastModalConfig = (): { initialValue: string, onOk: (value: string) => Promise<void> } => {
  return modalInput.mock.calls[modalInput.mock.calls.length - 1][0]
}

describe('useRename', () => {
  beforeEach(() => {
    modalInput.mockReset()
    elementPatch.mockReset().mockResolvedValue(true)
    getElementById.mockReset()
    refreshGrid.mockReset()
    dispatch.mockReset()
  })

  it('pre-fills the dialog from the editor toolbar with the real key, not the custom attribute key', async () => {
    const { result } = renderHook(() => useRename('data-object'))

    const item = result.current.renameContextMenuItem(buildDataObject())
    await clickItem(item)

    expect(lastModalConfig().initialValue).toBe('car')
  })

  it('pre-fills the dialog from the tree context menu with the real key, not the display label', async () => {
    const { result } = renderHook(() => useRename('data-object'))

    const item = result.current.renameTreeContextMenuItem(buildTreeNode())
    await clickItem(item)

    expect(lastModalConfig().initialValue).toBe('car')
  })

  it('falls back to the tree node label when the node has no real key', async () => {
    const { result } = renderHook(() => useRename('data-object'))

    const item = result.current.renameTreeContextMenuItem(buildTreeNode({ realKey: undefined, label: 'legacy-label' }))
    await clickItem(item)

    expect(lastModalConfig().initialValue).toBe('legacy-label')
  })

  it('pre-fills the dialog from the grid context menu with the real key, not the custom attribute key', async () => {
    getElementById.mockResolvedValue(buildDataObject())
    const { result } = renderHook(() => useRename('data-object'))

    const item = result.current.renameGridContextMenuItem({
      original: { id: 5, isLocked: false, permissions: {} }
    })
    await clickItem(item)

    expect(lastModalConfig().initialValue).toBe('car')
  })

  it('labels the action as a folder rename when the toolbar target is a folder', () => {
    const { result } = renderHook(() => useRename('data-object'))

    const folderItem = result.current.renameContextMenuItem({ ...buildDataObject(), type: 'folder' } as unknown as Element)
    const objectItem = result.current.renameContextMenuItem(buildDataObject())

    expect(folderItem).toHaveProperty('label', 'element.rename-folder')
    expect(objectItem).toHaveProperty('label', 'element.rename')
  })

  it('labels the action as a folder rename when the tree node is a folder', () => {
    const { result } = renderHook(() => useRename('data-object'))

    const folderItem = result.current.renameTreeContextMenuItem(buildTreeNode({ type: 'folder' }))
    const objectItem = result.current.renameTreeContextMenuItem(buildTreeNode({ type: 'object' }))

    expect(folderItem).toHaveProperty('label', 'element.rename-folder')
    expect(objectItem).toHaveProperty('label', 'element.rename')
  })

  it('does not persist the custom attribute key when the pre-filled value is confirmed unchanged', async () => {
    const { result } = renderHook(() => useRename('data-object'))

    const item = result.current.renameContextMenuItem(buildDataObject())
    await clickItem(item)
    const { initialValue, onOk } = lastModalConfig()
    await act(async () => { await onOk(initialValue) })

    expect(elementPatch).toHaveBeenCalledWith({ body: { data: [{ id: 5, key: 'car' }] } })
  })
})
