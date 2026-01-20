/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { useQuantityValueUnits } from '@Pimcore/modules/data-object/hooks/use-quantity-value-units'
import { Form, FormKit, Input, InputNumber, Select } from '@sdk/components'
import React from 'react'

export const FieldDefinitionInputQuantityValueFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const isCustomLayout = props.context.area.includes('custom-layout')
  const { getSelectOptions } = useQuantityValueUnits()

  return (
    <>
      <FormKit.Panel title="Specific Settings">
        {!isCustomLayout && (
          <>
            <Form.Item
              label="width"
              name="width"
              tooltip="width_tooltip"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="default_value"
              name="defaultValue"
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="default_unit"
              name="defaultUnit"
            >
              <Select
                allowClear
                options={ getSelectOptions() }
                showSearch
              />
            </Form.Item>

            <Form.Item
              label="valid_units"
              name="validUnits"
            >
              <Select
                mode="multiple"
                options={ getSelectOptions() }
                showSearch
              />
            </Form.Item>
          </>
        )}

      </FormKit.Panel>
    </>
  )
}
