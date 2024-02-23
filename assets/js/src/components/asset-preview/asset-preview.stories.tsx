import { type Meta } from '@storybook/react'
import { AssetPreview as AssetPreviewComponent } from './asset-preview'

const config: Meta = {
  title: 'Pimcore studio/UI/AssetPreview',
  component: AssetPreviewComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    name: 'Pimconaout0_123.jpg',
    selected: false,
    imgSrc: 'https://pimcore.com/brand/Website-Banners/image-thumb__23862__header-sujet-img__2019--slider/2024-Pimcore-Home-Main.webp'
  }
}
