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
import { useTranslation } from 'react-i18next'
import { type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { Form, FormKit, Input, InputNumber, Select, Switch } from '@sdk/components'
import { FieldDefinitionOptionsSourceFields } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-options-source-fields/field-definition-options-source-fields'
import { type SelectOption } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-select-options-grid/field-definition-select-options-grid'

const ConfigureDefaultValueField = (): React.JSX.Element => {
  const { t } = useTranslation()
  const configuredOptions = Form.useWatch<SelectOption[] | undefined>('options')
  const defaultValueOptions = (configuredOptions ?? []).map(opt => ({
    label: opt.key,
    value: opt.value
  }))

  return (
    <Form.Item
      label={ t('default-value') }
      name="defaultValue"
    >
      <Select
        allowClear
        options={ defaultValueOptions }
      />
    </Form.Item>
  )
}

export const FieldDefinitionSelectFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')
  const isInClassificationStore = props.context.area.includes('classification-store')

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
          {!isInClassificationStore && (
            <Form.Item
              label={ t('column-length') }
              name="columnLength"
              rules={ [{ min: 0, type: 'number' }] }
            >
              <InputNumber
                min={ 0 }
                precision={ 0 }
              />
            </Form.Item>
          )}

          <FormKit.Panel
            border
            theme="fieldset"
            title={ t('default-values-settings') }
          >
            <Form.Conditional
              condition={ (values) => values.optionsProviderType === 'select_options' || values.optionsProviderType === 'class' }
              watchFields={ ['optionsProviderType'] }
            >
              <Form.Item
                label={ t('default-value') }
                name="defaultValue"
              >
                <Input />
              </Form.Item>
            </Form.Conditional>

            <Form.Item
              label={ t('default-value-generator') }
              name="defaultValueGenerator"
            >
              <Input />
            </Form.Item>
          </FormKit.Panel>

          <Form.Item
            name="enforceValidation"
            tooltip={ t('enforce-validation-tooltip') }
          >
            <Switch labelRight={ t('enforce-validation') } />
          </Form.Item>

          <FieldDefinitionOptionsSourceFields
            renderAdditionalConfigureFields={ () => <ConfigureDefaultValueField /> }
          />
        </>
      )}
    </>
  )
}
