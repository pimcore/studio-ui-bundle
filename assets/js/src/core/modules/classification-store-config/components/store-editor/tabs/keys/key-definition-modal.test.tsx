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
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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

/** Hands the dialog a new stored flag, the way the optimistic cache patch does mid-save. */
type PatchCache = (localized: boolean | null) => void

const renderModal = (localized: boolean | null = null): PatchCache => {
  const tree = (stored: boolean | null): React.JSX.Element => (
    <StyleProvider container={ document.createElement('div') }>
      <KeyDefinitionModal
        keyDetail={ { ...keyDetail, localized: stored } }
        onClose={ jest.fn() }
        onSaved={ jest.fn() }
        open
      />
    </StyleProvider>
  )

  // AntD's stylesheet carries selectors jsdom cannot parse, so it is collected outside the document.
  const { rerender } = render(tree(localized))

  return (stored) => { rerender(tree(stored)) }
}

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
    renderModal(localized)

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
    renderModal(STORED_LOCALIZED[from])

    fireEvent.click(option(selected))
    await saveConfirmingWarning()

    const payload = await savedPayload()

    expect(sendsLocalized(payload)).toBe(true)
    expect(payload.localized).toBe(expected)
    // the definition and the key's own columns ride along unchanged
    expect(payload).toEqual(expect.objectContaining({
      name: KEY_NAME,
      title: 'Height',
      type: KEY_TYPE
    }))
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
    renderModal(localized)

    fireEvent.change(screen.getByLabelText('tooltip'), { target: { value: EDITED_TOOLTIP } })
    save()

    const payload = await savedPayload()

    expect(sendsLocalized(payload)).toBe(false)
    expect(payload.definition).toMatchObject({ tooltip: EDITED_TOOLTIP })
    expect(confirmWarning).not.toHaveBeenCalled()
  })

  it('omits the localized member again when the control is moved back to the stored state', async () => {
    renderModal(true)

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
    const patchCache = renderModal(localized)

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
    const patchCache = renderModal(null)

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
    renderModal(STORED_LOCALIZED[from])

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

    renderModal(true)

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
    const patchCache = renderModal(null)

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

    renderModal(true)

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
})
