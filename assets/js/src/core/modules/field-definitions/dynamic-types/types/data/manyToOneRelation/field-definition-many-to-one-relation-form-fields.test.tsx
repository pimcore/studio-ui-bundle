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
// stand-ins keep the props asserted on here: Form.Item exposes its label and
// tooltip, Select serialises its options.
let formValues: Record<string, unknown> = {}

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
    ),
    Conditional: ({ children, condition }: any) => (condition(formValues) === true ? children : null),
    useFormInstance: () => ({ setFieldValue: jest.fn() }),
    useWatch: (name: string) => formValues[name]
  },
  FormKit: {
    Panel: ({ children }: any) => <div>{children}</div>
  },
  Input: () => null,
  Select: ({ options }: any) => (
    <span
      data-options={ JSON.stringify(options ?? []) }
      data-testid='select'
    />
  ),
  Switch: () => null
}))

jest.mock('@Pimcore/modules/field-definitions/dynamic-types/hooks/use-class-definition-options', () => ({
  useClassDefinitionOptions: () => ({ options: [], refetch: jest.fn(), isLoading: false })
}))

jest.mock('@Pimcore/modules/field-definitions/dynamic-types/hooks/use-asset-type-options', () => ({
  useAssetTypeOptions: () => []
}))

jest.mock('@Pimcore/modules/field-definitions/dynamic-types/hooks/use-document-type-options', () => ({
  useDocumentTypeOptions: () => []
}))

jest.mock('@Pimcore/components/many-to-one-relation', () => ({
  ManyToOneRelationPath: () => null
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const {
  FieldDefinitionManyToOneRelationFormFields
} = jest.requireActual('./field-definition-many-to-one-relation-form-fields')

interface DisplayModeItem {
  tooltip: string
  comboDisabled: boolean
  comboPresent: boolean
}

const renderWithValues = (values: Record<string, unknown>): DisplayModeItem => {
  formValues = {
    objectsAllowed: true,
    assetsAllowed: false,
    documentsAllowed: false,
    classes: [{ classes: 'Supplier' }],
    displayMode: 'grid',
    ...values
  }

  render(
    <FieldDefinitionManyToOneRelationFormFields
      context={ { area: ['class-definition'], path: [], fieldDefinitions: {} } }
      id='supplier'
      type='manyToOneRelation'
    />
  )

  const item = screen.getAllByTestId('form-item')
    .find((element) => element.getAttribute('data-label') === 'display-mode')

  if (item === undefined) {
    throw new Error('The display mode form item was not rendered')
  }

  const options = JSON.parse(item.querySelector('[data-testid="select"]')?.getAttribute('data-options') ?? '[]')
  const combo = options.find((option: { value: string }) => option.value === 'combo')

  return {
    tooltip: item.getAttribute('data-tooltip') ?? '',
    comboDisabled: combo?.disabled === true,
    comboPresent: combo !== undefined
  }
}

describe('FieldDefinitionManyToOneRelationFormFields display mode', () => {
  it('offers inline search for a relation restricted to objects of a single class', () => {
    const item = renderWithValues({})

    expect(item.comboPresent).toBe(true)
    expect(item.comboDisabled).toBe(false)
    expect(item.tooltip).toBe('')
  })

  it.each([
    ['more than one class', { classes: [{ classes: 'Supplier' }, { classes: 'Manufacturer' }] }],
    ['object folders', { classes: [{ classes: 'folder' }] }],
    ['assets', { assetsAllowed: true }],
    ['documents', { documentsAllowed: true }],
    ['no objects', { objectsAllowed: false }]
  ])('disables inline search and explains why for a relation allowing %s', (_label, values) => {
    const item = renderWithValues(values)

    expect(item.comboDisabled).toBe(true)
    expect(item.tooltip).toBe('display-mode-inline-search-unavailable-tooltip')
  })

  // Removing the option would make antd render a stored 'combo' as its raw value.
  it('keeps the disabled option in the list so a stored value still renders its label', () => {
    const item = renderWithValues({ assetsAllowed: true, displayMode: 'combo' })

    expect(item.comboPresent).toBe(true)
    expect(item.comboDisabled).toBe(true)
  })
})
