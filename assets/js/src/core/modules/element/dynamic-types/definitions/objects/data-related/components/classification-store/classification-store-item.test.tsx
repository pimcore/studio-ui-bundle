/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * A group offers its delete action unless deleting is disallowed by the store,
 * and labels its keys by the title the layout carries for them.
 */

// The `.styles` files pull in antd-style's untranspiled ESM build, which jest does not
// transform. Only the markup asserted below matters here.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { ClassificationStoreItem } from './classification-store-item'

const mockConfirm = jest.fn()
const mockObjectComponent = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

jest.mock('@Pimcore/components/form/item/provider/item/use-item', () => ({
  useItem: () => ({ name: ['store', '1', 'default'] })
}))
jest.mock('@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value', () => ({
  useKeyedListContext: () => ({ operations: { remove: jest.fn(), getValue: jest.fn() } })
}))
jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42, elementType: 'data-object' })
}))
jest.mock('./provider', () => ({
  useClassificationStore: () => ({ isNewGroup: () => false })
}))
jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: mockConfirm })
}))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component', () => ({
  ObjectComponent: (props: Record<string, unknown>) => {
    mockObjectComponent(props)

    return null
  }
}))
jest.mock('@Pimcore/components/panel/panel', () => ({
  Panel: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

const groupLayout = { id: 1, name: 'Dimensions', keys: [] } as any

// the shape the object layout delivers for a group that is already active when the object
// is reopened: a title on the key next to the one its definition carries. The two differ here
// only to pin down which one the component reads — on this path the backend still fills the
// key title from the definition, so today they arrive equal.
const keyedGroupLayout = {
  ...groupLayout,
  keys: [
    { id: 11, name: 'ef000001', title: 'Height', definition: { datatype: 'data', title: 'Legacy' } },
    { id: 12, name: 'ef000002', title: null, definition: { datatype: 'data' } }
  ]
}

describe('ClassificationStoreItem', () => {
  beforeEach(() => {
    mockConfirm.mockClear()
    mockObjectComponent.mockClear()
  })

  it('asks for confirmation when the group is deleted', async () => {
    render(
      <ClassificationStoreItem
        currentLayoutData={ [groupLayout] }
        groupLayout={ groupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    await userEvent.click(screen.getByRole('button', { name: 'delete' }))

    expect(mockConfirm).toHaveBeenCalledTimes(1)
  })

  it('hides the delete action when deleting is disallowed', () => {
    render(
      <ClassificationStoreItem
        currentLayoutData={ [groupLayout] }
        disallowDelete
        groupLayout={ groupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(screen.getByText('Dimensions')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'delete' })).not.toBeInTheDocument()
  })

  it('labels a key with its title, overriding the title of its definition', () => {
    render(
      <ClassificationStoreItem
        currentLayoutData={ [keyedGroupLayout] }
        groupLayout={ keyedGroupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(mockObjectComponent).toHaveBeenCalledWith(
      expect.objectContaining({ name: 11, title: 'Height' })
    )
  })

  it('labels a key without a title by its name', () => {
    render(
      <ClassificationStoreItem
        currentLayoutData={ [keyedGroupLayout] }
        groupLayout={ keyedGroupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(mockObjectComponent).toHaveBeenCalledWith(
      expect.objectContaining({ name: 12, title: 'ef000002' })
    )
  })
})
