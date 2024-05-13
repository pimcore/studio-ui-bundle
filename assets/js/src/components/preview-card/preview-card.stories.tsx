import { type Meta } from '@storybook/react'
import {PreviewCard as PreviewCardComponent, SizeTypes} from './preview-card'
import { type DropdownMenuItemProps } from '@Pimcore/components/dropdown-menu/dropdown-menu'

const config: Meta = {
  title: 'Pimcore studio/UI/PreviewCard',
  component: PreviewCardComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const dropdownItems: DropdownMenuItemProps[] = [
  {
    iconLeft: 'target',
    label: 'preview-card.locate-in-tree'
  },
  {
    iconLeft: 'info-circle-outlined',
    label: 'preview-card.info',
    iconRight: {
      name: 'right-outlined'
    }
  },
  {
    iconLeft: 'rich-edit',
    label: 'preview-card.rename'
  },
  {
    iconLeft: 'download-02',
    label: 'preview-card.download-zip'
  },
  {
    iconLeft: 'delete-outlined',
    label: 'preview-card.delete'
  }
]

export const _default = {
  args: {
    name: 'Pimconaout0_123.jpg',
    imgSrc: 'https://pimcore.com/brand/Website-Banners/image-thumb__23862__header-sujet-img__2019--slider/2024-Pimcore-Home-Main.webp',
    dropdownItems,
    size: SizeTypes.MEDIUM,
    onClick: (e) => {
      console.log('Card clicked')
    }
  }
}
