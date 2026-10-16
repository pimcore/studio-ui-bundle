/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The SDK barrel and the text component pull in untranspiled ESM; the test only cares which
// editor the string filter picks.
jest.mock('@sdk/components', () => ({
  TextArea: () => <textarea data-testid="list-editor" />
}))

jest.mock('./dynamic-type-field-filter-text-component', () => ({
  DynamicTypeFieldFilterTextComponent: () => <input data-testid="single-line-editor" />
}))

jest.mock('i18next', () => ({ t: (key: string) => key }))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { DynamicFilterProvider } from '@Pimcore/components/dynamic-filter/provider/dynamic-filter-provider'
// eslint-disable-next-line import/first
import { MultiValueFilterSupportProvider } from '../utils/multi-value-filter-support'
// eslint-disable-next-line import/first
import { DynamicTypeFieldFilterStringComponent } from './dynamic-type-field-filter-string-component'

const renderFilter = (children: React.ReactNode): void => {
  render(
    <DynamicFilterProvider
      data=""
      id="test"
      translationKey="test"
      type="test"
    >
      {children}
    </DynamicFilterProvider>
  )
}

describe('DynamicTypeFieldFilterStringComponent', () => {
  it('keeps the single-line input where the host does not support lists', () => {
    renderFilter(<DynamicTypeFieldFilterStringComponent />)

    expect(screen.getByTestId('single-line-editor')).toBeTruthy()
    expect(screen.queryByTestId('list-editor')).toBeNull()
  })

  it('offers the list editor where the host supports lists', () => {
    renderFilter(
      <MultiValueFilterSupportProvider supported>
        <DynamicTypeFieldFilterStringComponent />
      </MultiValueFilterSupportProvider>
    )

    expect(screen.getByTestId('list-editor')).toBeTruthy()
    expect(screen.queryByTestId('single-line-editor')).toBeNull()
  })

  it('keeps the single-line input where a nested host opts out again', () => {
    renderFilter(
      <MultiValueFilterSupportProvider supported>
        <MultiValueFilterSupportProvider supported={ false }>
          <DynamicTypeFieldFilterStringComponent />
        </MultiValueFilterSupportProvider>
      </MultiValueFilterSupportProvider>
    )

    expect(screen.getByTestId('single-line-editor')).toBeTruthy()
    expect(screen.queryByTestId('list-editor')).toBeNull()
  })
})
