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
      <button
        data-testid="unit-cm"
        onClick={ () => { props.onChange('cm') } }
      />
      <button
        data-testid="unit-clear"
        onClick={ () => { props.onChange(undefined) } }
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

  const factors: Record<string, number> = { 'cm>mm': 10, 'mm>m': 0.001, 'cm>m': 0.01 }

  it('converts from the unit the numbers are really in when the unit is changed again while pending', async () => {
    const pending: Array<{ from: string, to: string, value: number, resolve: (value: number) => void }> = []
    convertValue.mockImplementation(async (from: string, to: string, value: number) => await new Promise<number>(resolve => {
      pending.push({ from, to, value, resolve })
    }))
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
    expect(pending.map(request => `${request.from}>${request.to}:${request.value}`)).toEqual(['cm>mm:1', 'cm>mm:2', 'cm>m:1', 'cm>m:2'])

    // the newer conversion answers first, the older one answers late
    await act(async () => { pending.slice(2).forEach(request => { request.resolve(request.value * factors[`${request.from}>${request.to}`]) }) })
    await act(async () => { pending.slice(0, 2).forEach(request => { request.resolve(request.value * factors[`${request.from}>${request.to}`]) }) })

    expect(onChange).toHaveBeenLastCalledWith({ minimum: 0.01, maximum: 0.02, unitId: 'm' })
    expect(numbers()).toEqual(['0.01', '0.02'])
  })

  it('still converts the untouched bound when the other bound is edited while pending', async () => {
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

    expect(pending).toHaveLength(2)
    expect(onChange).toHaveBeenLastCalledWith({ minimum: 5, maximum: 99, unitId: 'mm' })
    expect(numbers()).toEqual(['5', '99'])
  })

  const deferConversions = (): Array<(value: number) => void> => {
    const pending: Array<(value: number) => void> = []
    convertValue.mockImplementation(async () => await new Promise<number>(resolve => { pending.push(resolve) }))
    return pending
  }

  it('keeps the original numbers when the unit is switched back while pending', async () => {
    const pending = deferConversions()
    const onChange = jest.fn()

    render(
      <QuantityValueRange
        autoConvert
        onChange={ onChange }
        value={ { minimum: 1, maximum: 2, unitId: 'cm' } }
      />
    )
    fireEvent.click(screen.getByTestId('unit'))
    fireEvent.click(screen.getByTestId('unit-cm'))
    await act(async () => { pending.forEach(resolve => { resolve(99) }) })

    // the numbers never left cm, so the late answers of the cm>mm conversion must not be applied
    expect(onChange).toHaveBeenLastCalledWith({ minimum: 1, maximum: 2, unitId: 'cm' })
    expect(numbers()).toEqual(['1', '2'])
  })

  it('keeps the numbers when the unit is cleared while pending', async () => {
    const pending = deferConversions()
    const onChange = jest.fn()

    render(
      <QuantityValueRange
        autoConvert
        onChange={ onChange }
        value={ { minimum: 1, maximum: 2, unitId: 'cm' } }
      />
    )
    fireEvent.click(screen.getByTestId('unit'))
    fireEvent.click(screen.getByTestId('unit-clear'))
    await act(async () => { pending.forEach(resolve => { resolve(99) }) })

    expect(onChange).toHaveBeenLastCalledWith({ minimum: 1, maximum: 2, unitId: null })
    expect(numbers()).toEqual(['1', '2'])
  })

  it('drops a pending conversion when the value is replaced from outside', async () => {
    const pending = deferConversions()
    const onChange = jest.fn()

    const { rerender } = render(
      <QuantityValueRange
        autoConvert
        onChange={ onChange }
        value={ { minimum: 1, maximum: 2, unitId: 'cm' } }
      />
    )
    fireEvent.click(screen.getByTestId('unit'))
    rerender(
      <QuantityValueRange
        autoConvert
        onChange={ onChange }
        value={ { minimum: 7, maximum: 8, unitId: 'cm' } }
      />
    )
    await act(async () => { pending.forEach(resolve => { resolve(99) }) })

    expect(numbers()).toEqual(['7', '8'])
    expect(onChange).not.toHaveBeenCalledWith({ minimum: 99, maximum: 99, unitId: 'mm' })
  })
})
