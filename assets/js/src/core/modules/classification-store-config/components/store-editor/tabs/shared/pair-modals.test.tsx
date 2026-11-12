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

// antd-style ships untranspiled ESM, which jest does not transform
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('@Pimcore/modules/ant-design/hooks/use-css-component-hash', () => ({
  useCssComponentHash: () => ''
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { name?: string }) => options?.name !== undefined ? `${key}:${options.name}` : key
  }),
  initReactI18next: { type: '3rdParty', init: () => {} }
}))

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({ getDynamicType: () => undefined })
}))

// The form and its inputs reach the SDK barrels, which pull in the whole application down to
// untranspiled ESM.
jest.mock('@sdk/components', () => ({
  ...jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkComponentsMock,
  Content: ({ children }: any) => <div>{children}</div>,
  Form: jest.requireActual('antd').Form,
  FormKit: () => null
}))
jest.mock('@sdk/modules/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkModulesAppMock)
jest.mock('@sdk/app', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkAppMock)

const mockTrackError = jest.fn()
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => { mockTrackError(error) },
  ApiError: class ApiError extends Error {}
}))

const mockSuccess = jest.fn()
jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: mockSuccess })
}))

const mockConfirm = jest.fn()
jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: mockConfirm })
}))

// The stand-in records what the shell hands the modal and renders the footer buttons it was given.
const mockModalProps: any[] = []
jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: (props: any) => {
    mockModalProps.push(props)

    return props.open === true
      ? (
        <div role="dialog">
          {props.children}
          <button
            disabled={ props.confirmLoading }
            onClick={ props.onOk }
            type="button"
          >
            ok
          </button>
          <button
            onClick={ props.onCancel }
            type="button"
          >
            cancel
          </button>
        </div>
        )
      : null
  }
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen, waitFor, within } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { genericView, MetadataModal } from './metadata-modal'
// eslint-disable-next-line import/first
import { TitlesModal, titlesView } from './titles-modal'
// eslint-disable-next-line import/first
import { type IPairModalProps } from './pair-modal-shell'
// eslint-disable-next-line import/first
import { isTitleKey } from './pairs'

jest.setTimeout(30000)

const ADD_PAIR = /classification-store.add-pair/
const REMOVE_A = 'classification-store.aria.remove-pair:a'
const KEY_LIST_MESSAGE = 'classification-store.pair-key-list'
const KEY_LABEL = 'classification-store.pair-key'
const VALUE_LABEL = 'classification-store.pair-value'
const LOCALE_LABEL = 'classification-store.pair-locale'
const TITLE_LABEL = 'classification-store.pair-title'

const originalFetch = globalThis.fetch
let onSave: jest.Mock
let onCancel: jest.Mock

