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
import { CreatableSelect } from './creatable-select'

const SAMPLE_SELECT_OPTIONS = [
  { value: 'option1', label: 'Predefined Option 1' },
  { value: 'option2', label: 'Predefined Option 2' },
  { value: 'option3', label: 'Predefined Option 3' }
]

const config: Meta = {
  title: 'Components/Controls/CreatableSelect',
  component: CreatableSelect,
  parameters: {
    docs: {
      description: {
        component: 'A select component that allows users to create custom options on the fly when editable mode is enabled.'
      }
    }
  },
  args: {
    options: SAMPLE_SELECT_OPTIONS,
    width: 250,
    onCreateOption: (value: string) => {
      console.log('Created new option:', value)
    }
  },
  tags: ['autodocs']
}

export const _default = {
  args: {
    placeholder: 'Select or create an option...',
    creatable: true
  }
}

export const WithCustomOptions = {
  args: {
    placeholder: 'Select or create an option...',
    creatable: true,
    allowDuplicates: false
  }
}

export const AllowDuplicates = {
  args: {
    placeholder: 'Select or create an option...',
    creatable: true,
    allowDuplicates: true
  }
}

export const NotCreatable = {
  args: {
    placeholder: 'Choose an option...',
    creatable: false
  }
}

export const WithClearAndSearch = {
  args: {
    placeholder: 'Select or create an option...',
    creatable: true,
    allowClear: true,
    showSearch: true,
    optionFilterProp: 'label'
  }
}

export const WithPreselectedValue = {
  args: {
    placeholder: 'Select or create an option...',
    creatable: true,
    defaultValue: 'option2',
    open: true
  }
}

export const WithCustomValue = {
  args: {
    placeholder: 'Select or create an option...',
    creatable: true,
    defaultValue: 'custom-value-not-in-options'
  }
}

export const Multiple = {
  args: {
    placeholder: 'Select or create options...',
    creatable: true,
    mode: 'multiple'
  }
}

export const WithWarning = {
  args: {
    placeholder: 'Select or create an option...',
    creatable: true,
    status: 'warning'
  }
}

export const WithError = {
  args: {
    placeholder: 'Select or create an option...',
    creatable: true,
    status: 'error'
  }
}

export default config
