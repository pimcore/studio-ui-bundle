/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type Meta } from '@storybook/react'
import { Select } from '@Pimcore/components/select/select'

const config: Meta = {
  title: 'Components/Controls/Select',
  component: Select,
  tags: ['autodocs']
}

const SAMPLE_SELECT_OPTIONS = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
]

export const _default = {
  args: {
    options: SAMPLE_SELECT_OPTIONS,
    placeholder: 'Choose an option...'
  }
}

export const Multiple = {
  args: {
    options: SAMPLE_SELECT_OPTIONS,
    placeholder: 'Choose an option...',
    mode: 'multiple'
  }
}

export const WithSearch = {
  args: {
    options: SAMPLE_SELECT_OPTIONS,
    placeholder: 'Choose an option...'
  }
}

export const WithCustomIcon = {
  args: {
    options: SAMPLE_SELECT_OPTIONS,
    placeholder: 'Choose an option...'
  }
}

export const WithCustomArrowIcon = {
  args: {
    options: SAMPLE_SELECT_OPTIONS,
    placeholder: 'Choose an option...'
  }
}

export const WithWarning = {
  args: {
    options: SAMPLE_SELECT_OPTIONS,
    placeholder: 'Choose an option...',
    status: 'warning'
  }
}

export const WithError = {
  args: {
    options: SAMPLE_SELECT_OPTIONS,
    placeholder: 'Choose an option...',
    status: 'error'
  }
}

export default config
