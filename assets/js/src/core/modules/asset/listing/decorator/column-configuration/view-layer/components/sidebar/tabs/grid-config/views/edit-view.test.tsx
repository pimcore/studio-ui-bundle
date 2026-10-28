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
import { EditView, type EditViewProps } from './edit-view'

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

jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderToolbar }: { renderToolbar: React.ReactNode }) => <div>{renderToolbar}</div>
}))

jest.mock('@Pimcore/components/toolbar/toolbar', () => ({
  Toolbar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/space/space', () => ({
  Space: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/compact/compact', () => ({
  Compact: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/add-column-controls/add-column-controls', () => ({
  AddColumnControls: () => <div />
}))

jest.mock('../grid-config-list', () => ({
  GridConfigList: () => <div />
}))

jest.mock('../povider/settings/use-settings', () => ({
  useSettings: () => ({ saveEnabled: true })
}))

const props = {
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
  columns: [],
  gridConfig: { name: 'My template', ownerId: 2 },
  currentUserId: 2
} as unknown as EditViewProps

describe('Asset grid config EditView', () => {
  it('shows a tooltip on the template more button and still opens its menu on hover', async () => {
    render(<EditView { ...props } />)

    const button = screen.getByTestId('listing-grid-config-options-button')

    expect(button).toHaveAccessibleName('more-actions')

    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('more-actions')
    expect(await screen.findByText('grid.configuration.edit-template-details')).toBeInTheDocument()
  })
})
