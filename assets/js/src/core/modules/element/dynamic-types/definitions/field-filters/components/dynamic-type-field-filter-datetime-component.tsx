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
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { DateRangePicker } from '@Pimcore/components/date-picker/date-range-picker'
import { Form } from '@Pimcore/components/form/form'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { t } from 'i18next'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'

enum DatePickerSettingValue {
  ON = 'on',
  BETWEEN = 'between',
  BEFORE = 'before',
  AFTER = 'after'
}

const DATE_FORMAT = 'YYYY-MM-DD'

export interface DynamicTypeFieldFilterDatetimeProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterDatetimeComponent = (props: DynamicTypeFieldFilterDatetimeProps): React.JSX.Element => {
  interface FormValues {
    setting: DatePickerSettingValue
    from: number | null
    to: number | null
    on: number | null
  }

  const initialFormValues: FormValues = {
    setting: DatePickerSettingValue.ON,
    from: null,
    to: null,
    on: null
  }

  const [form] = Form.useForm<FormValues>()

  const { data, setData } = useDynamicFilter()
  const datePickerSettigVal = Form.useWatch('setting', form) as FormValues['setting']

  console.log('data', data)

  const SETTING_OPTIONS = [
    { label: t('grid.filter.datetime.on'), value: DatePickerSettingValue.ON },
    { label: t('grid.filter.datetime.between'), value: DatePickerSettingValue.BETWEEN },
    { label: t('grid.filter.datetime.before'), value: DatePickerSettingValue.BEFORE },
    { label: t('grid.filter.datetime.after'), value: DatePickerSettingValue.AFTER }
  ]

  const datePickerFormItemName = (): string | undefined => {
    if (datePickerSettigVal === DatePickerSettingValue.ON) {
      return 'on'
    } else if (datePickerSettigVal === DatePickerSettingValue.BEFORE) {
      return 'to'
    } else if (datePickerSettigVal === DatePickerSettingValue.AFTER) {
      return 'from'
    }

    return undefined
  }

  console.log('datName', datePickerFormItemName())

  const handleDatePickerValuesChange = (
    changedValues: any,
    allValues: any
  ): void => {
    const prevData = data ?? { from: null, to: null, on: null, setting: DatePickerSettingValue.ON }
    const newSetting = changedValues.setting as DatePickerSettingValue

    const isRangeSetting = [DatePickerSettingValue.BEFORE, DatePickerSettingValue.AFTER, DatePickerSettingValue.BETWEEN].includes(newSetting)
    const isOnSetting = newSetting === DatePickerSettingValue.ON

    if (isRangeSetting) {
      const shouldUseOnAsFrom = [DatePickerSettingValue.AFTER, DatePickerSettingValue.BETWEEN].includes(newSetting)
      const shouldUseOnAsTo = newSetting === DatePickerSettingValue.BEFORE

      const newFrom = prevData.from ?? (shouldUseOnAsFrom ? prevData.on : null) ?? null
      const newTo = prevData.to ?? (shouldUseOnAsTo ? prevData.on : null) ?? null

      setData({
        setting: newSetting,
        from: newFrom,
        to: newTo,
        on: null
      })
    } else if (isOnSetting) {
      const newOn = prevData.from ?? prevData.to ?? null

      setData({
        setting: newSetting,
        from: null,
        to: null,
        on: newOn
      })
    } else {
      setData({
        setting: allValues.setting ?? prevData.setting,
        from: allValues.from ?? prevData.from,
        to: allValues.to ?? prevData.to,
        on: allValues.on ?? prevData.on
      })
    }
  }

  return (
    <Form
      form={ form }
      initialValues={ initialFormValues }
      onValuesChange={ (changedValues, allValues) => { handleDatePickerValuesChange(changedValues, allValues) } }
    >
      <Flex
        align="center"
        gap="extra-small"
      >
        <Form.Item
          name="setting"
          style={ { flex: 1, margin: 0 } }
        >
          <Select
            options={ SETTING_OPTIONS }
          />
        </Form.Item>

        {datePickerSettigVal === DatePickerSettingValue.BETWEEN && (
        <Form.Item
          noStyle
          shouldUpdate
        >
          {({ getFieldValue, setFieldsValue }) => {
            const from = getFieldValue('from')
            const to = getFieldValue('to')

            return (
              <DateRangePicker
                allowEmpty={ [true, true] }
                format={ DATE_FORMAT }
                onChange={ ([newFrom, newTo]) => {
                  setFieldsValue({ from: newFrom ?? null, to: newTo ?? null })
                } }
                outputType="timestamp"
                showTime
                value={ [from, to] }
              />
            )
          }}
        </Form.Item>
        )}

        {datePickerSettigVal !== DatePickerSettingValue.BETWEEN && (
        <Form.Item
          name={ datePickerFormItemName() }
          style={ { flex: 3, margin: 0 } }
        >
          <DatePicker
            format={ DATE_FORMAT }
            outputType="timestamp"
            showTime
          />
        </Form.Item >
        )}
      </Flex>
    </Form>
  )
}
