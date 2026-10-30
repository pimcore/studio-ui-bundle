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
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ItemDetail } from './detail'

const mockRefetchDetail = jest.fn(async () => ({}))
const mockSetDetailView = jest.fn()

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
  ConfigLayout: () => null,
  Content: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ContentLayout: ({ renderToolbar, children }: { renderToolbar: React.ReactNode, children: React.ReactNode }) => <div>{renderToolbar}{children}</div>,
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  IconButton: jest.requireActual('@Pimcore/components/icon-button/icon-button').IconButton,
  Toolbar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@sdk/modules/app', () => ({
  ApiError: jest.fn(),
  trackError: jest.fn()
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/settings-provider', () => ({
  useSettings: () => ({
    useDetailGeneralSettingsQuery: () => ({ isLoading: false, isFetching: false, refetch: mockRefetchDetail, data: undefined }),
    LayoutProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    readOnly: true
  })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/provider', () => ({
  useItems: () => ({ setDetailView: mockSetDetailView })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/detail/refresh-provider', () => ({
  RefreshProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider', () => ({
  GeneralSettingsProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/custom-layout/custom-layout', () => ({ CustomLayout: () => null }))
jest.mock('@Pimcore/modules/field-definitions/components/editor/items/detail/content', () => ({ DetailContent: () => null }))
jest.mock('@Pimcore/modules/field-definitions/components/editor/items/detail/save', () => ({ DetailSave: () => null }))
jest.mock('@Pimcore/modules/field-definitions/components/editor/items/detail/sidebar', () => ({ DetailSidebar: () => null }))
jest.mock('@Pimcore/modules/field-definitions/components/editor/items/detail/import-export-actions', () => ({ ImportExportActions: () => null }))

describe('ItemDetail', () => {
  it('shows a tooltip on the refresh button and still reloads the definition', async () => {
    render(<ItemDetail configuration={ { id: 'CAR', name: 'Car' } } />)
    const button = screen.getByRole('button', { name: 'refresh' })

    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('refresh')

    fireEvent.click(button)
    expect(mockRefetchDetail).toHaveBeenCalledTimes(1)
    await waitFor(() => { expect(mockSetDetailView).toHaveBeenCalledWith('general') })
  })
})
