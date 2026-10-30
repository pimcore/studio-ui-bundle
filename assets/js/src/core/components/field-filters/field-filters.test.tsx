/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The row only decides which controls to show; everything it renders around them is replaced by a plain stand-in.
jest.mock('../dynamic-filter/dynamic-filter', () => ({
  DynamicFilter: () => <div data-testid="value-filter" />
}))

jest.mock('../select/select', () => ({
  Select: ({ options, value, onChange, 'aria-label': ariaLabel }: {
    options: Array<{ value: string, label: string }>
    value: string
    onChange: (value: string) => void
    'aria-label': string
  }) => (
    <select
      aria-label={ ariaLabel }
      onChange={ (event) => { onChange(event.target.value) } }
      value={ value }
    >
      {options.map((option) => (
        <option
          key={ option.value }
          value={ option.value }
        >{option.label}</option>
      ))}
    </select>
  )
}))

jest.mock('../stack-list/stack-list', () => ({
  StackList: ({ items }: { items: Array<{ key: string, body: React.ReactNode }> }) => (
    <div>{items.map((item) => <div key={ item.key }>{item.body}</div>)}</div>
  )
}))

jest.mock('../flex/flex', () => ({ Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }))
jest.mock('../icon-button/icon-button', () => ({ IconButton: () => null }))
jest.mock('../tag/tag', () => ({ Tag: () => null }))
jest.mock('../tooltip/tooltip', () => ({ Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control', () => ({
  PermissionBasedLanguageSelectionControl: () => null
}))

const mockGetType = jest.fn()
jest.mock('@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver', () => ({
  useDynamicTypeResolver: () => ({ getType: mockGetType })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// eslint-disable-next-line import/first
import React, { type ReactElement } from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
// eslint-disable-next-line import/first
import { EmptyFilterSupportProvider } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/empty-filter-support'
// eslint-disable-next-line import/first
import { type IDynamicFilter } from '../dynamic-filter/provider/dynamic-filter-provider'
// eslint-disable-next-line import/first
import { FieldFilters } from './field-filters'

class ValueFilterType extends DynamicTypeFieldFilterAbstract {
  id = 'value'
  getFieldFilterComponent (): ReactElement { return <></> }
}

class EmptyOnlyFilterType extends DynamicTypeFieldFilterAbstract {
  id = 'empty-only'
  getFieldFilterComponent (): ReactElement { return <></> }
  isFilterAvailable (): boolean { return false }
  isEmptyFilterAvailable (): boolean { return true }
}

class NoEmptyFilterType extends ValueFilterType {
  isEmptyFilterAvailable (): boolean { return false }
}

const filter = (changes: Partial<IDynamicFilter> = {}): IDynamicFilter => ({
  id: 'sku',
  translationKey: 'sku',
  type: 'system.string',
  frontendType: 'input',
  data: 'abc',
  ...changes
})

const renderFilters = (data: IDynamicFilter[], supported: boolean, onChange = jest.fn()): jest.Mock => {
  render(
    <EmptyFilterSupportProvider supported={ supported }>
      <FieldFilters
        data={ data }
        onChange={ onChange }
      />
    </EmptyFilterSupportProvider>
  )

  return onChange
}

describe('FieldFilters operator', () => {
  beforeEach(() => {
    mockGetType.mockReset()
    mockGetType.mockReturnValue(new ValueFilterType())
  })

  it('only filters by value where the host does not support the operator', () => {
    renderFilters([filter()], false)

    expect(screen.queryByRole('combobox')).toBeNull()
    expect(screen.getByTestId('value-filter')).toBeTruthy()
  })

  it('offers the operator next to the value filter where the host supports it', () => {
    renderFilters([filter()], true)

    const select = screen.getByRole<HTMLSelectElement>('combobox', { name: 'grid.filter.operator.label' })

    expect(Array.from(select.options).map((option) => option.value)).toEqual(['value', 'empty', 'notEmpty'])
    expect(select.value).toBe('value')
    expect(screen.getByTestId('value-filter')).toBeTruthy()
  })

  it('hides the value filter and reports the operator once one is picked', () => {
    const onChange = renderFilters([filter()], true)

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'empty' } })

    expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ id: 'sku', operator: 'empty', data: 'abc' })])
  })

  it('shows the picked operator and no value filter for a filter that has one', () => {
    renderFilters([filter({ operator: 'notEmpty' })], true)

    expect(screen.getByRole<HTMLSelectElement>('combobox').value).toBe('notEmpty')
    expect(screen.queryByTestId('value-filter')).toBeNull()
  })

  it('goes back to filtering by value when the operator is removed', () => {
    const onChange = renderFilters([filter({ operator: 'empty' })], true)

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'value' } })

    expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ id: 'sku', operator: undefined })])
  })

  it('offers nothing but the operators for a field without a value filter', () => {
    mockGetType.mockReturnValue(new EmptyOnlyFilterType())

    renderFilters([filter({ type: 'dataobject.adapter', frontendType: 'image', operator: 'empty' })], true)

    const select = screen.getByRole<HTMLSelectElement>('combobox')

    expect(Array.from(select.options).map((option) => option.value)).toEqual(['empty', 'notEmpty'])
    expect(screen.queryByTestId('value-filter')).toBeNull()
  })

  it('does not offer the operator for a field that cannot be searched for no value', () => {
    mockGetType.mockReturnValue(new NoEmptyFilterType())

    renderFilters([filter()], true)

    expect(screen.queryByRole('combobox')).toBeNull()
    expect(screen.getByTestId('value-filter')).toBeTruthy()
  })

  it('does not offer the operator for a filter type it cannot resolve', () => {
    mockGetType.mockReturnValue(null)

    renderFilters([filter()], true)

    expect(screen.queryByRole('combobox')).toBeNull()
  })
})
