/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// antd-style is untranspiled ESM — every `.styles.ts` in the render tree goes through this
// factory, so stubbing it here avoids mocking each `.styles.ts` file individually
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({
    styles: {},
    cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '),
    theme: {}
  })
}))

jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'de' })
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { LocalizationSwitch } from './localization-switch'

describe('LocalizationSwitch', () => {
  it('offers the default column when the language independent value is allowed', () => {
    render(<LocalizationSwitch allowLanguageIndependentValue />)

    expect(screen.queryByText('Default')).not.toBeNull()
    expect(screen.queryByText('Current language (DE)')).not.toBeNull()
  })

  it('does not offer the default column when the language independent value is not allowed', () => {
    render(
      <LocalizationSwitch
        allowLanguageIndependentValue={ false }
        initialValue='current-language'
      />
    )

    expect(screen.queryByText('Default')).toBeNull()
    expect(screen.queryByText('Current language (DE)')).not.toBeNull()
  })
})
