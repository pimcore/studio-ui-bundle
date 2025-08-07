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
const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState({
    birthDate: '1990-05-15',
    appointmentDate: '2024-12-25',
    eventDateTime: '2024-06-01 14:30:00',
    deadline: '2024-03-10',
    meetingTime: '09:30:00',
    lunchTime: '12:00:00',
    workStartTime: '08:15:00'
  })

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

  return (
    <div style={{ maxWidth: '700px', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <Form
            initialValues={formValues}
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Birth Date"
              name="birthDate"
            >
              <DatePicker 
                placeholder="Select birth date"
                outputType="dateString"
                outputFormat="YYYY-MM-DD"
              />
            </Form.Item>

            <Form.Item
              label="Appointment Date"
              name="appointmentDate"
            >
              <DatePicker 
                placeholder="Select appointment date"
                outputType="dateString"
                outputFormat="YYYY-MM-DD"
                allowClear
              />
            </Form.Item>

            <Form.Item
              label="Event Date & Time"
              name="eventDateTime"
            >
              <DatePicker 
                placeholder="Select event date and time"
                showTime
                outputType="dateString"
                outputFormat="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>

            <Form.Item
              label="Project Deadline"
              name="deadline"
            >
              <DatePicker 
                placeholder="Select deadline"
                outputType="dateString"
                outputFormat="YYYY-MM-DD"
                size="small"
              />
            </Form.Item>

            <Form.Item
              label="Meeting Time"
              name="meetingTime"
            >
              <DatePicker.TimePicker 
                placeholder="Select meeting time"
                outputType="dateString"
                outputFormat="HH:mm:ss"
              />
            </Form.Item>

            <Form.Item
              label="Lunch Time"
              name="lunchTime"
            >
              <DatePicker.TimePicker 
                placeholder="Select lunch time"
                outputType="dateString"
                outputFormat="HH:mm"
              />
            </Form.Item>

            <Form.Item
              label="Work Start Time"
              name="workStartTime"
            >
              <DatePicker.TimePicker 
                placeholder="Select work start time"
                outputType="dateString"
                outputFormat="HH:mm:ss"
                allowClear
                size="small"
              />
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Values</h4>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          }}>
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
