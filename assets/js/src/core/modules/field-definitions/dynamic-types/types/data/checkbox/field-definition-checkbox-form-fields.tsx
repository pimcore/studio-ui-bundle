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
import { Form, Select, Input } from '@sdk/components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionCheckboxFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')
  const form = Form.useFormInstance()
  const useDefaultValue = Form.useWatch('defaultValue')

  useEffect(() => {
    if (useDefaultValue === null) {
      form.setFieldValue('defaultValue', 'empty')
    }
  }, [useDefaultValue, form])

  return (
    <>
      {!isCustomLayout && (
        <>
          <Form.Item
            label={ t('default-value') }
            name="defaultValue"
          >
            <Select
              options={ [
                { label: t('null'), value: 'empty' },
                { label: t('false'), value: 0 },
                { label: t('true'), value: 1 }
              ] }
            />
          </Form.Item>

          <Form.Item
            label={ t('default-value-generator') }
            name="defaultValueGenerator"
          >
            <Input />
          </Form.Item>
        </>
      )}
    </>
  )
}
