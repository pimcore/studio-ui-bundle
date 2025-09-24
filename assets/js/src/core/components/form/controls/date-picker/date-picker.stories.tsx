/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import React, { useState } from 'react'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Basic/DatePicker',
  component: DatePicker
}

export default config

// Form example
interface FormValues {
  birthDate: string
  appointmentDate: string
  eventDateTime: string
  deadline: string
  meetingTime: string
  lunchTime: string
  workStartTime: string
}

const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>({
    birthDate: '1990-05-15',
    appointmentDate: '2024-12-25',
    eventDateTime: '2024-06-01 14:30:00',
    deadline: '2024-03-10',
    meetingTime: '09:30:00',
    lunchTime: '12:00:00',
    workStartTime: '08:15:00'
  })

  const onValuesChange = (changedValues: Partial<FormValues>, allValues: FormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '700px', padding: '20px' } }>
      <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } }>
        <div>
          <Form
            initialValues={ formValues }
            layout="vertical"
            onValuesChange={ onValuesChange }
          >
            <Form.Item
              label="Birth Date"
              name="birthDate"
            >
              <DatePicker
                outputFormat="YYYY-MM-DD"
                outputType="dateString"
                placeholder="Select birth date"
              />
            </Form.Item>

            <Form.Item
              label="Appointment Date"
              name="appointmentDate"
            >
              <DatePicker
                allowClear
                outputFormat="YYYY-MM-DD"
                outputType="dateString"
                placeholder="Select appointment date"
              />
            </Form.Item>

            <Form.Item
              label="Event Date & Time"
              name="eventDateTime"
            >
              <DatePicker
                outputFormat="YYYY-MM-DD HH:mm:ss"
                outputType="dateString"
                placeholder="Select event date and time"
                showTime
              />
            </Form.Item>

            <Form.Item
              label="Project Deadline"
              name="deadline"
            >
              <DatePicker
                outputFormat="YYYY-MM-DD"
                outputType="dateString"
                placeholder="Select deadline"
                size="small"
              />
            </Form.Item>

            <Form.Item
              label="Meeting Time"
              name="meetingTime"
            >
              <DatePicker.TimePicker
                outputFormat="HH:mm:ss"
                outputType="dateString"
                placeholder="Select meeting time"
              />
            </Form.Item>

            <Form.Item
              label="Lunch Time"
              name="lunchTime"
            >
              <DatePicker.TimePicker
                outputFormat="HH:mm"
                outputType="dateString"
                placeholder="Select lunch time"
              />
            </Form.Item>

            <Form.Item
              label="Work Start Time"
              name="workStartTime"
            >
              <DatePicker.TimePicker
                allowClear
                outputFormat="HH:mm:ss"
                outputType="dateString"
                placeholder="Select work start time"
                size="small"
              />
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Values</h4>
          <div style={ {
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          } }
          >
            {JSON.stringify(formValues, null, 2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export const FormExample = {
  render: () => <FormExampleComponent />
}
