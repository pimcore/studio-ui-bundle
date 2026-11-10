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
import { render } from '@testing-library/react'

const selectProps: Array<Record<string, any>> = []
const translate = jest.fn((key: string) => key)
let fetchedOptions: Array<{ label: string, value: string }> | undefined

jest.mock('@Pimcore/components/select/select', () => ({
  Select: (props: Record<string, any>) => {
    selectProps.push(props)
    return null
  }
}))

jest.mock('@Pimcore/app/i18n', () => ({ __esModule: true, default: { t: (key: string) => translate(key) } }))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 7 })
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({
  useEditFormContext: () => ({ getModifiedDataObjectAttributes: () => ({}) })
}))

jest.mock('../../hooks/use-dynamic-select-options', () => ({
  useDynamicSelectOptions: () => ({ options: fetchedOptions, isLoading: false, fetchOptions: jest.fn() })
}))

const { DynamicSelectField } = jest.requireActual('./dynamic-select-field')

const layoutOptions = Array.from({ length: 1000 }, (_, index) => ({ key: `option_${index}`, value: `v${index}` }))

const lastOptions = (): Array<{ label: unknown, value: string }> => selectProps[selectProps.length - 1].options

describe('DynamicSelectField', () => {
  beforeEach(() => {
    selectProps.length = 0
    translate.mockClear()
    fetchedOptions = undefined
  })

  it('seeds only the selected option from the layout options, not the whole provider list (#10468)', () => {
    render(<DynamicSelectField
      combinedFieldName="big1"
      defaultFieldWidth={ { medium: 300 } }
      options={ layoutOptions }
      value="v5"
           />)

    expect(lastOptions()).toEqual([{ label: 'option_5', value: 'v5' }])
    expect(translate).toHaveBeenCalledTimes(1)
  })

  it('seeds every selected option of a multiselect', () => {
    render(<DynamicSelectField
      combinedFieldName="big1"
      defaultFieldWidth={ { medium: 300 } }
      multiSelect
      options={ layoutOptions }
      value={ ['v2', 'v9'] }
           />)

    expect(lastOptions().map(option => option.value)).toEqual(['v2', 'v9'])
  })

  it('seeds nothing without a value', () => {
    render(<DynamicSelectField
      combinedFieldName="big1"
      defaultFieldWidth={ { medium: 300 } }
      options={ layoutOptions }
           />)

    expect(lastOptions()).toEqual([])
    expect(translate).not.toHaveBeenCalled()
  })

  it('uses the options fetched from the backend once the dropdown has been opened', () => {
    fetchedOptions = [{ label: 'fresh', value: 'v1' }, { label: 'fresh 2', value: 'v2' }]
    render(<DynamicSelectField
      combinedFieldName="big1"
      defaultFieldWidth={ { medium: 300 } }
      options={ layoutOptions }
      value="v5"
           />)

    expect(lastOptions()).toEqual(fetchedOptions)
  })
})
