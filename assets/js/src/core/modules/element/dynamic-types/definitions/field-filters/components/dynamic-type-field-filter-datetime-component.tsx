/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
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
    dateValue: [number | null, number | null]
  }

  const initialFormValues: FormValues = {
    setting: DatePickerSettingValue.ON,
    dateValue: [null, null]
  }

  const [form] = Form.useForm<FormValues>()

  const { data, setData } = useDynamicFilter()
  const datePickerSettigVal = Form.useWatch('setting', form) as FormValues['setting']

  const SETTING_OPTIONS = [
    { label: t('grid.filter.datetime.on'), value: DatePickerSettingValue.ON },
    { label: t('grid.filter.datetime.between'), value: DatePickerSettingValue.BETWEEN },
    { label: t('grid.filter.datetime.before'), value: DatePickerSettingValue.BEFORE },
    { label: t('grid.filter.datetime.after'), value: DatePickerSettingValue.AFTER }
  ]

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Form
        form={ form }
        initialValues={ initialFormValues }
        layout="vertical"
        onValuesChange={ (_, allValues) => {
          const safeDateValue = Array.isArray(allValues.dateValue)
            ? allValues.dateValue.map((v) => (typeof v === 'number' ? v : null))
            : [null, null]

          const prevData = data ?? { dateValue: [null, null], setting: DatePickerSettingValue.ON }

          setData({
            dateValue: [
              safeDateValue[0] ?? prevData.dateValue?.[0] ?? null,
              safeDateValue[1] ?? prevData.dateValue?.[1] ?? null
            ],
            setting: allValues.setting ?? prevData.setting
          })
        } }
      >
        <Form.Item
          name="setting"
        >
          <Select
            options={ SETTING_OPTIONS }
            width={ 90 }
          />
        </Form.Item>

        {(datePickerSettigVal === DatePickerSettingValue.ON || datePickerSettigVal === DatePickerSettingValue.AFTER) && (
          <Form.Item
            name={ ['dateValue', 0] }
          >
            <DatePicker
              format={ DATE_FORMAT }
              outputType="timestamp"
              showTime
            />
          </Form.Item>
        )}

        {datePickerSettigVal === DatePickerSettingValue.BEFORE && (
        <Form.Item
          name={ ['dateValue', 1] }
        >
          <DatePicker
            format={ DATE_FORMAT }
            outputType="timestamp"
            showTime
          />
        </Form.Item >
        )}

        {datePickerSettigVal === DatePickerSettingValue.BETWEEN && (
          <Form.Item
            name="dateValue"
          >
            <DateRangePicker
              allowEmpty={ [true, true] }
              format={ DATE_FORMAT }
              outputType="timestamp"
              showTime
            />
          </Form.Item>
        )}
      </Form>
    </Flex>
  )
}
