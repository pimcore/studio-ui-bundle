import { type Meta } from '@storybook/react'
import { DropdownMenu as DropdownMenuComponent, type DropdownMenuItemProps } from './dropdown-menu'
import { Button } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import i18n from '@Pimcore/app/i18n'

const config: Meta = {
  title: 'Pimcore studio/UI/DropdownMenu',
  component: DropdownMenuComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const children =
    <Button
      size="small"
      icon={<Icon name="dots-horizontal"/>}
    />

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
    children,
    placement: 'bottomLeft',
    dropdownItems
  }
}
