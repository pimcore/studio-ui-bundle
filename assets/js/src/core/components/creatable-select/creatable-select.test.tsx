/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' }
  })
}))

// The @sdk/components barrel pulls in antd-style, which ships untranspiled ESM. Only these
// primitives are needed, so map them onto the real antd ones.
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
    InputNumber: antd.InputNumber,
    // The real Select injects CSS that jsdom's selector engine cannot parse, and it is not what is
    // under test — render the dropdown content it would show instead.
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
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { CreatableSelect } from './creatable-select'

const getInput = (): HTMLInputElement => screen.getByRole('spinbutton')
const getAddButton = (): HTMLElement => screen.getByRole('button', { name: 'creatable-select.add' })
const type = (value: string): void => { fireEvent.change(getInput(), { target: { value } }) }
const isAddDisabled = (): boolean => getAddButton().hasAttribute('disabled')
const isErrorShown = (): boolean => screen.queryByText('creatable-select.invalid-option') !== null
const isDuplicateShown = (): boolean => screen.queryByText('creatable-select.option-already-exists') !== null

const renderNumberSelect = (onChange?: jest.Mock): { container: HTMLElement } => render(
  <CreatableSelect
    inputType='number'
    numberInputProps={ { min: 1 } }
    onChange={ onChange }
    open
    options={ [] }
    validate={ (value) => !isNaN(parseInt(value)) && parseInt(value) > 0 }
  />
)

describe('CreatableSelect number input (#1954)', () => {
  it('rejects text that is not a number', () => {
    renderNumberSelect()

    type('12')
    expect(isAddDisabled()).toBe(false)

    // `InputNumber` reports nothing through `onChange` here, so without tracking the typed text the
    // previously committed `12` would be added.
    type('12aaa')
    expect(getInput().value).toBe('12aaa')
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)
  })

  it('re-validates when the leading digits are deleted', () => {
    renderNumberSelect()

    type('12aaa')
    type('aaa')

    expect(getInput().value).toBe('aaa')
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)
  })

  it('clears the tracked text when the input is emptied', () => {
    renderNumberSelect()

    type('12')
    type('')

    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(false)
  })

  it('reports a below-min value as invalid instead of coercing it to the minimum', () => {
    renderNumberSelect()

    type('0')
    fireEvent.blur(getInput())
    fireEvent.keyDown(getInput(), { key: 'Enter' })

    expect(getInput().value).toBe('0')
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)
  })

  it('still applies min to the steppers', () => {
    const { container } = renderNumberSelect()

    type('1')
    expect(getInput().getAttribute('aria-valuemin')).toBe('1')

    const downHandler = container.querySelector('.ant-input-number-handler-down')
    fireEvent.mouseDown(downHandler!)

    expect(getInput().value).toBe('1')
  })

  it('adds a valid value and resets the input', () => {
    const onChange = jest.fn()
    renderNumberSelect(onChange)

    type('30')
    expect(isAddDisabled()).toBe(false)

    fireEvent.click(getAddButton())

    expect(onChange).toHaveBeenCalledWith('30', expect.objectContaining({ value: '30' }))
    expect(getInput().value).toBe('')
    expect(isAddDisabled()).toBe(true)
  })

  it('rejects a below-min value when min is the only constraint', () => {
    render(
      <CreatableSelect
        inputType='number'
        numberInputProps={ { min: 1 } }
        open
        options={ [] }
      />
    )

    type('0')

    // `InputNumber` refuses to commit an out-of-range value, so the bounds constrain created
    // options and not just the steppers.
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)
  })

  it('resets the tracked text when a duplicate is submitted', () => {
    render(
      <CreatableSelect
        inputType='number'
        numberInputProps={ { min: 1 } }
        open
        options={ [{ value: '3', label: '3' }] }
        validate={ (value) => !isNaN(parseInt(value)) && parseInt(value) > 0 }
      />
    )

    type('3')
    // The Add button is already disabled for duplicates, so Enter is the way in.
    fireEvent.keyDown(getInput(), { key: 'Enter' })

    expect(getInput().value).toBe('')
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(false)
  })

  it('honours a parser supplied through numberInputProps', () => {
    render(
      <CreatableSelect
        inputType='number'
        numberInputProps={ { parser: (value) => (value ?? '').replace(/[^\d.-]/g, '') } }
        open
        options={ [] }
      />
    )

    type('12 kg')

    expect(isAddDisabled()).toBe(false)
    expect(isErrorShown()).toBe(false)
  })

  it('does not submit a stale committed value after the text is replaced', () => {
    const onChange = jest.fn()
    renderNumberSelect(onChange)

    type('12')
    // `InputNumber` withholds `onChange` for the out-of-range 0, so the committed value stays 12.
    type('0')

    expect(getInput().value).toBe('0')
    expect(isAddDisabled()).toBe(true)
    expect(isErrorShown()).toBe(true)

    fireEvent.keyDown(getInput(), { key: 'Enter' })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('reports invalid text rather than treating it as a duplicate', () => {
    render(
      <CreatableSelect
        inputType='number'
        numberInputProps={ { min: 1 } }
        open
        options={ [{ value: '12', label: '12' }] }
        validate={ (value) => !isNaN(parseInt(value)) && parseInt(value) > 0 }
      />
    )

    type('12')
    type('12aaa')
    fireEvent.keyDown(getInput(), { key: 'Enter' })

    expect(getInput().value).toBe('12aaa')
    expect(isErrorShown()).toBe(true)
  })

  it('forwards an onInput handler supplied through numberInputProps', () => {
    const onInput = jest.fn()
    render(
      <CreatableSelect
        inputType='number'
        numberInputProps={ { min: 1, onInput } }
        open
        options={ [] }
      />
    )

    type('12')

    expect(onInput).toHaveBeenCalledWith('12')
  })

  it('replaces the duplicate message when the text becomes invalid', () => {
    render(
      <CreatableSelect
        inputType='number'
        numberInputProps={ { min: 1 } }
        open
        options={ [{ value: '12', label: '12' }] }
        validate={ (value) => !isNaN(parseInt(value)) && parseInt(value) > 0 }
      />
    )

    type('12')
    expect(isDuplicateShown()).toBe(true)
    expect(isErrorShown()).toBe(false)

    // The duplicate message describes the committed 12, which is no longer what the field shows.
    type('12a')
    expect(isErrorShown()).toBe(true)
    expect(isDuplicateShown()).toBe(false)
  })

  it('leaves the string input unchanged', () => {
    render(
      <CreatableSelect
        inputType='string'
        open
        options={ [] }
      />
    )

    const input = screen.getByPlaceholderText('creatable-select.add-custom-option')
    fireEvent.change(input, { target: { value: 'anything' } })

    expect((input as HTMLInputElement).value).toBe('anything')
    expect(isAddDisabled()).toBe(false)
  })
})
