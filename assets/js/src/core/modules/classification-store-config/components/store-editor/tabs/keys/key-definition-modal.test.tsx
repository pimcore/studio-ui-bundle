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
import {
  type ClassificationStoreConfigurationKeyDetail
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { FieldDefinitionDataFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields'
import { KeyDefinitionModal } from './key-definition-modal'

const updateKey = jest.fn()
const confirmWarning = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style ships untranspiled ESM, which jest does not transform
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
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

// The stub button stays enabled whatever confirmLoading says, so a second press reaches the
// dialog's own in-flight guard instead of being swallowed by the stub.
jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: ({ children, onOk, okText, confirmLoading }: any) => (
    <div>
      {children}
      <span data-testid='confirm-loading'>{String(confirmLoading)}</span>
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
  // Stands in for the RTK Query mutation hook: isLoading is true from the trigger call until the
  // request it returned has answered, which is the flag the dialog's in-flight guard reads.
  useClassificationStoreConfigurationKeyUpdateMutation: () => {
    const [isLoading, setIsLoading] = React.useState(false)

    const trigger = async (arg: unknown): Promise<unknown> => {
      setIsLoading(true)

      try {
        return await updateKey(arg)
      } finally {
        setIsLoading(false)
      }
    }

    return [trigger, { isLoading }]
  }
}))

jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: confirmWarning })
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

const EDITED_TOOLTIP = 'The height in mm'

const INHERIT = 'classification-store.key-localization.inherit'
const LOCALIZED = 'classification-store.key-localization.localized'
const NOT_LOCALIZED = 'classification-store.key-localization.not-localized'

/** The three stored tri-states, by the option each of them selects. */
const STORED_LOCALIZED: Record<string, boolean | null> = {
  [INHERIT]: null,
  [LOCALIZED]: true,
  [NOT_LOCALIZED]: false
}

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

/** The same key, with the localization tri-state stored as given. */
const keyLocalized = (localized: boolean | null | undefined): ClassificationStoreConfigurationKeyDetail =>
  ({ ...keyDetail, localized }) as unknown as ClassificationStoreConfigurationKeyDetail

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

/** Hands the dialog a new key detail, the way the optimistic cache patch does mid-save. */
type PatchCache = (detail: ClassificationStoreConfigurationKeyDetail) => void

const renderModal = (detail: ClassificationStoreConfigurationKeyDetail = keyDetail): PatchCache => {
  const { rerender } = render(modal(detail))

  return (next) => { rerender(modal(next)) }
}

/** The dialog on a key whose stored localization is the given one, re-patchable by that flag. */
const renderLocalized = (
  localized: boolean | null | undefined = null
): ((refreshed: boolean | null | undefined) => void) => {
  const patchCache = renderModal(keyLocalized(localized))

  return (refreshed) => { patchCache(keyLocalized(refreshed)) }
}

const indexedControl = (): HTMLElement => screen.getByLabelText('classification-store.key-indexed')

const option = (name: string): HTMLElement => screen.getByRole('radio', { name })

const save = (): void => { fireEvent.click(screen.getByText('save')) }

const flush = async (): Promise<void> => { await new Promise((resolve) => setTimeout(resolve, 0)) }

const savedPayload = async (): Promise<Record<string, unknown>> => {
  await waitFor(() => {
    expect(updateKey).toHaveBeenCalled()
  })

  return updateKey.mock.calls[0][0].classificationStoreConfigurationKeyUpdate
}

const savedDefinition = async (): Promise<Record<string, unknown>> => {
  save()

  return (await savedPayload()).definition as Record<string, unknown>
}

/** Whether the payload carries the member at all: an absent one and an explicit null differ. */
const sendsLocalized = (payload: Record<string, unknown>): boolean => 'localized' in payload

/** Holds the next save in flight until the returned function answers it. */
const saveInFlight = (): ((response: unknown) => void) => {
  let answer: (response: unknown) => void = () => {}

  updateKey.mockReturnValue(new Promise((resolve) => { answer = resolve }))

  return (response) => { answer(response) }
}

/** The busy state the dialog hands the modal, which disables its OK button. */
const expectBusy = async (busy: boolean): Promise<void> => {
  await waitFor(() => {
    expect(screen.getByTestId('confirm-loading')).toHaveTextContent(String(busy))
  })
}

/** Saves, confirming the warning when the transition raised one; which ones do is asserted below. */
const saveConfirmingWarning = async (): Promise<void> => {
  save()
  await flush()

  if (confirmWarning.mock.calls.length > 0) {
    await confirmWarning.mock.calls[0][0].onOk()
  }
}

