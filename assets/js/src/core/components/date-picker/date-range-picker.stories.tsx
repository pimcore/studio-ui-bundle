/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useState } from 'react'
import { type Meta, type StoryObj } from '@storybook/react'
import { Form } from '@Pimcore/components/form/form'
import { DateRangePicker, type DateRangePickerProps } from '@Pimcore/components/date-picker/date-range-picker'
import { type DatePickerValueType, formatDatePickerDate } from '@Pimcore/components/date-picker/utils/date-picker-utils'

/* eslint-disable react/jsx-key */
const config: Meta = {
  title: 'Components/Data Entry/DateRangePicker',
  component: DateRangePicker,
  parameters: {

  },
  tags: ['autodocs']
}

export default config

const ExampleForm = (props: DateRangePickerProps): React.JSX.Element => {
  const [dates, setDates] = useState<any>(props.value)

  const handleDateChange = (value: any): void => {
    setDates(value)
  }

  return (
    <Form>
      <Form.Item>
        <DateRangePicker
          { ...props }
          onChange={ handleDateChange }
        />
      </Form.Item>
      <div>
        <strong>Selected Dates:</strong>
        <pre>{dates !== null && dates !== undefined
          ? (
            <>
              <div>
                <strong>Start: </strong> {formatDatePickerDate(dates[0] as DatePickerValueType)}
              </div>
              <div>
                <strong>End: </strong> {formatDatePickerDate(dates[1] as DatePickerValueType)}
              </div>
            </>
            )
          : 'null'
        }</pre>
      </div>
    </Form>
  )
}

type Story = StoryObj<typeof DateRangePicker>
export const _default: Story = {
  args: {
  },
  render: (props: DateRangePickerProps) => <ExampleForm { ...props } />
}
