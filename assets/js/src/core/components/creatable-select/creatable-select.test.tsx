/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

let language = 'en'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { get language () { return language } }
  })
}))

// antd-style is untranspiled ESM — the InputNumber wrapper only needs class names from it.
jest.mock('@Pimcore/components/input-number/input-number.styles', () => ({
  useStyles: () => ({ styles: { inputNumber: 'input-number', inherited: 'inherited' } })
}))

// The barrel pulls in antd-style too. InputNumber stays real — its decimalSeparator is under test.
jest.mock('@sdk/components', () => {
  const antd = jest.requireActual('antd')
  const react = jest.requireActual('react')

  return {
    Box: ({ children }: { children?: React.ReactNode }) => react.createElement('div', null, children),
    Text: ({ children }: { children?: React.ReactNode }) => react.createElement('span', null, children),
    Button: antd.Button,
    Divider: antd.Divider,
    Flex: antd.Flex,
    Input: antd.Input,
    InputNumber: jest.requireActual('@Pimcore/components/input-number/input-number').InputNumber,
    // The real Select injects CSS that jsdom cannot parse; only its dropdown content matters here.
    Select: ({ dropdownRender }: { dropdownRender?: (menu: React.ReactElement) => React.ReactNode }) =>
      react.createElement(
        'div',
        null,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        dropdownRender?.(react.createElement('div', null, 'menu'))
      )
  }
})

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { isNull } from 'lodash'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { CreatableSelect, type CreatableSelectProps } from './creatable-select'

const getInput = (): HTMLInputElement => screen.getByRole('spinbutton')
const getAddButton = (): HTMLElement => screen.getByRole('button', { name: 'creatable-select.add' })
const type = (value: string): void => { fireEvent.change(getInput(), { target: { value } }) }
const pressEnter = (): void => { fireEvent.keyDown(getInput(), { key: 'Enter' }) }
const isAddDisabled = (): boolean => getAddButton().hasAttribute('disabled')
const isErrorShown = (): boolean => !isNull(screen.queryByText('creatable-select.invalid-option'))
const isDuplicateShown = (): boolean => !isNull(screen.queryByText('creatable-select.option-already-exists'))

const positiveNumber = (value: string): boolean => !isNaN(parseInt(value)) && parseInt(value) > 0

const renderSelect = (props: Partial<CreatableSelectProps> = {}): ReturnType<typeof render> => render(
  <CreatableSelect
    inputType='number'
    open
    options={ [] }
    { ...props }
  />
)

const renderBounded = (props: Partial<CreatableSelectProps> = {}): ReturnType<typeof render> => renderSelect({
  numberInputProps: { min: 1 },
  validate: positiveNumber,
  ...props
})