beforeEach(() => {
  mockModalProps.length = 0
  mockTrackError.mockClear()
  mockSuccess.mockClear()
  mockConfirm.mockClear()
  onSave = jest.fn(async () => {})
  onCancel = jest.fn()
  globalThis.fetch = jest.fn() as unknown as typeof fetch
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

const props = (value: object | null, overrides: Partial<IPairModalProps> = {}): IPairModalProps => ({
  open: true,
  entityName: 'weight',
  value,
  confirmLoading: false,
  onSave,
  onCancel,
  ...overrides
})

const renderMetadata = (value: object | null, overrides: Partial<IPairModalProps> = {}): ReturnType<typeof render> =>
  render(<MetadataModal { ...props(value, overrides) } />)

const renderTitles = (value: object | null, overrides: Partial<IPairModalProps> = {}): ReturnType<typeof render> =>
  render(<TitlesModal { ...props(value, overrides) } />)

const keyInputs = (): HTMLInputElement[] => screen.queryAllByLabelText(rowLabel(KEY_LABEL))
const valueInputs = (): HTMLInputElement[] => screen.queryAllByLabelText(rowLabel(VALUE_LABEL))
const clickOk = async (user: ReturnType<typeof userEvent.setup>): Promise<void> => {
  await user.click(screen.getByRole('button', { name: 'ok' }))
}

describe('the pair modals', () => {
  it('give both shells the same sizing props and no width or styles override', () => {
    renderMetadata({ a: '1' })
    renderTitles({ 'localized_internal_title.de': 'x' })

    const shells = mockModalProps.filter((modalProps) => modalProps.open === true)

    expect(shells.length).toBeGreaterThanOrEqual(2)
    shells.forEach((modalProps) => {
      expect(modalProps.size).toBe('L')
      expect(modalProps.limitContentHeight).toBe(true)
      expect(modalProps.destroyOnClose).toBe(true)
      expect(modalProps.width).toBeUndefined()
      expect(modalProps.styles).toBeUndefined()
    })
    expect(mockModalProps[0].title).toBe('classification-store.edit-metadata:weight')
  })

  it('run the same list behaviour through both shells', async () => {
    const user = userEvent.setup({ delay: null })
    const { unmount } = renderMetadata(null)

    await user.click(screen.getByRole('button', { name: ADD_PAIR }))
    expect(keyInputs()).toHaveLength(1)
    unmount()

    renderTitles(null)
    await user.click(screen.getByRole('button', { name: ADD_PAIR }))
    expect(screen.queryAllByLabelText(rowLabel(LOCALE_LABEL))).toHaveLength(1)
    expect(screen.queryAllByLabelText(rowLabel(TITLE_LABEL))).toHaveLength(1)
  })

  it('fetch nothing on opening and hand the next map to onSave', async () => {
    const user = userEvent.setup({ delay: null })

    renderMetadata({ a: '1' })

    expect(keyInputs().map((input) => input.value)).toEqual(['a'])
    expect(valueInputs().map((input) => input.value)).toEqual(['1'])

    await user.type(valueInputs()[0], '2')
    await clickOk(user)

    await waitFor(() => { expect(onSave).toHaveBeenCalledWith({ a: '12' }) })
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('keep a row mounted while its key is typed, append new rows and pin the add button', async () => {
    const user = userEvent.setup({ delay: null })

    renderMetadata({ a: '1', b: '2' })

    const first = keyInputs()[0]
    await user.clear(first)
    await user.type(first, 'renamed')

    expect(keyInputs()[0]).toBe(first)
    expect(first).toHaveFocus()
    expect(first.value).toBe('renamed')
    expect(valueInputs()[0].value).toBe('1')

    const addButton = screen.getByRole('button', { name: ADD_PAIR })
    expect(screen.getByTestId('pair-scroll')).not.toContainElement(addButton)

    await user.click(addButton)
    await user.click(addButton)

    expect(keyInputs().map((input) => input.value)).toEqual(['renamed', 'b', '', ''])
  })

  it('show the empty state with the add button and no row when there are no pairs', () => {
    renderMetadata(null)

    expect(screen.getByText('classification-store.pair-no-content')).toBeInTheDocument()
    expect(keyInputs()).toHaveLength(0)
    expect(screen.getByRole('button', { name: ADD_PAIR })).toBeInTheDocument()
  })

  it('refuse a single pair keyed 0 and accept a non-numeric partner', async () => {
    const user = userEvent.setup({ delay: null })

    renderMetadata({ foo: 'x' })
    await user.clear(keyInputs()[0])
    await user.type(keyInputs()[0], '0')

    expect(await screen.findByText(KEY_LIST_MESSAGE)).toBeInTheDocument()

    await clickOk(user)
    expect(onSave).not.toHaveBeenCalled()
  })

  it.each([
    ['0 typed first', ['0', '1']],
    ['1 typed first', ['1', '0']]
  ])('refuse the keys 0 and 1 whichever is typed first (%s)', async (_, order) => {
    const user = userEvent.setup({ delay: null })

    renderMetadata(null)
    const add = screen.getByRole('button', { name: ADD_PAIR })

    await user.click(add)
    await user.type(keyInputs()[0], order[0])
    await user.type(valueInputs()[0], 'a')
    await user.click(add)
    await user.type(keyInputs()[1], order[1])
    await user.type(valueInputs()[1], 'b')

    expect(await screen.findAllByText(KEY_LIST_MESSAGE)).not.toHaveLength(0)

    await clickOk(user)
    expect(onSave).not.toHaveBeenCalled()
  })

  it('accept 0 next to a non-numeric key', async () => {
    const user = userEvent.setup({ delay: null })

    renderMetadata({ foo: 'x' })
    await user.click(screen.getByRole('button', { name: ADD_PAIR }))
    await user.type(keyInputs()[1], '0')
    await user.type(valueInputs()[1], 'a')
    await clickOk(user)

    await waitFor(() => { expect(onSave).toHaveBeenCalledWith({ foo: 'x', 0: 'a' }) })
  })

  it('refuse a duplicate key, an empty key and an empty value with a reason on the row', async () => {
    const user = userEvent.setup({ delay: null })

    renderMetadata({ a: '1', b: '2' })
    await user.clear(keyInputs()[1])
    await user.type(keyInputs()[1], 'a')

    expect(await screen.findAllByText('classification-store.pair-key-duplicate')).toHaveLength(2)

    await user.clear(keyInputs()[1])
    await user.clear(valueInputs()[0])
    await clickOk(user)

    expect(onSave).not.toHaveBeenCalled()
    expect(screen.getAllByText('form.validation.required')).toHaveLength(2)
  })

  it('show a non-string pair read-only and carry it into the payload by reference', async () => {
    const user = userEvent.setup({ delay: null })
    const object = { x: 1 }
    const value = { plain: 'a', obj: object, num: 3, flag: true, arr: [1, 2] }

    renderMetadata(value)

    expect(keyInputs()).toHaveLength(1)
    expect(valueInputs()).toHaveLength(1)
    expect(screen.getByText('classification-store.pair-type.object')).toBeInTheDocument()
    expect(screen.getByText('classification-store.pair-type.number')).toBeInTheDocument()
    expect(screen.getByText('classification-store.pair-type.boolean')).toBeInTheDocument()
    expect(screen.getByText('classification-store.pair-type.array')).toBeInTheDocument()
    expect(screen.getByText('{"x":1}')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /classification-store.aria.remove-pair/ })).toHaveLength(5)

    await user.clear(valueInputs()[0])
    await user.type(valueInputs()[0], 'b')
    await clickOk(user)

    await waitFor(() => { expect(onSave).toHaveBeenCalledTimes(1) })

    const sent = onSave.mock.calls[0][0] as Record<string, unknown>
    expect(sent.obj).toBe(object)
    expect(sent).toEqual({ plain: 'b', obj: { x: 1 }, num: 3, flag: true, arr: [1, 2] })
    expect(Object.keys(sent)).toEqual(['plain', 'obj', 'num', 'flag', 'arr'])
  })

  it('lay the heading, an editable row and a read-only row out on the same columns', () => {
    renderMetadata({ a: '1', obj: { x: 1 } })

    const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-pair-row]'))
    const heading = screen.getByText(KEY_LABEL).closest<HTMLElement>('div')!

    expect(rows).toHaveLength(2)
    expect(heading.style.gridTemplateColumns).not.toBe('')
    rows.forEach((row) => { expect(row.style.gridTemplateColumns).toBe(heading.style.gridTemplateColumns) })
  })

  it('send null and not an empty map when every row is removed', async () => {
    const user = userEvent.setup({ delay: null })

    renderMetadata({ a: '1', obj: { x: 1 } })
    await user.click(screen.getByRole('button', { name: REMOVE_A }))
    await user.click(screen.getByRole('button', { name: 'classification-store.aria.remove-pair:obj' }))
    await clickOk(user)

    await waitFor(() => { expect(onSave).toHaveBeenCalledWith(null) })
  })

  it('keep every non-title pair when a title is saved and show only the other pairs in the generic editor', async () => {
    const user = userEvent.setup({ delay: null })
    const stored = { externalCode: 'EF1', 'localized_internal_title.de': 'Höhe' }
    const { unmount } = renderTitles(stored)

    expect(screen.queryAllByLabelText(rowLabel(LOCALE_LABEL)).map((input) => (input as HTMLInputElement).value)).toEqual(['de'])

    await user.clear(valueInputsOf(TITLE_LABEL)[0])
    await user.type(valueInputsOf(TITLE_LABEL)[0], 'Hoehe')
    await clickOk(user)

    await waitFor(() => { expect(onSave).toHaveBeenCalledWith({ externalCode: 'EF1', 'localized_internal_title.de': 'Hoehe' }) })
    unmount()

    renderMetadata(stored)
    expect(keyInputs().map((input) => input.value)).toEqual(['externalCode'])
  })

  it('split every key between the two views so exactly one includes it', () => {
    const keys = [
      'localized_internal_title.de', 'localized_internal_title.', 'localized_internal_title',
      'Localized_Internal_Title.de', 'title.de', 'externalCode', '0'
    ]

    keys.forEach((key) => {
      expect(titlesView.includes(key)).toBe(isTitleKey(key))
      expect(genericView.includes(key)).toBe(!isTitleKey(key))
    })
    expect(keys.filter(isTitleKey)).toEqual(['localized_internal_title.de'])
  })

  it('refuse a reserved key in the generic editor, naming the titles dialog, and accept look-alikes', async () => {
    const user = userEvent.setup({ delay: null })

    renderMetadata(null)
    await user.click(screen.getByRole('button', { name: ADD_PAIR }))
    await user.type(keyInputs()[0], 'localized_internal_title.de')
    await user.type(valueInputs()[0], 'x')

    expect(await screen.findByText('classification-store.pair-key-reserved')).toBeInTheDocument()
    await clickOk(user)
    expect(onSave).not.toHaveBeenCalled()

    await user.clear(keyInputs()[0])
    await user.type(keyInputs()[0], 'title.de')
    await clickOk(user)

    await waitFor(() => { expect(onSave).toHaveBeenCalledWith({ 'title.de': 'x' }) })
  })

  it('accept a locale that is not configured, say so in a hint and refuse a second row with the same locale', async () => {
    const user = userEvent.setup({ delay: null })

    renderTitles({ 'localized_internal_title.de': 'Höhe' })
    expect(screen.getByText('classification-store.titles-locale-hint')).toBeInTheDocument()

    const add = screen.getByRole('button', { name: ADD_PAIR })
    await user.click(add)
    await user.type(screen.getAllByLabelText(rowLabel(LOCALE_LABEL))[1], 'nl-BE')
    await user.type(screen.getAllByLabelText(rowLabel(TITLE_LABEL))[1], 'Hoogte')
    await clickOk(user)

    await waitFor(() => { expect(onSave).toHaveBeenCalledWith({ 'localized_internal_title.de': 'Höhe', 'localized_internal_title.nl-BE': 'Hoogte' }) })

    onSave.mockClear()
    await user.clear(screen.getAllByLabelText(rowLabel(LOCALE_LABEL))[1])
    await user.type(screen.getAllByLabelText(rowLabel(LOCALE_LABEL))[1], 'de')

    expect(await screen.findAllByText('classification-store.pair-locale-duplicate')).toHaveLength(2)
    await clickOk(user)
    expect(onSave).not.toHaveBeenCalled()
  })

  it('stay open with the form intact when the save is rejected', async () => {
    const user = userEvent.setup({ delay: null })
    const failure = new Error('refused')

    onSave.mockRejectedValueOnce(failure)
    renderMetadata({ a: '1' })
    await user.type(valueInputs()[0], '2')
    await clickOk(user)

    await waitFor(() => { expect(mockTrackError).toHaveBeenCalledWith(failure) })
    expect(onCancel).not.toHaveBeenCalled()
    expect(mockSuccess).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'ok' })).not.toBeDisabled()
    expect(valueInputs()[0].value).toBe('12')
  })

  it('close and toast only after the save resolved', async () => {
    const user = userEvent.setup({ delay: null })

    renderMetadata({ a: '1' })
    await user.type(valueInputs()[0], '2')
    await clickOk(user)

    await waitFor(() => { expect(onCancel).toHaveBeenCalledTimes(1) })
    expect(mockSuccess).toHaveBeenCalledWith('classification-store.metadata-saved')
  })

  it('confirm before discarding a dirty form and close an untouched one at once', async () => {
    const user = userEvent.setup({ delay: null })

    renderMetadata({ a: '1' })
    await user.click(screen.getByRole('button', { name: 'cancel' }))

    expect(mockConfirm).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalledTimes(1)

    await user.type(valueInputs()[0], 'x')
    await user.click(screen.getByRole('button', { name: 'cancel' }))

    expect(mockConfirm).toHaveBeenCalledWith(expect.objectContaining({ dontAskAgainKey: expect.any(String) }))
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onSave).not.toHaveBeenCalled()
  })

  it('treat a removal as a change and bring the original pairs back when reopened', async () => {
    const user = userEvent.setup({ delay: null })
    const { rerender } = renderMetadata({ a: '1' })

    await user.click(screen.getByRole('button', { name: REMOVE_A }))
    await user.click(screen.getByRole('button', { name: 'cancel' }))
    expect(mockConfirm).toHaveBeenCalledTimes(1)

    rerender(<MetadataModal { ...props({ a: '1' }, { open: false }) } />)
    rerender(<MetadataModal { ...props({ a: '1' }) } />)

    expect(keyInputs().map((input) => input.value)).toEqual(['a'])
  })
})

function valueInputsOf (label: string): HTMLInputElement[] {
  return within(screen.getByRole('dialog')).getAllByLabelText(rowLabel(label))
}

// Each pair input carries its column heading and its row number.
const rowLabel = (heading: string): RegExp => new RegExp(`^${heading.replace(/\./g, '\\.')} \\d+$`)
