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
import React from 'react'
import { TreeFilterProvider } from '@Pimcore/components/element-tree/provider/tree-filter-provider/tree-filter-provider'
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { useAddObject } from './use-add-object'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => jest.fn()
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => null
}))

jest.mock('@Pimcore/components/spin/spin', () => ({
  Spin: () => null
}))

jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ input: jest.fn() })
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

jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: () => true
}))

const createClassDefinition = (id: string, name: string, group?: string): ClassDefinitionListItem => ({
  id,
  name,
  title: name,
  group: group ?? null,
  icon: { type: 'name', value: 'class' }
} as unknown as ClassDefinitionListItem)

jest.mock('@Pimcore/modules/class-definition/class-definition-slice.gen', () => ({
  useClassDefinitionCollectionCreatableQuery: () => ({
    data: {
      items: [
        createClassDefinition('CAR', 'Car'),
        createClassDefinition('EV', 'ElectricCar'),
        createClassDefinition('ACC', 'Accessory')
      ],
      totalItems: 3
    },
    isLoading: false,
    error: undefined
  })
}))

const node: TreeNodeProps = {
  id: '1',
  permissions: { create: true }
} as unknown as TreeNodeProps

interface MenuItemWithChildren {
  key: string
  hidden?: boolean
  children?: ItemType[]
}

const getMenuItem = (classIds?: string[]): MenuItemWithChildren => {
  const wrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
    <TreeFilterProvider
      classIds={ classIds }
      pageSize={ 30 }
    >
      {children}
    </TreeFilterProvider>
  )

  const { result } = renderHook(() => useAddObject(), { wrapper })

  return result.current.addObjectTreeContextMenuItem(node) as unknown as MenuItemWithChildren
}

const collectKeys = (items: ItemType[] | undefined): string[] => {
  if (items === undefined) {
    return []
  }

  return items.flatMap((item) => {
    const typedItem = item as unknown as MenuItemWithChildren
    return [typedItem.key, ...collectKeys(typedItem.children)]
  })
}

describe('useAddObject - add object tree context menu', () => {
  it('offers all creatable classes when the tree has no class restriction', () => {
    const menuItem = getMenuItem(undefined)

    expect(menuItem.hidden).toBe(false)
    expect(collectKeys(menuItem.children)).toEqual(expect.arrayContaining(['CAR', 'EV', 'ACC']))
  })

  it('only offers the allowed classes when the tree restricts them', () => {
    const menuItem = getMenuItem(['CAR'])

    const keys = collectKeys(menuItem.children)
    expect(keys).toContain('CAR')
    expect(keys).not.toContain('EV')
    expect(keys).not.toContain('ACC')
  })

  it('hides the menu entry when no creatable class is allowed', () => {
    const menuItem = getMenuItem(['UNKNOWN_CLASS'])

    expect(menuItem.hidden).toBe(true)
    expect(collectKeys(menuItem.children)).toHaveLength(0)
  })

  it('matches the restriction against class ids, not class names', () => {
    // 'ElectricCar' is the name of the class with the id 'EV', so it must not match
    const menuItem = getMenuItem(['ElectricCar'])

    expect(menuItem.hidden).toBe(true)
    expect(collectKeys(menuItem.children)).toHaveLength(0)
  })
})
