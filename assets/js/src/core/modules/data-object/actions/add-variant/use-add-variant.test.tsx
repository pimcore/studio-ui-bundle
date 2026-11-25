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
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { useAddVariant } from './use-add-variant'

const mockModalInput = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => jest.fn()
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => null
}))

jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ input: mockModalInput })
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError extends Error {},
  GeneralError: class GeneralError extends Error {}
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectAddMutation: () => [jest.fn()]
}))

jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  refreshNodeChildren: jest.fn()
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-helper', () => ({
  useDataObjectHelper: () => ({ openDataObject: jest.fn() })
}))

jest.mock('@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission', () => ({
  useTreePermission: () => ({ isTreeActionAllowed: () => true })
}))

// All class definitions; ExampleProduct is not among the classes the user may create objects of
const mockAllClassDefinitions: ClassDefinitionListItem[] = [
  { id: 'BRAND', name: 'ExampleBrand' } as unknown as ClassDefinitionListItem,
  { id: 'PRODUCT', name: 'ExampleProduct' } as unknown as ClassDefinitionListItem
]

jest.mock('@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions', () => ({
  useClassDefinitions: () => ({
    getByName: (name: string) => mockAllClassDefinitions.find((classDefinition) => classDefinition.name === name),
    getClassDefinitionsForCurrentUser: () => [mockAllClassDefinitions[0]]
  })
}))

interface MenuItem {
  hidden?: boolean
  onClick: () => void
}

const createNode = (className: string): TreeNodeProps => ({
  id: '42',
  permissions: { create: true },
  metaData: { dataObject: { className } }
} as unknown as TreeNodeProps)

const getMenuItem = (className: string): MenuItem => {
  const { result } = renderHook(() => useAddVariant())

  return result.current.addVariantTreeContextMenuItem(createNode(className)) as unknown as MenuItem
}

describe('useAddVariant - add variant tree context menu', () => {
  beforeEach(() => {
    mockModalInput.mockClear()
  })

  it('shows the menu entry and opens the dialog when the user may create objects of the class of the node', () => {
    const menuItem = getMenuItem('ExampleBrand')

    expect(menuItem.hidden).toBe(false)

    menuItem.onClick()

    expect(mockModalInput).toHaveBeenCalledTimes(1)
  })

  it('shows the menu entry and opens the dialog even when the class of the node is not among the classes the user may create objects of', () => {
    const menuItem = getMenuItem('ExampleProduct')

    expect(menuItem.hidden).toBe(false)

    menuItem.onClick()

    expect(mockModalInput).toHaveBeenCalledTimes(1)
  })

  it('hides the menu entry when the class definition of the node is unknown', () => {
    const menuItem = getMenuItem('UnknownClass')

    expect(menuItem.hidden).toBe(true)
  })

  it('does not throw nor open the dialog when clicked for an unknown class definition', () => {
    const menuItem = getMenuItem('UnknownClass')

    expect(() => { menuItem.onClick() }).not.toThrow()
    expect(mockModalInput).not.toHaveBeenCalled()
  })
})
