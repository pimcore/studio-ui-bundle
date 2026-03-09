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
import { FieldDefinitionDecimalSettings } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-decimal-settings/field-definition-decimal-settings'
import { Form, FormKit, Input, InputNumber, Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionNumberFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
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

      {!isCustomLayout && (
        <>
          <FormKit.Panel
            border
            theme="fieldset"
            title={ t('default-values-settings') }
            tooltip={ t('default-values-tooltip') }
          >
            <Form.Item
              label={ t('default-value') }
              name="defaultValue"
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label={ t('default-value-generator') }
              name="defaultValueGenerator"
            >
              <Input />
            </Form.Item>
          </FormKit.Panel>

          <FieldDefinitionDecimalSettings />

          <Form.Item name="integer">
            <Switch labelRight={ t('integer') } />
          </Form.Item>

          <Form.Item name="unsigned">
            <Switch labelRight={ t('unsigned') } />
          </Form.Item>

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

        </>
      )}

    </>
  )
}
