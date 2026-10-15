/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The SDK components are replaced by minimal stand-ins: the test only cares about the
// options the filter select receives.
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ options }: { options?: Array<{ value: string, label: string }> }) => (
    <span data-testid="filter-select">{(options ?? []).map((o) => `[${o.value}=${o.label}]`).join('')}</span>
  )
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/grid-cell/utils/select-options', () => ({
  renderSelectOptionLabel: (key: string) => ({ label: key })
}))

jest.mock('./dynamic-type-field-filter-text-component', () => ({
  DynamicTypeFieldFilterTextComponent: () => <span />
}))

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { DynamicFilterProvider } from '@Pimcore/components/dynamic-filter/provider/dynamic-filter-provider'
// eslint-disable-next-line import/first
import { DynamicTypeFieldFilterMultiselectComponent } from './dynamic-type-field-filter-multiselect-component'

const renderFilter = (fieldDefinition: Record<string, unknown>): void => {
  render(
    <DynamicFilterProvider
      config={ { fieldDefinition } }
      data={ [] }
      id="test"
      translationKey="test"
      type="test"
    >
      <DynamicTypeFieldFilterMultiselectComponent />
    </DynamicFilterProvider>
  )
}

const options = [{ key: 'Red', value: 'red' }, { key: 'Blue', value: 'blue' }]

describe('multiselect field filter', () => {
  it('offers an empty option for a select field', () => {
    renderFilter({ fieldtype: 'select', options })

    expect(screen.getByTestId('filter-select')).toHaveTextContent('[=empty][red=Red][blue=Blue]')
  })

  it('does not offer an empty option for other field types', () => {
    renderFilter({ fieldtype: 'multiselect', options })

    expect(screen.getByTestId('filter-select')).toHaveTextContent('[red=Red][blue=Blue]')
  })

  it('does not duplicate an empty option the select field already defines', () => {
    renderFilter({ fieldtype: 'select', options: [{ key: 'None', value: '' }, ...options] })

    expect(screen.getByTestId('filter-select')).toHaveTextContent('[=None][red=Red][blue=Blue]')
  })
})
