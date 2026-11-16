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
 * The key definition dialog keeps showing the key it was opened for, whether or not the
 * page the keys grid currently holds still contains it.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { KeysTab } from './keys-tab'

const mockModal = jest.fn()
let mockItems: any[] = []

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))
jest.mock('antd', () => ({ theme: { useToken: () => ({ token: {} }) } }))
jest.mock('@Pimcore/app/config/app-config', () => ({ appConfig: { defaultPageSize: 10 } }))
jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({
  useStudioModal: () => ({ localModal: { confirm: jest.fn() } })
}))
jest.mock('@sdk/app', () => ({
  serviceIds: { 'DynamicTypes/FieldDefinitionRegistry': 'registry' },
  useInjection: () => ({ getTypesByTags: () => [] })
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({ __esModule: true, default: jest.fn(), ApiError: jest.fn() }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }))
jest.mock('@Pimcore/components/form/form', () => ({
  Form: { useForm: () => [{}], Item: ({ children }: { children: React.ReactNode }) => <>{children}</> }
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ onClick, tooltip }: { onClick: () => void, tooltip: { title: string } }) => (
    <button
      onClick={ onClick }
      type='button'
    >
      {tooltip.title}
    </button>
  )
}))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({ IconTextButton: () => null }))
jest.mock('@Pimcore/components/input/input', () => ({ Input: () => null }))
jest.mock('@Pimcore/components/search-input/search-input', () => ({ SearchInput: () => null }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({ ContentLayout: ({ children }: { children: React.ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/components/header/header', () => ({ Header: () => null }))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: () => null }))
jest.mock('@Pimcore/components/pagination/pagination', () => ({ Pagination: () => null }))
jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: ({ columns, data }: { columns: any[], data: any[] }) => (
    <>{data.map((row) => <div key={ row.id }>{columns.find((column) => column.id === 'actions').cell({ row: { original: row } })}</div>)}</>
  )
}))
jest.mock('./keys/key-definition-modal', () => ({
  KeyDefinitionModal: (props: { keyDetail?: { name: string, type: string }, open: boolean }) => {
    mockModal(props)
    return props.open ? <div data-testid='dialog'>{props.keyDetail?.name}:{props.keyDetail?.type}</div> : null
  }
}))
jest.mock('@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced', () => ({
  useClassificationStoreConfigurationKeyCollectionQuery: () => ({
    data: { items: mockItems, totalItems: mockItems.length },
    isLoading: false,
    isFetching: false,
    refetch: jest.fn()
  }),
  useClassificationStoreConfigurationKeyCreateMutation: () => [jest.fn()],
  useClassificationStoreConfigurationKeyDeleteMutation: () => [jest.fn()],
  useClassificationStoreConfigurationKeyUpdateMutation: () => [jest.fn()]
}))

const key = (type: string): object => ({ id: 5, name: 'Width', type, description: null, definition: null })

describe('KeysTab definition dialog', () => {
  beforeEach(() => {
    mockModal.mockClear()
    mockItems = [key('input')]
  })

  it('keeps showing the key when the live page no longer holds it', async () => {
    const { rerender } = render(<KeysTab storeId={ 1 } />)
    await userEvent.click(screen.getByRole('button', { name: 'classification-store.edit-definition' }))
    expect(screen.getByTestId('dialog')).toHaveTextContent('Width:input')

    mockItems = []
    rerender(<KeysTab storeId={ 1 } />)

    expect(screen.getByTestId('dialog')).toHaveTextContent('Width:input')
  })

  it('shows the live values while the key is in the live page', async () => {
    const { rerender } = render(<KeysTab storeId={ 1 } />)
    await userEvent.click(screen.getByRole('button', { name: 'classification-store.edit-definition' }))

    mockItems = [key('numeric')]
    rerender(<KeysTab storeId={ 1 } />)

    expect(screen.getByTestId('dialog')).toHaveTextContent('Width:numeric')
  })
})
