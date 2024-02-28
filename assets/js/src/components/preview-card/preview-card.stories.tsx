import { type Meta } from '@storybook/react'
import { PreviewCard as PreviewCardComponent } from './preview-card'
import { type DropdownMenuItemProps } from '@Pimcore/components/dropdown-menu/dropdown-menu'
import i18n from '@Pimcore/app/i18n'

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
    iconNameLeft: 'target',
    label: i18n.t('preview-card.locate-in-tree')
  },
  {
    iconNameLeft: 'info-circle-outlined',
    label: i18n.t('preview-card.info'),
    iconNameRight: 'right-outlined'
  },
  {
    iconNameLeft: 'rich-edit',
    label: i18n.t('preview-card.rename')
  },
  {
    iconNameLeft: 'download-02',
    label: i18n.t('preview-card.download-zip')
  },
  {
    iconNameLeft: 'delete-outlined',
    label: i18n.t('preview-card.delete')
  }
]

export const _default = {
  args: {
    name: 'Pimconaout0_123.jpg',
    selected: false,
    imgSrc: 'https://pimcore.com/brand/Website-Banners/image-thumb__23862__header-sujet-img__2019--slider/2024-Pimcore-Home-Main.webp',
    dropdownItems
  }
}
