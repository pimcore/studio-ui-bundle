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
import { DateRangePicker } from '@Pimcore/components/date-picker/date-range-picker'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Basic/DateRangePicker',
  component: DateRangePicker
}

export default config

// Form example
const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState({
    projectDuration: ['2024-01-15', '2024-06-30'],
    vacationPeriod: ['2024-07-01', '2024-07-14'],
    eventPeriod: ['2024-03-10 09:00:00', '2024-03-12 17:00:00'],
    campaignDuration: ['2024-05-01', '2024-05-31'],
    reportingPeriod: null
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
              label="Project Duration"
              name="projectDuration"
              rules={[
                { required: true, message: 'Please select project duration!' }
              ]}
            >
              <DateRangePicker 
                placeholder={['Start date', 'End date']}
                outputType="dateString"
                outputFormat="YYYY-MM-DD"
              />
            </Form.Item>

            <Form.Item
              label="Vacation Period"
              name="vacationPeriod"
            >
              <DateRangePicker 
                placeholder={['Vacation start', 'Vacation end']}
                outputType="dateString"
                outputFormat="YYYY-MM-DD"
                allowClear
              />
            </Form.Item>

            <Form.Item
              label="Event Period (with time)"
              name="eventPeriod"
            >
              <DateRangePicker 
                placeholder={['Event start', 'Event end']}
                showTime
                outputType="dateString"
                outputFormat="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>

            <Form.Item
              label="Campaign Duration (Small)"
              name="campaignDuration"
            >
              <DateRangePicker 
                placeholder={['Campaign start', 'Campaign end']}
                outputType="dateString"
                outputFormat="YYYY-MM-DD"
                size="small"
              />
            </Form.Item>

            <Form.Item
              label="Reporting Period (Large)"
              name="reportingPeriod"
            >
              <DateRangePicker 
                placeholder={['Report start', 'Report end']}
                outputType="dateString"
                outputFormat="YYYY-MM-DD"
                size="large"
                allowClear
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
