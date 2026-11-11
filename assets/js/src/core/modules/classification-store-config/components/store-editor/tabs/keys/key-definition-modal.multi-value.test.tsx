/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * What the key-definition dialog does with a key of type `multiValue`: it refuses to save one that
 * cannot be written, writes the declaration of one that can in the one definition blob, and states
 * the consequence of narrowing one before it saves. The dialog's own behaviour for every other
 * type is pinned in `key-definition-modal.test.tsx`; the mocks here follow that file's.
 */

import React from 'react'
import { StyleProvider } from '@ant-design/cssinjs'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import {
  type ClassificationStoreConfigurationKeyDetail
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { FieldDefinitionMultiValueVariants } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/field-definition-multi-value-variants'
import { KeyDefinitionModal } from './key-definition-modal'

const updateKey = jest.fn()
const confirmWarning = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string, params?: Record<string, string>) => params?.name !== undefined ? `${key}:${params.name}` : key })
}))

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('@sdk/components', () => {
  const { Form: AntForm, Input: AntInput } = jest.requireActual('antd')

  const FormKit: any = ({ formProps, children }: any): React.JSX.Element => <AntForm { ...formProps }>{children}</AntForm>
  const Panel = ({ children }: any): React.JSX.Element => <div>{children}</div>
  FormKit.Panel = Panel

  return {
    Content: ({ children }: any) => <div>{children}</div>,
    Form: AntForm,
    FormKit,
    IconButton: ({ tooltip, onClick, disabled }: any) => (
      <button
        aria-label={ tooltip.title }
        disabled={ disabled }
        onClick={ onClick }
        type='button'
      />
    ),
    Input: AntInput,
    Space: ({ children }: any) => <div>{children}</div>,
    Switch: () => null,
    TextArea: AntInput.TextArea
  }
})

jest.mock('@sdk/utils', () => {
  const { useRef } = jest.requireActual('react')
  let nextId = 0

  return {
    isNonEmptyString: (value: unknown) => typeof value === 'string' && value !== '',
    useDebounce: (value: unknown) => useRef(value).current,
    uuid: () => `node-${++nextId}`
  }
})

jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: ({ children, onOk, okText }: any) => (
    <div>
      {children}
      <button
        onClick={ onOk }
        type='button'
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

jest.mock('@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced', () => ({
  useClassificationStoreConfigurationKeyUpdateMutation: () => [updateKey, { isLoading: false }]
}))

jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: confirmWarning })
}))

const KEY_TYPE = 'multiValue'

// The dialog's form fields of the type, reduced to the controls that carry the declaration.
const multiValueType = {
  id: KEY_TYPE,
  getDefaultData: () => ({ delegateDatatype: null, variants: [], multiValue: false, maximum: null }),
  normalizeFieldDefinition: (fieldDefinition: Record<string, unknown>) => fieldDefinition,
  getFormFields: function MultiValueFormFields () {
    const { Form, Input, InputNumber } = jest.requireActual('antd')

    return (
      <>
        <Form.Item name='delegateDatatype'>
          <Input aria-label='delegate' />
        </Form.Item>
        <Form.Item name='variants'>
          <FieldDefinitionMultiValueVariants />
        </Form.Item>
        <Form.Item name='maximum'>
          <InputNumber aria-label='maximum' />
        </Form.Item>
      </>
    )
  }
}

const fieldDefinitionRegistry = {
  hasDynamicType: () => true,
  getDynamicType: () => multiValueType
}

jest.mock('@sdk/app', () => ({
  serviceIds: { 'DynamicTypes/FieldDefinitionRegistry': 'DynamicTypes/FieldDefinitionRegistry' },
  useInjection: () => fieldDefinitionRegistry,
  container: { get: () => fieldDefinitionRegistry }
}))

const DELEGATE_REQUIRED = 'classification-store.multi-value.delegate-required'
const NARROWING = 'classification-store.multi-value.narrowing-confirm'

const keyOf = (definition: Record<string, unknown>): ClassificationStoreConfigurationKeyDetail => ({
  id: 7,
  name: 'height',
  title: 'Height',
  description: null,
  type: KEY_TYPE,
  definition: { name: 'height', fieldtype: KEY_TYPE, ...definition }
}) as unknown as ClassificationStoreConfigurationKeyDetail

const modalOf = (detail: ClassificationStoreConfigurationKeyDetail): React.JSX.Element => (
  // AntD's stylesheet carries selectors jsdom cannot parse, so it is collected outside the document.
  <StyleProvider container={ document.createElement('div') }>
    <KeyDefinitionModal
      keyDetail={ detail }
      onClose={ jest.fn() }
      onSaved={ jest.fn() }
      open
    />
  </StyleProvider>
)

const renderModal = (detail: ClassificationStoreConfigurationKeyDetail): ReturnType<typeof render> =>
  render(modalOf(detail))

const save = (): void => { fireEvent.click(screen.getByText('save')) }

const flush = async (): Promise<void> => { await new Promise((resolve) => setTimeout(resolve, 0)) }

