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
import { SettingsProvider } from './povider/settings/settings-provider'
import { GridConfigList } from './grid-config-list'
import { EditView, type EditViewProps } from './views/edit-view'

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))
jest.mock('@Pimcore/components/stack-list/stack-list', () => ({
  StackList: ({ items, sortable }: any) => (
    <div data-sortable={ String(sortable) }>
      {items.map((item: any) => <div key={ item.id }>{item.children}{item.renderRightToolbar}</div>)}
    </div>
  )
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: (props: any) => <button aria-label={ props['aria-label'] } /> }))
jest.mock('@Pimcore/components/space/space', () => ({ Space: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/language-selection/language-selection', () => ({ LanguageSelection: () => null }))
jest.mock('@Pimcore/modules/app/settings/hooks/use-settings', () => ({ useSettings: () => ({ requiredLanguages: [] }) }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/search-mode-column-badge/search-mode-column-badge', () => ({
  SearchModeColumnBadge: () => null
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/search-mode-draft-columns', () => ({ isSearchModeDraftColumn: () => false }))
jest.mock('./hooks/use-grid-config', () => ({ useGridConfig: () => ({ setColumns: jest.fn() }) }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderToolbar, children }: any) => <div>{renderToolbar}{children}</div>
}))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/content/content', () => ({ Content: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/dropdown/dropdown', () => ({ Dropdown: ({ children }: any) => <>{children}</> }))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({ IconTextButton: () => null }))
jest.mock('@Pimcore/components/compact/compact', () => ({ Compact: ({ children }: any) => <>{children}</> }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/components/header/header', () => ({ Header: ({ children, title }: any) => <div>{title}{children}</div> }))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/add-column-controls/add-column-controls', () => ({
  AddColumnControls: () => <div data-testid="add-column-controls" />
}))

const columns: any[] = [{ key: 'filename', type: 'system.string', config: {}, localizable: false }]

const inSettings = (readOnly: boolean, children: React.ReactNode): React.JSX.Element => (
  <SettingsProvider settings={ { saveEnabled: false, readOnly } }>{children}</SettingsProvider>
)

const editViewProps: EditViewProps = {
  onCancelClick: jest.fn(),
  onSaveConfigurationClick: jest.fn(),
  onUpdateConfigurationClick: jest.fn(),
  onEditConfigurationClick: jest.fn(),
  onApplyClick: jest.fn(),
  onColumnSelect: jest.fn(),
  savedGridConfigurations: [],
  availableColumnsTree: [],
  isLoading: false,
  isUpdating: false,
  columns,
  gridConfig: undefined
}

describe('the asset and document column configuration in a read-only listing', () => {
  it('shows the columns without remove or drag', () => {
    render(inSettings(true, <GridConfigList columns={ columns } />))

    expect(screen.getByText('filename')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
    expect(screen.getByText('filename').closest('[data-sortable]')).toHaveAttribute('data-sortable', 'false')
  })

  it('keeps remove and drag in an editable listing', () => {
    render(inSettings(false, <GridConfigList columns={ columns } />))

    expect(screen.getByRole('button', { name: 'remove' })).toBeInTheDocument()
    expect(screen.getByText('filename').closest('[data-sortable]')).toHaveAttribute('data-sortable', 'true')
  })

  it('opens the column configuration without add or apply', () => {
    render(inSettings(true, <EditView { ...editViewProps } />))

    expect(screen.getByText('listing.grid-config.title')).toBeInTheDocument()
    expect(screen.getByText('filename')).toBeInTheDocument()
    expect(screen.queryByTestId('add-column-controls')).not.toBeInTheDocument()
    expect(screen.queryByTestId('listing-grid-config-apply-button')).not.toBeInTheDocument()
  })

  it('keeps add and apply in an editable listing', () => {
    render(inSettings(false, <EditView { ...editViewProps } />))

    expect(screen.getByTestId('add-column-controls')).toBeInTheDocument()
    expect(screen.getByTestId('listing-grid-config-apply-button')).toBeInTheDocument()
  })
})
