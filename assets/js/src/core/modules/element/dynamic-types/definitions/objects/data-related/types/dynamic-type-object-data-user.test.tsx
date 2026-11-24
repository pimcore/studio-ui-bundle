/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Form as AntForm } from 'antd'

jest.mock('../dynamic-type-object-data-abstract', () => ({
  DynamicTypeObjectDataAbstract: class DynamicTypeObjectDataAbstract {
    getObjectDataFormItemProps (): Record<string, unknown> {
      return { className: 'w-full' }
    }
  }
}))

// Stands in for the Select: like antd it matches the value to the options strictly and shows the raw value otherwise.
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ options, value }: { options?: Array<{ value: unknown, label: string }>, value?: unknown }) => (
    <span data-testid="select-value">
      { options?.find(option => option.value === value)?.label ?? String(value ?? '') }
    </span>
  )
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/dynamic-select-field/dynamic-select-field', () => ({
  DynamicSelectField: () => null
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/hooks/use-dynamic-select-options', () => ({
  useGridDynamicSelectOptions: () => undefined
}))

jest.mock('@Pimcore/app/i18n', () => ({ __esModule: true, default: { t: (key: string) => key } }))

jest.mock('@Pimcore/app/depency-injection', () => ({ container: { get: () => ({}) } }))

const { DynamicTypeObjectDataUser } = jest.requireActual('./dynamic-type-object-data-user')

// The layout options as core's user data type configures them: the user id as value, the name as key.
const userProps = {
  name: 'pimcoreUser',
  title: 'Pimcore User',
  defaultFieldWidth: { medium: 300 },
  options: [
    { key: 'admin (Ada Admin)', value: 2 },
    { key: 'editor', value: 5 }
  ]
}

const renderUserField = (storedValue: unknown): void => {
  const userType = new DynamicTypeObjectDataUser()

  render(
    <AntForm initialValues={ { pimcoreUser: storedValue } }>
      <AntForm.Item
        { ...userType.getObjectDataFormItemProps(userProps) }
        name="pimcoreUser"
      >
        { userType.getObjectDataComponent(userProps) }
      </AntForm.Item>
    </AntForm>
  )
}

/**
 * Regression test for platform-version#863: the editor showed the id of the linked Pimcore user instead
 * of the name, as the form holds the id as a number and the option values are strings.
 */
describe('DynamicTypeObjectDataUser in the edit form', () => {
  it('shows the user name for the stored numeric user id', () => {
    renderUserField(5)

    expect(screen.getByTestId('select-value')).toHaveTextContent('editor')
  })

  it('shows the user name for a user id stored as string', () => {
    renderUserField('2')

    expect(screen.getByTestId('select-value')).toHaveTextContent('admin (Ada Admin)')
  })

  it('shows an empty select without a linked user', () => {
    renderUserField(null)

    expect(screen.getByTestId('select-value')).toBeEmptyDOMElement()
  })
})
