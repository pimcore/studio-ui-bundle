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
import { TimeRangePicker, type TimeRangePickerProps, type DateRangeTargetValue } from './time-range-picker'
import { Form } from '@Pimcore/components/form/form'
import { formatDatePickerDate } from '@Pimcore/components/date-picker/utils/date-picker-utils'

const config: Meta = {
  title: 'Components/Data Entry/TimeRangePicker',
  component: TimeRangePicker,
  parameters: {

  },
  tags: ['autodocs']
}

export default config

const ExampleForm = (props: TimeRangePickerProps): React.JSX.Element => {
  const [timeRange, setTimeRange] = useState<DateRangeTargetValue | null>(props.value ?? null)

  const handleTimeRangeChange = (value: DateRangeTargetValue | null): void => {
    setTimeRange(value)
  }

  const formatTimeRange = (range: DateRangeTargetValue | null): string => {
    if (range === null || range === undefined) {
      return 'null'
    }
    const [start, end] = range
    return `[${formatDatePickerDate(start)}, ${formatDatePickerDate(end)}]`
  }

  return (
    <Form>
      <Form.Item>
        <TimeRangePicker
          { ...props }
          onChange={ handleTimeRangeChange }
          value={ timeRange }
        />
      </Form.Item>
      <div>
        <strong>Selected Time Range:</strong>
        <pre>{formatTimeRange(timeRange)}</pre>
      </div>
    </Form>
  )
}

type Story = StoryObj<typeof TimeRangePicker>

export const _default: Story = {
  args: {
  },
  render: (props: TimeRangePickerProps) => <ExampleForm { ...props } />
}

export const WithDefaultValue: Story = {
  args: {
    value: ['09:00:00', '17:00:00']
  },
  render: (props: TimeRangePickerProps) => <ExampleForm { ...props } />
}

export const WithTimestampOutput: Story = {
  args: {
    outputType: 'timestamp',
    value: ['09:00:00', '17:00:00']
  },
  render: (props: TimeRangePickerProps) => <ExampleForm { ...props } />
}

export const WithCustomFormat: Story = {
  args: {
    outputType: 'dateString',
    outputFormat: 'HH:mm',
    value: ['09:00', '17:00']
  },
  render: (props: TimeRangePickerProps) => <ExampleForm { ...props } />
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: ['09:00:00', '17:00:00']
  },
  render: (props: TimeRangePickerProps) => <ExampleForm { ...props } />
}

export const Inherited: Story = {
  args: {
    inherited: true,
    value: ['09:00:00', '17:00:00']
  },
  render: (props: TimeRangePickerProps) => <ExampleForm { ...props } />
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: ['Start time', 'End time']
  },
  render: (props: TimeRangePickerProps) => <ExampleForm { ...props } />
}
