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

// The real @sdk/components barrel transitively imports antd-style (untranspiled
// ESM), which jest cannot load — same reason as field-container.test.tsx. The
// stand-in keeps the two props asserted on here: the label and the tooltip.
jest.mock('@sdk/components', () => ({
  Form: {
    Item: ({ children, label, tooltip }: any) => (
      <div
        data-label={ typeof label === 'string' ? label : '' }
        data-testid='form-item'
        data-tooltip={ typeof tooltip === 'string' ? tooltip : '' }
      >
        {children}
      </div>
    )
  },
  Input: () => null,
  InputNumber: () => null,
  Select: () => null,
  Switch: () => null
}))

// eslint-disable-next-line import/first
import { FieldDefinitionLocalizedfieldsFormFields } from './field-definition-localizedfields-form-fields'

describe('FieldDefinitionLocalizedfieldsFormFields', () => {
  const tooltipFor = (label: string): string | null => {
    render(<FieldDefinitionLocalizedfieldsFormFields { ...({} as any) } />)

    const item = screen.getAllByTestId('form-item')
      .find((element) => element.getAttribute('data-label') === label)

    return item?.getAttribute('data-tooltip') ?? null
  }

  // Studio picks the language with the global selector and renders one locale at
  // a time, so the legacy tab settings cannot do anything here. They stay
  // editable — the same class definition still drives the legacy Admin UI — but
  // they say so instead of being silently ignored.
  it.each([
    ['tab-position'],
    ['maximum-tabs'],
    ['hide-labels-when-tabs-reached']
  ])('marks %s as having no effect in Studio', (label) => {
    expect(tooltipFor(label)).toBe('setting-without-effect-in-studio')
  })

  // The settings that Studio does honour must keep their own explanation, so the
  // marking cannot have been applied with a broad brush.
  it.each([
    ['width', 'width-tooltip'],
    ['height', 'height-tooltip']
  ])('leaves the %s tooltip alone', (label, expected) => {
    expect(tooltipFor(label)).toBe(expected)
  })

  it.each([
    ['label-width'],
    ['label-align'],
    ['region'],
    ['layout']
  ])('does not mark %s, which Studio applies', (label) => {
    expect(tooltipFor(label)).toBe('')
  })
})
