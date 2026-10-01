/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The SDK components are replaced by minimal stand-ins: antd-style and the SDK
// barrel they pull in are untranspiled ESM, and the test only cares about the
// value the setting select receives.
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ value, options }: { value?: string, options?: Array<{ value: string }> }) => (
    <span data-testid="setting-select">{`${value ?? 'unset'}:${(options ?? []).length}`}</span>
  )
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/input-number/input-number', () => ({
  InputNumber: () => <span />
}))

jest.mock('@Pimcore/components/date-picker/date-picker', () => ({ DatePicker: () => <span /> }))
jest.mock('@Pimcore/components/date-picker/date-range-picker', () => ({ DateRangePicker: () => <span /> }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-date', () => ({
  isFieldRespectTimezone: () => true
}))

jest.mock('i18next', () => ({ t: (key: string) => key }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { DynamicFilterProvider } from '@Pimcore/components/dynamic-filter/provider/dynamic-filter-provider'
// eslint-disable-next-line import/first
import { DatePickerSettingValue, NumberFilterSettingValue } from '../utils/filter-setting-values'
// eslint-disable-next-line import/first
import { DynamicTypeFieldFilterNumberComponent } from './dynamic-type-field-filter-number-component'
// eslint-disable-next-line import/first
import { DynamicTypeFieldFilterDateComponent } from './dynamic-type-field-filter-date-component'

const renderFilter = (data: unknown, children: React.ReactNode): void => {
  render(
    <DynamicFilterProvider
      data={ data }
      id="test"
      translationKey="test"
      type="test"
    >
      {children}
    </DynamicFilterProvider>
  )
}

describe('field filter setting select', () => {
  it('shows the stored setting of a number filter, not the first option', () => {
    renderFilter(
      { setting: NumberFilterSettingValue.BETWEEN, is: null, from: 2, to: 3 },
      <DynamicTypeFieldFilterNumberComponent />
    )

    expect(screen.getByTestId('setting-select')).toHaveTextContent(`${NumberFilterSettingValue.BETWEEN}:4`)
  })

  it('shows the stored setting of a date filter, not the first option', () => {
    renderFilter(
      { setting: DatePickerSettingValue.BETWEEN, on: null, from: '2026-03-15T00:00:00Z', to: '2026-05-01T00:00:00Z' },
      <DynamicTypeFieldFilterDateComponent />
    )

    expect(screen.getByTestId('setting-select')).toHaveTextContent(`${DatePickerSettingValue.BETWEEN}:4`)
  })

  it('falls back to the first setting when the filter has no value yet', () => {
    renderFilter(undefined, <DynamicTypeFieldFilterNumberComponent />)

    expect(screen.getByTestId('setting-select')).toHaveTextContent(`${NumberFilterSettingValue.IS}:4`)
  })
})
