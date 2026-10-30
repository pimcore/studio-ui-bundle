/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const convertValue = jest.fn()

jest.mock('./quantity-value-range.styles', () => ({
  useStyles: () => ({ styles: { container: 'container', input: 'input' } })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-quantity-value-units', () => ({
  useQuantityValueUnits: () => ({
    getSelectOptions: () => [],
    convertValue
  })
}))

jest.mock('@Pimcore/components/select/select', () => ({
  Select: (props: { onChange: (unitId?: string) => void, value?: string }) => (
    <>
      <button
        data-testid="unit"
        onClick={ () => { props.onChange('mm') } }
      >
        { props.value }
      </button>
      <button
        data-testid="unit-m"
        onClick={ () => { props.onChange('m') } }
      />
    </>
  )
}))

jest.mock('@Pimcore/components/input-number/input-number', () => ({
  InputNumber: (props: { value?: number, onChange?: (value: number | null) => void }) => (
    <button
      data-testid="number"
      onClick={ () => { props.onChange?.(5) } }
    >
      { props.value }
    </button>
  )
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: (props: { children: React.ReactNode }) => <div>{ props.children }</div>
}))

jest.mock('antd', () => ({
  theme: { useToken: () => ({ token: { sizeSM: 8 } }) }
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { QuantityValueRange } from './quantity-value-range'

const numbers = (): string[] => screen.getAllByTestId('number').map(element => element.textContent ?? '')

describe('QuantityValueRange automatic conversion', () => {
  beforeEach(() => {
    convertValue.mockReset()
    convertValue.mockImplementation(async (_from: string, _to: string, value: number) => value * 10)
  })

  it('converts minimum and maximum when the unit changes and autoConvert is on', async () => {
    const onChange = jest.fn()

    render(
      <QuantityValueRange
        autoConvert
        onChange={ onChange }
        value={ { minimum: 1, maximum: 2, unitId: 'cm' } }
      />
    )
    await act(async () => { fireEvent.click(screen.getByTestId('unit')) })

    await waitFor(() => { expect(onChange).toHaveBeenLastCalledWith({ minimum: 10, maximum: 20, unitId: 'mm' }) })
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(numbers()).toEqual(['10', '20'])
    expect(convertValue).toHaveBeenCalledWith('cm', 'mm', 1)
    expect(convertValue).toHaveBeenCalledWith('cm', 'mm', 2)
  })

  it('keeps the numbers when autoConvert is off', async () => {
    const onChange = jest.fn()

    render(
      <QuantityValueRange
        autoConvert={ false }
        onChange={ onChange }
        value={ { minimum: 1, maximum: 2, unitId: 'cm' } }
      />
    )
    await act(async () => { fireEvent.click(screen.getByTestId('unit')) })

    expect(onChange).toHaveBeenLastCalledWith({ minimum: 1, maximum: 2, unitId: 'mm' })
    expect(convertValue).not.toHaveBeenCalled()
  })

  it('converts only the bound that is set', async () => {
    const onChange = jest.fn()

    render(
      <QuantityValueRange
        autoConvert
        onChange={ onChange }
        value={ { minimum: null, maximum: 2, unitId: 'cm' } }
      />
    )
    await act(async () => { fireEvent.click(screen.getByTestId('unit')) })

    await waitFor(() => { expect(onChange).toHaveBeenLastCalledWith({ minimum: null, maximum: 20, unitId: 'mm' }) })
    expect(convertValue).toHaveBeenCalledTimes(1)
  })

  it('keeps the numbers when the units cannot be converted', async () => {
    convertValue.mockResolvedValue(null)
    const onChange = jest.fn()

    render(
      <QuantityValueRange
        autoConvert
        onChange={ onChange }
        value={ { minimum: 1, maximum: 2, unitId: 'cm' } }
      />
    )
    await act(async () => { fireEvent.click(screen.getByTestId('unit')) })

    expect(onChange).toHaveBeenLastCalledWith({ minimum: 1, maximum: 2, unitId: 'mm' })
  })

  it('changes only the unit when one of two bounds cannot be converted', async () => {
    convertValue.mockImplementation(async (_from: string, _to: string, value: number) => value === 2 ? null : value * 10)
    const onChange = jest.fn()

    render(
      <QuantityValueRange
        autoConvert
        onChange={ onChange }
        value={ { minimum: 1, maximum: 2, unitId: 'cm' } }
      />
    )
    await act(async () => { fireEvent.click(screen.getByTestId('unit')) })

    expect(convertValue).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith({ minimum: 1, maximum: 2, unitId: 'mm' })
    expect(numbers()).toEqual(['1', '2'])
  })

  it('ignores an older pending conversion when the unit is changed again', async () => {
    const pending: Array<(value: number) => void> = []
    convertValue.mockImplementation(async () => await new Promise<number>(resolve => { pending.push(resolve) }))
    const onChange = jest.fn()

    render(
      <QuantityValueRange
        autoConvert
        onChange={ onChange }
        value={ { minimum: 1, maximum: 2, unitId: 'cm' } }
      />
    )
    fireEvent.click(screen.getByTestId('unit'))
    fireEvent.click(screen.getByTestId('unit-m'))
    expect(pending).toHaveLength(4)

    // the newer conversion (mm -> m) answers first, the older one (cm -> mm) answers late
    await act(async () => { pending[2](7); pending[3](7) })
    await act(async () => { pending[0](99); pending[1](99) })

    expect(onChange).toHaveBeenLastCalledWith({ minimum: 7, maximum: 7, unitId: 'm' })
    expect(onChange).not.toHaveBeenCalledWith(expect.objectContaining({ minimum: 99 }))
    expect(numbers()).toEqual(['7', '7'])
  })

  it('ignores a pending conversion when a bound is edited meanwhile', async () => {
    const pending: Array<(value: number) => void> = []
    convertValue.mockImplementation(async () => await new Promise<number>(resolve => { pending.push(resolve) }))
    const onChange = jest.fn()

    render(
      <QuantityValueRange
        autoConvert
        onChange={ onChange }
        value={ { minimum: 1, maximum: 2, unitId: 'cm' } }
      />
    )
    fireEvent.click(screen.getByTestId('unit'))
    fireEvent.click(screen.getAllByTestId('number')[0])
    await act(async () => { pending.forEach(resolve => { resolve(99) }) })

    expect(onChange).toHaveBeenLastCalledWith({ minimum: 5, maximum: 2, unitId: 'mm' })
    expect(numbers()).toEqual(['5', '2'])
  })
})
