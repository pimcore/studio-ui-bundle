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
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style is untranspiled ESM and the real styles inject CSS jsdom cannot parse.
jest.mock('./select.styles', () => ({
  useStyles: () => ({ styles: new Proxy({}, { get: (_target, name) => String(name) }) })
}))

jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/components/spin/spin', () => ({ Spin: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width', () => ({
  useFieldWidthOptional: () => undefined
}))

/* eslint-disable import/first */
import React, { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Select, type SelectProps } from './select'

const options = [
  { label: 'Austria', value: 'AT' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' }
]

// antd's CSS-in-JS rules use selectors jsdom's computed-style engine rejects; the dropdown only needs plain values.
beforeAll(() => {
  jest.spyOn(window, 'getComputedStyle').mockImplementation(() => ({ overflow: 'visible', getPropertyValue: () => '' }) as unknown as CSSStyleDeclaration)
})

afterAll(() => {
  jest.restoreAllMocks()
})

const lastValue = (onChange: jest.Mock): string[] => onChange.mock.calls[onChange.mock.calls.length - 1][0]

const Controlled = ({ onChange, initialValue = [], ...props }: Omit<SelectProps, 'onChange'> & { onChange: jest.Mock, initialValue?: string[] }): React.JSX.Element => {
  const [value, setValue] = useState<string[]>(initialValue)

  return (
    <Select
      allowClear
      allowSelectAll
      mode="multiple"
      onChange={ (next, opts) => { setValue(next as string[]); onChange(next, opts) } }
      open
      optionFilterProp="label"
      options={ options }
      showSearch
      value={ value }
      { ...props }
    />
  )
}

const search = (text: string): void => {
  fireEvent.change(screen.getByRole('combobox'), { target: { value: text } })
}

const pick = (label: string): void => {
  fireEvent.click(screen.getByText(label, { selector: '.ant-select-item-option-content' }))
}

describe('Select "Select all"', () => {
  it('selects every enabled option', () => {
    const onChange = jest.fn()
    render(<Controlled onChange={ onChange } />)

    fireEvent.click(screen.getByText('select.select-all'))

    expect(lastValue(onChange)).toEqual(['AT', 'DE', 'FR'])
    expect(screen.queryByText('select.select-all')).toBeNull()
  })

  it('adds only the options matching the active search', () => {
    const onChange = jest.fn()
    render(<Controlled onChange={ onChange } />)

    search('an')
    fireEvent.click(screen.getByText('select.select-all'))

    expect(lastValue(onChange)).toEqual(['DE', 'FR'])
  })

  it('forgets the search after a pick, so Select all adds the whole visible list', () => {
    const onChange = jest.fn()
    render(<Controlled onChange={ onChange } />)

    search('an')
    pick('France')
    fireEvent.click(screen.getByText('select.select-all'))

    expect(lastValue(onChange)).toEqual(['FR', 'AT', 'DE'])
  })

  it('keeps the search after a pick when autoClearSearchValue is false', () => {
    const onChange = jest.fn()
    render(<Controlled
      autoClearSearchValue={ false }
      onChange={ onChange }
           />)

    search('an')
    pick('France')
    fireEvent.click(screen.getByText('select.select-all'))

    expect(lastValue(onChange)).toEqual(['FR', 'DE'])
  })

  it('forgets the search after a deselect, so Select all adds the whole visible list', () => {
    const onChange = jest.fn()
    render(<Controlled
      initialValue={ ['FR'] }
      onChange={ onChange }
           />)

    search('an')
    pick('France')
    fireEvent.click(screen.getByText('select.select-all'))

    expect(lastValue(onChange)).toEqual(['AT', 'DE', 'FR'])
  })

  it('keeps the search when the dropdown is closed and reopened, so Select all matches the list', () => {
    const onChange = jest.fn()
    render(<Controlled
      onChange={ onChange }
      open={ undefined }
           />)
    const combobox = screen.getByRole('combobox')

    fireEvent.mouseDown(combobox)
    search('an')
    fireEvent.keyDown(combobox, { key: 'Escape', keyCode: 27 })
    fireEvent.mouseDown(combobox)

    expect(screen.queryByText('Austria', { selector: '.ant-select-item-option-content' })).toBeNull()
    fireEvent.click(screen.getByText('select.select-all'))

    expect(lastValue(onChange)).toEqual(['DE', 'FR'])
  })

  it.each([
    ['without the prop', { allowSelectAll: false }],
    ['with maxCount', { maxCount: 2 }],
    ['in single mode', { mode: undefined }]
  ])('is not offered %s', (_name, props) => {
    render(<Controlled
      onChange={ jest.fn() }
      { ...props as Omit<SelectProps, 'onChange'> }
           />)

    expect(screen.queryByText('select.select-all')).toBeNull()
  })
})
