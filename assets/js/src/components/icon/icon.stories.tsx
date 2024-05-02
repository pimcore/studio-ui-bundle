/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { type Meta } from '@storybook/react'
import { Icon } from './icon'

const config: Meta = {
  title: 'Pimcore studio/UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered'
  },

  argTypes: {
    name: {
      options: ['camera', 'folder'],
      control: { type: 'radio' }
    }
  },

  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    name: 'camera',
    options: { width: 16, height: 16 }
  }
}