const savedPayload = async (): Promise<Record<string, any>> => {
  await waitFor(() => { expect(updateKey).toHaveBeenCalled() })

  return updateKey.mock.calls[0][0].classificationStoreConfigurationKeyUpdate
}

describe('KeyDefinitionModal for a multiValue key', () => {
  beforeEach(() => {
    updateKey.mockReset()
    updateKey.mockResolvedValue({ data: {} })
    confirmWarning.mockReset()
  })

  afterEach(cleanup)

  it('refuses to save while the delegate is unset, stating why, and saves once one is picked', async () => {
    renderModal(keyOf({ delegateDatatype: null }))

    save()
    await flush()

    expect(updateKey).not.toHaveBeenCalled()
    expect(screen.getByText(DELEGATE_REQUIRED)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('delegate'), { target: { value: 'quantityValue' } })
    save()

    expect((await savedPayload()).definition.delegateDatatype).toBe('quantityValue')
    expect(screen.queryByText(DELEGATE_REQUIRED)).toBeNull()
  })

  it('refuses a duplicate and an empty variant name, and sends the order the rows were moved to', async () => {
    renderModal(keyOf({ delegateDatatype: 'input', variants: [{ name: 'metric' }, { name: 'metric' }] }))

    save()
    await flush()

    expect(updateKey).not.toHaveBeenCalled()
    expect(screen.getAllByText('classification-store.multi-value.variant-name-duplicate:metric').length).toBeGreaterThan(0)

    fireEvent.change(screen.getAllByLabelText('classification-store.multi-value.variant-name')[1], { target: { value: '' } })
    save()
    await flush()

    expect(updateKey).not.toHaveBeenCalled()
    expect(screen.getAllByText('classification-store.multi-value.variant-name-empty').length).toBeGreaterThan(0)

    fireEvent.change(screen.getAllByLabelText('classification-store.multi-value.variant-name')[1], { target: { value: 'imperial' } })
    fireEvent.click(screen.getAllByLabelText('classification-store.multi-value.move-up')[1])
    save()

    expect((await savedPayload()).definition.variants).toEqual([{ name: 'imperial' }, { name: 'metric' }])
  })

  it('sends multiValue true and the cap together in one definition', async () => {
    renderModal(keyOf({ delegateDatatype: 'input', multiValue: true, maximum: 3 }))

    save()

    expect((await savedPayload()).definition).toMatchObject({ multiValue: true, maximum: 3 })
  })

  it('keeps the key repeating and unbounded when the cap is cleared', async () => {
    renderModal(keyOf({ delegateDatatype: 'input', multiValue: true, maximum: 3 }))

    fireEvent.change(screen.getByLabelText('maximum'), { target: { value: '' } })
    save()

    const { definition } = await savedPayload()

    expect(definition.multiValue).toBe(true)
    expect(definition.maximum ?? null).toBeNull()
  })

  it('states the consequence of removing a variant before saving, and sends no instruction to drop values', async () => {
    renderModal(keyOf({ delegateDatatype: 'input', variants: [{ name: 'metric' }, { name: 'imperial' }] }))

    fireEvent.click(screen.getAllByLabelText('delete')[1])
    save()
    await flush()

    expect(updateKey).not.toHaveBeenCalled()
    expect(confirmWarning).toHaveBeenCalledTimes(1)
    render(<>{confirmWarning.mock.calls[0][0].content as React.ReactNode}</>)
    expect(screen.getByText(NARROWING)).toBeInTheDocument()

    await confirmWarning.mock.calls[0][0].onOk()

    const payload = await savedPayload()

    expect(payload.definition.variants).toEqual([{ name: 'metric' }])
    expect(Object.keys(payload).sort()).toEqual(['definition', 'name', 'type'])
  })

  // The consequence is stated about what this edit takes away from the declaration the dialog was
  // opened on. The cached key is the collection's row, which a refresh can move while the dialog
  // stays open; an untouched control is not a narrowing, whatever the row has moved to meanwhile.
  it('states no consequence for a variant another writer added while the dialog was open', async () => {
    const declared = { delegateDatatype: 'input', variants: [{ name: 'metric' }, { name: 'imperial' }] }
    const { rerender } = renderModal(keyOf(declared))

    rerender(modalOf(keyOf({ ...declared, variants: [...declared.variants, { name: 'nautical' }] })))
    save()

    await savedPayload()
    expect(confirmWarning).not.toHaveBeenCalled()
  })

  it('states the consequence of lowering the cap, and not of leaving it as it was', async () => {
    renderModal(keyOf({ delegateDatatype: 'input', multiValue: true, maximum: 3 }))

    save()
    await savedPayload()
    expect(confirmWarning).not.toHaveBeenCalled()

    updateKey.mockClear()
    fireEvent.change(screen.getByLabelText('maximum'), { target: { value: '2' } })
    save()
    await flush()

    expect(confirmWarning).toHaveBeenCalledTimes(1)
    expect(updateKey).not.toHaveBeenCalled()
  })
})
