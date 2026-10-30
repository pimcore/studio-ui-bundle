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
import fs from 'fs'
import path from 'path'
import * as sdk from './preview-mode/index'

// the bar's language switch pulls in the whole app; its own test lives in preview-mode-design.test.tsx
jest.mock('@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control', () => ({
  PermissionBasedLanguageSelectionControl: () => null
}))
jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))

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

describe('SDK preview mode export', () => {
  it('AC1: the public components index re-exports the preview mode module', () => {
    // the full index cannot be loaded in Jest (ESM antd styles, circular app imports), so check its source
    const indexSource = fs.readFileSync(path.join(__dirname, 'index.ts'), 'utf8')
    expect(indexSource).toContain("export * from './preview-mode/index'")
  })

  it('AC1: the SDK index exports provider, switch, bar and column-preview slot', () => {
    expect(sdk.PreviewModeProvider).toBeDefined()
    expect(sdk.PreviewModeSwitch).toBeDefined()
    expect(sdk.PreviewModeBar).toBeDefined()
    expect(sdk.ColumnPreview).toBeDefined()
    expect(sdk.usePreviewMode).toBeDefined()
  })

  it('AC1: the pieces render from the SDK import', () => {
    render(
      <sdk.PreviewModeProvider>
        <sdk.PreviewModeSwitch />
        <sdk.PreviewModeBar />
        <sdk.ColumnPreview source={ { isLoading: false, value: <span>the value</span> } } />
      </sdk.PreviewModeProvider>
    )

    expect(screen.queryByText('the value')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('switch'))
    expect(screen.getByText('the value')).toBeInTheDocument()
  })

  it('AC2: the docs explain with an example how to add preview mode to a modal', () => {
    const doc = fs.readFileSync(
      path.join(__dirname, '../../../../../doc/04_Extending/02_Plugin_Development_Examples/21_Add_Preview_Mode_to_a_Modal.md'),
      'utf8'
    )
    for (const name of ['PreviewModeProvider', 'PreviewModeSwitch', 'PreviewModeBar', 'ColumnPreview']) {
      expect(doc).toContain(name)
    }
    expect(doc).toContain('```tsx')
  })
})
