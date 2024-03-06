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
    iconLeft: 'target',
    label: i18n.t('preview-card.locate-in-tree')
  },
  {
    iconLeft: 'info-circle-outlined',
    label: i18n.t('preview-card.info'),
    iconRight: {
      name: 'right-outlined'
    }
  },
  {
    iconLeft: 'rich-edit',
    label: i18n.t('preview-card.rename')
  },
  {
    iconLeft: 'download-02',
    label: i18n.t('preview-card.download-zip')
  },
  {
    iconLeft: 'delete-outlined',
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
