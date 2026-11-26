/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The @sdk/components barrel reaches antd-style's untranspiled ESM. AntD's own Form is used so the
// form store, `useWatch` and `setFieldsValue` behave as they do in the dialog.
jest.mock('@sdk/components', () => ({
  Form: jest.requireActual('antd').Form,
  FormKit: { Panel: ({ children }: any) => children },
  Input: () => null,
  Select: () => null,
  Switch: () => null,
  TextArea: () => null
}))

// Reached only because the type under test extends it; the base class holds nothing this exercises.
jest.mock('@sdk/modules/element', () => ({
  DynamicTypeAbstract: class {
    getTags (): string[] { return [] }
    getGroup (): string[] { return [] }
    getDefaultData (): Record<string, unknown> { return {} }
  }
}))

const mockDefaultData: Record<string, Record<string, unknown>> = {
  input: { fieldtype: 'input', datatype: 'data', columnLength: 190 },
  textarea: { fieldtype: 'textarea', datatype: 'data', height: 200, showCharCount: false }
}

const mockRegistry = {
  getTypesByTags: () => Object.keys(mockDefaultData).map((id) => ({ id })),
  hasDynamicType: (id: string) => id in mockDefaultData,
  getDynamicType: (id: string) => ({
    getDefaultData: () => ({ ...mockDefaultData[id] }),
    getSpecificFormFields: () => null
  })
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
import { act, render } from '@testing-library/react'
// eslint-disable-next-line import/first
import { Form } from 'antd'
// eslint-disable-next-line import/first
import { type FormInstance } from 'antd/es/form/index'

const {
  FieldDefinitionEncryptedFieldFormFields
} = jest.requireActual('./field-definition-encrypted-field-form-fields')

const CONTEXT = { area: ['classification-store'], path: [], fieldDefinitions: {} }

const renderWithDelegate = (initialValues: Record<string, unknown>): FormInstance => {
  let form: FormInstance | undefined

  const Host = (): React.JSX.Element => {
    const [instance] = Form.useForm()
    form = instance

    return (
      <Form
        form={ instance }
        initialValues={ initialValues }
      >
        <FieldDefinitionEncryptedFieldFormFields
          context={ CONTEXT }
          id='weight'
          type='encryptedField'
        />
      </Form>
    )
  }

  render(<Host />)

  return form!
}

describe('FieldDefinitionEncryptedFieldFormFields delegate type switch', () => {
  it('keeps the Classification Store index flag when the delegate type changes', () => {
    const form = renderWithDelegate({
      delegateDatatype: 'input',
      name: 'weight',
      title: 'Weight',
      indexed: false
    })

    act(() => { form.setFieldValue('delegateDatatype', 'textarea') })

    // The flag is the key's own, not the delegate's: an excluded key stays excluded, and the save
    // that reads the form afterwards still carries the member.
    expect(form.getFieldValue('indexed')).toBe(false)
    expect(form.getFieldsValue(true)).toHaveProperty('indexed', false)
  })

  it('keeps it across a switch back to the type the key was opened on', () => {
    const form = renderWithDelegate({
      delegateDatatype: 'input',
      name: 'weight',
      indexed: false
    })

    act(() => { form.setFieldValue('delegateDatatype', 'textarea') })
    act(() => { form.setFieldValue('delegateDatatype', 'input') })

    expect(form.getFieldValue('indexed')).toBe(false)
  })

  it('still clears the options the delegate owns', () => {
    const form = renderWithDelegate({
      delegateDatatype: 'input',
      name: 'weight',
      indexed: false
    })

    act(() => { form.setFieldValue('delegateDatatype', 'textarea') })

    // columnLength belongs to the input delegate and must not survive into the textarea
    expect(form.getFieldValue('columnLength')).toBeUndefined()
    expect(form.getFieldValue('height')).toBe(200)
  })

  it('leaves the flag untouched on the first render, which is not a switch', () => {
    const form = renderWithDelegate({
      delegateDatatype: 'input',
      name: 'weight',
      indexed: false
    })

    expect(form.getFieldValue('indexed')).toBe(false)
  })
})
