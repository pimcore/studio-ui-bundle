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
