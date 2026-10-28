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
import { AddColumnControls } from './add-column-controls'

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

jest.mock('@Pimcore/components/column-picker/column-picker-popover', () => ({
  ColumnPickerPopover: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

describe('AddColumnControls', () => {
  beforeEach(() => {
    globalThis.ResizeObserver = jest.fn(() => ({ observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn() }))
    // the toolbar squeezes the two buttons, so they collapse into the split button
    jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(200)
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('shows a tooltip on the more button of the split button and still opens its menu on hover', async () => {
    render(
      <AddColumnControls
        groups={ [] }
        onAddAdvancedColumn={ jest.fn() }
        onColumnSelect={ jest.fn() }
      />
    )

    const button = screen.getByTestId('listing-grid-config-add-advanced-button')

    expect(button).toHaveAccessibleName('more-actions')

    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('more-actions')
    expect(await screen.findByText('listing.add-column.advanced')).toBeInTheDocument()
  })
})
