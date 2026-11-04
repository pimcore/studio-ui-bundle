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
import { StyleProvider } from '@ant-design/cssinjs'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { type ClassificationStoreConfigurationKeyDetail } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { FieldDefinitionDataFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields'
import { KeyDefinitionModal } from './key-definition-modal'

const updateKey = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// The @sdk/components barrel reaches antd-style's untranspiled ESM, so the AntD controls it wraps stand in for it.
jest.mock('@sdk/components', () => {
  const { Form: AntForm, Input: AntInput } = jest.requireActual('antd')

  const FormKitPanel = ({ children }: any): React.JSX.Element => <div>{children}</div>
  const FormKit: any = ({ formProps, children }: any): React.JSX.Element => <AntForm { ...formProps }>{children}</AntForm>
  FormKit.Panel = FormKitPanel

  return {
    Content: ({ children }: any) => <div>{children}</div>,
    Form: AntForm,
    FormKit,
    Input: AntInput,
    Switch: () => null,
    TextArea: AntInput.TextArea
  }
})

jest.mock('@sdk/utils', () => {
  let nextId = 0

  return {
    useDebounce: (value: unknown) => value,
    uuid: () => `node-${++nextId}`
  }
})

jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: ({ children, onOk, okText }: any) => (
    <div>
      {children}
      <button
        onClick={ onOk }
        type="button"
      >
        {okText}
      </button>
    </div>
  )
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError extends Error {}
}))

jest.mock('@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen', () => ({
  useClassificationStoreConfigurationKeyUpdateMutation: () => [updateKey]
}))

const KEY_TYPE = 'input'
const KEY_NAME = 'height'

// The dialog resolves the key's type through the registry; its shared form fields are the ones under test.
const dynamicType = {
  id: KEY_TYPE,
  getDefaultData: () => ({}),
  normalizeFieldDefinition: (fieldDefinition: Record<string, unknown>) => fieldDefinition,
  getFormFields: (context: any) => (
    <FieldDefinitionDataFormFields
      context={ context }
      id={ KEY_NAME }
      type={ KEY_TYPE }
    />
  )
}

const fieldDefinitionRegistry = {
  hasDynamicType: () => true,
  getDynamicType: () => dynamicType
}

jest.mock('@sdk/app', () => ({
  serviceIds: { 'DynamicTypes/FieldDefinitionRegistry': 'DynamicTypes/FieldDefinitionRegistry' },
  useInjection: () => fieldDefinitionRegistry,
  container: { get: () => fieldDefinitionRegistry }
}))

const STORED_OPTIONS = {
  mandatory: true,
  index: true,
  unique: true,
  visibleGridView: true,
  visibleSearch: true
}

const keyDetail = {
  id: 7,
  name: KEY_NAME,
  title: 'Height',
  description: null,
  type: KEY_TYPE,
  definition: {
    name: KEY_NAME,
    title: 'Height',
    tooltip: 'The height in cm',
    fieldtype: KEY_TYPE,
    noteditable: false,
    invisible: false,
    ...STORED_OPTIONS
  }
} as unknown as ClassificationStoreConfigurationKeyDetail

const renderModal = (): void => {
  // AntD's stylesheet carries selectors jsdom cannot parse, so it is collected outside the document.
  render(
    <StyleProvider container={ document.createElement('div') }>
      <KeyDefinitionModal
        keyDetail={ keyDetail }
        onClose={ jest.fn() }
        onSaved={ jest.fn() }
        open
      />
    </StyleProvider>
  )
}

const savedDefinition = async (): Promise<Record<string, unknown>> => {
  fireEvent.click(screen.getByText('save'))

  await waitFor(() => {
    expect(updateKey).toHaveBeenCalled()
  })

  return updateKey.mock.calls[0][0].classificationStoreConfigurationKeyUpdate.definition
}

describe('KeyDefinitionModal', () => {
  beforeEach(() => {
    updateKey.mockReset()
    updateKey.mockResolvedValue({ data: {} })
  })

  it('opens a key that carries the options the dialog no longer offers', () => {
    renderModal()

    expect(screen.getByLabelText('tooltip')).toHaveValue('The height in cm')
  })

  it('keeps those options when the key is saved unchanged', async () => {
    renderModal()

    expect(await savedDefinition()).toMatchObject(STORED_OPTIONS)
  })

  it('keeps those options when a still-visible field is edited', async () => {
    renderModal()

    fireEvent.change(screen.getByLabelText('tooltip'), { target: { value: 'The height in mm' } })

    const definition = await savedDefinition()

    expect(definition).toMatchObject(STORED_OPTIONS)
    expect(definition.tooltip).toBe('The height in mm')
  })
})
