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
import { ImagePreviewDropdown } from './dropdown'

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

describe('ImagePreviewDropdown', () => {
  it('shows a tooltip on the more button, opens its menu and hides the tooltip while the menu is open', async () => {
    render(<ImagePreviewDropdown dropdownItems={ [{ key: 'open', label: 'open-item' }] } />)

    const button = screen.getByRole('button', { name: 'more-actions' })

    fireEvent.mouseEnter(button)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('more-actions')

    fireEvent.click(button)
    expect(await screen.findByText('open-item')).toBeInTheDocument()
    await waitFor(() => { expect(screen.queryByRole('tooltip')).toBeNull() })
  })
})
