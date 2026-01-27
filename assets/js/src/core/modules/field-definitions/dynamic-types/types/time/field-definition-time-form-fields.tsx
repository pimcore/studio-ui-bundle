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
import { Button, Form, FormKit, Input, InputNumber, TimePicker } from '@sdk/components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionTimeFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const form = Form.useFormInstance()
  const reset = form.getFieldInstance('reset')
  useEffect(() => {
    form.setFieldValue('minValue', null)
    form.setFieldValue('maxValue', null)
  }, [reset, form])

  function resetMinMax (): void {
    form.setFieldValue('minValue', null)
    form.setFieldValue('maxValue', null)
  }

  return (
    <FormKit.Panel title={ t('specific-settings') }>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={ 15 }
        label={ t('increment') }
        name="increment"
      >
        <InputNumber />
      </Form.Item>

      <FormKit.Panel
        border
        theme="fieldset"
        title={ t('min-max-settings') }
      >
        <Form.Item
          label={ t('min-value') }
          name="minValue"
        >
          <TimePicker />
        </Form.Item>

        <Form.Item
          label={ t('max-value') }
          name="maxValue"
        >
          <TimePicker />
        </Form.Item>

        <Button onClick={ () => {
          resetMinMax()
        } }
        >
          { t('reset') }
        </Button>

      </FormKit.Panel>

    </FormKit.Panel>
  )
}
