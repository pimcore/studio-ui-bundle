/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { type TreeNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { useTreeNodeOpenPermission } from './use-tree-node-open-permission'

const mockInfo = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ info: mockInfo })
}))

const createNode = (view?: boolean): TreeNode => ({
  id: '9',
  icon: { type: 'name', value: 'folder' },
  label: 'workspace-parent',
  permissions: view === undefined ? undefined : {
    list: true,
    view,
    publish: false,
    delete: false,
    rename: false,
    create: false,
    settings: false,
    versions: false,
    properties: false
  },
  locked: null,
  isLocked: false
} as unknown as TreeNode)

describe('useTreeNodeOpenPermission', () => {
  beforeEach(() => {
    mockInfo.mockClear()
  })

  it('allows opening a node the user may view', () => {
    const { result } = renderHook(() => useTreeNodeOpenPermission())

    expect(result.current(createNode(true))).toBe(true)
    expect(mockInfo).not.toHaveBeenCalled()
  })

  it('tells the user when a node may only be listed', () => {
    const { result } = renderHook(() => useTreeNodeOpenPermission())

    expect(result.current(createNode(false))).toBe(false)
    expect(mockInfo).toHaveBeenCalledWith({
      content: 'element.tree.open-no-permission',
      key: 'element-tree-open-no-permission'
    })
  })

  it('refuses a node without permissions', () => {
    const { result } = renderHook(() => useTreeNodeOpenPermission())

    expect(result.current(createNode())).toBe(false)
  })
})
