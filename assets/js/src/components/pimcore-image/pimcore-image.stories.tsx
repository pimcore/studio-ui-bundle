import { type Meta } from '@storybook/react'
import { PimcoreImage as PimcoreImageComponent } from './pimcore-image'


const config: Meta = {
  title: 'Pimcore studio/UI/PimcoreImage',
  component: PimcoreImageComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    src: 'https://pimcore.com/brand/Website-Banners/image-thumb__23862__header-sujet-img__2019--slider/2024-Pimcore-Home-Main.webp',
    alt: 'Pimconaut',
    className: ''
  }
}
