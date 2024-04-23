import { type Meta } from '@storybook/react'
import { TreeContainer } from './tree-container'

const config: Meta = {
  title: 'Pimcore studio/Modules/Asset/Tree',
  component: TreeContainer,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    id: 1
  }
}
