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
import { type Meta, type StoryObj } from '@storybook/react'
import { Radio, type IRadioGroupProps } from './radio'

const config: Meta<IRadioGroupProps> = {
  title: 'Components/Data Entry/Radio Group',
  component: Radio.Group,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of options for the radio group',
      control: { type: 'object' }
    },
    defaultValue: {
      description: 'Default selected value',
      control: { type: 'text' }
    },
    value: {
      description: 'Selected value (controlled)',
      control: { type: 'text' }
    },
    disabled: {
      description: 'Disable all radios in the group',
      control: { type: 'boolean' }
    },
    onChange: {
      description: 'Callback when selection changes',
      action: 'changed'
    }
  }
}

export default config
type Story = StoryObj<IRadioGroupProps>

export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ],
    defaultValue: 'option1'
  },
  render: (args) => (
    <Radio.Group { ...args } />
  )
}

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { label: 'Available Option', value: 'available' },
      { label: 'Another Available', value: 'available2' },
      { label: 'Disabled Option', value: 'disabled', disabled: true }
    ],
    defaultValue: 'available'
  },
  render: (args) => (
    <Radio.Group { ...args } />
  )
}

export const AllDisabled: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' }
    ],
    defaultValue: 'option1',
    disabled: true
  },
  render: (args) => (
    <Radio.Group { ...args } />
  )
}
