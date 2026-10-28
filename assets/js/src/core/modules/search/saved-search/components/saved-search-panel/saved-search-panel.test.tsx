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
import { SavedSearchPanel } from './saved-search-panel'

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

// The Studio dropdown pulls in the whole app graph; antd's dropdown triggers the same way.
jest.mock('@Pimcore/components/dropdown/dropdown', () => ({
  Dropdown: jest.requireActual('antd').Dropdown
}))

jest.mock('@Pimcore/components/form/form', () => ({
  Form: { useForm: () => [{ setFieldsValue: jest.fn(), resetFields: jest.fn() }] }
}))

jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderToolbar }: { renderToolbar: React.ReactNode }) => <div>{renderToolbar}</div>
}))

jest.mock('@Pimcore/components/toolbar/toolbar', () => ({
  Toolbar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/compact/compact', () => ({
  Compact: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({
  useStudioModal: () => ({ modal: { confirm: jest.fn() } })
}))

jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({
  useUser: () => ({ id: 2, username: 'admin' })
}))

jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  useUserGetByIdQuery: () => ({ data: undefined })
}))

jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({ useDataQueryHelper: () => ({ getArgs: () => ({}) }) })
}))

jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ selectedColumns: [] })
}))

jest.mock('@Pimcore/modules/search/provider/use-search', () => ({
  useSearch: () => ({ loadedSavedSearch: { id: 5, name: 'My search', ownerId: 2, shareGlobal: true } })
}))

jest.mock('@Pimcore/modules/search/saved-search/utils/resolve-element-type', () => ({
  resolveSavedSearchElementType: () => 'asset'
}))

jest.mock('@Pimcore/utils/date-time', () => ({
  formatDateTime: () => ''
}))

jest.mock('@Pimcore/app/store', () => ({
  useAppSelector: () => false
}))

jest.mock('@Pimcore/modules/search/saved-search/dirty/saved-search-dirty-slice', () => ({
  selectSavedSearchDirty: jest.fn()
}))

jest.mock('./saved-search-form', () => ({
  SavedSearchForm: () => <div />,
  defaultValues: { shareGlobally: true }
}))

jest.mock('./use-saved-search-mutations', () => ({
  useSavedSearchMutations: () => ({ isSaving: false, isUpdating: false, isDeleting: false })
}))

jest.mock('./use-saved-search-meta-dirty', () => ({
  useSavedSearchMetaDirty: jest.fn()
}))

describe('SavedSearchPanel', () => {
  it('shows a tooltip on the more button of an own search and still opens its menu on hover', async () => {
    render(
      <SavedSearchPanel
        elementType='asset'
        supportsLoadedState
      />
    )

    const button = screen.getByTestId('saved-search-more-button')

    expect(button).toHaveAccessibleName('more-actions')

    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('more-actions')
    expect(await screen.findByText('saved-search.delete-search')).toBeInTheDocument()
  })
})
