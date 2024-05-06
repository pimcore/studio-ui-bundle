import { type Meta } from '@storybook/react'
import { PimcoreVideo as PimcoreVideoComponent } from './pimcore-video'

const config: Meta = {
  title: 'Pimcore studio/UI/PimcoreVideo',
  component: PimcoreVideoComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    src: [{src:"http://localhost/Sample Content/Videos/Volkswagen-Van.mp4", type:"video/mp4"}],
    width: 240,
    className: ''
  }
}
