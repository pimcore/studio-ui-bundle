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
import { Checkbox, type ICheckboxGroupProps } from './checkbox'

const config: Meta<ICheckboxGroupProps> = {
  title: 'Components/Data Entry/Checkbox Group',
  component: Checkbox.Group,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of options for the checkbox group',
      control: { type: 'object' }
    },
    defaultValue: {
      description: 'Default selected values',
      control: { type: 'object' }
    },
    value: {
      description: 'Selected values (controlled)',
      control: { type: 'object' }
    },
    disabled: {
      description: 'Disable all checkboxes in the group',
      control: { type: 'boolean' }
    },
    onChange: {
      description: 'Callback when selection changes',
      action: 'changed'
    }
  }
}

export default config
type Story = StoryObj<ICheckboxGroupProps>

export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ],
    defaultValue: ['option1']
  },
  render: (args) => (
    <Checkbox.Group {...args} />
  )
}

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { label: 'Available Option', value: 'available' },
      { label: 'Another Available', value: 'available2' },
      { label: 'Disabled Option', value: 'disabled', disabled: true },
      { label: 'Also Disabled', value: 'disabled2', disabled: true }
    ],
    defaultValue: ['available']
  },
  render: (args) => (
    <Checkbox.Group {...args} />
  )
}

export const StringArrayOptions: Story = {
  args: {
    options: ['Red', 'Green', 'Blue', 'Yellow', 'Purple'],
    defaultValue: ['Red', 'Blue']
  },
  render: (args) => (
    <Checkbox.Group {...args} />
  )
}

export const AllDisabled: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ],
    defaultValue: ['option1', 'option2'],
    disabled: true
  },
  render: (args) => (
    <Checkbox.Group {...args} />
  )
}
