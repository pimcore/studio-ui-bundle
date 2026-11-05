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
// stand-in keeps the two props asserted on here: the field name and the label.
jest.mock('@sdk/components', () => ({
  Form: {
    Item: ({ children, label, name }: any) => (
      <div
        data-label={ typeof label === 'string' ? label : '' }
        data-name={ typeof name === 'string' ? name : '' }
        data-testid='form-item'
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
  const renderedFieldNames = (): string[] => {
    render(<FieldDefinitionLocalizedfieldsFormFields { ...({} as any) } />)

    return screen.getAllByTestId('form-item')
      .map((element) => element.getAttribute('data-name') ?? '')
      .filter((name) => name !== '')
  }

  // Every control left in this form has to do something in the Studio object
  // editor, so the form is the contract: a setting that lands here is one the
  // renderer honours.
  it('offers exactly the settings the object editor applies', () => {
    expect(renderedFieldNames().sort()).toEqual(
      ['border', 'height', 'layout', 'region', 'title', 'width']
    )
  })

  // Studio renders one locale at a time, so the tab settings can never apply.
  // labelWidth and labelAlign cannot either: Layout\Traits\LabelTrait defaults
  // them to 100 and 'left', so every class definition sends them and an
  // untouched container is indistinguishable from a configured one. The legacy
  // Admin UI that consumed them is archived. See #704.
  it.each([
    ['tabPosition'],
    ['maxTabs'],
    ['hideLabelsWhenTabsReached'],
    ['labelWidth'],
    ['labelAlign']
  ])('does not offer %s, which the object editor ignores', (name) => {
    expect(renderedFieldNames()).not.toContain(name)
  })
})
