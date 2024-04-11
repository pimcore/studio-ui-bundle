import { type Meta } from '@storybook/react'
import { AppView } from './app-view'

const config: Meta = {
  title: 'Pimcore studio/Modules/App/App',
  component: AppView,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '600px'
      }
    }
  }
}