describe('CreatableSelect number input (#1954)', () => {
  beforeEach(() => { language = 'en' })

  it('rejects text that is not a number', () => {
    renderBounded()

    type('12')
    expect(isAddDisabled()).toBe(false)

    type('12aaa')
    expect(getInput().value).toBe('12aaa')
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)
  })

  it('re-validates when the leading digits are deleted', () => {
    renderBounded()

    type('12aaa')
    type('aaa')

    expect(getInput().value).toBe('aaa')
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)
  })

  it('clears the tracked text when the input is emptied', () => {
    renderBounded()

    type('12')
    type('')

    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(false)
  })

  it('reports a below-min value as invalid instead of coercing it to the minimum', () => {
    renderBounded()

    type('0')
    fireEvent.blur(getInput())
    pressEnter()

    expect(getInput().value).toBe('0')
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)
  })

  it('rejects a below-min value when min is the only constraint', () => {
    renderSelect({ numberInputProps: { min: 1 } })

    type('0')

    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)
  })

  it('does not submit a stale committed value after the text is replaced', () => {
    const onChange = jest.fn()
    renderBounded({ onChange })

    type('12')
    // `InputNumber` withholds `onChange` for the out-of-range 0, so 12 stays committed.
    type('0')

    expect(getInput().value).toBe('0')
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)

    pressEnter()

    expect(onChange).not.toHaveBeenCalled()
  })

  it('still applies min to the steppers', () => {
    const { container } = renderBounded()

    type('1')
    expect(getInput().getAttribute('aria-valuemin')).toBe('1')

    fireEvent.mouseDown(container.querySelector('.ant-input-number-handler-down')!)

    expect(getInput().value).toBe('1')
  })

  it('adds a valid value and resets the input', () => {
    const onChange = jest.fn()
    renderBounded({ onChange })

    type('30')
    expect(isAddDisabled()).toBe(false)

    fireEvent.click(getAddButton())

    expect(onChange).toHaveBeenCalledWith('30', expect.objectContaining({ value: '30' }))
    expect(getInput().value).toBe('')
    expect(isAddDisabled()).toBe(true)
  })

  it('resets the tracked text when a duplicate is submitted', () => {
    renderBounded({ options: [{ value: '3', label: '3' }] })

    type('3')
    // The Add button is already disabled for duplicates, so Enter is the way in.
    pressEnter()

    expect(getInput().value).toBe('')
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(false)
  })

  it('reports invalid text rather than treating it as a duplicate', () => {
    renderBounded({ options: [{ value: '12', label: '12' }] })

    type('12')
    type('12aaa')
    pressEnter()

    expect(getInput().value).toBe('12aaa')
    expect(isErrorShown()).toBe(true)
  })

  it('replaces the duplicate message when the text becomes invalid', () => {
    renderBounded({ options: [{ value: '12', label: '12' }] })

    type('12')
    expect(isDuplicateShown()).toBe(true)
    expect(isErrorShown()).toBe(false)

    type('12a')
    expect(isErrorShown()).toBe(true)
    expect(isDuplicateShown()).toBe(false)
  })

  it('honours a parser supplied through numberInputProps', () => {
    renderSelect({ numberInputProps: { parser: (value) => (value ?? '').replace(/[^\d.-]/g, '') } })

    type('12 kg')

    expect(isAddDisabled()).toBe(false)
    expect(isErrorShown()).toBe(false)
  })

  it('forwards an onInput handler supplied through numberInputProps', () => {
    const onInput = jest.fn()
    renderSelect({ numberInputProps: { onInput } })

    type('12')

    expect(onInput).toHaveBeenCalledWith('12')
  })

  it('rejects a grouping separator instead of reading it as a decimal point', () => {
    renderSelect()

    type('1,000')

    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)
  })

  it('rejects the dot as a grouping separator in locales that use the comma', () => {
    language = 'de'
    renderSelect()

    type('1.000')

    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)
  })

  it('does not flash an error while a decimal is being typed', () => {
    renderSelect()

    type('12')
    type('12.')
    expect(isErrorShown()).toBe(false)

    type('12.4')
    expect(isAddDisabled()).toBe(false)
    expect(isErrorShown()).toBe(false)
  })

  it('reads the comma as a decimal separator in locales that use it', () => {
    language = 'de'
    const onChange = jest.fn()
    renderSelect({ onChange })

    type('12,4')
    expect(isAddDisabled()).toBe(false)

    fireEvent.click(getAddButton())

    expect(onChange).toHaveBeenCalledWith('12.4', expect.objectContaining({ value: '12.4' }))
  })

  it('leaves the string input unchanged', () => {
    renderSelect({ inputType: 'string' })

    const input = screen.getByPlaceholderText('creatable-select.add-custom-option')
    fireEvent.change(input, { target: { value: 'anything' } })

    expect((input as HTMLInputElement).value).toBe('anything')
    expect(isAddDisabled()).toBe(false)
  })

  it('keeps invalid string input that matches an existing option', () => {
    renderSelect({ inputType: 'string', options: [{ value: 'abc', label: 'abc' }], validate: () => false })

    const input = screen.getByPlaceholderText('creatable-select.add-custom-option')
    fireEvent.change(input, { target: { value: 'abc' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect((input as HTMLInputElement).value).toBe('abc')
    expect(isErrorShown()).toBe(true)
  })
})
