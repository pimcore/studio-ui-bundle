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
      control: { type: 'radio' },
    },
  },

  tags: ['autodocs']
}

console.log(Icon);

export default config

export const _default = {
  args: {
    name: 'camera',
    options: { width: 16, height: 16 }
  }
}
