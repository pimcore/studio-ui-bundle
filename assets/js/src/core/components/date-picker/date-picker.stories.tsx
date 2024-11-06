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
import React, {useEffect, useState} from 'react'
import {type Meta, StoryObj} from '@storybook/react'
import {DatePicker, DatePickerProps} from "./date-picker";
import dayjs from "dayjs";
import {Form} from "@Pimcore/components/form/form";
import FormItem from "antd/es/form/FormItem";

/* eslint-disable react/jsx-key */
const config: Meta = {
  title: 'Components/Data Entry/DatePicker',
  component: DatePicker,
  parameters: {

  },
  tags: ['autodocs']
}

export default config

const ExampleForm = (props: DatePickerProps): React.JSX.Element => {
  const [date, setDate] = useState<any>(props.value)

  const handleDateChange = (value: any): void => {
    setDate(value)
  }

  return (
      <Form>
        <FormItem>
          <DatePicker
              {...props}
              onChange={handleDateChange}
          />
        </FormItem>
        <div>
            <strong>Selected Date:</strong>
            <pre>{date !== null && date !== undefined ? (dayjs.isDayjs(date) ? 'dayjs object: ' + date.toString() : date.toString()) : 'null'}</pre>
        </div>
      </Form>
  )
}

type Story = StoryObj<typeof DatePicker>;
export const _default: Story = {
  args: {
  },
  render: (props: DatePickerProps) => <ExampleForm {...props} />
}
