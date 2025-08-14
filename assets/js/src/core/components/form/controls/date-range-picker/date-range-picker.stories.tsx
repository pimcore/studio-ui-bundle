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
interface FormValues {
  projectDuration: string[]
  vacationPeriod: string[]
  eventPeriod: string[]
  campaignDuration: string[]
  reportingPeriod: null
}

const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>({
    projectDuration: ['2024-01-01', '2024-03-31'],
    vacationPeriod: ['2024-07-01', '2024-07-15'],
    eventPeriod: ['2024-09-10', '2024-09-12'],
    campaignDuration: ['2024-05-01', '2024-05-31'],
    reportingPeriod: null
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
              label="Project Duration"
              name="projectDuration"
              rules={ [
                { required: true, message: 'Please select project duration!' }
              ] }
            >
              <DateRangePicker
                outputFormat="YYYY-MM-DD"
                outputType="dateString"
                placeholder={ ['Start date', 'End date'] }
              />
            </Form.Item>

            <Form.Item
              label="Vacation Period"
              name="vacationPeriod"
            >
              <DateRangePicker
                allowClear
                outputFormat="YYYY-MM-DD"
                outputType="dateString"
                placeholder={ ['Vacation start', 'Vacation end'] }
              />
            </Form.Item>

            <Form.Item
              label="Event Period (with time)"
              name="eventPeriod"
            >
              <DateRangePicker
                outputFormat="YYYY-MM-DD HH:mm:ss"
                outputType="dateString"
                placeholder={ ['Event start', 'Event end'] }
                showTime
              />
            </Form.Item>

            <Form.Item
              label="Campaign Duration (Small)"
              name="campaignDuration"
            >
              <DateRangePicker
                outputFormat="YYYY-MM-DD"
                outputType="dateString"
                placeholder={ ['Campaign start', 'Campaign end'] }
                size="small"
              />
            </Form.Item>

            <Form.Item
              label="Reporting Period (Large)"
              name="reportingPeriod"
            >
              <DateRangePicker
                allowClear
                outputFormat="YYYY-MM-DD"
                outputType="dateString"
                placeholder={ ['Report start', 'Report end'] }
                size="large"
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
