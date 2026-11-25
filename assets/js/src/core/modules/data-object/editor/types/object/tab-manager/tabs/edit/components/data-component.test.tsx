/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { act, render } from '@testing-library/react'
import { type FormInstance } from 'antd'
import { type NamePath } from 'antd/es/form/interface'
import { isArray, isNil } from 'lodash'
import { DataComponent, type DataComponentProps } from './data-component'
import { NumberedList } from '@Pimcore/components/form/controls/numbered-list/numbered-list'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import { useNumberedListSelector } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list-value'
import { type NumberedListData } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/numbered-list-provider'
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
import { Group } from '@Pimcore/components/form/group/group'
import { useFormGroupOptional } from '@Pimcore/components/form/group/provider/use-form-group-optional'

const mockForm = {
  getFieldValue: jest.fn(),
  setFieldValue: jest.fn()
}

// the form barrel transitively imports antd-style (untranspiled ESM) — only
// Form.Group and Form.useFormInstance are needed here
jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Group: jest.requireActual('@Pimcore/components/form/group/group').Group,
    useFormInstance: () => mockForm
  }
}))

// mirrors DynamicTypeObjectDataAbstractNumeric.handleDefaultValue: seed the configured
// default only when the field is empty
const handleDefaultValue = (props: any, form: FormInstance, fieldName: NamePath): void => {
  const currentValue = form.getFieldValue(fieldName)
  if (isNil(currentValue) || currentValue === '') {
    form.setFieldValue(fieldName, props.defaultValue)
  }
}

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({
    hasDynamicType: () => true,
    getDynamicType: () => ({ isCollectionType: false, handleDefaultValue })
  })
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { 'DynamicTypes/ObjectDataRegistry': 'DynamicTypes/ObjectDataRegistry' }
}))

jest.mock('@Pimcore/modules/app/error-boundary/error-boundary', () => ({
  __esModule: true,
  default: ({ children }: any) => children
}))

jest.mock('../providers/form-list-provider/use-form-list', () => ({
  useFormList: () => undefined
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state', () => ({
  useInheritanceState: () => undefined
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({
  useEditFormContext: () => ({ disabled: false })
}))

jest.mock('@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/use-localized-fields', () => ({
  useLocalizedFields: () => undefined
}))

jest.mock('../../../../../../../../element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width', () => ({
  useFieldWidth: () => ({})
}))

jest.mock('../providers/combined-field-name-provider/use-combined-field-name', () => ({
  useCombinedFieldName: () => undefined
}))

// mimics NumberedFormItemControl: the field registers its initial value (null) in the
// list state on mount and renders what the list state holds
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component/form-item', () => ({
  __esModule: true,
  default: ({ _props }: any) => {
    const { operations } = useNumberedList()
    const groupName = useFormGroupOptional()?.name
    const fieldName = [...(isArray(groupName) ? groupName : [groupName]), ..._props.name]

    useEffect(() => {
      if (operations.getValue(fieldName) === undefined) {
        operations.update(fieldName, null, true)
      }
    }, [])

    return null
  }
}))

let operations: NumberedListData['operations']

// mimics FieldCollectionContent / FieldCollectionItem: one Form.Group per entry, scoped to its data
const FieldCollectionItems = ({ field }: { field: DataComponentProps }): React.JSX.Element => {
  operations = useNumberedList().operations
  const count = useNumberedListSelector((values: any[]) => values?.length ?? 0)

  return (
    <>
      {Array.from({ length: count }).map((_value, index) => (
        <Group
          key={ index }
          name={ [index, 'data'] }
        >
          <DataComponent { ...field } />
        </Group>
      ))}
    </>
  )
}

const renderFieldCollection = (value: any[], onChange: jest.Mock, field: DataComponentProps): void => {
  render(
    <ItemProvider item={ { name: 'content' } }>
      <NumberedList
        onChange={ onChange }
        value={ value }
      >
        <FieldCollectionItems field={ field } />
      </NumberedList>
    </ItemProvider>
  )
}

// the onChange effect of NumberedList is debounced by 10ms — flush it deterministically
const flushDebounce = (): void => { act(() => { jest.advanceTimersByTime(20) }) }

const limitField = { name: 'limit', datatype: 'data', fieldtype: 'numeric', defaultValue: 20 } as unknown as DataComponentProps

describe('DataComponent default values inside a NumberedList (field collections, blocks)', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockForm.getFieldValue.mockReset()
    mockForm.setFieldValue.mockReset()
  })
  afterEach(() => { jest.useRealTimers() })

  it('prefills the default value of a field in a newly added item', () => {
    const onChange = jest.fn()
    renderFieldCollection([], onChange, limitField)
    // what FieldCollectionAddButton does
    act(() => { operations.add({ type: 'OfferList' }) })
    flushDebounce()

    expect(onChange).toHaveBeenLastCalledWith([{ type: 'OfferList', data: { limit: 20 } }])
    expect(mockForm.setFieldValue).not.toHaveBeenCalled()
  })

  it('keeps an existing value instead of overwriting it with the default', () => {
    const onChange = jest.fn()
    renderFieldCollection([{ type: 'OfferList', data: { limit: 5 } }], onChange, limitField)
    flushDebounce()

    expect(onChange).not.toHaveBeenCalled()
    expect(mockForm.setFieldValue).not.toHaveBeenCalled()
  })
})
