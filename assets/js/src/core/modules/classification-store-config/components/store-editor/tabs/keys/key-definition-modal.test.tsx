/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import React from 'react'
import { StyleProvider } from '@ant-design/cssinjs'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { type ClassificationStoreConfigurationKeyDetail } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
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
    // The index control is read and toggled here, so the switch stands in as a labelled checkbox.
    Switch: ({ checked, disabled, labelRight, onChange }: any) => (
      <input
        aria-label={ String(labelRight ?? '') }
        checked={ checked === true }
        disabled={ disabled === true }
        onChange={ (event) => { onChange?.(event.target.checked) } }
        type="checkbox"
      />
    ),
    TextArea: AntInput.TextArea
  }
})

jest.mock('@sdk/utils', () => {
  const { useRef } = jest.requireActual('react')
  let nextId = 0

  return {
    // The dialog is driven inside the debounce window: the form holds the edit and the layout
    // provider has not been written yet, which is the state a save pressed right away reads.
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

jest.mock('@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced', () => ({
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

/** The same key, with its stored definition replaced wholesale. */
const keyWithDefinition = (definition: unknown): ClassificationStoreConfigurationKeyDetail =>
  ({ ...keyDetail, definition }) as unknown as ClassificationStoreConfigurationKeyDetail

/** The same key, with the index flag set as given or carrying none at all. */
const keyIndexed = (indexed?: boolean): ClassificationStoreConfigurationKeyDetail => {
  const definition: Record<string, unknown> = { ...keyDetail.definition }

  if (indexed === undefined) {
    delete definition.indexed
  } else {
    definition.indexed = indexed
  }

  return keyWithDefinition(definition)
}

/** Every stored shape that means indexed: the flag set, absent, explicitly null, no definition at all. */
const INDEXED_KEYS: Array<[string, ClassificationStoreConfigurationKeyDetail]> = [
  ['an explicit true', keyIndexed(true)],
  ['no flag', keyIndexed()],
  ['an explicit null flag', keyWithDefinition({ ...keyDetail.definition, indexed: null })],
  // The state a freshly created key is in, so the dialog must not report it as excluded either
  ['no definition at all', keyWithDefinition(null)]
]

const modal = (detail: ClassificationStoreConfigurationKeyDetail | undefined, open = true): React.JSX.Element => (
  // AntD's stylesheet carries selectors jsdom cannot parse, so it is collected outside the document.
  <StyleProvider container={ document.createElement('div') }>
    <KeyDefinitionModal
      keyDetail={ detail }
      onClose={ jest.fn() }
      onSaved={ jest.fn() }
      open={ open }
    />
  </StyleProvider>
)

const renderModal = (detail: ClassificationStoreConfigurationKeyDetail = keyDetail): void => {
  render(modal(detail))
}

const indexedControl = (): HTMLElement => screen.getByLabelText('classification-store.key-indexed')

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

  it('opens a key excluded from the search index with the control off', () => {
    renderModal(keyIndexed(false))

    expect(indexedControl()).not.toBeChecked()
  })

  it.each(INDEXED_KEYS)('opens a key that carries %s with the control on', (_label, detail) => {
    renderModal(detail)

    expect(indexedControl()).toBeChecked()
  })

  it('sends the flag as indexed inside the definition, losing nothing else it held', async () => {
    renderModal()

    fireEvent.click(indexedControl())

    const definition = await savedDefinition()

    expect(definition.indexed).toBe(false)
    expect(definition).toMatchObject(STORED_OPTIONS)
    expect(definition.tooltip).toBe('The height in cm')
  })

  it('names the definition and nothing else the grid also writes', async () => {
    // The title, description and type cells of the keys grid write the same row. Echoing them
    // back from the key this dialog was opened with reverts a cell edit made while it was open,
    // so the payload leaves the optional two out and sends the type it cannot omit as null.
    renderModal()

    await savedDefinition()

    const update: Record<string, unknown> =
      updateKey.mock.calls[0][0].classificationStoreConfigurationKeyUpdate

    expect(Object.keys(update).sort()).toEqual(['definition', 'name', 'type'])
    expect(update).toMatchObject({ name: KEY_NAME, type: null })
  })

  it('sends an edit saved inside the debounce window, which the layout provider has not seen', async () => {
    renderModal(keyIndexed(true))

    fireEvent.change(screen.getByLabelText('tooltip'), { target: { value: 'The height in mm' } })
    fireEvent.click(indexedControl())

    const definition = await savedDefinition()

    expect(definition.indexed).toBe(false)
    expect(definition.tooltip).toBe('The height in mm')
    expect(definition).toMatchObject(STORED_OPTIONS)
  })

  it('does not carry the flag of the key edited before into the next one', async () => {
    // The dialog stays mounted between openings while its body does not, so each opening reads
    // the key it is handed rather than the form the previous key was left on.
    const { rerender } = render(modal(keyIndexed(true)))

    fireEvent.click(indexedControl())
    expect(indexedControl()).not.toBeChecked()

    rerender(modal(undefined, false))
    rerender(modal(keyIndexed(true)))

    expect(indexedControl()).toBeChecked()
    expect(await savedDefinition()).toMatchObject({ indexed: true })
  })

  it('shows the flag the update answered with, not the one the form was left on', async () => {
    // The update replaces the cached key wholesale and keys-tab re-derives the dialog's keyDetail
    // from that cache, so the reopened dialog reads the returned flag and not the local edit.
    updateKey.mockResolvedValue({ data: keyIndexed(true) })

    renderModal(keyIndexed(true))

    fireEvent.click(indexedControl())

    expect(await savedDefinition()).toMatchObject({ indexed: false })

    const response: { data: ClassificationStoreConfigurationKeyDetail } =
      await updateKey.mock.results[0].value

    // `destroyOnClose` drops the form, so reopening builds the layout from the key it is handed.
    cleanup()
    renderModal(response.data)

    expect(indexedControl()).toBeChecked()
  })
})
