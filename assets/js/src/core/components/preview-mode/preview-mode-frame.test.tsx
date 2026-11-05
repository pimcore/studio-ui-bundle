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
import { act, fireEvent, render, screen } from '@testing-library/react'
import { PreviewModeProvider, usePreviewMode } from './preview-mode-provider'
import { PreviewModeBar } from './preview-mode-bar'
import { PreviewModeSwitch } from './preview-mode-switch'
import { useStyles } from './preview-mode-bar.styles'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// renders the style factory with a fake token and returns the css text per class
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: (factory: any) => (props: any = { x: 0, y: 0 }) => {
    const css = (strings: TemplateStringsArray, ...values: unknown[]): string =>
      strings.reduce((acc, str, i) => acc + str + String(values[i] ?? ''), '')
    const rules = factory({ token: { colorBorderSecondary: 'SECONDARY_BORDER', paddingXS: 8, paddingXXS: 4 }, css }, props)
    return { styles: rules, cx: () => '', theme: {} }
  },
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Disabled: 'disabled', Single: 'single', Multiple: 'multiple' }
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({
  useElementSelector: () => ({ open: jest.fn() })
}))

jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))

jest.mock('@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control', () => ({
  PermissionBasedLanguageSelectionControl: ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
    <button
      data-testid="language-switch"
      onClick={ () => { onChange('de') } }
    >{value}</button>
  )
}))


const LanguageProbe = (): React.JSX.Element => {
  const { language } = usePreviewMode()
  return <span data-testid="language">{String(language)}</span>
}

describe('preview mode value frame, divider and language switch', () => {
  it('AC1: the value has no border, radius, background or shadow on the grid\'s table parts', () => {
    const { styles } = useStyles()
    const value = String(styles.value)

    expect(value).toContain('.ant-table-cell')
    expect(value).toContain('.ant-table-cell::before')
    expect(value).toContain('.ant-table-content table')
    expect(value).toMatch(/border: 0 !important/)
    expect(value).toMatch(/border-radius: 0 !important/)
    expect(value).toMatch(/background: transparent !important/)
  })

  it('AC2: the divider takes the theme\'s secondary border colour', () => {
    const { styles } = useStyles()
    expect(String(styles.divider)).toContain('border-color: SECONDARY_BORDER')
  })

  it('AC3: the language switch shows with preview off and keeps its value across the toggle', () => {
    render(
      <PreviewModeProvider>
        <PreviewModeSwitch />
        <PreviewModeBar showItem={ false } />
        <LanguageProbe />
      </PreviewModeProvider>
    )

    expect(screen.getByTestId('language-switch')).toHaveTextContent('en')
    expect(screen.queryByText('preview-mode.preview-item')).not.toBeInTheDocument()

    act(() => { fireEvent.click(screen.getByTestId('language-switch')) })
    expect(screen.getByTestId('language')).toHaveTextContent('de')

    act(() => { fireEvent.click(screen.getByRole('switch')) })
    expect(screen.getByTestId('language-switch')).toHaveTextContent('de')
    expect(screen.getByTestId('language')).toHaveTextContent('de')

    act(() => { fireEvent.click(screen.getByRole('switch')) })
    expect(screen.getByTestId('language-switch')).toHaveTextContent('de')
  })
})
