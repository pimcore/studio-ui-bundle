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
import { fireEvent, render, screen } from '@testing-library/react'
import { ItemsSidebar } from './sidebar'

const mockRefetch = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style ships untranspiled ESM. Styling is irrelevant to this behaviour.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} }),
  css: jest.fn(),
  cx: jest.fn(),
  keyframes: jest.fn()
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

// The SDK barrel pulls in the whole app graph; only the real IconButton matters here.
jest.mock('@sdk/components', () => ({
  Content: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ContentLayout: ({ renderToolbar, children }: { renderToolbar: React.ReactNode, children: React.ReactNode }) => <div>{renderToolbar}{children}</div>,
  Icon: () => <span />,
  IconButton: jest.requireActual('@Pimcore/components/icon-button/icon-button').IconButton,
  IconTextButton: () => null,
  SearchInput: () => null,
  Toolbar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TreeElement: () => null,
  useFormModal: () => ({ confirm: jest.fn() })
}))

jest.mock('@sdk/modules/app', () => ({
  ApiError: jest.fn(),
  trackError: jest.fn()
}))

jest.mock('@sdk/utils', () => ({
  isEmptyValue: (value: unknown) => value === undefined || value === null || value === '',
  useDebounce: (value: unknown) => value
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/settings-provider', () => ({
  useSettings: () => ({
    useItemsQuery: () => ({ isLoading: false, isFetching: false, data: { items: [] }, refetch: mockRefetch })
  })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/provider', () => ({
  useItems: () => ({ setActiveConfiguration: jest.fn(), activeConfiguration: undefined, closeConfiguration: jest.fn() })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/sidebar.styles', () => ({
  useStyles: () => ({ styles: {} })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/sidebar/add-modal', () => ({
  AddModalProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/sidebar/modal-holder', () => ({
  SidebarModalHolder: () => null
}))

describe('ItemsSidebar', () => {
  it('shows a tooltip on the refresh button and still refetches the list', async () => {
    render(<ItemsSidebar />)
    const button = screen.getByRole('button', { name: 'refresh' })

    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('refresh')

    fireEvent.click(button)
    expect(mockRefetch).toHaveBeenCalledTimes(1)
  })
})
