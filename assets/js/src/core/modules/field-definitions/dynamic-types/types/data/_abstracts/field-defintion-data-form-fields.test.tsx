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

// The @sdk/components barrel reaches antd-style's untranspiled ESM; the stand-in Form.Item exposes its name.
jest.mock('@sdk/components', () => ({
  Form: {
    Item: ({ children, name }: any) => (
      <div
        data-name={ typeof name === 'string' ? name : '' }
        data-testid='form-item'
      >
        {children}
      </div>
    ),
    useFormInstance: () => ({ getFieldValue: () => undefined, setFieldValue: jest.fn() }),
    useWatch: () => undefined
  },
  FormKit: {
    Panel: ({ children }: any) => <div>{children}</div>
  },
  Input: () => null,
  Switch: () => null,
  TextArea: () => null
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const {
  FieldDefinitionDataFormFields
} = jest.requireActual('./field-defintion-data-form-fields')

const SHARED_TOGGLES = ['mandatory', 'index', 'unique', 'noteditable', 'invisible', 'visibleGridView', 'visibleSearch']

// `indexed` is the Classification Store search index, a separate option from `index` above it.
const INSPECTED_ITEMS = [...SHARED_TOGGLES, 'indexed']

const renderWithArea = (area: string[]): string[] => {
  render(
    <FieldDefinitionDataFormFields
      context={ { area, path: [], fieldDefinitions: {} } }
      id='height'
      type='input'
    />
  )

  return screen.getAllByTestId('form-item')
    .map((element) => element.getAttribute('data-name') ?? '')
    .filter((name) => INSPECTED_ITEMS.includes(name))
}

describe('FieldDefinitionDataFormFields shared toggles', () => {
  it('offers a Classification Store key only the options it reads', () => {
    // `indexed` is offered and `index` is not: one control, and not the object query index
    expect(renderWithArea(['classification-store'])).toEqual(['indexed', 'noteditable', 'invisible'])
  })

  it('keeps all seven toggles for a class field and offers it no index control', () => {
    expect(renderWithArea(['class'])).toEqual(SHARED_TOGGLES)
  })

  it('offers a custom layout field no index control either', () => {
    expect(renderWithArea(['custom-layout'])).not.toContain('indexed')
  })
})
