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
import { Form, Input, InputNumber, Select } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionInputQuantityValueFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')
  const { getSelectOptions } = useQuantityValueUnits()

  return (
    <>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      {!isCustomLayout && (
      <>
        <Form.Item
          label={ t('default-value') }
          name="defaultValue"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label={ t('default-unit') }
          name="defaultUnit"
        >
          <Select
            allowClear
            options={ getSelectOptions() }
            showSearch
          />
        </Form.Item>

        <Form.Item
          label={ t('valid-units') }
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

    </>
  )
}
