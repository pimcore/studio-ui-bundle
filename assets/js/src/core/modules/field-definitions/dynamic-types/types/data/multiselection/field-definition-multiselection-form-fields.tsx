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
import { Form, Input, InputNumber, Switch, Select } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  FieldDefinitionDefaultValueGrid
} from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-default-value-grid/field-definition-default-value-grid'
import { FieldDefinitionOptionsSourceFields } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-options-source-fields/field-definition-options-source-fields'

export const FieldDefinitionMultiselectionFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
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
            label={ t('maximum-items') }
            name="maxItems"
          >
            <InputNumber
              min={ 0 }
              precision={ 0 }
            />
          </Form.Item>

          <Form.Item
            label={ t('multiselect-render-type') }
            name="renderType"
          >
            <Select
              options={ [
                { label: 'List', value: 'list' },
                { label: 'Tags', value: 'tags' }
              ] }
            />
          </Form.Item>

          <Form.Item
            label={ t('default-value-generator') }
            name="defaultValueGenerator"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="enforceValidation"
            tooltip={ t('enforce-validation-tooltip') }
          >
            <Switch labelRight={ t('enforce-validation') } />
          </Form.Item>

          <FieldDefinitionOptionsSourceFields
            renderAdditionalConfigureFields={ () => (
              <Form.Item
                label={ t('default-value') }
                name="defaultValue"
              >
                <FieldDefinitionDefaultValueGrid />
              </Form.Item>
            ) }
          />
        </>
      )}

    </>
  )
}
