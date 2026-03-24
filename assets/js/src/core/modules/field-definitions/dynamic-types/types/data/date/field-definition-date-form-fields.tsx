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
import { Form, FormKit, Input, Switch, Select, DatePicker } from '@sdk/components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionDateFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const form = Form.useFormInstance()
  const useCurrentDate = Form.useWatch('useCurrentDate')
  const isCustomLayout = props.context.area.includes('custom-layout')
  const isEncryptedField = props.context.isEncryptedField === true

  useEffect(() => {
    if (useCurrentDate === true) {
      form.setFieldValue('defaultValue', null)
    }
  }, [useCurrentDate, form])

  if (isCustomLayout) {
    return <></>
  }

  return (
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
          <DatePicker disabled={ useCurrentDate === true } />
        </Form.Item>

        <Form.Item
          label={ t('default-value-generator') }
          name="defaultValueGenerator"
        >
          <Input />
        </Form.Item>

        <Form.Item name="useCurrentDate">
          <Switch labelRight={ t('use-current-date') } />
        </Form.Item>
      </FormKit.Panel>

      {!isEncryptedField && (
        <Form.Item
          label={ t('column-type') }
          name="columnType"
        >
          <Select
            options={ [
              { label: 'DATE', value: 'date' },
              { label: 'BIGINT', value: 'bigint(20)' }
            ] }
          />
        </Form.Item>
      )}
    </>
  )
}
