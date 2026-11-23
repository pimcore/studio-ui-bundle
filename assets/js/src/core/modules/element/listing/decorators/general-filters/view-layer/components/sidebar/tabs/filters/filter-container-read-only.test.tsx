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
import { render, screen } from '@testing-library/react'
import { Input } from 'antd'
import { FilterContainerInner } from './filter-container-inner'

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderToolbar, children }: any) => <div>{renderToolbar}{children}</div>
}))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/content/content', () => ({ Content: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/title/title', () => ({ Title: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/switch/switch', () => ({ Switch: () => null }))
jest.mock('@Pimcore/components/form/form', () => ({ Form: ({ children }: any) => <form>{children}</form> }))
jest.mock('@Pimcore/components/column-picker/column-picker-popover', () => ({ ColumnPickerPopover: ({ children }: any) => <>{children}</> }))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({
  IconTextButton: ({ children, ...props }: any) => <button data-testid={ props['data-testid'] }>{children}</button>
}))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, ...props }: any) => <button data-testid={ props['data-testid'] }>{children}</button>
}))
jest.mock('@Pimcore/components/field-filters/field-filters', () => ({ FieldFilters: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/multi-value-filter-support', () => ({ MultiValueFilterSupportProvider: ({ children }: any) => <>{children}</> }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/empty-filter-support', () => ({ EmptyFilterSupportProvider: ({ children }: any) => <>{children}</> }))
jest.mock('../../../../../element-filters', () => ({
  useDraftFilters: () => ({}),
  useElementFilterContext: () => ({}),
  elementFilterDefinitions: []
}))
jest.mock('./use-filter-panel', () => ({
  useFilterPanel: () => ({
    isPqlFilterEnabled: false,
    applyFilters: jest.fn(),
    onApplyClick: jest.fn(),
    onClearAllClick: jest.fn(),
    onPqlFilterToggle: jest.fn(),
    fieldFilterEditor: { filters: [], onFilterChange: jest.fn(), onFilterCommit: jest.fn(), columnGroups: [], handleColumnClick: jest.fn() }
  })
}))

// the panel's own controls are antd components; the read-only switch reaches them through antd's disabled context
jest.mock('@Pimcore/components/filters', () => ({
  FilterCommitProvider: ({ children }: any) => <>{children}</>,
  FiltersRenderer: ({ section }: any) => section === 'controls' ? <MockAntdInput aria-label="filter-control" /> : null
}))
const MockAntdInput = (props: any): React.JSX.Element => <Input { ...props } />

describe('the general filters sidebar in a read-only listing', () => {
  it('shows the filters without add, clear or apply, and with every control disabled', () => {
    render(<FilterContainerInner readOnly />)

    expect(screen.getByText('sidebar.search_filter')).toBeInTheDocument()
    expect(screen.getByLabelText('filter-control')).toBeDisabled()
    expect(screen.queryByTestId('listing-field-filter-add-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('listing-filter-clear-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('listing-filter-apply-button')).not.toBeInTheDocument()
  })

  it('keeps them editable otherwise', () => {
    render(<FilterContainerInner />)

    expect(screen.getByLabelText('filter-control')).toBeEnabled()
    expect(screen.getByTestId('listing-field-filter-add-button')).toBeInTheDocument()
    expect(screen.getByTestId('listing-filter-apply-button')).toBeInTheDocument()
  })
})
