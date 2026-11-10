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

// antd-style is untranspiled ESM — the wrapper only needs class names from it
jest.mock('./input-number.styles', () => ({
  useStyles: () => ({ styles: { inputNumber: 'input-number', inherited: 'inherited' } })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { get language () { return language } }
  })
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { InputNumber } from './input-number'

const getInput = (): HTMLInputElement => screen.getByRole('spinbutton')

const type = (value: string): void => {
  fireEvent.change(getInput(), { target: { value } })
}

describe('InputNumber decimal separator', () => {
  beforeEach(() => { language = 'en' })

  it('parses a comma-separated decimal in locales that use the comma (PEES-1321)', () => {
    language = 'de'
    const onChange = jest.fn()

    render(<InputNumber onChange={ onChange } />)
    type('12,4')

    expect(onChange).toHaveBeenLastCalledWith(12.4)
  })

  it('renders the value with the locale separator', () => {
    language = 'de'

    render(<InputNumber value={ 12.4 } />)

    expect(getInput().value).toBe('12,4')
  })

  it('renders integers without a trailing separator in comma locales', () => {
    language = 'de'

    render(<InputNumber value={ 12 } />)

    expect(getInput().value).toBe('12')
  })

  it('honours precision with the locale separator', () => {
    language = 'de'

    render(
      <InputNumber
        precision={ 2 }
        value={ 12.4 }
      />
    )

    expect(getInput().value).toBe('12,40')
  })

  it('still parses a dot-separated decimal in comma locales', () => {
    language = 'de'
    const onChange = jest.fn()

    render(<InputNumber onChange={ onChange } />)
    type('12.4')

    expect(onChange).toHaveBeenLastCalledWith(12.4)
  })

  it('keeps the dot as separator for locales that use it', () => {
    const onChange = jest.fn()

    const { rerender } = render(<InputNumber onChange={ onChange } />)
    type('12.4')
    expect(onChange).toHaveBeenLastCalledWith(12.4)

    rerender(<InputNumber value={ 12.4 } />)
    expect(getInput().value).toBe('12.4')
  })

  it('lets an explicit decimalSeparator win over the locale default', () => {
    language = 'de'
    const onChange = jest.fn()

    render(
      <InputNumber
        decimalSeparator="."
        onChange={ onChange }
      />
    )
    type('12,4')

    expect(onChange).toHaveBeenLastCalledWith(124)
  })
})

describe('InputNumber keystroke filtering', () => {
  beforeEach(() => { language = 'en' })

  it('drops typed characters that cannot be part of a number', async () => {
    const user = userEvent.setup()

    render(<InputNumber />)
    await user.type(getInput(), 'abc12x')

    expect(getInput().value).toBe('12')
  })

  it('accepts digits, a minus sign and the locale decimal separator', async () => {
    language = 'de'
    const onChange = jest.fn()
    const user = userEvent.setup()

    render(<InputNumber onChange={ onChange } />)
    await user.type(getInput(), '-12,5')

    expect(onChange).toHaveBeenLastCalledWith(-12.5)
  })

  it('accepts the dot as decimal separator in comma locales', async () => {
    language = 'de'
    const onChange = jest.fn()
    const user = userEvent.setup()

    render(<InputNumber onChange={ onChange } />)
    await user.type(getInput(), '3.25')

    expect(onChange).toHaveBeenLastCalledWith(3.25)
  })

  it('blocks letters, exponent notation, whitespace and the foreign decimal separator', () => {
    render(<InputNumber />)

    expect(fireEvent.keyDown(getInput(), { key: 'x' })).toBe(false)
    expect(fireEvent.keyDown(getInput(), { key: 'e' })).toBe(false)
    expect(fireEvent.keyDown(getInput(), { key: ' ' })).toBe(false)
    expect(fireEvent.keyDown(getInput(), { key: ',' })).toBe(false)
  })

  it('lets the locale decimal separator through', () => {
    language = 'de'

    render(<InputNumber />)

    expect(fireEvent.keyDown(getInput(), { key: ',' })).toBe(true)
    expect(fireEvent.keyDown(getInput(), { key: '.' })).toBe(true)
    expect(fireEvent.keyDown(getInput(), { key: '-' })).toBe(true)
  })

  it('does not block keyboard shortcuts or navigation keys', () => {
    render(<InputNumber />)

    expect(fireEvent.keyDown(getInput(), { key: 'a', ctrlKey: true })).toBe(true)
    expect(fireEvent.keyDown(getInput(), { key: 'v', metaKey: true })).toBe(true)
    expect(fireEvent.keyDown(getInput(), { key: 'Backspace' })).toBe(true)
    expect(fireEvent.keyDown(getInput(), { key: 'ArrowLeft' })).toBe(true)
    expect(fireEvent.keyDown(getInput(), { key: 'Tab' })).toBe(true)
  })

  it('still calls a passed onKeyDown handler', () => {
    const onKeyDown = jest.fn()

    render(<InputNumber onKeyDown={ onKeyDown } />)
    fireEvent.keyDown(getInput(), { key: 'x' })

    expect(onKeyDown).toHaveBeenCalledTimes(1)
  })

  it('leaves the keystrokes alone when a custom parser is given', () => {
    render(<InputNumber parser={ (value) => (value ?? '').replace(/[^0-9]/g, '') } />)

    expect(fireEvent.keyDown(getInput(), { key: 'x' })).toBe(true)
  })
})

describe('InputNumber text insertion filtering', () => {
  beforeEach(() => { language = 'en' })

  const beforeInput = (data: string, cancelable = true): boolean =>
    fireEvent(getInput(), new InputEvent('beforeinput', { data, cancelable, bubbles: true }))

  it('rejects pasted text that cannot be a number', async () => {
    const user = userEvent.setup()

    render(<InputNumber />)
    await user.click(getInput())
    await user.paste('ab12')

    expect(getInput().value).toBe('')

    await user.paste('12.5')

    expect(getInput().value).toBe('12.5')
  })

  it('judges inserted text by the same character set as typing', () => {
    language = 'de'

    render(<InputNumber />)

    expect(beforeInput('-12,5')).toBe(true)
    expect(beforeInput('3.25')).toBe(true)
    expect(beforeInput('1e5')).toBe(false)
    expect(beforeInput('12 000')).toBe(false)
  })

  it('leaves non-cancelable insertions such as IME composition alone', () => {
    render(<InputNumber />)

    expect(beforeInput('abc', false)).toBe(true)
  })

  it('leaves insertions alone when a custom parser is given', () => {
    render(<InputNumber parser={ (value) => (value ?? '').replace(/[^0-9]/g, '') } />)

    expect(beforeInput('abc')).toBe(true)
  })
})
