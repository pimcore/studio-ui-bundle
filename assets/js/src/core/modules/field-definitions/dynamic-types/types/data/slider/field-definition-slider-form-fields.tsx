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
import { Form, Input, InputNumber, Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionSliderFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')

  return (
    <>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('height') }
        name="height"
        tooltip={ t('height-tooltip') }
      >
        <Input />
      </Form.Item>

      {!isCustomLayout && (
      <>
        <Form.Item
          label={ t('min-value') }
          name="minValue"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label={ t('max-value') }
          name="maxValue"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label={ t('increment-step') }
          name="increment"
        >
          <InputNumber />
        </Form.Item>

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

        <Form.Item name="vertical">
          <Switch labelRight={ t('vertical') } />
        </Form.Item>
      </>
      )}
    </>
  )
}
