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
import { Form, FormKit, Input, InputNumber, Select, Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionQuantityValueRangeFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { getSelectOptions } = useQuantityValueUnits()

  return (
    <>

      <FormKit.Panel
        border
        theme="fieldset"
        title={ t('width') }
        tooltip={ t('width-tooltip') }
      >

        <Form.Item
          label={ t('width-field') }
          name="width"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('width-unit') }
          name="unitWidth"
        >
          <Input />
        </Form.Item>
      </FormKit.Panel>

      <Form.Item
        label={ t('decimal-precision') }
        name="decimalPrecision"
        rules={ [{ min: 0, type: 'number' }] }
      >
        <InputNumber
          min={ 0 }
          precision={ 0 }
        />
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

      <Form.Item name="autoConvert">
        <Switch labelRight={ t('auto-convert') } />
      </Form.Item>
    </>
  )
}
