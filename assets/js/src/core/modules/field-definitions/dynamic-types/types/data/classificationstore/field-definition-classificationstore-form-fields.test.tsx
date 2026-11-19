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
// ESM), which jest cannot load. The Form.Item stand-in exposes its label and rules.
jest.mock('@sdk/components', () => ({
  Form: {
    Item: ({ children, label, rules }: any) => (
      <div
        data-label={ typeof label === 'string' ? label : '' }
        data-rules={ JSON.stringify(rules ?? []) }
        data-testid='form-item'
      >
        {children}
      </div>
    )
  },
  InputNumber: () => <span />,
  Select: () => <span />,
  Switch: () => <span />,
  TextArea: () => <span />
}))

jest.mock('@Pimcore/modules/field-definitions/dynamic-types/hooks/use-classification-store-options', () => ({
  useClassificationStoreOptions: () => ({ options: [{ label: 'Default', value: 1 }], refetch: jest.fn(), isLoading: false })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const {
  FieldDefinitionClassificationstoreFormFields
} = jest.requireActual('./field-definition-classificationstore-form-fields')

describe('FieldDefinitionClassificationstoreFormFields store', () => {
  it('requires a store', () => {
    render(
      <FieldDefinitionClassificationstoreFormFields
        context={ { area: ['class'], path: [], fieldDefinitions: {} } }
        id='attributes'
        type='classificationstore'
      />
    )

    const item = screen.getAllByTestId('form-item')
      .find((element) => element.getAttribute('data-label') === 'store')

    if (item === undefined) {
      throw new Error('The store form item was not rendered')
    }

    expect(JSON.parse(item.getAttribute('data-rules') ?? '[]')).toEqual([
      { required: true, message: 'form.validation.required' }
    ])
  })
})
