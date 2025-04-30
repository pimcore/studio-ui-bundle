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
import { Select } from '@Pimcore/components/select/select'

const SAMPLE_SELECT_OPTIONS = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
]

const config: Meta = {
  title: 'Components/Controls/Select',
  args: {
    options: SAMPLE_SELECT_OPTIONS,
    width: 250
  },
  component: Select,
  tags: ['autodocs']
}

export const _default = {
  args: {
    placeholder: 'Choose an option...'
  }
}

export const Multiple = {
  args: {
    placeholder: 'Choose an option...',
    mode: 'multiple'
  }
}

export const WithSearch = {
  args: {
    placeholder: 'Choose an option...',
    showSearch: true,
    filterOption: (input: any, option) =>
      option.label.toLowerCase().includes(input.toLowerCase())
  }
}

export const WithCustomIcon = {
  args: {
    defaultValue: 'Default value',
    customIcon: 'export'
  }
}

export const WithCustomArrowIcon = {
  args: {
    placeholder: 'Choose an option...',
    customArrowIcon: 'export'
  }
}

export const WithWarning = {
  args: {
    placeholder: 'Choose an option...',
    status: 'warning'
  }
}

export const WithError = {
  args: {
    placeholder: 'Choose an option...',
    status: 'error'
  }
}

export default config
