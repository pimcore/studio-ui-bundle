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
import { Button, DatePicker, Form, FormKit, Input, InputNumber } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionTimeFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const form = Form.useFormInstance()
  const isCustomLayout = props.context.area.includes('custom-layout')

  function resetMinMax (): void {
    form.setFieldValue('minValue', null, { triggerChange: true })
    form.setFieldValue('maxValue', null, { triggerChange: true })
    form.setFieldValue('increment', 15, { triggerChange: true })
  }

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
        <FormKit.Panel
          border
          theme="fieldset"
          title={ t('min-max-settings') }
        >

          <Form.Item
            label={ t('increment-step') }
            name="increment"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label={ t('min-value') }
            name="minValue"
          >
            <DatePicker.TimePicker
              outputFormat="HH:mm"
              outputType="dateString"
              showSecond={ false }
            />
          </Form.Item>

          <Form.Item
            label={ t('max-value') }
            name="maxValue"
          >
            <DatePicker.TimePicker
              outputFormat="HH:mm"
              outputType="dateString"
              showSecond={ false }
            />
          </Form.Item>

          <Button onClick={ () => {
            resetMinMax()
          } }
          >
            { t('reset') }
          </Button>

        </FormKit.Panel>
      )
      }
    </>
  )
}
