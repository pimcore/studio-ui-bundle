import { type Meta } from '@storybook/react'
import { SizeChanger as SizeChangerComponent } from './size-changer'

const config: Meta = {
  title: 'Pimcore studio/UI/SizeChanger',
  component: SizeChangerComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    sizeOptions: [10, 20, 40, 80],
    defaultSize: 20,
    handleChange: (size: number) => { console.log(`Page size: ${size}`) },
    label: 'page size'
  }
}
