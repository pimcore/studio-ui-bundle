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
import { ColumnPreview } from './column-preview'
import { getFallbackItem } from './fallback-item'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: { description: 'description' }, cx: () => '', theme: {} }),
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

describe('preview mode design', () => {
  it('AC1: the bar shows the ID and the last two path parts of the fallback item, full path in the tooltip', async () => {
    render(
      <PreviewModeProvider
        defaultEnabled
        fallbackItem={ { id: 9, fullpath: '/Product Data/Cars/Roadster/Some Car' } }
      >
        <PreviewModeBar />
      </PreviewModeProvider>
    )

    const info = screen.getByText(/ID: 9/)
    expect(info).toHaveTextContent('.../ Roadster/ Some Car')
    expect(info.className).toContain('description')
    fireEvent.mouseEnter(info)
    expect(await screen.findByText('/Product Data/Cars/Roadster/Some Car')).toBeInTheDocument()
  })

  it('AC1: the fallback item takes its path from the grid row\'s fullpath column', () => {
    expect(getFallbackItem({ id: 9, columns: [{ key: 'id', value: 9 }, { key: 'fullpath', value: '/a/b' }] }))
      .toEqual({ id: 9, fullpath: '/a/b' })
    expect(getFallbackItem({ id: 9, fullpath: '/x/y' })).toEqual({ id: 9, fullpath: '/x/y' })
    expect(getFallbackItem({ id: 9 })).toEqual({ id: 9, fullpath: undefined })
    expect(getFallbackItem(undefined)).toBeNull()
  })

  it('AC2: the bar has a language switch at its end that sets the preview language', () => {
    render(
      <PreviewModeProvider defaultEnabled>
        <PreviewModeBar />
        <LanguageProbe />
      </PreviewModeProvider>
    )

    expect(screen.getByTestId('language-switch')).toHaveTextContent('en')
    act(() => { fireEvent.click(screen.getByTestId('language-switch')) })
    expect(screen.getByTestId('language')).toHaveTextContent('de')
    expect(screen.getByTestId('language-switch')).toHaveTextContent('de')
  })

  it('AC2: the language switch can be left out with a prop', () => {
    render(
      <PreviewModeProvider defaultEnabled>
        <PreviewModeBar showLanguageSwitch={ false } />
      </PreviewModeProvider>
    )
    expect(screen.queryByTestId('language-switch')).not.toBeInTheDocument()
  })

  it('AC3: a column preview is a body row with a divider, the label "Preview" and the value', () => {
    render(
      <PreviewModeProvider defaultEnabled>
        <ColumnPreview source={ { value: <span>the value</span> } } />
      </PreviewModeProvider>
    )

    const row = screen.getByTestId('preview-mode-column-preview-row')
    expect(screen.getByTestId('preview-mode-column-preview-divider')).toBeInTheDocument()
    expect(row).toHaveTextContent('preview-mode.preview')
    expect(row).toHaveTextContent('the value')
  })

  it('AC3: loading and error states sit in the same row', () => {
    const { rerender } = render(
      <PreviewModeProvider defaultEnabled>
        <ColumnPreview source={ { isLoading: true } } />
      </PreviewModeProvider>
    )
    expect(screen.getByTestId('preview-mode-column-preview-row')).toContainElement(screen.getByTestId('preview-mode-column-preview-loading'))

    rerender(
      <PreviewModeProvider defaultEnabled>
        <ColumnPreview source={ { error: 'boom' } } />
      </PreviewModeProvider>
    )
    expect(screen.getByTestId('preview-mode-column-preview-row')).toHaveTextContent('boom')
  })

  it('AC4: with preview mode off there is no divider, no Preview row and no language switch', () => {
    render(
      <PreviewModeProvider>
        <PreviewModeBar />
        <ColumnPreview source={ { value: <span>the value</span> } } />
      </PreviewModeProvider>
    )

    expect(screen.queryByTestId('preview-mode-column-preview-row')).not.toBeInTheDocument()
    expect(screen.queryByTestId('preview-mode-column-preview-divider')).not.toBeInTheDocument()
    expect(screen.queryByTestId('language-switch')).not.toBeInTheDocument()
  })

  it('AC5: the SDK keeps exporting the same names (new props are optional)', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sdk = require('../../../sdk/components/preview-mode')
    expect(Object.keys(sdk)).toEqual(expect.arrayContaining([
      'PreviewModeProvider', 'usePreviewMode', 'usePreviewModeOptional', 'PreviewModeSwitch', 'PreviewModeBar', 'ColumnPreview', 'truncatePath'
    ]))
  })
})
