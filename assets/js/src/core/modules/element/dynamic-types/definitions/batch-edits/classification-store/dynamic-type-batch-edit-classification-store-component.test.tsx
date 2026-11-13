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
import { DynamicTypeBatchEditClassificationStoreComponent } from './dynamic-type-batch-edit-classification-store-component'

const mockTypes: Record<string, any> = {}

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({
    hasDynamicType: (id: string) => id in mockTypes,
    getDynamicType: (id: string) => mockTypes[id]
  })
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width', () => ({ useFieldWidth: () => 100 }))
jest.mock('../helpers/data-object/batch-edit-form-item', () => ({
  BatchEditFormItem: ({ component, name }: any) => <div data-name={ JSON.stringify(name) }>{component}</div>
}))

const batchEdit = (config: Record<string, unknown>): any => ({
  key: 'attributes',
  type: 'dataobject.classificationstore',
  frontendType: 'multiValue',
  locale: 'de',
  config: { keyId: 12, groupId: 3, ...config }
})

const multiValueDefinition = { fieldtype: 'multiValue', name: 'color', title: 'color_title', delegateDatatype: 'input', delegate: { maxLength: 5 }, variants: [{ name: 'Metric' }], multiValue: true, maximum: 2 }

describe('DynamicTypeBatchEditClassificationStoreComponent for a multiValue key', () => {
  const multiValueWidget = jest.fn(() => <span>multi-value-editor</span>)
  const inputWidget = jest.fn(() => <span>input-widget</span>)

  beforeEach(() => {
    multiValueWidget.mockClear()
    inputWidget.mockClear()
    mockTypes.multiValue = { getObjectDataComponent: multiValueWidget, supportsBatchAppendModes: false }
    mockTypes.input = { getObjectDataComponent: (props: any) => inputWidget() && <span data-props={ JSON.stringify(props) }>input-widget</span>, supportsBatchAppendModes: false }
  })

  it('renders the delegate type widget, not the MultiValueEditor, at the variant key address', () => {
    const { container, getByText } = render(
      <DynamicTypeBatchEditClassificationStoreComponent batchEdit={ batchEdit({ variant: 'Metric', fieldDefinition: multiValueDefinition }) } />
    )

    expect(getByText('input-widget')).toBeInTheDocument()
    expect(multiValueWidget).not.toHaveBeenCalled()
    expect(JSON.parse(container.querySelector('[data-name]')!.getAttribute('data-name')!)).toEqual(['attributes', '3', 'de', '12#Metric'])

    const props = JSON.parse(container.querySelector('[data-props]')!.getAttribute('data-props')!)

    expect(props).toMatchObject({ maxLength: 5, fieldtype: 'input', name: 'color' })
    expect(props).not.toHaveProperty('variants')
    expect(props).not.toHaveProperty('delegateDatatype')
  })

  it('addresses the bare key id for the default slot', () => {
    const { container } = render(
      <DynamicTypeBatchEditClassificationStoreComponent batchEdit={ batchEdit({ fieldDefinition: multiValueDefinition }) } />
    )

    expect(JSON.parse(container.querySelector('[data-name]')!.getAttribute('data-name')!)).toEqual(['attributes', '3', 'de', '12'])
  })
})
