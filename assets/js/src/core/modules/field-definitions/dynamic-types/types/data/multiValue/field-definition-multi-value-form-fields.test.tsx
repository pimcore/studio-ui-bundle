/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

let capturedOptions: Array<{ label: string, value: string, disabled?: boolean }> = []

// The @sdk/components barrel reaches antd-style's untranspiled ESM. AntD's own Form is used so the
// form store and `useWatch` behave as they do in the dialog.
jest.mock('@sdk/components', () => ({
  Form: jest.requireActual('antd').Form,
  InputNumber: () => null,
  Select: ({ options }: any) => {
    capturedOptions = options
    return null
  },
  Switch: () => null
}))

jest.mock('./field-definition-multi-value-variants', () => ({
  FieldDefinitionMultiValueVariants: () => null
}))

// Which types the registry offers is the registry's answer: the picker never lists them itself.
const mockRegistry = {
  getTypesByTags: () => ['input', 'geopoint', 'multiValue', 'encryptedField'].map((id) => ({ id })),
  hasDynamicType: () => true,
  getDynamicType: () => ({ getDefaultData: () => ({}), getSpecificFormFields: () => null })
}

jest.mock('@sdk/app', () => ({
  container: { get: () => mockRegistry },
  serviceIds: { 'DynamicTypes/FieldDefinitionRegistry': 'DynamicTypes/FieldDefinitionRegistry' }
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render } from '@testing-library/react'
// eslint-disable-next-line import/first
import { Form } from 'antd'
// eslint-disable-next-line import/first
import { FieldDefinitionMultiValueFormFields } from './field-definition-multi-value-form-fields'
// eslint-disable-next-line import/first
import { MultiValueEngineContext } from './multi-value-engine-context'

const CONTEXT = { area: ['classification-store'], path: [], fieldDefinitions: {} }
const NEEDS_ENGINE = 'classification-store.key-type-needs-document-engine'

const renderPicker = (capabilities: readonly string[] | null | undefined): void => {
  render(
    <MultiValueEngineContext.Provider value={ capabilities }>
      <Form initialValues={ { delegateDatatype: null } }>
        <FieldDefinitionMultiValueFormFields
          context={ CONTEXT }
          id='height'
          type='multiValue'
        />
      </Form>
    </MultiValueEngineContext.Provider>
  )
}

describe('FieldDefinitionMultiValueFormFields delegate picker', () => {
  it('offers the registry types a key may hold, and neither wrapper', () => {
    renderPicker([])

    expect(capturedOptions.map((option) => option.value).sort()).toEqual(['geopoint', 'input'])
  })

  it('selects a type the engine holds and disables, with its reason, one it does not', () => {
    renderPicker([])

    const input = capturedOptions.find((option) => option.value === 'input')
    const geopoint = capturedOptions.find((option) => option.value === 'geopoint')

    expect(input?.disabled).toBeUndefined()
    expect(geopoint?.disabled).toBe(true)
    expect(geopoint?.label).toContain(NEEDS_ENGINE)
  })

  it('disables nothing on an engine that holds the structured types', () => {
    renderPicker(['StructuredValues'])

    expect(capturedOptions.some((option) => option.disabled === true)).toBe(false)
  })
})
