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
    // `extra` is the slot AntD renders below the control, so what it holds is visible text
    Item: ({ children, extra, name, valuePropName }: any) => (
      <div
        data-name={ typeof name === 'string' ? name : '' }
        data-testid='form-item'
        data-value-prop-name={ valuePropName ?? '' }
      >
        {children}
        {extra}
      </div>
    ),
    useFormInstance: () => ({ getFieldValue: () => undefined, setFieldValue: jest.fn() }),
    useWatch: () => undefined
  },
  FormKit: {
    Panel: ({ children }: any) => <div>{children}</div>
  },
  Input: () => null,
  // The real one renders its label beside the control and takes its accessible name from it
  Switch: ({ labelRight }: any) => <span aria-label={ String(labelRight ?? '') } />,
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

/** The form item the Classification Store index control lives in. */
const indexedItem = (): HTMLElement | undefined => screen.getAllByTestId('form-item')
  .find((element) => element.getAttribute('data-name') === 'indexed')

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

  it('names the control after the search index and states what excluding a key costs', () => {
    renderWithArea(['classification-store'])

    // Visible text beside the control, and a label of its own rather than the hidden `index`
    expect(indexedItem()).toContainElement(screen.getByText('classification-store.key-indexed-hint'))
    expect(indexedItem()).toContainElement(screen.getByLabelText('classification-store.key-indexed'))
    expect(screen.queryByLabelText('index')).not.toBeInTheDocument()
  })

  it('binds the control to the stored flag rather than to the form value', () => {
    renderWithArea(['classification-store'])

    expect(indexedItem()).toHaveAttribute('data-value-prop-name', 'checked')
  })
})
