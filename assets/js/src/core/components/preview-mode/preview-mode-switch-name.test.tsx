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
import { PreviewModeProvider } from './preview-mode-provider'
import { PreviewModeSwitch } from './preview-mode-switch'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

const renderSwitch = (): void => {
  render(
    <PreviewModeProvider>
      <PreviewModeSwitch />
    </PreviewModeProvider>
  )
}

describe('PreviewModeSwitch accessible name', () => {
  it('AC1: the switch role has the accessible name of the visible label key', () => {
    renderSwitch()

    expect(screen.getByRole('switch', { name: 'preview-mode.switch' })).toBeTruthy()
  })

  it('AC2: shows the visible label once and toggles aria-checked on click', () => {
    renderSwitch()

    expect(screen.getAllByText('preview-mode.switch')).toHaveLength(1)

    const toggle = screen.getByRole('switch')
    expect(toggle.getAttribute('aria-checked')).toBe('false')
    fireEvent.click(toggle)
    expect(toggle.getAttribute('aria-checked')).toBe('true')
  })
})
