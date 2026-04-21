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
import { FieldDefinitionRegexValidation } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-regex-validation/field-definition-regex-validation'
import { Form, Input, Switch, InputNumber } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionInputFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')
  const isInClassificationStore = props.context.area.includes('classification-store')
  const isEncryptedField = props.context.isEncryptedField === true

  return (
    <>
      {!isCustomLayout && (
        <>
          <Form.Item
            label={ t('default-value') }
            name="defaultValue"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={ t('default-value-generator') }
            name="defaultValueGenerator"
          >
            <Input />
          </Form.Item>
        </>
      )}

      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      <Form.Item name="showCharCount">
        <Switch labelRight={ t('show-char-count') } />
      </Form.Item>

      {(!isCustomLayout && !isInClassificationStore) && (
      <>
          {!isEncryptedField && (
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
        <FieldDefinitionRegexValidation />
      </>
      )}

    </>
  )
}
