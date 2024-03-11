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

const children: React.JSX.Element =
    <Button
      size="small"
      icon={<Icon name="dots-horizontal"/>}
    />

const dropdownItems: DropdownMenuItemProps[] = [
  {
    onClick: (e) => {
      e.stopPropagation()
      console.log('clicked div')
    },
    iconLeft: 'target',
    label: 'preview-card.locate-in-tree'
  },
  {
    iconLeft: 'info-circle-outlined',
    label: 'preview-card.info',
    iconRight: {
      name: 'right-outlined',
      onClick: (e) => {
        e.stopPropagation()
        console.log('clicked icon right')
      }
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
  },
  {
    iconLeft: 'info-circle-outlined',
    label: 'preview-card.info',
    iconToLabel: { name: 'right-outlined' },
    iconRight: { name: 'pin-02' }
  }
]

export const _default = {
  args: {
    children,
    placement: 'bottomLeft',
    dropdownItems
  }
}
