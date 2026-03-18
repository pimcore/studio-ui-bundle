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
import { Form, Input, Switch, Select, DatePicker } from '@sdk/components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionDateTimeFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const form = Form.useFormInstance()
  const isCustomLayout = props.context.area.includes('custom-layout')

  const useCurrentDate = Form.useWatch('useCurrentDate')
  const useRespectTimezone = Form.useWatch('respectTimezone')
  useEffect(() => {
    if (useCurrentDate === true) {
      form.setFieldValue('defaultValue', null)
    }
    if (useRespectTimezone === false) {
      form.setFieldValue('columnType', 'datetime')
    }
  }, [useCurrentDate, useRespectTimezone, form])

  if (isCustomLayout) {
    return <></>
  }

  return (
    <>

      <Form.Item
        label={ t('default-value') }
        name="defaultValue"
      >
        <DatePicker
          disabled={ useCurrentDate === true }
          outputFormat="YYYY-MM-DD HH:mm"
          showTime
        />
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

      <Form.Item name="respectTimezone">
        <Switch labelRight={ t('respect-timezone') } />
      </Form.Item>

      <Form.Item
        initialValue="datetime"
        label={ t('column-type') }
        name="columnType"
      >
        <Select
          disabled={ useRespectTimezone === false }
          options={ [
            { label: 'DATETIME', value: 'datetime' },
            { label: 'BIGINT', value: 'bigint(20)' }
          ] }
        />
      </Form.Item>
    </>
  )
}
