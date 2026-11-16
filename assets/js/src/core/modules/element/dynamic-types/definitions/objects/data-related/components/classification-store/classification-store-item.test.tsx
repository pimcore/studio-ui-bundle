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
 * A group offers its delete action unless deleting is disallowed by the store.
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
const mockIsNewKey = jest.fn()

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
  useClassificationStore: () => ({ isNewGroup: () => false, isNewKey: mockIsNewKey })
}))
jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: mockConfirm })
}))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component', () => ({
  ObjectComponent: ({ technicalName }: { technicalName: string }) => <div data-testid='key'>{technicalName}</div>
}))
jest.mock('@Pimcore/components/panel/panel', () => ({
  Panel: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

const groupLayout = { id: 1, name: 'Dimensions', keys: [] } as any

describe('ClassificationStoreItem', () => {
  beforeEach(() => {
    mockConfirm.mockClear()
    mockIsNewKey.mockReset()
    mockIsNewKey.mockReturnValue(false)
  })

  describe('hide empty data', () => {
    const keyLayout = (id: number, name: string, mandatory = false): object => ({ id, name, definition: { mandatory } })
    const layoutWithKeys = { id: 1, name: 'Dimensions', keys: [keyLayout(1, 'old'), keyLayout(2, 'arrived'), keyLayout(3, 'required', true)] } as any

    const renderHidden = (): void => {
      render(
        <ClassificationStoreItem
          classificationStoreName='technicalAttributes'
          currentLayoutData={ [layoutWithKeys] }
          groupLayout={ layoutWithKeys }
          hideEmptyData
          updateCurrentLayoutData={ jest.fn() }
        />
      )
    }

    it('hides empty keys except mandatory ones', () => {
      renderHidden()

      expect(screen.getAllByTestId('key').map((node) => node.textContent)).toEqual(['required'])
    })

    it('shows a key that arrived through a configuration refresh although it is empty', () => {
      mockIsNewKey.mockImplementation((groupId: string, keyId: string) => groupId === '1' && keyId === '2')

      renderHidden()

      expect(screen.getAllByTestId('key').map((node) => node.textContent)).toEqual(['arrived', 'required'])
    })
  })

  it('asks for confirmation when the group is deleted', async () => {
    render(
      <ClassificationStoreItem
        classificationStoreName='technicalAttributes'
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
        classificationStoreName='technicalAttributes'
        currentLayoutData={ [groupLayout] }
        disallowDelete
        groupLayout={ groupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(screen.getByText('Dimensions')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'delete' })).not.toBeInTheDocument()
  })
})