describe('KeyDefinitionModal', () => {
  beforeEach(() => {
    updateKey.mockReset()
    updateKey.mockResolvedValue({ data: {} })
    confirmWarning.mockReset()
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

    fireEvent.change(screen.getByLabelText('tooltip'), { target: { value: EDITED_TOOLTIP } })

    const definition = await savedDefinition()

    expect(definition).toMatchObject(STORED_OPTIONS)
    expect(definition.tooltip).toBe(EDITED_TOOLTIP)
  })

  it.each([
    ['an absent flag', undefined, INHERIT],
    ['a null flag', null, INHERIT],
    ['a true flag', true, LOCALIZED],
    ['a false flag', false, NOT_LOCALIZED]
  ])('seeds the localization control from %s', (_name, localized, expected) => {
    renderLocalized(localized)

    expect(option(expected)).toBeChecked()
    expect(option(INHERIT)).toBeInTheDocument()
    expect(option(LOCALIZED)).toBeInTheDocument()
    expect(option(NOT_LOCALIZED)).toBeInTheDocument()
  })

  it.each([
    [NOT_LOCALIZED, INHERIT, null],
    [INHERIT, LOCALIZED, true],
    [LOCALIZED, NOT_LOCALIZED, false]
  ])('sends the state of the localization control from %s to %s', async (from, selected, expected) => {
    // Each row moves the control, because an unchanged control sends no member at all.
    renderLocalized(STORED_LOCALIZED[from])

    fireEvent.click(option(selected))
    await saveConfirmingWarning()

    const payload = await savedPayload()

    expect(sendsLocalized(payload)).toBe(true)
    expect(payload.localized).toBe(expected)
    // the definition rides along unchanged, while the cells the keys grid also writes are left
    // out of the payload rather than echoed back (see the key names test further down)
    expect(payload).toEqual(expect.objectContaining({ name: KEY_NAME, type: null }))
    expect(payload).not.toHaveProperty('title')
    expect(payload).not.toHaveProperty('description')
    expect(payload.definition).toMatchObject(STORED_OPTIONS)
  })

  // A save that did not touch the control must leave the stored flag alone, and only an absent
  // member does that: a member sent as null clears it to inherit.
  it.each([
    ['an absent flag', undefined],
    ['a null flag', null],
    ['a true flag', true],
    ['a false flag', false]
  ])('omits the localized member when the control is untouched, with %s stored', async (_name, localized) => {
    renderLocalized(localized)

    fireEvent.change(screen.getByLabelText('tooltip'), { target: { value: EDITED_TOOLTIP } })
    save()

    const payload = await savedPayload()

    expect(sendsLocalized(payload)).toBe(false)
    expect(payload.definition).toMatchObject({ tooltip: EDITED_TOOLTIP })
    expect(confirmWarning).not.toHaveBeenCalled()
  })

  it('omits the localized member again when the control is moved back to the stored state', async () => {
    renderLocalized(true)

    fireEvent.click(option(NOT_LOCALIZED))
    fireEvent.click(option(LOCALIZED))
    save()

    expect(sendsLocalized(await savedPayload())).toBe(false)
    expect(confirmWarning).not.toHaveBeenCalled()
  })

  // The key detail is read from the collection cache, which a refresh of the same key can move
  // while the dialog is open. The control is only re-seeded when the key id changes, so the
  // payload has to be decided against the state it was seeded with, not against the live flag.
  it.each([
    ['an absent flag', undefined, true],
    ['a null flag', null, true],
    ['a true flag', true, false],
    ['a false flag', false, null]
  ])('omits the localized member when a same-key refresh moves %s under an untouched control', async (
    _name,
    localized,
    refreshed
  ) => {
    const patchCache = renderLocalized(localized)

    patchCache(refreshed)

    fireEvent.change(screen.getByLabelText('tooltip'), { target: { value: EDITED_TOOLTIP } })
    save()

    const payload = await savedPayload()

    expect(sendsLocalized(payload)).toBe(false)
    expect(payload.definition).toMatchObject({ tooltip: EDITED_TOOLTIP })
    // an untouched control is not a transition, so the refreshed flag raises no warning either
    expect(confirmWarning).not.toHaveBeenCalled()
  })

  it('still sends the state the control was moved to when a same-key refresh arrives after it', async () => {
    const patchCache = renderLocalized(null)

    fireEvent.click(option(LOCALIZED))
    patchCache(false)

    await saveConfirmingWarning()

    const payload = await savedPayload()

    expect(sendsLocalized(payload)).toBe(true)
    expect(payload.localized).toBe(true)
    expect(option(LOCALIZED)).toBeChecked()
  })

  // The three transitions that can leave values in other languages unreachable warn; the other
  // three do not, and neither does leaving the state as it is.
  it.each([
    [LOCALIZED, NOT_LOCALIZED, true],
    [LOCALIZED, INHERIT, true],
    [INHERIT, NOT_LOCALIZED, true],
    [INHERIT, LOCALIZED, false],
    [NOT_LOCALIZED, LOCALIZED, false],
    [NOT_LOCALIZED, INHERIT, false],
    [LOCALIZED, LOCALIZED, false],
    [INHERIT, INHERIT, false],
    [NOT_LOCALIZED, NOT_LOCALIZED, false]
  ])('warns on %s to %s: %s', async (from, to, warns) => {
    renderLocalized(STORED_LOCALIZED[from])

    fireEvent.click(option(to))
    save()

    if (!warns) {
      await waitFor(() => { expect(updateKey).toHaveBeenCalledTimes(1) })
      expect(confirmWarning).not.toHaveBeenCalled()

      return
    }

    await waitFor(() => { expect(confirmWarning).toHaveBeenCalledTimes(1) })

    // cancelling is not confirming: nothing is written
    expect(updateKey).not.toHaveBeenCalled()

    await confirmWarning.mock.calls[0][0].onOk()

    expect(await savedPayload()).toEqual(expect.objectContaining({ localized: STORED_LOCALIZED[to] }))
    expect(updateKey).toHaveBeenCalledTimes(1)
  })

  it('keeps the warning open until the confirmed save has answered', async () => {
    // The confirmation is handed the save to wait for: closing on its own would let the dialog
    // behind it be closed or saved again while the request it confirmed is still in flight.
    let answer: (value: unknown) => void = () => {}
    updateKey.mockReturnValue(new Promise((resolve) => { answer = resolve }))

    renderLocalized(true)

    fireEvent.click(option(NOT_LOCALIZED))
    save()

    await waitFor(() => { expect(confirmWarning).toHaveBeenCalledTimes(1) })

    const settled = jest.fn()
    void (confirmWarning.mock.calls[0][0].onOk() as Promise<void>).then(settled)
    await flush()

    expect(settled).not.toHaveBeenCalled()

    answer({ data: {} })

    await waitFor(() => { expect(settled).toHaveBeenCalled() })
  })

  it('reports the save as in flight while it runs', async () => {
    const answer = saveInFlight()

    renderModal()
    await expectBusy(false)

    save()
    await expectBusy(true)

    answer({ data: {} })
    await expectBusy(false)
  })

  // A second save would recompute the stored state from the patch the first one's optimistic
  // update already wrote into the cached key, and so omit the very member it had just sent.
  it('ignores a second save while the first is in flight, patched cache and all', async () => {
    const answer = saveInFlight()
    const patchCache = renderLocalized(null)

    fireEvent.click(option(LOCALIZED))
    save()

    expect((await savedPayload()).localized).toBe(true)
    await expectBusy(true)

    patchCache(true)
    save()

    expect(updateKey).toHaveBeenCalledTimes(1)

    answer({ data: {} })
    await expectBusy(false)
  })

  // The other outcome of a save: a guard that stayed closed on a failed one would lock the dialog.
  it('takes a further save once a failed one has answered', async () => {
    updateKey.mockResolvedValue({ error: { status: 500 } })

    renderModal()
    save()

    await expectBusy(true)
    await expectBusy(false)

    save()

    await waitFor(() => { expect(updateKey).toHaveBeenCalledTimes(2) })
  })

  // The same guard on the other arm of handleSave: the one that defers the save to a confirmation.
  it('ignores a second save while a confirmed save is in flight', async () => {
    const answer = saveInFlight()

    renderLocalized(true)

    fireEvent.click(option(NOT_LOCALIZED))
    save()

    await waitFor(() => { expect(confirmWarning).toHaveBeenCalledTimes(1) })

    void (confirmWarning.mock.calls[0][0].onOk() as Promise<void>)
    await expectBusy(true)

    save()

    expect(updateKey).toHaveBeenCalledTimes(1)
    expect(confirmWarning).toHaveBeenCalledTimes(1)

    answer({ data: {} })
    await expectBusy(false)
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
    // The update writes the server's answer into the cache for the fields it named — `definition`
    // among them — and keys-tab re-derives the dialog's keyDetail from that cache, so the reopened
    // dialog reads the returned flag and not the local edit.
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
