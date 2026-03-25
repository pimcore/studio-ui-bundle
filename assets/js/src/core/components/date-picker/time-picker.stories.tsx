/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { type Meta, type StoryObj } from '@storybook/react'
import { Form } from '@Pimcore/components/form/form'
import { type DatePickerValueType, formatDatePickerDate } from '@Pimcore/components/date-picker/utils/date-picker-utils'
import { TimePicker, type TimePickerProps } from '@Pimcore/components/date-picker/time-picker'

/* eslint-disable react/jsx-key */
const config: Meta = {
  title: 'Components/Data Entry/TimePicker',
  component: TimePicker,
  parameters: {

  },
  tags: ['autodocs']
}

export default config

const ExampleForm = (props: TimePickerProps): React.JSX.Element => {
  const [date, setDate] = useState<any>(props.value)

  const handleDateChange = (value: any): void => {
    setDate(value)
  }

  return (
    <Form>
      <Form.Item>
        <TimePicker
          { ...props }
          onChange={ handleDateChange }
        />
      </Form.Item>
      <div>
        <strong>Selected Date:</strong>
        <pre>{date !== null && date !== undefined ? formatDatePickerDate(date as DatePickerValueType) : 'null'}</pre>
      </div>
    </Form>
  )
}

type Story = StoryObj<typeof TimePicker>
export const _default: Story = {
  args: {
  },
  render: (props: TimePickerProps) => <ExampleForm { ...props } />
}
