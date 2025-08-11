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

const config: Meta = {
  title: 'Components/Data Entry/Checkbox',
  component: Checkbox
}

export default config

export const _default = {}

export const Checked = {
  args: {
    checked: true
  }
}

export const Disabled = {
  args: {
    checked: true,
    disabled: true
  }
}

export const Indeterminated = {
  args: {
    indeterminate: true
  }
}

// Group stories
type GroupStory = StoryObj<ICheckboxGroupProps>

export const Group: GroupStory = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
      { label: 'Disabled Option', value: 'disabled', disabled: true }
    ],
    defaultValue: ['option1']
  },
  render: (args) => (
    <Checkbox.Group {...args} />
  )
}

export const GroupVertical: GroupStory = {
  args: {
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Orange', value: 'orange' },
      { label: 'Banana', value: 'banana' }
    ],
    defaultValue: ['apple', 'orange']
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Checkbox.Group {...args} />
    </div>
  )
}

export const GroupWithStringArray: GroupStory = {
  args: {
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    defaultValue: ['Red', 'Blue']
  },
  render: (args) => (
    <Checkbox.Group {...args} />
  )
}

export const GroupDisabled: GroupStory = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ],
    defaultValue: ['option1'],
    disabled: true
  },
  render: (args) => (
    <Checkbox.Group {...args} />
  )
}
