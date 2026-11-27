/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockGetDynamicType = jest.fn()

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({ getDynamicType: mockGetDynamicType })
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width', () => ({
  useFieldWidth: () => undefined
}))

// The layout components pull in untranspiled antd-style ESM
jest.mock('@Pimcore/components/space/space', () => ({
  Space: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/text/text', () => ({
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { VersionObjectLocalizedFields } from './version-object-localized-fields'

describe('VersionObjectLocalizedFields', () => {
  const nameField = { datatype: 'data', fieldtype: 'input', name: 'name', title: 'Name' }
  const priceField = { datatype: 'data', fieldtype: 'numeric', name: 'price', title: 'Price' }

  const renderFields = (children: any[], value: any): void => {
    render(
      <VersionObjectLocalizedFields
        { ...({ name: 'localizedfields', fieldtype: 'localizedfields', datatype: 'data', title: 'Localized fields', children, value } as any) }
      />
    )
  }

  beforeEach(() => {
    mockGetDynamicType.mockReset()
    mockGetDynamicType.mockImplementation((id: string) => ({
      getVersionObjectDataComponent: ({ name, title, value }: { name: string, title: string, value: unknown }) => (
        <span data-testid={ `${name}-${title}` }>{`${id}:${String(value)}`}</span>
      )
    }))
  })

  it('renders data fields nested in layouts without resolving the layouts as data types', () => {
    const children = [
      nameField,
      {
        datatype: 'layout',
        fieldtype: 'tabpanel',
        name: 'tabs',
        title: '',
        children: [{ datatype: 'layout', fieldtype: 'panel', name: 'pricing', title: 'Pricing', children: [priceField] }]
      }
    ]

    renderFields(children, { name: { en: 'Hello' }, price: { en: 10, de: 12 } })

    expect(screen.getByTestId('name-en')).toHaveTextContent('input:Hello')
    expect(screen.getByTestId('price-en')).toHaveTextContent('numeric:10')
    expect(screen.getByTestId('price-de')).toHaveTextContent('numeric:12')
    expect(mockGetDynamicType.mock.calls.map(([id]) => id)).toEqual(['input', 'numeric'])
  })

  it('skips a field that has no value in the version instead of throwing', () => {
    renderFields([nameField, priceField], { name: { en: 'Hello' } })

    expect(screen.getByTestId('name-en')).toHaveTextContent('input:Hello')
    expect(screen.queryByTestId('price-en')).not.toBeInTheDocument()
  })
})
